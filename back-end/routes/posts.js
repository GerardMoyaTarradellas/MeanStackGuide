const express = require("express");
const multer = require("multer");

const Post = require("../models/post");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const is_valid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Error en el Mime type");
    if (is_valid) {
      error = null;
    }
    callback(null, "back-end/images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + "-" + Date.now() + "." + ext);
  },
});

/** Generación de posts. */
router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image_path: url + "/images/" + req.file.filename,
    });
    post.save().then((post) => {
      res.status(201).json({
        message: "Post creado!",
        post: post,
      });
    });
  }
);

/** Consulta de posts existentes en la db. */
router.get("", (req, res, next) => {
  const page_size = +req.query.page_size;
  const current_page = +req.query.page;
  const post_query = Post.find();

  if (page_size && current_page) {
    post_query.skip(page_size * (current_page - 1)).limit(page_size);
  }

  post_query.then((posts) => {
    res.status(200).json({
      message: "Posts leídos",
      posts: posts,
    });
  });
});

/** Obtiene un único post. */
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json({
        message: "Post leído",
        post: post,
      });
    } else {
      res.status(404).json({
        message: "Post no encontrado",
        post: undefined,
      });
    }
  });
});

/** Eliminación de un post */
router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "Post eliminado",
    });
  });
});

/** Eliminación de un post */
router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      req.body.image_path = url + "/images/" + req.file.filename;
    }

    Post.updateOne({ _id: req.params.id }, req.body).then((post_modified) => {
      res.status(200).json({
        message: "Post modificado",
        post: req.body,
      });
    });
  }
);

module.exports = router;

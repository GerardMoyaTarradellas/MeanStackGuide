const express = require("express");

const Post = require("../models/post");

const router = express.Router();

/** Generación de posts. */
router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((post) => {
    res.status(201).json({
      message: "Post creado!",
      post: post,
    });
  });
});

/** Consulta de posts existentes en la db. */
router.get("", (req, res, next) => {
  Post.find().then((posts) => {
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
router.put("/:id", (req, res, next) => {
  Post.updateOne({ _id: req.params.id }, req.body).then((post_modified) => {
    res.status(200).json({
      message: "Post modificado",
      post: post_modified,
    });
  });
});

module.exports = router;

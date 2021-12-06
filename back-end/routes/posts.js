const express = require("express");
const multer = require("multer");

const PostController = require("../controllers/posts");

const auth = require("../middleware/check-auth");

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
  auth,
  multer({ storage: storage }).single("image"),
  PostController.createPost
);

/** Consulta de posts existentes en la db. */
router.get("", PostController.getAllPosts);

/** Obtiene un único post. */
router.get("/:id", PostController.getOnePost);

/** Eliminación de un post */
router.delete("/:id", auth, PostController.deleteOne);

/** Eliminación de un post */
router.put(
  "/:id",
  auth,
  multer({ storage: storage }).single("image"),
  PostController.editPost
);

module.exports = router;

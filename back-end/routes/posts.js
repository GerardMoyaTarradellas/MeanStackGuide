const express = require("express");

const PostController = require("../controllers/posts");

const auth = require("../middleware/check-auth");
const extractFile = require("../middleware/multer");

const router = express.Router();

/** Generación de posts. */
router.post("", auth, extractFile, PostController.createPost);

/** Consulta de posts existentes en la db. */
router.get("", PostController.getAllPosts);

/** Obtiene un único post. */
router.get("/:id", PostController.getOnePost);

/** Eliminación de un post */
router.delete("/:id", auth, PostController.deleteOne);

/** Eliminación de un post */
router.put("/:id", auth, extractFile, PostController.editPost);

module.exports = router;

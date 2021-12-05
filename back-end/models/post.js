const mongoose = require("mongoose");

/** Esquema del `Post` */
const PostSchema = mongoose.Schema({
  /** Titulo del post. */
  title: { type: String, required: true },
  /** Contenido del post. */
  content: { type: String, required: true },
  /** Path de la imagen. */
  image_path: { type: String, required: true },
  /** Creador del post. */
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);

const mongoose = require("mongoose");
const unique_validator = require("mongoose-unique-validator");

/** Esquema del `Post` */
const UserSchema = mongoose.Schema({
  /** Email del usuario. */
  email: { type: String, required: true, unique: true },
  /** Email del usuario. */
  password: { type: String, required: true },
});

UserSchema.plugin(unique_validator);

module.exports = mongoose.model("User", UserSchema);

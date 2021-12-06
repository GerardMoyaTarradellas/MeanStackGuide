const express = require("express");
const UserController = require("../controllers/user");

const router = express.Router();

/** Genera un nuevo usuario */
router.post("/signup", UserController.createUser);

/** Comprueba que el usuario exista y genera un token */
router.post("/login", UserController.logIn);

module.exports = router;

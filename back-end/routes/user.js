const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const user = require("../models/user");

const router = express.Router();

/** Genera un nuevo usuario */
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((password) => {
    const user = new User({
      email: req.body.email,
      password: password,
    });
    console.log(user);
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created !",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

/** Comprueba que el usuario exista y genera un token */
router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "User not found!",
        });
      }

      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Incorrect password",
        });
      }

      const token = jwt.sign(
        { email: user.email, user_id: user._id },
        "secret_this_should_be_longer",
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({
        message: "Login succesfull",
        token: token,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Error - " + err,
      });
    });
});

module.exports = router;

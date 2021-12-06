const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((password) => {
    const user = new User({
      email: req.body.email,
      password: password,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created !",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Las credenciales no son validas!",
        });
      });
  });
};

exports.logIn = (req, res, next) => {
  let current_user;

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "User not found!",
        });
      }

      current_user = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Incorrect password",
        });
      }

      const token = jwt.sign(
        { email: current_user.email, user_id: current_user._id },
        process.env.SECRET,
        {
          expiresIn: "1h",
        }
      );

      console.log("Logeado -> " + current_user._id);
      res.status(200).json({
        message: "Login succesfull",
        token: token,
        expires_in: 3600000,
        user_id: current_user._id,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Credenciales no válidas!",
      });
    });
};

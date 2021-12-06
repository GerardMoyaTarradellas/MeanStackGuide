const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded_token = jwt.verify(token, process.env.SECRET);
    req.user_data = {
      email: decoded_token.email,
      user_id: decoded_token.user_id,
    };
    console.log("Usuario autenticado");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Usuario no validado!",
    });
  }
};

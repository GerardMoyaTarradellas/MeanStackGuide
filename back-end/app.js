const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const post_router = require("./routes/posts");
const user_routes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://gerard:rPwswr21jZVN536A@cluster0.jcdal.mongodb.net/mean-course?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conectado a mongo!");
  })
  .catch(() => {
    console.log("No connectado a mongo", {});
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("back-end/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-reqed-With, Content-type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", post_router);
app.use("/api/user", user_routes);

module.exports = app;

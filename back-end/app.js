const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-reqed-With, Content-type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Post created!",
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    { _id: "0", title: "Titulo 1", content: "Contenido 1" },
    { _id: "1", title: "Titulo 2", content: "Contenido 2" },
    { _id: "2", title: "Titulo 3", content: "Contenido 3" },
  ];
  res.status(200).json({
    message: "Posts fetch succesfully",
    posts: posts,
  });
});

module.exports = app;

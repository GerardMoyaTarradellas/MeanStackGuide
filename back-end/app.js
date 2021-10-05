const express = require("express");

const app = express();

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Accept"
  );
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", (request, response, next) => {
  const posts = [
    { _id: "0", title: "Titulo 1", content: "Contenido 1" },
    { _id: "1", title: "Titulo 2", content: "Contenido 2" },
    { _id: "2", title: "Titulo 3", content: "Contenido 3" },
  ];
  response.status(200).json({
    message: "Posts fetch succesfully",
    posts: posts,
  });
});

module.exports = app;

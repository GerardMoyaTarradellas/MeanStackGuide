const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-reqed-With, Content-type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

/** Generación de posts. */
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((post) => {
    res.status(201).json({
      message: "Post creado!",
      post: post,
    });
  });
});

/** Consulta de posts existentes en la db. */
app.get("/api/posts", (req, res, next) => {
  Post.find().then((posts) => {
    res.status(200).json({
      message: "Posts leídos",
      posts: posts,
    });
  });
});

/** Obtiene un único post. */
app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json({
        message: "Post leído",
        post: post,
      });
    } else {
      res.status(404).json({
        message: "Post no encontrado",
        post: undefined,
      });
    }
  });
});

/** Eliminación de un post */
app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "Post eliminado",
    });
  });
});

/** Eliminación de un post */
app.put("/api/posts/:id", (req, res, next) => {
  Post.updateOne({ _id: req.params.id }, req.body).then((post_modified) => {
    res.status(200).json({
      message: "Post modificado",
      post: post_modified,
    });
  });
});

module.exports = app;

const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    image_path: url + "/images/" + req.file.filename,
    creator: req.user_data.user_id,
  });
  post
    .save()
    .then((post) => {
      console.log("Post creado -> " + post._id);
      res.status(201).json({
        message: "Post creado!",
        post: post,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "El post no se ha creado",
      });
    });
};

exports.deleteOne = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.user_data.user_id })
    .then((result) => {
      if (result.deletedCount > 0) {
        console.log("Post eliminado");
        res.status(200).json({
          message: "Post eliminado",
        });
      } else {
        console.log("Post no eliminado");
        res.status(401).json({
          message: "Not authorized!",
          post: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "No se ha podido eliminar el post",
      });
    });
};

exports.editPost = (req, res, next) => {
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    req.body.image_path = url + "/images/" + req.file.filename;
  }
  Post.updateOne(
    { _id: req.params.id, creator: req.user_data.user_id },
    req.body
  )
    .then((result) => {
      if (result.modifiedCount > 0) {
        console.log("Post editado");
        res.status(200).json({
          message: "Post modificado",
          post: req.body,
        });
      } else if (result.matchedCount > 0) {
        console.log("Post no editado por ser igual que el original");
        res.status(200).json({
          message: "Post no editado por ser igual que el original",
          post: req.body,
        });
      } else {
        console.log("Post no editado -> Desautorizado");
        res.status(401).json({
          message: "Not authorized!",
          post: null,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "El post no se ha actualizado",
      });
    });
};

exports.getAllPosts = (req, res, next) => {
  const page_size = +req.query.page_size;
  const current_page = +req.query.page;
  const post_query = Post.find();
  let bd_posts = [];

  if (page_size && current_page) {
    post_query.skip(page_size * (current_page - 1)).limit(page_size);
  }

  post_query
    .then((posts) => {
      bd_posts = posts;
      return Post.count();
    })
    .then((count) => {
      console.log("Post recogidos");
      res.status(200).json({
        message: "Posts leídos",
        posts: bd_posts,
        max_posts: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "No se han podido obtener los posts",
      });
    });
};

exports.getOnePost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        console.log("Post encontrado -> " + post._id);
        res.status(200).json({
          message: "Post leído",
          post: post,
        });
      } else {
        console.log("Post no encontrado");
        res.status(404).json({
          message: "Post no encontrado",
          post: undefined,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "No se ha podido obtener el post",
      });
    });
};

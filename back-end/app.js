const express = require("express");

const app = express();

app.use((request, response, next) => {
  console.log("First");
  next();
});

app.use((request, response, next) => {
  console.log("Second");
  response.send("Hello from express");
});

module.exports = app;

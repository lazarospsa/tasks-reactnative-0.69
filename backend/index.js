require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./config/db.js");
const consign = require("consign");

consign()
  .include("./config/passport.js")
  .then("./config/middlewares.js")
  .then("./api")
  .then("./config/routes.js")
  .into(app);

app.db = db;

app.use(function (req, res, next) {
  console.log(req.body); // populated!
  next();
});

app.listen(8888, () => {
  console.log("starting");
});

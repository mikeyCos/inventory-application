const { Router } = require("express");
const { getIndex } = require("../controllers/indexController");

const indexRouter = new Router();

indexRouter.all("/", (req, res, next) => {
  console.log("indexRouter.all running...");
  next();
});
indexRouter.get("/", getIndex);

module.exports = indexRouter;

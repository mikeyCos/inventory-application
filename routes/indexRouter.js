const { Router } = require("express");
const { getIndex } = require("../controllers/indexController");

const indexRouter = new Router();

indexRouter.all("/", (req, res, next) => {
  next();
});

indexRouter.get(["/", "/home"], getIndex);

module.exports = indexRouter;

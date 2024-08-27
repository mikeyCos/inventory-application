const { Router } = require("express");
const { getIndex } = require("../controllers/indexController");

const indexRouter = new Router();

indexRouter.get("/", getIndex);

module.exports = indexRouter;

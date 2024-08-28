const { Router } = require("express");
const { getAddCategory, getAddItem } = require("../controllers/addController");

const addRouter = new Router();

addRouter.get("/category", getAddCategory);
addRouter.get("/item", getAddItem);

module.exports = addRouter;

const { Router } = require("express");
const {
  getAddCategory,
  getAddItem,
  postAddCategory,
  postAddItem,
} = require("../controllers/addController");

const addRouter = new Router();

addRouter.get("/category", getAddCategory);
addRouter.get("/item", getAddItem);
addRouter.post("/category", postAddCategory);
addRouter.post("/item", postAddItem);

module.exports = addRouter;

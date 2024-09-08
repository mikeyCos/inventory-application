const { Router } = require("express");
const {
  getCategoryItems,
  getCategories,
} = require("../controllers/categoriesController");

const categoriesRouter = new Router();

categoriesRouter.get("/:category", getCategoryItems);
categoriesRouter.get("/", getCategories);

module.exports = categoriesRouter;

const { Router } = require("express");
const {
  getCategoryItems,
  getCategories,
  postCategoryDelete,
} = require("../controllers/categoriesController");

const categoriesRouter = new Router();

categoriesRouter.get("/:category", getCategoryItems);
categoriesRouter.get("/", getCategories);
categoriesRouter.post("/delete/:category", postCategoryDelete);

module.exports = categoriesRouter;

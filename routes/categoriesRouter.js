const { Router } = require("express");
const {
  getCategoryItems,
  getCategories,
  getCategoryEdit,
  getCategoryDelete,
} = require("../controllers/categoriesController");

const categoriesRouter = new Router();

categoriesRouter.get("/edit/:category", getCategoryEdit);
categoriesRouter.get("/delete/:category", getCategoryDelete);
categoriesRouter.get("/:category", getCategoryItems);
categoriesRouter.get("/", getCategories);

module.exports = categoriesRouter;

const { Router } = require("express");
const {
  getCategoryItems,
  getCategories,
  getAddCategory,
  getEditCategory,
  getDeleteCategory,
  postAddCategory,
  postEditCategory,
  postDeleteCategory,
} = require("../controllers/categoriesController");

const categoriesRouter = new Router();

// GET requests
categoriesRouter.get("/add", getAddCategory);
categoriesRouter.get("/delete/:category", getDeleteCategory);
categoriesRouter.get("/edit/:category", getEditCategory);
categoriesRouter.get("/:category", getCategoryItems);
categoriesRouter.get("/", getCategories);

// POST requests
categoriesRouter.post("/add", postAddCategory);
categoriesRouter.post("/edit/:category", postEditCategory);
categoriesRouter.post("/delete/:category", postDeleteCategory);

module.exports = categoriesRouter;

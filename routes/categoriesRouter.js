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
const validateParams = require("../validators/paramsValidator");
const validateQuery = require("../validators/queryValidator");

const categoriesRouter = new Router();

// GET requests
categoriesRouter.get("/add", [validateQuery, getAddCategory]);
categoriesRouter.get("/delete/:category", [validateParams, getDeleteCategory]);
categoriesRouter.get("/edit/:category", [validateParams, getEditCategory]);
categoriesRouter.get("/:category", [
  validateParams,
  validateQuery,
  getCategoryItems,
]);
categoriesRouter.get("/", [validateQuery, getCategories]);

// POST requests
categoriesRouter.post("/add", postAddCategory);
categoriesRouter.post("/edit/:category", postEditCategory);
categoriesRouter.post("/delete/:category", postDeleteCategory);

module.exports = categoriesRouter;

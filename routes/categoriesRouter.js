const { Router } = require("express");
const {
  getCategoryItems,
  getCategories,
  postCategoryDelete,
} = require("../controllers/categoriesController");

const categoriesRouter = new Router();

categoriesRouter.get("/:category", getCategoryItems);
categoriesRouter.get(["/", "/delete/confirm/:categoryID"], getCategories);
// categoriesRouter.get('/delete/confirm', getCategoryDelete);
categoriesRouter.post("/delete/:category", postCategoryDelete);

module.exports = categoriesRouter;

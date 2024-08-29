const { Router } = require("express");
const { getCategoryItems } = require("../controllers/categoriesController");

const categoriesRouter = new Router();

categoriesRouter.get("/:category", getCategoryItems);

module.exports = categoriesRouter;

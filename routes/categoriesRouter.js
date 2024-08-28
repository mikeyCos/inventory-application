const { Router } = require("express");
const { getCategoryItems } = require("../controllers/categoriesController");

const categoriesRouter = new Router();

module.exports = categoriesRouter;

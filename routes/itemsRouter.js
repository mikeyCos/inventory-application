const { Router } = require("express");
const {
  getAddItem,
  getEditItem,
  getDeleteItem,
  postAddItem,
  postEditItem,
  postDeleteItem,
} = require("../controllers/itemsController.js");
const validateParams = require("../validators/paramsValidator");
const validateQuery = require("../validators/queryValidator");

const itemsRouter = new Router();

// GET requests
itemsRouter.get("/add", [validateQuery, getAddItem]);
itemsRouter.get("/edit/:upc/:category", [validateParams, getEditItem]);
itemsRouter.get("/delete/:upc/:category", [validateParams, getDeleteItem]);

// POST requests
itemsRouter.post("/add", postAddItem);
itemsRouter.post("/edit/:upc/:category", postEditItem);
itemsRouter.post("/delete/:upc/:category", postDeleteItem);

module.exports = itemsRouter;

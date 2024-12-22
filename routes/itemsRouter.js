const { Router } = require("express");
const {
  getAddItem,
  getEditItem,
  getDeleteItem,
  postAddItem,
  postEditItem,
  postDeleteItem,
} = require("../controllers/itemsController.js");

const itemsRouter = new Router();

// GET requests
itemsRouter.get("/add", getAddItem);
itemsRouter.get("/edit/:upc/:category", getEditItem);
itemsRouter.get("/delete/:upc/:category", getDeleteItem);

// POST requests
itemsRouter.post("/add", postAddItem);
itemsRouter.post("/edit/:upc/:category", postEditItem);
itemsRouter.post("/delete/:upc/:category", postDeleteItem);

module.exports = itemsRouter;

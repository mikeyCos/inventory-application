const { Router } = require("express");
const {
  getEditCategory,
  getEditItem,
  postEditCategory,
  postEditItem,
} = require("../controllers/editController");

const editRouter = new Router();

editRouter.get("/category/:category", getEditCategory);
editRouter.get("/item/:upc/:category", getEditItem);
editRouter.post("/category/:category", postEditCategory);
editRouter.post("/item/:upc", postEditItem);

module.exports = editRouter;

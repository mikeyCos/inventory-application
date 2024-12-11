const { Router } = require("express");
const {
  getEditCategory,
  getEditItem,
  postEditCategory,
  postEditItem,
} = require("../controllers/editController");

const editRouter = new Router();

editRouter.get("/category/:category", getEditCategory);
editRouter.get("/item/:item", getEditItem);

module.exports = editRouter;

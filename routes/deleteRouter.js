const { Router } = require("express");
const {
  getDeleteCategory,
  getDeleteItem,
  postDeleteCategory,
  postDeleteItem,
} = require("../controllers/deleteController");

const deleteRouter = new Router();

deleteRouter.get("/category/:category", getDeleteCategory);
deleteRouter.get("/item/:item", getDeleteItem);

module.exports = deleteRouter;

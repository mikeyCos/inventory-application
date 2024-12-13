const { Router } = require("express");
const {
  getDeleteCategory,
  getDeleteItem,
  postDeleteCategory,
  postDeleteItem,
} = require("../controllers/deleteController");

const deleteRouter = new Router();

deleteRouter.get("/category/:category", getDeleteCategory);
deleteRouter.get("/item/:upc", getDeleteItem);
deleteRouter.post("/category/:category", postDeleteCategory);
deleteRouter.post("/item/:upc", postDeleteItem);

module.exports = deleteRouter;

const { Router } = require("express");
const {
  getEditCategory,
  getEditItem,
  postEditCategory,
  postEditItem,
} = require("../controllers/editController");
const e = require("express");

const editRouter = new Router();

editRouter.use((req, res, next) => {
  console.log("editRouter middleware running...");
  next();
});

editRouter.get("/category/:category", getEditCategory);
editRouter.get("/item/:upc/:category", getEditItem);
editRouter.post("/category/:category", postEditCategory);
editRouter.post("/item/:upc/:category", postEditItem);

module.exports = editRouter;

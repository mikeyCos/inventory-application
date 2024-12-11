const asyncHandler = require("express-async-handler");
const {
  getItems,
  getCategories,
  deleteCategory,
  updateItems,
  getCategory,
} = require("../db/queries");

const deleteController = {
  getDeleteCategory: asyncHandler(async (req, res) => {
    console.log("getDeleteCategory running...");
    console.log("req.url:", req.url);
    console.log("req.params:", req.params);
    const categories = await getCategories();
    const { category } = req.params;
    const input = { category };
    const deleteCategory = true;
    res.render("deleteCategory", {
      title: "Delete Category",
      categories,
      deleteCategory,
      input,
    });
  }),
  getDeleteItem: asyncHandler(async (req, res) => {
    console.log("getDeleteItem running...");
    console.log("req.url:", req.url);
    console.log("req.params:", req.params);
    const categories = await getCategories();
    const deleteItem = true;
    // Need to populate the inputs
    res.render("deleteItem", {
      title: "Delete Item",
      categories,
      deleteItem,
    });
  }),
  postDeleteCategory: asyncHandler(async (req, res) => {
    console.log("postDeleteCategory running...");
    console.log("req.url:", req.url);
    console.log("req.query:", req.query);
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);
  }),
  postDeleteItem: asyncHandler(async (req, res) => {
    console.log("postDeleteItem running...");
    console.log("req.url:", req.url);
    console.log("req.query:", req.query);
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);
  }),
};

module.exports = deleteController;

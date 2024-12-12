const asyncHandler = require("express-async-handler");
const {
  getItem,
  getItems,
  getCategories,
  deleteCategory,
  updateItems,
  getCategory,
} = require("../db/queries");

const editController = {
  getEditCategory: asyncHandler(async (req, res) => {
    console.log("getEditCategory running...");
    console.log("req.url:", req.url);
    console.log("req.params:", req.params);
    const categories = await getCategories();
    const { category } = req.params;
    const input = { category };
    const editCategory = true;
    res.render("editCategory", {
      title: "Edit Category",
      categories,
      editCategory,
      input,
    });
  }),
  getEditItem: asyncHandler(async (req, res) => {
    console.log("getEditItem running...");
    console.log("req.url:", req.url);
    console.log("req.params:", req.params);
    const categories = await getCategories();
    const item = await getItem(req.params);
    console.log(item);
    const editItem = true;
    res.render("editItem", {
      title: "Edit Item",
      categories,
      editItem,
      inputs: { ...item },
    });
  }),
  postEditCategory: asyncHandler(async (req, res) => {
    console.log("postEditCategory running...");
    console.log("req.url:", req.url);
    console.log("req.query:", req.query);
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);
    // If category does not change
    // If category is empty
    // If category is valid
  }),
  postEditItem: asyncHandler(async (req, res) => {}),
};

module.exports = editController;

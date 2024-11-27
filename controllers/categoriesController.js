const asyncHandler = require("express-async-handler");
const { getItems, getCategories, deleteCategory } = require("../db/queries");

const categoriesController = {
  getCategories: asyncHandler(async (req, res) => {
    console.log("getCategories running from categoriesController...");
    const categories = await getCategories();
    res.render("categories", { title: "Categories", categories });
  }),
  getCategoryItems: asyncHandler(async (req, res) => {
    // Need to select items from category
    console.log("getCategoryItems running...");
    const { category } = req.params;
    const categories = await getCategories();
    const items = await getItems(req.params);
    console.log(items);
    res.render("category", { title: category, category, categories, items });
  }),
  postCategoryDelete: asyncHandler(async (req, res) => {
    console.log("postCategoryDelete running...");
    console.log(req.url);
    console.log(req.params);
    const { category } = req.params;
    // Run db query to delete category
    await deleteCategory(category);
    // Redirect vs render
    res.redirect("/categories");
  }),
};

module.exports = categoriesController;

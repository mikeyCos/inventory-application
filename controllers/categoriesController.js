const asyncHandler = require("express-async-handler");
const { getCategories } = require("../db/queries");

const categoriesController = {
  getCategories: asyncHandler(async (req, res) => {
    console.log("getCategories running from categoriesController...");
    const categories = await getCategories();
    console.log(categories);
    res.render("categories", { title: "Categories", categories });
  }),
  getCategoryItems: asyncHandler(async (req, res) => {
    // Need to select items from category
    console.log(req.url);
    console.log(req.params);
    const { category } = req.params;
    const categories = await getCategories();
    res.render("category", { title: category, category, categories });
  }),
};

module.exports = categoriesController;

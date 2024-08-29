const asyncHandler = require("express-async-handler");

const categories = [
  "Beverages",
  "Bakery",
  "Canned",
  "Dairy",
  "Dry",
  "Frozen",
  "Meat",
  "Produce",
  "Other",
];

const categoriesController = {
  getCategoryItems: asyncHandler((req, res) => {
    // Need to select items from category
    console.log(req.url);
    console.log(req.params);
    const { category } = req.params;
    res.render("category", { title: category, category, categories });
  }),
};

module.exports = categoriesController;

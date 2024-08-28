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

const addController = {
  getAddCategory: asyncHandler((req, res) => {
    console.log("getAddCategory running...");
    res.render("addCategory", { title: "Add Category", categories });
  }),
  getAddItem: asyncHandler((req, res) => {
    res.render("addItem", { title: "Add Item", categories });
  }),
  postAddCategory: asyncHandler((req, res) => {}),
  postAddItem: asyncHandler((req, res) => {}),
};

module.exports = addController;

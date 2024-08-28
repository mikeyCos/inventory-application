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

const indexController = {
  getIndex: asyncHandler((req, res) => {
    console.log("getIndex running...");
    console.log("req.url", req.url);
    // Need to select categories from db
    res.render("index", { title: "Home", categories });
  }),
};

module.exports = indexController;

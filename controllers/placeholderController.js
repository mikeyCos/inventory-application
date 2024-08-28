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

const placeholderController = {
  getPlaceholder: asyncHandler(async (req, res) => {
    res.render("placeholderA", { title: "placeholderA", categories });
  }),
};

module.exports = placeholderController;

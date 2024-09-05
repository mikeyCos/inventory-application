const asyncHandler = require("express-async-handler");
const { getCategories } = require("../db/queries");

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
  getIndex: asyncHandler(async (req, res) => {
    console.log("getIndex running...");
    console.log("req.url", req.url);
    // Need to select categories from db
    const foo = await getCategories();
    console.log(foo);
    res.render("index", {
      title: "Home",
      categories,
      path: req.originalUrl,
      foo,
    });
  }),
};

module.exports = indexController;

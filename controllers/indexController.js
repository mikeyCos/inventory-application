const asyncHandler = require("express-async-handler");
const { getCategories } = require("../db/queries");

const indexController = {
  getIndex: asyncHandler(async (req, res) => {
    console.log("getIndex running...");
    console.log("req.url", req.url);
    // Need to select categories from db
    const categories = await getCategories();
    console.log(categories);
    res.render("index", {
      title: "Home",
      categories,
      path: req.originalUrl,
    });
  }),
};

module.exports = indexController;

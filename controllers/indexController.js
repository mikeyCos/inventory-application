const asyncHandler = require("express-async-handler");
const { getCategories } = require("../db/queries");

const indexController = {
  getIndex: asyncHandler(async (req, res) => {
    res.render("index", {
      title: "Home",
      path: req.originalUrl,
    });
  }),
};

module.exports = indexController;

const asyncHandler = require("express-async-handler");
const { getCategories } = require("../db/queries");

const placeholderController = {
  getPlaceholder: asyncHandler(async (req, res) => {
    res.render("placeholderA", { title: "placeholderA" });
  }),
};

module.exports = placeholderController;

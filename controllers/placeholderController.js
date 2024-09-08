const asyncHandler = require("express-async-handler");
const { getCategories } = require("../db/queries");

const placeholderController = {
  getPlaceholder: asyncHandler(async (req, res) => {
    const categories = await getCategories();
    res.render("placeholderA", { title: "placeholderA", categories });
  }),
};

module.exports = placeholderController;

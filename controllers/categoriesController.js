const asyncHandler = require("express-async-handler");

const categoriesController = {
  getCategoryItems: asyncHandler((req, res) => {
    // Need to select items from category
  }),
};

module.exports = categoriesController;

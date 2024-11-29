const asyncHandler = require("express-async-handler");
const { getItems, deleteItem } = require("../db/queries");

const itemsController = {
  getItems: async () => {},
  deleteItem: async () => {
    console.log("deleteItem running from itemsController.js...");
  },
  getUpdateItem: async () => {
    // Render form to update item
  },
  postUpdateItem: async () => {},
};

module.exports = itemsController;

const asyncHandler = require("express-async-handler");
const {
  getItems,
  getCategories,
  deleteCategory,
  updateItems,
  getCategory,
} = require("../db/queries");

const categoriesController = {
  getCategories: asyncHandler(async (req, res) => {
    console.log("getCategories running from categoriesController...");
    const categories = await getCategories();
    // https://stackoverflow.com/questions/59564689/how-to-make-an-modal-with-ejs-and-node
    console.log("req.url:", req.url);
    console.log("req.query:", req.query);
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);
    // res.render("categories", {
    //   title: "Categories",
    //   categories,
    //   clickHandler: "openModalHandler(openModal)",
    // });
    res.render("categories", {
      title: "Categories",
      categories,
    });
  }),
  getCategoryItems: asyncHandler(async (req, res) => {
    // Need to select items from category
    console.log("getCategoryItems running...");
    console.log("req.params:", req.params);
    const { category } = req.params;
    const categories = await getCategories();
    const items = await getItems(req.params);
    res.render("category", { title: category, category, categories, items });
  }),
};

module.exports = categoriesController;

const asyncHandler = require("express-async-handler");
const {
  getItems,
  getCategories,
  deleteCategory,
  updateItems,
} = require("../db/queries");

const categoriesController = {
  getCategories: asyncHandler(async (req, res) => {
    console.log("getCategories running from categoriesController...");
    const categories = await getCategories();
    // https://stackoverflow.com/questions/59564689/how-to-make-an-modal-with-ejs-and-node
    const showModal = !!req.query.modal;
    // const showModal = true;
    console.log("req.url:", req.url);
    console.log("req.query:", req.query);
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);
    console.log("showModal:", showModal);
    // res.render("categories", {
    //   title: "Categories",
    //   categories,
    //   clickHandler: "openModalHandler(openModal)",
    // });
    res.render("categories", {
      title: "Categories",
      categories,
      showModal,
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
  getCategoryDelete: asyncHandler(async (req, res) => {
    console.log("postCategoryDelete running...");
    console.log("req.url:", req.url);
    console.log("req.query:", req.query);
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);
  }),
  postCategoryDelete: asyncHandler(async (req, res) => {
    console.log("postCategoryDelete running...");
    console.log("req.url:", req.url);
    console.log("req.query:", req.query);
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);
    // Run db query to delete category
    // Which makes more sense, update items before deleting category or
    // deleting category before updating items?
    // How to show a confirmation modal?
    // Does it make sense to define a modal on the server side?
    // await updateItems(req.params);
    // await deleteCategory(req.params);
    // Redirect vs render
    res.redirect("/categories");
  }),
};

module.exports = categoriesController;

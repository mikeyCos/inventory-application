const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const {
  getItems,
  deleteCategory,
  updateCategory,
  updateItems,
  insertCategory,
  getCategory,
} = require("../db/queries");
const validateCategory = require("../validators/categoryValidator");
const validatePassword = require("../validators/passwordValidator");

const categoriesController = {
  getCategories: asyncHandler(async (req, res) => {
    console.log("getCategories running from categoriesController...");
    // https://stackoverflow.com/questions/59564689/how-to-make-an-modal-with-ejs-and-node
    console.log("req.url:", req.url);
    console.log("req.query:", req.query);
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);
    res.render("categories", {
      title: "Categories",
    });
  }),
  getCategoryItems: asyncHandler(async (req, res) => {
    // Need to select items from category
    console.log("getCategoryItems running...");
    console.log("req.params:", req.params);
    const { category } = req.params;
    const items = await getItems(req.params);
    res.render("category", { title: category, category, items });
  }),
  getAddCategory: asyncHandler(async (req, res) => {
    console.log("getAddCategory running...");
    console.log("req.originalUrl:", req.originalUrl);
    console.log("req.query:", req.query);
    res.render("addCategory", {
      title: "Add Category",
      action: "add",
      path: "category/add",
    });
  }),
  getDeleteCategory: asyncHandler(async (req, res) => {
    console.log("getDeleteCategory running...");
    console.log("req.url:", req.url);
    console.log("req.params:", req.params);
    const { category } = req.params;
    // Need to update all items impacted to 'unassigned' category
    // Need category id or category text
    console.log("category:", category);

    res.render("deleteCategory", {
      title: "Delete Category",
      inputs: { category },
      password: true,
      action: "delete",
      path: `category/delete/${category}`,
    });
  }),
  getEditCategory: asyncHandler(async (req, res) => {
    console.log("getEditCategory running...");
    console.log("req.url:", req.url);
    console.log("req.params:", req.params);
    const { category } = req.params;
    console.log(`edit/category/${category}`);
    res.render("editCategory", {
      title: "Edit Category",
      inputs: { category },
      password: true,
      action: "edit",
      path: `category/edit/${category}`,
    });
  }),
  postAddCategory: [
    validateCategory,
    asyncHandler(async (req, res) => {
      console.log("postAddCategory running...");
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const localErrors = errors.mapped();

        return res.status(400).render("addCategory", {
          title: "Add Category",
          errors: { ...localErrors },
          inputs: { ...req.body },
          action: "add",
          path: "add/category",
        });
      }

      await insertCategory(req.body);
      // Redirect to the "add category" page
      // Render successful message
      const foo = encodeURIComponent(JSON.stringify(req.body));
      res.redirect(`/category/add/?success=true&category=${foo}`);
      // res.redirect("/");
    }),
  ],
  postEditCategory: [
    validateCategory,
    validatePassword,
    asyncHandler(async (req, res) => {
      console.log("postEditCategory running...");
      const errors = validationResult(req);
      const { category } = req.params;

      if (!errors.isEmpty()) {
        const localErrors = errors.mapped();
        console.log(localErrors);
        return res.status(400).render("editCategory", {
          title: "Edit Category",
          errors: { ...localErrors },
          inputs: { ...req.body },
          password: true,
          action: "edit",
          path: `category/edit/${category}`,
          category,
        });
      }

      const { category: newCategory } = req.body;
      // Update existing category with new category
      await updateCategory({ prevCategory: category, newCategory });
      // Redirect to the categories page
      // Render successful message
      res.redirect("/categories");
    }),
  ],
  postDeleteCategory: [
    validatePassword,
    asyncHandler(async (req, res) => {
      console.log("postDeleteCategory running...");
      console.log("req.url:", req.url);
      console.log("req.query:", req.query);
      console.log("req.params:", req.params);
      console.log("req.body:", req.body);
      const errors = validationResult(req);
      const { category } = req.params;
      if (!errors.isEmpty()) {
        const localErrors = errors.mapped();
        console.log("localErrors:", localErrors);
        return res.status(400).render("deleteCategory", {
          title: "Delete Category",
          errors: { ...localErrors },
          inputs: { ...req.body },
          password: true,
          action: "delete",
          path: `category/delete/${category}`,
        });
      }

      // Need to delete category
      // Need to update all impacted items with new category
      console.log("Right before deleteCategory()");
      await deleteCategory({ category }, updateItems);
      // Redirect to the categories page
      // Render successful message
      res.redirect("/categories");
    }),
  ],
};

module.exports = categoriesController;

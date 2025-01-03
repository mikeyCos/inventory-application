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
    const { action } = req.query;
    const msg = `Category ${action === "edit" ? `updated` : `deleted`}`;

    res.render("categories", {
      title: "Categories",
      ...(action && { success: { msg } }),
    });
  }),
  getCategoryItems: asyncHandler(async (req, res) => {
    // Need to select items from category
    const { category } = req.params;
    const items = await getItems(req.params);
    const { action } = req.query;

    // What if category does not exist
    // Is a try...catch block needed?
    // What if item is edited?
    //  How to check what has changed
    // What if item is deleted?
    const msg = `Item ${action === "edit" ? `updated` : `deleted`}`;
    res.render("category", {
      title: category,
      category,
      items,
      ...(action && { success: { msg } }),
    });
  }),
  getAddCategory: asyncHandler(async (req, res) => {
    // Is a try...catch block needed?
    // What if req.success is a value other than 'true'?
    // What if category is not in the database?
    const { action } = req.query;
    res.render("addCategory", {
      title: "Add Category",
      action: "add",
      path: "category/add",
      active: true,
      ...(action && { success: { msg: "Category added" } }),
    });
  }),
  getEditCategory: asyncHandler(async (req, res) => {
    const { category } = req.params;

    res.render("editCategory", {
      title: "Edit Category",
      inputs: { category },
      password: true,
      action: "edit",
      path: `category/edit/${category}`,
    });
  }),
  getDeleteCategory: asyncHandler(async (req, res) => {
    const { category } = req.params;
    // Need to update all items impacted to 'unassigned' category
    // Need category id or category text

    res.render("deleteCategory", {
      title: "Delete Category",
      inputs: { category },
      password: true,
      action: "delete",
      path: `category/delete/${category}`,
    });
  }),
  postAddCategory: [
    validateCategory,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const localErrors = errors.mapped();

        return res.status(400).render("addCategory", {
          title: "Add Category",
          errors: { ...localErrors },
          inputs: { ...req.body },
          action: "add",
          path: "category/add",
        });
      }

      const { category } = req.body;
      await insertCategory({ category });
      res.redirect("/category/add?action=add");
    }),
  ],
  postEditCategory: [
    validateCategory,
    validatePassword,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      const { category } = req.params;

      if (!errors.isEmpty()) {
        const localErrors = errors.mapped();

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
      res.redirect("/categories?action=edit");
    }),
  ],
  postDeleteCategory: [
    validatePassword,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      const { category } = req.params;

      if (!errors.isEmpty()) {
        const localErrors = errors.mapped();

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
      await deleteCategory({ category }, updateItems);
      res.redirect("/categories?action=delete");
    }),
  ],
};

module.exports = categoriesController;

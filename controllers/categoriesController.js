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
const validateQuery = require("../validators/queryValidator");

const categoriesController = {
  getCategories: asyncHandler(async (req, res) => {
    console.log("getCategories running from categoriesController...");
    // https://stackoverflow.com/questions/59564689/how-to-make-an-modal-with-ejs-and-node
    console.log("req.url:", req.url);
    console.log("req.query:", req.query);
    console.log("req.params:", req.params);
    console.log("req.body:", req.body);

    const { success, category, newCategory } = req.query;
    // Is a try...catch block needed?
    // What if category is edited?
    // What if category is deleted?
    const msg = `${category} ${
      newCategory ? `changed to ${newCategory}` : "deleted"
    }`;

    res.render("categories", {
      title: "Categories",
      ...(success && { success: { msg } }),
    });
  }),
  getCategoryItems: asyncHandler(async (req, res) => {
    // Need to select items from category
    console.log("getCategoryItems running...");
    console.log("req.params:", req.params);
    const { category } = req.params;
    const items = await getItems(req.params);
    const { success, upc } = req.query;

    // Is a try...catch block needed?
    // What if item is edited?
    //  How to check what has changed
    // What if item is deleted?
    const msg = `${upc} deleted`;

    res.render("category", {
      title: category,
      category,
      items,
      ...(success && { success: { msg } }),
    });
  }),
  getAddCategory: [
    validateQuery,
    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      console.log("getAddCategory running...");
      console.log("getAddCategory errors:", errors);
      console.log("req.originalUrl:", req.originalUrl);
      console.log("req.query:", req.query);
      console.log("req.path:", req.path);
      // Is a try...catch block needed?
      // What if req.success is a value other than 'true'?
      // What if category is not in the database?
      if (!errors.isEmpty()) {
        // Render or redirect to a 404 page?
        // res.redirect("/");
        // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        // next("test");
      }

      const { success, category } = req.query;
      res.render("addCategory", {
        title: "Add Category",
        action: "add",
        path: "category/add",
        ...(success && { success: { msg: `${category} added` } }),
      });
    }),
  ],
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
      console.log("req.path:", req.path);
      console.log("req.route:", req.route);
      console.log("req.baseUrl:", req.baseUrl);
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

      const { category } = req.body;
      await insertCategory({ category });
      // Redirect to the "add category" page
      // Render successful message
      res.redirect(`/category/add?success=true&category=${category}`);
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
      res.redirect(
        `/categories?success=true&category=${category}&newCategory=${newCategory}`
      );
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
      res.redirect(`/categories?success=true&category=${category}`);
    }),
  ],
};

module.exports = categoriesController;

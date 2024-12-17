const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const {
  getItem,
  getItems,
  deleteCategory,
  updateCategory,
  updateItems,
  updateItem,
  getCategory,
} = require("../db/queries");
const validateCategory = require("../validators/categoryValidator");
const validatePassword = require("../validators/passwordValidator");
const validateItem = require("../validators/itemValidator");

const editController = {
  getEditCategory: asyncHandler(async (req, res) => {
    console.log("getEditCategory running...");
    console.log("req.url:", req.url);
    console.log("req.params:", req.params);
    const { category } = req.params;

    res.render("editCategory", {
      title: "Edit Category",
      inputs: { category },
      password: true,
      action: "edit",
    });
  }),
  getEditItem: asyncHandler(async (req, res) => {
    console.log("getEditItem running...");
    console.log("req.url:", req.url);
    console.log("req.params:", req.params);
    const item = await getItem(req.params);
    console.log(item);

    res.render("editItem", {
      title: "Edit Item",
      inputs: { ...item },
      password: true,
      action: "edit",
    });
  }),
  postEditCategory: [
    validateCategory,
    validatePassword,
    asyncHandler(async (req, res) => {
      console.log("postEditCategory running...");
      const errors = validationResult(req);
      const { category } = req.params;
      if (!errors.isEmpty()) {
        console.log("errors:", errors);
        const localErrors = errors
          .array()
          .reduce((accumulator, currentError) => {
            const { path, value, msg } = currentError;
            return { ...accumulator, [path]: { value, msg } };
          }, {});

        console.log("localErrors:", localErrors);
        return res.status(400).render("editCategory", {
          title: "Edit Category",
          errors: { ...localErrors },
          inputs: { ...req.body },
          password: true,
          action: "edit",
          category,
        });
      }

      // How to reference original category?
      // If password is incorrect, the original category is lost
      const { category: newCategory } = req.body;
      console.log(category);
      console.log(newCategory);
      await updateCategory({ prevCategory: category, newCategory });
      // Update existing category with new category
      // Need to update all impacted items with new category
      // await updateCategory({ category, newCategory })
      // Need to rerender add edit category page with inputs
      // Render successful message
      res.render("editCategory", {
        title: "Edit Category",
        inputs: { ...req.body },
        password: true,
        action: "edit",
      });
    }),
  ],
  postEditItem: [
    validateItem,
    validatePassword,
    asyncHandler(async (req, res) => {
      console.log("postEditCategory running...");
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors);
        const localErrors = errors
          .array()
          .reduce((accumulator, currentError) => {
            const { path, value, msg } = currentError;
            return { ...accumulator, [path]: { value, msg } };
          }, {});

        console.log(localErrors);
        return res.status(400).render("editItem", {
          title: "Edit Item",
          errors: { ...localErrors },
          inputs: { ...req.body },
          password: true,
          action: "edit",
        });
      }

      const categoryExists = await getCategory(req.body);
      console.log("categoryExists:", categoryExists);

      if (categoryExists) {
        console.log("category exists");
        // Insert item
        // await insertItem(req.body);
      } else {
        console.log("category does not exist");
        // Insert category
        // Insert item
        // await insertCategory(req.body);
        // await insertItem(req.body);
      }
      // Need to rerender add edit item page with inputs
      // Render successful message
      res.render("editItem", {
        title: "Edit Item",
        inputs: { ...req.body },
        password: true,
        action: "edit",
      });
    }),
  ],
};

module.exports = editController;

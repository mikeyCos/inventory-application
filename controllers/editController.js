const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const {
  getItem,
  getItems,
  deleteCategory,
  updateCategory,
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
    console.log(`edit/category/${category}`);
    res.render("editCategory", {
      title: "Edit Category",
      inputs: { category },
      password: true,
      action: "edit",
      path: `edit/category/${category}`,
    });
  }),
  getEditItem: asyncHandler(async (req, res) => {
    console.log("getEditItem running...");
    console.log("req.url:", req.url);
    console.log("req.params:", req.params);
    const item = await getItem(req.params);
    console.log(item);

    const { upc, category } = req.params;
    res.render("editItem", {
      title: "Edit Item",
      inputs: { ...item },
      password: true,
      action: "edit",
      path: `edit/item/${upc}/${category}`,
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
        const localErrors = errors.mapped();
        console.log("localErrors:", localErrors);
        return res.status(400).render("editCategory", {
          title: "Edit Category",
          errors: { ...localErrors },
          inputs: { ...req.body },
          password: true,
          action: "edit",
          path: `edit/category/${category}`,
          category,
        });
      }

      const { category: newCategory } = req.body;
      await updateCategory({ prevCategory: category, newCategory });
      // Update existing category with new category
      // Render successful message
      /* res.render("editCategory", {
        title: "Edit Category",
        inputs: { ...req.body },
        password: true,
        action: "edit",
        path: `edit/category/${category}`,
      }); */
      res.redirect("/");
    }),
  ],
  postEditItem: [
    validateItem,
    validatePassword,
    asyncHandler(async (req, res) => {
      console.log("postEditItem running...");
      const errors = validationResult(req);
      const { upc, category } = req.params;

      if (!errors.isEmpty()) {
        const localErrors = errors.mapped();
        console.log("localErrors:", localErrors);

        const customValidationResults = validationResult.withDefaults({
          formatter: (error) => {
            if (error)
              return {
                ...error,
              };
          },
        });

        const foo = customValidationResults(req);
        console.log(errors);
        console.log("foo:", foo.mapped());

        return res.status(400).render("editItem", {
          title: "Edit Item",
          errors: { ...localErrors },
          inputs: { ...req.body },
          password: true,
          action: "edit",
          path: `edit/item/${upc}/${category}`,
        });
      }

      const categoryExists = await getCategory({ itemExists });
      // If category does not exist
      //  Insert category
      console.log("categoryExists:", categoryExists);
      await updateItem({ ...req.body, prevUPC: upc });

      res.redirect("/");
    }),
  ],
};

module.exports = editController;
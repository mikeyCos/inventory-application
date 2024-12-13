const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const {
  getItem,
  getItems,
  getCategories,
  deleteCategory,
  updateItems,
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
    const categories = await getCategories();
    const { category } = req.params;
    // const editCategory = true;
    res.render("editCategory", {
      title: "Edit Category",
      categories,
      inputs: { category },
      password: true,
      action: "edit",
    });
  }),
  getEditItem: asyncHandler(async (req, res) => {
    console.log("getEditItem running...");
    console.log("req.url:", req.url);
    console.log("req.params:", req.params);
    const categories = await getCategories();
    const item = await getItem(req.params);
    console.log(item);
    res.render("editItem", {
      title: "Edit Item",
      categories,
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

      if (!errors.isEmpty()) {
        const categories = await getCategories();
        console.log(errors);
        const localErrors = errors
          .array()
          .reduce((accumulator, currentError) => {
            const { path, value, msg } = currentError;
            return { ...accumulator, [path]: { value, msg } };
          }, {});

        console.log(localErrors);
        return res.status(400).render("editCategory", {
          title: "Edit Category",
          errors: { ...localErrors },
          inputs: { ...req.body },
          categories,
          password: true,
          action: "edit",
        });
      }

      // await insertCategory(req.body);
      const categories = await getCategories();
      res.render("editCategory", {
        title: "Edit Category",
        categories,
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
        const categories = await getCategories();
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
          categories,
          password: true,
          action: "edit",
        });
      }

      // await insertCategory(req.body);
      const categories = await getCategories();
      res.render("editItem", {
        title: "Edit Item",
        categories,
        inputs: { ...req.body },
        password: true,
        action: "edit",
      });
    }),
  ],
};

module.exports = editController;

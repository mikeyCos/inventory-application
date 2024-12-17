const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const {
  getItem,
  getItems,
  getCategories,
  deleteCategory,
  deleteItem,
  getCategory,
} = require("../db/queries");
const validatePassword = require("../validators/passwordValidator");

const deleteController = {
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
      path: `delete/category/${category}`,
    });
  }),
  getDeleteItem: asyncHandler(async (req, res) => {
    console.log("getDeleteItem running...");
    console.log("req.url:", req.url);
    console.log("req.params:", req.params);
    const item = await getItem(req.params);
    // const category = await getCategory({ id: item.category_id });
    console.log("item:", item);
    // Need to populate the inputs
    // Need item data
    // Need category item is assigned to
    const { category, upc } = req.params;
    res.render("deleteItem", {
      title: "Delete Item",
      inputs: { ...item },
      password: true,
      action: "delete",
      path: `delete/item/${upc}/${category}`,
    });
  }),
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
        const localErrors = errors
          .array()
          .reduce((accumulator, currentError) => {
            const { path, value, msg } = currentError;
            return { ...accumulator, [path]: { value, msg } };
          }, {});

        return res.status(400).render("deleteCategory", {
          title: "Delete Category",
          errors: { ...localErrors },
          inputs: { ...req.body },
          password: true,
          action: "delete",
          path: `delete/category/${category}`,
        });
      }

      // Need to delete category
      // Need to update all impacted items with new category
      await deleteCategory({ category });
      // Need to go back to the categories page
      // Render successful message
      res.redirect("/");
      /* res.render("deleteCategory", {
        title: "Delete Category",
        categories,
        inputs: { ...req.body },
        password: true,
        action: "delete",
      }); */
    }),
  ],
  postDeleteItem: [
    validatePassword,
    asyncHandler(async (req, res) => {
      console.log("postDeleteCategory running...");
      console.log("req.url:", req.url);
      console.log("req.query:", req.query);
      console.log("req.params:", req.params);
      console.log("req.body:", req.body);
      const errors = validationResult(req);
      const { category, upc } = req.params;
      if (!errors.isEmpty()) {
        const localErrors = errors
          .array()
          .reduce((accumulator, currentError) => {
            const { path, value, msg } = currentError;
            return { ...accumulator, [path]: { value, msg } };
          }, {});

        return res.status(400).render("deleteItem", {
          title: "Delete Item",
          errors: { ...localErrors },
          inputs: { ...req.body },
          password: true,
          action: "delete",
          path: `delete/item/${upc}/${category}`,
        });
      }
      await deleteItem(req.body);
      // Need to go back to category page
      // Render successful message
      res.redirect("/");

      /* res.render("deleteItem", {
        title: "Delete Item",
        categories,
        inputs: { ...req.body },
        password: true,
        action: "delete",
      }); */
    }),
  ],
};

module.exports = deleteController;

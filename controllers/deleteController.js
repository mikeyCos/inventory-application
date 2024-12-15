const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const {
  getItem,
  getItems,
  getCategories,
  deleteCategory,
  deleteItem,
  updateItems,
  getCategory,
} = require("../db/queries");
const validatePassword = require("../validators/passwordValidator");

const deleteController = {
  getDeleteCategory: asyncHandler(async (req, res) => {
    console.log("getDeleteCategory running...");
    console.log("req.url:", req.url);
    console.log("req.params:", req.params);
    const categories = await getCategories();
    const { category } = req.params;
    // Need to update all items impacted to 'unassigned' category
    // Need category id or category text
    console.log("category:", category);

    res.render("deleteCategory", {
      title: "Delete Category",
      categories,
      inputs: { category },
      password: true,
      action: "delete",
    });
  }),
  getDeleteItem: asyncHandler(async (req, res) => {
    console.log("getDeleteItem running...");
    console.log("req.url:", req.url);
    console.log("req.params:", req.params);
    const categories = await getCategories();
    const item = await getItem(req.params);
    const category = await getCategory({ id: item.category_id });
    console.log("category:", category);
    console.log("item:", item);
    // Need to populate the inputs
    // Need item data
    // Need category item is assigned to
    res.render("deleteItem", {
      title: "Delete Item",
      categories,
      password: true,
      action: "delete",
      inputs: { ...item },
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

      if (!errors.isEmpty()) {
        const categories = await getCategories();
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
          categories,
          password: true,
          action: "delete",
        });
      }

      // Need to delete category
      // Need to update all impacted items with new category
      const { category } = req.params;
      // await updateItems({ category });
      const categories = await getCategories();
      // Need to go back to the categories page
      // Render successful message
      res.render("categories", {
        title: "Categories",
        categories,
      });

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

      if (!errors.isEmpty()) {
        const categories = await getCategories();
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
          categories,
          password: true,
          action: "delete",
        });
      }
      // await deleteItem(req.body);
      const { category } = req.body;
      const categories = await getCategories();
      // Need to go back to category page
      // Render successful message
      const items = await getItems(req.params);
      res.render("category", { title: category, category, categories, items });

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

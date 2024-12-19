const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const {
  getCategories,
  getCategory,
  insertCategory,
  insertItem,
} = require("../db/queries");
const validateCategory = require("../validators/categoryValidator");
const validateItem = require("../validators/itemValidator");

const addController = {
  getAddCategory: asyncHandler(async (req, res) => {
    console.log("getAddCategory running...");
    console.log("req.originalUrl:", req.originalUrl);
    res.render("addCategory", {
      title: "Add Category",
      action: "add",
      path: "add/category",
    });
  }),
  getAddItem: asyncHandler(async (req, res) => {
    res.render("addItem", {
      title: "Add Item",
      action: "add",
      path: "add/item",
    });
  }),
  postAddCategory: [
    validateCategory,
    asyncHandler(async (req, res) => {
      console.log("postAddCategory running...");
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors);
        const localErrors = errors.mapped();

        console.log(localErrors);
        return res.status(400).render("addCategory", {
          title: "Add Category",
          errors: { ...localErrors },
          inputs: { ...req.body },
          action: "add",
          path: "add/category",
        });
      }

      await insertCategory(req.body);
      // Need to rerender add category page with no inputs
      // Render successful message
      /* res.render("addCategory", {
        title: "Add Category",
        action: "add",
        path: "add/category",
      }); */
      res.redirect("/");
    }),
  ],
  postAddItem: [
    validateItem,
    asyncHandler(async (req, res) => {
      console.log("postAddItem running...");
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const localErrors = errors.mapped();

        console.log(errors);
        console.log("localErrors");
        console.log(localErrors);
        return res.status(400).render("addItem", {
          title: "Add Item",
          errors: { ...localErrors },
          inputs: { ...req.body },
          action: "add",
          path: "add/item",
        });
      }

      // categoryExists returns a category object or undefined
      // Do I need a try...catch block here?
      const categoryExists = await getCategory(req.body);
      console.log("categoryExists:", categoryExists);

      if (categoryExists) {
        console.log("category exists");
        // Insert item
        await insertItem(req.body);
      } else {
        console.log("category does not exist");
        // Insert category
        // Insert item
        // await insertCategory(req.body);
        // await insertItem(req.body);
      }

      // Need to rerender add item page with no inputs
      // Render successful message
      /* res.status(200).render("addItem", {
        title: "Add Item",
        inputs: { ...req.body },
        action: "add",
        path: "add/item",
      }); */
      res.redirect("/");
    }),
  ],
};

module.exports = addController;

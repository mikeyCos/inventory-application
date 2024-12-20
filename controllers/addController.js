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
    console.log("req.query:", req.query);
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
      // Need to rerender add category page with no inputs
      // Render successful message
      res.redirect(`/add/category/?success=true`);
      // res.redirect("/");
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

      // If category does not exist
      //  Insert category
      // Update Item
      // if (!categoryExists) await insertCategory(req.body);
      // await insertItem(req.body);
      // await insertItem({ ...req.body, quantity: null });
      console.log(req.body);

      // Need to rerender add item page with no inputs
      // Render successful message
      res.redirect("/");
      /* res.status(200).render("addItem", {
        title: "Add Item",
        inputs: { ...req.body },
        action: "add",
        path: "add/item",
      }); */
    }),
  ],
};

module.exports = addController;

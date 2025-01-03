const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const {
  getCategory,
  getItem,
  insertCategory,
  insertItem,
  updateItem,
  deleteItem,
} = require("../db/queries");
const validateItem = require("../validators/itemValidator");
const validatePassword = require("../validators/passwordValidator");

const itemsController = {
  getAddItem: asyncHandler(async (req, res) => {
    const { action } = req.query;

    res.render("addItem", {
      title: "Add Item",
      action: "add",
      path: "item/add",
      ...(action && { success: { msg: "Item added" } }),
    });
  }),
  getEditItem: asyncHandler(async (req, res) => {
    const item = await getItem(req.params);

    const { upc, category } = req.params;
    res.render("editItem", {
      title: "Edit Item",
      inputs: { ...item },
      password: true,
      action: "edit",
      path: `item/edit/${upc}/${category}`,
    });
  }),
  getDeleteItem: asyncHandler(async (req, res) => {
    const item = await getItem(req.params);
    const { category, upc } = req.params;

    res.render("deleteItem", {
      title: "Delete Item",
      inputs: { ...item },
      password: true,
      action: "delete",
      path: `item/delete/${upc}/${category}`,
    });
  }),
  postAddItem: [
    validateItem,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const localErrors = errors.mapped();

        return res.status(400).render("addItem", {
          title: "Add Item",
          errors: { ...localErrors },
          inputs: { ...req.body },
          action: "add",
          path: "item/add",
        });
      }

      // categoryExists returns a category object or undefined
      // Do I need a try...catch block here?
      const categoryExists = await getCategory(req.body);
      // If category does not exist
      //  Insert category
      // Update Item
      if (!categoryExists) await insertCategory(req.body);
      await insertItem(req.body);

      // Redirect to the "add item" page
      // Render successful message
      // res.redirect("/item/add");
      const { upc } = req.body;
      res.redirect("/item/add/?action=add");
    }),
  ],
  postEditItem: [
    validateItem,
    validatePassword,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      const { upc, category } = req.params;

      if (!errors.isEmpty()) {
        const localErrors = errors.mapped();

        return res.status(400).render("editItem", {
          title: "Edit Item",
          errors: { ...localErrors },
          inputs: { ...req.body },
          password: true,
          action: "edit",
          path: `item/edit/${upc}/${category}`,
        });
      }

      // If category does not exist
      //  Insert category
      // Update Item
      const categoryExists = await getCategory(req.body);
      if (!categoryExists) await insertCategory(req.body);
      await updateItem({ ...req.body, prevUPC: upc });

      // Redirect to the item's category page
      // Render successful message
      // res.redirect(`/category/${req.body.category}`);
      res.redirect(`/category/${req.body.category}/?action=edit`);
    }),
  ],
  postDeleteItem: [
    validatePassword,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      const { category, upc } = req.params;
      if (!errors.isEmpty()) {
        const localErrors = errors.mapped();

        return res.status(400).render("deleteItem", {
          title: "Delete Item",
          errors: { ...localErrors },
          inputs: { ...req.body },
          password: true,
          action: "delete",
          path: `item/delete/${upc}/${category}`,
        });
      }

      await deleteItem(req.body);
      // Need to go back to category page
      // Render successful message
      // res.redirect(`/category/${category}`);
      res.redirect(`/category/${req.body.category}/?action=delete`);
    }),
  ],
};

module.exports = itemsController;

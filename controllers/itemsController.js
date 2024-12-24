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
    const { success, upc } = req.query;

    // How to output added item's info on success page?
    res.render("addItem", {
      title: "Add Item",
      action: "add",
      path: "item/add",
      ...(success && { success: { msg: `${upc} added` } }),
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
      path: `item/edit/${upc}/${category}`,
    });
  }),
  getDeleteItem: asyncHandler(async (req, res) => {
    console.log("getDeleteItem running...");
    console.log("req.url:", req.url);
    console.log("req.params:", req.params);
    const item = await getItem(req.params);
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
      path: `item/delete/${upc}/${category}`,
    });
  }),
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
          path: "item/add",
        });
      }

      // categoryExists returns a category object or undefined
      // Do I need a try...catch block here?
      const categoryExists = await getCategory(req.body);
      console.log("categoryExists:", categoryExists);

      // If category does not exist
      //  Insert category
      // Update Item
      if (!categoryExists) await insertCategory(req.body);
      await insertItem(req.body);

      // Redirect to the "add item" page
      // Render successful message
      // res.redirect("/item/add");
      const { upc } = req.body;
      res.redirect(`/item/add/?added=true&upc=${upc}`);
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
        console.log("errors:", errors);
        console.log("localErrors:", localErrors);
        /* const customValidationResults = validationResult.withDefaults({
          formatter: (error) => {
            console.log("Inside formatter");
            console.log(error);
            if (error)
              return {
                ...error,
              };
          },
        });

        const foo = customValidationResults(req);
        const fooMapped = foo.mapped();
        console.log(fooMapped); */

        // console.log(errors);
        // console.log("foo:", foo.mapped());

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
      res.redirect(`/category/${req.body.category}/?edited=true&upc=${upc}`);
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
      res.redirect(`/category/${req.body.category}/?deleted=true&upc=${upc}`);
    }),
  ],
};

module.exports = itemsController;

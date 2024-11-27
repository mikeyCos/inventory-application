const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const {
  getCategories,
  getCategory,
  getItem,
  insertCategory,
  insertItem,
  updateItem,
} = require("../db/queries");
const foo = require("../db/queries");

const validateCategory = [
  body("category")
    .trim()
    .isLength({ min: 3, max: 20 })
    .isAlpha()
    .withMessage("Category input must be between 3 and 20 letters long."),
];

const validateItem = [
  body("category")
    .trim()
    .isAlpha()
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "Category input is optional. However, the value must be between 3 and 20 letters long."
    )
    .optional({ values: "falsy" }),
  body("item")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Item input must be between 3 and 30 characters long."),
  body("upc")
    .trim()
    .isNumeric()
    .isLength({ min: 10, max: 12 })
    .escape()
    .withMessage("UPC must be between 10 and 12 digits long."),
  body("quantity")
    .trim()
    .isInt({ min: 0, max: 999999 })
    .escape()
    .withMessage("Quantity must be between 0 and 999,999."),
  body("price")
    .trim()
    .isFloat({ min: 0.01, max: 999999 })
    .escape()
    .withMessage("Price must be between 0.01 and 999,999."),
];

const addController = {
  getAddCategory: asyncHandler(async (req, res) => {
    console.log("getAddCategory running...");
    console.log("req.originalUrl:", req.originalUrl);
    const categories = await getCategories();
    res.render("addCategory", {
      title: "Add Category",
      categories,
    });
  }),
  getAddItem: asyncHandler(async (req, res) => {
    const categories = await getCategories();
    res.render("addItem", { title: "Add Item", categories });
  }),
  postAddCategory: [
    validateCategory,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const categories = await getCategories();
        const localErrors = errors
          .array()
          .reduce((accumulator, currentError) => {
            const { path, value, msg } = currentError;
            return { ...accumulator, [path]: { value, msg } };
          }, {});

        return res.status(400).render("addCategory", {
          title: "Add Category",
          errors: { ...localErrors },
          input: { ...req.body },
          categories,
        });
      }

      const { category } = req.body;

      try {
        await insertCategory(req.body);
        const categories = await getCategories();
        res.render("addCategory", {
          title: "Add Category",
          categories,
        });
      } catch (err) {
        const categories = await getCategories();
        // Error code: 23505, duplicate unique constraint
        return res.status(400).render("addCategory", {
          title: "Add Category",
          errors: {
            category: {
              msg: `The "${category}" category already exists.`,
            },
          },
          input: { ...req.body },
          categories,
        });
      }
    }),
  ],
  postAddItem: [
    validateItem,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      const categories = await getCategories();
      if (!errors.isEmpty()) {
        const localErrors = errors
          .array()
          .reduce((accumulator, currentError) => {
            const { path, value, msg } = currentError;
            return { ...accumulator, [path]: { value, msg } };
          }, {});

        // console.log(errors);
        console.log("localErrors");
        console.log(localErrors);
        return res.status(400).render("addItem", {
          title: "Add Item",
          errors: { ...localErrors },
          inputs: { ...req.body },
          categories,
        });
      }

      console.log("postAddItem running...");
      console.log(req.body);
      try {
        // categoryExists and upcExists returns 0 or 1
        // 0 Indicates no result and 1 indicates existing result(s)
        const { rowCount: categoryExists } = await getCategory(req.body);
        const { rowCount: upcExists } = await getItem(req.body);
        console.log(categoryExists);
        console.log(upcExists);

        if (categoryExists && !upcExists) {
          console.log("category exists and upc does NOT exist");
          // Insert item
          await insertItem(req.body);
        } else if (!categoryExists && upcExists) {
          console.log("category does NOT exist and upc exists");
          // Insert category
          // Update item
          // await insertCategory(req.body);
          // await foo.updateItem(req.body);
          // Redirect user to an update page?
        } else if (categoryExists && upcExists) {
          console.log("category and upc both exist");
          // Update item
          // await foo.updateItem(req.body);
          // Redirect user to an update page?
        } else {
          console.log("category and upc both do NOT exist");
          // Insert category
          // Insert item
          await insertCategory(req.body);
          await insertItem(req.body);
        }

        // How to let the user know the item was successfully added?
        // res.redirect("/add/item");
        res.status(200).render("addItem", {
          title: "Add Item",
          inputs: { ...req.body },
          categories,
        });
      } catch (err) {
        console.log("err:");
        console.log(err);
        return res.status(400).render("addItem", {
          title: "Add Item",
          inputs: { ...req.body },
        });
      }
    }),
  ],
};

module.exports = addController;

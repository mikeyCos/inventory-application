const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const categories = [
  "Beverages",
  "Bakery",
  "Canned",
  "Dairy",
  "Dry",
  "Frozen",
  "Meat",
  "Produce",
  "Other",
];

const validateCategory = [
  body("category")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Category input must be between 3 and 20 characters long."),
];
const validateItem = [
  body("category")
    .trim()
    .isLength({ min: 3, max: 20 })
    .optional({ values: "falsy" })
    .withMessage(
      "Category input is optional. However, the value must be between 3 and 20 characters long."
    ),
  body("item")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Item input must be between 3 and 30 characters long."),
  body("upc")
    .trim()
    .isNumeric()
    .isLength({ min: 10, max: 12 })
    .withMessage("UPC must be between 10 and 12 digits long."),
  body("quantity")
    .trim()
    .isInt({ min: 0, max: 999999 })
    .withMessage("Quantity must be between 0 and 999,999."),
  body("price")
    .trim()
    .isFloat({ min: 0.01, max: 999999 })
    .withMessage("Price must be between 0.01 and 999,999."),
];

const addController = {
  getAddCategory: asyncHandler(async (req, res) => {
    console.log("getAddCategory running...");
    console.log("req.originalUrl:", req.originalUrl);
    res.render("addCategory", {
      title: "Add Category",
      categories,
    });
  }),
  getAddItem: asyncHandler(async (req, res) => {
    res.render("addItem", { title: "Add Item", categories });
  }),
  postAddCategory: [
    validateCategory,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
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
    }),
  ],
  postAddItem: [
    validateItem,
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const localErrors = errors
          .array()
          .reduce((accumulator, currentError) => {
            const { path, value, msg } = currentError;
            return { ...accumulator, [path]: { value, msg } };
          }, {});

        return res.status(400).render("addItem", {
          title: "Add Item",
          errors: { ...localErrors },
          inputs: { ...req.body },
          categories,
        });
      }
    }),
  ],
};

module.exports = addController;

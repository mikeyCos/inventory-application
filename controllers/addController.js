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
  body("category").trim().isLength({ min: 3, max: 20 }),
];
const validateItem = [
  body("category").trim().isLength({ min: 3, max: 20 }).optional(),
  body("item").trim().isLength({ min: 3, max: 30 }),
  body("upc").trim().isLength({ min: 10, max: 12 }),
  body("quantity").trim().isInt({ max: 999999 }),
  body("price").trim(),
];

const addController = {
  getAddCategory: asyncHandler((req, res) => {
    console.log("getAddCategory running...");
    res.render("addCategory", { title: "Add Category", categories });
  }),
  getAddItem: asyncHandler((req, res) => {
    res.render("addItem", { title: "Add Item", categories });
  }),
  postAddCategory: [
    validateCategory,
    asyncHandler((req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log("errors is NOT empty");
        return res.status(400).render("addCategory", {
          title: "Add Category",
          errors: errors.array(),
          categories,
        });
      }
    }),
  ],
  postAddItem: [
    validateItem,
    asyncHandler((req, res) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).render("addItem", {
          title: "Add Item",
          errors: errors.array(),
          categories,
        });
      }
    }),
  ],
};

module.exports = addController;

const { body } = require("express-validator");
const { getItem } = require("../db/queries");

const validateItem = [
  body("category")
    .trim()
    .default("Unassigned")
    .isAlpha()
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "Category input is optional and the value will default to 'Unassigned'. However, the value must be between 3 and 20 letters long."
    ),
  body("name")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Item name input must be between 3 and 30 characters long."),
  body("upc")
    .trim()
    .isLength({ min: 10, max: 12 })
    .escape()
    .withMessage("UPC must be between 10 and 12 digits long.")
    .bail()
    .custom(async (value, { req }) => {
      // Run custom validator for UPC if password input exists
      // Custom validators must return a truthy value to indicate that the field is valid, or falsy to indicate it's invalid.
      // https://express-validator.github.io/docs/guides/customizing
      const item = await getItem({ upc: value });
      // How to rewrite this?
      // Editing an item
      //  If password input exists
      //   If UPC is assigned to a different existing item
      //     Throw error
      // Adding an item
      //  If item exists
      //    Throw error
      if (req.body.password !== undefined) {
        if (item && item.upc !== req.params.upc) {
          throw new Error(
            "The UPC you entered belongs to an existing item, please edit that item instead or change the UPC."
          );
        }
      } else {
        if (item) {
          throw new Error(
            "This UPC already exists; change UPC or edit existing item."
          );
        }
      }
    }),
  body("quantity")
    .trim()
    .isInt({ min: 0, max: 999999 })
    .escape()
    .withMessage("Quantity must be between 0 and 999,999.")
    .optional({ values: "falsy" }),
  body("price")
    .optional({ values: "falsy" })
    .trim()
    .isFloat({ min: 0.01, max: 999999 })
    .escape()
    .withMessage("Price must be between 0.01 and 999,999."),
];

module.exports = validateItem;

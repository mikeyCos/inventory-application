const { body, validationResult } = require("express-validator");
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
    .isNumeric()
    .isLength({ min: 10, max: 12 })
    .escape()
    .withMessage("UPC must be between 10 and 12 digits long.")
    .bail()
    .custom(async (value, { req }) => {
      // Run custom validator for UPC if password input exists
      const item = await getItem({ upc: value });
      console.log("upc custom validator running...");
      // Need to rewrite this...
      if (req.body.password !== undefined) {
        // What if UPC is assigned to a different existing item?
        if (item && item.upc !== req.params.upc)
          throw new Error(
            "The UPC you entered belongs to an existing item, please edit that item instead."
          );
        return;
      }

      if (item) {
        throw new Error(
          "This UPC already exists; change UPC or edit existing item."
        );
      }
    }),
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

module.exports = validateItem;

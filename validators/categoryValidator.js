const { body } = require("express-validator");
const { getCategory } = require("../db/queries");

const validateCategory = [
  body("category")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Category must be between 3 and 20 characters long.")
    .bail()
    .isAlpha()
    .withMessage("Category must only contain letters.")
    .bail()
    .custom(async (value, { req }) => {
      // Is it okay to 'define' an object in a function call?
      const category = await getCategory({ category: value });
      if (category) {
        throw new Error(`The "${value}" category already exists.`);
      }
    }),
];
module.exports = validateCategory;

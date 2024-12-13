const { body } = require("express-validator");

const validatePassword = [
  body("password")
    .notEmpty()
    .withMessage(
      "A valid password is required to edit/delete this category/item."
    )
    .bail()
    .custom((value) => {
      return value === "test";
    })
    .withMessage("Invalid password. Please try again."),
];

module.exports = validatePassword;

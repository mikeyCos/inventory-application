const { body } = require("express-validator");

const validatePassword = [
  body("password")
    .trim()
    .custom((value, { req }) => {
      // If value is length of 0
      //  Throw a custom error message
      if (value.length > 0) return true;
      // Need to know if this is an edit or delete action
      // Need to know if this is for item or category
      throw new Error("Password cannot be empty.");
    })
    .bail()
    .custom((value) => {
      return value === "test";
    })
    .withMessage("Invalid password. Please try again."),
];

module.exports = validatePassword;

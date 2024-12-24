const { query } = require("express-validator");

// Which values are considered optional depends on options.values. By default, it's set to undefined:
// https://express-validator.github.io/docs/api/validation-chain#optional

// POST requests will need to define a success query
// Validate all other queries after success
const validateQuery = [
  query("success")
    .custom(async (value) => {
      console.log("validateQuery running...");
      console.log("value:", value);
      console.log("typeof value:", typeof value);
      console.log("value === undefined:", value === undefined);
      console.log("value === null:", value === null);
      // success must === 'true'
      return success === "true";
    })
    .optional()
    .withMessage("Invalid success value."),
  query("category").optional(),
  query("newCategory").optional(),
  query("upc").optional(),
];

module.exports = validateQuery;

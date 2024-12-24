const { oneOf, query } = require("express-validator");
const { getCategory, getItem } = require("../db/queries");
// Which values are considered optional depends on options.values. By default, it's set to undefined:
// https://express-validator.github.io/docs/api/validation-chain#optional

// POST requests will need to define a success query
// Validate all other queries after success

// If success query exists
// category
// UPC
/* const validateQuery = [
  query("category")
    .custom(async (value) => {
      console.log("validating category query...");
    })
    .optional(),
  query("upc")
    .custom(async (value) => {
      console.log("validating upc query...");
    })
    .optional(),
  query("success")
    .custom(async (value) => {
      console.log("validating success query...");
      console.log("value:", value);
      console.log("typeof value:", typeof value);
      console.log("value === undefined:", value === undefined);
      console.log("value === null:", value === null);
      console.log("value === 'true':", value === "true");
      console.log("value != 'true':", value != "true");
      // success must === 'true'
      // return value === "true";
      if (value != "true") throw new Error("Invalid success query");
    })
    .optional()
    .withMessage("Invalid success value."),
]; */

// If "success" query exists and it's value equals 'true'
// Then only "category" or "upc" must be valid
// How to handle invalid query keys?
const validateQuery = [
  query("success")
    .custom(async (value) => {
      console.log("validating success query...");
      console.log("value:", value);
      console.log("typeof value:", typeof value);
      console.log("value === undefined:", value === undefined);
      console.log("value === null:", value === null);
      console.log("value === 'true':", value === "true");
      console.log("value != 'true':", value != "true");

      // success must === 'true'
      // return value === "true";
      if (value !== "true") throw new Error("Invalid success query");
    })
    .optional(),
  oneOf(
    [
      query("category")
        .if(query("success").exists())
        .custom(async (category) => {
          console.log("validating category query...");
          const categoryExists = await getCategory({ category });
          if (!categoryExists) throw new Error("Invalid category query");
        }),
      query("upc")
        .if(query("success").exists())
        .custom(async (upc) => {
          console.log("validating upc query...");
          const itemExists = await getItem({ upc });
          if (!itemExists) throw new Error("Invalid upc query");
        }),
    ],
    { message: "Invalid category or UPC query" }
  ),
];
module.exports = validateQuery;
query("success");

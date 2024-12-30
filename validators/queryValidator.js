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
/* const validateQuery = [
  query("success")
    .if(query("category").exists() || query("upc").exists())
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
    }),
  oneOf(
    [
      query("category").custom(async (category) => {
        console.log("validating category query...");
        const categoryExists = await getCategory({ category });
        if (!categoryExists) throw new Error("Invalid category query");
      }),
      query("upc").custom(async (upc) => {
        console.log("validating upc query...");
        const itemExists = await getItem({ upc });
        if (!itemExists) throw new Error("Invalid upc query");
      }),
    ],
    { message: "Invalid category or UPC query" }
  ),
]; */

const actions = {};

// If "action" query exists and it's value equals 'add', 'edit', or 'delete'
// Then only "category" or "upc" must be valid
// How to handle invalid query keys?
const validateQuery = [
  query("action")
    .trim()
    .custom((value) => {
      // action's value can be 'add', 'edit', 'delete'
      const regex = new RegExp("(add|edit|delete)");
      const result = regex.test(value);
      console.log("result:", result);
      return result;
    }),
];

/* const validateQueryChain = [
  query().custom((value) => {
    console.log(value);
  }),
];

const validateQuery = (req, res, next) => {
  console.log("validateQuery running...");

  next();
}; */

module.exports = validateQuery;

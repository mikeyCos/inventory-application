const { validationResult, query } = require("express-validator");
// Which values are considered optional depends on options.values. By default, it's set to undefined:
// https://express-validator.github.io/docs/api/validation-chain#optional

// POST requests will need to define a success query
// Validate all other queries after success

// If "action" query exists and it's value equals 'add', 'edit', or 'delete'
// How to handle invalid query keys?

const validationChain = [
  query("action")
    .trim()
    .custom((value) => {
      // action's value can be 'add', 'edit', 'delete'
      const regex = new RegExp("(add|edit|delete)");
      const result = regex.test(value);
      return result;
    })
    .optional()
    .withMessage("Invalid action query"),
];

// Validate only when the length of req.query is greater than 0?
const validateQuery = [
  validationChain,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) next(errors);
    // Why does this not work?
    // validationResult(req).throw();

    next();
  },
];

module.exports = validateQuery;

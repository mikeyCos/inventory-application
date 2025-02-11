const { validationResult, param } = require("express-validator");
const { getCategory, getItem } = require("../db/queries");

const validationChain = [
  param("category").custom(async (category) => {
    const categoryExists = await getCategory({ category });
    if (!categoryExists)
      throw new Error(
        `Invalid category parameter. The category, "${category}" does not exist.`
      );
  }),
  param("upc")
    .custom(async (upc) => {
      const itemExists = await getItem({ upc });
      if (!itemExists)
        throw new Error(
          `Invalid UPC parameter. The UPC, ${upc}, does not exist.`
        );
    })
    .optional(),
];

// Validate routes with parameters
// Valid parameters: category and upc
const validateParams = async (req, res, next) => {
  for (const validation of validationChain) {
    const result = await validation.run(req);
    if (!result.isEmpty()) next(result);
  }

  next();
};

module.exports = validateParams;

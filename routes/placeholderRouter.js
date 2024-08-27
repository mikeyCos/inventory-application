const { Router } = require("express");
const { getPlaceholder } = require("../controllers/placeholderController");

const placeholderRouter = new Router();

placeholderRouter.get("/", getPlaceholder);

module.exports = placeholderRouter;

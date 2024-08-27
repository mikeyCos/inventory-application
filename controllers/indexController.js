const asyncHandler = require("express-async-handler");

const indexController = {
  getIndex: asyncHandler((req, res) => {
    console.log("getIndex running...");
    console.log("req.url", req.url);
    res.render("index", { title: "Home" });
  }),
};

module.exports = indexController;

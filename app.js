const express = require("express");
const { PORT } = require("./utils/environment");
const { staticPaths, viewsPaths } = require("./paths/paths");
const indexRouter = require("./routes/indexRouter");
const placeholderRouter = require("./routes/placeholderRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const addRouter = require("./routes/addRouter");
const editRouter = require("./routes/editRouter");
const deleteRouter = require("./routes/deleteRouter");
const { getCategories } = require("./db/queries");

const app = express();

// Specify static paths
app.use(staticPaths.map((path) => express.static(path)));

// Setting views
app.set("views", viewsPaths);
app.set("view engine", "ejs");

// Parses form data
app.use(express.urlencoded({ extended: true }));

// Specify routes
app.use("/", indexRouter);
app.use("/placeholderA", placeholderRouter);
app.use(["/category", "/categories"], categoriesRouter);
app.use("/add", addRouter);
app.use("/edit", editRouter);
app.use("/delete", deleteRouter);

app.use(async (req, res) => {
  console.log("404");
  const categories = await getCategories();
  res.render("404", { title: "404 - Page Not Found", categories });
});

// Error middleware function
app.use((err, req, res, next) => {
  console.log("error middleware running...");
  console.log(req.url);
});

app.listen(PORT, () => console.log(`Application running on port: ${PORT}`));

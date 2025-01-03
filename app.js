const express = require("express");
const { PORT } = require("./utils/environment");
const { staticPaths, viewsPaths } = require("./paths/paths");
const indexRouter = require("./routes/indexRouter");
const placeholderRouter = require("./routes/placeholderRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const itemsRouter = require("./routes/itemsRouter");
const { getCategories } = require("./db/queries");

const app = express();

// Specify static paths
app.use(staticPaths.map((path) => express.static(path)));

// Setting views
app.set("views", viewsPaths);
app.set("view engine", "ejs");

// Parses form data
app.use(express.urlencoded({ extended: true }));

// Application-level
app.use(async (req, res, next) => {
  // Sets categories in res.locals
  try {
    const categories = await getCategories();
    // About res.locals
    // https://expressjs.com/en/api.html#res.locals
    // What if getCategories fails?
    res.locals.categories = categories;
    next();
  } catch (err) {
    // Table does not exist
    // code: 42P01
    // Connection error
    // code: 'ECONNRESET'
    next(err);
  }
});

// Router-level
app.use("/", indexRouter);
app.use("/placeholderA", placeholderRouter);
app.use(["/category", "/categories"], categoriesRouter);
app.use(["/item"], itemsRouter);

// Middleware when no routes match
app.use((req, res) => {
  res.render("404", { title: "404 - Page Not Found" });
});

// Error-handling
app.use((err, req, res, next) => {
  res.render("404", { title: "404 - Page Not Found" });
});

app.listen(PORT, () => console.log(`Application running on port: ${PORT}`));

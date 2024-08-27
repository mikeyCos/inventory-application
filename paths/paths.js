const path = require("path");

const rootPath = path.join(__dirname, "..");

const publicPath = path.join(rootPath, "public");
const utilsPath = path.join(rootPath, "utils");

// Subdirectories in views directory
const viewsPagesPath = path.join(rootPath, "views/pages");
const viewsPartialsPath = path.join(rootPath, "views/partials");

const staticPaths = [publicPath, utilsPath];
const viewsPaths = [viewsPagesPath, viewsPartialsPath];

module.exports = {
  staticPaths,
  viewsPaths,
};

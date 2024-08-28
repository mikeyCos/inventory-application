let categories = [];

const loadCategories = () => {
  console.log("loadCategories running...");
  categories = [
    "Beverages",
    "Bakery",
    "Canned",
    "Dairy",
    "Dry",
    "Frozen",
    "Meat",
    "Produce",
    "Other",
  ];
};

module.exports = {
  loadCategories,
  categories,
};

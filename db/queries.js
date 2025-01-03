const pool = require("./pool");

// How to use 'this' keyword inside the queries object?
const getCategories = async () => {
  const { rows: categories } = await pool.query(
    `
      SELECT * FROM categories;
      `
  );

  return categories;
};

const getCategory = async ({ category, category_id }) => {
  const {
    rows: [categoryObj],
  } = await pool.query(
    `
      SELECT * FROM categories
      WHERE category = LOWER($1) OR id = $2;
      `,
    [category, category_id]
  );

  return categoryObj;
};

const getItem = async ({ upc }) => {
  // Performs a nested destructure to get the first item of the rows array
  const {
    rows: [item],
  } = await pool.query(
    `
      SELECT * FROM items
      LEFT JOIN categories
      ON items.category_id = categories.id
      WHERE upc = $1;
      `,
    [upc]
  );

  return item;
};

const getItems = async ({ category }) => {
  const { rows } = await pool.query(
    `
      SELECT * FROM items
      WHERE category_id = (SELECT id FROM categories
      WHERE category = LOWER($1));
      `,
    [category]
  );

  return rows;
};

const insertCategory = async ({ category }) => {
  // What if category already exists?
  await pool.query(
    `
      INSERT INTO categories (category)
      VALUES (LOWER($1));
      `,
    [category]
  );
};

const insertItem = async ({ category, name, upc, quantity, price }) => {
  await pool.query(
    `
      INSERT INTO items (category_id, name, upc, quantity, price)
      VALUES ((SELECT id FROM categories WHERE category = LOWER($1)), $2, $3, $4, $5);
      `,
    [category, name, upc, quantity || null, price || null]
  );
};

const updateCategory = async ({ prevCategory, newCategory }) => {
  // Update existing category with new category
  await pool.query(
    `
      UPDATE categories
      SET category = $2
      WHERE category = $1
    `,
    [prevCategory, newCategory]
  );
};

const updateItem = async ({
  category,
  name,
  upc,
  quantity,
  price,
  prevUPC,
}) => {
  await pool.query(
    `
      UPDATE items
      SET category_id = (SELECT id FROM categories WHERE category = LOWER($1)), name = $2, upc = $3, quantity = $4, price = $5
      WHERE upc = $6;
      `,
    [category, name, upc, quantity || null, price || null, prevUPC]
  );
};

const updateItems = async ({ prevCategory, newCategory = "unassigned" }) => {
  // Update category_id column for all items of category to newCategory
  // newCategory defaults to 'unassigned'
  await pool.query(
    `
      UPDATE items
      SET category_id = (SELECT id FROM categories WHERE category = $1) 
      WHERE NOT EXISTS (SELECT 1 FROM categories WHERE categories.id = items.category_id);
      `,
    [newCategory]
  );
};

const deleteCategory = async ({ category }, callback) => {
  // Does passing updateItems function as a callback make this module more loosely coupled?
  // If updateItems function was called directly here, will this make the module more tightly coupled?
  await pool.query(
    `
      DELETE FROM categories
      WHERE category = LOWER($1)
      `,
    [category]
  );

  await callback({ prevCategory: category });
};

const deleteItem = async ({ upc }) => {
  await pool.query(
    `
      DELETE FROM items
      WHERE upc = $1
      `,
    [upc]
  );
};

module.exports = {
  getCategories,
  getCategory,
  getItem,
  getItems,
  getItems,
  insertCategory,
  insertItem,
  updateCategory,
  updateItem,
  updateItems,
  deleteCategory,
  deleteItem,
};

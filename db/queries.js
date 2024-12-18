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
  console.log("getItem query running...");
  console.log("upc:", upc);
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
  // What if item (based on UPC) already exists?
  // What if item (based on UPC) already exists and the category is different?
  // Need to assign the corresponding category id from the categories table
  // If there is no category, category will be 'unassigned'

  // If category exists and upc does not exist
  //  Insert item and select category
  /* 
      INSERT INTO items (category_id, name, upc, quantity, price)
      VALUES ((SELECT id FROM categories WHERE category = LOWER($1)), $2, $3, $4, $5);
    */
  // If category does not exist and upc exists
  //  Insert category into the categories table
  //  Update item
  /* 
      INSERT INTO categories (category)
      VALUES (LOWER($1));
      UPDATE items
      SET category_id = (SELECT category_id FROM categories WHERE category = LOWER($1))
      WHERE upc = $3;
     */
  // If category and upc both exist
  //  Update item
  /* 
      UPDATE items
      SET category_id = (SELECT category_id FROM categories WHERE category = LOWER($1))
      WHERE upc = $3;
    */
  // If category and upc both do not exist
  //  Insert category into the categories table
  //  Insert item
  /*
      INSERT INTO categories (category)
      VALUES (LOWER($1));
      INSERT INTO items (category_id, name, upc, quantity, price)
      VALUES ((SELECT category_id FROM categories WHERE category = LOWER($1)), $2, $3, $4, $5);
    */
  console.log("insertItem running...");
  console.log("category:", category);
  console.log("upc:", upc);

  await pool.query(
    `
      INSERT INTO items (category_id, name, upc, quantity, price)
      VALUES ((SELECT id FROM categories WHERE category = LOWER($1)), $2, $3, $4, $5);
      `,
    [category, name, upc, quantity, price]
  );

  console.log("insertItem query completed...");
};

const updateCategory = async ({ prevCategory, newCategory }) => {
  console.log("updateCategory running...");
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
  console.log("updateItem query running...");
  console.log("prevCategory:", category);
  console.log("name:", name);
  console.log("upc:", upc);
  console.log("quantity:", quantity);
  console.log("price:", price);
  console.log("prevUPC:", prevUPC);
  /* await pool.query(
    `
      UPDATE items
      SET category_id = (SELECT id FROM categories WHERE category = LOWER($1)), name = $2, upc = $3, quantity = $4, price = $5
      WHERE upc = $6;
      `,
    [category, name, upc, quantity, price, prevUPC]
  ); */
};

const updateItems = async ({ prevCategory, newCategory = "unassigned" }) => {
  console.log("updateItems running...");
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
  console.log("deleteCategory running...");
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
  console.log("deleteItem query running...");
  console.log("upc:", upc);

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

const pool = require("./pool");

// How to use 'this' keyword inside the queries object?

const queries = {
  getCategories: async () => {
    const { rows: categories } = await pool.query(
      `
      SELECT * FROM categories;
      `
    );

    return categories;
  },
  getCategory: async ({ category, id }) => {
    const {
      rows: [categoryObj],
    } = await pool.query(
      `
      SELECT * FROM categories
      WHERE category = LOWER($1) OR id = $2;
      `,
      [category, id]
    );

    return categoryObj;
  },
  getItem: async ({ upc }) => {
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
  },
  getItems: async ({ category }) => {
    const { rows } = await pool.query(
      `
      SELECT * FROM items
      WHERE category_id = (SELECT id FROM categories
      WHERE category = LOWER($1));
      `,
      [category]
    );

    return rows;
  },
  insertCategory: async ({ category }) => {
    // What if category already exists?
    await pool.query(
      `
      INSERT INTO categories (category)
      VALUES (LOWER($1));
      `,
      [category]
    );
  },
  insertItem: async ({ category, name, upc, quantity, price }) => {
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
  },
  updateItem: async ({ category, name, upc, quantity, price }) => {
    await pool.query(
      `
      UPDATE items
      SET category_id = (SELECT id FROM categories WHERE category = LOWER($1)), name = $2, upc = $3, quantity = $4, price = $5
      WHERE upc = $3;
      `,
      [category, item, upc, quantity, price]
    );
  },
  updateItems: async ({ category }) => {
    console.log("updateItems running...");
    // Change category for all items of category to 'unassigned'
    /* 
    SELECT * FROM items
    INNER JOIN categories
    ON items.category_id = categories.id;
    */
    await pool.query(
      `
      UPDATE items
      SET category_id = (SELECT id FROM categories WHERE category = 'unassigned') 
      WHERE (SELECT id FROM categories WHERE category = LOWER($1)) = category_id;
      `,
      [category]
    );
  },
  deleteCategory: async ({ category }) => {
    console.log("deleteCategory running...");

    await pool.query(
      `
      DELETE FROM categories
      WHERE category = LOWER($1)
      `,
      [category]
    );
  },
  deleteItem: async () => {
    console.log("deleteItem running...");
  },
};

module.exports = queries;

const pool = require("./pool");

// How to use 'this' keyword inside the queries object?

const queries = {
  getCategories: async () => {
    const { rows } = await pool.query(
      `
      SELECT * FROM categories;
      `
    );

    return rows;
  },
  getCategory: async ({ category }) => {
    const result = await pool.query(
      `
      SELECT id FROM categories
      WHERE category = LOWER($1);
      `,
      [category]
    );

    return result;
  },
  getItem: async ({ upc }) => {
    const result = await pool.query(
      `
      SELECT * FROM items
      WHERE upc = $1;
      `,
      [upc]
    );

    return result;
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
  insertItem: async ({ category, item, upc, quantity, price }) => {
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
    /* const result = await pool.query(
      `
    IF (NOT EXISTS(SELECT * FROM items WHERE upc = $3) AND EXISTS(SELECT * FROM categories WHERE category = $1))
    BEGIN
      INSERT INTO items (category_id, name, upc, quantity, price)
      VALUES ((SELECT id FROM categories WHERE category = LOWER($1)), $2, $3, $4, $5);
    END
    ELSE IF (NOT EXISTS(SELECT * FROM categories WHERE category = LOWER($1)) AND EXISTS(SELECT * FROM items WHERE upc = $3))
    BEGIN
      INSERT INTO categories (category)
      VALUES (LOWER($1));
      UPDATE items
      SET category_id = (SELECT category_id FROM categories WHERE category = LOWER($1))
      WHERE upc = $3;
    END
    ELSE IF (EXISTS(SELECT * FROM categories WHERE category = LOWER($1)) AND EXISTS(SELECT * FROM items WHERE upc = $3))
    BEGIN
      UPDATE items
      SET category_id = (SELECT category_id FROM categories WHERE category = LOWER($1))
      WHERE upc = $3;
    END
    ELSE
    BEGIN
      INSERT INTO categories (category)
      VALUES (LOWER($1));
      INSERT INTO items (category_id, name, upc, quantity, price)
      VALUES ((SELECT category_id FROM categories WHERE category = LOWER($1)), $2, $3, $4, $5);
    END
    `,
      [category, item, upc, quantity, price]
    ); */
    // SELECT * FROM items WHERE upc = $3 returns an

    await pool.query(
      `
      INSERT INTO items (category_id, name, upc, quantity, price)
      VALUES ((SELECT id FROM categories WHERE category = LOWER($1)), $2, $3, $4, $5);
      `,
      [category, item, upc, quantity, price]
    );

    console.log("insertItem query completed...");
  },
  updateItem: async ({ category, item, upc, quantity, price }) => {
    await pool.query(
      `
      UPDATE items
      SET category_id = (SELECT id FROM categories WHERE category = LOWER($1)), name = $2, upc = $3, quantity = $4, price = $5
      WHERE upc = $3;
      `,
      [category, item, upc, quantity, price]
    );
  },
  deleteCategory: async (category) => {
    console.log("deleteCategory running...");
    // What if category does not exist?
    // Change category for all items of category to 'unassigned'
    const { rowCount } = await pool.query(
      `
      DELETE FROM categories
      WHERE category = ($1);
      `,
      [category]
    );
    console.log(rowCount);
  },
  deleteItem: async () => {},
};

module.exports = queries;

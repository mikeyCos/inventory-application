const pool = require("./pool");

// How to use 'this' keyword inside the queries object?
const queries = {
  async getCategories() {
    const { rows: categories } = await pool.query(
      `
      SELECT * FROM categories;
      `
    );

    return categories;
  },
  async getCategory({ category, id }) {
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
  async getItem({ upc }) {
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
  async getItems({ category }) {
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
  async insertCategory({ category }) {
    // What if category already exists?
    await pool.query(
      `
      INSERT INTO categories (category)
      VALUES (LOWER($1));
      `,
      [category]
    );
  },
  async insertItem({ category, name, upc, quantity, price }) {
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
  async updateCategory({ category, newCategory }) {},
  async updateItem({ category, name, upc, quantity, price }) {
    await pool.query(
      `
      UPDATE items
      SET category_id = (SELECT id FROM categories WHERE category = LOWER($1)), name = $2, upc = $3, quantity = $4, price = $5
      WHERE upc = $3;
      `,
      [category, name, upc, quantity, price]
    );
  },
  async updateItems({ category, newCategory = "unassigned" }) {
    console.log("updateItems running...");
    // Change category for all items of category to newCategory
    // newCategory defaults to 'unassigned'
    /* 
    SELECT * FROM items
    INNER JOIN categories
    ON items.category_id = categories.id;
    */

    console.log("category:", category);
    console.log("newCategory:", newCategory);

    /* await pool.query(
      `
      UPDATE items
      SET category_id = (SELECT id FROM categories WHERE category = $2) 
      WHERE (SELECT id FROM categories WHERE category = LOWER($1)) = category_id;
      `,
      [category, newCategory]
    ); */
  },
  async deleteCategory({ category }) {
    console.log("deleteCategory running...");

    await pool.query(
      `
      DELETE FROM categories
      WHERE category = LOWER($1)
      `,
      [category]
    );
  },
  async deleteItem({ upc }) {
    console.log("deleteItem query running...");
    console.log("upc:", upc);

    await pool.query(
      `
      DELETE FROM items
      WHERE upc = $1
      `,
      [upc]
    );
  },
};

module.exports = queries;

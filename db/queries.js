const pool = require("./pool");

const queries = {
  getCategories: async () => {
    const { rows } = await pool.query(`
      SELECT * FROM categories
    `);

    return rows;
  },
  getCategory: async (categoryID) => {
    const { rows } = await pool.query(`

    `);

    return rows;
  },
  getItems: async ({ category }) => {},
  insertCategory: async ({ category }) => {
    // What if category already exists?
    await pool.query(
      `
      INSERT INTO categories (category)
      VALUES ($1);
    `,
      [category]
    );
  },
  insertItem: async ({ category }) => {
    // What if item (based on UPC) already exists?
    // What if item (based on UPC) already exists and the category is different?
    // Need to assign the corresponding category id from the categories table
    // If there is no category, category will be 'unassigned'
  },
  deleteCategory: async ({ category }) => {
    // What if category does not exist?
  },
  deleteItem: async () => {},
};

module.exports = queries;

const { Client } = require("pg");
const { DATABASE_URL } = require("../utils/environment");
/*
 * Groceries business
 * Table: Categories
 *  Columns: id, category
 *  Beverages
 *  Bakery
 *  Canned
 *  Dairy
 *  Dry
 *  Meat
 *  Frozen
 *  Produce
 *  Other
 *  Unassigned (?)
 * Table: Items
 *  Columns: category_id, name, upc, quantity, price
 */

const CATEGORIES_SQL = `
  DROP TABLE IF EXISTS categories;

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category VARCHAR(20) NOT NULL,
    UNIQUE (category)
  );

  INSERT INTO categories (category)
  VALUES ('unassigned'),
  ('beverages'),
  ('bakery'),
  ('canned'),
  ('dairy'),
  ('dry'),
  ('frozen'),
  ('meat'),
  ('produce'),
  ('other');
`;

const ITEMS_SQL = `
  DROP TABLE IF EXISTS items;

  CREATE TABLE IF NOT EXISTS items (
    category_id INTEGER,
    name VARCHAR(30),
    upc BIGINT,
    quantity INTEGER,
    price DECIMAL(4, 2),
    CONSTRAINT uq_item UNIQUE (name, upc)
  );

  INSERT INTO items (category_id, name, upc, quantity, price)
  VALUES ((SELECT id FROM categories WHERE category = 'bakery'), 'Test', 123456789012, 2, 3.99),
  ((SELECT id FROM categories WHERE category = 'unassigned'), 'Foo', 987654321012, 20, 5.49),
  ((SELECT id FROM categories WHERE category = 'produce'), 'Bar', 987654321021, 17, 12);
`;

const initDB = async () => {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  await client.connect();
  await client.query(CATEGORIES_SQL);
  await client.query(ITEMS_SQL);
  await client.end();
};

// console.log(DATABASE_URL);
initDB();

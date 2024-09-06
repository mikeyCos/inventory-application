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
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category VARCHAR(20)
  );

  INSERT INTO categories (category)
  VALUES ('Unassigned'),
  ('Beverages'),
  ('Bakery'),
  ('Canned'),
  ('Dairy'),
  ('Dry'),
  ('Frozen'),
  ('Meat'),
  ('Produce'),
  ('Other');
`;

/* const ITEMS_SQL = `
  CREATE TABLE IF NOT EXISTS items (
    category_id INTEGER(2),
    name VARCHAR(30),
    upc INTEGER(12),
    quantity INTEGER(6),
    price FLOAT(42)
  );

  INSERT INTO items (category_id, name, upc, quantity, price)
  VALUES (1, 'Test', 123456789012, 2, 3.99),
  (1, 'Foo', 987654321012, 20, 5.49),
  (4, 'Bar', 987654321021, 17, 12.99);
`; */

const ITEMS_SQL = `
  CREATE TABLE IF NOT EXISTS items (
    category_id INTEGER,
    name VARCHAR(30),
    upc BIGINT,
    quantity INTEGER,
    price DECIMAL(4, 2)
  );

  INSERT INTO items (category_id, name, upc, quantity, price)
  VALUES (1, 'Test', 123456789012, 2, 3.99),
  (1, 'Foo', 987654321012, 20, 5.49),
  (4, 'Bar', 987654321021, 17, 12);
`;

const initDB = async () => {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  await client.connect();
  // await client.query(CATEGORIES_SQL);
  await client.query(ITEMS_SQL);
  await client.end();
};

// console.log(DATABASE_URL);
initDB();

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

  INSERT INTO categories
  VALUES ('Beverages'),
  ('Bakery'),
  ('Canned'),
  ('Dairy'),
  ('Dry'),
  ('Frozen'),
  ('Meat'),
  ('Produce'),
  ('Other');
`;

# Changelog
---
### 07 SEP 2024
- 
---
### 05 SEP 2024
- Defined `ITEMS_SQL` string variable in `initdb` module.
---
### 04 SEP 2024
- Created skeleton methods in `queries` module.
---
### 03 SEP 2024
- Attached Fly Postgres cluster to application; `DATABASE_URL` will be used in development and production.
- Initialized a `categories` table with nine different rows in the Postgres database.
- Created `getCategories` in `queries` module; selects all rows in the `categories` table.
---
### 29 AUG 2024
- Created a screen breakpoint of `481px` for the `header` partial view and `add*` pages.
- Currently, `addCategory` and `addItem` views use conditionals to render an input's error.
- Errors from `validationResult(req)` are reduced to an object; the error's `path` will be an object property with `value` and `msg` properties.
- Created `add` stylesheet for styling `addCategory` and `addItem` views.
---
### 28 AUG 2024
- Clicking on a category revealed by hovering over `Shop By Category` will render the `category` view.
- Temporarily commented out `include('./items')` in the `category` view.
- Created and defined attributes for labels and inputs for `addItem` and `addRouter` views.
- Added `post` route method to `addRouter`; submitting the category or item forms will use the `post` method.
---
### 27 AUG 2024
- Initial commit for `inventory-application` project.
- Created `addCategory`, `addItem`, `category`, `item`, `categories`, `itemPreview`, and `items` views.
- Hovering over `Shop By Category` will reveal the categories.
- Temporarily defined a categories variable in each controllers.
---
### 26 AUG 2024
- Initialized `NodeJS`/`Express` boilerplate template named `node-express-template`.
- Created a variety of files including: `CHANGELOG.md`, `app.js`, and `PROJECT_SPECIFICATIONS`.
- Created a variety of subdirectories including: `paths`, `public`, `routes`, `utils`, and `views`.
- Template can be locally started with `npm run dev`.
- Defined static and non-static paths in `paths/paths.js`.
- Created and linked a `reset` stylesheet.
---
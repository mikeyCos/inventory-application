# Changelog
---
###
---
### 11 DEC 2024
- Corrected date of previous log from `19 DEC 2924` to `10 DEC 2024`.
- Created edit controller and router.
- Created delete controller and router.
- Created `deleteCategory`, `deleteItem`, `editCategory`, and `editItem` pages.
- A password input added for delete and edit pages.
- Added additional `withMessage()` to `validateCategory` array in `addController` module.
- Deleting a category or item will render disabled inputs.
- Currently, editing or deleting an item do not populate the inputs with respective values.
---
### 10 DEC 2024
- Replaced edit and delete button elements with anchor elements.
- Edit and delete anchor elements now route to a edit or delete page.
- Moved `categories.css` from `categories.ejs` page into the `head.ejs` partial.
- The category edit page will render a form with `action="/edit/category"` and a password input.
---
### 09 DEC 2024
- Corrected date of previous log from `05 NOV 2024` to `06 DEC 2024`.
- Clicking a button when the modal is open appends to the current URL string; for example, `/categories/delete/confirm/categories/delete/confirm/2?modal=open`.
- Opened modal cannot be closed with `ESC` key.
---
### 05 DEC 2024
- Created `categories.css` stylesheet.
- Attempted send a get request by form buttons to render a opened modal.
- Currently, edit and delete buttons do not do anything.
- Moved form elements next to the anchor element in the `categories` partial.
---
### 29 NOV 2024
- Created `events` subdirectory.
- Created `modal.ejs`.
- The item's `category_id` value are randomly assigned in `initdb` module.
- Defined `eventsPath` in `paths` module.
- Clicking the trashcan icon will now open the dialog element.
---
### 28 NOV 2024
- Created `itemForm.ejs`.
- Created `deleteCategory` and `updateItems` query methods in `queries` module.
- Clicking on the trashcan icon will delete it's respective category and impacted items are reassigned to the `unassigned` category.
---
### 27 NOV 2024
- Added `edit.svg` to `icons` subdirectory.
- The categories and items tables will be deleted when `node db/initdb.js` is ran in the terminal.
---
### 26 NOV 2024
- Currently, adding an item where the category exists or does not exist and the UPC does exists will update the existing item based on the UPC.
- Navigating to a category will render items assigned to it's respective category.
- Renamed `rowCount` property for `getCategory` and `getItem` resulting objects to ``categoryExists` and `upcExists` respectively.
- Created `getCategory`, `getItem`, and `updateItem` query methods in `queries` module. 
- Deleted `item.ejs` and `itemPreview.ejs` files.
- Attempted implementing `IF...ELSE IF` for the `insertItem` query.
---
### 07 SEP 2024
- Each controller calls `getCategories` from the `queries` module.
- Clicking on `Browse By Category` will direct a user to the `categories` page.
- A category can be created on the `addCategory` page.
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
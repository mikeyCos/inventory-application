# Changelog
---
### 19 DEC 2024
- 
---
### 18 DEC 2024
- Changed the way form inputs' values are assigned; for example, from `value="<%= locals.inputs ? inputs.quantity: '' %>"` to `value="<%= locals.inputs?.quantity ?? '' %>"`.
- On `POST` requests, changed chaining functions with built-in `Result` method, `mapped`. For example, from
  ```js
  const localErrors = errors
    .array()
    .reduce((accumulator, currentError) => {
      const { path, value, msg } = currentError;
      return { ...accumulator, [path]: { value, msg } };
    }, {});
  ```
  to `const localErrors = errors.mapped();`
- Attempted to rewrite UPC validator in `itemValidator.js` module to consider an existing UPC that is not the current item's UPC when editing an item.
- The `deleteCategory` method no longer calls the `updateItems` method directly inside the `queries.js` module, instead `updateItems` gets passed into `deleteCategory` as a callback function.
---
### 17 DEC 2024
- Created a `path` local variable for all `POST` methods; this ensures the original category or UPC can be referenced if a form fails validation.
- Item and category form's `action` value is defined with the local variable `path`.
- Changed `POST` route for deleting items from `/item/:upc` to `/item/:upc/:category`. 
- All `POST` requests temporarily redirect to the root path.
- Items and categories can be deleted when respective forms are successfully submitted.
- Categories can be edited when the form is successfully submitted.
---
### 16 DEC 2024
- Created application-level middleware in `app.js` module that creates a `categories` object in `res.locals`.
- Moved methods out of `queries` object and defined them as individual named arrow functions in the `queries.js` module.
- Changed edit and delete `GET` paths; for example, `delete/item/:upc` to `delete/item/:upc/:category`.
- Created temporary `queriesBackup.js` module.
---
### 15 DEC 2024
- Fixed rendering `deleteItem` and `deleteCategory` pages.
- An item can be deleted on the `deleteItem` page, but rerenders to the current page.
---
### 13 DEC 2024
- Created a custom validator for the `category` input and removed `try...catch` block from `postAddCategory` method in `addController.js` module. The custom validator throws an error if the category exists.
- Created `validators` subdirectory.
- Created `categoryValidator`, `itemValidator`, and `passwordValidator` modules.
- Removed `try...catch` block from `postAddItem` method in `addController.js` module.
- Removed `upcExists` variable from `postAddItem` method in `addController.js` module.
- A conditional block in `postAddItem` method in `addController.js` module now depends on the `categoryExists` variable.
- Removed conditional blocks from form partials.
- Form partials additionally use `action` and `password` local variables.
- Standardized a `inputs` local variable for form partials.
- Currently, delete and edit `POST` requests do nothing.
- Password input no longer has the `value` attribute.
- Changed `disabled` attribute to `readonly` for delete forms' inputs.
- Initialized `success` page.
- Adding and editing items/categories use the same validators; editing items/categories need to allow existing UPC and category values.
---
### 12 DEC 2024
- The `getCategory` method in `queries.js` module now takes an `id` and returns the first item of the `rows` array.
- The `getItem` method in `queries.js` module will return the first item of the `rows` array.
- Added the `bail()` validator modifier for the category input.
- Changed item label and input attributes' values, `for`/`id`/`name`, from `item` to `name`.
- Going to an item's edit page will populate the inputs with the item's content.
- Changed path parameters in `editRouter` and `deleteRouter` modules from `/:item` to `/:upc`.  
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
- Attempted send a `GET` request by form buttons to render a opened modal.
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
- Created `deleteCategory` and `updateItems` query methods in `queries.js` module.
- Clicking on the trashcan icon will delete it's respective category and impacted items are reassigned to the `unassigned` category.
---
### 27 NOV 2024
- Added `edit.svg` to `icons` subdirectory.
- The categories and items tables will be deleted when `node db/initdb.js` is ran in the terminal.
---
### 26 NOV 2024
- Currently, adding an item where the category exists or does not exist and the UPC does exists will update the existing item based on the UPC.
- Navigating to a category will render items assigned to it's respective category.
- Renamed `rowCount` property for `getCategory` and `getItem` resulting objects to `categoryExists` and `upcExists` respectively.
- Created `getCategory`, `getItem`, and `updateItem` query methods in `queries.js` module. 
- Deleted `item.ejs` and `itemPreview.ejs` files.
- Attempted implementing `IF...ELSE IF` for the `insertItem` query.
---
### 07 SEP 2024
- Each controller calls `getCategories` from the `queries.js` module.
- Clicking on `Browse By Category` will direct a user to the `categories` page.
- A category can be created on the `addCategory` page.
---
### 05 SEP 2024
- Defined `ITEMS_SQL` string variable in `initdb` module.
---
### 04 SEP 2024
- Created skeleton methods in `queries.js` module.
---
### 03 SEP 2024
- Attached Fly Postgres cluster to application; `DATABASE_URL` will be used in development and production.
- Initialized a `categories` table with nine different rows in the Postgres database.
- Created `getCategories` in `queries.js` module; selects all rows in the `categories` table.
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
- Added `POST` route method to `addRouter`; submitting the category or item forms will use the `POST` method.
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
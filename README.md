# react-paginated-table

`@jivadio/react-datatable` is an npm package designed to seamlessly integrate paginated, filtered, and sortable tables into your web applications. Built with React, TypeScript, and TailwindCSS, it offers a robust solution for table management.

## Installation

Install the package using npm:

```bash
npm install @jivadio/react-datatable
```

Import the table component into your project:

```javascript
import Datatable from "@jivadio/react-datatable";
```

Use it as a standard React component:

```javascript
<DataTable
  listTitle="Library Inventory"
  dataItems={items}
  columnHeaders={headers}
  actionOptions={action}
  paginationOptions={[5, 10, 15]}
/>
```

## Usage

### Arguments

The `DataTable` component can accept up to 5 arguments:

- **listTitle**: A string displayed at the top of the table.
- **dataItems**: An array of objects representing the items to display. Each object must have an `id` property (string). Other properties can be strings or numbers.
- **columnHeaders**: An array of objects defining the columns. Each object should have:
  - **title**: The column header title.
  - **sortText**: The property name in the item object for sorting and filtering.
- **actionOptions** (Optional): An object defining the action column. It includes:
  - **title**: The action column header title.
  - **function**: A function executed when the action button is clicked. Receives the item's `id` as a parameter.
  - **label**: The label for the action buttons.
- **paginationOptions** (Optional): An array of numbers defining the options for the number of items per page. Defaults to [5, 10, 15]. If the values exceed the total items, they will not be displayed.

### Functionality

- Items can be sorted by any provided header field in ascending or descending order. By default, items are sorted in ascending order based on the first provided header field.
- Items can be filtered using a text input, which searches across all item fields.

See the example below for more details.

## Example

An example with the following parameters:

1. **items**

```javascript
const items = [
  {
    id: "1",
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    genre: "Programming",
    pages: 176,
    price: 25.99,
    stock: 50,
  },
  {
    id: "2",
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    genre: "Programming",
    pages: 472,
    price: 29.99,
    stock: 35,
  },
  {
    id: "3",
    title: "JavaScript: The Definitive Guide",
    author: "David Flanagan",
    genre: "Programming",
    pages: 1096,
    price: 39.99,
    stock: 20,
  },
  {
    id: "4",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    genre: "Programming",
    pages: 260,
    price: 24.99,
    stock: 45,
  },
  {
    id: "5",
    title: "Learning React",
    author: "Alex Banks & Eve Porcello",
    genre: "Programming",
    pages: 350,
    price: 31.99,
    stock: 30,
  },
  {
    id: "6",
    title: "JavaScript and JQuery",
    author: "Jon Duckett",
    genre: "Programming",
    pages: 640,
    price: 35.99,
    stock: 25,
  },
];
```

2. **headers**

```javascript
const headers = [
  {
    title: "Title",
    sortText: "title",
  },
  {
    title: "Author",
    sortText: "author",
  },
  {
    title: "Genre",
    sortText: "genre",
  },
  {
    title: "Pages",
    sortText: "pages",
  },
  {
    title: "Price",
    sortText: "price",
  },
  {
    title: "Stock",
    sortText: "stock",
  },
];
```

3. **action**

```javascript
const action = {
  title: "Action",
  function: (id: string) => {
    console.log("Book ID: " + id);
  },
  label: "View Details",
}
```

4. **Component**

```javascript
<DataTable
  title="Library Inventory"
  items={items}
  headers={headers}
  action={action}
  paginateOptions={[5, 10, 15]}
/>
```

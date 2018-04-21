# vue-slottable
Unopinionated VueJS table component with highly customizable scoped slots.

## How is this different from other table components?
- Very few table components let you use the power of scoped slots to provide templates for your cells, columns and column headers.
- This component uses `functional` components, meaning that the implementation is very light-weight / high performance.
- This is an unopinionated component. No css assumptions have been made when creating this component. You get to choose your own styling for the table.
- All native table functionalities work as is (transparent wrappers

## Features
- Per column templating and styling
- Column group headers
- Sticky columns

## Installation
`npm install vue-slottable`

## Usage
There are many different ways of including this component in your project.

### Using inside a Vue Project
More details can be found inside `src/App.vue`
``` vue
<template>
  <slot-table :rows="rows" table-class="my-table">
    <template slot="column" class="column-1">
      <span slot="header">Foo Header</span>
      <span slot="cell" slot-scope="{ row }">{{row.foo}}</span>
    </template>
    <template slot="column" class="column-2">
      <span slot="header">Bar Header</span>
      <span slot="cell" slot-scope="{ row }">{{row.bar}}</span>
    </template>
  </slot-table>
</template>

<script>
import SlotTable from 'vue-slottable';
export default {
  name: 'MyComponent',
  data() {
    return {
      rows: [{
        foo: 'Foo 1',
        bar: 1,
      }, {
        foo: 'Foo 2',
        bar: 2,
      }],
    };
  },
};
</script>

<style>
.my-table {
  font-size: 10px;
}

.column-1 {
  color: red;
}

.column-2 {
  color: blue;
}
</style>
```

### Using in Browser
More details can be found in `dist/demo.html`

- Include a script tag `<script src="https://unpkg.com/vue"></script>`
- Instead of exporting in the `script` tag like above, initialize `new Vue({...}).$mount('#app')`
- Now you can use the same template as above

## Contributing

Before contributing, make sure that all the below prerequisites are complete:

### Prerequisites
- Install `npm` from https://www.npmjs.com/get-npm
- This project was created with the Vue CLI 3. Install it using `npm install -g @vue/cli`
- Now you can `cd` into the root directory and `npm install`

### Testing and Linting
Jest is the unit testing framework used in this project. Run it using `npm run test:unit`

ESLint + AirBNB convention is used for linting. Run with `npm run lint`

### Building
Building the various targets with `npm run build`

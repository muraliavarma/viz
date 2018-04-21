<template>
  <slot-table :rows="rows" table-class="my-table">
    <template slot="column" class="column-1" sticky="left">
      <span slot="header">Sticky Foo Header</span>
      <span slot="cell" slot-scope="{ row }" @click="fooCellClick(row)">{{row.foo}}</span>
    </template>
    <template slot="column" class="column-2">
      <span slot="header">Bar Header</span>
      <span slot="cell" slot-scope="{ row }">{{row.bar}}</span>
    </template>
    <template slot="column" class="column-3">
      <span slot="header">Baz Header</span>
      <span slot="cell" slot-scope="{ row }" class="cell-3">{{renderCol3(row)}}</span>
    </template>
  </slot-table>
</template>

<script>

import SlotTable from '@/components/SlotTable.vue';

export default {
  name: 'app',
  components: {
    SlotTable,
  },
  data() {
    return {
      rows: [{
        foo: 'Foo 1',
        bar: 1,
        baz: {
          quux: 123.45,
        },
      }, {
        foo: 'Foo 2',
        bar: 2,
        baz: {
          quux: 456.78,
        },
      }],
    };
  },
  methods: {
    renderCol3(row) {
      return `Floating point: ${row.baz.quux}`;
    },
    fooCellClick(row) {
      console.log('Clicked foo, row = ', row);
    },
  },
};

</script>

<style>
.my-table {
  width: 100%;
  text-align: left;
}

.my-table td, th {
  border: 1px solid black;
}

.column-1 {
  color: red;
  min-width: 600px;
  background-color: white;
}

.column-2 {
  color: green;
  min-width: 100px;
}

.column-3 {
  color: blue;
  min-width: 1200px;
}

.cell-3 {
  color: magenta;
}

</style>

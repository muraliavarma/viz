<script>
import SlotTableColumn from './SlotTableColumn.vue';
import SlotTableColumnGroup from './SlotTableColumnGroup.vue';
import SlotTableRow from './SlotTableRow.vue';
import SlotTableCell from './SlotTableCell.vue';

export default {
  name: 'SlotTable',
  // functional components are stateless, but very performant
  functional: true,
  props: {
    tableClass: {
      type: String,
      default: '',
    },
    rows: {
      type: Array,
      required: true,
    },
  },
  // since this is a functional component, data is available through a context argument
  render(createElement, ctx) {
    if (!ctx.children || ctx.children.length === 0) {
      throw new Error('Data Table component expects at least one child');
    }

    // initialize data
    const { rows } = ctx.props;
    const headers = [];
    const cells = [];
    // get all the table listeners
    let rowClick;
    if (ctx.data.on) {
      ({ rowClick } = ctx.data.on);
    }
    // loop through column slots and fetch info from each of its children
    const columns = ctx.children.filter(child => child.data && child.data.slot === 'column');
    columns.forEach((column, columnIndex) => {
      // pass everything into the column component
      const dataTableColumn = createElement(SlotTableColumn, column.data, column.children);
      // retrieve the header and cell component from the column data
      const { header } = dataTableColumn.data.props;

      // header slot should already be ready to be rendered
      headers.push(header);

      // we can not render the cell right here since we need row info
      // thus we retrieve data from the column and store it for later
      const { data } = dataTableColumn;
      cells.push({
        data,
        columnIndex,
      });
    });

    // loop through column slots and fetch info from each of its children
    const groupHeaders = [];
    const columnGroups = ctx.children.filter(
      child => child.data && child.data.slot === 'column-group',
    );
    columnGroups.forEach((columnGroup) => {
      // pass all the into the column component
      const dataTableColumnGroup = createElement(
        SlotTableColumnGroup, columnGroup.data, columnGroup.children,
      );

      // retrieve the header component from the column
      groupHeaders.push(dataTableColumnGroup);
    });

    // construct the table header
    const headerRows = [];
    if (groupHeaders.length > 0) {
      headerRows.push(createElement(SlotTableRow, {}, groupHeaders));
    }
    headerRows.push(createElement(SlotTableRow, {}, headers));
    const thead = createElement('thead', {}, headerRows);

    // loop through each row
    const renderedRows = [];

    rows.forEach((row, rowIndex) => {
      const renderedRow = [];
      // the cell slot might need row info before it can be rendered
      cells.forEach(({ data, columnIndex }) => {
        // pass in the cell and row data for rendering
        const renderedCell = createElement(SlotTableCell, {
          props: {
            data,
            row,
            rowIndex,
            columnIndex,
          },
        });
        // push the cell into the row
        renderedRow.push(renderedCell);
      });

      // pass along the relevant event listener to row
      let rowOn;
      if (rowClick) {
        rowOn = {
          click: () => rowClick(rowIndex),
        };
      }
      // push the row into the list of rows
      renderedRows.push(createElement(SlotTableRow, {
        on: rowOn,
      }, renderedRow));
    });
    // save the list of rows in the tbody
    const tbody = createElement('tbody', {}, renderedRows);

    // finally render out the table with thead, tbody and styles
    const table = createElement('table', {
      attrs: {
        class: ctx.props.tableClass,
      },
    }, [thead, tbody]);

    return table;
  },
};

</script>

<style lang="css">

.sticky-left {
  position: sticky;
  left: 0;
}

.sticky-right {
  position: sticky;
  right: 0;
}

</style>

<script>
export default {
  name: 'SlotTableCell',
  functional: true,
  props: ['row', 'rowIndex', 'columnIndex', 'data'],
  render(createElement, ctx) {
    const {
      row, rowIndex, columnIndex, data,
    } = ctx.data.props;
    const { cell } = data.props;
    let renderedCell;
    if (typeof cell === 'function') {
      renderedCell = cell({
        row,
        rowIndex,
        columnIndex,
      });
    } else {
      renderedCell = cell;
    }

    // each cell needs its own unique key since these could be populated dynamically
    return createElement(
      'td',
      Object.assign({}, {
        key: Math.random().toString(36).substr(2),
      }, data), [renderedCell],
    );
  },
};
</script>

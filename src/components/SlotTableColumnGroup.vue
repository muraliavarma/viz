<script>
export default {
  name: 'SlotTableColumnGroup',
  functional: true,
  props: {
    sticky: {
      type: String,
      default: '',
    },
  },
  render(createElement, ctx) {
    const { sticky } = ctx.props;
    const data = Object.assign({}, ctx.data);
    if (sticky === 'left') {
      data.class = Object.assign({}, data.class, { 'sticky-left': true });
    } else if (sticky === 'right') {
      data.class = Object.assign({}, data.class, { 'sticky-right': true });
    }
    return createElement('th', data, ctx.children);
  },
};
</script>

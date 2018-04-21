<script>
export default {
  name: 'SlotTableRow',
  functional: true,
  render(createElement, ctx) {
    return createElement('tr', ctx.data, ctx.children);
  },
};
</script>

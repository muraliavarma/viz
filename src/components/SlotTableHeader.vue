<script>
export default {
  name: 'SlotTableHeader',
  functional: true,
  render(createElement, ctx) {
    return createElement('th', ctx.data, ctx.children);
  },
};
</script>

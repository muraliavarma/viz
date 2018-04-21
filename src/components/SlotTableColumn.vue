<script>
import SlotTableHeader from './SlotTableHeader.vue';

export default {
  name: 'SlotTableColumn',
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

    // header can be rendered just with the column info, so simply render it in its own component
    const header = createElement(
      SlotTableHeader,
      data,
      ctx.children.filter(child => child.data.slot === 'header'),
    );

    // cells are more complicated, since it needs row info as well
    // so we simply return a scoped slot that will be rendered eventually on a per row basis
    // if, instead, the consumer passed a simple non-scoped slot, we send back a simple slot
    let cell;
    if (ctx.data.scopedSlots && ctx.data.scopedSlots.cell) {
      ({ cell } = ctx.data.scopedSlots);
      delete ctx.data.scopedSlots.cell;
    } else if (ctx.children.length > 0) {
      cell = ctx.children.find(child => child.data.slot === 'cell');
    }

    // send back the header and cell data as props
    const props = Object.assign({}, data.props, {
      header, cell,
    });
    return createElement('div', Object.assign(
      {},
      data, { props },
    ));
  },
};
</script>

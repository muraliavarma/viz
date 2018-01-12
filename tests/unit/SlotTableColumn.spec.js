import { mount } from '@vue/test-utils';
import SlotTableColumn from '@/components/SlotTableColumn.vue';

const headerSlot = {
  data: {
    slot: 'header',
    foo: 'bar',
  },
};

const cellSlot = {
  data: {
    slot: 'cell',
    baz: 'jaa',
  },
};

describe('SlotTableColumn.vue', () => {
  it('has the expected html structure', () => {
    const wrapper = mount(SlotTableColumn, {
      context: {
        children: [headerSlot, cellSlot],
        staticClass: 'bar',
        attrs: {
          baz: 'quux',
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('passes the header and cell slots down', () => {
    const wrapper = mount(SlotTableColumn, {
      context: {
        children: [headerSlot, cellSlot],
      },
    });
    expect(wrapper.vnode.data.props.header.children[0]).toBe(headerSlot);
    expect(wrapper.vnode.data.props.cell).toBe(cellSlot);
  });

  it('passes the cell scoped slot down', () => {
    const cellTemplate = '<div slot="cell" slot-scope="{ row }">{{row + \'-\' + row}}</div>';
    const wrapper = mount(SlotTableColumn, {
      scopedSlots: { cell: cellTemplate },
      context: {
        props: {
          foo: 'bar',
        },
      },
    });
    // remove the scoped slot from parent
    expect(wrapper.vnode.data.scopedSlots.cell).toBe(undefined);
    // pass in any additional prop into child
    expect(wrapper.vnode.data.props.foo).toBe('bar');
    // verify that the cell slot scope got passed down
    expect(wrapper.vnode.data.props.cell({ row: 'foo' }).children[0].text).toBe('foo-foo');
  });

  it('does left sticky', () => {
    const stickyWrapper = mount(SlotTableColumn, {
      context: {
        staticClass: 'foo',
        class: { bar: true },
        props: {
          sticky: 'left',
        },
      },
    });
    expect(stickyWrapper.classes('foo')).toBe(true);
    expect(stickyWrapper.classes('bar')).toBe(true);
    expect(stickyWrapper.classes('sticky-left')).toBe(true);
    expect(stickyWrapper.classes('sticky-right')).toBe(false);
  });

  it('does right sticky', () => {
    const stickyWrapper = mount(SlotTableColumn, {
      context: {
        staticClass: 'foo',
        class: { bar: true },
        props: {
          sticky: 'right',
        },
      },
    });
    expect(stickyWrapper.classes('foo')).toBe(true);
    expect(stickyWrapper.classes('bar')).toBe(true);
    expect(stickyWrapper.classes('sticky-right')).toBe(true);
    expect(stickyWrapper.classes('sticky-left')).toBe(false);
  });

  it('does no sticky', () => {
    const stickyWrapper = mount(SlotTableColumn, {
      context: {
        staticClass: 'foo',
        class: { bar: true },
        props: {
        },
      },
    });
    expect(stickyWrapper.classes('foo')).toBe(true);
    expect(stickyWrapper.classes('bar')).toBe(true);
    expect(stickyWrapper.classes('sticky-right')).toBe(false);
    expect(stickyWrapper.classes('sticky-left')).toBe(false);
  });
});

import { mount } from '@vue/test-utils';
import SlotTable from '@/components/SlotTable.vue';

describe('SlotTable.vue', () => {
  const column = {
    data: {
      slot: 'column',
    },
    children: [],
  };

  it('throws error if there are no children', () => {
    // hide the error logs
    jest.spyOn(global.console, 'error')
      .mockImplementationOnce(() => {})
      .mockImplementationOnce(() => {})
      .mockImplementationOnce(() => {})
      .mockImplementationOnce(() => {});
    expect(() => mount(SlotTable, {
      context: {
        props: {
          rows: [],
        },
      },
    })).toThrow('Data Table component expects at least one child');
  });

  it('renders correct number of rows', () => {
    const wrapper = mount(SlotTable, {
      context: {
        props: {
          rows: ['foo', 'bar', 'baz'],
        },
        children: [column],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('accepts table class', () => {
    const wrapper = mount(SlotTable, {
      context: {
        props: {
          rows: [],
          tableClass: 'foo',
        },
        children: [column],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders correct number of columns', () => {
    const wrapper = mount(SlotTable, {
      context: {
        props: {
          rows: [],
        },
        children: [column, column],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders correct number of column groups', () => {
    const columnGroup = {
      data: {
        slot: 'column-group',
      },
    };
    const wrapper = mount(SlotTable, {
      context: {
        props: {
          rows: [],
        },
        children: [column, columnGroup],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders header and cells', () => {
    const columnWithSlottedChildren = {
      data: {
        slot: 'column',
      },
      children: [{
        data: {
          slot: 'cell',
        },
      }, {
        data: {
          slot: 'header',
        },
      }],
    };

    const wrapper = mount(SlotTable, {
      context: {
        props: {
          rows: ['foo', 'bar'],
        },
        children: [columnWithSlottedChildren],
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('handles row click', () => {
    const rowClick = i => `clicked row ${i}`;
    const wrapper = mount(SlotTable, {
      context: {
        props: {
          rows: ['foo', 'bar'],
        },
        children: [column],
        on: { rowClick },
      },
    });
    const domRows = wrapper.findAll('tbody tr').wrappers;
    expect(domRows[0].vnode.data.on.click()).toBe('clicked row 0');
    expect(domRows[1].vnode.data.on.click()).toBe('clicked row 1');
  });
});

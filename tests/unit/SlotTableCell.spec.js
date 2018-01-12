import { mount } from '@vue/test-utils';
import SlotTableCell from '@/components/SlotTableCell.vue';

describe('SlotTableCell.vue', () => {
  it('outputs the slot', () => {
    const cell = 'abc';
    const wrapper = mount(SlotTableCell, {
      context: {
        props: {
          row: 'a',
          rowIndex: 'b',
          columnIndex: 'c',
          data: { props: { cell } },
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('calls the slot scoped function', () => {
    const cell = ({ row, rowIndex, columnIndex }) => `${row}-${rowIndex}-${columnIndex}`;
    const wrapper = mount(SlotTableCell, {
      context: {
        props: {
          row: 'a',
          rowIndex: 'b',
          columnIndex: 'c',
          data: { props: { cell } },
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

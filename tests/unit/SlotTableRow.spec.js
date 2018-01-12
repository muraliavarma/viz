import { mount } from '@vue/test-utils';
import SlotTableRow from '@/components/SlotTableRow.vue';

const click = jest.fn();
const wrapper = mount(SlotTableRow, {
  context: {
    children: ['foo'],
    on: { click },
    class: {
      bar: true,
    },
    attrs: {
      baz: 'quux',
    },
  },
});

describe('SlotTableRow.vue', () => {
  it('has the expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('triggers click event', () => {
    wrapper.trigger('click');
    expect(click).toHaveBeenCalled();
  });
});

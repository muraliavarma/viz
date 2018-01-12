import { mount } from '@vue/test-utils';
import SlotTableHeader from '@/components/SlotTableHeader.vue';

const click = jest.fn();
const wrapper = mount(SlotTableHeader, {
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

describe('SlotTableHeader.vue', () => {
  it('has the expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('triggers click event', () => {
    wrapper.trigger('click');
    expect(click).toHaveBeenCalled();
  });
});

import { mount } from '@vue/test-utils';
import SlotTableColumnGroup from '@/components/SlotTableColumnGroup.vue';

const click = jest.fn();
const wrapper = mount(SlotTableColumnGroup, {
  context: {
    children: ['foo'],
    on: { click },
    staticClass: 'bar',
    attrs: {
      baz: 'quux',
    },
    props: {
      span: 3,
    },
  },
});

describe('SlotTableColumnGroup.vue', () => {
  it('has the expected html structure', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it('triggers click event', () => {
    wrapper.trigger('click');
    expect(click).toHaveBeenCalled();
  });

  it('does left sticky', () => {
    const stickyWrapper = mount(SlotTableColumnGroup, {
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
    const stickyWrapper = mount(SlotTableColumnGroup, {
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
    const stickyWrapper = mount(SlotTableColumnGroup, {
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

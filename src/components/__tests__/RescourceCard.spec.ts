import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ResourceCard from '../Detail/ResourceCard.vue';

describe('ResourceCard', () => {
  it('renders card component', async () => {
    const wrapper = mount(ResourceCard, {
      props: {
        image: 'example.jpg',
        title: 'Example Title',
        description: 'Example Description',
        component: 'comics',
      },
    });

    expect(wrapper.exists()).toBe(true);

    expect(wrapper.find('.card').text()).toContain('Example Title');

    await wrapper.trigger('mouseenter');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.card-comics-details').exists()).toBe(true);

    await wrapper.trigger('mouseleave');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.card-comics-details').exists()).toBe(false);
  });
});

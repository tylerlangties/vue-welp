import { shallowMount } from '@vue/test-utils'
import Review from '@/components/Review.vue'
import { createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import DateFilter from '@/filters/date.js'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.filter('date', DateFilter)

describe('Review.vue', () => {
  it('displays a review from props', () => {
    const mockReview = {
      user: 'mock user',
      id: 1234567,
      rating: 4,
      title: 'mock title',
      review: 'mock review',
      date: '08/17/2018',
      avatar: ''
    }
    const wrapper = shallowMount(Review, {
      localVue,
      propsData: {
        review: mockReview
      }
    })

    expect(wrapper.find('.review-user').text()).toBe('mock user')
    expect(wrapper.find('.review-title').text()).toBe('mock title')
    expect(wrapper.find('.review-date').text()).toBe('Aug 17, 2018')
    expect(wrapper.find('.review-review').text()).toBe('mock review')
  })
})

import { shallowMount, createLocalVue } from '@vue/test-utils'
import StoreCard from '@/components/StoreCard.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(VueRouter)

const router = new VueRouter()

describe('StoreCard.vue', () => {
  it('displays a restaurant from props', () => {
    const mockRestaurant = {
      id: 8419988,
      rating: 3,
      img: '',
      title: 'mock restuarant',
      description: 'Italian',
      location: 'mock st',
      price: '$',
      phone: '123456',
      reviews: [
        {
          review: 'some fake review'
        }
      ]
    }
    const wrapper = shallowMount(StoreCard, {
      localVue,
      router,
      propsData: {
        rest: mockRestaurant
      }
    })

    expect(wrapper.find('.rest-title').text()).toBe('mock restuarant')
    expect(wrapper.find('.rest-phone').text()).toBe('123456')
    expect(wrapper.find('.rest-location').text()).toBe('mock st')
    expect(wrapper.find('.rest-price').text()).toBe('$')
    expect(wrapper.find('.rest-review-snippet').text()).toBe(
      '"some fake review"'
    )
  })
})

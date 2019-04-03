import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import RestaurantShow from '@/views/RestaurantShow.vue'
import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('RestaurantShow.vue', () => {
  let state
  let store
  let actions

  beforeEach(() => {
    state = {
      restaurant: {
        id: 4582797,
        rating: 4.2,
        img: 'mockimage.jpeg',
        title: 'mock title',
        location: 'mock st',
        price: '$$',
        phone: '(388)-411-6721',
        reviews: [
          {
            user: 'Jimbo',
            id: 5911141
          }
        ]
      }
    }

    actions = {
      fetchRestaurants: jest.fn(),
      fetchRestaurant: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        restaurant: {
          namespaced: true,
          state,
          actions
        }
      }
    })
  })

  it('renders restaurant details using module store', () => {
    const wrapper = shallowMount(RestaurantShow, { store, localVue })
    expect(wrapper.find('.restaurant-title').text()).toBe('mock title')
    expect(wrapper.find('.stars').attributes('rating')).toBe('4.2')
    expect(wrapper.find('.header-img').attributes('src')).toBe('mockimage.jpeg')
    expect(wrapper.find('.restaurant-phone').text()).toBe('(388)-411-6721')
    expect(wrapper.find('.restaurant-address').text()).toBe('mock st')
  })
  describe('Lifecycle', () => {
    it('calls actions in created hook', done => {
      shallowMount(RestaurantShow, {
        store,
        localVue
      })

      expect(actions.fetchRestaurants).toBeCalledTimes(1)
      expect(actions.fetchRestaurant).toBeCalledTimes(1)

      done()
    })
  })
})

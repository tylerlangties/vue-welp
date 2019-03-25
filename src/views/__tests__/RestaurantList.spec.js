import RestaurantList from '@/views/RestaurantList.vue'

describe('RestaurantList.vue', () => {
  describe('Lifecycle', () => {
    it('calls fetchRestaurants action on created hook', done => {
      const context = {
        fetchRestaurants: jest.fn()
      }

      const fetchRestaurantsSpy = jest.spyOn(context, 'fetchRestaurants')
      RestaurantList.created.call(context)

      expect(fetchRestaurantsSpy).toBeCalledTimes(1)

      fetchRestaurantsSpy.mockRestore()
      done()
    })
  })
})

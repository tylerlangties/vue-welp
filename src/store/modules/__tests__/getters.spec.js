import { getters } from '../restaurant'

const { getRestaurantById } = getters

const restaurants = [
  { name: 'tasty restaurant', id: 123 },
  { name: 'second tasty restaurant', id: 456 }
]

const state = { restaurants }

const id = 123

describe('getRestaurantById', () => {
  it('retrieves a restaurant from the state using the id', () => {
    const results = getRestaurantById(state)(id)
    expect(results).toEqual({ name: 'tasty restaurant', id: 123 })
  })
})

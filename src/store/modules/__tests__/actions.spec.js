import { actions } from '../restaurant'
import mockAxios from 'axios'

const { fetchRestaurants, fetchRestaurant } = actions

const commit = jest.fn()
const getters = {
  getRestaurantById: jest.fn()
}

//fetch multiple restaurants action
describe('fetchRestaurants', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('requests restaurants from api and commits the response', async () => {
    const state = {
      restaurants: []
    }

    await fetchRestaurants({ commit, state })
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_RESTAURANTS', {
      restaurants: 'restaurants'
    })
  })

  it('does not call api if data is already present', async () => {
    const state = {
      restaurants: [{ rest: 'restaurant', id: 123 }]
    }
    await fetchRestaurants({ commit, state })
    expect(mockAxios.get).toHaveBeenCalledTimes(0)
    expect(commit).toHaveBeenCalledWith('SET_RESTAURANTS', [
      {
        rest: 'restaurant',
        id: 123
      }
    ])
  })
})
// Fetch single restaurant action
describe('fetchRestaurant', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  const id = 123

  it('requests a restaurant from api and commits the response', async () => {
    await fetchRestaurant({ commit, getters })
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_RESTAURANT', {
      restaurants: 'restaurants'
    })
  })

  it('does not call api if data is already present', async () => {
    //mock getter
    const getters = {
      getRestaurantById: function(id) {
        return {
          restaurants: id
        }
      }
    }
    await fetchRestaurant({ commit, getters }, id)
    expect(mockAxios.get).toHaveBeenCalledTimes(0)
    expect(commit).toHaveBeenCalledWith('SET_RESTAURANT', {
      restaurants: id
    })
  })
})

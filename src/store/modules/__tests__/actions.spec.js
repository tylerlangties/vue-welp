import { actions } from '../restaurant'
import mockAxios from 'axios'

const {
  fetchRestaurants,
  fetchRestaurant,
  createReview,
  updateRating
} = actions

const dispatch = jest.fn()
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

//Create review action
describe('createReview', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  const review = {
    review: 'review'
  }
  const id = '123'

  it('calls axios to delete old data from api', async () => {
    await createReview({ commit, getters, dispatch }, [review, id])
    expect(mockAxios.delete).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith('updateRating')
    expect(commit).toHaveBeenCalledWith('ADD_REVIEW', {
      review: 'review'
    })
  })

  it('calls axios to post new data to api', async () => {
    await createReview({ commit, getters, dispatch }, [review, id])
    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith('updateRating')
    expect(commit).toHaveBeenCalledWith('ADD_REVIEW', {
      review: 'review'
    })
  })

  describe('updateRating', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
    const state = {
      restaurant: {
        id: 8419988,
        rating: 4,

        reviews: [
          {
            user: 'Karen',
            rating: 2
          },
          {
            user: 'Jimbo',
            rating: 4
          }
        ]
      }
    }

    it('updates the current rating and writes it to the state', async () => {
      updateRating({ state, commit })
      expect(commit).toBeCalledWith('UPDATE_STAR_RATING', 3)
    })
  })
})

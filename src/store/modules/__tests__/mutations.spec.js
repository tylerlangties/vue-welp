import { mutations } from '../restaurant.js'

const {
  SET_RESTAURANTS,
  SET_RESTAURANT,
  ADD_REVIEW,
  UPDATE_STAR_RATING
} = mutations

describe('SET_RESTAURANTS', () => {
  it('adds an array of restaurants to the state', () => {
    const restaurantsArray = [
      {
        title: 'Mock Restaurant'
      },
      {
        title: 'Mock Restaurant 2'
      }
    ]
    const state = {
      restaurants: []
    }

    SET_RESTAURANTS(state, restaurantsArray)

    expect(state.restaurants.length).toEqual(restaurantsArray.length)
  })
})

describe('SET_RESTAURANT', () => {
  it('sets a restaurant object to the state', () => {
    const restaurantObject = {
      title: 'Mock Restaurant'
    }

    const state = {
      restaurant: {}
    }

    SET_RESTAURANT(state, restaurantObject)

    expect(state).toEqual({
      restaurant: {
        title: 'Mock Restaurant'
      }
    })
  })
})

describe('ADD_REVIEW', () => {
  it('pushes a new review object into the state', () => {
    const newReview = {
      name: 'user',
      review: 'good'
    }

    const state = {
      restaurant: {
        reviews: []
      }
    }

    ADD_REVIEW(state, newReview)

    expect(state).toEqual({
      restaurant: {
        reviews: [
          {
            name: 'user',
            review: 'good'
          }
        ]
      }
    })
  })
})

describe('UPDATE_STAR_RATING', () => {
  it('updates a restaurants average star rating', () => {
    const newStarRating = 4.3

    const state = {
      restaurant: {
        rating: 4.5
      }
    }

    UPDATE_STAR_RATING(state, newStarRating)

    expect(state).toEqual({
      restaurant: {
        rating: 4.3
      }
    })
  })
})

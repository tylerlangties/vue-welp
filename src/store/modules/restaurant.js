// import EventService from '@/services/EventService.js'
import axios from 'axios'

export const namespaced = true

export const state = {
  restaurants: [],
  restaurant: {}
}

export const mutations = {
  SET_RESTAURANTS(state, restaurants) {
    state.restaurants = restaurants
  },
  SET_RESTAURANT(state, restaurant) {
    state.restaurant = restaurant
  },
  ADD_REVIEW(state, review) {
    state.restaurant.reviews.push(review)
  },
  UPDATE_STAR_RATING(state, rating) {
    state.restaurant.rating = rating
  }
}

export const actions = {
  async fetchRestaurants({ commit, state }) {
    if (state.restaurants.length) {
      commit('SET_RESTAURANTS', state.restaurants)
    } else {
      try {
        const response = await axios.get('http://localhost:3000/restaurants')
        commit('SET_RESTAURANTS', response.data)
      } catch (e) {
        throw Error('API Error occurred.')
      }
    }
  },
  async fetchRestaurant({ commit, getters }, id) {
    let rest = getters.getRestaurantById(id)
    if (rest) {
      commit('SET_RESTAURANT', rest)
    } else {
      try {
        let response = await axios.get(
          'http://localhost:3000/restaurants/' + id
        )
        commit('SET_RESTAURANT', response.data)
      } catch (e) {
        throw Error('Api Error occurred.')
      }
    }
  },
  async createReview({ commit, getters, dispatch }, [review, id]) {
    let newRest = getters.getRestaurantById(id)

    await axios.delete('http://localhost:3000/restaurants/' + id)
    commit('ADD_REVIEW', review)
    dispatch('updateRating')

    return axios.post('http://localhost:3000/restaurants', newRest)
  },

  updateRating({ state, commit }) {
    const reviews = state.restaurant.reviews

    let starSum = 0
    reviews.forEach(rating => {
      starSum += rating.rating
    })
    let ratingAverage = starSum / reviews.length
    console.log(ratingAverage)
    commit('UPDATE_STAR_RATING', ratingAverage)
  }
}

export const getters = {
  getRestaurantById: state => id => {
    return state.restaurants.find(rest => rest.id === id)
  }
}

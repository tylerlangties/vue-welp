<template>
  <div>
    <h1 class="restaurant-title">{{restaurant.title}}</h1>
    <star-rating
      class="stars"
      :read-only="true"
      :star-size="25"
      :rating="restaurant.rating"
      :increment="0.1"
    ></star-rating>
    <div class="img-container">
      <img class="img-fluid header-img" :src="restaurant.img">
    </div>

    <b-container class="restaurant-info">
      <h5>
        Phone:
        <span class="restaurant-phone">{{restaurant.phone}}</span>
      </h5>
      <h5>
        Address:
        <span class="restaurant-address">{{restaurant.location}}</span>
      </h5>
    </b-container>

    <br>
    <b-container class="modal-button-container">
      <h2>Reviews:</h2>
      <ModalForm :id="id"></ModalForm>
    </b-container>
    <div>
      <Review v-for="review in restaurant.reviews" :review="review"></Review>
    </div>
  </div>
</template>

<script>
import ModalForm from '@/components/ModalForm.vue'
import Review from '@/components/Review.vue'

import { mapState, mapActions } from 'vuex'
import StarRating from 'vue-star-rating'

export default {
  props: ['id'],
  components: {
    ModalForm,
    Review,
    StarRating
  },
  created() {
    this.fetchRestaurant(this.id)
    this.fetchRestaurants()
  },
  computed: {
    ...mapState({
      restaurant: state => state.restaurant.restaurant
    })
  },
  methods: {
    ...mapActions('restaurant', ['fetchRestaurant', 'fetchRestaurants'])
  }
}
</script>

<style scoped lang="scss">
.img-container {
  max-width: 900px;
  margin: 0 auto;
  .header-img {
    border-radius: 3px;
  }
}
.vue-star-rating {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
}
.modal-button-container {
  display: flex;
  justify-content: space-between;
  max-width: 700px;
}
.restaurant-info {
  display: flex;
  justify-content: space-around;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>

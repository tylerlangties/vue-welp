<template>
  <b-col class="col-12 card__wrapper">
    <b-card no-body class="overflow-hidden card-inner" style="max-width: 850px;">
      <b-row no-gutters>
        <b-col md="6">
          <router-link class :to="{ name: 'restaurant-show', params: { id: rest.id }  }">
            <b-card-img :src="rest.img" class="rounded-0 rest-img"/>
          </router-link>
        </b-col>
        <b-col md="6" class="right">
          <div class="right-top">
            <div>
              <router-link class :to="{ name: 'restaurant-show', params: { id: rest.id }  }">
                <h4 class="rest-title">{{rest.title}}</h4>
              </router-link>

              <star-rating
                class="stars"
                :read-only="true"
                :star-size="25"
                :rating="rest.rating"
                :increment="0.1"
              ></star-rating>
            </div>
            <div class="text-right">
              <span class="rest-phone">{{rest.phone}}</span>
              <p class="rest-location">{{rest.location}}</p>
            </div>
          </div>

          <b-card-text class="rest-price">{{rest.price}}</b-card-text>
          <b-card-text>
            <span class="rest-review-snippet">"{{rest.reviews[0].review}}"</span>
            <router-link
              class
              :to="{ name: 'restaurant-show', params: { id: rest.id }  }"
            >Read More..</router-link>
          </b-card-text>
        </b-col>
      </b-row>
    </b-card>
  </b-col>
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
  props: {
    rest: {
      type: Object,
      required: true,
      description: 'Restaurant object from restaurants array.'
    }
  },
  components: {
    StarRating
  }
}
</script>

<style lang="scss" scoped>
.card__wrapper {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  text-align: left;
  .right {
    padding: 0.5rem;
    &-top {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>



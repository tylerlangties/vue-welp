<template>
  <b-container class="review-wrapper">
    <b-card no-body class="overflow-hidden review-card" style="max-width: 700px;">
      <b-row no-gutters>
        <b-col md="4" class="avatar-container">
          <b-card-img class="rounded-0" :src="require('../assets/user-thumbnail.png')"/>
          <b-card-text class="review-user">{{ review.user }}</b-card-text>
        </b-col>
        <b-col md="8">
          <b-card-body class="text-left review">
            <b-card-title class="review-title">{{ review.title }}</b-card-title>
            <star-rating
              class="review-rating"
              :read-only="true"
              :star-size="25"
              :rating="review.rating"
              :increment="0.1"
            ></star-rating>
            <div class="review-date">{{ review.date | date }}</div>
            <b-card-text class="review-review">{{ review.review }}</b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import StarRating from 'vue-star-rating'
export default {
  props: {
    review: {
      type: Object,
      description: 'Reviews object from selected restaurant'
    }
  },
  components: {
    StarRating
  }
}
</script>

<style lang="scss" scoped>
.review-wrapper {
  display: flex;
  justify-content: center;
}
.review-card {
  margin: 1rem 0;
  width: 700px;
  .avatar-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    img {
      max-width: 8rem;
      margin: 0.5rem 0;
    }
  }
}
</style>

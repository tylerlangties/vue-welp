<template>
  <div>
    <!-- Modal Button -->
    <b-button v-b-modal.modal variant="danger">Leave a review!</b-button>

    <!-- Modal Component -->
    <b-modal ref="formModalRef" id="modal" title="Review">
      <b-form @submit.prevent="createReview" class="text-left">
        <b-form-group class="star-rating">
          <p>Select your rating:</p>
          <star-rating v-model="review.rating" :increment="0.25" :star-size="25"></star-rating>
        </b-form-group>

        <b-form-group id="nameGroup" label="Your Name:" label-for="nameGroup">
          <b-form-input
            v-model="review.user"
            :class="{ error: $v.review.user.$error}"
            type="text"
            placeholder="Enter name"
            @blur="$v.review.user.$touch()"
          />
        </b-form-group>
        <template v-if="$v.review.user.$error">
          <p v-if="!$v.review.user.required" class="errorMessage">Name is required.</p>
        </template>

        <b-form-group id="titleGroup" label="Title:" label-for="titleGroup">
          <b-form-input
            v-model="review.title"
            :class="{ error: $v.review.title.$error}"
            type="text"
            placeholder="Enter Title"
            @blur="$v.review.title.$touch()"
          />
        </b-form-group>
        <template v-if="$v.review.title.$error">
          <p v-if="!$v.review.title.required" class="errorMessage">Title is required.</p>
        </template>

        <b-form-group id="reviewGroup" label="Review:">
          <b-form-textarea
            v-model="review.review"
            :class="{ error: $v.review.review.$error}"
            placeholder="How was your experience?"
            rows="5"
            max-rows="6"
            @blur="$v.review.review.$touch()"
          />
        </b-form-group>
        <template v-if="$v.review.review.$error">
          <p v-if="!$v.review.review.required" class="errorMessage">Your review is required.</p>
        </template>

        <b-form-group>
          <b-button
            :disabled="$v.$anyError"
            type="submit"
            variant="danger"
            v-on="{ click: !$v.$invalid ? hideModal : null }"
          >Submit</b-button>
        </b-form-group>
      </b-form>

      <div slot="modal-footer" class="w-100"></div>
    </b-modal>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import { required } from 'vuelidate/lib/validators'

export default {
  props: {
    id: Number
  },
  components: {
    StarRating
  },
  data() {
    return {
      review: this.createFreshFormObject()
    }
  },
  validations: {
    review: {
      user: { required },
      title: { required },
      review: { required }
    }
  },
  methods: {
    createReview() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$store
          .dispatch('restaurant/createReview', [this.review, this.id])
          .then(() => {
            this.review = this.createFreshFormObject()
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    hideModal() {
      this.$refs.formModalRef.hide()
    },
    createFreshFormObject() {
      // const id = Math.floor(Math.random() * 10000000)
      const date = new Date()
      return {
        rating: 1,
        user: '',
        title: '',
        review: '',
        date: date,
        avatar:
          'https://kooledge.com/assets/default_medium_avatar-57d58da4fc778fbd688dcbc4cbc47e14ac79839a9801187e42a796cbd6569847.png'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.star-rating {
  display: flex;
  justify-content: center;
  p {
    margin-bottom: 8px;
  }
}
.error {
  border: 1px solid red;
}
.errorMessage {
  color: red;
}
</style>


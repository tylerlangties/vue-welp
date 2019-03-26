<template>
  <div>
    <!-- Modal Button -->
    <b-button class="modalToggle" v-on:click="showModal" variant="danger">Leave a review!</b-button>

    <!-- Modal Component -->
    <b-modal ref="formModalRef" id="modal" title="Review">
      <form @submit.prevent="createReview">
        <p class="rating-select">Select your rating:</p>
        <star-rating v-model="review.rating" :increment="0.5" :star-size="25"></star-rating>

        <div class="field">
          <label>Name</label>
          <input
            data-username
            v-model="review.user"
            :class="{ error: $v.review.user.$error}"
            type="text"
            placeholder="Enter name"
            @blur="$v.review.user.$touch()"
          >
        </div>
        <template v-if="$v.review.user.$error">
          <p v-if="!$v.review.user.required" class="errorMessage">Name is required.</p>
        </template>

        <div class="field">
          <label>Title</label>
          <input
            id="title"
            data-title
            v-model="review.title"
            :class="{ error: $v.review.title.$error}"
            type="text"
            placeholder="Enter Title"
            @blur="$v.review.title.$touch()"
          >
        </div>
        <template v-if="$v.review.title.$error">
          <p v-if="!$v.review.title.required" class="errorMessage">Title is required.</p>
        </template>

        <div class="field">
          <label>Review</label>
          <textarea
            data-review
            id="review"
            v-model="review.review"
            :class="{ error: $v.review.review.$error}"
            placeholder="How was your experience?"
            rows="5"
            @blur="$v.review.review.$touch()"
          ></textarea>
        </div>
        <template v-if="$v.review.review.$error">
          <p v-if="!$v.review.review.required" class="errorMessage">Your review is required.</p>
        </template>

        <div>
          <b-button
            class="submitButton"
            :disabled="$v.$anyError"
            type="submit"
            variant="danger"
            v-on="{ click: !$v.$invalid ? hideModal : invalid }"
          >Submit</b-button>
        </div>
      </form>

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
      } else {
        return null
      }
    },
    showModal() {
      this.$refs.formModalRef.show()
    },
    hideModal() {
      this.$refs.formModalRef.hide()
    },
    invalid() {
      return null
    },
    createFreshFormObject() {
      // const id = Math.floor(Math.random() * 10000000)
      const date = new Date().toLocaleString()
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
.rating-select {
  text-align: left;
  font-weight: 600;
}
.error {
  border: 1px solid red;
}
.errorMessage {
  color: red;
}
.field {
  margin: 0.5rem 0;
}
label,
input,
select,
textarea {
  display: inline-flex;
  font-size: 100%;
  margin: 0;
}
label {
  font-weight: 600;
  width: 100%;
  text-align: left;
}
input,
textarea {
  box-sizing: border-box;
  border: solid 1px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
}
textarea {
  width: 100%;
  overflow: auto;
  padding: 10px 10px;
}
[type='text'],
[type='number'],
[type='search'],
[type='password'] {
  height: 36px;
  width: 100%;
  padding: 0 10px;
}
</style>


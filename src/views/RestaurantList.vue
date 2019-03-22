<template>
  <b-container>
    <b-row>
      <StoreCard v-for="rest in restaurants" :key="rest.id" :rest="rest"></StoreCard>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import StoreCard from '@/components/StoreCard.vue'
export default {
  components: {
    StoreCard
  },
  created() {
    this.fetchRestaurants()
  },
  computed: {
    ...mapState('restaurant', ['restaurants'])
  },
  methods: {
    ...mapActions('restaurant', ['fetchRestaurants'])
  }
}
</script>

<style lang="scss" scoped>
</style>

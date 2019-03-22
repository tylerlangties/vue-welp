import Vue from 'vue'
import Router from 'vue-router'
import RestaurantList from './views/RestaurantList.vue'
import RestaurantShow from './views/RestaurantShow.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'restaurant-list',
      component: RestaurantList
    },
    {
      path: '/restaurant/:id',
      name: 'restaurant-show',
      component: RestaurantShow,
      props: route => {
        const id = Number.parseInt(route.params.id)
        if (Number.isNaN(id)) {
          return 0
        }
        return { id }
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

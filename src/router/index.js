import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Owner from '../views/Owner.vue'
import Viewer from '../views/Viewer.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/viewer',
    name: 'Viewer',
    component: Viewer
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/owner',
    name: 'Owner',
    component: Owner
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

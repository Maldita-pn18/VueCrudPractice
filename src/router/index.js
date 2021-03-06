import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import crud from '../views/crud.vue'
import update from '../components/updateForm.vue'
import upload from '../components/imageUpload.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  {
    path: '/crud',
    name: 'crud',
    component: crud
  },
  {
    path: '/update',
    name: 'update',
    component: update
  },
  {
    path: '/upload',
    name: 'image',
    component: upload
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Additem from '../components/Additem.vue'
import Edititem from '../components/Edititem.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/add-item',
    name: 'Additem',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Additem
  },
  {
    path: '/edit-item/:slug',
    name: 'Edititem',
    component: Edititem
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

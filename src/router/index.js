import Vue from 'vue'
import VueRouter from 'vue-router'
import Orders from '../views/Orders.vue'
import Clients from "../views/Clients"
import vOrder from "../components/orders/v-order"
import vOrderForm from "../components/orders/v-order-form"
Vue.use(VueRouter)

const routes = [
    //orders
  {
    path: '/',
    name: 'Orders',
    component: Orders
  },
  {
    path: "/order",
    name: "order",
    component: vOrder,
    props: true
  },
  {
    path: "/order-form",
    name: "order-form",
    component: vOrderForm,
    props: true
  },
    //clients
  {
    path: '/clients',
    name: 'Clients',
    component: Clients
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

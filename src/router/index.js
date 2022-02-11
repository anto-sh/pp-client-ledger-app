import Vue from 'vue'
import VueRouter from 'vue-router'
import Orders from '../views/Orders.vue'
import vOrder from "../components/orders/v-order"
import vOrderForm from "../components/orders/v-order-form"
import Clients from "../views/Clients"
import vClient from "../components/clients/v-client"
import vClientForm from "../components/clients/v-client-form"
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
  {
    path: '/client',
    name: 'client',
    component: vClient,
    props: true
  },
  {
    path: "/client-form",
    name: "client-form",
    component: vClientForm,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

<template>
  <div class="c-orders-section">
    <button class="c-btn__add-order" @click.prevent="toOrderForm">
      Добавить новый
    </button>
    <ul class="c-orders-list">
      <v-orders-list-item
          v-for="order of orders"
          :key="order.id"
          :order_data="order"
          :client_name="getOrderClientData(order)"
      ></v-orders-list-item>
    </ul>
  </div>
</template>


<script>
import vOrdersListItem from "./v-orders-list-item";
import {mapActions, mapState} from "vuex";

export default {
  name: 'v-orders-list',
  components: {
    vOrdersListItem,
  },
  computed: {
    ...mapState([
      "orders",
      "clients"
    ])
  },
  methods: {
    ...mapActions([
      "FETCH_CLIENTS",
      "FETCH_ORDERS"
    ]),
    toOrderForm() {
      let nextOrderId = 1;
      if (this.orders.length) nextOrderId = this.orders[this.orders.length - 1].id + 1;
      this.$router.replace({
        name: 'order-form',
        params: {'new_order_id': nextOrderId},
        query: {'id': nextOrderId}
      })
    },
    getOrderClientData(order) {
      if(this.clients.length === 1) return this.clients[0].name;
      let curOrderClientObj = this.clients.find((client) => {return client.id === order.client_id});
      if(curOrderClientObj) return curOrderClientObj.name;
    }
  },
  mounted() {
    this.FETCH_ORDERS();
    this.FETCH_CLIENTS();
  }
}
</script>
<template>
  <div class="c-clients-section">
    <button class="c-btn__add-order" @click.prevent="toClientForm">
      Добавить новый
    </button>
    <ul class="c-clients-list">
      <v-clients-list-item
          v-for="client in clients"
          :key="client.id"
          :client_data="client"
          :client_orders="getClientOrders(client.id)"
          :discount_breakpoints="discount_breakpoints"
      ></v-clients-list-item>
    </ul>
  </div>
</template>


<script>
import vClientsListItem from "./v-clients-list-item";
import {mapActions, mapState} from "vuex";

export default {
  name: 'v-clients-list',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    vClientsListItem,
  },
  computed: {
    ...mapState([
      "orders",
      "clients",
      "discount_breakpoints",
    ])
  },
  methods: {
    ...mapActions([
      "FETCH_ORDERS",
      "FETCH_CLIENTS",
      "FETCH_DISCOUNT_BREAKPOINTS",
    ]),
    toClientForm() {
      // let nextOrderId;
      // if(this.orders.length) nextOrderId = this.orders[this.orders.length - 1].id + 1;
      // else nextOrderId = 1;
      // this.$router.replace({
      //   name: 'order-form',
      //   params: {'id': nextOrderId},
      //   query: {'id': nextOrderId}
      // })
    },
    getClientOrders(client_id) {
      return this.orders.filter(order => {
        return order.client_id === client_id
      });
    }
  },
  mounted() {
    this.FETCH_ORDERS();
    this.FETCH_CLIENTS();
    this.FETCH_DISCOUNT_BREAKPOINTS();
  }
}
</script>
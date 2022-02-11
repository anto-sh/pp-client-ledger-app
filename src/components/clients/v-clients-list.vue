<template>
  <div class="c-clients-section">
    <button class="c-btn__add-order" @click.prevent="toClientForm">
      Добавить новый
    </button>
    <ul class="c-clients-list">
      <v-clients-list-item
          v-for="client of clients"
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
    vClientsListItem,
  },
  computed: {
    ...mapState([
      "discount_breakpoints",
      "orders",
      "clients"
    ])
  },
  methods: {
    ...mapActions([
      "FETCH_CLIENTS",
      "FETCH_ORDERS",
      "FETCH_DISCOUNT_BREAKPOINTS",
    ]),
    toClientForm() {
      let nextClientId = 1;
      if(this.clients.length) nextClientId = this.clients[this.clients.length - 1].id + 1;
      this.$router.replace({
        name: 'client-form',
        params: {'new_client_id': nextClientId},
        query: {'id': nextClientId}
      })
    },
    getClientOrders(client_id) {
      return this.orders.filter(client => {
        return client.client_id === client_id
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
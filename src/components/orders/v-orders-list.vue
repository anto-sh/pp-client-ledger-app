<template>
  <div class="c-orders-section">
    <button class="c-btn__add-order" @click.prevent="toOrderForm">
      Добавить новый
    </button>
    <ul class="c-orders-list">
      <v-orders-list-item
          v-for="order in orders"
          :key="order.id"
          :order_data="order"
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
    // eslint-disable-next-line vue/no-unused-components
    vOrdersListItem,
  },
  computed: {
    ...mapState([
      "orders"
    ])
  },
  methods: {
    ...mapActions([
      "FETCH_ORDERS"
    ]),
    toOrderForm() {
      let nextOrderId;
      if(this.orders.length) nextOrderId = this.orders[this.orders.length - 1].id + 1;
      else nextOrderId = 1;
      this.$router.replace({
        name: 'order-form',
        params: {'id': nextOrderId},
        query: {'id': nextOrderId}
      })
    }
  },
  mounted() {
    this.FETCH_ORDERS();
  }
}
</script>
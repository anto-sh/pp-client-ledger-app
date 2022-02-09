<template>
  <div class="home">
    <v-orders-list></v-orders-list>
  </div>
</template>

<script>
import vOrdersList from "../components/orders/v-orders-list";
import {mapActions} from "vuex";

export default {
  name: 'Orders',
  components: {
    vOrdersList
  },
  methods: {
    ...mapActions([
        "SET_CURRENT_PAGE"
    ])
  },
  mounted() {
    this.SET_CURRENT_PAGE("Заказы")
  }
}
</script>

<template>
  <li class="c-orders-list__item" @click="toOrderPage">
    <p class="c-order-li__name">Название: {{order_data.name}}</p>
    <p class="c-order-li__cost">Стоимость: {{order_data.cost}} грошей</p>
    <p class="c-order-li__client-name">Гражданин: {{client_name}}</p>
    <p class="c-order-li__end-date">Дата конца: {{order_data.end_date}}</p>
    <button class="c-order-li__btn--delete" @click.prevent.stop="deleteOrder">Удалить</button>
  </li>
</template>


<script>

import {mapActions} from "vuex";

export default {
  name: 'v-orders-list-item',
  data() {
    return {}
  },
  props: {
    order_data: {
      type: Object,
      default: () => {
        return {}
      },
    },
    client_name: {
      type: String,
      default: () => ""
    }
  },
  methods: {
    ...mapActions([
        "DELETE_ORDER_FROM_DB"
    ]),
    toOrderPage() {
      this.$router.push({
        name: 'order',
        params: { 'order_data': this.order_data, 'client_name': this.client_name},
        query: { 'id': this.order_data.id }
      })
    },
    deleteOrder() {
      this.DELETE_ORDER_FROM_DB(this.order_data.id);
    },
  }
}
</script>
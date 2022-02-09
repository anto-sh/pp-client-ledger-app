<template>
  <div class="c-order">
    <button class="c-order__btn--back" @click="goBack">Назад</button>
    <p class="c-order__name">{{order_data.name}}</p>
    <p class="c-order__cost">{{order_data.cost}}</p>
    <p class="c-order__client-name">{{order_data.client_name}}</p>
    <p class="c-order__start-date">{{order_data.start_date}}</p>
    <p class="c-order__end-date">{{order_data.end_date}}</p>
    <p class="c-order__comment">{{ order_data.comment }}</p>
    <button class="c-order__btn--delete" @click.prevent="deleteOrder">Удалить</button>
    <button class="c-order__btn--change" @click.prevent="toChangeForm">Изменить</button>
  </div>
</template>


<script>

import {mapActions} from "vuex";

export default {
  name: 'v-order',
  data() {
    return {}
  },
  props: {
    order_data: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    ...mapActions([
      "DELETE_ORDER_FROM_DB"
    ]),
    goBack() {
      this.$router.replace({
        name: "Orders"
      })
    },
    deleteOrder() {
      this.DELETE_ORDER_FROM_DB(this.order_data.id).then(
          () => {
            this.$router.replace({
              name: 'Orders',
            })
          }
      );
    },
    toChangeForm() {
        this.$router.push({
          name: 'order-form',
          params: { 'order_data': this.order_data },
          query: { 'id': this.order_data.id }
        })
    }
  }
}
</script>
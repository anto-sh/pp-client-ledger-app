<template>
  <div class="c-order">
    <button class="c-order__btn--back" @click="goBack">Назад</button>
    <p class="c-order__name">Название: {{order_data.name}}</p>
    <p class="c-order__cost">Стоимость: {{order_data.cost}} грошей</p>
    <p class="c-order__client-name">Гражданин: {{client_name}}</p>
    <p class="c-order__start-date">Дата начала: {{order_data.start_date}}</p>
    <p class="c-order__end-date">Дата конца: {{order_data.end_date}}</p>
    <p class="c-order__comment">Сопроводительная грамота: {{ order_data.comment }}</p>
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
        return {}
      }
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
    goBack() {
      this.$router.replace({
        name: "Orders"
      })
    },
    deleteOrder() {
      this.DELETE_ORDER_FROM_DB(this.order_data.id)
          .then(() => {
            this.$router.replace({
              name: 'Orders',
            })
          }
      );
    },
    toChangeForm() {
        this.$router.push({
          name: 'order-form',
          params: { 'order_data': this.order_data},
          query: { 'id': this.order_data.id }
        })
    }
  }
}
</script>
<template>
  <div class="c-client-block">
    <div class="c-client">
      <button class="c-client__btn--back" @click="goBack">Назад</button>
      <p class="c-client__name">Прозвище: {{ client_data.name }}</p>
      <p class="c-client__tel">Телефония: {{ client_data.tel }}</p>
      <p class="c-client__orders-amount">Сумма заказов: {{ client_finance_data.orders_amount }} грошей</p>
      <p class="c-client__discount">Скидка: {{ client_finance_data.discount_size }} %</p>
      <button class="c-client__btn--delete" @click.prevent="deleteClient">Удалить</button>
      <button class="c-client__btn--change" @click.prevent="toChangeForm">Изменить</button>
    </div>
    <h2>Заказы:</h2>
    <ol class="c-client__orders-list">
      <li class="c-client-order-li" v-for="order of client_orders" :key="order.id" >
        <p class="c-client-order-li__name">Название: {{order.name}}</p>
        <p class="c-client-order-li__cost">Стоимость: {{order.cost}} грошей</p>
        <p class="c-client-order-li__start-date">Дата начала: {{order.start_date}}</p>
        <p class="c-client-order-li__end-date">Дата конца: {{order.end_date}}</p>
        <p class="c-client-order-li__comment">Сопроводительная грамота: {{ order.comment }}</p>
      </li>
    </ol>
  </div>
</template>


<script>

import {mapActions} from "vuex";

export default {
  name: 'v-client',
  data() {
    return {}
  },
  props: {
    client_data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    client_orders: {
      type: Array,
      default: () => {
        return []
      }
    },
    client_finance_data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    ...mapActions([
      "DELETE_CLIENT_FROM_DB"
    ]),
    goBack() {
      this.$router.replace({
        name: "Clients"
      })
    },
    deleteClient() {
      this.DELETE_CLIENT_FROM_DB(this.client_data.id)
          .then(() => {
            this.$router.replace({
              name: 'Clients',
            })
          }
      );
    },
    toChangeForm() {
      this.$router.push({
        name: 'client-form',
        params: {'client_data': this.client_data, client_finance_data: this.client_finance_data},
        query: {'id': this.client_data.id}
      })
    }
  }
}
</script>
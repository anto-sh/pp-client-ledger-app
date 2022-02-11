<template>
  <form class="c-order-form" @submit.prevent="commitOrder">
    <input class="c-order-form__input-text" type="text" placeholder="Номэнклатура работы"
           v-model.trim="fields.name" required>
    <input class="c-order-form__input-text" type="number" placeholder="Стоимость жиз.. заказа"
           v-model.trim.number="fields.cost" required>
    <select class="c-order-form__input-text" placeholder="Клиент" v-model="fields.client_id"  required>
      <option value="" disabled>Это низя</option>
      <option v-for="client of clients" :key="client.id" :value="client.id">{{ client.name }}</option>
    </select>
    <input class="c-order-form__start-date" type="text" placeholder="Дата начала" v-model.trim="fields.start_date">
    <input class="c-order-form__end-date" type="text" placeholder="Дата конца" v-model.trim="fields.end_date">
    <textarea class="c-order-form__input-textarea" type="text" placeholder="Сэр! Будьте добры добавить комментарий"
              v-model.trim="fields.comment"></textarea>
    <button class="c-order-form__btn--back" @click.prevent="goBack">Отмена</button>
    <button type="submit" class="c-order-form__btn--enter">Ок</button>
  </form>
</template>


<script>

import {mapActions, mapState} from "vuex";

export default {
  name: 'v-order-form',
  props: {
    order_data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    new_order_id: {
      type: Number,
      default: () => 0
    },
  },
  data() {
    return {
      fields: {
        id: 0,
        name: "",
        cost: 0,
        client_id: 0,
        start_date: "",
        end_date: "",
        comment: ""
      },
    }
  },
  computed: {
    ...mapState([
        "clients",
    ])
  },
  methods: {
    ...mapActions([
      "ADD_ORDER_TO_DB",
      "UPDATE_ORDER_TO_DB"
    ]),
    goBack() {
      if (this.new_order_id) {
        this.$router.replace({
          name: 'Orders',
        });
      } else if (Object.keys(this.order_data).length) {
        let client_index = this.clients.findIndex((client) => {return client.id === this.order_data.client_id});
        this.$router.replace({
          name: 'order',
          params: {'order_data': this.order_data, "client_name": this.clients[client_index].name},
          query: {'id': this.order_data.id}
        })
      }
    },
    commitOrder() {
      if (this.new_order_id) {
        this.ADD_ORDER_TO_DB(this.fields);
      } else {
        this.UPDATE_ORDER_TO_DB(this.fields);
      }
      let client_index = this.clients.findIndex((client) => {return client.id === this.fields.client_id});
      this.$router.replace({
        name: 'order',
        params: {'order_data': this.fields, "client_name": this.clients[client_index].name},
        query: {'id': this.fields.id}
      })
    },
  },
  mounted() {
    let orderData = this.order_data;
    if (Object.keys(orderData).length) {
      this.fields = {
        id: orderData.id,
        name: orderData.name,
        cost: orderData.cost,
        client_id: orderData.client_id,
        start_date: orderData.start_date,
        end_date: orderData.end_date,
        comment: orderData.comment
      }
    } else if (this.new_order_id) {
      this.fields.id = this.new_order_id;
    }
  }
}
</script>
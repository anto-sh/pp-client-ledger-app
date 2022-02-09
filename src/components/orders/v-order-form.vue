<template>
  <form class="c-order-form" @submit.prevent="commitOrder">
    <input class="c-order-form__input-text" v-model.trim="fields.name" required>
    <input class="c-order-form__input-text" v-model.trim.number="fields.cost" required>
    <input class="c-order-form__input-text" v-model.trim="fields.client_name" required>
    <input class="c-order-form__start-date" v-model.trim="fields.start_date">
    <input class="c-order-form__end-date" v-model.trim="fields.end_date">
    <textarea class="c-order-form__comment" v-model.trim="fields.comment"></textarea>
    <button class="c-order-form__btn--back" @click.prevent="goBack">Отмена</button>
    <button type="submit" class="c-order-form__btn--enter">Ок</button>
  </form>
</template>


<script>

import {mapActions} from "vuex";

export default {
  name: 'v-order-form',
  props: {
    order_data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    id: {
      type: Number,
      default: () => {
        return 0;
      }
    }
  },
  data() {
    let orderData = this.order_data;
    if ( Object.keys(orderData).length) {
      return {
        fields: {
          id: orderData.id,
          name: orderData.name,
          cost: orderData.cost,
          client_name: orderData.client_name,
          start_date: orderData.start_date,
          end_date: orderData.end_date,
          comment: orderData.comment
        }
      }
    } else if (this.id) {
      return {
        fields: {
          id: this.id,
          name: "",
          cost: 0,
          client_name: "",
          start_date: "",
          end_date: "",
          comment: ""
        },
      }
    }
  },
  methods: {
    ...mapActions([
        "ADD_ORDER_TO_DB",
        "UPDATE_ORDER_TO_DB"
    ]),
    goBack() {
      if (this.id) {
        this.$router.replace({
          name: 'Orders',
        });
      } else if (Object.keys(this.order_data).length) {
        this.$router.replace({
          name: 'order',
          params: { 'order_data': this.order_data },
          query: { 'id': this.order_data.id }
        })
      }
    },
    commitOrder() {
      if(this.id) {
        this.ADD_ORDER_TO_DB(this.fields);
      } else {
        this.UPDATE_ORDER_TO_DB(this.fields);
      }
      this.$router.replace({
        name: 'order',
        params: { 'order_data': this.fields },
        query: { 'id': this.fields.id }
      })
    },
  }
}
</script>
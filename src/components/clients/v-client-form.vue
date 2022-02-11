<template>
  <form class="c-client-form" @submit.prevent="commitForm">
    <input class="c-client-form__input-text" type="text" placeholder="Имя гражданина" v-model.trim="fields.name" required>
    <input class="c-client-form__input-text" type="tel" placeholder="Телефония" v-model.trim="fields.tel" required>
    <button class="c-client-form__btn--back" @click.prevent="goBack">Отмена</button>
    <button type="submit" class="c-client-form__btn--enter">Ок</button>
  </form>
</template>


<script>

import {mapActions, mapState} from "vuex";

export default {
  name: 'v-client-form',
  props: {
    client_data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    new_client_id: {
      type: Number,
      default: () => 0
    },
    client_finance_data: {
      type: Object,
      default: () => {
        return {
          orders_amount: 0,
          discount_size: 0,
        }
      }
    }
  },
  data() {
    return {
      fields: {
        id: 0,
        name: "",
        tel: "",
      },
    }
  },
  methods: {
    ...mapActions([
      "ADD_CLIENT_TO_DB",
      "UPDATE_CLIENT_TO_DB"
    ]),
    goBack() {
      if (this.new_client_id) {
        this.$router.replace({
          name: 'Clients',
        });
      } else if (Object.keys(this.client_data).length) {
        this.$router.replace({
          name: 'client',
          params: {'client_data': this.client_data, 'client_finance_data': this.client_finance_data},
          query: {'id': this.client_data.id}
        })
      }
    },
    commitForm() {
      if (this.new_client_id) {
        this.ADD_CLIENT_TO_DB(this.fields);
      } else {
        this.UPDATE_CLIENT_TO_DB(this.fields);
      }
      this.$router.replace({
        name: 'client',
        params: {'client_data': this.fields, 'client_finance_data': this.client_finance_data},
        query: {'id': this.fields.id}
      })
    },
  },
  mounted() {
    let clientData = this.client_data;
    if (Object.keys(clientData).length) {
      this.fields = {
        id: clientData.id,
        name: clientData.name,
        tel: clientData.tel
      }
    } else if (this.new_client_id) {
      this.fields.id = this.new_client_id;
    }
  }
}
</script>
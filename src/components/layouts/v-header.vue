<template>
  <header>
    <p class="c-header__current-page-name">{{ current_page }}</p>
    <router-link :to="{name: 'Orders'}">
      <span>Заказы</span>
    </router-link>
    <router-link :to="{name: 'Clients'}">
      <span>Клиенты</span>
    </router-link>
  </header>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "v-header",
  computed: {
    ...mapState([
      "current_page"
    ])
  }
}
</script>
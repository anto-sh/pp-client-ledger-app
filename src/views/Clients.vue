
<template>
  <div class="home">
    <v-clients-list></v-clients-list>
  </div>
</template>

<script>
import vClientsList from "../components/clients/v-clients-list";
import {mapActions} from "vuex";

export default {
  name: 'Clients',
  components: {
    vClientsList
  },
  methods: {
    ...mapActions([
      "SET_CURRENT_PAGE"
    ])
  },
  mounted() {
    this.SET_CURRENT_PAGE("Клиенты")
  }
}
</script>

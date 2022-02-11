<template>
  <div id="app">
    <v-header></v-header>
    <router-view/>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vHeader from "./components/layouts/v-header"
import vFooter from "./components/layouts/v-footer"

export default {
  name: 'App',
  components: {
    vHeader,
    vFooter
  }
}
</script>

<template>
  <div>
    <MapEntity></MapEntity>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Map",
  data() {
    return {
      component: ""
    };
  },
  methods: {},
  computed: {}
});
</script>
<style scoped>
</style>

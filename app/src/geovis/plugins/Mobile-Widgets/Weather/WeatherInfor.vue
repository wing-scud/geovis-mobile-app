<template>
  <div class="left-bottom-weather">阴天 12°</div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "WeatherInfor",
  data() {
    return {};
  },
  methods: {}
});
</script>
<style scoped>
.left-bottom-weather {
  position: fixed;
  bottom: 50px;
  left: 5px;
  width: 80px;
  z-index: 3;
  height: 20px;
  color: white;
  font-size: 12px;
}
</style>

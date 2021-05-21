<template>
  <div class="left-bottom-weather">{{data.weather}}</div>
</template>
<script lang="ts">
import Vue from "vue";
import manager from "./store";
export default Vue.extend({
  name: "WeatherInfor",
  data() {
    return {
      data:""
    };
  },
  async mounted() {
    this.data = await manager.getBriefWeather();
  },
  methods: {},
});
</script>
<style scoped>
.left-bottom-weather {
  position: absolute;
  bottom: 0;
  left: 5px;
  width: 80px;
  z-index: 3;
  height: 20px;
  color: white;
  font-size: 12px;
}
</style>

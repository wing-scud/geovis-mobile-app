<template>
  <div class="titlebar">
    地理信息基础平台
  </div>
</template>

<script lang="ts">
import Vue from "vue";

const TitleBar = Vue.extend({
  name: "TitleBar"
});

export default TitleBar;
</script>

<style lang="scss">
.titlebar {
  user-select: none;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: rgb(38, 50, 56);
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;

  color: white;
  font-size: 32px;
}
</style>

<template>
  <div></div>
</template>
<script lang="ts">
import Vue from "vue";
const x = Vue.extend({
  name: "",
  data() {
    return {
      view: ""
    };
  },
  methods: {},
  beforeDestroy() {
    // this.view.destroy();
  },
  mounted() {
    // this.view = new EcahrtsProvider(earth, option);
  }
});
export default x;
</script>
<style scoped></style>

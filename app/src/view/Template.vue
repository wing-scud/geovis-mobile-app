<template>
  <div class="full">
    <van-nav-bar title="关于" left-text="返回" left-arrow @click-left="goBack" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "",
  data() {
    return {};
  },
  methods: {    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },}
});
</script>
<style scoped></style>

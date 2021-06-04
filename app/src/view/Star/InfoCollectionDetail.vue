<template>
  <div class="full">
    <van-nav-bar title="关于" left-text="返回" left-arrow @click-left="goBack" />
    <InfoDetail :id="id"></InfoDetail>
  </div>
</template>
  <script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "InfoCollectionDetail",
  data() {
    return {
      id: "",
    };
  },
  beforeMount() {
    this.id = this.$route.params.id;
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
  },
});
</script>
  <style scoped></style>
  
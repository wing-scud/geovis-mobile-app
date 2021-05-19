<template>
  <div class="full" :style="{ backgroundImage: backgroundImage }">
    <van-nav-bar :title="city" left-text="返回" left-arrow @click-left="goBack" @click-right="goSearchPage">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <TodayDetail></TodayDetail>
  </div>
</template>
  <script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "FeatureWeather",
  data() {
    return {
      city: "",
    };
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    goSearchPage() {
      this.$router.push({ name: "SearchCity" });
    },
  },
});
</script>
  <style lang="scss" scoped>
</style>
  
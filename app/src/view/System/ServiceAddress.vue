<template>
  <div class="full">
    <van-nav-bar title="服务地址设置" left-text="返回" left-arrow right-text="确认" @click-left="goBack" @click-right="confirm"></van-nav-bar>
    <div class="service-items">
      <template v-for="item in items">
        <div class="service-item" :key="item.name">
          <MIpInput v-model="ipAddress" :label="item.title"></MIpInput>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { serviceItems } from "./store";
export default Vue.extend({
  name: "ServiceAddress",
  data() {
    return {
      items: serviceItems,
      ipAddress: [
        {
          value: "192"
        },
        {
          value: "168"
        },
        {
          value: "16"
        },
        {
          value: "20"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    confirm() {
      this.$router.push({ name: "Person" });
    }
  }
});
</script>
<style scoped lang="scss">
.service-items {
  width: 100%;
}
.service-item {
  width: calc(100% - 10px);
  margin: 5px;
  height: 40px;
  flex-direction: row;
  justify-content: flex-start;
  display: flex;
}
.service-title {
  width: 80px;
  font-size: 15px;
}
.service-address {
  flex-shrink: 1;
  display: flex;
}
.address-input {
  width: 30px;
  /* flex-grow: 1; */
  height: 30px;
}
.ipAddress{
  color:$lightgray-word;
}
</style>

<template>
  <div class="full">
    <van-nav-bar title="账户与安全" left-arrow @click-left="goBack" />
    <van-cell :title="item.title" is-link @click="handleClick(item.name)" :key="item.name" v-for="item in items"> </van-cell>
    <van-button @click="loginOut" block>退出登录</van-button>
    <!-- <van-cell title="退出登录" is-link @click="loginOut"> </van-cell> -->
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { AccountAndSafeItems } from "./store";
export default Vue.extend({
  name: "AccountAndSafe",
  data() {
    return {
      items: AccountAndSafeItems
    };
  },
  methods: {
    handleClick(name) {
      let params;
      if (name === "EditPersonInfor") {
        params = {
          oldPassword: "111111",
          type: "password",
          title: "修改密码",
          user: {
            name: "xiaowang",
            sex: true,
            birthday: new Date(1999, 9, 1),
            tel: 12345671212,
            img: require("../../assets/images/bg1.jpeg"),
            hometown: "110101"
          }
        };
      }
      this.$router.push({ name: name, params: params });
    },
    goBack() {
            //@ts-ignore
      this.$router.backward(-1);
    },
    loginOut() {
      this.$store.dispatch("user/loginOut");
      this.$router.push({ name: "Index" });
    }
  }
});
</script>
<style scoped></style>

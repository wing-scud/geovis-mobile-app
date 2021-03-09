<template>
  <div class="login-page">
    <div class="main-part">
      <div class="app-name">geovis-app-mobile</div>
      <div class="login-part">
        <div class="input">
          <van-field v-model="account" label="账户" />
        </div>
        <div class="input">
          <van-field v-model="password" type="password" label="密码" />
        </div>
        <van-button type="primary" block to="index">登录</van-button>
        <div class="register-tootip white-font">没有账号，<router-link to="/register" class="white-font register">去注册</router-link></div>
      </div>
      <div class="clause">注册/登录即代表你年满18周岁，已认真阅读并同意接受服务条款、隐私政策</div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Login",
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {}
});
</script>
<style scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/background.png");
  position: fixed;
  display: flex;
  background-size: 100% 100%;
  justify-content: center;
  align-items: center;
}
.main-part {
  width: 300px;
  /* height: 400px; */
}
.app-name {
  font-size: 20px;
  color: white;
  height: 50px;
  line-height: 50px;
  background-color: #0971e7;
  text-align: center;
}
.register {
  text-decoration: underline;
}
.register-tootip {
  text-align: center;
}
.white-font {
  color: white;
}
.clause {
  position: fixed;
  width: calc(100% - 15px);
  padding: 0 15px;
  height: 40px;
  bottom: 0;
  left: 0;
  font-size: 12px;
  color: #cacaca;
  text-align: left;
}
</style>

<template>
  <div class="login-page">
    <div class="app-name">geovis-app-mobile</div>
    <div class="main-part">
      <div class="login-fields">
        <van-field v-model="account" label="账户" class="custom-input" />
        <van-field v-model="password" type="password" label="密码" class="custom-input" />
        <div class="custom-login">
          <router-link to="/index">登录</router-link>
        </div>
        <div class="login-item">
          <span class="forget-password">忘记密码？</span>
          <span class="register-tooltip">没有账号，<router-link to="/register" class=" register">去注册</router-link></span>
        </div>
      </div>
    </div>
    <div class="clause">注册/登录即代表你年满18周岁，已认真阅读并同意接受服务条款、隐私政策</div>
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
  background-image: url("../../assets/images/bg2.jpeg");
  position: fixed;
  display: flex;
  flex-direction: column;
  background-size: 100% 100%;
  justify-content: center;
  align-items: center;
  color: white;
}
.main-part {
  width: 300px;
  height: 200px;
  background: rgb(241 241 241 / 0%);
  padding: 40px 30px 40px 30px;
  box-shadow: -15px 15px 15px rgb(6 17 47 / 70%);
}
.app-name {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.register {
  text-decoration: underline;
}
.clause {
  position: fixed;
  width: calc(100% - 15px);
  padding: 0 15px;
  height: 40px;
  bottom: 0;
  left: 0;
  font-size: 12px;
  text-align: left;
  color: white;
}

.custom-input {
  background-color: transparent;
  margin: 5px 0;
}
.custom-login {
  text-align: center;
  margin: 10px auto;
  /* border-radius: 50%; */
  width: 150px;
  height: 50px;
  line-height: 50px;
  background-color: #0992eceb;
  color: white;
}
.custom-login a {
  color: white;
}
.login-item {
  display: inline;
  width: 100%;
}
.forget-password {
  float: left;
}
.register {
  color: white;
}
.register-tooltip {
  /* text-align: center; */
  float: right;
}
.van-field__control{
  color:white;
}
</style>

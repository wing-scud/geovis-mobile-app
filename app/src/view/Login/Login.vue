<template>
  <div class="login-page">
    <div class="app-name">geovis-app-mobile</div>
    <div class="main-part">
      <div class="login-fields">
        <van-field v-model="name" label="账户名称" clearable class="custom-input" />
        <van-field v-model="password" type="password" clearable label="密码" class="custom-input" />
        <van-checkbox v-model="remember" class="login-remeber">记住我</van-checkbox>
        <div class="custom-login" @click="loginSubimit">登录</div>
        <div class="login-item">
          <span class="forget-password">忘记密码？</span>
          <span class="register-tooltip">没有账号，<router-link to="/Register" class="register">去注册</router-link></span>
        </div>
      </div>
    </div>
    <div class="clause">注册/登录即代表你年满18周岁，已认真阅读并同意接受服务条款、隐私政策</div>
  </div>
</template>
<script lang="ts">
import { Toast } from "vant";
import Vue from "vue";
export default Vue.extend({
  name: "Login",
  data() {
    return {
      name: "",
      password: "",
      remember: false,
    };
  },
  methods: {
    async loginSubimit() {
      const result = await this.$store.dispatch("user/login", { username: this.name, password: this.password, rememberMe: this.remember });
      if (result) {
        this.$router.push({ name: "Index" });
      } else {
        Toast("login error");
      }
    },
  },
});
</script>
<style scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/bg1.jpeg");
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
  padding: 20px 30px 40px 30px;
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
.van-field__control {
  color: white;
}
.login-remeber {
  justify-content: flex-end;
  padding: 4px 8px;
  color: white;
  text-align: center;
}
.login-remeber >>> .van-checkbox__label {
  color: white;
  font-size: 12px;
}
.login-remeber >>> .van-checkbox__icon{
  border-color: white;
  flex: none;
  font-size: 15px;
}
.login-remeber >>> .van-icon {
  border-color: white;
  flex: none;
  font-size: 12px;
}
</style>

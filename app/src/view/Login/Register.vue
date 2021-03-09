<template>
  <div class="registrt-page">
    <div class="title">注册</div>
    <div class="form">
      <div class="input-item">
        <van-field v-model="accountName" required label="用户名" placeholder="请输入用户名" />
      </div>
      <div class="input-item">
        <van-field v-model="phone" type="tel" required label="手机号"  placeholder="请输入手机号" />
      </div>
      <div class="input-item">
        <van-field v-model="password" type="password" required label="密码" placeholder="请输入密码" />
      </div>
      <div class="input-item">
        <van-field v-model="identifyCode" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <template #button>
            <van-button size="small" type="primary">发送验证码</van-button>
          </template>
        </van-field>
      </div>
    </div>
    <div class="foot">
      <van-button type="primary" @click="registerAccount" block>注册</van-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Register",
  data() {
    return {
      accountName: "",
      phone: "",
      password: "",
      identifyCode: ""
    };
  },
  methods: {
    registerAccount() {}
  }
});
</script>
<style scoped>
.registrt-page {
  width: calc(100% - 20px);
  height: calc(100% - 40px);
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
}
.title {
  font-size: 16px;
  color: black;
  height: 30px;
  width:50px;
  line-height: 30px;
}
.form {
  flex-grow: 1;
}
.input-item {
  width: 100%;
  height: 50px;
  margin: 5px 0;
}
.foot{
    width: 100px;
    height: 30px;
}
</style>

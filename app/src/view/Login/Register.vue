<template>
  <div class="registrt-page">
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="goBack" />
    <div class="form">
      <div class="input-item">
        <van-field v-model="name" required label="账户" placeholder="请输入账户" />
      </div>
      <div class="input-item">
        <van-field v-model="nickname" required label="昵称" placeholder="请输入昵称" />
      </div>
      <div class="input-item">
        <van-field v-model="phone" type="tel" required label="手机号" placeholder="请输入手机号" />
      </div>
      <div class="input-item">
        <van-field v-model="password" type="password" required label="密码" placeholder="请输入密码" />
      </div>
      <!-- <div class="input-item">
        <van-field v-model="zip_code" type="text" required label="地区" placeholder="请输入地区" />
      </div> -->
      <div class="input-item">
        <div class="input-field">
          <span class="register-label">性别</span>
          <van-radio-group v-model="sex" class="register-input" direction="horizontal">
            <van-radio name="male">男</van-radio>
            <van-radio name="female"> 女</van-radio>
          </van-radio-group>
        </div>
      </div>
      <div class="input-item">
        <van-field v-model="identifyCode" center clearable label="验证码" placeholder="请输入短信验证码">
          <template #button>
            <van-button size="small" type="primary">发送验证码</van-button>
          </template>
        </van-field>
      </div>
    </div>
    <div class="foot">
      <van-button type="primary" class="normal-button" @click="registerAccount" block>注册</van-button>
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable */
import Vue from "vue";
export default Vue.extend({
  name: "Register",
  data() {
    return {
      name: "",
      nickname: "",
      phone: "",
      password: "",
      identifyCode: "",
      sex: "",
      //@ts-ignore
      zip_code: "",
    };
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    registerAccount() {
      const SERVER_ROOT = window['sceneData'].SERVER_ROOT;
      const registerUrl =SERVER_ROOT+'/api/user/register'
      const formData = new FormData();
      const options = {
        name: this.name,
        nickname: this.nickname,
        phone: this.phone,
        password: this.password,
        sex: this.sex,
        //@ts-ignore
        zip_code: this.zip_code,
      };
      Object.keys(options).forEach((key) => {
        formData.append(key, options[key]);
      });
      fetch(registerUrl, {
        method: "POST",
        mode: "cors",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            this.$router.push({name:"Login"})
          } 
        });
    },
  },
});
</script>
<style scoped>
.registrt-page {
  position: fixed;
  top: 0;

  left: 0;
  align-items: center;
  width: 100%;
  height: 100%;
}
.title {
  font-size: 16px;
  color: black;
  height: 30px;
  width: 50px;
  line-height: 30px;
}
.form {
  /* flex-grow: 1; */
}
.input-item {
  width: 100%;
  height: 50px;
  margin: 5px 0;
  font-size: 14px;
}
.input-field {
  display: flex;
  flex-direction: row;
  padding: 10px 16px;
}
.register-label {
  width: 3.2rem;
}
.register-input {
  margin-left: 10px;
}
.foot {
  width: 100%;
  height: 40px;
  text-align: center;
}
.normal-button {
  width: 100px;
  margin: 10px auto;
  height: 100%;
}
</style>

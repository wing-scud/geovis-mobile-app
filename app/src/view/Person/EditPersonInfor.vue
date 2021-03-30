<template>
  <div class="full">
    <van-nav-bar :title="name" left-text="返回" left-arrow :right-text="confirmText" @click-left="goBack" @click-right="confirm"></van-nav-bar>
    <van-field v-model="user.tel" type="tel" label="手机号" ref="tel" v-if="type === 'tel'" />
    <van-field v-model="user.name" label="用户名" border ref="name" v-if="type === 'name'" />
    <van-area title="地区" :area-list="areaList" :value="user.hometown" @confirm="onConfirmAddress" v-if="type === 'hometown'" />
    <van-radio-group v-model="user.sex" direction="horizontal" class="custom-sexbox" v-if="type === 'sex'">
      <van-radio :name="true">男</van-radio>
      <van-radio :name="false"> 女</van-radio>
    </van-radio-group>
    <van-calendar title="出生时间" :poppable="false" :show-confirm="true" ref="date" :style="{ height: '500px' }" :min-date="minDate" v-if="type === 'birthday'" @confirm="onConfirmBirthday" />
    <div class="edit-password" v-if="type === 'password'">
      <van-field v-model="oldPassword" type="password" label="原密码" />
      <van-field v-model="newPassword" type="password" label="新密码" />
      <van-field v-model="confirmPassword" :error-message="passwordError" type="password" label="确认新密码" @input="verifyPassword" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { areaList } from "./area";
export default Vue.extend({
  name: "EditPersonInfor",
  data() {
    return {
      name: "",
      type: "",
      user: {
        name: "xiaowang",
        sex: true,
        birthday: new Date(1999, 9, 1),
        tel: 12345671212,
        img: require("../../assets/images/bg1.jpeg"),
        hometown: "110101"
      },
      areaList: areaList,
      minDate: new Date("1970-01-01 00:00:00"),
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      passwordError: "",
      confirmText: ""
    };
  },
  mounted() {
    const params = this.$route.params;
    this.name = params.title;
    this.type = params.type;
    //@ts-ignore
    this.user = params.user;
    if (params.oldPassword) {
      this.oldPassword = params.oldPassword;
    }
    if (["birthday", "hometown"].indexOf(this.type) === -1) {
      this.confirmText = "确认";
    }
  },
  updated() {
    if (this.type === "birthday") {
      //@ts-ignore
      this.$refs.date.reset(this.user.birthday);
      //@ts-ignore
      //   this.$refs.date.scrollToDate(this.user.birthday);
    } else if (this.type === "name" || this.type === "tel") {
      //@ts-ignore
      this.$refs[this.type].focus();
    }
  },
  beforeDestroy() {},
  watch: {
    user: {
      deep: true,
      handler() {
        console.log("change", this.user);
      }
    }
  },
  methods: {
    verifyPassword() {
      if (this.confirmPassword.length === this.newPassword.length) {
        if (this.confirmPassword !== this.newPassword) {
          this.passwordError = "请保持二次输入密码一致";
        } else {
          this.passwordError = "";
        }
      }
    },
    goBack() {
      this.$router.back();
    },
    confirm() {
      const type = this.type;
      let name = "";
      if (type === "password") {
        name = "AccountAndSafe";
      } else {
        name = "PersonInfor";
      }
      this.$router.push({ name: name });
    },
    onConfirmBirthday(date) {
      this.user.birthday = date;
      console.log("birthday", date);
      this.$router.push({ name: "PersonInfor" });
    },
    onConfirmAddress(array) {
      this.user.birthday = array[2].code;
      this.$router.push({ name: "PersonInfor" });
    }
  }
});
</script>
<style scoped>
.custom-sexbox {
  width: 90%;
  padding: 10px 5%;
}
.edit-password {
  width: 100%;
}
</style>

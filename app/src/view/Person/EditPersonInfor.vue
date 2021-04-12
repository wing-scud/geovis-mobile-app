<template>
  <div class="full">
    <van-nav-bar :title="name" left-text="返回" left-arrow :right-text="confirmText" @click-left="goBack" @click-right="confirm"></van-nav-bar>
    <van-field v-model="user.tel" type="tel" label="手机号" ref="tel" autofocus :error-message="errorMessage" @input="validatorTel" v-if="type === 'tel'" />
    <van-field v-model="user.name" label="用户名" border ref="name" v-if="type === 'name'" />
    <van-area title="地区" :area-list="areaList" :value="user.hometown" @confirm="onConfirmAddress" v-if="type === 'hometown'" />
    <van-radio-group v-model="user.sex" direction="horizontal" class="custom-sexbox" v-if="type === 'sex'">
      <van-radio :name="1">男</van-radio>
      <van-radio :name="0"> 女</van-radio>
    </van-radio-group>
    <van-calendar title="出生时间" :poppable="false" :show-confirm="true" ref="date" :style="{ height: '500px' }" :min-date="minDate" v-if="type === 'birthday'" @confirm="onConfirmBirthday" />
    <div class="edit-password" v-if="type === 'password'">
      <van-field v-model="user.password" type="password" label="原密码" />
      <van-field v-model="newPassword" type="password" label="新密码" />
      <van-field v-model="confirmPassword" :error-message="errorMessage" type="password" label="确认新密码" @input="verifyPassword" />
    </div>
  </div>
</template>
<script lang="ts">
//@ts-nocheck
import Vue from "vue";
import { areaList } from "./area";
export default Vue.extend({
  name: "EditPersonInfor",
  data() {
    return {
      name: "",
      type: "",
      user: {},
      areaList: areaList,
      minDate: new Date(1900, 1, 1),
      newPassword: "",
      cobeforenfirmPassword: "",
      confirmText: "",
      errorMessage: ""
    };
  },
  beforeMount() {
    const params = this.$route.params;
    this.name = params.title;
    this.type = params.type;
    //@ts-ignore
    this.user = params.user;
    if (["birthday", "hometown"].indexOf(this.type) === -1) {
      this.confirmText = "确认";
    }
  },
  updated() {
    if (this.type === "birthday") {
      const date = new Date(this.user.birthday);
      //@ts-ignore
      this.$refs.date.reset(date);
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
          this.errorMessage = "请保持二次输入密码一致";
        } else {
          this.errorMessage = "";
        }
      }
    },
    goBack() {
      this.$router.backward(-1);
    },
    confirm() {
      const type = this.type;
      let name = "";
      if (type === "password") {
        this.user.password = this.newPassword;
        name = "AccountAndSafe";
      } else {
        name = "PersonInfor";
      }
      this.$store.dispatch("user/changeUser", this.user).then(res => {
        if (res.status) {
          this.$router.push({ name: name });
        } else {
          this.errorMessage = res.error;
        }
      });
    },
    onConfirmBirthday(date) {
      this.user.birthday = this.formateDate(date);
      this.confirm();
    },
    formateDate(date) {
      let fmt = "yyyy-MM-dd";
      const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (const k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      return fmt;
    },
    onConfirmAddress(array) {
      this.user.hometown = array[2].code;
      this.confirm();
    },
    validatorTel() {
      this.errorMessage = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(this.user.tel) ? "" : "手机号格式错误";
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

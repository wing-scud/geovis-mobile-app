<template>
  <div class="full">
    <van-nav-bar :title="name" left-text="返回" left-arrow @click-left="goBack"></van-nav-bar>
    <van-field v-model="user.tel" type="tel" label="手机号" ref="tel" v-if="type === 'tel'" />
    <van-field v-model="user.name" label="用户名" border ref="name" v-if="type === 'name'" />
    <van-area title="地区" :area-list="areaList" :value="user.hometown" @confirm="onConfirmAddress" v-if="type === 'hometown'" />
    <van-radio-group v-model="user.sex" direction="horizontal" class="custom-sexbox" v-if="type === 'sex'">
      <van-radio :name="true">男</van-radio>
      <van-radio :name="false"> 女</van-radio>
    </van-radio-group>
    <van-calendar title="出生时间" :poppable="false" :show-confirm="false" ref="date" :style="{ height: '500px' }" :min-date="minDate" v-if="type === 'birthday'" @confirm="onConfirm" />
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
      minDate: new Date("1970-01-01 00:00:00")
    };
  },
  mounted() {
    const params = this.$route.params;
    this.name = params.title;
    this.type = params.type;
    //@ts-ignore
    this.user = params.user;
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
    goBack() {
      this.$router.back();
    },
    onConfirm(date) {
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
</style>

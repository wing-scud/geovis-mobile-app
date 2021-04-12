<template>
  <div class="person-infor">
    <van-nav-bar title="个人信息" left-arrow @click-left="goBack" />
    <van-cell title="头像" is-link class="person-infor-img" @click="chooseImg">
      <template v-slot:default>
        <van-image width="40" height="40" :src="user.headshot" class="custom-user-img" fill="fill" />
      </template>
    </van-cell>
    <van-cell title="用户名" :value="user.name" is-link @click="changeUserInfor('name')"> </van-cell>
    <van-cell title="性别" :value="user.sex ? '男' : '女'" is-link @click="changeUserInfor('sex')"> </van-cell>
    <van-cell title="出生日期" :value="user.birthday" is-link @click="changeUserInfor('birthday')"> </van-cell>
    <van-cell title="手机号" :value="user.tel" is-link @click="changeUserInfor('tel')"> </van-cell>
    <van-cell title="地区" :value="formateAddress(user.hometown)" is-link @click="changeUserInfor('hometown')"> </van-cell>
  </div>
</template>
<script lang="ts">
// @ts-nocheck
/* eslint-disable */
import Vue from "vue";
import { areaList } from "./area";
export default Vue.extend({
  name: "PersonInfor",
  data() {
    return {
      user: {},
    };
  },
  // 需要再挂载节点时，就渲染数据
  beforeMount() {
    this.user = this.$store.state.user.user;
  },
  methods: {
    chooseImg() {
      const cameraPlugin = window.cordovaPlugin["camera"];
      cameraPlugin.openFilePicker().then((imageUrl) => {
        console.log(imageUrl);
        this.user.headshot = imageUrl;
      });
    },
    changeUserInfor(type) {
      const names = ["用户名", "性别", "出生日期", "手机号", "地区"];
      const types = ["name", "sex", "birthday", "tel", "hometown"];
      const name = names[types.indexOf(type)];
      this.$router.push({
        name: "EditPersonInfor",
        params: {
          type: type,
          //@ts-ignore
          user: this.user,
          name: name,
        },
      });
    },
    formateAddress(postalCode) {
      let hometown = "";
      //match province
      const provinceSlice = postalCode.substr(0, 2);
      const provinceCode = provinceSlice + "0000";
      hometown += areaList.province_list[provinceCode];
      // match city
      const citySlice = postalCode.substr(2, 2);
      const cityCode = provinceSlice + citySlice + "00";
      hometown += areaList.city_list[cityCode];
      //match county
      const countyCode = postalCode;
      hometown += areaList.county_list[countyCode];
      return hometown;
    },
    goBack() {
      this.$router.push({name:"Person"});
    },
  },
});
</script>
<style scoped>
.person-infor {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>

<template>
  <div class="person-infor">
    <van-nav-bar title="个人信息" left-arrow @click-left="goBack" />
    <div class="headshot">
      <input type="file" name="image" id="headshot-picker" :multiple="false" accept="image/*" @change="setImagePreview($event)" />
      <van-cell title="头像" is-link class="person-infor-img" @click="chooseImg">
        <template v-slot:default>
          <van-image width="40" height="40" :src="profilePhoto" class="custom-user-img" fill="fill" />
        </template>
      </van-cell>
    </div>
    <van-cell title="用户名" :value="user.nickname" is-link @click="changeUserInfor('nickname')"> </van-cell>
    <van-cell title="性别" :value="user.sex === 'man' ? '男' : '女'" is-link @click="changeUserInfor('sex')"> </van-cell>
    <van-cell title="出生日期" :value="user.birthday" is-link @click="changeUserInfor('birthday')"> </van-cell>
    <van-cell title="手机号" :value="user.tel" is-link @click="changeUserInfor('tel')"> </van-cell>
    <van-cell title="地区" :value="formateAddress(user.postCode)" is-link @click="changeUserInfor('postCode')"> </van-cell>
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
      profilePhoto: "",
    };
  },
  // 需要再挂载节点时，就渲染数据
  async beforeMount() {
    this.user = this.$store.state.user.user;
    this.profilePhoto = await this.getLocalImage(this.user.profilePhoto);
  },
  methods: {
    async setImagePreview(e) {
      const files = e.target.files;
      await this.$store.dispatch("user/changeUser", {
        type: "profilePhoto",
        value: files[0],
      });
      this.profilePhoto = await this.getLocalImage(this.$store.state.user.user.profilePhoto);
    },
    chooseImg() {
      document.getElementById("headshot-picker").click();
    },
    changeUserInfor(type) {
      const names = ["用户名", "性别", "出生日期", "手机号", "地区"];
      const types = ["nickname", "sex", "birthday", "tel", "postCode"];
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
    formateAddress(postCode) {
      let hometown = "";
      //match province
      const provinceSlice = postCode.substr(0, 2);
      const provinceCode = provinceSlice + "0000";
      hometown += areaList.province_list[provinceCode] ?? "";
      // match city
      const citySlice = postCode.substr(2, 2);
      const cityCode = provinceSlice + citySlice + "00";
      hometown += areaList.city_list[cityCode] ?? "";
      //match county
      const countyCode = postCode;
      hometown += areaList.county_list[countyCode] ?? "";
      return hometown;
    },
    goBack() {
      this.$router.push({ name: "Person" });
    },
    async getLocalImage(path) {
      const filePlugin = window["plugin"].file;
      return await filePlugin.readFileAsync(path);
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
.headshot {
  position: relative;
  height: 67px;
}
.person-infor-img {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
#headshot-picker {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
}
</style>

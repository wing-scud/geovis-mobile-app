<template>
  <div class="person-infor">
    <van-nav-bar title="个人信息" left-arrow @click-left="goBack" />
    <van-cell title="头像" is-link class="person-infor-img" @click="chooseImg">
      <template v-slot:default>
        <van-image width="40" height="40" :src="user.img" class="custom-user-img" fill="fill" />
      </template>
    </van-cell>
    <van-cell title="用户名" :value="user.name" is-link @click="changeUserInfor('name')"> </van-cell>
    <van-cell title="性别" :value="user.sex ? '男' : '女'" is-link @click="changeUserInfor('sex')"> </van-cell>
    <van-cell title="出生日期" :value="formateDate(user.birthday)" is-link @click="changeUserInfor('birthday')"> </van-cell>
    <van-cell title="手机号" :value="user.tel" is-link @click="changeUserInfor('tel')"> </van-cell>
    <van-cell title="地区" :value="formateAddress(user.hometown)" is-link @click="changeUserInfor('hometown')"> </van-cell>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { areaList } from "./area";
export default Vue.extend({
  name: "PersonInfor",
  data() {
    return {
      user: {
        name: "xiaowang",
        sex: true,
        birthday: new Date(1999, 9, 1), //默认月是从0开始
        tel: 12345671212,
        img: require("../../assets/images/bg1.jpeg"),
        hometown: "340421"
      }
    };
  },
  mounted() {
  },
  methods: {
    chooseImg() {
      console.log("change img");
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
          name: name
        }
      });
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
    formateAddress(postalCode) {
      if (areaList.county_list[postalCode]) {
        return areaList.county_list[postalCode];
      }
      if (areaList.province_list[postalCode]) {
        return areaList.province_list[postalCode];
      }
      if (areaList.city_list[postalCode]) {
        return areaList.city_list[postalCode];
      }
    },
    goBack() {
      this.$router.back();
    }
  }
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

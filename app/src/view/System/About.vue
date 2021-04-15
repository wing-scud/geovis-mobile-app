<template>
  <div class="full">
    <van-nav-bar title="关于" left-text="返回" left-arrow @click-left="goBack" />
    <div class="software-infor">
      <div >
        <van-image src="../../../assets/images/logo.png" width="80" height="80" fit="cover"> </van-image>
        <div class="app-name">手持终端</div>
        <div class="app-intro">手机端地图应用</div>
        <div class="app-version">v0.1</div>
      </div>
    </div>
    <van-cell title="检查更新" is-link>
      <template #icon>
        <van-icon name="search" class="search-icon custom-icon" />
      </template>
    </van-cell>
    <van-cell title="用户手册" is-link>
      <template #icon>
        <van-icon name="search" class="search-icon custom-icon" />
      </template>
    </van-cell>
    <div class="copyright-bottom">Copyright @ 2021-2025 手持终端</div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "About",
  data() {
    return {};
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
  },
});
</script>
<style scoped>
.software-infor {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  background-color: #cac7c7a1;
  text-align: center;
  color: #252727bd;
}
.custom-icon{
    line-height: 25px;
    margin: 0 5px 0 0;
}
.copyright-bottom {
  position: fixed;
  bottom: 30px;
  left: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 13px;
  color: rgb(146, 146, 146);
  text-align: center;
}
.app-name {
  font-size: 15px;
}
.app-intro {
  font-size: 13px;
}
.app-version {
  font-size: 12px;
}
</style>

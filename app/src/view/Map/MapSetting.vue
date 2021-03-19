<template>
  <div class="full-screen">
    <!-- mapsetting -->
    <div class="title">
      地图控件管理
    </div>
    <div class="setting">
      <van-cell-group>
        <van-cell title="放大缩小">
          <template v-slot:default> <van-switch v-model="zoom" size="24px" /> </template
        ></van-cell>
        <van-cell title="指南针">
          <template v-slot:default> <van-switch v-model="compass" size="24px" /> </template
        ></van-cell>
        <van-cell title="搜索">
          <template v-slot:default> <van-switch v-model="compass" size="24px" /> </template
        ></van-cell>
        <van-cell title="导航">
          <template v-slot:default> <van-switch v-model="compass" size="24px" /> </template
        ></van-cell>
        <van-cell title="天气小挂件">
          <template v-slot:default> <van-switch v-model="compass" size="24px" /> </template
        ></van-cell>
        <van-cell title="地图基础挂件">
          <template v-slot:default> <van-switch v-model="compass" size="24px" /> </template
        ></van-cell>
        <van-cell title="锁定位置">
          <template v-slot:default> <van-switch v-model="compass" size="24px" /> </template
        ></van-cell>
        <van-cell title="信息">
          <template v-slot:default> <van-switch v-model="compass" size="24px" /> </template
        ></van-cell>
        <van-cell title="全屏">
          <template v-slot:default> <van-switch v-model="compass" size="24px" /> </template
        ></van-cell>
        <van-cell title="时间">
          <template v-slot:default> <van-switch v-model="compass" size="24px" /> </template
        ></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "MapSetting",
  data() {
    return {
      zoom: false,
      compass: false
    };
  },
  methods: {}
});
</script>
<style scoped>
.title {
  width: 96%;
  padding: 5px 2%;
  height: 30px;
  font-size: 20px;
  line-height: 30px;
}
.setting {
  font-size: 20px;
}
</style>

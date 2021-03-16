<template>
  <div class="full-screen">
    <!-- mapsetting -->
    <div class="title">
      地图设置
    </div>
    <div class="setting">
      <van-cell-group>
        <van-cell title="放大缩小">
          <template v-slot:default> <van-switch v-model="zoom" size="24px" /> </template
        ></van-cell>
        <van-cell title="指南针">
          <template v-slot:default> <van-switch v-model="compass" size="24px" /> </template
        ></van-cell>
        <!-- 允许输入数字，调起带符号的纯数字键盘 -->
        <van-field v-model="vectorAddress" label="矢量地图端口" />
        <van-field v-model="weatherAddress" label="天气地图端口" />
        <van-field v-model="friendAddress" label="友邻地图端口" />
        <van-field v-model="divisionAddress" label="区划地图端口" />
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
      vectorAddress: "192.168.16.20",
      divisionAddress: "192.168.16.20",
      weatherAddress: "192.168.16.20",
      friendAddress: "192.168.16.20",
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

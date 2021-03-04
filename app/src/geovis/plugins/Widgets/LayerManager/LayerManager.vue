<template>
  <div>
    <transition name="fade">
      <div class="sidebar">
        <el-card class="box-card" style="background-color: #414141;color: white;border: 1px solid #414141">
          <div class="tile">图层</div>
          <ul style="padding:5px 0px 0px 0px">
            <li id="img" class="imgStyle">全球基础影像</li>
            <li id="map" class="mapStyle">全球基础地图</li>
            <li id="terrain" class="terrainStyle">全球基础地形</li>
            <li id="placenames" class="placeStyle">全球排名</li>
            <li id="countour" class="countourStyle">矢量疆界</li>
          </ul>
          <div class="tile">矢量瓦片</div>
          <ul style="padding:5px 0px 0px 0px">
            <li id="OSMBright" class="OSMBrightStyle">OSM Bright</li>
            <li id="klokantech-basic" class="klokantech-basicStyle">
              klokantech-basic
            </li>
            <li id="Positron" class="PositronStyle">全球基础影像</li>
            <li id="FiordColor" class="FiordColorStyle">FiordColor</li>
          </ul>
        </el-card>
      </div>
    </transition>
  </div>
</template>
<style src="./sliderBar.scss" lang="scss"></style>
<script>
export default {
  //接收父组件传值
  props: {
    sidebarShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      data: []
    };
  },
  methods: {}
};
</script>

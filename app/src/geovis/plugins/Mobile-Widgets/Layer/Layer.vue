<template>
  <van-popup v-model="popShow" transition-appear  position="right" :style="{ width: '200px', height: '100%' }" :close-on-popstate="true" @close="closePopup">
    <div class="layer">
      <div class="layer-data">
        <van-checkbox-group v-model="checkedMap">
          <div class="head">离线地图</div>
          <div class="offline-map map-layer">
            <div class="image-container" v-for="(item, index) in offlineImages" :key="item['id']" @click="toggleImageProvider(index, 'offline')">
              <van-image fit="cover" src="static/data/Layer/gaode.png" class="image" />
              <!-- <van-image fit="cover" :src="item['imgURL']" class="image" /> -->
              <div class="image-name">
                {{ item.name }}
              </div>
              <div class="check-box">
                <van-checkbox :name="item['id']" ref="offlineCheckboxes"></van-checkbox>
              </div>
            </div>
          </div>
          <div class="head">在线地图</div>
          <div class="online-map map-layer">
            <div class="image-container" v-for="(item, index) in onlineImages" :key="item['id']" @click="toggleImageProvider(index, 'online')">
              <van-image fit="cover" src="static/data/Layer/gaode.png" class="image" />
              <!-- <van-image fit="cover" :src="item['imgURL']" class="image" /> -->
              <div class="image-name">
                {{ item.name }}
              </div>
              <div class="check-box">
                <van-checkbox :name="item['id']" ref="onlineCheckboxes"></van-checkbox>
              </div>
            </div>
          </div>
          <div class="head">其他</div>
          <!-- <van-cell title="友邻位置" is-link /> -->
          <van-cell title="天气地图" is-link />
          <van-cell title="下载管理" is-link to="/downloadManager"/>
          <van-cell title="其他地图" is-link />
          <van-cell title="收藏管理" is-link to="/star"/>
          <!-- <div class="map-item">其他地图</div> -->
        </van-checkbox-group>
      </div>
      <div class="foot">
        <van-button :to="{ name: 'MapSetting' }" color="#7232dd" class="block-button" plain block>地图控件管理</van-button>
      </div>
    </div>
  </van-popup>
</template>
<script lang="ts">
import Vue from "vue";
import { earthStore } from "@/geovis/store";
export default Vue.extend({
  name: "Layer",
  data() {
    return {
      offlineImages: [],
      onlineImages: [],
      checkedMap: [],
      popShow: true
    };
  },
  mounted() {
    const tree = earthStore.sceneManager.state.tree;
    const [offlineImages, onlineImages, checkedMap] = this.parseTree(tree);
    this.offlineImages = offlineImages;
    this.onlineImages = onlineImages;
    this.checkedMap = checkedMap;
  },
  methods: {
    closePopup() {
      earthStore.togglePlugin("Layer", false);
    },
    toggleImageProvider(index, mode) {
      const layers = mode === "offline" ? this.offlineImages : this.onlineImages;
      const id = layers[index].id;
      const checkboxs = mode === "offline" ? this.$refs.offlineCheckboxes : this.$refs.onlineCheckboxes;
      const checkbox = checkboxs[index];
      earthStore.sceneManager.setChecked(id, !checkbox.checked);
      checkbox.toggle();
    },
    parseTree(tree) {
      let offlineImages;
      let onlineImages;
      const checkedMap = [];
      tree.map(node => {
        if (node.name === "离线地图") {
          offlineImages = node.children;
        }
        if (node.name === "在线地图") {
          onlineImages = node.children;
        }
        node.children.map(layer => {
          if (layer.checked) {
            checkedMap.push(layer.id);
          }
        });
      });
      return [offlineImages, onlineImages, checkedMap];
    }
  }
});
</script>
<style lang="scss">
.layer .van-checkbox__icon--checked .van-icon{
 background-color:$select-color!important;
 border-color:$select-color!important;
}
</style>
<style scoped lang="scss">
.layer {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  background:$board-color;
}
.layer-data {
  flex-grow: 1;
  padding: 5px 1.6%;
  /* text-align: center; */
}
.van-popup{
  width:245px!important;
}
.van-cell{
  background:$board-color;
  color:$lightgray-word;
  border-bottom: $split-line;
}
.van-cell::after{
  all:initial;
}
.map-layer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  text-align: center;
}
.head {
  margin: 5px 0;
  padding: 3px 3px;
  font-size: 13px;
  // background-color: #c7c7c76e;
  background-color:$light-blue;
  color:$darkgray-word;
}
.image-container {
  // height: 75px;
  width: 30%;
  margin: 0 1.66%;
  position: relative;
  color:$lightgray-word;
}
.image {
  width: 100%;
  height: calc(100% - 20px);
  min-height: 50px;
}
.image-name {
  margin: 2px auto;
  width: 60px;
  height: 16px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
.van-image {
  display: block;
}
.check-box {
  position: absolute;
  top: 0;
  right: 0;
}
.foot {
  width: 100%;
  height: 35px;
}
.block-button
{
  height: 100%;
  border:$highlight-border!important;
  color:$highlight!important;
  background:$board-color;
}
</style>

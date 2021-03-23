<template>
  <div class="full-screen">
    <div class="title"><van-icon name="arrow-left" size="25" @click="goBack" /><span class="title-text">地图控件管理</span></div>
    <div class="setting">
      <van-cell-group>
        <van-cell v-for="item in mapPlugins" :title="item.name" :key="item.id">
          <template v-slot:default> <van-switch size="24px" v-model="bindVModels[item.id]" @change="toggleMapPlugin(item.id)" /> </template
        ></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script lang="ts">
import { earthStore } from "@/geovis/store";
import Vue from "vue";
export default Vue.extend({
  name: "MapSetting",
  data() {
    return {
      state: earthStore.state,
      bindVModels: {},
      mapPlugins: []
    };
  },
  watch: {
    state: {
      deep: true,
      handler() {
        const mapPlugins = [];
        const pluginMap = this.state.pluginMap;
        Object.keys(pluginMap).forEach(key => {
          if (pluginMap[key].parent === "map") {
            if (!this.bindVModels[key]) {
              this.bindVModels[key] = pluginMap[key].enabled;
            }
            mapPlugins.push(pluginMap[key]);
          }
        });
        this.mapPlugins = mapPlugins;
      },
      immediate: true
    }
  },
  methods: {
    toggleMapPlugin(id) {
      const actived = this.bindVModels[id];
      earthStore.enablePlugin(id, actived);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
});
</script>
<style scoped>
.title {
  font-size: 20px;
  display: inline-flex;
  align-items: center;
  margin: 5px 5px;
}
.title-text{
margin:0 5px;
}
.setting {
  font-size: 20px;
}
</style>

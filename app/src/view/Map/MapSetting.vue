<template>
  <div class="full-screen">
    <van-nav-bar title="地图控件管理" left-text="返回"  left-arrow @click-left="goBack"  />
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
          if (pluginMap[key].parent === "Map") {
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
            //@ts-ignore
      this.$router.backward(-1);
    }
  }
});
</script>
<style scoped>
.setting {
  font-size: 20px;
}
</style>

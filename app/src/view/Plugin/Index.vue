<template>
  <div class="full">
    <van-nav-bar title="应用">
   </van-nav-bar>
    <div class="module" v-for="array in pluginTree" :key="array.id">
      <div class="plugin-title">{{ array.name }}</div>
      <van-grid class="plugin-grid" :column-num="4" square clickable>
        <van-grid-item v-for="plugin in filterPlugins(array.items)" :key="plugin.id" @click="handleClick(plugin)">
          <template v-slot:icon>
            <MIcon :icon="plugin.icon" size="24px" length="30px"></MIcon>
          </template>
          <template v-slot:text>
            <span class="plugin-name">{{ plugin.name }}</span>
          </template>
        </van-grid-item>
      </van-grid>
      <van-empty description="暂无内容" v-if="array.items.length <= 0" image-size="100" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { earthStore } from "@/geovis/store";
export default Vue.extend({
  name: "Index",
  data() {
    return {
      state: earthStore.state,
      pluginTree: []
    };
  },
  watch: {
    "state.pluginMap": {
      deep: true,
      immediate: true,
      handler() {
        const pluginTree = this.state.pluginTree;
        this.pluginTree = pluginTree;
      }
    }
  },
  methods: {
    filterPlugins(items) {
      return items.filter(item => item.componentIcon);
    },
    handleClick(plugin) {
      if (plugin.type === "route") {
        this.$router.push({ name: plugin.id });
      } else {
        //plugin.type==="component"
        this.$router.push({ name: plugin.parent });
      }
      earthStore.togglePlugin(plugin.id, true);
    }
  }
});
</script>
<style scoped>
.module {
  width: 94%;
  margin: 5px 0;
  padding: 5px 3%;
}
.plugin-title {
  width: 100%;
  font-size: 15px;
  margin-bottom: 8px;
}
.plugin-grid {
  width: 100%;
  padding: 0 5px;
}
.plugin-name {
  font-size: 12px;
}
</style>

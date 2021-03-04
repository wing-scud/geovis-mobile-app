<template>
  <div>
    <gv-icon icon="app" class="plugin-icon" :active="showPanel" @click="togglePanel()" />
    <gv-panel ref="plugin-panel" v-show="showPanel" :height="600" @close="showPanel = false">
      <el-collapse class="scroll" v-model="activeCollapse">
        <el-collapse-item v-for="mainNode of earthState.pluginTree" :key="mainNode.id" :name="mainNode.id">
          <span slot="title" class="scroll-item" style="font-size:16px">{{ mainNode.name }}</span>
          <div :key="plugin.id" v-for="plugin of mainNode.items" class="gv-plugin">
            <div class="title">
              <gv-icon :hover="false" :icon="plugin.icon" :width="24" :height="24" style="    padding-top: 4px;" />
              <span>{{ plugin.name }}</span>
            </div>
            <el-switch class="switch" v-model="plugin.enabled" active-color="#177DDC" inactive-color="#5B5B5B"> </el-switch>
          </div>
        </el-collapse-item>
      </el-collapse>
    </gv-panel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { earthStore } from "@/geovis/store";

const PluginManager = Vue.extend({
  name: "PluginManager",
  data() {
    return {
      earthState: earthStore.state,
      showPanel: false,
      currentMutexPlugin: ""
    };
  },
  mounted() {},
  computed: {
    activeCollapse(): string[] {
      return this.earthState.pluginTree.map(node => node.id);
    }
  },
  methods: {
    togglePanel(val) {
      if (val !== undefined) {
        this.showPanel = val;
      } else {
        this.showPanel = !this.showPanel;
      }
      if (this.showPanel) {
        this.$refs["plugin-panel"]["$el"]["style"].top = `50%`;
        this.$refs["plugin-panel"]["$el"]["style"].left = `50%`;
        this.$refs["plugin-panel"]["$el"]["style"].transform = `translate(-50%,-50%)`;
      }
    }
  }
});

export default PluginManager;
</script>

<style lang="scss">
.plugin-icon {
  position: absolute;
  left: 16px;
  bottom: 10px;
}

.scroll {
  height: 100%;
}

.scroll-item {
  font-size: 16px;
}

.gv-plugin {
  display: flex;
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  justify-content: space-between;

  .switch {
    height: 34px;
  }

  .title {
    display: flex;
  }

  span {
    padding-left: 10px;
  }
}
</style>

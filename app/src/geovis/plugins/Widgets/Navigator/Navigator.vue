<template>
  <div>
    <!--------------------------左侧导航条 ------------------->
    <el-container style="position:absolute;height:100%;width:60px;left:0px;top:0px">
      <el-menu style="height:100%; width:60px;background-color:#263238;border-right:solid 1px #263238;">
        <el-card class="panel-card" body-style="padding: 0;">
          <div style="padding: 0px 13px;">
            <el-avatar :size="30" :src="circleUrl" style="margin:10px 0px"></el-avatar>
          </div>
          <el-tooltip :key="item.id" v-for="item of plugins" class="item" effect="dark" :content="item.name" placement="right">
            <div class="nav-button">
              <div @click="togglePlugin(item.id)">
                <gv-icon :icon="item.icon" class="panelStyle" :width="25" :height="25" :active="item.active" />
              </div>
            </div>
          </el-tooltip>
        </el-card>
      </el-menu>
    </el-container>
    <!--------------------------左侧导航条end ------------------->
    <!--------------------------右侧工具条start ------------------->
    <el-container class="nav-tools">
      <el-tooltip :key="item.id" v-for="item of tools" class="item" effect="dark" :content="item.name" placement="right">
        <div class="nav-button">
          <div @click="togglePlugin(item.id)">
            <gv-icon :icon="item.icon" class="panelStyle" :width="25" :height="25" :active="item.active" />
          </div>
        </div>
      </el-tooltip>
    </el-container>
    <!-- <layerSlider :sidebarShow="layersidebarShow"></layerSlider>
    <sateliteSlider :sidebarShow="satelitesidebarShow"></sateliteSlider>
    <buildingSlider :sidebarShow="buildingsidebarShow"></buildingSlider> -->
    <!-- <dialogBox
      :visible="dialogBoxShow"
      :title="dialogBoxTitle"
      :width="dialogBoxWidth"
      v-on:dialogBoxClose="dialogBoxClose"
    ></dialogBox> -->
  </div>
</template>
<style src="./Navigator.scss" lang="scss"></style>
<script lang="ts">
import Vue from "vue";
import { earthStore } from "@/geovis/store";
// import layerSlider from "../siderBar/layer.vue";
// import sateliteSlider from "../siderBar/satelite.vue";
// import buildingSlider from "../siderBar/building.vue";
// import dialogBox from "../siderBar/dialogBox.vue";
// import  {pluginTree} from "./list"

export default Vue.extend({
  name: "App",
  props: ["pluginTree"],
  data() {
    return {
      // pluginTree,
      earthState: earthStore.state,
      circleUrl: "./static/icon/user.png"
      // dialogBoxWidth: "20%",
      // dialogBoxTitle: "我是测试页"
    };
  },

  computed: {
    tools() {
      const list = [];
      this.earthState.pluginTree.map(mainNode => {
        mainNode.items.map(item => {
          if (item.type === "tool" && item.enabled) {
            list.push(item);
          }
        });
      });
      return list;
    },
    plugins() {
      const list = [];
      this.earthState.pluginTree.map(mainNode => {
        mainNode.items.map(item => {
          if (item.type === "module" && item.enabled) {
            list.push(item);
          }
        });
      });
      return list;
    }
  },
  methods: {
    togglePlugin: earthStore.togglePlugin
    // 显示 侧滑菜单
  }
});
</script>

<style>
.nav-tools {
  position: absolute;
  right: 10px;
  top: 50%;
  flex-direction: column;
  transform: translateY(-50%);
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

</style>

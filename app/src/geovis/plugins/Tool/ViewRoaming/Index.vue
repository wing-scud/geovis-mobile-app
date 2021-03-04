<template>
  <div>
    <gv-panel :width="320" title="视角变换" class="RoutePlan">
      <div class="mainPart">
        <el-radio-group v-model="activeView" class="options" @change="handclick">
          <el-radio :label="0" class="radio"><b>第一人称</b></el-radio>
          <el-radio :label="1" class="radio">第三人称</el-radio>
          <el-radio :label="2" class="radio">视角漫游</el-radio>
        </el-radio-group>
        <div class="text">
          <div class="title">
            {{ title }}
          </div>
          <div class="content" v-html="introduction"></div>
        </div>
      </div>
    </gv-panel>
    <component v-bind:is="viewPage" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { INTRODUCTION } from "./utils";
import FirstPersonView from "./FirstPersonView/Index.vue";
import ThirdPersonView from "./ThirdPersonView/Index.vue";
import TrackEntityView from "./TrackEntityView/Index.vue";
const ViewRoaming = Vue.extend({
  name: "ViewRoaming",
  components: {
    FirstPersonView,
    ThirdPersonView,
    TrackEntityView
  },
  data() {
    return {
      activeView: 0
    };
  },
  computed: {
    title(): string {
      const viewType = ["第一人称", "第三人称", "视角漫游"];
      return viewType[this.activeView];
    },
    introduction(): string {
      return INTRODUCTION[this.activeView];
    },
    viewPage(): string {
      const Page = ["FirstPersonView", "ThirdPersonView", "TrackEntityView"];
      return Page[this.activeView];
    }
  },
  methods: {
    handclick(e) {
      console.log(e);
    }
  }
});
export default ViewRoaming;
</script>

<style lang="scss">
.mainPart {
  width: 100%;
  height: 100%;
}

.options {
  display: inline-flex;
}

.radio {
  font-size: 15px !important; //无效
  flex-grow: 1;
  margin-right: 10px;
}

.text {
  width: 100%;
  margin-top: 10px;
  height: 320px;
  color: white;
}

.title {
  height: 20px;
  width: 100%;
  text-align: left;
  font-size: 15px;
  font-weight: 400;
}
.content {
  width: 100%;
  padding-top: 10px;
  font-size: 12px;
  text-align: left;
}
ol {
  padding-inline-start: 20px;
  font-size: 14px;
}
ol li {
  margin-top: 20px;
}
</style>

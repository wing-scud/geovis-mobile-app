<template>
  <div>
    <!-- 中间信息框 -->
    <div class="gv-info-panel">
      <div slot="header" class="gv-info-item">
        <span>第一人称视角</span>
        <el-switch v-model="enabled" @change="toggleEnabled" active-color="#409eff"></el-switch>
        <span class="text item">{{ enabled ? "当前视高" : "默认视高" }}:{{ viewerState.eyeHeight.toFixed(2) }}</span>
      </div>
      <div class="gv-info-item">
        <span class="text item">视高控制: Q - E,</span>
        <span class="text item">视角控制: W - S - A- D</span>
        <div class="text item">双击跳转视角, 鼠标拖拽调整朝向</div>
      </div>
    </div>
    <!-- 中间提示框 -->
    <div class="gv-info-tooltip" v-if="showTooltip">请双击选择目的地</div>
    <!-- 地图组件 -->
    <MapView :layerUrl="layerUrl" :nearbyTargets="nearbyTargets" />
    <!-- 右侧目标面板 -->
    <el-card class="gv-targets-panel" v-if="nearbyTargets.length > 0">
      <div slot="header" class="header">
        <span>目标列表</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">返回</el-button> -->
      </div>
      <!-- 右侧目标列表 -->
      <table border="0" class="gv-target-list">
        <tr>
          <th>名称</th>
          <!-- <th>类别</th>
          <th>坐标</th> -->
          <th>距离</th>
          <th>操作</th>
        </tr>
        <tr :key="target.id" v-for="target of nearbyTargets">
          <td>{{ target.name }}</td>
          <!-- <td>{{target.category}}</td>
          <td>{{target.location}}</td> -->
          <td>{{ target.distance }}</td>
          <td>
            <a size="mini" @click="handleEdit(scope.$index, scope.row)">查看</a>
          </td>
        </tr>
      </table>

      <!-- 目标详情 -->
    </el-card>
  </div>
</template>

<script>
import { earthStore } from "@/geovis/store";
import FirstPersonViewer from "./FirstPersonViewer.js";
import MapView from "./Map";
export default {
  name: "FirstPersonView",
  components: {
    MapView
  },
  data() {
    return {
      enabled: false,
      showTooltip: false,
      activeTab: "操作说明",
      viewerState: {
        walkingSpeed: 1.5,
        eyeHeight: 1000,
        withTerrainOffset: false
      },
      layerUrl: "http://mt2.google.cn/vt/x={x}&y={y}&z={z}",
      nearbyTargets: []
    };
  },
  mounted() {
    this._firstPersonViewer = new FirstPersonViewer({
      earth: earthStore.earth,
      eyeHeight: this.viewerState.eyeHeight,
      walkingSpeed: this.viewerState.walkingSpeed,
      withTerrainOffset: this.viewerState.withTerrainOffset
    });
    this.viewerState = this._firstPersonViewer.state;
    earth.camera.on("change", this.syncTargets);
  },
  beforeDestroy() {
    this._firstPersonViewer.stop();
    this.showTooltip = false;
    earthStore.earth.camera.off("change", this.syncTargets);
    earthStore.earth.off("doubleClick", this.pickStartPosition);
  },
  methods: {
    toggleEnabled() {
      // this.enabled = !this.enabled;
      // 重置状态
      this.showTooltip = false;
      earthStore.earth.off("doubleClick", this.pickStartPosition);
      if (this.enabled) {
        // 启动监听
        this.showTooltip = true;
        earthStore.earth.on("doubleClick", this.pickStartPosition);
      } else {
        this._firstPersonViewer.stop();
      }
    },
    pickStartPosition(e) {
      this.showTooltip = false;
      this._firstPersonViewer.start(e.lonlat);
    },
    syncTargets() {
      const { longitude, latitude } = earth.camera.positionCartographic;
      const { toDegrees } = GeoVis.Math;
      const viewport = [toDegrees(longitude), toDegrees(latitude)];

      let randomNum = 10;
      const randomTargets = [];
      while (randomNum > 0) {
        randomNum--;
        randomTargets.push({
          id: randomNum,
          distance: 43243 + "米",
          lonlat: [viewport[0] + Math.random() * 0.1 - 0.05, viewport[1] + Math.random() * 0.1 - 0.05],
          name: "测试目标" + randomNum
        });
      }
      this.nearbyTargets = randomTargets;
    }
  }
};
</script>

<style scoped>
.gv-info-panel {
  position: absolute;
  flex-wrap: wrap;
  display: flex;
  top: 65px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 300px;
  height: 80px;
  background-color: rgba(38, 50, 56, 0.6);
  overflow: hidden;
  color: white;
  font-size: 12px;
  text-align: cenetr;
  border-radius: 10px;
}

.gv-info-item {
  width: 100%;
  padding: 6px 5px 0px 5px;
}
.gv-targets-panel {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  transform: (0, -50%);
  right: 20px;
  width: 300px;
  height: 400px;
  background-color: rgb(38, 50, 56);
  overflow: hidden;
  color: white;
  font-size: 14px;
  text-align: left;
  border: none;
}

.gv-targets-panel .header {
  font-size: 14px;
}

.gv-info-tooltip {
  border-radius: 8px;
  background-color: #8f8f8f9c;
  color: white;
  position: absolute;
  transform: translate(-50%, 0);
  top: 160px;
  left: 50%;
  width: 200px;
  height: 28px;
}

.gv-target-list {
  width: 100%;
}
</style>

<template>
  <div>
    <div class="colorChange">
      <div v-for="(stage, index) of stageItems" :key="index">
        <!-- -------------------功能开关start------------------ -->
        <div class="gv-plugin">
          <div class="title">
            <gv-icon :hover="false" :icon="stage.icon" :width="24" :height="24" style="padding-top: 4px;" />
            <span>{{ stage.title }}</span>
          </div>
          <span  v-if="stage.slider"  class="split">天气特效</span>
          <el-switch class="switch" v-model="stage.enabled" v-if="stage.index" @change="toggleStage(stage)" active-color="#177DDC" inactive-color="#5B5B5B"> </el-switch>
        </div>
        <!-- -------------------功能开关end------------------ -->
        <!-- -------------------属性设置start------------------ -->
        <div class="property-list" v-if="stage.enabled && stage.values.length">
          <div v-for="valueItem of stage.values" :key="valueItem.key" class="everyType">
            <span>{{ valueItem.name }}</span>
            <el-slider v-if="valueItem.type === 'number'" class="switch" @input="updateValue(stage.type, valueItem)" v-model="valueItem.value" :min="valueItem.range[0]" :max="valueItem.range[1]" :step="valueItem.step ? valueItem.step : 1">
            </el-slider>
            <el-switch class="switchbtn" v-if="valueItem.type === 'bool'" @change="updateValue(stage.type, valueItem)" v-model="valueItem.value" > </el-switch>
          </div>
        </div>
        <!-- -------------------属性设置end------------------ -->
      </div>
    </div>
  </div>
</template>

<script>
import { stages } from "./stages";
import PostStageModel from "./PostStageModel";
export default {
  name: "effects",
  data() {
    return {
      stageItems: stages
    };
  },
  mounted() {
    this._stages = {};
    // const camera = earth.scene.camera;
    // camera.position = new GeoVis.Cartesian3(40010447.97500168, 56238683.46406788, 20776576.752223067);
    // camera.direction = new GeoVis.Cartesian3(-0.5549701431494752, -0.7801872010801355, -0.2886452346452218);
    // camera.up = new GeoVis.Cartesian3(-0.3016252360948521, -0.13464820558887716, 0.9438707950150912);
    // camera.right = GeoVis.Cartesian3.cross(camera.direction, camera.up, new GeoVis.Cartesian3());

    // earth.clock.currentTime = new GeoVis.JulianDate(2458047, 27399.860215000022);

    // console.log(GeoVis.PostProcessStageLibrary.isSilhouetteSupported(earth.scene));
    // console.log(GeoVis.PostProcessStageLibrary.isAmbientOcclusionSupported(earth.scene));
    // console.log(GeoVis.PostProcessStageLibrary.isEdgeDetectionSupported(earth.scene));
  },
  methods: {
    toggleStage(stage) {
      if (stage.enabled) {
        this._stages[stage.type] = new PostStageModel(stage);
      } else {
        if (this._stages[stage.type]) {
          this._stages[stage.type].destroy();
          this._stages[stage.type] = undefined;
           }
          switch (stage.type) {
            case "bloom":
              earth.scene.postProcessStages.bloom.enabled = false;
              break;
            case "light":
              earth.scene.globe.enableLighting = false;
              earth.shadows = false;
              break;
            case "shadow":
              earth.scene.shadowMap.enabled = false;
              break;
            case "sun":
              earth.scene.sun.show = false;
              break;
            case "moon":
              earth.scene.moon.show = false;
              break;
            case "skyBox":
              earth.scene.skyBox.show = false;
              break;
            case "skyAtmosphere":
              earth.scene.skyAtmosphere.show = false;
              break;
              case "fog":
              earth.scene.fog.enabled = false;
              break;
          }
      }
    },
    updateValue(stageType, valueItem) {
      const stageModel = this._stages[stageType];
      if (stageModel && stageModel.stage) {
        if(stageType ==="silhouette"){
          stageModel.stage.uniforms.color = GeoVis.Color.YELLOWGREEN;
        }else{
        stageModel.stage.uniforms[valueItem.key] = valueItem.value;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.icon {
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
  color:white;
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

.property-list {
  color: white;
  text-align: left;
  background-color: $gv-panel1;
  padding: 10px 5px;
}
.property-list div span {
  display: inline-block;
  margin: 10px 10px 0 10px;
}

.switchbtn {
  display: inline-block;
}
.split{
  width:100%;
  height:0px;
  font-size:18px;
 }
</style>

<template>
  <div>
    <TsEditorComponent v-on:changeType="changeState" :type="type" v-if="ready.loadState" v-on:closeDraw="drawer = false" v-on:clearAll="clearMoveEntities()" />
    <TsInfor :data="data" :flyState="position" v-if="drawer" v-on:closeDraw="drawer = false" />
    <div class="loading" v-loading="loadState" v-if="loadState" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(255,255,255,0)"></div>
  </div>
</template>
<script>
import { earthStore } from "@geovis/store";
import TsManger from "./TsManager";
import TsInfor from "./TsInfor";
import { solveDataDefault, generateInforByLive } from "./util";
import TsEditorComponent from "./TsEditorPage.vue";
import TsEditor from "./TsEditor.ts";
import store from "./store";
export default {
  name: "Ts",
  components: {
    TsInfor,
    TsEditorComponent
  },
  data() {
    return {
      //changeState type =true 实时 false 历史
      type: true,
      drawer: false,
      position: [],
      dataFetch: false,
      callback: undefined,
      data: {},
      loadState: false,
      _tsManager: undefined,
      ready: false,
      interval: undefined
    };
  },
  async mounted() {
    const earth = earthStore.earth;
    const instance = this;
    const editorOptions = await fetch("static/mb/Option.json").then(res => res.json());
    const editor = new TsEditor(editorOptions, earth);
    const tsManager = new TsManger(earth, editor);
    window.tsManager=tsManager
    this._tsManager = tsManager;
    store.tsManager = tsManager;
    this.ready = store.tsManager.editor.state;
    //默认实时
    this.addLiveTs();
    tsManager.type = true;
    earth.on("click", function(e) {
      const moveEntity = tsManager.pickMoveEntity(e);
      if (moveEntity) {
        console.log(moveEntity);
        //二次点击自身，取消选中
        const oldCurrentMoveEntity = instance._tsManager.currMoveEntity;
        //清除之前的moveEntity
        if (oldCurrentMoveEntity) {
          instance._tsManager.showMarker(oldCurrentMoveEntity.id, false);
          instance._tsManager.removeHistoryPath(oldCurrentMoveEntity.id);
        }
        if (oldCurrentMoveEntity && moveEntity.id === oldCurrentMoveEntity.id) {
          instance.drawer = false;
          instance._tsManager.currMoveEntity = undefined;
        } else {
          instance._tsManager.currMoveEntity = moveEntity;
          instance.drawer = true;
          if (!instance.type) {
            instance._tsManager.showHistoryPath(moveEntity.id);
          }
          instance._tsManager.showMarker(moveEntity.id, true);
          instance.initDrawer();
        }
      }
    });
  },
  methods: {
    addLiveTs() {
      this._worker && this._worker.terminate();
      const worker = new Worker("static/mb/worker.js");
      const ts = this;
      this._worker = worker;
      worker.postMessage({ used: "live" });
      worker.onmessage = function(e) {
        if (e.data && e.data.used === "live") {
          const infors = e.data.infors;
          if (infors && infors.length > 0) {
            infors.map(infor => {
              const id = infor.mbbh.toString();
              if (ts._tsManager.contain(id)) {
                ts._tsManager.updateMoveEntity(id, [infor.lon, infor.lat, infor.alt ? infor.alt : 2000]);
              } else {
                ts._tsManager.addMoveEntity({
                  lon: infor.lon,
                  lat: infor.lat,
                  alt: infor.alt ? infor.alt : 2000,
                  id: id,
                  type: infor.mblb,
                  attribute: {
                    mbxz: infor.mbxz,
                    gjdq: infor.gjdq,
                    wzsj: infor.wzsj,
                    mblb: infor.mblb
                  }
                });
              }
            });
          }
        }
      };
    },
    addHistoryTs() {
      this.dataFetch = false;
      this.loadState = true;
      this._worker && this._worker.terminate();
      const worker = new Worker("static/mb/worker.js");
      worker.postMessage({ used: "history" });
      const instance = this;
      worker.onmessage = function(e) {
        if (e.data && e.data.used === "history") {
          const mbs = e.data.mbs;
          mbs.map(mb => {
            if (mb.trail.length > 0) {
              const id = mb.id;
              const moveEntity = instance._tsManager.addMoveEntity({
                lon: (mb.trail[0] && mb.trail[0][0]) || 0,
                lat: (mb.trail[0] && mb.trail[0][1]) || 0,
                alt: 0,
                id: id
              });
              moveEntity.attribute = {
                model: mb.model,
                airport: mb.airport,
                time: mb.time,
                airline: mb.airline
              };
              instance._tsManager.setMoveEntityHis(mb.id, mb.trail);
              //  instance._tsManager.showHistoryPath(moveEntity.id);
            } else {
              console.log(mb.id + "无数据");
            }
          });
          if (e.data.start && e.data.stop) {
            //const start = GeoVis.JulianDate.fromDate(e.data.start);
            const start = GeoVis.JulianDate.fromDate(new Date("Thu Nov 12 2020 01:57:59 GMT+0800 (中国标准时间)"));
            const stop = GeoVis.JulianDate.fromDate(e.data.stop);
            instance._tsManager.history.setClockInterval(start, stop);
            if (earth.timeline) {
              earth.timeline.zoomTo(start, stop);
            }
            instance._tsManager.history.toggleAniamte(true);
            instance._tsManager.interval = new GeoVis.TimeInterval({ start, stop });
            instance.loadState = false;
            instance.dataFetch = true;
          }
        }
      };
    },
    initDrawer() {
      const moveEntity = this._tsManager.currMoveEntity;
      const ts = this;
      const id = moveEntity.id;
      const attribute = moveEntity.attribute;
      if (this.interval) {
        clearInterval(this.interval);
      }
      const interval = setInterval(() => {
        if (ts._tsManager.currMoveEntity) {
          const carto = GeoVis.Cartographic.fromCartesian(this._tsManager.currMoveEntity.position);
          const longitude = GeoVis.Math.toDegrees(carto.longitude).toFixed(2);
          const latitude = GeoVis.Math.toDegrees(carto.latitude).toFixed(2);
          const height = carto.height.toFixed(2);
          const hpr = moveEntity.model && GeoVis.Transforms.fixedFrameToHeadingPitchRoll(moveEntity.model.modelMatrix);
          const heading = hpr ? GeoVis.Math.toDegrees(hpr.heading).toFixed(2) : "无";
          //const heading = moveEntity.orientation ? GeoVis.Math.toDegrees(moveEntity.orientation.heading).toFixed(2) : "无";
          ts.position = [longitude, latitude, height, heading];
        }
      }, 500);
      this.interval = interval;
      if (this.type) {
        this.data = generateInforByLive(attribute, id);
      } else {
        this.data = solveDataDefault(attribute, id);
      }
    },
    clearMoveEntities() {
      this._worker && this._worker.terminate();
      this.drawer = false;
      this.data = undefined;
      this._tsManager.clearAll();
    },
    changeState(state) {
      const type = this.type;
      const instance = this;
      const earth = earthStore.earth;
      let ids;
      this.clearMoveEntities();
      if (state) {
        earthStore.state.pluginMap["Timeline"].enabled = false;
        this.addLiveTs();
      } else {
        earthStore.state.pluginMap["Timeline"].enabled = true;
        this.addHistoryTs();
      }
      this.type = state;
      store.tsManager.type = state;
    }
  },
  beforeDestroy() {
    this.clearMoveEntities();
    const earth = earthStore.earth;
    earth.off("click");
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  watch: {
    dataFetch: function() {
      if (this.dataFetch && this.callback) {
        this.callback();
        this.callback = undefined;
      }
    },
    ready: {
      deep: true,
      handler() {
        //初始化editor
      }
    }
  }
};
</script>
<style scoped>
.manager {
  position: fixed;
  top: 10px;
  left: 10px;
  font-size: 15px;
}
.operater {
  height: 30px;
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
  color: #409eff;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.loading {
  position: fixed;
  left: 40%;
  top: 40%;
  font-size: 30px;
  width: 300px;
  height: 300px;
  border-radius: 300px;
}
.modelImage {
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
}

.attributeBar {
  font-size: 15px;
  width: 100%;
  height: 30px;
  margin-top: 10px;
}
.attributeTitle {
  font-size: 18px;
  width: 100%;
  height: 30px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.slider {
  width: 60%;
  margin-left: 20px;
}
.infor {
  width: 350px;
  height: 100%;
  min-height: 600px;
  position: fixed;
  right: 0;
  top: 0;
  color: white;
  z-index: 10;
  background-color: rgb(40, 50, 56);
}
.head {
  height: 60px;
  display: inline-flex;
  align-items: center;
}
.title {
  width: 150px;
  height: 100px;
  text-align: center;
  line-height: 100px;
}
.close {
  width: 24px;
  height: 24px;
  margin-left: 150px;
}
.image {
  width: 100%;
  height: 150px;
}
.name {
  width: 100%;
  height: 40px;
  font-size: 15px;
  color: white;
  line-height: 40px;
  text-align: center;
  background-color: #327db6;
}
.flight {
  height: 150px;
  width: 100%;
}
.go {
  width: 46px;
  height: 46px;
  font-size: 30px;
}
.place {
  height: 60px;
  width: 100px;
  font-size: 10px;
}
</style>
<style>
.el-collapse-item__header {
  padding-left: 15px !important;
}

.geovis-custom {
  position: absolute;
  left: 100px;
  bottom: 10px;
  z-index: -1;
  white-space: nowrap;
}

.gv-marker-line {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 45px;
  height: 2px;
  transform: rotate(-45deg) translate(5px, -15px);
  background-color: rgb(0, 229, 255);
}

.geovis-custom-popup-content {
  background-color: rgba(1, 25, 35, 0.5);
  font-family: arial;
  height: auto;
  overflow: hidden;
  text-align: center;
  padding: 10px 25px;
  -moz-box-shadow: 0 0 5px #888;
  -webkit-box-shadow: 0 0 5px #888;
  box-shadow: 0 0 20px rgba(51, 225, 241, 0.7), inset 0 0 20px rgb(0, 229, 255), 0 0 0 #000;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  border: 1px solid rgb(24, 185, 255);
  /* box-shadow: 0 0 5px rgb(51, 239, 255), inset 0 0 5px rgb(0, 229, 255), 0 2px 0 #000; */
  color: white;
  font-size: 45px;
  -webkit-animation: glow 800ms ease-out infinite alternate;
}
.custom-live {
  width: 150px;
  height: 100px;
  background-color: #07a1ffb3;
  border: 1px solid#2a8cfd;
  padding: 10px;
}

.custom-title {
  text-align: center;
  margin: 0 0 5px 0;
  font-size: 15px;
}
</style>

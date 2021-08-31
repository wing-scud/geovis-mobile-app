<template>
  <div class="outLine">
    <div class="infoCard">
      <p>
        <span style="font-size: 32px; color: white;">{{ state.events[index] ? state.events[index].title : "" }}</span>
      </p>
      <span style="font-size: 16px; color: white;">{{ state.events[index] ? state.events[index].description : "" }}</span>
    </div>
    <div class="ctrlBar">
      <el-button :icon="`el-icon-video-${!play ? 'play' : 'pause'}`" style="font-size: 30px; color: white; padding: 4px 10px 0 20px;" @click="setPlay" type="text"></el-button>
      <el-button icon="el-icon-arrow-left" style="font-size: 30px; color: white; padding-top: 4px;" @click="setLastEvent" type="text"></el-button>
      <span style="font-size: 18px; color: white; margin-bottom: 5px">{{ index + 1 + "/" + state.events.length }}</span>
      <el-button icon="el-icon-arrow-right" style="font-size: 30px; color: white; padding-top: 4px;" @click="setNextEvent" type="text"></el-button>
    </div>
  </div>
</template>

<script>
import { earthStore } from "@/geovis/store";
import SceneManager from "./SceneManager/SceneManager";
export default {
  name: "HelloWorld",
  data() {
    return {
      event: "",
      play: false,
      state: {
        events: []
      },
      index: 0
    };
  },
  mounted() {
    earth.clock.shouldAnimate = false;
    const sceneManager = (this.sceneManager = new SceneManager(earth));
    sceneManager.loadScene("./static/data/ScenePlayer/sceneDeploy.json").then(() => {
      earth.clock.onTick.addEventListener(this.handleTick);
      this.sceneManager = sceneManager;
      window.sceneManager = sceneManager;
      this.state = sceneManager.state;
      this.setEvent(this.state.events[0]);
      const timelineModel = earthStore.getPluginState("Timeline");
      this._timelineStateBackup = Object.assign({}, timelineModel);
      timelineModel.enabled = true;
    });
  },
  destroyed() {
    earth.clock.onTick.removeEventListener(this.handleTick);
    earthStore.togglePlugin("Timeline", false);
    this.sceneManager.destroy();
    const timelineModel = earthStore.getPluginState("Timeline");
    timelineModel.enabled = this._timelineStateBackup.enabled;
  },
  methods: {
    handleTick() {
      if (this.state.events.length === 0 || !this.play) return;
      const now = GeoVis.JulianDate.toDate(earth.clock.currentTime).getTime();
      const endTime = GeoVis.JulianDate.toDate(earth.clock.stopTime).getTime();
      if (now > endTime) {
        this.setPlay(false);
        return;
      }
      if (this.index < this.state.events.length - 1) {
        const nextTime = new Date(this.state.events[this.index + 1].currentTime).getTime();
        if (now > nextTime) {
          this.index++;
          this.setEvent(this.state.events[this.index]);
        }
      } else {
        const currentEventTime = new Date(this.state.events[this.index].currentTime).getTime();
        if (now < currentEventTime) {
          this.index = 0;
          this.setPlay();
        }
      }
    },
    setTime(val) {
      this.sceneManager.setTime(val);
    },
    setEvent(event) {
      this.event = event;
      this.sceneManager.setEvent(event);
    },
    setLastEvent() {
      if (this.index > 0) {
        this.index--;
        this.setEvent(this.state.events[this.index--]);
      }
    },
    setNextEvent() {
      let nextIndex;
      if (this.index + 1 === this.state.events.length) {
        nextIndex = 0;
      } else {
        nextIndex = this.index + 1;
      }
      this.setEvent(this.state.events[nextIndex]);
      this.index = nextIndex;
    },
    setPlay(value) {
      if (!this.event) {
        this.setEvent(this.state.events[this.index]);
      }
      if (value === undefined) {
        this.play = !this.play;
        earth.clock.shouldAnimate = this.play;
      } else {
        this.play = value;
        earth.clock.shouldAnimate = this.play;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outLine {
  width: 420px;
  height: 250px;
  padding: 10px;
  position: absolute;
  top: 65px;
  left: 80px;
}

.infoCard {
  width: 400px;
  height: 200px;
  background-color: #383e4a;
  padding: 5px 15px 5px 15px;
  border-radius: 5px;
}

.ctrlBar {
  width: 210px;
  height: 40px;
  background-color: #383e4a;
  margin-top: 10px;
  border-radius: 3px;
}

.ctrlBar button{
  padding: 2px 6px;
  min-width: 40px;
}
</style>
<style >

.custom-timeline-incidentsContainer{
  height: 0!important;
}
</style>

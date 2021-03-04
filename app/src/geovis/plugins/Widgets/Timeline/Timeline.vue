<template>
  <div class="timeline-root" ref="timeline">
    <span  class="playbtn"  @click="gotoStart">       
       <img src="/static/data/Timeline/home.png" />
    </span>
    <span  class="playbtn"  @click="togglePlay" title="播放/暂停">
      <!-- {clockStore.shouldAnimate ? <Icon glyph={Icon.GLYPHS.pause} /> : <Icon glyph={Icon.GLYPHS.play} />} -->
     <!-- {{ play?"暂停":"播放"}} -->
      <img src="/static/data/Timeline/stop.png" v-show="play" /> 
      <img src="/static/data/Timeline/play.png" v-show="!play" />
    </span>
    <span  class="playbtn"  @click="playSlower" title="减速">
      <!-- <Icon glyph={Icon.GLYPHS.backward} /> -->
      <img src="/static/data/Timeline/slow.png" />
    </span>
    <span  class="playbtn"  @click="playFaster" title="加速">
      <!-- <Icon glyph={Icon.GLYPHS.forward} /> -->
      <img src="/static/data/Timeline/fast.png" />
    </span>
  </div>
</template>
<script lang="ts">
import { earthStore } from "@/geovis/store";
import Vue from "vue";
import { formatDate, formatDateTime, formatTime } from "./DateFormats";
const { defined, JulianDate } = GeoVis;
const WrappedTimeline = GeoVis["Timeline"];
const x = Vue.extend({
  name: "",
  data() {
    return {
      locale: "zh-cn",
      _timeline: undefined,
      play:true
    };
  },
  methods: {
    gotoStart() {
      // this.props.clock.currentTime = this.props.clock.startTime;
      //@ts-ignore
      earth.clock.currentTime = earth.timeline._startJulian;
    },
    togglePlay() {
      // if (earth.clock.multiplier < 0) {
      //   earth.clock.multiplier = -this.props.clock.multiplier;
      // }
      this.play = !this.play;
      earth.clock.shouldAnimate = !earth.clock.shouldAnimate;

      // this.props.currentViewer.notifyRepaintRequired();
    },
    playSlower() {
      // this.props.clock.tick();
      earth.clock.multiplier /= 2;

      // this.props.currentViewer.notifyRepaintRequired();
    },
    playFaster() {
      // this.props.clock.tick();
      earth.clock.multiplier *= 2;
      // this.clock.shouldAnimate = true;
      // this.props.currentViewer.notifyRepaintRequired();
    },
    createTimeline() {
      this._timeline = new WrappedTimeline(this.$refs["timeline"], earth.clock);
      earth["_timeline"] = this._timeline;
      this._timeline.makeLabel = time => {
        // if (defined(this.props.terria.timelineStack.top)) {
        //   const layer = this.props.terria.timelineStack.top;
        //   if (defined(layer.dateFormat) && defined(layer.dateFormat.timelineTic)) {
        //     return dateFormat(JulianDate.toDate(time), layer.dateFormat.timelineTic);
        //   }
        // }
        // Adjust the label format as you zoom by using the visible timeline's start and end
        // (not the fixed this.props.terria.timelineClock.startTime and stopTime).
        const startJulian = this._timeline._startJulian;
        const endJulian = this._timeline._endJulian;
        const totalDays = JulianDate.daysDifference(endJulian, startJulian);
        if (totalDays > 14) {
          return formatDate(JulianDate.toDate(time), this.locale);
        } else if (totalDays < 1) {
          return formatTime(JulianDate.toDate(time), this.locale);
        }

        return formatDateTime(JulianDate.toDate(time), this.locale);
      };

      this._timeline.addEventListener(
        "settime",
        e => {
          const clock = e.clock;
          clock.currentTime = e.timeJulian;
          clock.shouldAnimate = true;
          // const timelineStack = this.props.terria.timelineStack;
          // if (timelineStack.top) {
          //   runInAction(() => {
          //     timelineStack.syncToClock(CommonStrata.user);
          //   });
          // }
        },
        false
      );
    },
    destroyTimeline() {
      this._timeline.destroy();
    }
  },
  beforeDestroy() {
    this.destroyTimeline();
    earthStore.earth["_timeline"] = undefined;
  },
  mounted() {
    this.createTimeline();
  }
});
export default x;
</script>
<style lang="scss">
.timeline {
  display: table;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 5px;
  font-family: $font-base;
  position: absolute;
  bottom: 0px;
  background: #3f4854;
  // @media (max-width: $mobile) {
  //   position: fixed;
  //   bottom: 0px;
  //   background: $dark;
  // }
}
.custom-timeline-incidentsContainer{
  display: none;
}
.text-row {
  display: block;
  color: #fff;
  font-size: $font-size-mid-small;
  position: absolute;
  bottom: 42px;
  left: 0px;
  // background: $dark;
  padding: 3px 5px;
  background: #3f4854;
  // @media (max-width: $mobile) {
  //   position: fixed;
  // }
}

.text-cell {
  display: flex;
}

.layer-name-truncated {
  padding-right: $padding-small;

  @media (max-width: $mobile), (min-width: $sm) and (max-width: $lg) {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  @media (max-width: $mobile) {
    max-width: 52vw;
  }

  @media (min-width: $sm) and (max-width: $lg) {
    max-width: 30vw;
  }
}

.controlsRow {
  display: table-row;
}

._timelineNode {
  display: table-cell;
  height: 19px;
  vertical-align: bottom;
}
.timeline-root {
  display: table-cell;
  height: 19px;
  vertical-align: bottom;
  display: table;
  z-index: 10;
  width: calc(100% - 60px);
  padding-top: 5px;
  padding-bottom: 5px;
  font-family: "Nunito", sans-serif;
  position: absolute;
  bottom: 0px;
  background: #283238;
  left: 60px;
  .cesium-timeline {
    &-needle,
    &-trackContainer,
    &-ruler {
      display: none !important;
    }
  }

  .cesium-timeline-main {
    position: relative;
    left: 0;
    bottom: 0;
    overflow: hidden;
    border: solid 0px #888;
  }

  .cesium-timeline-trackContainer {
    width: 100%;
    overflow: auto;
    border-top: solid 1px #888;
    position: relative;
    top: 0;
    left: 0;
  }

  .cesium-timeline-tracks {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .cesium-timeline-needle {
    position: absolute;
    left: 0;
    top: 1.7em;
    bottom: 0;
    width: 1px;
    background: #f00;
  }

  .cesium-timeline-bar {
    position: relative;
    left: 0;
    top: 0;
    overflow: hidden;
    cursor: pointer;
    width: 100%;
    height: 1.7em;
    background-color: #fafafa;
    background: rgba(32, 32, 32, 0.8);
    background: transparent;
  }

  .cesium-timeline-ruler {
    /* NOTE: The label and the ruler must use the same font/size */
    visibility: hidden;
    white-space: nowrap;
    font-size: 80%;
    z-index: -200;
  }

  .cesium-timeline-highlight {
    position: absolute;
    bottom: 0;
    left: 0;
    background: #08f;
  }

  .cesium-timeline-ticLabel {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    font-size: 80%;
    color: #eee;
  }

  .cesium-timeline-ticMain {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 1px;
    height: 50%;
    background: #eee;
  }

  .cesium-timeline-ticSub {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 1px;
    height: 33%;
    background: #aaa;
  }

  .cesium-timeline-ticTiny {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 1px;
    height: 25%;
    background: #888;
  }

  .cesium-timeline-icon16 {
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    // background-image: url(./TimelineIcons.png);
    background-repeat: no-repeat;
  }
}
 .playbtn{
   display:inline-block;
   margin-left:10px;
 }
</style>

<template>
  <v-timeline
    ref="timeline"
    class="timeline-position"
    :timelineItems="timenode"
    :timelineWindow="timeWindow"
    :mode="'EVENT'"
    @clickEvent="clickEvent"
    :eventPause="false"
    @sendTime="sendTime"
    @curNodeUpdate="curNodeUpdate"
    @mouseUp="mouseUp"
  />
</template>
<script>
import { earthStore } from "@/geovis/store";
import TimelineComponent from "./TimelineComponent";
let currentLayer;
const times = [
  [1994, 2, 24],
  [1995, 4, 24],
  [1996, 4, 24],
  [1997, 5, 24],
  [1998, 2, 24],
  [1999, 6, 24],
  [2000, 2, 24],
  [2001, 1, 24],
  [2002, 2, 24],
  [2003, 2, 24],
  [2004, 7, 24],
  [2005, 5, 24],
  [2006, 2, 24],
  [2007, 7, 24],
  [2008, 9, 24],
  [2009, 11, 24],
  [2010, 2, 24],
  [2011, 4, 24],
  [2012, 8, 24],
  [2013, 5, 24],
  [2014, 7, 24],
  [2015, 3, 24],
  [2016, 4, 24],
  [2017, 2, 24],
  [2018, 8, 24],
  [2019, 3, 24]
];
export default {
  data() {
    return {
      timenode: times.map((time, i) => {
        return {
          id: i,
          content: `${time[0]}年${time[1]}月`,
          start: this.computedTime(...time),
          src: `${window["sceneData"].SERVER_ROOT}/raster/time-img/yq${time[0]}/{z1}/{x}/{y}.png`
        };
      }),
      timeWindow: [757389600000, 820461600000]
    };
  },
  components: {
    "v-timeline": TimelineComponent
  },
  methods: {
    computedTime(year, month, day) {
      // timeWindow: [1342674652789, 1371184000000]
      // const date = new Date(2013, 0, 1, 0, 0, 0);
      const date = new Date(year, month - 1, day, 0, 0, 0);
      const d = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
      return d;
    },
    sendTime(e) {
      const start = e.start.getTime();
      const end = e.end.getTime();
      const now = start + (end - start) / 2;
      this.nowstamp = now;
      if (now <= this.timenode[0].start || now >= this.timenode[0].end) return;
    },
    clickEvent(item) {
      if (item) {
        debugger;
        let lastLayer;
        if (currentLayer) {
          lastLayer = currentLayer;
        }
        item = item > this.timenode.length - 1 ? this.timenode.length - 1 : item;
        const layer = (currentLayer = new GeoVis.TileLayer(this.timenode[item].src, {
          projection: "EPSG:4326",
          customTags: {
            z1: function(p, x, y, z) {
              return z + 1;
            }
          }
        }).addTo(earth.layers));
        layer.alpha = 0;
        let lastAlpha = 1.0;
        let currentAlpha = 0.0;

        const layerShow = setInterval(function() {
          if (lastAlpha > 0) {
            lastAlpha = lastAlpha - 0.03;
            lastLayer && (lastLayer.alpha = lastAlpha);
            currentAlpha += 0.03;
            layer.alpha = currentAlpha;
          } else {
            clearInterval(layerShow);
            lastLayer && lastLayer.removeFrom(earthStore.earth.layers);
          }
        }, 30);
      }
    },
    curNodeUpdate(nodeId) {
      this.clickEvent(nodeId);
    },
    mouseUp(nodeId) {
      this.clickEvent(nodeId + 1);
    }
  },
  destroyed() {
    // earth.scene.imageryLayers.remove(lastLayer);
    earth.scene.imageryLayers.remove(currentLayer);
  }
};
</script>
<style src="./assets/css/timeline.css"></style>

<template>
  <div class="root">
    <div class="map" ref="map" />
    <img
      src="./viewport.png"
      v-show="zoom > 9"
      class="viewport"
      :style="{ transform: 'rotate(' + rotate + 'deg)' }"
    />
  </div>
</template>

<script>
// import * as ol from "ol";
// import TileLayer from "ol/layer/Tile";
// import XYZ from "ol/source/XYZ";
// import { transform } from "ol/proj";
import mapboxgl from "mapbox-gl";
export default {
  name: "MapViews",
  props: ["layerUrl", "nearbyTargets"],
  components: {
    // KeyboradTool,
    // PickTool,
    // CameraViewer
  },
  data() {
    return {
      /** @type {mapboxgl.Map} */
      _map: undefined,
      layerCreated: false,
      zoom: 0,
      heading: 0
    };
  },
  computed: {
    rotate() {
      const degree = this.heading;
      return degree;
      // $("#compass").css("transform", "rotate(" + degree + "deg)");
      // $("#compass").css("-webkit-transform", "rotate(" + degree + "deg)");
    }
  },

  mounted() {
    this._map = new mapboxgl.Map({
      container: this.$refs["map"], // container id
      style: {
        version: 8,
        sources: {
          "raster-tiles": {
            type: "raster",
            tiles: [this.layerUrl],
            tileSize: 256,
            attribution: ""
          }
        },
        glyphs: "./static/fonts/{fontstack}/{range}.pbf",
        layers: [
          {
            id: "simple-tiles",
            type: "raster",
            source: "raster-tiles",
            minzoom: 0,
            maxzoom: 22
          }
        ]
      },
      center: [124.5, 30], // starting position
      zoom: 2 // starting zoom
    });

    earth.on("change", this.syncViewport);

    this.syncViewport();
  },
  destroyed() {
    earth.off("change", this.syncViewport);
  },
  watch: {
    nearbyTargets(values) {
      /** @type{mapboxgl.Map} */
      const map = this._map;
      const features = values.map(item => {
        return {
          type: "Feature",
          properties: {
            icon: item.icon,
            name: item.name
          },
          geometry: {
            type: "Point",
            coordinates: item.lonlat
          }
        };
      });
      if (!this.layerCreated) {
        this.layerCreated = true;
        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features
          }
        });
        map.addLayer({
          id: "points",
          type: "symbol",
          source: "points",
          layout: {
            "icon-image": ["get", "icon"],
            "text-field": [
              "format",
              ["upcase", ["get", "name"]],
              { "font-scale": 0.8 }
            ],
            "text-font": ["Noto Sans Regular"],
            "text-offset": [0, 0.6],
            "text-anchor": "top"
          },
          paint: {
            "text-color": "white"
          }
        });
      } else {
        map.getSource("points").setData({
          type: "FeatureCollection",
          features
        });
      }
    }
  },
  methods: {
    syncViewport() {
      const { longitude, latitude, height } = earth.camera.positionCartographic;
      const { toDegrees } = GeoVis.Math;
      const viewport = [toDegrees(longitude), toDegrees(latitude)];
      const zoom = earth.camera.heightTozoom(height);
      // var view = this._map.getView();
      // 朝向
      this.heading = earth.camera.heading * 57.29578;
      // 层级，最大10
      this.zoom = Math.min(zoom, 10);
      this._map.setCenter(viewport);
      this._map.setZoom(this.zoom);
    }
  }
};
</script>

<style scoped>
.root {
  width: 300px;
  height: 150px;
  position: absolute;
  right: 10px;
  bottom: 10px;
  background-color: grey;
  display: flex;
}
.map {
  width: 100%;
  height: 100%;
}

.viewport {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%);
}</style
>>

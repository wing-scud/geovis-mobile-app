<template>
  <div></div>
</template>
<script>
import { earthStore } from "@/geovis/store";
// 由svg生成图标
const iconTemplate = `
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
      <g id="Page-1" fill="none" fill-rule="evenodd">  
      <g id="Map_Cluster">
      <g id="Oval-1-+-123-Copy"> 
      <circle id="Oval-1" stroke-opacity="0.5" stroke="strokeColor" stroke-width="15" fill="fillColor" cx="32" cy="32" r="24"/>  
      <text id="13" font-family="Lucida Grande" font-size="20" font-weight="normal" fill="#FFFFFF"  y="41" x="31.64" text-anchor="middle" >
       *** 
      </text>  
      </g> 
      </g> 
      </g>
      </svg>`;

const colorMap = {
  small: "rgba(181, 226, 140, 0.6)",
  medium: "rgba(241, 211, 87, 0.6)",
  large: "rgba(253, 156, 115, 0.6)"
};

const baseUrl = "/";

let billboards = [];
export default {
  name: "TargetCluster",
  methods: {
    generateIcon(template, text, fillColor) {
      const str = template
        .replace("***", text)
        .replace("fillColor", fillColor)
        .replace("strokeColor", fillColor);
      const t = document.createElement("canvas");
      let n = (t.getContext("2d"), "data:image/svg+xml;base64,");
      return (n += btoa(str));
    },
    clearIcon() {
      billboards.forEach(billboard => {
        billboard.removeFrom(earthStore.earth.features);
      });
      billboards = [];
    },
    addIcon(feature) {
      if (!feature.properties.cluster) {
        billboards.push(new GeoVis.Marker(feature.geometry.coordinates).addTo(earth.features));
        return;
      }

      const count = feature.properties.point_count;
      const size = count < 100 ? "small" : count < 1000 ? "medium" : "large";

      billboards.push(
        new GeoVis.Billboard(feature.geometry.coordinates, {
          width: 40,
          height: 40,
          image: this.generateIcon(iconTemplate, count, colorMap[size])
        }).addTo(earth.features)
      );
    },
    updateView() {
         
      try {
        const bounding = earth.camera.viewBoundingRectangle; // 由x,y,width,heigh组成的矩形范围, 视角较远时为undefined
        let level = earth.camera.heightTozoom(earth.camera.positionCartographic.height);
        level = parseInt(level);
        let left, bottom, right, top;
        if (bounding) {
          [left, bottom, right, top] = [bounding.x, bounding.y, bounding.x + bounding.width, bounding.y + bounding.height];
        } else {
          [left, bottom, right, top] = [-180, -90, 180, 90];
        }
        // fetch(`http://localhost:8900/cluster/test-geojson/${left}/${bottom}/${right}/${top}/${level}`)
           fetch(`http://localhost:8900/cluster/test-geojson/${left}/${bottom}/${right}/${top}/${level}`)
          .then(res => res.json())
          .then(features => {
            this.clearIcon();
            features.map(this.addIcon);
          });
      } catch (e) {
        // console.log(e)
      }
    }
  },
  mounted() {

    this.updateView();
    earth.camera.on("change", this.updateView);
  },
  destroyed() {
    this.clearIcon();
    earth.camera.off("change", this.updateView)
  }
};
</script>

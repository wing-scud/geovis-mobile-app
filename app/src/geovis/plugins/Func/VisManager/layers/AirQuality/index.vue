<template>
  <div></div>
</template>
<script lang="ts">
import Vue from "vue";
import { data, geoCoordMap } from "./data";
import EcahrtsProvider from "../EcahrtsProvider";

const AirQuality = Vue.extend({
  name: "AirQuality",
  data() {
    return {
      _view: null
    };
  },
  methods: {
    convertData(data) {
      const res = [];
      for (let i = 0; i < data.length; i++) {
        const geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    }
  },
  mounted() {
    const option = {
      animation: false,
      title: {
        text: "全国主要城市空气质量",
        subtext: "data from PM25.in",
        sublink: "http://www.pm25.in",
        left: "center",
        textStyle: {
          color: "#fff"
        }
      },
      tooltip: {
        trigger: "item"
      },
      legend: {
        orient: "vertical",
        y: "bottom",
        x: "right",
        data: ["pm2.5"],
        textStyle: {
          color: "#fff"
        }
      },
      GLMap: {},

      series: [
        {
          name: "pm2.5",
          type: "scatter",
          coordinateSystem: "GLMap",
          data: this.convertData(data),
          symbolSize: function(val) {
            return val[2] / 10;
          },
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: "#ddb926"
            }
          }
        },
        {
          name: "Top 5",
          type: "effectScatter",
          coordinateSystem: "GLMap",
          data: this.convertData(
            data
              .sort(function(a, b) {
                return b.value - a.value;
              })
              .slice(0, 6)
          ),
          symbolSize: function(val) {
            return val[2] / 10;
          },
          showEffectOn: "render",
          rippleEffect: {
            brushType: "stroke"
          },
          hoverAnimation: true,
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: "#f4e925",
              shadowBlur: 10,
              shadowColor: "#333"
            }
          },
          zlevel: 1
        }
      ]
    };
    this._view = new EcahrtsProvider(earth, option);
  },
  beforeDestroy() {
    this._view.destroy();
  }
});
export default AirQuality;
</script>
<style scoped></style>
 
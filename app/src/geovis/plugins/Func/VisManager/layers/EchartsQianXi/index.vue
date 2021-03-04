<template>
  <div></div>
</template>
<script lang="ts">
import Vue from "vue";
import EcahrtsProvider from "../EcahrtsProvider";
const echarts = window["echarts"];
const EchartsQianXi = Vue.extend({
  name: "EchartsQianXi",
  data() {
    return {
      _view: null
    };
  },
  methods: {
    createOptions(allData) {
      return {
        animation: false,
        title: {
          text: "人口迁徙图",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        legend: {
          show: false,
          orient: "vertical",
          top: "bottom",
          left: "right",
          data: ["地点", "线路"],
          textStyle: {
            color: "#fff"
          }
        },
        // geo: {
        //   map: "china",
        //   label: {
        //     emphasis: {
        //       show: false
        //     }
        //   },
        //   roam: true,
        //   itemStyle: {
        //     normal: {
        //       areaColor: "#323c48",
        //       borderColor: "#404a59"
        //     },
        //     emphasis: {
        //       areaColor: "#2a333d"
        //     }
        //   }
        // },
        GLMap: {},
        series: [
          {
            name: "地点",
            type: "effectScatter",
            coordinateSystem: "GLMap",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke"
            },
            label: {
              emphasis: {
                show: true,
                position: "right",
                formatter: "{b}"
              }
            },
            symbolSize: 2,
            showEffectOn: "render",
            itemStyle: {
              normal: {
                color: "#46bee9"
              }
            },
            data: allData.citys
          },
          {
            name: "线路",
            type: "lines",
            coordinateSystem: "GLMap",
            zlevel: 2,
            large: true,
            effect: {
              show: true,
              constantSpeed: 30,
              symbol: "pin",
              symbolSize: 3,
              trailLength: 0
            },
            lineStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#58B3CC"
                    },
                    {
                      offset: 1,
                      color: "#F58158"
                    }
                  ],
                  false
                ),
                width: 1,
                opacity: 0.2,
                curveness: 0.1
              }
            },
            data: allData.moveLines
          }
        ]
      };
    }
  },
  mounted() {
    const ys = this;
    const data = fetch("static/data/VisManager/EcahrtsQianxi.json").then(res => res.json());
    data.then(data => {
      const options = this.createOptions(data);
      ys._view = new EcahrtsProvider(earth, options);
    });
  },
  beforeDestroy() {
    this._view.destroy();
  }
});
export default EchartsQianXi;
</script>
<style scoped></style>

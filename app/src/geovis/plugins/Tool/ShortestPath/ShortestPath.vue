<template>
  <div class="button">
    <button @click="creatShortestPath">生成路径</button>
  </div>
</template>

<script>
import * as turf from "@turf/turf";
export default {
  name: "ShortestPath",
  data() {
    return {};
  },
  methods: {
    creatShortestPath() {
      const radars = [
        {
          lonlat: [90.66601634993418, 28.6261298766347], //雷达中心坐标
          radius: 1e5 //雷达半径，单位米
        },
        {
          lonlat: [90.68484072265923, 26.9644897],
          radius: 9e4
        },
        {
          lonlat: [93.46954509175464, 27.1067706347],
          radius: 8e4
        },
        {
          lonlat: [92.57921256599792, 28.67512686347],
          radius: 9e4
        },
        {
          lonlat: [94.67803087859605, 29.1259277766347],
          radius: 7e4
        }
      ];
      radars.map(radar => {
        //在球上添加雷达范围
        const radargeom = new GeoVis.Circle(radar.lonlat, {
          radius: radar.radius,
          height: 0,
          fill: true,
          async: false,
          fillColor: GeoVis.Color.fromCssColorString("#092fe2").withAlpha(0.5) // 填充颜色
        }).addTo(earth.features);
      });
      const start = [92.77196354265784, 30.049276]; // 起始点
      const end = [92.10630614634466, 26.04161437]; //终点位置
      //球上添加起始点
      const startPoint = new GeoVis.Point(start, {
        pixelSize: 10,
        color: GeoVis.Color.WHITE
      }).addTo(earth.features);
      const endPoint = new GeoVis.Point(end, {
        pixelSize: 10,
        color: GeoVis.Color.BLACK
      }).addTo(earth.features);
      const colli = [];
      const circleOptions = {
        steps: 10,
        units: "kilometers" // 注意单位
      };
      radars.map(radar => {
        //1e4为缓冲区大小，将雷达表示成turf需要的数据类
        colli.push(turf.circle(radar.lonlat, (radar.radius + 1e4) / 1000, circleOptions));
      });
      radars.map(radar => {
        //在球上添加雷达范围
        const radargeom = new GeoVis.Circle(radar.lonlat, {
          radius: radar.radius + 1e4,
          height: 0,
          fill: true,
          async: false,
          fillColor: GeoVis.Color.fromCssString("#940e0e").withAlpha(0.5) // 填充颜色
        }).addTo(earth.features);
      });
      //放入collection中
      const radarFeature = turf.featureCollection(colli);
      const pathOptions = {
        obstacles: radarFeature, //雷达collection作为障碍物
        resolution: 1 //控制A*算法路径寻找路径的最短距离，数值越小，寻路越精细，路径越弯曲，计算时间越大，默认100
      };
      //寻路，以turf的lineString返回路径
      const path = turf.shortestPath(start, end, pathOptions);
      const simpOptions = {
        tolerance: 0.05, //简化公差
        highQuality: false //是否花费更多时间使用其他算法来创建更高质量的简化
      };
      //简化线条
      const simplified = turf.simplify(path, simpOptions);
      // 使线条更光滑
      const curved = turf.bezierSpline(simplified, {
        sharpness: 0.6 //锐度，路径的弯曲程度的度量
      });
      //获取线条的坐标数组
      const curvePath = curved.geometry.coordinates;
      //绘制到球上
      const pathLine = new GeoVis.Polyline(curvePath, {
        colors: [GeoVis.Color.fromCssString("#d81b60")],
        vertexColor: true,
        followSurface: true,
        width: 2.0
      }).addTo(earth.features);
    }
  }
};
</script>

<style>
.button {
  width: 50px;
  height: 30px;
  position: absolute;
  left: 100px;
  z-index: 10000;
  top: 20px;
}
</style>

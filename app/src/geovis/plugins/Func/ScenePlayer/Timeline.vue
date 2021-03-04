<template>
  <div class="root" id="timeline">
    <el-slider v-model="state.currentTime" :min="state.start" :max="state.end" @input="setTime" :format-tooltip="format"></el-slider>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: ["state", "setTime", "event", "play", "setNextEvent"],
  data() {
    return {
      earthReady: false
    };
  },
  watch: {
    event() {
      this.startPlay();
    },
    play() {
      // debugger
      this.startPlay();
    }
  },
  computed: {},
  methods: {
    format(val) {
      return new Date(val).toLocaleString();
    },
    startPlay() {
      if (this.play) {
        const duration = (this.event.duration || 2) * 1000 * 2;
        const total = this.state.end - this.state.start;
        const startAniTime = new Date().getTime();
        const animate = () => {
          if (!this.play) return;
          const delta = new Date().getTime() - startAniTime;
          if (delta < duration) {
            this.setTime(this.state.start + (delta / duration) * total);
            requestAnimationFrame(animate);
          } else {
            this.setNextEvent();
          }
        };
        animate();
      }
    }
  }
};

// function generateBezier(p0, p3, ratio = 1) {
//   var deltaLon = p3[0] - p0[0];
//   var deltaLat = p3[1] - p0[1];
//   const points =  GeoVis.Cartesian3.fromDegreesArrayHeights([...p0, ...p3])
//   const distance = GeoVis.Cartesian3.distance(points[0],points[1])
//   const height = ratio * distance * 3 / 5;
//   var p1 = [p0[0] + deltaLon * 1 / 5, p0[1] + deltaLat * 1 / 5, height];
//   var p2 = [p0[0] + deltaLon * 4 / 5, p0[1] + deltaLat * 4 / 5, height];
//   var cartes = GeoVis.Cartesian3.fromDegreesArrayHeights([...p0,...p1,...p2,...p3])

//   var xPos = cartes.map( carte=> carte.x);
//   var yPos = cartes.map( carte=> carte.y);
//   var zPos = cartes.map( carte=> carte.z);
//   function bezier(n) {
//     var positions = [];
//     var f1, f2, f3, f4;
//     var deltaT = 1.0 / n;
//     var T;
//     for (i = 0; i <= n; i++) {
//       T = i * deltaT;
//       f1 = (1 - T) * (1 - T) * (1 - T);
//       f2 = 3 * T * (1 - T) * (1 - T);
//       f3 = 3 * T * T * (1 - T);
//       f4 = T * T * T;
//       var x = f1 * xPos[0] + f2 * xPos[1] + f3 * xPos[2] + f4 * xPos[3];
//       var y = f1 * yPos[0] + f2 * yPos[1] + f3 * yPos[2] + f4 * yPos[3];
//       var z = f1 * zPos[0] + f2 * zPos[1] + f3 * zPos[2] + f4 * zPos[3];
//       positions.push(new GeoVis.Cartesian3(x,y,z))
//     }
//     return positions;
//   }
//   return bezier(20)
// }

// // 初始化示例
// var color = GeoVis.Color.fromCssString("#D81B60")
// var lonlats = [[7.0226401104187435, 48.08086616180708, 0.0],[[9.8652035, 49.33842, 190614]]]// [[23.69763460512864, 48.858267317250125, 0], [7.772606669756543, 51.3358085, 0]];
// var polyline;
// function updatePolyline(val) {
//   polyline && polyline.removeFrom(earth.features);
//   var positions = generateBezier(lonlats[0], lonlats[1], val);
//   polyline = new GeoVis.Polyline(positions, {
//     colors: [color],
//     vertexColor: true,
//     followSurface: true,
//     width: 2.0
//   }).addTo(earth.features);
// }

//     polyline.positions.map(pos=>{
// return{
//     position: GeoVis.Cartesian3.pack(pos,[]),
//     time:"2019/08/19 08:01:06"
// }
// })

function Data() {
  this.heading = 0;
  this.pitch = 0;
  this.roll = 0;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#timeline {
  position: fixed !important;
  width: 65%;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>

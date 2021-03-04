<template>
  <div class="buttons">
    <div class="button button1" @click="startDrawing">
      <a>绘制路线</a>
      <img src="../../../public/images/images/route/luxian.svg" />
    </div>
    <div class="button button2">
      <span>车辆速度：&nbsp;&nbsp;</span>
      <span>{{ speed }}</span>
      <input type="range" min="0" max="200" step="1" v-model="speed" />
    </div>
    <div class="button button2 chazhi">
      <span>插值算法：&nbsp;&nbsp;</span>
      <select @change="drawRoute" v-model="interpolationdata">
        <option value="1">无平滑</option>
        <option value="2">拉格朗日</option>
        <option value="3">hermite多项式逼近</option>
      </select>
    </div>
    <div class="button button3">
      <span>播放速度：&nbsp;&nbsp;</span>
      <span>{{ playSpeed }}</span>
      <input type="range" min="0" max="50" step="1" @change="changeSpeed" v-model="playSpeed" />
    </div>
    <div class="button button4" @click="playRoute">
      <a>播放</a>
      <!-- <img src="../../../public/images/images/route/bofang.svg" /> -->
    </div>
    <div class="button button5" @click="cleaning">
      <a>清空</a>
      <!-- <img src="../../../public/images/images/route/bofang.svg" /> -->
    </div>
  </div>
</template>
<script>
import Widgets from "../Widgets.vue";
let drawHelper, scene, clock;
let entity, positions, positionProperty, orientationProperty, polyline, paths;
const startTime = GeoVis.JulianDate.fromDate(new Date("2020-10-1 10:00"));
let endTime;
export default {
  name: "DrawPath",
  data() {
    return {
      // speed: (80 * 1000) / 3600
      speed: 22,
      playSpeed: 1,
      interpolationdata: 1
    };
  },
  methods: {
    changeSpeed() {
      window.earth.clock.multiplier = this.playSpeed;
    },
    interpolation() {
      if (this.interpolationdata == 1) {
        return GeoVis.LinearApproximation;
      } else if (this.interpolationdata == 2) {
        return GeoVis.LagrangePolynomialApproximation;
      } else {
        return GeoVis.HermitePolynomialApproximation;
      }
    },
    startDrawing() {
      this.cleaning();
      drawHelper.muteHandlers(false);
      drawHelper.startDrawingPolyline({
        callback: function(posArray) {
          positions = posArray;
          drawHelper.muteHandlers(true);
        }
      });
    },
    createSamplePosition(positions) {
      const property = new GeoVis.SampledPositionProperty();
      property.addSample(startTime, positions[0]);
      let lastTime = startTime;
      for (let i = 1; i < positions.length; i++) {
        const lastPoint = positions[i - 1];
        const point = positions[i];
        const distance = GeoVis.Cartesian3.distance(point, lastPoint);
        const duration = distance / this.speed;
        const time = GeoVis.JulianDate.addSeconds(lastTime, duration, new GeoVis.JulianDate());
        property.addSample(time, positions[i]);
        endTime = lastTime = time;
      }
      return property;
    },
    drawRoute() {
      if (entity) {
        earth.entities.remove(entity);
        earth.entities.remove(polyline);
      }
      const lastPosition = this.cumputePosition();
      polyline = earth.entities.add({
        position: lastPosition,
        // availability: new GeoVis.TimeIntervalCollection([
        //       new GeoVis.TimeInterval({
        //         start: startTime,
        //         stop:  endTime,
        //       }),
        //     ]),
        polyline: {
          clampToGround: true,
          positions: lastPosition,
          material: new GeoVis.PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: GeoVis.Color.YELLOW
          }),
          width: 10
        },
        orientation: orientationProperty
      });
      entity = earth.entities.add({
        position: lastPosition,
        model: {
          uri: "./static/data/purplecar.gltf",
          scale: 1,
          minimumPixelSize: 64,
          HeightReference: GeoVis.HeightReference.CLAMP_TO_GROUND
        }
      });
    },
    playRoute() {
      drawHelper.removeAll();
      this.drawRoute();
      const earth = window.earth;
      if (entity) {
        earth.clock.multiplier = this.playSpeed;
        earth.timeline.zoomTo(startTime, endTime);
        earth.clock.currentTime = startTime;
        earth.clockRange = GeoVis.ClockRange.CLAMPED;
        earth.clock.shouldAnimate = true;

        const ellipsoid = earth.scene.globe.ellipsoid;
        const cameraHeight = ellipsoid.cartesianToCartographic(earth.camera.position).height;
        //var moveRate = cameraHeight / 100.0;
        //  earth.camera.moveBackward(10000);
        earth.trackedEntity = entity;
        entity.viewFrom = new GeoVis.Cartesian3(-2080, -1715, 2000);
      } else {
        alert("请先添加路线");
      }
    },
    cumputePosition() {
      positionProperty = this.createSamplePosition(positions);
      orientationProperty = new GeoVis.VelocityOrientationProperty(positionProperty);
      paths = earth.entities.add({
        position: positionProperty,
        path: {
          resolution: 1,
          material: new GeoVis.PolylineGlowMaterialProperty({
            glowPower: 0.1,
            color: GeoVis.Color.YELLOW
          }),
          width: 10
        }
      });
      paths.position.setInterpolationOptions({
        interpolationDegree: 5,
        interpolationAlgorithm: this.interpolation()
      });

      const newPosition = [];
      for (let now = startTime; now < endTime; ) {
        const posi = paths.position.getValue(now);
        const pos = new GeoVis.Cartesian3(posi.x, posi.y, posi.z);
        newPosition.push(pos);
        now = GeoVis.JulianDate.addSeconds(now, 1, new GeoVis.JulianDate());
      }
      earth.entities.remove(paths);
      return newPosition;
    },
    cleaning() {
      drawHelper.removeAll();
      if (entity) {
        earth.entities.remove(entity);
        earth.entities.remove(polyline);
        entity = undefined;
        polyline = undefined;
      }
    }
  },
  mounted() {
    const earth = window.earth;
    scene = earth.scene;
    clock = earth.clock;
    if (!window.drawHelper) {
      window.drawHelper = new window.DrawHelper(earth);
    }
    const drawHelper = window.drawHelper;

    earth.camera.flyTo({
      destination: GeoVis.Vector3.fromDegrees(120.7478, 22.53, 2e4),
      orientation: {
        // heading: GeoVis.Math.toRadians(20.0),
        pitch: GeoVis.Math.toRadians(-35.0),
        roll: 0.0
      }
    });
    drawHelper.muteHandlers(true);

    //tian
    scene.preRender.addEventListener(function() {
      if (!positionProperty || !positionProperty.getValue(clock.currentTime)) return;
      const position = positionProperty.getValue(clock.currentTime);
      const nextPosition = positionProperty.getValue(GeoVis.JulianDate.addSeconds(clock.currentTime, 0.5, new GeoVis.JulianDate()));
      if (!nextPosition) return;
      const carto0 = GeoVis.Cartographic.fromCartesian(position);
      const carto1 = GeoVis.Cartographic.fromCartesian(nextPosition);
      const terrainHeight0 = earth.globe.getHeight(carto0);
      const terrainHeight1 = earth.globe.getHeight(carto1);
      carto0.height = terrainHeight0 || 0;
      carto1.height = terrainHeight1 || 0;
      const position0 = GeoVis.Cartographic.toCartesian(carto0);
      const position1 = GeoVis.Cartographic.toCartesian(carto1);
      const velocity = GeoVis.Cartesian3.subtract(position1, position0, new GeoVis.Cartesian3());
      GeoVis.Cartesian3.normalize(velocity, velocity);
      const orientation = GeoVis.Quaternion.fromRotationMatrix(GeoVis.Transforms.rotationMatrixFromPositionVelocity(position0, velocity));
      if (entity) {
        entity.position = position0;
        entity.orientation = orientation; // orientation//orientationProperty.getValue(clock.currentTime)
      }
    });

    //监听相机，控制相机的最大高度，经纬度范围：
    earth.scene.screenSpaceCameraController.minimumZoomDistance = 25000; //相机的高度的最小值
    earth.scene.screenSpaceCameraController.maximumZoomDistance = 22000000; //相机高度的最大值
  }
};
</script>

<style>
.buttons {
  position: fixed;
  top: 90px;
  right: 20px;
  width: 163px;
  height: 270px;
  background-color: black;
  border: 1px solid rgb(95, 128, 155);
  z-index: 1111;
}
.button {
  color: #fff;
  background-color: rgb(57, 66, 73);
  padding: 6px 0 6px 16px;
  text-align: left;
  font-size: 14px;
  /* border: 1px darkcyan solid;
  box-shadow: rgba(255, 255, 255, 0.6) 0px 1px 6px; */
  cursor: pointer;
  user-select: none;
  width: 130px;
  height: 20px;
  line-height: 20px;
}

.button1 {
  position: absolute;
  left: 10px;
  top: 10px;
}
.button2 {
  position: absolute;
  left: 10px;
  top: 50px;
  height: 40px;
  text-align: left;
  color: white;
}
.button input {
  width: 106px;
  background-color: transparent;
  border: none;
  color: white;
  outline: none;
}
.chazhi {
  top: 110px;
}
.chazhi select {
  outline: none;
  font-size: 12px;
  margin-left: -5px;
}
.button a {
  margin-right: 20px;
  vertical-align: middle;
}
.button img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.button3 {
  position: absolute;
  left: 10px;
  top: 170px;
  height: 40px;
}
.button4 {
  position: absolute;
  left: 10px;
  top: 230px;
  width: 50px;
}
.button5 {
  position: absolute;
  left: 90px;
  top: 230px;
  width: 50px;
}
.button:hover {
  background-color: rgba(57, 66, 73, 0.5);
}
</style>

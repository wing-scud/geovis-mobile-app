<template>
  <div></div>
</template>

<script>
// import { GVGlobal } from "../../components/Global";
function handleCamera() {
  earth.globe.depthTestAgainstTerrain = earth.camera.pitch > -Math.PI / 4;
}
export default {
  name: "CustomWidgets",
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.billboards = [];
    earth.camera.on("change", handleCamera);

    const startX = 91.716;
    const startY = 27.32103;
    const deltaX = (95.3678 - 91.7166) / 100;
    const deltaY = (29.958 - 27.321) / 100;
    const cartos = [];
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        const lonlat = [startX + i * deltaX, startY + j * deltaY];
        const carto = GeoVis.Cartographic.fromDegrees(...lonlat);
        cartos.push(carto);
      }
    }
    GeoVis.sampleTerrain(earth.scene.terrainProvider, 11, cartos).then(
      results => {
        results.map(carto => {
          carto.height += 40;
          const cartesian = GeoVis.Cartographic.toCartesian(carto);
          const billboard = new GeoVis.Billboard(cartesian, {
            image:
              "http://localhost:3000/Examples/thumb/echarts_AirQuality.jpg",
            width: 20,
            height: 20,
            pixelOffset: new GeoVis.Cartesian2(0, -20),
            pixelOffsetScaleByDistance: new GeoVis.NearFarScalar(
              1.5e2,
              1.0,
              8.0e4,
              0.0
            ),
            distanceDisplayCondition: new GeoVis.DistanceDisplayCondition(
              0,
              3e4
            )
            // scaleByDistance: new GeoVis.NearFarScalar(1.5e2, 1.5, 6e5, 0.0)
          }).addTo(earth.features); //
          this.billboards.push(billboard);
          //   billboard.disableDepthTestDistance = 1e4;
        });
      }
    );
  },
  destroyed() {
    this.billboards.map(b => {
      b.removeFrom(earth.features);
    });
    earth.camera.off("change", handleCamera);
  }
};
</script>

<style></style>

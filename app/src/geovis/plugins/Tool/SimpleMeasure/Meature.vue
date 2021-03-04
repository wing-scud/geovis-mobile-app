<template>
  <div class="measure">
    <span class="tool" @click="drawline()">
      <img class="ruler" src="../../public/images/images/ruler/level.svg" />
    </span>
    <span class="tool" @click="drawplane()">
      <img class="ruler" src="../../public/images/images/ruler/vertical.svg" />
    </span>
    <span class="tool" @click="drawtriangle()">
      <img class="ruler" src="../../public/images/images/ruler/trangle.svg" />
    </span>
    <span class="tool tool_last" @click="clean()">
      <img class="ruler" src="../../public/images/images/ruler/shuazi.svg" />
    </span>

    <div id="radiocheck">
      <input type="radio" checked id="radioA" name="radio1" />
      <label for="radioA">单等高线</label>
      <input type="radio" id="radioB" name="radio1" />
      <label for="radioB">多等高线</label>
    </div>
    <div>
      <span> 等高距（米）：</span>
      <input class="meter" type="text" value="50" />
    </div>
  </div>
</template>
<script>
import { GVGlobal } from "../components/Global";
const DrawHelper = window.DrawHelper;
const Types = DrawHelper.Types;
// var drawHelper = new DrawHelper(earth)
export default {
  name: "Meature",
  methods: {
    drawline() {
      const options = {
        color: GeoVis.Color.WHITE.withAlpha(0.8),
        width: 3,
        computed: true,
        type: Types.PROJ_POLYLINE
      };
     drawHelper.startDrawingPolyline(options);

    },
    drawplane() {
      const options = {
        color: GeoVis.Color.WHITE.withAlpha(0.8),
        computed: true,
        type: Types.PROJ_POLYGON
      };
      GVGlobal.drawHelper.startDrawingPolygon(options);
    },
    drawtriangle() {
      const angleOptions = {
        color: GeoVis.Color.WHITE.withAlpha(0.8),
        computed: true,
        width: 3
      };
      GVGlobal.drawHelper.startDrawingAngle(angleOptions);
    },
    clean() {
      GVGlobal.drawHelper.removeAll();
    }
  }
};
</script>
<style scoped>
.measure {
  position: absolute;
  top: 50px;
  right: 20px;
  width: 230px;
  height: 125px;
  background-color: black;
  border: 1px solid rgb(95, 128, 155);
  padding: 10px;
  color: white;
  font-size: 14px;
  z-index: 1000;
}
.tool {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  background-color: rgb(35, 35, 35);
  line-height: 50px;
}
.tool:hover {
  background-color: rgb(57, 66, 73);
}
.tool_last {
  margin-right: 0;
}
.ruler {
  vertical-align: middle;
}
#radiocheck {
  width: 100%;
  height: 30px;
  margin: 10px 0;

  text-align: left;
  line-height: 30px;
}
#radiocheck label {
  margin-right: 20px;
}
.meter {
  display: inline-block;
  width: 100px;
  background-color: rgb(51, 51, 51);
  border: 1px solid gray;
  color: white;
}
</style>

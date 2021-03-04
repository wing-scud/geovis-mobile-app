<template>
  <el-row class="root" :gutter="20">
    <el-col :span="20">
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item label="投影">
          <el-select v-model="pre.proj" placeholder="请选择坐标参考系">
            <el-option :key="type" v-for="type in types" :label="type" :value="type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="X/经度">
          <el-input v-model="pre.lon"></el-input>
        </el-form-item>
        <el-form-item label="Y/维度">
          <el-input v-model="pre.lat"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="20">
      <div style="margin: 20px 0px;height:40px;">
        <el-button style="float:right" type="primary" @click="trans">立即转换</el-button>
        <div style="float:right">
          <span class="text" style="display:block;color:red">原始坐标</span>
          <span class="text" style="display:block;color:blue">转换坐标</span>
        </div>
      </div>
      <el-form :label-position="labelPosition" label-width="80px">
        <el-form-item label="投影">
          <el-select v-model="post.proj" placeholder="请选择坐标参考系">
            <el-option :key="type" v-for="type in types" :label="type" :value="type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="X/经度">
          <el-input v-model="post.lon"></el-input>
        </el-form-item>
        <el-form-item label="Y/维度">
          <el-input v-model="post.lat"></el-input>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
// GeoVis.PROJ_TYPE = {
//   CGCSLonlat: "EPSG:4490",
//   CGCSGeoCent: "EPSG:4479",
//   NBJLonlat: "EPSG:4555",
//   BJLonlat: "EPSG:4214",
//   WGS84Lonlat: "EPSG:4326",
//   HZS67Lonlat: "EPSG:3821",
//   HZS50Lonlat: "EPSG:4236",
//   HZS97Lonlat: "EPSG:3824",
//   HZS97GeoCent: "EPSG:3822",
//   HZS97TMerc121: "EPSG:3826",
//   HZS97TMerc119: "EPSG:3825"
// };



export default {
  name: "PluginA",
  data() {
    return {
      PROJ_TYPE: GeoVis.PROJ_TYPE,
      pre: {
        proj: "CGCSLonlat",
        lon: 119.44967074,
        lat: 24.99415354
      },
      post: {
        proj: "WGS84Lonlat",
        lon: 0,
        lat: 0
      },
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      }
    };
  },
  computed: {
    types: function() {
      const types = [];
      for (const type in this.PROJ_TYPE) {
        types.push(type);
      }
      return types;
    }
  },
  methods: {
    trans: function() {
      const lon = parseFloat(this.pre.lon);
      const lat = parseFloat(this.pre.lat);
      const preProj = GeoVis.PROJ_TYPE[this.pre.proj];
      const postProj = GeoVis.PROJ_TYPE[this.post.proj];
      console.log("pre", this.pre.proj, lon, lat);
      const result = window["proj4Transform"](preProj, postProj, lon, lat); //proj4(preProj, postProj).forward([lon, lat]);//
      // console.log(result)
      this.post.lon = result.x; //result[0];
      this.post.lat = result.y; //result[1];
      earth.camera.setView({
        destination: GeoVis.Cartesian3.fromDegrees(this.post.lon, this.post.lat,3000)
      })
      console.log("post", this.post.proj, this.post.lon, this.post.lat);
      if (!this.preMarker) {
        this.preMarker = new GeoVis.Billboard([lon, lat, 0], {
          image: "./static/image/tool/定位.png",
          // width: 30,
          // height: 50,
          color: GeoVis.Color.RED
        }).addTo(earth.features);
        this.postMarker = new GeoVis.Billboard(
          [this.post.lon, this.post.lat, 0],
          {
            image: "./static/image/tool/定位.png",
            color: GeoVis.Color.BLUE
          }
        ).addTo(earth.features);
      } else {
        this.preMarker.lonlat = [lon, lat, 0];
        this.postMarker.lonlat = [this.post.lon, this.post.lat, 0];
      }
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text{
  font-size: 2.4em;
}
#plugin {
}
.root {
  position: absolute;
  left: 100px;
  top: 40px;
  /* transform: translate(0, 50%); */
  width: 300px;
  /* top: 0px; */
  font-size: 2em;
  color: white;
  background: #eee;
}
</style>
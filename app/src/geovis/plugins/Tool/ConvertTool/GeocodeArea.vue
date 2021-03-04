<template>
  <div class="panel">
    <div class="search-input-container">
      <el-autocomplete class="search-input" v-model="inputValue" :fetch-suggestions="querySearch" placeholder="输入地名或坐标" :trigger-on-focus="false" @keyup.enter.native="submit" @select="submit">
        <gv-icon slot="suffix" v-if="inputValue !== ''" class="close-btn" icon=" #icon-baseline-clear-px" width="24" height="24" @click="closeSearch"></gv-icon>
      </el-autocomplete>
      <gv-icon class="search-btn" icon="#icon-baseline-search-px" width="39" height="39" @click="submit"></gv-icon>
    </div>
    <div class="bar">
      查询结果
    </div>
    <template v-for="result in prompts"
      ><div class="textbar" :key="result">{{ result }}</div></template
    >
  </div>
</template>
<script>
/* eslint-disable @typescript-eslint/camelcase */
import util from "./util";
export default {
  name: "GeocodeArea",
  data() {
    return {
      uri: "http://192.168.20.249:8086", //https://nominatim.openstreetmap.org/reverse.php
      prompts: [], //用作存储后台数据的仓库，使得本组件的每个方法都能取
      inputValue: "",
      queryFormat: "json",
      queryDataType: "polygon_geojson",
      _polygon: undefined,
      _marker: undefined,
      _point: undefined
    };
  },
  beforeDestroy() {
    this._polygon = undefined;
    this._marker = undefined;
    this._point = undefined;
    this.inputValue = "";
    this.prompts = [];
    this.closeSearch();
  },
  destroyed() {
    util.clear();
  },
  methods: {
    closeSearch() {
      this.inputValue = "";
      // document.getElementsByClassName("el-autocomplete-suggestion")[0].display = "none";
      document.getElementsByClassName("el-autocomplete-suggestion")[0].style.display = "none";
      if (this._polygon || this._point) {
        util.clear();
      }
    },
    findPoint: async function(_lon, _lat) {
      const url = `${this.uri}/reverse.php?format=json&lat=${_lat}&lon=${_lon}&zoom=`;
      const json = await util.getData(url); //请求polygon_geojson格式数据
      console.log(json);
      const lon = parseFloat(json.lon);
      const lat = parseFloat(json.lat);
      this._point = util.setMarker([lon, lat], json.display_name);
      // util.setMarker(point.location, point.name);
    },
    querySearch: async function(queryString, cb) {
      document.getElementsByClassName("el-autocomplete-suggestion")[0].style.display = "";
      this.prompts = []; //每次change之后把之前的仓库清空
      cb([{ value: "请稍等..." }]);
      //   console.log(this.queryUrl);
      this.prompts = await this.request(queryString); //异步请求将数据放进仓库
      if (this.prompts.length === 0) {
        cb([{ value: "无数据..." }]);
        return;
      }
      // console.log(this.prompts.length);
      cb(this.prompts);
    },
    submit: function() {
      const val = this.inputValue;
      // const reg = /^\d[.]\d+,+\d/;
      const reg = /^\d+(\.\d*)+,+\d+(\.\d*)/;
      const bool = reg.test(val);
      if (bool) {
        const arr = val.split(",");
        const lon = parseFloat(arr[0]);
        const lat = parseFloat(arr[1]);
        this.findPoint(lon, lat);
      } else {
        // util.clearPolygon(); //先清除边界和marker
        const point = this.getParam(); //获得用户输入的location和polygonpoints、name
        // console.log(point.polygonpoints)
        if (!point) {
          //如果用户什么都没有输入
          console.log("请稍等");
          return 0;
        }
        const lineStyle = {
          fillColor: "#512da8",
          outlineColor: "#00acc1"
        };
        //相机飞到目标点并划线描点
        this.flyTo(point, lineStyle);
        console.log("submit成功");
      }
    },
    flyTo: function(point, lineStyle) {
      util.polygonpointsToVector2(point.polygonpoints); //用于fromPoints(vector)
      const bd = this.fromPoints(point.polygonpoints); //得到BoudingRectangle

      const x = bd.width === 0 ? bd.x - 0.005 : bd.x;
      const y = bd.height === 0 ? bd.y - 0.005 : bd.y;
      const width = bd.width === 0 ? 0.01 : bd.width;
      const height = bd.height === 0 ? 0.01 : bd.height;

      this._polygon = util.setLine(point.polygonpoints, lineStyle); //划线
      console.log("w s 是坐标标", point.location);
      this._marker = util.setMarker(point.location, point.name); //描点
      earth.camera.flyTo({
        //飞到目标
        destination: GeoVis.Rectangle.fromDegrees(x, y, x + width, y + height)
      });
      console.log("飞行成功");
    },
    getParam: function() {
      //从prompts中获取用户输入的地点坐标{location:[a,b],polygonpoints:[[a,b],[b,c],...]}
      const len = this.prompts.length;
      let i = 0;
      for (i = 0; i < len; i++) {
        if (this.prompts[i].value.indexOf(this.inputValue) !== -1) {
          //匹配用户输入
          console.log("getParam成功");
          return {
            location: this.prompts[i].location,
            polygonpoints: this.prompts[i].polygonpoints,
            name: this.prompts[i].value
          };
        }
      }
      //如果用户的输入全都没有匹配到但是有数据，就返回第一个
      if (i === len) {
        if (this.prompts.length !== 0) {
          return {
            location: this.prompts[0].location,
            polygonpoints: this.prompts[0].polygonpoints
          };
        }
        //如果用户什么都没有输入或者无数据
        else return false;
      }
    },
    fromPoints: function(positions) {
      return GeoVis.BoundingRectangle.fromPoints(positions);
    },
    request: async function(placeName) {
      //请求数据
      const url = `${this.urivvvv }/search.php?q=${placeName}&format=${this.queryFormat}&${this.queryDataType}=1`;
      // let url = that.queryUrl+"/search.php?format=json&polygon_geojson=1&q="+placeName;
      const json = await util.getData(url); //请求polygon_geojson格式数据
      console.log("请求成功");
      // 将place处理为[
      //     {display_name:['xx','xx','xx','xx',...],
      //     place_id:"xxx",polygonpoints:[[a,b],[c,d],...]}
      //     '''
      //     ...
      // ]
      const place = [];
      json.forEach((item, index) => {
        place[index] = {};
        place[index].value = item.display_name;
        place[index].place_id = item.place_id;
        place[index].location = [Number(item.lon), Number(item.lat)];
        if (item.geojson.type === "MultiPolygon") {
          place[index].polygonpoints = item.geojson.coordinates[0][0];
          console.log(item.display_name + "1MultiPolygon");
        } else if (item.geojson.type === "LineString") {
          place[index].polygonpoints = item.geojson.coordinates;
          console.log(item.display_name + "LineString");
        } else if (item.geojson.type === "Polygon") {
          place[index].polygonpoints = item.geojson.coordinates[0];
          console.log(item.display_name + "Polygon");
        } else if (item.geojson.type === "Point") {
          place[index].polygonpoints = [item.geojson.coordinates, item.geojson.coordinates];
          console.log(item.display_name + "Point");
        } else {
          console.log("其他" + item.display_name + item.geojson.type);
        }
      });
      console.log("json处理成功");
      return place;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 如果用element不能加scoped-->
<style>
.search-input-container {
  display: flex;
  color: #fff;
  align-self: center;
}
.el-input__inner {
  border: none;
  border-radius: 0px;
}

.search-input {
  height: 36px;
  width: 18rem;
  line-height: 36px;
  color: #fff;
  vertical-align: middle;
}
.close-btn {
  float: right;
  padding-top: 6px;
  background: rgb(40, 50, 56);
  width: 34px;
  height: 34px;
  line-height: 34px;
  cursor: pointer;
  vertical-align: middle;
  padding-top: 5px;
}
.search-btn {
  padding: 0 5px;
  background: #0097a7cc;
  height: 39px;
  width: 40px;
  line-height: 39px;
  cursor: pointer;
  vertical-align: middle;
}
.textbar {
  height: 25px;
  margin-top: 5px;
}
.bar {
  height: 40px;
  width: 100%;
  margin-top: 5px;
}
.panel {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>

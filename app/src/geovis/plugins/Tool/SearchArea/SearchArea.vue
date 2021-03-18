<template>
  <div class="search-input">
    <van-field v-model="inputValue" :left-icon="leftIcon" size="" placeholder="请输入地点" clearable @keyup.enter.native="submit" @input="fetchSuggestions">
      <template #button>
        <van-button size="small" type="default" class="search-button" plain @click="submit">搜索</van-button>
      </template>
    </van-field>
    <div class="suggest-panel" v-if="suggestions.length > 0">
      <van-cell-group>
        <van-cell :title="item.value" v-for="item in suggestions" :key="item.id" @click="useSuggestion(item.id)"></van-cell>
      </van-cell-group>
    </div>
    <!-- <div class="search-result" v-if="prompts">
      <van-cell-group>
        <van-cell :title="item.display_name" :label="item.descri" v-for="item in prompts" :key="item.name"></van-cell>
      </van-cell-group>
    </div> -->
  </div>
</template>
<script>
import { earthStore } from "@/geovis/store";
/* eslint-disable @typescript-eslint/camelcase */
import util from "./util";
export default {
  name: "SearchArea",
  props: {
    pluginInfo: Object,
    url: {
      type: String,
      default: "https://nominatim.openstreetmap.org"
      // default: "http://192.168.20.249:8086",
    },
    format: {
      type: String,
      default: "json"
    },
    dataType: {
      type: String,
      default: "polygon_geojson"
    }
  },
  data() {
    return {
      leftIcon: "search",
      prompts: [], //用作存储后台数据的仓库，使得本组件的每个方法都能取
      inputValue: "",
      suggestions: [],
      queryFormat: this.format,
      queryDataType: this.dataType,
      _polygon: undefined,
      _marker: undefined,
      _point: undefined
    };
  },
  destroyed() {
    util.clear();
  },
  methods: {
    useSuggestion(id) {
      let point;
      this.prompts.map(place => {
        if (place.place_id === id) {
          point = {
            location: place.location,
            polygonpoints: place.polygonpoints,
            name: place.value,
            ...place
          };
        }
      });
      this.suggestions = [];
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
    },
    closeSearch() {
      this.inputValue = "";
      // document.getElementsByClassName("el-autocomplete-suggestion")[0].display = "none";
      document.getElementsByClassName("el-autocomplete-suggestion")[0].style.display = "none";
      util.clear();
    },
    fetchSuggestions: async function() {
      const queryString = this.inputValue;
      let prompts, suggestions;
      if (util.isLonlatString(queryString)) {
        ({ prompts, suggestions } = await this.reverseQuery(queryString));
      } else {
        ({ prompts, suggestions } = await this.simpleQuery(queryString));
      }
      this.suggestions = suggestions;
      this.prompts = prompts;
    },

    // 坐标检索(逆地理编码)
    reverseQuery: async function(queryString) {
      const [lon, lat] = queryString.split(",").map(val => parseFloat(val));
      const lonlatValid = Math.abs(lon) <= 180 && Math.abs(lat) <= 90;
      if (lonlatValid) {
        const url = `${this.pluginInfo.data.server}/reverse.php?format=json&lat=${lat}&lon=${lon}`;
        const json = await util.getData(url); //请求polygon_geojson格式数据
        const resultLon = parseFloat(json.lon);
        const resultLat = parseFloat(json.lat);
        const place = {
          value: json.display_name,
          place_id: json.place_id,
          location: [resultLon, resultLat],
          boundingbox: json.boundingbox
        };
        if (!json.error) {
          // case1 有返回结果
          return {
            prompts: [place],
            suggestions: [{ value: json.display_name }]
          };
        } else {
          // case2 无返回结果
          return {
            prompts: [],
            suggestions: [{ value: "无数据..." }]
          };
        }
      } else {
        // case3 坐标越界
        return {
          prompts: [],
          suggestions: [{ value: "坐标越界..." }]
        };
      }
    },

    //  地名检索
    simpleQuery: async function(placeName) {
      //请求数据
      const url = `https://nominatim.openstreetmap.org/search?q=${placeName}&format=json&namedetails=[1]&&polygon_geojson=1&accept-language=zh-Hans&limit=4`;
      // const url = `${this.url.default}/search.php?q=${placeName}&format=${this.queryFormat}&${this.queryDataType}=1`;
      const json = await util.getData(url); //请求polygon_geojson格式数据
      const prompts = [];
      const suggestions = [];
      json.forEach((item, index) => {
        const place = {};
        place.value = item.display_name;
        place.place_id = item.place_id;
        place.location = [Number(item.lon), Number(item.lat)];
        if (item.geojson.type === "MultiPolygon") {
          place.polygonpoints = item.geojson.coordinates[0][0];
          console.log(item.display_name + "MultiPolygon");
        } else if (item.geojson.type === "LineString") {
          place.polygonpoints = item.geojson.coordinates;
          console.log(item.display_name + "LineString");
        } else if (item.geojson.type === "Polygon") {
          place.polygonpoints = item.geojson.coordinates[0];
          console.log(item.display_name + "Polygon");
        } else if (item.geojson.type === "Point") {
          place.polygonpoints = [item.geojson.coordinates, item.geojson.coordinates];
          console.log(item.display_name + "Point");
        } else {
          console.log("其他" + item.display_name + item.geojson.type);
        }
        prompts.push(place);
        suggestions.push({ value: item.display_name, id: item.place_id });
      });
      return { prompts, suggestions };
    },

    querySearch: async function(queryString, cb) {
      document.getElementsByClassName("el-autocomplete-suggestion")[0].style.display = "";
      this.prompts = []; //每次change之后把之前的仓库清空
      cb([{ value: "请稍等..." }]);
      //   console.log(this.queryUrl);
      this.prompts = await this.searchRequest(queryString); //异步请求将数据放进仓库
      if (this.prompts.length === 0) {
        cb([{ value: "无数据..." }]);
        return;
      }
      // console.log(this.prompts.length);
      cb(this.prompts);
    },
    submit: function() {
      const val = this.inputValue;
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
      this.suggestions = [];
    },
    flyTo: function(point, lineStyle) {
      let destination;
      if (!point.polygonpoints) {
        destination = GeoVis.Cartesian3.fromDegrees(...point.location, earthStore.earth.camera.positionCartographic.height);
      } else {
        util.polygonpointsToVector2(point.polygonpoints); //用于fromPoints(vector)
        const bd = this.fromPoints(point.polygonpoints); //得到BoudingRectangle

        const x = bd.width === 0 ? bd.x - 0.005 : bd.x;
        const y = bd.height === 0 ? bd.y - 0.005 : bd.y;
        const width = bd.width === 0 ? 0.01 : bd.width;
        const height = bd.height === 0 ? 0.01 : bd.height;
        destination = GeoVis.Rectangle.fromDegrees(x, y, x + width, y + height);
      }
      point.polygonpoints ? (this._polygon = util.setLine(point.polygonpoints, lineStyle)) : null; //划线
      this._marker = util.setMarker(point.location, point.name); //描点
      earth.camera.flyTo({
        //飞到目标
        destination: destination
      });
    },
    getParam: function() {
      //从prompts中获取用户输入的地点坐标{location:[a,b],polygonpoints:[[a,b],[b,c],...]}
      const len = this.prompts.length;
      let i = 0;
      for (i = 0; i < len; i++) {
        if (this.prompts[i].value.indexOf(this.inputValue) !== -1) {
          //匹配用户输入
          return {
            location: this.prompts[i].location,
            polygonpoints: this.prompts[i].polygonpoints,
            name: this.prompts[i].value,
            ...this.prompts[i]
          };
        }
      }
      //如果用户的输入全都没有匹配到但是有数据，就返回第一个
      if (i === len) {
        if (this.prompts.length !== 0) {
          return {
            location: this.prompts[0].location,
            polygonpoints: this.prompts[0].polygonpoints,
            ...this.prompts[0]
          };
        }
        //如果用户什么都没有输入或者无数据
        else return false;
      }
    },
    fromPoints: function(positions) {
      return GeoVis.BoundingRectangle.fromPoints(positions);
    },
    searchRequest: async function(placeName) {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 如果用element不能加scoped-->
<style scoped>
.search-input {
  width: 96%;
  height: 100%;
  padding: 5px 2%;
  border-radius: 10px;
  background-color: white;
}
.search-input:first-child {
  background-color: #7570703d;
}
.search-input .van-cell {
  padding: 3px 12px;
}
.search-button {
  color: rgb(34, 126, 247);
}
.search-result {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 4;
}
</style>
<style>
.search-input .van-icon {
  line-height: 35px;
}
.search-input .van-field__control {
  background-color: #f7f8fa;
}
</style>

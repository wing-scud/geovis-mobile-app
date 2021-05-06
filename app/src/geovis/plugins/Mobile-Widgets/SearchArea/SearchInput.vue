<template>
  <div class="search-component">
    <div class="search-input">
      <van-field
        v-model="inputValue"
        :left-icon="leftIcon"
        :right-icon="rightIcon"
        :label="config.label"
        size=""
        placeholder="请输入地点"
        :error-message="inputErrorMessage"
        @click-right-icon="clickRightIcon"
        @click-left-icon="clickLeftIcon"
        clearable
        @keyup.enter.native="getSuggestions"
        @input="getSuggestions"
      >
      </van-field>
      <div class="search-group">
        <van-checkbox v-model="coordinateCheckd" v-if="config.convert" class="search-checkbox search-group-item" @click="handleChecked">反查</van-checkbox>
        <van-button size="small" type="default" class="search-button search-group-item" v-if="config.button" plain @click="submit">搜索</van-button>
      </div>
    </div>
    <div class="suggest-panel" v-if="suggestions.length > 0">
      <van-cell-group>
        <van-cell v-for="item in suggestions" :key="item.id">
          <template v:slot="title">
            <span class="van-cell__title" @click="useSuggestion(item.id)">{{ item.name }}</span>
          </template>
          <template v:slot="right-icon" v-if="item.id !== 'none'">
            <div class="search-group">
              <van-icon name="star-o" class="star" :style="addressStarIconStyle(item.id)" v-if="config.star" @click="starAddress(item.id)" />
              <van-icon name="share-o" class="share" v-if="config.route" @click="routeTo(item.id)" />
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
  <script>
import { earthStore } from "@/geovis/store";
import _ from "lodash";
/* eslint-disable @typescript-eslint/camelcase */
import util from "./util";
export default {
  name: "SearchInput",
  props: {
    url: {
      type: String,
      default: "https://nominatim.openstreetmap.org",
    },
    format: {
      type: String,
      default: "json",
    },
    dataType: {
      type: String,
      default: "polygon_geojson",
    },
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    route: {
      type: Boolean,
      default: false,
    },
    rightIcon: {
      type: String,
      default: "",
    },
    leftIcon: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      prompts: [], //用作存储后台数据的仓库，使得本组件的每个方法都能取
      suggestions: [],
      //@ts-ignore
      inputValue: this.value,
      queryFormat: this.format,
      queryDataType: this.dataType,
      _polygon: undefined,
      _marker: undefined,
      _point: undefined,
      coordinateCheckd: false,
      inputErrorMessage: undefined,
    };
  },
  destroyed() {
    util.clear();
  },
  mounted() {
    const debounceFetchSuggest = _.debounce(this.fetchSuggestions, 500);
    this.debounceFetchSuggest = debounceFetchSuggest;
  },
  methods: {
    handleChecked() {
      this.$emit("checked", this.coordinateCheckd);
    },
    starAddress(id) {
      const staredPlaceBool = this.$store.state.starPlaces.places.findIndex((place) => place.id === id);
      if (staredPlaceBool !== -1) {
        this.$store.commit("starPlaces/deletePlace", id);
      } else {
        const place = this.getPlaceFromId(id);
        console.log(place);
        this.$store.commit("starPlaces/addPlace", place);
      }
    },
    getPlaceFromId(id) {
      let point;
      this.prompts.map((place) => {
        if (place.id === id) {
          point = {
            location: place.location,
            polygonpoints: place.polygonpoints,
            name: place.name,
            ...place,
          };
        }
      });
      return point;
    },
    useSuggestion(id) {
      const point = this.getPlaceFromId(id);
      this.suggestions = [];
      if (!point) {
        //如果用户什么都没有输入
        console.log("请稍等");
        return 0;
      }
      const lineStyle = {
        fillColor: "#512da8",
        outlineColor: "#00acc1",
      };
      //相机飞到目标点并划线描点
      // this.flyTo(point, lineStyle);
      this.inputValue = point.name;
      this.$emit("input", this.inputValue);
      this.$emit("choosed", point);
    },
    getSuggestions() {
      this.$emit("input", this.inputValue);
      this.debounceFetchSuggest();
    },
    fetchSuggestions: async function () {
      const queryString = this.inputValue;
      let prompts, suggestions;
      this.suggestions = [{ name: "请稍等", id: "none" }];
      if (this.coordinateCheckd) {
        if (util.isLonlatString(queryString)) {
          this.inputErrorMessage = undefined;
          ({ prompts, suggestions } = await this.reverseQuery(queryString));
        } else {
          this.inputErrorMessage = "输入格式错误";
          suggestions = [];
        }
      } else {
        ({ prompts, suggestions } = await this.simpleQuery(queryString));
      }
      this.suggestions = suggestions;
      this.prompts = prompts;
    },
    // 坐标检索(逆地理编码)
    reverseQuery: async function (queryString) {
      const [lon, lat] = queryString.split(",").map((val) => parseFloat(val));
      const lonlatValid = Math.abs(lon) <= 180 && Math.abs(lat) <= 90;
      if (lonlatValid) {
        const url = `${this.url}/reverse?lat=${lat}&lon=${lon}&format=json&namedetails=[1]&polygon_geojson=1&accept-language=zh-Hans&zoom=18`;
        // const url = `${this.pluginInfo.data.server}/reverse.php?format=json&lat=${lat}&lon=${lon}`;
        const json = await util.getData(url); //请求polygon_geojson格式数据
        const resultLon = parseFloat(json.lon);
        const resultLat = parseFloat(json.lat);
        const place = {
          name: json.display_name,
          id: json.place_id,
          location: [resultLon, resultLat],
          boundingbox: json.boundingbox,
        };
        if (!json.error) {
          // case1 有返回结果
          return {
            prompts: [place],
            suggestions: [{ name: json.display_name, id: json.place_id }],
          };
        } else {
          // case2 无返回结果
          return {
            prompts: [],
            suggestions: [{ name: "无数据...", id: "none" }],
          };
        }
      } else {
        // case3 坐标越界
        return {
          prompts: [],
          suggestions: [{ name: "坐标越界...", id: "none" }],
        };
      }
    },

    //  地名检索
    simpleQuery: async function (placeName) {
      //请求数据
      console.log("query");
      const url = `${this.url}/search?q=${placeName}&format=json&namedetails=[1]&polygon_geojson=1&accept-language=zh-Hans&limit=4`;
      // const url = `${this.url.default}/search.php?q=${placeName}&format=${this.queryFormat}&${this.queryDataType}=1`;
      const json = await util.getData(url); //请求polygon_geojson格式数据
      const prompts = [];
      const suggestions = [];
      json.forEach((item, index) => {
        const place = {};
        place.name = item.display_name;
        place.id = item.place_id;
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
        suggestions.push({ name: item.display_name, id: item.place_id });
      });
      if (json.length === 0) {
        suggestions.push({ name: "查询无结果", id: "none" });
      }
      return { prompts, suggestions };
    },
    submit: function () {
      const val = this.inputValue;
      // util.clearPolygon(); //先清除边界和marker
      const point = this.getParam(); //获得用户输入的location和polygonpoints、name
      if (!point) {
        //如果用户什么都没有输入
        console.log("请稍等");
        return 0;
      }
      const lineStyle = {
        fillColor: "#512da8",
        outlineColor: "#00acc1",
      };
      //相机飞到目标点并划线描点
      // this.flyTo(point, lineStyle);
      this.suggestions = [];
    },
    flyTo: function (point, lineStyle) {
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
        destination: destination,
      });
    },
    getParam: function () {
      //从prompts中获取用户输入的地点坐标{location:[a,b],polygonpoints:[[a,b],[b,c],...]}
      const len = this.prompts.length;
      let i = 0;
      for (i = 0; i < len; i++) {
        if (this.prompts[i].value.indexOf(this.inputValue) !== -1) {
          //匹配用户输入
          return {
            location: this.prompts[i].location,
            polygonpoints: this.prompts[i].polygonpoints,
            name: this.prompts[i].name,
            ...this.prompts[i],
          };
        }
      }
      //如果用户的输入全都没有匹配到但是有数据，就返回第一个
      if (i === len) {
        if (this.prompts.length !== 0) {
          return {
            location: this.prompts[0].location,
            polygonpoints: this.prompts[0].polygonpoints,
            ...this.prompts[0],
          };
        }
        //如果用户什么都没有输入或者无数据
        else return false;
      }
    },
    fromPoints: function (positions) {
      return GeoVis.BoundingRectangle.fromPoints(positions);
    },
    searchRequest: async function (placeName) {},
    routeTo(id) {
      const point = this.getPlaceFromId(id);
      //@ts-ignore
      const mapLocation = window.cordovaPlugin.mapLocation;
      mapLocation.getCurrentPosition().then((position) => {
        const start = [position.coords.longitude, position.coords.latitude];
        const end = point.location;
        this.$router.push({ name: "RouteNav", params: { origin: start, destination: end } });
      });
    },
    clickRightIcon() {
      this.$emit("clickRightIcon");
    },
    clickLeftIcon() {
      this.$emit("clickLeftIcon");
    },
  },
  computed: {
    config: function () {
      let configItems;
      if (this.route) {
        configItems = {
          label: this.label,
          button: false,
          star: false,
          route: false,
          convert: false,
        };
      } else {
        configItems = {
          label: "",
          button: true,
          star: true,
          route: true,
          convert: true,
        };
      }
      return configItems;
    },
    addressStarIconStyle: function () {
      const places = this.$store.state.starPlaces.places;
      return function (id) {
        const place = places.find((item) => {
          return item.id === id;
        });
        if (place) {
          return { color: "red" };
        }
      };
    },
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only 如果用element不能加scoped-->
  <style scoped lang="scss">
.search-component {
  position: relative;
  /* padding: 5px 4%; */
  width: 90%;
  margin: auto;
}
.search-input {
  width: 100%;
  z-index: 4;
  /* height: 42px; */
  padding: 5px;
  border-radius: 8px;
  background-color: $navbar-background;
}

.search-input .van-field__left-icon {
  line-height: 30px;
}
.search-input .van-cell {
  padding: 5px 5px;
}
.search-button {
  color: rgb(34, 126, 247);
}

.search-group-item {
  margin: 0 1px;
}
.search-checkbox {
  font-size: 12px;
}
.star {
  margin-right: 5px;
}
.van-cell__value--alone {
  display: inline-flex;
  justify-content: space-between;
}
.suggest-panel {
  position: absolute;
  top: 34px;
  left: 0;
  margin: 0 4%;
  width: 92%;
  border-radius: 10px;
  background-color: $navbar-background;
  z-index: 5;
}
.search-group {
  width: 95%;
  margin: auto;
  display: flex;
  justify-content: space-between;
}
</style>
  <style lang="scss">
.suggest-panel .van-cell {
  padding: 3px 2px 3px 2px;
}
.search-input .van-field__left-icon {
  line-height: 35px;
}
.search-input .van-field__control {
  background-color: $lighter-blue;
  color: $lightgray-word;
  padding: 2px;
  border-radius: 5px;
}
.suggest-panel .van-cell__title {
  -webkit-box-flex: unset !important;
  -webkit-flex: unset !important;
  flex: unset !important;
}
.van-cell__value--alone .van-cell__value {
  -webkit-box-flex: unset !important;
  -webkit-flex: unset !important;
  flex: unset !important;
  width: 50px;
}
.suggest-panel .van-cell {
  justify-content: space-between;
}
.result-list .van-swipe-cell__wrapper {
  flex: 1;
  display: flex;
  flex-direction: row;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.star .van-cell__value {
  display: inline-flex;
  justify-content: flex-end;
}
.custom-item-icon {
  line-height: 24px !important;
}
.person-items .van-cell__title,
.van-cell__value {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding-left: 4px;
}
.person-items .van-cell {
  border-bottom: 1px solid #ebedf0;
}
.person-infor-img .van-cell__right-icon {
  line-height: 40px;
}
.suggest-panel .van-icon {
  font-size: 20px;
}
.search-input .van-checkbox__icon--round .van-icon {
  border-radius: 100%;
  font-size: 15px;
}
.search-input .van-checkbox__label {
  margin: 0 0;
  color: $lightgray-word;
}
.search-input .van-icon-search {
  line-height: 30px;
}
</style>
<style lang="scss">
.search-group .van-button--plain {
  background: $highlight;
  color: white;
  border: 0;
  width: 48px;
  height: 25px;
}
.search-input .van-cell:after {
  border-bottom: 0;
}

.search-component {
  .van-cell {
    background: $light-blue;
    width: 95%;
    margin: 5px auto;
  }
  .van-cell__value--alone {
    color: $lightgray-word !important;
  }
  .van-cell-group {
    background: $navbar-background;
  }
  .van-cell:after {
    border-bottom: 0;
  }
  .van-checkbox__icon .van-icon {
  border: 2px solid lightgray;
  margin-right: 5px;
}
.van-checkbox__icon--checked .van-icon {
  background-color: $select-color;
  border-color: $select-color;
}
.van-icon-search:before {
  color: white;
  font-weight: bold;
}
[class*="van-hairline"]:after {
  border: 0;
}
}

</style>
  
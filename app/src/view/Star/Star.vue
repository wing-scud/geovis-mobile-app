<template>
  <div class="full star">
    <van-nav-bar title="收藏" left-text="返回" left-arrow @click-left="goBack" @click-right="showSearchInput(true)" v-if="navBar">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-search v-model="searchValue" show-action :label="searchTab" placeholder="请输入搜索关键词" @search="onSearch" @input="onSearch" v-else>
      <template #action>
        <div @click="showSearchInput(false)">取消</div>
      </template>
    </van-search>
    <van-tabs v-model="activeTab">
      <van-tab title="地点" name="place">
        <van-empty description="暂无地点收藏" v-if="filterPlaces.length <= 0" />
        <van-collapse v-model="activePlaces">
          <van-collapse-item :title="rough(item.name)" :name="item.id" v-for="(item, index) in filterPlaces" :key="item.id">
            <template #value>
              <MIcon icon="icon-sousuo" length="20px" customClass="starSearchTo" size="20px" :circle="true" @click="starSearchTo(index)"> </MIcon>
              <van-icon name="star-o" class="stared" @click="deletePlace(item.id)" />
            </template>
            <div class="detailPlace">
              <div class="label">
                名称:<span class="value">{{ item.name }}</span>
              </div>
              <div class="label">
                坐标:<span class="value">{{ item.location[0] }},{{ item.location[1] }}</span>
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <van-tab title="路线" name="route">
        <van-empty description="暂无路线收藏" v-if="filterRoutes.length <= 0" />
        <van-collapse v-model="activeRoutes">
          <van-collapse-item :title="item.id" :name="index" v-for="(item, index) in filterRoutes" :key="index">
            <template #value>
              <MIcon icon="icon-luxianchaxun" length="20px" customClass="starRouteTo" size="20px" :circle="true" @click="starRouteTo(index)"> </MIcon>
              <van-icon name="star-o" class="stared" @click="deleteRoute(item.id)" />
            </template>
            <div class="detailRoute">
              <div class="label">
                起点:<span class="value">{{ item.origin.geometry.coordinates[0] }},{{ item.origin.geometry.coordinates[1] }}</span>
              </div>
              <div class="label">
                终点:<span class="value">{{ item.destination.geometry.coordinates[0] }},{{ item.destination.geometry.coordinates[1] }}</span>
              </div>
              <div class="label">
                途径点:<span class="value" v-if="item.waypoints.length > 0">{{ item.waypoints[0] }},{{ item.waypoints[1] }}</span>
                <span class="value" v-else>无</span>
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { Toast } from "vant";
import Vue from "vue";
import _ from "lodash";
export default Vue.extend({
  name: "Star",
  data() {
    return {
      activeTab: "place", // place、route
      activePlaces: [],
      activeRoutes: [],
      places: [],
      routes: [],
      navBar: true,
      searchValue: "",
      debounceSearch: undefined,
      filterRoutes: [],
      filterPlaces: []
    };
  },
  mounted() {
    this.places = this.$store.state.starPlaces.places;
    this.routes = this.$store.state.starRoutes.routes;
    this.filterPlaces = this.places;
    this.filterRoutes = this.routes;
    const debounceSearch = _.debounce(this.search, 500);
    this.debounceSearch = debounceSearch;
  },
  computed: {
    searchTab: function() {
      //@ts-ignore
      return this.activeTab === "place" ? "地址" : "路线";
    }
  },
  methods: {
    rough(name) {
      return name.split(",")[0];
    },
    deletePlace(id) {
      Toast("取消收藏成功");
      this.$store.commit("starPlaces/deletePlace", id);
    },
    deleteRoute(id) {
      Toast("取消收藏成功");
      this.$store.commit("starRoutes/deleteRoute", id);
    },
    goBack() {
      this.$router.back();
    },
    onSearch() {
      this.debounceSearch();
    },
    search() {
      const type = this.activeTab;
      let searchArray;
      if (type === "place") {
        searchArray = this.places;
        this.filterPlaces = [];
        searchArray.map(item => {
          if (item.name.indexOf(this.searchValue) !== -1) this.filterPlaces.push(item);
        });
      } else {
        searchArray = this.routes;
        this.filterRoutes = [];
        searchArray.map(item => {
          if (item.name.indexOf(this.searchValue) !== -1) this.filterRoutes.push(item);
        });
      }
    },
    starRouteTo(index) {
      const route = this.filterRoutes[index];
      const waypoints = route.waypoints.map(obj => {
        return obj.geometry.coordinates;
      });
      this.$router.push({ name: "PathPlan", params: { origin: route.origin.geometry.coordinates, destination: route.destination.geometry.coordinates, waypoints: waypoints } });
    },
    starSearchTo(index) {
      const place = this.filterPlaces[index];
      this.$router.push({
        name: "SearchArea",
        params: place
      });
    },
    showSearchInput(bool) {
      if (bool) {
        this.navBar = false;
      } else {
        this.navBar = true;
        this.filterPlaces = this.places;
        this.filterRoutes = this.routes;
      }
    }
  }
});
</script>
<style>
.stared {
  color: red;
  margin: 0 15px;
  font-size: 20px;
}
.label {
  color: black;
}
.value {
  color: #969799;
}
.starRouteTo {
  /* color: red; */
}
.starSearchTo {
  margin-top: 5px;
}
</style>

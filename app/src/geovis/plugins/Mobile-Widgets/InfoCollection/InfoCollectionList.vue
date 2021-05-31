<template>
  <div class="full star">
    <van-tabs v-model="activeTab">
      <van-tab title="未上传" name="unSubmited">
        <van-empty description="暂无未上传信息" v-if="filterUnSubInfo.length <= 0" />
        <van-collapse v-model="unfoldUnSubInfos" v-else>
          <van-swipe-cell>
            <van-collapse-item :title="item.title" :name="item.id" v-for="(item, index) in filterUnSubInfo" :key="item.index">
              <div class="detailPlace">
                <div class="label">
                  名称:<span class="value">{{ item.title }}</span>
                </div>
                <div class="label">
                  描述:<span class="value">{{ item.describe }}</span>
                </div>
              </div>
            </van-collapse-item>
            <template #left>
              <van-button square type="primary" text="删除" />
            </template>
            <template #right>
              <van-button square type="danger" text="编辑" />
              <van-button square type="primary" text="上传" />
            </template>
          </van-swipe-cell>
        </van-collapse>
      </van-tab>
      <van-tab title="已上传" name="submited">
        <van-empty description="暂无已上传信息列表" v-if="unfoldSubInfos.length <= 0" />
      </van-tab>
    </van-tabs>
  </div>
</template>
//     <script lang="ts">
// import { Toast } from "vant";
// import Vue from "vue";
// import _ from "lodash";
// export default Vue.extend({
//   name: "InfoCollectionShow",
//   props: ["filter"],
//   data() {
//     return {
//       activeTab: "submited", // submited,unSubmited
//       submitedInfos: [],
//       unSubmitedInfos: [],
//       unfoldUnSubInfos: [],
//       unfoldSubInfos: [],
//     };
//   },
//   mounted() {
//     this.$store.state.gisInfos.gisInfos.forEach((item) => {
//       item.status ? this.submitedInfos.push(item) : this.unSubmitedInfos.push(item);
//     });
//   },
//   destroyed() {
//     this.submitedInfos = null;
//     this.unSubmitedInfos = null;
//   },
//   computed: {
//     filterSubInfo() {
//       return this.submitedInfos;
//     },
//     filterUnSubInfo() {
//       return this.unSubmitedInfos;
//     },
//   },
//   methods: {
//     deletePlace(id) {
//       Toast("取消收藏成功");
//       this.$store.commit("starPlaces/removePlace", id);
//     },
//     deleteRoute(id) {
//       Toast("取消收藏成功");
//       this.$store.commit("starRoutes/removeRoute", id);
//     },
//     goBack() {
//       //@ts-ignore
//       this.$router.backward(-1);
//     },
//     onSearch() {
//       this.debounceSearch();
//     },
//     search() {
//       const type = this.activeTab;
//       let searchArray;
//       if (type === "place") {
//         searchArray = this.places;
//         this.filterPlaces = [];
//         searchArray.map((item) => {
//           if (item.name.indexOf(this.searchValue) !== -1) this.filterPlaces.push(item);
//         });
//       } else {
//         searchArray = this.routes;
//         this.filterRoutes = [];
//         searchArray.map((item) => {
//           if (item.name.indexOf(this.searchValue) !== -1) this.filterRoutes.push(item);
//         });
//       }
//     },
//     starRouteTo(index) {
//       const route = this.filterRoutes[index];
//       const waypoints = route.waypoints.map((obj) => {
//         return obj.geometry.coordinates;
//       });
//       this.$router.push({ name: "PathPlan", params: { origin: route.origin.geometry.coordinates, destination: route.destination.geometry.coordinates, waypoints: waypoints } });
//     },
//     starSearchTo(index) {
//       const place = this.filterPlaces[index];
//       this.$router.push({
//         name: "SearchArea",
//         params: place,
//       });
//     },
//     showSearchInput(bool) {
//       if (bool) {
//         this.navBar = false;
//       } else {
//         this.navBar = true;
//         this.filterPlaces = this.places;
//         this.filterRoutes = this.routes;
//       }
//     },
//   },
// });
// </script>
    <style lang="scss">
.stared {
  color: red;
  margin: 0 15px;
  font-size: 20px;
}
.label {
  // color: black;
}
.value {
  color: #969799;
}
.starRouteTo {
  /* color: red; */
}
.starSearchTo {
  // margin-top: 5px;
  display: inline-block;
}
.star .van-collapse-item__content {
  background: $navbar-background !important;
  color: $lightgray-word !important;
}
</style>
    
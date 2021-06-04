<template>
  <div class="full star">
    <van-nav-bar title="采集列表" left-text="返回" left-arrow @click-left="goBack" @click-right="showSearchInput(true)" v-if="navBar">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-search v-model="searchValue" show-action :label="searchTab" placeholder="请输入搜索关键词" @search="onSearch" @input="onSearch" v-else>
      <template #action>
        <div @click="showSearchInput(false)">取消</div>
      </template>
    </van-search>
    <InfoList :filter="searchValue"> </InfoList>
  </div>
</template>
  <script lang="ts">
import { Toast } from "vant";
import Vue from "vue";
import _ from "lodash";
export default Vue.extend({
  name: "InfoCollectionList",
  data() {
    return {
      navBar: true,
      searchValue: "",
      debounceSearch: null,
    };
  },
  mounted() {
    const debounceSearch = _.debounce(this.search, 500);
    this.debounceSearch = debounceSearch;
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    onSearch() {
      this.debounceSearch();
    },
    search() {},
  },
});
</script>
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
  
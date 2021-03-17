<template>
  <div class="search-input">
    <van-field v-model="params" :left-icon="leftIcon" size="" placeholder="输入内容" clearable @clear="hiddenHistoryPanel"  @click-input="displayHistory" @input="changeHistory">
      <template #button>
        <van-button size="small" type="default" class="search-button" plain @click="search">搜索</van-button>
      </template>
    </van-field>
    <div class="history-panel" v-if="historyPanelState">
      <van-cell-group>
        <van-cell :title="item.name" :label="item.descri" v-for="item in historyRecords" :key="item.name" @click="chooseHistoryAddress(item.name)"></van-cell>
      </van-cell-group>
    </div>
    <div class="search-result" v-if="searchResult">
      <van-cell-group>
        <van-cell :title="item.name" :label="item.descri" v-for="item in searchResult" :key="item.name" @click="chooseSearchAddress(item.name)"></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
// Load the full build.
import _ from "lodash";
export default Vue.extend({
  name: "SearchInput",
  data() {
    return {
      params: "",
      leftIcon: "search",
      historyPanelState: false,
      searchResult: undefined,
      historyRecords: [
        {
          name: "空天院1",
          descri: "独墅湖大道158"
        },
        {
          name: "空天院2",
          descri: "独墅湖大道158"
        },
        {
          name: "空天院3",
          descri: "独墅湖大道158"
        }
      ]
    };
  },
  methods: {
    displayHistory() {
      this.historyPanelState = !this.historyPanelState;
    },
    getHistory() {},
    changeHistory() {
      _.debounce(this.getHistory, 500);
    },
    hiddenHistoryPanel() {
      debugger
      this.historyPanelState = false;
      this.historyRecords = [];
    },
    search() {
      this.historyPanelState = false;
      this.searchResult = [
        {
          name: "空天院4",
          descri: "独墅湖大道158"
        },
        {
          name: "空天院5",
          descri: "独墅湖大道158"
        },
        {
          name: "空天院6",
          descri: "独墅湖大道158"
        }
      ];
    },
    chooseHistoryAddress(address) {
      debugger
      this.params = address;
      this.search();
    },
    chooseSearchAddress(address) {
      this.$emit("changeComponent", { component: "Address", routeChange: false, address: address });
      //显示地点详情
    }
  }
});
</script>
<style scoped>
.search-input:first-child {
  background-color: #7570703d;
}
.search-input .van-cell {
  padding: 3px 12px;
}
.search-input {
  width: 96%;
  height: 100%;
  padding: 5px 2%;
  border-radius: 10px;
  background-color: white;
}
.search-button {
  color: rgb(34, 126, 247);
}
.search-result {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
<style>
.search-input .van-icon {
  line-height: 35px;
}
</style>

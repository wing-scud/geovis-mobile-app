<template>
  <div class="full">
    <van-nav-bar title="下载管理" left-text="返回" left-arrow @click-left="goBack" />
    <van-tabs v-model="active">
      <van-tab name="todownload" title="下载列表">
        <van-empty description="当前无下载列表" v-if="todownloadList.length === 0" />
        <van-swipe-cell v-for="item in todownloadList" :key="item.id">
          <div class="download-item">
            <van-cell :title="item.name" :value="item.size" size="large" />
          </div>
          <template #right>
            <van-button square type="danger" @click="downloadCity(item.name)" text="下载" />
          </template>
        </van-swipe-cell>
      </van-tab>
      <van-tab name="downloading" title="下载中">
        <van-empty description="当前无下载任务" v-if="downloadingList.length === 0" />
        <van-swipe-cell v-for="item in downloadingList" :key="item.id">
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>
          <div class="download-item">
            <van-image width="50px" height="50px" fit="fill" src="https://img01.yzcdn.cn/vant/cat.jpeg"> </van-image>
            <div class="download-describe">
              <div class="download-infor">
                <span class="download-name">
                  {{ item.name }}
                </span>
                <span class="download-size">
                  {{ item.size }}
                </span>
                <span class="download-time">
                  {{ item.time }}
                </span>
              </div>
              <div class="download-progress"><van-progress :percentage="item.progress" /></div>
            </div>
          </div>
        </van-swipe-cell>
      </van-tab>
      <van-tab name="downloaded" title="已完成">
        <van-empty description="暂无下载内容" v-if="downloadedList.length === 0" />
        <van-swipe-cell v-for="item in downloadedList" :key="item.id">
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
          </template>
          <div class="download-item">
            <van-image width="50px" height="50px" fit="fill" src="https://img01.yzcdn.cn/vant/cat.jpeg"> </van-image>
            <div class="download-describe">
              <div class="downloaded-infor">
                <span class="download-name">
                  {{ item.name }}
                </span>
                <span class="download-size">
                  {{ item.size }}
                </span>
              </div>
              <div class="downloaded-time">已完成 {{ item.time }}</div>
            </div>
          </div>
        </van-swipe-cell>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import manager from "./store";
export default Vue.extend({
  name: "DownloadManager",
  data() {
    return {
      active: "todownload",
      todownloadList: manager.todownloadList,
      downloadingList: manager.downloadingList,
      downloadedList: manager.downloadingList,
    };
  },
  mounted() {
    this.onLoad("todownload");
  },
  watch:{
    active(){
      this.onLoad(this.active)
    }
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    onLoad(type) {
      // 这种方法会导致this指向问题，需要bind
      const types = {
        todownload: manager.loadTodownload,
        downloading: manager.loadDownloading,
        downloaded: manager.loadDownloaded,
      };
      types[type] && types[type]();
    },
    downloadCity(name){
      manager.downloadCity(name)
    }
  },
});
</script>
<style scoped>
.download-item {
  width: calc(100% - 10px);
  padding: 5px 5px;
  display: flex;
  flex-direction: row;
}
.download-describe {
  flex-grow: 1;
  padding: 0 10px;
}
.download-infor {
  width: 100%;
  height: 25px;
  padding-bottom: 10px;
}
.downloaded-infor {
  width: 100%;
  height: 25px;
}

.download-progress {
  width: calc(100% - 20px);
  height: 15px;
}
.downloaded-time {
  width: calc(100% - 20px);
  height: 25px;
  font-size: 12px;
}
.download-name {
  width: 100px;
  display: inline-block;
}
.download-time,
.download-size {
  margin: 0 5px;
  float: right;
  font-size: 12px;
}
.list {
  overflow-y: auto;
  height: 100%;
  max-height: 800px;
}
</style>

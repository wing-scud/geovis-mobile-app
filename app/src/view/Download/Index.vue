<template>
  <div class="full">
    <van-nav-bar title="下载管理" left-text="返回" left-arrow @click-left="goBack" />
    <van-tabs v-model="active">
      <!-- <van-tab name="toDownload" title="下载">下载</van-tab> -->
      <van-tab name="downloading" title="下载中">
        <van-empty description="当前无下载任务" v-if="downloadingList.length === 0" />
        <van-list v-model="loading" class="list" :style="{ height: listHeight }" :finished="finished" finished-text="没有更多了" v-else @load="onLoad">
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
        </van-list>
      </van-tab>
      <van-tab name="downloaded" title="已完成">
        <van-empty description="暂无下载内容" v-if="downloadedList.length === 0" />
        <van-list v-model="loading" class="list" :style="{ height: listHeight }" :finished="finished" finished-text="没有更多了" v-else @load="onLoad">
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
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "DownloadManager",
  data() {
    return {
      active: "downloading",
      downloadingList: [
        {
          id: 0,
          name: "矢量地图1",
          size: "100G",
          progress: 100,
          time: "2021-02-21"
        }
      ],
      loading: false,
      finished: false,
      listHeight: "800px",
      downloadedList: [
        {
          id: 0,
          name: "矢量地图1",
          size: "100G",
          time: "2021-02-21"
        }
      ]
    };
  },
  mounted() {
    const navBar = document.getElementsByClassName("van-nav-bar")[0];
    const tabTitle = document.getElementsByClassName("van-tabs__wrap")[0];
    const topTitleHeight = navBar.clientHeight + tabTitle.clientHeight;
    this.listHeight = window.innerHeight - topTitleHeight + "px";
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const interval = setInterval(() => {
        const length = this.downloadingList.length;
        for (let i = 0; i < 10; i++) {
          this.downloadingList.push({
            id: i + length,
            name: (i + length).toString(),
            size: "100G",
            progress: Math.floor(Math.random() * 100),
            time: "2021-02-21"
          });
        }
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        if (this.downloadingList.length >= 40) {
          this.finished = true;
          clearInterval(interval);
        }
      }, 2000);
    }
  }
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

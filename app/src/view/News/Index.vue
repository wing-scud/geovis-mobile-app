<template>
  <div class="news-container">
    <van-nav-bar title="" left-arrow right-text="搜索" @click-left="goBack" />
    <van-field v-model="searchContain" :left-icon="leftIcon" :right-icon="rightIcon" size="" placeholder="请输入搜索内容" clearable> </van-field>
    <div class="all-news">
      <div v-for="(news, index) in newsData" :key="index" class="news-card">
        <p class="news-title">{{ news.title }}</p>
        <div class="news-source">
          <span>{{ news.source }}</span>
          <span>{{ news.date }}</span>
        </div>
        <p class="news-contain">
          {{ news.contain }}
        </p>
        <span class="news-time">{{news.time}}</span>
        <img src="static/images/火.png" class="fire"/>
        <span class="news-hot">{{news.hot}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "News",
  data() {
    return {
      searchContain: "",
      leftIcon: "",
      rightIcon: "",
      newsData: [
        {
          title: "习近平就中老建交60周年同通伦贺电",
          source: "新华网",
          date: "2021/4/30",
          contain: `行业研究需要的数据来源大致分为四种，
        一，数据搜索引擎，集合了全行业或垂直领域的大量数据，
        可以通过精准或模糊搜索查找到十分精确的数据，可以通过精......`,
          time: "2小时",
          hot: "2.6k",
        },
        {
          title: "习近平就中老建交60周年同通伦贺电",
          source: "新华网",
          date: "2021/4/30",
          contain: `行业研究需要的数据来源大致分为四种，
        一，数据搜索引擎，集合了全行业或垂直领域的大量数据，
        可以通过精准或模糊搜索查找到十分精确的数据，可以通过精......`,
          time: "2小时",
          hot: "2.6k",
        },
        {
          title: "习近平就中老建交60周年同通伦贺电",
          source: "新华网",
          date: "2021/4/30",
          contain: `行业研究需要的数据来源大致分为四种，
        一，数据搜索引擎，集合了全行业或垂直领域的大量数据，
        可以通过精准或模糊搜索查找到十分精确的数据，可以通过精......`,
          time: "2小时",
          hot: "2.6k",
        },
        {
          title: "习近平就中老建交60周年同通伦贺电",
          source: "新华网",
          date: "2021/4/30",
          contain: `行业研究需要的数据来源大致分为四种，
        一，数据搜索引擎，集合了全行业或垂直领域的大量数据，
        可以通过精准或模糊搜索查找到十分精确的数据，可以通过精......`,
          time: "2小时",
          hot: "2.6k",
        },
        {
          title: "习近平就中老建交60周年同通伦贺电",
          source: "新华网",
          date: "2021/4/30",
          contain: `行业研究需要的数据来源大致分为四种，
        一，数据搜索引擎，集合了全行业或垂直领域的大量数据，
        可以通过精准或模糊搜索查找到十分精确的数据，可以通过精......`,
          time: "2小时",
          hot: "2.6k",
        },
      ],
    };
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
  },
});
</script>
<style scoped lang="scss">
.news-container {
  height: 100%;
  background: $light-blue;
}
.all-news {
  width:100%;
  height:730px;
  position: relative;
  top: -35px;
  overflow:scroll;
}
.all-news::-webkit-scrollbar {
  display: none;
}
.news-card {
  width: 316px;
  height: 172px;
  border-radius: 10px;
  background: $navbar-background;
  color: white;
  margin: auto;
  margin-top: 10px;
  padding: 15px 10px 10px 10px;
}

.news-title {
  font-size: 18px;
  margin: 0;
}
.news-source {
  width: 95%;
  display: flex;
  justify-content: space-between;
  color: $darkblue-word;
  font-size: 12px;
  margin: 3px auto 5px auto;
}
.news-contain {
  width: 100%;
  margin: 0 0 10px 0 ;
  font-size: 14px;
  color: $lightgray-word;
}
.news-time{
  display:inline-block;
  width:36px;
  height:20px;
  background:#F2F2F2;
  color:#7F7F7F;
  text-align:center;
  border-radius:5px;
  font-size:12px;
  margin-right:20px;
  vertical-align: top;
}
.fire{
  width:24px;
  height:24px;
  vertical-align: middle;
}
.news-hot{
  font-size:14px;
  color:$lightgray-word;
}
</style>
<style lang="scss">
.news-container {
  .van-nav-bar__text {
    color: white;
    width: 40px;
    background: $highlight;
    border-radius: 5px;
  }
  .van-nav-bar {
    background: $navbar-background;
  }
  .van-nav-bar__title {
    color: white;
  }
  .van-icon-arrow-left:before {
    color: white;
  }
  .van-cell {
    width: 75%;
    top: -40px;
    left: 35px;
    height: 32px;
    z-index: 999;
    line-height: 32px;
    padding: 0 16px;
    border-radius: 15px;
    background: $lighter-blue;
    color: $lightgray-word;
  }
  .van-field__control {
    color: $lightgray-word;
  }
  .van-nav-bar__left,
  .van-nav-bar__right {
    padding: 0 5px 0 10px;
  }
  .van-cell:after{
    border-bottom:0;
  }
}
</style>

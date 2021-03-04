<template>
  <div>
    <div class="grayBack" v-if="currentTopic === ''">
      <div class="board">
        <div class="root">
          <!------------- 专题列表--------------->
          <div class="topic-main">
            <div class="firstPart" v-for="theme in themeList" :key="theme.mainTitle">
              <div class="titleDiv">
                <h2>{{ theme.mainTitle }}</h2>
              </div>
              <div class="chooseBoard">
                <div class="imgList" v-for="(topic, i) in theme.topics" :key="i" @click="enterTopic(topic)">
                  <img :src="topic.image" class="chooseImg" />
                  <div class="hoverDiv">
                    <p class="infoTitle">{{ topic.title }}</p>
                    <p class="infoDetail">{{ topic.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!------------- exit button --------------->
        </div>
      </div>
    </div>
    <el-button class="exitButton" v-if="currentTopic !== ''" @click="exitTopic" size="mini">
      <!-- icon="el-icon-close" -->
      <i class="el-icon-close"></i
    ></el-button>

    <div id="loader" v-if="showLoader">
      <div class="loader21 loader">
        <div class="loader-21">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { earthStore } from "@/geovis/store";

export default {
  name: "ThematicBoard",
  data() {
    return {
      showLoader: false,
      themeList: window["topics"],
      currentTopic: ""
    };
  },
  mounted() {},
  methods: {
    enterTopic(topic) {
      this.currentTopic = topic.id;
      this.showLoader = true;
      setTimeout(() => {
        this.showLoader = false;
      }, 2000);
      earthStore.enablePlugin(topic.id);
    },
    exitTopic() {
      const currentTopic = this.currentTopic;
      earthStore.enablePlugin(currentTopic, false);
      this.currentTopic = "";
      earthStore.enablePlugin("TopicManager", true);
    }
  }
};
</script>

<style scoped>
.root {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.firstPart {
  width: 100%;
  /* border: 1px solid white; */
  margin-bottom: 10px;
}

.titleDiv {
  width: 100%;
  height: 50px;
  /* background: url("./assets/ThematicShow/title.png") no-repeat; */
  text-align: center;
  color: white;
  font-size: 18px;
  line-height: 42px;
  user-select: none;
}

.chooseBoard {
  width: 920px;
  /* height:200px; */
  margin: auto;
  /* background: red; */
  padding: 10px 0 10px 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.imgList {
  width: 300px;
  height: 150px;
  margin-right: 3px;
  margin-bottom: 3px;
  padding-top: 10px;
  /* line-height: 200px; */
  /* text-align:center;
    vertical-align:middle; */
  /* background: url("./assets/ThematicShow/imageback.png") no-repeat;
    background-size:100% 100%; */
  /* border: 1px solid rgb(16, 79, 126); */
  display: inline-block;
  cursor: pointer;
  user-select: none;
}

.chooseImg {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.hoverDiv {
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, 0.73);
  position: relative;
  top: -40px;
  vertical-align: middle;
  overflow: hidden;
}

/*.hoverDiv:hover {
  height: 200px;
  top: -200px;
   animation: myfirst 1s;
  -webkit-animation: myfirst 1s; 
}*/
/* @keyframes myfirst {
  from {
    height: 30px;
    top: -30px;
  }
  to {
    height: 100px;
    top: -100px;
  }
} */
.infoTitle {
  vertical-align: middle;
  height: 40px;
  line-height: 40px;
  margin: 0;
  color: white;
  margin-left: 10px;
  font-size: 16px;
}

.infoDetail {
  color: white;
  font-size: 14px;
  margin: 10px;
}

.grayBack {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0;
  background: inherit;
  background: #00000080;
}

.board {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 950px;
  height: 580px;
  background: rgba(4, 14, 24, 0.93);
}</style
><style>
@-webkit-keyframes loader21 {
  0% {
    -webkit-transform: scale(1, 1);
  }
  100% {
    -webkit-transform: scale(1, 0.3);
  }
}
.loader-21 div {
  width: 5px;
  height: 35px;
  background: #fff;
  border-radius: 2px;
  display: inline-block;
}
.loader21 {
  left: 47%;
  top: 47%;
  position: absolute;
}
.loader-21 div:nth-child(1) {
  -webkit-animation: loader21 0.5s -0.3s ease-in-out infinite alternate;
}
.loader-21 div:nth-child(2) {
  -webkit-animation: loader21 0.5s -0.15s ease-in-out infinite alternate;
}
.loader-21 div:nth-child(3) {
  -webkit-animation: loader21 0.5s 0s ease-in-out infinite alternate;
}
.loader-21 div:nth-child(4) {
  -webkit-animation: loader21 0.5s -0.15s ease-in-out infinite alternate;
}
.loader-21 div:nth-child(5) {
  -webkit-animation: loader21 0.5s -0.4s ease-in-out infinite alternate;
}

#loader {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
  padding: 0;
  background-color: #202c2f;
  z-index: 2000;
}

.exitButton {
  position: fixed;
  width: 40px;
  height: 40px;
  /* border-radius: 50%; */
  right: 10px;
  top: 10px;
  z-index: 10000;
  font-size: 20px;
  background-color: rgb(38, 50, 56);
  /* background-image: url(/img/返回.png) */
}
</style>

<template>
  <div class="databasePage" v-drag>
    <div>
      <button @click="closeDatabase" class="closeBtn">X</button>
    </div>
    <div class="innnerDatabase">
      <div>
        <input type="text" value="search......" class="search" />
        <div class="searchIcon">
          <img src="../image/all/放大镜.png" />
        </div>
        <div class="baseTitle">
          <div class="hrLine"></div>

          <span>场景数据库</span>
          <span class="count">{{ dataBase.length }}</span>
          <div class="hrLine"></div>
          <img src="../image/all/清空.png" />
        </div>
      </div>
      <div class="showDataBase" v-for="(data, index) in dataBase" :key="index">
        <div class="firstData">
          <img src="../image/all/数据库.png" />
          <div class="title_img">
            <p>{{ data.title }}</p>
            <p class="json">.{{ data.type }}</p>
          </div>
          <div>
            <div class="bluedot"></div>
            <span class="savaDate">{{ data.date }}</span>
          </div>
        </div>
        <div class="line"></div>
        <img src="../image/all/垃圾桶.png" class="bottomImg" />
        <img src="../image/all/编辑.png" class="bottomImg" />
      </div>
    </div>
  </div>
</template>
<script>
import { databaseContent } from "../model/data/data.js";
import Vue from "vue";
Vue.directive('drag',{
     bind: function(el) {
        const oDiv = el;

        oDiv.onmousedown = e => {
          const disX = e.clientX - oDiv.offsetLeft;
          const disY = e.clientY - oDiv.offsetTop;

          document.onmousemove = e => {
            const left = e.clientX - disX;
            const top = e.clientY - disY;
            oDiv.style.left = left + "px";
            oDiv.style.top = top + "px";
          };

          document.onmouseup = e => {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
});
export default {
  name: "DataBase",
  data() {
    return {
      dataBase: databaseContent,
      isshowDrag: true
    };
  },
  methods: {
    closeDatabase() {
      this.$emit("closeDatabase");
    }
  },
//   directives: {
//     drag: {
//       bind: function(el) {
//         const oDiv = el;

//         oDiv.onmousedown = e => {
//           const disX = e.clientX - oDiv.offsetLeft;
//           const disY = e.clientY - oDiv.offsetTop;

//           document.onmousemove = e => {
//             const left = e.clientX - disX;
//             const top = e.clientY - disY;
//             oDiv.style.left = left + "px";
//             oDiv.style.top = top + "px";
//           };

//           document.onmouseup = e => {
//             document.onmousemove = null;
//             document.onmouseup = null;
//           };
//         };
//       }
//     }
//   }
};
</script>
<style lang="scss" scoped>
.drag-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;
  background: red;
}
.closeBtn {
  float: right;
  color: gray;
}
.databasePage {
  position: absolute;
  background: rgb(34, 35, 41);
  $a: 300px;
  left: 300px;
  top: 200px;
  //   padding: 20px 40px 40px 40px;
}
.innnerDatabase {
  width: 660px;
  padding: 20px 40px 40px 40px;
}
.firstData {
  p {
    color: white;
  }
  .json {
    color: rgb(34, 88, 120);
  }
}
.showDataBase {
  width: 200px;
  height: 125px;
  display: inline-block;
  background: rgb(28, 29, 36);
  margin: 10px;
  .bottomImg {
    width: 16px;
    height: 16px;
    float: right;
    margin: 10px 15px 10px 0;
  }
}
.showDataBase:hover,
.showDataBase:focus {
  background: rgb(49, 51, 64);
  .bluedot {
    background: springgreen;
  }
}
.search {
  width: 150px;
  height: 22px;
  padding-left: 10px;
  color: gray;
  border: 1px solid gray;
  background: black;
  vertical-align: middle;
}
.searchIcon {
  width: 24px;
  height: 24px;
  border: 1px solid gray;
  background: rgb(49, 51, 64);
  vertical-align: middle;
  display: inline-block;
  text-align: center;
  img {
    width: 16px;
    height: 16px;
  }
}
.baseTitle {
  margin-bottom: 10px;
  span {
    color: white;
  }
  img {
    width: 24px;
    height: 24px;
  }
}
.hrLine {
  display: inline-block;
  width: 237px;
  height: 0;
  border-bottom: 1px solid gray;
  margin-right: 10px;
}
.count {
  display: inline-block;
  width: 30px;
  height: 18px;
  border: 1px solid gray;
  text-align: center;
  font-size: 14px;
}
</style>
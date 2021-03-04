<template>
  <div class="menu">
    <div class="title">
      <img src="../image/all/title.png" />
      <span>数据可视化</span>
    </div>
    <el-collapse  >
      <el-collapse-item title="数据处理" name="1">
        <div class="addData">
          <button class="plusBtn" @click="showAddDataPage">+添加数据</button>
          <div>
            <span style="width:10px;height:10px;background:rgb(0,0,255);display:inline-block"></span>
            <span>{{ states.dataName }}</span>
          </div>
        </div>
      </el-collapse-item>

      <el-collapse-item title="样式" name="2">
        <VisualStyle  />
      </el-collapse-item>

      <el-collapse-item title="存储" name="3">
        <div class="addData">
          <button class="saveData">
            <img src="../image/all/保存.png" />
            <span>保存场景</span>
          </button>
          <!--数据库第一个数据-->
          <div class="showDataBase">
            <div class="firstData">
              <img src="../image/all/数据库.png" />
              <div class="title_img">
                <p>飞线，散点图集合</p>
                <p class="json">.json</p>
              </div>
              <div>
                <div class="bluedot"></div>
                <span class="savaDate">2020.12.08</span>
              </div>
            </div>
            <div class="line"></div>
            <div class="showBase">
              <button @click="openDatabase">打开数据库</button>
            </div>
          </div>
          <!--数据库第一个数据 end-->
        </div>
      </el-collapse-item>
    </el-collapse>
    <FileInput v-show="addDataPage" @showAddDataPage="showAddDataPage" @fileChange="fileChange" />
    <DataBase v-show="databasePage" @closeDatabase="closeDatabase" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FileInput from "./FileInput.vue";
import DataBase from "./DataBase.vue";
import VisualStyle from "./VisualStyle.vue";
import   visManager from  "../model/VisManager.js";

const VisualMenu = Vue.extend({
  name: "VisualMenu",
  components: {
    FileInput,
    DataBase,
    VisualStyle
  },
  data() {
    return {
      addDataPage: false,
      databasePage: false,
      states:visManager.state,
     };
  },
  methods: {
    fileChange(name) {
      visManager.fileChange(name);
      },
    closeDatabase() {
      this.databasePage = !this.databasePage;
    },
    openDatabase() {
      this.databasePage = !this.databasePage;
    },
    showAddDataPage() {
      this.addDataPage = !this.addDataPage;
    }
  } 
});
Vue.component("VisualMenu", VisualMenu);
export default VisualMenu;
</script>
<style lang="scss" src="./style.scss"></style>

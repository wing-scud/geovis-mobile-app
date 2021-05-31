<template>
  <div class="full">
    <van-button @click="createFile"> 测试createFile接口 </van-button>
    <van-button @click="writeFile"> 测试writeFile接口 </van-button>
    <van-button @click="readFile"> 测试readFile接口 </van-button>
    <van-button @click="existDir"> 测试existDir接口 </van-button>
     <van-button @click="existFile"> 测试existFile接口 </van-button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import mime from "mime"
export default Vue.extend({
  name: "FilePlugin",
  data() {
    return {};
  },
  methods: {
    async createFile() {
      const filePlugin = window["plugin"].file;
      const result = await filePlugin.createFile("/firstDir/secondDir/create2.txt", true);
      console.log(result);
      //@ts-ignore
      console.log(mime.getExtension('image'))
    },
    async writeFile() {
      const filePlugin = window["plugin"].file;
      const result = await filePlugin.writeFile("/firstDir/secondDir/create7.txt", "writeFile" + Date.now(), { isAppend: false,create:true });
      console.log(result);
    },
    async readFile() {
      const filePlugin = window["plugin"].file;
      const result = await filePlugin.readFile("/firstDir/secondDir/create2.txt");
      console.log(result);
    },
    async existDir() {
      const filePlugin = window["plugin"].file;
      const result = await filePlugin.existDir("/firstDir/secondDir");
      console.log(result);
    },
    async existFile() {
      const filePlugin = window["plugin"].file;
      const result = await filePlugin.existFile("/firstDir/secondDir/2.text");
      console.log(result);
    },
  },
});
</script>
<style scoped>
.file-content {
  width: 100%;
  color: white;
  background-color: black;
  min-height: 40px;
  font-size: 12px;
}
.img {
  width: 40px;
  height: 40px;
}
</style>

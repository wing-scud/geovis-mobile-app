<template>
  <div class="full">
    <van-button @click="createFile"> 创建并写入hello文件 </van-button>
    <van-button @click="appendFile"> 追加内容 </van-button>
    <van-button @click="readFile"> 读取 </van-button>
    <van-button @click="createDir"> 创建目录 </van-button>
    <van-button @click="saveImage"> 保存图片 </van-button>
    <van-button @click="saveImageToGallery"> 保存图片到相册 </van-button>
    <van-button @click="readImage"> 读取图片 </van-button>
    <div class="file-content">
      <span v-text="content"> </span>
    </div>
    <img :src="imageUrl" class="img" id="image" />
    <canvas id="canvas"></canvas>
    <van-image width="100" height="100" :src="imageUrl" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "FilePlugin",
  data() {
    return {
      content: "",
      imageUrl: "",
      lastName: ""
    };
  },
  methods: {
    async createFile() {
      //@ts-ignore
      const filePlugin = window.cordovaPlugin.file;
      const rootEntry = await filePlugin.getRootDirEntry();
      const fileEntry = await filePlugin.getFileEntry(rootEntry, "hello.txt");
      filePlugin.writeFile(fileEntry, "hello", false);
    },
    async appendFile() {
      //@ts-ignore
      const filePlugin = window.cordovaPlugin.file;
      const rootEntry = await filePlugin.getRootDirEntry();
      const fileEntry = await filePlugin.getFileEntry(rootEntry, "hello.txt");
      filePlugin.writeFile(fileEntry, "-- world", true);
    },
    async readFile() {
      //@ts-ignore
      const filePlugin = window.cordovaPlugin.file;
      const rootEntry = await filePlugin.getRootDirEntry();
      const fileEntry = await filePlugin.getFileEntry(rootEntry, "hello.txt");
      this.content = await filePlugin.readFile(fileEntry, "text");
    },
    async createDir() {
      //@ts-ignore
      const filePlugin = window.cordovaPlugin.file;
      const rootDirEntry = await filePlugin.getRootDirEntry();
      await filePlugin.getDirectory(rootDirEntry, "images", true);
    },
    async saveImage() {
      const instance = this;
      //@ts-ignore
      const filePlugin = window.cordovaPlugin.file;
      const rootDirEntry = await filePlugin.getRootDirEntry();
      const imageEntry = await filePlugin.getDirectory(rootDirEntry, "images", false);
      fetch("https://2a.zol-img.com.cn/product/124_500x2000/746/cexItD2yJ21Rs.jpg").then(res => {
        res.blob().then(blob => {
          instance.lastName = `${Math.floor(Math.random() * 100)}.jpg`;
          filePlugin.saveFile(imageEntry, blob, instance.lastName);
        });
      });
    },
    saveImageToGallery() {
        //暂未制作
    },
    async readImage() {
      //@ts-ignore
      const filePlugin = window.cordovaPlugin.file;
      const rootDirEntry = await filePlugin.getRootDirEntry();
      const imageEntry = await filePlugin.getDirectory(rootDirEntry, "images", false);
      const fileEntry = await filePlugin.getFileEntry(imageEntry, this.lastName);
      this.imageUrl = fileEntry.toURL();
      const blob = await filePlugin.readImage(fileEntry, "image/jpg");
      const base64 = this.image2Base64(document.getElementById("image"));
    },
    image2Base64(img) {
      const canvas = document.getElementById("canvas");
      //@ts-ignore
      canvas.width = img.width;
      //@ts-ignore
      canvas.height = img.height;
      //@ts-ignore
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      //@ts-ignore
      const dataURL = canvas.toDataURL("image/jpg");
      return dataURL;
    }
  }
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

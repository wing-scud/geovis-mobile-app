<template>
  <div class="full">
    <van-button @click="openGallery">
      打开相册
    </van-button>
    <van-button @click="displayPhoto">
      显示图片
    </van-button>
    <image id="photo" class="testPhoto" :src="imageUrl"></image>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import cameraPlugin from "./store";
export default Vue.extend({
  name: "CameraPlugin",
  data() {
    return {
      imageUrl: ""
    };
  },
  methods: {
    openGallery() {
      cameraPlugin.openFilePicker("").then((uri: string) => {
        this.imageUrl = uri;
        //file:///data/user/0/com.iecas.geovis/cache/IMG_20210407_023412.jpg?1617764631190
        console.log(uri)
      });
    },
    displayPhoto() {
      const imageUrl = this.imageUrl;
      const container = document.getElementById("photo");
      cameraPlugin.displayImage(imageUrl, container);
    }
  }
});
</script>
<style scoped>
.testPhoto {
  width: 100px;
  height: 100px;
}
</style>

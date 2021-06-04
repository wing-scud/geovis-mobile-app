<template>
  <div class="full">
    <van-nav-bar title="采集信息" class="feedtitle" left-text="返回" left-arrow @click-left="goBack" right-text="保存" @click-right="save" />
    <div class="info-container">
      <van-form @submit="onSubmit">
        <div class="info-title">主题</div>
        <van-field v-model="title" class="info-field" name="title" />
        <div class="info-title">描述</div>
        <van-field v-model="describe" class="info-field" type="textarea" name="describe" placeholder="请填写十字以上的描述" rows="3" autosize show-word-limit />
        <div class="info-title">文件</div>
        <van-field name="fileList">
          <template v-slot:input>
            <div class="files-list-preview">
              <div class="custom-file-load" v-for="(item, index) in fileList" :key="index">
                <van-icon name="cross" class="right-top-close" @click="removeFile(index)" />
                <img class="custom-image-preview" fit="fill" :src="item.content" v-if="isImage(item.file)" />
                <div class="file-preview" v-else>
                  {{ item.file.name }}
                </div>
              </div>
              <div class="custom-file-load" @click="dialogShow">
                <van-icon name="orders-o" />
              </div>
            </div>
          </template>
        </van-field>
        <van-dialog v-model="show" title="类型选择" show-cancel-button>
          <div class="type-choose">
            <van-uploader accept=".*" :before-read="dialogShow" :after-read="afterRead" multiple :max-count="4">
              <template>
                <div class="custom-file-load">
                  <span> 选择文件 </span>
                </div>
              </template>
            </van-uploader>
            <van-uploader accept="image/*,video/*" capture="camera" :before-read="dialogShow" :after-read="afterRead" multiple :max-count="4">
              <template>
                <div class="custom-file-load">
                  <span> 拍照或录像 </span>
                </div>
              </template>
            </van-uploader>
          </div>
        </van-dialog>
        <div class="info-title">位置</div>
        <van-field name="position">
          <template #input>
            <van-cell v-model="point.lngLat" :title="point.locationName" icon="location-o" />
          </template>
        </van-field>
        <div class="center">
          <van-button type="info" class="info-submit" plain hairline native-type="onSubmit"> 提交 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import mime from "mime";
import { Toast } from "vant";
export default Vue.extend({
  name: "AddInfo",
  data() {
    return {
      describe: "",
      fileList: [],
      title: "",
      point: {
        lngLat: "",
        locationName: "",
      },
      show: false,
    };
  },
  async beforeMount() {
    const locationPlugin = window["plugin"]["mapLocation"];
    const position = await locationPlugin.getCurrentPosition();
    //度、纬度如需精确到米需5位小数，10米 4位
    const lng = position.coords.longitude.toFixed(4);
    const lat = position.coords.latitude.toFixed(4);
    //@ts-ignore
    const lnglat = [lng, lat];
    this.point = {
      lngLat: lnglat.join(","),
      locationName: "苏州工业园区空天院",
    };
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    afterRead(file, detail) {
      this.fileList.push(file);
    },
    isImage(file) {
      //@ts-ignore
      return file.type.split("/")[0] === "image";
    },
    async onSubmit() {
      const values = {
        status: true,
        describe: this.describe,
        fileList: this.getBlob(),
        title: this.title,
        position: this.point,
      };
      const result = await this.$store.dispatch("gisInfos/upload", values);
      Toast(result.message);
      result.success && this.$router.push({ name: "InfoCollectionDeatil", params: result.id });
    },
    dialogShow() {
      this.show = !this.show;
      return !this.show;
    },
    async save() {
      const values = {
        status: false,
        describe: this.describe,
        fileList: this.getBlob(),
        title: this.title,
        position: this.point,
      };
      const result = await this.$store.dispatch("gisInfos/upload", values);
      Toast(result.message);
    },
    removeFile(index) {
      this.fileList.splice(index, 1);
    },
    getBlob() {
      return this.fileList.map((item) => {
        return item.file;
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.info-container {
  background-color: $navbar-background;
  padding: 5px 5px;
  font-size: 14px;
  height: calc(100% - 46px);
}
.feedtitle {
  background-color: $navbar-background;
}
.info-title {
  width: 90%;
  padding: 0 5px;
  font-size: 12px;
  margin: 8px 0;
  color: rgb(153, 147, 147);
}
.info-field {
  font-size: 13px;
}
.info-input {
  height: 32px;
  line-height: 32px;
  padding: 0 0;
}
.center {
  width: 100%;
  height: 32px;
  margin: 16px 0;
  text-align: center;
}
.info-submit {
  width: 80px;
  height: 32px;
  text-align: center;
}
.files-list-preview {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  text-align: center;
  font-size: 16px;
  width: 100%;
}
.custom-file-load {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // flex-grow: 1;
  width: 30%;
  height: 80px;
  margin: 0 1.6%;
  // margin: 5px 5px;
  // max-width: 100px;
  min-width: 80px;
  min-height: 80px;
  background: white;
  color: #dcdee0;
}
.right-top-close {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 12px;
  z-index: 4;
}
.type-choose {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 8px 0;
  width: 100%;
}
.van-dialog {
  background: #2a355d;
  color: white;
}
.file-preview {
  font-size: 12px;
}
.custom-image-preview {
  width: 100%;
  height: 100%;
}
</style>

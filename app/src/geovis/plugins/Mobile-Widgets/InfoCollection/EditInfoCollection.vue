<template>
  <div>
    <van-nav-bar title="采集信息编辑" class="feedtitle" left-text="返回" left-arrow @click-left="goBack" right-text="保存" @click-right="save" />
    <div class="info-container">
      <van-form>
        <div class="info-title">主题</div>
        <van-field v-model="gisInfo.title" class="info-field" name="title" />
        <div class="info-title">描述</div>
        <van-field v-model="gisInfo.describe" class="info-field" type="textarea" name="describe" placeholder="请填写描述" rows="3" autosize show-word-limit />
        <div class="info-title">文件</div>
        <van-field name="fileList">
          <template v-slot:input>
            <div class="files-list-preview">
              <div class="custom-file-load" v-for="(item, index) in gisInfo.fileList" :key="index">
                <van-icon name="cross" class="right-top-close" @click="removeExistFile(item, index)" />
                <img class="custom-image-preview" fit="fill" :src="item.content" v-if="item.content" />
                <div class="file-preview" v-else>
                  {{ item.fileName }}
                </div>
              </div>

              <div class="custom-file-load" v-for="(item, index) in addedFiles" :key="index">
                <van-icon name="cross" class="right-top-close" @click="removeAddedFile(item, index)" />
                <img class="custom-image-preview" fit="fill" :src="item.content" v-if="item.content" />
                <div class="file-preview" v-else>
                  {{ item.fileName }}
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
            <van-cell v-model="gisInfo.position.lngLat" :title="gisInfo.position.locationName" icon="location-o" />
          </template>
        </van-field>
      </van-form>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Toast } from "vant";
//@ts-ignore
import * as deepcopy from "deepcopy";
//@ts-ignore
import { deepProxy } from "@/util/utils";
export default Vue.extend({
  name: "EditInfoCollection",
  props: ["id"],
  data() {
    return {
      gisInfo: {
        title: "",
        describe: "",
        position: {
          locationName: "",
          lngLat: null,
        },
        fileList: [],
        id: "",
      },
      show: false,
      removedFileIds: [],
      addedFiles: [],
      originGisInfo: null,
    };
  },
  async beforeMount() {
    const originGisInfo = this.$store.getters["gisInfos/getById"](this.id);
    this.gisInfo = deepcopy(originGisInfo);
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    afterRead(obj, detail) {
      this.addedFiles.push({
        content: window.URL.createObjectURL(obj.file),
        fileName: obj.file.fileName,
        file: obj.file,
      });
    },
    async save() {
      const id = this.gisInfo.id;
      const originGisInfo = this.$store.getters["gisInfos/getById"](this.id);
      //
      const options = {
        fileList: this.addedFiles.map((obj) => obj.file),
        removedFileIds: this.removedFileIds,
        id: id,
      };
      if (originGisInfo.title !== this.gisInfo.title) {
        options["title"] = this.gisInfo.title;
      }
      if (originGisInfo.describe !== this.gisInfo.describe) {
        options["describe"] = this.gisInfo.describe;
      }
      if (originGisInfo.position.locationName !== this.gisInfo.position.locationName) {
        options["position"]["locationName"] = this.gisInfo.position.locationName;
      }
      if (originGisInfo.position.lngLat !== this.gisInfo.position.lngLat) {
        options["position"]["lngLat"] = this.gisInfo.position.lngLat;
      }
      const result = await this.$store.dispatch("gisInfos/edit", options);
      result && Toast("编辑成功");
    },
    dialogShow() {
      this.show = !this.show;
      return !this.show;
    },
    removeExistFile(item, index) {
      this.removedFileIds.push(item.id);
      this.gisInfo.fileList.splice(index, 1);
    },
    removeAddedFile(item, index) {
      this.addedFiles.splice(index, 1);
    },
    getFileArrayChanges(newArray, old) {
      const removedFileIds = [];
      old.forEach((oldItem) => {
        const index = newArray.findIndex((newItem) => newItem.id === oldItem.id);
        if (index === -1) {
          removedFileIds.push(oldItem.id);
        }
      });
      const addFiles = [];
      newArray.forEach((newItem) => {
        const index = old.findIndex((oldItem) => newItem.id === oldItem.id);
        if (index === -1) {
          addFiles.push();
        }
      });
      return { addFiles, removedFileIds };
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
  color: white;
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
  
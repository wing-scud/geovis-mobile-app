<template>
  <van-tabs v-model="activeTab">
    <van-tab title="已上传" name="unSubmited">
      <van-empty description="暂无已上传信息列表" v-if="filterSubInfos.length <= 0" />
      <van-collapse v-model="unfoldUnSubInfos" v-else>
        <van-swipe-cell v-for="(item, index) in filterSubInfos" :key="index">
          <van-collapse-item :title="item.title" :name="item.id">
            <div class="detailPlace">
              <div class="label">
                名称:<span class="value">{{ item.title }}</span>
              </div>
              <div class="label">
                描述:<span class="value">{{ item.describe }}</span>
              </div>
            </div>
            <div class="files-list-preview">
              <div class="custom-file-load" v-for="(item, index) in item.fileList" :key="index">
                <img class="custom-image-preview" fit="fill" :src="item?item:require('@/assets/images/file.png')" />
              </div>
            </div>
          </van-collapse-item>
          <template #left>
            <van-button square type="primary" text="删除" @click="removeItem(item.id)" />
          </template>
          <template #right>
            <van-button square type="danger" text="编辑" @click="routeToEdit(item.id)" />
            <van-button square type="primary" text="上传" @click="submit(item.id)" />
          </template>
        </van-swipe-cell>
      </van-collapse>
    </van-tab>
    <van-tab title="未上传" name="submited">
      <van-empty description="暂无未上传信息列表" v-if="filterUnSubInfos.length <= 0" />
    </van-tab>
  </van-tabs>
</template>
<script>
import { Toast } from "vant";
import { getLocalPreview } from "@/util/utils.js";
export default {
  name: "InfoCollectionShow",
  props: ["filter"],
  data() {
    return {
      activeTab: "submited", // submited,unSubmited
      submitedInfos: [],
      unSubmitedInfos: [],
      unfoldUnSubInfos: [],
      unfoldSubInfos: [],
    };
  },
  mounted() {
    this.$store.state.gisInfos.gisInfos.forEach(async (item) => {
      const promises = item.fileList.map(async (fullPath) => {
        return await getLocalPreview(fullPath);
      });
      Promise.all(promises).then((fileBase64List) => {
        item.fileList = fileBase64List;
        item.status ? this.submitedInfos.push(item) : this.unSubmitedInfos.push(item);
      });
    });
  },
  destroyed() {
    this.submitedInfos = null;
    this.unSubmitedInfos = null;
  },
  computed: {
    filterSubInfos() {
      //filter
      return this.submitedInfos;
    },
    filterUnSubInfos() {
      //filter
      return this.unSubmitedInfos;
    },
  },
  methods: {
    removeItem(id) {
      this.$store.commit("gisInfos/remove", id) && Toast("删除成功");
    },
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    routeToEdit(id) {
      this.$router.push({ name: "EditInfoCollection" }, { id });
    },
    async submit(id) {
      // const result =await this.$store.dispatch("gisInfos/submit", values);
      // result && Toast("上传成功");
    },
  },
};
</script>
    <style lang="scss">
.stared {
  color: red;
  margin: 0 15px;
  font-size: 20px;
}
.label {
  // color: black;
}
.value {
  color: #969799;
}
.starRouteTo {
  /* color: red; */
}
.starSearchTo {
  // margin-top: 5px;
  display: inline-block;
}
.star .van-collapse-item__content {
  background: $navbar-background !important;
  color: $lightgray-word !important;
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

.file-preview {
  font-size: 12px;
}
.custom-image-preview {
  width: 100%;
  height: 100%;
}
</style>
    
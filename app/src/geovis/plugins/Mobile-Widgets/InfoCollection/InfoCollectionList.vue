<template>
  <van-tabs v-model="activeTab">
    <van-tab title="已上传" name="submited">
      <van-empty description="暂无已上传信息列表" v-if="filterSubInfos.length <= 0" />
      <van-collapse v-model="unfoldUnSubInfos" v-else>
        <van-swipe-cell v-for="(gisInfo, index) in filterSubInfos" :key="index">
          <van-collapse-item :title="gisInfo.title" :name="gisInfo.id">
            <div class="detail">
              <div class="label">
                名称:<span class="value">{{ gisInfo.title }}</span>
              </div>
              <div class="label">
                描述:<span class="value">{{ gisInfo.describe }}</span>
              </div>
            </div>
            <div class="files-list-preview">
              <div class="custom-file-load" v-for="(item, index) in gisInfo.fileList" :key="index">
                <img class="custom-image-preview" fit="fill" :src="item.content" v-if="item.content" />
                <div v-text="item.fileName" v-else></div>
              </div>
            </div>
          </van-collapse-item>
          <template #left>
            <van-button square type="primary" text="删除" @click="removeItem(gisInfo)" />
          </template>
          <template #right>
            <van-button square type="danger" text="编辑" @click="routeToEdit(gisInfo.id)" />
          </template>
        </van-swipe-cell>
      </van-collapse>
    </van-tab>
    <van-tab title="未上传" name="unSubmited">
      <van-empty description="暂无未上传信息列表" v-if="filterUnSubInfos.length <= 0" />
      <van-collapse v-model="unfoldUnSubInfos" v-else>
        <van-swipe-cell v-for="(gisInfo, index) in filterUnSubInfos" :key="index">
          <van-collapse-item :title="gisInfo.title" :name="gisInfo.id">
            <div class="detail">
              <div class="label">
                名称:<span class="value">{{ gisInfo.title }}</span>
              </div>
              <div class="label">
                描述:<span class="value">{{ gisInfo.describe }}</span>
              </div>
            </div>
            <div class="files-list-preview">
              <div class="custom-file-load" v-for="(item, index) in gisInfo.fileList" :key="index">
                <img class="custom-image-preview" fit="fill" :src="item.content" v-if="item.content" />
                <div v-text="item.fileName" v-else></div>
              </div>
            </div>
          </van-collapse-item>
          <template #left>
            <van-button square type="primary" text="删除" @click="removeItem(gisInfo)" />
          </template>
          <template #right>
            <van-button square type="danger" text="编辑" @click="routeToEdit(gisInfo.id)" />
            <van-button square type="primary" text="上传" @click="submit(gisInfo.id)" />
          </template>
        </van-swipe-cell>
      </van-collapse>
    </van-tab>
  </van-tabs>
</template>
<script>
import { Toast } from "vant";
import { getFileSuffix } from "@/util/utils.js";
import { deepCopy } from "@/geovis/util";
export default {
  name: "InfoCollectionList",
  props: ["filter"],
  data() {
    return {
      activeTab: "submited", // submited,unSubmited
      gisInfos: null,
      submitedInfos: [],
      unSubmitedInfos: [],
      unfoldUnSubInfos: [],
      unfoldSubInfos: [],
    };
  },
  beforeMount() {
    this.gisInfos = this.$store.state.gisInfos.gisInfos;
    this.init(this.gisInfos);
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
  watch: {
    gisInfos: {
      deep: true,
      immediate: false,
      handler(newValue, oldValue) {
        this.init(newValue);
      },
    },
  },
  methods: {
    init(newValue) {
      this.submitedInfos = [];
      this.unSubmitedInfos = [];
      newValue.forEach((gisInfo) => {
        gisInfo.status ? this.submitedInfos.push(gisInfo) : this.unSubmitedInfos.push(gisInfo);
      });
    },
    async removeItem(item) {
      const id = item.id;
      (await this.$store.dispatch("gisInfos/remove", id)) && Toast("删除成功");
    },
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    routeToEdit(id) {
      this.$router.push({ name: "EditInfoCollectionShow", params: { id } });
    },
    async submit(id) {
      const result = await this.$store.dispatch("gisInfos/edit", {
        id: id,
        status:true
      });
      result && Toast("上传成功");
    },
  },
};
</script>
<style lang="scss" scoped>
.stared {
  color: red;
  margin: 0 15px;
  font-size: 20px;
}
.detail {
}
.label {
  margin: 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.value {
  color: #969799;
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
  width: 30%;
  height: 80px;
  margin: 0 1.6% 0 0;
  min-width: 80px;
  min-height: 80px;
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
    
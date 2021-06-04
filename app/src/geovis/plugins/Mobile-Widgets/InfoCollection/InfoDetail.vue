<template>
  <div class="info-container">
    <div class="info-title">主题</div>
    <div class="info-field">
      {{ gisInfo.title }}
    </div>
    <div class="info-title">描述</div>
    <div class="info-field">
      {{ gisInfo.describe }}
    </div>
    <div class="info-title">文件</div>
    <div class="files-list-preview">
      <div class="custom-file-load" v-for="(item, index) in gisInfo.fileList" :key="index">
        <img class="custom-image-preview" fit="fill" :src="item.content" v-if="item.content" />
        <div class="file-preview" v-else>
          {{ item.fileName }}
        </div>
      </div>
    </div>
    <div class="info-title">位置</div>
    <van-cell v-model="gisInfo.position.lngLat" :title="gisInfo.position.locationName" icon="location-o" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "InfoDetail",
  props: ["id"],
  data() {
    return {
      gisInfo: null,
    };
  },
  async beforeMount() {
    const originGisInfo = this.$store.getters["gisInfos/getById"](this.id);
    this.gisInfo = originGisInfo;
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
  },
});
</script>
<style lang="scss" scoped>
.info-container {
  background-color: $navbar-background;
  padding: 5px 10px;
  font-size: 15px;
  height: calc(100% - 46px);
}

.info-title {
  width: 90%;
  padding: 0 5px;
  font-size: 12px;
  margin: 8px 0;
  color: rgb(153, 147, 147);
}
.info-field {
  font-size: 15px;
  color: white;
  height: 32px;
  line-height: 32px;
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

.file-preview {
  font-size: 12px;
}
.custom-image-preview {
  width: 100%;
  height: 100%;
}
</style>

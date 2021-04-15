<template>
  <div class="full">
    <van-nav-bar title="反馈问题" class="feedtitle" left-text="返回" left-arrow @click-left="goBack" />
    <div class="feedback-container">
      <div class="feedback-title">问题和意见</div>
      <van-field v-model="content" class="feedback-field" type="textarea" placeholder="请填写十字以上的反馈或建议" rows="3" autosize show-word-limit />
      <div class="feedback-title">图片(选填,提供截图)</div>
      <van-uploader v-model="fileList" :after-read="afterRead" multiple :max-count="4" />
      <div class="feedback-title">联系电话</div>
      <van-field v-model="tel" type="tel" class="feedback-field feedback-input" placeholder="选填,方便我们与你联系"></van-field>
      <div class="center">
        <van-button type="info" class="feedback-submit" plain hairline @click="submit"> 提交 </van-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Feedback",
  data() {
    return {
      content: "",
      tel: "",
      fileList: [
        {
          url: "https://img01.yzcdn.cn/vant/leaf.jpg",
          status: "uploading",
          message: "上传中...",
        },
        {
          url: "https://img01.yzcdn.cn/vant/tree.jpg",
          status: "failed",
          message: "上传失败",
        },
        {
          url: "https://img01.yzcdn.cn/vant/tree.jpg",
          status: "done",
          message: "上传成功",
        },
      ],
    };
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";

      setTimeout(() => {
        file.status = "failed";
        file.message = "上传失败";
      }, 1000);
    },
    submit() {},
  },
});
</script>
<style scoped>
.feedback-container {
  background-color: #928d8d21;
  padding: 5px 5px;
  font-size: 14px;
  height: calc(100% - 46px);
}
.feedtitle {
  background-color: #928d8d21;
}
.feedback-title {
  width: 90%;
  padding: 0 5px;
  font-size: 12px;
  margin: 8px 0;
  color: rgb(153, 147, 147);
}
.feedback-field {
  font-size: 13px;
}
.feedback-input {
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
.feedback-submit {
  width: 80px;
  height: 32px;
  text-align: center;
}
</style>

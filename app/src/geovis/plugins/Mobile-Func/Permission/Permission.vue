<template>
  <div></div>
</template>
<script lang="ts">
import requestPermissions from "./Permission.js";
import Vue from "vue";
export default Vue.extend({
  name: "RequestPermissions",
  data() {
    return {};
  },
  mounted() {
    debugger;
    requestPermissions
      .then(function(status) {
        navigator.mediaDevices
          .getUserMedia({
            //这里这几配置
          })
          .then(function(msg) {
            //这里就可以做你想做的事了
          })
          .catch(function(err) {
            /* 处理error */
            console.log(err);
          });
      })
      .catch(function() {
        //获取权限失败！！！
        alert("permission request fail");
      });
  },
  methods: {}
});
</script>
<style scoped></style>

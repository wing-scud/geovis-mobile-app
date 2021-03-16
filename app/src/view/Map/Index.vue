<template>
  <div class="home">
    <keep-alive><Map :listFunc="listFilter" @changeComponent="change"/></keep-alive>
    <component :is="component" @changeComponent="change"></component>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Index",
  data() {
    return {
      active: 0,
      listFunc: [
        { name: "消息", icon: "icon-xiaoxi " },
        { name: "图层", icon: "icon-tuceng " },
        { name: "锁定", icon: "icon-suoding " },
        { name: "导航", icon: "icon-luxian " }
      ],
      list: [
        { name: "地图", icon: "icon-ditu" },
        { name: "默认", icon: "icon-daohangmoren" },
        { name: "个人", icon: "icon-geren" }
      ],
      component: "MapIndex"
    };
  },
  methods: {
    handleChange() {
      const path = ["map", "default", "personal"];
      const routePath = "/" + path[this.active];
      this.$router.push(routePath);
    },
    change($event, value) {
      this.component = value;
    }
  },
  computed: {
    listFilter() {
      //@ts-ignore
      let value = this.listFunc;
      if (this.component === "Route") {
        value = [{ name: "锁定", icon: "icon-suoding " }];
      }
      return value;
    }
  }
});
</script>
<style src="../../assets/iconfont/iconfont.css"></style>
<style src="../../assets/Globe.css"></style>

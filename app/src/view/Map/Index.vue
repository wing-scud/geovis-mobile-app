<template>
  <div>
    <keep-alive><MapEntity :listFunc="listFilter"></MapEntity></keep-alive>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Map",
  data() {
    return {
      component: "",
      listFunc: [
        { name: "消息", icon: "icon-xiaoxi " },
        { name: "图层", icon: "icon-tuceng " },
        { name: "锁定", icon: "icon-suoding " },
        { name: "路线查询", icon: "icon-luxian " }
      ]
    };
  },
  methods: {},
  computed: {
    listFilter() {
      //@ts-ignorem n
      const value = this.listFunc;
      // if (this.component === "Route") {
      //   value = [{ name: "锁定", icon: "icon-suoding " }];
      // }
      return value;
    }
  }
});
</script>
<style scoped>
.top-widget {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
}
</style>

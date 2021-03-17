<template>
  <div>
    <div class="top-widget"><SearchInput @changeComponent="changeComponent" v-if="component!=='Route'"></SearchInput></div>
    <keep-alive><Map :listFunc="listFilter" @changeComponent="changeComponent"/></keep-alive>
    <component :is="component" @changeComponent="changeComponent"></component>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "",
  data() {
    return {
      component: "",
      listFunc: [
        { name: "消息", icon: "icon-xiaoxi " },
        { name: "图层", icon: "icon-tuceng " },
        { name: "锁定", icon: "icon-suoding " },
        { name: "导航", icon: "icon-luxian " }
      ]
    };
  },
  methods: {
    changeComponent(args) {
      if (args.routeChange) {
        this.$emit("changeRouteComponet", { component: args.component, tabbar: args.tabbar });
      } else {
        this.component = args.component;
      }
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
<style scoped>
.top-widget {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
}
</style>

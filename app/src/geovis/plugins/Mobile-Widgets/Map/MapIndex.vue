<template>
  <div>
    <div class="top-widget"><SearchInput></SearchInput></div>
    <Tabbar v-model="active" :list="list" @change="handleChange" :height="50"></Tabbar>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "",
  data() {
    return {
      active: 0,
      list: [
        { name: "地图", icon: "icon-ditu" },
        { name: "默认", icon: "icon-daohangmoren" },
        { name: "个人", icon: "icon-geren" }
      ]
    };
  },
  methods: {
    handleChange() {
      const path = ["map", "default", "personal"];
      const routePath = "/" + path[this.active];
      this.$router.push(routePath);
    },
    changeComponent(args) {
      this.$emit("changeComponet", args);
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

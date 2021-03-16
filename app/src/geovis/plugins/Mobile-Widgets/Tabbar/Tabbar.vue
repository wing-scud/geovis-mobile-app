<template>
  <van-tabbar v-model="active" class="bottom-tabbar" @change="handleChange" :fixed="true" active-color="#0372f1e0" :style="{ height: height+'px' }">
    <van-tabbar-item v-for="item in list" :key="item['name']">
      <span class="tabbar-name">{{ item["name"] }} </span>
      <template #icon>
        <div :class="[item['icon'], 'iconfont']"></div>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Tabbar",
  model: {
    prop: "active",
    event: "change"
  },
  props: {
    value: Number,
    list: {
      type: Array,
      default: function() {
        return [
          { name: "主页", icon: "icon-zhuye" },
          { name: "默认", icon: "icon-daohangmoren" },
          { name: "个人", icon: "icon-geren" }
        ];
      }
    },
    height: {
      type: Number,
      default: 80
    },
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    handleChange() {
      this.$emit("change", this.active);
    }
  }
});
</script>
<style scoped>
.bottom-tabbar {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
}
.tabbar-name {
  font-size: 13px;
}
.tabbar-name:hover {
  color: rgba(3, 114, 241, 0.877);
}
.tabbar-name:active {
  color: rgba(3, 114, 241, 0.877);
}
</style>

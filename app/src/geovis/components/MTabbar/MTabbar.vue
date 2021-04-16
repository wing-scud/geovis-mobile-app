<template>
  <van-tabbar v-model="activeItem" class="bottom-tabbar" @change="handleChange" :fixed="true" route active-color="#0372f1e0" :style="{ height: height + 'px' }" replace>
    <van-tabbar-item push :to="{ name: item.name }" v-for="item in list" :key="item['title']">
      <span class="tabbar-name">{{ item["title"] }} </span>
      <template #icon>
        <div :class="[item['icon'], 'iconfont']"></div>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "MTabbar",
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
          { title: "主页", icon: "icon-zhuye", name: "Home" },
          { title: "应用", icon: "icon-daohangmoren", name: "Application" },
          { title: "个人", icon: "icon-geren", name: "Person" }
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
    return {
      activeItem: 0,
      router: undefined
    };
  },
  mounted() {
    // const names = this.list.map(item => {
    //   return item.name;
    // });
    // this.activeItem = this.active;
    // this.$router.afterEach((to, from) => {
    //   if (names.includes(to.name)) {
    //     const index = names.indexOf(to.name);
    //     this.activeItem = index;
    //   }
    // });
  },
  methods: {
    handleChange() {
      this.$emit("change", this.activeItem);
    }
  }
});
</script>
<style scoped>
.bottom-tabbar {
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

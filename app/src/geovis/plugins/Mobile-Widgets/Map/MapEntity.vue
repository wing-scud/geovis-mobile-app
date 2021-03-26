<template>
  <div>
    <Earth></Earth>
    <template v-if="!state.onlyMap">
      <div class="map-plugin-right">
        <MIcon :icon="item.icon" customClass="icon-component" length="35px" :circle="true" v-for="item in pluginMapUnactivedRight" :key="item['id']" @click="handleClick(item['id'])"> </MIcon>
      </div>
      <div class="map-plugin-left">
        <MIcon :icon="item.icon" length="35px" customClass="icon-component" :circle="true" v-for="item in pluginMapUnactivedLeft" :key="item['id']" @click="handleClick(item['id'])"> </MIcon>
      </div>
      <template v-for="item in pluginState.pluginStateActived">
        <component :is="item.id" :key="item.id"></component>
      </template>
    </template>
  </div>
</template>
<script lang="ts">
// @ts-nocheck
/* eslint-disable */
import Vue from "vue";
import { earthStore } from "@/geovis/store";
export default Vue.extend({
  name: "MapEntity",
  props: ["listFunc"],
  data() {
    return {
      state: earthStore.state,
      pluginState: { pluginMapUnactived: [], pluginStateActived: [] },
    };
  },
  created() {},
  mounted() {},
  watch: {
    state: {
      deep: true,
      handler() {
        //由于pluginTree改变触发初始化fetch change，深度监听无法获取对象属性的添加,但是打印发现确实加入（因为对象引用）
        /**
         * watch在beforeCreate 和create之间建立observe，对属性执行 getter/setter，此时pluginMap还是空的
         * 同步-》子组件mounted earthStore.init ->pluginMap change ,因为是属性的添加，首先是不触发state深度监听改变，此处改变因为pluginTree的赋值
         *    改变后，按理只是获取值，不应该pluginMap下面{}，应该没有observer，但是实际却有
         *----尝试 子组件mouted时，给pluginMap添加属性a：{active：true},--结果无observe
         * 理解：pluginMap下的{}有observe因为pluginTree数据深度监听，添加数据后，会将数据自动添加Observer，让把这个数据的引用给了pluginMap
         *
         * 上面是对象，下面是数组
         * 对于数组来说，vue重写了数组的push、pop、shift、unshift、splice、sort、reverse方法，使得通过这些方法添加的数据具有observe（非基本数据类型）,并可以触发change
         * 而直接修改数组内的源数据，是无法具有observe，所以无法监听到改变 change
         * 此时使用Vue.set(obj||array,属性||index,value)，使其具有Observe （非基本数据类型）,并触发change
         * -----数据具有Observe没啥用，监听改数据改变，
         *
         */
        const pluginMapUnactived = [];
        const pluginStateActived = [];
        const pluginMap = this.state.pluginMap;
        Object.keys(pluginMap).forEach((key) => {
          if (pluginMap[key].enabled && pluginMap[key].parent === "map") {
            if (pluginMap[key].active && pluginMap[key].type === "component") {
              pluginStateActived.push(pluginMap[key]);
            }
            if(pluginMap[key].componenIcon){
              pluginMapUnactived.push(pluginMap[key]);
            }
          }
        });
        console.log("change");
        this.pluginState = { pluginMapUnactived, pluginStateActived };
      },
      immediate: true,
    },
  },
  computed: {
    pluginMapUnactivedLeft: function () {
      return this.pluginState.pluginMapUnactived.slice(0, 5);
    },
    pluginMapUnactivedRight: function () {
      if (this.pluginState.pluginMapUnactived.length >= 6) {
        return this.pluginState.pluginMapUnactived.slice(5, this.pluginState.pluginMapUnactived.length);
      } else {
        return [];
      }
    },
  },
  methods: {
    handleClick(id) {
      const pluginState = earthStore.getPuginState(id);
      if (pluginState.active) {
        if (pluginState.type === "route") {
          this.$router.back();
        }
        earthStore.togglePlugin(id, false);
      } else {
        if (pluginState.type === "route") {
          this.$router.push({ name: pluginState.id });
        }
        earthStore.togglePlugin(id, true);
      }
      console.log(pluginState.name, pluginState.active);
    },
  },
});
</script>
<style scoped>
.map-plugin-right {
  position: absolute;
  width: 40px;
  top: 150px;
  right: 5px;
  z-index: 2;
  display: flex;
  flex-direction: column;
}
.map-plugin-left {
  position: absolute;
  width: 40px;
  top: 150px;
  left: 5px;
  z-index: 2;
  display: flex;
  flex-direction: column;
}
.icon {
  width: 30px;
  height: 30px;
  background-color: white;
  margin: 10px 0;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
}
.top-widget {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
}
</style>

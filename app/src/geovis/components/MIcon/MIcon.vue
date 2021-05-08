<template>
  <div>
    <div :class="[icon, 'iconfont', 'icon-container', actived ? 'actived' : 'unactived', customClass]" :style="styleComputed" @click="handleClick" :name="name"></div>
    <span class="label" v-if="label !== ''" :style="{ color: labelColor }">{{ label }}</span>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "MIcon",
  props: {
    icon: {
      type: String,
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return value.split("-")[0] === "icon";
      },
    },
    customClass: {
      type: String,
      default: "",
    },
    backgroundColor: {
      type: String,
      default: "#0A1024",
    },
    size: {
      type: String,
      default: "25px",
    },
    length: {
      type: String,
      default: "30px",
    },
    circle: {
      type: Boolean,
      default: false,
    },
    actived: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "icon",
    },
    label: {
      type: String,
      default: "",
    },
    labelColor: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {};
  },
  computed: {
    styleComputed() {
      let borderRadius = "";
      if (this.circle) {
        borderRadius = "50%";
      }
      return { color:'white',fontSize: this.size, height: this.length, width: this.length, borderRadius: borderRadius, lineHeight: this.length, backgroundColor: this.backgroundColor };
    },
  },
  methods: {
    handleClick(key) {
      this.$emit("click");
    },
  },
});
</script>
<style scoped>
.icon-container {
  /* display: inline-block; */
  width: 30px;
  height: 30px;
  background-color: white;
  text-align: center;
  line-height: 30px;
  margin: 0 5px 0 5px;
}
.unactived {
  color: #333333;
}
.actived {
  color: #0372f1e0;
}
.label {
  width: 100%;
  text-align: center;
  font-size: 15px;
  display: inline-block;
}
</style>

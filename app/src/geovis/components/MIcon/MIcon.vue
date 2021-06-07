<template>
  <div :class="[customClass, 'container']">
    <div :class="[icon, 'iconfont', 'icon-container', actived ? 'actived' : 'unactived']" :style="styleComputed" @click="handleClick" :name="name"></div>
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
    color: {
      type: String,
      default: "white",
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
    return {
      iconColor: this.color,
    };
  },
  computed: {
    styleComputed() {
      let borderRadius = "";
      if (this.circle) {
        borderRadius = "50%";
      }
      //@ts-ignore
      const color = this.actived ? "#00a3f1" : this.iconColor;
      const lineHeight = this.length;
      return { lineHeight: lineHeight,fontSize: this.size, height: this.length, width: this.length, borderRadius: borderRadius, backgroundColor: this.backgroundColor, color: color };
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
  line-height: inherit;
  margin: 0 5px 0 5px;
}
.unactived {
  color: white;
}
.actived {
  color: #00a3f1;
}
.label {
  width: 100%;
  text-align: center;
  font-size: 15px;
  display: inline-block;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div :class="[icon, 'iconfont', 'icon-container', actived ? 'actied' : 'unactived']" :style="styleComputed" @click="handleClick" :name="name"></div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "MIcon",
  props: {
    icon: {
      type: String,
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return value.split("-")[0] === "icon";
      }
    },
    size: {
      type: String,
      default: "25px"
    },
    length: {
      type: String,
      default: "30px"
    },
    circle: {
      type: Boolean,
      default: false
    },
    actived: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: "icon"
    }
  },
  data() {
    return {};
  },
  computed: {
    styleComputed() {
      let borderRadius = "";
      if (this.circle) {
        borderRadius = Math.floor(Number(this.length) / 2) + "px";
      }
      return { fontSize: this.size, height: this.length, width: this.length, borderRadius: borderRadius, lineHeight: this.length };
    }
  },
  methods: {
    handleClick(key) {
      this.$emit("click");
    }
  }
});
</script>
<style scoped>
.icon-container {
  width: 30px;
  height: 30px;
  background-color: white;
  margin: 10px 0;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
}
.unactived {
  color: #333333;
}
.actived {
  color: #0372f1e0;
}
</style>

<template>
  <div
    class="gv-panel"
    ref="page"
    :style="{
      _top: `calc(50% - ${height / 2}px)`,
      _left: `calc(50% - ${width / 2}px)`,
      width: width + 'px',
      height: height + 'px'
    }"
  >
    <div class="gv-panel-bar" ref="bar">
      <div style="display: flex">
        <gv-icon :icon="icon" :hover="false" />
        <div class="gv-panel-title">{{ title }}</div>
      </div>

      <div class="gv-close-btn" @click="pageClose">
        <gv-icon icon="baseline-remove-px" />
        <gv-icon icon="baseline-close-px" />
      </div>
    </div>
    <el-divider class="gv-divider"></el-divider>
    <div class="gv-page-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { earthStore } from "../../store";
import GvIcon from "../Icon/index.vue";
let currentIndex = 2;
export default Vue.extend({
  name: "GvPanel",
  props: {
    icon: {
      type: String,
      default: () => "app"
    },
    title: {
      type: String,
      default: () => "插件面板"
    },
    width: {
      type: Number,
      default: () => 300
    },
    height: {
      type: Number,
      default: () => 400
    },
    id: {
      type: String,
      default: () => ""
    }
  },

  components: {
    GvIcon
  },
  data() {
    return {
      window: earthStore.state.window,
      _page: undefined,
      _bar: undefined,
      _down: false,
      _left: 0,
      _dx: 0,
      _dy: 0,
      _top: 0
    };
  },
  mounted() {
    this._page = this.$refs["page"];
    currentIndex++;
    this._page.style["z-index"] = currentIndex;
    this._bar = this.$refs["bar"];
    this._down = false;
    window.addEventListener("mouseup", this.mouseup);
    this._bar.addEventListener("mousedown", this.mousedown);
    window.addEventListener("mousemove", this.mousemove);
  },
  destroyed() {
    window.removeEventListener("mouseup", this.mouseup);
    this._bar.removeEventListener("mousedown", this.mousedown);
    window.removeEventListener("mousemove", this.mousemove);
  },
  methods: {
    pageClose() {
      earthStore.togglePlugin(this.id, false);
      // 防止外部没有处理close
      this.$emit("close");
    },
    mousedown(e) {
      currentIndex++;
      this._page.style["z-index"] = currentIndex;
      this._dx = e.clientX - this._page.offsetLeft;
      this._dy = e.clientY - this._page.offsetTop;
      this._down = true;
    },
    mouseup(e) {
      const a = 123;
      // if (this._left < 0) this._left = 0;
      // if (this._left > this.window.width - this._page.offsetWidth) {
      //   this._left = this.window.width - this._page.offsetWidth;
      // }

      // if (this._top < 0) this._top = 0;
      // if (this._top > this.window.height - this._page.offsetHeight)
      //   this._top = this.window.height - this._page.offsetHeight;
      this._page.style.left = this._left + "px";
      this._page.style.top = this._top + "px";
      this._down = false;
    },
    mousemove(e) {
      if (this._down) {
        this._left = e.clientX - this._dx;
        this._top = e.clientY - this._dy;
        this._page.style.left = this._left + "px";
        this._page.style.top = this._top + "px";
      }
    },
    handleClose() {
      this.$emit("close");
    }
  }
});
</script>

<style lang="scss" src="./style.scss" scoped></style>

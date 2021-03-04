<template>
  <div :class="['base-icon', hover ? 'hover' : '', active ? 'active' : '']" @click="click">
    <svg-icon v-if="type === 'svg'" :name="icon" :width="width" :height="height" />
    <img v-if="type === 'img'" :src="icon" :width="width" :height="height" />
    <svg v-if="type === 'iconfont'" class="iconfont" aria-hidden="true" :width="`${width}px`" :height="`${height}px`">
      <use :xlink:href="icon"></use>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

const httpReg = /http:\/\//;
const localReg = /\//;
const iconfontReg = /#icon-/;
@Component({
  name: "GvIcon"
})
export default class extends Vue {
  @Prop({ default: () => "" }) private icon!: string; //图标名称或路径
  @Prop({ default: () => 30 }) private width!: number;
  @Prop({ default: () => 30 }) private height!: number;
  @Prop({ default: () => true }) private hover!: boolean; //true时悬浮会变色
  @Prop({ default: () => false }) private active!: boolean; // 是否为激活状态

  get type() {
    if ((localReg.test(this.icon) || httpReg.test(this.icon)) && this.icon.search(".svg") < 0) {
      return "img";
    } else if (iconfontReg.test(this.icon)){
      return "iconfont"
    }else if(this.icon === "") {
      return "";
    } else {
      return "svg";
    }
  }

  private click() {
    this.$emit("click");
  }
}
</script>

<style src="./Icons.scss" lang="scss"></style>

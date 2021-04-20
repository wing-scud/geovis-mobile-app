<template>
  <div class="group-title">
    <van-popover v-model="popoverGroup" :actions="groups" placement="bottom" @select="chooseGroup">
      <template v-slot:reference>
        <van-icon :name="arrowDirection" class="custon-arrow-title" @click="displayPopover" />
      </template>
    </van-popover>
    {{ currentGroup }}
  </div>
</template>
<script lang="ts">
import { earthStore } from "@/geovis/store";
import Vue from "vue";
export default Vue.extend({
  name: "TaskGroup",
  data() {
    return { arrowDirection: "arrow", popoverGroup: false, groups: [], currentGroup: "小组一" };
  },
  mounted() {
    this.groups = [{ text: "小组一" }, { text: "小组二" }, { text: "小组三" }];
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    displayPopover() {
      this.popoverGroup = !this.popoverGroup;
      this.arrowDirection = this.popoverGroup ? "arrow-down" : "arrow";
    },
    handleChange() {},
    chooseGroup(action) {
      this.currentGroup = action.text;
      this.popoverGroup = !this.popoverGroup;
      this.arrowDirection = this.popoverGroup ? "arrow-down" : "arrow";
    },
  },
});
</script>
<style scoped>
.group-title {
  width: 100%;
  height: 32px;
  font-size: 16px;
  text-align: center;
  color: #000;
  background-color: white;
  z-index: 2;
  line-height: 32px;
}
.custon-arrow-title {
  font-size: 12px;
  margin-right:10px
}
</style>

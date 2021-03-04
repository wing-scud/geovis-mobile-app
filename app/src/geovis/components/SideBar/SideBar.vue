<template>
  <div>
    <transition name="fade">
      <div class="sidebar">
        <el-card class="box-card" style="color: white;border: 1px solid #414141">
          <div :key="mainNode.id" v-for="mainNode of list">
            <div class="tile">{{ mainNode.title }}</div>
            <ul style="padding:5px 0px 0px 0px">
              <li :key="item.id" v-for="item of mainNode.items" v-bind:class="{'side-item': true, active: item.enable}" @click="$emit('click', item)" :style="{ background: `url(${item.imgURL})` }">
                <span class="item-title">{{ item.title }}</span>
                <!-- <img class="item-img" :src="item.imgURL" /> -->
              </li>
            </ul>
          </div>
        </el-card>
      </div>
    </transition>
  </div>
</template>
<style src="./sliderBar.scss" lang="scss" ></style>
<script>
export default {
  //接收父组件传值
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: []
    };
  },
  methods: {
    handleClick() {
      this.$emit();
    }
  }
};
</script>

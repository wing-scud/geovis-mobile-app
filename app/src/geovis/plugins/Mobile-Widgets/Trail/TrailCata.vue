<template>
  <div class="full">
    <van-nav-bar title="轨迹列表" left-text="返回" left-arrow @click-left="goBack" />
    <van-collapse v-model="activedTrails">
      <van-swipe-cell :key="index" v-for="(trail, index) in trails">
        <van-collapse-item :title="trail.title" :name="trail.id">
          <div class="item-detail">
            标题:<span class="item-value"> {{ trail.title }}</span>
          </div>
          <div class="item-detail">
            描述:<span class="item-value"> {{ trail.describe }}</span>
          </div>
          <div class="item-detail">
            开始时间:<span class="item-value"> {{ formateDate(trail.startTime) }} 秒</span>
          </div>
          <div class="item-detail">
            时长:<span class="item-value"> {{ trail.trailTime }}</span>
          </div>
          <div class="item-detail">
            距离:<span class="item-value"> {{ trail.distance }}km</span>
          </div>
        </van-collapse-item>
        <template #right>
          <van-button square type="danger" text="删除" @click="remove(trail.id)" />
          <van-button square type="primary" text="详情" @click="lookDetail(trail.id)" />
        </template>
      </van-swipe-cell>
    </van-collapse>
  </div>
</template>
<script lang="ts">
import { formateDate } from "@/util/utils";
import { Toast } from "vant";
import Vue from "vue";
export default Vue.extend({
  name: "Index",
  data() {
    return {
      activedTrails: [],
      trails: undefined,
    };
  },
  mounted() {
    this.trails = this.$store.state.trails.trails;
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    async remove(id) {
      const result = await this.$store.dispatch("trails/remove", id);
      Toast(result.message);
    },
    formateDate(string) {
      return formateDate(new Date(string), "yyyy-MM-dd hh:mm:ss");
    },
    lookDetail(id) {
      this.$router.push({
        name: "TrailDetail",
        params: {
          id,
        },
      });
    },
  },
});
</script>
<style scoped>
.item-detail {
  font-size: 14px;
  color: gray;
}
.item-value {
  font-size: 14px;
  color: white;
}
</style>

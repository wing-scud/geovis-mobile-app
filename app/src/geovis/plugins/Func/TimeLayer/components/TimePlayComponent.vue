<!--
    名称：时间轴控件
    开发者：taoxq
    创建时间：2019/2/25
    修改时间: 2019/7/4
-->
<template>
  <div
    class="aimer-timeline-background"
    :style="{
      left: `${defaultLeft}px`,
      bottom: `${defaultBottom}px`,
      opacity: timelineReady ? 1 : 0
    }"
  >
    <div class="timeline-back-left">
      <div class="aimer-timeline" ref="timelineVis" @mousewheel="changeScroll()">
        <div class="timeline-current-time"></div>
      </div>
    </div>
    <div class="timeline-back-right">
      <div class="aimer-timeline-controller">
        <div :class="['timeline-controller', 'aimer-timeline-back']" @click="fastBackword()"></div>
        <div :class="['timeline-controller', 'aimer-timeline-play']" v-if="!status" @click="autoPlay()"></div>
        <div :class="['timeline-controller', 'aimer-timeline-pause']" v-if="status" @click="pause()"></div>
        <div :class="['timeline-controller', 'aimer-timeline-forword']" @click="fastForword()"></div>
        <div class="timeline-split-line"></div>
        <div :class="['timeline-text', 'timeline-text-year', scrollValue === 1 ? 'timeline-text-chosed' : '']" @click="changeSpeed(1)">X4</div>
        <div :class="['timeline-text', scrollValue === 2 ? 'timeline-text-chosed' : '']" @click="changeSpeed(2)">X8</div>
        <div :class="['timeline-text', scrollValue === 3 ? 'timeline-text-chosed' : '']" @click="changeSpeed(3)">X16</div>
      </div>
      <!-- <div class="timeline-close" @click="closeTimeline"></div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import vis from "vis";

export default {
  data() {
    return {
      timeline: undefined, // 定义的时间轴
      timelineReady: false, // 时间轴加载完毕
      scrollValue: 0, // 控制速度高亮显示的数值
      status: false, // 显示暂停或者播放的状态
      isPause: false, // 控制是否要停止播放
      duration: 1000, // 循环所用时间
      isforword: true, // 时间轴播放的方向
      newItems: undefined //定义一个新的items
    };
  },
  props: {
    defaultLeft: {
      type: Number,
      default: 0
    },
    defaultBottom: {
      type: Number,
      default: 0
    },
    timeplayItems: {
      type: Array,
      default: undefined
    },
    timeplayWindow: {
      type: Array,
      default: undefined
    },
    onTimePlay: {
      type: Function,
      default: e => {}
    },
    onTimePause: {
      type: Function,
      default: e => {}
    },
    onTimeForword: {
      type: Function,
      default: e => {}
    },
    onTimeBackword: {
      type: Function,
      default: e => {}
    },
    onTimeClose: {
      type: Function,
      default: e => {}
    },
    onTimeClick: {
      type: Function,
      default: e => {}
    }
  },
  computed: {
    ...mapGetters({
      // showTimeline:'showTimeline',
      // clock: 'clock'
    }),
    // 当前时间
    currentTime() {
      return new Date(this.timeWindow.start.getTime() + (this.timeWindow.end.getTime() - this.timeWindow.start.getTime()) / 2);
    },
    timeWindow() {
      return this.timeline.getWindow();
    },
    // 时间轴播放的step
    step() {
      if (this.isforword) return (this.timeWindow.end.getTime() - this.timeWindow.start.getTime()) / 100;
      else return -(this.timeWindow.end.getTime() - this.timeWindow.start.getTime()) / 100;
    }
  },
  watch: {
    duration: {
      handler: function() {
        if (this.duration == 1000) {
          this.scrollValue = 0;
        } else if (this.duration == 250) {
          this.scrollValue = 1;
        } else if (this.duration == 125) {
          this.scrollValue = 2;
        } else if (this.duration == 62.5) {
          this.scrollValue = 3;
        }
      },
      deep: true
    }
  },
  mounted() {
    const container = this.$refs.timelineVis;
    // console.log(this.$refs);
    this.newItems = this.timeplayItems;
    const items = new vis.DataSet(this.newItems);
    const options = {
      showCurrentTime: false
    };
    this.timeline = new vis.Timeline(container, items, options);
    // 窗口
    if (this.timeplayWindow && this.timeplayWindow[0] && this.timeplayWindow[1])
      this.timeline.setWindow(this.timeplayWindow[0], this.timeplayWindow[1], {}, () => {
        setTimeout(() => {
          this.timelineReady = true;
        }, 400);
      });
    this.timeline.on("click", e => {
      this.$emit("clickNode", e);
      // console.log(e.what, e.item);
      // if(e.what == 'item'){
      //     this.timeline.setSelection(e.item, {focus: true});
      //     this.$props.onTimeClick();
      // }
      // if (e.what == 'item') this.$store.commit('setClock',e.item)
    });
    const that = this;
    function sendTime(e) {
      // console.log(e)
      that.$emit("sendTime", e);
    }
    this.timeline.on("rangechange", sendTime);
    this.$once("hook:beforeDestroy", () => {
      this.timeline.off("rangechange", sendTime);
    });
  },
  methods: {
    closeTimeline() {
      this.$emit("close", true);
      this.$props.onTimeClose();
    },
    autoPlay() {
      this.duration = 1000;
      this.isforword = true;
      this.status = !this.status;
      this.isPasue = false;
      this.$props.onTimePlay();
      this.play();
    },
    pause() {
      this.status = !this.status;
      this.isPasue = true;
      this.$props.onTimePause();
    },
    play() {
      if (this.isPasue) return;
      this.timeWindow.start = new Date(this.timeWindow.start.getTime() + this.step);
      this.timeWindow.end = new Date(this.timeWindow.end.getTime() + this.step);
      // for(let i = 0; i < this.newItems.length; i++) {
      //     if(Math.abs(this.currentTime.getTime() - this.newItems[i].start) < this.step)
      //         console.log(this.currentTime, this.newItems[i])
      // }
      // console.log(this.currentTime)
      this.timeline.setWindow(
        this.timeWindow.start,
        this.timeWindow.end,
        {
          animation: {
            duration: this.duration,
            easingFunction: "linear"
          }
        },
        this.play
      );
    },
    // 切换时间轴播放的速度
    changeSpeed(temp) {
      this.scrollValue = temp;
      switch (temp) {
        case 1:
          this.duration = 250;
          if (!this.status) {
            this.status = true;
            this.isPasue = false;
            this.$props.onTimePlay();
            this.play();
          }
          break;
        case 2:
          this.duration = 125;
          if (!this.status) {
            this.status = true;
            this.isPasue = false;
            this.$props.onTimePlay();
            this.play();
          }
          break;
        case 3:
          this.duration = 62.5;
          if (!this.status) {
            this.status = true;
            this.isPasue = false;
            this.$props.onTimePlay();
            this.play();
          }
          break;
        default:
          break;
      }
    },
    changeScroll() {
      if (this.status) this.play();
      // console.log(this.scrollValue);
    },
    fastForword() {
      this.$props.onTimeForword();
      this.isforword = true;
      if (this.duration == 1000) {
        this.duration /= 4;
      } else if (this.duration > 62.5) {
        this.duration /= 2;
      }
      if (!this.status) {
        this.status = true;
        this.isPasue = false;
        this.play();
      }
    },
    fastBackword() {
      this.$props.onTimeBackword();
      console.log(this.step);
      if (this.step > 0) this.isforword = false;
      console.log(this.step);
      if (this.duration == 1000) {
        this.duration /= 4;
      } else if (this.duration > 62.5) {
        this.duration /= 2;
      }
      if (!this.status) {
        this.status = true;
        this.isPasue = false;
        this.play();
      }
    },
    removeTimeItem(index) {
      console.log(this.newItems);
      this.newItems = [];
      for (let i = 0; i < this.timeplayItems.length; i++) {
        if (this.timeplayItems[i].id !== index) {
          this.newItems.push(this.timeplayItems[i]);
        }
      }
      const items = new vis.DataSet(this.newItems);
      this.timeline.setItems(items);
    },
    renameTimeItem(index, name) {
      for (let i = 0; i < this.newItems.length; i++) {
        if (this.newItems[i].id == index) {
          this.$set(this.newItems, i, { id: index, content: name, start: this.newItems[i].start });
        }
      }
      console.log(this.newItems);
      const items = new vis.DataSet(this.newItems);
      this.timeline.setItems(items);
    },
    addTimeItem(item) {
      this.newItems.push(item);
      console.log(this.newItems);
      const items = new vis.DataSet(this.newItems);
      this.timeline.setItems(items);
    }
  }
};
</script>

<style scoped>
@import "../assets/css/timeline.css";
</style>

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
      bottom: `${defaultBottom}px`
    }"
  >
    <div class="timeline-back-left">
      <div class="aimer-timeline" ref="timelineVis">
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
      <div style="display:none" class="timeline-close" @click="closeTimeline"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import vis from "vis";
import { isRegExp } from "util";

export default {
  data() {
    return {
      timeline: undefined, // 定义的时间轴
      scrollValue: 0, // 控制速度高亮显示的数值
      status: false, // 显示暂停或者播放的状态
      isPause: false, // 控制是否要停止播放
      isforword: true, // 时间轴播放的方向
      eventStopTime: 3000, // 按事件播放时每个事件停留的时间
      nextIndex: 0, // 下一个需要播放事件的id
      timeTemp: undefined, // 定义一个变量存前进setTimeout 便于clearTimeout
      backTemp: undefined, // 存后退的setTimeout
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
    eventplayItems: {
      type: Array,
      default: undefined
    },
    eventWindow: {
      type: Array,
      default: undefined
    },
    // 播放方式
    mode: {
      type: String,
      default: "TIME"
    },
    // 播放至事件是否暂停
    eventplayPause: {
      type: Boolean,
      default: false
    },
    onEventPlay: {
      type: Function,
      default: e => {}
    },
    onEventPause: {
      type: Function,
      default: e => {}
    },
    onEventForword: {
      type: Function,
      default: e => {}
    },
    onEventBackword: {
      type: Function,
      default: e => {}
    },
    onEventClose: {
      type: Function,
      default: e => {}
    },
    onEventClick: {
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
    }
  },
  watch: {
    eventStopTime: {
      handler: function() {
        if (this.eventStopTime == 3000) {
          this.scrollValue = 0;
        } else if (this.eventStopTime == 2000) {
          this.scrollValue = 1;
        } else if (this.eventStopTime == 1000) {
          this.scrollValue = 2;
        } else if (this.eventStopTime == 600) {
          this.scrollValue = 3;
        }
      },
      deep: true
    }
  },
  mounted() {
    const container = this.$refs.timelineVis;
    this.newItems = this.eventplayItems;
    const items = new vis.DataSet(this.newItems);
    const options = {
      showCurrentTime: false
    };
    this.timeline = new vis.Timeline(container, items, options);
    // this.timeline.setWindow(new Date().getTime() - 1000 * 60 * 60 * 24 * 30 * 12, new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * 12); //这是原被注释的代码，但是 有效
    if (this.eventWindow && this.eventWindow[0] && this.eventWindow[1]) this.timeline.setWindow(this.eventWindow[0], this.eventWindow[1]);
    else this.timeline.setWindow(1243179390047, 1628354929411);
    this.timeline.on("click", e => {
      this.$emit("clickEvent", e.item);
      if (e.what == "item") {
        this.timeline.setSelection(e.item, { focus: true });
        this.$props.onEventClick();
      }
      // if (e.what == 'item') this.$store.commit('setClock',e.item)
    });
    this.timeline.on("mouseUp", e => {
      for (let i = 0; i < this.newItems.length; i++) {
        if (this.currentTime.getTime() + 1 == this.newItems[i].start) {
          this.nextIndex = i + 1;
        }
      }
      this.$emit("mouseUp", this.nextIndex);
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
      this.$props.onEventClose();
    },
    autoPlay() {
      this.status = true;
      // this.isPause = false;
      if (this.eventplayPause) {
        this.PlayWithPause();
      } else {
        this.eventPlay();
      }
      this.$props.onEventPlay();
    },
    // 暂停
    pause() {
      this.status = false;
      this.$props.onEventPause();
      if (this.timeTemp !== undefined) {
        clearTimeout(this.timeTemp);
        this.timeTemp = undefined;
      }
      if (this.backTemp !== undefined) {
        clearTimeout(this.backTemp);
        this.backTemp = undefined;
      }
      // this.isPause = true;
    },
    // 带事件暂停的时间轴播放
    PlayWithPause() {
      this.play();
      setTimeout(() => {
        this.status = false;
        this.$props.onEventPause();
      }, 300);
    },
    // 不带暂停的播放
    eventPlay() {
      this.play();
      // console.log(this.eventStopTime);
      this.timeTemp = setTimeout(() => {
        this.eventPlay();
      }, this.eventStopTime);
      if (!this.status) {
        clearTimeout(this.timeTemp);
        this.timeTemp = undefined;
      }
    },
    // 不带暂停的后退
    eventPlayBack() {
      this.playBack();
      this.backTemp = setTimeout(() => {
        this.eventPlayBack();
      }, this.eventStopTime);
      if (!this.status) {
        clearTimeout(this.backTemp);
        this.backTemp = undefined;
      }
    },
    // 单步播放
    play() {
      for (let i = 0; i < this.newItems.length; i++) {
        // console.log(this.currentTime.getTime()-this.newItems[i].start,'这是第'+i+'次循环当前时间减事件时间')
        // 这里当前时间的时间戳有时候有误差 误差值为1 暂时这样解决
        if (this.currentTime.getTime() + 1 < this.newItems[0].start) this.nextIndex = 0;
        if (this.currentTime.getTime() + 1 >= this.newItems[i].start) {
          this.nextIndex = i + 1;
        }
      }
      let nextId = 0;
      nextId = this.nextIndex >= this.newItems.length ? this.newItems[this.newItems.length - 1].id : this.newItems[this.nextIndex].id;
      if (this.nextIndex == this.newItems.length) {
        this.status = false;
        this.$props.onEventPause();
      }
      this.$emit("curNodeUpdate", nextId);
      this.timeline.setSelection(nextId, { focus: true });
    },
    // 单步后退
    playBack() {
      for (let i = this.newItems.length - 1; i >= 0; i--) {
        // console.log(this.currentTime.getTime()-this.newItems[i].start,'这是第'+i+'次循环当前时间减事件时间')
        if (this.currentTime.getTime() > this.newItems[this.newItems.length - 1].start) this.nextIndex = this.newItems.length - 1;
        if (this.currentTime.getTime() <= this.newItems[i].start) {
          this.nextIndex = i - 1;
        }
      }
      const nextId = this.nextIndex < 0 ? -1 : this.newItems[this.nextIndex].id;
      if (nextId > 0) {
        this.timeline.setSelection(nextId, { focus: true });
        this.status = true;
      } else {
        this.status = false;
        this.$props.onEventPause();
      }
    },
    // 切换时间轴播放的速度
    changeSpeed(temp) {
      this.scrollValue = temp;
      switch (temp) {
        case 1:
          this.eventStopTime = 2000;
          break;
        case 2:
          this.eventStopTime = 1000;
          break;
        case 3:
          this.eventStopTime = 600;
          break;
        default:
          break;
      }
    },
    fastForword() {
      if (!this.eventplayPause) {
        if (this.eventStopTime > 1000) this.eventStopTime -= 1000;
        else if (this.eventStopTime == 1000) this.eventStopTime = 600;
      }
      this.$props.onEventForword();
      if (!this.status) this.autoPlay();
    },
    fastBackword() {
      // if(!this.eventplayPause) {
      //     if(this.eventStopTime > 1000) this.eventStopTime -= 1000;
      //     else if(this.eventStopTime == 1000) this.eventStopTime = 600;
      // }
      this.$props.onEventBackword();
      if (this.eventplayPause) {
        this.$props.onEventPlay();
        this.playBack();
        setTimeout(() => {
          this.status = false;
          this.$props.onEventPause();
        }, 300);
      } else {
        this.$props.onEventPlay();
        this.eventPlayBack();
      }
    },
    removeEventItem(index) {
      this.newItems = [];
      for (let i = 0; i < this.eventplayItems.length; i++) {
        if (this.eventplayItems[i].id !== index) {
          this.newItems.push(this.eventplayItems[i]);
        }
      }
      const items = new vis.DataSet(this.newItems);
      this.timeline.setItems(items);
    },
    renameEventItem(index, name) {
      for (let i = 0; i < this.newItems.length; i++) {
        if (this.newItems[i].id == index) {
          this.$set(this.newItems, i, { id: index, content: name, start: this.newItems[i].start });
        }
      }
      const items = new vis.DataSet(this.newItems);
      this.timeline.setItems(items);
    },
    addEventItem(item) {
      this.newItems.push(item);
      const items = new vis.DataSet(this.newItems);
      this.timeline.setItems(items);
    },
    updateEventItem(array) {
      this.timeline.setItems(new vis.DataSet(array));
    }
  }
};
</script>

<style scoped>
@import "../assets/css/timeline.css";
@import "../assets/css/vis.css";
</style>

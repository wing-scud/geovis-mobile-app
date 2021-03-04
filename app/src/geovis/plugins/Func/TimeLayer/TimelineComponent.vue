<!--
    名称：时间轴控件
    开发者：taoxq
    创建时间：2019/2/25
    修改时间: 2019/7/4
-->
<template>
  <div>
    <v-eventplay
      ref="eventline"
      v-if="mode == 'EVENT' && show"
      :eventplayItems="timelineItems"
      :eventWindow="timelineWindow"
      :eventplayPause="eventPause"
      :onEventPlay="onPlay"
      :onEventPause="onPause"
      :onEventForword="onForword"
      :onEventBackword="onBackword"
      :onEventClose="onClose"
      :onEventClick="onClick"
      @close="closeTimeline"
      @sendTime="sendTime"
      @clickEvent="clickEvent"
      @curNodeUpdate="curNodeUpdate"
      @mouseUp="mouseUp"
    />
    <v-timeplay
      ref="timeline"
      v-if="mode == 'TIME' && show"
      :timeplayItems="timelineItems"
      :timeplayWindow="timelineWindow"
      :onTimePlay="onPlay"
      :onTimePause="onPause"
      :onTimeForword="onForword"
      :onTimeBackword="onBackword"
      :onTimeClose="onClose"
      :onTimeClick="onClick"
      @close="closeTimeline"
      @sendTime="sendTime"
    />
  </div>
</template>

<script>
import EventPlayComponent from "./components/EventPlayComponent";
import TimePlayComponent from "./components/TimePlayComponent";
export default {
  data() {
    return {
      show: true
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
    timelineItems: {
      type: Array,
      default: undefined
    },
    timelineWindow: {
      type: Array,
      default: undefined
    },
    // 播放方式
    mode: {
      type: String,
      default: "TIME"
    },
    // 播放至事件是否暂停
    eventPause: {
      type: Boolean,
      default: false
    },
    onPlay: {
      type: Function,
      default: e => {}
    },
    onPause: {
      type: Function,
      default: e => {}
    },
    onForword: {
      type: Function,
      default: e => {}
    },
    onBackword: {
      type: Function,
      default: e => {}
    },
    onClose: {
      type: Function,
      default: e => {}
    },
    onClick: {
      type: Function,
      default: e => {}
    }
  },
  components: {
    "v-eventplay": EventPlayComponent,
    "v-timeplay": TimePlayComponent
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    closeTimeline(temp) {
      this.show = false;
      this.$emit("close");
    },
    sendTime(e) {
      this.$emit("sendTime", e);
    },
    removeTimelineItem(index) {
      if (this.mode == "TIME") {
        this.$refs.timeline.removeTimeItem(index);
      } else {
        this.$refs.eventline.removeEventItem(index);
      }
    },
    renameTimelineItem(index, name) {
      if (this.mode == "TIME") {
        this.$refs.timeline.renameTimeItem(index, name);
      } else {
        this.$refs.eventline.renameEventItem(index, name);
      }
    },
    addTimelineItem(item) {
      if (this.mode == "TIME") {
        this.$refs.timeline.addTimeItem(item);
      } else {
        this.$refs.eventline.addEventItem(item);
      }
    },
    clickEvent(item) {
      this.$emit("clickEvent", item);
    },
    updateEventItems(array) {
      this.$refs.eventline.updateEventItem(array);
    },
    curNodeUpdate(nodeId) {
      this.$emit("curNodeUpdate", nodeId);
    },
    mouseUp(nodeId) {
      this.$emit("mouseUp", nodeId);
    }
  }
};
</script>

<style scoped></style>

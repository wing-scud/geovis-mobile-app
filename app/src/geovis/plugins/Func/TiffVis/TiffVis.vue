<template>
  <template-plugin :height="600" :pluginInfo="pluginInfo">
    <VisualTiff></VisualTiff>
  </template-plugin>
</template>

<script>
import Vue from "vue";
import TemplatePlugin from "../../TemplatePlugin.vue";
import VisualTiff from "./VisualTiff_fontDraw.vue";
// import VisualTiff from "./VisualTiff.vue";
export default {
  name: "TiffVis",
  props: ["pluginInfo"],
  components: {
    "template-plugin": TemplatePlugin,
    VisualTiff
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

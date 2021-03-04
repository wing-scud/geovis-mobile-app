<template>
  <div id="FirstPersonView">
    <KeyboradTool />
    <PickTool />
    <CameraViewer />
  </div>
</template>

<script>
import KeyboradTool from "./KeyboradTool";
import CameraViewer from "./CameraViewerComponent";
import PickTool from "./PickTool";
export default {
  name: "CustomWidgets",
  components: {
    KeyboradTool,
    PickTool,
    CameraViewer
  },
  data() {
    return {};
  },
  mounted(){
    console.log(1111)
  },
  methods: {}
};
</script>

<style></style>

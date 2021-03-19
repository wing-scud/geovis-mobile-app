<template>
  <div></div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapLocation } from "./Location";
import { earthStore } from "@/geovis/store";
export default Vue.extend({
  name: "Location",
  data() {
    return {
      state: earthStore.state
    };
  },
  mounted() {
    //@ts-ignore
    // const;
  },
  methods: {},
  watch: {
    "state.mode": function(value) {
      //@ts-ignore
      if (mapLocation.locking) {
        mapLocation.locking = !mapLocation.locking;
        //@ts-ignore
        document.getElementsByClassName("icon-suoding")[0].style.color = location.locking ? "#0c87f1" : "#333";
      }
    }
  }
});
</script>
<style scoped></style>

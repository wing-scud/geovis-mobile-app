<template>
  <div></div>
</template>
<script lang="ts">
import { earthStore } from "@/geovis/store";
import Vue from "vue";
import store from "./store";
export default Vue.extend({
  name: "StateShare",
  data() {
    return {
      _share: null,
    };
  },
  mounted() {
    this._share = store;
    store.init();
  },
  destroyed() {
    this._share.destroy();
  },
  methods: {
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
  },
});
</script>
<style scoped></style>

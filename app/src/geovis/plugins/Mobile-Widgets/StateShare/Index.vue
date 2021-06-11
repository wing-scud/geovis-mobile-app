<template>
  <div>
    
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import StateShare from "./store";
export default Vue.extend({
  name: "StateShare",
  data() {
    return {
      _share: null,
    };
  },
  mounted() {
    this._share = new StateShare();
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

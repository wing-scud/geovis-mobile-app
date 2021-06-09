<template>
  <div class="full">
    <TrailCata> </TrailCata>
  </div>
</template>
  <script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "",
  data() {
    return {};
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
  
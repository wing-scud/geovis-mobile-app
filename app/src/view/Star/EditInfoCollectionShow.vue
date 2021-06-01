<template>
  <div class="full">
    <EditInfoCollection></EditInfoCollection>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "EditInfoCollectionShow",
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

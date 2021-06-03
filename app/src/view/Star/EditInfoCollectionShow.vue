<template>
  <div class="full">
    <EditInfoCollection :id=id></EditInfoCollection>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "EditInfoCollectionShow",
  data() {
    return {
      id:""
    };
  },
  beforeMount(){
    this.id = this.$route.params.id;
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

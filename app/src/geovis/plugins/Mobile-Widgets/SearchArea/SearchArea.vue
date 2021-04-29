<template>
  <div>
    <div class="search">
      <SearchInput v-model="inputValue" leftIcon="search" :route="false" @checked="checkedConvert" @choosed="choosedAddress"></SearchInput>
    </div>
    <BriefAddress v-if="showAddressDetail"  leftIcon="search" :address="addressDetail"> </BriefAddress>
  </div>
</template>
<script>
import { earthStore } from "@/geovis/store";
import SearchInput from "./SearchInput.vue";
import util from "./util";
export default {
  name: "SearchArea",
  components: {
    SearchInput,
  },
  data() {
    return {
      inputValue: "",
      showAddressDetail: false,
      addressDetail: "",
      convertCoor: false,
    };
  },
  destroyed() {
    util.clear();
  },
  mounted() {
    //从路线收藏点击过来
    if (this.$route.params && (this.$route.params.name || this.$route.params.location)) {
      const params = this.$route.params;
      this.inputValue = params.name;
    }
  },
  methods: {
    choosedAddress(address) {
      this.showAddressDetail = true;
      this.addressDetail = address;
    },
    checkedConvert(bool) {
      this.convertCoor = bool;
    },
  },
  watch: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only 如果用element不能加scoped-->
<style scoped lang="scss">
.search {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

</style>


<template>
  <div class="mine-page">
    <div class="person-nav">
      <van-nav-bar title="我的" right-text="消息" @click-right="enterMessage">
        <template v-slot:right>
          <van-badge :content="5" max="10">
            <MIcon icon="icon-xiaoxi" size="20px" length="20px"></MIcon>
          </van-badge>
        </template>
      </van-nav-bar>
    </div>
    <div class="user-infor" @click="enterPersonInfor">
      <van-image width="40" height="40" :src="profilePhoto" class="custom-user-img" round fill="fill" />
      <div class="user-name">
        {{ nickname }}
      </div>
      <van-icon name="arrow" class="custom-arrow" />
    </div>
    <div class="person-items">
      <van-cell :title="item.title" is-link v-for="item in items" :key="item.title" @click="enterItem(item.name)">
        <template v-slot:icon>
          <div class="custom-item-icon">
            <MIcon :icon="item.icon" length="15px" size="15px"> </MIcon>
          </div>
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { indexItems } from "./store";
export default Vue.extend({
  name: "Index",
  data() {
    return {
      items: indexItems,
      profilePhoto: "",
      nickname: "",
    };
  },
  async mounted() {
    const user = this.$store.state.user.user;
    this.nickname = user.nickname;
    this.profilePhoto = await this.getLocalImage(user.profilePhoto);
  },
  methods: {
    enterMessage() {},
    goBack() {
      //@ts-ignore
      this.$router.backward(-1);
    },
    enterItem(name) {
      this.$router.push({ name: name });
    },
    enterPersonInfor() {
      this.$router.push({ name: "PersonInfor" });
    },
    async getLocalImage(path) {
      const filePlugin = window["plugin"].file;
      const file = await filePlugin.readFile(path, true);
      return await filePlugin.readBlob(file, file.type);
    },
  },
});
</script>
<style scoped lang="scss">
.mine-page {
  background: $navbar-background;
}
.user-infor {
  display: inline-flex;
  width: calc(100% - 30px);
  padding: 10px 10px 10px 20px;
  /* border-top: 1px solid #ebedf0; */
  border-bottom: $split-line;
}
.user-name {
  flex-grow: 1;
  padding-left: 20px;
  line-height: 40px;
  text-align: left;
  color: white;
}
.custom-arrow {
  width: 30px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.custom-item-icon {
  display: flex;
  width:25px;
  align-items: center;
}
</style>
<style lang="scss">
.mine-page {
  .van-cell {
    padding: 15px 16px !important;
  }
}
</style>

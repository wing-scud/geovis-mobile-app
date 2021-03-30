<template>
  <div class="ipAddress">
    <div class="title" v-if="label !== ''">
      {{ label }}
    </div>
    <ul class="ipAdress-input">
      <li v-for="(item, index) in ipAddress" :key="index">
        <input type="text" @input="checkIpVal(item, index)" @keyup="turnIpPOS(item, index, $event)" v-model="item.value" ref="ipInput" />
        <div></div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "IpInput",
  model: {
    prop: "ipAddress",
    event: "input"
  },
  props: {
    value: Array,
    label: {
      type: String,
      default: ""
    },
    ipAddress: {
      type: Array,
      default: function() {
        return [
          {
            value: ""
          },
          {
            value: ""
          },
          {
            value: ""
          },
          {
            value: ""
          }
        ];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    checkIpVal(item, index) {
      //输入时事件
      // let self = this;
      //确保每个值都处于0-255
      const self = this;
      let val = item.value;
      //当输入的是空格时，值赋为空
      val = val.trim();
      val = parseInt(val, 10);
      if (isNaN(val)) {
        val = "";
      } else {
        val = val < 0 ? "" : val;
        val = val > 255 ? 255 : val;
      }
      item.value = val;
      console.log(val);
      if (val > 99 && index < this.ipAddress.length - 1) {
        //判断内容是否可以跳框
        self.$refs.ipInput[index + 1].focus();
      }
      if (val == "" && index != 0) {
        self.$refs.ipInput[index - 1].focus();
      }
      this.$emit("input", this.ipAddress);
    },
    turnIpPOS(item, index, event) {
      const self = this;
      const e = event || window.event;
      //左箭头向左跳转，左一不做任何措施
      if (e.keyCode == 37) {
        if (index == 0) {
          1 == 1;
        } else {
          console.log(index);

          self.$refs.ipInput[index - 1].focus();
        }
      }
      //右箭头、回车键、空格键、冒号均向右跳转，右一不做任何措施
      if (e.keyCode == 39 || e.keyCode == 13 || e.keyCode == 32 || e.keyCode == 190) {
        if (index == 3) {
          1 == 1;
        } else {
          console.log(index);
          self.$refs.ipInput[index + 1].focus();
        }
      }
    }
  }
});
</script>
<style scoped>
.ipAddress {
  width: calc(100% - 15px);
  padding: 5px 5px 5px 10px;
  display: flex;
  flex-direction: row;
}
.ipAdress-input {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #9fa3a7d1;
  width: 90%;
  margin-left: 10px;
}
.ipAdress-input li {
  position: relative;
  height: 23px;
  margin: 0;
}
ul[class="ipAdress-input"] input[type="text"] {
  border: none;
  width: 100%;
  height: 23px;
  text-align: center;
  background: transparent;
  color: black;
}
.ipAdress-input li div {
  position: absolute;
  bottom: 2px;
  right: 0;
  border-radius: 50%;
  background: #0190fe;
  width: 2px;
  height: 2px;
}
/*只需要3个div*/
.ipAdress-input li:last-child div {
  display: none;
}
/*取消掉默认的input focus状态*/
.ipAdress-input input:focus {
  outline: none;
}
.title {
  width: 80px;
  text-align: center;
  line-height: 30px;
}
</style>

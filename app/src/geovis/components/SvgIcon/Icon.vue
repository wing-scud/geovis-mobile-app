<template>
  <svg version="1.1" :class="clazz" :role="label ? 'img' : 'presentation'" :aria-label="label" :viewBox="box" :style="style">
    <path :key="i" :d="path.d" :stroke="path.stroke" v-for="(path, i) in icon.paths" />
  </svg>
</template>

<style>
.svg-icon {
  display: inline-block;
  fill: currentColor;
}

.svg-icon.flip-horizontal {
  transform: scale(-1, 1);
}

.svg-icon.flip-vertical {
  transform: scale(1, -1);
}

.svg-icon.spin {
  animation: fa-spin 1s 0s infinite linear;
}

@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script>
/* eslint-disable*/
const convert = require("./lib/parse");
var parseString = require("xml2js").parseString;
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: false
    },
    scale: [Number, String],
    spin: Boolean,
    flip: {
      validator: function(val) {
        return val === "horizontal" || val === "vertical";
      }
    },
    label: String,
    index: String,
    currentIndex: String
  },
  data() {
    return {
      xml: ""
    };
  },
  async mounted() {
    if (this.name.search(".svg") > 0) {
      const str = await fetch(this.name).then(res => res.text());

      parseString(str, {}, (err, result) => {
        if (!err) {
          this.xml = result;
        }
      });
    }
  },
  computed: {
    normalizedScale() {
      let scale = this.scale;
      scale = typeof scale === "undefined" ? 1 : Number(scale);
      if (isNaN(scale) || scale <= 0) {
        console.warn(
          `Invalid prop: prop "scale" should be a number over 0.`,
          this
        );
        return 1;
      }
      return scale;
    },
    clazz() {
      return {
        "svg-icon": true,
        spin: this.spin,
        "flip-horizontal": this.flip === "horizontal",
        "flip-vertical": this.flip === "vertical",
        active: this.index === this.currentIndex
      };
    },
    icon() {
      let xml;
      // debugger
      if (this.name.search(".svg") < 0) {
        xml = require(`!xml-loader!@/svg/${this.name}.svg`);
      } else {
        xml = this.xml;
      }
      if (xml === "") return {width:10,height:10,paths:[]};
      const t = xml.svg.$.viewBox.split(" ");
      return {
        width: parseInt(t[2]),
        height: parseInt(t[3]),
        paths: convert.SVGtoArray(xml.svg)
      };
    },
    box() {
      return `0 0 ${this.icon.width} ${this.icon.height}`;
    },
    width() {
      debugger
      return (this.icon.width / 112) * this.normalizedScale;
    },
    height() {
      return (this.icon.height / 112) * this.normalizedScale;
    },
    style() {
      if (this.normalizedScale === 1) {
        return false;
      }
      return {
        fontSize: this.normalizedScale + "em"
      };
    }
  },
  register: function() {
    console.warn(
      "inject deprecated since v1.2.0, SVG files can be loaded directly, so just delete the inject line."
    );
  }
};
</script>

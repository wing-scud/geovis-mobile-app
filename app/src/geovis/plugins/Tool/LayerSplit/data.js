export const layerData = {
  adjustData: [
    {
      name: "透明度：",
      value: 1.0,
      nickname: "alpha",
      show: true,
      index: 1
    },
    {
      name: "伽马值：",
      value: 1.0,
      nickname: "gamma",
      show: false,
      index: 2
    },
    {
      name: "亮度：",
      value: 1.0,
      nickname: "brightness",
      show: false,
      index: 3
    },
    {
      name: "对比度：",
      value: 1.0,
      nickname: "contrast",
      show: false,
      index: 4
    },
    {
      name: "灰度：",
      value: 1.0,
      nickname: "hue",
      show: false,
      index: 5
    },
    {
      name: "饱和度：",
      value: 1.0,
      nickname: "saturation",
      show: false,
      index: 6
    }
  ],
  maps: [
    {
      name: "纯黑底图",
      id: "black",
      enable: false,
      address: "http://192.168.13.32/tiles/dark/{z}/{x}/{y}.png",
      splitDirection: GeoVis.ImagerySplitDirection.NONE
    },
    {
      name: "谷歌底图",
      id: "google",
      enable: false,
      address: "http://192.168.13.32/tiles/googlemap/{z}/{x}/{y}.png",
      splitDirection: GeoVis.ImagerySplitDirection.NONE
    },
    {
      name: "深色地图",
      id: "depcolor",
      enable: false,
      address: "http://192.168.13.32/tiles/geoq/{z}/{x}/{y}.png",
      splitDirection: GeoVis.ImagerySplitDirection.NONE
    }
  ],
  images: [
    {
      name: "alpha",
      src: "images/images/adjust/alpha.png"
    },
    {
      name: "gamma",
      src: "images/images/adjust/gamma.png"
    },
    {
      name: "brightness",
      src: "images/images/adjust/brightness.png"
    },
    {
      name: "contrast",
      src: "images/images/adjust/contrast.png"
    },
    {
      name: "hue",
      src: "images/images/adjust/hue.png"
    },
    {
      name: "saturation",
      src: "images/images/adjust/saturation.png"
    }
  ]
};

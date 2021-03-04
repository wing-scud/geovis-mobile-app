export const stages = [
  {
    icon: "images/images/effects/fanguang.svg", //使用public路径，二部使用相对路径，防止将src解析为字符串而不是地址
    title: "泛光",
    type: "bloom",
    enabled: false,
    values: [
      {
        type: "bool",
        range: [1, 20],
        value: false,
        name: "仅发光",
        key: "glowOnly"
      },
      {
        type: "number",
        range: [-255, 255],
        value: 128,
        name: "对比度",
        key: "contrast"
      },
      {
        type: "number",
        range: [-1, 1],
        value: -0.3,
        step: 0.1,
        name: "亮度",
        key: "brightness"
      },
      {
        type: "number",
        range: [1, 5],
        value: 1,
        step:0.1,
        name: "delta",
        key: "delta"
      },
      {
        type: "number",
        range: [1, 5],
        value: 2,
        step:0.1,
        name: "sigma",
        key: "sigma"
      },
      {
        type: "number",
        range: [1, 20],
        value: 1,
        name: "步长",
        key: "stepSize"
      }
    ],
    index: 1
  },
  {
    icon: "images/images/effects/yinying.svg",
    title: "阴影",
    type: "shadow",
    enabled: false,
    values: [],
    index: 2
  },
  {
    icon: "images/images/effects/heibai.svg",
    title: "黑白",
    type: "blackAndWhite",
    enabled: false,
    values: [
      {
        type: "number",
        range: [1, 20],
        value: 15,
        name: "坡度",
        key: "gradations"
      }
    ],
    index: 3
  },
  {
    icon: "images/images/effects/yeshi.svg",
    title: "夜视",
    type: "nightVision",
    enabled: false,
    values: [],
    index: 4
  },
  {
    icon: "images/images/effects/jiajian.svg",
    title: "亮度",
    type: "bright",
    enabled: false,
    values: [
      {
        type: "number",
        range: [0, 5],
        value: 1,
        step:0.1,
        name: "亮度",
        key: "brightness"
      }
    ],
    index: 5
  },
  {
    icon: "images/images/effects/jingtouyaoban.svg",
    title: "镜头耀斑",
    type: "lensFlare",
    enabled: false,
    index: 6,
    values: [
      {
        type: "number",
        range: [1, 10],
        value: 2.0,
        name: "强度",
        key: "intensity"
      },
      {
        type: "number",
        range: [1, 100],
        value: 10.0,
        name: "失真度",
        key: "distortion"
      },
      {
        type: "number",
        range: [0, 1],
        value: 0.4,
        step: 0.1,
        name: "离散度",
        key: "dispersion"
      },
      {
        type: "number",
        range: [0, 1],
        value: 0.4,
        step: 0.1,
        name: "光晕宽度",
        key: "haloWidth"
      },
      {
        type: "number",
        range: [0, 1],
        value: 0.4,
        step: 0.1,
        name: "污垢量",
        key: "dirtAmount"
      }
    ]
  },
  {
    icon: "images/images/effects/masaike.svg",
    title: "马赛克",
    type: "blur",
    enabled: false,
    values: [
      {
        type: "number",
        range: [0, 5],
        value: 1,
        step:0.1,
        name: "delta",
        key: "delta"
      },
      {
        type: "number",
        range: [0, 5],
        value: 2,
        step:0.1,
        name: "sigma",
        key: "sigma"
      },
      {
        type: "number",
        range: [0, 5],
        value: 1,
        step:0.1,
        name: "步长",
        key: "stepSize"
      }
    ],
    index: 7
  },
  {
    icon: "images/images/effects/light.svg",
    title: "强制光照",
    type: "light",
    enabled: false,
    values: [],
    index: 8
  },
  {
    icon: "images/images/effects/zhebi.svg",
    title: "环境遮蔽",
    type: "ambientOcclusion",
    enabled: false,
    values: [
      {
        type: "number",
        range: [1, 10],
        value: 5,
        name: "强度",
        key: "intensity"
      },
      {
        type: "number",
        range: [1, 10],
        value: 5,
        name: "贝叶斯",
        key: "bias"
      },
      {
        type: "number",
        range: [1, 10],
        value: 5,
        name: "长度尺寸",
        key: "lengthCap"
      },
      {
        type: "number",
        range: [1, 10],
        value: 5,
        name: "步长",
        key: "stepSize"
      },
      {
        type: "bool",
        range: [1, 10],
        value: false,
        name: "仅环境光遮挡",
        key: "ambientOcclusionOnly"
      }
    ],
    index: 9
  },
  {
    icon: "images/images/effects/lunkuo.svg",
    title: "轮廓",
    type: "silhouette",
    enabled: false,
    values: [
      {
        type: "number",
        range: [1, 20],
        value: 2,
        name: "长度",
        key: "length"
      },
      // {
      //   type: "object",
      //   range: [1, 20],
      //   value: GeoVis.Color.RED,
      //   name: "色彩",
      //   key: "color"
      // }
    ],
    index: 10
  },
  {
    icon: "images/images/effects/jingshen.svg",
    title: "景深",
    type: "depthOfField",
    enabled: false,
    values: [
      {
        type: "number",
        range: [1, 20],
        value: 15,
        name: "焦距",
        key: "focalDistance"
      },
      {
        type: "number",
        range: [1, 5],
        value: 1,
        step:0.1,
        name: "delta",
        key: "delta"
      },
      {
        type: "number",
        range: [1, 5],
        value: 2,
        step:0.1,
        name: "sigma",
        key: "sigma"
      },
      {
        type: "number",
        range: [1, 20],
        value: 15,
        name: "步长",
        key: "stepSize"
      }
    ],
    index: 11
  },
  {
    slider:true
  },
  {
    icon: "images/images/effects/sun.svg",
    title: "太阳",
    type: "sun",
    enabled: true,
    values: [],
    index: 12
  },
  {
    icon: "images/images/effects/moon.svg",
    title: "月亮",
    type: "moon",
    enabled: true,
    values: [],
    index: 13
  },
  {
    icon: "images/images/effects/star.svg",
    title: "星空",
    type: "skyBox",
    enabled: true,
    values: [],
    index: 14
  },
  {
    icon: "images/images/effects/atmosphere.svg",
    title: "大气",
    type: "skyAtmosphere",
    enabled: true,
    values: [],
    index: 15
  },{
    icon: "images/images/effects/rain.svg",
    title: "下雨",
    type: "rain",
    enabled: false,
    values: [
      {
        type: "number",
        range: [30, 100],
        value: 60,
        name: "速度",
        key: "speed"
      }
    ],
    index: 16
  },{
    icon: "images/images/effects/snow.svg",
    title: "下雪",
    type: "snow",
    enabled: false,
    values: [
      {
        type: "number",
        range: [10, 80],
        value: 60,
        name: "速度",
        key: "speed"
      }
    ],
    index: 17
  },{
    icon: "images/images/effects/fog.svg",
    title: "雾",
    type: "fog",
    enabled: false,
    values: [],
    index: 18
  },{
    icon: "images/images/effects/fullfog.svg",
    title: "全屏雾",
    type: "fullfog",
    enabled: false,
    values: [
      {
        type: "number",
        range: [1, 10],
        value: 1.5,
        step:0.1,
        name: "浓度",
        key: "potency"
      }
    ],
    index: 19
  }
];

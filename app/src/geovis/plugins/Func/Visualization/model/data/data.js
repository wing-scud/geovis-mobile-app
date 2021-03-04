export const visualData = [
  {
    title: "热力图",
    src: "./images/visual/heat.png" ,//保存在public下
    enabled:false,
    component:"HeatMap",
    index:1,
    aimPos:[
      {
        title: "lon",
        show: false,
        value: "",
        index:11,
      },
      {
        title: "lat",
        show: false,
        value: "",
        index:12,
      },
    ],
    values: [
      {
        type: "color",
        value:"rgb(1,0,255)",
        name: "填充",
        key: "gradient",
        board:false,
        index:1,
      },
      {
        type: "number",
        range: [1, 100],
        value: 13.0,
        name: "像素值",
        key: "size",
        index:2,
      }
    ]
  },
  {
    title: "多边形",
    src: "./images/visual/polygon.png",
    enabled:false,
    component:"MultiPolygon",
    index:2,
    aimPos:[
      {
        title: "_geo",
        show: false,
        value: "",
        index:0,
      },
      {
        title: "lat",
        show: false,
        value: "",
        index:1,
      },
    ],
    values: [
      {
        type: "color",
        value: "green",
        name: "填充",
        key: "fillcolor",
        board:false
      },
      {
        type: "color",
        value: "red",
        name: "线条颜色",
        key: "outlinecolor",
        board:false
      },
      {
        type: "number",
        range: [1, 10],
        value: 2.0,
        name: "路径长度",
        key: "outlineWidth"
      }
    ]
  },
  {
    title: "网格图",
    src: "./images/visual/grid.png",
    enabled:false,
    component:"GridMap",
    index:3,
  },
  {
    title: "蜂窝图",
    src: "./images/visual/beehive.png",
    enabled:false,
    component:"GridMap",
    index:4,
  },
  {
    title: "散点图",
    src: "./images/visual/scatter.png",
    enabled:false,
    component:"GridMap",
    index:5,
  },
  {
    title: "聚合图",
    src: "./images/visual/aggregate.png",
    enabled:false,
    component:"GridMap",
    index:6,
  },
  {
    title: "飞线",
    src: "./images/visual/flyline.png",
    enabled:false,
    component:"GridMap",
    index:7,
  }
];
export const formatData = [
  {
    title: "geo",
    value: "_geojson"
  },
  {
    title: "string",
    value: "string1"
  },
  {
    title: "string",
    value: "string2"
  },
  {
    title: "string",
    value: "string3"
  },
  {
    title: "string",
    value: "string4"
  }
];

export const databaseContent=[
  {
    title:"飞线，散点图集",
    type:"json",
    date:"2020.12.08"
  },{
    title:"飞线，散点图集",
    type:"json",
    date:"2020.12.08"
  },{
    title:"飞线，散点图集",
    type:"json",
    date:"2020.12.08"
  },{
    title:"飞线，散点图集",
    type:"json",
    date:"2020.12.08"
  },{
    title:"飞线，散点图集",
    type:"json",
    date:"2020.12.08"
  },{
    title:"飞线，散点图集",
    type:"json",
    date:"2020.12.08"
  }
]

 

 
 

 
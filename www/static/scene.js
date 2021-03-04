const SERVER_ROOT = "http://localhost:8900";
const TILESERVER_ROOT = "http://localhost:8082";
const GEOSERVER_ROOT = "http://localhost:8088";
const MODELSERVER_ROOT = "http://localhost:4000";
const mountainModel = "http://192.168.13.32/3dtile/mountain/Production_1/Scene/Production_1.json"; //"http://localhost:3030/proxy/" + encodeURIComponent(`http://bj.geovisweb.cn:10080/data/3dtile/mountain/Production_1/Scene`) + "/Production_1.json";
const yuxiModel = "http://localhost:8900/static/tiles/3dtiles/xinping/Production_1.json"; //"http://bj.geovisweb.cn:10080/data/3dtile/guizhou/Production_1.json";
const tokyoModel = "http://localhost:8900/static/tiles/3dtiles/东京_机场/315260534350.json";
// 新山王 新山王美军中心 新潟分屯基地 亚特兰大海军航空站  知念自卫队

const modelList0 = [
  [
    "1-巴黎铁塔",
    {
      lonlat: [2.3022673406154346, 48.86064906530961, 548.0386294348987],
      rotation: {
        heading: 246.51312610661654,
        pitch: -37.32452396809135,
        roll: 359.78020631348295
      }
    }
  ],
  [
    "1-梵蒂冈-圣彼得教堂",
    {
      lonlat: [12.460126356325556, 41.9024521249644, 246.52029966619278],
      rotation: {
        heading: 266.56489311199766,
        pitch: -25.40563192503456,
        roll: 359.78869722898355
      }
    }
  ],
  [
    "1-罗马斗兽场",
    {
      lonlat: [12.491269640527118, 41.88582158028027, 450.13336771661886],
      rotation: {
        heading: 5.597489042573304,
        pitch: -33.71341971427434,
        roll: 0.0224719837792244
      }
    }
  ],
  [
    "1-威尼斯",
    {
      lonlat: [12.31449169739654, 45.44411914661877, 546.2538757768042],
      rotation: {
        heading: 140.59390048096174,
        pitch: -33.43836690779278,
        roll: 0.14612204847340904
      }
    }
  ],[
    "1-优胜美地",
    {
      lonlat: [-119.59295523964744, 37.70001496399112, 4437.711797419868],
      rotation: {
        heading: 333.4241058070865,
        pitch: -30.55032125350337,
        roll: 359.9031984776719
      }
    }
  ]
];

const googleModelNode0 = {
  id: "google-model",
  parentId: 0,
  name: "世界景点",
  open: false,
  children: modelList0.map(([name, viewport]) => {
    return {
      id: name,
      parentId: "base-layer",
      name: name.split("-")[1],
      checked: false,
      data: {
        type: "googleTileModel",
        maximumScreenSpaceError: 1,
        maximumNumberOfLoadedTiles: 1000,
        url: `E:\\GeoVisDATA\\googleModel\\` + name,
        // maximumScale: 20000,
        viewport: {
          duration: 0,
          ...viewport
        }
        // 可选参数， bounding
      }
    };
  })
};

// const modelList1 = [
//   ["2-佐世保", {}],
//   ["埃弗雷特海军基地", {}],
//   ["滨松基地", {}],
//   ["春日基地", {}],
//   ["府中基地", {}],
//   ["富士兵营", {}],
//   ["富士山", {}],
//   ["高藏寺分屯基地", {}],
//   ["高良台分屯基地", {}],
//   ["高尾山分屯基地", {}],
//   ["亨特陆军机场", {}],
//   ["横田", {}],
//   ["横须贺", {}],
//   ["厚木", {}],
//   ["金瑟营", {}],
//   ["匡塞特角海军航空站", {}],
//   ["劳森陆军机场", {}],
//   ["刘易斯-麦科德联合基地", {}],
//   ["芦屋基地", {}],
//   ["洛克岛军火库", {}],
//   ["麦科德空军基地", {}],
//   ["立川分屯基地", {}],
//   ["珍珠港", {}],
//   ["美保基地", {}],
//   ["美国陆军本宁堡", {}],
//   ["美国陆军麦克弗森堡", {}],
//   ["木更津基地", {}],
//   ["目黑基地", {}],
//   ["牧港补给地区", {}],
//   ["那霸基地", {}],
//   ["奈良基地", {}],
//   ["岐阜基地", {}],
//   ["千岁基地（札幌市东区）", {}],
//   ["入间基地", {}],
//   ["十条基地", {}],
//   ["市谷基地", {}],
//   ["韦斯托弗空军储备基地", {}],
//   ["武山分屯基地", {}],
//   ["习志野分屯基地", {}],
//   ["小牧基地", {}],
//   ["驻日_佐世保", {}],
//   ["知念分屯基地", {}]
// ];
const modelList1 = [
  [
    "2-佐世保",
    {
      lonlat: [129.70837373888776, 33.15416040726391, 600.7737686030093],
      rotation: {
        heading: 18.06326589561718,
        pitch: -25.24965657213494,
        roll: 0.06041331014980592
      }
    }
  ],
  [
    "2-埃弗雷特",
    {
      lonlat: [-122.21202070112797, 47.97978477406255, 856.7432087334681],
      rotation: {
        heading: 321.37902263191467,
        pitch: -25.769246945857216,
        roll: 359.8671398123741
      }
    }
  ],
  [
    "2-滨松基地",
    {
      lonlat: [137.70324963500988, 34.7630658089332, 1195.7548827454098],
      rotation: {
        heading: 197.6819530878474,
        pitch: -34.216705498460534,
        roll: 359.93399786091686
      }
    }
  ],
  [
    "2-春日",
    {
      lonlat: [137.70324963500988, 34.7630658089332, 1195.7548827454098],
      rotation: {
        heading: 197.6819530878474,
        pitch: -34.216705498460534,
        roll: 359.93399786091686
      }
    }
  ],
  [
    "2-府中",
    {
      lonlat: [139.49583663571042, 35.66471116850333, 319.2617792859614],
      rotation: {
        heading: 259.1938051275609,
        pitch: -30.605103907105015,
        roll: 359.7922511020955
      }
    }
  ],
  [
    "2-富士兵营",
    {
      lonlat: [138.8730115530802, 35.51373705739419, 6185.985367964786],
      rotation: {
        heading: 192.53556084880597,
        pitch: -26.39901636153789,
        roll: 359.95602412247564
      }
    }
  ],
  [
    "2-富士山",
    {
      lonlat: [138.91462448541554, 35.336570909799526, 3403.551227570076],
      rotation: {
        heading: 274.19847837323863,
        pitch: -4.012895064411387,
        roll: 359.81866424502425
      }
    }
  ],
  [
    "2-美保基地",
    {
      lonlat: [133.23245057362172, 35.51761813626199, 1134.64987404386],
      rotation: {
        heading: 178.12005651770187,
        pitch: -30.62589715603668,
        roll: 0.006917371491277421
      }
    }
  ],
  [
    "2-陆军本宁堡",
    {
      lonlat: [-84.9696890245501, 32.35324575322196, 570.9676518283796],
      rotation: {
        heading: 336.6836411521757,
        pitch: -24.27706225589448,
        roll: 359.9244726873346
      }
    }
  ],
  [
    "2-美国麦克弗森",
    {
      lonlat: [-84.42269045353835, 33.686824321227384, 715.9888878078318],
      rotation: {
        heading: 357.15597114168884,
        pitch: -27.185812237475016,
        roll: 359.9900903337018
      }
    }
  ],
  [
    "2-目港",
    {
      lonlat: [127.7043960846224, 26.283955321853615, 2181.1766251700983],
      rotation: {
        heading: 174.864079365483,
        pitch: -38.78191505011449,
        roll: 0.017473979562911225
      }
    }
  ],
  [
    "2-那霸",
    {
      lonlat: [127.60858362158116, 26.191976569551866, 2974.2230167304997],
      rotation: {
        heading: 81.62109906112208,
        pitch: -40.787075700973304,
        roll: 0.19878656124166783
      }
    }
  ],
  [
    "2-奈良",
    {
      lonlat: [135.79917019040627, 34.69995809512719, 879.6024108422617],
      rotation: {
        heading: 77.91633853220752,
        pitch: -46.248183658188125,
        roll: 0.25456608677069525
      }
    }
  ],
  [
    "2-岐埠",
    {
      lonlat: [136.8537517232741, 35.422799309311, 2614.5124272408184],
      rotation: {
        heading: 148.69927115719787,
        pitch: -33.55351596302866,
        roll: 0.11298986656194963
      }
    }
  ],
  [
    "2-入间",
    {
      lonlat: [139.42337196716048, 35.86252682303147, 1690.1642588537936],
      rotation: {
        heading: 205.2415163443384,
        pitch: -31.25718989251875,
        roll: 359.9091068944119
      }
    }
  ],
  [
    "2-市谷",
    {
      lonlat: [139.73453635449582, 35.70302649380359, 631.4644679182812],
      rotation: {
        heading: 193.0717833600311,
        pitch: -26.41440127483113,
        roll: 359.95406289454417
      }
    }
  ],
  [
    "2-武山分",
    {
      lonlat: [139.64013630779613, 35.20566819812207, 923.4144871244007],
      rotation: {
        heading: 295.43657929757967,
        pitch: -29.697079808323785,
        roll: 359.8115981609251
      }
    }
  ],
  [
    "2-习志野",
    {
      lonlat: [140.0593472177966, 35.707224194726834, 462.0638658318292],
      rotation: {
        heading: 268.2119179557711,
        pitch: -30.643848247240243,
        roll: 359.78834997817285
      }
    }
  ],
  [
    "2-小牧",
    {
      lonlat: [136.90361579193586, 35.24132810725487, 1548.3896839571821],
      rotation: {
        heading: 46.95106455895136,
        pitch: -31.317924670730303,
        roll: 0.15517248666830882
      }
    }
  ]
];

const googleModelNode1 = {
  id: "google-model",
  parentId: 0,
  name: "军事基地",
  open: false,
  children: modelList1.map(([name, viewport]) => {
    return {
      id: name,
      parentId: "base-layer",
      name: name,
      checked: false,
      data: {
        type: "googleTileModel",
        maximumScreenSpaceError: 1,
        maximumNumberOfLoadedTiles: 1000,
        url: `E:\\GeoVisDATA\\googleModel\\` + name,
        // maximumScale: 20000,
        viewport: {
          duration: 0,
          ...viewport
        }
        // 可选参数， bounding
      }
    };
  })
};

window.sceneData = {
  SERVER_ROOT,
  TILESERVER_ROOT,
  GEOSERVER_ROOT,
  MODELSERVER_ROOT,
  plotServer: "localhost",
  tree: [
    {
      id: "base-layer",
      parentId: 0,
      name: "基础底图",
      halfCheck: true,
      open: true,
      children: [
        {
          id: "img",
          parentId: "base-layer",
          name: "全球基础影像",
          checked: true,
          data: {
            type: "raster",
            projection: "EPSG:900913",
            imgURL: "./data/LayerManager/img.jpg",
            // layerURL: "http://192.168.13.32/tiles/googleimg/{z}/{x}/{y}.png",
            layerURL: `${SERVER_ROOT}/raster/global-img/global/{z}/{x}/{y}.png`,
            content: ""
            // 可选参数， bounding
          }
        },
        {
          id: "map",
          parentId: "base-layer",
          name: "全球电子地图",
          data: {
            type: "raster",
            projection: "EPSG:900913",
            imgURL: "./data/LayerManager/img.jpg",
            layerURL: "http://localhost:8900/raster/global-map/global/{z}/{x}/{y}.png",
            content: ""
            // 可选参数， bounding
          }
        },
        {
          id: "worldborder",
          parentId: "base-layer",
          name: "全球矢量疆界",
          data: {
            type: "raster",
            projection: "EPSG:900913",
            imgURL: "./data/LayerManager/img.jpg",
            layerURL: SERVER_ROOT + "/WorldBorder/global/{z}/{x}/{y}.png",
            content: ""
            // 可选参数， bounding
          }
        },
        {
          id: "demColor",
          parentId: "base-layer",
          name: "全球地形图",
          data: {
            type: "raster",
            layerType: "wms",
            projection: "EPSG:4326",
            layerURL: `${SERVER_ROOT}/proxy/${GEOSERVER_ROOT}/geoserver/gwc/service/wms`,
            layers: "GlobalTerrain:pyramid32"
            // 可选参数， bounding
          }
        },
        {
          id: "placenames",
          parentId: "base-layer",
          name: "全球地名",
          data: {
            type: "raster",
            projection: "EPSG:900913",
            imgURL: "./data/LayerManager/img.jpg",
            layerURL: SERVER_ROOT + "/placenames/global/{z}/{x}/{y}.png",
            content: ""
            // 可选参数， bounding
          }
        }
      ]
    },
    {
      id: "terrain-layer",
      parentId: 0,
      name: "地形图层",
      open: true,
      children: [
        {
          id: "global-Terrain-4x",
          parentId: "terrain-layer",
          name: "全球海陆融合地形(2倍)",
          checked: false,
          data: {
            type: "terrain",
            layer: "EPSG:4326",
            layerType: "geoserver",
            url: `${SERVER_ROOT}/proxy/${GEOSERVER_ROOT}/geoserver/wms`,
            layerName: "GlobalTerrain:pyramid32",
            maxLevel: 11,
            service: "WMS",
            scale: 1,
            landScale: 1,
            oceanScale: 2,
            waterMask: false,
            // url:"http://192.168.13.32/tiles/dem",
            proxy: {
              getURL: function(url) {
                return `${SERVER_ROOT}/proxy/` + url;
              }
            },
            viewport: {
              duration: 1,
              lonlat: [120.80933410028786, 22.718454183781926, 23222.537542096994],
              rotation: {
                heading: 11.550680442462061,
                pitch: -20.31262025715577,
                roll: 359.9965593909715
              }
            }
            // 可选参数， bounding
          }
        },        {
          id: "global-Terrain-8x",
          parentId: "terrain-layer",
          name: "全球海陆融合地形(8倍)",
          checked: false,
          data: {
            type: "terrain",
            layer: "EPSG:4326",
            layerType: "geoserver",
            url: `${SERVER_ROOT}/proxy/${GEOSERVER_ROOT}/geoserver/wms`,
            layerName: "GlobalTerrain:pyramid32",
            maxLevel: 11,
            service: "WMS",
            scale: 1,
            landScale: 4,
            oceanScale: 8,
            waterMask: false,
            // url:"http://192.168.13.32/tiles/dem",
            proxy: {
              getURL: function(url) {
                return `${SERVER_ROOT}/proxy/` + url;
              }
            },
            viewport: {
              duration: 1,
              lonlat: [120.80933410028786, 22.718454183781926, 23222.537542096994],
              rotation: {
                heading: 11.550680442462061,
                pitch: -20.31262025715577,
                roll: 359.9965593909715
              }
            }
            // 可选参数， bounding
          }
        },
        {
          id: "tw-Terrain",
          parentId: "terrain-layer",
          name: "台湾地形",
          checked: false,
          data: {
            type: "terrain",
            layer: "EPSG:4326",
            url: SERVER_ROOT + "/static/tiles/twdem",
            // url:"http://192.168.13.32/tiles/dem",
            viewport: {
              duration: 1,
              lonlat: [120.80933410028786, 22.718454183781926, 23222.537542096994],
              rotation: {
                heading: 11.550680442462061,
                pitch: -20.31262025715577,
                roll: 359.9965593909715
              }
            }
            // 可选参数， bounding
          }
        },
        {
          id: "us-Terrain",
          parentId: "terrain-layer",
          name: "美国大峡谷",
          checked: false,
          data: {
            type: "terrain",
            layer: "EPSG:4326",
            url: SERVER_ROOT + "/static/tiles/usdem",
            // url:"http://192.168.13.32/tiles/dem",
            viewport: {
              duration: 1,
              lonlat: [-112.12187531662659, 36.0957247180844, 1893.3707038937239],
              rotation: {
                heading: 84.7096621393883,
                pitch: -14.082829764486805,
                roll: 0.18789622831188332
              }
            }

            // 可选参数， bounding
          }
        }
      ]
    },
    {
      id: "vector-layer",
      parentId: 0,
      name: "电子地图",
      open: false,
      children: [
        {
          id: "map0",
          parentId: "base-layer",
          name: "全球电子地图",
          data: {
            type: "raster",
            projection: "EPSG:900913",
            imgURL: "./data/LayerManager/img.jpg",
            layerURL: `${SERVER_ROOT}/proxy/${TILESERVER_ROOT}/styles/map/{z}/{x}/{y}.png`,
            title: "电子地图-全球基础地图",
            content: ""
            // 可选参数， bounding
          }
        },
        {
          id: "map1",
          parentId: "base-layer",
          name: "全球矢量疆界",
          data: {
            type: "raster",
            projection: "EPSG:900913",
            imgURL: "./data/LayerManager/img.jpg",
            layerURL: `${SERVER_ROOT}/proxy/${TILESERVER_ROOT}/styles/placename/{z}/{x}/{y}.png`,
            title: "电子地图-全球矢量疆界",
            content: ""
            // 可选参数， bounding
          }
        },
        {
          id: "map2",
          parentId: "base-layer",
          name: "自定义样式-纯白",
          data: {
            type: "raster",
            projection: "EPSG:900913",
            imgURL: "./data/LayerManager/img.jpg",
            layerURL: `${SERVER_ROOT}/proxy/${TILESERVER_ROOT}/styles/Positron/{z}/{x}/{y}.png`,
            title: "电子地图-全球矢量疆界",
            content: ""
            // 可选参数， bounding
          }
        },
        {
          id: "map3",
          parentId: "base-layer",
          name: "自定义样式-纯黑",
          data: {
            type: "raster",
            projection: "EPSG:900913",
            imgURL: "./data/LayerManager/img.jpg",
            layerURL: `${SERVER_ROOT}/proxy/${TILESERVER_ROOT}/styles/DarkMatter/{z}/{x}/{y}.png`,
            title: "电子地图-全球矢量疆界",
            content: ""
            // 可选参数， bounding
          }
        },
        {
          id: "map4",
          parentId: "base-layer",
          name: "自定义样式-蓝黑",
          data: {
            type: "raster",
            projection: "EPSG:900913",
            imgURL: "./data/LayerManager/img.jpg",
            layerURL: `${SERVER_ROOT}/proxy/${TILESERVER_ROOT}/styles/FiordColor/{z}/{x}/{y}.png`,
            title: "电子地图-全球矢量疆界",
            content: ""
            // 可选参数， bounding
          }
        },
        {
          id: "map5",
          parentId: "base-layer",
          name: "自定义样式-3D",
          data: {
            type: "raster",
            projection: "EPSG:900913",
            imgURL: "./data/LayerManager/img.jpg",
            layerURL: `${SERVER_ROOT}/proxy/${TILESERVER_ROOT}/styles/Klokantech3D/{z}/{x}/{y}.png`,
            title: "电子地图-全球矢量疆界",
            content: ""
            // 可选参数， bounding
          }
        }
      ]
    },
    {
      id: "3dtile",
      parentId: 0,
      name: "倾斜摄影",
      open: true,
      children: [
        {
          id: "mountain",
          parentId: "base-layer",
          name: "云南山区",
          checked: false,
          data: {
            type: "tileModel",
            maximumScreenSpaceError: 1,
            maximumNumberOfLoadedTiles: 1000,
            url: mountainModel,
            // maximumScale: 20000,
            viewport: {
              duration: 1,
              lonlat: [101.8466357548503, 22.494015692147393, 1472.6993471572703],
              rotation: {
                heading: 30.966931531843663,
                pitch: -28.660138616215253,
                roll: 0.0796549298203025
              }
            }
            // 可选参数， bounding
          }
        },
        {
          id: "tokyo",
          parentId: "base-layer",
          name: "东京机场",
          checked: false,
          data: {
            type: "tileModel",
            maximumScreenSpaceError: 1,
            maximumNumberOfLoadedTiles: 1000,
            url: tokyoModel,
            // maximumScale: 20000,
            viewport: {
              lonlat: [139.79688212715797, 35.72476959744816, 990.4271519792212],
              rotation: {
                heading: 311.87033936336894,
                pitch: -36.123368281467414,
                roll: 359.831750852498
              }
            }
            // 可选参数， bounding
          }
        },
        {
          id: "yuxi",
          parentId: "base-layer",
          name: "云南玉溪",
          checked: false,
          data: {
            type: "tileModel",
            maximumScreenSpaceError: 1,
            maximumNumberOfLoadedTiles: 1000,
            offset: [0, 0, -1500],
            url: yuxiModel,
            // maximumScale: 20000,
            viewport: {
              duration: 1,
              lonlat: [101.99028336012132, 24.070626685873968, 167.8819023610694],
              rotation: {
                heading: 2.4890007132664733,
                pitch: -35.089463154143004,
                roll: 0.007602569081670833
              }
            }
            // 可选参数， bounding
          }
        }
      ]
    },
    googleModelNode0,
    googleModelNode1,
    {
      id: "gltf",
      parentId: 0,
      name: "三维模型",
      open: false,
      children: [
        {
          id: "F-35",
          parentId: "base-layer",
          name: "龙江号",
          checked: false,
          data: {
            type: "model",
            lonlat: [123.38, 30.9, 1],
            url: "./static/data/model/Longjiang.glb",
            scale: 1,
            minimumPixelSize: 120,
            // maximumScale: 20000,
            bounding: {
              sphere: 15,
              offset: {
                heading: -45,
                pitch: -30,
                range: 35
              },
              duration: 1
            }
            // 可选参数， bounding
          }
        },
        {
          id: "map-35",
          parentId: "base-layer",
          name: "A320",
          checked: false,
          data: {
            type: "model",
            url: "./static/data/model/A320.glb",
            lonlat: [121.34, 31.09, 1e4],
            scale: 1,
            minimumPixelSize: 120,
            maximumScale: 20000,
            bounding: {
              sphere: 60,
              offset: {
                heading: -90,
                pitch: -30,
                range: 50
              },
              duration: 1
            }
            // 可选参数， bounding
          }
        },
        {
          id: "batch-1000",
          parentId: "base-layer",
          name: "批量模型(1000)",
          checked: false,
          data: {
            type: "batchModel",
            batchSize: 1000,
            url: "./static/data/model/A320.glb",
            lonlat: [121.34, 31.09, 1e4],
            scale: 1,
            minimumPixelSize: 120,
            maximumScale: 20000,
            viewport: {
              lonlat: [121.29425700087926, 30.494786282908564, 57078.02717177223],
              rotation: {
                heading: 334.1321251597247,
                pitch: -39.08583674207474,
                roll: 0.0016654425638976793
              }
            }
            // 可选参数， bounding
          }
        }
      ]
    },
    {
      id: "map-layer",
      parentId: 0,
      name: "历史影像",
      open: false,
      children: [
        {
          id: "yq2000",
          parentId: "base-layer",
          name: "苏州工业园区2000年影像",
          checked: false,
          data: {
            type: "raster",
            projection: "EPSG:4326",
            imgURL: "./data/LayerManager/img.jpg",
            offsetZ: 1,
            layerURL: SERVER_ROOT + "/yq2000/global/{z}/{x}/{y}.png",
            content: "",
            viewport: {
              lonlat: [120.77762016359763, 31.28946357615492, 12300.338542266036],
              rotation: {
                heading: 359.99999999999886,
                pitch: -89.887222851971,
                roll: 0
              }
            }

            // 可选参数， bounding
          }
        },
        {
          id: "map-900913",
          parentId: "base-layer",
          name: "苏州工业园区2019年影像",
          checked: false,
          data: {
            type: "raster",
            projection: "EPSG:4326",
            offsetZ: 1,
            imgURL: "./data/LayerManager/img.jpg",
            layerURL: SERVER_ROOT + "/yq2018/global/{z}/{x}/{y}.png",
            content: "",
            viewport: {
              lonlat: [120.77762016359763, 31.28946357615492, 12300.338542266036],
              rotation: {
                heading: 359.99999999999886,
                pitch: -89.887222851971,
                roll: 0
              }
            }

            // 可选参数， bounding
          }
        }
      ]
    },
    {
      id: "custom-layer",
      parentId: 0,
      name: "扩展图层",
      open: false,
      children: [
        {
          id: "wmslayer",
          parentId: "base-layer",
          name: "全球水汽(wms)",
          checked: false,
          data: {
            type: "raster",
            layerType: "wms",
            projection: "EPSG:4326",
            layerURL: GEOSERVER_ROOT + "/geoserver/wms",
            layers: "nurc:Arc_Sample"
            // viewport: { lonlat: [120.77762016359763, 31.28946357615492, 12300.338542266036], rotation: { heading: 359.99999999999886, pitch: -89.887222851971, roll: 0 } }

            // 可选参数， bounding
          }
        },
        {
          id: "WMTSLayer",
          parentId: "base-layer",
          name: "WMTSLayer",
          checked: false,
          data: {
            type: "raster",
            layerType: "wmts",
            projection: "EPSG:4326",
            layerURL: GEOSERVER_ROOT + "/geoserver/gwc/service/wmts",
            layer: "nurc:mosaic",
            style: "raster",
            tileMatrix: "EPSG:4326",
            tileMatrixSetID: "EPSG:4326",
            tileMatrixLabels: [
              "EPSG:4326:0",
              "EPSG:4326:1",
              "EPSG:4326:2",
              "EPSG:4326:3",
              "EPSG:4326:4",
              "EPSG:4326:5",
              "EPSG:4326:6",
              "EPSG:4326:7",
              "EPSG:4326:8",
              "EPSG:4326:9",
              "EPSG:4326:10",
              "EPSG:4326:11",
              "EPSG:4326:12",
              "EPSG:4326:13",
              "EPSG:4326:14",
              "EPSG:4326:15",
              "EPSG:4326:16",
              "EPSG:4326:17",
              "EPSG:4326:18",
              "EPSG:4326:19",
              "EPSG:4326:20",
              "EPSG:4326:21"
            ],
            format: "image/png",
            bounding: {
              rectangle: [6.346, 36.492, 20.83, 46.591]
            }
            // 可选参数， bounding
          }
        }
      ]
    },
    {
      id: "climate",
      parentId: 0,
      name: "气象水文",
      open: false,
      children: [
        {
          id: "currentGeom",
          parentId: "base-layer",
          name: "近海盐度观测",
          checked: false,
          data: {
            type: "vectorField",
            vis: "ctd",
            asc: "./static/data/VectorField/z_1_32.asc",
            width: 500,
            height: 682,
            bounding: {
              rectangle: [98.4375, 0.5273, 142.2949, 51.5634]
            }
            // 可选参数， bounding
          }
        },
        {
          id: "Scalarfield",
          parentId: "base-layer",
          name: "近海洋流",
          checked: false,
          data: {
            type: "vectorField",
            vis: "flow",
            width: 2630,
            height: 3060,
            u: "./static/data/VectorField/u_1_32.asc",
            v: "./static/data/VectorField/v_1_32.asc",
            bounding: {
              rectangle: [98.4375, 0.5273, 142.2949, 51.5634]
            }
            // 可选参数， bounding
          }
        }
      ]
    },
    {
      id: "viewport-collection",
      parentId: 0,
      name: "视点收藏",
      nocheck: true,
      open: true,
      children: [
        {
          id: "global-viewport",
          parentId: "viewport-collection",
          name: "全球视角",
          nocheck: true,
          data: {
            type: "viewport",
            duration: 1,
            lonlat: [106.00000000000003, 27.569518777222946, 21424517.495507367],
            rotation: {
              heading: 360,
              pitch: -90,
              roll: 0
            }
          }
        },
        {
          id: "tw-viewport",
          parentId: "viewport-collection",
          name: "台湾全景",
          nocheck: true,
          data: {
            type: "viewport",
            duration: 1,
            lonlat: [120.80933410028786, 22.718454183781926, 23222.537542096994],
            rotation: {
              heading: 11.550680442462061,
              pitch: -20.31262025715577,
              roll: 359.9965593909715
            }
          }
        },
        {
          id: "dj-viewport",
          parentId: "viewport-collection",
          name: "东京国际机场",
          nocheck: true,
          data: {
            type: "viewport",
            lonlat: [139.78680509582534, 35.547914536657416, 1768.5808727593796],
            rotation: {
              heading: 360,
              pitch: -89.89570475842196,
              roll: 0
            }
          }
        },
        {
          id: "ty-viewport",
          parentId: "viewport-collection",
          name: "桃园国际机场",
          nocheck: true,
          data: {
            type: "viewport",
            lonlat: [120.94814191060478, 24.812352251918423, 7456.163157029962],
            rotation: {
              heading: 30.388441582026353,
              pitch: -87.72008938661001,
              roll: 0
            }
          }
        },
        {
          id: "xmly-viewport",
          parentId: "viewport-collection",
          name: "喜马拉雅山脉",
          nocheck: true,
          data: { type: "viewport", lonlat: [96.64415587853289, 27.323526217614642, 127542.30455057879], rotation: { heading: 298.6254479063438, pitch: -23.110219459509977, roll: 0.002992195906009875 } }
        },
        {
          id: "lqhg-viewport",
          parentId: "viewport-collection",
          name: "琉球海沟",
          nocheck: true,
          data: { type: "viewport", lonlat: [127.53050750002618, 17.22554273205242, 321640.77538514405], rotation: { heading: 321.9148145853479, pitch: -28.33112253765799, roll: 0.08187099298500812 } }
        },
        {
          id: "mlyn-viewport",
          parentId: "viewport-collection",
          name: "马里亚纳海沟",
          nocheck: true,
          data: { type: "viewport", lonlat: [146.59545720872407, 5.7633522921653295, 616153.1813626569], rotation: { heading: 336.2942978018253, pitch: -37.993127702992915, roll: 0.11427919034306014 } }
        }
      ]
    }
  ]
};

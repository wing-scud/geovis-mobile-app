// const SERVER_ROOT = "http://49.234.121.120:8092";
const SERVER_ROOT = "http://localhost:8092";
const TILESERVER_ROOT = "http://localhost:8082";
const GEOSERVER_ROOT = "http://localhost:8088";
const MODELSERVER_ROOT = "http://localhost:4000";
const mountainModel = "http://192.168.13.32/3dtile/mountain/Production_1/Scene/Production_1.json"; //"http://localhost:3030/proxy/" + encodeURIComponent(`http://bj.geovisweb.cn:10080/data/3dtile/mountain/Production_1/Scene`) + "/Production_1.json";
const yuxiModel = "http://localhost:8900/static/tiles/3dtiles/xinping/Production_1.json"; //"http://bj.geovisweb.cn:10080/data/3dtile/guizhou/Production_1.json";
const tokyoModel = "http://localhost:8900/static/tiles/3dtiles/东京_机场/315260534350.json";
// 新山王 新山王美军中心 新潟分屯基地 亚特兰大海军航空站  知念自卫队

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
      // name: "基础底图",
      name: "在线地图",
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
            layerURL: `http://www.geovisweb.cn/proxy/http://www.google.co.jp/maps/vt?lyrs=s@709&gl=cn&x={x}&y={y}&z={z}`,
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
            layerURL: "http://www.geovisweb.cn/proxy/http://http://mt2.google.co.jp/vt/x={x}&y={y}&z={z}",
            minLevel: 3,
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
              getURL: function (url) {
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
        }, {
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
              getURL: function (url) {
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
      name: "离线地图",
      // name: "电子地图",
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

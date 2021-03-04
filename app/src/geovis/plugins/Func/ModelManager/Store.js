/* eslint-disable */
const {
  Cartesian2,
  defaultValue,
  defined,
  defineProperties,
  Ellipsoid,
  Rectangle,
  GeographicProjection,
  GeographicTilingScheme
} = GeoVis; //  GeographicProjection:WebMercatorProjection

const Engine = window.Engine;

/**
 * 参考{@link WebMercatorProjection}、EPSG:3857的切片方案.  该切片方案被广泛应用与Google Maps, Microsoft Bing Maps, 以及大多数ESRI ArcGIS Online中.
 *
 * @alias EarthTilingSchema
 * @constructor
 *
 * @param {Object} [options] 主要属性
 * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.WGS84]  椭球. 默认使用WGS84椭球.
 * @param {Number} [options.numberOfLevelZeroTilesX=1] 0层级中X方向的瓦片数量
 * @param {Number} [options.numberOfLevelZeroTilesY=1] 0层级中Y方向的瓦片数量
 * @param {Cartesian2} [options.rectangleSouthwestInMeters] 切片方案覆盖的矩形的西南角.  如果该参数或rectangleNortheastInMeters未指定, 整个地球将被覆盖到经度方向上，且相等的距离被覆盖到纬度方向上，形成方形投影.
 * @param {Cartesian2} [options.rectangleNortheastInMeters] 切片方案覆盖的矩形的东北角.  如果该参数或rectangleNortheastInMeters未指定, 整个地球将被覆盖到经度方向上，且相等的距离被覆盖到纬度方向上，形成方形投影.
 */
function EarthTilingSchema(options) {
  GeographicTilingScheme.call(this, options);
}
EarthTilingSchema.prototype = new GeographicTilingScheme();

/**
 * 获取指定层级的X方向上的瓦片总数
 *
 * @param {Number} level 层级
 * @returns {Number} 返回指定层级的X方向上的瓦片总数
 */
EarthTilingSchema.prototype.getNumberOfXTilesAtLevel = function(level) {
  let number = 1;
  switch (level) {
    case 0:
      number = 1;
      break;
    case 1:
      number = 2;
      break;
    default:
      number = number << level;
  }
  return number;
};

/**
 * 获取指定层级的Y方向上的瓦片总数
 *
 * @param {Number} level 层级.
 * @returns {Number} 返回指定层级的Y方向上的瓦片总数
 */
EarthTilingSchema.prototype.getNumberOfYTilesAtLevel = function(level) {
  let number = 1;
  switch (level) {
    case 0:
      number = 1;
      break;
    case 1:
    case 2:
      number = 2;
      break;
    default:
      number = number << (level - 1);
  }
  return number;
};
/**
 * 将指定弧度的矩形转换为该切片方案下本地坐标系的矩形.
 *
 * @param {Rectangle} rectangle 用于转换的矩形
 * @param {Rectangle} [result] 用于拷贝转换结果的实例, 如果未定义，则创建一个新的实例.
 * @returns {Rectangle} 返回转换的结果, 如果未定义result参数，则创建一个新的实例对象
 */
// EarthTilingSchema.prototype.rectangleToNativeRectangle = function(rectangle, result) {

/**
 *  将瓦片的x, y坐标和层级转换为该切片方案下本地坐标表达的矩形.
 *
 * @param {Number} x 瓦片的X坐标
 * @param {Number} y 瓦片的Y坐标.
 * @param {Number} level 瓦片的层级.  最小为0.
 * @param {Object} [result] 用于拷贝转换结果的实例, 如果未定义，则创建一个新的实例.
 * @returns {Rectangle} 返回转换的结果, 如果未定义result参数，则创建一个新的实例对象.
 */
// EarthTilingSchema.prototype.tileXYToNativeRectangle = function(x, y, level, result) {

/**
 * 将瓦片的x, y坐标和层级转换为地图的矩形.
 *
 * @param {Number} x 瓦片的X坐标
 * @param {Number} y 瓦片的Y坐标
 * @param {Number} level 瓦片的层级.  最小为0.
 * @param {Object} [result] 用于拷贝转换结果的实例, 如果未定义，则创建一个新的实例.
 * @returns {Rectangle} 返回转换的结果, 如果未定义result参数，则创建一个新的实例对象.
 */
// EarthTilingSchema.prototype.tileXYToRectangle = function(x, y, level, result) {

/**
 * 计算包含给定地图位置的瓦片的x,y坐标.
 *
 * @param {Cartographic} position 地图的位置.
 * @param {Number} level 瓦片的层级.  最小为0.
 * @param {Cartesian2} [result] 用于拷贝转换结果的实例, 如果未定义，则创建一个新的实例.
 * @returns {Cartesian2} 返回转换的结果, 如果未定义result参数，则创建一个新的实例对象.
 */
// EarthTilingSchema.prototype.positionToTileXY = function(position, level, result) {

const TileCoordinatesImageryProvider = GeoVis.TileCoordinatesImageryProvider;

function OctCoordinatesImageryProvider(options) {
  TileCoordinatesImageryProvider.call(this, options);
  this.enablePickFeatures = true;
  console.log(this);
}
OctCoordinatesImageryProvider.prototype = new TileCoordinatesImageryProvider();

/**
 * 拾取当前图像提供者不支持的特征, 对于不支持的特征通常简单地返回undefined.
 *
 * @param {Number} x 瓦片的X坐标
 * @param {Number} y 瓦片的Y坐标
 * @param {Number} level 瓦片层级
 * @param {Number} longitude 拾取特征所在的经度
 * @param {Number} latitude  拾取特征所在的纬度
 * @return {Promise.<ImageryLayerFeatureInfo[]>|undefined} 异步拾取完成时所有被拾取的特征的promise，其值为一个{@link ImageryLayerFeatureInfo}实例数组.
 * 如果给定的位置上没有发现任何特征，则数组为空。如果不支持拾取，则返回undefined.
 */
OctCoordinatesImageryProvider.prototype.pickFeatures = function(
  x,
  y,
  level,
  longitude,
  latitude
) {
  console.log(getOct(x, y, level));
};
OctCoordinatesImageryProvider.prototype.requestImage = function(
  x,
  y,
  level,
  request
) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");

  const cssColor = this._color.toCssColorString();

  context.strokeStyle = cssColor;
  context.lineWidth = 2;
  context.strokeRect(1, 1, 255, 255);

  const oct = getOct(x, y, level);
  const label = `${oct}`; //'L' + level + 'X' + x + 'Y' + y;// getOct(x,y,level)//
  // console.log(x,y,level,this._tilingScheme.getXYLevel(oct))
  context.font = "bold 25px Arial";
  context.textAlign = "center";
  context.fillStyle = "black";
  context.fillText(label, 127, 127);
  context.fillStyle = cssColor;
  context.fillText(label, 124, 124);
  context.font = "bold 20px Arial";
  context.fillStyle = "black";
  context.fillText(`Level:${level} x:${x} y:${y}`, 127, 180);

  return canvas;
};

// xy对应oct
const firstOcts = {
  "00": "20",
  "01": "02",
  "10": "21",
  "11": "03",
  "20": "30",
  "21": "12",
  "30": "31",
  "31": "13"
};

// 局部xy对应的oct
const treeCoor = {
  "00": 2,
  "01": 0,
  "11": 1,
  "10": 3
};

function getYTiles(level) {
  let number = 1;
  switch (level) {
    case 0:
      number = 1;
      break;
    case 1:
    case 2:
      number = 2;
      break;
    default:
      number = number << (level - 1);
  }
  return number;
}

function getOct(x, y, level) {
  if (level < 2) {
    return "";
  } else if (level === 2) {
    return firstOcts[`${x}${y}`];
  } else {
    let parentX = Math.floor(x / 2);
    // if(level>3){
    const currentYNum = getYTiles(level);
    const yPos = y / currentYNum;
    if (!(yPos > (1 - 0.001) / 4 && yPos < (3 - 0.001) / 4)) {
      x = Math.floor(x / 2);
      parentX = x;
    }

    // }

    const xlocal = x % 2;
    if (level % 2 === 0) {
      //偶数行
      return (
        getOct(parentX, Math.floor(y / 2), level - 1) +
        treeCoor[`${xlocal}${y % 2}`]
      );
    } else {
      //奇数行
      return (
        getOct(parentX, Math.floor(y / 2), level - 1) +
        (treeCoor[`${xlocal}${y % 2}`] + 4)
      );
    }
  }
}
/**
 *
 * @param {String} oct
 * @returns {Array[x,y,level]} xylevel
 */
EarthTilingSchema.prototype.getXYLevel = function(oct) {
  if (oct.length < 2) return [];
  const octpart1 = oct.slice(0, 2);
  const octpart2 = oct.slice(2, oct.length);
  let xyinLevel2;
  for (const i in firstOcts) {
    if (firstOcts[i] === octpart1) xyinLevel2 = i;
  }

  let currentLevel = 2;
  let currentX = Math.floor(xyinLevel2.slice(0, 1));
  let currentY = Math.floor(xyinLevel2.slice(1, 2));
  const localOcts = octpart2.split("");
  localOcts.map((val, index) => {
    val = Math.floor(val) % 4;
    let localXY;
    for (const i in treeCoor) {
      if (treeCoor[i] === val) localXY = i;
    }
    const localX = Math.floor(localXY.slice(0, 1));
    const localY = Math.floor(localXY.slice(1, 2));
    currentX = currentX * 2 + localX;
    currentY = currentY * 2 + localY;
    currentLevel++;
  });
  return [currentX, currentY, currentLevel];
};

const octant_dict = {
  "0": [0, 0, 0],
  "1": [1, 0, 0],
  "2": [0, 1, 0],
  "3": [1, 1, 0],
  "4": [0, 0, 1],
  "5": [1, 0, 1],
  "6": [0, 1, 1],
  "7": [1, 1, 1]
};

function LatLon(lat, lon) {
  this.lon = lon;
  this.lat = lat;
}

function LatLonBox(north, south, west, east) {
  this.north = north;
  this.south = south;
  this.west = west;
  this.east = east;
  this.mid_point = new LatLon((north + south) / 2, (west + east) / 2);
}

LatLonBox.prototype.get_child = function(octant) {
  try {
    var [oct_x, oct_y, oct_z] = octant_dict[octant];
  } catch (e) {
    console.log("invalid octant value");
  }
  let { north: n, south: s, west: w, east: e } = this;
  // print(oct_x, oct_y, oct_z, "||", w, s, e, n)
  if (oct_y == 0) {
    n = this.mid_point.lat;
  } else if (oct_y == 1) {
    s = this.mid_point.lat;
  } else {
    console.log("error");
  }
  if (n == 90 || s == -90) return new LatLonBox(n, s, w, e);

  if (oct_x == 0) {
    e = this.mid_point.lon;
  } else if (oct_x == 1) {
    w = this.mid_point.lon;
  } else {
    console.log("err");
  }
  return new LatLonBox(n, s, w, e);
};

LatLonBox.is_overlapping = function(box1, box2) {
  const { north: n1, south: s1, west: w1, east: e1 } = box1;
  const { north: n2, south: s2, west: w2, east: e2 } = box2;

  const n = Math.min(n1, n2);
  const s = Math.max(s1, s2);
  const w = Math.max(w1, w2);
  const e = Math.min(e1, e2);

  return n >= s && w <= e;
};
const first_latlonbox_dict = {
  "": new LatLonBox(90, -90, -180, 180),
  "0": new LatLonBox(0, -90, -180, 0),
  "1": new LatLonBox(0, -90, 0, 180),
  "2": new LatLonBox(90, 0, -180, 0),
  "3": new LatLonBox(90, 0, 0, 180),
  "02": new LatLonBox(0, -90, -180, -90),
  "03": new LatLonBox(0, -90, -90, 0),
  "12": new LatLonBox(0, -90, 0, 90),
  "13": new LatLonBox(0, -90, 90, 180),
  "20": new LatLonBox(90, 0, -180, -90),
  "21": new LatLonBox(90, 0, -90, 0),
  "30": new LatLonBox(90, 0, 0, 90),
  "31": new LatLonBox(90, 0, 90, 180)
};

function octant_to_latlong(octant_string) {
  let latlonbox = first_latlonbox_dict[octant_string.slice(0, 2)];
  const leftOct = octant_string.slice(2, octant_string.length);
  for (const octant in leftOct)
    latlonbox = latlonbox.get_child(leftOct[octant]);
  return latlonbox;
}

class ModelStore {
  constructor() {
    this.state = {
      modelList: [],
      ele: {}
    };
  }

  async init() {
    if (this.state.modelList.length > 0) {
      return;
    }
    const list = await fetch("./static/data/list.json").then(res => res.json());
    list.forEach(ele => {
      if (ele.items !== undefined) {
        ele.items.forEach(item => {
          item.enable = false;
        });
        //observable(ele);
        this.ele = ele;
      }
    });
    this.modelList = list;
  }

  uninit = () => {
    // earth.scene.primitives.remove(this.tileset);
  };
  toggleModel = item => {
    //path,centerOffset,dateTime
    let { url, id, title, offset: centerOffset, dateTime, viewport } = item;
    const oct =
      url.search("json") > 0 ? url.split("live/")[1].split(".")[0] : url;
    url =
      url.search("json") > 0 ? url : `http://localhost:4000/live/${url}.json`;

    item.enable != item.enable;
    // earth.scene.primitives.remove(this.tileset);
    if (this.lastId === id) {
      this.lastId = undefined;
      return;
    } else {
      earth.clock.currentTime = GeoVis.Date.fromDate(new Date(dateTime));
      this.tileset = earth.scene.primitives.add(
        new GeoVis.GeoVis3DTileset({
          url: url, //, `http://${location.hostname}:4000/live/${url}.json`,//
          maximumScreenSpaceError: 2,
          maximumNumberOfLoadedTiles: 1000,
          shadows: GeoVis.ShadowMode.DISABLED,
          preloadWhenHidden: true,
          preferLeaves: true,
          // dynamicScreenSpaceError: true,
          // dynamicScreenSpaceErrorDensity: 1.0,
          // dynamicScreenSpaceErrorFactor: 1.0,
          // dynamicScreenSpaceErrorHeightFalloff: 0.8,
          skipLevelOfDetail: true,
          baseScreenSpaceError: 1,
          skipScreenSpaceErrorFactor: 1,
          skipLevels: 4
        })
      );
      // earth.flyTo(tileset)
      this.tileset.readyPromise
        .then(() => {
          const cartographic = Engine.Cartographic.fromCartesian(
            this.tileset.boundingSphere.center
          );
          const lon = cartographic.longitude;
          const lat = cartographic.latitude;
          const surface = Engine.Cartesian3.fromRadians(lon, lat, 0.0);
          let lonlat = octant_to_latlong(oct);
          lonlat = [lonlat.mid_point.lon, lonlat.mid_point.lat];
          // debugger
          const heightOffset =
            GeoVis.Cartesian3.distance(
              GeoVis.Cartesian3.fromDegrees(...lonlat),
              new GeoVis.Cartesian3()
            ) - 6371000;

          const offset = Engine.Cartesian3.fromDegrees(...lonlat, heightOffset);
          const translation = Engine.Cartesian3.subtract(
            offset,
            surface,
            new Engine.Cartesian3()
          );
          console.log(translation, 3333333333);
          this.tileset.modelMatrix = Engine.Matrix4.fromTranslation(
            translation
          );
          earth.flyTo(this.tileset);
        })
        .otherwise(function(error) {
          throw error;
        });
    }
  };
}

export const modelStore = new ModelStore();

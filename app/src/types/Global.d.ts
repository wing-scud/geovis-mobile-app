interface Window {
  earth: GeoVis.Earth
  GVGlobal: {
    earth: GeoVis.Earth
  }
  drawHelper: DrawHelper
}


declare var earth: GeoVis.Earth;



// declare class AbstractModel {
//   public id: String;
//   public name: String;
//   public Type: DrawHelper.CODES
// }

declare interface LayerItem {
  type: String,
  id: String,
  title: String,
  imgURL: String,
  layerURL: String,
  content: String
  enable: Boolean
}
declare namespace DrawHelper {
  enum CODES {
    /**
* 空间多边形
* @type {Number}
* @constant
*/
    SPACE_POLYGON,


    // classify
    CLASSIFY_POLYGON,
    /**
     * 地表多边形
     * @type {Number}
     * @constant
     */
    PROJ_POLYGON,
    /**
     * 地形多边形
     * @type {Number}
     * @constant
     */
    GROUND_POLYGON,
    /**
     * 空间线
     * @type {Number}
     * @constant
     */
    SPACE_POLYLINE,

    /**
     * 地表线
     * @type {Number}
     * @constant
     */
    PROJ_POLYLINE,

    /**
     * 地形线
     * @type {Number}
     * @constant
     */
    GROUND_POLYLINE,

    ARROWHEAD,

    //   TAILEDATTACK,

    //   ATTACKARROWS,

    //   ATTACKAREA,

    EXTENT,



    /**
     * 分割线
     * @type {Number}
     * @constant
     */
    SPLITLINE,

    /**
     * 圆
     * @type {Number}
     * @constant
     */
    CIRCLE,

    /**
     *
     * 墙
     * @type {Number}
     * @constant
     */
    WALL,

    /**
     *
     * 水淹
     * @type {Number}
     * @constant
     */
    FLOOD,
    ANGLE,
    CUTFILL,
    VISIBILITY,
    TEXT_MARKER,
    IMAGE_MARKER,
  }
}


declare class DrawHelper {
  static Types: any;
  constructor(earth: GeoVis.Earth,options:any){

  }
  startDrawingPlot: () => {};
  startDrawingCircle: () => {};
  startDrawingImage: () => {};
  startDrawingMarker: () => {};
  startDrawingPolygon: () => {};
  startDrawingPolyline: () => {};
}
import { earthStore } from "@/geovis/store";
const drawHelper = earthStore.drawHelper;
const Types = DrawHelper.Types;

const types = [
  {
    id: "liangcei",
    name: "量测",
    icon: "icon-liangcei",
    options: [
      // { name: "三角", icon: "" },
      { name: "距离", icon: "icon-juli" },
      { name: "面积", icon: "icon-mianji" }
    ]
  },
  {
    id: "tuwen",
    name: "图文标",
    icon: "icon-tuwen",
    options: [
      { name: "文字", icon: "icon-wenzi" },
      { name: "图片", icon: "icon-tupian" },
      // { name: "对话框", icon: "" },
      // { name: "旗帜", icon: "" }
    ]
  },
  {
    id: "line",
    name: "线标",
    icon: "icon-xiantiao",
    options: [
      { name: "空间", icon: "icon-kongjian" },
      { name: "投影", icon: "icon-touying" },
      { name: "地形", icon: "icon-dixing" }
    ]
  },
  {
    id: "polygon",
    name: "多边形",
    icon: "icon-duobianxing",
    options: [
      { name: "空间", icon: "icon-kongjian" },
      { name: "投影", icon: "icon-touying" },
      { name: "地形", icon: "icon-dixing" }
    ]
  },
  {
    id: "other",
    name: "其他",
    icon: "icon-qita",
    options: [
      { name: "圆", icon: "icon-yuan" },
      // { name: "墙", icon: "" },
      { name: "矩形", icon: "icon-juxing" }
    ]
  }
]; function formateDate(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let days = date.getDate();
  if (days < 10) {
    days = "0" + days;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${hours}:${minutes}:${seconds}`;
  // return `${year}-${month}-${days}  ${hours}:${minutes}:${seconds}`;
}

class Plot {
  private _plotType: any;
  public get plotType(): any {
    return this._plotType;
  }
  public set plotType(value: any) {
    this._plotType = value;
  }
  private _drawHelper: any;
  public get drawHelper(): any {
    return this._drawHelper;
  }
  public set drawHelper(value: any) {
    this._drawHelper = value;
  }
  private _drawResults: Array<any>;
  public get drawResults(): Array<any> {
    return this._drawResults;
  }
  public set drawResults(value: Array<any>) {
    this._drawResults = value;
  }
  private _primitives: any;
  public get primitives(): any {
    return this._primitives;
  }
  public set primitives(value: any) {
    this._primitives = value;
  }

  constructor() {
    this._drawHelper = drawHelper;
    this._drawResults = [];
    this._primitives = [];
  }

  /**
   * 图文标绘
   */
  startDrawMarker(type, options?) {
    const drawHelper = this._drawHelper;
    const textoptions = {
      weight: false,
      color: "white",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      italic: false,
      align: "centor",
      fontSize: "20px",
      fontFamily: "height",
    };
    let markOptions = {};
    let drawHelperType;
    switch (type) {
      case '文字':
        drawHelperType = DrawHelper.Types.TEXT_MARKER
        markOptions = textoptions;
        break;
      case '图片':
        drawHelperType = DrawHelper.Types.IMAGE_MARKER
        break;
      case '标签':
        drawHelperType = DrawHelper.Types.LABEL_MARKER
        markOptions = textoptions;
        break;
      case '旗帜':
        drawHelperType = DrawHelper.Types.FLAG_MARKER
        markOptions = textoptions;
        break;
      default: break;
    }
    drawHelper.startDrawingMarker(
      {
        type: drawHelperType,
        ...markOptions,
      }
    );
    const operator = type + "标绘";
    this.addPlotResults(operator)
  }
  /**
   * 量测
   * @param type 量测类型
   */
  startMeasure(type) {
    let resultFilter = ""
    switch (type) {
      case "三角":
        this.triangleMeasure();
        resultFilter = "角度"
        break;
      case "距离":
        this.distanceMeasure();
        resultFilter = "距离"
        break;
      case "面积":
        this.areaMeasure();
        resultFilter = "面积"
        break;
      default:
        break;
    }
    const operator = type + "量测"
    this.addMeasureResult(resultFilter, operator)
  }
  startDrawPolygon(type, options?) {
    let drawHelperType;
    let polygonOptions = {
      color: GeoVis.Color.WHITE.withAlpha(0.8),
    };
    switch (type) {
      case '空间':
        drawHelperType = DrawHelper.Types.SPACE_POLYGON
        break;
      case '投影':
        drawHelperType = DrawHelper.Types.PROJ_POLYGON
        break;
      case '地形':
        drawHelperType = DrawHelper.Types.GROUND_POLYGON
        break;
      default: break;
    }
    type=type="多边形"
    polygonOptions = Object.assign(type, polygonOptions, options)
    this._drawHelper.startDrawingPolygon(polygonOptions)
    this.addPlotResults(type)
  }
  startDrawLine(type) {
    // startDrawingPlot()
    let drawHelperType;
    const lineOptions = {
      color: GeoVis.Color.WHITE.withAlpha(0.8),
    };
    switch (type) {
      case '空间':
        drawHelperType = DrawHelper.Types.SPACE_POLYGON
        break;
      case '投影':
        drawHelperType = DrawHelper.Types.PROJ_POLYGON
        break;
      case '地形':
        drawHelperType = DrawHelper.Types.GROUND_POLYGON
        break;
      default: break;
    }
    this._drawHelper.startDrawingPolyline({
      type:drawHelperType
    })
    type=type="线"
    this.addPlotResults(type)
  }
  startDrawOther(type) {
    let drawHelperType;
    // let defaultOptions={

    // }
    switch (type) {
      case '圆':
        drawHelperType = DrawHelper.Types.CIRCLE;
        this._drawHelper.startDrawingCircle({
          type: drawHelperType
        })
        break;
      case '墙':
        drawHelperType = DrawHelper.Types.WALL
        this._drawHelper.startDrawingWall({
          type: drawHelperType
        })
        break;
      case '矩形':
        drawHelperType = DrawHelper.Types.RECTANGLE
        this._drawHelper.startDrawingRect({
          type: drawHelperType
        })
        break;
      default: break;
    }
    this.addPlotResults(type)
  }
  private addPlotResults(type) {
    const instance = this;
    this._drawHelper.once("created", function (e) {
      const id = e.entity.id;
      const time = formateDate(new Date())
      instance._drawResults.push({ value: "无", type: type, time: time });
      instance._primitives.push(e.entity);
    });
  }
  private triangleMeasure() {
    const angleOptions = {
      color: GeoVis.Color.WHITE.withAlpha(0.8),
      computed: true,
      width: 3,
      pickTileset: true
    };
    this._drawHelper.startDrawingAngle(angleOptions);
  }
  private distanceMeasure() {
    const polyOptions = {
      color: GeoVis.Color.WHITE.withAlpha(0.5),
      width: 3
    };
    this._drawHelper.startDrawingPolyline({
      type: Types.PROJ_POLYLINE,
      computed: true,
      ...polyOptions
    });
  }
  deleteResult(index){
    this._drawResults.splice(index, 1);
    debugger
    this._primitives[index].deleted();
    this._primitives.splice(index, 1);
  }
  private areaMeasure() {
    const polyOptions = {
      color: GeoVis.Color.WHITE.withAlpha(0.5),
      width: 3
    };
    this._drawHelper.startDrawingPolygon({
      type: Types.PROJ_POLYGON,
      computed: true,
      ...polyOptions
    });
  }
  private addMeasureResult(resultFilter, operator) {
    const instance = this;
    this._drawHelper.once("created", function (e) {
      const id = e.entity.id;
      const arrayTag = instance._drawHelper._measureTool.tags.get(id);
      let result;
      if (resultFilter === "角度") {
        result = arrayTag[1].text;
      } else {
        result = arrayTag[arrayTag.length - 1].text;
      }
      const time = formateDate(new Date())
      instance._drawResults.push({ value: result, type: operator, time: time });
      instance._primitives.push(e.entity);
    });
  }
  destory() {
    this._drawHelper.removeAll()
  }
}
const plot = new Plot();
export { types, plot };

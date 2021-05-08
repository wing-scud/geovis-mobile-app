import { earthStore } from "@/geovis/store";
const drawHelper = earthStore.drawHelper;
const Types = DrawHelper.Types;
/* 添加常用图标库选择，添加marker，多边形、线改为一种，不需要三个 */
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
    name: "图文",
    icon: "icon-tuwen",
    options: [
      { name: "文字", icon: "icon-wenzi" },
      { name: "图片", icon: "icon-tupian" },
      // { name: "对话框", icon: "" },
      // { name: "旗帜", icon: "" }
    ]
  },
  // {
  //   id: "line",
  //   name: "线标",
  //   icon: "icon-xiantiao",
  //   options: [
  //     { name: "空间", icon: "icon-kongjian" },
  //     { name: "投影", icon: "icon-touying" },
  //     { name: "地形", icon: "icon-dixing" }
  //   ]
  // },
  // {
  //   id: "polygon",
  //   name: "多边形",
  //   icon: "icon-duobianxing",
  //   options: [
  //     { name: "空间", icon: "icon-kongjian" },
  //     { name: "投影", icon: "icon-touying" },
  //     { name: "地形", icon: "icon-dixing" }
  //   ]
  // },
  {
    id: "other",
    name: "其他",
    icon: "icon-qita",
    options: [
      { name: "圆", icon: "icon-yuan" },
      // { name: "墙", icon: "" },
      // { name: "矩形", icon: "icon-juxing" },
      { name: "线", icon: "icon-xiantiao" }, { name: "多边形", icon: "icon-duobianxing" }
    ]
  }
];
function formateDate(date) {
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
function formateLength(length) {
  let value, unit;
  if (length > 1000) {
    value = Math.floor(length / 1000)
    unit = "千米"
  } else {
    value = length
    unit = "米"
  }
  return { value, unit }
}
function formateArea(area) {
  let value, unit;
  if (area > 1000000) {
    value = Math.floor(area / 1000000)
    unit = "平方千米"
  } else {
    value = area
    unit = "平方米"
  }
  return { value, unit }
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
  private _drawingMarker: Function;
  public get drawingMarker(): Function {
    return this._drawingMarker;
  }
  public set drawingMarker(value: Function) {
    this._drawingMarker = value;
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
        drawHelperType = DrawHelper.Types.IMAGE_MARKER;
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
    this.drawingMarker = drawHelper.startDrawingMarker(
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
        this.drawingMarker = this.triangleMeasure();
        resultFilter = "角度"
        break;
      case "距离":
        this.drawingMarker = this.distanceMeasure();
        resultFilter = "距离"
        break;
      case "面积":
        this.drawingMarker = this.areaMeasure();
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
    type = type = "多边形"
    polygonOptions = Object.assign(type, polygonOptions, options)
    this.drawingMarker = this._drawHelper.startDrawingPolygon(polygonOptions)
    // this.addPlotResults(type)
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
    this.drawingMarker = this._drawHelper.startDrawingPolyline({
      type: drawHelperType
    })
    type = type = "线"
    // this.addPlotResults(type)
  }
  startDrawOther(type) {
    let drawHelperType;
    // let defaultOptions={
    // }
    switch (type) {
      case '圆':
        drawHelperType = DrawHelper.Types.CIRCLE;
        this.drawingMarker = this._drawHelper.startDrawingCircle({
          type: drawHelperType
        })
        break;
      case '墙':
        drawHelperType = DrawHelper.Types.WALL
        this.drawingMarker = this._drawHelper.startDrawingWall({
          type: drawHelperType
        })
        break;
      // case '矩形':
      //   drawHelperType = DrawHelper.Types.RECTANGLE
      //   this.drawingMarker = this._drawHelper.startDrawingRect({
      //     type: drawHelperType
      //   })
      //   break;
      case '线':
        this.startDrawLine('投影')
        break;
      case '多边形':
        this.startDrawPolygon('投影')
        break;
      default: break;
    }
    this.addPlotResults(type)
  }
  finishDrawing() {
    if (this.drawingMarker) {
      this.drawingMarker();
    }
  }
  deleteResult(index) {
    const entity = this._primitives[index]
    entity.deleted();
    this._primitives.splice(index, 1);
    this._drawResults.splice(index, 1);
  }
  save(name) {
    const json = this._drawHelper.serialize();
    const data = JSON.stringify(json);
    /* 写入手机 */

  }
  load(path) {
    //
    const string = "";
    this._drawHelper.unserialize(JSON.parse(string));
  }
  removeAll() {
    this._drawHelper.removeAll();
    this._drawResults.splice(0, this._drawResults.length);
    this._primitives.splice(0, this._drawResults.length);
  }
  private addPlotResults(type) {
    const instance = this;
    this._drawHelper.once("created", function (e) {
      const id = e.entity.id;
      const time = formateDate(new Date())
      instance._drawResults.push({ value: time, type: type, time: time });
      instance._primitives.push(e.entity);
      instance.drawingMarker = undefined
    });
  }
  private triangleMeasure() {
    const angleOptions = {
      color: GeoVis.Color.WHITE.withAlpha(0.8),
      computed: true,
      width: 3,
      pickTileset: true
    };
    return this._drawHelper.startDrawingAngle(angleOptions);
  }
  private distanceMeasure() {
    const polyOptions = {
      color: GeoVis.Color.WHITE.withAlpha(0.5),
      width: 3
    };
    return this._drawHelper.startDrawingPolyline({
      type: Types.PROJ_POLYLINE,
      computed: true,
      ...polyOptions
    });
  }
  private areaMeasure() {
    const polyOptions = {
      color: GeoVis.Color.WHITE.withAlpha(0.5),
      width: 3
    };
    return this._drawHelper.startDrawingPolygon({
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
      let formateValue, formateUnit;
      if (resultFilter === "角度") {
        result = arrayTag[1].text;
        formateValue = result;;
        formateUnit = "°";
      } else {
        result = arrayTag[arrayTag.length - 1].text;
        /* 距离、面积结果简化 */
        const num = Number(result.replace(/[^0-9.]/ig, ""));
        if (result.includes('平方米')) {
          const { value, unit } = formateArea(num);
          formateValue = value, formateUnit = unit
        } else {
          const { value, unit } = formateLength(num);
          formateValue = value, formateUnit = unit
        }
      }
      const time = formateDate(new Date())
      instance._drawResults.push({ value: formateValue, unit: formateUnit, type: operator, time: time });
      instance._primitives.push(e.entity);
      instance.drawingMarker = undefined
    });
  }
  destory() {
    this._drawHelper.removeAll()
  }
}
const plot = new Plot();
export { types, plot };

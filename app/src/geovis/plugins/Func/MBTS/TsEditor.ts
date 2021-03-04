
class TsEditor {
  private _state: { loadState: number; };
  public get state(): { loadState: number; } {
    return this._state;
  }
  private _layerConfigure: { near: number; far: number; };
  public get layerConfigure(): { near: number; far: number; } {
    return this._layerConfigure;
  }
  public set layerConfigure(value: { near: number; far: number; }) {
    this._layerConfigure = value;
  }

  private _pointConfigure: {
    pixelSize: number;
    color: string;
    distanceDisplayCondition: {
      near: number;
      far: number;
    };
  };
  public get pointConfigure(): {
    pixelSize: number;
    color: string;
    distanceDisplayCondition: {
      near: number;
      far: number;
    };
  } {
    return this._pointConfigure;
  }
  public set pointConfigure(value: {
    pixelSize: number;
    color: string;
    distanceDisplayCondition: {
      near: number;
      far: number;
    };
  }) {
    this._pointConfigure = value;
  }
  private _billboardConfigure: {
    scale: number;
    width: number;
    height: number;
    distanceDisplayCondition: {
      near: number;
      far: number;
    };
  };
  public get billboardConfigure(): {
    scale: number;
    width: number,
    height: number,
    distanceDisplayCondition: {
      near: number;
      far: number;
    };
  } {
    return this._billboardConfigure;
  }
  public set billboardConfigure(value: {
    scale: number;
    width: number,
    height: number,
    distanceDisplayCondition: {
      near: number;
      far: number;
    };
  }) {
    this._billboardConfigure = value;
  }
  private _modelConfigure: {
    minimumPixelSize: number;
    scale: number;
    distanceDisplayCondition: {
      near: number;
      far: number;
    };
  };
  public get modelConfigure(): {
    minimumPixelSize: number;
    scale: number;
    distanceDisplayCondition: {
      near: number;
      far: number;
    };
  } {
    return this._modelConfigure;
  }
  public set modelConfigure(value: {
    minimumPixelSize: number;
    scale: number;
    distanceDisplayCondition: {
      near: number;
      far: number;
    };
  }) {
    this._modelConfigure = value;
  }
  private _fixModel: Array<number>;
  public get fixModel(): Array<number> {
    return this._fixModel;
  }
  public set fixModel(value: Array<number>) {
    this._fixModel = value;
  }
  private _fixBillboard: Array<number>;
  public get fixBillboard(): Array<number> {
    return this._fixBillboard;
  }
  public set fixBillboard(value: Array<number>) {
    this._fixBillboard = value;
  }
  private _leadLineConfigure: {
    color: string;
    width: number;
  };
  public get leadLineConfigure(): {
    color: string;
    width: number;
  } {
    return this._leadLineConfigure;
  }
  public set leadLineConfigure(value: {
    color: string;
    width: number;
  }) {
    this._leadLineConfigure = value;
  }
  private _markConfigure: {
    fillColor: string;
    //fontSize
    font: string; // "25px sans-serif"
    pixelOffset: Array<number>;
    scale: number;
  };
  public get markConfigure(): {
    fillColor: string;
    //fontSize
    font: string; // "25px sans-serif"
    pixelOffset: Array<number>;
    scale: number;
  } {
    return this._markConfigure;
  }
  public set markConfigure(value: {
    fillColor: string;
    font: string; // "25px sans-serif"
    pixelOffset: Array<number>;
    scale: number;
  }) {
    this._markConfigure = value;
  }
  private _historyConfigure: {
    speed: number;
    smooth:boolean;
    pointSize: number;
    pointColor: string;
    totalPathWidth: number;
    totalPathColor: string;
    passedPathColor: string;
    passedPathWidth: number;
  };
  public get historyConfigure(): {
    speed: number;
    pointSize: number;
    pointColor: string;
    smooth:boolean;
    totalPathWidth: number;
    totalPathColor: string;
    passedPathColor: string;
    passedPathWidth: number;
  } {
    return this._historyConfigure;
  }
  public set historyConfigure(value: {
    speed: number;
    pointSize: number;
    pointColor: string;
    smooth:boolean;
    totalPathWidth: number;
    totalPathColor: string;
    passedPathColor: string;
    passedPathWidth: number;
  }) {
    this._historyConfigure = value;
  }
  private _displayRange: Array<number>;
  public get displayRange(): Array<number> {
    return this._displayRange;
  }
  public set displayRange(value: Array<number>) {
    this._displayRange = value;
    const modelToBill = earth.camera.zoomToheight(value[1]);
    const pointToBill =earth.camera.zoomToheight(value[0]);
    this._pointConfigure.distanceDisplayCondition.near = pointToBill
    this._billboardConfigure.distanceDisplayCondition.far = pointToBill
    this._billboardConfigure.distanceDisplayCondition.near = modelToBill
    this._modelConfigure.distanceDisplayCondition.far = modelToBill
    this._layerConfigure.far = modelToBill;
  }
  private _leadLine: boolean;
  public get leadLine(): boolean {
    return this._leadLine;
  }
  public set leadLine(value: boolean) {
    this._leadLine = value;
  }
  private _mark: boolean;
  public get mark(): boolean {
    return this._mark;
  }
  public set mark(value: boolean) {
    this._mark = value;
  }
  private _earth: any;
  public get earth(): any {
    return this._earth;
  }
  public set earth(earth: any) {
    this._earth = earth;
  }
  private _modelCenter: boolean;
  public get modelCenter(): boolean {
    return this._modelCenter;
  }
  public set modelCenter(value: boolean) {
    this._modelCenter = value;
  }
  private _modelHeight: number;
  public get modelHeight(): number {
    return this._modelHeight;
  }
  public set modelHeight(value: number) {
    this._modelHeight = value;
  }
  private _smooth: boolean;
  public get smooth(): boolean {
    return this._smooth;
  }
  public set smooth(value: boolean) {
    this._smooth = value;
  }

  constructor(options, earth) {
    this._earth = earth
    this._state = { loadState: 0 }
    this.init(options);
  }
  init(json) {
    this._state.loadState = 0;
    const earth = this._earth
    const layerCon = json.layer;
    const historyCon = json.history;
    this._layerConfigure = layerCon;
    this._historyConfigure = historyCon;
    const entityConfigure = json.moveEntity;
    this._billboardConfigure = entityConfigure.billboardOptions;
    this._pointConfigure = entityConfigure.pointOptions;
    this._modelConfigure = entityConfigure.modelOptions;
    this._markConfigure = entityConfigure.markOptions;
    this._leadLineConfigure = entityConfigure.leadLineOptions;
    const pointToBill = Math.floor(earth.camera.heightTozoom(this._pointConfigure.distanceDisplayCondition.near));
    const billToModel = Math.floor(earth.camera.heightTozoom(this._modelConfigure.distanceDisplayCondition.far));
    this._displayRange = [pointToBill, billToModel];
    this._modelCenter = entityConfigure.modelCenter;
    this._fixModel = entityConfigure.fixModel;
    this._modelHeight = entityConfigure.modelHeight
    this._leadLine=false;
    this._fixBillboard =entityConfigure.fixBillboard
    this._mark = false;
    this._state.loadState = 1;
  }
}
export default TsEditor;

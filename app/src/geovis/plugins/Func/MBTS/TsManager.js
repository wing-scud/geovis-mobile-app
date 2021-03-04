import html2canvas from "html2canvas";
class TsManager {
  constructor(earth, editor) {
    this._earth = earth;
    this._moveEntities = new Map();
    this._editor = editor;
    this._cameraModel = "free";
    this._currMoveEntity = undefined;
    this._history = undefined;
    this._type = undefined
    this.init();
  }
  get type(){
    return this._type;
  }
  set type(value){
    this._type =value;
  }
  get history() {
    return this._history;
  }
  get cameraModel() {
    return this._cameraModel;
  }
  set cameraModel(model) {
    this.changeCameraModel(model);
    this._cameraModel = model;
  }
  get editor() {
    return this._editor;
  }
  set editor(editor) {
    this._editor = editor;
    this.init();
  }
  get currMoveEntity() {
    return this._currMoveEntity;
  }
  set currMoveEntity(value) {
    this._currMoveEntity = value;
    this.changeCameraModel(this._cameraModel);
  }
  get moveEntities() {
    return this._moveEntities;
  }
  init() {
    const editor = this._editor;
    this._layerConfigure = editor.layerConfigure;
    this._historyConfigure = this.transformConfigure(editor.historyConfigure);
    this._moveEntityConfigure = {
      modelOptions: this.transformConfigure(editor.modelConfigure),
      pointOptions: this.transformConfigure(editor.pointConfigure),
      billboardOptions: this.transformConfigure(editor.billboardConfigure),
      markOptions: this.transformConfigure(editor.markConfigure),
      leadLineOptions: this.transformConfigure(editor.leadLineConfigure),
      fixModel: new GeoVis.HeadingPitchRoll(GeoVis.Math.toRadians(editor.fixModel[0]), GeoVis.Math.toRadians(editor.fixModel[1]), GeoVis.Math.toRadians(editor.fixModel[2])),
      fixBillboard: editor.fixBillboard,
      modelHeight: editor.modelHeight,
      modelCenter: editor.modelCenter
    };
    this._earth.features.tileMap.modelDisplayCondition = new GeoVis.DistanceDisplayCondition(this._layerConfigure.near, this._layerConfigure.far);
    this._history = new GeoVis.HistoryTrack(earth, this._earth.clock, this._historyConfigure);
  }
  contain(id) {
    return this._moveEntities.has(id);
  }
  updateMoveEntity(id, lonlat) {
    const moveEntity = this._moveEntities.get(id);
    moveEntity.lonlat = lonlat;
  }
  setCurrTime(time) {
    this._history.setCurrTime(GeoVis.JulianDate.fromDate(time));
  }
  addMoveEntity(obj) {
    const configure = this._moveEntityConfigure;
    //读取配置添加
    const earth = this._earth;
    const lon = obj.lon;
    const lat = obj.lat;
    const alt = obj.alt;
    const other = {
      id: obj.id,
      attribute: obj.attribute,
      visible: true
    };
    if (obj.type && configure.modelOptions.urls[obj.type]) {
      configure.modelOptions.url = configure.modelOptions.urls[obj.type];
      configure.billboardOptions.image = configure.billboardOptions.images[obj.type];
    } else {
      configure.modelOptions.url = configure.modelOptions.urls["default"];
      configure.billboardOptions.image = configure.billboardOptions.images["default"];
    }
    const moveEntity = new GeoVis.MoveEntity([lon, lat, alt], Object.assign(configure, other, other));
    moveEntity.addTo(earth.features);
    this._moveEntities.set(obj.id, moveEntity);
    if (this._editor.mark) {
      moveEntity.mark = true;
    }
    if (this._editor.leadLine) {
      moveEntity.leadLine = true;
    }
    return moveEntity;
  }
  setMoveEntityHis(id, data) {
    const moveEntity = this._moveEntities.get(id);
    if (moveEntity) {
      this._history.addEntity(moveEntity, data);
    }
  }
  showHistoryPath(id) {
    this._history.addTotalPathById(id);
    //this._history.addPassedPathById(id)
  }
  removeHistoryPath(id) {
    this._history.clearTotalPathById(id);
  }
  openHistory(id) {
    const historyTrack = this._history;
    if (historyTrack.hasOwnEntity(id)) {
      const interval = historyTrack.getProperties(id);
      historyTrack.setCurrTime(interval.start);
      historyTrack.open(id);
    }
  }
  isOpenHistory(id) {
    const historyTrack = this._history;
    if (historyTrack.hasOwnEntity(id)) {
      return historyTrack.isOpen(id);
    }
    return false;
  }
  closeHistory(id) {
    //this._history.clearTotalPathById(id);
    this._history.close(id);
    this._earth.trackedEntity = undefined;
  }
  pickMoveEntity(e) {
    const obj = e.pickedObj;
    let id;
    if (obj) {
      const array = obj.id.split("_");
      if (array && ["m", "b", "p"].indexOf(array[1]) !== -1) {
        id = array[0];
        return this._moveEntities.get(id);
      }
    }
  }
  track(value) {
    const id = this._currMoveEntity.id;
    if (value) {
      this._earth.trackedEntity = this._moveEntities.get(id);
    } else {
      this._earth.trackedEntity = undefined;
    }
  }
  setClockMultipiler(newValue) {
    this._history.speed = newValue;
  }
  clearAll() {
    this._history.clearAll();
    this._moveEntities.forEach(moveEntity => {
      moveEntity.removeFrom(this._earth.features);
      this._moveEntities.delete(moveEntity.id);
    });
    this._cameraModel = "free";
    this._currMoveEntity = undefined;
    this._earth.trackedEntity = undefined;
    if (this._cameraCallback) {
      this._cameraCallback();
    }
  }
  transformConfigure(configure) {
    const result = Object.assign({}, configure);
    Array.from(Object.keys(configure)).map(key => {
      if (["color", "fillColor", "totalPathColor", "pointColor", "passedPathColor"].includes(key)) {
        result[key] = GeoVis.Color.fromCssString(configure[key]);
      }
      if ("distanceDisplayCondition" === key) {
        result.distanceDisplayCondition = new GeoVis.DistanceDisplayCondition(configure.distanceDisplayCondition.near, configure.distanceDisplayCondition.far);
      }
      if ("pixelOffset" === key) {
        result["pixelOffset"] = new GeoVis.Cartesian2(configure.pixelOffset[0], configure.pixelOffset[1]);
      }
    });
    return result;
  }
  showMarker(id, value) {
    const moveEntity = this._moveEntities.get(id);
    const marker = moveEntity.accompanyPrimitives.get(id + "marker");
    if (marker) {
      marker.show = value;
    } else {
      if (this.type) {
        this.addLiveMarker(id);
      } else {
        this.addHisoryMarker(id);
      }
    }
  }
  addHisoryMarker(id) {
    const moveEntity = this._moveEntities.get(id);
    let airline = moveEntity.attribute.airline;
    airline = airline ? airline : "暂无信息";
    let type = moveEntity.attribute.model[1];
    type = type ? type : "暂无信息";
    const popupDiv = document.createElement("div");
    popupDiv.className = "geovis-custom";
    popupDiv.innerHTML =
      `<div class="geovis-custom-popup">
        <div class="geovis-custom-popup-wrap">
            <div class="geovis-custom-popup-content">
                <span>航线:` +
      airline +
      `<br> </span>
                <span>机型` +
      type +
      `</span>
                <div class="label-content"></div>
            </div>
        </div>
        <div class="gv-marker-line"></div>
    </div> `;
    document.body.appendChild(popupDiv);
    html2canvas(popupDiv, {
      backgroundColor: "transparent",
      scale: 1,
      dpi: 100
    }).then(canvas => {
      const billboard = new GeoVis.Billboard([0, 0, 0], {
        image: canvas,
        width: popupDiv.clientWidth / 2.5,
        height: popupDiv.clientHeight / 2.5,
        pixelOffset: new GeoVis.Cartesian2(-10, -10),
        pixelOffsetScaleByDistance: new GeoVis.NearFarScalar(1, 50, 1e4, 1),
        // disableDepthTestDistance: 1e8,
        horizontalOrigin: GeoVis.HorizontalOrigin.RIGHT,
        verticalOrigin: GeoVis.VerticalOrigin.BOTTOM
      });
      moveEntity.addCompanion(id + "marker", billboard);
      document.body.removeChild(popupDiv);
    });
  }
  addLiveMarker(id) {
    const moveEntity = this._moveEntities.get(id);
    let value;
    moveEntity.attribute && (value = moveEntity.attribute);
    const gj = moveEntity.attribute.gjdq;
    const type = moveEntity.attribute.mblb;
    const xz = moveEntity.attribute.mbxz;
    const popupDiv = document.createElement("div");
    popupDiv.className = "geovis-custom";
    popupDiv.innerHTML =
      `<div class="custom-live">
      <div class="custom-title">` +
      id +
      `</div>
      <table class="custom-content">
          <tr>
              <td>类型:</td>
              <td>` +
      type +
      `</td>
          </tr>
          <tr>
              <td>所属国家:</td>
              <td>` +
      gj +
      `</td>
          </tr>
          <tr>
              <td>作用:</td>
              <td>` +
      xz +
      `</td>
          </tr>
      </table>
  </div> `;
    document.body.appendChild(popupDiv);
    html2canvas(popupDiv, {
      backgroundColor: "transparent",
      scale: 1,
      dpi: 100
    }).then(canvas => {
      // document.body.appendChild(canvas);
      const billboard = new GeoVis.Billboard([0, 0, 0], {
        image: canvas,
        width: popupDiv.clientWidth / 1.5,
        height: popupDiv.clientHeight / 1.5,
        pixelOffset: new GeoVis.Cartesian2(-10, -10),
        pixelOffsetScaleByDistance: new GeoVis.NearFarScalar(1, 50, 1e4, 1),
        // disableDepthTestDistance: 1e8,
        horizontalOrigin: GeoVis.HorizontalOrigin.RIGHT,
        verticalOrigin: GeoVis.VerticalOrigin.BOTTOM
      });
      moveEntity.addCompanion(id + "marker", billboard);
      document.body.removeChild(popupDiv);
    });
  }
  changeCameraModel(model) {
    const earth = this._earth;
    const cameraCallback = this._cameraCallback;
    const camera = this._earth.camera;
    const oldModel = this._cameraModel;
    const id = this._currMoveEntity.id;
    const moveEntity = this._moveEntities.get(id);
    const oldIndex = ["free", "track", "trail", "head", "side"].indexOf(oldModel);
    if (oldIndex === 1) {
      this._earth.trackedEntity = undefined;
    } else if (1 < oldIndex && oldIndex < 5) {
      cameraCallback();
      camera.lookAtTransform(GeoVis.Matrix4.IDENTITY);
    }
    this._cameraModel = model;
    const index = ["free", "track", "trail", "head", "side"].indexOf(model);
    if (index === 1) {
      //触发camera change，使动目标加载模型
      camera.setView({
        destination: moveEntity.position
      });
      this._earth.trackedEntity = moveEntity;
    } else if (1 < index && index < 5) {
      const _addViewListener = () => {
        const type = this._cameraModel;
        const id = this._currMoveEntity.id;
        const moveEntity = this._moveEntities.get(id);
        const camera = this._earth.camera;
        const position = moveEntity.position;
        let matrix4,
          radius = 500;
        if (moveEntity.model) {
          matrix4 = moveEntity.model.modelMatrix;
          moveEntity.model.readyPromise.then(() => {
            radius = moveEntity.model.boundingSphere.radius;
          });
        } else {
          radius = 500;
          matrix4 = GeoVis.Transforms.eastNorthUpToFixedFrame(position);
        }
        const hpr = GeoVis.Transforms.fixedFrameToHeadingPitchRoll(matrix4);
        if (type === "head") {
          camera.lookAt(position, new GeoVis.HeadingPitchRange(hpr.heading - Math.PI / 2, hpr.pitch - GeoVis.Math.toRadians(35), radius * 5));
          // camera.lookAtTransform(matrix4, new GeoVis.Cartesian3(radius, 0, radius * 5));
          // camera.setView({
          //   orientation: {
          //     heading: hpr.heading + Math.PI / 2,
          //     pitch: hpr.pitch
          //   }
          // });
        } else if (type === "side") {
          camera.lookAt(position, new GeoVis.HeadingPitchRange(hpr.heading, GeoVis.Math.toRadians(-60), radius * 5));
          // camera.lookAtTransform(matrix4, new GeoVis.Cartesian3(radius, 0, radius * 5));
          // camera.setView({
          //   orientation: {
          //     heading: hpr.heading,
          //     pitch: hpr.pitch
          //   }
          // });
        } else {
          // +90度 因为机头初始加载为90方向，模型方向比相机方向舵90度
          // 俯视
          camera.lookAt(position, new GeoVis.HeadingPitchRange(hpr.heading + Math.PI / 2, hpr.pitch - GeoVis.Math.toRadians(35), radius * 5));
        }
      };
      this._cameraCallback = earth.clock.onTick.addEventListener(_addViewListener);
    }
  }
  clearMarker(id) {
    const moveEntity = this._moveEntities.get(id);
    moveEntity.removeCompanion(id + "marker");
  }
  setPointPixelSize() {
    const editor = this._editor;
    this._moveEntityConfigure.pointOptions = this.transformConfigure(editor.pointConfigure);
    const pixelSize = editor._pointConfigure.pixelSize;
    this._moveEntities.forEach(moveEntity => {
      if (moveEntity.point) {
        moveEntity.point.pixelSize = pixelSize;
      }
      moveEntity.pointOptions.pixelSize = pixelSize;
    });
  }
  setPointColor() {
    const editor = this._editor;
    this._moveEntityConfigure.pointOptions = this.transformConfigure(editor.pointConfigure);
    const color = GeoVis.Color.fromCssString(editor._pointConfigure.color);
    this._moveEntities.forEach(moveEntity => {
      if (moveEntity.point) {
        moveEntity.point.color = color;
      }
      moveEntity.pointOptions.color = color;
    });
  }
  setBillboardScale() {
    const editor = this._editor;
    this._moveEntityConfigure.billboardOptions = this.transformConfigure(editor.billboardConfigure);
    const scale = editor._billboardConfigure.scale;
    this._moveEntities.forEach(moveEntity => {
      if (moveEntity.billboard) {
        moveEntity.billboard.scale = scale;
      }
      moveEntity.billboardOptions.scale = scale;
    });
  }
  setModelScale() {
    const editor = this._editor;
    this._moveEntityConfigure.modelOptions = this.transformConfigure(editor.modelConfigure);
    const scale = editor._modelConfigure.scale;
    this._moveEntities.forEach(moveEntity => {
      if (moveEntity.model) {
        moveEntity.model.scale = scale;
      }
      moveEntity.modelOptions.scale = scale;
    });
  }
  setHistoryWidth() {
    const editor = this._editor;
    this._historyConfigure = this.transformConfigure(editor.historyConfigure);
    const width = editor._historyConfigure.totalPathWidth;
    const history = this._history;
    history.totalPathWidth = width;
  }
  setHistoryColor() {
    const editor = this._editor;
    this._historyConfigure = this.transformConfigure(editor.historyConfigure);
    const color = GeoVis.Color.fromCssString(editor._historyConfigure.totalPathColor);
    const history = this._history;
    history.totalPathColor = color;
  }
  setMarkScale() {
    const editor = this._editor;
    this._moveEntityConfigure.markOptions = this.transformConfigure(editor.markConfigure);
    const scale = editor._markConfigure.scale;
    this._moveEntities.forEach(moveEntity => {
      if (moveEntity._leadLinePrimitive) {
        moveEntity._markPrimitive.scale = scale;
      }
      moveEntity._markOptions.scale = scale;
    });
  }
  setMarkColor() {
    const editor = this._editor;
    this._moveEntityConfigure.markOptions = this.transformConfigure(editor.markConfigure);
    const color = GeoVis.Color.fromCssString(editor._markConfigure.fillColor);
    this._moveEntities.forEach(moveEntity => {
      if (moveEntity._leadLinePrimitive) {
        moveEntity._markPrimitive.fillColor = color;
      }
      moveEntity._markOptions.fillColor = color;
    });
  }
  setLeadLineWidth() {
    const editor = this._editor;
    this._moveEntityConfigure.leadLineOptions = this.transformConfigure(editor.leadLineConfigure);
    const width = editor._leadLineConfigure.width;
    this._moveEntities.forEach(moveEntity => {
      moveEntity._leadLineOptions.width = width;
      if (moveEntity._leadLinePrimitive) {
        moveEntity.leadLine = false;
        moveEntity.leadLine = true;
      }
    });
  }
  setLeadLineColor() {
    const editor = this._editor;
    this._moveEntityConfigure.leadLineOptions = this.transformConfigure(editor.leadLineConfigure);
    const color = GeoVis.Color.fromCssString(editor.leadLineConfigure.color);
    this._moveEntities.forEach(moveEntity => {
      moveEntity._leadLineOptions.color = color;
      if (moveEntity._leadLinePrimitive) {
        //直接设置true是否触发addline
        moveEntity.leadLine = false;
        moveEntity.leadLine = true;
      }
    });
  }
  setModelToBillboard() {
    //修改了model的显影，tilemap需要重新编码
    const editor = this._editor;
    const billboardDisplay = new GeoVis.DistanceDisplayCondition(editor._billboardConfigure.distanceDisplayCondition.near, editor._billboardConfigure.distanceDisplayCondition.far);
    const modelDisplay = new GeoVis.DistanceDisplayCondition(editor._modelConfigure.distanceDisplayCondition.near, editor._modelConfigure.distanceDisplayCondition.far);
    //update tilemap
    this._layerConfigure = editor.layerConfigure;
    this._moveEntityConfigure.modelOptions.distanceDisplayCondition = modelDisplay;
    this._moveEntityConfigure.billboardOptions.distanceDisplayCondition = billboardDisplay;
    const tileMap = this._earth.features.tileMap;
    tileMap.modelDisplayCondition = modelDisplay;
    //更新所有displaycondition
    this._moveEntities.forEach(moveEntity => {
      moveEntity._modelOptions.distanceDisplayCondition = modelDisplay;
      moveEntity._billboardOptions.distanceDisplayCondition = billboardDisplay;
      if (moveEntity.billboard) {
        moveEntity.billboard.distanceDisplayCondition = billboardDisplay;
      }
      if (moveEntity.model) {
        moveEntity.model.distanceDisplayCondition = modelDisplay;
      }
    });
  }
  setBillboardToPoint() {
    const editor = this._editor;
    const billboardDisplay = new GeoVis.DistanceDisplayCondition(editor._billboardConfigure.distanceDisplayCondition.near, editor._billboardConfigure.distanceDisplayCondition.far);
    const pointDisplay = new GeoVis.DistanceDisplayCondition(editor._pointConfigure.distanceDisplayCondition.near, editor._pointConfigure.distanceDisplayCondition.far);
    //更新所有displaycondition
    this._moveEntityConfigure.pointOptions.distanceDisplayCondition = pointDisplay;
    this._moveEntityConfigure.billboardOptions.distanceDisplayCondition = billboardDisplay;
    this._moveEntities.forEach(moveEntity => {
      moveEntity._billboardOptions.distanceDisplayCondition = billboardDisplay;
      moveEntity._pointOptions.distanceDisplayCondition = pointDisplay;
      if (moveEntity.point) {
        moveEntity.point._primitive.distanceDisplayCondition = pointDisplay;
      }
      if (moveEntity.billboard) {
        moveEntity.billboard.distanceDisplayCondition = billboardDisplay;
      }
    });
  }
  setBillboardWidth() {
    const editor = this._editor;
    const width = editor._billboardConfigure.width;
    this._moveEntityConfigure.billboardOptions = this.transformConfigure(editor.billboardConfigure);
    this._moveEntities.forEach(moveEntity => {
      if (moveEntity.billboard) {
        moveEntity.billboard.width = width;
      }
      moveEntity._billboardOptions.width = width;
    });
  }
  setBillboardHeight() {
    const editor = this._editor;
    const height = editor._billboardConfigure.height;
    this._moveEntityConfigure.billboardOptions = this.transformConfigure(editor.billboardConfigure);
    this._moveEntities.forEach(moveEntity => {
      if (moveEntity.billboard) {
        moveEntity.billboard.height = height;
      }
      moveEntity._billboardOptions.height = height;
    });
  }
  setLeadLine(bool) {
    const editor = this._editor;
    editor.leadLine = bool;
    this._moveEntities.forEach(moveEntity => {
      moveEntity.leadLine = bool;
    });
  }
  setLabel(bool) {
    const editor = this._editor;
    editor.mark = bool;
    this._moveEntities.forEach(moveEntity => {
      moveEntity.mark = bool;
    });
  }
  setFixModel(value) {
    this._editor.fixModel = value;
    const hpr = new GeoVis.HeadingPitchRoll(GeoVis.Math.toRadians(value[0]), GeoVis.Math.toRadians(value[1]), GeoVis.Math.toRadians(value[2]));
    this._moveEntityConfigure.fixModel = hpr;
    this._moveEntities.forEach(moveEntity => {
      moveEntity.fixModel = hpr;
    });
  }
}
export default TsManager;

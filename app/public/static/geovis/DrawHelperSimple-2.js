/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DrawHelper = undefined;

	var _main = __webpack_require__(3);

	var _main2 = _interopRequireDefault(_main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.DrawHelper = _main2.default;
	exports.DrawHelper = _main2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * DrawHelper库入口，用于实现三维场景标绘的组件库，依赖GeoVis；
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @param {earth} viewer GeoVis.earth
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


	var _export = __webpack_require__(4);

	var Plot = _interopRequireWildcard(_export);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GeoVis = window.GeoVis;

	var Main = function () {
	  function Main(viewer, options) {
	    _classCallCheck(this, Main);

	    _initialiseProps.call(this);

	    options = options || {};
	    this._earth = viewer;
	    this._scene = viewer.scene;
	    this._tooltip = new Plot.Tooltip(viewer._container);
	    this._surfaces = [];
	    this._primitives = this._scene.primitives.add(new Plot.PrimitiveCollection());
	    this._tempPrimitives = this._scene.primitives.add(new GeoVis.PrimitiveCollection());
	    this._groundPrimitives = this._scene.groundPrimitives.add(new Plot.PrimitiveCollection());
	    this._editor = new Plot.Editor(this);
	    this._sceneInfor = new Plot.SceneInfor({});
	    this.keyState = {
	      ctrlKey: false
	    };
	    this.points = new Plot.PointGroup(this, Plot.defaultPoint);
	    this.features = new GeoVis.FeatureGroup().addTo(viewer);
	    this.features.Main = this;
	    this.initialiseHandlers();
	    this.removeObj = { billBoard: [], primitives: [], groundPrimitives: [] };
	    this.PLOT_SERVER_URL = window.PLOT_SERVER_URL = options.server || "http://localhost:8001";
	    this._measureTool = new Plot.MeasureTool(this);
	    this._plotCopy = new Plot.PlotCopy(this);
	    this.dragging = false;
	  }

	  _createClass(Main, [{
	    key: "destroy",
	    value: function destroy() {
	      this.removeAll();
	      this._earth.off("click", this.clickEvent);
	      this._earth.off("rightClick", this.rightClickEvent);
	      this._earth.off("doubleClick", this.doubleClickEvent);
	      this._earth.off("leftUp", this.leftUpEvent);
	      this._earth.off("leftDown", this.leftDownEvent);
	      this._earth.off("mouseMove", this.mouseMoveEvent);
	      this._earth.scene.primitives.remove(this._tempPrimitives);
	      this._earth.scene.primitives.remove(this.primitives);
	      this._earth.scene.primitives.remove(this.groundPrimitives);
	      window.removeEventListener("click", this.updateKeyState);
	      this.features.removeAll();
	    }
	  }, {
	    key: "resetScene",

	    /**
	     * 重置场景信息
	     */
	    value: function resetScene(options) {
	      this._sceneInfor = new Plot.SceneInfor(options);
	    }
	    /**
	     * 清除所有图形和监听
	     */

	  }, {
	    key: "removeAll",
	    value: function removeAll() {
	      this._editor.removeAll();
	      this.stopDrawing();
	      this._measureTool.removeAll();
	      var primitiveLength = this.removeObj.primitives.length;
	      var groundprimitiveLength = this.removeObj.groundPrimitives.length;
	      var billboardLength = this.removeObj.billBoard.length;

	      this.features.removeAll();
	      for (var i = 0; i < primitiveLength; i++) {
	        var primi = this.removeObj.primitives.pop();
	        this._primitives.remove(primi);
	      }
	      for (var j = 0; j < groundprimitiveLength; j++) {
	        var groundprimi = this.removeObj.groundPrimitives.pop();
	        this._groundPrimitives.remove(groundprimi);
	      }
	      for (i = 0; i < billboardLength; i++) {
	        this.removeObj.billBoard.pop().remove();
	      }this._primitives._primitives.forEach(function (pri) {
	        try {
	          pri._globeClickhandler && !pri._globeClickhandler.isDestroyed() && pri._globeClickhandler.destroy();
	        } catch (e) {
	          console.log(e);
	        }
	      });
	      this._primitives.removeAll();
	      this._groundPrimitives.removeAll();
	      this._tempPrimitives.removeAll();
	      this.points = new Plot.PointGroup(this, Plot.defaultPoint);
	      this.resetScene({});

	      this.fire("removeAll");
	    }
	  }, {
	    key: "primitives",
	    get: function get() {
	      return this._primitives;
	    }
	  }, {
	    key: "groundPrimitives",
	    get: function get() {
	      return this._groundPrimitives;
	    }
	  }, {
	    key: "tempPrimitives",
	    get: function get() {
	      return this._tempPrimitives;
	    }
	  }]);

	  return Main;
	}();

	var _initialiseProps = function _initialiseProps() {
	  var _this = this;

	  this.muteHandlers = function (muted) {
	    this._handlersMuted = muted;
	  };

	  this.startDrawing = function (cleanUp) {
	    _this._editor.disableAllEditMode();
	    _this._editor.disableAllHighlights();
	    if (_this.editCleanUp) {
	      _this.editCleanUp();
	    }
	    _this.editCleanUp = cleanUp;
	    _this.muteHandlers(true);
	  };

	  this.stopDrawing = function () {
	    if (_this.editCleanUp) {
	      _this.editCleanUp();
	      _this.editCleanUp = null;
	    }
	    _this.muteHandlers(false);
	  };

	  this.createBillboardGroup = function (point, options, callbacks) {
	    var points = new Main.PointGroup(_this, options);
	    points.addPoints(point, callbacks);
	    return points;
	  };

	  this.updateKeyState = function (state) {
	    _this.keyState = state;
	  };

	  this.updateTerrain = function () {
	    var Main = _this;
	    _this._editor.disableAllEditMode();
	    _this._editor.disableAllHighlights();
	    var carto = Plot.getTerrianCarto(Main);
	    var terrainProvider = _this._earth.scene.terrainProvider;
	    if (terrainProvider instanceof GeoVis.EllipsoidTerrainProvider) {
	      carto.map(function (car) {
	        car.height = 0;
	      });
	      Plot.setTerrianCarto(Main, carto);
	    } else if (terrainProvider instanceof GeoVis.GeoserverTerrainProvider) {
	      var promise = GeoVis.sampleTerrainMostDetailed(terrainProvider, carto);
	      GeoVis.when(promise, function (samples) {
	        Plot.setTerrianCarto(Main, samples);
	      });
	    }
	  };

	  this.callPrimitiveCallback = function (name, event) {
	    if (_this._handlersMuted === true) return;
	    var pickedObject = event.pickedObj;
	    if (pickedObject && pickedObject["primitive"]) {
	      pickedObject = pickedObject["primitive"];
	    }
	    if (pickedObject && pickedObject[name]) {
	      pickedObject[name]({
	        x: event.windowPosition[0],
	        y: event.windowPosition[1]
	      });
	    }
	  };

	  this.clickEvent = function (event) {
	    _this.callPrimitiveCallback("leftClick", event);
	  };

	  this.rightClickEvent = function (event) {
	    _this.callPrimitiveCallback("rightClick", event);
	  };

	  this.doubleClickEvent = function (event) {
	    _this.callPrimitiveCallback("leftDoubleClick", event);
	  };

	  this.leftUpEvent = function (event) {
	    _this.callPrimitiveCallback("leftUp", event);
	  };

	  this.leftDownEvent = function (event) {
	    _this.callPrimitiveCallback("leftDown", event);
	  };

	  this.mouseMoveEvent = function (event) {
	    if (_this.mouseOutObject) {
	      _this.mouseOutObject.mouseMove({
	        x: event.windowPosition[0],
	        y: event.windowPosition[1]
	      });
	    }
	    if (_this._handlersMuted === true || _this.dragging) return;
	    var pickedObject = event.pickedObj;
	    if (pickedObject && pickedObject["primitive"]) {
	      pickedObject = pickedObject["primitive"];
	    }
	    if (_this.mouseOutObject && (!pickedObject || _this.mouseOutObject !== pickedObject)) {
	      !(_this.mouseOutObject.isDestroyed && _this.mouseOutObject.isDestroyed()) && _this.mouseOutObject.mouseOut({
	        x: event.windowPosition[0],
	        y: event.windowPosition[1]
	      });
	      _this.mouseOutObject = null;
	    }
	    if (pickedObject) {
	      // pickedObject = pickedObject.primitive;
	      if (pickedObject.mouseOut) {
	        _this.mouseOutObject = pickedObject;
	      }
	      if (pickedObject.mouseMove) {
	        pickedObject.mouseMove({
	          x: event.windowPosition[0],
	          y: event.windowPosition[1]
	        });
	      }
	    }
	  };

	  this.initialiseHandlers = function () {
	    _this._earth.on("click", _this.clickEvent);
	    _this._earth.on("rightClick", _this.rightClickEvent);
	    _this._earth.on("doubleClick", _this.doubleClickEvent);
	    _this._earth.on("leftUp", _this.leftUpEvent);
	    _this._earth.on("leftDown", _this.leftDownEvent);
	    _this._earth.on("mouseMove", _this.mouseMoveEvent);

	    window.addEventListener("click", _this.updateKeyState);
	  };

	  this.startDrawingVisibility = Plot.startDrawingVisibility;
	  this.startDrawingCircle = Plot.startDrawingCircle;
	  this.startDrawingWall = Plot.startDrawingWall;
	  this.startDrawingPolygon = Plot.startDrawingPolygon;
	  this.startDrawingPolyline = Plot.startDrawingPolyline;
	  this.startDrawingPolyshape = Plot.startDrawingPolyshape;
	  this.startDrawingAngle = Plot.startDrawingAngle;
	  this.startDrawingCutFill = Plot.startDrawingCutFill;
	  this.startDrawingVisibility = Plot.startDrawingVisibility;
	  this.startDrawingMarker = Plot.startDrawingMarker;
	  this.startDrawingRect = Plot.startDrawingRect;
	  this.startDrawingDragMarker = Plot.startDrawingDragMarker;
	  this.startDrawingGroundText = Plot.startDrawingGroundText;
	  this.serialize = Plot.serialize;
	  this.unserialize = Plot.unserialize;
	  this.serializeEntity = Plot.serializeEntity;
	  this.loadScene = Plot.loadScene;
	  this.serializeScene = Plot.serializeScene;
	  this.unserializeScene = Plot.unserializeScene;
	  this.unserializeEntity = Plot.unserializeEntity;
	};

	Main.PointGroup = Plot.PointGroup;
	Main.Widget = Plot.Widget;
	Main.PolygonPrimitive = Plot.PolygonPrimitive;
	Main.PolylinePrimitive = Plot.PolylinePrimitive;
	Main.CirclePrimitive = Plot.CirclePrimitive;
	Main.RectPrimitive = Plot.RectPrimitive;
	Main.WallPrimitive = Plot.WallPrimitive;
	Main.TextMarker = Plot.TextMarker;
	Main.GroundTextPrimitive = Plot.GroundTextPrimitive;
	Main.ImageMarker = Plot.ImageMarker;
	Main.GroundPolylinePrimitive = Plot.GroundPolylinePrimitive;
	Main.MarkerPrimitive = Plot.MarkerPrimitive;
	Main.computeArea = Plot.computeArea;
	Main.computeDistance = Plot.computeDistance;
	Main.getCentroid = Plot.getCentroid;
	Main.Types = _Types2.default;
	Main.ExtendProps = Plot.ExtendProps;

	exports.default = Plot.wrapEvented(Main);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _util = __webpack_require__(5);

	Object.defineProperty(exports, "copyOptions", {
	  enumerable: true,
	  get: function get() {
	    return _util.copyOptions;
	  }
	});

	var _Widget = __webpack_require__(7);

	Object.defineProperty(exports, "Widget", {
	  enumerable: true,
	  get: function get() {
	    return _Widget.Widget;
	  }
	});

	var _Tooltip = __webpack_require__(8);

	Object.defineProperty(exports, "Tooltip", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Tooltip).default;
	  }
	});

	var _wrapEvented = __webpack_require__(9);

	Object.defineProperty(exports, "wrapEvented", {
	  enumerable: true,
	  get: function get() {
	    return _wrapEvented.wrapEvented;
	  }
	});

	var _compute = __webpack_require__(10);

	Object.defineProperty(exports, "computeArea", {
	  enumerable: true,
	  get: function get() {
	    return _compute.computeArea;
	  }
	});
	Object.defineProperty(exports, "computeDistance", {
	  enumerable: true,
	  get: function get() {
	    return _compute.computeDistance;
	  }
	});
	Object.defineProperty(exports, "getCentroid", {
	  enumerable: true,
	  get: function get() {
	    return _compute.getCentroid;
	  }
	});

	var _config = __webpack_require__(6);

	Object.defineProperty(exports, "defaultPoint", {
	  enumerable: true,
	  get: function get() {
	    return _config.defaultPoint;
	  }
	});

	var _serialize = __webpack_require__(12);

	Object.defineProperty(exports, "serializeEntity", {
	  enumerable: true,
	  get: function get() {
	    return _serialize.serializeEntity;
	  }
	});
	Object.defineProperty(exports, "unserializeEntity", {
	  enumerable: true,
	  get: function get() {
	    return _serialize.unserializeEntity;
	  }
	});
	Object.defineProperty(exports, "serialize", {
	  enumerable: true,
	  get: function get() {
	    return _serialize.serialize;
	  }
	});
	Object.defineProperty(exports, "unserialize", {
	  enumerable: true,
	  get: function get() {
	    return _serialize.unserialize;
	  }
	});

	var _save_scene = __webpack_require__(51);

	Object.defineProperty(exports, "serializeScene", {
	  enumerable: true,
	  get: function get() {
	    return _save_scene.serializeScene;
	  }
	});
	Object.defineProperty(exports, "unserializeScene", {
	  enumerable: true,
	  get: function get() {
	    return _save_scene.unserializeScene;
	  }
	});

	var _Util = __webpack_require__(23);

	Object.defineProperty(exports, "getTerrianCarto", {
	  enumerable: true,
	  get: function get() {
	    return _Util.getTerrianCarto;
	  }
	});
	Object.defineProperty(exports, "setTerrianCarto", {
	  enumerable: true,
	  get: function get() {
	    return _Util.setTerrianCarto;
	  }
	});

	var _serialize2 = __webpack_require__(55);

	Object.defineProperty(exports, "loadScene", {
	  enumerable: true,
	  get: function get() {
	    return _serialize2.loadScene;
	  }
	});

	var _PointGroup = __webpack_require__(58);

	Object.defineProperty(exports, "PointGroup", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PointGroup).default;
	  }
	});

	var _PrimitiveCollection = __webpack_require__(59);

	Object.defineProperty(exports, "PrimitiveCollection", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PrimitiveCollection).default;
	  }
	});

	var _Scene = __webpack_require__(52);

	Object.defineProperty(exports, "SceneInfor", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Scene).default;
	  }
	});

	var _Editor = __webpack_require__(60);

	Object.defineProperty(exports, "Editor", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Editor).default;
	  }
	});

	var _MeasureTool = __webpack_require__(70);

	Object.defineProperty(exports, "MeasureTool", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_MeasureTool).default;
	  }
	});

	var _PlotCopy = __webpack_require__(71);

	Object.defineProperty(exports, "PlotCopy", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PlotCopy).default;
	  }
	});

	var _Polygon = __webpack_require__(18);

	Object.defineProperty(exports, "PolygonPrimitive", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Polygon).default;
	  }
	});

	var _Polyline = __webpack_require__(32);

	Object.defineProperty(exports, "PolylinePrimitive", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Polyline).default;
	  }
	});

	var _GroundPolyline = __webpack_require__(31);

	Object.defineProperty(exports, "GroundPolylinePrimitive", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_GroundPolyline).default;
	  }
	});

	var _Circle = __webpack_require__(37);

	Object.defineProperty(exports, "CirclePrimitive", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Circle).default;
	  }
	});

	var _Wall = __webpack_require__(26);

	Object.defineProperty(exports, "WallPrimitive", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Wall).default;
	  }
	});

	var _Rectangle = __webpack_require__(40);

	Object.defineProperty(exports, "RectPrimitive", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Rectangle).default;
	  }
	});

	var _Marker = __webpack_require__(49);

	Object.defineProperty(exports, "MarkerPrimitive", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Marker).default;
	  }
	});

	var _GroundText = __webpack_require__(54);

	Object.defineProperty(exports, "GroundTextPrimitive", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_GroundText).default;
	  }
	});

	var _TextMarker = __webpack_require__(43);

	Object.defineProperty(exports, "TextMarker", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_TextMarker).default;
	  }
	});

	var _ImageMarker = __webpack_require__(48);

	Object.defineProperty(exports, "ImageMarker", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ImageMarker).default;
	  }
	});

	var _ExtendProps = __webpack_require__(34);

	Object.defineProperty(exports, "ExtendProps", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ExtendProps).default;
	  }
	});

	var _startDrawingCircle = __webpack_require__(72);

	Object.defineProperty(exports, "startDrawingCircle", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_startDrawingCircle).default;
	  }
	});

	var _startDrawingPolygon = __webpack_require__(73);

	Object.defineProperty(exports, "startDrawingPolygon", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_startDrawingPolygon).default;
	  }
	});

	var _startDrawingPolyline = __webpack_require__(74);

	Object.defineProperty(exports, "startDrawingPolyline", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_startDrawingPolyline).default;
	  }
	});

	var _startDrawingPolyshape = __webpack_require__(75);

	Object.defineProperty(exports, "startDrawingPolyshape", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_startDrawingPolyshape).default;
	  }
	});

	var _startDrawingWall = __webpack_require__(76);

	Object.defineProperty(exports, "startDrawingWall", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_startDrawingWall).default;
	  }
	});

	var _startDrawingAngle = __webpack_require__(77);

	Object.defineProperty(exports, "startDrawingAngle", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_startDrawingAngle).default;
	  }
	});

	var _startDrawingCutFill = __webpack_require__(78);

	Object.defineProperty(exports, "startDrawingCutFill", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_startDrawingCutFill).default;
	  }
	});

	var _startDrawingVisibility = __webpack_require__(79);

	Object.defineProperty(exports, "startDrawingVisibility", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_startDrawingVisibility).default;
	  }
	});

	var _startDrawingMarker = __webpack_require__(81);

	Object.defineProperty(exports, "startDrawingMarker", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_startDrawingMarker).default;
	  }
	});

	var _startDrawingRect = __webpack_require__(82);

	Object.defineProperty(exports, "startDrawingRect", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_startDrawingRect).default;
	  }
	});

	var _startDrawingDragMarker = __webpack_require__(83);

	Object.defineProperty(exports, "startDrawingDragMarker", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_startDrawingDragMarker).default;
	  }
	});

	var _startDropingIcon = __webpack_require__(85);

	Object.defineProperty(exports, "startDropingIcon", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_startDropingIcon).default;
	  }
	});

	var _startDrawingGroundText = __webpack_require__(86);

	Object.defineProperty(exports, "startDrawingGroundText", {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_startDrawingGroundText).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.enableRotation = enableRotation;
	exports.setListener = setListener;
	exports.positionToCartesian3 = positionToCartesian3;
	exports.getDistance = getDistance;
	exports.getAzimuth = getAzimuth;
	exports.cartesianToLonlat = cartesianToLonlat;
	exports.cartesianToLonlatNoHeight = cartesianToLonlatNoHeight;
	exports.getThirdPoint = getThirdPoint;
	exports.getWSG84Coor = getWSG84Coor;
	exports.getDisplayLatLngString = getDisplayLatLngString;
	exports.clone = clone;
	exports.fillOptions = fillOptions;
	exports.copyOptions = copyOptions;
	exports.extend = extend;
	exports.endsWith = endsWith;
	exports.enhanceWithListeners = enhanceWithListeners;
	exports.changeHeight = changeHeight;
	exports.getCenter = getCenter;
	exports.updateZoom = updateZoom;
	exports.updateRotation = updateRotation;
	exports.getLinPos = getLinPos;
	exports.computeBearing = computeBearing;
	exports.positionsToHeights = positionsToHeights;

	var _config = __webpack_require__(6);

	var _window = window,
	    GeoVis = _window.GeoVis;

	/**
	 * 用于开启和关闭平移过程中相机位置的变化
	 * @param {GeoVis.Earth} earth
	 * @param {Boolean} enable
	 */

	function enableRotation(earth, enable) {
	  earth.scene.screenSpaceCameraController.enableRotate = enable;
	  earth.scene.screenSpaceCameraController.enableTranslate = enable;
	}

	function setListener(primitive, type, callback) {
	  primitive[type] = callback;
	}

	/**
	 * huoqu
	 * @param {Object} positionArr [lon,lat]
	 */
	function positionToCartesian3(positionArr) {
	  var result = [];
	  for (var i = 0; i < positionArr.length; i++) {
	    var height = positionArr[i][2] ? positionArr[i][2] : 0;
	    var point = GeoVis.Cartesian3.fromDegrees(positionArr[i][0], positionArr[i][1], height);
	    result.push(point);
	  }
	  return result;
	}

	// 两点之间的距离
	function getDistance(a, b) {
	  var result = Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
	  return result;
	}
	function getAzimuth(headerPoint, tailPoint) {
	  // 传两个参数,headerPoint和tailPoint,分别是箭头顶部坐标和底部中心坐标,以数组的方式传入
	  var e;
	  // r是sin角度
	  var r = Math.asin(Math.abs(tailPoint[1] - headerPoint[1]) / getDistance(headerPoint, tailPoint));
	  return tailPoint[1] >= headerPoint[1] && headerPoint[0] >= tailPoint[0] ? e = r + Math.PI : tailPoint[1] >= headerPoint[1] && tailPoint[0] < headerPoint[0] ? e = 2 * Math.PI - r : tailPoint[1] < headerPoint[1] && tailPoint[0] < headerPoint[0] ? e = r : tailPoint[1] < headerPoint[1] && tailPoint[0] >= headerPoint[0] && (e = Math.PI - r), e;
	}

	function cartesianToLonlat(position) {
	  var carto = GeoVis.Cartographic.fromCartesian(position);
	  var lonlat = [GeoVis.Math.toDegrees(carto.longitude), GeoVis.Math.toDegrees(carto.latitude), carto.height];
	  return lonlat;
	}

	function cartesianToLonlatNoHeight(position) {
	  var carto = GeoVis.Cartographic.fromCartesian(position);
	  var lonlat = [GeoVis.Math.toDegrees(carto.longitude), GeoVis.Math.toDegrees(carto.latitude)];
	  return lonlat;
	}
	function getThirdPoint(head, tail, angle, dis, TF) {
	  var SinAngle = getAzimuth(head, tail);

	  var i = TF ? SinAngle + angle : SinAngle - angle;

	  var Xs = dis * Math.cos(i);

	  var Ya = dis * Math.sin(i);

	  var X = (tail[0] + Xs).toFixed(2);

	  var Y = (tail[1] + Ya).toFixed(2);
	  return [X, Y];
	}

	function getWSG84Coor(p, s) {
	  var viewer = window.viewer;
	  var cartesian = viewer.camera.pickEllipsoid(p, s.globe.ellipsoid);
	  var cartographic = GeoVis.Cartographic.fromCartesian(cartesian);
	  var len = GeoVis.Math.toDegrees(cartographic.longitude);
	  var lat = GeoVis.Math.toDegrees(cartographic.latitude);
	  return [lat, len];
	}

	function getDisplayLatLngString(cartographic, precision) {
	  return cartographic.longitude.toFixed(precision || 3) + ", " + cartographic.latitude.toFixed(precision || 3);
	}

	function clone(from, to) {
	  if (from == null || (typeof from === "undefined" ? "undefined" : _typeof(from)) !== "object") return from;
	  if (from.constructor !== Object && from.constructor !== Array) return from;
	  if (from.constructor === Date || from.constructor === RegExp || from.constructor === Function || from.constructor === String || from.constructor === Number || from.constructor === Boolean) return new from.constructor(from);

	  to = to || new from.constructor();

	  for (var name in from) {
	    to[name] = typeof to[name] === "undefined" ? clone(from[name], null) : to[name];
	  }
	  return to;
	}

	function fillOptions(options, defaultOptions) {
	  options = options || {};
	  var option;
	  for (option in defaultOptions) {
	    if (options[option] === undefined) {
	      options[option] = clone(defaultOptions[option]);
	    }
	  }
	}

	// shallow copy
	function copyOptions(options, defaultOptions) {
	  var newOptions = clone(options) || {};

	  var option;
	  for (option in defaultOptions) {
	    if (newOptions[option] === undefined) {
	      newOptions[option] = clone(defaultOptions[option]);
	    }
	  }
	  return newOptions;
	}

	/***
	 * Given a destination object and optionally many source objects,
	 * copy all properties from the source objects into the destination.
	 * The last source object given overrides properties from previous
	 * source objects.
	 * @param {Object} dest destination object
	 * @param {...Object} sources sources from which properties are pulled
	 * @returns {Object} dest
	 * @private
	 */
	function extend(dest) {
	  for (var i = 1; i < arguments.length; i++) {
	    var src = arguments[i];
	    for (var k in src) {
	      dest[k] = src[k];
	    }
	  }
	  return dest;
	}

	/***
	 * Determine if a string ends with a particular substring
	 * @param {string} string
	 * @param {string} suffix
	 * @returns {boolean}
	 * @private
	 */
	function endsWith(string, suffix) {
	  return string.indexOf(suffix, string.length - suffix.length) !== -1;
	}

	function enhanceWithListeners(element) {
	  element._listeners = {};

	  element.addListener = function (name, callback) {
	    this._listeners[name] = this._listeners[name] || [];
	    this._listeners[name].push(callback);
	    return this._listeners[name].length;
	  };

	  element.executeListeners = function (event, defaultCallback) {
	    if (this._listeners[event.name] && this._listeners[event.name].length > 0) {
	      var index = 0;
	      for (; index < this._listeners[event.name].length; index++) {
	        this._listeners[event.name][index](event);
	      }
	    } else {
	      if (defaultCallback) {
	        defaultCallback(event);
	      }
	    }
	  };
	}

	function changeHeight(positions, height) {
	  var cartoArray = GeoVis.Ellipsoid.WGS84.cartesianArrayToCartographicArray(positions);
	  cartoArray.map(function (carto) {
	    carto.height = height;
	  });
	  positions = GeoVis.Ellipsoid.WGS84.cartographicArrayToCartesianArray(cartoArray);
	  return positions;
	}

	/**
	 * 计算多边形坐标的中点
	 * @param {LonLatArray} custom
	 */
	function getCenter(custom) {
	  var points = [];
	  var height = 0;
	  custom.map(function (point) {
	    points.push(turf.point(point));
	    height += point[2];
	  });
	  height = height / custom.length;
	  var features = turf.featureCollection(points);
	  var center = turf.center(features).geometry.coordinates;
	  center.push(height);
	  return center;
	}

	function updateZoom(scale, entity) {
	  var center = getCenter(entity.custom);
	  var newCustom = [];
	  entity.custom.map(function (custom) {
	    var dx = center[0] + scale * (custom[0] - center[0]);
	    var dy = center[1] + scale * (custom[1] - center[1]);
	    newCustom.push([dx, dy, custom[2]]);
	  });

	  return newCustom;
	}

	function updateRotation(rotation, entity) {
	  var center = getCenter(entity.custom);
	  var newCustom = [];
	  entity.custom.map(function (custom) {
	    var dx = custom[0] - center[0];
	    var dy = custom[1] - center[1];
	    var cx = dx * Math.cos(rotation) + dy * Math.sin(rotation) + center[0];
	    var cy = -dx * Math.sin(rotation) + dy * Math.cos(rotation) + center[1];
	    newCustom.push([cx, cy, custom[2]]);
	  });

	  return newCustom;
	}

	/**
	 * 思路，屏幕偏移固定，计算相应的坐标到中心方向的屏幕坐标偏移
	 * @param {*} custom
	 * @param {*} positons
	 * @param {*} type
	 */
	function getLinPos(custom, positions, type) {
	  var center = getCenter(custom);
	  var centerPos = GeoVis.Cartesian3.fromDegrees(center[0], center[1], center[2]);
	  var pos = [];
	  positions.map(function (pos1) {
	    pos.push(pos1);
	  });
	  for (var i = positions.length - 1; i > -1; i--) {
	    pos.push(LinPoint(centerPos, pos[i], -2));
	  }
	  var polygon_purple = new GeoVis.Polygon(pos, {
	    fill: true,
	    fillColor: GeoVis.Color.fromCssString("#512da8")
	  }).addTo(earth.features);
	}

	function LinPoint(centerPos, position, width) {
	  var height = GeoVis.Cartographic.fromCartesian(position).height;
	  var scrBoundingSphere = new GeoVis.BoundingSphere();
	  scrBoundingSphere.center = position;
	  scrBoundingSphere.radius = 1;
	  var AC = new GeoVis.Cartesian3(position.x - centerPos.x, position.y - centerPos.y, position.z - centerPos.z);
	  var cross = GeoVis.Cartesian3.normalize(AC, new GeoVis.Cartesian3());

	  var metersPerPixel = earth._scene.frameState.camera.getPixelSize(scrBoundingSphere, earth._scene.frameState.context.drawingBufferWidth, earth._scene.frameState.context.drawingBufferHeight);
	  var zOffset = GeoVis.Cartesian3.multiplyByScalar(cross, width * metersPerPixel, new GeoVis.Cartesian3());
	  var newPos = GeoVis.Cartesian3.add(position, zOffset, new GeoVis.Cartesian3());
	  var coord = GeoVis.Cartographic.fromCartesian(newPos);
	  coord.height = height;
	  return GeoVis.Cartographic.toCartesian(coord);
	}

	function computeBearing(lonlat0, lonlat1) {
	  var point1 = turf.point(lonlat0);
	  var point2 = turf.point(lonlat1);

	  return turf.bearing(point1, point2);
	}

	function positionsToHeights(positions) {
	  if (!positions) return;
	  var heights = [];
	  positions.map(function (pos) {
	    var carto = GeoVis.Cartographic.fromCartesian(pos);
	    heights.push(carto.height);
	  });
	  return heights;
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.heightMarker = exports.defaultMarker = exports.dragHalfPoint = exports.dragPoint = exports.defaultPoint = exports.defaultPolylineOptions = exports.defaultRectangleOptions = exports.defaultWallOptions = exports.defaultCircleOptions = exports.defaultSurfaceOptions = undefined;

	var _util = __webpack_require__(5);

	var material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	material.uniforms.color = GeoVis.Color.fromCssString("#009688").withAlpha(0.7);

	var defaultShapeOptions = {
	  ellipsoid: GeoVis.Ellipsoid.WGS84,
	  textureRotationAngle: 0.0,
	  height: 0.0,
	  asynchronous: false,
	  show: true,
	  debugShowBoundingVolume: false
	};

	var defaultSurfaceOptions = exports.defaultSurfaceOptions = (0, _util.copyOptions)(defaultShapeOptions, {
	  // appearance: new GeoVis.MaterialAppearance({
	  //   aboveGround: false,
	  //   // material: material
	  // }),
	  // color: GeoVis.Color.fromCssString("#009688").withAlpha(0.7),
	  granularity: Math.PI / 180.0
	});

	var defaultCircleOptions = exports.defaultCircleOptions = (0, _util.copyOptions)(defaultShapeOptions, {
	  strokeColor: GeoVis.Color.fromCssString("#009688"),
	  strokeWidth: 10,
	  onTerrain: true,
	  material: new GeoVis.Material({
	    fabric: {
	      type: "Color",
	      uniforms: {
	        color: GeoVis.Color.fromCssString("#009688").withAlpha(0.3)
	      }
	    }
	  })
	});
	var defaultWallOptions = exports.defaultWallOptions = (0, _util.copyOptions)(defaultShapeOptions, {
	  /* , */
	  flat: true,
	  material: material,
	  granularity: Math.PI / 180.0
	});
	var defaultRectangleOptions = exports.defaultRectangleOptions = (0, _util.copyOptions)(defaultShapeOptions, {
	  appearance: new GeoVis.MaterialAppearance({
	    aboveGround: false
	  }),
	  material: material
	});
	var defaultPolylineOptions = exports.defaultPolylineOptions = (0, _util.copyOptions)(defaultShapeOptions, {
	  width: 3,
	  geodesic: true,
	  granularity: 10000,
	  // appearance: new GeoVis.PolylineMaterialAppearance({
	  //   aboveGround: false
	  // }),
	  material: material
	});
	var dragIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKHAksBNXfIvIAAADGSURBVBjTlZC9DsFgFIafWsQgDE0vwGBjNVjNdYl1BYYmbkDim0yMEotFooNEW+Wjr6GfpCQG73J+nmc5B/6I924kNYEh0APawAXYAxvP827URUlTSZGkg6S7q5HbN+vySNJM0lOfebr9CKABUBRFH5i851oawMTxCuZ53gGCH3cFjldymqYZcPohnxyv5CzLdsASKL/EElg6XsnW2rUxZgHMgSPwcHVujFlYa9cff47juJUkyRgYAF3gDGx931+FYXjl37wANeOE+Ghv1/sAAAAASUVORK5CYII=";
	var dragIconLight = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKHAksIgfSpw8AAAFQSURBVBjTlZC/axphAIaf+87e5dTUkCGSDoIVuzUgZBM3hyCCAef0PxQiBRMhBgx26ODSUgIedJAG1BAI5Ls7vu+7H12iuw+88A7P8r6wB9a29Pt917KsM+AzcAi8AX+zLPs1GAzUTu71eq4Q4qLb7V42m812Pp8vB0Gwns1md6PR6DpN09vhcKhsgHq9ft7pdK5arda3KIpKYRjacRx/rFarZ4D2ff/fYrF4ygEYY740Go32er0WWZahtcYYQ5qmolartY0xE+BnDkBrXbIs60RKiZQhSRLvRjmOc6K1LgHkAJRSwWbz8hxFySfbdrFtdyeHYfCslAoAxLvsT6fTB887TF23wDaOU0jn8/mDUsoHsAHK5fLm8fHPhyTJstPTyrHnFQ+klJv7+/F4Mrn5LoS4W61W8e7nSqXiSSmbwFfgCHgFfheLxR/L5TJiX/4DB6mbvqBlRUAAAAAASUVORK5CYII=";
	var defaultPoint = exports.defaultPoint = {
	  iconUrl: dragIcon,
	  disableDepthTestDistance: 6e7,
	  shiftX: 0,
	  shiftY: 0
	};

	var dragPoint = exports.dragPoint = {
	  iconUrl: dragIcon,
	  shiftX: 0,
	  scale: 1,
	  disableDepthTestDistance: 6e7,
	  shiftY: 0
	};

	var dragHalfPoint = exports.dragHalfPoint = {
	  iconUrl: dragIconLight,
	  shiftX: 0,
	  disableDepthTestDistance: 6e7,
	  shiftY: 0
	};

	var moveUrl = "<svg t=\"1597626720075\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"4430\" width=\"200\" height=\"200\"><path d=\"M853.32992 102.4H170.67008C133.13024 102.4 102.4 133.13024 102.4 170.67008v682.65984C102.4 890.86976 133.13024 921.6 170.67008 921.6h682.65984C890.86976 921.6 921.6 890.86976 921.6 853.32992V170.67008C921.6 133.13024 890.86976 102.4 853.32992 102.4z m-44.1344 433.72544L700.60032 644.73088l-48.2304-48.19968 50.29888-50.40128-156.60032-0.03072v156.5696l50.40128-50.33984 48.26112 48.27136-108.65664 108.5952a34.03776 34.03776 0 0 1-48.19968 0L379.26912 700.60032l48.19968-48.2304 50.40128 50.29888V546.06848H321.3312l50.33984 50.40128-48.27136 48.26112-108.5952-108.65664a34.03776 34.03776 0 0 1 0-48.19968l108.5952-108.5952 48.19968 48.19968-50.29888 50.40128H477.9008l0.03072-156.53888-50.40128 50.33984-48.26112-48.27136 108.65664-108.5952a34.03776 34.03776 0 0 1 48.19968 0l108.5952 108.5952-48.19968 48.19968-50.40128-50.29888-0.02048 156.59008 156.5696 0.03072-50.33984-50.40128 48.27136-48.26112 108.5952 108.65664a34.03776 34.03776 0 0 1 0 48.19968z\" p-id=\"4431\" fill=\"#ffffff\"></path></svg>";
	var moveVerticalUrl = "<svg t=\"1597626680456\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3975\" width=\"200\" height=\"200\"><path d=\"M853.32992 102.4H170.67008C133.13024 102.4 102.4 133.12 102.4 170.65984v682.65984C102.4 890.85952 133.13024 921.6 170.67008 921.6h682.65984C890.86976 921.6 921.6 890.85952 921.6 853.31968V170.65984C921.6 133.12 890.86976 102.4 853.32992 102.4zM397.89568 809.19552a34.1504 34.1504 0 0 1-48.27136 0L204.8 664.40192l48.27136-48.2816 86.55872 86.53824V204.8h68.27008v497.85856l86.528-86.53824 48.30208 48.2816-144.83456 144.7936zM770.92864 407.8592l-86.55872-86.53824V819.2h-68.27008V321.32096l-86.528 86.53824-48.30208-48.26112 144.83456-144.80384a34.10944 34.10944 0 0 1 48.27136 0L819.2 359.59808l-48.27136 48.26112z\" p-id=\"3976\" fill=\"#ffffff\"></path></svg>";

	// var moveVerticalUrl = `<svg t="1599014499089" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3300" width="200" height="200"><path d="M853.32992 102.4H170.67008C133.13024 102.4 102.4 133.12 102.4 170.65984v682.65984C102.4 890.85952 133.13024 921.6 170.67008 921.6h682.65984C890.86976 921.6 921.6 890.85952 921.6 853.31968V170.65984C921.6 133.12 890.86976 102.4 853.32992 102.4zM397.89568 809.19552a34.1504 34.1504 0 0 1-48.27136 0L204.8 664.40192l48.27136-48.2816 86.55872 86.53824V204.8h68.27008v497.85856l86.528-86.53824 48.30208 48.2816-144.83456 144.7936zM770.92864 407.8592l-86.55872-86.53824V819.2h-68.27008V321.32096l-86.528 86.53824-48.30208-48.26112 144.83456-144.80384a34.10944 34.10944 0 0 1 48.27136 0L819.2 359.59808l-48.27136 48.26112z" p-id="3301" fill="#515151"></path></svg>`
	// var moveUrl = `<svg t="1599014448442" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21658" width="200" height="200"><path d="M853.32992 102.4H170.67008C133.13024 102.4 102.4 133.13024 102.4 170.67008v682.65984C102.4 890.86976 133.13024 921.6 170.67008 921.6h682.65984C890.86976 921.6 921.6 890.86976 921.6 853.32992V170.67008C921.6 133.13024 890.86976 102.4 853.32992 102.4z m-44.1344 433.72544L700.60032 644.73088l-48.2304-48.19968 50.29888-50.40128-156.60032-0.03072v156.5696l50.40128-50.33984 48.26112 48.27136-108.65664 108.5952a34.03776 34.03776 0 0 1-48.19968 0L379.26912 700.60032l48.19968-48.2304 50.40128 50.29888V546.06848H321.3312l50.33984 50.40128-48.27136 48.26112-108.5952-108.65664a34.03776 34.03776 0 0 1 0-48.19968l108.5952-108.5952 48.19968 48.19968-50.29888 50.40128H477.9008l0.03072-156.53888-50.40128 50.33984-48.26112-48.27136 108.65664-108.5952a34.03776 34.03776 0 0 1 48.19968 0l108.5952 108.5952-48.19968 48.19968-50.40128-50.29888-0.02048 156.59008 156.5696 0.03072-50.33984-50.40128 48.27136-48.26112 108.5952 108.65664a34.03776 34.03776 0 0 1 0 48.19968z" p-id="21659" fill="#515151"></path></svg>`
	function svgToBase64(svgStr) {
	  svgStr = "data:image/svg+xml;base64," + window.btoa(svgStr);
	  var img = new Image();
	  img.src = svgStr;
	  return img;
	}

	var defaultMarker = exports.defaultMarker = {
	  iconUrl: svgToBase64(moveUrl),
	  disableDepthTestDistance: 6e7,
	  shiftX: 0,
	  shiftY: 0,
	  scale: 0.15
	};
	var heightMarker = exports.heightMarker = {
	  iconUrl: svgToBase64(moveVerticalUrl),
	  disableDepthTestDistance: 6e7,
	  shiftX: 40,
	  shiftY: 0,
	  scale: 0.15
	};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(6);

	var _util = __webpack_require__(5);

	// constructor
	function Widget(drawHelper, options, removeObj) {
	  // container must be specified
	  if (!GeoVis.defined(options.container)) {
	    throw new GeoVis.DeveloperError("Container is required");
	  }

	  var drawOptions = {
	    markerIcon: "./img/maps.png",
	    polylineIcon: "./img/line.png",
	    polygonIcon: "./img/polygon.png",
	    arrowheadIcon: "./img/qianjijiantou.png",
	    circleIcon: "./img/circle.png",
	    tailedAttackArrowIcon: "./img/gongjijiantou.png",
	    extentIcon: "./img/zhijiaojiantou.png",
	    clearIcon: "./img/cleaning.png",
	    polylineDrawingOptions: _config.defaultPolylineOptions,
	    polygonDrawingOptions: _config.defaultPolygonOptions,
	    extentDrawingOptions: _config.defaultExtentOptions,
	    circleDrawingOptions: _config.defaultCircleOptions,
	    WallDrawingOptions: _config.defaultWallOptions
	  };

	  (0, _util.fillOptions)(options, drawOptions);

	  var Widgetself = this;

	  var toolbar = document.createElement("DIV");
	  toolbar.className = "toolbar";
	  options.container.appendChild(toolbar);

	  function addIcon(id, url, title, callback) {
	    var div = document.createElement("DIV");
	    div.className = "button";
	    div.title = title;
	    toolbar.appendChild(div);
	    div.onclick = callback;
	    var span = document.createElement("SPAN");
	    div.appendChild(span);
	    var image = document.createElement("IMG");
	    image.src = url;
	    span.appendChild(image);
	    return div;
	  }

	  addIcon("polyline", options.polylineIcon, "点击绘制线", function () {
	    drawHelper.startDrawingPolyline({
	      callback: function callback(positions, custom) {
	        Widgetself.executeListeners({
	          name: "polylineCreated",
	          positions: positions,
	          custom: custom
	        });
	      }
	    });
	  });

	  addIcon("polygon", options.polygonIcon, "点击以绘制钳击多边形", function () {
	    drawHelper.startDrawingPolygon({
	      callback: function callback(positions) {
	        Widgetself.executeListeners({
	          name: "polygonCreated",
	          positions: positions
	        });
	      }
	    });
	  });

	  addIcon("extent", options.extentIcon, "点击以绘制直箭头", function () {
	    drawHelper.startDrawingExtent({
	      callback: function callback(extent) {
	        Widgetself.executeListeners({ name: "extentCreated", extent: extent });
	      }
	    });
	  });

	  addIcon("arrowhead", options.arrowheadIcon, "点击以绘制钳击箭头", function () {
	    drawHelper.startDrawingArrowhead({
	      callback: function callback(positions, custom) {
	        Widgetself.executeListeners({
	          name: "arrowheadCreated",
	          positions: positions,
	          custom: custom
	        });
	      }
	    });
	  });

	  addIcon("tailedAttackArrow", options.tailedAttackArrowIcon, "点击以绘制攻击箭头", function () {
	    drawHelper.startDrawingTailedAttack({
	      callback: function callback(positions, custom) {
	        Widgetself.executeListeners({
	          name: "tailedAttackCreated",
	          positions: positions,
	          custom: custom
	        });
	      }
	    });
	  });

	  (0, _util.enhanceWithListeners)(this);
	}

	exports.default = Widget;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function installStyle() {
	    GeoVis.Util.installStyles(".twipsy {\n    display: block;\n    position: absolute;\n    visibility: visible;\n    max-width: 200px;\n    min-width: 100px;\n    padding: 5px;\n    font-size: 11px;\n    z-index: 1000;\n    opacity: 0.8;\n    -khtml-opacity: 0.8;\n    -moz-opacity: 0.8;\n    filter: alpha(opacity=80);\n}\n.twipsy.left .twipsy-arrow {\n    top: 50%;\n    right: 0;\n    margin-top: -5px;\n    border-top: 5px solid transparent;\n    border-bottom: 5px solid transparent;\n    border-left: 5px solid #000000;\n}\n.twipsy.right .twipsy-arrow {\n    top: 50%;\n    left: 0;\n    margin-top: -5px;\n    border-top: 5px solid transparent;\n    border-bottom: 5px solid transparent;\n    border-right: 5px solid #000000;\n}\n.twipsy-inner {\n    padding: 3px 8px;\n    background-color: #000000;\n    color: white;\n    text-align: center;\n    max-width: 200px;\n    text-decoration: none;\n    -webkit-border-radius: 4px;\n    -moz-border-radius: 4px;\n    border-radius: 4px;\n}\n.twipsy-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n}");
	}

	var Tooltip = function Tooltip(frameDiv) {
	    var _this = this;

	    _classCallCheck(this, Tooltip);

	    this.setVisible = function (visible) {
	        _this._div.style.display = visible ? "block" : "none";
	    };

	    this.showAt = function (position, message) {
	        if (position && message) {
	            _this.setVisible(true);
	            _this._title.innerHTML = message;
	            _this._div.style.left = position.x + 20 + "px";
	            _this._div.style.top = position.y + "px"; //- this._div.clientHeight / 2
	        }
	    };

	    var div = document.createElement("DIV");
	    div.className = "twipsy right";

	    // var arrow = document.createElement("DIV");
	    // arrow.className = "twipsy-arrow";
	    // div.appendChild(arrow);

	    var title = document.createElement("DIV");
	    title.className = "twipsy-inner";
	    div.appendChild(title);

	    this._div = div;
	    this._title = title;

	    // add to frame div and display coordinates
	    frameDiv.appendChild(div);
	    installStyle();
	};

	exports.default = Tooltip;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.wrapEvented = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(5);

	var Util = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var wrapEvented = exports.wrapEvented = function wrapEvented(ParentClass) {
	  return function (_ParentClass) {
	    _inherits(_class, _ParentClass);

	    function _class() {
	      _classCallCheck(this, _class);

	      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	    }

	    _createClass(_class, [{
	      key: "on",
	      value: function on(type, listener) {
	        this._listeners = this._listeners || {};
	        this._listeners[type] = this._listeners[type] || [];
	        this._listeners[type].push(listener);

	        return this;
	      }
	    }, {
	      key: "off",
	      value: function off(type, listener) {
	        if (this._listeners && this._listeners[type]) {
	          var index = this._listeners[type].indexOf(listener);
	          if (index !== -1) {
	            this._listeners[type].splice(index, 1);
	          }
	        }

	        return this;
	      }
	    }, {
	      key: "once",
	      value: function once(type, listener) {
	        var _this2 = this;

	        var wrapper = function wrapper(data) {
	          _this2.off(type, wrapper);
	          listener.call(_this2, data);
	        };
	        this.on(type, wrapper);
	        return this;
	      }
	    }, {
	      key: "fire",
	      value: function fire(type, data) {
	        if (this.listens(type)) {
	          data = Util.extend({}, data, { type: type, target: this });
	          // make sure adding or removing listeners inside other listeners won't cause an infinite loop
	          var listeners = this._listeners && this._listeners[type] ? this._listeners[type].slice() : [];
	          for (var i = 0; i < listeners.length; i++) {
	            listeners[i].call(this, data);
	          }

	          if (this._EventedParent) {
	            this._EventedParent.fire(type, Util.extend({}, data, this._EventedParentData));
	          }
	        } else if (Util.endsWith(type, "error")) {
	          console.error(data && data.error || data || "Empty error event");
	        }

	        return this;
	      }
	    }, {
	      key: "listens",
	      value: function listens(type) {
	        return this._listeners && this._listeners[type] || this._EventedParent && this._EventedParent.listens(type);
	      }
	    }, {
	      key: "setEventedParent",
	      value: function setEventedParent(parent, data) {
	        this._EventedParent = parent;
	        this._EventedParentData = data;

	        return this;
	      }
	    }]);

	    return _class;
	  }(ParentClass);
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.computeLength = computeLength;
	exports.computeDistance = computeDistance;
	exports.computeArea = computeArea;
	exports.getCentroid = getCentroid;
	exports.terrainarea = terrainarea;
	exports.areaDivision = areaDivision;
	exports.PolygonBatch = PolygonBatch;

	var _geographiclib = __webpack_require__(11);

	var _geographiclib2 = _interopRequireDefault(_geographiclib);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var geod = _geographiclib2.default.Geodesic.WGS84;
	/**
	 * 计算两个坐标点之间的距离，单位为米
	 *
	 * @param srcLat
	 *            起始点的纬度
	 * @param srcLon
	 *            起始点的经度
	 * @param descLat
	 *            目标点的纬度
	 * @param descLon
	 *            目标点的经度
	 * @return 两个坐标点之间的距离，单位为米
	 */
	function computeLength(_ref, _ref2) {
	  var _ref4 = _slicedToArray(_ref, 2),
	      srcLat = _ref4[0],
	      srcLon = _ref4[1];

	  var _ref3 = _slicedToArray(_ref2, 2),
	      descLat = _ref3[0],
	      descLon = _ref3[1];

	  var result;
	  try {
	    var g = geod.Inverse(srcLat, srcLon, descLat, descLon);
	    result = g.s12;
	  } catch (e) {
	    return -1;
	  }
	  return result;
	}

	function computeDistance(positions) {
	  var coords = positions.map(function (position) {
	    var coor = GeoVis.Cartographic.fromCartesian(position);
	    var lon = coor.longitude * 180 / Math.PI;
	    var lat = coor.latitude * 180 / Math.PI;
	    return [lat, lon];
	  });
	  var size = coords.length;
	  var distance = 0;
	  for (var i = 0; i < size - 1; i++) {
	    distance += computeLength(coords[i], coords[i + 1]);
	  }
	  return distance;
	}

	/**
	 * @param coords
	 *            [纬度，经度]格式的数组
	 * @return 平方米
	 */
	function computeArea(positions) {
	  var result;
	  var coords = positions.map(function (position) {
	    var coor = GeoVis.Cartographic.fromCartesian(position);
	    var lon = coor.longitude * 180 / Math.PI;
	    var lat = coor.latitude * 180 / Math.PI;
	    return [lat, lon];
	  });
	  try {
	    var p = new _geographiclib2.default.PolygonArea.PolygonArea(_geographiclib2.default.Geodesic.WGS84, false);
	    var size = coords.length;
	    for (var i = 0; i < size; i++) {
	      p.AddPoint(coords[i][0], coords[i][1]);
	    }
	    var r = p.Compute();
	    result = r.area;
	  } catch (e) {
	    return -1;
	  }
	  return result;
	}

	function getCentroid(positions) {
	  var arr = positions.map(function (position) {
	    var coor = GeoVis.Cartographic.fromCartesian(position);
	    var lon = coor.longitude * 180 / Math.PI;
	    var lat = coor.latitude * 180 / Math.PI;
	    return [lon, lat];
	  });

	  var twoTimesSignedArea = 0;
	  var cxTimes6SignedArea = 0;
	  var cyTimes6SignedArea = 0;

	  var length = arr.length;

	  var x = function x(i) {
	    return arr[i % length][0];
	  };
	  var y = function y(i) {
	    return arr[i % length][1];
	  };

	  for (var i = 0; i < arr.length; i++) {
	    var twoSA = x(i) * y(i + 1) - x(i + 1) * y(i);
	    twoTimesSignedArea += twoSA;
	    cxTimes6SignedArea += (x(i) + x(i + 1)) * twoSA;
	    cyTimes6SignedArea += (y(i) + y(i + 1)) * twoSA;
	  }
	  var sixSignedArea = 3 * twoTimesSignedArea;
	  return [cxTimes6SignedArea / sixSignedArea, cyTimes6SignedArea / sixSignedArea, 0];
	}

	function terrainarea(positionsA, positionsB, positionsC) {
	  var area = -1;

	  var side = []; // 存储三条边的长度;

	  side[0] = GeoVis.Cartesian3.distance(positionsA, positionsB);
	  side[1] = GeoVis.Cartesian3.distance(positionsB, positionsC);
	  side[2] = GeoVis.Cartesian3.distance(positionsA, positionsC);

	  // 不能构成三角形;
	  if (side[0] + side[1] <= side[2] || side[0] + side[2] <= side[1] || side[1] + side[2] <= side[0]) return area;

	  // 利用海伦公式。s=sqr(p*(p-a)(p-b)(p-c));
	  var p = (side[0] + side[1] + side[2]) / 2; // 半周长;
	  area = Math.sqrt(p * (p - side[0]) * (p - side[1]) * (p - side[2]));

	  return area;
	}

	function areaDivision(positions, accuracy) {
	  var spacearea = computeArea(positions);
	  var startLon = GeoVis.Cartographic.fromCartesian(positions[0]).longitude;
	  var startLat = GeoVis.Cartographic.fromCartesian(positions[0]).latitude;
	  var endLon = GeoVis.Cartographic.fromCartesian(positions[0]).longitude;
	  var endLat = GeoVis.Cartographic.fromCartesian(positions[0]).latitude;
	  for (var i = 1; i < positions.length; i++) {
	    startLon < GeoVis.Cartographic.fromCartesian(positions[i]).longitude ? startLon = GeoVis.Cartographic.fromCartesian(positions[i]).longitude : startLon = startLon;
	    startLat < GeoVis.Cartographic.fromCartesian(positions[i]).latitude ? startLat = GeoVis.Cartographic.fromCartesian(positions[i]).latitude : startLat = startLat;
	    endLon > GeoVis.Cartographic.fromCartesian(positions[i]).longitude ? endLon = GeoVis.Cartographic.fromCartesian(positions[i]).longitude : endLon = endLon;
	    endLat > GeoVis.Cartographic.fromCartesian(positions[i]).latitude ? endLat = GeoVis.Cartographic.fromCartesian(positions[i]).latitude : endLat = endLat;
	  }
	  var bbox = [GeoVis.Math.toDegrees(endLon), GeoVis.Math.toDegrees(endLat), GeoVis.Math.toDegrees(startLon), GeoVis.Math.toDegrees(startLat)];
	  var DegreesPos = [];
	  for (var _i = 0; _i < positions.length; _i++) {
	    var _Lon = GeoVis.Cartographic.fromCartesian(positions[_i]).longitude;
	    var _Lat = GeoVis.Cartographic.fromCartesian(positions[_i]).latitude;
	    var Degree = [GeoVis.Math.toDegrees(_Lon), GeoVis.Math.toDegrees(_Lat)];
	    DegreesPos.push(Degree);
	  }
	  var Lon = GeoVis.Cartographic.fromCartesian(positions[0]).longitude;
	  var Lat = GeoVis.Cartographic.fromCartesian(positions[0]).latitude;
	  var Degree1 = [GeoVis.Math.toDegrees(Lon), GeoVis.Math.toDegrees(Lat)];
	  DegreesPos.push(Degree1);

	  var cellSide = Math.sqrt(spacearea / accuracy);
	  if (cellSide < 12) {
	    cellSide = 12;
	  } // entity.cellSide;

	  var options = {
	    units: "metres",
	    mask: {
	      type: "Feature",
	      geometry: {
	        type: "Polygon",
	        coordinates: [DegreesPos]
	      }
	    }
	  };
	  var triangleGrid = turf.triangleGrid(bbox, cellSide, options);

	  return triangleGrid;
	}

	function PolygonBatch(samples) {
	  var actualarea = 0;
	  var heightpositions = GeoVis.Ellipsoid.WGS84.cartographicArrayToCartesianArray(samples);
	  var polygons = [];
	  for (var k = 0; k < heightpositions.length - 1; k = k + 3) {
	    actualarea = terrainarea(heightpositions[k], heightpositions[k + 1], heightpositions[k + 2]) + actualarea;
	    polygons.push(new GeoVis.Polygon([heightpositions[k], heightpositions[k + 1], heightpositions[k + 2]], {
	      fillColor: GeoVis.Color.fromRandom(),
	      fill: true
	    }));
	  }
	  var batch = new GeoVis.PolygonBatch(polygons).addTo(earth.features);
	}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Geodesic routines from GeographicLib translated to JavaScript.  See
	 * https://geographiclib.sourceforge.io/html/js/
	 *
	 * The algorithms are derived in
	 *
	 *    Charles F. F. Karney,
	 *    Algorithms for geodesics, J. Geodesy 87, 43-55 (2013),
	 *    https://doi.org/10.1007/s00190-012-0578-z
	 *    Addenda: https://geographiclib.sourceforge.io/geod-addenda.html
	 *
	 * This file is the concatenation and compression of the JavaScript files in
	 * doc/scripts/GeographicLib in the source tree for GeographicLib.
	 *
	 * Copyright (c) Charles Karney (2011-2015) <charles@karney.com> and licensed
	 * under the MIT/X11 License.  For more information, see
	 * https://geographiclib.sourceforge.io/
	 *
	 * Version: 1.49
	 * File inventory:
	 *   Math.js Geodesic.js GeodesicLine.js PolygonArea.js DMS.js
	 */

	(function(cb) {

	/**************** Math.js ****************/
	/*
	 * Math.js
	 * Transcription of Math.hpp, Constants.hpp, and Accumulator.hpp into
	 * JavaScript.
	 *
	 * Copyright (c) Charles Karney (2011-2017) <charles@karney.com> and licensed
	 * under the MIT/X11 License.  For more information, see
	 * https://geographiclib.sourceforge.io/
	 */

	/**
	 * @namespace GeographicLib
	 * @description The parent namespace for the following modules:
	 * - {@link module:GeographicLib/Geodesic GeographicLib/Geodesic} The main
	 *   engine for solving geodesic problems via the
	 *   {@link module:GeographicLib/Geodesic.Geodesic Geodesic} class.
	 * - {@link module:GeographicLib/GeodesicLine GeographicLib/GeodesicLine}
	 *   computes points along a single geodesic line via the
	 *   {@link module:GeographicLib/GeodesicLine.GeodesicLine GeodesicLine}
	 *   class.
	 * - {@link module:GeographicLib/PolygonArea GeographicLib/PolygonArea}
	 *   computes the area of a geodesic polygon via the
	 *   {@link module:GeographicLib/PolygonArea.PolygonArea PolygonArea}
	 *   class.
	 * - {@link module:GeographicLib/DMS GeographicLib/DMS} handles the decoding
	 *   and encoding of angles in degree, minutes, and seconds, via static
	 *   functions in this module.
	 * - {@link module:GeographicLib/Constants GeographicLib/Constants} defines
	 *   constants specifying the version numbers and the parameters for the WGS84
	 *   ellipsoid.
	 *
	 * The following modules are used internally by the package:
	 * - {@link module:GeographicLib/Math GeographicLib/Math} defines various
	 *   mathematical functions.
	 * - {@link module:GeographicLib/Accumulator GeographicLib/Accumulator}
	 *   interally used by
	 *   {@link module:GeographicLib/PolygonArea.PolygonArea PolygonArea} (via the
	 *   {@link module:GeographicLib/Accumulator.Accumulator Accumulator} class)
	 *   for summing the contributions to the area of a polygon.
	 */
	"use strict";
	var GeographicLib = {};
	GeographicLib.Constants = {};
	GeographicLib.Math = {};
	GeographicLib.Accumulator = {};

	(function(
	  /**
	   * @exports GeographicLib/Constants
	   * @description Define constants defining the version and WGS84 parameters.
	   */
	  c) {

	  /**
	   * @constant
	   * @summary WGS84 parameters.
	   * @property {number} a the equatorial radius (meters).
	   * @property {number} f the flattening.
	   */
	  c.WGS84 = { a: 6378137, f: 1/298.257223563 };
	  /**
	   * @constant
	   * @summary an array of version numbers.
	   * @property {number} major the major version number.
	   * @property {number} minor the minor version number.
	   * @property {number} patch the patch number.
	   */
	  c.version = { major: 1, minor: 49, patch: 0 };
	  /**
	   * @constant
	   * @summary version string
	   */
	  c.version_string = "1.49";
	})(GeographicLib.Constants);

	(function(
	  /**
	   * @exports GeographicLib/Math
	   * @description Some useful mathematical constants and functions (mainly for
	   *   internal use).
	   */
	  m) {

	  /**
	   * @summary The number of digits of precision in floating-point numbers.
	   * @constant {number}
	   */
	  m.digits = 53;
	  /**
	   * @summary The machine epsilon.
	   * @constant {number}
	   */
	  m.epsilon = Math.pow(0.5, m.digits - 1);
	  /**
	   * @summary The factor to convert degrees to radians.
	   * @constant {number}
	   */
	  m.degree = Math.PI/180;

	  /**
	   * @summary Square a number.
	   * @param {number} x the number.
	   * @returns {number} the square.
	   */
	  m.sq = function(x) { return x * x; };

	  /**
	   * @summary The hypotenuse function.
	   * @param {number} x the first side.
	   * @param {number} y the second side.
	   * @returns {number} the hypotenuse.
	   */
	  m.hypot = function(x, y) {
	    var a, b;
	    x = Math.abs(x);
	    y = Math.abs(y);
	    a = Math.max(x, y); b = Math.min(x, y) / (a ? a : 1);
	    return a * Math.sqrt(1 + b * b);
	  };

	  /**
	   * @summary Cube root function.
	   * @param {number} x the argument.
	   * @returns {number} the real cube root.
	   */
	  m.cbrt = function(x) {
	    var y = Math.pow(Math.abs(x), 1/3);
	    return x < 0 ? -y : y;
	  };

	  /**
	   * @summary The log1p function.
	   * @param {number} x the argument.
	   * @returns {number} log(1 + x).
	   */
	  m.log1p = function(x) {
	    var y = 1 + x,
	        z = y - 1;
	    // Here's the explanation for this magic: y = 1 + z, exactly, and z
	    // approx x, thus log(y)/z (which is nearly constant near z = 0) returns
	    // a good approximation to the true log(1 + x)/x.  The multiplication x *
	    // (log(y)/z) introduces little additional error.
	    return z === 0 ? x : x * Math.log(y) / z;
	  };

	  /**
	   * @summary Inverse hyperbolic tangent.
	   * @param {number} x the argument.
	   * @returns {number} tanh<sup>&minus;1</sup> x.
	   */
	  m.atanh = function(x) {
	    var y = Math.abs(x);          // Enforce odd parity
	    y = m.log1p(2 * y/(1 - y))/2;
	    return x < 0 ? -y : y;
	  };

	  /**
	   * @summary Copy the sign.
	   * @param {number} x gives the magitude of the result.
	   * @param {number} y gives the sign of the result.
	   * @returns {number} value with the magnitude of x and with the sign of y.
	   */
	  m.copysign = function(x, y) {
	    return Math.abs(x) * (y < 0 || (y === 0 && 1/y < 0) ? -1 : 1);
	  };

	  /**
	   * @summary An error-free sum.
	   * @param {number} u
	   * @param {number} v
	   * @returns {object} sum with sum.s = round(u + v) and sum.t is u + v &minus;
	   *   round(u + v)
	   */
	  m.sum = function(u, v) {
	    var s = u + v,
	        up = s - v,
	        vpp = s - up,
	        t;
	    up -= u;
	    vpp -= v;
	    t = -(up + vpp);
	    // u + v =       s      + t
	    //       = round(u + v) + t
	    return {s: s, t: t};
	  };

	  /**
	   * @summary Evaluate a polynomial.
	   * @param {integer} N the order of the polynomial.
	   * @param {array} p the coefficient array (of size N + 1) (leading
	   *   order coefficient first)
	   * @param {number} x the variable.
	   * @returns {number} the value of the polynomial.
	   */
	  m.polyval = function(N, p, s, x) {
	    var y = N < 0 ? 0 : p[s++];
	    while (--N >= 0) y = y * x + p[s++];
	    return y;
	  };

	  /**
	   * @summary Coarsen a value close to zero.
	   * @param {number} x
	   * @returns {number} the coarsened value.
	   */
	  m.AngRound = function(x) {
	    // The makes the smallest gap in x = 1/16 - nextafter(1/16, 0) = 1/2^57 for
	    // reals = 0.7 pm on the earth if x is an angle in degrees.  (This is about
	    // 1000 times more resolution than we get with angles around 90 degrees.)
	    // We use this to avoid having to deal with near singular cases when x is
	    // non-zero but tiny (e.g., 1.0e-200).  This converts -0 to +0; however
	    // tiny negative numbers get converted to -0.
	    if (x === 0) return x;
	    var z = 1/16,
	        y = Math.abs(x);
	    // The compiler mustn't "simplify" z - (z - y) to y
	    y = y < z ? z - (z - y) : y;
	    return x < 0 ? -y : y;
	  };

	  /**
	   * @summary Normalize an angle.
	   * @param {number} x the angle in degrees.
	   * @returns {number} the angle reduced to the range (&minus;180&deg;,
	   *   180&deg;].
	   */
	  m.AngNormalize = function(x) {
	    // Place angle in [-180, 180).
	    x = x % 360;
	    return x <= -180 ? x + 360 : (x <= 180 ? x : x - 360);
	  };

	  /**
	   * @summary Normalize a latitude.
	   * @param {number} x the angle in degrees.
	   * @returns {number} x if it is in the range [&minus;90&deg;, 90&deg;],
	   *   otherwise return NaN.
	   */
	  m.LatFix = function(x) {
	    // Replace angle with NaN if outside [-90, 90].
	    return Math.abs(x) > 90 ? Number.NaN : x;
	  };

	  /**
	   * @summary The exact difference of two angles reduced to (&minus;180&deg;,
	   *   180&deg;]
	   * @param {number} x the first angle in degrees.
	   * @param {number} y the second angle in degrees.
	   * @return {object} diff the exact difference, y &minus; x.
	   *
	   * This computes z = y &minus; x exactly, reduced to (&minus;180&deg;,
	   * 180&deg;]; and then sets diff.s = d = round(z) and diff.t = e = z &minus;
	   * round(z).  If d = &minus;180, then e &gt; 0; If d = 180, then e &le; 0.
	   */
	  m.AngDiff = function(x, y) {
	    // Compute y - x and reduce to [-180,180] accurately.
	    var r = m.sum(m.AngNormalize(-x), m.AngNormalize(y)),
	        d = m.AngNormalize(r.s),
	        t = r.t;
	    return m.sum(d === 180 && t > 0 ? -180 : d, t);
	  };

	  /**
	   * @summary Evaluate the sine and cosine function with the argument in
	   *   degrees
	   * @param {number} x in degrees.
	   * @returns {object} r with r.s = sin(x) and r.c = cos(x).
	   */
	  m.sincosd = function(x) {
	    // In order to minimize round-off errors, this function exactly reduces
	    // the argument to the range [-45, 45] before converting it to radians.
	    var r, q, s, c, sinx, cosx;
	    r = x % 360;
	    q = Math.floor(r / 90 + 0.5);
	    r -= 90 * q;
	    // now abs(r) <= 45
	    r *= this.degree;
	    // Possibly could call the gnu extension sincos
	    s = Math.sin(r); c = Math.cos(r);
	    switch (q & 3) {
	      case 0:  sinx =  s; cosx =  c; break;
	      case 1:  sinx =  c; cosx = -s; break;
	      case 2:  sinx = -s; cosx = -c; break;
	      default: sinx = -c; cosx =  s; break; // case 3
	    }
	    if (x !== 0) { sinx += 0; cosx += 0; }
	    return {s: sinx, c: cosx};
	  };

	  /**
	   * @summary Evaluate the atan2 function with the result in degrees
	   * @param {number} y
	   * @param {number} x
	   * @returns atan2(y, x) in degrees, in the range (&minus;180&deg;
	   *   180&deg;].
	   */
	  m.atan2d = function(y, x) {
	    // In order to minimize round-off errors, this function rearranges the
	    // arguments so that result of atan2 is in the range [-pi/4, pi/4] before
	    // converting it to degrees and mapping the result to the correct
	    // quadrant.
	    var q = 0, t, ang;
	    if (Math.abs(y) > Math.abs(x)) { t = x; x = y; y = t; q = 2; }
	    if (x < 0) { x = -x; ++q; }
	    // here x >= 0 and x >= abs(y), so angle is in [-pi/4, pi/4]
	    ang = Math.atan2(y, x) / this.degree;
	    switch (q) {
	      // Note that atan2d(-0.0, 1.0) will return -0.  However, we expect that
	      // atan2d will not be called with y = -0.  If need be, include
	      //
	      //   case 0: ang = 0 + ang; break;
	      //
	      // and handle mpfr as in AngRound.
	      case 1: ang = (y >= 0 ? 180 : -180) - ang; break;
	      case 2: ang =  90 - ang; break;
	      case 3: ang = -90 + ang; break;
	    }
	    return ang;
	  };
	})(GeographicLib.Math);

	(function(
	  /**
	   * @exports GeographicLib/Accumulator
	   * @description Accurate summation via the
	   *   {@link module:GeographicLib/Accumulator.Accumulator Accumulator} class
	   *   (mainly for internal use).
	   */
	  a, m) {

	  /**
	   * @class
	   * @summary Accurate summation of many numbers.
	   * @classdesc This allows many numbers to be added together with twice the
	   *   normal precision.  In the documentation of the member functions, sum
	   *   stands for the value currently held in the accumulator.
	   * @param {number | Accumulator} [y = 0]  set sum = y.
	   */
	  a.Accumulator = function(y) {
	    this.Set(y);
	  };

	  /**
	   * @summary Set the accumulator to a number.
	   * @param {number | Accumulator} [y = 0] set sum = y.
	   */
	  a.Accumulator.prototype.Set = function(y) {
	    if (!y) y = 0;
	    if (y.constructor === a.Accumulator) {
	      this._s = y._s;
	      this._t = y._t;
	    } else {
	      this._s = y;
	      this._t = 0;
	    }
	  };

	  /**
	   * @summary Add a number to the accumulator.
	   * @param {number} [y = 0] set sum += y.
	   */
	  a.Accumulator.prototype.Add = function(y) {
	    // Here's Shewchuk's solution...
	    // Accumulate starting at least significant end
	    var u = m.sum(y, this._t),
	        v = m.sum(u.s, this._s);
	    u = u.t;
	    this._s = v.s;
	    this._t = v.t;
	    // Start is _s, _t decreasing and non-adjacent.  Sum is now (s + t + u)
	    // exactly with s, t, u non-adjacent and in decreasing order (except
	    // for possible zeros).  The following code tries to normalize the
	    // result.  Ideally, we want _s = round(s+t+u) and _u = round(s+t+u -
	    // _s).  The follow does an approximate job (and maintains the
	    // decreasing non-adjacent property).  Here are two "failures" using
	    // 3-bit floats:
	    //
	    // Case 1: _s is not equal to round(s+t+u) -- off by 1 ulp
	    // [12, -1] - 8 -> [4, 0, -1] -> [4, -1] = 3 should be [3, 0] = 3
	    //
	    // Case 2: _s+_t is not as close to s+t+u as it shold be
	    // [64, 5] + 4 -> [64, 8, 1] -> [64,  8] = 72 (off by 1)
	    //                    should be [80, -7] = 73 (exact)
	    //
	    // "Fixing" these problems is probably not worth the expense.  The
	    // representation inevitably leads to small errors in the accumulated
	    // values.  The additional errors illustrated here amount to 1 ulp of
	    // the less significant word during each addition to the Accumulator
	    // and an additional possible error of 1 ulp in the reported sum.
	    //
	    // Incidentally, the "ideal" representation described above is not
	    // canonical, because _s = round(_s + _t) may not be true.  For
	    // example, with 3-bit floats:
	    //
	    // [128, 16] + 1 -> [160, -16] -- 160 = round(145).
	    // But [160, 0] - 16 -> [128, 16] -- 128 = round(144).
	    //
	    if (this._s === 0)          // This implies t == 0,
	      this._s = u;              // so result is u
	    else
	      this._t += u;             // otherwise just accumulate u to t.
	  };

	  /**
	   * @summary Return the result of adding a number to sum (but
	   *   don't change sum).
	   * @param {number} [y = 0] the number to be added to the sum.
	   * @return sum + y.
	   */
	  a.Accumulator.prototype.Sum = function(y) {
	    var b;
	    if (!y)
	      return this._s;
	    else {
	      b = new a.Accumulator(this);
	      b.Add(y);
	      return b._s;
	    }
	  };

	  /**
	   * @summary Set sum = &minus;sum.
	   */
	  a.Accumulator.prototype.Negate = function() {
	    this._s *= -1;
	    this._t *= -1;
	  };
	})(GeographicLib.Accumulator, GeographicLib.Math);

	/**************** Geodesic.js ****************/
	/*
	 * Geodesic.js
	 * Transcription of Geodesic.[ch]pp into JavaScript.
	 *
	 * See the documentation for the C++ class.  The conversion is a literal
	 * conversion from C++.
	 *
	 * The algorithms are derived in
	 *
	 *    Charles F. F. Karney,
	 *    Algorithms for geodesics, J. Geodesy 87, 43-55 (2013);
	 *    https://doi.org/10.1007/s00190-012-0578-z
	 *    Addenda: https://geographiclib.sourceforge.io/geod-addenda.html
	 *
	 * Copyright (c) Charles Karney (2011-2017) <charles@karney.com> and licensed
	 * under the MIT/X11 License.  For more information, see
	 * https://geographiclib.sourceforge.io/
	 */

	// Load AFTER Math.js

	GeographicLib.Geodesic = {};
	GeographicLib.GeodesicLine = {};
	GeographicLib.PolygonArea = {};

	(function(
	  /**
	   * @exports GeographicLib/Geodesic
	   * @description Solve geodesic problems via the
	   *   {@link module:GeographicLib/Geodesic.Geodesic Geodesic} class.
	   */
	  g, l, p, m, c) {

	  var GEOGRAPHICLIB_GEODESIC_ORDER = 6,
	      nA1_ = GEOGRAPHICLIB_GEODESIC_ORDER,
	      nA2_ = GEOGRAPHICLIB_GEODESIC_ORDER,
	      nA3_ = GEOGRAPHICLIB_GEODESIC_ORDER,
	      nA3x_ = nA3_,
	      nC3x_, nC4x_,
	      maxit1_ = 20,
	      maxit2_ = maxit1_ + m.digits + 10,
	      tol0_ = m.epsilon,
	      tol1_ = 200 * tol0_,
	      tol2_ = Math.sqrt(tol0_),
	      tolb_ = tol0_ * tol1_,
	      xthresh_ = 1000 * tol2_,
	      CAP_NONE = 0,
	      CAP_ALL  = 0x1F,
	      CAP_MASK = CAP_ALL,
	      OUT_ALL  = 0x7F80,
	      astroid,
	      A1m1f_coeff, C1f_coeff, C1pf_coeff,
	      A2m1f_coeff, C2f_coeff,
	      A3_coeff, C3_coeff, C4_coeff;

	  g.tiny_ = Math.sqrt(Number.MIN_VALUE);
	  g.nC1_ = GEOGRAPHICLIB_GEODESIC_ORDER;
	  g.nC1p_ = GEOGRAPHICLIB_GEODESIC_ORDER;
	  g.nC2_ = GEOGRAPHICLIB_GEODESIC_ORDER;
	  g.nC3_ = GEOGRAPHICLIB_GEODESIC_ORDER;
	  g.nC4_ = GEOGRAPHICLIB_GEODESIC_ORDER;
	  nC3x_ = (g.nC3_ * (g.nC3_ - 1)) / 2;
	  nC4x_ = (g.nC4_ * (g.nC4_ + 1)) / 2;
	  g.CAP_C1   = 1<<0;
	  g.CAP_C1p  = 1<<1;
	  g.CAP_C2   = 1<<2;
	  g.CAP_C3   = 1<<3;
	  g.CAP_C4   = 1<<4;

	  g.NONE          = 0;
	  g.ARC           = 1<<6;
	  g.LATITUDE      = 1<<7  | CAP_NONE;
	  g.LONGITUDE     = 1<<8  | g.CAP_C3;
	  g.AZIMUTH       = 1<<9  | CAP_NONE;
	  g.DISTANCE      = 1<<10 | g.CAP_C1;
	  g.STANDARD      = g.LATITUDE | g.LONGITUDE | g.AZIMUTH | g.DISTANCE;
	  g.DISTANCE_IN   = 1<<11 | g.CAP_C1 | g.CAP_C1p;
	  g.REDUCEDLENGTH = 1<<12 | g.CAP_C1 | g.CAP_C2;
	  g.GEODESICSCALE = 1<<13 | g.CAP_C1 | g.CAP_C2;
	  g.AREA          = 1<<14 | g.CAP_C4;
	  g.ALL           = OUT_ALL| CAP_ALL;
	  g.LONG_UNROLL   = 1<<15;
	  g.OUT_MASK      = OUT_ALL| g.LONG_UNROLL;

	  g.SinCosSeries = function(sinp, sinx, cosx, c) {
	    // Evaluate
	    // y = sinp ? sum(c[i] * sin( 2*i    * x), i, 1, n) :
	    //            sum(c[i] * cos((2*i+1) * x), i, 0, n-1)
	    // using Clenshaw summation.  N.B. c[0] is unused for sin series
	    // Approx operation count = (n + 5) mult and (2 * n + 2) add
	    var k = c.length,           // Point to one beyond last element
	        n = k - (sinp ? 1 : 0),
	        ar = 2 * (cosx - sinx) * (cosx + sinx), // 2 * cos(2 * x)
	        y0 = n & 1 ? c[--k] : 0, y1 = 0;        // accumulators for sum
	    // Now n is even
	    n = Math.floor(n/2);
	    while (n--) {
	      // Unroll loop x 2, so accumulators return to their original role
	      y1 = ar * y0 - y1 + c[--k];
	      y0 = ar * y1 - y0 + c[--k];
	    }
	    return (sinp ? 2 * sinx * cosx * y0 : // sin(2 * x) * y0
	            cosx * (y0 - y1));            // cos(x) * (y0 - y1)
	  };

	  astroid = function(x, y) {
	    // Solve k^4+2*k^3-(x^2+y^2-1)*k^2-2*y^2*k-y^2 = 0 for positive
	    // root k.  This solution is adapted from Geocentric::Reverse.
	    var k,
	        p = m.sq(x),
	        q = m.sq(y),
	        r = (p + q - 1) / 6,
	        S, r2, r3, disc, u, T3, T, ang, v, uv, w;
	    if ( !(q === 0 && r <= 0) ) {
	      // Avoid possible division by zero when r = 0 by multiplying
	      // equations for s and t by r^3 and r, resp.
	      S = p * q / 4;            // S = r^3 * s
	      r2 = m.sq(r);
	      r3 = r * r2;
	      // The discriminant of the quadratic equation for T3.  This is
	      // zero on the evolute curve p^(1/3)+q^(1/3) = 1
	      disc = S * (S + 2 * r3);
	      u = r;
	      if (disc >= 0) {
	        T3 = S + r3;
	        // Pick the sign on the sqrt to maximize abs(T3).  This
	        // minimizes loss of precision due to cancellation.  The
	        // result is unchanged because of the way the T is used
	        // in definition of u.
	        T3 += T3 < 0 ? -Math.sqrt(disc) : Math.sqrt(disc);    // T3 = (r * t)^3
	        // N.B. cbrt always returns the real root.  cbrt(-8) = -2.
	        T = m.cbrt(T3);     // T = r * t
	        // T can be zero; but then r2 / T -> 0.
	        u += T + (T !== 0 ? r2 / T : 0);
	      } else {
	        // T is complex, but the way u is defined the result is real.
	        ang = Math.atan2(Math.sqrt(-disc), -(S + r3));
	        // There are three possible cube roots.  We choose the
	        // root which avoids cancellation.  Note that disc < 0
	        // implies that r < 0.
	        u += 2 * r * Math.cos(ang / 3);
	      }
	      v = Math.sqrt(m.sq(u) + q);       // guaranteed positive
	      // Avoid loss of accuracy when u < 0.
	      uv = u < 0 ? q / (v - u) : u + v; // u+v, guaranteed positive
	      w = (uv - q) / (2 * v);           // positive?
	      // Rearrange expression for k to avoid loss of accuracy due to
	      // subtraction.  Division by 0 not possible because uv > 0, w >= 0.
	      k = uv / (Math.sqrt(uv + m.sq(w)) + w); // guaranteed positive
	    } else {                                  // q == 0 && r <= 0
	      // y = 0 with |x| <= 1.  Handle this case directly.
	      // for y small, positive root is k = abs(y)/sqrt(1-x^2)
	      k = 0;
	    }
	    return k;
	  };

	  A1m1f_coeff = [
	    // (1-eps)*A1-1, polynomial in eps2 of order 3
	      +1, 4, 64, 0, 256
	  ];

	  // The scale factor A1-1 = mean value of (d/dsigma)I1 - 1
	  g.A1m1f = function(eps) {
	    var p = Math.floor(nA1_/2),
	        t = m.polyval(p, A1m1f_coeff, 0, m.sq(eps)) / A1m1f_coeff[p + 1];
	    return (t + eps) / (1 - eps);
	  };

	  C1f_coeff = [
	    // C1[1]/eps^1, polynomial in eps2 of order 2
	      -1, 6, -16, 32,
	    // C1[2]/eps^2, polynomial in eps2 of order 2
	      -9, 64, -128, 2048,
	    // C1[3]/eps^3, polynomial in eps2 of order 1
	      +9, -16, 768,
	    // C1[4]/eps^4, polynomial in eps2 of order 1
	      +3, -5, 512,
	    // C1[5]/eps^5, polynomial in eps2 of order 0
	      -7, 1280,
	    // C1[6]/eps^6, polynomial in eps2 of order 0
	      -7, 2048
	  ];

	  // The coefficients C1[l] in the Fourier expansion of B1
	  g.C1f = function(eps, c) {
	    var eps2 = m.sq(eps),
	        d = eps,
	        o = 0,
	        l, p;
	    for (l = 1; l <= g.nC1_; ++l) {     // l is index of C1p[l]
	      p = Math.floor((g.nC1_ - l) / 2); // order of polynomial in eps^2
	      c[l] = d * m.polyval(p, C1f_coeff, o, eps2) / C1f_coeff[o + p + 1];
	      o += p + 2;
	      d *= eps;
	    }
	  };

	  C1pf_coeff = [
	    // C1p[1]/eps^1, polynomial in eps2 of order 2
	      +205, -432, 768, 1536,
	    // C1p[2]/eps^2, polynomial in eps2 of order 2
	      +4005, -4736, 3840, 12288,
	    // C1p[3]/eps^3, polynomial in eps2 of order 1
	      -225, 116, 384,
	    // C1p[4]/eps^4, polynomial in eps2 of order 1
	      -7173, 2695, 7680,
	    // C1p[5]/eps^5, polynomial in eps2 of order 0
	      +3467, 7680,
	    // C1p[6]/eps^6, polynomial in eps2 of order 0
	      +38081, 61440
	  ];

	  // The coefficients C1p[l] in the Fourier expansion of B1p
	  g.C1pf = function(eps, c) {
	    var eps2 = m.sq(eps),
	        d = eps,
	        o = 0,
	        l, p;
	    for (l = 1; l <= g.nC1p_; ++l) {     // l is index of C1p[l]
	      p = Math.floor((g.nC1p_ - l) / 2); // order of polynomial in eps^2
	      c[l] = d * m.polyval(p, C1pf_coeff, o, eps2) / C1pf_coeff[o + p + 1];
	      o += p + 2;
	      d *= eps;
	    }
	  };

	  A2m1f_coeff = [
	    // (eps+1)*A2-1, polynomial in eps2 of order 3
	      -11, -28, -192, 0, 256
	  ];

	  // The scale factor A2-1 = mean value of (d/dsigma)I2 - 1
	  g.A2m1f = function(eps) {
	    var p = Math.floor(nA2_/2),
	        t = m.polyval(p, A2m1f_coeff, 0, m.sq(eps)) / A2m1f_coeff[p + 1];
	    return (t - eps) / (1 + eps);
	  };

	  C2f_coeff = [
	    // C2[1]/eps^1, polynomial in eps2 of order 2
	      +1, 2, 16, 32,
	    // C2[2]/eps^2, polynomial in eps2 of order 2
	      +35, 64, 384, 2048,
	    // C2[3]/eps^3, polynomial in eps2 of order 1
	      +15, 80, 768,
	    // C2[4]/eps^4, polynomial in eps2 of order 1
	      +7, 35, 512,
	    // C2[5]/eps^5, polynomial in eps2 of order 0
	      +63, 1280,
	    // C2[6]/eps^6, polynomial in eps2 of order 0
	      +77, 2048
	  ];

	  // The coefficients C2[l] in the Fourier expansion of B2
	  g.C2f = function(eps, c) {
	    var eps2 = m.sq(eps),
	        d = eps,
	        o = 0,
	        l, p;
	    for (l = 1; l <= g.nC2_; ++l) {     // l is index of C2[l]
	      p = Math.floor((g.nC2_ - l) / 2); // order of polynomial in eps^2
	      c[l] = d * m.polyval(p, C2f_coeff, o, eps2) / C2f_coeff[o + p + 1];
	      o += p + 2;
	      d *= eps;
	    }
	  };

	  /**
	   * @class
	   * @property {number} a the equatorial radius (meters).
	   * @property {number} f the flattening.
	   * @summary Initialize a Geodesic object for a specific ellipsoid.
	   * @classdesc Performs geodesic calculations on an ellipsoid of revolution.
	   *   The routines for solving the direct and inverse problems return an
	   *   object with some of the following fields set: lat1, lon1, azi1, lat2,
	   *   lon2, azi2, s12, a12, m12, M12, M21, S12.  See {@tutorial 2-interface},
	   *   "The results".
	   * @example
	   * var GeographicLib = require("geographiclib"),
	   *     geod = GeographicLib.Geodesic.WGS84;
	   * var inv = geod.Inverse(1,2,3,4);
	   * console.log("lat1 = " + inv.lat1 + ", lon1 = " + inv.lon1 +
	   *             ", lat2 = " + inv.lat2 + ", lon2 = " + inv.lon2 +
	   *             ",\nazi1 = " + inv.azi1 + ", azi2 = " + inv.azi2 +
	   *             ", s12 = " + inv.s12);
	   * @param {number} a the equatorial radius of the ellipsoid (meters).
	   * @param {number} f the flattening of the ellipsoid.  Setting f = 0 gives
	   *   a sphere (on which geodesics are great circles).  Negative f gives a
	   *   prolate ellipsoid.
	   * @throws an error if the parameters are illegal.
	   */
	  g.Geodesic = function(a, f) {
	    this.a = a;
	    this.f = f;
	    this._f1 = 1 - this.f;
	    this._e2 = this.f * (2 - this.f);
	    this._ep2 = this._e2 / m.sq(this._f1); // e2 / (1 - e2)
	    this._n = this.f / ( 2 - this.f);
	    this._b = this.a * this._f1;
	    // authalic radius squared
	    this._c2 = (m.sq(this.a) + m.sq(this._b) *
	                (this._e2 === 0 ? 1 :
	                 (this._e2 > 0 ? m.atanh(Math.sqrt(this._e2)) :
	                  Math.atan(Math.sqrt(-this._e2))) /
	                 Math.sqrt(Math.abs(this._e2))))/2;
	    // The sig12 threshold for "really short".  Using the auxiliary sphere
	    // solution with dnm computed at (bet1 + bet2) / 2, the relative error in
	    // the azimuth consistency check is sig12^2 * abs(f) * min(1, 1-f/2) / 2.
	    // (Error measured for 1/100 < b/a < 100 and abs(f) >= 1/1000.  For a given
	    // f and sig12, the max error occurs for lines near the pole.  If the old
	    // rule for computing dnm = (dn1 + dn2)/2 is used, then the error increases
	    // by a factor of 2.)  Setting this equal to epsilon gives sig12 = etol2.
	    // Here 0.1 is a safety factor (error decreased by 100) and max(0.001,
	    // abs(f)) stops etol2 getting too large in the nearly spherical case.
	    this._etol2 = 0.1 * tol2_ /
	      Math.sqrt( Math.max(0.001, Math.abs(this.f)) *
	                 Math.min(1.0, 1 - this.f/2) / 2 );
	    if (!(isFinite(this.a) && this.a > 0))
	      throw new Error("Equatorial radius is not positive");
	    if (!(isFinite(this._b) && this._b > 0))
	      throw new Error("Polar semi-axis is not positive");
	    this._A3x = new Array(nA3x_);
	    this._C3x = new Array(nC3x_);
	    this._C4x = new Array(nC4x_);
	    this.A3coeff();
	    this.C3coeff();
	    this.C4coeff();
	  };

	  A3_coeff = [
	    // A3, coeff of eps^5, polynomial in n of order 0
	      -3, 128,
	    // A3, coeff of eps^4, polynomial in n of order 1
	      -2, -3, 64,
	    // A3, coeff of eps^3, polynomial in n of order 2
	      -1, -3, -1, 16,
	    // A3, coeff of eps^2, polynomial in n of order 2
	      +3, -1, -2, 8,
	    // A3, coeff of eps^1, polynomial in n of order 1
	      +1, -1, 2,
	    // A3, coeff of eps^0, polynomial in n of order 0
	      +1, 1
	  ];

	  // The scale factor A3 = mean value of (d/dsigma)I3
	  g.Geodesic.prototype.A3coeff = function() {
	    var o = 0, k = 0,
	        j, p;
	    for (j = nA3_ - 1; j >= 0; --j) { // coeff of eps^j
	      p = Math.min(nA3_ - j - 1, j);  // order of polynomial in n
	      this._A3x[k++] = m.polyval(p, A3_coeff, o, this._n) /
	        A3_coeff[o + p + 1];
	      o += p + 2;
	    }
	  };

	  C3_coeff = [
	    // C3[1], coeff of eps^5, polynomial in n of order 0
	      +3, 128,
	    // C3[1], coeff of eps^4, polynomial in n of order 1
	      +2, 5, 128,
	    // C3[1], coeff of eps^3, polynomial in n of order 2
	      -1, 3, 3, 64,
	    // C3[1], coeff of eps^2, polynomial in n of order 2
	      -1, 0, 1, 8,
	    // C3[1], coeff of eps^1, polynomial in n of order 1
	      -1, 1, 4,
	    // C3[2], coeff of eps^5, polynomial in n of order 0
	      +5, 256,
	    // C3[2], coeff of eps^4, polynomial in n of order 1
	      +1, 3, 128,
	    // C3[2], coeff of eps^3, polynomial in n of order 2
	      -3, -2, 3, 64,
	    // C3[2], coeff of eps^2, polynomial in n of order 2
	      +1, -3, 2, 32,
	    // C3[3], coeff of eps^5, polynomial in n of order 0
	      +7, 512,
	    // C3[3], coeff of eps^4, polynomial in n of order 1
	      -10, 9, 384,
	    // C3[3], coeff of eps^3, polynomial in n of order 2
	      +5, -9, 5, 192,
	    // C3[4], coeff of eps^5, polynomial in n of order 0
	      +7, 512,
	    // C3[4], coeff of eps^4, polynomial in n of order 1
	      -14, 7, 512,
	    // C3[5], coeff of eps^5, polynomial in n of order 0
	      +21, 2560
	  ];

	  // The coefficients C3[l] in the Fourier expansion of B3
	  g.Geodesic.prototype.C3coeff = function() {
	    var o = 0, k = 0,
	        l, j, p;
	    for (l = 1; l < g.nC3_; ++l) {        // l is index of C3[l]
	      for (j = g.nC3_ - 1; j >= l; --j) { // coeff of eps^j
	        p = Math.min(g.nC3_ - j - 1, j);  // order of polynomial in n
	        this._C3x[k++] = m.polyval(p, C3_coeff, o, this._n) /
	          C3_coeff[o + p + 1];
	        o += p + 2;
	      }
	    }
	  };

	  C4_coeff = [
	    // C4[0], coeff of eps^5, polynomial in n of order 0
	      +97, 15015,
	    // C4[0], coeff of eps^4, polynomial in n of order 1
	      +1088, 156, 45045,
	    // C4[0], coeff of eps^3, polynomial in n of order 2
	      -224, -4784, 1573, 45045,
	    // C4[0], coeff of eps^2, polynomial in n of order 3
	      -10656, 14144, -4576, -858, 45045,
	    // C4[0], coeff of eps^1, polynomial in n of order 4
	      +64, 624, -4576, 6864, -3003, 15015,
	    // C4[0], coeff of eps^0, polynomial in n of order 5
	      +100, 208, 572, 3432, -12012, 30030, 45045,
	    // C4[1], coeff of eps^5, polynomial in n of order 0
	      +1, 9009,
	    // C4[1], coeff of eps^4, polynomial in n of order 1
	      -2944, 468, 135135,
	    // C4[1], coeff of eps^3, polynomial in n of order 2
	      +5792, 1040, -1287, 135135,
	    // C4[1], coeff of eps^2, polynomial in n of order 3
	      +5952, -11648, 9152, -2574, 135135,
	    // C4[1], coeff of eps^1, polynomial in n of order 4
	      -64, -624, 4576, -6864, 3003, 135135,
	    // C4[2], coeff of eps^5, polynomial in n of order 0
	      +8, 10725,
	    // C4[2], coeff of eps^4, polynomial in n of order 1
	      +1856, -936, 225225,
	    // C4[2], coeff of eps^3, polynomial in n of order 2
	      -8448, 4992, -1144, 225225,
	    // C4[2], coeff of eps^2, polynomial in n of order 3
	      -1440, 4160, -4576, 1716, 225225,
	    // C4[3], coeff of eps^5, polynomial in n of order 0
	      -136, 63063,
	    // C4[3], coeff of eps^4, polynomial in n of order 1
	      +1024, -208, 105105,
	    // C4[3], coeff of eps^3, polynomial in n of order 2
	      +3584, -3328, 1144, 315315,
	    // C4[4], coeff of eps^5, polynomial in n of order 0
	      -128, 135135,
	    // C4[4], coeff of eps^4, polynomial in n of order 1
	      -2560, 832, 405405,
	    // C4[5], coeff of eps^5, polynomial in n of order 0
	      +128, 99099
	  ];

	  g.Geodesic.prototype.C4coeff = function() {
	    var o = 0, k = 0,
	        l, j, p;
	    for (l = 0; l < g.nC4_; ++l) {        // l is index of C4[l]
	      for (j = g.nC4_ - 1; j >= l; --j) { // coeff of eps^j
	        p = g.nC4_ - j - 1;               // order of polynomial in n
	        this._C4x[k++] = m.polyval(p, C4_coeff, o, this._n) /
	          C4_coeff[o + p + 1];
	        o += p + 2;
	      }
	    }
	  };

	  g.Geodesic.prototype.A3f = function(eps) {
	    // Evaluate A3
	    return m.polyval(nA3x_ - 1, this._A3x, 0, eps);
	  };

	  g.Geodesic.prototype.C3f = function(eps, c) {
	    // Evaluate C3 coeffs
	    // Elements c[1] thru c[nC3_ - 1] are set
	    var mult = 1,
	        o = 0,
	        l, p;
	    for (l = 1; l < g.nC3_; ++l) { // l is index of C3[l]
	      p = g.nC3_ - l - 1;          // order of polynomial in eps
	      mult *= eps;
	      c[l] = mult * m.polyval(p, this._C3x, o, eps);
	      o += p + 1;
	    }
	  };

	  g.Geodesic.prototype.C4f = function(eps, c) {
	    // Evaluate C4 coeffs
	    // Elements c[0] thru c[g.nC4_ - 1] are set
	    var mult = 1,
	        o = 0,
	        l, p;
	    for (l = 0; l < g.nC4_; ++l) { // l is index of C4[l]
	      p = g.nC4_ - l - 1;          // order of polynomial in eps
	      c[l] = mult * m.polyval(p, this._C4x, o, eps);
	      o += p + 1;
	      mult *= eps;
	    }
	  };

	  // return s12b, m12b, m0, M12, M21
	  g.Geodesic.prototype.Lengths = function(eps, sig12,
	                                          ssig1, csig1, dn1, ssig2, csig2, dn2,
	                                          cbet1, cbet2, outmask,
	                                          C1a, C2a) {
	    // Return m12b = (reduced length)/_b; also calculate s12b =
	    // distance/_b, and m0 = coefficient of secular term in
	    // expression for reduced length.
	    outmask &= g.OUT_MASK;
	    var vals = {},
	        m0x = 0, J12 = 0, A1 = 0, A2 = 0,
	        B1, B2, l, csig12, t;
	    if (outmask & (g.DISTANCE | g.REDUCEDLENGTH | g.GEODESICSCALE)) {
	      A1 = g.A1m1f(eps);
	      g.C1f(eps, C1a);
	      if (outmask & (g.REDUCEDLENGTH | g.GEODESICSCALE)) {
	        A2 = g.A2m1f(eps);
	        g.C2f(eps, C2a);
	        m0x = A1 - A2;
	        A2 = 1 + A2;
	      }
	      A1 = 1 + A1;
	    }
	    if (outmask & g.DISTANCE) {
	      B1 = g.SinCosSeries(true, ssig2, csig2, C1a) -
	        g.SinCosSeries(true, ssig1, csig1, C1a);
	      // Missing a factor of _b
	      vals.s12b = A1 * (sig12 + B1);
	      if (outmask & (g.REDUCEDLENGTH | g.GEODESICSCALE)) {
	        B2 = g.SinCosSeries(true, ssig2, csig2, C2a) -
	          g.SinCosSeries(true, ssig1, csig1, C2a);
	        J12 = m0x * sig12 + (A1 * B1 - A2 * B2);
	      }
	    } else if (outmask & (g.REDUCEDLENGTH | g.GEODESICSCALE)) {
	      // Assume here that nC1_ >= nC2_
	      for (l = 1; l <= g.nC2_; ++l)
	        C2a[l] = A1 * C1a[l] - A2 * C2a[l];
	      J12 = m0x * sig12 + (g.SinCosSeries(true, ssig2, csig2, C2a) -
	                           g.SinCosSeries(true, ssig1, csig1, C2a));
	    }
	    if (outmask & g.REDUCEDLENGTH) {
	      vals.m0 = m0x;
	      // Missing a factor of _b.
	      // Add parens around (csig1 * ssig2) and (ssig1 * csig2) to ensure
	      // accurate cancellation in the case of coincident points.
	      vals.m12b = dn2 * (csig1 * ssig2) - dn1 * (ssig1 * csig2) -
	        csig1 * csig2 * J12;
	    }
	    if (outmask & g.GEODESICSCALE) {
	      csig12 = csig1 * csig2 + ssig1 * ssig2;
	      t = this._ep2 * (cbet1 - cbet2) * (cbet1 + cbet2) / (dn1 + dn2);
	      vals.M12 = csig12 + (t * ssig2 - csig2 * J12) * ssig1 / dn1;
	      vals.M21 = csig12 - (t * ssig1 - csig1 * J12) * ssig2 / dn2;
	    }
	    return vals;
	  };

	  // return sig12, salp1, calp1, salp2, calp2, dnm
	  g.Geodesic.prototype.InverseStart = function(sbet1, cbet1, dn1,
	                                               sbet2, cbet2, dn2,
	                                               lam12, slam12, clam12,
	                                               C1a, C2a) {
	    // Return a starting point for Newton's method in salp1 and calp1
	    // (function value is -1).  If Newton's method doesn't need to be
	    // used, return also salp2 and calp2 and function value is sig12.
	    // salp2, calp2 only updated if return val >= 0.
	    var vals = {},
	        // bet12 = bet2 - bet1 in [0, pi); bet12a = bet2 + bet1 in (-pi, 0]
	        sbet12 = sbet2 * cbet1 - cbet2 * sbet1,
	        cbet12 = cbet2 * cbet1 + sbet2 * sbet1,
	        sbet12a, shortline, omg12, sbetm2, somg12, comg12, t, ssig12, csig12,
	        x, y, lamscale, betscale, k2, eps, cbet12a, bet12a, m12b, m0, nvals,
	        k, omg12a, lam12x;
	    vals.sig12 = -1;        // Return value
	    // Volatile declaration needed to fix inverse cases
	    // 88.202499451857 0 -88.202499451857 179.981022032992859592
	    // 89.262080389218 0 -89.262080389218 179.992207982775375662
	    // 89.333123580033 0 -89.333123580032997687 179.99295812360148422
	    // which otherwise fail with g++ 4.4.4 x86 -O3
	    sbet12a = sbet2 * cbet1;
	    sbet12a += cbet2 * sbet1;

	    shortline = cbet12 >= 0 && sbet12 < 0.5 && cbet2 * lam12 < 0.5;
	    if (shortline) {
	      sbetm2 = m.sq(sbet1 + sbet2);
	      // sin((bet1+bet2)/2)^2
	      // =  (sbet1 + sbet2)^2 / ((sbet1 + sbet2)^2 + (cbet1 + cbet2)^2)
	      sbetm2 /= sbetm2 + m.sq(cbet1 + cbet2);
	      vals.dnm = Math.sqrt(1 + this._ep2 * sbetm2);
	      omg12 = lam12 / (this._f1 * vals.dnm);
	      somg12 = Math.sin(omg12); comg12 = Math.cos(omg12);
	    } else {
	      somg12 = slam12; comg12 = clam12;
	    }

	    vals.salp1 = cbet2 * somg12;
	    vals.calp1 = comg12 >= 0 ?
	      sbet12 + cbet2 * sbet1 * m.sq(somg12) / (1 + comg12) :
	      sbet12a - cbet2 * sbet1 * m.sq(somg12) / (1 - comg12);

	    ssig12 = m.hypot(vals.salp1, vals.calp1);
	    csig12 = sbet1 * sbet2 + cbet1 * cbet2 * comg12;
	    if (shortline && ssig12 < this._etol2) {
	      // really short lines
	      vals.salp2 = cbet1 * somg12;
	      vals.calp2 = sbet12 - cbet1 * sbet2 *
	        (comg12 >= 0 ? m.sq(somg12) / (1 + comg12) : 1 - comg12);
	      // norm(vals.salp2, vals.calp2);
	      t = m.hypot(vals.salp2, vals.calp2); vals.salp2 /= t; vals.calp2 /= t;
	      // Set return value
	      vals.sig12 = Math.atan2(ssig12, csig12);
	    } else if (Math.abs(this._n) > 0.1 || // Skip astroid calc if too eccentric
	               csig12 >= 0 ||
	               ssig12 >= 6 * Math.abs(this._n) * Math.PI * m.sq(cbet1)) {
	      // Nothing to do, zeroth order spherical approximation is OK
	    } else {
	      // Scale lam12 and bet2 to x, y coordinate system where antipodal
	      // point is at origin and singular point is at y = 0, x = -1.
	      lam12x = Math.atan2(-slam12, -clam12); // lam12 - pi
	      if (this.f >= 0) {       // In fact f == 0 does not get here
	        // x = dlong, y = dlat
	        k2 = m.sq(sbet1) * this._ep2;
	        eps = k2 / (2 * (1 + Math.sqrt(1 + k2)) + k2);
	        lamscale = this.f * cbet1 * this.A3f(eps) * Math.PI;
	        betscale = lamscale * cbet1;

	        x = lam12x / lamscale;
	        y = sbet12a / betscale;
	      } else {                  // f < 0
	        // x = dlat, y = dlong
	        cbet12a = cbet2 * cbet1 - sbet2 * sbet1;
	        bet12a = Math.atan2(sbet12a, cbet12a);
	        // In the case of lon12 = 180, this repeats a calculation made
	        // in Inverse.
	        nvals = this.Lengths(this._n, Math.PI + bet12a,
	                             sbet1, -cbet1, dn1, sbet2, cbet2, dn2,
	                             cbet1, cbet2, g.REDUCEDLENGTH, C1a, C2a);
	        m12b = nvals.m12b; m0 = nvals.m0;
	        x = -1 + m12b / (cbet1 * cbet2 * m0 * Math.PI);
	        betscale = x < -0.01 ? sbet12a / x :
	          -this.f * m.sq(cbet1) * Math.PI;
	        lamscale = betscale / cbet1;
	        y = lam12 / lamscale;
	      }

	      if (y > -tol1_ && x > -1 - xthresh_) {
	        // strip near cut
	        if (this.f >= 0) {
	          vals.salp1 = Math.min(1, -x);
	          vals.calp1 = -Math.sqrt(1 - m.sq(vals.salp1));
	        } else {
	          vals.calp1 = Math.max(x > -tol1_ ? 0 : -1, x);
	          vals.salp1 = Math.sqrt(1 - m.sq(vals.calp1));
	        }
	      } else {
	        // Estimate alp1, by solving the astroid problem.
	        //
	        // Could estimate alpha1 = theta + pi/2, directly, i.e.,
	        //   calp1 = y/k; salp1 = -x/(1+k);  for f >= 0
	        //   calp1 = x/(1+k); salp1 = -y/k;  for f < 0 (need to check)
	        //
	        // However, it's better to estimate omg12 from astroid and use
	        // spherical formula to compute alp1.  This reduces the mean number of
	        // Newton iterations for astroid cases from 2.24 (min 0, max 6) to 2.12
	        // (min 0 max 5).  The changes in the number of iterations are as
	        // follows:
	        //
	        // change percent
	        //    1       5
	        //    0      78
	        //   -1      16
	        //   -2       0.6
	        //   -3       0.04
	        //   -4       0.002
	        //
	        // The histogram of iterations is (m = number of iterations estimating
	        // alp1 directly, n = number of iterations estimating via omg12, total
	        // number of trials = 148605):
	        //
	        //  iter    m      n
	        //    0   148    186
	        //    1 13046  13845
	        //    2 93315 102225
	        //    3 36189  32341
	        //    4  5396      7
	        //    5   455      1
	        //    6    56      0
	        //
	        // Because omg12 is near pi, estimate work with omg12a = pi - omg12
	        k = astroid(x, y);
	        omg12a = lamscale * ( this.f >= 0 ? -x * k/(1 + k) : -y * (1 + k)/k );
	        somg12 = Math.sin(omg12a); comg12 = -Math.cos(omg12a);
	        // Update spherical estimate of alp1 using omg12 instead of
	        // lam12
	        vals.salp1 = cbet2 * somg12;
	        vals.calp1 = sbet12a -
	          cbet2 * sbet1 * m.sq(somg12) / (1 - comg12);
	      }
	    }
	    // Sanity check on starting guess.  Backwards check allows NaN through.
	    if (!(vals.salp1 <= 0.0)) {
	      // norm(vals.salp1, vals.calp1);
	      t = m.hypot(vals.salp1, vals.calp1); vals.salp1 /= t; vals.calp1 /= t;
	    } else {
	      vals.salp1 = 1; vals.calp1 = 0;
	    }
	    return vals;
	  };

	  // return lam12, salp2, calp2, sig12, ssig1, csig1, ssig2, csig2, eps,
	  // domg12, dlam12,
	  g.Geodesic.prototype.Lambda12 = function(sbet1, cbet1, dn1,
	                                           sbet2, cbet2, dn2,
	                                           salp1, calp1, slam120, clam120,
	                                           diffp, C1a, C2a, C3a) {
	    var vals = {},
	        t, salp0, calp0,
	        somg1, comg1, somg2, comg2, somg12, comg12, B312, eta, k2, nvals;
	    if (sbet1 === 0 && calp1 === 0)
	      // Break degeneracy of equatorial line.  This case has already been
	      // handled.
	      calp1 = -g.tiny_;

	    // sin(alp1) * cos(bet1) = sin(alp0)
	    salp0 = salp1 * cbet1;
	    calp0 = m.hypot(calp1, salp1 * sbet1); // calp0 > 0

	    // tan(bet1) = tan(sig1) * cos(alp1)
	    // tan(omg1) = sin(alp0) * tan(sig1) = tan(omg1)=tan(alp1)*sin(bet1)
	    vals.ssig1 = sbet1; somg1 = salp0 * sbet1;
	    vals.csig1 = comg1 = calp1 * cbet1;
	    // norm(vals.ssig1, vals.csig1);
	    t = m.hypot(vals.ssig1, vals.csig1); vals.ssig1 /= t; vals.csig1 /= t;
	    // norm(somg1, comg1); -- don't need to normalize!

	    // Enforce symmetries in the case abs(bet2) = -bet1.  Need to be careful
	    // about this case, since this can yield singularities in the Newton
	    // iteration.
	    // sin(alp2) * cos(bet2) = sin(alp0)
	    vals.salp2 = cbet2 !== cbet1 ? salp0 / cbet2 : salp1;
	    // calp2 = sqrt(1 - sq(salp2))
	    //       = sqrt(sq(calp0) - sq(sbet2)) / cbet2
	    // and subst for calp0 and rearrange to give (choose positive sqrt
	    // to give alp2 in [0, pi/2]).
	    vals.calp2 = cbet2 !== cbet1 || Math.abs(sbet2) !== -sbet1 ?
	      Math.sqrt(m.sq(calp1 * cbet1) + (cbet1 < -sbet1 ?
	                                       (cbet2 - cbet1) * (cbet1 + cbet2) :
	                                       (sbet1 - sbet2) * (sbet1 + sbet2))) /
	      cbet2 : Math.abs(calp1);
	    // tan(bet2) = tan(sig2) * cos(alp2)
	    // tan(omg2) = sin(alp0) * tan(sig2).
	    vals.ssig2 = sbet2; somg2 = salp0 * sbet2;
	    vals.csig2 = comg2 = vals.calp2 * cbet2;
	    // norm(vals.ssig2, vals.csig2);
	    t = m.hypot(vals.ssig2, vals.csig2); vals.ssig2 /= t; vals.csig2 /= t;
	    // norm(somg2, comg2); -- don't need to normalize!

	    // sig12 = sig2 - sig1, limit to [0, pi]
	    vals.sig12 = Math.atan2(Math.max(0, vals.csig1 * vals.ssig2 -
	                                        vals.ssig1 * vals.csig2),
	                                        vals.csig1 * vals.csig2 +
	                                        vals.ssig1 * vals.ssig2);

	    // omg12 = omg2 - omg1, limit to [0, pi]
	    somg12 = Math.max(0, comg1 * somg2 - somg1 * comg2);
	    comg12 =             comg1 * comg2 + somg1 * somg2;
	    // eta = omg12 - lam120
	    eta = Math.atan2(somg12 * clam120 - comg12 * slam120,
	                     comg12 * clam120 + somg12 * slam120);
	    k2 = m.sq(calp0) * this._ep2;
	    vals.eps = k2 / (2 * (1 + Math.sqrt(1 + k2)) + k2);
	    this.C3f(vals.eps, C3a);
	    B312 = (g.SinCosSeries(true, vals.ssig2, vals.csig2, C3a) -
	            g.SinCosSeries(true, vals.ssig1, vals.csig1, C3a));
	    vals.domg12 =  -this.f * this.A3f(vals.eps) * salp0 * (vals.sig12 + B312);
	    vals.lam12 = eta + vals.domg12;
	    if (diffp) {
	      if (vals.calp2 === 0)
	        vals.dlam12 = -2 * this._f1 * dn1 / sbet1;
	      else {
	        nvals = this.Lengths(vals.eps, vals.sig12,
	                             vals.ssig1, vals.csig1, dn1,
	                             vals.ssig2, vals.csig2, dn2,
	                             cbet1, cbet2, g.REDUCEDLENGTH, C1a, C2a);
	        vals.dlam12 = nvals.m12b;
	        vals.dlam12 *= this._f1 / (vals.calp2 * cbet2);
	      }
	    }
	    return vals;
	  };

	  /**
	   * @summary Solve the inverse geodesic problem.
	   * @param {number} lat1 the latitude of the first point in degrees.
	   * @param {number} lon1 the longitude of the first point in degrees.
	   * @param {number} lat2 the latitude of the second point in degrees.
	   * @param {number} lon2 the longitude of the second point in degrees.
	   * @param {bitmask} [outmask = STANDARD] which results to include.
	   * @returns {object} the requested results
	   * @description The lat1, lon1, lat2, lon2, and a12 fields of the result are
	   *   always set.  For details on the outmask parameter, see {@tutorial
	   *   2-interface}, "The outmask and caps parameters".
	   */
	  g.Geodesic.prototype.Inverse = function(lat1, lon1, lat2, lon2, outmask) {
	    var r, vals;
	    if (!outmask) outmask = g.STANDARD;
	    if (outmask === g.LONG_UNROLL) outmask |= g.STANDARD;
	    outmask &= g.OUT_MASK;
	    r = this.InverseInt(lat1, lon1, lat2, lon2, outmask);
	    vals = r.vals;
	    if (outmask & g.AZIMUTH) {
	      vals.azi1 = m.atan2d(r.salp1, r.calp1);
	      vals.azi2 = m.atan2d(r.salp2, r.calp2);
	    }
	    return vals;
	  };

	  g.Geodesic.prototype.InverseInt = function(lat1, lon1, lat2, lon2, outmask) {
	    var vals = {},
	        lon12, lon12s, lonsign, t, swapp, latsign,
	        sbet1, cbet1, sbet2, cbet2, s12x, m12x,
	        dn1, dn2, lam12, slam12, clam12,
	        sig12, calp1, salp1, calp2, salp2, C1a, C2a, C3a, meridian, nvals,
	        ssig1, csig1, ssig2, csig2, eps, omg12, dnm,
	        numit, salp1a, calp1a, salp1b, calp1b,
	        tripn, tripb, v, dv, dalp1, sdalp1, cdalp1, nsalp1,
	        lengthmask, salp0, calp0, alp12, k2, A4, C4a, B41, B42,
	        somg12, comg12, domg12, dbet1, dbet2, salp12, calp12, sdomg12, cdomg12;
	    // Compute longitude difference (AngDiff does this carefully).  Result is
	    // in [-180, 180] but -180 is only for west-going geodesics.  180 is for
	    // east-going and meridional geodesics.
	    vals.lat1 = lat1 = m.LatFix(lat1); vals.lat2 = lat2 = m.LatFix(lat2);
	    // If really close to the equator, treat as on equator.
	    lat1 = m.AngRound(lat1);
	    lat2 = m.AngRound(lat2);
	    lon12 = m.AngDiff(lon1, lon2); lon12s = lon12.t; lon12 = lon12.s;
	    if (outmask & g.LONG_UNROLL) {
	      vals.lon1 = lon1; vals.lon2 = (lon1 + lon12) + lon12s;
	    } else {
	      vals.lon1 = m.AngNormalize(lon1); vals.lon2 = m.AngNormalize(lon2);
	    }
	    // Make longitude difference positive.
	    lonsign = lon12 >= 0 ? 1 : -1;
	    // If very close to being on the same half-meridian, then make it so.
	    lon12 = lonsign * m.AngRound(lon12);
	    lon12s = m.AngRound((180 - lon12) - lonsign * lon12s);
	    lam12 = lon12 * m.degree;
	    t = m.sincosd(lon12 > 90 ? lon12s : lon12);
	    slam12 = t.s; clam12 = (lon12 > 90 ? -1 : 1) * t.c;

	    // Swap points so that point with higher (abs) latitude is point 1
	    // If one latitude is a nan, then it becomes lat1.
	    swapp = Math.abs(lat1) < Math.abs(lat2) ? -1 : 1;
	    if (swapp < 0) {
	      lonsign *= -1;
	      t = lat1;
	      lat1 = lat2;
	      lat2 = t;
	      // swap(lat1, lat2);
	    }
	    // Make lat1 <= 0
	    latsign = lat1 < 0 ? 1 : -1;
	    lat1 *= latsign;
	    lat2 *= latsign;
	    // Now we have
	    //
	    //     0 <= lon12 <= 180
	    //     -90 <= lat1 <= 0
	    //     lat1 <= lat2 <= -lat1
	    //
	    // longsign, swapp, latsign register the transformation to bring the
	    // coordinates to this canonical form.  In all cases, 1 means no change was
	    // made.  We make these transformations so that there are few cases to
	    // check, e.g., on verifying quadrants in atan2.  In addition, this
	    // enforces some symmetries in the results returned.

	    t = m.sincosd(lat1); sbet1 = this._f1 * t.s; cbet1 = t.c;
	    // norm(sbet1, cbet1);
	    t = m.hypot(sbet1, cbet1); sbet1 /= t; cbet1 /= t;
	    // Ensure cbet1 = +epsilon at poles
	    cbet1 = Math.max(g.tiny_, cbet1);

	    t = m.sincosd(lat2); sbet2 = this._f1 * t.s; cbet2 = t.c;
	    // norm(sbet2, cbet2);
	    t = m.hypot(sbet2, cbet2); sbet2 /= t; cbet2 /= t;
	    // Ensure cbet2 = +epsilon at poles
	    cbet2 = Math.max(g.tiny_, cbet2);

	    // If cbet1 < -sbet1, then cbet2 - cbet1 is a sensitive measure of the
	    // |bet1| - |bet2|.  Alternatively (cbet1 >= -sbet1), abs(sbet2) + sbet1 is
	    // a better measure.  This logic is used in assigning calp2 in Lambda12.
	    // Sometimes these quantities vanish and in that case we force bet2 = +/-
	    // bet1 exactly.  An example where is is necessary is the inverse problem
	    // 48.522876735459 0 -48.52287673545898293 179.599720456223079643
	    // which failed with Visual Studio 10 (Release and Debug)

	    if (cbet1 < -sbet1) {
	      if (cbet2 === cbet1)
	        sbet2 = sbet2 < 0 ? sbet1 : -sbet1;
	    } else {
	      if (Math.abs(sbet2) === -sbet1)
	        cbet2 = cbet1;
	    }

	    dn1 = Math.sqrt(1 + this._ep2 * m.sq(sbet1));
	    dn2 = Math.sqrt(1 + this._ep2 * m.sq(sbet2));

	    // index zero elements of these arrays are unused
	    C1a = new Array(g.nC1_ + 1);
	    C2a = new Array(g.nC2_ + 1);
	    C3a = new Array(g.nC3_);

	    meridian = lat1 === -90 || slam12 === 0;
	    if (meridian) {

	      // Endpoints are on a single full meridian, so the geodesic might
	      // lie on a meridian.

	      calp1 = clam12; salp1 = slam12; // Head to the target longitude
	      calp2 = 1; salp2 = 0;           // At the target we're heading north

	      // tan(bet) = tan(sig) * cos(alp)
	      ssig1 = sbet1; csig1 = calp1 * cbet1;
	      ssig2 = sbet2; csig2 = calp2 * cbet2;

	      // sig12 = sig2 - sig1
	      sig12 = Math.atan2(Math.max(0, csig1 * ssig2 - ssig1 * csig2),
	                                     csig1 * csig2 + ssig1 * ssig2);
	      nvals = this.Lengths(this._n, sig12,
	                           ssig1, csig1, dn1, ssig2, csig2, dn2, cbet1, cbet2,
	                           outmask | g.DISTANCE | g.REDUCEDLENGTH,
	                           C1a, C2a);
	      s12x = nvals.s12b;
	      m12x = nvals.m12b;
	      // Ignore m0
	      if (outmask & g.GEODESICSCALE) {
	        vals.M12 = nvals.M12;
	        vals.M21 = nvals.M21;
	      }
	      // Add the check for sig12 since zero length geodesics might yield
	      // m12 < 0.  Test case was
	      //
	      //    echo 20.001 0 20.001 0 | GeodSolve -i
	      //
	      // In fact, we will have sig12 > pi/2 for meridional geodesic
	      // which is not a shortest path.
	      if (sig12 < 1 || m12x >= 0) {
	        // Need at least 2, to handle 90 0 90 180
	        if (sig12 < 3 * g.tiny_)
	          sig12 = m12x = s12x = 0;
	        m12x *= this._b;
	        s12x *= this._b;
	        vals.a12 = sig12 / m.degree;
	      } else
	        // m12 < 0, i.e., prolate and too close to anti-podal
	        meridian = false;
	    }

	    somg12 = 2;
	    if (!meridian &&
	        sbet1 === 0 &&           // and sbet2 == 0
	        (this.f <= 0 || lon12s >= this.f * 180)) {

	      // Geodesic runs along equator
	      calp1 = calp2 = 0; salp1 = salp2 = 1;
	      s12x = this.a * lam12;
	      sig12 = omg12 = lam12 / this._f1;
	      m12x = this._b * Math.sin(sig12);
	      if (outmask & g.GEODESICSCALE)
	        vals.M12 = vals.M21 = Math.cos(sig12);
	      vals.a12 = lon12 / this._f1;

	    } else if (!meridian) {

	      // Now point1 and point2 belong within a hemisphere bounded by a
	      // meridian and geodesic is neither meridional or equatorial.

	      // Figure a starting point for Newton's method
	      nvals = this.InverseStart(sbet1, cbet1, dn1, sbet2, cbet2, dn2,
	                                lam12, slam12, clam12, C1a, C2a);
	      sig12 = nvals.sig12;
	      salp1 = nvals.salp1;
	      calp1 = nvals.calp1;

	      if (sig12 >= 0) {
	        salp2 = nvals.salp2;
	        calp2 = nvals.calp2;
	        // Short lines (InverseStart sets salp2, calp2, dnm)

	        dnm = nvals.dnm;
	        s12x = sig12 * this._b * dnm;
	        m12x = m.sq(dnm) * this._b * Math.sin(sig12 / dnm);
	        if (outmask & g.GEODESICSCALE)
	          vals.M12 = vals.M21 = Math.cos(sig12 / dnm);
	        vals.a12 = sig12 / m.degree;
	        omg12 = lam12 / (this._f1 * dnm);
	      } else {

	        // Newton's method.  This is a straightforward solution of f(alp1) =
	        // lambda12(alp1) - lam12 = 0 with one wrinkle.  f(alp) has exactly one
	        // root in the interval (0, pi) and its derivative is positive at the
	        // root.  Thus f(alp) is positive for alp > alp1 and negative for alp <
	        // alp1.  During the course of the iteration, a range (alp1a, alp1b) is
	        // maintained which brackets the root and with each evaluation of
	        // f(alp) the range is shrunk if possible.  Newton's method is
	        // restarted whenever the derivative of f is negative (because the new
	        // value of alp1 is then further from the solution) or if the new
	        // estimate of alp1 lies outside (0,pi); in this case, the new starting
	        // guess is taken to be (alp1a + alp1b) / 2.
	        numit = 0;
	        // Bracketing range
	        salp1a = g.tiny_; calp1a = 1; salp1b = g.tiny_; calp1b = -1;
	        for (tripn = false, tripb = false; numit < maxit2_; ++numit) {
	          // the WGS84 test set: mean = 1.47, sd = 1.25, max = 16
	          // WGS84 and random input: mean = 2.85, sd = 0.60
	          nvals = this.Lambda12(sbet1, cbet1, dn1, sbet2, cbet2, dn2,
	                                salp1, calp1, slam12, clam12, numit < maxit1_,
	                                C1a, C2a, C3a);
	          v = nvals.lam12;
	          salp2 = nvals.salp2;
	          calp2 = nvals.calp2;
	          sig12 = nvals.sig12;
	          ssig1 = nvals.ssig1;
	          csig1 = nvals.csig1;
	          ssig2 = nvals.ssig2;
	          csig2 = nvals.csig2;
	          eps = nvals.eps;
	          domg12 = nvals.domg12;
	          dv = nvals.dlam12;

	          // 2 * tol0 is approximately 1 ulp for a number in [0, pi].
	          // Reversed test to allow escape with NaNs
	          if (tripb || !(Math.abs(v) >= (tripn ? 8 : 1) * tol0_))
	            break;
	          // Update bracketing values
	          if (v > 0 && (numit < maxit1_ || calp1/salp1 > calp1b/salp1b)) {
	            salp1b = salp1; calp1b = calp1;
	          } else if (v < 0 &&
	                     (numit < maxit1_ || calp1/salp1 < calp1a/salp1a)) {
	            salp1a = salp1; calp1a = calp1;
	          }
	          if (numit < maxit1_ && dv > 0) {
	            dalp1 = -v/dv;
	            sdalp1 = Math.sin(dalp1); cdalp1 = Math.cos(dalp1);
	            nsalp1 = salp1 * cdalp1 + calp1 * sdalp1;
	            if (nsalp1 > 0 && Math.abs(dalp1) < Math.PI) {
	              calp1 = calp1 * cdalp1 - salp1 * sdalp1;
	              salp1 = nsalp1;
	              // norm(salp1, calp1);
	              t = m.hypot(salp1, calp1); salp1 /= t; calp1 /= t;
	              // In some regimes we don't get quadratic convergence because
	              // slope -> 0.  So use convergence conditions based on epsilon
	              // instead of sqrt(epsilon).
	              tripn = Math.abs(v) <= 16 * tol0_;
	              continue;
	            }
	          }
	          // Either dv was not positive or updated value was outside legal
	          // range.  Use the midpoint of the bracket as the next estimate.
	          // This mechanism is not needed for the WGS84 ellipsoid, but it does
	          // catch problems with more eccentric ellipsoids.  Its efficacy is
	          // such for the WGS84 test set with the starting guess set to alp1 =
	          // 90deg:
	          // the WGS84 test set: mean = 5.21, sd = 3.93, max = 24
	          // WGS84 and random input: mean = 4.74, sd = 0.99
	          salp1 = (salp1a + salp1b)/2;
	          calp1 = (calp1a + calp1b)/2;
	          // norm(salp1, calp1);
	          t = m.hypot(salp1, calp1); salp1 /= t; calp1 /= t;
	          tripn = false;
	          tripb = (Math.abs(salp1a - salp1) + (calp1a - calp1) < tolb_ ||
	                   Math.abs(salp1 - salp1b) + (calp1 - calp1b) < tolb_);
	        }
	        lengthmask = outmask |
	            (outmask & (g.REDUCEDLENGTH | g.GEODESICSCALE) ?
	             g.DISTANCE : g.NONE);
	        nvals = this.Lengths(eps, sig12,
	                             ssig1, csig1, dn1, ssig2, csig2, dn2,
	                             cbet1, cbet2,
	                             lengthmask, C1a, C2a);
	        s12x = nvals.s12b;
	        m12x = nvals.m12b;
	        // Ignore m0
	        if (outmask & g.GEODESICSCALE) {
	          vals.M12 = nvals.M12;
	          vals.M21 = nvals.M21;
	        }
	        m12x *= this._b;
	        s12x *= this._b;
	        vals.a12 = sig12 / m.degree;
	        if (outmask & g.AREA) {
	          // omg12 = lam12 - domg12
	          sdomg12 = Math.sin(domg12); cdomg12 = Math.cos(domg12);
	          somg12 = slam12 * cdomg12 - clam12 * sdomg12;
	          comg12 = clam12 * cdomg12 + slam12 * sdomg12;
	        }
	      }
	    }

	    if (outmask & g.DISTANCE)
	      vals.s12 = 0 + s12x;      // Convert -0 to 0

	    if (outmask & g.REDUCEDLENGTH)
	      vals.m12 = 0 + m12x;      // Convert -0 to 0

	    if (outmask & g.AREA) {
	      // From Lambda12: sin(alp1) * cos(bet1) = sin(alp0)
	      salp0 = salp1 * cbet1;
	      calp0 = m.hypot(calp1, salp1 * sbet1); // calp0 > 0
	      if (calp0 !== 0 && salp0 !== 0) {
	        // From Lambda12: tan(bet) = tan(sig) * cos(alp)
	        ssig1 = sbet1; csig1 = calp1 * cbet1;
	        ssig2 = sbet2; csig2 = calp2 * cbet2;
	        k2 = m.sq(calp0) * this._ep2;
	        eps = k2 / (2 * (1 + Math.sqrt(1 + k2)) + k2);
	        // Multiplier = a^2 * e^2 * cos(alpha0) * sin(alpha0).
	        A4 = m.sq(this.a) * calp0 * salp0 * this._e2;
	        // norm(ssig1, csig1);
	        t = m.hypot(ssig1, csig1); ssig1 /= t; csig1 /= t;
	        // norm(ssig2, csig2);
	        t = m.hypot(ssig2, csig2); ssig2 /= t; csig2 /= t;
	        C4a = new Array(g.nC4_);
	        this.C4f(eps, C4a);
	        B41 = g.SinCosSeries(false, ssig1, csig1, C4a);
	        B42 = g.SinCosSeries(false, ssig2, csig2, C4a);
	        vals.S12 = A4 * (B42 - B41);
	      } else
	        // Avoid problems with indeterminate sig1, sig2 on equator
	        vals.S12 = 0;
	      if (!meridian && somg12 > 1) {
	        somg12 = Math.sin(omg12); comg12 = Math.cos(omg12);
	      }
	      if (!meridian &&
	          comg12 > -0.7071 &&      // Long difference not too big
	          sbet2 - sbet1 < 1.75) { // Lat difference not too big
	        // Use tan(Gamma/2) = tan(omg12/2)
	        // * (tan(bet1/2)+tan(bet2/2))/(1+tan(bet1/2)*tan(bet2/2))
	        // with tan(x/2) = sin(x)/(1+cos(x))
	        domg12 = 1 + comg12; dbet1 = 1 + cbet1; dbet2 = 1 + cbet2;
	        alp12 = 2 * Math.atan2( somg12 * (sbet1*dbet2 + sbet2*dbet1),
	                                domg12 * (sbet1*sbet2 + dbet1*dbet2) );
	      } else {
	        // alp12 = alp2 - alp1, used in atan2 so no need to normalize
	        salp12 = salp2 * calp1 - calp2 * salp1;
	        calp12 = calp2 * calp1 + salp2 * salp1;
	        // The right thing appears to happen if alp1 = +/-180 and alp2 = 0, viz
	        // salp12 = -0 and alp12 = -180.  However this depends on the sign
	        // being attached to 0 correctly.  The following ensures the correct
	        // behavior.
	        if (salp12 === 0 && calp12 < 0) {
	          salp12 = g.tiny_ * calp1;
	          calp12 = -1;
	        }
	        alp12 = Math.atan2(salp12, calp12);
	      }
	      vals.S12 += this._c2 * alp12;
	      vals.S12 *= swapp * lonsign * latsign;
	      // Convert -0 to 0
	      vals.S12 += 0;
	    }

	    // Convert calp, salp to azimuth accounting for lonsign, swapp, latsign.
	    if (swapp < 0) {
	      t = salp1;
	      salp1 = salp2;
	      salp2 = t;
	      // swap(salp1, salp2);
	      t = calp1;
	      calp1 = calp2;
	      calp2 = t;
	      // swap(calp1, calp2);
	      if (outmask & g.GEODESICSCALE) {
	        t = vals.M12;
	        vals.M12 = vals.M21;
	        vals.M21 = t;
	        // swap(vals.M12, vals.M21);
	      }
	    }

	    salp1 *= swapp * lonsign; calp1 *= swapp * latsign;
	    salp2 *= swapp * lonsign; calp2 *= swapp * latsign;

	    return {vals: vals,
	            salp1: salp1, calp1: calp1,
	            salp2: salp2, calp2: calp2};
	  };

	  /**
	   * @summary Solve the general direct geodesic problem.
	   * @param {number} lat1 the latitude of the first point in degrees.
	   * @param {number} lon1 the longitude of the first point in degrees.
	   * @param {number} azi1 the azimuth at the first point in degrees.
	   * @param {bool} arcmode is the next parameter an arc length?
	   * @param {number} s12_a12 the (arcmode ? arc length : distance) from the
	   *   first point to the second in (arcmode ? degrees : meters).
	   * @param {bitmask} [outmask = STANDARD] which results to include.
	   * @returns {object} the requested results.
	   * @description The lat1, lon1, azi1, and a12 fields of the result are always
	   *   set; s12 is included if arcmode is false.  For details on the outmask
	   *   parameter, see {@tutorial 2-interface}, "The outmask and caps
	   *   parameters".
	   */
	  g.Geodesic.prototype.GenDirect = function(lat1, lon1, azi1,
	                                            arcmode, s12_a12, outmask) {
	    var line;
	    if (!outmask) outmask = g.STANDARD;
	    else if (outmask === g.LONG_UNROLL) outmask |= g.STANDARD;
	    // Automatically supply DISTANCE_IN if necessary
	    if (!arcmode) outmask |= g.DISTANCE_IN;
	    line = new l.GeodesicLine(this, lat1, lon1, azi1, outmask);
	    return line.GenPosition(arcmode, s12_a12, outmask);
	  };

	  /**
	   * @summary Solve the direct geodesic problem.
	   * @param {number} lat1 the latitude of the first point in degrees.
	   * @param {number} lon1 the longitude of the first point in degrees.
	   * @param {number} azi1 the azimuth at the first point in degrees.
	   * @param {number} s12 the distance from the first point to the second in
	   *   meters.
	   * @param {bitmask} [outmask = STANDARD] which results to include.
	   * @returns {object} the requested results.
	   * @description The lat1, lon1, azi1, s12, and a12 fields of the result are
	   *   always set.  For details on the outmask parameter, see {@tutorial
	   *   2-interface}, "The outmask and caps parameters".
	   */
	  g.Geodesic.prototype.Direct = function(lat1, lon1, azi1, s12, outmask) {
	    return this.GenDirect(lat1, lon1, azi1, false, s12, outmask);
	  };

	  /**
	   * @summary Solve the direct geodesic problem with arc length.
	   * @param {number} lat1 the latitude of the first point in degrees.
	   * @param {number} lon1 the longitude of the first point in degrees.
	   * @param {number} azi1 the azimuth at the first point in degrees.
	   * @param {number} a12 the arc length from the first point to the second in
	   *   degrees.
	   * @param {bitmask} [outmask = STANDARD] which results to include.
	   * @returns {object} the requested results.
	   * @description The lat1, lon1, azi1, and a12 fields of the result are
	   *   always set.  For details on the outmask parameter, see {@tutorial
	   *   2-interface}, "The outmask and caps parameters".
	   */
	  g.Geodesic.prototype.ArcDirect = function(lat1, lon1, azi1, a12, outmask) {
	    return this.GenDirect(lat1, lon1, azi1, true, a12, outmask);
	  };

	  /**
	   * @summary Create a {@link module:GeographicLib/GeodesicLine.GeodesicLine
	   *   GeodesicLine} object.
	   * @param {number} lat1 the latitude of the first point in degrees.
	   * @param {number} lon1 the longitude of the first point in degrees.
	   * @param {number} azi1 the azimuth at the first point in degrees.
	   *   degrees.
	   * @param {bitmask} [caps = STANDARD | DISTANCE_IN] which capabilities to
	   *   include.
	   * @returns {object} the
	   *   {@link module:GeographicLib/GeodesicLine.GeodesicLine
	   *   GeodesicLine} object
	   * @description For details on the caps parameter, see {@tutorial
	   *   2-interface}, "The outmask and caps parameters".
	   */
	  g.Geodesic.prototype.Line = function(lat1, lon1, azi1, caps) {
	    return new l.GeodesicLine(this, lat1, lon1, azi1, caps);
	  };

	  /**
	   * @summary Define a {@link module:GeographicLib/GeodesicLine.GeodesicLine
	   *   GeodesicLine} in terms of the direct geodesic problem specified in terms
	   *   of distance.
	   * @param {number} lat1 the latitude of the first point in degrees.
	   * @param {number} lon1 the longitude of the first point in degrees.
	   * @param {number} azi1 the azimuth at the first point in degrees.
	   *   degrees.
	   * @param {number} s12 the distance between point 1 and point 2 (meters); it
	   *   can be negative.
	   * @param {bitmask} [caps = STANDARD | DISTANCE_IN] which capabilities to
	   *   include.
	   * @returns {object} the
	   *   {@link module:GeographicLib/GeodesicLine.GeodesicLine
	   *   GeodesicLine} object
	   * @description This function sets point 3 of the GeodesicLine to correspond
	   *   to point 2 of the direct geodesic problem.  For details on the caps
	   *   parameter, see {@tutorial 2-interface}, "The outmask and caps
	   *   parameters".
	   */
	  g.Geodesic.prototype.DirectLine = function(lat1, lon1, azi1, s12, caps) {
	    return this.GenDirectLine(lat1, lon1, azi1, false, s12, caps);
	  };

	  /**
	   * @summary Define a {@link module:GeographicLib/GeodesicLine.GeodesicLine
	   *   GeodesicLine} in terms of the direct geodesic problem specified in terms
	   *   of arc length.
	   * @param {number} lat1 the latitude of the first point in degrees.
	   * @param {number} lon1 the longitude of the first point in degrees.
	   * @param {number} azi1 the azimuth at the first point in degrees.
	   *   degrees.
	   * @param {number} a12 the arc length between point 1 and point 2 (degrees);
	   *   it can be negative.
	   * @param {bitmask} [caps = STANDARD | DISTANCE_IN] which capabilities to
	   *   include.
	   * @returns {object} the
	   *   {@link module:GeographicLib/GeodesicLine.GeodesicLine
	   *   GeodesicLine} object
	   * @description This function sets point 3 of the GeodesicLine to correspond
	   *   to point 2 of the direct geodesic problem.  For details on the caps
	   *   parameter, see {@tutorial 2-interface}, "The outmask and caps
	   *   parameters".
	   */
	  g.Geodesic.prototype.ArcDirectLine = function(lat1, lon1, azi1, a12, caps) {
	    return this.GenDirectLine(lat1, lon1, azi1, true, a12, caps);
	  };

	  /**
	   * @summary Define a {@link module:GeographicLib/GeodesicLine.GeodesicLine
	   *   GeodesicLine} in terms of the direct geodesic problem specified in terms
	   *   of either distance or arc length.
	   * @param {number} lat1 the latitude of the first point in degrees.
	   * @param {number} lon1 the longitude of the first point in degrees.
	   * @param {number} azi1 the azimuth at the first point in degrees.
	   *   degrees.
	   * @param {bool} arcmode boolean flag determining the meaning of the
	   *   s12_a12.
	   * @param {number} s12_a12 if arcmode is false, this is the distance between
	   *   point 1 and point 2 (meters); otherwise it is the arc length between
	   *   point 1 and point 2 (degrees); it can be negative.
	   * @param {bitmask} [caps = STANDARD | DISTANCE_IN] which capabilities to
	   *   include.
	   * @returns {object} the
	   *   {@link module:GeographicLib/GeodesicLine.GeodesicLine
	   *   GeodesicLine} object
	   * @description This function sets point 3 of the GeodesicLine to correspond
	   *   to point 2 of the direct geodesic problem.  For details on the caps
	   *   parameter, see {@tutorial 2-interface}, "The outmask and caps
	   *   parameters".
	   */
	  g.Geodesic.prototype.GenDirectLine = function(lat1, lon1, azi1,
	                                                arcmode, s12_a12, caps) {
	    var t;
	    if (!caps) caps = g.STANDARD | g.DISTANCE_IN;
	    // Automatically supply DISTANCE_IN if necessary
	    if (!arcmode) caps |= g.DISTANCE_IN;
	    t = new l.GeodesicLine(this, lat1, lon1, azi1, caps);
	    t.GenSetDistance(arcmode, s12_a12);
	    return t;
	  };

	  /**
	   * @summary Define a {@link module:GeographicLib/GeodesicLine.GeodesicLine
	   *   GeodesicLine} in terms of the inverse geodesic problem.
	   * @param {number} lat1 the latitude of the first point in degrees.
	   * @param {number} lon1 the longitude of the first point in degrees.
	   * @param {number} lat2 the latitude of the second point in degrees.
	   * @param {number} lon2 the longitude of the second point in degrees.
	   * @param {bitmask} [caps = STANDARD | DISTANCE_IN] which capabilities to
	   *   include.
	   * @returns {object} the
	   *   {@link module:GeographicLib/GeodesicLine.GeodesicLine
	   *   GeodesicLine} object
	   * @description This function sets point 3 of the GeodesicLine to correspond
	   *   to point 2 of the inverse geodesic problem.  For details on the caps
	   *   parameter, see {@tutorial 2-interface}, "The outmask and caps
	   *   parameters".
	   */
	  g.Geodesic.prototype.InverseLine = function(lat1, lon1, lat2, lon2, caps) {
	    var r, t, azi1;
	    if (!caps) caps = g.STANDARD | g.DISTANCE_IN;
	    r = this.InverseInt(lat1, lon1, lat2, lon2, g.ARC);
	    azi1 = m.atan2d(r.salp1, r.calp1);
	    // Ensure that a12 can be converted to a distance
	    if (caps & (g.OUT_MASK & g.DISTANCE_IN)) caps |= g.DISTANCE;
	    t = new l.GeodesicLine(this, lat1, lon1, azi1, caps, r.salp1, r.calp1);
	    t.SetArc(r.vals.a12);
	    return t;
	  };

	  /**
	   * @summary Create a {@link module:GeographicLib/PolygonArea.PolygonArea
	   *   PolygonArea} object.
	   * @param {bool} [polyline = false] if true the new PolygonArea object
	   *   describes a polyline instead of a polygon.
	   * @returns {object} the
	   *   {@link module:GeographicLib/PolygonArea.PolygonArea
	   *   PolygonArea} object
	   */
	  g.Geodesic.prototype.Polygon = function(polyline) {
	    return new p.PolygonArea(this, polyline);
	  };

	  /**
	   * @summary a {@link module:GeographicLib/Geodesic.Geodesic Geodesic} object
	   *   initialized for the WGS84 ellipsoid.
	   * @constant {object}
	   */
	  g.WGS84 = new g.Geodesic(c.WGS84.a, c.WGS84.f);
	})(GeographicLib.Geodesic, GeographicLib.GeodesicLine,
	   GeographicLib.PolygonArea, GeographicLib.Math, GeographicLib.Constants);

	/**************** GeodesicLine.js ****************/
	/*
	 * GeodesicLine.js
	 * Transcription of GeodesicLine.[ch]pp into JavaScript.
	 *
	 * See the documentation for the C++ class.  The conversion is a literal
	 * conversion from C++.
	 *
	 * The algorithms are derived in
	 *
	 *    Charles F. F. Karney,
	 *    Algorithms for geodesics, J. Geodesy 87, 43-55 (2013);
	 *    https://doi.org/10.1007/s00190-012-0578-z
	 *    Addenda: https://geographiclib.sourceforge.io/geod-addenda.html
	 *
	 * Copyright (c) Charles Karney (2011-2016) <charles@karney.com> and licensed
	 * under the MIT/X11 License.  For more information, see
	 * https://geographiclib.sourceforge.io/
	 */

	// Load AFTER GeographicLib/Math.js, GeographicLib/Geodesic.js

	(function(
	  g,
	  /**
	   * @exports GeographicLib/GeodesicLine
	   * @description Solve geodesic problems on a single geodesic line via the
	   *   {@link module:GeographicLib/GeodesicLine.GeodesicLine GeodesicLine}
	   *   class.
	   */
	  l, m) {

	  /**
	   * @class
	   * @property {number} a the equatorial radius (meters).
	   * @property {number} f the flattening.
	   * @property {number} lat1 the initial latitude (degrees).
	   * @property {number} lon1 the initial longitude (degrees).
	   * @property {number} azi1 the initial azimuth (degrees).
	   * @property {number} salp1 the sine of the azimuth at the first point.
	   * @property {number} calp1 the cosine the azimuth at the first point.
	   * @property {number} s13 the distance to point 3 (meters).
	   * @property {number} a13 the arc length to point 3 (degrees).
	   * @property {bitmask} caps the capabilities of the object.
	   * @summary Initialize a GeodesicLine object.  For details on the caps
	   *   parameter, see {@tutorial 2-interface}, "The outmask and caps
	   *   parameters".
	   * @classdesc Performs geodesic calculations along a given geodesic line.
	   *   This object is usually instantiated by
	   *   {@link module:GeographicLib/Geodesic.Geodesic#Line Geodesic.Line}.
	   *   The methods
	   *   {@link module:GeographicLib/Geodesic.Geodesic#DirectLine
	   *   Geodesic.DirectLine} and
	   *   {@link module:GeographicLib/Geodesic.Geodesic#InverseLine
	   *   Geodesic.InverseLine} set in addition the position of a reference point
	   *   3.
	   * @param {object} geod a {@link module:GeographicLib/Geodesic.Geodesic
	   *   Geodesic} object.
	   * @param {number} lat1 the latitude of the first point in degrees.
	   * @param {number} lon1 the longitude of the first point in degrees.
	   * @param {number} azi1 the azimuth at the first point in degrees.
	   * @param {bitmask} [caps = STANDARD | DISTANCE_IN] which capabilities to
	   *   include; LATITUDE | AZIMUTH are always included.
	   */
	  l.GeodesicLine = function(geod, lat1, lon1, azi1, caps, salp1, calp1) {
	    var t, cbet1, sbet1, eps, s, c;
	    if (!caps) caps = g.STANDARD | g.DISTANCE_IN;

	    this.a = geod.a;
	    this.f = geod.f;
	    this._b = geod._b;
	    this._c2 = geod._c2;
	    this._f1 = geod._f1;
	    this.caps = caps | g.LATITUDE | g.AZIMUTH | g.LONG_UNROLL;

	    this.lat1 = m.LatFix(lat1);
	    this.lon1 = lon1;
	    if (typeof salp1 === 'undefined' || typeof calp1 === 'undefined') {
	      this.azi1 = m.AngNormalize(azi1);
	      t = m.sincosd(m.AngRound(this.azi1)); this.salp1 = t.s; this.calp1 = t.c;
	    } else {
	      this.azi1 = azi1; this.salp1 = salp1; this.calp1 = calp1;
	    }
	    t = m.sincosd(m.AngRound(this.lat1)); sbet1 = this._f1 * t.s; cbet1 = t.c;
	    // norm(sbet1, cbet1);
	    t = m.hypot(sbet1, cbet1); sbet1 /= t; cbet1 /= t;
	    // Ensure cbet1 = +epsilon at poles
	    cbet1 = Math.max(g.tiny_, cbet1);
	    this._dn1 = Math.sqrt(1 + geod._ep2 * m.sq(sbet1));

	    // Evaluate alp0 from sin(alp1) * cos(bet1) = sin(alp0),
	    this._salp0 = this.salp1 * cbet1; // alp0 in [0, pi/2 - |bet1|]
	    // Alt: calp0 = hypot(sbet1, calp1 * cbet1).  The following
	    // is slightly better (consider the case salp1 = 0).
	    this._calp0 = m.hypot(this.calp1, this.salp1 * sbet1);
	    // Evaluate sig with tan(bet1) = tan(sig1) * cos(alp1).
	    // sig = 0 is nearest northward crossing of equator.
	    // With bet1 = 0, alp1 = pi/2, we have sig1 = 0 (equatorial line).
	    // With bet1 =  pi/2, alp1 = -pi, sig1 =  pi/2
	    // With bet1 = -pi/2, alp1 =  0 , sig1 = -pi/2
	    // Evaluate omg1 with tan(omg1) = sin(alp0) * tan(sig1).
	    // With alp0 in (0, pi/2], quadrants for sig and omg coincide.
	    // No atan2(0,0) ambiguity at poles since cbet1 = +epsilon.
	    // With alp0 = 0, omg1 = 0 for alp1 = 0, omg1 = pi for alp1 = pi.
	    this._ssig1 = sbet1; this._somg1 = this._salp0 * sbet1;
	    this._csig1 = this._comg1 =
	      sbet1 !== 0 || this.calp1 !== 0 ? cbet1 * this.calp1 : 1;
	    // norm(this._ssig1, this._csig1); // sig1 in (-pi, pi]
	    t = m.hypot(this._ssig1, this._csig1);
	    this._ssig1 /= t; this._csig1 /= t;
	    // norm(this._somg1, this._comg1); -- don't need to normalize!

	    this._k2 = m.sq(this._calp0) * geod._ep2;
	    eps = this._k2 / (2 * (1 + Math.sqrt(1 + this._k2)) + this._k2);

	    if (this.caps & g.CAP_C1) {
	      this._A1m1 = g.A1m1f(eps);
	      this._C1a = new Array(g.nC1_ + 1);
	      g.C1f(eps, this._C1a);
	      this._B11 = g.SinCosSeries(true, this._ssig1, this._csig1, this._C1a);
	      s = Math.sin(this._B11); c = Math.cos(this._B11);
	      // tau1 = sig1 + B11
	      this._stau1 = this._ssig1 * c + this._csig1 * s;
	      this._ctau1 = this._csig1 * c - this._ssig1 * s;
	      // Not necessary because C1pa reverts C1a
	      //    _B11 = -SinCosSeries(true, _stau1, _ctau1, _C1pa);
	    }

	    if (this.caps & g.CAP_C1p) {
	      this._C1pa = new Array(g.nC1p_ + 1);
	      g.C1pf(eps, this._C1pa);
	    }

	    if (this.caps & g.CAP_C2) {
	      this._A2m1 = g.A2m1f(eps);
	      this._C2a = new Array(g.nC2_ + 1);
	      g.C2f(eps, this._C2a);
	      this._B21 = g.SinCosSeries(true, this._ssig1, this._csig1, this._C2a);
	    }

	    if (this.caps & g.CAP_C3) {
	      this._C3a = new Array(g.nC3_);
	      geod.C3f(eps, this._C3a);
	      this._A3c = -this.f * this._salp0 * geod.A3f(eps);
	      this._B31 = g.SinCosSeries(true, this._ssig1, this._csig1, this._C3a);
	    }

	    if (this.caps & g.CAP_C4) {
	      this._C4a = new Array(g.nC4_); // all the elements of _C4a are used
	      geod.C4f(eps, this._C4a);
	      // Multiplier = a^2 * e^2 * cos(alpha0) * sin(alpha0)
	      this._A4 = m.sq(this.a) * this._calp0 * this._salp0 * geod._e2;
	      this._B41 = g.SinCosSeries(false, this._ssig1, this._csig1, this._C4a);
	    }

	    this.a13 = this.s13 = Number.NaN;
	  };

	  /**
	   * @summary Find the position on the line (general case).
	   * @param {bool} arcmode is the next parameter an arc length?
	   * @param {number} s12_a12 the (arcmode ? arc length : distance) from the
	   *   first point to the second in (arcmode ? degrees : meters).
	   * @param {bitmask} [outmask = STANDARD] which results to include; this is
	   *   subject to the capabilities of the object.
	   * @returns {object} the requested results.
	   * @description The lat1, lon1, azi1, and a12 fields of the result are
	   *   always set; s12 is included if arcmode is false.  For details on the
	   *   outmask parameter, see {@tutorial 2-interface}, "The outmask and caps
	   *   parameters".
	   */
	  l.GeodesicLine.prototype.GenPosition = function(arcmode, s12_a12,
	                                                  outmask) {
	    var vals = {},
	        sig12, ssig12, csig12, B12, AB1, ssig2, csig2, tau12, s, c, serr,
	        omg12, lam12, lon12, E, sbet2, cbet2, somg2, comg2, salp2, calp2, dn2,
	        B22, AB2, J12, t, B42, salp12, calp12;
	    if (!outmask) outmask = g.STANDARD;
	    else if (outmask === g.LONG_UNROLL) outmask |= g.STANDARD;
	    outmask &= this.caps & g.OUT_MASK;
	    vals.lat1 = this.lat1; vals.azi1 = this.azi1;
	    vals.lon1 = outmask & g.LONG_UNROLL ?
	      this.lon1 : m.AngNormalize(this.lon1);
	    if (arcmode)
	      vals.a12 = s12_a12;
	    else
	      vals.s12 = s12_a12;
	    if (!( arcmode || (this.caps & g.DISTANCE_IN & g.OUT_MASK) )) {
	      // Uninitialized or impossible distance calculation requested
	      vals.a12 = Number.NaN;
	      return vals;
	    }

	    // Avoid warning about uninitialized B12.
	    B12 = 0; AB1 = 0;
	    if (arcmode) {
	      // Interpret s12_a12 as spherical arc length
	      sig12 = s12_a12 * m.degree;
	      t = m.sincosd(s12_a12); ssig12 = t.s; csig12 = t.c;
	    } else {
	      // Interpret s12_a12 as distance
	      tau12 = s12_a12 / (this._b * (1 + this._A1m1));
	      s = Math.sin(tau12);
	      c = Math.cos(tau12);
	      // tau2 = tau1 + tau12
	      B12 = -g.SinCosSeries(true,
	                            this._stau1 * c + this._ctau1 * s,
	                            this._ctau1 * c - this._stau1 * s,
	                            this._C1pa);
	      sig12 = tau12 - (B12 - this._B11);
	      ssig12 = Math.sin(sig12); csig12 = Math.cos(sig12);
	      if (Math.abs(this.f) > 0.01) {
	        // Reverted distance series is inaccurate for |f| > 1/100, so correct
	        // sig12 with 1 Newton iteration.  The following table shows the
	        // approximate maximum error for a = WGS_a() and various f relative to
	        // GeodesicExact.
	        //     erri = the error in the inverse solution (nm)
	        //     errd = the error in the direct solution (series only) (nm)
	        //     errda = the error in the direct solution
	        //             (series + 1 Newton) (nm)
	        //
	        //       f     erri  errd errda
	        //     -1/5    12e6 1.2e9  69e6
	        //     -1/10  123e3  12e6 765e3
	        //     -1/20   1110 108e3  7155
	        //     -1/50  18.63 200.9 27.12
	        //     -1/100 18.63 23.78 23.37
	        //     -1/150 18.63 21.05 20.26
	        //      1/150 22.35 24.73 25.83
	        //      1/100 22.35 25.03 25.31
	        //      1/50  29.80 231.9 30.44
	        //      1/20   5376 146e3  10e3
	        //      1/10  829e3  22e6 1.5e6
	        //      1/5   157e6 3.8e9 280e6
	        ssig2 = this._ssig1 * csig12 + this._csig1 * ssig12;
	        csig2 = this._csig1 * csig12 - this._ssig1 * ssig12;
	        B12 = g.SinCosSeries(true, ssig2, csig2, this._C1a);
	        serr = (1 + this._A1m1) * (sig12 + (B12 - this._B11)) -
	          s12_a12 / this._b;
	        sig12 = sig12 - serr / Math.sqrt(1 + this._k2 * m.sq(ssig2));
	        ssig12 = Math.sin(sig12); csig12 = Math.cos(sig12);
	        // Update B12 below
	      }
	    }

	    // sig2 = sig1 + sig12
	    ssig2 = this._ssig1 * csig12 + this._csig1 * ssig12;
	    csig2 = this._csig1 * csig12 - this._ssig1 * ssig12;
	    dn2 = Math.sqrt(1 + this._k2 * m.sq(ssig2));
	    if (outmask & (g.DISTANCE | g.REDUCEDLENGTH | g.GEODESICSCALE)) {
	      if (arcmode || Math.abs(this.f) > 0.01)
	        B12 = g.SinCosSeries(true, ssig2, csig2, this._C1a);
	      AB1 = (1 + this._A1m1) * (B12 - this._B11);
	    }
	    // sin(bet2) = cos(alp0) * sin(sig2)
	    sbet2 = this._calp0 * ssig2;
	    // Alt: cbet2 = hypot(csig2, salp0 * ssig2);
	    cbet2 = m.hypot(this._salp0, this._calp0 * csig2);
	    if (cbet2 === 0)
	      // I.e., salp0 = 0, csig2 = 0.  Break the degeneracy in this case
	      cbet2 = csig2 = g.tiny_;
	    // tan(alp0) = cos(sig2)*tan(alp2)
	    salp2 = this._salp0; calp2 = this._calp0 * csig2; // No need to normalize

	    if (arcmode && (outmask & g.DISTANCE))
	      vals.s12 = this._b * ((1 + this._A1m1) * sig12 + AB1);

	    if (outmask & g.LONGITUDE) {
	      // tan(omg2) = sin(alp0) * tan(sig2)
	      somg2 = this._salp0 * ssig2; comg2 = csig2; // No need to normalize
	      E = m.copysign(1, this._salp0);
	      // omg12 = omg2 - omg1
	      omg12 = outmask & g.LONG_UNROLL ?
	        E * (sig12 -
	             (Math.atan2(ssig2, csig2) -
	              Math.atan2(this._ssig1, this._csig1)) +
	             (Math.atan2(E * somg2, comg2) -
	              Math.atan2(E * this._somg1, this._comg1))) :
	        Math.atan2(somg2 * this._comg1 - comg2 * this._somg1,
	                     comg2 * this._comg1 + somg2 * this._somg1);
	      lam12 = omg12 + this._A3c *
	        ( sig12 + (g.SinCosSeries(true, ssig2, csig2, this._C3a) -
	                   this._B31));
	      lon12 = lam12 / m.degree;
	      vals.lon2 = outmask & g.LONG_UNROLL ? this.lon1 + lon12 :
	        m.AngNormalize(m.AngNormalize(this.lon1) + m.AngNormalize(lon12));
	    }

	    if (outmask & g.LATITUDE)
	      vals.lat2 = m.atan2d(sbet2, this._f1 * cbet2);

	    if (outmask & g.AZIMUTH)
	      vals.azi2 = m.atan2d(salp2, calp2);

	    if (outmask & (g.REDUCEDLENGTH | g.GEODESICSCALE)) {
	      B22 = g.SinCosSeries(true, ssig2, csig2, this._C2a);
	      AB2 = (1 + this._A2m1) * (B22 - this._B21);
	      J12 = (this._A1m1 - this._A2m1) * sig12 + (AB1 - AB2);
	      if (outmask & g.REDUCEDLENGTH)
	        // Add parens around (_csig1 * ssig2) and (_ssig1 * csig2) to ensure
	        // accurate cancellation in the case of coincident points.
	        vals.m12 = this._b * ((      dn2 * (this._csig1 * ssig2) -
	                               this._dn1 * (this._ssig1 * csig2)) -
	                              this._csig1 * csig2 * J12);
	      if (outmask & g.GEODESICSCALE) {
	        t = this._k2 * (ssig2 - this._ssig1) * (ssig2 + this._ssig1) /
	          (this._dn1 + dn2);
	        vals.M12 = csig12 +
	          (t * ssig2 - csig2 * J12) * this._ssig1 / this._dn1;
	        vals.M21 = csig12 -
	          (t * this._ssig1 - this._csig1 * J12) * ssig2 / dn2;
	      }
	    }

	    if (outmask & g.AREA) {
	      B42 = g.SinCosSeries(false, ssig2, csig2, this._C4a);
	      if (this._calp0 === 0 || this._salp0 === 0) {
	        // alp12 = alp2 - alp1, used in atan2 so no need to normalize
	        salp12 = salp2 * this.calp1 - calp2 * this.salp1;
	        calp12 = calp2 * this.calp1 + salp2 * this.salp1;
	      } else {
	        // tan(alp) = tan(alp0) * sec(sig)
	        // tan(alp2-alp1) = (tan(alp2) -tan(alp1)) / (tan(alp2)*tan(alp1)+1)
	        // = calp0 * salp0 * (csig1-csig2) / (salp0^2 + calp0^2 * csig1*csig2)
	        // If csig12 > 0, write
	        //   csig1 - csig2 = ssig12 * (csig1 * ssig12 / (1 + csig12) + ssig1)
	        // else
	        //   csig1 - csig2 = csig1 * (1 - csig12) + ssig12 * ssig1
	        // No need to normalize
	        salp12 = this._calp0 * this._salp0 *
	          (csig12 <= 0 ? this._csig1 * (1 - csig12) + ssig12 * this._ssig1 :
	           ssig12 * (this._csig1 * ssig12 / (1 + csig12) + this._ssig1));
	        calp12 = m.sq(this._salp0) + m.sq(this._calp0) * this._csig1 * csig2;
	      }
	      vals.S12 = this._c2 * Math.atan2(salp12, calp12) +
	        this._A4 * (B42 - this._B41);
	    }

	    if (!arcmode)
	      vals.a12 = sig12 / m.degree;
	    return vals;
	  };

	  /**
	   * @summary Find the position on the line given s12.
	   * @param {number} s12 the distance from the first point to the second in
	   *   meters.
	   * @param {bitmask} [outmask = STANDARD] which results to include; this is
	   *   subject to the capabilities of the object.
	   * @returns {object} the requested results.
	   * @description The lat1, lon1, azi1, s12, and a12 fields of the result are
	   *   always set; s12 is included if arcmode is false.  For details on the
	   *   outmask parameter, see {@tutorial 2-interface}, "The outmask and caps
	   *   parameters".
	   */
	  l.GeodesicLine.prototype.Position = function(s12, outmask) {
	    return this.GenPosition(false, s12, outmask);
	  };

	  /**
	   * @summary Find the position on the line given a12.
	   * @param {number} a12 the arc length from the first point to the second in
	   *   degrees.
	   * @param {bitmask} [outmask = STANDARD] which results to include; this is
	   *   subject to the capabilities of the object.
	   * @returns {object} the requested results.
	   * @description The lat1, lon1, azi1, and a12 fields of the result are
	   *   always set.  For details on the outmask parameter, see {@tutorial
	   *   2-interface}, "The outmask and caps parameters".
	   */
	  l.GeodesicLine.prototype.ArcPosition = function(a12, outmask) {
	    return this.GenPosition(true, a12, outmask);
	  };

	  /**
	   * @summary Specify position of point 3 in terms of either distance or arc
	   *   length.
	   * @param {bool} arcmode boolean flag determining the meaning of the second
	   *   parameter; if arcmode is false, then the GeodesicLine object must have
	   *   been constructed with caps |= DISTANCE_IN.
	   * @param {number} s13_a13 if arcmode is false, this is the distance from
	   *   point 1 to point 3 (meters); otherwise it is the arc length from
	   *   point 1 to point 3 (degrees); it can be negative.
	   **********************************************************************/
	  l.GeodesicLine.prototype.GenSetDistance = function(arcmode, s13_a13) {
	    if (arcmode)
	      this.SetArc(s13_a13);
	    else
	      this.SetDistance(s13_a13);
	  };

	  /**
	   * @summary Specify position of point 3 in terms distance.
	   * @param {number} s13 the distance from point 1 to point 3 (meters); it
	   *   can be negative.
	   **********************************************************************/
	  l.GeodesicLine.prototype.SetDistance = function(s13) {
	    var r;
	    this.s13 = s13;
	    r = this.GenPosition(false, this.s13, g.ARC);
	    this.a13 = 0 + r.a12;       // the 0+ converts undefined into NaN
	  };

	  /**
	   * @summary Specify position of point 3 in terms of arc length.
	   * @param {number} a13 the arc length from point 1 to point 3 (degrees);
	   *   it can be negative.
	   **********************************************************************/
	  l.GeodesicLine.prototype.SetArc = function(a13) {
	    var r;
	    this.a13 = a13;
	    r = this.GenPosition(true, this.a13, g.DISTANCE);
	    this.s13 = 0 + r.s12;       // the 0+ converts undefined into NaN
	  };

	})(GeographicLib.Geodesic, GeographicLib.GeodesicLine, GeographicLib.Math);

	/**************** PolygonArea.js ****************/
	/*
	 * PolygonArea.js
	 * Transcription of PolygonArea.[ch]pp into JavaScript.
	 *
	 * See the documentation for the C++ class.  The conversion is a literal
	 * conversion from C++.
	 *
	 * The algorithms are derived in
	 *
	 *    Charles F. F. Karney,
	 *    Algorithms for geodesics, J. Geodesy 87, 43-55 (2013);
	 *    https://doi.org/10.1007/s00190-012-0578-z
	 *    Addenda: https://geographiclib.sourceforge.io/geod-addenda.html
	 *
	 * Copyright (c) Charles Karney (2011-2017) <charles@karney.com> and licensed
	 * under the MIT/X11 License.  For more information, see
	 * https://geographiclib.sourceforge.io/
	 */

	// Load AFTER GeographicLib/Math.js and GeographicLib/Geodesic.js

	(function(
	  /**
	   * @exports GeographicLib/PolygonArea
	   * @description Compute the area of geodesic polygons via the
	   *   {@link module:GeographicLib/PolygonArea.PolygonArea PolygonArea}
	   *   class.
	   */
	  p, g, m, a) {

	  var transit, transitdirect;
	  transit = function(lon1, lon2) {
	    // Return 1 or -1 if crossing prime meridian in east or west direction.
	    // Otherwise return zero.
	    var lon12, cross;
	    // Compute lon12 the same way as Geodesic::Inverse.
	    lon1 = m.AngNormalize(lon1);
	    lon2 = m.AngNormalize(lon2);
	    lon12 = m.AngDiff(lon1, lon2).s;
	    cross = lon1 <= 0 && lon2 > 0 && lon12 > 0 ? 1 :
	      (lon2 <= 0 && lon1 > 0 && lon12 < 0 ? -1 : 0);
	    return cross;
	  };

	  // an alternate version of transit to deal with longitudes in the direct
	  // problem.
	  transitdirect = function(lon1, lon2) {
	    // We want to compute exactly
	    //   int(floor(lon2 / 360)) - int(floor(lon1 / 360))
	    // Since we only need the parity of the result we can use std::remquo but
	    // this is buggy with g++ 4.8.3 and requires C++11.  So instead we do
	    lon1 = lon1 % 720.0; lon2 = lon2 % 720.0;
	    return ( ((lon2 >= 0 && lon2 < 360) || lon2 < -360 ? 0 : 1) -
	             ((lon1 >= 0 && lon1 < 360) || lon1 < -360 ? 0 : 1) );
	  };

	  /**
	   * @class
	   * @property {number} a the equatorial radius (meters).
	   * @property {number} f the flattening.
	   * @property {bool} polyline whether the PolygonArea object describes a
	   *   polyline or a polygon.
	   * @property {number} num the number of vertices so far.
	   * @property {number} lat the current latitude (degrees).
	   * @property {number} lon the current longitude (degrees).
	   * @summary Initialize a PolygonArea object.
	   * @classdesc Computes the area and perimeter of a geodesic polygon.
	   *   This object is usually instantiated by
	   *   {@link module:GeographicLib/Geodesic.Geodesic#Polygon Geodesic.Polygon}.
	   * @param {object} geod a {@link module:GeographicLib/Geodesic.Geodesic
	   *   Geodesic} object.
	   * @param {bool} [polyline = false] if true the new PolygonArea object
	   *   describes a polyline instead of a polygon.
	   */
	  p.PolygonArea = function(geod, polyline) {
	    this._geod = geod;
	    this.a = this._geod.a;
	    this.f = this._geod.f;
	    this._area0 = 4 * Math.PI * geod._c2;
	    this.polyline = !polyline ? false : polyline;
	    this._mask = g.LATITUDE | g.LONGITUDE | g.DISTANCE |
	          (this.polyline ? g.NONE : g.AREA | g.LONG_UNROLL);
	    if (!this.polyline)
	      this._areasum = new a.Accumulator(0);
	    this._perimetersum = new a.Accumulator(0);
	    this.Clear();
	  };

	  /**
	   * @summary Clear the PolygonArea object, setting the number of vertices to
	   *   0.
	   */
	  p.PolygonArea.prototype.Clear = function() {
	    this.num = 0;
	    this._crossings = 0;
	    if (!this.polyline)
	      this._areasum.Set(0);
	    this._perimetersum.Set(0);
	    this._lat0 = this._lon0 = this.lat = this.lon = Number.NaN;
	  };

	  /**
	   * @summary Add the next vertex to the polygon.
	   * @param {number} lat the latitude of the point (degrees).
	   * @param {number} lon the longitude of the point (degrees).
	   * @description This adds an edge from the current vertex to the new vertex.
	   */
	  p.PolygonArea.prototype.AddPoint = function(lat, lon) {
	    var t;
	    if (this.num === 0) {
	      this._lat0 = this.lat = lat;
	      this._lon0 = this.lon = lon;
	    } else {
	      t = this._geod.Inverse(this.lat, this.lon, lat, lon, this._mask);
	      this._perimetersum.Add(t.s12);
	      if (!this.polyline) {
	        this._areasum.Add(t.S12);
	        this._crossings += transit(this.lon, lon);
	      }
	      this.lat = lat;
	      this.lon = lon;
	    }
	    ++this.num;
	  };

	  /**
	   * @summary Add the next edge to the polygon.
	   * @param {number} azi the azimuth at the current the point (degrees).
	   * @param {number} s the length of the edge (meters).
	   * @description This specifies the new vertex in terms of the edge from the
	   *   current vertex.
	   */
	  p.PolygonArea.prototype.AddEdge = function(azi, s) {
	    var t;
	    if (this.num) {
	      t = this._geod.Direct(this.lat, this.lon, azi, s, this._mask);
	      this._perimetersum.Add(s);
	      if (!this.polyline) {
	        this._areasum.Add(t.S12);
	        this._crossings += transitdirect(this.lon, t.lon2);
	      }
	      this.lat = t.lat2;
	      this.lon = t.lon2;
	    }
	    ++this.num;
	  };

	  /**
	   * @summary Compute the perimeter and area of the polygon.
	   * @param {bool} reverse if true then clockwise (instead of
	   *   counter-clockwise) traversal counts as a positive area.
	   * @param {bool} sign if true then return a signed result for the area if the
	   *   polygon is traversed in the "wrong" direction instead of returning the
	   *   area for the rest of the earth.
	   * @returns {object} r where r.number is the number of vertices, r.perimeter
	   *   is the perimeter (meters), and r.area (only returned if polyline is
	   *   false) is the area (meters<sup>2</sup>).
	   * @description If the object is a polygon (and not a polygon), the perimeter
	   *   includes the length of a final edge connecting the current point to the
	   *   initial point.  If the object is a polyline, then area is nan.  More
	   *   points can be added to the polygon after this call.
	   */
	  p.PolygonArea.prototype.Compute = function(reverse, sign) {
	    var vals = {number: this.num}, t, tempsum, crossings;
	    if (this.num < 2) {
	      vals.perimeter = 0;
	      if (!this.polyline)
	        vals.area = 0;
	      return vals;
	    }
	    if (this.polyline) {
	      vals.perimeter = this._perimetersum.Sum();
	      return vals;
	    }
	    t = this._geod.Inverse(this.lat, this.lon, this._lat0, this._lon0,
	                           this._mask);
	    vals.perimeter = this._perimetersum.Sum(t.s12);
	    tempsum = new a.Accumulator(this._areasum);
	    tempsum.Add(t.S12);
	    crossings = this._crossings + transit(this.lon, this._lon0);
	    if (crossings & 1)
	      tempsum.Add( (tempsum.Sum() < 0 ? 1 : -1) * this._area0/2 );
	    // area is with the clockwise sense.  If !reverse convert to
	    // counter-clockwise convention.
	    if (!reverse)
	      tempsum.Negate();
	    // If sign put area in (-area0/2, area0/2], else put area in [0, area0)
	    if (sign) {
	      if (tempsum.Sum() > this._area0/2)
	        tempsum.Add( -this._area0 );
	      else if (tempsum.Sum() <= -this._area0/2)
	        tempsum.Add( +this._area0 );
	    } else {
	      if (tempsum.Sum() >= this._area0)
	        tempsum.Add( -this._area0 );
	      else if (tempsum < 0)
	        tempsum.Add( -this._area0 );
	    }
	    vals.area = tempsum.Sum();
	    return vals;
	  };

	  /**
	   * @summary Compute the perimeter and area of the polygon with a tentative
	   *   new vertex.
	   * @param {number} lat the latitude of the point (degrees).
	   * @param {number} lon the longitude of the point (degrees).
	   * @param {bool} reverse if true then clockwise (instead of
	   *   counter-clockwise) traversal counts as a positive area.
	   * @param {bool} sign if true then return a signed result for the area if the
	   *   polygon is traversed in the "wrong" direction instead of returning the
	   * @returns {object} r where r.number is the number of vertices, r.perimeter
	   *   is the perimeter (meters), and r.area (only returned if polyline is
	   *   false) is the area (meters<sup>2</sup>).
	   * @description A new vertex is *not* added to the polygon.
	   */
	  p.PolygonArea.prototype.TestPoint = function(lat, lon, reverse, sign) {
	    var vals = {number: this.num + 1}, t, tempsum, crossings, i;
	    if (this.num === 0) {
	      vals.perimeter = 0;
	      if (!this.polyline)
	        vals.area = 0;
	      return vals;
	    }
	    vals.perimeter = this._perimetersum.Sum();
	    tempsum = this.polyline ? 0 : this._areasum.Sum();
	    crossings = this._crossings;
	    for (i = 0; i < (this.polyline ? 1 : 2); ++i) {
	      t = this._geod.Inverse(
	       i === 0 ? this.lat : lat, i === 0 ? this.lon : lon,
	       i !== 0 ? this._lat0 : lat, i !== 0 ? this._lon0 : lon,
	       this._mask);
	      vals.perimeter += t.s12;
	      if (!this.polyline) {
	        tempsum += t.S12;
	        crossings += transit(i === 0 ? this.lon : lon,
	                               i !== 0 ? this._lon0 : lon);
	      }
	    }

	    if (this.polyline)
	      return vals;

	    if (crossings & 1)
	      tempsum += (tempsum < 0 ? 1 : -1) * this._area0/2;
	    // area is with the clockwise sense.  If !reverse convert to
	    // counter-clockwise convention.
	    if (!reverse)
	      tempsum *= -1;
	    // If sign put area in (-area0/2, area0/2], else put area in [0, area0)
	    if (sign) {
	      if (tempsum > this._area0/2)
	        tempsum -= this._area0;
	      else if (tempsum <= -this._area0/2)
	        tempsum += this._area0;
	    } else {
	      if (tempsum >= this._area0)
	        tempsum -= this._area0;
	      else if (tempsum < 0)
	        tempsum += this._area0;
	    }
	    vals.area = tempsum;
	    return vals;
	  };

	  /**
	   * @summary Compute the perimeter and area of the polygon with a tentative
	   *   new edge.
	   * @param {number} azi the azimuth of the edge (degrees).
	   * @param {number} s the length of the edge (meters).
	   * @param {bool} reverse if true then clockwise (instead of
	   *   counter-clockwise) traversal counts as a positive area.
	   * @param {bool} sign if true then return a signed result for the area if the
	   *   polygon is traversed in the "wrong" direction instead of returning the
	   * @returns {object} r where r.number is the number of vertices, r.perimeter
	   *   is the perimeter (meters), and r.area (only returned if polyline is
	   *   false) is the area (meters<sup>2</sup>).
	   * @description A new vertex is *not* added to the polygon.
	   */
	  p.PolygonArea.prototype.TestEdge = function(azi, s, reverse, sign) {
	    var vals = {number: this.num ? this.num + 1 : 0}, t, tempsum, crossings;
	    if (this.num === 0)
	      return vals;
	    vals.perimeter = this._perimetersum.Sum() + s;
	    if (this.polyline)
	      return vals;

	    tempsum = this._areasum.Sum();
	    crossings = this._crossings;
	    t = this._geod.Direct(this.lat, this.lon, azi, s, this._mask);
	    tempsum += t.S12;
	    crossings += transitdirect(this.lon, t.lon2);
	    t = this._geod.Inverse(t.lat2, t.lon2, this._lat0, this._lon0, this._mask);
	    vals.perimeter += t.s12;
	    tempsum += t.S12;
	    crossings += transit(t.lon2, this._lon0);

	    if (crossings & 1)
	      tempsum += (tempsum < 0 ? 1 : -1) * this._area0/2;
	    // area is with the clockwise sense.  If !reverse convert to
	    // counter-clockwise convention.
	    if (!reverse)
	      tempsum *= -1;
	    // If sign put area in (-area0/2, area0/2], else put area in [0, area0)
	    if (sign) {
	      if (tempsum > this._area0/2)
	        tempsum -= this._area0;
	      else if (tempsum <= -this._area0/2)
	        tempsum += this._area0;
	    } else {
	      if (tempsum >= this._area0)
	        tempsum -= this._area0;
	      else if (tempsum < 0)
	        tempsum += this._area0;
	    }
	    vals.area = tempsum;
	    return vals;
	  };

	})(GeographicLib.PolygonArea, GeographicLib.Geodesic,
	   GeographicLib.Math, GeographicLib.Accumulator);

	/**************** DMS.js ****************/
	/*
	 * DMS.js
	 * Transcription of DMS.[ch]pp into JavaScript.
	 *
	 * See the documentation for the C++ class.  The conversion is a literal
	 * conversion from C++.
	 *
	 * Copyright (c) Charles Karney (2011-2017) <charles@karney.com> and licensed
	 * under the MIT/X11 License.  For more information, see
	 * https://geographiclib.sourceforge.io/
	 */

	GeographicLib.DMS = {};

	(function(
	  /**
	   * @exports GeographicLib/DMS
	   * @description Decode/Encode angles expressed as degrees, minutes, and
	   *   seconds.  This module defines several constants:
	   *   - hemisphere indicator (returned by
	   *       {@link module:GeographicLib/DMS.Decode Decode}) and a formatting
	   *       indicator (used by
	   *       {@link module:GeographicLib/DMS.Encode Encode})
	   *     - NONE = 0, no designator and format as plain angle;
	   *     - LATITUDE = 1, a N/S designator and format as latitude;
	   *     - LONGITUDE = 2, an E/W designator and format as longitude;
	   *     - AZIMUTH = 3, format as azimuth;
	   *   - the specification of the trailing component in
	   *       {@link module:GeographicLib/DMS.Encode Encode}
	   *     - DEGREE;
	   *     - MINUTE;
	   *     - SECOND.
	   */
	  d) {

	  var lookup, zerofill, internalDecode, numMatch,
	      hemispheres_ = "SNWE",
	      signs_ = "-+",
	      digits_ = "0123456789",
	      dmsindicators_ = "D'\":",
	      // dmsindicatorsu_ = "\u00b0\u2032\u2033"; // Unicode variants
	      dmsindicatorsu_ = "\u00b0'\"", // Use degree symbol
	      components_ = ["degrees", "minutes", "seconds"];
	  lookup = function(s, c) {
	    return s.indexOf(c.toUpperCase());
	  };
	  zerofill = function(s, n) {
	    return String("0000").substr(0, Math.max(0, Math.min(4, n-s.length))) +
	      s;
	  };
	  d.NONE = 0;
	  d.LATITUDE = 1;
	  d.LONGITUDE = 2;
	  d.AZIMUTH = 3;
	  d.DEGREE = 0;
	  d.MINUTE = 1;
	  d.SECOND = 2;

	  /**
	   * @summary Decode a DMS string.
	   * @description The interpretation of the string is given in the
	   *   documentation of the corresponding function, Decode(string&, flag&)
	   *   in the {@link
	   *   https://geographiclib.sourceforge.io/html/classGeographicLib_1_1DMS.html
	   *   C++ DMS class}
	   * @param {string} dms the string.
	   * @returns {object} r where r.val is the decoded value (degrees) and r.ind
	   *   is a hemisphere designator, one of NONE, LATITUDE, LONGITUDE.
	   * @throws an error if the string is illegal.
	   */
	  d.Decode = function(dms) {
	    var dmsa = dms, end,
	        v = 0, i = 0, mi, pi, vals,
	        ind1 = d.NONE, ind2, p, pa, pb;
	    dmsa = dmsa.replace(/\u00b0/g, 'd')
	          .replace(/\u00ba/g, 'd')
	          .replace(/\u2070/g, 'd')
	          .replace(/\u02da/g, 'd')
	          .replace(/\u2032/g, '\'')
	          .replace(/\u00b4/g, '\'')
	          .replace(/\u2019/g, '\'')
	          .replace(/\u2033/g, '"')
	          .replace(/\u201d/g, '"')
	          .replace(/\u2212/g, '-')
	          .replace(/''/g, '"')
	          .trim();
	    end = dmsa.length;
	    // p is pointer to the next piece that needs decoding
	    for (p = 0; p < end; p = pb, ++i) {
	      pa = p;
	      // Skip over initial hemisphere letter (for i == 0)
	      if (i === 0 && lookup(hemispheres_, dmsa.charAt(pa)) >= 0)
	        ++pa;
	      // Skip over initial sign (checking for it if i == 0)
	      if (i > 0 || (pa < end && lookup(signs_, dmsa.charAt(pa)) >= 0))
	        ++pa;
	      // Find next sign
	      mi = dmsa.substr(pa, end - pa).indexOf('-');
	      pi = dmsa.substr(pa, end - pa).indexOf('+');
	      if (mi < 0) mi = end; else mi += pa;
	      if (pi < 0) pi = end; else pi += pa;
	      pb = Math.min(mi, pi);
	      vals = internalDecode(dmsa.substr(p, pb - p));
	      v += vals.val; ind2 = vals.ind;
	      if (ind1 === d.NONE)
	        ind1 = ind2;
	      else if (!(ind2 === d.NONE || ind1 === ind2))
	        throw new Error("Incompatible hemisphere specifies in " +
	                        dmsa.substr(0, pb));
	    }
	    if (i === 0)
	      throw new Error("Empty or incomplete DMS string " + dmsa);
	    return {val: v, ind: ind1};
	  };

	  internalDecode = function(dmsa) {
	    var vals = {}, errormsg = "",
	        sign, beg, end, ind1, k,
	        ipieces, fpieces, npiece,
	        icurrent, fcurrent, ncurrent, p,
	        pointseen,
	        digcount, intcount,
	        x;
	    do {                       // Executed once (provides the ability to break)
	      sign = 1;
	      beg = 0; end = dmsa.length;
	      ind1 = d.NONE;
	      k = -1;
	      if (end > beg && (k = lookup(hemispheres_, dmsa.charAt(beg))) >= 0) {
	        ind1 = (k & 2) ? d.LONGITUDE : d.LATITUDE;
	        sign = (k & 1) ? 1 : -1;
	        ++beg;
	      }
	      if (end > beg &&
	          (k = lookup(hemispheres_, dmsa.charAt(end-1))) >= 0) {
	        if (k >= 0) {
	          if (ind1 !== d.NONE) {
	            if (dmsa.charAt(beg - 1).toUpperCase() ===
	                dmsa.charAt(end - 1).toUpperCase())
	              errormsg = "Repeated hemisphere indicators " +
	              dmsa.charAt(beg - 1) + " in " +
	              dmsa.substr(beg - 1, end - beg + 1);
	            else
	              errormsg = "Contradictory hemisphere indicators " +
	              dmsa.charAt(beg - 1) + " and " + dmsa.charAt(end - 1) + " in " +
	              dmsa.substr(beg - 1, end - beg + 1);
	            break;
	          }
	          ind1 = (k & 2) ? d.LONGITUDE : d.LATITUDE;
	          sign = (k & 1) ? 1 : -1;
	          --end;
	        }
	      }
	      if (end > beg && (k = lookup(signs_, dmsa.charAt(beg))) >= 0) {
	        if (k >= 0) {
	          sign *= k ? 1 : -1;
	          ++beg;
	        }
	      }
	      if (end === beg) {
	        errormsg = "Empty or incomplete DMS string " + dmsa;
	        break;
	      }
	      ipieces = [0, 0, 0];
	      fpieces = [0, 0, 0];
	      npiece = 0;
	      icurrent = 0;
	      fcurrent = 0;
	      ncurrent = 0;
	      p = beg;
	      pointseen = false;
	      digcount = 0;
	      intcount = 0;
	      while (p < end) {
	        x = dmsa.charAt(p++);
	        if ((k = lookup(digits_, x)) >= 0) {
	          ++ncurrent;
	          if (digcount > 0) {
	            ++digcount;         // Count of decimal digits
	          } else {
	            icurrent = 10 * icurrent + k;
	            ++intcount;
	          }
	        } else if (x === '.') {
	          if (pointseen) {
	            errormsg = "Multiple decimal points in " +
	              dmsa.substr(beg, end - beg);
	            break;
	          }
	          pointseen = true;
	          digcount = 1;
	        } else if ((k = lookup(dmsindicators_, x)) >= 0) {
	          if (k >= 3) {
	            if (p === end) {
	              errormsg = "Illegal for colon to appear at the end of " +
	                dmsa.substr(beg, end - beg);
	              break;
	            }
	            k = npiece;
	          }
	          if (k === npiece - 1) {
	            errormsg = "Repeated " + components_[k] +
	              " component in " + dmsa.substr(beg, end - beg);
	            break;
	          } else if (k < npiece) {
	            errormsg = components_[k] + " component follows " +
	              components_[npiece - 1] + " component in " +
	              dmsa.substr(beg, end - beg);
	            break;
	          }
	          if (ncurrent === 0) {
	            errormsg = "Missing numbers in " + components_[k] +
	              " component of " + dmsa.substr(beg, end - beg);
	            break;
	          }
	          if (digcount > 0) {
	            fcurrent = parseFloat(dmsa.substr(p - intcount - digcount - 1,
	                                              intcount + digcount));
	            icurrent = 0;
	          }
	          ipieces[k] = icurrent;
	          fpieces[k] = icurrent + fcurrent;
	          if (p < end) {
	            npiece = k + 1;
	            icurrent = fcurrent = 0;
	            ncurrent = digcount = intcount = 0;
	          }
	        } else if (lookup(signs_, x) >= 0) {
	          errormsg = "Internal sign in DMS string " +
	            dmsa.substr(beg, end - beg);
	          break;
	        } else {
	          errormsg = "Illegal character " + x + " in DMS string " +
	            dmsa.substr(beg, end - beg);
	          break;
	        }
	      }
	      if (errormsg.length)
	        break;
	      if (lookup(dmsindicators_, dmsa.charAt(p - 1)) < 0) {
	        if (npiece >= 3) {
	          errormsg = "Extra text following seconds in DMS string " +
	            dmsa.substr(beg, end - beg);
	          break;
	        }
	        if (ncurrent === 0) {
	          errormsg = "Missing numbers in trailing component of " +
	            dmsa.substr(beg, end - beg);
	          break;
	        }
	        if (digcount > 0) {
	          fcurrent = parseFloat(dmsa.substr(p - intcount - digcount,
	                                            intcount + digcount));
	          icurrent = 0;
	        }
	        ipieces[npiece] = icurrent;
	        fpieces[npiece] = icurrent + fcurrent;
	      }
	      if (pointseen && digcount === 0) {
	        errormsg = "Decimal point in non-terminal component of " +
	          dmsa.substr(beg, end - beg);
	        break;
	      }
	      // Note that we accept 59.999999... even though it rounds to 60.
	      if (ipieces[1] >= 60 || fpieces[1] > 60) {
	        errormsg = "Minutes " + fpieces[1] + " not in range [0,60)";
	        break;
	      }
	      if (ipieces[2] >= 60 || fpieces[2] > 60) {
	        errormsg = "Seconds " + fpieces[2] + " not in range [0,60)";
	        break;
	      }
	      vals.ind = ind1;
	      // Assume check on range of result is made by calling routine (which
	      // might be able to offer a better diagnostic).
	      vals.val = sign *
	        ( fpieces[2] ? (60*(60*fpieces[0] + fpieces[1]) + fpieces[2]) / 3600 :
	          ( fpieces[1] ? (60*fpieces[0] + fpieces[1]) / 60 : fpieces[0] ) );
	      return vals;
	    } while (false);
	    vals.val = numMatch(dmsa);
	    if (vals.val === 0)
	      throw new Error(errormsg);
	    else
	      vals.ind = d.NONE;
	    return vals;
	  };

	  numMatch = function(s) {
	    var t, sign, p0, p1;
	    if (s.length < 3)
	      return 0;
	    t = s.toUpperCase().replace(/0+$/, "");
	    sign = t.charAt(0) === '-' ? -1 : 1;
	    p0 = t.charAt(0) === '-' || t.charAt(0) === '+' ? 1 : 0;
	    p1 = t.length - 1;
	    if (p1 + 1 < p0 + 3)
	      return 0;
	    // Strip off sign and trailing 0s
	    t = t.substr(p0, p1 + 1 - p0); // Length at least 3
	    if (t === "NAN" || t === "1.#QNAN" || t === "1.#SNAN" || t === "1.#IND" ||
	        t === "1.#R")
	      return Number.NaN;
	    else if (t === "INF" || t === "1.#INF")
	      return sign * Number.POSITIVE_INFINITY;
	    return 0;
	  };

	  /**
	   * @summary Decode two DMS strings interpreting them as a latitude/longitude
	   *   pair.
	   * @param {string} stra the first string.
	   * @param {string} strb the first string.
	   * @param {bool} [longfirst = false] if true assume then longitude is given
	   *   first (in the absense of any hemisphere indicators).
	   * @returns {object} r where r.lat is the decoded latitude and r.lon is the
	   *   decoded longitude (both in degrees).
	   * @throws an error if the strings are illegal.
	   */
	  d.DecodeLatLon = function(stra, strb, longfirst) {
	    var vals = {},
	        valsa = d.Decode(stra),
	        valsb = d.Decode(strb),
	        a = valsa.val, ia = valsa.ind,
	        b = valsb.val, ib = valsb.ind,
	        lat, lon;
	    if (!longfirst) longfirst = false;
	    if (ia === d.NONE && ib === d.NONE) {
	      // Default to lat, long unless longfirst
	      ia = longfirst ? d.LONGITUDE : d.LATITUDE;
	      ib = longfirst ? d.LATITUDE : d.LONGITUDE;
	    } else if (ia === d.NONE)
	      ia = d.LATITUDE + d.LONGITUDE - ib;
	    else if (ib === d.NONE)
	      ib = d.LATITUDE + d.LONGITUDE - ia;
	    if (ia === ib)
	      throw new Error("Both " + stra + " and " + strb + " interpreted as " +
	                      (ia === d.LATITUDE ? "latitudes" : "longitudes"));
	    lat = ia === d.LATITUDE ? a : b;
	    lon = ia === d.LATITUDE ? b : a;
	    if (Math.abs(lat) > 90)
	      throw new Error("Latitude " + lat + " not in [-90,90]");
	    vals.lat = lat;
	    vals.lon = lon;
	    return vals;
	  };

	  /**
	   * @summary Decode a DMS string interpreting it as an arc length.
	   * @param {string} angstr the string (this must not include a hemisphere
	   *   indicator).
	   * @returns {number} the arc length (degrees).
	   * @throws an error if the string is illegal.
	   */
	  d.DecodeAngle = function(angstr) {
	    var vals = d.Decode(angstr),
	        ang = vals.val, ind = vals.ind;
	    if (ind !== d.NONE)
	      throw new Error("Arc angle " + angstr +
	                      " includes a hemisphere N/E/W/S");
	    return ang;
	  };

	  /**
	   * @summary Decode a DMS string interpreting it as an azimuth.
	   * @param {string} azistr the string (this may include an E/W hemisphere
	   *   indicator).
	   * @returns {number} the azimuth (degrees).
	   * @throws an error if the string is illegal.
	   */
	  d.DecodeAzimuth = function(azistr) {
	    var vals = d.Decode(azistr),
	        azi = vals.val, ind = vals.ind;
	    if (ind === d.LATITUDE)
	      throw new Error("Azimuth " + azistr + " has a latitude hemisphere N/S");
	    return azi;
	  };

	  /**
	   * @summary Convert angle (in degrees) into a DMS string (using &deg;, ',
	   *  and &quot;).
	   * @param {number} angle input angle (degrees).
	   * @param {number} trailing one of DEGREE, MINUTE, or SECOND to indicate
	   *   the trailing component of the string (this component is given as a
	   *   decimal number if necessary).
	   * @param {number} prec the number of digits after the decimal point for
	   *   the trailing component.
	   * @param {number} [ind = NONE] a formatting indicator, one of NONE,
	   *   LATITUDE, LONGITUDE, AZIMUTH.
	   * @returns {string} the resulting string formatted as follows:
	   *   * NONE, signed result no leading zeros on degrees except in the units
	   *     place, e.g., -8&deg;03'.
	   *   * LATITUDE, trailing N or S hemisphere designator, no sign, pad
	   *     degrees to 2 digits, e.g., 08&deg;03'S.
	   *   * LONGITUDE, trailing E or W hemisphere designator, no sign, pad
	   *     degrees to 3 digits, e.g., 008&deg;03'W.
	   *   * AZIMUTH, convert to the range [0, 360&deg;), no sign, pad degrees to
	   *     3 digits, e.g., 351&deg;57'.
	   */
	  d.Encode = function(angle, trailing, prec, ind) {
	    // Assume check on range of input angle has been made by calling
	    // routine (which might be able to offer a better diagnostic).
	    var scale = 1, i, sign,
	        idegree, fdegree, f, pieces, ip, fp, s;
	    if (!ind) ind = d.NONE;
	    if (!isFinite(angle))
	      return angle < 0 ? String("-inf") :
	      (angle > 0 ? String("inf") : String("nan"));

	    // 15 - 2 * trailing = ceiling(log10(2^53/90/60^trailing)).
	    // This suffices to give full real precision for numbers in [-90,90]
	    prec = Math.min(15 - 2 * trailing, prec);
	    for (i = 0; i < trailing; ++i)
	      scale *= 60;
	    for (i = 0; i < prec; ++i)
	      scale *= 10;
	    if (ind === d.AZIMUTH)
	      angle -= Math.floor(angle/360) * 360;
	    sign = angle < 0 ? -1 : 1;
	    angle *= sign;

	    // Break off integer part to preserve precision in manipulation of
	    // fractional part.
	    idegree = Math.floor(angle);
	    fdegree = (angle - idegree) * scale + 0.5;
	    f = Math.floor(fdegree);
	    // Implement the "round ties to even" rule
	    fdegree = (f === fdegree && (f & 1) === 1) ? f - 1 : f;
	    fdegree /= scale;

	    fdegree = Math.floor((angle - idegree) * scale + 0.5) / scale;
	    if (fdegree >= 1) {
	      idegree += 1;
	      fdegree -= 1;
	    }
	    pieces = [fdegree, 0, 0];
	    for (i = 1; i <= trailing; ++i) {
	      ip = Math.floor(pieces[i - 1]);
	      fp = pieces[i - 1] - ip;
	      pieces[i] = fp * 60;
	      pieces[i - 1] = ip;
	    }
	    pieces[0] += idegree;
	    s = "";
	    if (ind === d.NONE && sign < 0)
	      s += '-';
	    switch (trailing) {
	    case d.DEGREE:
	      s += zerofill(pieces[0].toFixed(prec),
	                    ind === d.NONE ? 0 :
	                    1 + Math.min(ind, 2) + prec + (prec ? 1 : 0)) +
	        dmsindicatorsu_.charAt(0);
	      break;
	    default:
	      s += zerofill(pieces[0].toFixed(0),
	                    ind === d.NONE ? 0 : 1 + Math.min(ind, 2)) +
	        dmsindicatorsu_.charAt(0);
	      switch (trailing) {
	      case d.MINUTE:
	        s += zerofill(pieces[1].toFixed(prec), 2 + prec + (prec ? 1 : 0)) +
	          dmsindicatorsu_.charAt(1);
	        break;
	      case d.SECOND:
	        s += zerofill(pieces[1].toFixed(0), 2) + dmsindicatorsu_.charAt(1);
	        s += zerofill(pieces[2].toFixed(prec), 2 + prec + (prec ? 1 : 0)) +
	          dmsindicatorsu_.charAt(2);
	        break;
	      default:
	        break;
	      }
	    }
	    if (ind !== d.NONE && ind !== d.AZIMUTH)
	      s += hemispheres_.charAt((ind === d.LATITUDE ? 0 : 2) +
	                               (sign < 0 ? 0 : 1));
	    return s;
	  };
	})(GeographicLib.DMS);

	cb(GeographicLib);

	})(function(geo) {
	  if (typeof module === 'object' && module.exports) {
	    /******** support loading with node's require ********/
	    module.exports = geo;
	  } else if (true) {
	    /******** support loading with AMD ********/
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() { return geo; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    /******** otherwise just pollute our global namespace ********/
	    window.GeographicLib = geo;
	  }
	});


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.unserializeEntity = exports.unserialize = undefined;

	var _regenerator = __webpack_require__(13);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var unserialize = exports.unserialize = function () {
	  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(data) {
	    var _this, mode;

	    return _regenerator2.default.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _this = this;

	            if (data.timeRange) {
	              _this.timeRange = data.timeRange.map(function (time) {
	                return GeoVis.JulianDate.fromDate(new Date(time));
	              });
	            }
	            (0, _save_scene.unserializeScene)(data.scene, _this);
	            mode = data.mode || "3d";

	            data.entities.map(function () {
	              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(options) {
	                return _regenerator2.default.wrap(function _callee$(_context) {
	                  while (1) {
	                    switch (_context.prev = _context.next) {
	                      case 0:
	                        _context.next = 2;
	                        return unserializeEntity(options, _this, mode);

	                      case 2:
	                      case "end":
	                        return _context.stop();
	                    }
	                  }
	                }, _callee, this);
	              }));

	              return function (_x3) {
	                return _ref2.apply(this, arguments);
	              };
	            }());

	          case 5:
	          case "end":
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));

	  return function unserialize(_x2) {
	    return _ref.apply(this, arguments);
	  };
	}();
	/**
	 * @param {String} mode 仅"2d"或"3d"
	 */


	var unserializeEntity = exports.unserializeEntity = function () {
	  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(options, drawHelper, mode) {
	    var entity;
	    return _regenerator2.default.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            if (!drawHelper.features.map.get(options.id)) {
	              _context3.next = 2;
	              break;
	            }

	            return _context3.abrupt("return");

	          case 2:
	            if (options.type) {
	              _context3.next = 4;
	              break;
	            }

	            return _context3.abrupt("return");

	          case 4:
	            _context3.t0 = options.type;
	            _context3.next = _context3.t0 === _Types2.default.SPACE_POLYGON ? 7 : _context3.t0 === _Types2.default.CLASSIFY_POLYGON ? 7 : _context3.t0 === _Types2.default.PROJ_POLYGON ? 7 : _context3.t0 === _Types2.default.GROUND_POLYGON ? 7 : _context3.t0 === _Types2.default.SPACE_POLYLINE ? 9 : _context3.t0 === _Types2.default.PROJ_POLYLINE ? 9 : _context3.t0 === _Types2.default.GROUND_POLYLINE ? 9 : _context3.t0 === _Types2.default.CIRCLE ? 11 : _context3.t0 === _Types2.default.WALL ? 13 : _context3.t0 === _Types2.default.RECTANGLE ? 15 : _context3.t0 === _Types2.default.TEXT_MARKER ? 17 : _context3.t0 === _Types2.default.IMAGE_MARKER ? 19 : _context3.t0 === _Types2.default.LABEL_MARKER ? 21 : _context3.t0 === _Types2.default.FLAG_MARKER ? 21 : _context3.t0 === _Types2.default.GROUND_TEXT ? 23 : _context3.t0 === _Types2.default.ICON ? 25 : 27;
	            break;

	          case 7:
	            entity = (0, _save_polygon.unserializePolygon)(options, drawHelper, mode);
	            return _context3.abrupt("break", 27);

	          case 9:
	            entity = (0, _save_polygon.unserializePolygon)(options, drawHelper, mode);
	            return _context3.abrupt("break", 27);

	          case 11:
	            entity = (0, _save_circle.unserializeCircle)(options, drawHelper, mode);
	            return _context3.abrupt("break", 27);

	          case 13:
	            entity = (0, _save_wall.unserializeWall)(options, drawHelper, mode);
	            return _context3.abrupt("break", 27);

	          case 15:
	            entity = (0, _save_rectangle.unserializeRect)(options, drawHelper, mode);
	            return _context3.abrupt("break", 27);

	          case 17:
	            entity = (0, _save_marker.unserializeText)(options, drawHelper, mode);
	            return _context3.abrupt("break", 27);

	          case 19:
	            entity = (0, _save_marker.unserializeImage)(options, drawHelper, mode);
	            return _context3.abrupt("break", 27);

	          case 21:
	            entity = (0, _save_marker.unserializeMarker)(options, drawHelper, mode);
	            return _context3.abrupt("break", 27);

	          case 23:
	            entity = (0, _save_groundText.unserializeGroundText)(options, drawHelper, mode);
	            return _context3.abrupt("break", 27);

	          case 25:
	            entity = (0, _save_marker.unserializeIcon)(options, drawHelper, mode);
	            return _context3.abrupt("break", 27);

	          case 27:
	            if (!(options.custom && options.type.length > 1 && options.type.search("GV") > -1)) {
	              _context3.next = 31;
	              break;
	            }

	            _context3.next = 30;
	            return (0, _save_polygon.unserializePlot)(options, drawHelper, mode);

	          case 30:
	            entity = _context3.sent;

	          case 31:
	            drawHelper.fire("created", { entity: entity });

	          case 32:
	          case "end":
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));

	  return function unserializeEntity(_x4, _x5, _x6) {
	    return _ref3.apply(this, arguments);
	  };
	}();

	exports.serializeEntity = serializeEntity;
	exports.serialize = serialize;

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _save_polygon = __webpack_require__(17);

	var _save_polyline = __webpack_require__(35);

	var _save_circle = __webpack_require__(36);

	var _save_wall = __webpack_require__(38);

	var _save_rectangle = __webpack_require__(39);

	var _save_marker = __webpack_require__(42);

	var _save_scene = __webpack_require__(51);

	var _save_groundText = __webpack_require__(53);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	/**
	 * 序列化单个实体
	 * @param {*} entity
	 */
	function serializeEntity(entity) {
	  switch (entity.type) {
	    case _Types2.default.SPACE_POLYGON:
	    case _Types2.default.CLASSIFY_POLYGON:
	    case _Types2.default.PROJ_POLYGON:
	    case _Types2.default.GROUND_POLYGON:
	      return (0, _save_polygon.serializePolygon)(entity);
	    case _Types2.default.SPACE_POLYLINE:
	    case _Types2.default.PROJ_POLYLINE:
	    case _Types2.default.GROUND_POLYLINE:
	      return (0, _save_polyline.serializePolyline)(entity);
	    case _Types2.default.CIRCLE:
	      return (0, _save_circle.serializeCircle)(entity);
	    case _Types2.default.WALL:
	      return (0, _save_wall.serializeWall)(entity);
	    case _Types2.default.RECTANGLE:
	      return (0, _save_rectangle.serializeRect)(entity);
	    case _Types2.default.TEXT_MARKER:
	      return (0, _save_marker.serializeText)(entity);
	    case _Types2.default.IMAGE_MARKER:
	      return (0, _save_marker.serializeImage)(entity);
	    case _Types2.default.LABEL_MARKER:
	    case _Types2.default.FLAG_MARKER:
	      return (0, _save_marker.serializeMarker)(entity);
	    case _Types2.default.GROUND_TEXT:
	      return (0, _save_groundText.serializeGroundText)(entity);
	    case _Types2.default.ICON:
	      return (0, _save_marker.serializeIcon)(entity);
	  }
	  // 线标
	  if (entity.custom && entity.type.length > 1 && entity.type.search("GV") > -1 && entity._primitive) {
	    return (0, _save_polygon.serializePlot)(entity);
	  }
	}
	/**
	 * @param {String} mode 仅"2d"或"3d"
	 */
	function serialize() {
	  var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "3d";

	  var results = [];
	  var drawHelper = this;
	  drawHelper.stopDrawing();
	  drawHelper._editor.disableAllEditMode();
	  drawHelper._editor.disableAllHighlights();
	  var sceneInfor = (0, _save_scene.serializeScene)(drawHelper._sceneInfor);
	  drawHelper.primitives._primitives.map(function (entity) {
	    if (!entity.type) return;
	    results.push(serializeEntity(entity));
	  });
	  drawHelper.features.markers._markerMap.forEach(function (marker) {
	    if (!marker.type) return;
	    results.push(serializeEntity(marker));
	  });
	  drawHelper.features.map.forEach(function (entity) {
	    if (!entity.type) return;
	    results.push(serializeEntity(entity));
	  });
	  results = results.filter(function (item) {
	    return item;
	  });

	  var data = {
	    mode: mode,
	    scene: sceneInfor,
	    entities: results
	  };
	  return data;
	}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(14);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g = (function() { return this })() || Function("return this")();

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	module.exports = __webpack_require__(15);

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	!(function(global) {
	  "use strict";

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };
	})(
	  // In sloppy mode, unbound `this` refers to the global object, fallback to
	  // Function constructor if we're in global strict mode. That is sadly a form
	  // of indirect eval which violates Content Security Policy.
	  (function() { return this })() || Function("return this")()
	);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});


	var i = 1;
	var Types = {
	  /**
	   * 空间多边形
	   * @type {Number}
	   * @constant
	   */
	  SPACE_POLYGON: ++i,

	  /**
	   * 单体化区域选取
	   * @type {Number}
	   * @constant
	   */
	  CLASSIFY_POLYGON: ++i,
	  /**
	   * 投影多边形
	   * @type {Number}
	   * @constant
	   */
	  PROJ_POLYGON: ++i,
	  /**
	   * 地形多边形
	   * @type {Number}
	   * @constant
	   */
	  GROUND_POLYGON: ++i,
	  /**
	   * 空间线
	   * @type {Number}
	   * @constant
	   */
	  SPACE_POLYLINE: ++i,

	  /**
	   * 投影线
	   * @type {Number}
	   * @constant
	   */
	  PROJ_POLYLINE: ++i,

	  /**
	   * 地形线
	   * @type {Number}
	   * @constant
	   */
	  GROUND_POLYLINE: ++i,

	  /**
	   * 圆
	   * @type {Number}
	   * @constant
	   */
	  CIRCLE: ++i,

	  /**
	   *
	   * 墙
	   * @type {Number}
	   * @constant
	   */
	  WALL: ++i,
	  /**
	   *
	   * 长方形
	   * @type {Number}
	   * @constant
	   */
	  RECTANGLE: ++i,
	  /**
	     *
	     * 三角量测
	     * @type {Number}
	     * @constant
	     */
	  ANGLE: ++i,

	  TEXT_MARKER: ++i,
	  IMAGE_MARKER: ++i,
	  LABEL_MARKER: ++i,
	  FLAG_MARKER: ++i,

	  ICON: ++i,
	  GROUND_TEXT: ++i
	};

	exports.default = Types;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.unserializePlot = undefined;

	var _regenerator = __webpack_require__(13);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


	var unserializePlot = exports.unserializePlot = function () {
	  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(options, drawHelper, mode, animation) {
	    var result, poly, outlineColor, custom, customs;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            result = {};

	            result.name = options.name || "基础标绘";
	            result.type = options.type;
	            poly = new _PlotShape2.default(_extends({}, options, { drawHelper: drawHelper }));

	            poly.custom = options.custom.map(function (pos) {
	              return (0, _props.loadProp)("lonlat", pos);
	            });

	            if (!(!options.animator || !options.animator.visible)) {
	              _context.next = 8;
	              break;
	            }

	            _context.next = 8;
	            return (0, _websocket.getGeomtry)(options.custom, options.type, poly);

	          case 8:
	            poly.visible = options.visible;
	            poly.fill = options.fill;
	            poly.outlineWidth = options.outlineWidth;
	            poly.dashLine = options.dashLine;
	            poly.fillColor = (0, _props.loadProp)("color", options.fillColor);
	            outlineColor = (0, _props.loadProp)("color", options.outlineColor);


	            poly.highLightColor = (0, _props.loadProp)("color", options.highLightColor);
	            poly.outlineColor = outlineColor;
	            poly.lineType = options.lineType;
	            poly.inlineColor = (0, _props.loadProp)("color", options.inlineColor);
	            poly.inlineWidth = options.inlineWidth;
	            poly.fillType = options.fillType;
	            poly.infillColor = (0, _props.loadProp)("color", options.infillColor);

	            if (options.iconColor) {
	              poly.iconColor = (0, _props.loadProp)("color", options.iconColor);
	            }

	            if (!(options.animator && options.animator.visible)) {
	              _context.next = 29;
	              break;
	            }

	            poly.addAnimate(options.animator);
	            poly.visible = !options.animator.visible;
	            custom = options.custom.map(function (pos) {
	              return (0, _props.loadProp)("lonlat", pos);
	            });
	            customs = [custom[0], [custom[0][0], custom[0][1] + 0.000001, custom[0][2]]];
	            _context.next = 29;
	            return (0, _websocket.getGeomtry)(customs, options.type, poly);

	          case 29:
	            poly._createPrimitive = true;
	            if (mode === "3d") {
	              drawHelper._primitives.add(poly);
	            }

	            poly.setEditable();
	            return _context.abrupt("return", poly);

	          case 33:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function unserializePlot(_x, _x2, _x3, _x4) {
	    return _ref.apply(this, arguments);
	  };
	}();

	exports.serializePolygon = serializePolygon;
	exports.unserializePolygon = unserializePolygon;
	exports.serializePlot = serializePlot;

	var _Polygon = __webpack_require__(18);

	var _Polygon2 = _interopRequireDefault(_Polygon);

	var _PlotShape = __webpack_require__(25);

	var _PlotShape2 = _interopRequireDefault(_PlotShape);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _GroundPolyline = __webpack_require__(31);

	var _GroundPolyline2 = _interopRequireDefault(_GroundPolyline);

	var _Polyline = __webpack_require__(32);

	var _Polyline2 = _interopRequireDefault(_Polyline);

	var _props = __webpack_require__(33);

	var _websocket = __webpack_require__(29);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function serializePolygon(entity) {
	  var poly = {};
	  poly.isPolygon = true;
	  poly.type = entity.type;
	  poly.id = entity.id;
	  poly.name = entity.name;
	  poly.positions = entity.positions.map(function (vec3) {
	    return (0, _props.saveProp)("position", vec3);
	  });
	  poly.computed = entity.computed;
	  poly.material = (0, _props.saveProp)("material", entity.material);
	  return poly;
	}

	function unserializePolygon(params, drawHelper, mode) {
	  var options = _extends({}, params);
	  if (options.geometry) {
	    var properties = options.properties;
	    if (options.geometry.type === "LineString") {
	      options.type = _Types2.default.PROJPOLYLINE;
	      if (options.properties.colors) {
	        var material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	        material.uniforms.color = GeoVis.Color.fromCssString(properties.colors[0]);
	        options.material = material;
	      }
	      if (options.properties.material) {
	        var _material = GeoVis.Material.fromType(properties.material);
	        _material.uniforms.color = GeoVis.Color.fromCssString(properties.colors[0]);
	        if (properties.material === "PolylineDash") {
	          _material.uniforms.dashLength = properties.dashLength;
	        } else if (properties.material === "PolylineOutline") {
	          _material.uniforms.outlineWidth = properties.outlineWidth;
	          _material.uniforms.outlineColor = GeoVis.Color.fromCssString(properties.outlineColor);
	        }
	        options.material = _material;
	        options.appearance = new GeoVis.PolylineMaterialAppearance({
	          material: options.material
	        });
	      }
	      var positions = [];
	      options.geometry.coordinates.map(function (lonlat) {
	        if (lonlat[0].length) {
	          lonlat.map(function (l) {
	            var _GeoVis$Cartesian;

	            return positions.push((_GeoVis$Cartesian = GeoVis.Cartesian3).fromDegrees.apply(_GeoVis$Cartesian, _toConsumableArray(l)));
	          });
	        } else {
	          var _GeoVis$Cartesian2;

	          positions.push((_GeoVis$Cartesian2 = GeoVis.Cartesian3).fromDegrees.apply(_GeoVis$Cartesian2, _toConsumableArray(lonlat)));
	        }
	      });
	      options.positions = positions;
	      options.width = properties.width;
	    } else {
	      // 处理Polygon

	      options.type = _Types2.default.PROJPOLYLINE;
	      var material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	      if (properties.fillColor.length === 2) {
	        material.uniforms.color = GeoVis.Color.fromCssString(properties.fillColor[0]).withAlpha(properties.fillColor[1]);
	      } else {
	        material.uniforms.color = GeoVis.Color.unpack(properties.fillColor);
	      }

	      options.material = material;
	      var _positions = [];
	      options.geometry.coordinates.map(function (lonlat) {
	        if (lonlat.length > 2) {
	          lonlat.map(function (l) {
	            var _GeoVis$Cartesian3;

	            return _positions.push((_GeoVis$Cartesian3 = GeoVis.Cartesian3).fromDegrees.apply(_GeoVis$Cartesian3, _toConsumableArray(l)));
	          });
	        } else {
	          var _GeoVis$Cartesian4;

	          _positions.push((_GeoVis$Cartesian4 = GeoVis.Cartesian3).fromDegrees.apply(_GeoVis$Cartesian4, _toConsumableArray(lonlat)));
	        }
	      });
	      options.positions = _positions;
	      options.width = properties.width;
	      options.appearance = new GeoVis.MaterialAppearance({
	        material: options.material
	      });
	    }
	  } else {
	    if (options.material) {
	      options.material = (0, _props.loadProp)("material", options.material);
	    }
	    options.id = options.id || GeoVis.createGuid();
	    options.positions = options.positions.map(function (prop) {
	      return (0, _props.loadProp)("position", prop);
	    });
	  }

	  if (options.type === _Types2.default.SPACE_POLYLINE || options.type === _Types2.default.SPACE_POLYGON) {
	    options.arcType = GeoVis.ArcType.NONE;
	  }
	  var poly;
	  var primitives = drawHelper._primitives;
	  var groundPrimitives = drawHelper._groundPrimitives;
	  // options.computed
	  if (options.isPolygon) {
	    options.appearance = new GeoVis.MaterialAppearance({
	      // aboveGround: false,
	      material: options.material
	    });
	    poly = new _Polygon2.default(_extends({}, options, { drawHelper: drawHelper }));
	    poly.asynchronous = false;
	    if (mode === "3d") {
	      primitives.add(poly);
	    }
	  } else {
	    if (options.type === _Types2.default.GROUND_POLYLINE) {
	      poly = new _Polyline2.default(_extends({}, options, { drawHelper: drawHelper }));
	      poly.asynchronous = false;
	      if (mode === "3d") {
	        groundPrimitives.add(poly);
	      }
	    } else {
	      if (!options.material) {
	        options.material = GeoVis.Material.fromType("Color");
	        options.material.uniforms.color = (0, _props.loadProp)("color", options.fillColor);
	        options.appearance = new GeoVis.PolylineMaterialAppearance({
	          material: options.material
	        });
	      }
	      poly = new _Polyline2.default(_extends({}, options, { drawHelper: drawHelper }));
	      poly.asynchronous = false;
	      if (mode === "3d") {
	        primitives.add(poly);
	      }
	    }
	  }
	  poly.setEditable();
	  return poly;
	}

	function savePlotGeometry(geom) {
	  var result = {};
	  result.fillType = geom.fillType;
	  result._outlineColor = geom._outlineColor ? (0, _props.saveProp)("color", geom._outlineColor) : undefined;
	  result._fillColor = geom._fillColor ? (0, _props.saveProp)("color", geom._fillColor) : undefined;
	  result.lineType = geom.lineType;
	  result.subsymbolCode = geom.subsymbolCode;
	  result._isFill = geom.isFill;
	  // result.canFilled = geom.canFilled;
	  return result;
	}

	function loadPlotGeom(geom, options) {
	  geom.fillType = options.fillType;
	  geom._outlineColor = options._outlineColor ? (0, _props.loadProp)("color", options._outlineColor) : undefined;
	  geom._fillColor = options._fillColor ? (0, _props.loadProp)("color", options._fillColor) : undefined;
	  geom.lineType = options.lineType;
	  geom.subsymbolCode = options.subsymbolCode;
	  geom._isFill = options.isFill;

	  // geom.canFilled = options.canFilled;
	}

	function loadFirstPlotGeom(geom, options) {
	  geom.fillType = options.fillType;
	  geom._outlineColor = options._outlineColor ? (0, _props.loadProp)("color", options._outlineColor) : undefined;
	  geom._outlineColor.alpha = 0;
	  geom._fillColor = options._fillColor ? (0, _props.loadProp)("color", options._fillColor) : undefined;
	  geom._fillColor.alpha = 0;
	  geom.lineType = options.lineType;
	  geom.subsymbolCode = options.subsymbolCode;
	  geom._isFill = options.isFill;
	}

	/**
	 *
	 * @param {Polygon} entity
	 * @param {GeoVis.Earth} earth
	 */
	function serializePlot(entity, drawHelper) {
	  var result = {};
	  result.name = entity.name || "基础标绘";
	  result.type = entity.type;
	  result.plotGeometrys = entity.plotGeometrys.map(function (geom) {
	    return savePlotGeometry(geom);
	  });
	  result.visible = entity.visible;
	  // result.canFilled = entity.canFilled;
	  result.fill = entity.fill;
	  result.id = entity.id;
	  result.dashLine = entity.dashLine;
	  result.custom = entity.custom.map(function (pos) {
	    return (0, _props.saveProp)("lonlat", pos);
	  });
	  result.fillColor = (0, _props.saveProp)("color", entity.fillColor);
	  result.outlineWidth = entity.outlineWidth;
	  result.outlineColor = (0, _props.saveProp)("color", entity.outlineColor);
	  result.highLightColor = (0, _props.saveProp)("color", entity.highLightColor);
	  result.lineType = entity.lineType;
	  result.inlineColor = (0, _props.saveProp)("color", entity.inlineColor);
	  result.inlineWidth = entity.inlineWidth;
	  result.fillType = entity.fillType;
	  result.infillColor = (0, _props.saveProp)("color", entity.infillColor);
	  result.elevationMode = entity.elevationMode;
	  result.elevationHeight = entity.elevationHeight;
	  if (entity.animator) {
	    result.animator = (0, _props.saveAnimator)(entity.animator);
	  }
	  // result.canFilled = entity.canFilled;
	  if (entity.billboards) {
	    result.billboards = entity.billboards.map(function (bb) {
	      return GeoVis.Serializer.saveFeature(bb);
	    });
	  }
	  if (entity.iconColor) {
	    result.iconColor = (0, _props.saveProp)("color", entity.iconColor);
	  }
	  return result;
	}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ChangeablePrimitive2 = __webpack_require__(19);

	var _ChangeablePrimitive3 = _interopRequireDefault(_ChangeablePrimitive2);

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _geometryHelper = __webpack_require__(20);

	var _Util = __webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Polygon = function (_ChangeablePrimitive) {
	  _inherits(Polygon, _ChangeablePrimitive);

	  function Polygon(options) {
	    _classCallCheck(this, Polygon);

	    options = (0, _util.copyOptions)(options, _config.defaultSurfaceOptions);

	    var _this = _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this, options));

	    _this.setEditable = function () {
	      _this.drawHelper._editor.add(_this);
	    };

	    _this.getGeometry = function () {
	      return (0, _geometryHelper.getGeometry)(_this);
	    };

	    _this.deleted = function () {
	      var editor = _this.drawHelper._editor.getEditor(_this);
	      editor.setEditable(_this, false);
	      _this.drawHelper._tooltip.setVisible(false);
	      editor.setHighlighted(_this, false);
	      _this.drawHelper._primitives.remove(_this);
	      _this.drawHelper.fire("deleted", { entity: _this });
	    };

	    _this.material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	    _this.material.uniforms.color = options.fillColor || GeoVis.Color.fromCssString("#009688").withAlpha(0.3);
	    _this.type = options.type || _Types2.default.PROJ_POLYGON;
	    _this.name = options.name || null;
	    // 开启量测
	    _this.computed = options.computed || false;

	    _this.drawHelper = options.drawHelper;
	    _this.appearance = new GeoVis.MaterialAppearance({
	      flat: true,
	      material: _this.material
	    });
	    return _this;
	  }
	  /**
	   * 获取Polygon的经纬度
	   * @type {Vector3}
	   * @name positions
	   * @memberof Polygon
	   */


	  _createClass(Polygon, [{
	    key: "updateConPoints",
	    value: function updateConPoints() {
	      if (this._points) {
	        this._points.updatePointsPositions(this.positions);
	        (0, _Util.updateMarkers)(this);
	      }
	    }
	  }, {
	    key: "positions",
	    get: function get() {
	      return this._positions;
	    },
	    set: function set(positions) {
	      this._positions = positions;
	      this._createPrimitive = true;
	    }
	  }, {
	    key: "cartographic",
	    get: function get() {
	      var result = [];
	      this.positions.map(function (pos) {
	        var cato = GeoVis.Cartographic.fromCartesian(pos);
	        result.push(cato);
	      });
	      return result;
	    },
	    set: function set(val) {
	      var positions = [];
	      val.map(function (carto) {
	        var pos = GeoVis.Cartographic.toCartesian(carto);
	        positions.push(pos);
	      });
	      this.positions = positions;
	      this.updateConPoints();
	    }

	    /**
	     * 获取Polygon的显隐
	     * @type {Boolean}
	     * @name visible
	     * @memberof Polygon
	     */

	  }, {
	    key: "visible",
	    get: function get() {
	      this._visible = this.show;
	      return this._visible;
	    },
	    set: function set(value) {
	      this._visible = value;
	      this.show = value;
	    }
	    /**
	     * 获取Polygon的拔高
	     * @type {Number}
	     * @name extrudedHeight
	     * @memberof Polygon
	     */

	  }, {
	    key: "extrudedHeight",
	    get: function get() {
	      return this._extrudedHeight;
	    },
	    set: function set(val) {
	      this._extrudedHeight = val;
	      this._createPrimitive = true;
	    }
	  }]);

	  return Polygon;
	}(_ChangeablePrimitive3.default);

	exports.default = Polygon;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(5);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _geometryHelper = __webpack_require__(20);

	var _material = __webpack_require__(21);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChangeablePrimitive = function () {
	  function ChangeablePrimitive(options) {
	    _classCallCheck(this, ChangeablePrimitive);

	    (0, _util.fillOptions)(this, options);
	    this._ellipsoid = undefined;
	    this._granularity = undefined;
	    this._height = undefined;
	    this._textureRotationAngle = undefined;
	    this._id = options.id || GeoVis.createGuid();
	    this._createPrimitive = true;
	    this._primitive = undefined;
	    this._outlinePolygon = undefined;
	    this.onterrain = options.onterrain || false;
	    this.type = options.type;
	  }

	  _createClass(ChangeablePrimitive, [{
	    key: "setAttribute",
	    value: function setAttribute(name, value) {
	      this[name] = value;
	      this._createPrimitive = true;
	    }
	  }, {
	    key: "getAttribute",
	    value: function getAttribute(name) {
	      return this[name];
	    }
	  }, {
	    key: "update",
	    value: function update(context, frameState, commandList) {
	      if (!GeoVis.defined(this.ellipsoid)) {
	        throw new GeoVis.DeveloperError("this.ellipsoid must be defined.");
	      }

	      if (!GeoVis.defined(this.appearance)) {
	        throw new GeoVis.DeveloperError("this.material must be defined.");
	      }

	      if (this.granularity < 0.0) {
	        throw new GeoVis.DeveloperError("this.granularity and scene2D/scene3D overrides must be greater than zero.");
	      }

	      if (!this.show) {
	        return;
	      }

	      if (!this._createPrimitive && !GeoVis.defined(this._primitive)) {
	        // No positions/hierarchy to draw
	        return;
	      }

	      if (this._createPrimitive || this._ellipsoid !== this.ellipsoid || this._granularity !== this.granularity || this._height !== this.height || this._textureRotationAngle !== this.textureRotationAngle || this._id !== this.id) {
	        var geometry = this.getGeometry();
	        if (!geometry) {
	          return;
	        }
	        this.updateBillboard && this.updateBillboard();
	        this.updateWall && this.updateWall();
	        this._createPrimitive = false;
	        this._ellipsoid = this.ellipsoid;
	        this._granularity = this.granularity;
	        this._height = this.height;
	        this._textureRotationAngle = this.textureRotationAngle;
	        this._id = this.id;

	        this._primitive = this._primitive && this._primitive.destroy();
	        this.appearance._renderState = GeoVis.RenderState.fromCache({
	          depthTest: {
	            enabled: true
	          }
	        });
	        if (this.type === _Types2.default.GROUND_POLYLINE || this.type === _Types2.default.GROUND_POLYGON) {
	          this._primitive = (0, _geometryHelper.getGroundPrimitive)(geometry, this);
	        } else if (this.type === _Types2.default.CLASSIFY_POLYGON) {
	          this._primitive = new GeoVis.ClassificationPrimitive({
	            geometryInstances: new GeoVis.GeometryInstance({
	              geometry: geometry,
	              id: this.id,
	              pickPrimitive: this,
	              attributes: {
	                color: GeoVis.ColorGeometryInstanceAttribute.fromColor(this.color),
	                show: new GeoVis.ShowGeometryInstanceAttribute(true)
	              }
	            }),
	            asynchronous: this.asynchronous
	          });
	        } else {
	          if (geometry instanceof Array) {
	            this._primitive = (0, _geometryHelper.getPlotPrimitive)(geometry, this);
	          } else {
	            this._primitive = new GeoVis.Primitive({
	              geometryInstances: new GeoVis.GeometryInstance({
	                geometry: geometry,
	                id: this.id,
	                pickPrimitive: this
	              }),
	              appearance: this.appearance,
	              asynchronous: this.asynchronous
	            });
	          }
	        }

	        this._outlinePolygon = this._outlinePolygon && this._outlinePolygon.destroy();
	        if (this.outlineColor && this.fill && this.getOutlineGeometry) {
	          var outlineInstances = [];
	          var outlineGeometry = this.getOutlineGeometry();
	          var outlineMaterial = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	          outlineMaterial.uniforms.color = this.outlineColor;
	          var outlineAttributes = {
	            color: GeoVis.ColorGeometryInstanceAttribute.fromColor(this.outlineColor)
	          };

	          if (outlineGeometry instanceof Array) {
	            outlineGeometry.map(function (geom) {
	              outlineInstances.push(new GeoVis.GeometryInstance({
	                geometry: geom,
	                attributes: outlineAttributes
	              }));
	            });
	          } else {
	            outlineInstances.push(new GeoVis.GeometryInstance({
	              geometry: outlineGeometry,
	              attributes: outlineAttributes
	            }));
	          }
	          var newAppearance = (0, _material.createLineAppearance)(this.lineType, this.outlineColor, this.inlineColor, this.inlineWidth, this);
	          if (this.clampToGround) {
	            this._outlinePolygon = new GeoVis.GroundPolylinePrimitive({
	              geometryInstances: outlineInstances,
	              appearance: newAppearance,
	              asynchronous: this.asynchronous
	            });
	          } else {
	            this._outlinePolygon = new GeoVis.Primitive({
	              geometryInstances: outlineInstances,
	              appearance: newAppearance,
	              asynchronous: this.asynchronous
	            });
	          }
	        }
	      }

	      var primitive = this._primitive;
	      primitive.debugShowBoundingVolume = this.debugShowBoundingVolume;
	      primitive.update(context, frameState, commandList);
	      this._outlinePolygon && this._outlinePolygon.update(context, frameState, commandList);
	    }
	  }, {
	    key: "isDestroyed",
	    value: function isDestroyed() {
	      return false;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this._primitive = this._primitive && this._primitive.destroy();
	      this._outlinePolygon = this._outlinePolygon && this._outlinePolygon.destroy();
	      return GeoVis.destroyObject(this);
	    }
	  }, {
	    key: "setStrokeStyle",
	    value: function setStrokeStyle(strokeColor, strokeWidth) {
	      if (!this.strokeColor || !this.strokeColor.equals(strokeColor) || this.strokeWidth !== strokeWidth) {
	        this._createPrimitive = true;
	        this.strokeColor = strokeColor;
	        this.strokeWidth = strokeWidth;
	      }
	    }
	  }, {
	    key: "id",
	    get: function get() {
	      return this._id;
	    },
	    set: function set(val) {
	      this._id = val;
	    }
	  }, {
	    key: "fillColor",
	    get: function get() {
	      return this.material ? this.material.uniforms.color : null;
	    },
	    set: function set(val) {
	      this.material && (this.material.uniforms.color = val);
	      this._createPrimitive = true;
	    }
	  }]);

	  return ChangeablePrimitive;
	}();

	exports.default = ChangeablePrimitive;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getGeometry = getGeometry;
	exports.getPlotPrimitive = getPlotPrimitive;
	exports.getGroundPrimitive = getGroundPrimitive;

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _material = __webpack_require__(21);

	var _CoplanarPolygon = __webpack_require__(22);

	var _CoplanarPolygon2 = _interopRequireDefault(_CoplanarPolygon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getGeometry(entity) {
	  if (entity.plotGeometrys && entity.plotGeometrys.length > 0) {
	    var symbolPlot = [];

	    var geomtry = entity.plotGeometrys.map(function (geom) {
	      if (geom.subsymbolCode !== -1) {
	        symbolPlot.push(geom);
	        return undefined;
	      }
	      if (entity.elevationMode === "clampToGround") {
	        if (entity.fill) {
	          return GeoVis.PolygonGeometry.fromPositions({
	            positions: geom.positions
	          });
	        } else {
	          return new GeoVis.GroundPolylineGeometry({
	            positions: geom.positions,
	            // height: this.height,
	            width: entity.outlineWidth || 2,
	            vertexFormat: GeoVis.EllipsoidSurfaceAppearance.VERTEX_FORMAT
	          });
	        }
	      } else {
	        if (entity.fill) {
	          // CoplanarPolygonGeometry
	          // return GeoVis.CoplanarPolygonGeometry.fromPositions({
	          //   positions: geom.positions
	          // });
	          return new _CoplanarPolygon2.default({
	            polygonHierarchy: new GeoVis.PolygonHierarchy(geom.positions)
	          });
	        } else {
	          return new GeoVis.PolylineGeometry({
	            positions: geom.positions,
	            // height: this.height,
	            width: entity.outlineWidth || 2,
	            vertexFormat: GeoVis.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
	            arcType: GeoVis.ArcType.NONE
	          });
	        }
	      }
	    });
	    entity.symbolPlot = symbolPlot;
	    return geomtry;
	  }
	  if (!GeoVis.defined(entity.positions) || entity.positions.length < 3) {
	    return;
	  }
	  if (entity.type === _Types2.default.SPACE_POLYGON) {
	    // return GeoVis.CoplanarPolygonGeometry.fromPositions({
	    //   positions: entity.positions
	    // });
	    return new _CoplanarPolygon2.default({
	      polygonHierarchy: new GeoVis.PolygonHierarchy(entity.positions)
	    });
	  } else {
	    return GeoVis.PolygonGeometry.fromPositions({
	      positions: entity.positions,
	      height: entity.height,
	      extrudedHeight: entity.extrudedHeight,
	      vertexFormat: GeoVis.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
	      stRotation: entity.textureRotationAngle,
	      ellipsoid: entity.ellipsoid,
	      granularity: entity.granularity
	    });
	  }
	}

	function createPolylinePrimitive(geoms, entity) {
	  var lastColor;
	  // var defaultColor = entity.material.uniforms.color || entity.color;
	  var instances = geoms.map(function (geom, index) {
	    var plotGeom = entity.plotGeometrys[index];
	    var outlineColor = plotGeom.outlineColor;
	    if (outlineColor && lastColor && lastColor.toCssColorString() !== outlineColor.toCssColorString()) {
	      entity.lineType = "multi";
	    }
	    lastColor = outlineColor;
	    if (plotGeom.lineType === 1) {
	      entity.lineType = "dash";
	    }
	    return new GeoVis.GeometryInstance({
	      geometry: geom,
	      id: entity,
	      pickPrimitive: entity,
	      attributes: {
	        color: GeoVis.ColorGeometryInstanceAttribute.fromColor(outlineColor),
	        distanceDisplayCondition: entity.distanceDisplayCondition ? GeoVis.DistanceDisplayConditionGeometryInstanceAttribute.fromDistanceDisplayCondition(entity.distanceDisplayCondition) : undefined
	      }
	    });
	  });
	  var newAppearance = (0, _material.createLineAppearance)(entity.lineType, lastColor, entity.inlineColor, entity.inlineWidth, entity);

	  if (entity.elevationMode === "clampToGround") {
	    return new GeoVis.GroundPolylinePrimitive({
	      geometryInstances: instances,
	      appearance: newAppearance,
	      asynchronous: entity.asynchronous
	    });
	  } else {
	    return new GeoVis.Primitive({
	      geometryInstances: instances,
	      appearance: newAppearance,
	      asynchronous: entity.asynchronous
	    });
	  }
	}

	function createPolygonPrimitive(geoms, entity) {
	  var instances = geoms.map(function (geom) {
	    return new GeoVis.GeometryInstance({
	      geometry: geom,
	      id: entity,
	      pickPrimitive: entity
	    });
	  });
	  var newAppearance = (0, _material.createFillAppearance)(entity.fillType, entity.fillColor, entity.infillColor);
	  if (entity.elevationMode === "clampToGround") {
	    return new GeoVis.GroundPrimitive({
	      geometryInstances: instances,
	      appearance: newAppearance,
	      asynchronous: entity.asynchronous
	    });
	  } else {
	    return new GeoVis.Primitive({
	      geometryInstances: instances,
	      appearance: newAppearance,
	      asynchronous: entity.asynchronous
	    });
	  }
	}

	function getPlotPrimitive(geometry, entity) {
	  var polylineGeoms = geometry.filter(function (geom) {
	    return geom instanceof GeoVis.PolylineGeometry || geom instanceof GeoVis.GroundPolylineGeometry;
	  });
	  var polygonGeoms = geometry.filter(function (geom) {
	    return !(geom instanceof GeoVis.PolylineGeometry || geom instanceof GeoVis.GroundPolylineGeometry) && geom !== undefined;
	  });
	  if (polylineGeoms.length > 0 && polygonGeoms.length > 0) {
	    var polylinePrimitive = createPolylinePrimitive(polylineGeoms, entity);
	    var polygonPrimitive = createPolygonPrimitive(polygonGeoms, entity);
	    var primitives = new GeoVis.PrimitiveCollection();
	    primitives.add(polylinePrimitive);
	    primitives.add(polygonPrimitive);
	    return primitives;
	  } else if (polylineGeoms.length > 0) {
	    var _polylinePrimitive = createPolylinePrimitive(polylineGeoms, entity);
	    return _polylinePrimitive;
	  } else {
	    var _polygonPrimitive = createPolygonPrimitive(polygonGeoms, entity);
	    return _polygonPrimitive;
	  }
	}

	function getGroundPrimitive(geometry, entity) {
	  if (entity.type === _Types2.default.GROUND_POLYLINE) {
	    var color = entity.material.uniforms.color;
	    var instances = [new GeoVis.GeometryInstance({
	      geometry: geometry,
	      id: entity,
	      pickPrimitive: entity,
	      attributes: {
	        color: GeoVis.ColorGeometryInstanceAttribute.fromColor(color)
	      }
	    })];
	    return new GeoVis.GroundPolylinePrimitive({
	      geometryInstances: instances,
	      appearance: new GeoVis.PolylineMaterialAppearance({
	        material: entity.material
	      }),
	      asynchronous: entity.asynchronous
	    });
	  } else {
	    var _instances = [new GeoVis.GeometryInstance({
	      geometry: geometry,
	      id: entity,
	      pickPrimitive: entity
	    })];
	    return new GeoVis.GroundPrimitive({
	      geometryInstances: _instances,
	      appearance: new GeoVis.MaterialAppearance({
	        material: entity.material
	      }),
	      asynchronous: entity.asynchronous
	    });
	  }
	}

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createLineAppearance = createLineAppearance;
	exports.createFillAppearance = createFillAppearance;
	var imageMaterial = exports.imageMaterial = new GeoVis.Material({
	  fabric: {
	    type: "Image",
	    uniforms: {
	      image: "./img/trump.jpg"
	    }
	  }
	});

	var dynamicMaterial = exports.dynamicMaterial = new GeoVis.Material({
	  fabric: {
	    source: "\n      uniform vec4 color;\n      uniform float rimWidth;\n      uniform float speed;\n      \n      float rand(vec2 co){\n          return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n      }\n      \n      czm_material czm_getMaterial(czm_materialInput materialInput)\n      {\n          czm_material material = czm_getDefaultMaterial(materialInput);\n          float RADIUS = 0.7071068;\n          float time = czm_frameNumber * 0.05 * speed;\n          float offset = time;\n          float x = materialInput.st.s - 0.5;\n          float y = materialInput.st.t - 0.5;\n          vec2 origin = vec2(0.5, 0.5);\n          float radius = distance(vec2(0.0, 0.0), vec2(x, y))/RADIUS;\n          float val = fract(radius-time);\n          material.diffuse = color.rgb;\n          material.shininess = 0.9;\n          // if(radius>0.5){\n          //   material.alpha = val * (1.0-radius);\n          // } else{\n          //   material.alpha = val * radius;\n          // }\n          material.alpha = val * radius;\n           return material;\n      } ",
	    uniforms: {
	      color: GeoVis.Color.RED.withAlpha(0.6),
	      speed: 0.1
	    }
	  }
	});

	function getColorRamp(colors) {
	  var ramp = document.createElement("canvas");
	  ramp.width = 100;
	  ramp.height = 1;
	  var ctx = ramp.getContext("2d");
	  var values = colors;
	  var grd = ctx.createLinearGradient(0, 0, 100, 0);
	  grd.addColorStop(0.0, values[0].toCssColorString());
	  grd.addColorStop(1, values[1].toCssColorString());
	  ctx.fillStyle = grd;
	  ctx.fillRect(0, 0, 100, 1);
	  return ramp;
	}

	var inLine = exports.inLine = "\nuniform vec4 color;\nuniform vec4 outlineColor;\nuniform float outlineWidth;\n\nvarying float v_width;\n\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\n\nvec2 st = materialInput.st;\nfloat halfInteriorWidth =  (v_width - outlineWidth) / v_width;\nfloat b = 1.0 - step(halfInteriorWidth, st.t);\n\nvec4 currentColor = mix(outlineColor, color, b);\n\nmaterial.diffuse = currentColor.rgb;\nmaterial.alpha = currentColor.a;\n\nreturn material;\n}\n";
	var outLine = exports.outLine = "\nuniform vec4 color;\nuniform vec4 outlineColor;\nuniform float outlineWidth;\n\nvarying float v_width;\n\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\n\nvec2 st = materialInput.st;\nfloat halfInteriorWidth =  outlineWidth / v_width;\nfloat b = step(halfInteriorWidth, st.t);\n\nvec4 currentColor = mix(outlineColor, color, b);\n\nmaterial.diffuse = currentColor.rgb;\nmaterial.alpha = currentColor.a;\n\nreturn material;\n}\n";
	var linefill = exports.linefill = "\nuniform vec4 color;  \nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\n czm_material material = czm_getDefaultMaterial(materialInput);\nvec2 st = materialInput.st;\nvec3 str = materialInput.str;\nfloat height= clamp(st.s,-1.0,1.0);\nvec4 rampcolor = texture2D(gradients,vec2(height,0.5));\n rampcolor= czm_gammaCorrect(rampcolor);\n material.diffuse = rampcolor.rgb;\n material.alpha = 0.7;\nreturn material;\n}";

	var curveRay = "\nuniform vec4 color;\nuniform float step;\nvarying float v_width;\n\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\n    czm_material material = czm_getDefaultMaterial(materialInput);\n\n    vec2 st = materialInput.st;\n    material.diffuse = color.rgb;\n    material.alpha = color.a * (st.s<step?1.0:0.0);\n    return material;\n}\n";

	function createLineAppearance(type, color, outlineColor, outlineWidth, entity) {
	  var appearance;
	  switch (type) {
	    case "multi":
	      appearance = new GeoVis.PolylineColorAppearance();
	      break;
	    case "dash":
	      var newMaterial = GeoVis.Material.fromType("PolylineDash");
	      newMaterial.uniforms.color = color;
	      entity.material = newMaterial;
	      appearance = new GeoVis.PolylineMaterialAppearance({
	        material: entity.material
	      });
	      break;
	    case "inLine":
	      entity.material = new GeoVis.Material({
	        fabric: {
	          source: inLine,
	          uniforms: {
	            color: color,
	            outlineColor: outlineColor,
	            outlineWidth: outlineWidth
	          }
	        }
	      });
	      appearance = new GeoVis.PolylineMaterialAppearance({
	        material: entity.material
	      });
	      break;
	    case "outLine":
	      entity.material = new GeoVis.Material({
	        fabric: {
	          source: outLine,
	          uniforms: {
	            color: color,
	            outlineColor: outlineColor,
	            outlineWidth: outlineWidth
	          }
	        }
	      });
	      appearance = new GeoVis.PolylineMaterialAppearance({
	        material: entity.material
	      });
	      break;
	    case "doubleLine":
	      entity.material = new GeoVis.Material({
	        fabric: {
	          type: "PolylineOutline",
	          uniforms: {
	            color: color,
	            outlineColor: outlineColor,
	            outlineWidth: outlineWidth
	          }
	        }
	      });
	      appearance = new GeoVis.PolylineMaterialAppearance({
	        material: entity.material
	      });
	      break;
	    case "default":
	      //todo  material影响的填充效果
	      newMaterial = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	      newMaterial.uniforms.color = color;
	      // entity.material = newMaterial;
	      appearance = new GeoVis.PolylineMaterialAppearance({
	        material: newMaterial
	      });
	      break;
	    case "curveRay":
	      entity.material = new GeoVis.Material({
	        fabric: {
	          source: curveRay,
	          uniforms: {
	            color: color,
	            step: 0.0
	          }
	        }
	      });
	      appearance = new GeoVis.PolylineMaterialAppearance({
	        material: entity.material
	      });
	      break;
	  }
	  return appearance;
	}

	function createFillAppearance(type, color, infillColor) {
	  var appearance;
	  switch (type) {
	    case "hStripeFill":
	      appearance = new GeoVis.MaterialAppearance({
	        material: new GeoVis.Material({
	          fabric: {
	            type: "Stripe",
	            uniforms: {
	              evenColor: color,
	              oddColor: infillColor,
	              horizontal: true
	            }
	          }
	        })
	      });
	      break;
	    case "vStripeFill":
	      appearance = new GeoVis.MaterialAppearance({
	        material: new GeoVis.Material({
	          fabric: {
	            type: "Stripe",
	            uniforms: {
	              evenColor: color,
	              oddColor: infillColor,
	              horizontal: false
	            }
	          }
	        })
	      });
	      break;
	    case "lineFadeFill":
	      appearance = new GeoVis.MaterialAppearance({
	        material: new GeoVis.Material({
	          fabric: {
	            source: linefill,
	            uniforms: {
	              color: new GeoVis.Color(0.0, 1.0, 0.0, 1.0),
	              gradients: getColorRamp([color, infillColor])
	            }
	          }
	        })
	      });
	      break;
	    case "inFadeFill":
	      appearance = new GeoVis.MaterialAppearance({
	        material: new GeoVis.Material({
	          fabric: {
	            type: "Fade",
	            uniforms: {
	              fadeInColor: color,
	              fadeOutColor: infillColor
	            }
	          }
	        })
	      });
	      break;
	    case "default":
	      var material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	      material.uniforms.color = color;
	      appearance = new GeoVis.MaterialAppearance({
	        material: material
	      });
	      break;
	  }
	  return appearance;
	}

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var arrayRemoveDuplicates = GeoVis.arrayRemoveDuplicates;
	var PolygonGeometryLibrary = GeoVis.PolygonGeometryLibrary;
	var BoundingRectangle = GeoVis.BoundingRectangle;
	var BoundingSphere = GeoVis.BoundingSphere;
	var Cartesian2 = GeoVis.Cartesian2;
	var Cartesian3 = GeoVis.Cartesian3;
	var Check = GeoVis.Check;
	var ComponentDatatype = GeoVis.ComponentDatatype;
	var CoplanarPolygonGeometryLibrary = GeoVis.CoplanarPolygonGeometryLibrary;
	var defaultValue = GeoVis.defaultValue;
	var defined = GeoVis.defined;
	var Ellipsoid = GeoVis.Ellipsoid;

	var Geometry = GeoVis.Geometry;
	var GeometryAttribute = GeoVis.GeometryAttribute;
	var GeometryAttributes = GeoVis.GeometryAttributes;
	var GeometryInstance = GeoVis.GeometryInstance;
	var GeometryPipeline = GeoVis.GeometryPipeline;
	var IndexDatatype = GeoVis.IndexDatatype;

	var CesiumMath = GeoVis.Math;
	var Matrix3 = GeoVis.Matrix3;
	var PrimitiveType = GeoVis.PrimitiveType;
	var PolygonPipeline = GeoVis.PolygonPipeline;
	var VertexFormat = GeoVis.VertexFormat;
	var Quaternion = GeoVis.Quaternion;
	var EllipsoidTangentPlane = GeoVis.EllipsoidTangentPlane;

	var scratchPosition = new Cartesian3();
	var scratchBR = new BoundingRectangle();
	var stScratch = new Cartesian2();
	var textureCoordinatesOrigin = new Cartesian2();
	var scratchNormal = new Cartesian3();
	var scratchTangent = new Cartesian3();
	var scratchBitangent = new Cartesian3();
	var centerScratch = new Cartesian3();
	var axis1Scratch = new Cartesian3();
	var axis2Scratch = new Cartesian3();
	var quaternionScratch = new Quaternion();
	var textureMatrixScratch = new Matrix3();
	var tangentRotationScratch = new Matrix3();
	var surfaceNormalScratch = new Cartesian3();

	function createGeometryFromPolygon(polygon, vertexFormat, boundingRectangle, stRotation, projectPointTo2D, normal, tangent, bitangent, outerPositions) {
	  var positions = polygon.positions;
	  var indices = PolygonPipeline.triangulate(polygon.positions2D, polygon.holes);

	  /* If polygon is completely unrenderable, just use the first three vertices */
	  if (indices.length < 3) {
	    indices = [0, 1, 2];
	  }

	  var newIndices = IndexDatatype.createTypedArray(positions.length, indices.length);
	  newIndices.set(indices);

	  var textureMatrix = textureMatrixScratch;
	  if (stRotation !== 0.0) {
	    var rotation = Quaternion.fromAxisAngle(normal, stRotation, quaternionScratch);
	    textureMatrix = Matrix3.fromQuaternion(rotation, textureMatrix);

	    if (vertexFormat.tangent || vertexFormat.bitangent) {
	      rotation = Quaternion.fromAxisAngle(normal, -stRotation, quaternionScratch);
	      var tangentRotation = Matrix3.fromQuaternion(rotation, tangentRotationScratch);

	      tangent = Cartesian3.normalize(Matrix3.multiplyByVector(tangentRotation, tangent, tangent), tangent);
	      if (vertexFormat.bitangent) {
	        bitangent = Cartesian3.normalize(Cartesian3.cross(normal, tangent, bitangent), bitangent);
	      }
	    }
	  } else {
	    textureMatrix = Matrix3.clone(Matrix3.IDENTITY, textureMatrix);
	  }

	  var stOrigin = textureCoordinatesOrigin;
	  if (vertexFormat.st) {
	    stOrigin.x = boundingRectangle.x;
	    stOrigin.y = boundingRectangle.y;
	  }

	  var length = positions.length;
	  var size = length * 3;
	  var flatPositions = new Float64Array(size);
	  var normals = vertexFormat.normal ? new Float32Array(size) : undefined;
	  var tangents = vertexFormat.tangent ? new Float32Array(size) : undefined;
	  var bitangents = vertexFormat.bitangent ? new Float32Array(size) : undefined;
	  var textureCoordinates = vertexFormat.st ? new Float32Array(length * 2) : undefined;

	  var positionIndex = 0;
	  var normalIndex = 0;
	  var bitangentIndex = 0;
	  var tangentIndex = 0;
	  var stIndex = 0;
	  var ellipsoid = Ellipsoid.WGS84;
	  for (var i = 0; i < length; i++) {
	    var position = positions[i];
	    flatPositions[positionIndex++] = position.x;
	    flatPositions[positionIndex++] = position.y;
	    flatPositions[positionIndex++] = position.z;

	    if (vertexFormat.st) {
	      var p = Matrix3.multiplyByVector(textureMatrix, position, scratchPosition);
	      p = ellipsoid.scaleToGeodeticSurface(p, p);
	      var tangentPlane = EllipsoidTangentPlane.fromPoints(outerPositions, ellipsoid);
	      var st = tangentPlane.projectPointOntoPlane(p, stScratch);
	      Cartesian2.subtract(st, stOrigin, st);

	      var stx = CesiumMath.clamp(st.x / boundingRectangle.width, 0, 1);
	      var sty = CesiumMath.clamp(st.y / boundingRectangle.height, 0, 1);
	      textureCoordinates[stIndex++] = stx;
	      textureCoordinates[stIndex++] = sty;
	    }

	    if (vertexFormat.normal) {
	      normals[normalIndex++] = normal.x;
	      normals[normalIndex++] = normal.y;
	      normals[normalIndex++] = normal.z;
	    }

	    if (vertexFormat.tangent) {
	      tangents[tangentIndex++] = tangent.x;
	      tangents[tangentIndex++] = tangent.y;
	      tangents[tangentIndex++] = tangent.z;
	    }

	    if (vertexFormat.bitangent) {
	      bitangents[bitangentIndex++] = bitangent.x;
	      bitangents[bitangentIndex++] = bitangent.y;
	      bitangents[bitangentIndex++] = bitangent.z;
	    }
	  }

	  var attributes = new GeometryAttributes();

	  if (vertexFormat.position) {
	    attributes.position = new GeometryAttribute({
	      componentDatatype: ComponentDatatype.DOUBLE,
	      componentsPerAttribute: 3,
	      values: flatPositions
	    });
	  }

	  if (vertexFormat.normal) {
	    attributes.normal = new GeometryAttribute({
	      componentDatatype: ComponentDatatype.FLOAT,
	      componentsPerAttribute: 3,
	      values: normals
	    });
	  }

	  if (vertexFormat.tangent) {
	    attributes.tangent = new GeometryAttribute({
	      componentDatatype: ComponentDatatype.FLOAT,
	      componentsPerAttribute: 3,
	      values: tangents
	    });
	  }

	  if (vertexFormat.bitangent) {
	    attributes.bitangent = new GeometryAttribute({
	      componentDatatype: ComponentDatatype.FLOAT,
	      componentsPerAttribute: 3,
	      values: bitangents
	    });
	  }

	  if (vertexFormat.st) {
	    attributes.st = new GeometryAttribute({
	      componentDatatype: ComponentDatatype.FLOAT,
	      componentsPerAttribute: 2,
	      values: textureCoordinates
	    });
	  }

	  return new Geometry({
	    attributes: attributes,
	    indices: newIndices,
	    primitiveType: PrimitiveType.TRIANGLES
	  });
	}

	var CoplanarPolygon = function (_GeoVis$CoplanarPolyg) {
	  _inherits(CoplanarPolygon, _GeoVis$CoplanarPolyg);

	  function CoplanarPolygon() {
	    _classCallCheck(this, CoplanarPolygon);

	    return _possibleConstructorReturn(this, (CoplanarPolygon.__proto__ || Object.getPrototypeOf(CoplanarPolygon)).apply(this, arguments));
	  }

	  _createClass(CoplanarPolygon, null, [{
	    key: "createGeometry",

	    // property为静态函数，继承也需要添加static
	    value: function createGeometry(polygonGeometry) {
	      var vertexFormat = polygonGeometry._vertexFormat;
	      var polygonHierarchy = polygonGeometry._polygonHierarchy;
	      var stRotation = polygonGeometry._stRotation;

	      var outerPositions = polygonHierarchy.positions;
	      outerPositions = arrayRemoveDuplicates(outerPositions, Cartesian3.equalsEpsilon, true);
	      if (outerPositions.length < 3) {
	        return;
	      }

	      var normal = scratchNormal;
	      var tangent = scratchTangent;
	      var bitangent = scratchBitangent;
	      var axis1 = axis1Scratch;
	      var axis2 = axis2Scratch;

	      var validGeometry = CoplanarPolygonGeometryLibrary.computeProjectTo2DArguments(outerPositions, centerScratch, axis1, axis2);
	      if (!validGeometry) {
	        return undefined;
	      }

	      normal = Cartesian3.cross(axis1, axis2, normal);
	      normal = Cartesian3.normalize(normal, normal);

	      if (!Cartesian3.equalsEpsilon(centerScratch, Cartesian3.ZERO, CesiumMath.EPSILON6)) {
	        var surfaceNormal = polygonGeometry._ellipsoid.geodeticSurfaceNormal(centerScratch, surfaceNormalScratch);
	        if (Cartesian3.dot(normal, surfaceNormal) < 0) {
	          normal = Cartesian3.negate(normal, normal);
	          axis1 = Cartesian3.negate(axis1, axis1);
	        }
	      }

	      var projectPoints = CoplanarPolygonGeometryLibrary.createProjectPointsTo2DFunction(centerScratch, axis1, axis2);
	      var projectPoint = CoplanarPolygonGeometryLibrary.createProjectPointTo2DFunction(centerScratch, axis1, axis2);

	      if (vertexFormat.tangent) {
	        tangent = Cartesian3.clone(axis1, tangent);
	      }
	      if (vertexFormat.bitangent) {
	        bitangent = Cartesian3.clone(axis2, bitangent);
	      }

	      var results = PolygonGeometryLibrary.polygonsFromHierarchy(polygonHierarchy, projectPoints, false);
	      var hierarchy = results.hierarchy;
	      var polygons = results.polygons;

	      if (hierarchy.length === 0) {
	        return;
	      }
	      outerPositions = hierarchy[0].outerRing;

	      var boundingSphere = BoundingSphere.fromPoints(outerPositions);
	      var boundingRectangle = PolygonGeometryLibrary.computeBoundingRectangle(normal, projectPoint, outerPositions, stRotation, scratchBR);

	      var geometries = [];
	      for (var i = 0; i < polygons.length; i++) {
	        var geometryInstance = new GeometryInstance({
	          geometry: createGeometryFromPolygon(polygons[i], vertexFormat, boundingRectangle, stRotation, projectPoint, normal, tangent, bitangent, outerPositions)
	        });

	        geometries.push(geometryInstance);
	      }

	      var geometry = GeometryPipeline.combineInstances(geometries)[0];
	      geometry.attributes.position.values = new Float64Array(geometry.attributes.position.values);
	      geometry.indices = IndexDatatype.createTypedArray(geometry.attributes.position.values.length / 3, geometry.indices);

	      var attributes = geometry.attributes;
	      if (!vertexFormat.position) {
	        delete attributes.position;
	      }
	      return new Geometry({
	        attributes: attributes,
	        indices: geometry.indices,
	        primitiveType: geometry.primitiveType,
	        boundingSphere: boundingSphere
	      });
	    }
	  }]);

	  return CoplanarPolygon;
	}(GeoVis.CoplanarPolygonGeometry);

	exports.default = CoplanarPolygon;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.addTranMarker = addTranMarker;
	exports.updateMarkers = updateMarkers;
	exports.addHighMarker = addHighMarker;
	exports.setHighlighted = setHighlighted;
	exports.getCenter = getCenter;
	exports.customMove = customMove;
	exports.getTerrianCarto = getTerrianCarto;
	exports.setTerrianCarto = setTerrianCarto;
	exports.eleHeightChange = eleHeightChange;

	var _MarkerGroup = __webpack_require__(24);

	var _MarkerGroup2 = _interopRequireDefault(_MarkerGroup);

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function addTranMarker(drawHelper, entity) {
	  var marker = new _MarkerGroup2.default(drawHelper, _config.defaultMarker);
	  drawHelper.removeObj.billBoard.push(marker);
	  // var lonlat = getPos(entity);

	  var handleMarkerChanges = {
	    dragHandlers: {
	      onDrag: function onDrag(index, position, delta) {
	        var ray = earth.scene.camera.getPickRay(new GeoVis.Cartesian2(delta[0], delta[1]));
	        var cartesian = earth.scene.globe.pick(ray, earth.scene);
	        var controlPoints = customMove(cartesian, getPos(entity));
	        editPos(entity, controlPoints);
	        entity._createPrimitive = true;
	        updateMarkers(entity);
	        drawHelper.fire("changed", {
	          entity: entity
	        });
	      },
	      onDragEnd: function onDragEnd(index, position) {
	        drawHelper.fire("edited", {
	          entity: entity
	        });
	      }
	    },
	    tooltip: function tooltip() {
	      return "拖动进行平移";
	    }
	  };
	  var controlPoint = getPos(entity);
	  var pos1 = (0, _util.positionToCartesian3)([getCenter(controlPoint)]);
	  marker.addMarkers(pos1, handleMarkerChanges);
	  return marker;
	}

	function updateMarkers(entity) {
	  var lonlat = getPos(entity);
	  if (entity._marker) {
	    entity._marker.updateMarkersPositions((0, _util.positionToCartesian3)([getCenter(lonlat)]));
	  }
	  if (entity._highMarker) {
	    entity._highMarker.updateMarkersPositions((0, _util.positionToCartesian3)([getCenter(lonlat)]));
	  }
	  if (entity.elevationMode) {
	    setElevationHeight(entity);
	  }
	}

	function addHighMarker(drawHelper, entity) {
	  var highMarker = new _MarkerGroup2.default(drawHelper, _config.heightMarker);
	  drawHelper.removeObj.billBoard.push(highMarker);

	  var handleHeightMarkerChanges = {
	    dragHandlers: {
	      onDrag: function onDrag(index, position) {
	        var controlPoints = getPos(entity);
	        var carto = GeoVis.Cartographic.fromCartesian(position);
	        controlPoints.map(function (point) {
	          point[2] = carto.height;
	        });
	        editPos(entity, controlPoints);
	        updateMarkers(entity);
	        // entity.height=carto.height; todo 需要根据类型进行判断
	        entity._createPrimitive = true;
	        drawHelper.fire("changed", {
	          entity: entity
	        });
	        // marker.updateMarkersPositions(position);
	      },
	      onDragEnd: function onDragEnd(index, position) {
	        drawHelper.fire("edited", {
	          entity: entity
	        });
	      }
	    },
	    tooltip: function tooltip() {
	      return "拖动进行拔高";
	    }
	  };
	  var controlPoint = getPos(entity);
	  var pos1 = (0, _util.positionToCartesian3)([getCenter(controlPoint)]);
	  highMarker.addMarkers(pos1, handleHeightMarkerChanges, true);
	  return highMarker;
	}
	/**
	 * 设置标绘对象的高亮
	 * @param {*} entity 标绘对象
	 * @param {Boolean} highlighted 是否是高亮状态
	 */
	function setHighlighted(entity, highlighted) {
	  if (entity._highlighted && entity._highlighted === highlighted) {
	    return;
	  }
	  if (entity._editMode === true) {
	    return;
	  }
	  entity._highlighted = highlighted;
	  if (entity.outlineColor && !entity.outlineColor.equals(entity.highLightColor) && !entity.outlineColor.equals(entity.highLightColor.brighten(0.5, new GeoVis.Color()))) {
	    entity.highLightColor = entity.outlineColor.clone();
	  }
	  if (entity.outlineColor) {
	    if (highlighted) {
	      entity.outlineColor = entity.highLightColor.brighten(0.5, new GeoVis.Color());
	    } else {
	      entity.outlineColor = entity.highLightColor;
	    }
	  }
	}

	/**
	 * 计算多边形坐标的中点
	 * @param {LonLatArray} custom
	 */
	function getCenter(custom) {
	  var points = [];
	  var height = 0;
	  custom.map(function (point) {
	    points.push(turf.point(point));
	    height += point[2];
	  });
	  height = height / custom.length;
	  var features = turf.featureCollection(points);
	  var center = turf.center(features).geometry.coordinates;
	  center.push(height);
	  return center;
	}

	/**
	 * 计算多边形坐标的平移
	 * @param {LonLatArray} custom
	 */
	function customMove(position, custom) {
	  var center = getCenter(custom);
	  var carto = GeoVis.Cartographic.fromCartesian(position);
	  var lngDelta = GeoVis.Math.toDegrees(carto.longitude) - center[0];
	  var latDelta = GeoVis.Math.toDegrees(carto.latitude) - center[1];
	  var customEnd = [];
	  custom.map(function (point) {
	    var lon = point[0] + lngDelta;
	    var lat = point[1] + latDelta;
	    var lonlat = [lon, lat, center[2]];
	    customEnd.push(lonlat);
	  });
	  return customEnd;
	}

	/**
	 * 用于获取当前对象的坐标编辑
	 * @param {Primitive} entity
	 */
	function getPos(entity) {
	  var lonlat = [];
	  switch (entity.type) {
	    case _Types2.default.LABEL_MARKER:
	    case _Types2.default.FLAG_MARKER:
	    case _Types2.default.ICON:
	      lonlat.push((0, _util.cartesianToLonlat)(entity.position));
	      break;
	    case _Types2.default.CIRCLE:
	      lonlat.push((0, _util.cartesianToLonlat)(entity.center));
	      break;
	    case _Types2.default.SPACE_POLYLINE:
	    case _Types2.default.PROJ_POLYLINE:
	    case _Types2.default.GROUND_POLYLINE:
	    case _Types2.default.SPACE_POLYGON:
	    case _Types2.default.CLASSIFY_POLYGON:
	    case _Types2.default.PROJ_POLYGON:
	    case _Types2.default.GROUND_POLYGON:
	    case _Types2.default.RECTANGLE:
	      entity.positions.map(function (pos) {
	        lonlat.push((0, _util.cartesianToLonlat)(pos));
	      });
	      break;
	  }
	  if (entity.custom && entity.type.length > 1 && entity.type.search("GV") > -1) {
	    lonlat = entity.custom;
	  }
	  return lonlat;
	}

	/**
	 * 用于修改当前对象的坐标类
	 * @param {Primitive} entity
	 */
	function editPos(entity, newLonlats) {
	  switch (entity.type) {
	    case _Types2.default.LABEL_MARKER:
	    case _Types2.default.FLAG_MARKER:
	    case _Types2.default.ICON:
	      entity.position = (0, _util.positionToCartesian3)(newLonlats)[0];
	      if (entity._point) entity._point.updatePointsPositions((0, _util.positionToCartesian3)(newLonlats));
	      if (entity.label) {
	        entity.label.position = entity.position;
	      }
	      break;
	    case _Types2.default.CIRCLE:
	      entity.center = (0, _util.positionToCartesian3)(newLonlats)[0];
	      if (entity._points) entity._points.updatePointsPositions(getCircleCartesianCoordinates(entity, GeoVis.Math.PI_OVER_TWO));
	      break;
	    case _Types2.default.SPACE_POLYLINE:
	    case _Types2.default.PROJ_POLYLINE:
	    case _Types2.default.GROUND_POLYLINE:
	    case _Types2.default.SPACE_POLYGON:
	    case _Types2.default.CLASSIFY_POLYGON:
	    case _Types2.default.PROJ_POLYGON:
	    case _Types2.default.GROUND_POLYGON:
	    case _Types2.default.RECTANGLE:
	      entity.positions = (0, _util.positionToCartesian3)(newLonlats);
	      if (entity._points) entity._points.updatePointsPositions((0, _util.positionToCartesian3)(newLonlats));
	      if (entity._editPoints) {
	        var editPositions = [];
	        for (var i = 0; i < 2; i++) {
	          editPositions[i] = changeXYPostions(newLonlats[i], newLonlats[Math.abs(i - 1)]);
	        }
	        entity._editPoints.updatePointsPositions(editPositions);
	      }

	      break;
	  }
	  if (entity.custom && entity.type.length > 1 && entity.type.search("GV") > -1) {
	    entity.custom = newLonlats;
	    if (entity._points) entity._points.updatePointsPositions((0, _util.positionToCartesian3)(newLonlats));
	  }
	}

	function changeXYPostions(point1, point2) {
	  var newPoint = GeoVis.Cartesian3.fromDegrees(point1[0], point2[1], point1[2]);
	  return newPoint;
	}

	function getCircleCartesianCoordinates(circle, granularity) {
	  var geometry = GeoVis.CircleOutlineGeometry.createGeometry(new GeoVis.CircleOutlineGeometry({
	    ellipsoid: GeoVis.Ellipsoid.WGS84,
	    center: circle.center,
	    radius: circle.radius,
	    granularity: granularity
	  }));
	  var value = void 0;
	  var values = [];
	  for (var count = 0; count < geometry.attributes.position.values.length; count += 3) {
	    value = geometry.attributes.position.values;
	    values.push(new GeoVis.Cartesian3(value[count], value[count + 1], value[count + 2]));
	  }
	  return values;
	}

	function getTerrianCarto(drawHelper) {
	  var results = [];
	  drawHelper.primitives._primitives.map(function (entity) {
	    if (!entity.type) return;
	    results.push(getCartographic(entity));
	  });
	  drawHelper.features.map.forEach(function (entity) {
	    if (!entity.type) return;
	    results.push(getCartographic(entity));
	  });
	  var Cartographics = [];
	  if (results.length > 0) {
	    results.map(function (res) {
	      res.map(function (carto) {
	        carto.height = 0;
	        Cartographics.push(carto.clone());
	      });
	    });
	  }

	  return Cartographics;
	}

	function setTerrianCarto(drawHelper, samples) {
	  var results = [];
	  drawHelper.primitives._primitives.map(function (entity) {
	    if (!entity.type) return;
	    results.push(entity);
	  });
	  drawHelper.features.map.forEach(function (entity) {
	    if (!entity.type) return;
	    results.push(entity);
	  });

	  var j = 0;
	  var num = 0;
	  for (var i = 0; i < results.length; i++) {
	    var Cartographics = [];
	    num += getCartographic(results[i]).length;
	    for (; j < num; j++) {
	      Cartographics.push(samples[j]);
	    }
	    if (results[i].elevationMode) {
	      if (results[i].elevationMode === "clampToGround") {
	        setCartographic(results[i], Cartographics);
	      }
	      setElevationHeight(results[i]);
	    }
	    drawHelper.fire("changed", {
	      entity: results[i]
	    });
	  }
	  return results;
	}

	function getCartographic(entity) {
	  switch (entity.type) {
	    case _Types2.default.ICON:
	      return [entity.cartographic];
	  }
	  // 线标
	  if (entity.custom && entity.type.length > 1 && entity.type.search("GV") > -1) {
	    return entity.cartographic;
	  }
	}

	function setCartographic(entity, carto) {
	  switch (entity.type) {
	    case _Types2.default.ICON:
	      entity.cartographic = carto[0];
	      break;
	  }
	  // 线标
	  if (entity.custom && entity.type.length > 1 && entity.type.search("GV") > -1) {
	    entity.cartographic = carto;
	  }
	}

	/**
	 * 获取不同类型的地形拾取
	 * @type {Vector3}
	 * @name elevationMode
	 * @memberof Icon
	 */

	function eleHeightChange(entity, val) {
	  var results = getCartographic(entity);
	  var cartographics = [];
	  var heights = [];
	  results.map(function (carto) {
	    var res = carto.clone();
	    res.height = 0;
	    cartographics.push(res);
	  });

	  var terrainProvider = earth.scene.terrainProvider;
	  if (entity.elevationMode === "clampToGround") {
	    if (terrainProvider instanceof GeoVis.GeoserverTerrainProvider) {
	      var promise = GeoVis.sampleTerrainMostDetailed(terrainProvider, cartographics);
	      GeoVis.when(promise, function (samples) {
	        setCartographic(entity, samples);
	        samples.map(function (res) {
	          heights.push(res.height);
	        });
	        entity._elevationHeight = heights;
	        entity.drawHelper.fire("changed", {
	          entity: entity
	        });
	      });
	    } else if (terrainProvider instanceof GeoVis.EllipsoidTerrainProvider) {
	      setCartographic(entity, cartographics);
	      cartographics.map(function (res) {
	        heights.push(res.height);
	      });
	      entity._elevationHeight = heights;
	      entity.drawHelper.fire("changed", {
	        entity: entity
	      });
	    }
	  } else if (entity.elevationMode === "relative") {
	    if (terrainProvider instanceof GeoVis.GeoserverTerrainProvider) {
	      promise = GeoVis.sampleTerrainMostDetailed(terrainProvider, cartographics);
	      GeoVis.when(promise, function (samples) {
	        if (val && val.length && val.length > 0) {
	          heights = val;
	          var cartos = [];
	          samples.map(function (carto, index) {
	            var res = carto.clone();
	            res.height += val[index];
	            cartos.push(res);
	          });
	          setCartographic(entity, cartos);
	        } else {
	          samples.map(function (res, index) {
	            heights.push(results[index].height - res.height);
	          });
	          entity._elevationHeight = heights;
	          entity.drawHelper.fire("changed", {
	            entity: entity
	          });
	        }
	      });
	    } else if (terrainProvider instanceof GeoVis.EllipsoidTerrainProvider) {
	      if (val && val.length && val.length > 0) {
	        heights = val;
	        var cartos = [];
	        cartographics.map(function (carto, index) {
	          var res = carto.clone();
	          res.height += val[index];
	          cartos.push(res);
	        });
	        setCartographic(entity, cartos);
	      } else {
	        cartographics.map(function (res, index) {
	          heights.push(results[index].height - res.height);
	        });
	        entity._elevationHeight = heights;
	        entity.drawHelper.fire("changed", {
	          entity: entity
	        });
	      }
	    }
	  } else if (entity.elevationMode === "extruded") {
	    if (val && val.length && val.length > 0) {
	      var cartos = [];
	      results.map(function (carto, index) {
	        var res = carto.clone();
	        res.height = val[index];
	        cartos.push(res);
	      });
	      setCartographic(entity, cartos);
	      heights = val;
	    } else {
	      results.map(function (carto) {
	        var res = carto.clone();
	        heights.push(res.height);
	      });
	      entity._elevationHeight = heights;
	      entity.drawHelper.fire("changed", {
	        entity: entity
	      });
	    }
	  } else {
	    if (val && val.length && val.length > 0) {
	      var cartos = [];
	      results.map(function (carto, index) {
	        var res = carto.clone();
	        res.height = val[index];
	        cartos.push(res);
	      });
	      setCartographic(entity, cartos);
	      heights = val;
	    } else {
	      results.map(function (carto) {
	        var res = carto.clone();
	        heights.push(res.height);
	      });
	      entity._elevationHeight = heights;
	      entity.drawHelper.fire("changed", {
	        entity: entity
	      });
	    }
	  }
	  if (entity.elevationMode === "extruded") {
	    entity.addWall();
	  } else {
	    entity.walls && entity.removeWall();
	  }
	  return heights;
	}

	function setElevationHeight(entity) {
	  var results = getCartographic(entity);

	  var heights = [];

	  if (entity.elevationMode === "clampToGround" || entity.elevationMode === "absolute") {
	    results.map(function (carto) {
	      var res = carto.clone();
	      heights.push(res.height);
	    });
	    entity._elevationHeight = heights;
	  } else if (entity.elevationMode === "relative") {
	    var cartographics = [];
	    results.map(function (carto) {
	      var res = carto.clone();
	      res.height = 0;
	      cartographics.push(res);
	    });
	    var terrainProvider = earth.scene.terrainProvider;
	    if (terrainProvider instanceof GeoVis.GeoserverTerrainProvider) {
	      var promise = GeoVis.sampleTerrainMostDetailed(terrainProvider, cartographics);
	      GeoVis.when(promise, function (samples) {
	        samples.map(function (res, index) {
	          heights.push(results[index].height - res.height);
	        });
	        entity._elevationHeight = heights;
	        entity.drawHelper.fire("changed", {
	          entity: entity
	        });
	      });
	    } else if (terrainProvider instanceof GeoVis.EllipsoidTerrainProvider) {
	      cartographics.map(function (res, index) {
	        heights.push(results[index].height - res.height);
	      });
	      entity._elevationHeight = heights;
	    }
	  }
	  return heights;
	}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @ts-check


	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ellipsoid = GeoVis.Ellipsoid.WGS84;

	var MarkerGroup = function () {
	  function MarkerGroup(drawHelper, options) {
	    _classCallCheck(this, MarkerGroup);

	    this._drawHelper = drawHelper;
	    this._scene = drawHelper._scene;

	    this._options = (0, _util.copyOptions)(options, _config.defaultMarker);

	    // 创建billboardCollection来保存markers
	    var m = new GeoVis.BillboardCollection({
	      scene: drawHelper._scene
	    });
	    drawHelper._tempPrimitives.add(m);
	    this.markers = m;
	    this._orderedMarkers = [];
	  }

	  _createClass(MarkerGroup, [{
	    key: "_markers",
	    get: function get() {
	      return this.markers;
	    },
	    set: function set(val) {
	      this.markers = val;
	    }
	  }]);

	  return MarkerGroup;
	}();

	MarkerGroup.prototype.createMarker = function (position, callbacks) {
	  var vertical = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	  var marker = this._markers.add({
	    show: true,
	    position: position,
	    pixelOffset: new GeoVis.Cartesian2(this._options.shiftX, this._options.shiftY),
	    eyeOffset: new GeoVis.Cartesian3(0.0, 0.0, 0.0),
	    horizontalOrigin: GeoVis.HorizontalOrigin.CENTER,
	    verticalOrigin: GeoVis.VerticalOrigin.CENTER,
	    scale: this._options.scale || 1.0,
	    image: this._options.iconUrl,
	    color: new GeoVis.Color(1.0, 1.0, 1.0, 1.0)
	  });
	  marker.vertical = vertical;

	  // if editable
	  if (callbacks) {
	    var _self = this;
	    var screenSpaceCameraController = this._scene.screenSpaceCameraController;

	    if (callbacks.dragHandlers) {
	      _self = this;
	      (0, _util.setListener)(marker, "leftDown", function (position) {
	        enableRotation(false);
	        function onDrag(position, delta) {
	          try {
	            if (delta == undefined) marker.position = position;
	            // find index
	            for (var i = 0, I = _self._orderedMarkers.length; i < I && _self._orderedMarkers[i] !== marker; ++i) {}
	            callbacks.dragHandlers.onDrag && callbacks.dragHandlers.onDrag(getIndex(), position, delta);
	          } catch (e) {
	            console.log(e);
	          }
	        }
	        function onDragEnd(position) {
	          // debugger
	          handler.destroy();
	          enableRotation(true);
	          callbacks.dragHandlers.onDragEnd && callbacks.dragHandlers.onDragEnd(getIndex(), position);
	        }
	        var handler = new GeoVis.ScreenSpaceEventHandler(_self._scene.canvas);
	        handler._buttonDown[0] = true; // pointer hack
	        var scratchBoundingSphere = new GeoVis.BoundingSphere();
	        var lastPoint = position;
	        var controlXY;
	        var carto = GeoVis.Cartographic.fromCartesian(marker.position);
	        carto.height = 0;
	        controlXY = earth.scene.cartesianToCanvasCoordinates(GeoVis.Cartographic.toCartesian(carto));

	        handler.setInputAction(function (movement) {
	          var dy, position, tangentPlane, metersPerPixel, zOffset, newPosition;
	          if (marker.vertical) {
	            dy = movement.endPosition.y - movement.startPosition.y;
	            if (movement.startPosition.x === 0 && movement.startPosition.y === 0) {
	              return;
	            }
	            position = marker.position;
	            tangentPlane = new GeoVis.EllipsoidTangentPlane(position);
	            scratchBoundingSphere.center = position;
	            scratchBoundingSphere.radius = 1;
	            metersPerPixel = _self._scene.frameState.camera.getPixelSize(scratchBoundingSphere, _self._scene.frameState.context.drawingBufferWidth, _self._scene.frameState.context.drawingBufferHeight);
	            zOffset = new GeoVis.Cartesian3();
	            GeoVis.Cartesian3.multiplyByScalar(tangentPlane.zAxis, -dy * metersPerPixel, zOffset);
	            newPosition = GeoVis.Cartesian3.clone(position);
	            GeoVis.Cartesian3.add(position, zOffset, newPosition);
	            marker.position = newPosition;
	            if (newPosition) {
	              onDrag(newPosition);
	            }
	          } else {

	            var delta = [controlXY.x + movement.endPosition.x - lastPoint.x, controlXY.y + movement.endPosition.y - lastPoint.y];
	            var ray = _self._scene.camera.getPickRay(movement.endPosition);
	            var cartesian = earth.globe.pick(ray, _self._scene);
	            if (cartesian) {
	              onDrag(cartesian, delta);
	            } else {
	              onDragEnd(cartesian);
	            }
	          }
	        }, GeoVis.ScreenSpaceEventType.MOUSE_MOVE);

	        handler.setInputAction(function (movement) {
	          onDragEnd(_self._scene.camera.pickEllipsoid(movement.position, ellipsoid));
	        }, GeoVis.ScreenSpaceEventType.LEFT_UP);

	        callbacks.dragHandlers.onDragStart && callbacks.dragHandlers.onDragStart(getIndex(), _self._scene.camera.pickEllipsoid(position, ellipsoid));
	      });
	    }
	    if (callbacks.onDoubleClick) {
	      (0, _util.setListener)(marker, "leftDoubleClick", function () {
	        callbacks.onDoubleClick(getIndex());
	      });
	    }
	    if (callbacks.onClick) {
	      (0, _util.setListener)(marker, "leftClick", function () {
	        callbacks.onClick(getIndex());
	      });
	    }
	    if (callbacks.tooltip) {
	      (0, _util.setListener)(marker, "mouseMove", function (position) {
	        _self._drawHelper._tooltip.showAt(position, callbacks.tooltip());
	      });
	      (0, _util.setListener)(marker, "mouseOut", function () {
	        _self._drawHelper._tooltip.setVisible(false);
	        document.body.style.cursor = "default";
	      });
	    }
	  }
	  function enableRotation(enable) {
	    _self._drawHelper.dragging = !enable;
	    screenSpaceCameraController.enableRotate = enable;
	    screenSpaceCameraController.enableTranslate = enable;
	  }
	  function getIndex() {
	    for (var i = 0, I = _self._orderedMarkers.length; i < I && _self._orderedMarkers[i] !== marker; ++i) {}
	    return i;
	  }
	  return marker;
	};

	MarkerGroup.prototype.insertMarker = function (index, position, callbacks) {
	  this._orderedMarkers.splice(index, 0, this.createMarker(position, callbacks));
	};

	MarkerGroup.prototype.addMarker = function (position, callbacks, vertical) {
	  this._orderedMarkers.push(this.createMarker(position, callbacks, vertical));
	};

	MarkerGroup.prototype.removeLastMarker = function () {
	  this._markers.remove(this._orderedMarkers.pop());
	};

	MarkerGroup.prototype.addMarkers = function (positions, callbacks, vertical) {
	  var index = 0;
	  for (; index < positions.length; index++) {
	    // eslint-disable-next-line prettier/prettier
	    this.addMarker(positions[index], callbacks, vertical);
	  }
	};

	MarkerGroup.prototype.updateMarkersPositions = function (positions) {
	  var index = 0;
	  for (; index < positions.length; index++) {
	    this.getMarker(index).position = positions[index];
	  }
	};
	MarkerGroup.prototype.updateMarkerPosition = function (position) {
	  this.getMarker(0).position = position;
	};

	MarkerGroup.prototype.countMarkers = function () {
	  return this._orderedMarkers.length;
	};

	MarkerGroup.prototype.getMarker = function (index) {
	  return this._orderedMarkers[index];
	};

	MarkerGroup.prototype.removeMarker = function (index) {
	  this._markers.remove(this.getMarker(index));
	  this._orderedMarkers.splice(index, 1);
	};

	MarkerGroup.prototype.remove = function () {
	  this._markers.removeAll();
	  this._orderedMarkers = [];
	};

	MarkerGroup.prototype.setOnTop = function () {
	  this._drawHelper._tempPrimitives.raiseToTop(this._markers);
	};

	exports.default = MarkerGroup;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ChangeablePrimitive2 = __webpack_require__(19);

	var _ChangeablePrimitive3 = _interopRequireDefault(_ChangeablePrimitive2);

	var _util = __webpack_require__(5);

	var _Util = __webpack_require__(23);

	var _config = __webpack_require__(6);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _Wall = __webpack_require__(26);

	var _Wall2 = _interopRequireDefault(_Wall);

	var _geometryHelper = __webpack_require__(20);

	var _Animator = __webpack_require__(27);

	var _Animator2 = _interopRequireDefault(_Animator);

	var _websocket = __webpack_require__(29);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PlotShape = function (_ChangeablePrimitive) {
	  _inherits(PlotShape, _ChangeablePrimitive);

	  function PlotShape(options) {
	    _classCallCheck(this, PlotShape);

	    options = (0, _util.copyOptions)(options, _config.defaultSurfaceOptions);

	    var _this = _possibleConstructorReturn(this, (PlotShape.__proto__ || Object.getPrototypeOf(PlotShape)).call(this, options));

	    _initialiseProps.call(_this);

	    _this.type = options.type;
	    _this.name = options.name || null;
	    _this.drawHelper = options.drawHelper;

	    _this.material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	    _this.material.uniforms.color = options.fillColor || GeoVis.Color.fromCssString("#009688").withAlpha(0.3);
	    _this.appearance = new GeoVis.MaterialAppearance({
	      flat: true,
	      material: _this.material
	    });

	    _this.distanceDisplayCondition = options.distanceDisplayCondition;
	    _this._outlineWidth = options.outlineWidth || 2;
	    _this.highLightColor = GeoVis.defaultValue(options.outlineColor, GeoVis.Color.RED);

	    _this._zoomScale = GeoVis.defaultValue(options.zoomScale, 1);
	    _this._rotation = GeoVis.defaultValue(options.rotation, 0);

	    _this._lineType = GeoVis.defaultValue(options.lineType, "default");
	    _this._outlineColor = options.outlineColor || GeoVis.Color.RED;

	    _this._inlineColor = options.inlineColor || GeoVis.Color.RED;
	    _this._inlineWidth = options.inlineWidth || _this.outlineWidth / 2;

	    _this._fillType = GeoVis.defaultValue(options.fillType, "default");
	    _this._infillColor = options.infillColor || GeoVis.Color.RED;

	    _this._elevationMode = options.elevationMode || "absolute";
	    _this._elevationHeight = options.elevationHeight || undefined;
	    return _this;
	  }

	  /**
	   * 获取PlotShape的随地形覆盖
	   * @type {Boolean}
	   * @name clampToGround
	   * @memberof PlotShape
	   */


	  _createClass(PlotShape, [{
	    key: "updateConPoints",
	    value: function updateConPoints() {
	      if (this._points) {
	        this._points.updatePointsPositions((0, _util.positionToCartesian3)(this.custom));
	        (0, _Util.updateMarkers)(this);
	      }
	    }
	  }, {
	    key: "clampToGround",
	    get: function get() {
	      return this._clampToGround;
	    },
	    set: function set(val) {
	      this._clampToGround = val;
	      this._createPrimitive = true;
	    }

	    /**
	     * 获取PlotShape的经纬度
	     * @type {Vector3}
	     * @name elevationMode
	     * @memberof PlotShape
	     */

	  }, {
	    key: "elevationMode",
	    get: function get() {
	      return this._elevationMode;
	    },
	    set: function set(val) {
	      this._elevationMode = val;
	      if (!this.drawHelper) return;
	      (0, _Util.eleHeightChange)(this);

	      // 关闭编辑状态
	      this.drawHelper._editor._plotEditor.setEditable(this, false);
	      this.drawHelper._editor._plotEditor.setHighlighted(this, false);
	    }

	    /**
	     * 获取PlotShape的经纬度
	     * @type {Vector3}
	     * @name elevationHeight
	     * @memberof PlotShape
	     */

	  }, {
	    key: "elevationHeight",
	    get: function get() {
	      var _this2 = this;

	      if (this._elevationHeight === undefined || this._elevationHeight.length !== this.custom.length) {
	        this._elevationHeight = [];
	        this.custom.map(function (carto) {
	          _this2._elevationHeight.push(carto[2]);
	        });
	      }
	      return this._elevationHeight;
	    },
	    set: function set(val) {
	      this._elevationHeight = (0, _Util.eleHeightChange)(this, val);
	      console.log(val);
	    }
	    /**
	     * 获取PlotShape的线条样式
	     * @type {Boolean}
	     * @name clampToGround
	     * @memberof PlotShape
	     */

	  }, {
	    key: "lineType",
	    get: function get() {
	      return this._lineType;
	    },
	    set: function set(val) {
	      this._lineType = val;
	      this._createPrimitive = true;
	    }

	    /**
	     * 获取PlotShape的填充样式
	     * @type {Boolean}
	     * @name clampToGround
	     * @memberof PlotShape
	     */

	  }, {
	    key: "fillType",
	    get: function get() {
	      return this._fillType;
	    },
	    set: function set(val) {
	      this._fillType = val;
	      this._createPrimitive = true;
	    }
	    /**
	     * 获取PlotShape的控制点
	     * @type {Vector3}
	     * @name custom
	     * @memberof PlotShape
	     */

	  }, {
	    key: "custom",
	    get: function get() {
	      return this._custom;
	    },
	    set: function set(value) {
	      this._custom = value;
	      if (this._editMode) {
	        (0, _websocket.getGeomtry)(value, this.type, this);
	        this.updateWall && this.updateWall();
	      }
	    }
	  }, {
	    key: "cartographic",
	    get: function get() {
	      var result = [];
	      this.custom.map(function (cus) {
	        var cato = GeoVis.Cartographic.fromDegrees(cus[0], cus[1], cus[2]);
	        result.push(cato);
	      });
	      return result;
	    },
	    set: function set(val) {
	      var newCustom = [];
	      val.map(function (carto) {
	        var lon = GeoVis.Math.toDegrees(carto.longitude);
	        var lat = GeoVis.Math.toDegrees(carto.latitude);
	        newCustom.push([lon, lat, carto.height]);
	      });
	      this.custom = newCustom;
	      this.updateConPoints();
	    }
	  }, {
	    key: "zoomScale",
	    get: function get() {
	      return this._zoomScale;
	    },
	    set: function set(val) {
	      this._zoomScale = val;
	      this.custom = (0, _util.updateZoom)(this._zoomScale, this);
	    }
	  }, {
	    key: "rotation",
	    get: function get() {
	      return this._zoomScale;
	    },
	    set: function set(val) {
	      this._rotation = val;
	      this.custom = (0, _util.updateRotation)(this._rotation, this);
	    }

	    /**
	     * 获取PlotShape的点标颜色
	     * @type {Color}
	     * @name iconColor
	     * @memberof PlotShape
	     */

	  }, {
	    key: "iconColor",
	    get: function get() {
	      this.billBoards && this.billBoards.length !== 0 && (this._iconColor = this.billBoards[0].color);
	      return this._iconColor;
	    },
	    set: function set(color) {
	      this._iconColor = color;
	      this.billBoards && this.billBoards.map(function (icon) {
	        return icon.color = color;
	      });
	    }
	    /**
	     * 获取PlotShape的显隐
	     * @type {Boolean}
	     * @name visible
	     * @memberof PlotShape
	     */

	  }, {
	    key: "visible",
	    get: function get() {
	      this._visible = this.show;
	      return this._visible;
	    },
	    set: function set(value) {
	      this._visible = value;
	      this.show = value;
	      this.updateWall && this.updateWall();
	      this.billBoards && this.billBoards.map(function (icon) {
	        return icon.show = value;
	      });
	    }
	    /**
	     * 获取PlotShape的线条颜色
	     * @type {Color}
	     * @name outlineColor
	     * @memberof PlotShape
	     */

	  }, {
	    key: "outlineColor",
	    get: function get() {
	      // this._outlineColor = this.plotGeometrys
	      //   ? this.plotGeometrys[0]
	      //     ? this.plotGeometrys[0].outlineColor
	      //     : this.strokeColor
	      //   : this.strokeColor;
	      return this._outlineColor;
	    },
	    set: function set(val) {
	      if (this.walls && this.walls.length > 0) {
	        this.walls.map(function (wall) {
	          wall.color = val.withAlpha(0.5);
	        });
	      }
	      this._outlineColor = val;
	      if (this.plotGeometrys) {
	        this.plotGeometrys.map(function (plotGeom) {
	          return plotGeom.outlineColor = val;
	        });
	      }
	      this._createPrimitive = true;
	    }
	    /**
	     * 获取PlotShape的线条宽度
	     * @type {Number}
	     * @name outlineWidth
	     * @memberof PlotShape
	     */

	  }, {
	    key: "outlineWidth",
	    get: function get() {
	      return this._outlineWidth;
	    },
	    set: function set(val) {
	      this._outlineWidth = val;

	      this._createPrimitive = true;
	    }
	  }, {
	    key: "inlineWidth",
	    get: function get() {
	      return this._inlineWidth;
	    },
	    set: function set(val) {
	      this._inlineWidth = val;
	      if (val > this.outlineWidth) {
	        this.outlineWidth += val;
	      }
	      this._createPrimitive = true;
	    }
	  }, {
	    key: "inlineColor",
	    get: function get() {
	      return this._inlineColor;
	    },
	    set: function set(val) {
	      this._inlineColor = val;
	      this._createPrimitive = true;
	    }
	  }, {
	    key: "infillColor",
	    get: function get() {
	      return this._infillColor;
	    },
	    set: function set(val) {
	      this._infillColor = val;
	      this._createPrimitive = true;
	    }
	    /**
	     * 获取PlotShape的填充
	     * @type {Boolean}
	     * @name fill
	     * @memberof PlotShape
	     */

	  }, {
	    key: "fill",
	    get: function get() {
	      // if (this.plotGeometrys && this.plotGeometrys[0]) {
	      //   this._isFill = this.plotGeometrys[0].isFill;
	      // }
	      return this._isFill;
	    },
	    set: function set(val) {
	      this._isFill = val;
	      // this.plotGeometrys.map(plotGeom => (plotGeom.isFill = val));
	      this._createPrimitive = true;
	    }
	    /**
	     * 获取PlotShape是否可填充
	     * @type {Boolean}
	     * @name fill
	     * @memberof PlotShape
	     * @readonly
	     */

	  }, {
	    key: "canFilled",
	    get: function get() {
	      if (this.plotGeometrys && this.plotGeometrys[0] && this.plotGeometrys[0].canFilled) {
	        this._canFilled = this.plotGeometrys[0].canFilled;
	      } else {
	        this._canFilled = false;
	      }

	      return this._canFilled;
	    }
	    /**
	     *   用于添加动画属性
	     *  @param {labelOptions} options
	     */

	  }]);

	  return PlotShape;
	}(_ChangeablePrimitive3.default);

	var _initialiseProps = function _initialiseProps() {
	  var _this3 = this;

	  this.addAnimate = function (options) {
	    _this3.animator = new _Animator2.default(_this3, _extends({}, options));
	    _this3.animator.addTo(_this3.drawHelper.animators);
	  };

	  this.removeAnimate = function () {
	    _this3.animator.removeFrom(_this3.drawHelper.animators);
	    _this3.animator = undefined;
	  };

	  this.addPoly = function () {
	    if (_this3.plotGeometrys && _this3.plotGeometrys[0]) {
	      _this3.plotGeometrys.map(function (plotGeom) {
	        (0, _util.getLinPos)(_this3.custom, plotGeom.positions);
	      });
	    }
	  };

	  this.addWall = function () {
	    if (_this3.plotGeometrys && _this3.plotGeometrys[0] && _this3.plotGeometrys[0].positions) {
	      _this3.walls = [];
	      _this3.plotGeometrys.map(function (plotGeom) {
	        if (plotGeom.subsymbolCode == -1) {
	          var positions = plotGeom.positions;
	          var heights = (0, _util.positionsToHeights)(positions);
	          var options = {
	            type: _Types2.default.WALL,
	            height: heights,
	            color: _this3.outlineColor.withAlpha(0.5),
	            drawHelper: _this3.drawHelper
	          };
	          var material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	          material.uniforms.color = options.color;
	          options.material = material;

	          var wall = new _Wall2.default(options);
	          _this3.drawHelper._tempPrimitives.add(wall);
	          wall.positions = positions;
	          wall._createPrimitive = true;
	          wall.fatherEntity = _this3;
	          wall.color = _this3.outlineColor.withAlpha(0.5);
	          _this3.walls.push(wall);
	        }
	      });
	    }
	  };

	  this.setEditable = function () {
	    _this3.drawHelper._editor.add(_this3);
	  };

	  this.getGeometry = function () {
	    return (0, _geometryHelper.getGeometry)(_this3);
	  };

	  this.getBillboard = function () {
	    return null;
	  };

	  this.getOutlineGeometry = function () {
	    if (_this3.plotGeometrys) {
	      var geomtry = _this3.plotGeometrys.map(function (geom) {
	        if (_this3.clampToGround) {
	          return new GeoVis.GroundPolylineGeometry({
	            positions: geom.positions,
	            width: _this3.outlineWidth || 2,
	            vertexFormat: GeoVis.EllipsoidSurfaceAppearance.VERTEX_FORMAT
	          });
	        } else {
	          return new GeoVis.PolylineGeometry({
	            positions: geom.positions,
	            width: _this3.outlineWidth || 2,
	            vertexFormat: GeoVis.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
	            arcType: GeoVis.ArcType.NONE
	          });
	        }
	      });
	      return geomtry;
	    } else {
	      return GeoVis.PolygonOutlineGeometry.fromPositions({
	        positions: _this3.positions()
	      });
	    }
	  };

	  this.updateBillboard = function () {
	    if (!_this3._billboards && _this3.symbolPlot && _this3.symbolPlot.length > 0) {
	      _this3._billboards = new GeoVis.BillboardCollection({
	        scene: _this3.drawHelper._scene
	      });
	      _this3.drawHelper._tempPrimitives.add(_this3._billboards);
	    }
	    if (!_this3.billBoard && _this3.symbolPlot && _this3.symbolPlot.length > 0) {
	      _this3.removeBillboard();
	      _this3.billBoards = [];
	      _this3.symbolPlot.map(function (item) {
	        var pos = item._positions[0];
	        var pos2 = item._positions[1];
	        var distance = GeoVis.Cartesian3.distance(pos, pos2) * 2;
	        var childPic = _this3._billboards.add({
	          id: GeoVis.createGuid(),
	          position: pos,
	          image: _this3.drawHelper.PLOT_SERVER_URL + "/f/raw/subpng/id/" + item.subsymbolCode,
	          height: distance,
	          width: distance,
	          sizeInMeters: true,
	          color: _this3.iconColor || GeoVis.Color.RED,
	          show: _this3.show
	        });
	        _this3.billBoards.push(childPic);
	      });
	      _this3.drawHelper.fire("update:billboard", { entity: _this3 });
	    }
	  };

	  this.updateWall = function () {
	    if (_this3.walls && _this3.plotGeometrys && _this3.plotGeometrys[0] && _this3.plotGeometrys[0].positions) {
	      var subsymbolNum = 0;
	      _this3.plotGeometrys.map(function (plotGeom, index) {
	        if (plotGeom.subsymbolCode !== -1) {
	          subsymbolNum = subsymbolNum + 1;
	        } else {
	          index = index - subsymbolNum;
	          var positions = plotGeom.positions;
	          var heights = (0, _util.positionsToHeights)(positions);
	          if (_this3.walls[index]) {
	            _this3.walls[index].positions = positions;
	            _this3.walls[index].height = heights;
	            _this3.walls[index].show = _this3.visible;
	            _this3.walls[index]._createPrimitive = true;
	          }
	        }
	      });
	      _this3.drawHelper.fire("update:wall", { entity: _this3 });
	    }
	  };

	  this.removeBillboard = function () {
	    if (_this3.billBoards) {
	      _this3.billBoards.map(function (bb) {
	        _this3._billboards.remove(bb);
	      });
	    }
	  };

	  this.removeWall = function () {
	    if (_this3.walls) {
	      _this3.walls.map(function (wall) {
	        _this3.drawHelper._tempPrimitives.remove(wall);
	      });
	    }
	  };

	  this.deleted = function () {
	    var editor = _this3.drawHelper._editor.getEditor(_this3);
	    editor.setEditable(_this3, false);
	    _this3.drawHelper._editor.remove(_this3);
	    _this3.drawHelper._tooltip.setVisible(false);
	    editor.setHighlighted(_this3, false);
	    _this3.animator && _this3.removeAnimate();
	    _this3.removeBillboard && _this3.removeBillboard();
	    _this3.removeWall && _this3.removeWall();
	    _this3.drawHelper._primitives.remove(_this3);
	    _this3.drawHelper.fire("deleted", { entity: _this3 });
	  };
	};

	exports.default = PlotShape;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ChangeablePrimitive2 = __webpack_require__(19);

	var _ChangeablePrimitive3 = _interopRequireDefault(_ChangeablePrimitive2);

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Wall = function (_ChangeablePrimitive) {
	  _inherits(Wall, _ChangeablePrimitive);

	  function Wall(options) {
	    _classCallCheck(this, Wall);

	    options.appearance = new GeoVis.MaterialAppearance({
	      aboveGround: false,
	      material: GeoVis.Material.fromType(GeoVis.Material.ColorType)
	    });
	    options = (0, _util.copyOptions)(options, _config.defaultWallOptions);
	    options.type = _Types2.default.WALL;
	    options.fatherEntity = options.fatherEntity || undefined;

	    var _this = _possibleConstructorReturn(this, (Wall.__proto__ || Object.getPrototypeOf(Wall)).call(this, options));

	    _this.setEditable = function () {
	      _this.drawHelper._editor.add(_this);
	    };

	    _this.getGeometry = function () {
	      if (!GeoVis.defined(_this.positions) || _this.positions.length < 2) {
	        return;
	      }
	      var maximumHeights = [];
	      var minimumHeights = [];
	      for (var i in _this.positions) {
	        maximumHeights.push(_this.height[i]);
	        minimumHeights.push(0);
	      }
	      return new GeoVis.WallGeometry({
	        positions: _this.positions,
	        maximumHeights: maximumHeights,
	        minimumHeights: minimumHeights,
	        // vertexFormat: GeoVis.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
	        ellipsoid: _this.ellipsoid,
	        granularity: _this.granularity
	      });
	    };

	    return _this;
	  }

	  _createClass(Wall, [{
	    key: "positions",
	    get: function get() {
	      return this._positions;
	    },
	    set: function set(positions) {
	      this._positions = positions;
	      this._createPrimitive = true;
	    }
	  }, {
	    key: "geodesic",
	    get: function get() {
	      return this._geodesic;
	    },
	    set: function set(geodesic) {
	      this._geodesic = geodesic;
	      this._createPrimitive = true;
	    }
	  }, {
	    key: "width",
	    get: function get() {
	      return this._width;
	    },
	    set: function set(width) {
	      this._width = width;
	      this._createPrimitive = true;
	    }
	  }, {
	    key: "color",
	    get: function get() {
	      return this._color;
	    },
	    set: function set(color) {
	      this._color = color;
	      if (this.material && this.appearance.material) {
	        this.material.uniforms.color = color;
	        this.appearance.material.uniforms.color = color;
	      }
	    }
	  }]);

	  return Wall;
	}(_ChangeablePrimitive3.default);

	exports.default = Wall;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(13);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @t2s-check


	var _util = __webpack_require__(28);

	var _websocket = __webpack_require__(29);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Animator = function () {
	  /** 
	   * Icon动态属性
	   * @param {GeoVis.Earth} earth
	   * @param {*} options
	   */
	  function Animator(entity, options) {
	    var _this = this;

	    _classCallCheck(this, Animator);

	    this.updateProperty = function () {
	      _this.property = (0, _util.getAnimateProperty)(_this);
	    };

	    this.id = entity.id;
	    this.plot = entity;
	    this.visible = options.visible || false;
	    this._duration = options.duration || 2;
	    this._animationType = options.animationType || "none";
	    this.hierarchy = options.hierarchy || 0;
	    this.materialChanged = false;
	    this.updateProperty();
	  }

	  _createClass(Animator, [{
	    key: "update",


	    // 根据持续时间来执行动画
	    value: function () {
	      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
	        var _this2 = this;

	        var i, obj, TweenMax;
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                if (this.visible) {
	                  _context2.next = 2;
	                  break;
	                }

	                return _context2.abrupt("return");

	              case 2:
	                this.plot.visible = true;
	                if (this.plot.color) {
	                  this.plot.color = this.plot.color.clone().withAlpha(1);
	                }
	                if (this.plot.outlineColor) {
	                  this.plot.outlineColor = this.plot.outlineColor.clone().withAlpha(1);
	                }
	                if (this.plot.fillColor) {
	                  this.plot.fillColor = this.plot.fillColor.clone().withAlpha(1);
	                }

	                i = 0;

	                this.plot.drawHelper.fire("changed", {
	                  entity: this.plot
	                });

	                if (!(this.animationType === "none")) {
	                  _context2.next = 10;
	                  break;
	                }

	                return _context2.abrupt("return");

	              case 10:
	                obj = { time: 0.0 }; // 时间

	                TweenMax = window["TweenMax"];

	                this.tm = TweenMax.to(obj, this.duration, {
	                  time: this.duration,
	                  delay: 0, // 设置延时
	                  ease: "Power0.easeNone",
	                  onUpdate: function () {
	                    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
	                      var time, custom, value;
	                      return _regenerator2.default.wrap(function _callee$(_context) {
	                        while (1) {
	                          switch (_context.prev = _context.next) {
	                            case 0:
	                              if (!(_this2.animationType === "buling")) {
	                                _context.next = 5;
	                                break;
	                              }

	                              if (obj.time / (i * 0.2) > 1) {
	                                _this2.plot.visible = !_this2.plot.visible;
	                                i++;
	                              }
	                              if (obj.time === _this2.duration) {
	                                _this2.plot.visible = true;
	                              }
	                              _context.next = 27;
	                              break;

	                            case 5:
	                              if (!(_this2.animationType === "default" || _this2.animationType === "zoom")) {
	                                _context.next = 11;
	                                break;
	                              }

	                              time = GeoVis.JulianDate.addSeconds(new GeoVis.JulianDate(0), obj.time, new GeoVis.JulianDate());
	                              custom = (0, _util.cartesianArrayToLonlatArray)(_this2.property.getValue(time));

	                              if (custom.length !== 0) {
	                                (0, _websocket.getGeomtry)(custom, _this2.plot.type, _this2.plot);
	                              }
	                              _context.next = 27;
	                              break;

	                            case 11:
	                              if (!(_this2.animationType === "curveRay")) {
	                                _context.next = 22;
	                                break;
	                              }

	                              if (_this2.materialChanged) {
	                                _context.next = 18;
	                                break;
	                              }

	                              _this2.plot.lineType = "curveRay";
	                              _this2.materialChanged = true;

	                              if (!(_this2.plot.type !== _Types2.default.ICON && _this2.animationType !== "default")) {
	                                _context.next = 18;
	                                break;
	                              }

	                              _context.next = 18;
	                              return (0, _websocket.getGeomtry)(_this2.plot.custom, _this2.plot.type, _this2.plot);

	                            case 18:
	                              _this2.plot.material.uniforms.step = obj.time / _this2.duration;
	                              if (obj.time / _this2.duration == 1) {
	                                _this2.plot.lineType = "default";
	                              }
	                              _context.next = 27;
	                              break;

	                            case 22:
	                              time = GeoVis.JulianDate.addSeconds(new GeoVis.JulianDate(0), obj.time, new GeoVis.JulianDate());
	                              value = _this2.property.getValue(time);
	                              // var value = obj.time / this.duration;

	                              if (_this2.plot.color) {
	                                _this2.plot.color = _this2.plot.color.clone().withAlpha(value);
	                                // this.plot.color = this.plot.color.clone().withAlpha(value);

	                                // console.log( this.plot.color, color)
	                              }
	                              if (_this2.plot.outlineColor) {
	                                _this2.plot.outlineColor = _this2.plot.outlineColor.clone().withAlpha(value);
	                              }
	                              if (_this2.plot.fillColor) {
	                                _this2.plot.fillColor = _this2.plot.fillColor.clone().withAlpha(value);
	                              }

	                            case 27:
	                            case "end":
	                              return _context.stop();
	                          }
	                        }
	                      }, _callee, _this2);
	                    }));

	                    return function onUpdate() {
	                      return _ref2.apply(this, arguments);
	                    };
	                  }()
	                });

	              case 13:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function update() {
	        return _ref.apply(this, arguments);
	      }

	      return update;
	    }()

	    /**
	     * 添加至动画管理
	     * @param {*} animators
	     */

	  }, {
	    key: "addTo",
	    value: function addTo(animators) {
	      animators.add(this);
	    }
	    /**
	     * 从动画管理移除
	     * @param {*} animators
	     */

	  }, {
	    key: "removeFrom",
	    value: function removeFrom(animators) {
	      animators.remove(this);
	      this.tm && this.tm.kill();
	    }
	  }, {
	    key: "duration",
	    get: function get() {
	      return this._duration;
	    },
	    set: function set(val) {
	      this._duration = val;
	      this.updateProperty();
	      this.update();
	    }
	  }, {
	    key: "animationType",
	    get: function get() {
	      return this._animationType;
	    },
	    set: function set(val) {
	      this._animationType = val;
	      this.updateProperty();
	      this.update();
	    }
	  }]);

	  return Animator;
	}();

	exports.default = Animator;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getAnimateProperty = getAnimateProperty;
	exports.bulingProperty = bulingProperty;
	exports.fadeInProperty = fadeInProperty;
	exports.fadeOutProperty = fadeOutProperty;
	exports.defaultProperty = defaultProperty;
	exports.getCenter = getCenter;
	exports.cartesianArrayToLonlatArray = cartesianArrayToLonlatArray;
	exports.loadPlotGeom = loadPlotGeom;
	function getAnimateProperty(animator) {
	  switch (animator.animationType) {
	    case "fadeIn":
	      return fadeInProperty(animator.duration);
	    case "fadeOut":
	      return fadeOutProperty(animator.duration);
	    case "default":
	      return defaultProperty(animator.plot.custom, animator.duration);
	    case "zoom":
	      return zoomProperty(animator.plot.custom, animator.duration);
	  }
	}
	/**
	 * 时间点动画效果1：闪烁效果
	 * @param {*} data
	 */
	function bulingProperty(duration) {
	  var newProperty = new GeoVis.SampledProperty(Number);
	  var length = duration / 0.2;
	  var delta = 0;
	  for (var i = 0; i < length - 1; i++) {
	    delta = 0.2 * i;
	    var time = GeoVis.JulianDate.addSeconds(new GeoVis.JulianDate(0), delta, new GeoVis.JulianDate());
	    if (i / 2) {
	      newProperty.addSample(time, 1);
	    } else {
	      newProperty.addSample(time, 0);
	    }
	  }
	  return newProperty;
	}

	/**
	 * 时间点动画效果2：淡入
	 * @param {*} data
	 */
	function fadeInProperty(duration) {
	  var newProperty = new GeoVis.SampledProperty(Number);
	  var delta = 0;
	  for (var i = 0; i < 2; i++) {
	    delta = i * duration;
	    var time = GeoVis.JulianDate.addSeconds(new GeoVis.JulianDate(0), delta, new GeoVis.JulianDate());
	    newProperty.addSample(time, i);
	  }
	  return newProperty;
	}

	/**
	 * 时间点动画效果3：淡出
	 * @param {*} data
	 */
	function fadeOutProperty(duration) {
	  var newProperty = new GeoVis.SampledProperty(Number);
	  var time1 = GeoVis.JulianDate.addSeconds(new GeoVis.JulianDate(0), 0, new GeoVis.JulianDate());
	  var time2 = GeoVis.JulianDate.addSeconds(new GeoVis.JulianDate(0), duration, new GeoVis.JulianDate());
	  newProperty.addSample(time1, 1);
	  newProperty.addSample(time2, 0);
	  return newProperty;
	}

	/**
	 * 时间点动画效果4：控制点动画
	 * @param {*} data
	 */
	function defaultProperty(custom, duration) {
	  var customProperty = new GeoVis.PositionPropertyArray();
	  var CustomPropertyArray = [];
	  var allTime = duration;
	  var length = custom.length;
	  for (var index = 0; index < length; index++) {
	    var posProperty = new GeoVis.SampledPositionProperty();
	    if (index > 0) {
	      var cartesian = GeoVis.Cartesian3.fromDegrees(custom[index - 1][0], custom[index - 1][1], 0);
	      var time = new GeoVis.JulianDate(0);
	      time.secondsOfDay = time.secondsOfDay + (index - 1) * (allTime / (length - 1));
	      posProperty.addSample(time, cartesian);
	    }
	    for (var key = index; key < length; key++) {
	      var _cartesian = GeoVis.Cartesian3.fromDegrees(custom[index][0], custom[index][1], 0);
	      var _time = new GeoVis.JulianDate(0);
	      _time.secondsOfDay = _time.secondsOfDay + key * (allTime / (length - 1));
	      posProperty.addSample(_time, _cartesian);
	    }
	    CustomPropertyArray.push(posProperty);
	  }
	  customProperty.setValue(CustomPropertyArray);
	  return customProperty;
	}

	/**
	 * 时间点动画效果5：缩放动画
	 * @param {*} data
	 */

	function zoomProperty(custom, duration) {
	  var customProperty = new GeoVis.PositionPropertyArray();
	  var CustomPropertyArray = [];
	  var allTime = duration;
	  var startCustom = getCenter(custom);
	  var movePath = [];
	  for (var i in custom) {
	    movePath.push([startCustom[i], custom[i]]);
	  }
	  movePath.map(function (path) {
	    var posProperty = new GeoVis.SampledPositionProperty();
	    for (var key = 0; key < 2; key++) {
	      var cartesian = GeoVis.Cartesian3.fromDegrees(path[key][0], path[key][1], 0);
	      var time = new GeoVis.JulianDate(0);
	      time.secondsOfDay = time.secondsOfDay + key * allTime;
	      posProperty.addSample(time, cartesian);
	    }
	    CustomPropertyArray.push(posProperty);
	  });
	  customProperty.setValue(CustomPropertyArray);
	  return customProperty;
	}

	function getCenter(custom) {
	  var points = [];
	  var customStart = [];
	  custom.map(function (point) {
	    points.push(turf.point(point));
	  });
	  var features = turf.featureCollection(points);
	  var center = turf.center(features).geometry.coordinates;
	  custom.map(function (point) {
	    var lon = (center[0] + point[0]) / 2;
	    var lat = (center[1] + point[1]) / 2;
	    var centerLonlat = [lon, lat];
	    customStart.push(centerLonlat);
	  });
	  return customStart;
	}

	function cartesianArrayToLonlatArray(positions) {
	  var lonlatArray = [];
	  positions.map(function (position) {
	    var carto = Engine.Cartographic.fromCartesian(position);
	    var lonlat = [Engine.Math.toDegrees(carto.longitude), Engine.Math.toDegrees(carto.latitude)];
	    lonlatArray.push(lonlat);
	  });

	  return lonlatArray;
	}
	function loadPlotGeom(geom, options) {
	  if (!options) {
	    return;
	  }
	  geom.fillType = options.fillType;
	  geom._outlineColor = options._outlineColor;
	  geom._fillColor = options._fillColor;
	  geom.lineType = options.lineType;
	  geom.Subsymbolcode = options.Subsymbolcode;
	  geom._isFill = options.isFill;
	}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.messageHandler = exports.createSocketConnection = exports.createProtoType = exports.getGeomtry = undefined;

	var _regenerator = __webpack_require__(13);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var getGeomtry = exports.getGeomtry = function () {
	  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(lonlats, type, poly) {
	    var data, index, id;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            data = {
	              lonlats: lonlats,
	              type: type,
	              fillColor: poly.fillColor,
	              outlineColor: poly.outlineColor
	            };

	            PlotIndexMap[poly.id] = PlotIndexMap[poly.id] || 0;
	            PlotIndexMap[poly.id]++;
	            index = PlotIndexMap[poly.id];
	            id = "" + poly.id + PlotIndexMap[poly.id];

	            data.id = id;
	            ws.send(JSON.stringify(data));
	            // console.time(id);
	            return _context.abrupt("return", new Promise(function (resolve) {
	              callBackMap[id] = function (plotData) {
	                // 接收坐标
	                // console.timeEnd(id);
	                // plot.id
	                if (index < PlotIndexMap[poly.id] - 8) {
	                  callBackMap[id] = undefined;
	                  resolve(false);
	                } else {
	                  // console.log(plotData)
	                  poly.plotGeometrys = plotData;
	                  callBackMap[id] = undefined;
	                  poly._createPrimitive = true;
	                  resolve(true);
	                }
	              };
	            }));

	          case 8:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function getGeomtry(_x, _x2, _x3) {
	    return _ref.apply(this, arguments);
	  };
	}();

	var createProtoType = exports.createProtoType = function () {
	  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
	    return _regenerator2.default.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            return _context2.abrupt("return", new Promise(function (resolve, reject) {
	              protobuf.load("./lib/schema.proto", function (err, root) {
	                if (err) {
	                  console.error(err);
	                  return;
	                }
	                Plots = root.lookupType("Plot.Plots");
	                resolve(Plots);
	              });
	            }));

	          case 1:
	          case "end":
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));

	  return function createProtoType() {
	    return _ref2.apply(this, arguments);
	  };
	}();

	var createSocketConnection = exports.createSocketConnection = function () {
	  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(host) {
	    return _regenerator2.default.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            ws = new WebSocket("ws://" + host + "/websocket/test");
	            ws.onopen = function (e) {
	              console.log("WebSocket \u8FDE\u63A5\u72B6\u6001\uFF1A " + ws.readyState);
	            };
	            ws.onclose = function (data) {
	              console.log("WebSocket连接已关闭");
	              console.log(data);
	            };
	            return _context3.abrupt("return", ws);

	          case 4:
	          case "end":
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));

	  return function createSocketConnection(_x4) {
	    return _ref3.apply(this, arguments);
	  };
	}();

	var _PlotGeometry = __webpack_require__(30);

	var _PlotGeometry2 = _interopRequireDefault(_PlotGeometry);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	// import regeneratorRuntime from "./runtime.js"
	var callBackMap = {};
	var Plots, ws;
	var index = 0;
	var PlotIndexMap = {};


	function transformBlob(blob) {
	  return new Promise(function (resolve) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    reader.onload = function () {
	      var buf = new Uint8Array(reader.result);
	      resolve(buf);
	    };
	  });
	}
	var messageHandler = exports.messageHandler = function () {
	  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(evt) {
	    var buf, code, data, result;
	    return _regenerator2.default.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            if (Plots) {
	              _context4.next = 2;
	              break;
	            }

	            return _context4.abrupt("return");

	          case 2:
	            buf = void 0;

	            if (!(evt.data instanceof Blob)) {
	              _context4.next = 9;
	              break;
	            }

	            _context4.next = 6;
	            return transformBlob(evt.data);

	          case 6:
	            buf = _context4.sent;
	            _context4.next = 14;
	            break;

	          case 9:
	            _context4.t0 = Uint8Array;
	            _context4.next = 12;
	            return evt.data;

	          case 12:
	            _context4.t1 = _context4.sent;
	            buf = new _context4.t0(_context4.t1);

	          case 14:
	            code = Plots.decode(buf);
	            data = Plots.toObject(code, {
	              longs: String,
	              enums: String,
	              bytes: String,
	              defaults: true,
	              arrays: true,
	              objects: true,
	              oneof: true
	            });
	            result = [];

	            data.plotGeomtrys.map(function (plot) {
	              var points = [];
	              for (var i = 2; i < plot.positions.length; i += 3) {
	                points.push(new GeoVis.Cartesian3(plot.positions[i - 2].doubleValue, plot.positions[i - 1].doubleValue, plot.positions[i].doubleValue));
	              }
	              var lineColor = new GeoVis.Color(plot.lineColor[0].doubleValue, plot.lineColor[1].doubleValue, plot.lineColor[2].doubleValue, plot.lineColor[3].doubleValue);
	              var fillColor = new GeoVis.Color(plot.fillColor[0].doubleValue, plot.fillColor[1].doubleValue, plot.fillColor[2].doubleValue, plot.fillColor[3].doubleValue);
	              // var lineColor=new GeoVis.Color(plot.lineColor[0],plot.lineColor[1],plot.lineColor[2],plot.lineColor[3])
	              var geom = new _PlotGeometry2.default(points, {
	                fillType: plot.fillType,
	                lineColor: lineColor,
	                fillColor: fillColor,
	                lineType: plot.lineType,
	                subsymbolCode: plot.subsymbolCode,
	                isFill: plot.isFill,
	                canFilled: plot.canFilled
	              });
	              result.push(geom);
	            });
	            if (callBackMap[data.id] instanceof Function) {
	              callBackMap[data.id](result);
	            }

	          case 19:
	          case "end":
	            return _context4.stop();
	        }
	      }
	    }, _callee4, undefined);
	  }));

	  return function messageHandler(_x5) {
	    return _ref4.apply(this, arguments);
	  };
	}();

	// function destroy(){
	//   // ProtoType.destroy()?
	//   ws.close()
	// }

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PlotGeometry = function () {
	  function PlotGeometry(coordinates, options) {
	    _classCallCheck(this, PlotGeometry);

	    // this.lonlats = coordinates;
	    this.fillType = options.fillType || -1;
	    this._outlineColor = options.lineColor || undefined;
	    this._fillColor = options.fillColor || options.lineColor || undefined;
	    this.lineType = options.lineType || 0;
	    this.subsymbolCode = options.subsymbolCode || -1;
	    this._positions = coordinates;
	    this._isFill = options.isFill;
	    this.canFilled = options.canFilled;
	    this._regenarate = true;
	  }

	  _createClass(PlotGeometry, [{
	    key: "positions",
	    get: function get() {
	      return this._positions;
	    },
	    set: function set(val) {
	      this._positions = val;
	      this._regenarate = true;
	    }
	  }, {
	    key: "regenarate",
	    get: function get() {
	      return this._regenarate; // 对应_createPrimitive;
	    }
	  }, {
	    key: "outlineColor",
	    get: function get() {
	      return this._outlineColor;
	    },
	    set: function set(val) {
	      this._outlineColor = val;
	      this._regenarate = true;
	    }
	  }, {
	    key: "fillColor",
	    get: function get() {
	      return this._fillColor;
	    },
	    set: function set(val) {
	      this._fillColor = val;
	      this._regenarate = false;
	    }
	  }, {
	    key: "isFill",
	    get: function get() {
	      return this._isFill;
	    },
	    set: function set(val) {
	      if (this.canFilled) {
	        this._isFill = val;
	        this._regenarate = true;
	      } else {
	        this._regenarate = false;
	      }
	    }
	  }]);

	  return PlotGeometry;
	}();

	exports.default = PlotGeometry;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ChangeablePrimitive2 = __webpack_require__(19);

	var _ChangeablePrimitive3 = _interopRequireDefault(_ChangeablePrimitive2);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroundPolyline = function (_ChangeablePrimitive) {
	  _inherits(GroundPolyline, _ChangeablePrimitive);

	  function GroundPolyline(options) {
	    _classCallCheck(this, GroundPolyline);

	    var _this = _possibleConstructorReturn(this, (GroundPolyline.__proto__ || Object.getPrototypeOf(GroundPolyline)).call(this, options));

	    _this.getGeometry = function () {
	      if (!GeoVis.defined(_this.positions) || _this.positions.length < 2) {
	        return;
	      }

	      return new GeoVis.GroundPolylineGeometry({
	        positions: _this.positions,
	        width: _this.width < 1 ? 1 : _this.width,
	        granularity: 999.0,
	        loop: false
	      });
	    };

	    options = (0, _util.copyOptions)(options, _config.defaultPolylineOptions);
	    options.type = options.type || _Types2.default.GROUND_POLYLINE;
	    options.onterrain = options.onterrain || true;
	    return _this;
	  }
	  /**
	   * 获取GroundPolyline的位置
	   * @type {Vector3}
	   * @name positions
	   * @memberof GroundPolyline
	   */


	  _createClass(GroundPolyline, [{
	    key: "positions",
	    get: function get() {
	      return this._positions;
	    },
	    set: function set(positions) {
	      this._positions = positions;
	      this._createPrimitive = true;
	    }
	    /**
	     * 获取GroundPolyline的宽度
	     * @type {Number}
	     * @name width
	     * @memberof GroundPolyline
	     */

	  }, {
	    key: "width",
	    get: function get() {
	      return this._width;
	    },
	    set: function set(width) {
	      this._width = width;
	      this._createPrimitive = true;
	    }
	    /**
	     * 通过参数获取初始GroundPolylineGeometry
	     * @return {GeoVis.GroundPolylineGeometry}
	     */

	  }]);

	  return GroundPolyline;
	}(_ChangeablePrimitive3.default);

	exports.default = GroundPolyline;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ChangeablePrimitive2 = __webpack_require__(19);

	var _ChangeablePrimitive3 = _interopRequireDefault(_ChangeablePrimitive2);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	var _Util = __webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Polyline = function (_ChangeablePrimitive) {
	  _inherits(Polyline, _ChangeablePrimitive);

	  function Polyline(options) {
	    _classCallCheck(this, Polyline);

	    options = (0, _util.copyOptions)(options, _config.defaultPolylineOptions);

	    var _this = _possibleConstructorReturn(this, (Polyline.__proto__ || Object.getPrototypeOf(Polyline)).call(this, options));

	    _this.setEditable = function () {
	      _this.drawHelper._editor.add(_this);
	    };

	    _this.deleted = function () {
	      var editor = _this.drawHelper._editor.getEditor(_this);
	      editor.setEditable(_this, false);
	      _this.drawHelper._tooltip.setVisible(false);
	      editor.setHighlighted(_this, false);
	      _this.drawHelper._primitives.remove(_this);
	      _this.drawHelper.fire("deleted", { entity: _this });
	    };

	    _this.getGeometry = function () {
	      if (!GeoVis.defined(_this.positions) || _this.positions.length < 2) {
	        return;
	      }
	      if (_this.type === _Types2.default.GROUND_POLYLINE) {
	        return new GeoVis.GroundPolylineGeometry({
	          positions: _this.positions,
	          width: _this.width < 1 ? 1 : _this.width,
	          granularity: 999.0,
	          loop: false
	        });
	      } else {
	        return new GeoVis.PolylineGeometry({
	          positions: _this.positions,
	          height: _this.height,
	          width: _this.width < 1 ? 1 : _this.width,
	          vertexFormat: GeoVis.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
	          ellipsoid: _this.ellipsoid,
	          arcType: _this.arcType
	        });
	      }
	    };

	    _this.deleted = function () {
	      var editor = _this.drawHelper._editor.getEditor(_this);
	      editor && editor.setEditable(_this, false);
	      editor && editor.setHighlighted(_this, false);
	      _this.drawHelper._tooltip.setVisible(false);
	      _this.drawHelper._primitives.remove(_this);
	      _this.drawHelper.fire("deleted", { entity: _this });
	    };

	    _this.material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	    _this.material.uniforms.color = options.color || GeoVis.Color.RED;
	    _this.appearance = new GeoVis.PolylineMaterialAppearance({
	      material: _this.material,
	      aboveGround: false
	    });
	    options.type = options.type || _Types2.default.PROJ_POLYLINE;
	    options.name = options.name || null;
	    options.computed = options.computed || false;
	    return _this;
	  }
	  /**
	   * 获取Polyline的位置
	   * @type {Vector3}
	   * @name positions
	   * @memberof Polyline
	   */


	  _createClass(Polyline, [{
	    key: "updateConPoints",
	    value: function updateConPoints() {
	      if (this._points) {
	        this._points.updatePointsPositions(this.positions);
	        (0, _Util.updateMarkers)(this);
	      }
	    }
	  }, {
	    key: "positions",
	    get: function get() {
	      return this._positions;
	    },
	    set: function set(positions) {
	      this._positions = positions;
	      this._createPrimitive = true;
	    }
	  }, {
	    key: "cartographic",
	    get: function get() {
	      var result = [];
	      this.positions.map(function (pos) {
	        var cato = GeoVis.Cartographic.fromCartesian(pos);
	        result.push(cato);
	      });
	      return result;
	    },
	    set: function set(val) {
	      var positions = [];
	      val.map(function (carto) {
	        var pos = GeoVis.Cartographic.toCartesian(carto);
	        positions.push(pos);
	      });
	      this.positions = positions;
	      this.updateConPoints();
	    }
	    /**
	     * 获取Polyline的宽度
	     * @type {Number}
	     * @name width
	     * @memberof Polyline
	     */

	  }, {
	    key: "width",
	    get: function get() {
	      return this._width;
	    },
	    set: function set(width) {
	      this._width = width;
	      this._createPrimitive = true;
	    }
	    /**
	     * 通过参数获取初始PolylineGeometry
	     * @return {GeoVis.PolylineGeometry}
	     */

	  }]);

	  return Polyline;
	}(_ChangeablePrimitive3.default);

	exports.default = Polyline;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.saveAnimator = saveAnimator;
	exports.saveMaterial = saveMaterial;
	exports.saveLabel = saveLabel;
	exports.loadMaterial = loadMaterial;
	exports.loadLabel = loadLabel;
	exports.savePopup = savePopup;
	exports.loadPopup = loadPopup;
	exports.saveProp = saveProp;
	exports.loadProp = loadProp;

	var _ExtendProps = __webpack_require__(34);

	var _ExtendProps2 = _interopRequireDefault(_ExtendProps);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// @ts-check
	var xmlSerializer = new XMLSerializer();
	var domParser = new DOMParser();
	var _GeoVis = GeoVis,
	    Cartesian3 = _GeoVis.Cartesian3,
	    Cartesian2 = _GeoVis.Cartesian2,
	    Color = _GeoVis.Color,
	    NearFarScalar = _GeoVis.NearFarScalar,
	    DistanceDisplayCondition = _GeoVis.DistanceDisplayCondition,
	    BoundingRectangle = _GeoVis.BoundingRectangle;
	function saveAnimator(animator) {
	  var result = {};
	  result.visible = animator.visible;
	  result.duration = animator.duration;
	  result.animationType = animator.animationType;
	  result.hierarchy = animator.hierarchy;
	  return result;
	}

	function saveMaterial(material) {
	  return {
	    type: material.type,
	    uniforms: material.uniforms
	  };
	}
	function saveLabel(label) {
	  return {
	    text: label.text,
	    show: label.show,
	    style: label.style,
	    fillColor: Color.pack(label.fillColor, []),
	    outlineColor: Color.pack(label.outlineColor, []),
	    font: label.font,
	    verticalOrigin: label.verticalOrigin,
	    horizontalOrigin: label.horizontalOrigin,
	    pixelOffset: label.pixelOffset
	  };
	}

	function loadMaterial(obj) {
	  return new GeoVis.Material({
	    fabric: obj
	  });
	}

	function loadLabel(label) {
	  return _extends({}, label, {
	    style: label.style,
	    fillColor: Color.unpack(label.fillColor),
	    outlineColor: Color.unpack(label.outlineColor),
	    pixelOffset: new GeoVis.Cartesian2(label.pixelOffset.x, label.pixelOffset.y)
	  });
	}

	function savePopup(popup) {
	  var element = popup.element,
	      maxWidth = popup.maxWidth,
	      closeButton = popup.closeButton,
	      visible = popup.visible;

	  element.removeChild(closeButton);
	  var elementStr = xmlSerializer.serializeToString(element);
	  element.appendChild(closeButton);
	  var buttonStr = xmlSerializer.serializeToString(closeButton);
	  return {
	    element: elementStr,
	    maxWidth: maxWidth,
	    closeButton: buttonStr
	  };
	}

	function loadPopup(obj) {
	  var element = obj.element,
	      maxWidth = obj.maxWidth,
	      closeButton = obj.closeButton,
	      visible = obj.visible;

	  return {
	    element: domParser.parseFromString(element, "text/html").body.firstElementChild,
	    maxWidth: maxWidth,
	    closeButton: domParser.parseFromString(closeButton, "text/html").body.firstElementChild
	  };
	}

	function saveProp(key, value) {
	  switch (key) {
	    case "props":
	      return _ExtendProps2.default.pack(value);
	    case "element":
	      return xmlSerializer.serializeToString(value);
	    case "popup":
	      return savePopup(value);
	    case "position":
	    case "eyeOffset":
	    case "alignedAxis":
	      // debugger
	      return Cartesian3.pack(value, []);
	    case "backgroundPadding":
	    case "pixelOffset":
	      return Cartesian2.pack(value, []);
	    case "color":
	    case "outlineColor":
	    case "fillColor":
	    case "highLightColor":
	      return Color.pack(value, []);
	    case "scaleByDistance":
	    case "translucencyByDistance":
	    case "pixelOffsetScaleByDistance":
	      return NearFarScalar.pack(value, []);
	    case "distanceDisplayCondition":
	      return DistanceDisplayCondition.pack(value, []);
	    case "imageSubRegion":
	      return BoundingRectangle.pack(value, []);
	    case "heightReference":
	      return value;
	    case "horizontalOrigin":
	      return value;
	    case "verticalOrigin":
	      return value;
	    case "show":
	    case "visible":
	      return value;
	    case "material":
	      return saveMaterial(value);
	    case "label":
	      return saveLabel(value);
	    case "lineType":
	    case "lineWidth":
	    case "mirrorType":
	    case "elevationMode":
	    case "elevationHeight":
	      return value;
	    case "animator":
	      return saveAnimator(value);
	  }
	  return value;
	}

	function loadProp(key, value) {
	  switch (key) {
	    case "element":
	    case "popup":
	      return loadPopup(value);

	    // popup:true,
	    case "position":
	    case "eyeOffset":
	    case "alignedAxis":
	      return Cartesian3.unpack(value);
	    case "backgroundPadding":
	    case "pixelOffset":
	      return Cartesian2.unpack(value);
	    case "color":
	    case "outlineColor":
	    case "fillColor":
	    case "highLightColor":
	      return Color.unpack(value);
	    case "scaleByDistance":
	    case "translucencyByDistance":
	    case "pixelOffsetScaleByDistance":
	      return NearFarScalar.unpack(value);
	    case "distanceDisplayCondition":
	      return DistanceDisplayCondition.unpack(value);
	    case "imageSubRegion":
	      return BoundingRectangle.unpack(value);
	    case "heightReference":
	      return value;
	    case "horizontalOrigin":
	      return value;
	    case "verticalOrigin":
	      return value;
	    case "show":
	    case "visible":
	      return value;
	    case "material":
	      return loadMaterial(value);
	    case "label":
	      return loadLabel(value);
	    case "lineType":
	    case "lineWidth":
	    case "mirrorType":
	    case "elevationMode":
	    case "elevationHeight":
	      return value;
	    case "animator":
	      return value;
	  }
	  return value;
	}

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// var PropTemp = {};
	var ExtendProps = function () {
	  function ExtendProps(props, features) {
	    var _this = this;

	    _classCallCheck(this, ExtendProps);

	    this.props = [];
	    this.features = features;
	    props.map(function (prop) {
	      _this.addProp(prop);
	    });
	  }

	  _createClass(ExtendProps, [{
	    key: "addProp",

	    /**
	     *
	     * @param {Object} prop
	     * @param {string} prop.type 'string'| 'range'
	     * @param {string} prop.name 属性名称
	     * @param {string} prop.value any
	     */
	    value: function addProp(prop) {
	      if (prop.type === "string") {
	        this.props.push(prop);
	      } else if (prop.type === "range") {
	        var data = prop.value;
	        if (prop.value) prop.value.units = prop.value.units || "米";
	        //   debugger
	        var propEntity = new GeoVis.Circle(data.center, {
	          radius: data.radius,
	          fill: true,
	          onTerrain: true,
	          async: false,
	          fillColor: GeoVis.Color.fromCssString(data.fillColor),
	          outline: data.outline,
	          outlineWidth: data.outlineWidth,
	          outlineColor: GeoVis.Color.fromCssString(data.outlineColor || "#fff")
	        }).addTo(this.features);
	        propEntity.units = prop.value.units;
	        this.props.push(_extends({}, prop, {
	          value: propEntity
	        }));
	      }
	    }
	  }, {
	    key: "getByIndex",
	    value: function getByIndex(index) {
	      return this.props[index];
	    }
	  }, {
	    key: "removeByIndex",
	    value: function removeByIndex(index) {
	      if (this.props[index].type === "range") {
	        this.props[index].value.removeFrom(this.features);
	      }
	      this.props = this.props.filter(function (p, i) {
	        return i !== index;
	      });
	    }
	  }, {
	    key: "setPropType",
	    value: function setPropType(prop, type) {
	      if (prop.type !== type) {
	        prop.type = type;
	        if (type === "string") {
	          prop.value = "";
	        } else if (type === "range") {
	          prop.value = new GeoVis.Circle(prop.value.center, {
	            radius: 100,
	            fill: true,
	            fillColor: GeoVis.Color.RED
	          }).addTo(this.features);
	        }
	      }
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      var _this2 = this;

	      this.props.map(function (prop) {
	        if (prop.type === "range") {
	          try {
	            prop.value.removeFrom(_this2.features);
	          } catch (e) {
	            // console.log(e)
	            // todo 會出現重複移除
	          }
	        }
	      });
	    }
	  }, {
	    key: "position",
	    set: function set(val) {
	      this.props.filter(function (prop) {
	        return prop.type === "range";
	      }).map(function (prop) {
	        return prop.value.center = val;
	      });
	    }
	  }], [{
	    key: "pack",
	    value: function pack(ExtendProps) {
	      var props = ExtendProps.props.map(function (prop) {
	        var value = prop.value;
	        if (prop.type === "range") {
	          // debugger;
	          value = {
	            fillColor: value.fillColor.toCssColorString(),
	            radius: value.radius,
	            center: value.lonlatCenter,
	            units: value.units || "米",
	            outline: value.outline || false,
	            outlineWidth: value.outlineWidth || 2,
	            outlineColor: value.outlineColor ? value.outlineColor.toCssColorString() : "#FFF"
	          };
	        }
	        return _extends({}, prop, {
	          value: value
	        });
	      });
	      return props;
	    }
	  }, {
	    key: "unpack",
	    value: function unpack(data, features) {
	      var extendProps = new ExtendProps(data, features);
	      return extendProps;
	    }
	  }]);

	  return ExtendProps;
	}();

	exports.default = ExtendProps;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.serializePolyline = serializePolyline;

	var _props = __webpack_require__(33);

	function serializePolyline(entity) {
	  var poly = {};
	  poly.type = entity.type;
	  poly.isPolygon = false;
	  poly.id = entity.id;
	  poly.positions = entity.positions.map(function (vec3) {
	    return (0, _props.saveProp)("position", vec3);
	  });
	  poly.computed = entity.computed;
	  poly.fillColor = (0, _props.saveProp)("color", entity.appearance ? entity.appearance.material.uniforms.color : entity.fillColor);
	  return poly;
	}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check

	exports.serializeCircle = serializeCircle;
	exports.unserializeCircle = unserializeCircle;

	var _Circle = __webpack_require__(37);

	var _Circle2 = _interopRequireDefault(_Circle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param {CirclePrimitive} entity
	 */
	function serializeCircle(entity) {
	  var poly = {};
	  poly.type = entity.type;
	  poly.id = entity.id;
	  poly.center = entity.center;
	  poly.radius = entity.radius;
	  poly.strokeColor = entity.strokeColor;
	  poly.strokeWidth = entity.strokeWidth;
	  poly.fillColor = entity.fillColor;
	  return poly;
	}

	function unserializeCircle(options, drawHelper, mode) {
	  if (options.fillColor) {
	    var material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	    material.uniforms.color = options.fillColor;
	    options.material = material;
	  }
	  options.appearance = new GeoVis.MaterialAppearance({
	    // aboveGround: false,
	    material: options.material
	  });
	  delete options.fillColor;
	  var circle = new _Circle2.default(_extends({}, options, {
	    drawHelper: drawHelper,
	    asynchronous: false
	  }));
	  if (mode === "3d") {
	    drawHelper._primitives.add(circle);
	  }
	  circle.setEditable();
	  return circle;
	}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ChangeablePrimitive2 = __webpack_require__(19);

	var _ChangeablePrimitive3 = _interopRequireDefault(_ChangeablePrimitive2);

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CirclePrimitive = function (_ChangeablePrimitive) {
	  _inherits(CirclePrimitive, _ChangeablePrimitive);

	  function CirclePrimitive(options) {
	    _classCallCheck(this, CirclePrimitive);

	    options = (0, _util.copyOptions)(options, _config.defaultSurfaceOptions);

	    var _this = _possibleConstructorReturn(this, (CirclePrimitive.__proto__ || Object.getPrototypeOf(CirclePrimitive)).call(this, options));

	    _this.setEditable = function () {
	      _this.drawHelper._editor.add(_this);
	    };

	    if (!(GeoVis.defined(options.center) && GeoVis.defined(options.radius))) {
	      throw new GeoVis.DeveloperError("Center and radius are required");
	    }
	    _this.type = _Types2.default.CIRCLE;
	    if (options.material) {
	      _this.appearance = new GeoVis.MaterialAppearance({
	        aboveGround: false,
	        material: options.material
	      });
	    }
	    _this.radius = options.radius;
	    return _this;
	  }
	  /**
	   * 获取Circle的圆心
	   * @type {Vector3}
	   * @name center
	   * @memberof Circle
	   */


	  _createClass(CirclePrimitive, [{
	    key: "getGeometry",
	    value: function getGeometry() {
	      if (!(GeoVis.defined(this.center) && GeoVis.defined(this.radius))) {
	        return;
	      }
	      // options.vertexFormat = appearance.vertexFormat;
	      return new GeoVis.CircleGeometry({
	        center: this.center,
	        radius: this.radius,
	        height: this.height,
	        vertexFormat: this.appearance.vertexFormat, // GeoVis.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
	        stRotation: this.textureRotationAngle,
	        ellipsoid: this.ellipsoid,
	        granularity: this.granularity
	      });
	    }
	  }, {
	    key: "getOutlineGeometry",
	    value: function getOutlineGeometry() {
	      return new GeoVis.CircleOutlineGeometry({
	        center: this.center,
	        radius: this.radius
	      });
	    }
	  }, {
	    key: "center",
	    get: function get() {
	      return this._center;
	    },
	    set: function set(center) {
	      this._center = center;
	      this._createPrimitive = true;
	    }
	    /**
	     * 获取Circle的半径
	     * @type {Number}
	     * @name radius
	     * @memberof Circle
	     */

	  }, {
	    key: "radius",
	    get: function get() {
	      return this._radius;
	    },
	    set: function set(radius) {
	      this._radius = Math.max(0.1, radius);
	      this._createPrimitive = true;
	    }
	  }]);

	  return CirclePrimitive;
	}(_ChangeablePrimitive3.default);

	exports.default = CirclePrimitive;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


	exports.serializeWall = serializeWall;
	exports.unserializeWall = unserializeWall;

	var _props = __webpack_require__(33);

	var _Wall = __webpack_require__(26);

	var _Wall2 = _interopRequireDefault(_Wall);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param {WallPrimitive} entity
	 */
	function serializeWall(entity) {
	  var poly = {};
	  poly.type = entity.type;
	  poly.id = entity.id;
	  poly.positions = entity.positions.map(function (vec3) {
	    return (0, _props.saveProp)("position", vec3);
	  });
	  poly.width = entity.width;
	  poly.color = entity.color;
	  poly.height = entity.height;
	  return poly;
	}

	function unserializeWall(options, drawHelper, mode) {
	  options.positions = options.positions.map(function (prop) {
	    return (0, _props.loadProp)("position", prop);
	  });
	  var wall = new _Wall2.default(_extends({}, options, {
	    drawHelper: drawHelper
	  }));

	  if (mode === "3d") {
	    drawHelper._primitives.add(wall);
	  }
	  wall.setEditable();
	  return wall;
	}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


	exports.serializeRect = serializeRect;
	exports.unserializeRect = unserializeRect;

	var _props = __webpack_require__(33);

	var _Rectangle = __webpack_require__(40);

	var _Rectangle2 = _interopRequireDefault(_Rectangle);

	var _config = __webpack_require__(6);

	var _util = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param {RectanglePrimitive} entity
	 */
	function serializeRect(entity) {
	  var poly = {};
	  poly.type = entity.type;
	  poly.id = entity.id;
	  poly.positions = entity.positions.map(function (vec3) {
	    return (0, _props.saveProp)("position", vec3);
	  });
	  poly.width = entity.width;
	  poly.height = entity.height;
	  poly.image = entity.material.uniforms.image;
	  return poly;
	}

	function unserializeRect(options, drawHelper, mode) {
	  options = (0, _util.copyOptions)(options, _config.defaultRectangleOptions);
	  if (options.image) {
	    var mat = new GeoVis.Material({
	      fabric: {
	        type: "Image",
	        uniforms: {
	          image: options.image
	        }
	      }
	    });
	    options.material = mat;
	  }
	  options.positions = options.positions.map(function (prop) {
	    return (0, _props.loadProp)("position", prop);
	  });
	  var rectangle = new _Rectangle2.default(_extends({}, options, {
	    drawHelper: drawHelper
	  }));

	  if (mode === "3d") {
	    drawHelper.primitives.add(rectangle);
	  }
	  rectangle.setEditable();
	  return rectangle;
	}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ChangeablePrimitive2 = __webpack_require__(19);

	var _ChangeablePrimitive3 = _interopRequireDefault(_ChangeablePrimitive2);

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _pickPosition = __webpack_require__(41);

	var _pickPosition2 = _interopRequireDefault(_pickPosition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // @ts-check


	var ellipsoid = GeoVis.Ellipsoid.WGS84;

	var Rectangle = function (_ChangeablePrimitive) {
	  _inherits(Rectangle, _ChangeablePrimitive);

	  function Rectangle(options) {
	    _classCallCheck(this, Rectangle);

	    var _this = _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, options));

	    _this.setEditable = function () {
	      _this.drawHelper._editor.add(_this);
	    };

	    _this.onDrag = function (position) {
	      var _self = _this;
	      var scene = _self.drawHelper._scene;
	      position = (0, _pickPosition2.default)(scene, position);
	      var coord = GeoVis.Cartographic.fromCartesian(position);
	      var MovePoint0 = _this.lastMousePos;
	      var lngDelta = coord.longitude - GeoVis.Cartographic.fromCartesian(MovePoint0).longitude;
	      var latDelta = coord.latitude - GeoVis.Cartographic.fromCartesian(MovePoint0).latitude;
	      _self.positions[0] = GeoVis.Cartesian3.fromRadians(ellipsoid.cartesianToCartographic(_self.positions[0]).longitude + lngDelta, ellipsoid.cartesianToCartographic(_self.positions[0]).latitude + latDelta, 0);
	      _self.positions[1] = GeoVis.Cartesian3.fromRadians(ellipsoid.cartesianToCartographic(_self.positions[1]).longitude + lngDelta, ellipsoid.cartesianToCartographic(_self.positions[1]).latitude + latDelta, 0);
	      var editPositions = [];
	      for (var index = 0; index < 2; index++) {
	        editPositions.push(changeXYPostions(_self.positions[index], _self.positions[Math.abs(index - 1)]));
	      }
	      _this._points.updatePointsPositions(_self.positions);
	      _this._editPoints.updatePointsPositions(editPositions);
	      _self._createPrimitive = true;
	      _this.lastMousePos = position;
	      function changeXYPostions(point1, point2) {
	        var carto1 = GeoVis.Cartographic.fromCartesian(point1);
	        var carto2 = GeoVis.Cartographic.fromCartesian(point2);
	        var newPoint = GeoVis.Cartesian3.fromRadians(carto1.longitude, carto2.latitude, carto1.height);
	        return newPoint;
	      }
	    };

	    _this.onDragStart = function (position) {
	      var scene = _this.drawHelper._scene;
	      position = scene.camera.pickEllipsoid(position, ellipsoid);
	      _this.lastMousePos = position;
	    };

	    _this.getGeometry = function () {
	      if (!GeoVis.defined(_this.positions) || _this.positions.length < 2) {
	        return;
	      }
	      var west = 0;
	      var south = 0;
	      var east = 0;
	      var north = 0;
	      var cartographic1 = GeoVis.Cartographic.fromCartesian(_this.positions[0]);
	      var cartographic2 = GeoVis.Cartographic.fromCartesian(_this.positions[1]);
	      if (cartographic1.longitude > cartographic2.longitude) {
	        west = cartographic2.longitude;
	        east = cartographic1.longitude;
	      } else {
	        west = cartographic1.longitude;
	        east = cartographic2.longitude;
	      }

	      if (cartographic1.latitude > cartographic2.latitude) {
	        south = cartographic2.latitude;
	        north = cartographic1.latitude;
	      } else {
	        south = cartographic1.latitude;
	        north = cartographic2.latitude;
	      }
	      return new GeoVis.RectangleGeometry({
	        rectangle: GeoVis.Rectangle.fromRadians(west, south, east, north),
	        rotation: _this.rotation,
	        stRotation: _this.rotation,
	        extrudedHeight: _this.extrudedHeight,
	        height: _this.height,
	        ellipsoid: _this.ellipsoid
	      });
	    };

	    _this.deleted = function () {
	      var editor = _this.drawHelper._editor.getEditor(_this);
	      editor.setEditable(_this, false);
	      _this.drawHelper._tooltip.setVisible(false);
	      _this.drawHelper._primitives.remove(_this);
	      _this.drawHelper.fire("deleted", { entity: _this });
	    };

	    options = (0, _util.copyOptions)(options, _config.defaultRectangleOptions);
	    options.type = _Types2.default.RECTANGLE;
	    _this.appearance = new GeoVis.MaterialAppearance({
	      material: options.material
	    });
	    return _this;
	  }
	  /**
	   * 获取Ractangle的位置
	   * @type {GeoVis.Cartesian3}
	   * @name positions
	   * @memberof Rectangle
	   */


	  _createClass(Rectangle, [{
	    key: "positions",
	    get: function get() {
	      return this._positions;
	    },
	    set: function set(positions) {
	      this._positions = positions;
	      this._createPrimitive = true;
	    }
	    /**
	     * 获取Ractangle的宽度
	     * @type {Number}
	     * @name width
	     * @memberof Rectangle
	     */

	  }, {
	    key: "width",
	    get: function get() {
	      return this._width;
	    },
	    set: function set(width) {
	      this._width = width;
	      this._createPrimitive = true;
	    }
	    /**
	     * 处理Retangle的坐标平移
	     * @param {Vector3} position
	     */

	    /**
	     * 保存Retangle的平移坐标信息
	     * @param {Vector3} position
	     */

	    /**
	     * 通过参数获取初始RectangleGeometry
	     * @return {GeoVis.RectangleGeometry}
	     */

	  }]);

	  return Rectangle;
	}(_ChangeablePrimitive3.default);

	exports.default = Rectangle;

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = pickPosition;
	exports.getPosition = getPosition;
	function pickPosition(scene, event, pickTileset) {
	  var cartesian;
	  if (pickTileset) {
	    cartesian = getPosition(scene, {
	      x: event.windowPosition[0],
	      y: event.windowPosition[1]
	    });
	  } else {
	    cartesian = event.position;
	  }
	  // var cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
	  return cartesian;
	}

	function getPosition(scene, position) {
	  scene.globe.depthTestAgainstTerrain = true;
	  scene.pickTranslucentDepth = true;
	  var cartesian = scene.pickPosition(position);
	  scene.pickTranslucentDepth = false;
	  scene.globe.depthTestAgainstTerrain = false;
	  return cartesian;
	}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


	exports.serializeText = serializeText;
	exports.unserializeText = unserializeText;
	exports.serializeImage = serializeImage;
	exports.unserializeImage = unserializeImage;
	exports.serializeIcon = serializeIcon;
	exports.unserializeIcon = unserializeIcon;
	exports.serializeMarker = serializeMarker;
	exports.unserializeMarker = unserializeMarker;

	var _TextMarker = __webpack_require__(43);

	var _TextMarker2 = _interopRequireDefault(_TextMarker);

	var _ImageMarker = __webpack_require__(48);

	var _ImageMarker2 = _interopRequireDefault(_ImageMarker);

	var _Marker = __webpack_require__(49);

	var _Marker2 = _interopRequireDefault(_Marker);

	var _props = __webpack_require__(33);

	var _Icon = __webpack_require__(50);

	var _Icon2 = _interopRequireDefault(_Icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param {TextMarker} entity
	 */
	function serializeText(entity) {
	  var marker = {};
	  marker.type = entity.type;
	  marker.visible = entity.visible;
	  marker.id = entity.id;
	  marker.align = entity.align;
	  marker.backgroundColor = entity.backgroundColor;
	  marker.color = entity.color;
	  marker.fontFamily = entity.fontFamily;
	  marker.weight = entity.weight;
	  marker.position = entity.position;
	  marker.fontSize = entity.fontSize;
	  marker.italic = entity.italic;
	  marker.text = entity.text;
	  marker.width = entity.width;
	  marker.height = entity.height;
	  marker.borderStyle = entity.borderStyle;
	  marker.borderWidth = entity.borderWidth;
	  marker.borderColor = entity.borderColor;
	  return marker;
	}

	/**
	 *
	 * @param {TextMarker} options
	 */
	function unserializeText(options, drawHelper, mode) {
	  var position = new GeoVis.Cartesian3(options.position.x, options.position.y, options.position.z);
	  var marker = new _TextMarker2.default(position, _extends({}, options, { drawHelper: drawHelper }));
	  if (mode === "3d") {
	    marker.addTo(drawHelper.features);
	  }
	  marker.align = options.align;
	  marker.visible = options.visible;
	  marker.backgroundColor = options.backgroundColor;
	  marker.color = options.color;
	  marker.fontFamily = options.fontFamily;
	  marker.weight = options.weight;
	  marker.position = options.position;
	  marker.fontSize = options.fontSize;
	  marker.italic = options.italic;
	  marker.text = options.text;
	  marker.width = options.width;
	  marker.height = options.height;
	  marker.borderStyle = options.borderStyle || "none";
	  marker.borderWidth = options.borderWidth || "1px";
	  marker.borderColor = options.borderColor || "white";
	  return marker;
	}

	/**
	 *
	 * @param {ImageMarker} entity
	 */
	function serializeImage(entity) {
	  var marker = {};
	  marker.type = entity.type;
	  marker.id = entity.id;
	  marker.visible = entity.visible;
	  marker.position = entity.position;
	  marker.imageUrl = entity.imageUrl;
	  marker.width = entity.width;
	  marker.height = entity.height;
	  return marker;
	}

	/**
	 *
	 * @param {ImageMarker} options
	 */
	function unserializeImage(options, drawHelper, mode) {
	  var position = new GeoVis.Cartesian3(options.position.x, options.position.y, options.position.z);
	  var marker = new _ImageMarker2.default(position, _extends({}, options, { drawHelper: drawHelper }));
	  if (mode === "3d") {
	    marker.addTo(drawHelper.features);
	  }
	  marker.visible = options.visible;
	  return marker;
	}

	var billboardProps = Object.keys({
	  show: true, // true,
	  popup: true,
	  lonlat: true,
	  position: true,
	  pixelOffset: true, // Cartesian2,
	  eyeOffset: true, // Cartesian3,
	  heightReference: true, // HeightReference,
	  horizontalOrigin: true, // HorizontalOrigin,
	  verticalOrigin: true, // VerticalOrigin,
	  scale: true, // number,
	  // image: true, // string,
	  imageSubRegion: true, // BoundingRectangle,
	  color: true, // Color,
	  id: true, // string,
	  rotation: true, // 0.0,
	  width: true, // number,
	  height: true, // number,
	  scaleByDistance: true, // NearFarScalar,
	  translucencyByDistance: true, // NearFarScalar,
	  pixelOffsetScaleByDistance: true, // NearFarScalar,
	  sizeInMeters: true, // false,
	  distanceDisplayCondition: true, // DistanceDisplayCondition,
	  type: true,
	  name: true,
	  props: true,
	  label: true,
	  highLightColor: true,
	  lineType: true,
	  lineWidth: true,
	  mirrorType: true,
	  elevationMode: true,
	  elevationHeight: true,
	  animator: true,
	  vector: true
	});

	function serializeIcon(feature) {
	  var props = billboardProps;
	  var result = {};

	  props.forEach(function (key) {
	    var value = feature[key];
	    if (value !== undefined) {
	      result[key] = (0, _props.saveProp)(key, value);
	    }
	  });
	  if (!feature.vector) {
	    result.image = feature.image.split("/img/")[1];
	  } else {
	    result.image = feature.image;
	  }
	  return result;
	}

	function unserializeIcon(data, drawHelper, mode) {
	  var props = billboardProps;
	  var params = {};
	  props.forEach(function (key) {
	    var value = data[key];
	    if (value !== undefined) {
	      params[key] = (0, _props.loadProp)(key, value);
	    }
	  });
	  if (!data.vector) {
	    params.image = drawHelper.PLOT_SERVER_URL + "/f/raw/png/libcode/img/" + data.image;
	  } else {
	    params.image = data.image;
	  }
	  if (params.animator) {
	    params.show = !params.animator.visible;
	  }

	  var icon = new _Icon2.default(params.position, _extends({}, params, {
	    drawHelper: drawHelper
	  }));
	  if (params.layerType) {
	    icon.layerType = params.layerType;
	  }
	  if (params.animator && params.animator.visible) {
	    icon.addAnimate(params.animator);
	  }
	  if (mode === "3d") {
	    icon.addTo(drawHelper.features);
	    icon.setEditable();
	  }
	  return icon;
	}

	function serializeMarker(entity) {
	  var marker = {};
	  marker.type = entity.type;
	  marker.visible = entity.visible;
	  marker.id = entity.id;
	  marker.text = entity.text;
	  marker.textAlign = entity.textAlign;
	  marker.width = entity.width;
	  marker.height = entity.height;
	  marker.lineHeight = entity.lineHeight;
	  marker.fontSize = entity.fontSize;
	  marker.fontWeight = entity.fontWeight;
	  marker.fontFamily = entity.fontFamily;
	  marker.color = entity.color;
	  marker.backgroundColor = entity.backgroundColor;
	  marker.borderColor = entity.borderColor;
	  marker.position = entity.position;
	  return marker;
	}

	function unserializeMarker(options, drawHelper, mode) {
	  var position = new GeoVis.Cartesian3(options.position.x, options.position.y, options.position.z);
	  var marker = new _Marker2.default(position, _extends({}, options, { drawHelper: drawHelper }));
	  if (mode === "3d") {
	    marker.addTo(drawHelper.features);
	  }
	  marker.setEditable();
	  marker.text = options.text;
	  marker.visible = options.visible;
	  marker.textAlign = options.textAlign;
	  marker.borderColor = options.borderColor;
	  marker.backgroundColor = options.backgroundColor;
	  marker.color = options.color;
	  marker.fontFamily = options.fontFamily;
	  marker.fontWeight = options.fontWeight;
	  marker.fontSize = options.fontSize;
	  marker.width = options.width;
	  marker.height = options.height;
	  marker.lineHeight = options.lineHeight;
	  return marker;
	}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Menu = __webpack_require__(44);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _interactjs = __webpack_require__(47);

	var _interactjs2 = _interopRequireDefault(_interactjs);

	var _util = __webpack_require__(45);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// @ts-check

	function createAnchor(_ref) {
	  var left = _ref.left,
	      right = _ref.right,
	      top = _ref.top,
	      bottom = _ref.bottom;

	  var dom = document.createElement("div");
	  dom.className = "geo-anchor";
	  dom.style.left = left;
	  dom.style.right = right;
	  dom.style.top = top;
	  dom.style.bottom = bottom;
	  return dom;
	}

	/**
	 *
	 * @param {HTMLElement} target
	 */
	function isColorPicker(target) {
	  return target.parentElement.classList.contains("pcr-selection") || target.parentElement.parentElement.classList.contains("pcr-app");
	}

	/**
	 *
	 * @return {HTMLDivElement}
	 */
	function createtextEle() {
	  var ele = document.createElement("textarea");
	  ele.className = "geo-marker-input";
	  ele.placeholder = "双击此处编辑文本";
	  return ele;
	}

	var TextMarker = function (_GeoVis$DomMarker) {
	  _inherits(TextMarker, _GeoVis$DomMarker);

	  /**
	   *
	   * @param {LonlatTuple||Cartesian} pos
	   * @param {*} options id,weight
	   */
	  function TextMarker(pos, options) {
	    _classCallCheck(this, TextMarker);

	    var textEle = createtextEle();
	    options.dom = textEle;

	    var _this = _possibleConstructorReturn(this, (TextMarker.__proto__ || Object.getPrototypeOf(TextMarker)).call(this, pos, options));

	    _this.bodyClick = function (e) {
	      e = e || window.event;
	      var target = e.target || e.srcElement;
	      if (!_this.element.contains(target) && !isColorPicker(target)) {
	        _this.disableEdit();
	        _this.disableResize();
	      } else if (_this.element.contains(target)) {
	        _this.enableResize();
	      }
	    };

	    _this.bodydbClick = function (e) {
	      e = e || window.event;
	      var target = e.target || e.srcElement;
	      if (target === _this.textEle) {
	        _this.enableEdit();
	      }
	    };

	    _this.enableEdit = function () {
	      _this.textEle.disabled = false;
	      _this.textEle.focus();
	      _this._menu.visible = true;
	      (0, _util.removeClass)(_this.textEle, "geo-dragble");
	      // this.textEle
	    };

	    _this.disableEdit = function () {
	      _this.textEle.blur();
	      _this.textEle.disabled = true;
	      _this._menu.visible = false;
	      (0, _util.addClass)(_this.textEle, "geo-dragble");
	    };

	    _this.deleted = function () {
	      _this.drawHelper.features.markers.removeMarker(_this);
	      _this.drawHelper.features.map.delete(_this.id);
	      _this.drawHelper.features.remove(_this);
	      document.body.removeEventListener("click", _this.bodyClick);
	      document.body.removeEventListener("dblclick", _this.bodydbClick);
	      _this.drawHelper.fire("deleted", { entity: _this });
	    };

	    _this.name = "文字注记";
	    if (options.id) _this._id = options.id || GeoVis.createGuid();
	    _this._element.className = "geo-resizer";
	    var menu = new _Menu2.default(_this, textEle);
	    _this._menu = menu;
	    _this.textEle = textEle;
	    _this.type = _Types2.default.TEXT_MARKER;
	    _this.drawHelper = options.drawHelper;
	    _this.attachPopup(menu);
	    if (options.weight) _this.weight = options.weight;
	    if (options.color) _this.color = options.color;
	    if (options.backgroundColor) _this.backgroundColor = options.backgroundColor;
	    if (options.italic) _this.italic = options.italic;
	    if (options.align) _this.align = options.align;
	    if (options.fontSize) _this.fontSize = options.fontSize;
	    if (options.fontFamily) _this.fontFamily = options.fontFamily;
	    if (options.name) _this.name = options.name;
	    _this.createAnchors();
	    document.body.addEventListener("click", _this.bodyClick);
	    document.body.addEventListener("dblclick", _this.bodydbClick);
	    // document.body.onclick.addEventListener(this.bodyClick);
	    return _this;
	  }

	  _createClass(TextMarker, [{
	    key: "createAnchors",
	    value: function createAnchors() {
	      this.element.appendChild(createAnchor({ left: "-5px", top: "-5px" }));
	      this.element.appendChild(createAnchor({ left: "-5px", bottom: "-10px" }));
	      this.element.appendChild(createAnchor({ right: "-10px", top: "-5px" }));
	      this.element.appendChild(createAnchor({ right: "-10px", bottom: "-10px" }));
	      // this.element.appendChild(createAnchor({ left: "-5px", top: "-5px" }));
	    }
	  }, {
	    key: "enableResize",
	    value: function enableResize() {
	      // debugger;
	      (0, _util.addClass)(this.element, "geo-resizeble");
	    }
	  }, {
	    key: "disableResize",
	    value: function disableResize() {
	      (0, _util.removeClass)(this.element, "geo-resizeble");
	    }
	  }, {
	    key: "setXY",
	    value: function setXY(x, y) {
	      var ondrag = this.element.getAttribute("ondrag");
	      if (ondrag !== "1") {
	        this.element.style.left = x + "px";
	        this.element.style.bottom = y + "px";
	        if (this.visible) this.enabled = true;
	      } else {
	        var _x = this.element.getAttribute("data-x");
	        var _y = this.element.getAttribute("data-y");
	        var targetX = parseFloat(this.element.style.left.split("px")[0]) + parseFloat(_x);
	        var targetY = parseFloat(this.element.style.bottom.split("px")[0]) - parseFloat(_y);
	        this.updatePosition(targetX, targetY);
	        this.element.setAttribute("data-x", "0");
	        this.element.setAttribute("data-y", "0");
	        this.element.style.left = targetX + "px";
	        this.element.style.bottom = targetY + "px";
	        this.element.style.webkitTransform = this.element.style.transform = "translate(" + 0 + "px, " + 0 + "px)";
	        this.element.setAttribute("ondrag", "0");
	      }
	    }
	  }, {
	    key: "updatePosition",
	    value: function updatePosition(x, y) {
	      var scene = this._features._earth.scene;
	      y = this._features._earth.canvas.height - y;
	      var ray = scene.camera.getPickRay(new GeoVis.Cartesian2(x, y));
	      var cartesian = scene.globe.pick(ray, scene);
	      if (cartesian) this.position = cartesian;
	    }
	  }, {
	    key: "removeFrom",
	    value: function removeFrom(features) {
	      features.markers.removeMarker(this);
	      features.map.delete(this.id);
	      features.drawHelper && features.drawHelper.fire("deleted", { entity: this });
	      document.body.removeEventListener("click", this.bodyClick);
	      document.body.removeEventListener("dblclick", this.bodydbClick);
	      return this;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.removeFrom(this._features);
	    }
	  }, {
	    key: "weight",
	    get: function get() {
	      return this._menu.weight;
	    },
	    set: function set(val) {
	      this._menu.weight = val;
	    }
	  }, {
	    key: "color",
	    get: function get() {
	      return this._menu.color;
	    },
	    set: function set(color) {
	      this._menu.color = color;
	    }
	  }, {
	    key: "backgroundColor",
	    get: function get() {
	      return this._menu.backgroundColor;
	    },
	    set: function set(colorStr) {
	      this._menu.backgroundColor = colorStr;
	    }
	  }, {
	    key: "italic",
	    get: function get() {
	      return this._menu.italic;
	    },
	    set: function set(val) {
	      this._menu.italic = val;
	    }
	  }, {
	    key: "align",
	    get: function get() {
	      return this._menu.align;
	    },
	    set: function set(val) {
	      this._menu.align = val;
	    }
	  }, {
	    key: "fontSize",
	    get: function get() {
	      return this._menu.fontSize;
	    },
	    set: function set(val) {
	      this._menu.fontSize = val;
	    }
	  }, {
	    key: "fontFamily",
	    get: function get() {
	      return this._menu.fontFamily;
	    },
	    set: function set(val) {
	      this._menu.fontFamily = val;
	    }
	  }, {
	    key: "text",
	    get: function get() {
	      return this.textEle.value;
	    },
	    set: function set(val) {
	      this.textEle.value = val;
	    }
	  }, {
	    key: "width",
	    get: function get() {
	      return this._element.style.width;
	    },
	    set: function set(val) {
	      this._element.style.width = val;
	    }
	  }, {
	    key: "height",
	    get: function get() {
	      return this._element.style.height;
	    },
	    set: function set(val) {
	      this._element.style.height = val;
	    }
	  }, {
	    key: "borderColor",
	    get: function get() {
	      return this.textEle.style.borderColor;
	    },
	    set: function set(val) {
	      this.textEle.style.borderColor = val;
	    }
	  }, {
	    key: "borderWidth",
	    get: function get() {
	      return this.textEle.style.borderWidth;
	    },
	    set: function set(val) {
	      this.textEle.style.borderWidth = val;
	    }
	  }, {
	    key: "borderStyle",
	    get: function get() {
	      return this.textEle.style.borderStyle;
	    },
	    set: function set(val) {
	      var style = val === "实线" ? "solid" : val === "虚线" ? "dashed" : val === "点线" ? "dotted" : val === "无" ? "none" : val;
	      this.textEle.style.borderStyle = style;
	    }
	  }]);

	  return TextMarker;
	}(GeoVis.DomMarker);

	function init() {
	  (0, _interactjs2.default)(".geo-resizer").draggable({
	    // enable inertial throwing
	    // inertia: true,
	    // allowFrom: ".geo-dragble",
	    // keep the element within the area of it's parent
	    // restrict: {
	    //   restriction: "parent",
	    //   endOnly: true,
	    //   elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
	    // },
	    // enable autoScroll
	    // autoScroll: true,

	    // call this function on every dragmove event
	    onmove: dragMoveListener,
	    // call this function on every dragend event
	    onend: function onend(event) {
	      // event.preventDefault();
	      event.target.setAttribute("ondrag", "1");
	    }
	  }).resizable({
	    allowFrom: ".geo-anchor",
	    edges: { left: true, right: true, bottom: true, top: true },
	    margin: 1,
	    // keep the edges inside the parent
	    restrictEdges: {
	      outer: "parent",
	      endOnly: true
	    },

	    // minimum size
	    restrictSize: {
	      min: { width: 10, height: 10 }
	    },

	    inertia: false
	  }).on("resizemove", function (event) {

	    var target = event.target;

	    var x = parseFloat(target.getAttribute("data-x")) || 0;

	    var y = parseFloat(target.getAttribute("data-y")) || 0;

	    // update the element's style
	    target.style.width = event.rect.width + "px";
	    target.style.height = event.rect.height + "px";

	    // translate when resizing from top or left edges
	    x += event.deltaRect.left;
	    y += 0;

	    target.style.webkitTransform = target.style.transform = "translate(" + x + "px," + y + "px)";
	    target.setAttribute("data-x", x);
	    target.setAttribute("data-y", y);
	    // target.textContent =
	    //   Math.round(event.rect.width) +
	    //   "\u00D7" +
	    //   Math.round(event.rect.height);
	  });

	  function dragMoveListener(event) {
	    var target = event.target;
	    // keep the dragged position in the data-x/data-y attributes
	    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
	    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
	    // translate the element
	    target.style.webkitTransform = target.style.transform = "translate(" + x + "px, " + y + "px)";
	    // update the posiion attributes
	    target.setAttribute("data-x", x);
	    target.setAttribute("data-y", y);
	  }
	  window.dragMoveListener = dragMoveListener;

	  // interact(".geo-resizer")
	  //   .draggable({
	  //     // ignoreFrom: ".geo-marker-menu .menu",
	  //     allowFrom: ".geo-resizer",
	  //     onmove: window.dragMoveListener,
	  //     restrict: {
	  //       restriction: "parent",
	  //       elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
	  //     }
	  //   })
	}

	init();
	exports.default = TextMarker;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @ts-check

	// import "pickr-widget/dist/pickr.min.css";


	var _util = __webpack_require__(45);

	var _pickr = __webpack_require__(46);

	var _pickr2 = _interopRequireDefault(_pickr);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function renderOptions(start, end, step) {
	  var results = [];
	  while (start < end) {
	    results.push("<option value=\"" + start + "px\">" + start + "px</option>");
	    start += step;
	  }
	  return results;
	}
	var menuStr = "\n<ul class=\"geo-menu\" id=\"uniqName_1_159\" widgetid=\"uniqName_1_159 style=\"top: -265px;position: absolute;\" >\n  <ul class=\"geo-menu-firstLine\">\n    <li class=\"text-tool-icon\" data-name=\"weight\" title=\"\u7C97\u4F53\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-font-weight\"></use></svg></li>\n    <li class=\"text-tool-icon\" data-name=\"italic\" title=\"\u659C\u4F53\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-Italic\"></use></svg></li>\n    <li class=\"text-tool-icon\" data-name=\"bgcolor\" title=\"\u80CC\u666F\u8272\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-background\"></use></svg></li>\n    <li class=\"text-tool-icon\" data-name=\"left\" title=\"\u5DE6\u5BF9\u9F50\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-left-alignment\"></use></svg></li>\n    <li class=\"text-tool-icon\" data-name=\"center\" title=\"\u5C45\u4E2D\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-Middle\"></use></svg></li>\n    <li class=\"text-tool-icon\" data-name=\"right\" title=\"\u53F3\u5BF9\u9F50\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-Right-alignment\"></use></svg></li>\n    <li class=\"text-tool-icon\" data-name=\"remove\" title=\"\u5220\u9664\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-delete\"></use></svg></li>\n  </ul>\n  <ul class=\"geo-menu-secondLine division\">\n    <li data-name=\"fllowGlobe\" title=\"\" style=\"width:60px\">\n      <label class=\"title-label short\">\u5B57\u4F53</label>\n      <li class=\"text-tool-icon\" data-name=\"color\" title=\"\u989C\u8272\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-zitiyanse\"></use></svg></li>\n      <li data-name=\"size\" title=\"\u5B57\u4F53\u5927\u5C0F\" style=\"width:60px;font-size:14px\">\n      <select>\n        " + renderOptions(14, 60, 4) + "\n       </select>\n      </li>\n      <li data-name=\"family\" title=\"\u5B57\u4F53\" style=\"width:60px;font-size:14px\">\n      <select style=\"width:60px;font-size:14px\">\n        <option value=\"\u5B8B\u4F53\">\u5B8B\u4F53</option>\n        <option value=\"\u9ED1\u4F53\">\u9ED1\u4F53</option>\n        <option value=\"\u6977\u4F53\">\u6977\u4F53</option>\n        <option value=\"\u5FAE\u8F6F\u96C5\u9ED1\">\u5FAE\u8F6F\u96C5\u9ED1</option>\n        <option value=\"\u534E\u6587\u7EC6\u9ED1\">\u534E\u6587\u7EC6\u9ED1</option>\n        <option value=\"\u534E\u6587\u65B0\u9B4F\">\u534E\u6587\u65B0\u9B4F</option>\n       </select>\n      </li>\n    </li>\n  </ul>\n\n  <ul class=\"thirdLine division\">\n  <li data-name=\"border\" title=\"\u5B57\u4F53\" style=\"width:60px;font-size:14px\">\n  <label class=\"title-label short\">\u8FB9\u6846</label>\n  </li>\n  <li class=\"text-tool-icon\" data-name=\"borderColor\" title=\"\u8FB9\u6846\u989C\u8272\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon--quanbubiankuang\"></use></svg></li>\n\n  <li data-name=\"borderWidth\" title=\"\u8FB9\u6846\u5BBD\" style=\"width:60px;font-size:14px\">\n  <select>\n    <option value=\"0px\">0px</option>\n    <option value=\"1px\">1px</option>\n    <option value=\"2px\">2px</option>\n    <option value=\"3px\">3px</option>\n    <option value=\"4px\">4px</option>\n   </select>\n  </li>\n    <li data-name=\"borderStyle\" title=\"\u8FB9\u6846\u6837\u5F0F\" style=\"width:60px;font-size:14px\">\n    <select>\n      <option value=\"\u65E0\">\u65E0</option>\n      <option value=\"\u5B9E\u7EBF\">\u5B9E\u7EBF</option>\n      <option value=\"\u865A\u7EBF\">\u865A\u7EBF</option>\n      <option value=\"\u70B9\u7EBF\">\u70B9\u7EBF</option>\n     </select>\n    </li>\n\n  </li>\n</ul>\n</ul>\n";

	// function getElement(root, data){

	// }
	function createColorPickr(ele, changeColor) {
	  return _pickr2.default.create({
	    el: ele,
	    useAsButton: true,
	    components: {
	      // Main components
	      preview: true,
	      opacity: true,
	      hue: true,

	      // Input / output Options
	      interaction: {
	        hex: false,
	        rgba: true,
	        hsla: false,
	        hsva: false,
	        cmyk: false,
	        input: true,
	        clear: false,
	        save: true
	      }
	    },
	    onChange: function onChange(hsva, instance) {
	      changeColor(hsva.toRGBA().toString());
	    }
	  });
	}

	var Menu = function () {
	  /**
	   *
	   * @param {TextMarker} textMarker
	   * @param {HTMLElement} textEle
	   */
	  function Menu(textMarker, textEle) {
	    var _this = this;

	    _classCallCheck(this, Menu);

	    this.handleClick = function (e) {
	      var type = e.target.getAttribute("data-name");
	      if (type === null) {
	        // 点到SVG
	        type = e.target.parentElement.getAttribute("data-name") || e.target.parentElement.parentElement.getAttribute("data-name");
	      }
	      switch (type) {
	        case "weight":
	          _this.weight = !_this.weight;
	          break;
	        case "left":
	          _this.align = "left";
	          break;
	        case "right":
	          _this.align = "right";
	          break;
	        case "center":
	          _this.align = "center";
	          break;
	        case "italic":
	          _this.italic = !_this.italic;
	          break;
	        case "fllowGlobe":
	          _this.fllowGlobe = !_this.fllowGlobe;
	          break;
	        case "remove":
	          _this.textMarker.destroy();
	      }
	      // weight italic color bgcolor left center right remove
	    };

	    this._popup = document.createElement("div");
	    this._popup.className = "geo-marker-menu";
	    this._popup.innerHTML = menuStr;
	    this._popup.onclick = this.handleClick;
	    var colorDom = this.getDomByName("color");
	    this._colorPicker = createColorPickr(colorDom, function (colorStr) {
	      return _this.color = colorStr;
	    });
	    var bgcolorDom = this.getDomByName("bgcolor");
	    this._bgcolorPicker = createColorPickr(bgcolorDom, function (colorStr) {
	      return _this.backgroundColor = colorStr;
	    });

	    this._textEle = textEle;

	    // 字号
	    this._fontSizeSelector = this.getDomByName("size").children[0];
	    this._fontSizeSelector.onchange = function (e) {
	      _this.fontSize = e.target.value;
	    };
	    // 字体
	    this._fontFamilySelector = this.getDomByName("family").children[0];
	    this._fontFamilySelector.onchange = function (e) {
	      _this.fontFamily = e.target.value;
	    };

	    // 边框颜色

	    var bordercolorDom = this.getDomByName("borderColor");
	    this._borderColorPicker = createColorPickr(bordercolorDom, function (colorStr) {
	      return _this.borderColor = colorStr;
	    });

	    // 边框宽
	    this._borderWidthSelector = this.getDomByName("borderWidth").children[0];
	    this._borderWidthSelector.onchange = function (e) {
	      _this.borderWidth = e.target.value;
	    };
	    // 边框样式
	    this._borderStyleSelector = this.getDomByName("borderStyle").children[0];
	    this._borderStyleSelector.onchange = function (e) {
	      _this.borderStyle = e.target.value;
	    };

	    this.textMarker = textMarker;
	    // this._popup.
	    this.visible = false;
	    this.isOpen = false;
	  }

	  _createClass(Menu, [{
	    key: "getDomByName",
	    value: function getDomByName(name) {
	      var elements = this._popup.getElementsByTagName("li");
	      var length = elements.length;
	      var i = 0;
	      while (i < length) {
	        if (elements[i].getAttribute("data-name") === name) {
	          return elements[i];
	        }
	        i++;
	      }
	    }
	  }, {
	    key: "adjust",
	    value: function adjust(markerHeight) {
	      this.element.style.bottom = markerHeight.toFixed(0) + "px";
	    }
	  }, {
	    key: "weight",
	    get: function get() {
	      var li = this.getDomByName("weight");
	      return (0, _util.hasClass)(li, "active");
	    },
	    set: function set(val) {
	      var li = this.getDomByName("weight");
	      if (!val) {
	        (0, _util.removeClass)(li, "active");
	        this._textEle.style.fontWeight = "500";
	      } else {
	        (0, _util.addClass)(li, "active");
	        this._textEle.style.fontWeight = "700";
	      }
	    }
	  }, {
	    key: "color",
	    get: function get() {
	      return this._textEle.style.color;
	    },
	    set: function set(color) {
	      this._textEle.style.color = color;
	    }
	  }, {
	    key: "backgroundColor",
	    get: function get() {
	      return this._textEle.style.backgroundColor;
	    },
	    set: function set(colorStr) {
	      this._textEle.style.backgroundColor = colorStr;
	    }
	  }, {
	    key: "borderColor",
	    get: function get() {
	      return this._textEle.style.borderColor;
	    },
	    set: function set(val) {
	      this._textEle.style.borderColor = val;
	    }
	  }, {
	    key: "borderWidth",
	    get: function get() {
	      return this._textEle.style.borderWidth;
	    },
	    set: function set(val) {
	      this._textEle.style.borderWidth = val;
	    }
	  }, {
	    key: "borderStyle",
	    get: function get() {
	      return this._textEle.style.borderStyle;
	    },
	    set: function set(val) {
	      var style = val === "实线" ? "solid" : val === "虚线" ? "dashed" : val === "点线" ? "dotted" : val === "无" ? "none" : val;
	      this._textEle.style.borderStyle = style;
	    }
	  }, {
	    key: "italic",
	    get: function get() {
	      var li = this.getDomByName("italic");
	      return (0, _util.hasClass)(li, "active");
	    },
	    set: function set(val) {
	      var li = this.getDomByName("italic");
	      if (val) {
	        (0, _util.addClass)(li, "active");
	        this._textEle.style.fontStyle = "italic";
	      } else {
	        (0, _util.removeClass)(li, "active");
	        this._textEle.style.fontStyle = "normal";
	      }
	    }
	  }, {
	    key: "align",
	    get: function get() {
	      var left = this.getDomByName("left");
	      if ((0, _util.hasClass)(left, "active")) return "left";
	      var right = this.getDomByName("right");
	      if ((0, _util.hasClass)(right, "active")) return "right";
	      var center = this.getDomByName("center");
	      if ((0, _util.hasClass)(center, "active")) return "center";
	    },
	    set: function set(val) {
	      this._textEle.style.textAlign = val;
	      var left = this.getDomByName("left");
	      var right = this.getDomByName("right");
	      var center = this.getDomByName("center");
	      (0, _util.removeClass)(right, "active");
	      (0, _util.removeClass)(left, "active");
	      (0, _util.removeClass)(center, "active");
	      switch (val) {
	        case "left":
	          (0, _util.addClass)(left, "active");
	          break;
	        case "center":
	          (0, _util.addClass)(center, "active");
	          break;
	        case "right":
	          (0, _util.addClass)(right, "active");
	          break;
	        default:
	      }
	    }
	  }, {
	    key: "fontSize",
	    get: function get() {
	      return this._textEle.style.fontSize;
	    },
	    set: function set(val) {
	      this._fontSizeSelector.nodeValue = val;
	      this._textEle.style.fontSize = val;
	    }
	  }, {
	    key: "fontFamily",
	    get: function get() {
	      return this._textEle.style.fontFamily;
	    },
	    set: function set(val) {
	      this._fontFamilySelector.nodeValue = val;
	      this._textEle.style.fontFamily = val;
	    }
	  }, {
	    key: "followGlobe",
	    get: function get() {
	      var li = this.getDomByName("followGlobe");
	      return (0, _util.hasClass)(li, "active");
	    },
	    set: function set(val) {
	      var li = this.getDomByName("italic");
	      if (val) {
	        (0, _util.addClass)(li, "active");
	        this._textEle.style.fontStyle = "italic";
	      } else {
	        (0, _util.removeClass)(li, "active");
	        this._textEle.style.fontStyle = "normal";
	      }
	    }
	  }, {
	    key: "element",
	    get: function get() {
	      return this._popup;
	    }
	  }, {
	    key: "visible",
	    get: function get() {
	      return this._popup.style.visibility === "visible";
	    },
	    set: function set(val) {
	      var visible = GeoVis.defined(val) ? val : parseFloat(this._popup.style.opacity) !== 1;
	      if (visible) {
	        this._popup.style.opacity = "1.0";
	        this._popup.style.visibility = "visible";
	        this.isOpen = true;
	      } else {
	        this._popup.style.opacity = "0.0";

	        this._popup.style.visibility = "hidden";
	      }
	    }
	  }]);

	  return Menu;
	}();

	exports.default = Menu;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.hasClass = hasClass;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
	exports.ImageXY = ImageXY;
	exports.GetDeltaPoint = GetDeltaPoint;
	function hasClass(elem, cls) {
	  cls = cls || "";
	  if (cls.replace(/\s/g, "").length === 0) return false; // 当cls没有参数时，返回false
	  return new RegExp(" " + cls + " ").test(" " + elem.className + " ");
	}

	function addClass(ele, cls) {
	  if (!hasClass(ele, cls)) {
	    ele.className = ele.className === "" ? cls : ele.className + " " + cls;
	  }
	}

	function removeClass(ele, cls) {
	  if (hasClass(ele, cls)) {
	    var newClass = " " + ele.className.replace(/[\t\r\n]/g, "") + " ";
	    while (newClass.indexOf(" " + cls + " ") >= 0) {
	      newClass = newClass.replace(" " + cls + " ", " ");
	    }
	    ele.className = newClass.replace(/^\s+|\s+$/g, "");
	  }
	}
	function ImageXY(image) {
	  // 获取图片宽高
	  var pictureXY = [];
	  if (image._dimensions) {
	    pictureXY.push(image._dimensions.x);
	    pictureXY.push(image._dimensions.y);
	  }
	  return pictureXY;
	}
	function GetDeltaPoint(pictureXY, point1, point2) {
	  var carto0 = GeoVis.Cartographic.fromCartesian(point1);
	  var proj0 = proj.project(carto0);
	  var carto1 = GeoVis.Cartographic.fromCartesian(point2);
	  var proj1 = proj.project(carto1);
	  if (carto1.latitude < carto0.latitude) {
	    var latY = proj0.y - pictureXY[1] * Math.abs(proj1.x - proj0.x) / pictureXY[0];
	  } else {
	    latY = proj0.y + pictureXY[1] * Math.abs(proj1.x - proj0.x) / pictureXY[0];
	  }
	  var pointCart = proj.unproject(new GeoVis.Cartesian3(proj1.x, latY, proj1.z));
	  var cartesian1 = GeoVis.Cartesian3.fromRadians(pointCart.longitude, pointCart.latitude, 0);
	  if (carto1.longitude < carto0.longitude) {
	    var lonX = proj0.x - pictureXY[0] * Math.abs(proj1.y - proj0.y) / pictureXY[1];
	  } else {
	    lonX = proj0.x + pictureXY[0] * Math.abs(proj1.y - proj0.y) / pictureXY[1];
	  }
	  pointCart = proj.unproject(new GeoVis.Cartesian3(lonX, proj1.y, proj1.z));
	  var cartesian2 = GeoVis.Cartesian3.fromRadians(pointCart.longitude, pointCart.latitude, 0);
	  if (GeoVis.Cartesian3.distance(cartesian1, point1) >= GeoVis.Cartesian3.distance(cartesian2, point1)) {
	    return cartesian1;
	  } else {
	    return cartesian2;
	  }
	}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Pickr=e():t.Pickr=e()}(window,function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="dist/",n(n.s=1)}([function(t,e,n){},function(t,e,n){"use strict";n.r(e);var o={};n.r(o),n.d(o,"once",function(){return i}),n.d(o,"on",function(){return a}),n.d(o,"off",function(){return c}),n.d(o,"createElementFromString",function(){return u}),n.d(o,"removeAttribute",function(){return l}),n.d(o,"createFromTemplate",function(){return p}),n.d(o,"eventPath",function(){return d}),n.d(o,"adjustableInputNumbers",function(){return h});var r={};n.r(r),n.d(r,"hsvToRgb",function(){return m}),n.d(r,"hsvToHex",function(){return b}),n.d(r,"hsvToCmyk",function(){return _}),n.d(r,"hsvToHsl",function(){return w}),n.d(r,"parseToHSV",function(){return A}),n(0);var i=function(t,e,n,o){return a(t,e,function t(){n.apply(this,arguments),this.removeEventListener(e,t)},o)},a=s.bind(null,"addEventListener"),c=s.bind(null,"removeEventListener");function s(t,e,n,o){var r=4<arguments.length&&void 0!==arguments[4]?arguments[4]:{};return e instanceof HTMLCollection||e instanceof NodeList?e=Array.from(e):Array.isArray(e)||(e=[e]),Array.isArray(n)||(n=[n]),e.forEach(function(e){return n.forEach(function(n){return e[t](n,o,function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){var o,r,i;o=t,i=n[r=e],r in o?Object.defineProperty(o,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):o[r]=i})}return t}({capture:!1},r))})}),Array.prototype.slice.call(arguments,1)}function u(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.firstElementChild}function l(t,e){var n=t.getAttribute(e);return t.removeAttribute(e),n}function p(t){return function t(e){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},o=l(e,"data-con"),r=l(e,"data-key");r&&(n[r]=e);for(var i=Array.from(e.children),a=o?n[o]={}:n,c=0;c<i.length;c++){var s=i[c],u=l(s,"data-arr");u?(a[u]||(a[u]=[])).push(s):t(s,a)}return n}(u(t))}function d(t){var e=t.path||t.composedPath&&t.composedPath();if(e)return e;var n=t.target.parentElement;for(e=[t.target,n];n=n.parentElement;)e.push(n);return e.push(document,window),e}function h(t){var e=!(1<arguments.length&&void 0!==arguments[1])||arguments[1],n=function(t){return"0"<=t&&t<="9"||"-"===t||"."===t};function o(o){for(var r=t.value,i=t.selectionStart,a=i,c="",s=i-1;0<s&&n(r[s]);s--)c=r[s]+c,a--;for(var u=i,l=r.length;u<l&&n(r[u]);u++)c+=r[u];if(0<c.length&&!isNaN(c)&&isFinite(c)){var p=o.deltaY<0?1:-1,d=o.ctrlKey?5*p:p,h=Number(c)+d;!e&&h<0&&(h=0);var f=r.substr(0,a)+h+r.substring(a+c.length,r.length),v=a+String(h).length;t.value=f,t.focus(),t.setSelectionRange(v,v)}o.preventDefault(),t.dispatchEvent(new Event("input"))}a(t,"focus",function(){return a(window,"wheel",o)}),a(t,"blur",function(){return c(window,"wheel",o)})}function f(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],o=!0,r=!1,i=void 0;try{for(var a,c=t[Symbol.iterator]();!(o=(a=c.next()).done)&&(n.push(a.value),!e||n.length!==e);o=!0);}catch(t){r=!0,i=t}finally{try{o||null==c.return||c.return()}finally{if(r)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function v(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var y=Math.min,g=Math.max;function m(t,e,n){t=t/360*6,e/=100,n/=100;var o=Math.floor(t),r=t-o,i=n*(1-e),a=n*(1-r*e),c=n*(1-(1-r)*e),s=o%6;return[255*[n,a,i,i,c,n][s],255*[c,n,n,a,i,i][s],255*[i,i,c,n,n,a][s]]}function b(t,e,n){return m(t,e,n).map(function(t){return Math.round(t).toString(16).padStart(2,"0")})}function _(t,e,n){var o,r=m(t,e,n),i=r[0]/255,a=r[1]/255,c=r[2]/255;return[100*(1===(o=y(1-i,1-a,1-c))?0:(1-i-o)/(1-o)),100*(1===o?0:(1-a-o)/(1-o)),100*(1===o?0:(1-c-o)/(1-o)),100*o]}function w(t,e,n){var o=(2-(e/=100))*(n/=100)/2;return 0!==o&&(e=1===o?0:o<.5?e*n/(2*o):e*n/(2-2*o)),[t,100*e,100*o]}function k(t,e,n){var o,r,i,a=y(t/=255,e/=255,n/=255),c=g(t,e,n),s=c-a;if(i=c,0===s)o=r=0;else{r=s/c;var u=((c-t)/6+s/2)/s,l=((c-e)/6+s/2)/s,p=((c-n)/6+s/2)/s;t===c?o=p-l:e===c?o=1/3+u-p:n===c&&(o=2/3+l-u),o<0?o+=1:1<o&&(o-=1)}return[360*o,100*r,100*i]}function A(t){var e,n,o,r,i,a,c,s,u,l={cmyk:/^cmyk[\D]+(\d+)[\D]+(\d+)[\D]+(\d+)[\D]+(\d+)/i,rgba:/^(rgb|rgba)[\D]+(\d+)[\D]+(\d+)[\D]+(\d+)[\D]*?([\d.]+|$)/i,hsla:/^(hsl|hsla)[\D]+(\d+)[\D]+(\d+)[\D]+(\d+)[\D]*?([\d.]+|$)/i,hsva:/^(hsv|hsva)[\D]+(\d+)[\D]+(\d+)[\D]+(\d+)[\D]*?([\d.]+|$)/i,hex:/^#?(([\dA-Fa-f]{3,4})|([\dA-Fa-f]{6})|([\dA-Fa-f]{8}))$/i},p=function(t){return t.map(function(t){return/^(|\d+)\.\d+|\d+$/.test(t)?Number(t):void 0})};for(var d in l)if(e=l[d].exec(t))switch(d){case"cmyk":var h=f(p(e),5),g=h[1],m=h[2],b=h[3],_=h[4];return 100<g||100<m||100<b||100<_?null:v((a=g,c=m,s=b,u=_,c/=100,s/=100,v(k(255*(1-y(1,(a/=100)*(1-(u/=100))+u)),255*(1-y(1,c*(1-u)+u)),255*(1-y(1,s*(1-u)+u)))))).concat([1]);case"rgba":var w=f(p(e),6),A=w[2],C=w[3],S=w[4],O=w[5],j=void 0===O?1:O;return 255<A||255<C||255<S||j<0||1<j?null:v(k(A,C,S)).concat([j]);case"hex":var x=function(t,e){return[t.substring(0,e),t.substring(e,t.length)]},E=f(e,2)[1];3===E.length?E+="F":6===E.length&&(E+="FF");var H=void 0;if(4===E.length){var R=f(x(E,3).map(function(t){return t+t}),2);E=R[0],H=R[1]}else if(8===E.length){var B=f(x(E,6),2);E=B[0],H=B[1]}return H=parseInt(H,16)/255,v((i=E,k.apply(void 0,v(i.match(/.{2}/g).map(function(t){return parseInt(t,16)}))))).concat([H]);case"hsla":var P=f(p(e),6),L=P[2],D=P[3],T=P[4],F=P[5],M=void 0===F?1:F;return 360<L||100<D||100<T||M<0||1<M?null:v((n=L,o=D,r=T,o/=100,[n,2*(o*=(r/=100)<.5?r:1-r)/(r+o)*100,100*(r+o)])).concat([M]);case"hsva":var N=f(p(e),6),X=N[2],I=N[3],V=N[4],Y=N[5],z=void 0===Y?1:Y;return 360<X||100<I||100<V||z<0||1<z?null:[X,I,V,z]}return null}function C(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,o=3<arguments.length&&void 0!==arguments[3]?arguments[3]:1,i=Math.ceil,a={h:t,s:e,v:n,a:o,toHSVA:function(){var t=[a.h,a.s,a.v],e=t.map(i);return t.toString=function(){return"hsva(".concat(e[0],", ").concat(e[1],"%, ").concat(e[2],"%, ").concat(a.a.toFixed(1),")")},t},toHSLA:function(){var t=w(a.h,a.s,a.v),e=t.map(i);return t.toString=function(){return"hsla(".concat(e[0],", ").concat(e[1],"%, ").concat(e[2],"%, ").concat(a.a.toFixed(1),")")},t},toRGBA:function(){var t=m(a.h,a.s,a.v),e=t.map(i);return t.toString=function(){return"rgba(".concat(e[0],", ").concat(e[1],", ").concat(e[2],", ").concat(a.a.toFixed(1),")")},t},toCMYK:function(){var t=_(a.h,a.s,a.v),e=t.map(i);return t.toString=function(){return"cmyk(".concat(e[0],"%, ").concat(e[1],"%, ").concat(e[2],"%, ").concat(e[3],"%)")},t},toHEX:function(){var t=b.apply(r,[a.h,a.s,a.v]);return t.toString=function(){var e=1<=a.a?"":Number((255*a.a).toFixed(0)).toString(16).toUpperCase().padStart(2,"0");return"#".concat(t.join("").toUpperCase()+e)},t},clone:function(){return C(a.h,a.s,a.v,a.a)}};return a}function S(t){var e={options:Object.assign({lockX:!1,lockY:!1,onchange:function(){return 0}},t),_tapstart:function(t){a(document,["mouseup","touchend","touchcancel"],e._tapstop),a(document,["mousemove","touchmove"],e._tapmove),t.preventDefault(),e.wrapperRect=e.options.wrapper.getBoundingClientRect(),e._tapmove(t)},_tapmove:function(t){var n=e.options,o=e.cache,r=n.element,i=e.wrapperRect,a=0,c=0;if(t){var s=t&&t.touches&&t.touches[0];a=t?(s||t).clientX:0,c=t?(s||t).clientY:0,a<i.left?a=i.left:a>i.left+i.width&&(a=i.left+i.width),c<i.top?c=i.top:c>i.top+i.height&&(c=i.top+i.height),a-=i.left,c-=i.top}else o&&(a=o.x,c=o.y);n.lockX||(r.style.left=a-r.offsetWidth/2+"px"),n.lockY||(r.style.top=c-r.offsetHeight/2+"px"),e.cache={x:a,y:c},n.onchange(a,c)},_tapstop:function(){c(document,["mouseup","touchend","touchcancel"],e._tapstop),c(document,["mousemove","touchmove"],e._tapmove)},trigger:function(){e.wrapperRect=e.options.wrapper.getBoundingClientRect(),e._tapmove()},update:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;e.wrapperRect=e.options.wrapper.getBoundingClientRect(),e._tapmove({clientX:e.wrapperRect.left+t,clientY:e.wrapperRect.top+n})},destroy:function(){var t=e.options,n=e._tapstart;c([t.wrapper,t.element],"mousedown",n),c([t.wrapper,t.element],"touchstart",n,{passive:!1})}};e.wrapperRect=e.options.wrapper.getBoundingClientRect();var n=e.options,o=e._tapstart;return a([n.wrapper,n.element],"mousedown",o),a([n.wrapper,n.element],"touchstart",o,{passive:!1}),e}function O(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function j(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var x=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.options=Object.assign({useAsButton:!1,disabled:!1,comparison:!0,components:{interaction:{}},strings:{},default:"fff",defaultRepresentation:"HEX",position:"middle",adjustableNumbers:!0,showAlways:!1,parent:void 0,closeWithKey:"Escape",onChange:function(){return 0},onSave:function(){return 0}},e),this.options.components.interaction||(this.options.components.interaction={}),this._initializingActive=!0,this._recalc=!0,this._color=new C,this._lastColor=new C,this._preBuild(),this._rePositioningPicker(),this._buildComponents(),this._bindEvents(),this.setColor(this.options.default),this._representation=this.options.defaultRepresentation,this.setColorRepresentation(this._representation),this._initializingActive=!1,this._finalBuild()}var e,n;return e=t,(n=[{key:"_preBuild",value:function(){var t,e,n,o,r,i,a,c=this.options;"string"==typeof c.el&&(c.el=document.querySelector(c.el)),this._root=(e=(t=c).components,n=t.strings,o=t.useAsButton,r=function(t){return t?"":'style="display:none" hidden'},i=p('\n        <div data-key="root" class="pickr">\n        \n            '.concat(o?"":'<div data-key="button" class="pcr-button"></div>','\n\n            <div data-key="app" class="pcr-app">\n                <div class="pcr-selection">\n                    <div data-con="preview" class="pcr-color-preview" ').concat(r(e.preview),'>\n                        <div data-key="lastColor" class="pcr-last-color"></div>\n                        <div data-key="currentColor" class="pcr-current-color"></div>\n                    </div>\n\n                    <div data-con="palette" class="pcr-color-palette">\n                        <div data-key="picker" class="pcr-picker"></div>\n                        <div data-key="palette" class="pcr-palette"></div>\n                    </div>\n\n                    <div data-con="hue" class="pcr-color-chooser" ').concat(r(e.hue),'>\n                        <div data-key="picker" class="pcr-picker"></div>\n                        <div data-key="slider" class="pcr-hue pcr-slider"></div>\n                    </div>\n\n                    <div data-con="opacity" class="pcr-color-opacity" ').concat(r(e.opacity),'>\n                        <div data-key="picker" class="pcr-picker"></div>\n                        <div data-key="slider" class="pcr-opacity pcr-slider"></div>\n                    </div>\n                </div>\n\n                <div data-con="interaction" class="pcr-interaction" ').concat(r(e.interaction),'>\n                    <input data-key="result" class="pcr-result" type="text" spellcheck="false" ').concat(r(e.interaction.input),'>\n\n                    <input data-arr="options" class="pcr-type" data-type="HEX" value="HEX" type="button" ').concat(r(e.interaction.hex),'>\n                    <input data-arr="options" class="pcr-type" data-type="RGBA" value="RGBa" type="button" ').concat(r(e.interaction.rgba),'>\n                    <input data-arr="options" class="pcr-type" data-type="HSLA" value="HSLa" type="button" ').concat(r(e.interaction.hsla),'>\n                    <input data-arr="options" class="pcr-type" data-type="HSVA" value="HSVa" type="button" ').concat(r(e.interaction.hsva),'>\n                    <input data-arr="options" class="pcr-type" data-type="CMYK" value="CMYK" type="button" ').concat(r(e.interaction.cmyk),'>\n\n                    <input data-key="save" class="pcr-save" value="').concat(n.save||"Save",'" type="button" ').concat(r(e.interaction.save),'>\n                    <input data-key="clear" class="pcr-clear" value="').concat(n.clear||"Clear",'" type="button" ').concat(r(e.interaction.clear),">\n                </div>\n            </div>\n        </div>\n    ")),(a=i.interaction).options.find(function(t){return!t.hidden&&!t.classList.add("active")}),a.type=function(){return a.options.find(function(t){return t.classList.contains("active")})},i),c.useAsButton&&(c.parent||(c.parent="body"),this._root.button=c.el),document.body.appendChild(this._root.root)}},{key:"_finalBuild",value:function(){var t=this.options,e=this._root;document.body.removeChild(e.root),t.parent&&("string"==typeof t.parent&&(t.parent=document.querySelector(t.parent)),t.parent.appendChild(e.app)),t.useAsButton||t.el.parentElement.replaceChild(e.root,t.el),t.disabled&&this.disable(),t.comparison||(e.button.style.transition="none",t.useAsButton||(e.preview.lastColor.style.transition="none")),t.showAlways?e.app.classList.add("visible"):this.hide()}},{key:"_buildComponents",value:function(){var t=this,e=this.options.components,n={palette:S({element:t._root.palette.picker,wrapper:t._root.palette.palette,onchange:function(e,n){var o=t._color,r=t._root,i=t.options;o.s=e/this.wrapper.offsetWidth*100,o.v=100-n/this.wrapper.offsetHeight*100,o.v<0&&(o.v=0);var a=o.toRGBA().toString();this.element.style.background=a,this.wrapper.style.background="\n                        linear-gradient(to top, rgba(0, 0, 0, ".concat(o.a,"), transparent), \n                        linear-gradient(to left, hsla(").concat(o.h,", 100%, 50%, ").concat(o.a,"), rgba(255, 255, 255, ").concat(o.a,"))\n                    "),i.comparison||(r.button.style.background=a,i.useAsButton||(r.preview.lastColor.style.background=a)),r.preview.currentColor.style.background=a,t._recalc&&t._updateOutput(),r.button.classList.remove("clear")}}),hue:S({lockX:!0,element:t._root.hue.picker,wrapper:t._root.hue.slider,onchange:function(o,r){e.hue&&(t._color.h=r/this.wrapper.offsetHeight*360,this.element.style.backgroundColor="hsl(".concat(t._color.h,", 100%, 50%)"),n.palette.trigger())}}),opacity:S({lockX:!0,element:t._root.opacity.picker,wrapper:t._root.opacity.slider,onchange:function(n,o){e.opacity&&(t._color.a=Math.round(o/this.wrapper.offsetHeight*100)/100,this.element.style.background="rgba(0, 0, 0, ".concat(t._color.a,")"),t.components.palette.trigger())}}),selectable:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e={options:Object.assign({onchange:function(){return 0},className:"",elements:[]},t),_ontap:function(t){var n=e.options;n.elements.forEach(function(e){return e.classList[t.target===e?"add":"remove"](n.className)}),n.onchange(t)},destroy:function(){c(e.options.elements,"click",this._ontap)}};return a(e.options.elements,"click",e._ontap),e}({elements:t._root.interaction.options,className:"active",onchange:function(e){t._representation=e.target.getAttribute("data-type").toUpperCase(),t._updateOutput()}})};this.components=n}},{key:"_bindEvents",value:function(){var t=this,e=this._root,n=this.options,o=[a(e.interaction.clear,"click",function(){return t._clearColor()}),a(e.preview.lastColor,"click",function(){return t.setHSVA.apply(t,O(t._lastColor.toHSVA()))}),a(e.interaction.save,"click",function(){!t._saveColor()&&!n.showAlways&&t.hide()}),a(e.interaction.result,["keyup","input"],function(e){t._recalc=!1,t.setColor(e.target.value,!0)&&!t._initializingActive&&t.options.onChange(t._color,t),e.stopImmediatePropagation()}),a([e.palette.palette,e.palette.picker,e.hue.slider,e.hue.picker,e.opacity.slider,e.opacity.picker],["mousedown","touchstart"],function(){return t._recalc=!0}),a(window,"resize",function(){return t._rePositioningPicker})];if(!n.showAlways){o.push(a(e.button,"click",function(){return t.isOpen()?t.hide():t.show()}));var r=n.closeWithKey;o.push(a(document,"keyup",function(e){return t.isOpen()&&(e.key===r||e.code===r)&&t.hide()})),o.push(a(document,["touchstart","mousedown"],function(n){t.isOpen()&&!d(n).some(function(t){return t===e.app||t===e.button})&&t.hide()},{capture:!0}))}n.adjustableNumbers&&h(e.interaction.result,!1),this._eventBindings=o}},{key:"_rePositioningPicker",value:function(){var t=this._root,e=this._root.app;if(this.options.parent){var n=t.button.getBoundingClientRect();e.style.position="fixed",e.style.marginLeft="".concat(n.left,"px"),e.style.marginTop="".concat(n.top,"px")}var o=t.button.getBoundingClientRect(),r=e.getBoundingClientRect(),i=e.style;r.bottom>window.innerHeight?i.top="".concat(-r.height-5,"px"):o.bottom+r.height<window.innerHeight&&(i.top="".concat(o.height+5,"px"));var a={left:-r.width+o.width,middle:-r.width/2+o.width/2,right:0},c=parseInt(getComputedStyle(e).left,10),s=a[this.options.position];r.left-c+s<0?s=a.right:r.left-c-s>window.innerWidth&&(s=a.left),i.left="".concat(s,"px")}},{key:"_updateOutput",value:function(){var t,e=this;this._root.interaction.type()&&(this._root.interaction.result.value=(t="to"+e._root.interaction.type().getAttribute("data-type"),"function"==typeof e._color[t]?e._color[t]().toString():"")),this._initializingActive||this.options.onChange(this._color,this)}},{key:"_saveColor",value:function(){var t=this._root,e=t.preview,n=t.button,o=this._color.toRGBA().toString();e.lastColor.style.background=o,this.options.useAsButton||(n.style.background=o),n.classList.remove("clear"),this._lastColor=this._color.clone(),this._initializingActive||this.options.onSave(this._color,this)}},{key:"_clearColor",value:function(){var t=this._root,e=this.options;e.useAsButton||(t.button.style.background="rgba(255, 255, 255, 0.4)"),t.button.classList.add("clear"),e.showAlways||this.hide(),e.onSave(null,this)}},{key:"destroy",value:function(){var t=this;this._eventBindings.forEach(function(t){return c.apply(o,O(t))}),Object.keys(this.components).forEach(function(e){return t.components[e].destroy()})}},{key:"destroyAndRemove",value:function(){this.destroy();var t=this._root.root;t.parentElement.removeChild(t)}},{key:"hide",value:function(){return this._root.app.classList.remove("visible"),this}},{key:"show",value:function(){if(!this.options.disabled)return this._root.app.classList.add("visible"),this._rePositioningPicker(),this}},{key:"isOpen",value:function(){return this._root.app.classList.contains("visible")}},{key:"setHSVA",value:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:360,e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,o=3<arguments.length&&void 0!==arguments[3]?arguments[3]:1,r=4<arguments.length&&void 0!==arguments[4]&&arguments[4],i=this._recalc;if(this._recalc=!1,t<0||360<t||e<0||100<e||n<0||100<n||o<0||1<o)return!1;var a=this.components,c=a.hue,s=a.opacity,u=a.palette,l=c.options.wrapper.offsetHeight*(t/360);c.update(0,l);var p=s.options.wrapper.offsetHeight*o;s.update(0,p);var d=u.options.wrapper,h=d.offsetWidth*(e/100),f=d.offsetHeight*(1-n/100);return u.update(h,f),this._color=new C(t,e,n,o),this._recalc=i,this._recalc&&this._updateOutput(),r||this._saveColor(),!0}},{key:"setColor",value:function(t){var e=1<arguments.length&&void 0!==arguments[1]&&arguments[1];if(null===t)return this._clearColor(),!0;var n=A(t);return n?this.setHSVA.apply(this,O(n).concat([e])):void 0}},{key:"setColorRepresentation",value:function(t){return t=t.toUpperCase(),!!this._root.interaction.options.find(function(e){return e.getAttribute("data-type")===t&&!e.click()})}},{key:"getColorRepresentation",value:function(){return this._representation}},{key:"getColor",value:function(){return this._color}},{key:"getRoot",value:function(){return this._root}},{key:"disable",value:function(){return this.hide(),this.options.disabled=!0,this._root.button.classList.add("disabled"),this}},{key:"enable",value:function(){return this.options.disabled=!1,this._root.button.classList.remove("disabled"),this}}])&&j(e.prototype,n),t}();x.utils={once:i,on:a,off:c,eventPath:d,createElementFromString:u,adjustableInputNumbers:h,removeAttribute:l,createFromTemplate:p},x.create=function(t){return new x(t)},x.version="0.3.1",e.default=x}]).default});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var require;var require;/**
	 * interact.js v1.3.4
	 *
	 * Copyright (c) 2012-2018 Taye Adeyemi <dev@taye.me>
	 * Released under the MIT License.
	 * https://raw.github.com/taye/interact.js/master/LICENSE
	 */
	(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.interact = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	'use strict';

	/*
	 * In a (windowless) server environment this file exports a factory function
	 * that takes the window to use.
	 *
	 *     var interact = require('interact.js')(windowObject);
	 *
	 * See https://github.com/taye/interact.js/issues/187
	 */
	if (typeof window === 'undefined') {
	  module.exports = function (window) {
	    require('./src/utils/window').init(window);

	    return require('./src/index');
	  };
	} else {
	  module.exports = require('./src/index');
	}

	},{"./src/index":19,"./src/utils/window":52}],2:[function(require,module,exports){
	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var extend = require('./utils/extend.js');

	function fireUntilImmediateStopped(event, listeners) {
	  for (var _i = 0; _i < listeners.length; _i++) {
	    var _ref;

	    _ref = listeners[_i];
	    var listener = _ref;

	    if (event.immediatePropagationStopped) {
	      break;
	    }

	    listener(event);
	  }
	}

	var Eventable = function () {
	  function Eventable(options) {
	    _classCallCheck(this, Eventable);

	    this.options = extend({}, options || {});
	  }

	  Eventable.prototype.fire = function fire(event) {
	    var listeners = void 0;
	    var onEvent = 'on' + event.type;
	    var global = this.global;

	    // Interactable#on() listeners
	    if (listeners = this[event.type]) {
	      fireUntilImmediateStopped(event, listeners);
	    }

	    // interactable.onevent listener
	    if (this[onEvent]) {
	      this[onEvent](event);
	    }

	    // interact.on() listeners
	    if (!event.propagationStopped && global && (listeners = global[event.type])) {
	      fireUntilImmediateStopped(event, listeners);
	    }
	  };

	  Eventable.prototype.on = function on(eventType, listener) {
	    // if this type of event was never bound
	    if (this[eventType]) {
	      this[eventType].push(listener);
	    } else {
	      this[eventType] = [listener];
	    }
	  };

	  Eventable.prototype.off = function off(eventType, listener) {
	    // if it is an action event type
	    var eventList = this[eventType];
	    var index = eventList ? eventList.indexOf(listener) : -1;

	    if (index !== -1) {
	      eventList.splice(index, 1);
	    }

	    if (eventList && eventList.length === 0 || !listener) {
	      this[eventType] = undefined;
	    }
	  };

	  return Eventable;
	}();

	module.exports = Eventable;

	},{"./utils/extend.js":41}],3:[function(require,module,exports){
	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var extend = require('./utils/extend');
	var getOriginXY = require('./utils/getOriginXY');
	var defaults = require('./defaultOptions');
	var signals = require('./utils/Signals').new();

	var InteractEvent = function () {
	  /** */
	  function InteractEvent(interaction, event, action, phase, element, related) {
	    var preEnd = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

	    _classCallCheck(this, InteractEvent);

	    var target = interaction.target;
	    var deltaSource = (target && target.options || defaults).deltaSource;
	    var origin = getOriginXY(target, element, action);
	    var starting = phase === 'start';
	    var ending = phase === 'end';
	    var coords = starting ? interaction.startCoords : interaction.curCoords;
	    var prevEvent = interaction.prevEvent;

	    element = element || interaction.element;

	    var page = extend({}, coords.page);
	    var client = extend({}, coords.client);

	    page.x -= origin.x;
	    page.y -= origin.y;

	    client.x -= origin.x;
	    client.y -= origin.y;

	    this.ctrlKey = event.ctrlKey;
	    this.altKey = event.altKey;
	    this.shiftKey = event.shiftKey;
	    this.metaKey = event.metaKey;
	    this.button = event.button;
	    this.buttons = event.buttons;
	    this.target = element;
	    this.currentTarget = element;
	    this.relatedTarget = related || null;
	    this.preEnd = preEnd;
	    this.type = action + (phase || '');
	    this.interaction = interaction;
	    this.interactable = target;

	    this.t0 = starting ? interaction.downTimes[interaction.downTimes.length - 1] : prevEvent.t0;

	    var signalArg = {
	      interaction: interaction,
	      event: event,
	      action: action,
	      phase: phase,
	      element: element,
	      related: related,
	      page: page,
	      client: client,
	      coords: coords,
	      starting: starting,
	      ending: ending,
	      deltaSource: deltaSource,
	      iEvent: this
	    };

	    signals.fire('set-xy', signalArg);

	    if (ending) {
	      // use previous coords when ending
	      this.pageX = prevEvent.pageX;
	      this.pageY = prevEvent.pageY;
	      this.clientX = prevEvent.clientX;
	      this.clientY = prevEvent.clientY;
	    } else {
	      this.pageX = page.x;
	      this.pageY = page.y;
	      this.clientX = client.x;
	      this.clientY = client.y;
	    }

	    this.x0 = interaction.startCoords.page.x - origin.x;
	    this.y0 = interaction.startCoords.page.y - origin.y;
	    this.clientX0 = interaction.startCoords.client.x - origin.x;
	    this.clientY0 = interaction.startCoords.client.y - origin.y;

	    signals.fire('set-delta', signalArg);

	    this.timeStamp = coords.timeStamp;
	    this.dt = interaction.pointerDelta.timeStamp;
	    this.duration = this.timeStamp - this.t0;

	    // speed and velocity in pixels per second
	    this.speed = interaction.pointerDelta[deltaSource].speed;
	    this.velocityX = interaction.pointerDelta[deltaSource].vx;
	    this.velocityY = interaction.pointerDelta[deltaSource].vy;

	    this.swipe = ending || phase === 'inertiastart' ? this.getSwipe() : null;

	    signals.fire('new', signalArg);
	  }

	  InteractEvent.prototype.getSwipe = function getSwipe() {
	    var interaction = this.interaction;

	    if (interaction.prevEvent.speed < 600 || this.timeStamp - interaction.prevEvent.timeStamp > 150) {
	      return null;
	    }

	    var angle = 180 * Math.atan2(interaction.prevEvent.velocityY, interaction.prevEvent.velocityX) / Math.PI;
	    var overlap = 22.5;

	    if (angle < 0) {
	      angle += 360;
	    }

	    var left = 135 - overlap <= angle && angle < 225 + overlap;
	    var up = 225 - overlap <= angle && angle < 315 + overlap;

	    var right = !left && (315 - overlap <= angle || angle < 45 + overlap);
	    var down = !up && 45 - overlap <= angle && angle < 135 + overlap;

	    return {
	      up: up,
	      down: down,
	      left: left,
	      right: right,
	      angle: angle,
	      speed: interaction.prevEvent.speed,
	      velocity: {
	        x: interaction.prevEvent.velocityX,
	        y: interaction.prevEvent.velocityY
	      }
	    };
	  };

	  InteractEvent.prototype.preventDefault = function preventDefault() {};

	  /** */


	  InteractEvent.prototype.stopImmediatePropagation = function stopImmediatePropagation() {
	    this.immediatePropagationStopped = this.propagationStopped = true;
	  };

	  /** */


	  InteractEvent.prototype.stopPropagation = function stopPropagation() {
	    this.propagationStopped = true;
	  };

	  return InteractEvent;
	}();

	signals.on('set-delta', function (_ref) {
	  var iEvent = _ref.iEvent,
	      interaction = _ref.interaction,
	      starting = _ref.starting,
	      deltaSource = _ref.deltaSource;

	  var prevEvent = starting ? iEvent : interaction.prevEvent;

	  if (deltaSource === 'client') {
	    iEvent.dx = iEvent.clientX - prevEvent.clientX;
	    iEvent.dy = iEvent.clientY - prevEvent.clientY;
	  } else {
	    iEvent.dx = iEvent.pageX - prevEvent.pageX;
	    iEvent.dy = iEvent.pageY - prevEvent.pageY;
	  }
	});

	InteractEvent.signals = signals;

	module.exports = InteractEvent;

	},{"./defaultOptions":18,"./utils/Signals":34,"./utils/extend":41,"./utils/getOriginXY":42}],4:[function(require,module,exports){
	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var clone = require('./utils/clone');
	var is = require('./utils/is');
	var events = require('./utils/events');
	var extend = require('./utils/extend');
	var actions = require('./actions/base');
	var scope = require('./scope');
	var Eventable = require('./Eventable');
	var defaults = require('./defaultOptions');
	var signals = require('./utils/Signals').new();

	var _require = require('./utils/domUtils'),
	    getElementRect = _require.getElementRect,
	    nodeContains = _require.nodeContains,
	    trySelector = _require.trySelector,
	    matchesSelector = _require.matchesSelector;

	var _require2 = require('./utils/window'),
	    getWindow = _require2.getWindow;

	var _require3 = require('./utils/arr'),
	    contains = _require3.contains;

	var _require4 = require('./utils/browser'),
	    wheelEvent = _require4.wheelEvent;

	// all set interactables


	scope.interactables = [];

	var Interactable = function () {
	  /** */
	  function Interactable(target, options) {
	    _classCallCheck(this, Interactable);

	    options = options || {};

	    this.target = target;
	    this.events = new Eventable();
	    this._context = options.context || scope.document;
	    this._win = getWindow(trySelector(target) ? this._context : target);
	    this._doc = this._win.document;

	    signals.fire('new', {
	      target: target,
	      options: options,
	      interactable: this,
	      win: this._win
	    });

	    scope.addDocument(this._doc, this._win);

	    scope.interactables.push(this);

	    this.set(options);
	  }

	  Interactable.prototype.setOnEvents = function setOnEvents(action, phases) {
	    var onAction = 'on' + action;

	    if (is.function(phases.onstart)) {
	      this.events[onAction + 'start'] = phases.onstart;
	    }
	    if (is.function(phases.onmove)) {
	      this.events[onAction + 'move'] = phases.onmove;
	    }
	    if (is.function(phases.onend)) {
	      this.events[onAction + 'end'] = phases.onend;
	    }
	    if (is.function(phases.oninertiastart)) {
	      this.events[onAction + 'inertiastart'] = phases.oninertiastart;
	    }

	    return this;
	  };

	  Interactable.prototype.setPerAction = function setPerAction(action, options) {
	    // for all the default per-action options
	    for (var option in options) {
	      // if this option exists for this action
	      if (option in defaults[action]) {
	        // if the option in the options arg is an object value
	        if (is.object(options[option])) {
	          // duplicate the object and merge
	          this.options[action][option] = clone(this.options[action][option] || {});
	          extend(this.options[action][option], options[option]);

	          if (is.object(defaults.perAction[option]) && 'enabled' in defaults.perAction[option]) {
	            this.options[action][option].enabled = options[option].enabled === false ? false : true;
	          }
	        } else if (is.bool(options[option]) && is.object(defaults.perAction[option])) {
	          this.options[action][option].enabled = options[option];
	        } else if (options[option] !== undefined) {
	          // or if it's not undefined, do a plain assignment
	          this.options[action][option] = options[option];
	        }
	      }
	    }
	  };

	  /**
	   * The default function to get an Interactables bounding rect. Can be
	   * overridden using {@link Interactable.rectChecker}.
	   *
	   * @param {Element} [element] The element to measure.
	   * @return {object} The object's bounding rectangle.
	   */


	  Interactable.prototype.getRect = function getRect(element) {
	    element = element || this.target;

	    if (is.string(this.target) && !is.element(element)) {
	      element = this._context.querySelector(this.target);
	    }

	    return getElementRect(element);
	  };

	  /**
	   * Returns or sets the function used to calculate the interactable's
	   * element's rectangle
	   *
	   * @param {function} [checker] A function which returns this Interactable's
	   * bounding rectangle. See {@link Interactable.getRect}
	   * @return {function | object} The checker function or this Interactable
	   */


	  Interactable.prototype.rectChecker = function rectChecker(checker) {
	    if (is.function(checker)) {
	      this.getRect = checker;

	      return this;
	    }

	    if (checker === null) {
	      delete this.options.getRect;

	      return this;
	    }

	    return this.getRect;
	  };

	  Interactable.prototype._backCompatOption = function _backCompatOption(optionName, newValue) {
	    if (trySelector(newValue) || is.object(newValue)) {
	      this.options[optionName] = newValue;

	      for (var _i = 0; _i < actions.names.length; _i++) {
	        var _ref;

	        _ref = actions.names[_i];
	        var action = _ref;

	        this.options[action][optionName] = newValue;
	      }

	      return this;
	    }

	    return this.options[optionName];
	  };

	  /**
	   * Gets or sets the origin of the Interactable's element.  The x and y
	   * of the origin will be subtracted from action event coordinates.
	   *
	   * @param {Element | object | string} [origin] An HTML or SVG Element whose
	   * rect will be used, an object eg. { x: 0, y: 0 } or string 'parent', 'self'
	   * or any CSS selector
	   *
	   * @return {object} The current origin or this Interactable
	   */


	  Interactable.prototype.origin = function origin(newValue) {
	    return this._backCompatOption('origin', newValue);
	  };

	  /**
	   * Returns or sets the mouse coordinate types used to calculate the
	   * movement of the pointer.
	   *
	   * @param {string} [newValue] Use 'client' if you will be scrolling while
	   * interacting; Use 'page' if you want autoScroll to work
	   * @return {string | object} The current deltaSource or this Interactable
	   */


	  Interactable.prototype.deltaSource = function deltaSource(newValue) {
	    if (newValue === 'page' || newValue === 'client') {
	      this.options.deltaSource = newValue;

	      return this;
	    }

	    return this.options.deltaSource;
	  };

	  /**
	   * Gets the selector context Node of the Interactable. The default is
	   * `window.document`.
	   *
	   * @return {Node} The context Node of this Interactable
	   */


	  Interactable.prototype.context = function context() {
	    return this._context;
	  };

	  Interactable.prototype.inContext = function inContext(element) {
	    return this._context === element.ownerDocument || nodeContains(this._context, element);
	  };

	  /**
	   * Calls listeners for the given InteractEvent type bound globally
	   * and directly to this Interactable
	   *
	   * @param {InteractEvent} iEvent The InteractEvent object to be fired on this
	   * Interactable
	   * @return {Interactable} this Interactable
	   */


	  Interactable.prototype.fire = function fire(iEvent) {
	    this.events.fire(iEvent);

	    return this;
	  };

	  Interactable.prototype._onOffMultiple = function _onOffMultiple(method, eventType, listener, options) {
	    if (is.string(eventType) && eventType.search(' ') !== -1) {
	      eventType = eventType.trim().split(/ +/);
	    }

	    if (is.array(eventType)) {
	      for (var _i2 = 0; _i2 < eventType.length; _i2++) {
	        var _ref2;

	        _ref2 = eventType[_i2];
	        var type = _ref2;

	        this[method](type, listener, options);
	      }

	      return true;
	    }

	    if (is.object(eventType)) {
	      for (var prop in eventType) {
	        this[method](prop, eventType[prop], listener);
	      }

	      return true;
	    }
	  };

	  /**
	   * Binds a listener for an InteractEvent, pointerEvent or DOM event.
	   *
	   * @param {string | array | object} eventType  The types of events to listen
	   * for
	   * @param {function} listener   The function event (s)
	   * @param {object | boolean} [options]    options object or useCapture flag
	   * for addEventListener
	   * @return {object} This Interactable
	   */


	  Interactable.prototype.on = function on(eventType, listener, options) {
	    if (this._onOffMultiple('on', eventType, listener, options)) {
	      return this;
	    }

	    if (eventType === 'wheel') {
	      eventType = wheelEvent;
	    }

	    if (contains(Interactable.eventTypes, eventType)) {
	      this.events.on(eventType, listener);
	    }
	    // delegated event for selector
	    else if (is.string(this.target)) {
	        events.addDelegate(this.target, this._context, eventType, listener, options);
	      } else {
	        events.add(this.target, eventType, listener, options);
	      }

	    return this;
	  };

	  /**
	   * Removes an InteractEvent, pointerEvent or DOM event listener
	   *
	   * @param {string | array | object} eventType The types of events that were
	   * listened for
	   * @param {function} listener The listener function to be removed
	   * @param {object | boolean} [options] options object or useCapture flag for
	   * removeEventListener
	   * @return {object} This Interactable
	   */


	  Interactable.prototype.off = function off(eventType, listener, options) {
	    if (this._onOffMultiple('off', eventType, listener, options)) {
	      return this;
	    }

	    if (eventType === 'wheel') {
	      eventType = wheelEvent;
	    }

	    // if it is an action event type
	    if (contains(Interactable.eventTypes, eventType)) {
	      this.events.off(eventType, listener);
	    }
	    // delegated event
	    else if (is.string(this.target)) {
	        events.removeDelegate(this.target, this._context, eventType, listener, options);
	      }
	      // remove listener from this Interatable's element
	      else {
	          events.remove(this.target, eventType, listener, options);
	        }

	    return this;
	  };

	  /**
	   * Reset the options of this Interactable
	   *
	   * @param {object} options The new settings to apply
	   * @return {object} This Interactable
	   */


	  Interactable.prototype.set = function set(options) {
	    if (!is.object(options)) {
	      options = {};
	    }

	    this.options = clone(defaults.base);

	    var perActions = clone(defaults.perAction);

	    for (var actionName in actions.methodDict) {
	      var methodName = actions.methodDict[actionName];

	      this.options[actionName] = clone(defaults[actionName]);

	      this.setPerAction(actionName, perActions);

	      this[methodName](options[actionName]);
	    }

	    for (var _i3 = 0; _i3 < Interactable.settingsMethods.length; _i3++) {
	      var _ref3;

	      _ref3 = Interactable.settingsMethods[_i3];
	      var setting = _ref3;

	      this.options[setting] = defaults.base[setting];

	      if (setting in options) {
	        this[setting](options[setting]);
	      }
	    }

	    signals.fire('set', {
	      options: options,
	      interactable: this
	    });

	    return this;
	  };

	  /**
	   * Remove this interactable from the list of interactables and remove it's
	   * action capabilities and event listeners
	   *
	   * @return {interact}
	   */


	  Interactable.prototype.unset = function unset() {
	    events.remove(this.target, 'all');

	    if (is.string(this.target)) {
	      // remove delegated events
	      for (var type in events.delegatedEvents) {
	        var delegated = events.delegatedEvents[type];

	        if (delegated.selectors[0] === this.target && delegated.contexts[0] === this._context) {

	          delegated.selectors.splice(0, 1);
	          delegated.contexts.splice(0, 1);
	          delegated.listeners.splice(0, 1);

	          // remove the arrays if they are empty
	          if (!delegated.selectors.length) {
	            delegated[type] = null;
	          }
	        }

	        events.remove(this._context, type, events.delegateListener);
	        events.remove(this._context, type, events.delegateUseCapture, true);
	      }
	    } else {
	      events.remove(this, 'all');
	    }

	    signals.fire('unset', { interactable: this });

	    scope.interactables.splice(scope.interactables.indexOf(this), 1);

	    // Stop related interactions when an Interactable is unset
	    for (var _i4 = 0; _i4 < (scope.interactions || []).length; _i4++) {
	      var _ref4;

	      _ref4 = (scope.interactions || [])[_i4];
	      var interaction = _ref4;

	      if (interaction.target === this && interaction.interacting() && !interaction._ending) {
	        interaction.stop();
	      }
	    }

	    return scope.interact;
	  };

	  return Interactable;
	}();

	scope.interactables.indexOfElement = function indexOfElement(target, context) {
	  context = context || scope.document;

	  for (var i = 0; i < this.length; i++) {
	    var interactable = this[i];

	    if (interactable.target === target && interactable._context === context) {
	      return i;
	    }
	  }
	  return -1;
	};

	scope.interactables.get = function interactableGet(element, options, dontCheckInContext) {
	  var ret = this[this.indexOfElement(element, options && options.context)];

	  return ret && (is.string(element) || dontCheckInContext || ret.inContext(element)) ? ret : null;
	};

	scope.interactables.forEachMatch = function (element, callback) {
	  for (var _i5 = 0; _i5 < this.length; _i5++) {
	    var _ref5;

	    _ref5 = this[_i5];
	    var interactable = _ref5;

	    var ret = void 0;

	    if ((is.string(interactable.target)
	    // target is a selector and the element matches
	    ? is.element(element) && matchesSelector(element, interactable.target) :
	    // target is the element
	    element === interactable.target) &&
	    // the element is in context
	    interactable.inContext(element)) {
	      ret = callback(interactable);
	    }

	    if (ret !== undefined) {
	      return ret;
	    }
	  }
	};

	// all interact.js eventTypes
	Interactable.eventTypes = scope.eventTypes = [];

	Interactable.signals = signals;

	Interactable.settingsMethods = ['deltaSource', 'origin', 'preventDefault', 'rectChecker'];

	module.exports = Interactable;

	},{"./Eventable":2,"./actions/base":6,"./defaultOptions":18,"./scope":33,"./utils/Signals":34,"./utils/arr":35,"./utils/browser":36,"./utils/clone":37,"./utils/domUtils":39,"./utils/events":40,"./utils/extend":41,"./utils/is":46,"./utils/window":52}],5:[function(require,module,exports){
	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var scope = require('./scope');
	var utils = require('./utils');
	var events = require('./utils/events');
	var browser = require('./utils/browser');
	var domObjects = require('./utils/domObjects');
	var finder = require('./utils/interactionFinder');
	var signals = require('./utils/Signals').new();

	var listeners = {};
	var methodNames = ['pointerDown', 'pointerMove', 'pointerUp', 'updatePointer', 'removePointer'];

	// for ignoring browser's simulated mouse events
	var prevTouchTime = 0;

	// all active and idle interactions
	scope.interactions = [];

	var Interaction = function () {
	  /** */
	  function Interaction(_ref) {
	    var pointerType = _ref.pointerType;

	    _classCallCheck(this, Interaction);

	    this.target = null; // current interactable being interacted with
	    this.element = null; // the target element of the interactable

	    this.prepared = { // action that's ready to be fired on next move event
	      name: null,
	      axis: null,
	      edges: null
	    };

	    // keep track of added pointers
	    this.pointers = [];
	    this.pointerIds = [];
	    this.downTargets = [];
	    this.downTimes = [];

	    // Previous native pointer move event coordinates
	    this.prevCoords = {
	      page: { x: 0, y: 0 },
	      client: { x: 0, y: 0 },
	      timeStamp: 0
	    };
	    // current native pointer move event coordinates
	    this.curCoords = {
	      page: { x: 0, y: 0 },
	      client: { x: 0, y: 0 },
	      timeStamp: 0
	    };

	    // Starting InteractEvent pointer coordinates
	    this.startCoords = {
	      page: { x: 0, y: 0 },
	      client: { x: 0, y: 0 },
	      timeStamp: 0
	    };

	    // Change in coordinates and time of the pointer
	    this.pointerDelta = {
	      page: { x: 0, y: 0, vx: 0, vy: 0, speed: 0 },
	      client: { x: 0, y: 0, vx: 0, vy: 0, speed: 0 },
	      timeStamp: 0
	    };

	    this.downEvent = null; // pointerdown/mousedown/touchstart event
	    this.downPointer = {};

	    this._eventTarget = null;
	    this._curEventTarget = null;

	    this.prevEvent = null; // previous action event

	    this.pointerIsDown = false;
	    this.pointerWasMoved = false;
	    this._interacting = false;
	    this._ending = false;

	    this.pointerType = pointerType;

	    signals.fire('new', this);

	    scope.interactions.push(this);
	  }

	  Interaction.prototype.pointerDown = function pointerDown(pointer, event, eventTarget) {
	    var pointerIndex = this.updatePointer(pointer, event, true);

	    signals.fire('down', {
	      pointer: pointer,
	      event: event,
	      eventTarget: eventTarget,
	      pointerIndex: pointerIndex,
	      interaction: this
	    });
	  };

	  /**
	   * ```js
	   * interact(target)
	   *   .draggable({
	   *     // disable the default drag start by down->move
	   *     manualStart: true
	   *   })
	   *   // start dragging after the user holds the pointer down
	   *   .on('hold', function (event) {
	   *     var interaction = event.interaction;
	   *
	   *     if (!interaction.interacting()) {
	   *       interaction.start({ name: 'drag' },
	   *                         event.interactable,
	   *                         event.currentTarget);
	   *     }
	   * });
	   * ```
	   *
	   * Start an action with the given Interactable and Element as tartgets. The
	   * action must be enabled for the target Interactable and an appropriate
	   * number of pointers must be held down - 1 for drag/resize, 2 for gesture.
	   *
	   * Use it with `interactable.<action>able({ manualStart: false })` to always
	   * [start actions manually](https://github.com/taye/interact.js/issues/114)
	   *
	   * @param {object} action   The action to be performed - drag, resize, etc.
	   * @param {Interactable} target  The Interactable to target
	   * @param {Element} element The DOM Element to target
	   * @return {object} interact
	   */


	  Interaction.prototype.start = function start(action, target, element) {
	    if (this.interacting() || !this.pointerIsDown || this.pointerIds.length < (action.name === 'gesture' ? 2 : 1)) {
	      return;
	    }

	    // if this interaction had been removed after stopping
	    // add it back
	    if (scope.interactions.indexOf(this) === -1) {
	      scope.interactions.push(this);
	    }

	    utils.copyAction(this.prepared, action);
	    this.target = target;
	    this.element = element;

	    signals.fire('action-start', {
	      interaction: this,
	      event: this.downEvent
	    });
	  };

	  Interaction.prototype.pointerMove = function pointerMove(pointer, event, eventTarget) {
	    if (!this.simulation) {
	      this.updatePointer(pointer);
	      utils.setCoords(this.curCoords, this.pointers);
	    }

	    var duplicateMove = this.curCoords.page.x === this.prevCoords.page.x && this.curCoords.page.y === this.prevCoords.page.y && this.curCoords.client.x === this.prevCoords.client.x && this.curCoords.client.y === this.prevCoords.client.y;

	    var dx = void 0;
	    var dy = void 0;

	    // register movement greater than pointerMoveTolerance
	    if (this.pointerIsDown && !this.pointerWasMoved) {
	      dx = this.curCoords.client.x - this.startCoords.client.x;
	      dy = this.curCoords.client.y - this.startCoords.client.y;

	      this.pointerWasMoved = utils.hypot(dx, dy) > Interaction.pointerMoveTolerance;
	    }

	    var signalArg = {
	      pointer: pointer,
	      pointerIndex: this.getPointerIndex(pointer),
	      event: event,
	      eventTarget: eventTarget,
	      dx: dx,
	      dy: dy,
	      duplicate: duplicateMove,
	      interaction: this,
	      interactingBeforeMove: this.interacting()
	    };

	    if (!duplicateMove) {
	      // set pointer coordinate, time changes and speeds
	      utils.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords);
	    }

	    signals.fire('move', signalArg);

	    if (!duplicateMove) {
	      // if interacting, fire an 'action-move' signal etc
	      if (this.interacting()) {
	        this.doMove(signalArg);
	      }

	      if (this.pointerWasMoved) {
	        utils.copyCoords(this.prevCoords, this.curCoords);
	      }
	    }
	  };

	  /**
	   * ```js
	   * interact(target)
	   *   .draggable(true)
	   *   .on('dragmove', function (event) {
	   *     if (someCondition) {
	   *       // change the snap settings
	   *       event.interactable.draggable({ snap: { targets: [] }});
	   *       // fire another move event with re-calculated snap
	   *       event.interaction.doMove();
	   *     }
	   *   });
	   * ```
	   *
	   * Force a move of the current action at the same coordinates. Useful if
	   * snap/restrict has been changed and you want a movement with the new
	   * settings.
	   */


	  Interaction.prototype.doMove = function doMove(signalArg) {
	    signalArg = utils.extend({
	      pointer: this.pointers[0],
	      event: this.prevEvent,
	      eventTarget: this._eventTarget,
	      interaction: this
	    }, signalArg || {});

	    signals.fire('before-action-move', signalArg);

	    if (!this._dontFireMove) {
	      signals.fire('action-move', signalArg);
	    }

	    this._dontFireMove = false;
	  };

	  // End interact move events and stop auto-scroll unless simulation is running


	  Interaction.prototype.pointerUp = function pointerUp(pointer, event, eventTarget, curEventTarget) {
	    var pointerIndex = this.getPointerIndex(pointer);

	    signals.fire(/cancel$/i.test(event.type) ? 'cancel' : 'up', {
	      pointer: pointer,
	      pointerIndex: pointerIndex,
	      event: event,
	      eventTarget: eventTarget,
	      curEventTarget: curEventTarget,
	      interaction: this
	    });

	    if (!this.simulation) {
	      this.end(event);
	    }

	    this.pointerIsDown = false;
	    this.removePointer(pointer, event);
	  };

	  /**
	   * ```js
	   * interact(target)
	   *   .draggable(true)
	   *   .on('move', function (event) {
	   *     if (event.pageX > 1000) {
	   *       // end the current action
	   *       event.interaction.end();
	   *       // stop all further listeners from being called
	   *       event.stopImmediatePropagation();
	   *     }
	   *   });
	   * ```
	   *
	   * Stop the current action and fire an end event. Inertial movement does
	   * not happen.
	   *
	   * @param {PointerEvent} [event]
	   */


	  Interaction.prototype.end = function end(event) {
	    this._ending = true;

	    event = event || this.prevEvent;

	    if (this.interacting()) {
	      signals.fire('action-end', {
	        event: event,
	        interaction: this
	      });
	    }

	    this.stop();
	    this._ending = false;
	  };

	  Interaction.prototype.currentAction = function currentAction() {
	    return this._interacting ? this.prepared.name : null;
	  };

	  Interaction.prototype.interacting = function interacting() {
	    return this._interacting;
	  };

	  /** */


	  Interaction.prototype.stop = function stop() {
	    signals.fire('stop', { interaction: this });

	    if (this._interacting) {
	      signals.fire('stop-active', { interaction: this });
	      signals.fire('stop-' + this.prepared.name, { interaction: this });
	    }

	    this.target = this.element = null;

	    this._interacting = false;
	    this.prepared.name = this.prevEvent = null;
	  };

	  Interaction.prototype.getPointerIndex = function getPointerIndex(pointer) {
	    // mouse and pen interactions may have only one pointer
	    if (this.pointerType === 'mouse' || this.pointerType === 'pen') {
	      return 0;
	    }

	    return this.pointerIds.indexOf(utils.getPointerId(pointer));
	  };

	  Interaction.prototype.updatePointer = function updatePointer(pointer, event) {
	    var down = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : event && /(down|start)$/i.test(event.type);

	    var id = utils.getPointerId(pointer);
	    var index = this.getPointerIndex(pointer);

	    if (index === -1) {
	      index = this.pointerIds.length;
	      this.pointerIds[index] = id;
	    }

	    if (down) {
	      signals.fire('update-pointer-down', {
	        pointer: pointer,
	        event: event,
	        down: down,
	        pointerId: id,
	        pointerIndex: index,
	        interaction: this
	      });
	    }

	    this.pointers[index] = pointer;

	    return index;
	  };

	  Interaction.prototype.removePointer = function removePointer(pointer, event) {
	    var index = this.getPointerIndex(pointer);

	    if (index === -1) {
	      return;
	    }

	    signals.fire('remove-pointer', {
	      pointer: pointer,
	      event: event,
	      pointerIndex: index,
	      interaction: this
	    });

	    this.pointers.splice(index, 1);
	    this.pointerIds.splice(index, 1);
	    this.downTargets.splice(index, 1);
	    this.downTimes.splice(index, 1);
	  };

	  Interaction.prototype._updateEventTargets = function _updateEventTargets(target, currentTarget) {
	    this._eventTarget = target;
	    this._curEventTarget = currentTarget;
	  };

	  return Interaction;
	}();

	for (var _i = 0; _i < methodNames.length; _i++) {
	  var method = methodNames[_i];
	  listeners[method] = doOnInteractions(method);
	}

	function doOnInteractions(method) {
	  return function (event) {
	    var pointerType = utils.getPointerType(event);

	    var _utils$getEventTarget = utils.getEventTargets(event),
	        eventTarget = _utils$getEventTarget[0],
	        curEventTarget = _utils$getEventTarget[1];

	    var matches = []; // [ [pointer, interaction], ...]

	    if (browser.supportsTouch && /touch/.test(event.type)) {
	      prevTouchTime = new Date().getTime();

	      for (var _i2 = 0; _i2 < event.changedTouches.length; _i2++) {
	        var _ref2;

	        _ref2 = event.changedTouches[_i2];
	        var changedTouch = _ref2;

	        var pointer = changedTouch;
	        var interaction = finder.search(pointer, event.type, eventTarget);

	        matches.push([pointer, interaction || new Interaction({ pointerType: pointerType })]);
	      }
	    } else {
	      var invalidPointer = false;

	      if (!browser.supportsPointerEvent && /mouse/.test(event.type)) {
	        // ignore mouse events while touch interactions are active
	        for (var i = 0; i < scope.interactions.length && !invalidPointer; i++) {
	          invalidPointer = scope.interactions[i].pointerType !== 'mouse' && scope.interactions[i].pointerIsDown;
	        }

	        // try to ignore mouse events that are simulated by the browser
	        // after a touch event
	        invalidPointer = invalidPointer || new Date().getTime() - prevTouchTime < 500
	        // on iOS and Firefox Mobile, MouseEvent.timeStamp is zero if simulated
	        || event.timeStamp === 0;
	      }

	      if (!invalidPointer) {
	        var _interaction = finder.search(event, event.type, eventTarget);

	        if (!_interaction) {
	          _interaction = new Interaction({ pointerType: pointerType });
	        }

	        matches.push([event, _interaction]);
	      }
	    }

	    for (var _i3 = 0; _i3 < matches.length; _i3++) {
	      var _ref3 = matches[_i3];
	      var _pointer = _ref3[0];
	      var _interaction2 = _ref3[1];

	      _interaction2._updateEventTargets(eventTarget, curEventTarget);
	      _interaction2[method](_pointer, event, eventTarget, curEventTarget);
	    }
	  };
	}

	function endAll(event) {
	  for (var _i4 = 0; _i4 < scope.interactions.length; _i4++) {
	    var _ref4;

	    _ref4 = scope.interactions[_i4];
	    var interaction = _ref4;

	    interaction.end(event);
	    signals.fire('endall', { event: event, interaction: interaction });
	  }
	}

	var docEvents = {/* 'eventType': listenerFunc */};
	var pEventTypes = browser.pEventTypes;

	if (domObjects.PointerEvent) {
	  docEvents[pEventTypes.down] = listeners.pointerDown;
	  docEvents[pEventTypes.move] = listeners.pointerMove;
	  docEvents[pEventTypes.up] = listeners.pointerUp;
	  docEvents[pEventTypes.cancel] = listeners.pointerUp;
	} else {
	  docEvents.mousedown = listeners.pointerDown;
	  docEvents.mousemove = listeners.pointerMove;
	  docEvents.mouseup = listeners.pointerUp;

	  docEvents.touchstart = listeners.pointerDown;
	  docEvents.touchmove = listeners.pointerMove;
	  docEvents.touchend = listeners.pointerUp;
	  docEvents.touchcancel = listeners.pointerUp;
	}

	docEvents.blur = endAll;

	function onDocSignal(_ref5, signalName) {
	  var doc = _ref5.doc;

	  var eventMethod = signalName.indexOf('add') === 0 ? events.add : events.remove;

	  // delegate event listener
	  for (var eventType in scope.delegatedEvents) {
	    eventMethod(doc, eventType, events.delegateListener);
	    eventMethod(doc, eventType, events.delegateUseCapture, true);
	  }

	  for (var _eventType in docEvents) {
	    eventMethod(doc, _eventType, docEvents[_eventType], browser.isIOS ? { passive: false } : undefined);
	  }
	}

	signals.on('update-pointer-down', function (_ref6) {
	  var interaction = _ref6.interaction,
	      pointer = _ref6.pointer,
	      pointerId = _ref6.pointerId,
	      pointerIndex = _ref6.pointerIndex,
	      event = _ref6.event,
	      eventTarget = _ref6.eventTarget,
	      down = _ref6.down;

	  interaction.pointerIds[pointerIndex] = pointerId;
	  interaction.pointers[pointerIndex] = pointer;

	  if (down) {
	    interaction.pointerIsDown = true;
	  }

	  if (!interaction.interacting()) {
	    utils.setCoords(interaction.startCoords, interaction.pointers);

	    utils.copyCoords(interaction.curCoords, interaction.startCoords);
	    utils.copyCoords(interaction.prevCoords, interaction.startCoords);

	    interaction.downEvent = event;
	    interaction.downTimes[pointerIndex] = interaction.curCoords.timeStamp;
	    interaction.downTargets[pointerIndex] = eventTarget || event && utils.getEventTargets(event)[0];
	    interaction.pointerWasMoved = false;

	    utils.pointerExtend(interaction.downPointer, pointer);
	  }
	});

	scope.signals.on('add-document', onDocSignal);
	scope.signals.on('remove-document', onDocSignal);

	Interaction.pointerMoveTolerance = 1;
	Interaction.doOnInteractions = doOnInteractions;
	Interaction.endAll = endAll;
	Interaction.signals = signals;
	Interaction.docEvents = docEvents;

	scope.endAllInteractions = endAll;

	module.exports = Interaction;

	},{"./scope":33,"./utils":44,"./utils/Signals":34,"./utils/browser":36,"./utils/domObjects":38,"./utils/events":40,"./utils/interactionFinder":45}],6:[function(require,module,exports){
	'use strict';

	var Interaction = require('../Interaction');
	var InteractEvent = require('../InteractEvent');

	var actions = {
	  firePrepared: firePrepared,
	  names: [],
	  methodDict: {}
	};

	Interaction.signals.on('action-start', function (_ref) {
	  var interaction = _ref.interaction,
	      event = _ref.event;

	  interaction._interacting = true;
	  firePrepared(interaction, event, 'start');
	});

	Interaction.signals.on('action-move', function (_ref2) {
	  var interaction = _ref2.interaction,
	      event = _ref2.event,
	      preEnd = _ref2.preEnd;

	  firePrepared(interaction, event, 'move', preEnd);

	  // if the action was ended in a listener
	  if (!interaction.interacting()) {
	    return false;
	  }
	});

	Interaction.signals.on('action-end', function (_ref3) {
	  var interaction = _ref3.interaction,
	      event = _ref3.event;

	  firePrepared(interaction, event, 'end');
	});

	function firePrepared(interaction, event, phase, preEnd) {
	  var actionName = interaction.prepared.name;

	  var newEvent = new InteractEvent(interaction, event, actionName, phase, interaction.element, null, preEnd);

	  interaction.target.fire(newEvent);
	  interaction.prevEvent = newEvent;
	}

	module.exports = actions;

	},{"../InteractEvent":3,"../Interaction":5}],7:[function(require,module,exports){
	'use strict';

	var actions = require('./base');
	var utils = require('../utils');
	var InteractEvent = require('../InteractEvent');
	/** @lends Interactable */
	var Interactable = require('../Interactable');
	var Interaction = require('../Interaction');
	var defaultOptions = require('../defaultOptions');

	var drag = {
	  defaults: {
	    enabled: false,
	    mouseButtons: null,

	    origin: null,
	    snap: null,
	    restrict: null,
	    inertia: null,
	    autoScroll: null,

	    startAxis: 'xy',
	    lockAxis: 'xy'
	  },

	  checker: function checker(pointer, event, interactable) {
	    var dragOptions = interactable.options.drag;

	    return dragOptions.enabled ? { name: 'drag', axis: dragOptions.lockAxis === 'start' ? dragOptions.startAxis : dragOptions.lockAxis } : null;
	  },

	  getCursor: function getCursor() {
	    return 'move';
	  }
	};

	Interaction.signals.on('before-action-move', function (_ref) {
	  var interaction = _ref.interaction;

	  if (interaction.prepared.name !== 'drag') {
	    return;
	  }

	  var axis = interaction.prepared.axis;

	  if (axis === 'x') {
	    interaction.curCoords.page.y = interaction.startCoords.page.y;
	    interaction.curCoords.client.y = interaction.startCoords.client.y;

	    interaction.pointerDelta.page.speed = Math.abs(interaction.pointerDelta.page.vx);
	    interaction.pointerDelta.client.speed = Math.abs(interaction.pointerDelta.client.vx);
	    interaction.pointerDelta.client.vy = 0;
	    interaction.pointerDelta.page.vy = 0;
	  } else if (axis === 'y') {
	    interaction.curCoords.page.x = interaction.startCoords.page.x;
	    interaction.curCoords.client.x = interaction.startCoords.client.x;

	    interaction.pointerDelta.page.speed = Math.abs(interaction.pointerDelta.page.vy);
	    interaction.pointerDelta.client.speed = Math.abs(interaction.pointerDelta.client.vy);
	    interaction.pointerDelta.client.vx = 0;
	    interaction.pointerDelta.page.vx = 0;
	  }
	});

	// dragmove
	InteractEvent.signals.on('new', function (_ref2) {
	  var iEvent = _ref2.iEvent,
	      interaction = _ref2.interaction;

	  if (iEvent.type !== 'dragmove') {
	    return;
	  }

	  var axis = interaction.prepared.axis;

	  if (axis === 'x') {
	    iEvent.pageY = interaction.startCoords.page.y;
	    iEvent.clientY = interaction.startCoords.client.y;
	    iEvent.dy = 0;
	  } else if (axis === 'y') {
	    iEvent.pageX = interaction.startCoords.page.x;
	    iEvent.clientX = interaction.startCoords.client.x;
	    iEvent.dx = 0;
	  }
	});

	/**
	 * ```js
	 * interact(element).draggable({
	 *     onstart: function (event) {},
	 *     onmove : function (event) {},
	 *     onend  : function (event) {},
	 *
	 *     // the axis in which the first movement must be
	 *     // for the drag sequence to start
	 *     // 'xy' by default - any direction
	 *     startAxis: 'x' || 'y' || 'xy',
	 *
	 *     // 'xy' by default - don't restrict to one axis (move in any direction)
	 *     // 'x' or 'y' to restrict movement to either axis
	 *     // 'start' to restrict movement to the axis the drag started in
	 *     lockAxis: 'x' || 'y' || 'xy' || 'start',
	 *
	 *     // max number of drags that can happen concurrently
	 *     // with elements of this Interactable. Infinity by default
	 *     max: Infinity,
	 *
	 *     // max number of drags that can target the same element+Interactable
	 *     // 1 by default
	 *     maxPerElement: 2
	 * });
	 *
	 * var isDraggable = interact('element').draggable(); // true
	 * ```
	 *
	 * Get or set whether drag actions can be performed on the target
	 *
	 * @param {boolean | object} [options] true/false or An object with event
	 * listeners to be fired on drag events (object makes the Interactable
	 * draggable)
	 * @return {boolean | Interactable} boolean indicating if this can be the
	 * target of drag events, or this Interctable
	 */
	Interactable.prototype.draggable = function (options) {
	  if (utils.is.object(options)) {
	    this.options.drag.enabled = options.enabled === false ? false : true;
	    this.setPerAction('drag', options);
	    this.setOnEvents('drag', options);

	    if (/^(xy|x|y|start)$/.test(options.lockAxis)) {
	      this.options.drag.lockAxis = options.lockAxis;
	    }
	    if (/^(xy|x|y)$/.test(options.startAxis)) {
	      this.options.drag.startAxis = options.startAxis;
	    }

	    return this;
	  }

	  if (utils.is.bool(options)) {
	    this.options.drag.enabled = options;

	    if (!options) {
	      this.ondragstart = this.ondragstart = this.ondragend = null;
	    }

	    return this;
	  }

	  return this.options.drag;
	};

	actions.drag = drag;
	actions.names.push('drag');
	utils.merge(Interactable.eventTypes, ['dragstart', 'dragmove', 'draginertiastart', 'draginertiaresume', 'dragend']);
	actions.methodDict.drag = 'draggable';

	defaultOptions.drag = drag.defaults;

	module.exports = drag;

	},{"../InteractEvent":3,"../Interactable":4,"../Interaction":5,"../defaultOptions":18,"../utils":44,"./base":6}],8:[function(require,module,exports){
	'use strict';

	var actions = require('./base');
	var utils = require('../utils');
	var scope = require('../scope');
	/** @lends module:interact */
	var interact = require('../interact');
	var InteractEvent = require('../InteractEvent');
	/** @lends Interactable */
	var Interactable = require('../Interactable');
	var Interaction = require('../Interaction');
	var defaultOptions = require('../defaultOptions');

	var drop = {
	  defaults: {
	    enabled: false,
	    accept: null,
	    overlap: 'pointer'
	  }
	};

	var dynamicDrop = false;

	Interaction.signals.on('action-start', function (_ref) {
	  var interaction = _ref.interaction,
	      event = _ref.event;

	  if (interaction.prepared.name !== 'drag') {
	    return;
	  }

	  // reset active dropzones
	  interaction.activeDrops.dropzones = [];
	  interaction.activeDrops.elements = [];
	  interaction.activeDrops.rects = [];

	  interaction.dropEvents = null;

	  if (!interaction.dynamicDrop) {
	    setActiveDrops(interaction.activeDrops, interaction.element);
	  }

	  var dragEvent = interaction.prevEvent;
	  var dropEvents = getDropEvents(interaction, event, dragEvent);

	  if (dropEvents.activate) {
	    fireActiveDrops(interaction.activeDrops, dropEvents.activate);
	  }
	});

	InteractEvent.signals.on('new', function (_ref2) {
	  var interaction = _ref2.interaction,
	      iEvent = _ref2.iEvent,
	      event = _ref2.event;

	  if (iEvent.type !== 'dragmove' && iEvent.type !== 'dragend') {
	    return;
	  }

	  var draggableElement = interaction.element;
	  var dragEvent = iEvent;
	  var dropResult = getDrop(dragEvent, event, draggableElement);

	  interaction.dropTarget = dropResult.dropzone;
	  interaction.dropElement = dropResult.element;

	  interaction.dropEvents = getDropEvents(interaction, event, dragEvent);
	});

	Interaction.signals.on('action-move', function (_ref3) {
	  var interaction = _ref3.interaction;

	  if (interaction.prepared.name !== 'drag') {
	    return;
	  }

	  fireDropEvents(interaction, interaction.dropEvents);
	});

	Interaction.signals.on('action-end', function (_ref4) {
	  var interaction = _ref4.interaction;

	  if (interaction.prepared.name === 'drag') {
	    fireDropEvents(interaction, interaction.dropEvents);
	  }
	});

	Interaction.signals.on('stop-drag', function (_ref5) {
	  var interaction = _ref5.interaction;

	  interaction.activeDrops = {
	    dropzones: null,
	    elements: null,
	    rects: null
	  };

	  interaction.dropEvents = null;
	});

	function collectDrops(activeDrops, element) {
	  var drops = [];
	  var elements = [];

	  // collect all dropzones and their elements which qualify for a drop
	  for (var _i = 0; _i < scope.interactables.length; _i++) {
	    var _ref6;

	    _ref6 = scope.interactables[_i];
	    var current = _ref6;

	    if (!current.options.drop.enabled) {
	      continue;
	    }

	    var accept = current.options.drop.accept;

	    // test the draggable element against the dropzone's accept setting
	    if (utils.is.element(accept) && accept !== element || utils.is.string(accept) && !utils.matchesSelector(element, accept)) {

	      continue;
	    }

	    // query for new elements if necessary
	    var dropElements = utils.is.string(current.target) ? current._context.querySelectorAll(current.target) : [current.target];

	    for (var _i2 = 0; _i2 < dropElements.length; _i2++) {
	      var _ref7;

	      _ref7 = dropElements[_i2];
	      var currentElement = _ref7;

	      if (currentElement !== element) {
	        drops.push(current);
	        elements.push(currentElement);
	      }
	    }
	  }

	  return {
	    elements: elements,
	    dropzones: drops
	  };
	}

	function fireActiveDrops(activeDrops, event) {
	  var prevElement = void 0;

	  // loop through all active dropzones and trigger event
	  for (var i = 0; i < activeDrops.dropzones.length; i++) {
	    var current = activeDrops.dropzones[i];
	    var currentElement = activeDrops.elements[i];

	    // prevent trigger of duplicate events on same element
	    if (currentElement !== prevElement) {
	      // set current element as event target
	      event.target = currentElement;
	      current.fire(event);
	    }
	    prevElement = currentElement;
	  }
	}

	// Collect a new set of possible drops and save them in activeDrops.
	// setActiveDrops should always be called when a drag has just started or a
	// drag event happens while dynamicDrop is true
	function setActiveDrops(activeDrops, dragElement) {
	  // get dropzones and their elements that could receive the draggable
	  var possibleDrops = collectDrops(activeDrops, dragElement);

	  activeDrops.dropzones = possibleDrops.dropzones;
	  activeDrops.elements = possibleDrops.elements;
	  activeDrops.rects = [];

	  for (var i = 0; i < activeDrops.dropzones.length; i++) {
	    activeDrops.rects[i] = activeDrops.dropzones[i].getRect(activeDrops.elements[i]);
	  }
	}

	function getDrop(dragEvent, event, dragElement) {
	  var interaction = dragEvent.interaction;
	  var validDrops = [];

	  if (dynamicDrop) {
	    setActiveDrops(interaction.activeDrops, dragElement);
	  }

	  // collect all dropzones and their elements which qualify for a drop
	  for (var j = 0; j < interaction.activeDrops.dropzones.length; j++) {
	    var current = interaction.activeDrops.dropzones[j];
	    var currentElement = interaction.activeDrops.elements[j];
	    var rect = interaction.activeDrops.rects[j];

	    validDrops.push(current.dropCheck(dragEvent, event, interaction.target, dragElement, currentElement, rect) ? currentElement : null);
	  }

	  // get the most appropriate dropzone based on DOM depth and order
	  var dropIndex = utils.indexOfDeepestElement(validDrops);

	  return {
	    dropzone: interaction.activeDrops.dropzones[dropIndex] || null,
	    element: interaction.activeDrops.elements[dropIndex] || null
	  };
	}

	function getDropEvents(interaction, pointerEvent, dragEvent) {
	  var dropEvents = {
	    enter: null,
	    leave: null,
	    activate: null,
	    deactivate: null,
	    move: null,
	    drop: null
	  };

	  var tmpl = {
	    dragEvent: dragEvent,
	    interaction: interaction,
	    target: interaction.dropElement,
	    dropzone: interaction.dropTarget,
	    relatedTarget: dragEvent.target,
	    draggable: dragEvent.interactable,
	    timeStamp: dragEvent.timeStamp
	  };

	  if (interaction.dropElement !== interaction.prevDropElement) {
	    // if there was a prevDropTarget, create a dragleave event
	    if (interaction.prevDropTarget) {
	      dropEvents.leave = utils.extend({ type: 'dragleave' }, tmpl);

	      dragEvent.dragLeave = dropEvents.leave.target = interaction.prevDropElement;
	      dragEvent.prevDropzone = dropEvents.leave.dropzone = interaction.prevDropTarget;
	    }
	    // if the dropTarget is not null, create a dragenter event
	    if (interaction.dropTarget) {
	      dropEvents.enter = {
	        dragEvent: dragEvent,
	        interaction: interaction,
	        target: interaction.dropElement,
	        dropzone: interaction.dropTarget,
	        relatedTarget: dragEvent.target,
	        draggable: dragEvent.interactable,
	        timeStamp: dragEvent.timeStamp,
	        type: 'dragenter'
	      };

	      dragEvent.dragEnter = interaction.dropElement;
	      dragEvent.dropzone = interaction.dropTarget;
	    }
	  }

	  if (dragEvent.type === 'dragend' && interaction.dropTarget) {
	    dropEvents.drop = utils.extend({ type: 'drop' }, tmpl);

	    dragEvent.dropzone = interaction.dropTarget;
	    dragEvent.relatedTarget = interaction.dropElement;
	  }
	  if (dragEvent.type === 'dragstart') {
	    dropEvents.activate = utils.extend({ type: 'dropactivate' }, tmpl);

	    dropEvents.activate.target = null;
	    dropEvents.activate.dropzone = null;
	  }
	  if (dragEvent.type === 'dragend') {
	    dropEvents.deactivate = utils.extend({ type: 'dropdeactivate' }, tmpl);

	    dropEvents.deactivate.target = null;
	    dropEvents.deactivate.dropzone = null;
	  }
	  if (dragEvent.type === 'dragmove' && interaction.dropTarget) {
	    dropEvents.move = utils.extend({
	      dragmove: dragEvent,
	      type: 'dropmove'
	    }, tmpl);

	    dragEvent.dropzone = interaction.dropTarget;
	  }

	  return dropEvents;
	}

	function fireDropEvents(interaction, dropEvents) {
	  var activeDrops = interaction.activeDrops,
	      prevDropTarget = interaction.prevDropTarget,
	      dropTarget = interaction.dropTarget,
	      dropElement = interaction.dropElement;


	  if (dropEvents.leave) {
	    prevDropTarget.fire(dropEvents.leave);
	  }
	  if (dropEvents.move) {
	    dropTarget.fire(dropEvents.move);
	  }
	  if (dropEvents.enter) {
	    dropTarget.fire(dropEvents.enter);
	  }
	  if (dropEvents.drop) {
	    dropTarget.fire(dropEvents.drop);
	  }
	  if (dropEvents.deactivate) {
	    fireActiveDrops(activeDrops, dropEvents.deactivate);
	  }

	  interaction.prevDropTarget = dropTarget;
	  interaction.prevDropElement = dropElement;
	}

	/**
	 * ```js
	 * interact(target)
	 * .dropChecker(function(dragEvent,         // related dragmove or dragend event
	 *                       event,             // TouchEvent/PointerEvent/MouseEvent
	 *                       dropped,           // bool result of the default checker
	 *                       dropzone,          // dropzone Interactable
	 *                       dropElement,       // dropzone elemnt
	 *                       draggable,         // draggable Interactable
	 *                       draggableElement) {// draggable element
	 *
	 *   return dropped && event.target.hasAttribute('allow-drop');
	 * }
	 * ```
	 *
	 * ```js
	 * interact('.drop').dropzone({
	 *   accept: '.can-drop' || document.getElementById('single-drop'),
	 *   overlap: 'pointer' || 'center' || zeroToOne
	 * }
	 * ```
	 *
	 * Returns or sets whether draggables can be dropped onto this target to
	 * trigger drop events
	 *
	 * Dropzones can receive the following events:
	 *  - `dropactivate` and `dropdeactivate` when an acceptable drag starts and ends
	 *  - `dragenter` and `dragleave` when a draggable enters and leaves the dropzone
	 *  - `dragmove` when a draggable that has entered the dropzone is moved
	 *  - `drop` when a draggable is dropped into this dropzone
	 *
	 * Use the `accept` option to allow only elements that match the given CSS
	 * selector or element. The value can be:
	 *
	 *  - **an Element** - only that element can be dropped into this dropzone.
	 *  - **a string**, - the element being dragged must match it as a CSS selector.
	 *  - **`null`** - accept options is cleared - it accepts any element.
	 *
	 * Use the `overlap` option to set how drops are checked for. The allowed
	 * values are:
	 *
	 *   - `'pointer'`, the pointer must be over the dropzone (default)
	 *   - `'center'`, the draggable element's center must be over the dropzone
	 *   - a number from 0-1 which is the `(intersection area) / (draggable area)`.
	 *   e.g. `0.5` for drop to happen when half of the area of the draggable is
	 *   over the dropzone
	 *
	 * Use the `checker` option to specify a function to check if a dragged element
	 * is over this Interactable.
	 *
	 * @param {boolean | object | null} [options] The new options to be set.
	 * @return {boolean | Interactable} The current setting or this Interactable
	 */
	Interactable.prototype.dropzone = function (options) {
	  if (utils.is.object(options)) {
	    this.options.drop.enabled = options.enabled === false ? false : true;

	    if (utils.is.function(options.ondrop)) {
	      this.events.ondrop = options.ondrop;
	    }
	    if (utils.is.function(options.ondropactivate)) {
	      this.events.ondropactivate = options.ondropactivate;
	    }
	    if (utils.is.function(options.ondropdeactivate)) {
	      this.events.ondropdeactivate = options.ondropdeactivate;
	    }
	    if (utils.is.function(options.ondragenter)) {
	      this.events.ondragenter = options.ondragenter;
	    }
	    if (utils.is.function(options.ondragleave)) {
	      this.events.ondragleave = options.ondragleave;
	    }
	    if (utils.is.function(options.ondropmove)) {
	      this.events.ondropmove = options.ondropmove;
	    }

	    if (/^(pointer|center)$/.test(options.overlap)) {
	      this.options.drop.overlap = options.overlap;
	    } else if (utils.is.number(options.overlap)) {
	      this.options.drop.overlap = Math.max(Math.min(1, options.overlap), 0);
	    }
	    if ('accept' in options) {
	      this.options.drop.accept = options.accept;
	    }
	    if ('checker' in options) {
	      this.options.drop.checker = options.checker;
	    }

	    return this;
	  }

	  if (utils.is.bool(options)) {
	    this.options.drop.enabled = options;

	    if (!options) {
	      this.ondragenter = this.ondragleave = this.ondrop = this.ondropactivate = this.ondropdeactivate = null;
	    }

	    return this;
	  }

	  return this.options.drop;
	};

	Interactable.prototype.dropCheck = function (dragEvent, event, draggable, draggableElement, dropElement, rect) {
	  var dropped = false;

	  // if the dropzone has no rect (eg. display: none)
	  // call the custom dropChecker or just return false
	  if (!(rect = rect || this.getRect(dropElement))) {
	    return this.options.drop.checker ? this.options.drop.checker(dragEvent, event, dropped, this, dropElement, draggable, draggableElement) : false;
	  }

	  var dropOverlap = this.options.drop.overlap;

	  if (dropOverlap === 'pointer') {
	    var origin = utils.getOriginXY(draggable, draggableElement, 'drag');
	    var page = utils.getPageXY(dragEvent);

	    page.x += origin.x;
	    page.y += origin.y;

	    var horizontal = page.x > rect.left && page.x < rect.right;
	    var vertical = page.y > rect.top && page.y < rect.bottom;

	    dropped = horizontal && vertical;
	  }

	  var dragRect = draggable.getRect(draggableElement);

	  if (dragRect && dropOverlap === 'center') {
	    var cx = dragRect.left + dragRect.width / 2;
	    var cy = dragRect.top + dragRect.height / 2;

	    dropped = cx >= rect.left && cx <= rect.right && cy >= rect.top && cy <= rect.bottom;
	  }

	  if (dragRect && utils.is.number(dropOverlap)) {
	    var overlapArea = Math.max(0, Math.min(rect.right, dragRect.right) - Math.max(rect.left, dragRect.left)) * Math.max(0, Math.min(rect.bottom, dragRect.bottom) - Math.max(rect.top, dragRect.top));

	    var overlapRatio = overlapArea / (dragRect.width * dragRect.height);

	    dropped = overlapRatio >= dropOverlap;
	  }

	  if (this.options.drop.checker) {
	    dropped = this.options.drop.checker(dragEvent, event, dropped, this, dropElement, draggable, draggableElement);
	  }

	  return dropped;
	};

	Interactable.signals.on('unset', function (_ref8) {
	  var interactable = _ref8.interactable;

	  interactable.dropzone(false);
	});

	Interactable.settingsMethods.push('dropChecker');

	Interaction.signals.on('new', function (interaction) {
	  interaction.dropTarget = null; // the dropzone a drag target might be dropped into
	  interaction.dropElement = null; // the element at the time of checking
	  interaction.prevDropTarget = null; // the dropzone that was recently dragged away from
	  interaction.prevDropElement = null; // the element at the time of checking
	  interaction.dropEvents = null; // the dropEvents related to the current drag event

	  interaction.activeDrops = {
	    dropzones: [], // the dropzones that are mentioned below
	    elements: [], // elements of dropzones that accept the target draggable
	    rects: [] // the rects of the elements mentioned above
	  };
	});

	Interaction.signals.on('stop', function (_ref9) {
	  var interaction = _ref9.interaction;

	  interaction.dropTarget = interaction.dropElement = interaction.prevDropTarget = interaction.prevDropElement = null;
	});

	/**
	 * Returns or sets whether the dimensions of dropzone elements are calculated
	 * on every dragmove or only on dragstart for the default dropChecker
	 *
	 * @param {boolean} [newValue] True to check on each move. False to check only
	 * before start
	 * @return {boolean | interact} The current setting or interact
	 */
	interact.dynamicDrop = function (newValue) {
	  if (utils.is.bool(newValue)) {
	    //if (dragging && dynamicDrop !== newValue && !newValue) {
	    //calcRects(dropzones);
	    //}

	    dynamicDrop = newValue;

	    return interact;
	  }
	  return dynamicDrop;
	};

	utils.merge(Interactable.eventTypes, ['dragenter', 'dragleave', 'dropactivate', 'dropdeactivate', 'dropmove', 'drop']);
	actions.methodDict.drop = 'dropzone';

	defaultOptions.drop = drop.defaults;

	module.exports = drop;

	},{"../InteractEvent":3,"../Interactable":4,"../Interaction":5,"../defaultOptions":18,"../interact":21,"../scope":33,"../utils":44,"./base":6}],9:[function(require,module,exports){
	'use strict';

	var actions = require('./base');
	var utils = require('../utils');
	var InteractEvent = require('../InteractEvent');
	var Interactable = require('../Interactable');
	var Interaction = require('../Interaction');
	var defaultOptions = require('../defaultOptions');

	var gesture = {
	  defaults: {
	    enabled: false,
	    origin: null,
	    restrict: null
	  },

	  checker: function checker(pointer, event, interactable, element, interaction) {
	    if (interaction.pointerIds.length >= 2) {
	      return { name: 'gesture' };
	    }

	    return null;
	  },

	  getCursor: function getCursor() {
	    return '';
	  }
	};

	InteractEvent.signals.on('new', function (_ref) {
	  var iEvent = _ref.iEvent,
	      interaction = _ref.interaction;

	  if (iEvent.type !== 'gesturestart') {
	    return;
	  }
	  iEvent.ds = 0;

	  interaction.gesture.startDistance = interaction.gesture.prevDistance = iEvent.distance;
	  interaction.gesture.startAngle = interaction.gesture.prevAngle = iEvent.angle;
	  interaction.gesture.scale = 1;
	});

	InteractEvent.signals.on('new', function (_ref2) {
	  var iEvent = _ref2.iEvent,
	      interaction = _ref2.interaction;

	  if (iEvent.type !== 'gesturemove') {
	    return;
	  }

	  iEvent.ds = iEvent.scale - interaction.gesture.scale;

	  interaction.target.fire(iEvent);

	  interaction.gesture.prevAngle = iEvent.angle;
	  interaction.gesture.prevDistance = iEvent.distance;

	  if (iEvent.scale !== Infinity && iEvent.scale !== null && iEvent.scale !== undefined && !isNaN(iEvent.scale)) {

	    interaction.gesture.scale = iEvent.scale;
	  }
	});

	/**
	 * ```js
	 * interact(element).gesturable({
	 *     onstart: function (event) {},
	 *     onmove : function (event) {},
	 *     onend  : function (event) {},
	 *
	 *     // limit multiple gestures.
	 *     // See the explanation in {@link Interactable.draggable} example
	 *     max: Infinity,
	 *     maxPerElement: 1,
	 * });
	 *
	 * var isGestureable = interact(element).gesturable();
	 * ```
	 *
	 * Gets or sets whether multitouch gestures can be performed on the target
	 *
	 * @param {boolean | object} [options] true/false or An object with event
	 * listeners to be fired on gesture events (makes the Interactable gesturable)
	 * @return {boolean | Interactable} A boolean indicating if this can be the
	 * target of gesture events, or this Interactable
	 */
	Interactable.prototype.gesturable = function (options) {
	  if (utils.is.object(options)) {
	    this.options.gesture.enabled = options.enabled === false ? false : true;
	    this.setPerAction('gesture', options);
	    this.setOnEvents('gesture', options);

	    return this;
	  }

	  if (utils.is.bool(options)) {
	    this.options.gesture.enabled = options;

	    if (!options) {
	      this.ongesturestart = this.ongesturestart = this.ongestureend = null;
	    }

	    return this;
	  }

	  return this.options.gesture;
	};

	InteractEvent.signals.on('set-delta', function (_ref3) {
	  var interaction = _ref3.interaction,
	      iEvent = _ref3.iEvent,
	      action = _ref3.action,
	      event = _ref3.event,
	      starting = _ref3.starting,
	      ending = _ref3.ending,
	      deltaSource = _ref3.deltaSource;

	  if (action !== 'gesture') {
	    return;
	  }

	  var pointers = interaction.pointers;

	  iEvent.touches = [pointers[0], pointers[1]];

	  if (starting) {
	    iEvent.distance = utils.touchDistance(pointers, deltaSource);
	    iEvent.box = utils.touchBBox(pointers);
	    iEvent.scale = 1;
	    iEvent.ds = 0;
	    iEvent.angle = utils.touchAngle(pointers, undefined, deltaSource);
	    iEvent.da = 0;
	  } else if (ending || event instanceof InteractEvent) {
	    iEvent.distance = interaction.prevEvent.distance;
	    iEvent.box = interaction.prevEvent.box;
	    iEvent.scale = interaction.prevEvent.scale;
	    iEvent.ds = iEvent.scale - 1;
	    iEvent.angle = interaction.prevEvent.angle;
	    iEvent.da = iEvent.angle - interaction.gesture.startAngle;
	  } else {
	    iEvent.distance = utils.touchDistance(pointers, deltaSource);
	    iEvent.box = utils.touchBBox(pointers);
	    iEvent.scale = iEvent.distance / interaction.gesture.startDistance;
	    iEvent.angle = utils.touchAngle(pointers, interaction.gesture.prevAngle, deltaSource);

	    iEvent.ds = iEvent.scale - interaction.gesture.prevScale;
	    iEvent.da = iEvent.angle - interaction.gesture.prevAngle;
	  }
	});

	Interaction.signals.on('new', function (interaction) {
	  interaction.gesture = {
	    start: { x: 0, y: 0 },

	    startDistance: 0, // distance between two touches of touchStart
	    prevDistance: 0,
	    distance: 0,

	    scale: 1, // gesture.distance / gesture.startDistance

	    startAngle: 0, // angle of line joining two touches
	    prevAngle: 0 // angle of the previous gesture event
	  };
	});

	actions.gesture = gesture;
	actions.names.push('gesture');
	utils.merge(Interactable.eventTypes, ['gesturestart', 'gesturemove', 'gestureend']);
	actions.methodDict.gesture = 'gesturable';

	defaultOptions.gesture = gesture.defaults;

	module.exports = gesture;

	},{"../InteractEvent":3,"../Interactable":4,"../Interaction":5,"../defaultOptions":18,"../utils":44,"./base":6}],10:[function(require,module,exports){
	'use strict';

	var actions = require('./base');
	var utils = require('../utils');
	var browser = require('../utils/browser');
	var InteractEvent = require('../InteractEvent');
	/** @lends Interactable */
	var Interactable = require('../Interactable');
	var Interaction = require('../Interaction');
	var defaultOptions = require('../defaultOptions');

	// Less Precision with touch input
	var defaultMargin = browser.supportsTouch || browser.supportsPointerEvent ? 20 : 10;

	var resize = {
	  defaults: {
	    enabled: false,
	    mouseButtons: null,

	    origin: null,
	    snap: null,
	    restrict: null,
	    inertia: null,
	    autoScroll: null,

	    square: false,
	    preserveAspectRatio: false,
	    axis: 'xy',

	    // use default margin
	    margin: NaN,

	    // object with props left, right, top, bottom which are
	    // true/false values to resize when the pointer is over that edge,
	    // CSS selectors to match the handles for each direction
	    // or the Elements for each handle
	    edges: null,

	    // a value of 'none' will limit the resize rect to a minimum of 0x0
	    // 'negate' will alow the rect to have negative width/height
	    // 'reposition' will keep the width/height positive by swapping
	    // the top and bottom edges and/or swapping the left and right edges
	    invert: 'none'
	  },

	  checker: function checker(pointer, event, interactable, element, interaction, rect) {
	    if (!rect) {
	      return null;
	    }

	    var page = utils.extend({}, interaction.curCoords.page);
	    var options = interactable.options;

	    if (options.resize.enabled) {
	      var resizeOptions = options.resize;
	      var resizeEdges = { left: false, right: false, top: false, bottom: false };

	      // if using resize.edges
	      if (utils.is.object(resizeOptions.edges)) {
	        for (var edge in resizeEdges) {
	          resizeEdges[edge] = checkResizeEdge(edge, resizeOptions.edges[edge], page, interaction._eventTarget, element, rect, resizeOptions.margin || defaultMargin);
	        }

	        resizeEdges.left = resizeEdges.left && !resizeEdges.right;
	        resizeEdges.top = resizeEdges.top && !resizeEdges.bottom;

	        if (resizeEdges.left || resizeEdges.right || resizeEdges.top || resizeEdges.bottom) {
	          return {
	            name: 'resize',
	            edges: resizeEdges
	          };
	        }
	      } else {
	        var right = options.resize.axis !== 'y' && page.x > rect.right - defaultMargin;
	        var bottom = options.resize.axis !== 'x' && page.y > rect.bottom - defaultMargin;

	        if (right || bottom) {
	          return {
	            name: 'resize',
	            axes: (right ? 'x' : '') + (bottom ? 'y' : '')
	          };
	        }
	      }
	    }

	    return null;
	  },

	  cursors: browser.isIe9 ? {
	    x: 'e-resize',
	    y: 's-resize',
	    xy: 'se-resize',

	    top: 'n-resize',
	    left: 'w-resize',
	    bottom: 's-resize',
	    right: 'e-resize',
	    topleft: 'se-resize',
	    bottomright: 'se-resize',
	    topright: 'ne-resize',
	    bottomleft: 'ne-resize'
	  } : {
	    x: 'ew-resize',
	    y: 'ns-resize',
	    xy: 'nwse-resize',

	    top: 'ns-resize',
	    left: 'ew-resize',
	    bottom: 'ns-resize',
	    right: 'ew-resize',
	    topleft: 'nwse-resize',
	    bottomright: 'nwse-resize',
	    topright: 'nesw-resize',
	    bottomleft: 'nesw-resize'
	  },

	  getCursor: function getCursor(action) {
	    if (action.axis) {
	      return resize.cursors[action.name + action.axis];
	    } else if (action.edges) {
	      var cursorKey = '';
	      var edgeNames = ['top', 'bottom', 'left', 'right'];

	      for (var i = 0; i < 4; i++) {
	        if (action.edges[edgeNames[i]]) {
	          cursorKey += edgeNames[i];
	        }
	      }

	      return resize.cursors[cursorKey];
	    }
	  }
	};

	// resizestart
	InteractEvent.signals.on('new', function (_ref) {
	  var iEvent = _ref.iEvent,
	      interaction = _ref.interaction;

	  if (iEvent.type !== 'resizestart' || !interaction.prepared.edges) {
	    return;
	  }

	  var startRect = interaction.target.getRect(interaction.element);
	  var resizeOptions = interaction.target.options.resize;

	  /*
	   * When using the `resizable.square` or `resizable.preserveAspectRatio` options, resizing from one edge
	   * will affect another. E.g. with `resizable.square`, resizing to make the right edge larger will make
	   * the bottom edge larger by the same amount. We call these 'linked' edges. Any linked edges will depend
	   * on the active edges and the edge being interacted with.
	   */
	  if (resizeOptions.square || resizeOptions.preserveAspectRatio) {
	    var linkedEdges = utils.extend({}, interaction.prepared.edges);

	    linkedEdges.top = linkedEdges.top || linkedEdges.left && !linkedEdges.bottom;
	    linkedEdges.left = linkedEdges.left || linkedEdges.top && !linkedEdges.right;
	    linkedEdges.bottom = linkedEdges.bottom || linkedEdges.right && !linkedEdges.top;
	    linkedEdges.right = linkedEdges.right || linkedEdges.bottom && !linkedEdges.left;

	    interaction.prepared._linkedEdges = linkedEdges;
	  } else {
	    interaction.prepared._linkedEdges = null;
	  }

	  // if using `resizable.preserveAspectRatio` option, record aspect ratio at the start of the resize
	  if (resizeOptions.preserveAspectRatio) {
	    interaction.resizeStartAspectRatio = startRect.width / startRect.height;
	  }

	  interaction.resizeRects = {
	    start: startRect,
	    current: utils.extend({}, startRect),
	    inverted: utils.extend({}, startRect),
	    previous: utils.extend({}, startRect),
	    delta: {
	      left: 0, right: 0, width: 0,
	      top: 0, bottom: 0, height: 0
	    }
	  };

	  iEvent.rect = interaction.resizeRects.inverted;
	  iEvent.deltaRect = interaction.resizeRects.delta;
	});

	// resizemove
	InteractEvent.signals.on('new', function (_ref2) {
	  var iEvent = _ref2.iEvent,
	      phase = _ref2.phase,
	      interaction = _ref2.interaction;

	  if (phase !== 'move' || !interaction.prepared.edges) {
	    return;
	  }

	  var resizeOptions = interaction.target.options.resize;
	  var invert = resizeOptions.invert;
	  var invertible = invert === 'reposition' || invert === 'negate';

	  var edges = interaction.prepared.edges;

	  var start = interaction.resizeRects.start;
	  var current = interaction.resizeRects.current;
	  var inverted = interaction.resizeRects.inverted;
	  var delta = interaction.resizeRects.delta;
	  var previous = utils.extend(interaction.resizeRects.previous, inverted);
	  var originalEdges = edges;

	  var dx = iEvent.dx;
	  var dy = iEvent.dy;

	  if (resizeOptions.preserveAspectRatio || resizeOptions.square) {
	    // `resize.preserveAspectRatio` takes precedence over `resize.square`
	    var startAspectRatio = resizeOptions.preserveAspectRatio ? interaction.resizeStartAspectRatio : 1;

	    edges = interaction.prepared._linkedEdges;

	    if (originalEdges.left && originalEdges.bottom || originalEdges.right && originalEdges.top) {
	      dy = -dx / startAspectRatio;
	    } else if (originalEdges.left || originalEdges.right) {
	      dy = dx / startAspectRatio;
	    } else if (originalEdges.top || originalEdges.bottom) {
	      dx = dy * startAspectRatio;
	    }
	  }

	  // update the 'current' rect without modifications
	  if (edges.top) {
	    current.top += dy;
	  }
	  if (edges.bottom) {
	    current.bottom += dy;
	  }
	  if (edges.left) {
	    current.left += dx;
	  }
	  if (edges.right) {
	    current.right += dx;
	  }

	  if (invertible) {
	    // if invertible, copy the current rect
	    utils.extend(inverted, current);

	    if (invert === 'reposition') {
	      // swap edge values if necessary to keep width/height positive
	      var swap = void 0;

	      if (inverted.top > inverted.bottom) {
	        swap = inverted.top;

	        inverted.top = inverted.bottom;
	        inverted.bottom = swap;
	      }
	      if (inverted.left > inverted.right) {
	        swap = inverted.left;

	        inverted.left = inverted.right;
	        inverted.right = swap;
	      }
	    }
	  } else {
	    // if not invertible, restrict to minimum of 0x0 rect
	    inverted.top = Math.min(current.top, start.bottom);
	    inverted.bottom = Math.max(current.bottom, start.top);
	    inverted.left = Math.min(current.left, start.right);
	    inverted.right = Math.max(current.right, start.left);
	  }

	  inverted.width = inverted.right - inverted.left;
	  inverted.height = inverted.bottom - inverted.top;

	  for (var edge in inverted) {
	    delta[edge] = inverted[edge] - previous[edge];
	  }

	  iEvent.edges = interaction.prepared.edges;
	  iEvent.rect = inverted;
	  iEvent.deltaRect = delta;
	});

	/**
	 * ```js
	 * interact(element).resizable({
	 *   onstart: function (event) {},
	 *   onmove : function (event) {},
	 *   onend  : function (event) {},
	 *
	 *   edges: {
	 *     top   : true,       // Use pointer coords to check for resize.
	 *     left  : false,      // Disable resizing from left edge.
	 *     bottom: '.resize-s',// Resize if pointer target matches selector
	 *     right : handleEl    // Resize if pointer target is the given Element
	 *   },
	 *
	 *     // Width and height can be adjusted independently. When `true`, width and
	 *     // height are adjusted at a 1:1 ratio.
	 *     square: false,
	 *
	 *     // Width and height can be adjusted independently. When `true`, width and
	 *     // height maintain the aspect ratio they had when resizing started.
	 *     preserveAspectRatio: false,
	 *
	 *   // a value of 'none' will limit the resize rect to a minimum of 0x0
	 *   // 'negate' will allow the rect to have negative width/height
	 *   // 'reposition' will keep the width/height positive by swapping
	 *   // the top and bottom edges and/or swapping the left and right edges
	 *   invert: 'none' || 'negate' || 'reposition'
	 *
	 *   // limit multiple resizes.
	 *   // See the explanation in the {@link Interactable.draggable} example
	 *   max: Infinity,
	 *   maxPerElement: 1,
	 * });
	 *
	 * var isResizeable = interact(element).resizable();
	 * ```
	 *
	 * Gets or sets whether resize actions can be performed on the target
	 *
	 * @param {boolean | object} [options] true/false or An object with event
	 * listeners to be fired on resize events (object makes the Interactable
	 * resizable)
	 * @return {boolean | Interactable} A boolean indicating if this can be the
	 * target of resize elements, or this Interactable
	 */
	Interactable.prototype.resizable = function (options) {
	  if (utils.is.object(options)) {
	    this.options.resize.enabled = options.enabled === false ? false : true;
	    this.setPerAction('resize', options);
	    this.setOnEvents('resize', options);

	    if (/^x$|^y$|^xy$/.test(options.axis)) {
	      this.options.resize.axis = options.axis;
	    } else if (options.axis === null) {
	      this.options.resize.axis = defaultOptions.resize.axis;
	    }

	    if (utils.is.bool(options.preserveAspectRatio)) {
	      this.options.resize.preserveAspectRatio = options.preserveAspectRatio;
	    } else if (utils.is.bool(options.square)) {
	      this.options.resize.square = options.square;
	    }

	    return this;
	  }
	  if (utils.is.bool(options)) {
	    this.options.resize.enabled = options;

	    if (!options) {
	      this.onresizestart = this.onresizestart = this.onresizeend = null;
	    }

	    return this;
	  }
	  return this.options.resize;
	};

	function checkResizeEdge(name, value, page, element, interactableElement, rect, margin) {
	  // false, '', undefined, null
	  if (!value) {
	    return false;
	  }

	  // true value, use pointer coords and element rect
	  if (value === true) {
	    // if dimensions are negative, "switch" edges
	    var width = utils.is.number(rect.width) ? rect.width : rect.right - rect.left;
	    var height = utils.is.number(rect.height) ? rect.height : rect.bottom - rect.top;

	    if (width < 0) {
	      if (name === 'left') {
	        name = 'right';
	      } else if (name === 'right') {
	        name = 'left';
	      }
	    }
	    if (height < 0) {
	      if (name === 'top') {
	        name = 'bottom';
	      } else if (name === 'bottom') {
	        name = 'top';
	      }
	    }

	    if (name === 'left') {
	      return page.x < (width >= 0 ? rect.left : rect.right) + margin;
	    }
	    if (name === 'top') {
	      return page.y < (height >= 0 ? rect.top : rect.bottom) + margin;
	    }

	    if (name === 'right') {
	      return page.x > (width >= 0 ? rect.right : rect.left) - margin;
	    }
	    if (name === 'bottom') {
	      return page.y > (height >= 0 ? rect.bottom : rect.top) - margin;
	    }
	  }

	  // the remaining checks require an element
	  if (!utils.is.element(element)) {
	    return false;
	  }

	  return utils.is.element(value)
	  // the value is an element to use as a resize handle
	  ? value === element
	  // otherwise check if element matches value as selector
	  : utils.matchesUpTo(element, value, interactableElement);
	}

	Interaction.signals.on('new', function (interaction) {
	  interaction.resizeAxes = 'xy';
	});

	InteractEvent.signals.on('set-delta', function (_ref3) {
	  var interaction = _ref3.interaction,
	      iEvent = _ref3.iEvent,
	      action = _ref3.action;

	  if (action !== 'resize' || !interaction.resizeAxes) {
	    return;
	  }

	  var options = interaction.target.options;

	  if (options.resize.square) {
	    if (interaction.resizeAxes === 'y') {
	      iEvent.dx = iEvent.dy;
	    } else {
	      iEvent.dy = iEvent.dx;
	    }
	    iEvent.axes = 'xy';
	  } else {
	    iEvent.axes = interaction.resizeAxes;

	    if (interaction.resizeAxes === 'x') {
	      iEvent.dy = 0;
	    } else if (interaction.resizeAxes === 'y') {
	      iEvent.dx = 0;
	    }
	  }
	});

	actions.resize = resize;
	actions.names.push('resize');
	utils.merge(Interactable.eventTypes, ['resizestart', 'resizemove', 'resizeinertiastart', 'resizeinertiaresume', 'resizeend']);
	actions.methodDict.resize = 'resizable';

	defaultOptions.resize = resize.defaults;

	module.exports = resize;

	},{"../InteractEvent":3,"../Interactable":4,"../Interaction":5,"../defaultOptions":18,"../utils":44,"../utils/browser":36,"./base":6}],11:[function(require,module,exports){
	'use strict';

	var raf = require('./utils/raf');
	var getWindow = require('./utils/window').getWindow;
	var is = require('./utils/is');
	var domUtils = require('./utils/domUtils');
	var Interaction = require('./Interaction');
	var defaultOptions = require('./defaultOptions');

	var autoScroll = {
	  defaults: {
	    enabled: false,
	    container: null, // the item that is scrolled (Window or HTMLElement)
	    margin: 60,
	    speed: 300 // the scroll speed in pixels per second
	  },

	  interaction: null,
	  i: null, // the handle returned by window.setInterval
	  x: 0, y: 0, // Direction each pulse is to scroll in

	  isScrolling: false,
	  prevTime: 0,

	  start: function start(interaction) {
	    autoScroll.isScrolling = true;
	    raf.cancel(autoScroll.i);

	    autoScroll.interaction = interaction;
	    autoScroll.prevTime = new Date().getTime();
	    autoScroll.i = raf.request(autoScroll.scroll);
	  },

	  stop: function stop() {
	    autoScroll.isScrolling = false;
	    raf.cancel(autoScroll.i);
	  },

	  // scroll the window by the values in scroll.x/y
	  scroll: function scroll() {
	    var options = autoScroll.interaction.target.options[autoScroll.interaction.prepared.name].autoScroll;
	    var container = options.container || getWindow(autoScroll.interaction.element);
	    var now = new Date().getTime();
	    // change in time in seconds
	    var dt = (now - autoScroll.prevTime) / 1000;
	    // displacement
	    var s = options.speed * dt;

	    if (s >= 1) {
	      if (is.window(container)) {
	        container.scrollBy(autoScroll.x * s, autoScroll.y * s);
	      } else if (container) {
	        container.scrollLeft += autoScroll.x * s;
	        container.scrollTop += autoScroll.y * s;
	      }

	      autoScroll.prevTime = now;
	    }

	    if (autoScroll.isScrolling) {
	      raf.cancel(autoScroll.i);
	      autoScroll.i = raf.request(autoScroll.scroll);
	    }
	  },
	  check: function check(interactable, actionName) {
	    var options = interactable.options;

	    return options[actionName].autoScroll && options[actionName].autoScroll.enabled;
	  },
	  onInteractionMove: function onInteractionMove(_ref) {
	    var interaction = _ref.interaction,
	        pointer = _ref.pointer;

	    if (!(interaction.interacting() && autoScroll.check(interaction.target, interaction.prepared.name))) {
	      return;
	    }

	    if (interaction.simulation) {
	      autoScroll.x = autoScroll.y = 0;
	      return;
	    }

	    var top = void 0;
	    var right = void 0;
	    var bottom = void 0;
	    var left = void 0;

	    var options = interaction.target.options[interaction.prepared.name].autoScroll;
	    var container = options.container || getWindow(interaction.element);

	    if (is.window(container)) {
	      left = pointer.clientX < autoScroll.margin;
	      top = pointer.clientY < autoScroll.margin;
	      right = pointer.clientX > container.innerWidth - autoScroll.margin;
	      bottom = pointer.clientY > container.innerHeight - autoScroll.margin;
	    } else {
	      var rect = domUtils.getElementClientRect(container);

	      left = pointer.clientX < rect.left + autoScroll.margin;
	      top = pointer.clientY < rect.top + autoScroll.margin;
	      right = pointer.clientX > rect.right - autoScroll.margin;
	      bottom = pointer.clientY > rect.bottom - autoScroll.margin;
	    }

	    autoScroll.x = right ? 1 : left ? -1 : 0;
	    autoScroll.y = bottom ? 1 : top ? -1 : 0;

	    if (!autoScroll.isScrolling) {
	      // set the autoScroll properties to those of the target
	      autoScroll.margin = options.margin;
	      autoScroll.speed = options.speed;

	      autoScroll.start(interaction);
	    }
	  }
	};

	Interaction.signals.on('stop-active', function () {
	  autoScroll.stop();
	});

	Interaction.signals.on('action-move', autoScroll.onInteractionMove);

	defaultOptions.perAction.autoScroll = autoScroll.defaults;

	module.exports = autoScroll;

	},{"./Interaction":5,"./defaultOptions":18,"./utils/domUtils":39,"./utils/is":46,"./utils/raf":50,"./utils/window":52}],12:[function(require,module,exports){
	'use strict';

	/** @lends Interactable */
	var Interactable = require('../Interactable');
	var actions = require('../actions/base');
	var is = require('../utils/is');
	var domUtils = require('../utils/domUtils');

	var _require = require('../utils'),
	    warnOnce = _require.warnOnce;

	Interactable.prototype.getAction = function (pointer, event, interaction, element) {
	  var action = this.defaultActionChecker(pointer, event, interaction, element);

	  if (this.options.actionChecker) {
	    return this.options.actionChecker(pointer, event, action, this, element, interaction);
	  }

	  return action;
	};

	/**
	 * ```js
	 * interact(element, { ignoreFrom: document.getElementById('no-action') });
	 * // or
	 * interact(element).ignoreFrom('input, textarea, a');
	 * ```
	 * @deprecated
	 * If the target of the `mousedown`, `pointerdown` or `touchstart` event or any
	 * of it's parents match the given CSS selector or Element, no
	 * drag/resize/gesture is started.
	 *
	 * Don't use this method. Instead set the `ignoreFrom` option for each action
	 * or for `pointerEvents`
	 *
	 * @example
	 * interact(targett)
	 *   .draggable({
	 *     ignoreFrom: 'input, textarea, a[href]'',
	 *   })
	 *   .pointerEvents({
	 *     ignoreFrom: '[no-pointer]',
	 *   });
	 *
	 * @param {string | Element | null} [newValue] a CSS selector string, an
	 * Element or `null` to not ignore any elements
	 * @return {string | Element | object} The current ignoreFrom value or this
	 * Interactable
	 */
	Interactable.prototype.ignoreFrom = warnOnce(function (newValue) {
	  return this._backCompatOption('ignoreFrom', newValue);
	}, 'Interactable.ignoreForm() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue}).');

	/**
	 * ```js
	 *
	 * @deprecated
	 * A drag/resize/gesture is started only If the target of the `mousedown`,
	 * `pointerdown` or `touchstart` event or any of it's parents match the given
	 * CSS selector or Element.
	 *
	 * Don't use this method. Instead set the `allowFrom` option for each action
	 * or for `pointerEvents`
	 *
	 * @example
	 * interact(targett)
	 *   .resizable({
	 *     allowFrom: '.resize-handle',
	 *   .pointerEvents({
	 *     allowFrom: '.handle',,
	 *   });
	 *
	 * @param {string | Element | null} [newValue] a CSS selector string, an
	 * Element or `null` to allow from any element
	 * @return {string | Element | object} The current allowFrom value or this
	 * Interactable
	 */
	Interactable.prototype.allowFrom = warnOnce(function (newValue) {
	  return this._backCompatOption('allowFrom', newValue);
	}, 'Interactable.allowForm() has been deprecated. Use Interactble.draggable({allowFrom: newValue}).');

	Interactable.prototype.testIgnore = function (ignoreFrom, interactableElement, element) {
	  if (!ignoreFrom || !is.element(element)) {
	    return false;
	  }

	  if (is.string(ignoreFrom)) {
	    return domUtils.matchesUpTo(element, ignoreFrom, interactableElement);
	  } else if (is.element(ignoreFrom)) {
	    return domUtils.nodeContains(ignoreFrom, element);
	  }

	  return false;
	};

	Interactable.prototype.testAllow = function (allowFrom, interactableElement, element) {
	  if (!allowFrom) {
	    return true;
	  }

	  if (!is.element(element)) {
	    return false;
	  }

	  if (is.string(allowFrom)) {
	    return domUtils.matchesUpTo(element, allowFrom, interactableElement);
	  } else if (is.element(allowFrom)) {
	    return domUtils.nodeContains(allowFrom, element);
	  }

	  return false;
	};

	Interactable.prototype.testIgnoreAllow = function (options, interactableElement, eventTarget) {
	  return !this.testIgnore(options.ignoreFrom, interactableElement, eventTarget) && this.testAllow(options.allowFrom, interactableElement, eventTarget);
	};

	/**
	 * ```js
	 * interact('.resize-drag')
	 *   .resizable(true)
	 *   .draggable(true)
	 *   .actionChecker(function (pointer, event, action, interactable, element, interaction) {
	 *
	 *   if (interact.matchesSelector(event.target, '.drag-handle') {
	 *     // force drag with handle target
	 *     action.name = drag;
	 *   }
	 *   else {
	 *     // resize from the top and right edges
	 *     action.name  = 'resize';
	 *     action.edges = { top: true, right: true };
	 *   }
	 *
	 *   return action;
	 * });
	 * ```
	 *
	 * Gets or sets the function used to check action to be performed on
	 * pointerDown
	 *
	 * @param {function | null} [checker] A function which takes a pointer event,
	 * defaultAction string, interactable, element and interaction as parameters
	 * and returns an object with name property 'drag' 'resize' or 'gesture' and
	 * optionally an `edges` object with boolean 'top', 'left', 'bottom' and right
	 * props.
	 * @return {Function | Interactable} The checker function or this Interactable
	 */
	Interactable.prototype.actionChecker = function (checker) {
	  if (is.function(checker)) {
	    this.options.actionChecker = checker;

	    return this;
	  }

	  if (checker === null) {
	    delete this.options.actionChecker;

	    return this;
	  }

	  return this.options.actionChecker;
	};

	/**
	 * Returns or sets whether the the cursor should be changed depending on the
	 * action that would be performed if the mouse were pressed and dragged.
	 *
	 * @param {boolean} [newValue]
	 * @return {boolean | Interactable} The current setting or this Interactable
	 */
	Interactable.prototype.styleCursor = function (newValue) {
	  if (is.bool(newValue)) {
	    this.options.styleCursor = newValue;

	    return this;
	  }

	  if (newValue === null) {
	    delete this.options.styleCursor;

	    return this;
	  }

	  return this.options.styleCursor;
	};

	Interactable.prototype.defaultActionChecker = function (pointer, event, interaction, element) {
	  var rect = this.getRect(element);
	  var buttons = event.buttons || {
	    0: 1,
	    1: 4,
	    3: 8,
	    4: 16
	  }[event.button];
	  var action = null;

	  for (var _i = 0; _i < actions.names.length; _i++) {
	    var _ref;

	    _ref = actions.names[_i];
	    var actionName = _ref;

	    // check mouseButton setting if the pointer is down
	    if (interaction.pointerIsDown && /mouse|pointer/.test(interaction.pointerType) && (buttons & this.options[actionName].mouseButtons) === 0) {
	      continue;
	    }

	    action = actions[actionName].checker(pointer, event, this, element, interaction, rect);

	    if (action) {
	      return action;
	    }
	  }
	};

	},{"../Interactable":4,"../actions/base":6,"../utils":44,"../utils/domUtils":39,"../utils/is":46}],13:[function(require,module,exports){
	'use strict';

	var interact = require('../interact');
	var Interactable = require('../Interactable');
	var Interaction = require('../Interaction');
	var actions = require('../actions/base');
	var defaultOptions = require('../defaultOptions');
	var scope = require('../scope');
	var utils = require('../utils');
	var signals = require('../utils/Signals').new();

	require('./InteractableMethods');

	var autoStart = {
	  signals: signals,
	  withinInteractionLimit: withinInteractionLimit,
	  // Allow this many interactions to happen simultaneously
	  maxInteractions: Infinity,
	  defaults: {
	    perAction: {
	      manualStart: false,
	      max: Infinity,
	      maxPerElement: 1,
	      allowFrom: null,
	      ignoreFrom: null,

	      // only allow left button by default
	      // see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons#Return_value
	      mouseButtons: 1
	    }
	  },
	  setActionDefaults: function setActionDefaults(action) {
	    utils.extend(action.defaults, autoStart.defaults.perAction);
	  },
	  validateAction: validateAction
	};

	// set cursor style on mousedown
	Interaction.signals.on('down', function (_ref) {
	  var interaction = _ref.interaction,
	      pointer = _ref.pointer,
	      event = _ref.event,
	      eventTarget = _ref.eventTarget;

	  if (interaction.interacting()) {
	    return;
	  }

	  var actionInfo = getActionInfo(interaction, pointer, event, eventTarget);
	  prepare(interaction, actionInfo);
	});

	// set cursor style on mousemove
	Interaction.signals.on('move', function (_ref2) {
	  var interaction = _ref2.interaction,
	      pointer = _ref2.pointer,
	      event = _ref2.event,
	      eventTarget = _ref2.eventTarget;

	  if (interaction.pointerType !== 'mouse' || interaction.pointerIsDown || interaction.interacting()) {
	    return;
	  }

	  var actionInfo = getActionInfo(interaction, pointer, event, eventTarget);
	  prepare(interaction, actionInfo);
	});

	Interaction.signals.on('move', function (arg) {
	  var interaction = arg.interaction,
	      event = arg.event;


	  if (!interaction.pointerIsDown || interaction.interacting() || !interaction.pointerWasMoved || !interaction.prepared.name) {
	    return;
	  }

	  signals.fire('before-start', arg);

	  var target = interaction.target;

	  if (interaction.prepared.name && target) {
	    // check manualStart and interaction limit
	    if (target.options[interaction.prepared.name].manualStart || !withinInteractionLimit(target, interaction.element, interaction.prepared)) {
	      interaction.stop(event);
	    } else {
	      interaction.start(interaction.prepared, target, interaction.element);
	    }
	  }
	});

	// Check if the current target supports the action.
	// If so, return the validated action. Otherwise, return null
	function validateAction(action, interactable, element, eventTarget) {
	  if (utils.is.object(action) && interactable.testIgnoreAllow(interactable.options[action.name], element, eventTarget) && interactable.options[action.name].enabled && withinInteractionLimit(interactable, element, action)) {
	    return action;
	  }

	  return null;
	}

	function validateSelector(interaction, pointer, event, matches, matchElements, eventTarget) {
	  for (var i = 0, len = matches.length; i < len; i++) {
	    var match = matches[i];
	    var matchElement = matchElements[i];
	    var action = validateAction(match.getAction(pointer, event, interaction, matchElement), match, matchElement, eventTarget);

	    if (action) {
	      return {
	        action: action,
	        target: match,
	        element: matchElement
	      };
	    }
	  }

	  return {};
	}

	function getActionInfo(interaction, pointer, event, eventTarget) {
	  var matches = [];
	  var matchElements = [];

	  var element = eventTarget;

	  function pushMatches(interactable) {
	    matches.push(interactable);
	    matchElements.push(element);
	  }

	  while (utils.is.element(element)) {
	    matches = [];
	    matchElements = [];

	    scope.interactables.forEachMatch(element, pushMatches);

	    var actionInfo = validateSelector(interaction, pointer, event, matches, matchElements, eventTarget);

	    if (actionInfo.action && !actionInfo.target.options[actionInfo.action.name].manualStart) {
	      return actionInfo;
	    }

	    element = utils.parentNode(element);
	  }

	  return {};
	}

	function prepare(interaction, _ref3) {
	  var action = _ref3.action,
	      target = _ref3.target,
	      element = _ref3.element;

	  action = action || {};

	  if (interaction.target && interaction.target.options.styleCursor) {
	    interaction.target._doc.documentElement.style.cursor = '';
	  }

	  interaction.target = target;
	  interaction.element = element;
	  utils.copyAction(interaction.prepared, action);

	  if (target && target.options.styleCursor) {
	    var cursor = action ? actions[action.name].getCursor(action) : '';
	    interaction.target._doc.documentElement.style.cursor = cursor;
	  }

	  signals.fire('prepared', { interaction: interaction });
	}

	Interaction.signals.on('stop', function (_ref4) {
	  var interaction = _ref4.interaction;

	  var target = interaction.target;

	  if (target && target.options.styleCursor) {
	    target._doc.documentElement.style.cursor = '';
	  }
	});

	function withinInteractionLimit(interactable, element, action) {
	  var options = interactable.options;
	  var maxActions = options[action.name].max;
	  var maxPerElement = options[action.name].maxPerElement;
	  var activeInteractions = 0;
	  var targetCount = 0;
	  var targetElementCount = 0;

	  // no actions if any of these values == 0
	  if (!(maxActions && maxPerElement && autoStart.maxInteractions)) {
	    return;
	  }

	  for (var _i = 0; _i < scope.interactions.length; _i++) {
	    var _ref5;

	    _ref5 = scope.interactions[_i];
	    var interaction = _ref5;

	    var otherAction = interaction.prepared.name;

	    if (!interaction.interacting()) {
	      continue;
	    }

	    activeInteractions++;

	    if (activeInteractions >= autoStart.maxInteractions) {
	      return false;
	    }

	    if (interaction.target !== interactable) {
	      continue;
	    }

	    targetCount += otherAction === action.name | 0;

	    if (targetCount >= maxActions) {
	      return false;
	    }

	    if (interaction.element === element) {
	      targetElementCount++;

	      if (otherAction !== action.name || targetElementCount >= maxPerElement) {
	        return false;
	      }
	    }
	  }

	  return autoStart.maxInteractions > 0;
	}

	/**
	 * Returns or sets the maximum number of concurrent interactions allowed.  By
	 * default only 1 interaction is allowed at a time (for backwards
	 * compatibility). To allow multiple interactions on the same Interactables and
	 * elements, you need to enable it in the draggable, resizable and gesturable
	 * `'max'` and `'maxPerElement'` options.
	 *
	 * @alias module:interact.maxInteractions
	 *
	 * @param {number} [newValue] Any number. newValue <= 0 means no interactions.
	 */
	interact.maxInteractions = function (newValue) {
	  if (utils.is.number(newValue)) {
	    autoStart.maxInteractions = newValue;

	    return interact;
	  }

	  return autoStart.maxInteractions;
	};

	Interactable.settingsMethods.push('styleCursor');
	Interactable.settingsMethods.push('actionChecker');
	Interactable.settingsMethods.push('ignoreFrom');
	Interactable.settingsMethods.push('allowFrom');

	defaultOptions.base.actionChecker = null;
	defaultOptions.base.styleCursor = true;

	utils.extend(defaultOptions.perAction, autoStart.defaults.perAction);

	module.exports = autoStart;

	},{"../Interactable":4,"../Interaction":5,"../actions/base":6,"../defaultOptions":18,"../interact":21,"../scope":33,"../utils":44,"../utils/Signals":34,"./InteractableMethods":12}],14:[function(require,module,exports){
	'use strict';

	var autoStart = require('./base');
	var scope = require('../scope');
	var is = require('../utils/is');

	var _require = require('../utils/domUtils'),
	    parentNode = _require.parentNode;

	autoStart.setActionDefaults(require('../actions/drag'));

	autoStart.signals.on('before-start', function (_ref) {
	  var interaction = _ref.interaction,
	      eventTarget = _ref.eventTarget,
	      dx = _ref.dx,
	      dy = _ref.dy;

	  if (interaction.prepared.name !== 'drag') {
	    return;
	  }

	  // check if a drag is in the correct axis
	  var absX = Math.abs(dx);
	  var absY = Math.abs(dy);
	  var targetOptions = interaction.target.options.drag;
	  var startAxis = targetOptions.startAxis;
	  var currentAxis = absX > absY ? 'x' : absX < absY ? 'y' : 'xy';

	  interaction.prepared.axis = targetOptions.lockAxis === 'start' ? currentAxis[0] // always lock to one axis even if currentAxis === 'xy'
	  : targetOptions.lockAxis;

	  // if the movement isn't in the startAxis of the interactable
	  if (currentAxis !== 'xy' && startAxis !== 'xy' && startAxis !== currentAxis) {
	    // cancel the prepared action
	    interaction.prepared.name = null;

	    // then try to get a drag from another ineractable
	    var element = eventTarget;

	    var getDraggable = function getDraggable(interactable) {
	      if (interactable === interaction.target) {
	        return;
	      }

	      var options = interaction.target.options.drag;

	      if (!options.manualStart && interactable.testIgnoreAllow(options, element, eventTarget)) {

	        var action = interactable.getAction(interaction.downPointer, interaction.downEvent, interaction, element);

	        if (action && action.name === 'drag' && checkStartAxis(currentAxis, interactable) && autoStart.validateAction(action, interactable, element, eventTarget)) {

	          return interactable;
	        }
	      }
	    };

	    // check all interactables
	    while (is.element(element)) {
	      var interactable = scope.interactables.forEachMatch(element, getDraggable);

	      if (interactable) {
	        interaction.prepared.name = 'drag';
	        interaction.target = interactable;
	        interaction.element = element;
	        break;
	      }

	      element = parentNode(element);
	    }
	  }
	});

	function checkStartAxis(startAxis, interactable) {
	  if (!interactable) {
	    return false;
	  }

	  var thisAxis = interactable.options.drag.startAxis;

	  return startAxis === 'xy' || thisAxis === 'xy' || thisAxis === startAxis;
	}

	},{"../actions/drag":7,"../scope":33,"../utils/domUtils":39,"../utils/is":46,"./base":13}],15:[function(require,module,exports){
	'use strict';

	require('./base').setActionDefaults(require('../actions/gesture'));

	},{"../actions/gesture":9,"./base":13}],16:[function(require,module,exports){
	'use strict';

	var autoStart = require('./base');
	var Interaction = require('../Interaction');

	autoStart.defaults.perAction.hold = 0;
	autoStart.defaults.perAction.delay = 0;

	Interaction.signals.on('new', function (interaction) {
	  interaction.autoStartHoldTimer = null;
	});

	autoStart.signals.on('prepared', function (_ref) {
	  var interaction = _ref.interaction;

	  var hold = getHoldDuration(interaction);

	  if (hold > 0) {
	    interaction.autoStartHoldTimer = setTimeout(function () {
	      interaction.start(interaction.prepared, interaction.target, interaction.element);
	    }, hold);
	  }
	});

	Interaction.signals.on('move', function (_ref2) {
	  var interaction = _ref2.interaction,
	      duplicate = _ref2.duplicate;

	  if (interaction.pointerWasMoved && !duplicate) {
	    clearTimeout(interaction.autoStartHoldTimer);
	  }
	});

	// prevent regular down->move autoStart
	autoStart.signals.on('before-start', function (_ref3) {
	  var interaction = _ref3.interaction;

	  var hold = getHoldDuration(interaction);

	  if (hold > 0) {
	    interaction.prepared.name = null;
	  }
	});

	function getHoldDuration(interaction) {
	  var actionName = interaction.prepared && interaction.prepared.name;

	  if (!actionName) {
	    return null;
	  }

	  var options = interaction.target.options;

	  return options[actionName].hold || options[actionName].delay;
	}

	module.exports = {
	  getHoldDuration: getHoldDuration
	};

	},{"../Interaction":5,"./base":13}],17:[function(require,module,exports){
	'use strict';

	require('./base').setActionDefaults(require('../actions/resize'));

	},{"../actions/resize":10,"./base":13}],18:[function(require,module,exports){
	'use strict';

	module.exports = {
	  base: {
	    accept: null,
	    preventDefault: 'auto',
	    deltaSource: 'page'
	  },

	  perAction: {
	    origin: { x: 0, y: 0 },

	    inertia: {
	      enabled: false,
	      resistance: 10, // the lambda in exponential decay
	      minSpeed: 100, // target speed must be above this for inertia to start
	      endSpeed: 10, // the speed at which inertia is slow enough to stop
	      allowResume: true, // allow resuming an action in inertia phase
	      smoothEndDuration: 300 // animate to snap/restrict endOnly if there's no inertia
	    }
	  }
	};

	},{}],19:[function(require,module,exports){
	'use strict';

	/* browser entry point */

	// inertia
	require('./inertia');

	// modifiers
	require('./modifiers/snap');
	require('./modifiers/restrict');

	// pointerEvents
	require('./pointerEvents/base');
	require('./pointerEvents/holdRepeat');
	require('./pointerEvents/interactableTargets');

	// autoStart hold
	require('./autoStart/hold');

	// actions
	require('./actions/gesture');
	require('./actions/resize');
	require('./actions/drag');
	require('./actions/drop');

	// load these modifiers after resize is loaded
	require('./modifiers/snapSize');
	require('./modifiers/restrictEdges');
	require('./modifiers/restrictSize');

	// autoStart actions
	require('./autoStart/gesture');
	require('./autoStart/resize');
	require('./autoStart/drag');

	// Interactable preventDefault setting
	require('./interactablePreventDefault.js');

	// autoScroll
	require('./autoScroll');

	// export interact
	module.exports = require('./interact');

	},{"./actions/drag":7,"./actions/drop":8,"./actions/gesture":9,"./actions/resize":10,"./autoScroll":11,"./autoStart/drag":14,"./autoStart/gesture":15,"./autoStart/hold":16,"./autoStart/resize":17,"./inertia":20,"./interact":21,"./interactablePreventDefault.js":22,"./modifiers/restrict":24,"./modifiers/restrictEdges":25,"./modifiers/restrictSize":26,"./modifiers/snap":27,"./modifiers/snapSize":28,"./pointerEvents/base":30,"./pointerEvents/holdRepeat":31,"./pointerEvents/interactableTargets":32}],20:[function(require,module,exports){
	'use strict';

	var InteractEvent = require('./InteractEvent');
	var Interaction = require('./Interaction');
	var modifiers = require('./modifiers/base');
	var utils = require('./utils');
	var animationFrame = require('./utils/raf');

	Interaction.signals.on('new', function (interaction) {
	  interaction.inertiaStatus = {
	    active: false,
	    smoothEnd: false,
	    allowResume: false,

	    startEvent: null,
	    upCoords: {},

	    xe: 0, ye: 0,
	    sx: 0, sy: 0,

	    t0: 0,
	    vx0: 0, vys: 0,
	    duration: 0,

	    lambda_v0: 0,
	    one_ve_v0: 0,
	    i: null
	  };

	  interaction.boundInertiaFrame = function () {
	    return inertiaFrame.apply(interaction);
	  };
	  interaction.boundSmoothEndFrame = function () {
	    return smoothEndFrame.apply(interaction);
	  };
	});

	Interaction.signals.on('down', function (_ref) {
	  var interaction = _ref.interaction,
	      event = _ref.event,
	      pointer = _ref.pointer,
	      eventTarget = _ref.eventTarget;

	  var status = interaction.inertiaStatus;

	  // Check if the down event hits the current inertia target
	  if (status.active) {
	    var element = eventTarget;

	    // climb up the DOM tree from the event target
	    while (utils.is.element(element)) {

	      // if interaction element is the current inertia target element
	      if (element === interaction.element) {
	        // stop inertia
	        animationFrame.cancel(status.i);
	        status.active = false;
	        interaction.simulation = null;

	        // update pointers to the down event's coordinates
	        interaction.updatePointer(pointer);
	        utils.setCoords(interaction.curCoords, interaction.pointers);

	        // fire appropriate signals
	        var signalArg = { interaction: interaction };
	        Interaction.signals.fire('before-action-move', signalArg);
	        Interaction.signals.fire('action-resume', signalArg);

	        // fire a reume event
	        var resumeEvent = new InteractEvent(interaction, event, interaction.prepared.name, 'inertiaresume', interaction.element);

	        interaction.target.fire(resumeEvent);
	        interaction.prevEvent = resumeEvent;
	        modifiers.resetStatuses(interaction.modifierStatuses);

	        utils.copyCoords(interaction.prevCoords, interaction.curCoords);
	        break;
	      }

	      element = utils.parentNode(element);
	    }
	  }
	});

	Interaction.signals.on('up', function (_ref2) {
	  var interaction = _ref2.interaction,
	      event = _ref2.event;

	  var status = interaction.inertiaStatus;

	  if (!interaction.interacting() || status.active) {
	    return;
	  }

	  var target = interaction.target;
	  var options = target && target.options;
	  var inertiaOptions = options && interaction.prepared.name && options[interaction.prepared.name].inertia;

	  var now = new Date().getTime();
	  var statuses = {};
	  var page = utils.extend({}, interaction.curCoords.page);
	  var pointerSpeed = interaction.pointerDelta.client.speed;

	  var smoothEnd = false;
	  var modifierResult = void 0;

	  // check if inertia should be started
	  var inertiaPossible = inertiaOptions && inertiaOptions.enabled && interaction.prepared.name !== 'gesture' && event !== status.startEvent;

	  var inertia = inertiaPossible && now - interaction.curCoords.timeStamp < 50 && pointerSpeed > inertiaOptions.minSpeed && pointerSpeed > inertiaOptions.endSpeed;

	  var modifierArg = {
	    interaction: interaction,
	    pageCoords: page,
	    statuses: statuses,
	    preEnd: true,
	    requireEndOnly: true
	  };

	  // smoothEnd
	  if (inertiaPossible && !inertia) {
	    modifiers.resetStatuses(statuses);

	    modifierResult = modifiers.setAll(modifierArg);

	    if (modifierResult.shouldMove && modifierResult.locked) {
	      smoothEnd = true;
	    }
	  }

	  if (!(inertia || smoothEnd)) {
	    return;
	  }

	  utils.copyCoords(status.upCoords, interaction.curCoords);

	  interaction.pointers[0] = status.startEvent = new InteractEvent(interaction, event, interaction.prepared.name, 'inertiastart', interaction.element);

	  status.t0 = now;

	  status.active = true;
	  status.allowResume = inertiaOptions.allowResume;
	  interaction.simulation = status;

	  target.fire(status.startEvent);

	  if (inertia) {
	    status.vx0 = interaction.pointerDelta.client.vx;
	    status.vy0 = interaction.pointerDelta.client.vy;
	    status.v0 = pointerSpeed;

	    calcInertia(interaction, status);

	    utils.extend(page, interaction.curCoords.page);

	    page.x += status.xe;
	    page.y += status.ye;

	    modifiers.resetStatuses(statuses);

	    modifierResult = modifiers.setAll(modifierArg);

	    status.modifiedXe += modifierResult.dx;
	    status.modifiedYe += modifierResult.dy;

	    status.i = animationFrame.request(interaction.boundInertiaFrame);
	  } else {
	    status.smoothEnd = true;
	    status.xe = modifierResult.dx;
	    status.ye = modifierResult.dy;

	    status.sx = status.sy = 0;

	    status.i = animationFrame.request(interaction.boundSmoothEndFrame);
	  }
	});

	Interaction.signals.on('stop-active', function (_ref3) {
	  var interaction = _ref3.interaction;

	  var status = interaction.inertiaStatus;

	  if (status.active) {
	    animationFrame.cancel(status.i);
	    status.active = false;
	    interaction.simulation = null;
	  }
	});

	function calcInertia(interaction, status) {
	  var inertiaOptions = interaction.target.options[interaction.prepared.name].inertia;
	  var lambda = inertiaOptions.resistance;
	  var inertiaDur = -Math.log(inertiaOptions.endSpeed / status.v0) / lambda;

	  status.x0 = interaction.prevEvent.pageX;
	  status.y0 = interaction.prevEvent.pageY;
	  status.t0 = status.startEvent.timeStamp / 1000;
	  status.sx = status.sy = 0;

	  status.modifiedXe = status.xe = (status.vx0 - inertiaDur) / lambda;
	  status.modifiedYe = status.ye = (status.vy0 - inertiaDur) / lambda;
	  status.te = inertiaDur;

	  status.lambda_v0 = lambda / status.v0;
	  status.one_ve_v0 = 1 - inertiaOptions.endSpeed / status.v0;
	}

	function inertiaFrame() {
	  updateInertiaCoords(this);
	  utils.setCoordDeltas(this.pointerDelta, this.prevCoords, this.curCoords);

	  var status = this.inertiaStatus;
	  var options = this.target.options[this.prepared.name].inertia;
	  var lambda = options.resistance;
	  var t = new Date().getTime() / 1000 - status.t0;

	  if (t < status.te) {

	    var progress = 1 - (Math.exp(-lambda * t) - status.lambda_v0) / status.one_ve_v0;

	    if (status.modifiedXe === status.xe && status.modifiedYe === status.ye) {
	      status.sx = status.xe * progress;
	      status.sy = status.ye * progress;
	    } else {
	      var quadPoint = utils.getQuadraticCurvePoint(0, 0, status.xe, status.ye, status.modifiedXe, status.modifiedYe, progress);

	      status.sx = quadPoint.x;
	      status.sy = quadPoint.y;
	    }

	    this.doMove();

	    status.i = animationFrame.request(this.boundInertiaFrame);
	  } else {
	    status.sx = status.modifiedXe;
	    status.sy = status.modifiedYe;

	    this.doMove();
	    this.end(status.startEvent);
	    status.active = false;
	    this.simulation = null;
	  }

	  utils.copyCoords(this.prevCoords, this.curCoords);
	}

	function smoothEndFrame() {
	  updateInertiaCoords(this);

	  var status = this.inertiaStatus;
	  var t = new Date().getTime() - status.t0;
	  var duration = this.target.options[this.prepared.name].inertia.smoothEndDuration;

	  if (t < duration) {
	    status.sx = utils.easeOutQuad(t, 0, status.xe, duration);
	    status.sy = utils.easeOutQuad(t, 0, status.ye, duration);

	    this.pointerMove(status.startEvent, status.startEvent);

	    status.i = animationFrame.request(this.boundSmoothEndFrame);
	  } else {
	    status.sx = status.xe;
	    status.sy = status.ye;

	    this.pointerMove(status.startEvent, status.startEvent);
	    this.end(status.startEvent);

	    status.smoothEnd = status.active = false;
	    this.simulation = null;
	  }
	}

	function updateInertiaCoords(interaction) {
	  var status = interaction.inertiaStatus;

	  // return if inertia isn't running
	  if (!status.active) {
	    return;
	  }

	  var pageUp = status.upCoords.page;
	  var clientUp = status.upCoords.client;

	  utils.setCoords(interaction.curCoords, [{
	    pageX: pageUp.x + status.sx,
	    pageY: pageUp.y + status.sy,
	    clientX: clientUp.x + status.sx,
	    clientY: clientUp.y + status.sy
	  }]);
	}

	},{"./InteractEvent":3,"./Interaction":5,"./modifiers/base":23,"./utils":44,"./utils/raf":50}],21:[function(require,module,exports){
	'use strict';

	/** @module interact */

	var browser = require('./utils/browser');
	var events = require('./utils/events');
	var utils = require('./utils');
	var scope = require('./scope');
	var Interactable = require('./Interactable');
	var Interaction = require('./Interaction');

	var globalEvents = {};

	/**
	 * ```js
	 * interact('#draggable').draggable(true);
	 *
	 * var rectables = interact('rect');
	 * rectables
	 *   .gesturable(true)
	 *   .on('gesturemove', function (event) {
	 *       // ...
	 *   });
	 * ```
	 *
	 * The methods of this variable can be used to set elements as interactables
	 * and also to change various default settings.
	 *
	 * Calling it as a function and passing an element or a valid CSS selector
	 * string returns an Interactable object which has various methods to configure
	 * it.
	 *
	 * @global
	 *
	 * @param {Element | string} element The HTML or SVG Element to interact with
	 * or CSS selector
	 * @return {Interactable}
	 */
	function interact(element, options) {
	  var interactable = scope.interactables.get(element, options);

	  if (!interactable) {
	    interactable = new Interactable(element, options);
	    interactable.events.global = globalEvents;
	  }

	  return interactable;
	}

	/**
	 * Check if an element or selector has been set with the {@link interact}
	 * function
	 *
	 * @alias module:interact.isSet
	 *
	 * @param {Element} element The Element being searched for
	 * @return {boolean} Indicates if the element or CSS selector was previously
	 * passed to interact
	*/
	interact.isSet = function (element, options) {
	  return scope.interactables.indexOfElement(element, options && options.context) !== -1;
	};

	/**
	 * Add a global listener for an InteractEvent or adds a DOM event to `document`
	 *
	 * @alias module:interact.on
	 *
	 * @param {string | array | object} type The types of events to listen for
	 * @param {function} listener The function event (s)
	 * @param {object | boolean} [options] object or useCapture flag for
	 * addEventListener
	 * @return {object} interact
	 */
	interact.on = function (type, listener, options) {
	  if (utils.is.string(type) && type.search(' ') !== -1) {
	    type = type.trim().split(/ +/);
	  }

	  if (utils.is.array(type)) {
	    for (var _i = 0; _i < type.length; _i++) {
	      var _ref;

	      _ref = type[_i];
	      var eventType = _ref;

	      interact.on(eventType, listener, options);
	    }

	    return interact;
	  }

	  if (utils.is.object(type)) {
	    for (var prop in type) {
	      interact.on(prop, type[prop], listener);
	    }

	    return interact;
	  }

	  // if it is an InteractEvent type, add listener to globalEvents
	  if (utils.contains(Interactable.eventTypes, type)) {
	    // if this type of event was never bound
	    if (!globalEvents[type]) {
	      globalEvents[type] = [listener];
	    } else {
	      globalEvents[type].push(listener);
	    }
	  }
	  // If non InteractEvent type, addEventListener to document
	  else {
	      events.add(scope.document, type, listener, { options: options });
	    }

	  return interact;
	};

	/**
	 * Removes a global InteractEvent listener or DOM event from `document`
	 *
	 * @alias module:interact.off
	 *
	 * @param {string | array | object} type The types of events that were listened
	 * for
	 * @param {function} listener The listener function to be removed
	 * @param {object | boolean} options [options] object or useCapture flag for
	 * removeEventListener
	 * @return {object} interact
	 */
	interact.off = function (type, listener, options) {
	  if (utils.is.string(type) && type.search(' ') !== -1) {
	    type = type.trim().split(/ +/);
	  }

	  if (utils.is.array(type)) {
	    for (var _i2 = 0; _i2 < type.length; _i2++) {
	      var _ref2;

	      _ref2 = type[_i2];
	      var eventType = _ref2;

	      interact.off(eventType, listener, options);
	    }

	    return interact;
	  }

	  if (utils.is.object(type)) {
	    for (var prop in type) {
	      interact.off(prop, type[prop], listener);
	    }

	    return interact;
	  }

	  if (!utils.contains(Interactable.eventTypes, type)) {
	    events.remove(scope.document, type, listener, options);
	  } else {
	    var index = void 0;

	    if (type in globalEvents && (index = globalEvents[type].indexOf(listener)) !== -1) {
	      globalEvents[type].splice(index, 1);
	    }
	  }

	  return interact;
	};

	/**
	 * Returns an object which exposes internal data

	 * @alias module:interact.debug
	 *
	 * @return {object} An object with properties that outline the current state
	 * and expose internal functions and variables
	 */
	interact.debug = function () {
	  return scope;
	};

	// expose the functions used to calculate multi-touch properties
	interact.getPointerAverage = utils.pointerAverage;
	interact.getTouchBBox = utils.touchBBox;
	interact.getTouchDistance = utils.touchDistance;
	interact.getTouchAngle = utils.touchAngle;

	interact.getElementRect = utils.getElementRect;
	interact.getElementClientRect = utils.getElementClientRect;
	interact.matchesSelector = utils.matchesSelector;
	interact.closest = utils.closest;

	/**
	 * @alias module:interact.supportsTouch
	 *
	 * @return {boolean} Whether or not the browser supports touch input
	 */
	interact.supportsTouch = function () {
	  return browser.supportsTouch;
	};

	/**
	 * @alias module:interact.supportsPointerEvent
	 *
	 * @return {boolean} Whether or not the browser supports PointerEvents
	 */
	interact.supportsPointerEvent = function () {
	  return browser.supportsPointerEvent;
	};

	/**
	 * Cancels all interactions (end events are not fired)
	 *
	 * @alias module:interact.stop
	 *
	 * @param {Event} event An event on which to call preventDefault()
	 * @return {object} interact
	 */
	interact.stop = function (event) {
	  for (var i = scope.interactions.length - 1; i >= 0; i--) {
	    scope.interactions[i].stop(event);
	  }

	  return interact;
	};

	/**
	 * Returns or sets the distance the pointer must be moved before an action
	 * sequence occurs. This also affects tolerance for tap events.
	 *
	 * @alias module:interact.pointerMoveTolerance
	 *
	 * @param {number} [newValue] The movement from the start position must be greater than this value
	 * @return {interact | number}
	 */
	interact.pointerMoveTolerance = function (newValue) {
	  if (utils.is.number(newValue)) {
	    Interaction.pointerMoveTolerance = newValue;

	    return interact;
	  }

	  return Interaction.pointerMoveTolerance;
	};

	interact.addDocument = scope.addDocument;
	interact.removeDocument = scope.removeDocument;

	scope.interact = interact;

	module.exports = interact;

	},{"./Interactable":4,"./Interaction":5,"./scope":33,"./utils":44,"./utils/browser":36,"./utils/events":40}],22:[function(require,module,exports){
	'use strict';

	var Interactable = require('./Interactable');
	var Interaction = require('./Interaction');
	var scope = require('./scope');
	var is = require('./utils/is');
	var events = require('./utils/events');
	var browser = require('./utils/browser');

	var _require = require('./utils/domUtils'),
	    nodeContains = _require.nodeContains,
	    matchesSelector = _require.matchesSelector;

	/**
	 * Returns or sets whether to prevent the browser's default behaviour in
	 * response to pointer events. Can be set to:
	 *  - `'always'` to always prevent
	 *  - `'never'` to never prevent
	 *  - `'auto'` to let interact.js try to determine what would be best
	 *
	 * @param {string} [newValue] `true`, `false` or `'auto'`
	 * @return {string | Interactable} The current setting or this Interactable
	 */


	Interactable.prototype.preventDefault = function (newValue) {
	  if (/^(always|never|auto)$/.test(newValue)) {
	    this.options.preventDefault = newValue;
	    return this;
	  }

	  if (is.bool(newValue)) {
	    this.options.preventDefault = newValue ? 'always' : 'never';
	    return this;
	  }

	  return this.options.preventDefault;
	};

	Interactable.prototype.checkAndPreventDefault = function (event) {
	  var setting = this.options.preventDefault;

	  if (setting === 'never') {
	    return;
	  }

	  if (setting === 'always') {
	    event.preventDefault();
	    return;
	  }

	  // setting === 'auto'

	  // don't preventDefault of touch{start,move} events if the browser supports passive
	  // events listeners. CSS touch-action and user-selecct should be used instead
	  if (events.supportsPassive && /^touch(start|move)$/.test(event.type) && !browser.isIOS) {
	    return;
	  }

	  // don't preventDefault of pointerdown events
	  if (/^(mouse|pointer|touch)*(down|start)/i.test(event.type)) {
	    return;
	  }

	  // don't preventDefault on editable elements
	  if (is.element(event.target) && matchesSelector(event.target, 'input,select,textarea,[contenteditable=true],[contenteditable=true] *')) {
	    return;
	  }

	  event.preventDefault();
	};

	function onInteractionEvent(_ref) {
	  var interaction = _ref.interaction,
	      event = _ref.event;

	  if (interaction.target) {
	    interaction.target.checkAndPreventDefault(event);
	  }
	}

	var _arr = ['down', 'move', 'up', 'cancel'];
	for (var _i = 0; _i < _arr.length; _i++) {
	  var eventSignal = _arr[_i];
	  Interaction.signals.on(eventSignal, onInteractionEvent);
	}

	// prevent native HTML5 drag on interact.js target elements
	Interaction.docEvents.dragstart = function preventNativeDrag(event) {
	  for (var _i2 = 0; _i2 < scope.interactions.length; _i2++) {
	    var _ref2;

	    _ref2 = scope.interactions[_i2];
	    var interaction = _ref2;


	    if (interaction.element && (interaction.element === event.target || nodeContains(interaction.element, event.target))) {

	      interaction.target.checkAndPreventDefault(event);
	      return;
	    }
	  }
	};

	},{"./Interactable":4,"./Interaction":5,"./scope":33,"./utils/browser":36,"./utils/domUtils":39,"./utils/events":40,"./utils/is":46}],23:[function(require,module,exports){
	'use strict';

	var InteractEvent = require('../InteractEvent');
	var Interaction = require('../Interaction');
	var extend = require('../utils/extend');

	var modifiers = {
	  names: [],

	  setOffsets: function setOffsets(arg) {
	    var interaction = arg.interaction,
	        page = arg.pageCoords;
	    var target = interaction.target,
	        element = interaction.element,
	        startOffset = interaction.startOffset;

	    var rect = target.getRect(element);

	    if (rect) {
	      startOffset.left = page.x - rect.left;
	      startOffset.top = page.y - rect.top;

	      startOffset.right = rect.right - page.x;
	      startOffset.bottom = rect.bottom - page.y;

	      if (!('width' in rect)) {
	        rect.width = rect.right - rect.left;
	      }
	      if (!('height' in rect)) {
	        rect.height = rect.bottom - rect.top;
	      }
	    } else {
	      startOffset.left = startOffset.top = startOffset.right = startOffset.bottom = 0;
	    }

	    arg.rect = rect;
	    arg.interactable = target;
	    arg.element = element;

	    for (var _i = 0; _i < modifiers.names.length; _i++) {
	      var _ref;

	      _ref = modifiers.names[_i];
	      var modifierName = _ref;

	      arg.options = target.options[interaction.prepared.name][modifierName];

	      if (!arg.options) {
	        continue;
	      }

	      interaction.modifierOffsets[modifierName] = modifiers[modifierName].setOffset(arg);
	    }
	  },

	  setAll: function setAll(arg) {
	    var interaction = arg.interaction,
	        statuses = arg.statuses,
	        preEnd = arg.preEnd,
	        requireEndOnly = arg.requireEndOnly;

	    var result = {
	      dx: 0,
	      dy: 0,
	      changed: false,
	      locked: false,
	      shouldMove: true
	    };

	    arg.modifiedCoords = extend({}, arg.pageCoords);

	    for (var _i2 = 0; _i2 < modifiers.names.length; _i2++) {
	      var _ref2;

	      _ref2 = modifiers.names[_i2];
	      var modifierName = _ref2;

	      var modifier = modifiers[modifierName];
	      var options = interaction.target.options[interaction.prepared.name][modifierName];

	      if (!shouldDo(options, preEnd, requireEndOnly)) {
	        continue;
	      }

	      arg.status = arg.status = statuses[modifierName];
	      arg.options = options;
	      arg.offset = arg.interaction.modifierOffsets[modifierName];

	      modifier.set(arg);

	      if (arg.status.locked) {
	        arg.modifiedCoords.x += arg.status.dx;
	        arg.modifiedCoords.y += arg.status.dy;

	        result.dx += arg.status.dx;
	        result.dy += arg.status.dy;

	        result.locked = true;
	      }
	    }

	    // a move should be fired if:
	    //  - there are no modifiers enabled,
	    //  - no modifiers are "locked" i.e. have changed the pointer's coordinates, or
	    //  - the locked coords have changed since the last pointer move
	    result.shouldMove = !arg.status || !result.locked || arg.status.changed;

	    return result;
	  },

	  resetStatuses: function resetStatuses(statuses) {
	    for (var _i3 = 0; _i3 < modifiers.names.length; _i3++) {
	      var _ref3;

	      _ref3 = modifiers.names[_i3];
	      var modifierName = _ref3;

	      var status = statuses[modifierName] || {};

	      status.dx = status.dy = 0;
	      status.modifiedX = status.modifiedY = NaN;
	      status.locked = false;
	      status.changed = true;

	      statuses[modifierName] = status;
	    }

	    return statuses;
	  },

	  start: function start(_ref4, signalName) {
	    var interaction = _ref4.interaction;

	    var arg = {
	      interaction: interaction,
	      pageCoords: (signalName === 'action-resume' ? interaction.curCoords : interaction.startCoords).page,
	      startOffset: interaction.startOffset,
	      statuses: interaction.modifierStatuses,
	      preEnd: false,
	      requireEndOnly: false
	    };

	    modifiers.setOffsets(arg);
	    modifiers.resetStatuses(arg.statuses);

	    arg.pageCoords = extend({}, interaction.startCoords.page);
	    interaction.modifierResult = modifiers.setAll(arg);
	  },

	  beforeMove: function beforeMove(_ref5) {
	    var interaction = _ref5.interaction,
	        preEnd = _ref5.preEnd,
	        interactingBeforeMove = _ref5.interactingBeforeMove;

	    var modifierResult = modifiers.setAll({
	      interaction: interaction,
	      preEnd: preEnd,
	      pageCoords: interaction.curCoords.page,
	      statuses: interaction.modifierStatuses,
	      requireEndOnly: false
	    });

	    // don't fire an action move if a modifier would keep the event in the same
	    // cordinates as before
	    if (!modifierResult.shouldMove && interactingBeforeMove) {
	      interaction._dontFireMove = true;
	    }

	    interaction.modifierResult = modifierResult;
	  },

	  end: function end(_ref6) {
	    var interaction = _ref6.interaction,
	        event = _ref6.event;

	    for (var _i4 = 0; _i4 < modifiers.names.length; _i4++) {
	      var _ref7;

	      _ref7 = modifiers.names[_i4];
	      var modifierName = _ref7;

	      var options = interaction.target.options[interaction.prepared.name][modifierName];

	      // if the endOnly option is true for any modifier
	      if (shouldDo(options, true, true)) {
	        // fire a move event at the modified coordinates
	        interaction.doMove({ event: event, preEnd: true });
	        break;
	      }
	    }
	  },

	  setXY: function setXY(arg) {
	    var iEvent = arg.iEvent,
	        interaction = arg.interaction;

	    var modifierArg = extend({}, arg);

	    for (var i = 0; i < modifiers.names.length; i++) {
	      var modifierName = modifiers.names[i];
	      modifierArg.options = interaction.target.options[interaction.prepared.name][modifierName];

	      if (!modifierArg.options) {
	        continue;
	      }

	      var modifier = modifiers[modifierName];

	      modifierArg.status = interaction.modifierStatuses[modifierName];

	      iEvent[modifierName] = modifier.modifyCoords(modifierArg);
	    }
	  }
	};

	Interaction.signals.on('new', function (interaction) {
	  interaction.startOffset = { left: 0, right: 0, top: 0, bottom: 0 };
	  interaction.modifierOffsets = {};
	  interaction.modifierStatuses = modifiers.resetStatuses({});
	  interaction.modifierResult = null;
	});

	Interaction.signals.on('action-start', modifiers.start);
	Interaction.signals.on('action-resume', modifiers.start);
	Interaction.signals.on('before-action-move', modifiers.beforeMove);
	Interaction.signals.on('action-end', modifiers.end);

	InteractEvent.signals.on('set-xy', modifiers.setXY);

	function shouldDo(options, preEnd, requireEndOnly) {
	  return options && options.enabled && (preEnd || !options.endOnly) && (!requireEndOnly || options.endOnly);
	}

	module.exports = modifiers;

	},{"../InteractEvent":3,"../Interaction":5,"../utils/extend":41}],24:[function(require,module,exports){
	'use strict';

	var modifiers = require('./base');
	var utils = require('../utils');
	var defaultOptions = require('../defaultOptions');

	var restrict = {
	  defaults: {
	    enabled: false,
	    endOnly: false,
	    restriction: null,
	    elementRect: null
	  },

	  setOffset: function setOffset(_ref) {
	    var rect = _ref.rect,
	        startOffset = _ref.startOffset,
	        options = _ref.options;

	    var elementRect = options && options.elementRect;
	    var offset = {};

	    if (rect && elementRect) {
	      offset.left = startOffset.left - rect.width * elementRect.left;
	      offset.top = startOffset.top - rect.height * elementRect.top;

	      offset.right = startOffset.right - rect.width * (1 - elementRect.right);
	      offset.bottom = startOffset.bottom - rect.height * (1 - elementRect.bottom);
	    } else {
	      offset.left = offset.top = offset.right = offset.bottom = 0;
	    }

	    return offset;
	  },

	  set: function set(_ref2) {
	    var modifiedCoords = _ref2.modifiedCoords,
	        interaction = _ref2.interaction,
	        status = _ref2.status,
	        options = _ref2.options;

	    if (!options) {
	      return status;
	    }

	    var page = status.useStatusXY ? { x: status.x, y: status.y } : utils.extend({}, modifiedCoords);

	    var restriction = getRestrictionRect(options.restriction, interaction, page);

	    if (!restriction) {
	      return status;
	    }

	    status.dx = 0;
	    status.dy = 0;
	    status.locked = false;

	    var rect = restriction;
	    var modifiedX = page.x;
	    var modifiedY = page.y;

	    var offset = interaction.modifierOffsets.restrict;

	    // object is assumed to have
	    // x, y, width, height or
	    // left, top, right, bottom
	    if ('x' in restriction && 'y' in restriction) {
	      modifiedX = Math.max(Math.min(rect.x + rect.width - offset.right, page.x), rect.x + offset.left);
	      modifiedY = Math.max(Math.min(rect.y + rect.height - offset.bottom, page.y), rect.y + offset.top);
	    } else {
	      modifiedX = Math.max(Math.min(rect.right - offset.right, page.x), rect.left + offset.left);
	      modifiedY = Math.max(Math.min(rect.bottom - offset.bottom, page.y), rect.top + offset.top);
	    }

	    status.dx = modifiedX - page.x;
	    status.dy = modifiedY - page.y;

	    status.changed = status.modifiedX !== modifiedX || status.modifiedY !== modifiedY;
	    status.locked = !!(status.dx || status.dy);

	    status.modifiedX = modifiedX;
	    status.modifiedY = modifiedY;
	  },

	  modifyCoords: function modifyCoords(_ref3) {
	    var page = _ref3.page,
	        client = _ref3.client,
	        status = _ref3.status,
	        phase = _ref3.phase,
	        options = _ref3.options;

	    var elementRect = options && options.elementRect;

	    if (options && options.enabled && !(phase === 'start' && elementRect && status.locked)) {

	      if (status.locked) {
	        page.x += status.dx;
	        page.y += status.dy;
	        client.x += status.dx;
	        client.y += status.dy;

	        return {
	          dx: status.dx,
	          dy: status.dy
	        };
	      }
	    }
	  },

	  getRestrictionRect: getRestrictionRect
	};

	function getRestrictionRect(value, interaction, page) {
	  if (utils.is.function(value)) {
	    return utils.resolveRectLike(value, interaction.target, interaction.element, [page.x, page.y, interaction]);
	  } else {
	    return utils.resolveRectLike(value, interaction.target, interaction.element);
	  }
	}

	modifiers.restrict = restrict;
	modifiers.names.push('restrict');

	defaultOptions.perAction.restrict = restrict.defaults;

	module.exports = restrict;

	},{"../defaultOptions":18,"../utils":44,"./base":23}],25:[function(require,module,exports){
	'use strict';

	// This module adds the options.resize.restrictEdges setting which sets min and
	// max for the top, left, bottom and right edges of the target being resized.
	//
	// interact(target).resize({
	//   edges: { top: true, left: true },
	//   restrictEdges: {
	//     inner: { top: 200, left: 200, right: 400, bottom: 400 },
	//     outer: { top:   0, left:   0, right: 600, bottom: 600 },
	//   },
	// });

	var modifiers = require('./base');
	var utils = require('../utils');
	var rectUtils = require('../utils/rect');
	var defaultOptions = require('../defaultOptions');
	var resize = require('../actions/resize');

	var _require = require('./restrict'),
	    getRestrictionRect = _require.getRestrictionRect;

	var noInner = { top: +Infinity, left: +Infinity, bottom: -Infinity, right: -Infinity };
	var noOuter = { top: -Infinity, left: -Infinity, bottom: +Infinity, right: +Infinity };

	var restrictEdges = {
	  defaults: {
	    enabled: false,
	    endOnly: false,
	    min: null,
	    max: null,
	    offset: null
	  },

	  setOffset: function setOffset(_ref) {
	    var interaction = _ref.interaction,
	        startOffset = _ref.startOffset,
	        options = _ref.options;

	    if (!options) {
	      return utils.extend({}, startOffset);
	    }

	    var offset = getRestrictionRect(options.offset, interaction, interaction.startCoords.page);

	    if (offset) {
	      return {
	        top: startOffset.top + offset.y,
	        left: startOffset.left + offset.x,
	        bottom: startOffset.bottom + offset.y,
	        right: startOffset.right + offset.x
	      };
	    }

	    return startOffset;
	  },

	  set: function set(_ref2) {
	    var modifiedCoords = _ref2.modifiedCoords,
	        interaction = _ref2.interaction,
	        status = _ref2.status,
	        offset = _ref2.offset,
	        options = _ref2.options;

	    var edges = interaction.prepared.linkedEdges || interaction.prepared.edges;

	    if (!interaction.interacting() || !edges) {
	      return;
	    }

	    var page = status.useStatusXY ? { x: status.x, y: status.y } : utils.extend({}, modifiedCoords);
	    var inner = rectUtils.xywhToTlbr(getRestrictionRect(options.inner, interaction, page)) || noInner;
	    var outer = rectUtils.xywhToTlbr(getRestrictionRect(options.outer, interaction, page)) || noOuter;

	    var modifiedX = page.x;
	    var modifiedY = page.y;

	    status.dx = 0;
	    status.dy = 0;
	    status.locked = false;

	    if (edges.top) {
	      modifiedY = Math.min(Math.max(outer.top + offset.top, page.y), inner.top + offset.top);
	    } else if (edges.bottom) {
	      modifiedY = Math.max(Math.min(outer.bottom - offset.bottom, page.y), inner.bottom - offset.bottom);
	    }
	    if (edges.left) {
	      modifiedX = Math.min(Math.max(outer.left + offset.left, page.x), inner.left + offset.left);
	    } else if (edges.right) {
	      modifiedX = Math.max(Math.min(outer.right - offset.right, page.x), inner.right - offset.right);
	    }

	    status.dx = modifiedX - page.x;
	    status.dy = modifiedY - page.y;

	    status.changed = status.modifiedX !== modifiedX || status.modifiedY !== modifiedY;
	    status.locked = !!(status.dx || status.dy);

	    status.modifiedX = modifiedX;
	    status.modifiedY = modifiedY;
	  },

	  modifyCoords: function modifyCoords(_ref3) {
	    var page = _ref3.page,
	        client = _ref3.client,
	        status = _ref3.status,
	        phase = _ref3.phase,
	        options = _ref3.options;

	    if (options && options.enabled && !(phase === 'start' && status.locked)) {

	      if (status.locked) {
	        page.x += status.dx;
	        page.y += status.dy;
	        client.x += status.dx;
	        client.y += status.dy;

	        return {
	          dx: status.dx,
	          dy: status.dy
	        };
	      }
	    }
	  },

	  noInner: noInner,
	  noOuter: noOuter,
	  getRestrictionRect: getRestrictionRect
	};

	modifiers.restrictEdges = restrictEdges;
	modifiers.names.push('restrictEdges');

	defaultOptions.perAction.restrictEdges = restrictEdges.defaults;
	resize.defaults.restrictEdges = restrictEdges.defaults;

	module.exports = restrictEdges;

	},{"../actions/resize":10,"../defaultOptions":18,"../utils":44,"../utils/rect":51,"./base":23,"./restrict":24}],26:[function(require,module,exports){
	'use strict';

	// This module adds the options.resize.restrictSize setting which sets min and
	// max width and height for the target being resized.
	//
	// interact(target).resize({
	//   edges: { top: true, left: true },
	//   restrictSize: {
	//     min: { width: -600, height: -600 },
	//     max: { width:  600, height:  600 },
	//   },
	// });

	var modifiers = require('./base');
	var restrictEdges = require('./restrictEdges');
	var utils = require('../utils');
	var rectUtils = require('../utils/rect');
	var defaultOptions = require('../defaultOptions');
	var resize = require('../actions/resize');

	var noMin = { width: -Infinity, height: -Infinity };
	var noMax = { width: +Infinity, height: +Infinity };

	var restrictSize = {
	  defaults: {
	    enabled: false,
	    endOnly: false,
	    min: null,
	    max: null
	  },

	  setOffset: function setOffset(_ref) {
	    var interaction = _ref.interaction;

	    return interaction.startOffset;
	  },

	  set: function set(arg) {
	    var interaction = arg.interaction,
	        options = arg.options;

	    var edges = interaction.prepared.linkedEdges || interaction.prepared.edges;

	    if (!interaction.interacting() || !edges) {
	      return;
	    }

	    var rect = rectUtils.xywhToTlbr(interaction.resizeRects.inverted);

	    var minSize = rectUtils.tlbrToXywh(restrictEdges.getRestrictionRect(options.min, interaction)) || noMin;
	    var maxSize = rectUtils.tlbrToXywh(restrictEdges.getRestrictionRect(options.max, interaction)) || noMax;

	    arg.options = {
	      enabled: options.enabled,
	      endOnly: options.endOnly,
	      inner: utils.extend({}, restrictEdges.noInner),
	      outer: utils.extend({}, restrictEdges.noOuter)
	    };

	    if (edges.top) {
	      arg.options.inner.top = rect.bottom - minSize.height;
	      arg.options.outer.top = rect.bottom - maxSize.height;
	    } else if (edges.bottom) {
	      arg.options.inner.bottom = rect.top + minSize.height;
	      arg.options.outer.bottom = rect.top + maxSize.height;
	    }
	    if (edges.left) {
	      arg.options.inner.left = rect.right - minSize.width;
	      arg.options.outer.left = rect.right - maxSize.width;
	    } else if (edges.right) {
	      arg.options.inner.right = rect.left + minSize.width;
	      arg.options.outer.right = rect.left + maxSize.width;
	    }

	    restrictEdges.set(arg);
	  },

	  modifyCoords: restrictEdges.modifyCoords
	};

	modifiers.restrictSize = restrictSize;
	modifiers.names.push('restrictSize');

	defaultOptions.perAction.restrictSize = restrictSize.defaults;
	resize.defaults.restrictSize = restrictSize.defaults;

	module.exports = restrictSize;

	},{"../actions/resize":10,"../defaultOptions":18,"../utils":44,"../utils/rect":51,"./base":23,"./restrictEdges":25}],27:[function(require,module,exports){
	'use strict';

	var modifiers = require('./base');
	var interact = require('../interact');
	var utils = require('../utils');
	var defaultOptions = require('../defaultOptions');

	var snap = {
	  defaults: {
	    enabled: false,
	    endOnly: false,
	    range: Infinity,
	    targets: null,
	    offsets: null,

	    relativePoints: null
	  },

	  setOffset: function setOffset(_ref) {
	    var interaction = _ref.interaction,
	        interactable = _ref.interactable,
	        element = _ref.element,
	        rect = _ref.rect,
	        startOffset = _ref.startOffset,
	        options = _ref.options;

	    var offsets = [];
	    var optionsOrigin = utils.rectToXY(utils.resolveRectLike(options.origin));
	    var origin = optionsOrigin || utils.getOriginXY(interactable, element, interaction.prepared.name);
	    options = options || interactable.options[interaction.prepared.name].snap || {};

	    var snapOffset = void 0;

	    if (options.offset === 'startCoords') {
	      snapOffset = {
	        x: interaction.startCoords.page.x - origin.x,
	        y: interaction.startCoords.page.y - origin.y
	      };
	    } else {
	      var offsetRect = utils.resolveRectLike(options.offset, interactable, element, [interaction]);

	      snapOffset = utils.rectToXY(offsetRect) || { x: 0, y: 0 };
	    }

	    if (rect && options.relativePoints && options.relativePoints.length) {
	      for (var _i = 0; _i < options.relativePoints.length; _i++) {
	        var _ref3;

	        _ref3 = options.relativePoints[_i];
	        var _ref2 = _ref3;
	        var relativeX = _ref2.x;
	        var relativeY = _ref2.y;

	        offsets.push({
	          x: startOffset.left - rect.width * relativeX + snapOffset.x,
	          y: startOffset.top - rect.height * relativeY + snapOffset.y
	        });
	      }
	    } else {
	      offsets.push(snapOffset);
	    }

	    return offsets;
	  },

	  set: function set(_ref4) {
	    var interaction = _ref4.interaction,
	        modifiedCoords = _ref4.modifiedCoords,
	        status = _ref4.status,
	        options = _ref4.options,
	        offsets = _ref4.offset;

	    var targets = [];
	    var target = void 0;
	    var page = void 0;
	    var i = void 0;

	    if (status.useStatusXY) {
	      page = { x: status.x, y: status.y };
	    } else {
	      var origin = utils.getOriginXY(interaction.target, interaction.element, interaction.prepared.name);

	      page = utils.extend({}, modifiedCoords);

	      page.x -= origin.x;
	      page.y -= origin.y;
	    }

	    status.realX = page.x;
	    status.realY = page.y;

	    var len = options.targets ? options.targets.length : 0;

	    for (var _i2 = 0; _i2 < offsets.length; _i2++) {
	      var _ref6;

	      _ref6 = offsets[_i2];
	      var _ref5 = _ref6;
	      var offsetX = _ref5.x;
	      var offsetY = _ref5.y;

	      var relativeX = page.x - offsetX;
	      var relativeY = page.y - offsetY;

	      for (var _i3 = 0; _i3 < (options.targets || []).length; _i3++) {
	        var _ref7;

	        _ref7 = (options.targets || [])[_i3];
	        var snapTarget = _ref7;

	        if (utils.is.function(snapTarget)) {
	          target = snapTarget(relativeX, relativeY, interaction);
	        } else {
	          target = snapTarget;
	        }

	        if (!target) {
	          continue;
	        }

	        targets.push({
	          x: utils.is.number(target.x) ? target.x + offsetX : relativeX,
	          y: utils.is.number(target.y) ? target.y + offsetY : relativeY,

	          range: utils.is.number(target.range) ? target.range : options.range
	        });
	      }
	    }

	    var closest = {
	      target: null,
	      inRange: false,
	      distance: 0,
	      range: 0,
	      dx: 0,
	      dy: 0
	    };

	    for (i = 0, len = targets.length; i < len; i++) {
	      target = targets[i];

	      var range = target.range;
	      var dx = target.x - page.x;
	      var dy = target.y - page.y;
	      var distance = utils.hypot(dx, dy);
	      var inRange = distance <= range;

	      // Infinite targets count as being out of range
	      // compared to non infinite ones that are in range
	      if (range === Infinity && closest.inRange && closest.range !== Infinity) {
	        inRange = false;
	      }

	      if (!closest.target || (inRange
	      // is the closest target in range?
	      ? closest.inRange && range !== Infinity
	      // the pointer is relatively deeper in this target
	      ? distance / range < closest.distance / closest.range
	      // this target has Infinite range and the closest doesn't
	      : range === Infinity && closest.range !== Infinity ||
	      // OR this target is closer that the previous closest
	      distance < closest.distance :
	      // The other is not in range and the pointer is closer to this target
	      !closest.inRange && distance < closest.distance)) {

	        closest.target = target;
	        closest.distance = distance;
	        closest.range = range;
	        closest.inRange = inRange;
	        closest.dx = dx;
	        closest.dy = dy;

	        status.range = range;
	      }
	    }

	    var snapChanged = void 0;

	    if (closest.target) {
	      snapChanged = status.modifiedX !== closest.target.x || status.modifiedY !== closest.target.y;

	      status.modifiedX = closest.target.x;
	      status.modifiedY = closest.target.y;
	    } else {
	      snapChanged = true;

	      status.modifiedX = NaN;
	      status.modifiedY = NaN;
	    }

	    status.dx = closest.dx;
	    status.dy = closest.dy;

	    status.changed = snapChanged || closest.inRange && !status.locked;
	    status.locked = closest.inRange;
	  },

	  modifyCoords: function modifyCoords(_ref8) {
	    var page = _ref8.page,
	        client = _ref8.client,
	        status = _ref8.status,
	        phase = _ref8.phase,
	        options = _ref8.options;

	    var relativePoints = options && options.relativePoints;

	    if (options && options.enabled && !(phase === 'start' && relativePoints && relativePoints.length)) {

	      if (status.locked) {
	        page.x += status.dx;
	        page.y += status.dy;
	        client.x += status.dx;
	        client.y += status.dy;
	      }

	      return {
	        range: status.range,
	        locked: status.locked,
	        x: status.modifiedX,
	        y: status.modifiedY,
	        realX: status.realX,
	        realY: status.realY,
	        dx: status.dx,
	        dy: status.dy
	      };
	    }
	  }
	};

	interact.createSnapGrid = function (grid) {
	  return function (x, y) {
	    var limits = grid.limits || {
	      left: -Infinity,
	      right: Infinity,
	      top: -Infinity,
	      bottom: Infinity
	    };
	    var offsetX = 0;
	    var offsetY = 0;

	    if (utils.is.object(grid.offset)) {
	      offsetX = grid.offset.x;
	      offsetY = grid.offset.y;
	    }

	    var gridx = Math.round((x - offsetX) / grid.x);
	    var gridy = Math.round((y - offsetY) / grid.y);

	    var newX = Math.max(limits.left, Math.min(limits.right, gridx * grid.x + offsetX));
	    var newY = Math.max(limits.top, Math.min(limits.bottom, gridy * grid.y + offsetY));

	    return {
	      x: newX,
	      y: newY,
	      range: grid.range
	    };
	  };
	};

	modifiers.snap = snap;
	modifiers.names.push('snap');

	defaultOptions.perAction.snap = snap.defaults;

	module.exports = snap;

	},{"../defaultOptions":18,"../interact":21,"../utils":44,"./base":23}],28:[function(require,module,exports){
	'use strict';

	// This module allows snapping of the size of targets during resize
	// interactions.

	var modifiers = require('./base');
	var snap = require('./snap');
	var defaultOptions = require('../defaultOptions');
	var resize = require('../actions/resize');
	var utils = require('../utils/');

	var snapSize = {
	  defaults: {
	    enabled: false,
	    endOnly: false,
	    range: Infinity,
	    targets: null,
	    offsets: null
	  },

	  setOffset: function setOffset(arg) {
	    var interaction = arg.interaction,
	        options = arg.options;

	    var edges = interaction.prepared.edges;

	    if (!edges) {
	      return;
	    }

	    arg.options = {
	      relativePoints: [{
	        x: edges.left ? 0 : 1,
	        y: edges.top ? 0 : 1
	      }],
	      origin: { x: 0, y: 0 },
	      offset: 'self',
	      range: options.range
	    };

	    var offsets = snap.setOffset(arg);
	    arg.options = options;

	    return offsets;
	  },

	  set: function set(arg) {
	    var interaction = arg.interaction,
	        options = arg.options,
	        offset = arg.offset,
	        modifiedCoords = arg.modifiedCoords;

	    var page = utils.extend({}, modifiedCoords);
	    var relativeX = page.x - offset[0].x;
	    var relativeY = page.y - offset[0].y;

	    arg.options = utils.extend({}, options);
	    arg.options.targets = [];

	    for (var _i = 0; _i < (options.targets || []).length; _i++) {
	      var _ref;

	      _ref = (options.targets || [])[_i];
	      var snapTarget = _ref;

	      var target = void 0;

	      if (utils.is.function(snapTarget)) {
	        target = snapTarget(relativeX, relativeY, interaction);
	      } else {
	        target = snapTarget;
	      }

	      if (!target) {
	        continue;
	      }

	      if ('width' in target && 'height' in target) {
	        target.x = target.width;
	        target.y = target.height;
	      }

	      arg.options.targets.push(target);
	    }

	    snap.set(arg);
	  },

	  modifyCoords: function modifyCoords(arg) {
	    var options = arg.options;


	    arg.options = utils.extend({}, options);
	    arg.options.enabled = options.enabled;
	    arg.options.relativePoints = [null];

	    snap.modifyCoords(arg);
	  }
	};

	modifiers.snapSize = snapSize;
	modifiers.names.push('snapSize');

	defaultOptions.perAction.snapSize = snapSize.defaults;
	resize.defaults.snapSize = snapSize.defaults;

	module.exports = snapSize;

	},{"../actions/resize":10,"../defaultOptions":18,"../utils/":44,"./base":23,"./snap":27}],29:[function(require,module,exports){
	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var pointerUtils = require('../utils/pointerUtils');

	module.exports = function () {
	  /** */
	  function PointerEvent(type, pointer, event, eventTarget, interaction) {
	    _classCallCheck(this, PointerEvent);

	    pointerUtils.pointerExtend(this, event);

	    if (event !== pointer) {
	      pointerUtils.pointerExtend(this, pointer);
	    }

	    this.interaction = interaction;

	    this.timeStamp = new Date().getTime();
	    this.originalEvent = event;
	    this.type = type;
	    this.pointerId = pointerUtils.getPointerId(pointer);
	    this.pointerType = pointerUtils.getPointerType(pointer);
	    this.target = eventTarget;
	    this.currentTarget = null;

	    if (type === 'tap') {
	      var pointerIndex = interaction.getPointerIndex(pointer);
	      this.dt = this.timeStamp - interaction.downTimes[pointerIndex];

	      var interval = this.timeStamp - interaction.tapTime;

	      this.double = !!(interaction.prevTap && interaction.prevTap.type !== 'doubletap' && interaction.prevTap.target === this.target && interval < 500);
	    } else if (type === 'doubletap') {
	      this.dt = pointer.timeStamp - interaction.tapTime;
	    }
	  }

	  PointerEvent.prototype.subtractOrigin = function subtractOrigin(_ref) {
	    var originX = _ref.x,
	        originY = _ref.y;

	    this.pageX -= originX;
	    this.pageY -= originY;
	    this.clientX -= originX;
	    this.clientY -= originY;

	    return this;
	  };

	  PointerEvent.prototype.addOrigin = function addOrigin(_ref2) {
	    var originX = _ref2.x,
	        originY = _ref2.y;

	    this.pageX += originX;
	    this.pageY += originY;
	    this.clientX += originX;
	    this.clientY += originY;

	    return this;
	  };

	  /** */


	  PointerEvent.prototype.preventDefault = function preventDefault() {
	    this.originalEvent.preventDefault();
	  };

	  /** */


	  PointerEvent.prototype.stopPropagation = function stopPropagation() {
	    this.propagationStopped = true;
	  };

	  /** */


	  PointerEvent.prototype.stopImmediatePropagation = function stopImmediatePropagation() {
	    this.immediatePropagationStopped = this.propagationStopped = true;
	  };

	  return PointerEvent;
	}();

	},{"../utils/pointerUtils":49}],30:[function(require,module,exports){
	'use strict';

	var PointerEvent = require('./PointerEvent');
	var Interaction = require('../Interaction');
	var utils = require('../utils');
	var defaults = require('../defaultOptions');
	var signals = require('../utils/Signals').new();

	var simpleSignals = ['down', 'up', 'cancel'];
	var simpleEvents = ['down', 'up', 'cancel'];

	var pointerEvents = {
	  PointerEvent: PointerEvent,
	  fire: fire,
	  collectEventTargets: collectEventTargets,
	  signals: signals,
	  defaults: {
	    holdDuration: 600,
	    ignoreFrom: null,
	    allowFrom: null,
	    origin: { x: 0, y: 0 }
	  },
	  types: ['down', 'move', 'up', 'cancel', 'tap', 'doubletap', 'hold']
	};

	function fire(arg) {
	  var interaction = arg.interaction,
	      pointer = arg.pointer,
	      event = arg.event,
	      eventTarget = arg.eventTarget,
	      _arg$type = arg.type,
	      type = _arg$type === undefined ? arg.pointerEvent.type : _arg$type,
	      _arg$targets = arg.targets,
	      targets = _arg$targets === undefined ? collectEventTargets(arg) : _arg$targets,
	      _arg$pointerEvent = arg.pointerEvent,
	      pointerEvent = _arg$pointerEvent === undefined ? new PointerEvent(type, pointer, event, eventTarget, interaction) : _arg$pointerEvent;


	  var signalArg = {
	    interaction: interaction,
	    pointer: pointer,
	    event: event,
	    eventTarget: eventTarget,
	    targets: targets,
	    type: type,
	    pointerEvent: pointerEvent
	  };

	  for (var i = 0; i < targets.length; i++) {
	    var target = targets[i];

	    for (var prop in target.props || {}) {
	      pointerEvent[prop] = target.props[prop];
	    }

	    var origin = utils.getOriginXY(target.eventable, target.element);

	    pointerEvent.subtractOrigin(origin);
	    pointerEvent.eventable = target.eventable;
	    pointerEvent.currentTarget = target.element;

	    target.eventable.fire(pointerEvent);

	    pointerEvent.addOrigin(origin);

	    if (pointerEvent.immediatePropagationStopped || pointerEvent.propagationStopped && i + 1 < targets.length && targets[i + 1].element !== pointerEvent.currentTarget) {
	      break;
	    }
	  }

	  signals.fire('fired', signalArg);

	  if (type === 'tap') {
	    // if pointerEvent should make a double tap, create and fire a doubletap
	    // PointerEvent and use that as the prevTap
	    var prevTap = pointerEvent.double ? fire({
	      interaction: interaction, pointer: pointer, event: event, eventTarget: eventTarget,
	      type: 'doubletap'
	    }) : pointerEvent;

	    interaction.prevTap = prevTap;
	    interaction.tapTime = prevTap.timeStamp;
	  }

	  return pointerEvent;
	}

	function collectEventTargets(_ref) {
	  var interaction = _ref.interaction,
	      pointer = _ref.pointer,
	      event = _ref.event,
	      eventTarget = _ref.eventTarget,
	      type = _ref.type;

	  var pointerIndex = interaction.getPointerIndex(pointer);

	  // do not fire a tap event if the pointer was moved before being lifted
	  if (type === 'tap' && (interaction.pointerWasMoved
	  // or if the pointerup target is different to the pointerdown target
	  || !(interaction.downTargets[pointerIndex] && interaction.downTargets[pointerIndex] === eventTarget))) {
	    return [];
	  }

	  var path = utils.getPath(eventTarget);
	  var signalArg = {
	    interaction: interaction,
	    pointer: pointer,
	    event: event,
	    eventTarget: eventTarget,
	    type: type,
	    path: path,
	    targets: [],
	    element: null
	  };

	  for (var _i = 0; _i < path.length; _i++) {
	    var _ref2;

	    _ref2 = path[_i];
	    var element = _ref2;

	    signalArg.element = element;

	    signals.fire('collect-targets', signalArg);
	  }

	  if (type === 'hold') {
	    signalArg.targets = signalArg.targets.filter(function (target) {
	      return target.eventable.options.holdDuration === interaction.holdTimers[pointerIndex].duration;
	    });
	  }

	  return signalArg.targets;
	}

	Interaction.signals.on('update-pointer-down', function (_ref3) {
	  var interaction = _ref3.interaction,
	      pointerIndex = _ref3.pointerIndex;

	  interaction.holdTimers[pointerIndex] = { duration: Infinity, timeout: null };
	});

	Interaction.signals.on('remove-pointer', function (_ref4) {
	  var interaction = _ref4.interaction,
	      pointerIndex = _ref4.pointerIndex;

	  interaction.holdTimers.splice(pointerIndex, 1);
	});

	Interaction.signals.on('move', function (_ref5) {
	  var interaction = _ref5.interaction,
	      pointer = _ref5.pointer,
	      event = _ref5.event,
	      eventTarget = _ref5.eventTarget,
	      duplicateMove = _ref5.duplicateMove;

	  var pointerIndex = interaction.getPointerIndex(pointer);

	  if (!duplicateMove && (!interaction.pointerIsDown || interaction.pointerWasMoved)) {
	    if (interaction.pointerIsDown) {
	      clearTimeout(interaction.holdTimers[pointerIndex].timeout);
	    }

	    fire({
	      interaction: interaction, pointer: pointer, event: event, eventTarget: eventTarget,
	      type: 'move'
	    });
	  }
	});

	Interaction.signals.on('down', function (_ref6) {
	  var interaction = _ref6.interaction,
	      pointer = _ref6.pointer,
	      event = _ref6.event,
	      eventTarget = _ref6.eventTarget,
	      pointerIndex = _ref6.pointerIndex;

	  var timer = interaction.holdTimers[pointerIndex];
	  var path = utils.getPath(eventTarget);
	  var signalArg = {
	    interaction: interaction,
	    pointer: pointer,
	    event: event,
	    eventTarget: eventTarget,
	    type: 'hold',
	    targets: [],
	    path: path,
	    element: null
	  };

	  for (var _i2 = 0; _i2 < path.length; _i2++) {
	    var _ref7;

	    _ref7 = path[_i2];
	    var element = _ref7;

	    signalArg.element = element;

	    signals.fire('collect-targets', signalArg);
	  }

	  if (!signalArg.targets.length) {
	    return;
	  }

	  var minDuration = Infinity;

	  for (var _i3 = 0; _i3 < signalArg.targets.length; _i3++) {
	    var _ref8;

	    _ref8 = signalArg.targets[_i3];
	    var target = _ref8;

	    var holdDuration = target.eventable.options.holdDuration;

	    if (holdDuration < minDuration) {
	      minDuration = holdDuration;
	    }
	  }

	  timer.duration = minDuration;
	  timer.timeout = setTimeout(function () {
	    fire({
	      interaction: interaction,
	      eventTarget: eventTarget,
	      pointer: pointer,
	      event: event,
	      type: 'hold'
	    });
	  }, minDuration);
	});

	Interaction.signals.on('up', function (_ref9) {
	  var interaction = _ref9.interaction,
	      pointer = _ref9.pointer,
	      event = _ref9.event,
	      eventTarget = _ref9.eventTarget;

	  if (!interaction.pointerWasMoved) {
	    fire({ interaction: interaction, eventTarget: eventTarget, pointer: pointer, event: event, type: 'tap' });
	  }
	});

	var _arr = ['up', 'cancel'];
	for (var _i4 = 0; _i4 < _arr.length; _i4++) {
	  var signalName = _arr[_i4];
	  Interaction.signals.on(signalName, function (_ref11) {
	    var interaction = _ref11.interaction,
	        pointerIndex = _ref11.pointerIndex;

	    if (interaction.holdTimers[pointerIndex]) {
	      clearTimeout(interaction.holdTimers[pointerIndex].timeout);
	    }
	  });
	}

	function createSignalListener(type) {
	  return function (_ref10) {
	    var interaction = _ref10.interaction,
	        pointer = _ref10.pointer,
	        event = _ref10.event,
	        eventTarget = _ref10.eventTarget;

	    fire({ interaction: interaction, eventTarget: eventTarget, pointer: pointer, event: event, type: type });
	  };
	}

	for (var i = 0; i < simpleSignals.length; i++) {
	  Interaction.signals.on(simpleSignals[i], createSignalListener(simpleEvents[i]));
	}

	Interaction.signals.on('new', function (interaction) {
	  interaction.prevTap = null; // the most recent tap event on this interaction
	  interaction.tapTime = 0; // time of the most recent tap event
	  interaction.holdTimers = []; // [{ duration, timeout }]
	});

	defaults.pointerEvents = pointerEvents.defaults;
	module.exports = pointerEvents;

	},{"../Interaction":5,"../defaultOptions":18,"../utils":44,"../utils/Signals":34,"./PointerEvent":29}],31:[function(require,module,exports){
	'use strict';

	var pointerEvents = require('./base');
	var Interaction = require('../Interaction');

	pointerEvents.signals.on('new', onNew);
	pointerEvents.signals.on('fired', onFired);

	var _arr = ['move', 'up', 'cancel', 'endall'];
	for (var _i = 0; _i < _arr.length; _i++) {
	  var signal = _arr[_i];
	  Interaction.signals.on(signal, endHoldRepeat);
	}

	function onNew(_ref) {
	  var pointerEvent = _ref.pointerEvent;

	  if (pointerEvent.type !== 'hold') {
	    return;
	  }

	  pointerEvent.count = (pointerEvent.count || 0) + 1;
	}

	function onFired(_ref2) {
	  var interaction = _ref2.interaction,
	      pointerEvent = _ref2.pointerEvent,
	      eventTarget = _ref2.eventTarget,
	      targets = _ref2.targets;

	  if (pointerEvent.type !== 'hold' || !targets.length) {
	    return;
	  }

	  // get the repeat interval from the first eventable
	  var interval = targets[0].eventable.options.holdRepeatInterval;

	  // don't repeat if the interval is 0 or less
	  if (interval <= 0) {
	    return;
	  }

	  // set a timeout to fire the holdrepeat event
	  interaction.holdIntervalHandle = setTimeout(function () {
	    pointerEvents.fire({
	      interaction: interaction,
	      eventTarget: eventTarget,
	      type: 'hold',
	      pointer: pointerEvent,
	      event: pointerEvent
	    });
	  }, interval);
	}

	function endHoldRepeat(_ref3) {
	  var interaction = _ref3.interaction;

	  // set the interaction's holdStopTime property
	  // to stop further holdRepeat events
	  if (interaction.holdIntervalHandle) {
	    clearInterval(interaction.holdIntervalHandle);
	    interaction.holdIntervalHandle = null;
	  }
	}

	// don't repeat by default
	pointerEvents.defaults.holdRepeatInterval = 0;
	pointerEvents.types.push('holdrepeat');

	module.exports = {
	  onNew: onNew,
	  onFired: onFired,
	  endHoldRepeat: endHoldRepeat
	};

	},{"../Interaction":5,"./base":30}],32:[function(require,module,exports){
	'use strict';

	var pointerEvents = require('./base');
	var Interactable = require('../Interactable');
	var is = require('../utils/is');
	var scope = require('../scope');
	var extend = require('../utils/extend');

	var _require = require('../utils/arr'),
	    merge = _require.merge;

	pointerEvents.signals.on('collect-targets', function (_ref) {
	  var targets = _ref.targets,
	      element = _ref.element,
	      type = _ref.type,
	      eventTarget = _ref.eventTarget;

	  scope.interactables.forEachMatch(element, function (interactable) {
	    var eventable = interactable.events;
	    var options = eventable.options;

	    if (eventable[type] && is.element(element) && interactable.testIgnoreAllow(options, element, eventTarget)) {

	      targets.push({
	        element: element,
	        eventable: eventable,
	        props: { interactable: interactable }
	      });
	    }
	  });
	});

	Interactable.signals.on('new', function (_ref2) {
	  var interactable = _ref2.interactable;

	  interactable.events.getRect = function (element) {
	    return interactable.getRect(element);
	  };
	});

	Interactable.signals.on('set', function (_ref3) {
	  var interactable = _ref3.interactable,
	      options = _ref3.options;

	  extend(interactable.events.options, pointerEvents.defaults);
	  extend(interactable.events.options, options);
	});

	merge(Interactable.eventTypes, pointerEvents.types);

	Interactable.prototype.pointerEvents = function (options) {
	  extend(this.events.options, options);

	  return this;
	};

	var __backCompatOption = Interactable.prototype._backCompatOption;

	Interactable.prototype._backCompatOption = function (optionName, newValue) {
	  var ret = __backCompatOption.call(this, optionName, newValue);

	  if (ret === this) {
	    this.events.options[optionName] = newValue;
	  }

	  return ret;
	};

	Interactable.settingsMethods.push('pointerEvents');

	},{"../Interactable":4,"../scope":33,"../utils/arr":35,"../utils/extend":41,"../utils/is":46,"./base":30}],33:[function(require,module,exports){
	'use strict';

	var utils = require('./utils');
	var events = require('./utils/events');
	var signals = require('./utils/Signals').new();

	var _require = require('./utils/window'),
	    getWindow = _require.getWindow;

	var scope = {
	  signals: signals,
	  events: events,
	  utils: utils,

	  // main document
	  document: require('./utils/domObjects').document,
	  // all documents being listened to
	  documents: [],

	  addDocument: function addDocument(doc, win) {
	    // do nothing if document is already known
	    if (utils.contains(scope.documents, doc)) {
	      return false;
	    }

	    win = win || getWindow(doc);

	    scope.documents.push(doc);
	    events.documents.push(doc);

	    // don't add an unload event for the main document
	    // so that the page may be cached in browser history
	    if (doc !== scope.document) {
	      events.add(win, 'unload', scope.onWindowUnload);
	    }

	    signals.fire('add-document', { doc: doc, win: win });
	  },

	  removeDocument: function removeDocument(doc, win) {
	    var index = scope.documents.indexOf(doc);

	    win = win || getWindow(doc);

	    events.remove(win, 'unload', scope.onWindowUnload);

	    scope.documents.splice(index, 1);
	    events.documents.splice(index, 1);

	    signals.fire('remove-document', { win: win, doc: doc });
	  },

	  onWindowUnload: function onWindowUnload() {
	    scope.removeDocument(this.document, this);
	  }
	};

	module.exports = scope;

	},{"./utils":44,"./utils/Signals":34,"./utils/domObjects":38,"./utils/events":40,"./utils/window":52}],34:[function(require,module,exports){
	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Signals = function () {
	  function Signals() {
	    _classCallCheck(this, Signals);

	    this.listeners = {
	      // signalName: [listeners],
	    };
	  }

	  Signals.prototype.on = function on(name, listener) {
	    if (!this.listeners[name]) {
	      this.listeners[name] = [listener];
	      return;
	    }

	    this.listeners[name].push(listener);
	  };

	  Signals.prototype.off = function off(name, listener) {
	    if (!this.listeners[name]) {
	      return;
	    }

	    var index = this.listeners[name].indexOf(listener);

	    if (index !== -1) {
	      this.listeners[name].splice(index, 1);
	    }
	  };

	  Signals.prototype.fire = function fire(name, arg) {
	    var targetListeners = this.listeners[name];

	    if (!targetListeners) {
	      return;
	    }

	    for (var _i = 0; _i < targetListeners.length; _i++) {
	      var _ref;

	      _ref = targetListeners[_i];
	      var listener = _ref;

	      if (listener(arg, name) === false) {
	        return;
	      }
	    }
	  };

	  return Signals;
	}();

	Signals.new = function () {
	  return new Signals();
	};

	module.exports = Signals;

	},{}],35:[function(require,module,exports){
	"use strict";

	function contains(array, target) {
	  return array.indexOf(target) !== -1;
	}

	function merge(target, source) {
	  for (var _i = 0; _i < source.length; _i++) {
	    var _ref;

	    _ref = source[_i];
	    var item = _ref;

	    target.push(item);
	  }

	  return target;
	}

	module.exports = {
	  contains: contains,
	  merge: merge
	};

	},{}],36:[function(require,module,exports){
	'use strict';

	var _require = require('./window'),
	    window = _require.window;

	var is = require('./is');
	var domObjects = require('./domObjects');

	var Element = domObjects.Element;
	var navigator = window.navigator;

	var browser = {
	  // Does the browser support touch input?
	  supportsTouch: !!('ontouchstart' in window || is.function(window.DocumentTouch) && domObjects.document instanceof window.DocumentTouch),

	  // Does the browser support PointerEvents
	  supportsPointerEvent: !!domObjects.PointerEvent,

	  isIOS: /iP(hone|od|ad)/.test(navigator.platform),

	  // scrolling doesn't change the result of getClientRects on iOS 7
	  isIOS7: /iP(hone|od|ad)/.test(navigator.platform) && /OS 7[^\d]/.test(navigator.appVersion),

	  isIe9: /MSIE 9/.test(navigator.userAgent),

	  // prefix matchesSelector
	  prefixedMatchesSelector: 'matches' in Element.prototype ? 'matches' : 'webkitMatchesSelector' in Element.prototype ? 'webkitMatchesSelector' : 'mozMatchesSelector' in Element.prototype ? 'mozMatchesSelector' : 'oMatchesSelector' in Element.prototype ? 'oMatchesSelector' : 'msMatchesSelector',

	  pEventTypes: domObjects.PointerEvent ? domObjects.PointerEvent === window.MSPointerEvent ? {
	    up: 'MSPointerUp',
	    down: 'MSPointerDown',
	    over: 'mouseover',
	    out: 'mouseout',
	    move: 'MSPointerMove',
	    cancel: 'MSPointerCancel'
	  } : {
	    up: 'pointerup',
	    down: 'pointerdown',
	    over: 'pointerover',
	    out: 'pointerout',
	    move: 'pointermove',
	    cancel: 'pointercancel'
	  } : null,

	  // because Webkit and Opera still use 'mousewheel' event type
	  wheelEvent: 'onmousewheel' in domObjects.document ? 'mousewheel' : 'wheel'

	};

	// Opera Mobile must be handled differently
	browser.isOperaMobile = navigator.appName === 'Opera' && browser.supportsTouch && navigator.userAgent.match('Presto');

	module.exports = browser;

	},{"./domObjects":38,"./is":46,"./window":52}],37:[function(require,module,exports){
	'use strict';

	var is = require('./is');

	module.exports = function clone(source) {
	  var dest = {};
	  for (var prop in source) {
	    if (is.plainObject(source[prop])) {
	      dest[prop] = clone(source[prop]);
	    } else {
	      dest[prop] = source[prop];
	    }
	  }
	  return dest;
	};

	},{"./is":46}],38:[function(require,module,exports){
	'use strict';

	var domObjects = {};
	var win = require('./window').window;

	function blank() {}

	domObjects.document = win.document;
	domObjects.DocumentFragment = win.DocumentFragment || blank;
	domObjects.SVGElement = win.SVGElement || blank;
	domObjects.SVGSVGElement = win.SVGSVGElement || blank;
	domObjects.SVGElementInstance = win.SVGElementInstance || blank;
	domObjects.Element = win.Element || blank;
	domObjects.HTMLElement = win.HTMLElement || domObjects.Element;

	domObjects.Event = win.Event;
	domObjects.Touch = win.Touch || blank;
	domObjects.PointerEvent = win.PointerEvent || win.MSPointerEvent;

	module.exports = domObjects;

	},{"./window":52}],39:[function(require,module,exports){
	'use strict';

	var win = require('./window');
	var browser = require('./browser');
	var is = require('./is');
	var domObjects = require('./domObjects');

	var domUtils = {
	  nodeContains: function nodeContains(parent, child) {
	    while (child) {
	      if (child === parent) {
	        return true;
	      }

	      child = child.parentNode;
	    }

	    return false;
	  },

	  closest: function closest(element, selector) {
	    while (is.element(element)) {
	      if (domUtils.matchesSelector(element, selector)) {
	        return element;
	      }

	      element = domUtils.parentNode(element);
	    }

	    return null;
	  },

	  parentNode: function parentNode(node) {
	    var parent = node.parentNode;

	    if (is.docFrag(parent)) {
	      // skip past #shado-root fragments
	      while ((parent = parent.host) && is.docFrag(parent)) {
	        continue;
	      }

	      return parent;
	    }

	    return parent;
	  },

	  matchesSelector: function matchesSelector(element, selector) {
	    // remove /deep/ from selectors if shadowDOM polyfill is used
	    if (win.window !== win.realWindow) {
	      selector = selector.replace(/\/deep\//g, ' ');
	    }

	    return element[browser.prefixedMatchesSelector](selector);
	  },

	  // Test for the element that's "above" all other qualifiers
	  indexOfDeepestElement: function indexOfDeepestElement(elements) {
	    var deepestZoneParents = [];
	    var dropzoneParents = [];
	    var dropzone = void 0;
	    var deepestZone = elements[0];
	    var index = deepestZone ? 0 : -1;
	    var parent = void 0;
	    var child = void 0;
	    var i = void 0;
	    var n = void 0;

	    for (i = 1; i < elements.length; i++) {
	      dropzone = elements[i];

	      // an element might belong to multiple selector dropzones
	      if (!dropzone || dropzone === deepestZone) {
	        continue;
	      }

	      if (!deepestZone) {
	        deepestZone = dropzone;
	        index = i;
	        continue;
	      }

	      // check if the deepest or current are document.documentElement or document.rootElement
	      // - if the current dropzone is, do nothing and continue
	      if (dropzone.parentNode === dropzone.ownerDocument) {
	        continue;
	      }
	      // - if deepest is, update with the current dropzone and continue to next
	      else if (deepestZone.parentNode === dropzone.ownerDocument) {
	          deepestZone = dropzone;
	          index = i;
	          continue;
	        }

	      if (!deepestZoneParents.length) {
	        parent = deepestZone;
	        while (parent.parentNode && parent.parentNode !== parent.ownerDocument) {
	          deepestZoneParents.unshift(parent);
	          parent = parent.parentNode;
	        }
	      }

	      // if this element is an svg element and the current deepest is
	      // an HTMLElement
	      if (deepestZone instanceof domObjects.HTMLElement && dropzone instanceof domObjects.SVGElement && !(dropzone instanceof domObjects.SVGSVGElement)) {

	        if (dropzone === deepestZone.parentNode) {
	          continue;
	        }

	        parent = dropzone.ownerSVGElement;
	      } else {
	        parent = dropzone;
	      }

	      dropzoneParents = [];

	      while (parent.parentNode !== parent.ownerDocument) {
	        dropzoneParents.unshift(parent);
	        parent = parent.parentNode;
	      }

	      n = 0;

	      // get (position of last common ancestor) + 1
	      while (dropzoneParents[n] && dropzoneParents[n] === deepestZoneParents[n]) {
	        n++;
	      }

	      var parents = [dropzoneParents[n - 1], dropzoneParents[n], deepestZoneParents[n]];

	      child = parents[0].lastChild;

	      while (child) {
	        if (child === parents[1]) {
	          deepestZone = dropzone;
	          index = i;
	          deepestZoneParents = [];

	          break;
	        } else if (child === parents[2]) {
	          break;
	        }

	        child = child.previousSibling;
	      }
	    }

	    return index;
	  },

	  matchesUpTo: function matchesUpTo(element, selector, limit) {
	    while (is.element(element)) {
	      if (domUtils.matchesSelector(element, selector)) {
	        return true;
	      }

	      element = domUtils.parentNode(element);

	      if (element === limit) {
	        return domUtils.matchesSelector(element, selector);
	      }
	    }

	    return false;
	  },

	  getActualElement: function getActualElement(element) {
	    return element instanceof domObjects.SVGElementInstance ? element.correspondingUseElement : element;
	  },

	  getScrollXY: function getScrollXY(relevantWindow) {
	    relevantWindow = relevantWindow || win.window;
	    return {
	      x: relevantWindow.scrollX || relevantWindow.document.documentElement.scrollLeft,
	      y: relevantWindow.scrollY || relevantWindow.document.documentElement.scrollTop
	    };
	  },

	  getElementClientRect: function getElementClientRect(element) {
	    var clientRect = element instanceof domObjects.SVGElement ? element.getBoundingClientRect() : element.getClientRects()[0];

	    return clientRect && {
	      left: clientRect.left,
	      right: clientRect.right,
	      top: clientRect.top,
	      bottom: clientRect.bottom,
	      width: clientRect.width || clientRect.right - clientRect.left,
	      height: clientRect.height || clientRect.bottom - clientRect.top
	    };
	  },

	  getElementRect: function getElementRect(element) {
	    var clientRect = domUtils.getElementClientRect(element);

	    if (!browser.isIOS7 && clientRect) {
	      var scroll = domUtils.getScrollXY(win.getWindow(element));

	      clientRect.left += scroll.x;
	      clientRect.right += scroll.x;
	      clientRect.top += scroll.y;
	      clientRect.bottom += scroll.y;
	    }

	    return clientRect;
	  },

	  getPath: function getPath(element) {
	    var path = [];

	    while (element) {
	      path.push(element);
	      element = domUtils.parentNode(element);
	    }

	    return path;
	  },

	  trySelector: function trySelector(value) {
	    if (!is.string(value)) {
	      return false;
	    }

	    // an exception will be raised if it is invalid
	    domObjects.document.querySelector(value);
	    return true;
	  }
	};

	module.exports = domUtils;

	},{"./browser":36,"./domObjects":38,"./is":46,"./window":52}],40:[function(require,module,exports){
	'use strict';

	var is = require('./is');
	var domUtils = require('./domUtils');
	var pointerUtils = require('./pointerUtils');
	var pExtend = require('./pointerExtend');

	var _require = require('./window'),
	    window = _require.window;

	var _require2 = require('./arr'),
	    contains = _require2.contains;

	var elements = [];
	var targets = [];

	// {
	//   type: {
	//     selectors: ['selector', ...],
	//     contexts : [document, ...],
	//     listeners: [[listener, capture, passive], ...]
	//   }
	//  }
	var delegatedEvents = {};
	var documents = [];

	var supportsOptions = function () {
	  var supported = false;

	  window.document.createElement('div').addEventListener('test', null, {
	    get capture() {
	      supported = true;
	    }
	  });

	  return supported;
	}();

	function add(element, type, listener, optionalArg) {
	  var options = getOptions(optionalArg);
	  var elementIndex = elements.indexOf(element);
	  var target = targets[elementIndex];

	  if (!target) {
	    target = {
	      events: {},
	      typeCount: 0
	    };

	    elementIndex = elements.push(element) - 1;
	    targets.push(target);
	  }

	  if (!target.events[type]) {
	    target.events[type] = [];
	    target.typeCount++;
	  }

	  if (!contains(target.events[type], listener)) {
	    element.addEventListener(type, listener, supportsOptions ? options : !!options.capture);
	    target.events[type].push(listener);
	  }
	}

	function remove(element, type, listener, optionalArg) {
	  var options = getOptions(optionalArg);
	  var elementIndex = elements.indexOf(element);
	  var target = targets[elementIndex];

	  if (!target || !target.events) {
	    return;
	  }

	  if (type === 'all') {
	    for (type in target.events) {
	      if (target.events.hasOwnProperty(type)) {
	        remove(element, type, 'all');
	      }
	    }
	    return;
	  }

	  if (target.events[type]) {
	    var len = target.events[type].length;

	    if (listener === 'all') {
	      for (var i = 0; i < len; i++) {
	        remove(element, type, target.events[type][i], options);
	      }
	      return;
	    } else {
	      for (var _i = 0; _i < len; _i++) {
	        if (target.events[type][_i] === listener) {
	          element.removeEventListener('on' + type, listener, supportsOptions ? options : !!options.capture);
	          target.events[type].splice(_i, 1);

	          break;
	        }
	      }
	    }

	    if (target.events[type] && target.events[type].length === 0) {
	      target.events[type] = null;
	      target.typeCount--;
	    }
	  }

	  if (!target.typeCount) {
	    targets.splice(elementIndex, 1);
	    elements.splice(elementIndex, 1);
	  }
	}

	function addDelegate(selector, context, type, listener, optionalArg) {
	  var options = getOptions(optionalArg);
	  if (!delegatedEvents[type]) {
	    delegatedEvents[type] = {
	      selectors: [],
	      contexts: [],
	      listeners: []
	    };

	    // add delegate listener functions
	    for (var _i2 = 0; _i2 < documents.length; _i2++) {
	      var doc = documents[_i2];
	      add(doc, type, delegateListener);
	      add(doc, type, delegateUseCapture, true);
	    }
	  }

	  var delegated = delegatedEvents[type];
	  var index = void 0;

	  for (index = delegated.selectors.length - 1; index >= 0; index--) {
	    if (delegated.selectors[index] === selector && delegated.contexts[index] === context) {
	      break;
	    }
	  }

	  if (index === -1) {
	    index = delegated.selectors.length;

	    delegated.selectors.push(selector);
	    delegated.contexts.push(context);
	    delegated.listeners.push([]);
	  }

	  // keep listener and capture and passive flags
	  delegated.listeners[index].push([listener, !!options.capture, options.passive]);
	}

	function removeDelegate(selector, context, type, listener, optionalArg) {
	  var options = getOptions(optionalArg);
	  var delegated = delegatedEvents[type];
	  var matchFound = false;
	  var index = void 0;

	  if (!delegated) {
	    return;
	  }

	  // count from last index of delegated to 0
	  for (index = delegated.selectors.length - 1; index >= 0; index--) {
	    // look for matching selector and context Node
	    if (delegated.selectors[index] === selector && delegated.contexts[index] === context) {

	      var listeners = delegated.listeners[index];

	      // each item of the listeners array is an array: [function, capture, passive]
	      for (var i = listeners.length - 1; i >= 0; i--) {
	        var _listeners$i = listeners[i],
	            fn = _listeners$i[0],
	            capture = _listeners$i[1],
	            passive = _listeners$i[2];

	        // check if the listener functions and capture and passive flags match

	        if (fn === listener && capture === !!options.capture && passive === options.passive) {
	          // remove the listener from the array of listeners
	          listeners.splice(i, 1);

	          // if all listeners for this interactable have been removed
	          // remove the interactable from the delegated arrays
	          if (!listeners.length) {
	            delegated.selectors.splice(index, 1);
	            delegated.contexts.splice(index, 1);
	            delegated.listeners.splice(index, 1);

	            // remove delegate function from context
	            remove(context, type, delegateListener);
	            remove(context, type, delegateUseCapture, true);

	            // remove the arrays if they are empty
	            if (!delegated.selectors.length) {
	              delegatedEvents[type] = null;
	            }
	          }

	          // only remove one listener
	          matchFound = true;
	          break;
	        }
	      }

	      if (matchFound) {
	        break;
	      }
	    }
	  }
	}

	// bound to the interactable context when a DOM event
	// listener is added to a selector interactable
	function delegateListener(event, optionalArg) {
	  var options = getOptions(optionalArg);
	  var fakeEvent = {};
	  var delegated = delegatedEvents[event.type];

	  var _pointerUtils$getEven = pointerUtils.getEventTargets(event),
	      eventTarget = _pointerUtils$getEven[0];

	  var element = eventTarget;

	  // duplicate the event so that currentTarget can be changed
	  pExtend(fakeEvent, event);

	  fakeEvent.originalEvent = event;
	  fakeEvent.preventDefault = preventOriginalDefault;

	  // climb up document tree looking for selector matches
	  while (is.element(element)) {
	    for (var i = 0; i < delegated.selectors.length; i++) {
	      var selector = delegated.selectors[i];
	      var context = delegated.contexts[i];

	      if (domUtils.matchesSelector(element, selector) && domUtils.nodeContains(context, eventTarget) && domUtils.nodeContains(context, element)) {

	        var listeners = delegated.listeners[i];

	        fakeEvent.currentTarget = element;

	        for (var j = 0; j < listeners.length; j++) {
	          var _listeners$j = listeners[j],
	              fn = _listeners$j[0],
	              capture = _listeners$j[1],
	              passive = _listeners$j[2];


	          if (capture === !!options.capture && passive === options.passive) {
	            fn(fakeEvent);
	          }
	        }
	      }
	    }

	    element = domUtils.parentNode(element);
	  }
	}

	function delegateUseCapture(event) {
	  return delegateListener.call(this, event, true);
	}

	function preventOriginalDefault() {
	  this.originalEvent.preventDefault();
	}

	function getOptions(param) {
	  return is.object(param) ? param : { capture: param };
	}

	module.exports = {
	  add: add,
	  remove: remove,

	  addDelegate: addDelegate,
	  removeDelegate: removeDelegate,

	  delegateListener: delegateListener,
	  delegateUseCapture: delegateUseCapture,
	  delegatedEvents: delegatedEvents,
	  documents: documents,

	  supportsOptions: supportsOptions,

	  _elements: elements,
	  _targets: targets
	};

	},{"./arr":35,"./domUtils":39,"./is":46,"./pointerExtend":48,"./pointerUtils":49,"./window":52}],41:[function(require,module,exports){
	"use strict";

	module.exports = function extend(dest, source) {
	  for (var prop in source) {
	    dest[prop] = source[prop];
	  }
	  return dest;
	};

	},{}],42:[function(require,module,exports){
	'use strict';

	var _require = require('./rect'),
	    resolveRectLike = _require.resolveRectLike,
	    rectToXY = _require.rectToXY;

	module.exports = function (target, element, action) {
	  var actionOptions = target.options[action];
	  var actionOrigin = actionOptions && actionOptions.origin;
	  var origin = actionOrigin || target.options.origin;

	  var originRect = resolveRectLike(origin, target, element, [target && element]);

	  return rectToXY(originRect) || { x: 0, y: 0 };
	};

	},{"./rect":51}],43:[function(require,module,exports){
	"use strict";

	module.exports = function (x, y) {
	  return Math.sqrt(x * x + y * y);
	};

	},{}],44:[function(require,module,exports){
	'use strict';

	var extend = require('./extend');
	var win = require('./window');

	var utils = {
	  warnOnce: function warnOnce(method, message) {
	    var warned = false;

	    return function () {
	      if (!warned) {
	        win.window.console.warn(message);
	        warned = true;
	      }

	      return method.apply(this, arguments);
	    };
	  },

	  // http://stackoverflow.com/a/5634528/2280888
	  _getQBezierValue: function _getQBezierValue(t, p1, p2, p3) {
	    var iT = 1 - t;
	    return iT * iT * p1 + 2 * iT * t * p2 + t * t * p3;
	  },

	  getQuadraticCurvePoint: function getQuadraticCurvePoint(startX, startY, cpX, cpY, endX, endY, position) {
	    return {
	      x: utils._getQBezierValue(position, startX, cpX, endX),
	      y: utils._getQBezierValue(position, startY, cpY, endY)
	    };
	  },

	  // http://gizma.com/easing/
	  easeOutQuad: function easeOutQuad(t, b, c, d) {
	    t /= d;
	    return -c * t * (t - 2) + b;
	  },

	  copyAction: function copyAction(dest, src) {
	    dest.name = src.name;
	    dest.axis = src.axis;
	    dest.edges = src.edges;

	    return dest;
	  },

	  is: require('./is'),
	  extend: extend,
	  hypot: require('./hypot'),
	  getOriginXY: require('./getOriginXY')
	};

	extend(utils, require('./arr'));
	extend(utils, require('./domUtils'));
	extend(utils, require('./pointerUtils'));
	extend(utils, require('./rect'));

	module.exports = utils;

	},{"./arr":35,"./domUtils":39,"./extend":41,"./getOriginXY":42,"./hypot":43,"./is":46,"./pointerUtils":49,"./rect":51,"./window":52}],45:[function(require,module,exports){
	'use strict';

	var scope = require('../scope');
	var utils = require('./index');

	var finder = {
	  methodOrder: ['simulationResume', 'mouseOrPen', 'hasPointer', 'idle'],

	  search: function search(pointer, eventType, eventTarget) {
	    var pointerType = utils.getPointerType(pointer);
	    var pointerId = utils.getPointerId(pointer);
	    var details = { pointer: pointer, pointerId: pointerId, pointerType: pointerType, eventType: eventType, eventTarget: eventTarget };

	    for (var _i = 0; _i < finder.methodOrder.length; _i++) {
	      var _ref;

	      _ref = finder.methodOrder[_i];
	      var method = _ref;

	      var interaction = finder[method](details);

	      if (interaction) {
	        return interaction;
	      }
	    }
	  },

	  // try to resume simulation with a new pointer
	  simulationResume: function simulationResume(_ref2) {
	    var pointerType = _ref2.pointerType,
	        eventType = _ref2.eventType,
	        eventTarget = _ref2.eventTarget;

	    if (!/down|start/i.test(eventType)) {
	      return null;
	    }

	    for (var _i2 = 0; _i2 < scope.interactions.length; _i2++) {
	      var _ref3;

	      _ref3 = scope.interactions[_i2];
	      var interaction = _ref3;

	      var element = eventTarget;

	      if (interaction.simulation && interaction.simulation.allowResume && interaction.pointerType === pointerType) {
	        while (element) {
	          // if the element is the interaction element
	          if (element === interaction.element) {
	            return interaction;
	          }
	          element = utils.parentNode(element);
	        }
	      }
	    }

	    return null;
	  },

	  // if it's a mouse or pen interaction
	  mouseOrPen: function mouseOrPen(_ref4) {
	    var pointerId = _ref4.pointerId,
	        pointerType = _ref4.pointerType,
	        eventType = _ref4.eventType;

	    if (pointerType !== 'mouse' && pointerType !== 'pen') {
	      return null;
	    }

	    var firstNonActive = void 0;

	    for (var _i3 = 0; _i3 < scope.interactions.length; _i3++) {
	      var _ref5;

	      _ref5 = scope.interactions[_i3];
	      var interaction = _ref5;

	      if (interaction.pointerType === pointerType) {
	        // if it's a down event, skip interactions with running simulations
	        if (interaction.simulation && !utils.contains(interaction.pointerIds, pointerId)) {
	          continue;
	        }

	        // if the interaction is active, return it immediately
	        if (interaction.interacting()) {
	          return interaction;
	        }
	        // otherwise save it and look for another active interaction
	        else if (!firstNonActive) {
	            firstNonActive = interaction;
	          }
	      }
	    }

	    // if no active mouse interaction was found use the first inactive mouse
	    // interaction
	    if (firstNonActive) {
	      return firstNonActive;
	    }

	    // find any mouse or pen interaction.
	    // ignore the interaction if the eventType is a *down, and a simulation
	    // is active
	    for (var _i4 = 0; _i4 < scope.interactions.length; _i4++) {
	      var _ref6;

	      _ref6 = scope.interactions[_i4];
	      var _interaction = _ref6;

	      if (_interaction.pointerType === pointerType && !(/down/i.test(eventType) && _interaction.simulation)) {
	        return _interaction;
	      }
	    }

	    return null;
	  },

	  // get interaction that has this pointer
	  hasPointer: function hasPointer(_ref7) {
	    var pointerId = _ref7.pointerId;

	    for (var _i5 = 0; _i5 < scope.interactions.length; _i5++) {
	      var _ref8;

	      _ref8 = scope.interactions[_i5];
	      var interaction = _ref8;

	      if (utils.contains(interaction.pointerIds, pointerId)) {
	        return interaction;
	      }
	    }
	  },

	  // get first idle interaction with a matching pointerType
	  idle: function idle(_ref9) {
	    var pointerType = _ref9.pointerType;

	    for (var _i6 = 0; _i6 < scope.interactions.length; _i6++) {
	      var _ref10;

	      _ref10 = scope.interactions[_i6];
	      var interaction = _ref10;

	      // if there's already a pointer held down
	      if (interaction.pointerIds.length === 1) {
	        var target = interaction.target;
	        // don't add this pointer if there is a target interactable and it
	        // isn't gesturable
	        if (target && !target.options.gesture.enabled) {
	          continue;
	        }
	      }
	      // maximum of 2 pointers per interaction
	      else if (interaction.pointerIds.length >= 2) {
	          continue;
	        }

	      if (!interaction.interacting() && pointerType === interaction.pointerType) {
	        return interaction;
	      }
	    }

	    return null;
	  }
	};

	module.exports = finder;

	},{"../scope":33,"./index":44}],46:[function(require,module,exports){
	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var win = require('./window');
	var isWindow = require('./isWindow');

	var is = {
	  array: function array() {},

	  window: function window(thing) {
	    return thing === win.window || isWindow(thing);
	  },

	  docFrag: function docFrag(thing) {
	    return is.object(thing) && thing.nodeType === 11;
	  },

	  object: function object(thing) {
	    return !!thing && (typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) === 'object';
	  },

	  function: function _function(thing) {
	    return typeof thing === 'function';
	  },

	  number: function number(thing) {
	    return typeof thing === 'number';
	  },

	  bool: function bool(thing) {
	    return typeof thing === 'boolean';
	  },

	  string: function string(thing) {
	    return typeof thing === 'string';
	  },

	  element: function element(thing) {
	    if (!thing || (typeof thing === 'undefined' ? 'undefined' : _typeof(thing)) !== 'object') {
	      return false;
	    }

	    var _window = win.getWindow(thing) || win.window;

	    return (/object|function/.test(_typeof(_window.Element)) ? thing instanceof _window.Element //DOM2
	      : thing.nodeType === 1 && typeof thing.nodeName === 'string'
	    );
	  },

	  plainObject: function plainObject(thing) {
	    return is.object(thing) && thing.constructor.name === 'Object';
	  }
	};

	is.array = function (thing) {
	  return is.object(thing) && typeof thing.length !== 'undefined' && is.function(thing.splice);
	};

	module.exports = is;

	},{"./isWindow":47,"./window":52}],47:[function(require,module,exports){
	"use strict";

	module.exports = function (thing) {
	  return !!(thing && thing.Window) && thing instanceof thing.Window;
	};

	},{}],48:[function(require,module,exports){
	'use strict';

	function pointerExtend(dest, source) {
	  for (var prop in source) {
	    var prefixedPropREs = module.exports.prefixedPropREs;
	    var deprecated = false;

	    // skip deprecated prefixed properties
	    for (var vendor in prefixedPropREs) {
	      if (prop.indexOf(vendor) === 0 && prefixedPropREs[vendor].test(prop)) {
	        deprecated = true;
	        break;
	      }
	    }

	    if (!deprecated && typeof source[prop] !== 'function') {
	      dest[prop] = source[prop];
	    }
	  }
	  return dest;
	}

	pointerExtend.prefixedPropREs = {
	  webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/
	};

	module.exports = pointerExtend;

	},{}],49:[function(require,module,exports){
	'use strict';

	var hypot = require('./hypot');
	var browser = require('./browser');
	var dom = require('./domObjects');
	var domUtils = require('./domUtils');
	var domObjects = require('./domObjects');
	var is = require('./is');
	var pointerExtend = require('./pointerExtend');

	var pointerUtils = {
	  copyCoords: function copyCoords(dest, src) {
	    dest.page = dest.page || {};
	    dest.page.x = src.page.x;
	    dest.page.y = src.page.y;

	    dest.client = dest.client || {};
	    dest.client.x = src.client.x;
	    dest.client.y = src.client.y;

	    dest.timeStamp = src.timeStamp;
	  },

	  setCoordDeltas: function setCoordDeltas(targetObj, prev, cur) {
	    targetObj.page.x = cur.page.x - prev.page.x;
	    targetObj.page.y = cur.page.y - prev.page.y;
	    targetObj.client.x = cur.client.x - prev.client.x;
	    targetObj.client.y = cur.client.y - prev.client.y;
	    targetObj.timeStamp = cur.timeStamp - prev.timeStamp;

	    // set pointer velocity
	    var dt = Math.max(targetObj.timeStamp / 1000, 0.001);

	    targetObj.page.speed = hypot(targetObj.page.x, targetObj.page.y) / dt;
	    targetObj.page.vx = targetObj.page.x / dt;
	    targetObj.page.vy = targetObj.page.y / dt;

	    targetObj.client.speed = hypot(targetObj.client.x, targetObj.page.y) / dt;
	    targetObj.client.vx = targetObj.client.x / dt;
	    targetObj.client.vy = targetObj.client.y / dt;
	  },

	  isNativePointer: function isNativePointer(pointer) {
	    return pointer instanceof dom.Event || pointer instanceof dom.Touch;
	  },

	  // Get specified X/Y coords for mouse or event.touches[0]
	  getXY: function getXY(type, pointer, xy) {
	    xy = xy || {};
	    type = type || 'page';

	    xy.x = pointer[type + 'X'];
	    xy.y = pointer[type + 'Y'];

	    return xy;
	  },

	  getPageXY: function getPageXY(pointer, page) {
	    page = page || {};

	    // Opera Mobile handles the viewport and scrolling oddly
	    if (browser.isOperaMobile && pointerUtils.isNativePointer(pointer)) {
	      pointerUtils.getXY('screen', pointer, page);

	      page.x += window.scrollX;
	      page.y += window.scrollY;
	    } else {
	      pointerUtils.getXY('page', pointer, page);
	    }

	    return page;
	  },

	  getClientXY: function getClientXY(pointer, client) {
	    client = client || {};

	    if (browser.isOperaMobile && pointerUtils.isNativePointer(pointer)) {
	      // Opera Mobile handles the viewport and scrolling oddly
	      pointerUtils.getXY('screen', pointer, client);
	    } else {
	      pointerUtils.getXY('client', pointer, client);
	    }

	    return client;
	  },

	  getPointerId: function getPointerId(pointer) {
	    return is.number(pointer.pointerId) ? pointer.pointerId : pointer.identifier;
	  },

	  setCoords: function setCoords(targetObj, pointers, timeStamp) {
	    var pointer = pointers.length > 1 ? pointerUtils.pointerAverage(pointers) : pointers[0];

	    var tmpXY = {};

	    pointerUtils.getPageXY(pointer, tmpXY);
	    targetObj.page.x = tmpXY.x;
	    targetObj.page.y = tmpXY.y;

	    pointerUtils.getClientXY(pointer, tmpXY);
	    targetObj.client.x = tmpXY.x;
	    targetObj.client.y = tmpXY.y;

	    targetObj.timeStamp = is.number(timeStamp) ? timeStamp : new Date().getTime();
	  },

	  pointerExtend: pointerExtend,

	  getTouchPair: function getTouchPair(event) {
	    var touches = [];

	    // array of touches is supplied
	    if (is.array(event)) {
	      touches[0] = event[0];
	      touches[1] = event[1];
	    }
	    // an event
	    else {
	        if (event.type === 'touchend') {
	          if (event.touches.length === 1) {
	            touches[0] = event.touches[0];
	            touches[1] = event.changedTouches[0];
	          } else if (event.touches.length === 0) {
	            touches[0] = event.changedTouches[0];
	            touches[1] = event.changedTouches[1];
	          }
	        } else {
	          touches[0] = event.touches[0];
	          touches[1] = event.touches[1];
	        }
	      }

	    return touches;
	  },

	  pointerAverage: function pointerAverage(pointers) {
	    var average = {
	      pageX: 0,
	      pageY: 0,
	      clientX: 0,
	      clientY: 0,
	      screenX: 0,
	      screenY: 0
	    };

	    for (var _i = 0; _i < pointers.length; _i++) {
	      var _ref;

	      _ref = pointers[_i];
	      var pointer = _ref;

	      for (var _prop in average) {
	        average[_prop] += pointer[_prop];
	      }
	    }
	    for (var prop in average) {
	      average[prop] /= pointers.length;
	    }

	    return average;
	  },

	  touchBBox: function touchBBox(event) {
	    if (!event.length && !(event.touches && event.touches.length > 1)) {
	      return;
	    }

	    var touches = pointerUtils.getTouchPair(event);
	    var minX = Math.min(touches[0].pageX, touches[1].pageX);
	    var minY = Math.min(touches[0].pageY, touches[1].pageY);
	    var maxX = Math.max(touches[0].pageX, touches[1].pageX);
	    var maxY = Math.max(touches[0].pageY, touches[1].pageY);

	    return {
	      x: minX,
	      y: minY,
	      left: minX,
	      top: minY,
	      width: maxX - minX,
	      height: maxY - minY
	    };
	  },

	  touchDistance: function touchDistance(event, deltaSource) {
	    var sourceX = deltaSource + 'X';
	    var sourceY = deltaSource + 'Y';
	    var touches = pointerUtils.getTouchPair(event);

	    var dx = touches[0][sourceX] - touches[1][sourceX];
	    var dy = touches[0][sourceY] - touches[1][sourceY];

	    return hypot(dx, dy);
	  },

	  touchAngle: function touchAngle(event, prevAngle, deltaSource) {
	    var sourceX = deltaSource + 'X';
	    var sourceY = deltaSource + 'Y';
	    var touches = pointerUtils.getTouchPair(event);
	    var dx = touches[1][sourceX] - touches[0][sourceX];
	    var dy = touches[1][sourceY] - touches[0][sourceY];
	    var angle = 180 * Math.atan2(dy, dx) / Math.PI;

	    return angle;
	  },

	  getPointerType: function getPointerType(pointer) {
	    return is.string(pointer.pointerType) ? pointer.pointerType : is.number(pointer.pointerType) ? [undefined, undefined, 'touch', 'pen', 'mouse'][pointer.pointerType]
	    // if the PointerEvent API isn't available, then the "pointer" must
	    // be either a MouseEvent, TouchEvent, or Touch object
	    : /touch/.test(pointer.type) || pointer instanceof domObjects.Touch ? 'touch' : 'mouse';
	  },

	  // [ event.target, event.currentTarget ]
	  getEventTargets: function getEventTargets(event) {
	    var path = is.function(event.composedPath) ? event.composedPath() : event.path;

	    return [domUtils.getActualElement(path ? path[0] : event.target), domUtils.getActualElement(event.currentTarget)];
	  }
	};

	module.exports = pointerUtils;

	},{"./browser":36,"./domObjects":38,"./domUtils":39,"./hypot":43,"./is":46,"./pointerExtend":48}],50:[function(require,module,exports){
	'use strict';

	var _require = require('./window'),
	    window = _require.window;

	var vendors = ['ms', 'moz', 'webkit', 'o'];
	var lastTime = 0;
	var request = void 0;
	var cancel = void 0;

	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++) {
	  request = window[vendors[x] + 'RequestAnimationFrame'];
	  cancel = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!request) {
	  request = function request(callback) {
	    var currTime = new Date().getTime();
	    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	    var id = setTimeout(function () {
	      callback(currTime + timeToCall);
	    }, timeToCall);

	    lastTime = currTime + timeToCall;
	    return id;
	  };
	}

	if (!cancel) {
	  cancel = function cancel(id) {
	    clearTimeout(id);
	  };
	}

	module.exports = {
	  request: request,
	  cancel: cancel
	};

	},{"./window":52}],51:[function(require,module,exports){
	'use strict';

	var extend = require('./extend');
	var is = require('./is');

	var _require = require('./domUtils'),
	    closest = _require.closest,
	    parentNode = _require.parentNode,
	    getElementRect = _require.getElementRect;

	var rectUtils = {
	  getStringOptionResult: function getStringOptionResult(value, interactable, element) {
	    if (!is.string(value)) {
	      return null;
	    }

	    if (value === 'parent') {
	      value = parentNode(element);
	    } else if (value === 'self') {
	      value = interactable.getRect(element);
	    } else {
	      value = closest(element, value);
	    }

	    return value;
	  },

	  resolveRectLike: function resolveRectLike(value, interactable, element, functionArgs) {
	    value = rectUtils.getStringOptionResult(value, interactable, element) || value;

	    if (is.function(value)) {
	      value = value.apply(null, functionArgs);
	    }

	    if (is.element(value)) {
	      value = getElementRect(value);
	    }

	    return value;
	  },

	  rectToXY: function rectToXY(rect) {
	    return rect && {
	      x: 'x' in rect ? rect.x : rect.left,
	      y: 'y' in rect ? rect.y : rect.top
	    };
	  },

	  xywhToTlbr: function xywhToTlbr(rect) {
	    if (rect && !('left' in rect && 'top' in rect)) {
	      rect = extend({}, rect);

	      rect.left = rect.x || 0;
	      rect.top = rect.y || 0;
	      rect.right = rect.right || rect.left + rect.width;
	      rect.bottom = rect.bottom || rect.top + rect.height;
	    }

	    return rect;
	  },

	  tlbrToXywh: function tlbrToXywh(rect) {
	    if (rect && !('x' in rect && 'y' in rect)) {
	      rect = extend({}, rect);

	      rect.x = rect.left || 0;
	      rect.top = rect.top || 0;
	      rect.width = rect.width || rect.right - rect.x;
	      rect.height = rect.height || rect.bottom - rect.y;
	    }

	    return rect;
	  }
	};

	module.exports = rectUtils;

	},{"./domUtils":39,"./extend":41,"./is":46}],52:[function(require,module,exports){
	'use strict';

	var win = module.exports;
	var isWindow = require('./isWindow');

	function init(window) {
	  // get wrapped window if using Shadow DOM polyfill

	  win.realWindow = window;

	  // create a TextNode
	  var el = window.document.createTextNode('');

	  // check if it's wrapped by a polyfill
	  if (el.ownerDocument !== window.document && typeof window.wrap === 'function' && window.wrap(el) === el) {
	    // use wrapped window
	    window = window.wrap(window);
	  }

	  win.window = window;
	}

	if (typeof window === 'undefined') {
	  win.window = undefined;
	  win.realWindow = undefined;
	} else {
	  init(window);
	}

	win.getWindow = function getWindow(node) {
	  if (isWindow(node)) {
	    return node;
	  }

	  var rootNode = node.ownerDocument || node;

	  return rootNode.defaultView || rootNode.parentWindow || win.window;
	};

	win.init = init;

	},{"./isWindow":47}]},{},[1])(1)
	});


	//# sourceMappingURL=interact.js.map


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(45);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// @ts-check

	function createAnchor(_ref) {
	  var left = _ref.left,
	      right = _ref.right,
	      top = _ref.top,
	      bottom = _ref.bottom;

	  var dom = document.createElement("div");
	  dom.className = "geo-anchor";
	  dom.style.left = left;
	  dom.style.right = right;
	  dom.style.top = top;
	  dom.style.bottom = bottom;
	  return dom;
	}

	/**
	 *
	 * @return {HTMLDivElement}
	 */
	function createtextEle() {
	  var ele = document.createElement("textarea");
	  ele.className = "geo-marker-input";
	  ele.placeholder = "双击此处上传图片";
	  return ele;
	}

	/**
	 *
	 * @return {HTMLImageElement}
	 */
	function createImage() {
	  var ele = document.createElement("img");
	  ele.className = "geo-marker-image";
	  return ele;
	}

	function createDeleteHover() {
	  var ele = document.createElement("div");
	  ele.className = "geo-marker-delete-horver";
	  ele.innerText = "再次双击删除图片";
	  ele.style.display = "none";
	  return ele;
	}

	/**
	 * @return {HTMLInputElement}
	 */
	function createFileInput() {
	  var input = document.createElement("input");
	  input.type = "file";
	  input.style.display = "none";
	  input.accept = "image/*";
	  return input;
	}

	var ImageMarker = function (_GeoVis$DomMarker) {
	  _inherits(ImageMarker, _GeoVis$DomMarker);

	  /**
	   *
	   * @param {LonlatTuple||Cartesian} pos
	   * @param {*} options id,weight
	   */
	  function ImageMarker(pos, options) {
	    _classCallCheck(this, ImageMarker);

	    var textEle = createtextEle();
	    options.dom = textEle;

	    var _this = _possibleConstructorReturn(this, (ImageMarker.__proto__ || Object.getPrototypeOf(ImageMarker)).call(this, pos, options));

	    _this.loadImage = function (e) {
	      if (_this.imageUrl) {
	        if (!_this.imageEle) {
	          _this.imageEle = createImage();
	          _this.deleteHover = createDeleteHover();
	          _this.element.removeChild(_this.textEle);
	          _this.element.appendChild(_this.imageEle);
	          _this.element.appendChild(_this.deleteHover);
	        }
	        _this.imageEle.src = _this.imageUrl;
	        return;
	      }
	      if (_this.uploadEle.files.length === 0) return;

	      // var reads = new FileReader();
	      // var f = this.uploadEle.files[0];
	      // reads.readAsDataURL(f);
	      _this.uploadFile(_this.uploadEle.files[0]).then(function (filename) {
	        var imageUrl = window.PLOT_SERVER_URL + "/upload/image/" + filename;

	        if (!_this.imageEle) {
	          _this.imageUrl = imageUrl;
	          _this.imageEle = createImage();
	          _this.deleteHover = createDeleteHover();
	          _this.element.removeChild(_this.textEle);
	          _this.element.appendChild(_this.imageEle);
	          _this.element.appendChild(_this.deleteHover);
	        }
	        _this.imageEle.src = imageUrl;
	        _this.imageEle.onload = function (e) {
	          var originWidth = _this.imageEle.naturalWidth > 400 ? 400 : _this.imageEle.naturalWidth;
	          var originHeight = originWidth * _this.imageEle.naturalHeight / _this.imageEle.naturalWidth;

	          _this._element.style.width = originWidth + "px";
	          _this._element.style.height = originHeight + "px";
	        };
	      });
	      // this.uploadEle.files[0];
	    };

	    _this.bodyClick = function (e) {
	      e = e || window.event;
	      var target = e.target || e.srcElement;
	      if (!_this.element.contains(target)) {
	        _this.disableEdit();
	        _this.disableResize();
	      } else {
	        _this.enableResize();
	      }
	    };

	    _this.bodydbClick = function (e) {
	      e = e || window.event;
	      var target = e.target || e.srcElement;
	      if (target === _this.textEle) {
	        _this.enableEdit();
	      } else if (_this.element.contains(target) && _this.imageEle) {
	        _this.removeFrom(_this._features);
	      }
	    };

	    _this.enableEdit = function () {
	      _this.uploadEle.click();
	      // this._menu.visible = true;
	      (0, _util.removeClass)(_this.textEle, "geo-dragble");
	      // this.textEle
	    };

	    _this.disableEdit = function () {
	      _this.textEle.disabled = true;
	      // this._menu.visible = false;
	      (0, _util.addClass)(_this.textEle, "geo-dragble");
	    };

	    _this.deleted = function () {
	      _this.drawHelper.features.markers.removeMarker(_this);
	      _this.drawHelper.features.map.delete(_this.id);
	      _this.drawHelper.features.remove(_this);
	      document.body.removeEventListener("click", _this.bodyClick);
	      document.body.removeEventListener("dblclick", _this.bodydbClick);
	      _this.drawHelper.fire("deleted", { entity: _this });
	    };

	    _this.name = "图片注记";
	    if (options.id) _this._id = options.id || GeoVis.createGuid();
	    /** @type {HTMLDivElement} */
	    _this._element = _this._element;
	    _this._element.className = "geo-resizer";
	    _this.textEle = textEle;
	    _this.imageUrl = options.imageUrl;
	    _this.drawHelper = options.drawHelper;
	    if (options.width) _this.width = options.width;
	    if (options.height) _this.height = options.height;
	    if (options.name) _this.name = options.name;
	    _this.uploadEle = createFileInput();
	    _this.uploadEle.addEventListener("change", _this.loadImage);
	    _this.imageEle = undefined;
	    _this.createAnchors();
	    _this.type = _Types2.default.IMAGE_MARKER;
	    _this._element.ondblclick = _this.eledbClick;
	    document.body.addEventListener("click", _this.bodyClick);
	    document.body.addEventListener("dblclick", _this.bodydbClick);
	    if (options.imageUrl) _this.loadImage();
	    // document.body.onclick.addEventListener(this.bodyClick);
	    return _this;
	  }

	  _createClass(ImageMarker, [{
	    key: "uploadFile",
	    value: function uploadFile(file) {
	      // const formdata = new FormData();
	      // formdata.append("file",)
	      // return url;
	      var formdata = new FormData();
	      formdata.append("image", event.target.files[0]);
	      return fetch(window.PLOT_SERVER_URL + "/upload/image", {
	        method: "POST",
	        body: formdata
	      }).then(function (res) {
	        return res.text();
	      });
	    }
	  }, {
	    key: "createAnchors",
	    value: function createAnchors() {
	      this.element.appendChild(createAnchor({ left: "-5px", top: "-5px" }));
	      this.element.appendChild(createAnchor({ left: "-5px", bottom: "-10px" }));
	      this.element.appendChild(createAnchor({ right: "-10px", top: "-5px" }));
	      this.element.appendChild(createAnchor({ right: "-10px", bottom: "-10px" }));
	      // this.element.appendChild(createAnchor({ left: "-5px", top: "-5px" }));
	    }
	  }, {
	    key: "enableResize",
	    value: function enableResize() {
	      (0, _util.addClass)(this.element, "geo-resizeble");
	    }
	  }, {
	    key: "disableResize",
	    value: function disableResize() {
	      (0, _util.removeClass)(this.element, "geo-resizeble");
	    }
	  }, {
	    key: "setXY",
	    value: function setXY(x, y) {
	      var ondrag = this.element.getAttribute("ondrag");
	      if (ondrag !== "1") {
	        this.element.style.left = x + "px";
	        this.element.style.bottom = y + "px";
	        if (this.visible) this.enabled = true;
	      } else {
	        var _x = this.element.getAttribute("data-x");
	        var _y = this.element.getAttribute("data-y");
	        var targetX = parseFloat(this.element.style.left.split("px")[0]) + parseFloat(_x);
	        var targetY = parseFloat(this.element.style.bottom.split("px")[0]) - parseFloat(_y);
	        this.updatePosition(targetX, targetY);
	        this.element.setAttribute("data-x", "0");
	        this.element.setAttribute("data-y", "0");
	        this.element.style.left = targetX + "px";
	        this.element.style.bottom = targetY + "px";
	        this.element.style.webkitTransform = this.element.style.transform = "translate(" + 0 + "px, " + 0 + "px)";
	        this.element.setAttribute("ondrag", "0");
	      }
	    }
	  }, {
	    key: "updatePosition",
	    value: function updatePosition(x, y) {
	      var scene = this._features._earth.scene;
	      y = this._features._earth.canvas.height - y;
	      var ray = scene.camera.getPickRay(new GeoVis.Cartesian2(x, y));
	      var cartesian = scene.globe.pick(ray, scene);
	      if (cartesian) this.position = cartesian;
	    }
	  }, {
	    key: "removeFrom",
	    value: function removeFrom(features) {
	      features.markers.removeMarker(this);
	      features.map.delete(this.id);
	      features.drawHelper && features.drawHelper.fire("deleted", { entity: this });
	      document.body.removeEventListener("click", this.bodyClick);
	      document.body.removeEventListener("dblclick", this.bodydbClick);
	      return this;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.removeFrom(this._features);
	    }
	  }, {
	    key: "width",
	    get: function get() {
	      return this._element.style.width;
	    },
	    set: function set(val) {
	      this._element.style.width = val;
	    }
	  }, {
	    key: "height",
	    get: function get() {
	      return this._element.style.height;
	    },
	    set: function set(val) {
	      this._element.style.height = val;
	    }
	  }]);

	  return ImageMarker;
	}(GeoVis.DomMarker);

	exports.default = ImageMarker;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(5);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 *
	 * @return {HTMLDivElement}
	 */
	function createTextEle() {
	  var ele = document.createElement("div");
	  ele.className = "geo-custom";
	  ele.innerHTML = "<div class=\"geov-custom-popup\">\n    <div data-name=\"flag\" class=\"geo-custom-popup-wrap\">\n      <div data-name=\"border\" class=\"geo-custom-popup-content\">\n        <div data-name=\"text\" class=\"geo-custom-text\"></div>\n      </div>\n    </div>\n    <div data-name=\"line\" class=\"geo-marker-line\">\n    </div>\n  </div>";
	  return ele;
	}

	var Marker = function (_GeoVis$DomMarker) {
	  _inherits(Marker, _GeoVis$DomMarker);

	  function Marker(pos, options) {
	    _classCallCheck(this, Marker);

	    var textEle = createTextEle();
	    options.dom = textEle;

	    var _this = _possibleConstructorReturn(this, (Marker.__proto__ || Object.getPrototypeOf(Marker)).call(this, pos, options));

	    _this.setEditable = function () {
	      _this.drawHelper._editor.add(_this);
	    };

	    _this.isDestroyed = function () {
	      return false;
	    };

	    if (!options.drawHelper) {
	      console.error("options.drawHelper 未定义");
	      return _possibleConstructorReturn(_this);
	    }
	    if (options.id) _this._id = options.id || GeoVis.createGuid();
	    _this.name = options.name || "文字注记";
	    _this.type = options.type || _Types2.default.MARKER;
	    _this.drawHelper = options.drawHelper;
	    _this._tooltip = _this.drawHelper._tooltip;
	    _this.textEle = textEle;
	    _this.textEle.id = _this.id;
	    _this._lonlat = (0, _util.cartesianToLonlat)(pos);
	    if (options.text) _this.text = options.text;
	    _this.width = parseInt(options.width) || 100;
	    if (options.fontWeight) _this.fontWeight = options.fontWeight;
	    if (options.color) _this.color = options.color;
	    if (options.backgroundColor) _this.backgroundColor = options.backgroundColor;
	    if (options.fontSize) _this.fontSize = parseInt(options.fontSize);
	    if (options.fontFamily) _this.fontFamily = options.fontFamily;
	    if (options.textAlign) _this.textAlign = options.textAlign;

	    _this.changeElement(_this.type);
	    return _this;
	  }

	  _createClass(Marker, [{
	    key: "getDomByName",
	    value: function getDomByName(name) {
	      var elements = this.textEle.getElementsByTagName("div");
	      var length = elements.length;
	      var i = 0;
	      while (i < length) {
	        if (elements[i].getAttribute("data-name") === name) {
	          return elements[i];
	        }
	        i++;
	      }
	    }
	    /**
	     * 获取文字Ele
	     */

	  }, {
	    key: "changeElement",
	    value: function changeElement(type) {
	      var lineDom = this.getDomByName("line");
	      var flagDom = this.getDomByName("flag");
	      var borderDom = this.getDomByName("border");
	      this.type = type;
	      if (type === _Types2.default.FLAG_MARKER) {
	        lineDom.style.width = "3px";
	        lineDom.style.height = "95px";
	        lineDom.style.transform = "rotate(0deg) translate(-1.5px, -1px)";
	        lineDom.style.backgroundColor = "red";
	        flagDom.style.transform = "rotate(0deg) translate(1px, -45px)";
	        borderDom.style.borderColor = "red";
	        this.textElement.style.height = "50px";
	      } else {
	        lineDom.style.width = "45px";
	        lineDom.style.height = "2px";
	        lineDom.style.transform = "rotate(-45deg) translate(5px, -15px)";
	        lineDom.style.backgroundColor = "rgb(24, 229, 255)";
	        flagDom.style.transform = "rotate(0deg) translate(29px, -29px)";
	        borderDom.style.borderColor = " rgb(24, 185, 255);";
	        this.textElement.style.height = "auto";
	      }
	    }
	  }, {
	    key: "removeFrom",

	    /**
	     * 移除点标
	     * @param {FeatureGroup} features
	     */
	    value: function removeFrom(features) {
	      this.drawHelper._editor.remove(this);
	      this._tooltip.setVisible(false);
	      features.markers.removeMarker(this);
	      features.map.delete(this.id);
	      this.drawHelper.fire("deleted", { entity: this });
	      this._marker && this._marker.removeFrom(features);
	      this._features = undefined;
	      return this;
	    }
	  }, {
	    key: "textElement",
	    get: function get() {
	      return this.getDomByName("text");
	    }

	    /**
	     * 获取边框Ele
	     */

	  }, {
	    key: "borderElement",
	    get: function get() {
	      return this.getDomByName("border");
	    }

	    /**
	     * 获取线条Ele
	     */

	  }, {
	    key: "lineElement",
	    get: function get() {
	      return this.getDomByName("line");
	    }

	    /**
	     * 获取线条Ele
	     */

	  }, {
	    key: "flagElement",
	    get: function get() {
	      return this.getDomByName("flag");
	    }
	    /**
	     * 获取文字内容
	     */

	  }, {
	    key: "text",
	    get: function get() {
	      return this.textElement.innerHTML;
	    }
	    /**
	     * 设置文字内容
	     */
	    ,
	    set: function set(val) {
	      this.textElement.innerHTML = val;
	    }
	    /**
	     * 获取文字对齐
	     */

	  }, {
	    key: "textAlign",
	    get: function get() {
	      return this.textElement.style.textAlign;
	    }
	    /**
	     * 设置文字对齐
	     */
	    ,
	    set: function set(val) {
	      this.textElement.style.textAlign = val;
	    }
	    /**
	     * 获取字体加粗
	     */

	  }, {
	    key: "fontWeight",
	    get: function get() {
	      return this.textElement.style.fontWeight;
	    }
	    /**
	     * 设置字体加粗
	     */
	    ,
	    set: function set(val) {
	      this.textElement.style.fontWeight = val;
	    }
	    /**
	     * 获取字体大小
	     */

	  }, {
	    key: "fontSize",
	    get: function get() {
	      return parseInt(this.textElement.style.fontSize);
	    }
	    /**
	     * 设置字体大小
	     */
	    ,
	    set: function set(val) {
	      this.textElement.style.fontSize = val + "px";
	    }
	    /**
	     * 获取字体类型
	     */

	  }, {
	    key: "fontFamily",
	    get: function get() {
	      return this.textElement.style.fontFamily;
	    }
	    /**
	     * 设置字体类型
	     */
	    ,
	    set: function set(val) {
	      this.textElement.style.fontFamily = val;
	    }
	    /**
	     * 获取边框宽度
	     */

	  }, {
	    key: "width",
	    get: function get() {
	      return parseInt(this.textElement.style.width);
	    }
	    /**
	     * 设置边框宽度
	     */
	    ,
	    set: function set(val) {
	      this.textElement.style.width = val + "px";
	    }

	    /**
	     * 获取边框高度
	     */

	  }, {
	    key: "height",
	    get: function get() {
	      return parseInt(this.textElement.style.height);
	    }
	    /**
	     * 设置边框高度
	     */
	    ,
	    set: function set(val) {
	      var lineHeight = val - this.tranformHeight;
	      this.textElement.style.height = val + "px";
	      this.lineElement.style.height = lineHeight + "px";
	    }
	  }, {
	    key: "lineHeight",
	    get: function get() {
	      return parseInt(this.lineElement.style.height);
	    },
	    set: function set(val) {
	      var height = this.height - val;
	      this.lineElement.style.height = val + "px";
	      this.tranformHeight = height;
	    }

	    /**
	     * 获取高度偏移
	     */

	  }, {
	    key: "tranformHeight",
	    get: function get() {
	      return this.height - this.lineHeight;
	    }
	    /**
	     * 设置边框高度
	     */
	    ,
	    set: function set(val) {
	      this.flagElement.style.transform = "rotate(0deg) translate(1px, " + val + "px)";
	    }
	    /**
	     * 获取字体颜色
	     */

	  }, {
	    key: "color",
	    get: function get() {
	      return this.textElement.style.color;
	    }
	    /**
	     * 设置字体颜色
	     */
	    ,
	    set: function set(val) {
	      this.textElement.style.color = val;
	    }
	    /**
	     * 获取背景颜色
	     */

	  }, {
	    key: "backgroundColor",
	    get: function get() {
	      return this.textElement.style.backgroundColor;
	    }
	    /**
	     * 设置背景颜色
	     */
	    ,
	    set: function set(val) {
	      this.textElement.style.backgroundColor = val;
	    }

	    /**
	     * 获取背景颜色
	     */

	  }, {
	    key: "borderColor",
	    get: function get() {
	      return this.borderElement.style.borderColor;
	    }
	    /**
	     * 设置背景颜色
	     */
	    ,
	    set: function set(val) {
	      this.borderElement.style.borderColor = val;
	      this.lineElement.style.backgroundColor = val;
	    }
	  }]);

	  return Marker;
	}(GeoVis.DomMarker);

	exports.default = Marker;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(5);

	var _ExtendProps = __webpack_require__(34);

	var _ExtendProps2 = _interopRequireDefault(_ExtendProps);

	var _Util = __webpack_require__(23);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _Animator = __webpack_require__(27);

	var _Animator2 = _interopRequireDefault(_Animator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Icon = function (_GeoVis$Billboard) {
	  _inherits(Icon, _GeoVis$Billboard);

	  function Icon(pos, options) {
	    _classCallCheck(this, Icon);

	    options.color = options.color || GeoVis.Color.RED;
	    options.rotation = options.rotation || 0;

	    var _this = _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).call(this, pos, options));

	    _initialiseProps.call(_this);

	    if (!options.drawHelper) {
	      console.error("options.drawHelper 未定义");
	      return _possibleConstructorReturn(_this);
	    }
	    _this.drawHelper = options.drawHelper;
	    _this._tooltip = _this.drawHelper._tooltip;
	    _this.name = options.name || null;
	    _this.type = options.type || _Types2.default.ICON;

	    _this._text = options.text || undefined;
	    options.props = options.props || [];
	    if (options.props) {
	      _this.props = new _ExtendProps2.default(options.props, _this.drawHelper.features);
	    }
	    _this._lonlat = (0, _util.cartesianToLonlat)(pos);
	    _this._markerScale = _this.options.markerScale || 1.0;
	    if (options.label) {
	      _this.label = new GeoVis.Label(_this._lonlat, _extends({}, _this.labelDefaultOptions(options.label))).addTo(_this.drawHelper.features);
	    }
	    _this.highLightColor = GeoVis.defaultValue(options.color, GeoVis.Color.RED);
	    _this._lineType = options.lineType || "default";
	    _this._lineWidth = options.lineWidth || 1;
	    _this._mirrorType = options.mirrorType || "none";

	    _this._elevationMode = options.elevationMode || "absolute";
	    _this._elevationHeight = options.elevationHeight || undefined;
	    _this._vector = options.vector || false;
	    return _this;
	  }

	  _createClass(Icon, [{
	    key: "updateConPoints",
	    value: function updateConPoints() {
	      if (this._point) {
	        this._point.updatePointPosition(this.position);
	        (0, _Util.updateMarkers)(this);
	      }
	    }
	  }, {
	    key: "removeFrom",

	    /**
	     * 移除点标
	     * @param {FeatureGroup} features
	     */
	    value: function removeFrom(features) {
	      this.drawHelper._editor.remove(this);
	      this._tooltip.setVisible(false);
	      if (this.label) {
	        try {
	          this.label.removeFrom(this.drawHelper.features);
	        } catch (e) {
	          // console.log(e)
	          // todo 會出現重複移除
	        }
	        this.label = undefined;
	      }
	      this.drawHelper.fire("deleted", { entity: this });
	      // this.drawHelper.features.remove(this);
	      this.props.destroy();
	      features._billboards.remove(this);
	      features._billboardsLight.remove(this);
	      features._map.remove(this._id);
	      this._marker && this._marker.removeFrom(features);
	      this._features = undefined;
	      return this;
	    }
	    /**
	     * 用于给点标添加标签
	     *  @param {labelOptions} options
	     */

	    /**
	     *   用于添加动画属性
	     *  @param {labelOptions} options
	     */

	    // 用于获取标签属性参数

	  }, {
	    key: "visible",
	    get: function get() {
	      return this.show;
	    },
	    set: function set(val) {
	      this.show = val;
	      if (this.label) {
	        this.label.show = val;
	      }
	    }
	  }, {
	    key: "vector",
	    get: function get() {
	      return this._vector;
	    },
	    set: function set(val) {
	      this._vector = val;
	    }
	  }, {
	    key: "lineType",
	    get: function get() {
	      return this._lineType;
	    },
	    set: function set(val) {
	      this._lineType = val;
	      this.changeDomEle(val);
	    }
	    /**
	     * 获取Icon的经纬度
	     * @type {Vector3}
	     * @name elevationMode
	     * @memberof Icon
	     */

	  }, {
	    key: "elevationMode",
	    get: function get() {
	      return this._elevationMode;
	    },
	    set: function set(val) {
	      this._elevationMode = val;
	      (0, _Util.eleHeightChange)(this);
	      this.drawHelper._editor._iconEditor.setEditable(this, false);
	      this.drawHelper._editor._iconEditor.setHighlighted(this, false);
	    }

	    /**
	     * 获取Icon的经纬度
	     * @type {Vector3}
	     * @name elevationHeight
	     * @memberof Icon
	     */

	  }, {
	    key: "elevationHeight",
	    get: function get() {
	      if (this._elevationHeight === undefined) {
	        this._elevationHeight = [this.cartographic.height];
	      }
	      return this._elevationHeight;
	    },
	    set: function set(val) {
	      this._elevationHeight = (0, _Util.eleHeightChange)(this, val);
	    }
	  }, {
	    key: "mirrorType",
	    get: function get() {
	      return this._mirrorType;
	    },
	    set: function set(val) {
	      this._mirrorType = val;
	      this.changeDomEle(val);
	    }
	  }, {
	    key: "lineWidth",
	    get: function get() {
	      return this._lineWidth;
	    },
	    set: function set(val) {
	      this._lineWidth = val;
	      this.changeDomEle(val);
	    }
	  }, {
	    key: "cartographic",
	    get: function get() {
	      var cato = GeoVis.Cartographic.fromCartesian(this.position);
	      return cato;
	    },
	    set: function set(val) {
	      var pos = GeoVis.Cartographic.toCartesian(val);
	      this.position = pos;
	      this.updateConPoints();
	    }
	  }]);

	  return Icon;
	}(GeoVis.Billboard);

	var _initialiseProps = function _initialiseProps() {
	  var _this2 = this;

	  this.setEditable = function () {
	    _this2.drawHelper._editor.add(_this2);
	  };

	  this.isDestroyed = function () {
	    return false;
	  };

	  this.changeDomEle = function (val) {
	    var svgStr = _this2.image.split("64,");
	    if (svgStr.length > 1) {
	      _this2.domEle = document.createElement("div");
	      _this2.domEle.innerHTML = window.atob(svgStr[1]);
	      var length = _this2.domEle.childNodes[0].childNodes.length;
	      var offset = _this2.domEle.childNodes[0].getAttribute("viewBox").split(" ")[2];
	      for (var i = 0; i < length; i++) {
	        var node = _this2.domEle.childNodes[0].childNodes[i];
	        if (node.tagName == "path") {
	          switch (val) {
	            case "default":
	              node.style.strokeDasharray = "1 0";
	              break;
	            case "dash":
	              node.style.strokeDasharray = "1.5 1";
	              break;
	            case "none":
	              node.setAttribute("transform", "translate(0,0)");
	              break;
	            case "vMarrior":
	              node.setAttribute("transform", "translate(" + offset + ",0) scale(-1,1)");
	              break;
	            case "hMarrior":
	              node.setAttribute("transform", "translate(0," + offset + ") scale(1,-1)");
	              break;
	            case "vhMarrior":
	              node.setAttribute("transform", "translate(" + offset + "," + offset + ") scale(-1,-1)");
	              break;
	            default:
	              node.style.strokeWidth = val;
	              break;
	          }
	        }
	      }
	      var newSvg = "data:image/svg+xml;base64," + window.btoa(_this2.domEle.innerHTML);
	      _this2.image = newSvg;
	    }
	  };

	  this.deleted = function () {
	    _this2.drawHelper._editor.remove(_this2);
	    _this2.animator && _this2.removeAnimate();
	    _this2._tooltip.setVisible(false);
	    if (_this2.label) {
	      _this2.label.removeFrom(_this2.drawHelper.features);
	    }
	    _this2.drawHelper.fire("deleted", { entity: _this2 });
	    _this2.drawHelper.features.remove(_this2);
	  };

	  this.addLabel = function (options) {
	    _this2.label = new GeoVis.Label(_this2.position, _extends({}, _this2.labelDefaultOptions(options))).addTo(_this2.drawHelper.features);
	    // debugger
	  };

	  this.addAnimate = function (options) {
	    _this2.animator = new _Animator2.default(_this2, _extends({}, options));
	    _this2.animator.addTo(_this2.drawHelper.animators);
	  };

	  this.removeAnimate = function () {
	    _this2.animator.removeFrom(_this2.drawHelper.animators);
	    _this2.animator = undefined;
	  };

	  this.labelDefaultOptions = function (options) {
	    var labelOptions = {};
	    labelOptions.text = options.text ? options.text : "";
	    labelOptions.font = options.font ? options.font : "36px KaiTi";
	    labelOptions.show = options.show !== undefined ? options.show : true;
	    labelOptions.fillColor = options.fillColor ? options.fillColor : GeoVis.Color.WHITE;
	    labelOptions.outlineColor = options.outlineColor ? options.outlineColor : GeoVis.Color.BLACK;
	    labelOptions.outlineWidth = options.outlineWidth ? options.outlineWidth : 5;
	    labelOptions.style = options.style ? options.style : GeoVis.LabelStyle.FILL_AND_OUTLINE;
	    labelOptions.horizontalOrigin = options.horizontalOrigin ? options.horizontalOrigin : GeoVis.HorizontalOrigin.CENTER;
	    labelOptions.verticalOrigin = options.verticalOrigin ? options.verticalOrigin : GeoVis.VerticalOrigin.CENTER;
	    labelOptions.showBackground = false;
	    // labelOptions.disableDepthTestDistance = 4e6;
	    labelOptions.heightReference = GeoVis.HeightReference.NONE;
	    labelOptions.scale = 0.5;
	    labelOptions.pixelOffset = options.pixelOffset ? options.pixelOffset : new GeoVis.Cartesian2(40, 0);
	    return labelOptions;
	  };
	};

	exports.default = Icon;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.serializeScene = serializeScene;
	exports.unserializeScene = unserializeScene;

	var _Scene = __webpack_require__(52);

	var _Scene2 = _interopRequireDefault(_Scene);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function serializeScene(scene) {
	  var data = {};
	  data.id = scene.id;
	  data.layers = scene.layers;
	  data.image = scene.image;
	  data.title = scene.title;
	  data.text = scene.text;
	  data.visible = scene.visible;
	  data.time = scene.time;
	  data.viewport = {
	    x: earth.camera.position.x,
	    y: earth.camera.position.y,
	    z: earth.camera.position.z,
	    heading: earth.camera.heading,
	    pitch: earth.camera.pitch,
	    roll: earth.camera.roll
	  };
	  return data;
	}

	function unserializeScene(options, drawHelper) {
	  options = options || {};
	  earth.camera.flyTo({
	    destination: new GeoVis.Cartesian3(options.viewport.x, options.viewport.y, options.viewport.z),
	    duration: 2,
	    orientation: {
	      heading: options.viewport.heading,
	      pitch: options.viewport.pitch,
	      roll: options.viewport.roll
	    },
	    complete: function complete() {}
	  });
	  var scene = new _Scene2.default(options);
	  drawHelper._sceneInfor = scene;
	  drawHelper.fire("scene", { scene: scene });
	  return scene;
	}

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scene = function () {
	  /**
	   * 保存当前的场景信息
	   * @param {GeoVis.Earth} earth
	   */
	  function Scene(options) {
	    _classCallCheck(this, Scene);

	    this._id = options.id || GeoVis.createGuid();
	    this._title = options.title || "";
	    this._text = options.text || "";
	    this._image = options.image || "";
	    this._time = options.time || 5;
	    this.visible = options.visible || false;
	  }

	  _createClass(Scene, [{
	    key: "id",
	    get: function get() {
	      return this._id;
	    }
	    /**
	     * 获取场景的标题
	     */

	  }, {
	    key: "title",
	    get: function get() {
	      return this._title;
	    }
	    /**
	     * 设置场景的标题
	     */
	    ,
	    set: function set(val) {
	      this._title = val;
	    }
	  }, {
	    key: "text",
	    get: function get() {
	      return this._text;
	    }
	    /**
	     * 设置场景的字幕
	     */
	    ,
	    set: function set(val) {
	      this._text = val;
	    }
	  }, {
	    key: "time",
	    get: function get() {
	      return this._time;
	    }
	    /**
	     * 设置场景的自动演播时长
	     */
	    ,
	    set: function set(val) {
	      this._time = val;
	    }
	  }, {
	    key: "image",
	    get: function get() {
	      return this._image;
	    }
	    /**
	     * 设置场景的图片地址
	     */
	    ,
	    set: function set(val) {
	      this._image = val;
	    }
	  }]);

	  return Scene;
	}();

	exports.default = Scene;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check

	exports.serializeGroundText = serializeGroundText;
	exports.unserializeGroundText = unserializeGroundText;

	var _GroundText = __webpack_require__(54);

	var _GroundText2 = _interopRequireDefault(_GroundText);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 *
	 * @param {GroundTextPrimitive} entity
	 */
	function serializeGroundText(entity) {
	  var groundText = {};
	  groundText.type = entity.type;
	  groundText.visible = entity.visible;
	  groundText.id = entity.id;
	  groundText.text = entity.text;
	  groundText.fontSize = entity.fontSize;
	  groundText.fontFamily = entity.fontFamily;
	  groundText.padding = entity.padding;
	  groundText.color = entity.color;
	  groundText.outlineColor = entity.outlineColor;
	  groundText.outlineWidth = entity.outlineWidth;
	  groundText.textDirection = entity.textDirection;
	  groundText.startPoint = entity.startPoint;
	  groundText.endPoint = entity.endPoint;
	  return groundText;
	}

	function unserializeGroundText(options, drawHelper, mode) {
	  var marker = new _GroundText2.default(_extends({}, options, { drawHelper: drawHelper }));
	  if (mode === "3d") {
	    marker.addTo(drawHelper.features);
	  }
	  marker.setEditable();
	  return marker;
	}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(13);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _util = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroundText = function () {
	  function GroundText(options) {
	    var _this = this;

	    _classCallCheck(this, GroundText);

	    this.isDestroyed = function () {
	      return false;
	    };

	    this.deleted = function () {
	      _this.drawHelper._editor.remove(_this);
	      _this._tooltip.setVisible(false);
	      _this.drawHelper.fire("deleted", { entity: _this });
	      _this.removeFrom(_this.drawHelper.features);
	    };

	    this.setEditable = function () {
	      _this.drawHelper._editor.add(_this);
	    };

	    this._id = options.id || GeoVis.createGuid();
	    this.drawHelper = options.drawHelper;
	    this._tooltip = this.drawHelper._tooltip;
	    this._type = options.type || _Types2.default.GROUND_TEXT;
	    this._text = options.text || "贴地文本";
	    this._fontSize = options.fontSize || 48;
	    this._fontFamily = options.fontFamily || "雅黑";
	    this._padding = options.padding || [10, 10];
	    this._color = options.color || "white";
	    this._outlineColor = options.outlineColor || "black";
	    this._outlineWidth = options.outlineWidth || 2;
	    this._textDirection = options.textDirection || "Horizontal"; // Horizontal or Vertical
	    this._startPoint = options.startPoint || [120, 30, 0];
	    this._endPoint = options.endPoint || [124, 34, 0];
	    this._visible = GeoVis.defaultValue(options.visible, true);
	    this._polygon = undefined;
	    this._canvas = undefined;
	    this._features = undefined;
	  }

	  _createClass(GroundText, [{
	    key: "updatePolygon",
	    value: function updatePolygon() {
	      var _GeoVis$Cartesian, _GeoVis$Cartesian2;

	      if (!this._canvas) return;
	      if (this._polygon) this._polygon.removeFrom(this._features);
	      this._polygon = undefined;
	      var canvas = this._canvas;
	      var startPoint = this.startPoint,
	          endPoint = this.endPoint;

	      var bearing = (0, _util.computeBearing)(startPoint, endPoint);
	      var startCartesian = (_GeoVis$Cartesian = GeoVis.Cartesian3).fromDegrees.apply(_GeoVis$Cartesian, _toConsumableArray(startPoint));
	      var endCartesian = (_GeoVis$Cartesian2 = GeoVis.Cartesian3).fromDegrees.apply(_GeoVis$Cartesian2, _toConsumableArray(endPoint));
	      var widthInMeters = GeoVis.Cartesian3.distance(startCartesian, endCartesian);
	      var heightInMeters = canvas.height / canvas.width * widthInMeters;

	      var startTurfPoint = turf.point(startPoint);
	      var endTurfPoint = turf.point(endPoint);
	      var options = { units: "meters" };

	      var leftUp = turf.destination(startTurfPoint, heightInMeters / 2, 90 - (180 - bearing), options).geometry.coordinates;
	      var leftDown = turf.destination(startTurfPoint, heightInMeters / 2, 90 + bearing, options).geometry.coordinates;
	      var rightDown = turf.destination(endTurfPoint, heightInMeters / 2, 90 + bearing, options).geometry.coordinates;
	      var rightUp = turf.destination(endTurfPoint, heightInMeters / 2, 90 - (180 - bearing), options).geometry.coordinates;
	      var lonlats = [leftUp, leftDown, rightDown, rightUp];
	      if (this._polygon) {
	        this._polygon.lonlats = lonlats;
	      } else {
	        var polygon = new GeoVis.SpacePolygon(lonlats, {
	          material: this._material,
	          id: this
	        }).addTo(this._features);
	        this._polygon = polygon;
	      }
	      return polygon;
	    }
	  }, {
	    key: "updateText",
	    value: function () {
	      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
	        var fontSize, padding, color, outlineColor, outlineWidth, text, fontFamily, textDirection, shadowDom, htmlStr, canvas;
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                fontSize = this.fontSize, padding = this.padding, color = this.color, outlineColor = this.outlineColor, outlineWidth = this.outlineWidth, text = this.text, fontFamily = this.fontFamily, textDirection = this.textDirection;
	                shadowDom = document.createElement("div");

	                shadowDom.style.position = "fixed";
	                shadowDom.style.zIndex = -1;
	                document.body.appendChild(shadowDom);
	                htmlStr = "\n        <span style=\"line\u2014height: " + (fontSize + padding) + "px; textAlign: center;display: innerText;color: " + color + "; background: \n          rgba(255, 255,255, 0.0); text-shadow: 0px 0px " + outlineWidth + "px " + outlineColor + ";\n         \n          padding: " + padding[0] + "px " + padding[1] + "px; \n          -webkit-transform: rotate(" + (textDirection === "Horizontal" ? "0" : "-90") + "deg);\n          writing-mode: " + (textDirection === "Horizontal" ? "horizontal-tb" : "vertical-lr") + ";\n          border-radius: 5px;  font-size:" + fontSize + "px; font-family: " + fontFamily + ";\">\n          " + text + "\n        </span>\n      ";

	                shadowDom.innerHTML = htmlStr;
	                _context.next = 9;
	                return this._features._earth.capture(shadowDom.children[0], { backgroundColor: "rgba(0,0,0,0)" }).then(function (canvas) {
	                  // document.body.removeChild(shadowDom)
	                  // document.querySelector("#root").appendChild(shadowDom)
	                  // document.querySelector("#root").appendChild(canvas)
	                  document.body.removeChild(shadowDom);
	                  return canvas;
	                });

	              case 9:
	                canvas = _context.sent;

	                this._canvas = canvas;
	                if (this._material) {
	                  this._material.uniforms.image = canvas;
	                } else {
	                  this._material = new GeoVis.Material({
	                    fabric: {
	                      type: "Image",
	                      // source:
	                      uniforms: {
	                        image: canvas,
	                        repeat: 1
	                      }
	                    }
	                  });
	                }
	                return _context.abrupt("return", canvas);

	              case 13:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function updateText() {
	        return _ref.apply(this, arguments);
	      }

	      return updateText;
	    }()
	  }, {
	    key: "addTo",
	    value: function addTo(features) {
	      if (features.map.get(this._id)) {
	        console.error("Features id 重复");
	      }
	      features.map.set(this._id, this);
	      this._features = features;
	      this.update();
	      return this;
	    }
	  }, {
	    key: "removePrimitive",
	    value: function removePrimitive() {
	      this._polygon.removeFrom(this._features);
	      this._polygon = undefined;
	    }
	  }, {
	    key: "removeFrom",
	    value: function removeFrom(features) {
	      // features.remove(this);
	      this.removePrimitive();
	      features.map.delete(this._id);
	      this._features = undefined;
	      this._scene = undefined;
	      return this;
	    }
	  }, {
	    key: "update",
	    value: function () {
	      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
	        var dirtyType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "all";
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                if (!(dirtyType !== "polygon")) {
	                  _context2.next = 3;
	                  break;
	                }

	                _context2.next = 3;
	                return this.updateText();

	              case 3:
	                _context2.next = 5;
	                return this.updatePolygon();

	              case 5:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function update() {
	        return _ref2.apply(this, arguments);
	      }

	      return update;
	    }()

	    /**
	     *
	     *
	     * @param {GroundText} groundText
	     *
	     */

	  }, {
	    key: "id",
	    get: function get() {
	      return this._id;
	    }
	  }, {
	    key: "type",
	    get: function get() {
	      return this._type;
	    }
	  }, {
	    key: "visible",
	    get: function get() {
	      return this._visible;
	    },
	    set: function set(val) {
	      this._visible = !!val;
	      // this._
	    }
	  }, {
	    key: "text",
	    get: function get() {
	      return this._text;
	    },
	    set: function set(val) {
	      this._text = val;
	      this.update("text");
	    }
	  }, {
	    key: "fontSize",
	    get: function get() {
	      return this._fontSize;
	    },
	    set: function set(val) {
	      this._fontSize = val;
	      this.update("text");
	    }
	  }, {
	    key: "fontFamily",
	    get: function get() {
	      return this._fontSize;
	    },
	    set: function set(val) {
	      this._fontFamily = val;
	      this.update("text");
	    }
	  }, {
	    key: "padding",
	    get: function get() {
	      return this._padding;
	    },
	    set: function set(val) {
	      this._padding = val;
	      this.update("text");
	    }
	  }, {
	    key: "color",
	    get: function get() {
	      return this._color;
	    },
	    set: function set(val) {
	      this._color = val;
	      this.update("text");
	    }
	  }, {
	    key: "outlineColor",
	    get: function get() {
	      return this._outlineColor;
	    },
	    set: function set(val) {
	      this._outlineColor = val;
	      this.update("text");
	    }
	  }, {
	    key: "outlineWidth",
	    get: function get() {
	      return this._outlineWidth;
	    },
	    set: function set(val) {
	      this._outlineWidth = val;
	      this.update("text");
	    }
	  }, {
	    key: "textDirection",
	    get: function get() {
	      return this._textDirection;
	    },
	    set: function set(val) {
	      this._textDirection = val;
	      this.update("text");
	    }
	  }, {
	    key: "startPoint",
	    get: function get() {
	      return this._startPoint;
	    },
	    set: function set(val) {
	      this._startPoint = val;
	      this.update("polygon");
	    }
	  }, {
	    key: "endPoint",
	    get: function get() {
	      return this._endPoint;
	    },
	    set: function set(val) {
	      this._endPoint = val;
	      this.update("polygon");
	    }
	  }], [{
	    key: "pack",
	    value: function pack(groundText) {
	      var text = groundText.text,
	          fontSize = groundText.fontSize,
	          fontFamily = groundText.fontFamily,
	          padding = groundText.padding,
	          color = groundText.color,
	          outlineColor = groundText.outlineColor,
	          outlineWidth = groundText.outlineWidth,
	          textDirection = groundText.textDirection,
	          startPoint = groundText.startPoint,
	          endPoint = groundText.endPoint;

	      return {
	        text: text,
	        fontSize: fontSize,
	        fontFamily: fontFamily,
	        padding: padding,
	        color: color,
	        outlineColor: outlineColor,
	        outlineWidth: outlineWidth,
	        textDirection: textDirection,
	        startPoint: startPoint,
	        endPoint: endPoint
	      };
	    }
	  }, {
	    key: "unpack",
	    value: function unpack(data, features) {
	      return new GroundText(data);
	    }
	  }]);

	  return GroundText;
	}();

	exports.default = GroundText;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loadScene = loadScene;

	var _extra = __webpack_require__(56);

	var _polygon = __webpack_require__(57);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function loadScene(data) {
	  var _this = this;
	  if (data.camera) {
	    var _GeoVis$Cartesian;

	    earth.camera.flyTo({
	      duration: 1.5,
	      destination: (_GeoVis$Cartesian = GeoVis.Cartesian3).fromDegrees.apply(_GeoVis$Cartesian, _toConsumableArray(data.camera.position)),
	      orientation: {
	        heading: data.camera.orientation[0] * Math.PI / 180,
	        pitch: data.camera.orientation[1] * Math.PI / 180,
	        roll: data.camera.orientation[2] * Math.PI / 180
	      },
	      complete: function complete() {
	        data.scene.features.map(function (entity) {
	          if (!entity.geometry.type) return;
	          switch (entity.geometry.type) {
	            case "Billboard":
	              (0, _extra.unserializeBillboard)(entity, _this.features);
	              break;
	            case "Label":
	              (0, _extra.unserializeLabel)(entity, _this.features);
	              break;
	            case "Point":
	              (0, _extra.unserializePoint)(entity, _this.features);
	              break;
	            case "LineString":
	              (0, _polygon.unserializePolyline)(entity, _this.features);
	              break;
	            case "Polygon":
	              (0, _polygon.unserializePolygon)(entity, _this.features);
	              break;
	            case "Model":
	              (0, _extra.unserializeModel)(entity, _this.features);
	              break;
	          }
	        });
	        _this.fire("serialized");
	      }
	    });
	  }
	}

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.unserializeBillboard = unserializeBillboard;
	exports.unserializePoint = unserializePoint;
	exports.unserializeModel = unserializeModel;
	exports.unserializeLabel = unserializeLabel;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function unserializeBillboard(entity, features) {
	  var _GeoVis$Cartesian;

	  var position = (_GeoVis$Cartesian = GeoVis.Cartesian3).fromDegrees.apply(_GeoVis$Cartesian, _toConsumableArray(entity.geometry.coordinates));
	  var marker = new GeoVis.Billboard(position, entity.properties).addTo(features);
	  return marker;
	}

	function unserializePoint(entity, features) {
	  var _GeoVis$Cartesian2;

	  var position = (_GeoVis$Cartesian2 = GeoVis.Cartesian3).fromDegrees.apply(_GeoVis$Cartesian2, _toConsumableArray(entity.geometry.coordinates));
	  var properties = entity.properties;
	  var marker = new GeoVis.Point(position, _extends({}, entity.properties, {
	    scaleByDistance: properties.scaleByDistance ? new (Function.prototype.bind.apply(GeoVis.NearFarScalar, [null].concat(_toConsumableArray(properties.scaleByDistance))))() : null,
	    color: GeoVis.Color.fromCssString(properties.color)
	  })).addTo(features);
	}

	function unserializeModel(entity, features) {
	  var position = new (Function.prototype.bind.apply(GeoVis.Cartesian3.fromDegrees, [null].concat(_toConsumableArray(entity.geometry.coordinates))))();
	  var properties = entity.properties;
	  // const marker = new GeoVis.Point(position, {
	  //   ...entity.properties,
	  //   scaleByDistance: properties.scaleByDistance
	  //     ? new GeoVis.NearFarScalar(...properties.scaleByDistance)
	  //     : null,
	  //   color: GeoVis.Color.fromCssString(properties.color)
	  // }).addTo(features);
	  // "name": "香格里拉模型",
	  // "id": "qj-shangri-model",
	  // "model": "/static/models/shangrila.glb",
	  // "heading": -90,
	  // "scale": 1.2
	  // var vec = GeoVis.Vector3.fromDegrees(position[0], position[1], 100);
	  var heading = GeoVis.Math.toRadians(properties.heading);
	  var pitch = 0;
	  var roll = 0;
	  var hpr = new GeoVis.HeadingPitchRoll(heading, pitch, roll);
	  var orientation = GeoVis.Transforms.headingPitchRollQuaternion(position, hpr);

	  // var modelMatrix = GeoVis.Transforms.eastNorthUpToFixedFrame(position);
	  var translation = position;
	  var rotation = orientation;
	  // var uniformScale = new GeoVis.Cartesian3(1.0, 1.0, 1.0);
	  var scale = new GeoVis.Cartesian3(1.0, 1.0, 1.0);
	  var modelMatrix = GeoVis.Matrix4.fromTranslationQuaternionRotationScale(translation, rotation, scale, new GeoVis.Matrix4());
	  // GeoVis.Matrix4.multiply(modelMatrix, orientation, modelMatrix)
	  // GeoVis.Matrix4.fromTranslationQuaternionRotationScale(modelMatrix, orientation,  new GeoVis.Cartesian3(1.0,1.0, 1.0), modelMatrix);
	  var model = GeoVis.Model.fromGltf({
	    url: properties.model,
	    show: true,
	    modelMatrix: modelMatrix,
	    scale: properties.scale,
	    // minimumPixelSize: 128,
	    // maximumScale: 20000,
	    allowPicking: false,
	    debugShowBoundingVolume: false,
	    debugWireframe: false
	  });
	  model.addTo(features);
	  return model;
	}

	function unserializeLabel(entity, features) {
	  var position = new (Function.prototype.bind.apply(GeoVis.Cartesian3.fromDegrees, [null].concat(_toConsumableArray(entity.geometry.coordinates))))();
	  var properties = entity.properties;
	  var fonts = properties.font.split("px");
	  var size = fonts[0] * 2;
	  var marker = new GeoVis.Label(position, _extends({}, entity.properties, {
	    scaleByDistance: properties.scaleByDistance ? new (Function.prototype.bind.apply(GeoVis.NearFarScalar, [null].concat(_toConsumableArray(properties.scaleByDistance))))() : null,
	    font: size + "px " + fonts[1],
	    scale: 0.5,
	    fillColor: GeoVis.Color.fromCssString(properties.fillColor),
	    labelStyle: GeoVis.LabelStyle[properties.labelStyle],
	    horizontalOrigin: GeoVis.HorizontalOrigin[properties.horizontalOrigin],
	    verticalOrigin: GeoVis.VerticalOrigin[properties.verticalOrigin]
	  })).addTo(features);
	  return marker;
	}

/***/ }),
/* 57 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.unserializePolygon = unserializePolygon;
	exports.unserializePolyline = unserializePolyline;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function unserializePolygon(params, features) {
	  var options = _extends({}, params);
	  if (options.geometry) {
	    var properties = options.properties;
	    if (options.geometry.type === "Polygon") {
	      // 处理Polygon

	      var material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	      if (properties.fillColor.length === 2) {
	        material.uniforms.color = GeoVis.Color.fromCssString(properties.fillColor[0]).withAlpha(properties.fillColor[1]);
	      } else {
	        material.uniforms.color = GeoVis.Color.unpack(properties.fillColor);
	      }

	      options.material = material;
	      var _positions = [];
	      options.geometry.coordinates.map(function (lonlat) {
	        if (lonlat.length > 2) {
	          lonlat.map(function (l) {
	            var _GeoVis$Cartesian;

	            return _positions.push((_GeoVis$Cartesian = GeoVis.Cartesian3).fromDegrees.apply(_GeoVis$Cartesian, _toConsumableArray(l)));
	          });
	        } else {
	          var _GeoVis$Cartesian2;

	          _positions.push((_GeoVis$Cartesian2 = GeoVis.Cartesian3).fromDegrees.apply(_GeoVis$Cartesian2, _toConsumableArray(lonlat)));
	        }
	      });
	      options.positions = _positions;
	      options.width = properties.width;
	      options.fill = properties.fill;
	      options.outline = properties.outline;
	      if (properties.outlineColor && properties.outlineColor.length === 2) {
	        options.outlineColor = GeoVis.Color.fromCssString(properties.outlineColor[0]).withAlpha(properties.outlineColor[1]);
	      }
	      options.appearance = new GeoVis.MaterialAppearance({
	        material: options.material
	      });
	    }
	  }

	  // options.computed
	  options.appearance = new GeoVis.MaterialAppearance({
	    material: options.material
	  });
	  var poly = new GeoVis.Polygon(options.positions, _extends({}, options, {
	    async: true
	  })).addTo(features);
	  return poly;
	}

	function unserializePolyline(params, features) {
	  var options = _extends({}, params);
	  if (options.geometry) {
	    var properties = options.properties;
	    if (options.geometry.type === "LineString") {
	      if (options.properties.colors) {
	        var material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	        material.uniforms.color = GeoVis.Color.fromCssString(properties.colors[0]);
	        options.material = material;
	      }
	      if (options.properties.material) {
	        var _material = GeoVis.Material.fromType(properties.material);
	        _material.uniforms.color = GeoVis.Color.fromCssString(properties.colors[0]);
	        if (properties.material === "PolylineDash") {
	          _material.uniforms.dashLength = properties.dashLength;
	        } else if (properties.material === "PolylineOutline") {
	          _material.uniforms.outlineWidth = properties.outlineWidth;
	          _material.uniforms.outlineColor = GeoVis.Color.fromCssString(properties.outlineColor);
	        }
	        options.material = _material;
	        options.appearance = new GeoVis.PolylineMaterialAppearance({
	          material: options.material
	        });
	      }
	      var positions = [];
	      options.geometry.coordinates.map(function (lonlat) {
	        if (lonlat[0].length) {
	          lonlat.map(function (l) {
	            var _GeoVis$Cartesian3;

	            return positions.push((_GeoVis$Cartesian3 = GeoVis.Cartesian3).fromDegrees.apply(_GeoVis$Cartesian3, _toConsumableArray(l)));
	          });
	        } else {
	          var _GeoVis$Cartesian4;

	          positions.push((_GeoVis$Cartesian4 = GeoVis.Cartesian3).fromDegrees.apply(_GeoVis$Cartesian4, _toConsumableArray(lonlat)));
	        }
	      });
	      options.positions = positions;
	      options.width = properties.width;
	    }
	  }

	  var poly = new GeoVis.Polyline(options.positions, _extends({}, options, {
	    vertexColor: true,
	    followSurface: true
	  })).addTo(earth.features);

	  return poly;
	}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ellipsoid = GeoVis.Ellipsoid.WGS84;

	var PointGroup = function () {
	  function PointGroup(drawHelper, options) {
	    _classCallCheck(this, PointGroup);

	    this._drawHelper = drawHelper;
	    this._scene = drawHelper._scene;
	    this._earth = drawHelper._earth;

	    this._options = (0, _util.copyOptions)(options, _config.defaultPoint);

	    // 创建pointCollection来保存Points
	    var b = new GeoVis.BillboardCollection({
	      scene: drawHelper._scene
	    });
	    drawHelper._tempPrimitives.add(b);
	    this.points = b;
	    //  points 列表
	    this._orderedPoints = [];
	  }

	  _createClass(PointGroup, [{
	    key: "_points",
	    get: function get() {
	      return this.points;
	    },
	    set: function set(val) {
	      this.points = val;
	    }
	  }]);

	  return PointGroup;
	}();

	PointGroup.prototype.createPoint = function (position, callbacks, heightReference) {
	  var point = this._points.add({
	    show: true,
	    position: position,
	    pixelOffset: new GeoVis.Cartesian2(this._options.shiftX, this._options.shiftY),
	    // disableDepthTestDistance: 1e7,
	    eyeOffset: new GeoVis.Cartesian3(0.0, 0.0, 0.0),
	    horizontalOrigin: GeoVis.HorizontalOrigin.CENTER,
	    verticalOrigin: GeoVis.VerticalOrigin.CENTER,
	    scale: this._options.scale || 1.0,
	    image: this._options.iconUrl,
	    heightReference: heightReference,
	    color: new GeoVis.Color(1.0, 1.0, 1.0, 1.0)
	  });

	  // if editable
	  if (callbacks) {
	    var _self = this;
	    var screenSpaceCameraController = this._scene.screenSpaceCameraController;

	    if (callbacks.dragHandlers) {
	      _self = this;

	      (0, _util.setListener)(point, "leftDown", function (position) {
	        enableRotation(false);
	        function onDrag(position) {
	          try {
	            point.position = position;
	            // find index
	            callbacks.dragHandlers.onDrag && callbacks.dragHandlers.onDrag(getIndex(), position);
	          } catch (e) {
	            console.log(e);
	          }
	        }
	        function onDragEnd(position) {
	          // debugger
	          _self._earth.off("mouseMove", onMouseMove);
	          _self._earth.off("leftUp", onLeftUp);
	          enableRotation(true);
	          callbacks.dragHandlers.onDragEnd && callbacks.dragHandlers.onDragEnd(getIndex(), position);
	        }
	        function onMouseMove(event) {
	          var cartesian = event.position;
	          if (cartesian) {
	            onDrag(cartesian);
	          } else {
	            onDragEnd(cartesian);
	          }
	        }
	        function onLeftUp(event) {
	          onDragEnd(event.position);
	        }
	        _self._earth.on("mouseMove", onMouseMove);
	        _self._earth.on("leftUp", onLeftUp);

	        callbacks.dragHandlers.onDragStart && callbacks.dragHandlers.onDragStart(getIndex(), _self._scene.camera.pickEllipsoid(position, ellipsoid));
	      });
	    }
	    if (callbacks.onDoubleClick) {
	      (0, _util.setListener)(point, "leftDoubleClick", function () {
	        callbacks.onDoubleClick(getIndex());
	      });
	    }
	    if (callbacks.onClick) {
	      (0, _util.setListener)(point, "leftClick", function () {
	        callbacks.onClick(getIndex());
	      });
	    }
	    if (callbacks.tooltip) {
	      (0, _util.setListener)(point, "mouseMove", function (position) {
	        _self._drawHelper._tooltip.showAt(position, callbacks.tooltip());
	      });
	      (0, _util.setListener)(point, "mouseOut", function () {
	        _self._drawHelper._tooltip.setVisible(false);
	        document.body.style.cursor = "default";
	      });
	    }
	  }
	  function enableRotation(enable) {
	    _self._drawHelper.dragging = !enable;
	    screenSpaceCameraController.enableRotate = enable;
	    screenSpaceCameraController.enableTranslate = enable;
	  }
	  function getIndex() {
	    // find index
	    for (var i = 0, I = _self._orderedPoints.length; i < I && _self._orderedPoints[i] !== point; ++i) {}
	    return i;
	  }
	  return point;
	};

	PointGroup.prototype.insertPoint = function (index, position, callbacks) {
	  this._orderedPoints.splice(index, 0, this.createPoint(position, callbacks));
	};

	PointGroup.prototype.addPoint = function (position, callbacks, heightReference) {
	  this._orderedPoints.push(this.createPoint(position, callbacks, heightReference));
	};

	PointGroup.prototype.removeLastPoint = function () {
	  this._points.remove(this._orderedPoints.pop());
	};

	PointGroup.prototype.addPoints = function (positions, callbacks, heightReference) {
	  var index = 0;
	  for (; index < positions.length; index++) {
	    this.addPoint(positions[index], callbacks, heightReference);
	  }
	};

	PointGroup.prototype.updatePointsPositions = function (positions) {
	  var index = 0;
	  for (; index < positions.length; index++) {
	    this.getPoint(index).position = positions[index];
	  }
	};
	PointGroup.prototype.updatePointPosition = function (position) {
	  this.getPoint(0).position = position;
	};

	PointGroup.prototype.countPoints = function () {
	  return this._orderedPoints.length;
	};

	PointGroup.prototype.getPoint = function (index) {
	  return this._orderedPoints[index];
	};

	PointGroup.prototype.removePoint = function (index) {
	  this._points.remove(this.getPoint(index));
	  this._orderedPoints.splice(index, 1);
	};

	PointGroup.prototype.remove = function () {
	  this._points.removeAll(); // &&
	  this._orderedPoints = [];
	  // this._points.destroy();
	};

	PointGroup.prototype.setOnTop = function () {
	  this._drawHelper._tempPrimitives.raiseToTop(this._points);
	};

	exports.default = PointGroup;

/***/ }),
/* 59 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PrimitiveCollection = function (_GeoVis$PrimitiveColl) {
	  _inherits(PrimitiveCollection, _GeoVis$PrimitiveColl);

	  function PrimitiveCollection(options) {
	    _classCallCheck(this, PrimitiveCollection);

	    var _this = _possibleConstructorReturn(this, (PrimitiveCollection.__proto__ || Object.getPrototypeOf(PrimitiveCollection)).call(this, options));

	    _this.getIndex = function (primitive) {
	      if (!_this.contains(primitive)) return;
	      var index;
	      for (var i = 0; i < _this._primitives.length; i++) {
	        if (_this._primitives[i].id == primitive.id) {
	          index = i;
	        }
	      }
	      return index;
	    };

	    _this.getIndexById = function (id) {
	      var index;
	      for (var i = 0; i < _this._primitives.length; i++) {
	        if (_this._primitives[i].id == id) {
	          index = i;
	        }
	      }
	      return index;
	    };

	    return _this;
	  }

	  _createClass(PrimitiveCollection, [{
	    key: "changeIndex",
	    value: function changeIndex(dragId, hoverId) {
	      var dragIndex = this.getIndexById(dragId);
	      var hoverIndex = this.getIndexById(hoverId);
	      if (dragIndex !== undefined && hoverIndex !== undefined) {
	        var temp = this._primitives[hoverIndex];
	        this._primitives[hoverIndex] = this._primitives[dragIndex];
	        this._primitives[dragIndex] = temp;
	      } else {}
	    }
	  }]);

	  return PrimitiveCollection;
	}(GeoVis.PrimitiveCollection);

	exports.default = PrimitiveCollection;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @ts-check


	var _IconEditor = __webpack_require__(61);

	var _IconEditor2 = _interopRequireDefault(_IconEditor);

	var _CircleEditor = __webpack_require__(62);

	var _CircleEditor2 = _interopRequireDefault(_CircleEditor);

	var _PlotEditor = __webpack_require__(63);

	var _PlotEditor2 = _interopRequireDefault(_PlotEditor);

	var _PolyLineEditor = __webpack_require__(64);

	var _PolyLineEditor2 = _interopRequireDefault(_PolyLineEditor);

	var _PolygonEditor = __webpack_require__(65);

	var _PolygonEditor2 = _interopRequireDefault(_PolygonEditor);

	var _RectangleEditor = __webpack_require__(66);

	var _RectangleEditor2 = _interopRequireDefault(_RectangleEditor);

	var _WallEditor = __webpack_require__(67);

	var _WallEditor2 = _interopRequireDefault(_WallEditor);

	var _MarkerEditor = __webpack_require__(68);

	var _MarkerEditor2 = _interopRequireDefault(_MarkerEditor);

	var _GroundTextEditor = __webpack_require__(69);

	var _GroundTextEditor2 = _interopRequireDefault(_GroundTextEditor);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _util = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Editor = function () {
	  function Editor(drawHelper) {
	    var _this = this;

	    _classCallCheck(this, Editor);

	    this.editableEvent = function (surface) {
	      var _self = _this;
	      var _editor = _this.getEditor(surface);
	      // highlight polygon when mouse is entering
	      (0, _util.setListener)(surface, "mouseMove", function (position) {
	        if (!_self.drawHelper.primitives.contains(surface)) return;
	        _editor.setHighlighted(surface, true);
	        if (!surface._editMode) {
	          _self.drawHelper._tooltip.showAt(position, "点击以编辑图形");
	        }
	      });
	      // hide the highlighting when mouse is leaving the polygon
	      (0, _util.setListener)(surface, "mouseOut", function () {
	        if (!_self.drawHelper.primitives.contains(surface)) return;
	        _editor.setHighlighted(surface, false);
	        _self.drawHelper._tooltip.setVisible(false);
	      });
	      (0, _util.setListener)(surface, "leftClick", function () {
	        if (!_self.drawHelper.primitives.contains(surface)) return;
	        _self.drawHelper.fire("selected", { entity: surface });
	        _editor.setHighlighted(surface, true);
	        _editor.setEditable(surface, true);
	      });
	      (0, _util.setListener)(surface, "rightClick", function () {
	        if (!_self.drawHelper.primitives.contains(surface)) return;
	        _self.drawHelper.removeObj.primitives.push(surface);
	        _self.drawHelper.removeObj.groundPrimitives.push(surface);
	      });
	      (0, _util.setListener)(surface, "leftDoubleClick", function () {
	        if (!_self.drawHelper.primitives.contains(surface)) return;
	        _editor.setEditable(surface, false);
	        _self.drawHelper._tooltip.setVisible(false);
	        _editor.setHighlighted(surface, false);
	        surface.removeBillboard && surface.removeBillboard();
	        surface.removeWall && surface.removeWall(); // todo
	        _self.drawHelper._primitives.remove(surface);
	        _self.drawHelper.mouseOutObject = undefined;
	        _self.drawHelper.fire("deleted", { entity: surface });
	      });
	    };

	    this.disableAllHighlights = function () {
	      _this.setHighlighted(undefined);
	    };

	    this.setHighlighted = function (surface) {
	      if (_this._highlightedSurface && !_this._highlightedSurface.isDestroyed() && _this._highlightedSurface !== surface && !_this._highlightedSurface.setHighlighted) {
	        var _editor = _this.getEditor(_this._highlightedSurface);
	        _editor.setHighlighted(_this._highlightedSurface, false);
	      }
	      _this._highlightedSurface = surface;
	    };

	    this.disableAllEditMode = function () {
	      _this.setEdited(undefined);
	    };

	    this.setEdited = function (surface) {
	      if (_this._editedSurface && !_this._editedSurface.isDestroyed() && _this._editedSurface.setEditable) {
	        var _editor = _this.getEditor(_this._editedSurface);
	        _editor.setEditable(_this._editedSurface, false);
	      }
	      _this._editedSurface = surface;
	    };

	    this.getEditor = function (entity) {
	      switch (entity.type) {
	        case _Types2.default.ICON:
	          if (!_this._iconEditor) _this._iconEditor = new _IconEditor2.default(_this.drawHelper);
	          return _this._iconEditor;
	        case _Types2.default.CIRCLE:
	          if (!_this._circleEditor) _this._circleEditor = new _CircleEditor2.default(_this.drawHelper);
	          return _this._circleEditor;
	        case _Types2.default.SPACE_POLYLINE:
	        case _Types2.default.PROJ_POLYLINE:
	        case _Types2.default.GROUND_POLYLINE:
	          if (!_this._polyLineEditor) _this._polyLineEditor = new _PolyLineEditor2.default(_this.drawHelper);
	          return _this._polyLineEditor;
	        case _Types2.default.SPACE_POLYGON:
	        case _Types2.default.CLASSIFY_POLYGON:
	        case _Types2.default.PROJ_POLYGON:
	        case _Types2.default.GROUND_POLYGON:
	          if (!_this._polygonEditor) _this._polygonEditor = new _PolygonEditor2.default(_this.drawHelper);
	          return _this._polygonEditor;
	        case _Types2.default.RECTANGLE:
	          if (!_this._rectangleEditor) _this._rectangleEditor = new _RectangleEditor2.default(_this.drawHelper);
	          return _this._rectangleEditor;
	        case _Types2.default.WALL:
	          if (!_this._wallEditor) _this._wallEditor = new _WallEditor2.default(_this.drawHelper);
	          return _this._wallEditor;
	        case _Types2.default.LABEL_MARKER:
	        case _Types2.default.FLAG_MARKER:
	          if (!_this._markerEditor) _this._markerEditor = new _MarkerEditor2.default(_this.drawHelper);
	          return _this._markerEditor;
	        case _Types2.default.GROUND_TEXT:
	          if (!_this._groundTextEditor) _this._groundTextEditor = new _GroundTextEditor2.default(_this.drawHelper);
	          return _this._groundTextEditor;
	      }
	      if (entity.custom && entity.type.length > 1 && entity.type.search("GV") > -1) {
	        if (!_this._plotEditor) _this._plotEditor = new _PlotEditor2.default(_this.drawHelper);
	        return _this._plotEditor;
	      }
	    };

	    this.map = new Map();
	    this.drawHelper = drawHelper;
	  }
	  /**
	   * 添加对象编辑状态监听
	   * @param {Primitive} surface
	   */

	  /**
	   * 用于清除所有图形的高亮状态
	   */

	  /**
	   * 用于储当前高亮对象
	   * @param {Primitive} surface
	   */

	  /**
	   * 用于清除所有图形的编辑状态
	   */

	  /**
	   * 用于存储当前编辑对象
	   * @param {Primitive} surface
	   */

	  /**
	   * 用于获取当前对象的编辑类
	   * @param {Primitive} entity
	   */


	  _createClass(Editor, [{
	    key: "creatEditor",

	    /**
	     * 对象添加到编辑类
	     * @param {Primitive} entity
	     */
	    value: function creatEditor(entity) {
	      var _editor = this.getEditor(entity);
	      _editor.add(entity);
	    }
	    /**
	     * 对象从编辑类移除
	     * @param {Primitive} entity
	     */

	  }, {
	    key: "removeEditor",
	    value: function removeEditor(entity) {
	      var _editor = this.getEditor(entity);
	      _editor.remove(entity);
	    }
	    /**
	     * 添加可编辑对象
	     * @param {Primitive} entity
	     */

	  }, {
	    key: "add",
	    value: function add(entity) {
	      if (this.map.get(entity.id)) {
	        console.error("entity id 重复");
	      } else {
	        this.map.set(entity.id, entity);
	        this.creatEditor(entity);
	      }
	    }
	    /**
	     * 移除可编辑对象
	     * @param {Primitive} entity
	     */

	  }, {
	    key: "remove",
	    value: function remove(entity) {
	      this.map.delete(entity.id);
	      this.removeEditor(entity);
	    }
	    /**
	     * 移除可编辑对象
	     * @param {Primitive} entity
	     */

	  }, {
	    key: "removeAll",
	    value: function removeAll() {
	      this.disableAllEditMode();
	      this.map = new Map();
	      if (this._iconEditor) this._iconEditor.map = new Map();
	      if (this._circleEditor) this._circleEditor.map = new Map();
	      if (this._polyLineEditor) this._polyLineEditor.map = new Map();
	      if (this._polygonEditor) this._polygonEditor.map = new Map();
	      if (this._rectangleEditor) this._rectangleEditor.map = new Map();
	      if (this._wallEditor) this._wallEditor.map = new Map();
	      if (this._markerEditor) this._markerEditor.map = new Map();
	      if (this._groundTextEditor) this._groundTextEditor.map = new Map();
	    }
	  }]);

	  return Editor;
	}();

	exports.default = Editor;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @ts-check


	var _PointGroup = __webpack_require__(58);

	var _PointGroup2 = _interopRequireDefault(_PointGroup);

	var _config = __webpack_require__(6);

	var _util = __webpack_require__(5);

	var _Icon = __webpack_require__(50);

	var _Icon2 = _interopRequireDefault(_Icon);

	var _Util = __webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var IconEditor = function () {
	  function IconEditor(drawhelper) {
	    var _this = this;

	    _classCallCheck(this, IconEditor);

	    this.editableEvent = function (icon) {
	      (0, _util.setListener)(icon, "leftClick", function () {
	        _this.drawHelper.fire("selected", { entity: icon });
	        _this.setEditable(icon, true);
	      });
	      (0, _util.setListener)(icon, "mouseOut", function () {
	        _this.setHighlighted(icon, false);
	        icon._tooltip.setVisible(false);
	      });
	      (0, _util.setListener)(icon, "leftDoubleClick", function () {
	        icon.removeFrom(_this.drawHelper.features);
	      });
	      (0, _util.setListener)(icon, "mouseMove", function (position) {
	        _this.setHighlighted(icon, true);
	        if (!icon._editMode) {
	          icon._tooltip.showAt(position, "点击以编辑图标");
	        }
	      });
	    };

	    this.setHighlighted = function (icon, highlighted) {
	      if (icon._highlighted && icon._highlighted === highlighted) {
	        return;
	      }
	      // disable if already in edit mode
	      if (icon._editMode === true) {
	        return;
	      }
	      icon._highlighted = highlighted;
	      if (!icon.color.equals(icon.highLightColor) && !icon.color.equals(icon.highLightColor.brighten(0.5, new GeoVis.Color()))) {
	        icon.highLightColor = icon.color.clone();
	      }
	      if (highlighted) {
	        icon.color = icon.highLightColor.brighten(0.5, new GeoVis.Color());
	      } else {
	        icon.color = icon.highLightColor;
	      }
	    };

	    this.addListeners = function (icon) {
	      var _self = _this;
	      var earth = _self.drawHelper._earth;
	      // 添加到editor进行统一管理
	      _self.drawHelper._editor.setEdited(icon);
	      _self.drawHelper._editor.setHighlighted(icon);
	      if (icon._point == null) {
	        _config.dragPoint.scale = icon._markerScale;
	        var point = new _PointGroup2.default(_self.drawHelper, _config.dragPoint);
	        _self.drawHelper.removeObj.billBoard.push(point);
	        var handleMarkerChanges = {
	          dragHandlers: {
	            onDrag: function onDrag(index, position) {
	              icon.position = position;
	              icon._createPrimitive = true;
	              icon.props && (icon.props.position = position);
	              if (icon.label) {
	                icon.label.position = position;
	              }
	              (0, _Util.updateMarkers)(icon);
	              _self.drawHelper.fire("changed", {
	                entity: icon
	              });
	            },
	            onDragEnd: function onDragEnd(index, position) {
	              icon._createPrimitive = true;
	              _self.drawHelper.fire("edited", {
	                entity: icon
	              });
	            }
	          },
	          tooltip: function tooltip() {
	            document.body.style.cursor = "move";
	            return "拖动使图标贴地";
	          }
	        };

	        point.addPoint(icon.position, handleMarkerChanges);
	        icon._point = point;
	        var getObj = function getObj(event) {
	          var pickedObject = event.pickedObj;
	          if (!pickedObject) {
	            _this.setEditable(icon, false);
	            _this.setHighlighted(icon, false);
	            earth.off("click", getObj);
	          }
	        };
	        earth.on("click", getObj);
	        point.setOnTop();
	      }
	      if (icon._marker == null && icon.elevationMode !== "clampToGround") {
	        icon._marker = (0, _Util.addTranMarker)(_self.drawHelper, icon);
	        icon._marker.getMarker(0).pixelOffset = new GeoVis.Cartesian2(-40, 0);
	        icon._highMarker = (0, _Util.addHighMarker)(_self.drawHelper, icon);
	      }
	      icon._editMode = true;
	    };

	    this.setEditable = function (icon, editMode) {
	      if (icon._editMode === editMode) {
	        return;
	      }
	      if (editMode) {
	        _this.addListeners(icon);
	      } else {
	        _this.removeListners(icon);
	      }
	    };

	    this.add = function (entity) {
	      _this.editableEvent(entity);
	    };

	    this.map = new Map();
	    this.drawHelper = drawhelper;
	  }
	  /**
	   * 添加事件监听:左键点击、鼠标移动、双击等
	   * @param {Icon} icon
	   */

	  /**
	   * 用于设置高亮混色
	   * @param {Icon} icon
	   * @param {Boolean} highlighted
	   *
	   */

	  /**
	   * 添加Icon的编辑控制点及监听
	   * @param {Icon} icon
	   */


	  _createClass(IconEditor, [{
	    key: "removeListners",

	    /**
	     * 移除Icon的编辑控制点及监听
	     * @param {Icon} icon
	     */
	    value: function removeListners(icon) {
	      if (icon._point != null) {
	        icon._point.remove();
	        icon._point = null;
	        if (icon._marker) {
	          icon._marker.remove();
	          icon._marker = null;
	        }
	        if (icon._highMarker) {
	          icon._highMarker.remove();
	          icon._highMarker = null;
	        }
	      }
	      icon._editMode = false;
	    }
	    /**
	     * 点标编辑控制
	     * @param {Icon} icon
	     * @param {Boolean} editMode
	     */

	    /**
	     * 添加可编辑对象
	     * @param {Icon} entity
	     */

	  }, {
	    key: "remove",

	    /**
	     * 移除可编辑对象
	     * @param {Icon} entity
	     */
	    value: function remove(entity) {
	      this.setHighlighted(entity, false);
	      this.setEditable(entity, false);
	    }
	  }]);

	  return IconEditor;
	}();

	exports.default = IconEditor;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @ts-check


	var _Circle = __webpack_require__(37);

	var _Circle2 = _interopRequireDefault(_Circle);

	var _Util = __webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CircleEditor = function () {
	  function CircleEditor(drawhelper) {
	    var _this = this;

	    _classCallCheck(this, CircleEditor);

	    this.addListeners = function (circle) {
	      var _self = _this;
	      var earth = _self.drawHelper._earth;
	      _self.drawHelper._editor.setEdited(circle);
	      if (circle._points == null) {
	        var points = _self.drawHelper.points;
	        _self.drawHelper.removeObj.billBoard.push(points);
	        var getMarkerPositions = function getMarkerPositions() {
	          return _self.getCircleCartesianCoordinates(circle, GeoVis.Math.PI_OVER_TWO);
	        };

	        var handleMarkerChanges = {
	          dragHandlers: {
	            onDrag: function onDrag(index, position) {
	              circle.radius = GeoVis.Cartesian3.distance(circle.center, position);
	              points.updatePointsPositions(getMarkerPositions());
	              _self.drawHelper.fire("changed", {
	                entity: circle
	              });
	            },
	            onDragEnd: function onDragEnd(index, position) {
	              _self.drawHelper.fire("edited", {
	                entity: circle
	              });
	            }
	          },
	          tooltip: function tooltip() {
	            return "拖动以更改半径";
	          }
	        };
	        points.addPoints(getMarkerPositions(), handleMarkerChanges);
	        circle._points = points;
	        // add a handler for clicking in the globe
	        var getObj = function getObj(event) {
	          var pickedObject = event.pickedObj;
	          if (!pickedObject) {
	            _this.setEditable(circle, false);
	            earth.off("click", getObj);
	          }
	        };
	        earth.on("click", getObj);
	        // set on top of the polygon
	        points.setOnTop();
	      }
	      if (circle._marker == null) {
	        circle._marker = (0, _Util.addTranMarker)(_self.drawHelper, circle);
	        // entity._highMarker = addHighMarker(_self.drawHelper, entity);
	      }
	      circle._editMode = true;
	    };

	    this.setEditable = function (circle, editMode) {
	      if (circle._editMode === editMode) {
	        return;
	      }
	      if (editMode) {
	        _this.addListeners(circle);
	      } else {
	        _this.removeListners(circle);
	      }
	    };

	    this.setHighlighted = function (circle, highlighted) {
	      (0, _Util.setHighlighted)(circle, highlighted);
	    };

	    this.getCircleCartesianCoordinates = function (circle, granularity) {
	      var geometry = GeoVis.CircleOutlineGeometry.createGeometry(new GeoVis.CircleOutlineGeometry({
	        ellipsoid: GeoVis.Ellipsoid.WGS84,
	        center: circle.center,
	        radius: circle.radius,
	        granularity: granularity
	      }));
	      var value = void 0;
	      var values = [];
	      for (var count = 0; count < geometry.attributes.position.values.length; count += 3) {
	        value = geometry.attributes.position.values;
	        values.push(new GeoVis.Cartesian3(value[count], value[count + 1], value[count + 2]));
	      }
	      return values;
	    };

	    this.add = function (entity) {
	      entity.asynchronous = false;
	      _this.drawHelper._editor.editableEvent(entity);
	    };

	    this.map = new Map();
	    this.drawHelper = drawhelper;
	  }
	  /**
	   * 添加圆的编辑控制点及监听
	   * @param {Circle} circle
	   */


	  _createClass(CircleEditor, [{
	    key: "removeListners",

	    /**
	     * 移除圆的编辑控制点及监听
	     * @param {Circle} circle
	     */
	    value: function removeListners(circle) {
	      if (circle._points != null) {
	        circle._points.remove();
	        circle._points = null;
	        if (circle._marker) {
	          circle._marker.remove();
	          circle._marker = null;
	        }
	      }
	      circle._editMode = false;
	    }
	    /**
	     * 圆的编辑控制
	     * @param {Circle} circle
	     * @param {Boolean} editMode
	     */

	    /**
	     * 圆的高亮控制
	     * @param {Circle} circle
	     * @param {Boolean} highlighted
	     */

	    /**
	     * 圆的控制点生成
	     * @param {Circle} circle
	     * @param {GeoVis.Math.PI_OVER_TWO} granularity
	     */

	    /**
	     * 添加可编辑对象
	     * @param {Circle} entity
	     */

	  }, {
	    key: "remove",

	    /**
	     * 移除可编辑对象
	     * @param {Circle} entity
	     */
	    value: function remove(entity) {
	      this.setHighlighted(entity, false);
	      this.setEditable(entity, false);
	    }
	  }]);

	  return CircleEditor;
	}();

	exports.default = CircleEditor;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @ts-check


	var _util = __webpack_require__(5);

	var _Util = __webpack_require__(23);

	var _PlotShape = __webpack_require__(25);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PlotEditor = function () {
	  function PlotEditor(drawhelper) {
	    var _this = this;

	    _classCallCheck(this, PlotEditor);

	    this.addListeners = function (entity) {
	      var _self = _this;
	      var earth = _self.drawHelper._earth;
	      _self.drawHelper._editor.setEdited(entity);
	      _self.drawHelper._editor.setHighlighted(entity);
	      if (entity._points == null) {
	        var points = _self.drawHelper.points;
	        _self.drawHelper.removeObj.billBoard.push(points);
	        var handlePointChanges = {
	          dragHandlers: {
	            onDrag: function onDrag(index, position) {
	              // Types
	              var controlPoints = entity.custom;
	              controlPoints[index] = (0, _util.cartesianToLonlat)(position);
	              // updatePlot(controlPoints, entity)
	              entity.custom = controlPoints;
	              entity.oldCustom = controlPoints;
	              (0, _Util.updateMarkers)(entity);
	              // entity._createPrimitive = true;
	              _self.drawHelper.fire("changed", {
	                entity: entity
	              });
	            },
	            onDragEnd: function onDragEnd(index, position) {
	              _self.drawHelper.fire("edited", {
	                entity: entity
	              });
	            }
	          },
	          tooltip: function tooltip() {
	            return "拖动以改变形状";
	          }
	        };
	        var controlPoint = entity.custom;
	        points.addPoints((0, _util.positionToCartesian3)(controlPoint), handlePointChanges
	        // GeoVis.HeightReference.CLAMP_TO_GROUND
	        );

	        entity._points = points;
	        // add a handler for clicking in the globe
	        var getObj = function getObj(event) {
	          var pickedObject = event.pickedObj;
	          if (!pickedObject) {
	            _this.setEditable(entity, false);
	            _this.setHighlighted(entity, false);
	            earth.off("click", getObj);
	          }
	        };
	        earth.on("click", getObj);

	        // set on top of the polygon
	        points.setOnTop();
	      }
	      if (entity._marker == null && entity.elevationMode !== "clampToGround") {
	        entity._marker = (0, _Util.addTranMarker)(_self.drawHelper, entity);
	        entity._highMarker = (0, _Util.addHighMarker)(_self.drawHelper, entity);
	      }
	      entity._editMode = true;
	    };

	    this.setEditable = function (entity, editMode) {
	      if (entity._editMode === editMode) {
	        return;
	      }
	      if (editMode) {
	        _this.addListeners(entity);
	      } else {
	        _this.removeListners(entity);
	      }
	    };

	    this.setHighlighted = function (entity, highlighted) {
	      (0, _Util.setHighlighted)(entity, highlighted);
	    };

	    this.add = function (entity) {
	      entity.asynchronous = false;
	      _this.drawHelper._editor.editableEvent(entity);
	    };

	    this.map = new Map();
	    this.drawHelper = drawhelper;
	  }
	  /**
	   * 添加线标的编辑控制点及监听
	   * @param {PlotShape} entity
	   */


	  _createClass(PlotEditor, [{
	    key: "removeListners",

	    /**
	     * 移除线标的编辑控制点及监听
	     * @param {PlotShape} entity
	     */
	    value: function removeListners(entity) {
	      if (entity._points != null) {
	        entity._points.remove();
	        entity._points = null;
	        if (entity._marker != null) {
	          entity._marker.remove();
	          entity._marker = null;
	        }
	        if (entity._highMarker != null) {
	          entity._highMarker.remove();
	          entity._highMarker = null;
	        }
	      }

	      entity._editMode = false;
	    }
	    /**
	     * 线标编辑
	     * @param {PlotShape} entity
	     * @param {Boolean} editMode
	     */

	    /**
	     * 线标的高亮控制
	     * @param {PlotShape} entity
	     * @param {Boolean} highlighted
	     */

	    /**
	     * 添加可编辑对象
	     * @param {PlotShape} entity
	     */

	  }, {
	    key: "remove",

	    /**
	     * 移除可编辑对象
	     * @param {PlotShape} entity
	     */
	    value: function remove(entity) {
	      this.setHighlighted(entity, false);
	      this.setEditable(entity, false);
	    }
	  }]);

	  return PlotEditor;
	}();

	exports.default = PlotEditor;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @ts-check


	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _Polyline = __webpack_require__(32);

	var _Util = __webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ellipsoid = GeoVis.Ellipsoid.WGS84;

	var PolyLineEditor = function () {
	  function PolyLineEditor(drawhelper) {
	    var _this = this;

	    _classCallCheck(this, PolyLineEditor);

	    this.addListeners = function (entity) {
	      var _self = _this;
	      var earth = _self.drawHelper._earth;
	      _self.drawHelper._editor.setEdited(entity);
	      _self.drawHelper._editor.setHighlighted(entity);
	      if (entity._points == null) {
	        var points = _self.drawHelper.points;
	        _self.drawHelper.removeObj.billBoard.push(points);
	        // 修改中间点的图标

	        var handleMarkerChanges = {
	          dragHandlers: {
	            onDrag: function onDrag(index, position) {
	              if (entity.type === _Types2.default.PROJ_POLYLINE || entity.type === _Types2.default.SPACE_POLYLINE) {
	                entity.positions[index] = position;
	                if (entity._marker) (0, _Util.updateMarkers)(entity);
	                entity._createPrimitive = true;
	                _self.drawHelper.fire("changed", {
	                  entity: entity
	                });
	              } else {
	                var coord = ellipsoid.cartesianToCartographic(position);
	                var cartographic = new GeoVis.Cartographic(coord.longitude, coord.latitude, ellipsoid.cartesianToCartographic(entity.positions[index]).height);
	                var position1 = ellipsoid.cartographicToCartesian(cartographic);
	                entity.positions[index] = position1;
	                points.updatePointsPositions(entity.positions);
	                entity._createPrimitive = true;
	                _self.drawHelper.fire("changed", {
	                  entity: entity
	                });
	              }
	            },
	            onDragEnd: function onDragEnd(index, position) {
	              _self._createPrimitive = true;
	              _self.drawHelper.fire("edited", {
	                entity: entity
	              });
	            }
	          },
	          tooltip: function tooltip() {
	            if (entity.positions.length > 1) {
	              document.body.style.cursor = "move";
	              return "拖拽修改坐标";
	            }
	          }
	        };
	        // add billboards and keep an ordered list of them for the polygon edges
	        if (entity.type === _Types2.default.GROUND_POLYLINE) {
	          points.addPoints(entity.positions, handleMarkerChanges, GeoVis.HeightReference.CLAMP_TO_GROUND);
	        } else {
	          points.addPoints(entity.positions, handleMarkerChanges);
	        }

	        entity._points = points;

	        // add a handler for clicking in the globe
	        var getObj = function getObj(event) {
	          var pickedObject = event.pickedObj;
	          if (!pickedObject) {
	            _this.setEditable(entity, false);
	            _this.setHighlighted(entity, false);
	            earth.off("click", getObj);
	          }
	        };
	        earth.on("click", getObj);

	        // set on top of the polygon
	        points.setOnTop();
	      }
	      if (entity._marker == null) {
	        entity._marker = (0, _Util.addTranMarker)(_self.drawHelper, entity);
	      }
	      if (entity._highMarker == null && entity.type !== _Types2.default.GROUND_POLYLINE) {
	        entity._highMarker = (0, _Util.addHighMarker)(_self.drawHelper, entity);
	      }
	      entity._editMode = true;
	    };

	    this.setEditable = function (entity, editMode) {
	      if (entity._editMode === editMode) {
	        return;
	      }
	      if (editMode) {
	        _this.addListeners(entity);
	      } else {
	        _this.removeListners(entity);
	      }
	    };

	    this.setHighlighted = function (entity, highlighted) {
	      (0, _Util.setHighlighted)(entity, highlighted);
	    };

	    this.add = function (entity) {
	      entity.asynchronous = false;
	      _this.drawHelper._editor.editableEvent(entity);
	    };

	    this.map = new Map();
	    this.drawHelper = drawhelper;
	  }
	  /**
	   * 添加线的编辑控制点及监听
	   * @param {Polyline} entity
	   */


	  _createClass(PolyLineEditor, [{
	    key: "removeListners",

	    /**
	     * 移除线的编辑控制点及监听
	     * @param {Polyline} entity
	     */
	    value: function removeListners(entity) {
	      if (entity._points != null) {
	        entity._points.remove();
	        entity._points = null;
	        if (entity._marker) {
	          entity._marker.remove();
	          entity._marker = null;
	        }
	        if (entity._highMarker) {
	          entity._highMarker.remove();
	          entity._highMarker = null;
	        }
	      }
	      entity._editMode = false;
	    }
	    /**
	     * 线编辑
	     * @param {Polyline} entity
	     * @param {Boolean} editMode
	     */

	    /**
	     * 线的高亮控制
	     * @param {Polyline} entity
	     * @param {Boolean} highlighted
	     */

	    /**
	     * 添加可编辑对象
	     * @param {Polyline} entity
	     */

	  }, {
	    key: "remove",

	    /**
	     * 移除可编辑对象
	     * @param {Primitive} entity
	     */
	    value: function remove(entity) {
	      this.setHighlighted(entity, false);
	      this.setEditable(entity, false);
	    }
	  }]);

	  return PolyLineEditor;
	}();

	exports.default = PolyLineEditor;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @ts-check


	var _Polygon = __webpack_require__(18);

	var _Util = __webpack_require__(23);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PolygonEditor = function () {
	  function PolygonEditor(drawhelper) {
	    var _this = this;

	    _classCallCheck(this, PolygonEditor);

	    this.addListeners = function (entity) {
	      var _self = _this;
	      var scene = _self.drawHelper._scene;
	      _self.drawHelper._editor.setEdited(entity);
	      _self.drawHelper._editor.setHighlighted(entity);
	      if (entity._points == null) {
	        var points = _self.drawHelper.points;
	        _self.drawHelper.removeObj.billBoard.push(points);

	        var handleMarkerChanges = {
	          dragHandlers: {
	            onDrag: function onDrag(index, position) {
	              var controlPoints = [];
	              entity.positions.map(function (pos) {
	                controlPoints.push(GeoVis.Cartesian3.clone(pos));
	              });
	              controlPoints[index] = position;
	              entity.positions = controlPoints;
	              if (entity._marker) (0, _Util.updateMarkers)(entity);
	              entity._createPrimitive = true;
	              _self.drawHelper.fire("changed", {
	                entity: entity
	              });
	            },
	            onDragEnd: function onDragEnd(index, position) {
	              _self._createPrimitive = true;
	              _self.drawHelper.fire("edited", {
	                entity: entity
	              });
	            }
	          },
	          tooltip: function tooltip() {
	            if (entity.positions.length > 1) {
	              return "拖拽修改坐标";
	            }
	          }
	        };
	        if (entity.type === _Types2.default.GROUND_POLYGON) {
	          points.addPoints(entity.positions, handleMarkerChanges, GeoVis.HeightReference.CLAMP_TO_GROUND);
	        } else {
	          points.addPoints(entity.positions, handleMarkerChanges);
	        }

	        entity._points = points;

	        _this._globeClickhandler = new GeoVis.ScreenSpaceEventHandler(scene.canvas);
	        _this._globeClickhandler.setInputAction(function (movement) {
	          var pickedObject = scene.pick(movement.position);
	          if (!(pickedObject && pickedObject.primitive)) {
	            _this.setEditable(entity, false);
	            _this.setHighlighted(entity, false);
	          }
	        }, GeoVis.ScreenSpaceEventType.LEFT_CLICK);

	        points.setOnTop();
	      }
	      if (entity._marker == null) {
	        entity._marker = (0, _Util.addTranMarker)(_self.drawHelper, entity);
	      }
	      if (entity._highMarker == null && entity.type === _Types2.default.SPACE_POLYGON) {
	        entity._highMarker = (0, _Util.addHighMarker)(_self.drawHelper, entity);
	      }
	      entity._editMode = true;
	    };

	    this.setEditable = function (entity, editMode) {
	      if (entity._editMode === editMode) {
	        return;
	      }
	      if (editMode) {
	        _this.addListeners(entity);
	      } else {
	        _this.removeListners(entity);
	      }
	    };

	    this.setHighlighted = function (entity, highlighted) {
	      (0, _Util.setHighlighted)(entity, highlighted);
	    };

	    this.add = function (entity) {
	      entity.asynchronous = false;
	      _this.drawHelper._editor.editableEvent(entity);
	    };

	    this.map = new Map();
	    this.drawHelper = drawhelper;
	  }
	  /**
	   * 添加多边形的编辑控制点及监听
	   * @param {Polygon} entity
	   */


	  _createClass(PolygonEditor, [{
	    key: "removeListners",

	    /**
	     * 移除多边形的编辑控制点及监听
	     * @param {Polygon} entity
	     */
	    value: function removeListners(entity) {
	      if (entity._points != null) {
	        entity._points.remove();
	        entity._points = null;
	        if (entity._marker) {
	          entity._marker.remove();
	          entity._marker = null;
	        }
	        if (entity._highMarker) {
	          entity._highMarker.remove();
	          entity._highMarker = null;
	        }
	        this._globeClickhandler.destroy();
	      }
	      entity._editMode = false;
	    }
	    /**
	     * 多边形编辑
	     * @param {Polygon} entity
	     * @param {Boolean} editMode
	     */

	    /**
	     * 多边形的高亮控制
	     * @param {Polygon} entity
	     * @param {Boolean} highlighted
	     */

	    /**
	     * 添加可编辑对象
	     * @param {Polygon} entity
	     */

	  }, {
	    key: "remove",

	    /**
	     * 移除可编辑对象
	     * @param {Polygon} entity
	     */
	    value: function remove(entity) {
	      this.setHighlighted(entity, false);
	      this.setEditable(entity, false);
	    }
	  }]);

	  return PolygonEditor;
	}();

	exports.default = PolygonEditor;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @ts-check


	var _Rectangle = __webpack_require__(40);

	var _Rectangle2 = _interopRequireDefault(_Rectangle);

	var _PointGroup = __webpack_require__(58);

	var _PointGroup2 = _interopRequireDefault(_PointGroup);

	var _config = __webpack_require__(6);

	var _Util = __webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RectangleEditor = function () {
	  function RectangleEditor(drawhelper) {
	    var _this = this;

	    _classCallCheck(this, RectangleEditor);

	    this.addListeners = function (entity) {
	      var _self = _this;
	      var earth = _self.drawHelper._earth;
	      _self.drawHelper._editor.setEdited(entity);
	      var pictureXY = [];
	      if (entity.material && entity.material._textures && entity.material._textures.image) {
	        pictureXY.push(entity.material._textures.image._dimensions.x);
	        pictureXY.push(entity.material._textures.image._dimensions.y);
	      }
	      if (entity._points == null) {
	        var points = _self.drawHelper.points;
	        _self.drawHelper.removeObj.billBoard.push(points);

	        var editPoints = new _PointGroup2.default(_self.drawHelper, _config.dragPoint);
	        _self.drawHelper.removeObj.billBoard.push(editPoints);

	        var handleMarkerChanges = {
	          dragHandlers: {
	            onDrag: function onDrag(index, position) {
	              if (pictureXY.length > 0) {
	                position = _self.GetDeltaPoint(pictureXY, entity.positions[Math.abs(index - 1)], position);
	              }
	              entity.positions[index] = position;
	              if (entity._marker) (0, _Util.updateMarkers)(entity);
	              entity._createPrimitive = true;
	              for (var i = 0; i < 2; i++) {
	                editPositions[i] = _self.changeXYPostions(entity.positions[i], entity.positions[Math.abs(i - 1)]);
	              }
	              editPoints.updatePointsPositions(editPositions);
	              points.updatePointsPositions(entity.positions);
	              _self.drawHelper.fire("changed", {
	                entity: entity
	              });
	            },
	            onDragEnd: function onDragEnd(index, position) {
	              entity._createPrimitive = true;
	              _self.drawHelper.fire("edited", {
	                entity: entity
	              });
	            }
	          },
	          tooltip: function tooltip() {
	            return "拖动以改变形状";
	          }
	        };

	        points.addPoints(entity.positions, handleMarkerChanges);
	        entity._points = points;

	        var editPositions = [];
	        for (var index = 0; index < 2; index++) {
	          editPositions.push(_self.changeXYPostions(entity.positions[index], entity.positions[Math.abs(index - 1)]));
	        }
	        var handleEditMarkerChanges = {
	          dragHandlers: {
	            onDrag: function onDrag(index, position) {
	              if (pictureXY.length > 0) {
	                position = _self.GetDeltaPoint(pictureXY, editPositions[Math.abs(index - 1)], position);
	              }
	              editPositions[index] = position;
	              entity.positions[Math.abs(index - 1)] = _self.changeXYPostions(editPositions[Math.abs(index - 1)], position);
	              entity.positions[index] = _self.changeXYPostions(position, editPositions[Math.abs(index - 1)]);
	              points.updatePointsPositions(entity.positions);
	              editPoints.updatePointsPositions(editPositions);
	              // updateMovePoints(index, _self.positions);
	              if (entity._marker) (0, _Util.updateMarkers)(entity);
	              entity._createPrimitive = true;
	              _self.drawHelper.fire("changed", {
	                entity: entity
	              });
	            },
	            onDragEnd: function onDragEnd(index, position) {
	              entity._createPrimitive = true;
	              _self.drawHelper.fire("edited", {
	                entity: entity
	              });
	            }
	          },
	          tooltip: function tooltip() {
	            return "拖动以改变形状";
	          }
	        };
	        editPoints.addPoints(editPositions, handleEditMarkerChanges);
	        entity._editPoints = editPoints;

	        var getObj = function getObj(event) {
	          var pickedObject = event.pickedObj;
	          if (!pickedObject) {
	            _this.setEditable(entity, false);
	            earth.off("click", getObj);
	          }
	        };
	        earth.on("click", getObj);

	        points.setOnTop();
	      }
	      if (entity._marker == null) {
	        entity._marker = (0, _Util.addTranMarker)(_self.drawHelper, entity);
	      }

	      entity._editMode = true;
	    };

	    this.setEditable = function (entity, editMode) {
	      if (entity._editMode === editMode) {
	        return;
	      }
	      if (editMode) {
	        _this.addListeners(entity);
	      } else {
	        _this.removeListners(entity);
	      }
	    };

	    this.setHighlighted = function (entity, highlighted) {
	      (0, _Util.setHighlighted)(entity, highlighted);
	    };

	    this.add = function (entity) {
	      entity.asynchronous = false;
	      _this.drawHelper._editor.editableEvent(entity);
	    };

	    this.map = new Map();
	    this.drawHelper = drawhelper;
	  }
	  /**
	   * 添加矩形的编辑控制点及监听
	   * @param {Rectangle} entity
	   */


	  _createClass(RectangleEditor, [{
	    key: "changeXYPostions",
	    value: function changeXYPostions(point1, point2) {
	      var carto1 = GeoVis.Cartographic.fromCartesian(point1);
	      var carto2 = GeoVis.Cartographic.fromCartesian(point2);
	      var newPoint = GeoVis.Cartesian3.fromRadians(carto1.longitude, carto2.latitude, carto1.height);
	      return newPoint;
	    }
	  }, {
	    key: "GetDeltaPoint",
	    value: function GetDeltaPoint(pictureXY, point1, point2) {
	      var proj = new GeoVis.WebMercatorProjection();
	      var carto0 = GeoVis.Cartographic.fromCartesian(point1);
	      var proj0 = proj.project(carto0);
	      var carto1 = GeoVis.Cartographic.fromCartesian(point2);
	      var proj1 = proj.project(carto1);
	      if (carto1.latitude < carto0.latitude) {
	        var latY = proj0.y - pictureXY[1] * Math.abs(proj1.x - proj0.x) / pictureXY[0];
	      } else {
	        latY = proj0.y + pictureXY[1] * Math.abs(proj1.x - proj0.x) / pictureXY[0];
	      }
	      var pointCart = proj.unproject(new GeoVis.Cartesian3(proj1.x, latY, proj1.z));
	      var cartesian1 = GeoVis.Cartesian3.fromRadians(pointCart.longitude, pointCart.latitude, 0);
	      if (carto1.longitude < carto0.longitude) {
	        var lonX = proj0.x - pictureXY[0] * Math.abs(proj1.y - proj0.y) / pictureXY[1];
	      } else {
	        lonX = proj0.x + pictureXY[0] * Math.abs(proj1.y - proj0.y) / pictureXY[1];
	      }
	      pointCart = proj.unproject(new GeoVis.Cartesian3(lonX, proj1.y, proj1.z));
	      var cartesian2 = GeoVis.Cartesian3.fromRadians(pointCart.longitude, pointCart.latitude, 0);
	      if (GeoVis.Cartesian3.distance(cartesian1, point1) >= GeoVis.Cartesian3.distance(cartesian2, point1)) {
	        return cartesian1;
	      } else {
	        return cartesian2;
	      }
	    }

	    /**
	     * 移除矩形的编辑控制点及监听
	     * @param {Rectangle} entity
	     */

	  }, {
	    key: "removeListners",
	    value: function removeListners(entity) {
	      if (entity._points != null) {
	        entity._points.remove();
	        entity._points = null;
	        entity._editPoints.remove();
	        entity._editPoints = null;
	        if (entity._marker) {
	          entity._marker.remove();
	          entity._marker = null;
	        }
	        if (this._globeClickhandler) this._globeClickhandler.destroy();
	      }
	      entity._editMode = false;
	    }
	    /**
	     * 矩形编辑
	     * @param {Rectangle} entity
	     * @param {Boolean} editMode
	     */

	    /**
	     * 矩形的高亮控制
	     * @param {Rectangle} entity
	     * @param {Boolean} highlighted
	     */

	    /**
	     * 添加可编辑对象
	     * @param {Rectangle} entity
	     */

	  }, {
	    key: "remove",

	    /**
	     * 移除可编辑对象
	     * @param {Rectangle} entity
	     */
	    value: function remove(entity) {
	      this.setHighlighted(entity, false);
	      this.setEditable(entity, false);
	    }
	  }]);

	  return RectangleEditor;
	}();

	exports.default = RectangleEditor;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Util = __webpack_require__(23);

	var _PointGroup = __webpack_require__(58);

	var _PointGroup2 = _interopRequireDefault(_PointGroup);

	var _config = __webpack_require__(6);

	var _Wall = __webpack_require__(26);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WallEditor = function () {
	  function WallEditor(drawhelper) {
	    var _this = this;

	    _classCallCheck(this, WallEditor);

	    this.addListeners = function (entity) {
	      var _self = _this;
	      var earth = _self.drawHelper._earth;
	      _self.drawHelper._editor.setEdited(entity);
	      if (entity._points == null) {

	        var points = _self.drawHelper.points;
	        _self.drawHelper.removeObj.billBoard.push(points);

	        var editPoints = new _PointGroup2.default(_self.drawHelper, _config.dragPoint);
	        _self.drawHelper.removeObj.billBoard.push(editPoints);

	        var heightPoints = new _PointGroup2.default(_self.drawHelper, _config.dragPoint);
	        _self.drawHelper.removeObj.billBoard.push(heightPoints);

	        var handleMarkerChanges = {
	          dragHandlers: {
	            onDrag: function onDrag(index, position) {
	              entity.positions[index] = position;
	              entity._createPrimitive = true;
	            },
	            onDragEnd: function onDragEnd(index, position) {
	              entity.drawHelper.fire("edited", {
	                entity: entity
	              });
	            }
	          },
	          tooltip: function tooltip() {
	            if (entity.positions.length > 1) {
	              document.body.style.cursor = "move";
	              return "拖拽修改坐标";
	            }
	          }
	        };
	        points.addPoints(entity.positions, handleMarkerChanges);

	        entity._points = points;

	        var getObj = function getObj(event) {
	          var pickedObject = event.pickedObj;
	          if (!pickedObject) {
	            _this.setEditable(entity, false);
	            earth.off("click", getObj);
	          }
	        };
	        earth.on("click", getObj);

	        points.setOnTop();
	        editPoints.setOnTop();
	      }
	      entity._editMode = true;
	    };

	    this.setEditable = function (entity, editMode) {
	      if (entity._editMode === editMode) {
	        return;
	      }
	      if (entity.fatherEntity) {
	        if (editMode) {
	          entity.fatherEntity.setHighlighted(true);
	          entity.fatherEntity.setEditMode(true);
	        }
	      } else {
	        if (editMode) {
	          _this.addListeners(entity);
	        } else {
	          _this.removeListners(entity);
	        }
	      }
	    };

	    this.setHighlighted = function (entity, highlighted) {
	      (0, _Util.setHighlighted)(entity, highlighted);
	    };

	    this.add = function (entity) {
	      if (_this.map.get(entity.id)) {
	        console.error("entity id 重复");
	      } else {
	        _this.map.set(entity.id, entity);
	        entity.asynchronous = false;
	        _this.drawHelper._editor.editableEvent(entity);
	      }
	    };

	    this.map = new Map();
	    this.drawHelper = drawhelper;
	  }
	  /**
	   * 添加墙体的编辑控制点及监听
	   * @param {Wall} entity
	   */


	  _createClass(WallEditor, [{
	    key: "removeListners",

	    /**
	       * 移除墙体的编辑控制点及监听
	       * @param {Wall} entity
	       */
	    value: function removeListners(entity) {
	      if (entity._points != null) {
	        entity._points.remove();
	        entity._points = null;
	      }
	      entity._editMode = false;
	    }
	    /**
	     * 墙体编辑
	     * @param {Wall} entity
	     * @param {Boolean} editMode
	     */

	    /**
	     * 墙体的高亮控制
	     * @param {Wall} entity
	     * @param {Boolean} highlighted
	     */

	    /**
	       * 添加可编辑对象
	       * @param {Wall} entity
	       */

	  }, {
	    key: "remove",

	    /**
	     * 移除可编辑对象
	     * @param {Primitive} entity
	     */
	    value: function remove(entity) {
	      this.map.delete(entity.id);
	      this.setHighlighted(entity, false);
	      this.setEditable(entity, false);
	    }
	  }]);

	  return WallEditor;
	}();

	exports.default = WallEditor;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @ts-check


	var _PointGroup = __webpack_require__(58);

	var _PointGroup2 = _interopRequireDefault(_PointGroup);

	var _config = __webpack_require__(6);

	var _Marker = __webpack_require__(49);

	var _Marker2 = _interopRequireDefault(_Marker);

	var _Util = __webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MarkerEditor = function () {
	  function MarkerEditor(drawhelper) {
	    var _this = this;

	    _classCallCheck(this, MarkerEditor);

	    this.editableEvent = function () {
	      document.body.addEventListener("click", _this.bodyClick);
	    };

	    this.bodyClick = function (e) {
	      var e = e || window.event;
	      var target = e.target || e.srcElement;
	      var i = 0;
	      do {
	        target = target.parentElement;
	        i++;
	      } while (i < 6 && target.parentElement && target.className !== "geo-custom");
	      var marker = _this.map.get(target.id);
	      if (marker && marker.element.contains(target)) {
	        _this.target = target;
	        _this.drawHelper.fire("selected", { entity: marker });
	        _this.setEditable(marker, true);
	      }

	      // this.setEditable(marker, true);
	    };

	    this.setHighlighted = function (marker, highlighted) {};

	    this.addListeners = function (marker) {
	      var _self = _this;
	      var earth = _self.drawHelper._earth;
	      // marker.textEle.style.pointerEvents = "none";
	      // 添加到editor进行统一管理
	      _self.drawHelper._editor.setEdited(marker);
	      _self.drawHelper._editor.setHighlighted(marker);
	      if (marker._point == null) {
	        _config.dragPoint.scale = marker._markerScale;
	        var point = new _PointGroup2.default(_self.drawHelper, _config.dragPoint);
	        _self.drawHelper.removeObj.billBoard.push(point);
	        var handleMarkerChanges = {
	          dragHandlers: {
	            onDrag: function onDrag(index, position) {
	              marker.position = position;
	              if (marker._marker) (0, _Util.updateMarkers)(marker);
	              _self.drawHelper.fire("changed", {
	                entity: marker
	              });
	            },
	            onDragEnd: function onDragEnd(index, position) {
	              _self.drawHelper.fire("edited", {
	                entity: marker
	              });
	            }
	          },
	          tooltip: function tooltip() {
	            document.body.style.cursor = "move";
	            return "拖动使图标贴地";
	          }
	        };

	        point.addPoint(marker.position, handleMarkerChanges);
	        marker._point = point;
	        var getObj = function getObj(event) {
	          var pickedObject = event.pickedObj;
	          if (!pickedObject) {
	            _this.setEditable(marker, false);
	            _this.setHighlighted(marker, false);
	            earth.off("click", getObj);
	          }
	        };
	        earth.on("click", getObj);
	        point.setOnTop();
	      }
	      if (marker._marker == null) {
	        marker._marker = (0, _Util.addTranMarker)(_self.drawHelper, marker);
	        marker._marker.getMarker(0).pixelOffset = new GeoVis.Cartesian2(-40, 0);
	      }
	      if (marker._highMarker == null) {
	        marker._highMarker = (0, _Util.addHighMarker)(_self.drawHelper, marker);
	      }

	      marker._editMode = true;
	    };

	    this.setEditable = function (marker, editMode) {
	      if (marker._editMode === editMode) {
	        return;
	      }
	      if (editMode) {
	        _this.addListeners(marker);
	      } else {
	        _this.removeListners(marker);
	      }
	    };

	    this.add = function (entity) {
	      _this.editableEvent();
	    };

	    this.map = new Map();
	    this.drawHelper = drawhelper;
	  }
	  /**
	   * 添加事件监听:左键点击、鼠标移动、双击等
	   * @param {Marker} marker
	   */

	  /**
	   * 添加Marker的编辑控制点及监听
	   * @param {Marker} marker
	   */


	  _createClass(MarkerEditor, [{
	    key: "removeListners",

	    /**
	     * 移除Marker的编辑控制点及监听
	     * @param {Marker} marker
	     */
	    value: function removeListners(marker) {
	      if (marker._point != null) {
	        marker._point.remove();
	        marker._point = null;
	        if (marker._marker) {
	          marker._marker.remove();
	          marker._marker = null;
	        }
	        if (marker._highMarker) {
	          marker._highMarker.remove();
	          marker._highMarker = null;
	        }
	      }
	      marker._editMode = false;
	    }
	    /**
	     * 点标编辑控制
	     * @param {Marker} marker
	     * @param {Boolean} editMode
	     */

	    /**
	     * 添加可编辑对象
	     * @param {Marker} entity
	     */

	  }, {
	    key: "remove",

	    /**
	     * 移除可编辑对象
	     * @param {Marker} entity
	     */
	    value: function remove(entity) {
	      this.setEditable(entity, false);
	    }
	  }]);

	  return MarkerEditor;
	}();

	exports.default = MarkerEditor;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @ts-check


	var _util = __webpack_require__(5);

	var _GroundText = __webpack_require__(54);

	var _GroundText2 = _interopRequireDefault(_GroundText);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GroundTextEditor = function () {
	  function GroundTextEditor(drawhelper) {
	    var _this = this;

	    _classCallCheck(this, GroundTextEditor);

	    this.editableEvent = function (entity) {
	      (0, _util.setListener)(entity, "leftClick", function () {
	        _this.drawHelper.fire("selected", { entity: entity });
	        _this.setEditable(entity, true);
	      });
	      (0, _util.setListener)(entity, "mouseOut", function () {
	        entity._tooltip.setVisible(false);
	      });
	      (0, _util.setListener)(entity, "leftDoubleClick", function () {
	        entity.removeFrom(_this.drawHelper.features);
	      });
	      (0, _util.setListener)(entity, "mouseMove", function (position) {
	        if (!entity._editMode) {
	          entity._tooltip.showAt(position, "点击以编辑");
	        }
	      });
	    };

	    this.addListeners = function (entity) {
	      var _self = _this;
	      var earth = _self.drawHelper._earth;
	      _self.drawHelper._editor.setEdited(entity);
	      if (entity._points == null) {
	        var points = _self.drawHelper.points;
	        _self.drawHelper.removeObj.billBoard.push(points);
	        var handlePointChanges = {
	          dragHandlers: {
	            onDrag: function onDrag(index, position) {
	              if (index === 0) {
	                entity.startPoint = (0, _util.cartesianToLonlat)(position);
	              } else {
	                entity.endPoint = (0, _util.cartesianToLonlat)(position);
	              }

	              _self.drawHelper.fire("changed", {
	                entity: entity
	              });
	            },
	            onDragEnd: function onDragEnd(index, position) {
	              _self.drawHelper.fire("edited", {
	                entity: entity
	              });
	            }
	          },
	          tooltip: function tooltip() {
	            return "拖动以改变形状";
	          }
	        };
	        var controlPoint = [entity.startPoint, entity.endPoint];
	        points.addPoints((0, _util.positionToCartesian3)(controlPoint), handlePointChanges
	        // GeoVis.HeightReference.CLAMP_TO_GROUND
	        );

	        entity._points = points;
	        // add a handler for clicking in the globe
	        var getObj = function getObj(event) {
	          var pickedObject = event.pickedObj;
	          if (!pickedObject) {
	            _this.setEditable(entity, false);
	            earth.off("click", getObj);
	          }
	        };
	        earth.on("click", getObj);
	        points.setOnTop();
	      }
	      entity._editMode = true;
	    };

	    this.setEditable = function (entity, editMode) {
	      if (entity._editMode === editMode) {
	        return;
	      }
	      if (editMode) {
	        _this.addListeners(entity);
	      } else {
	        _this.removeListners(entity);
	      }
	    };

	    this.add = function (entity) {
	      _this.editableEvent(entity);
	    };

	    this.map = new Map();
	    this.drawHelper = drawhelper;
	  }
	  /**
	   * 添加编辑控制点及监听
	   * @param {GroundTextPrimitive} entity
	   */


	  _createClass(GroundTextEditor, [{
	    key: "removeListners",

	    /**
	     * 移除编辑控制点及监听
	     * @param {GroundTextPrimitive} entity
	     */
	    value: function removeListners(entity) {
	      if (entity._points != null) {
	        entity._points.remove();
	        entity._points = null;
	      }

	      entity._editMode = false;
	    }
	    /**
	     * 编辑
	     * @param {GroundTextPrimitive} entity
	     * @param {Boolean} editMode
	     */

	    /**
	     * 添加可编辑对象
	     * @param {GroundTextPrimitive} entity
	     */

	  }, {
	    key: "remove",

	    /**
	     * 移除可编辑对象
	     * @param {GroundTextPrimitive} entity
	     */
	    value: function remove(entity) {
	      this.setEditable(entity, false);
	    }
	  }]);

	  return GroundTextEditor;
	}();

	exports.default = GroundTextEditor;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _compute = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var labelOptions = {
	  font: "36px KaiTi",
	  fillColor: GeoVis.Color.WHITE,
	  outlineColor: GeoVis.Color.BLACK,
	  outlineWidth: 5,
	  style: GeoVis.LabelStyle.FILL_AND_OUTLINE,
	  horizontalOrigin: GeoVis.HorizontalOrigin.CENTER,
	  verticalOrigin: GeoVis.VerticalOrigin.BOTTOM,
	  showBackground: true,
	  disableDepthTestDistance: 4e2, // 太大会闪烁
	  heightReference: GeoVis.HeightReference.NONE,
	  // translucencyByDistance: new GeoVis.NearFarScalar(1.5e2, 0, 8.0e6, 0.0),
	  backgroundColor: new GeoVis.Color(0.165, 0.165, 0.165, 0.8),
	  backgroundPadding: new GeoVis.Cartesian2(10, 10),
	  scale: 0.5,
	  pixelOffset: new GeoVis.Cartesian2(0, -10)
	};

	var MeasureTool = function () {
	  function MeasureTool(drawHelper, entity) {
	    var _this = this;

	    _classCallCheck(this, MeasureTool);

	    _initialiseProps.call(this);

	    this.drawHelper = drawHelper;
	    this.drawHelper.on("created", function (e) {
	      _this.measureType(e);
	    });
	    this.drawHelper.on("changed", function (e) {
	      if (e.entity.type !== _Types2.default.GROUND_POLYGON && e.entity.type !== _Types2.default.GROUND_POLYLINE) {
	        _this.measureType(e);
	      }
	    });
	    this.drawHelper.on("edited", function (e) {
	      if (e.entity.type == _Types2.default.GROUND_POLYGON || e.entity.type == _Types2.default.GROUND_POLYLINE) {
	        _this.measureType(e);
	      }
	    });
	    this.drawHelper.on("deleted", function (e) {
	      _this.destroy(e);
	    });
	    // labels = [];
	    this.tags = new Map();
	  }

	  _createClass(MeasureTool, [{
	    key: "measureType",
	    value: function measureType(e) {
	      if (e.entity && e.entity.computed) {
	        switch (e.entity.type) {
	          case _Types2.default.GROUND_POLYGON:
	          case _Types2.default.SPACE_POLYGON:
	          case _Types2.default.PROJ_POLYGON:
	            this.areaMeasure(e);
	            break;
	          case _Types2.default.PROJ_POLYLINE:
	          case _Types2.default.GROUND_POLYLINE:
	          case _Types2.default.SPACE_POLYLINE:
	            this.distanceMeasure(e);
	            break;
	          case _Types2.default.ANGLE:
	            this.angleMeasure(e);
	            break;
	        }
	      }
	    }
	  }, {
	    key: "areaMeasure",
	    value: function areaMeasure(_ref) {
	      var _this2 = this;

	      var entity = _ref.entity;

	      var _self = this;
	      if (entity.type !== _Types2.default.PROJ_POLYGON && entity.type !== _Types2.default.GROUND_POLYGON && entity.type !== _Types2.default.SPACE_POLYGON) return;
	      var positions = entity.positions;
	      var area1 = 0;
	      var maxheight = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(positions[0]).height;
	      for (var j = 1; j < positions.length; j++) {
	        var coord = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(positions[j]);
	        maxheight > coord.height ? 1 : maxheight = coord.height;
	      }
	      var minheight = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(positions[0]).height;
	      for (var k = 1; k < positions.length; k++) {
	        coord = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(positions[k]);
	        minheight < coord.height ? 1 : minheight = coord.height;
	      }
	      var centerLonlat = (0, _compute.getCentroid)(positions);
	      var center = GeoVis.Cartesian3.fromDegrees(centerLonlat[0], centerLonlat[1], (maxheight + minheight) / 2);
	      var labels = this.tags.get(entity.id) || [];
	      try {
	        labels.map(function (label) {
	          return label.removeFrom(_this2.drawHelper.features);
	        });
	      } catch (e) {}
	      labels = [];
	      if (entity.type === _Types2.default.PROJ_POLYGON) {
	        var area = Math.abs((0, _compute.computeArea)(positions)).toFixed(2);
	        var label = new GeoVis.Label(center, _extends({
	          text: "\u9762\u79EF: " + area + "\u5E73\u65B9\u7C73"
	        }, labelOptions, {
	          heightReference: GeoVis.HeightReference.NONE
	        })).addTo(this.drawHelper.features);
	        labels.push(label);
	      } else if (entity.type === _Types2.default.SPACE_POLYGON) {
	        // const area = Math.abs(computeArea(positions)).toFixed(2);
	        var polygon = entity.getGeometry();
	        var geometry1 = GeoVis.CoplanarPolygonGeometry.createGeometry(polygon);
	        for (var _j = 0; _j < geometry1.indices.length - 1; _j = _j + 3) {
	          area1 = (0, _compute.terrainarea)(positions[geometry1.indices[_j]], positions[geometry1.indices[_j + 1]], positions[geometry1.indices[_j + 2]]) + area1;
	        }
	        var _area = Math.abs(area1).toFixed(2);
	        var _label = new GeoVis.Label(center, _extends({
	          text: "\u9762\u79EF: " + _area + "\u5E73\u65B9\u7C73"
	        }, labelOptions, {
	          heightReference: GeoVis.HeightReference.NONE
	        })).addTo(this.drawHelper.features);
	        labels.push(_label);
	      } else {
	        var triangleGrid = (0, _compute.areaDivision)(positions, 2000);
	        var actualarea = 0;
	        var Cartographic = [];
	        for (var _j2 = 0; _j2 < triangleGrid.features.length; _j2++) {
	          for (var i = 0; i < 3; i++) {
	            var Coord = GeoVis.Cartographic.fromDegrees(triangleGrid.features[_j2].geometry.coordinates[0][i][0], triangleGrid.features[_j2].geometry.coordinates[0][i][1]);
	            Cartographic.push(Coord);
	          }
	        }
	        GeoVis.when(GeoVis.sampleTerrainMostDetailed(earth.scene.terrainProvider, Cartographic), function (samples) {
	          var heightpositions = GeoVis.Ellipsoid.WGS84.cartographicArrayToCartesianArray(samples);
	          var polygons = [];
	          for (var _k = 0; _k < heightpositions.length - 1; _k = _k + 3) {
	            actualarea = (0, _compute.terrainarea)(heightpositions[_k], heightpositions[_k + 1], heightpositions[_k + 2]) + actualarea;
	            // polygons.push(
	            //   new GeoVis.Polygon(
	            //     [
	            //       heightpositions[k],
	            //       heightpositions[k + 1],
	            //       heightpositions[k + 2]
	            //     ],
	            //     {
	            //       fillColor: GeoVis.Color.fromRandom(),
	            //       fill: true
	            //     }
	            //   )
	            // );
	          }
	          // var batch = new GeoVis.PolygonBatch(polygons).addTo(this.drawHelper.features);
	          var area = actualarea.toFixed(2);
	          var label = new GeoVis.Label(center, _extends({
	            text: "\u9762\u79EF: " + area + "\u5E73\u65B9\u7C73"
	          }, labelOptions, {
	            heightReference: GeoVis.HeightReference.RELATIVE_TO_GROUND
	          }));
	          label.addTo(_self.drawHelper.features);
	          labels.push(label);
	        });
	      }
	      this.tags.set(entity.id, labels);
	    }
	  }, {
	    key: "angleMeasure",
	    value: function angleMeasure(_ref2) {
	      var _this3 = this;

	      var entity = _ref2.entity;

	      if (entity.type !== _Types2.default.ANGLE) return;
	      var positions = [entity.positions[0], entity.positions[1]];
	      var labels = this.tags.get(entity.id) || [];
	      try {
	        labels.map(function (label) {
	          return label.removeFrom(_this3.drawHelper.features);
	        });
	      } catch (e) {}
	      labels = [];
	      labels.push(new GeoVis.Label(positions[0], _extends({
	        text: "\u8D77\u70B9"
	      }, labelOptions)).addTo(this.drawHelper.features));
	      for (var i = 1; i < positions.length; i++) {
	        // let distance = computeDistance(positions.slice(0, i + 1));
	        var distance1 = GeoVis.Cartesian3.distance(positions[0], positions[1]);
	        var distance = distance1.toFixed(2);
	        var pickheight = GeoVis.Cartographic.fromCartesian(positions[0]).height - GeoVis.Cartographic.fromCartesian(positions[1]).height;
	        var Aj = GeoVis.Cartographic.fromCartesian(positions[0]).longitude;
	        var Aw = GeoVis.Cartographic.fromCartesian(positions[0]).latitude;
	        var Bj = GeoVis.Cartographic.fromCartesian(positions[1]).longitude;
	        var Bw = GeoVis.Cartographic.fromCartesian(positions[1]).latitude;
	        var height = Math.abs(pickheight).toFixed(2);

	        var angle = Math.abs(180 / Math.PI * Math.atan((Bj - Aj) / (Bw - Aw))).toFixed(2);
	        var actualangle = void 0;
	        if (Bj - Aj > 0 && Bw - Aw > 0) {
	          actualangle = "东北方" + angle + "度";
	        } else if (Bj - Aj > 0 && Bw - Aw < 0) {
	          actualangle = "东南方" + angle + "度";
	        } else if (Bj - Aj < 0 && Bw - Aw < 0) {
	          actualangle = "西南方" + angle + "度";
	        } else {
	          actualangle = "西北方" + angle + "度";
	        }
	        if (pickheight > 0) {
	          var coord = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(positions[1]);
	          var cartographic = new GeoVis.Cartographic(coord.longitude, coord.latitude, coord.height + height / 2);
	          var heightPos = GeoVis.Ellipsoid.WGS84.cartographicToCartesian(cartographic);
	        } else {
	          coord = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(positions[0]);
	          cartographic = new GeoVis.Cartographic(coord.longitude, coord.latitude, coord.height + height / 2);
	          heightPos = GeoVis.Ellipsoid.WGS84.cartographicToCartesian(cartographic);
	        }

	        var coord2 = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(positions[1]);
	        var coord1 = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(positions[0]);
	        var cartographic1 = new GeoVis.Cartographic((coord2.longitude + coord1.longitude) / 2, (coord2.latitude + coord1.latitude) / 2, coord2.height + pickheight / 2);
	        if (pickheight < 0) {
	          var cartographic2 = new GeoVis.Cartographic((coord2.longitude + coord1.longitude) / 2, (coord2.latitude + coord1.latitude) / 2, coord2.height);
	        } else {
	          cartographic2 = new GeoVis.Cartographic((coord2.longitude + coord1.longitude) / 2, (coord2.latitude + coord1.latitude) / 2, coord2.height + pickheight);
	        }
	        var horizontalLinePos = GeoVis.Ellipsoid.WGS84.cartographicToCartesian(cartographic2);
	        var verticalLinePos = GeoVis.Ellipsoid.WGS84.cartographicToCartesian(cartographic1);

	        var cartographic3 = new GeoVis.Cartographic(coord2.longitude, coord2.latitude, coord2.height + pickheight);
	        var heightPos1 = GeoVis.Ellipsoid.WGS84.cartographicToCartesian(cartographic3);

	        var distance3 = GeoVis.Cartesian3.distance(positions[0], heightPos1).toFixed(2);
	        var anglelabel = new GeoVis.Label(positions[i], _extends({
	          text: "" + actualangle
	        }, labelOptions)).addTo(this.drawHelper.features);

	        labels.push(anglelabel);

	        var horizontalLinelabel = new GeoVis.Label(horizontalLinePos, _extends({
	          text: distance3 + "\u7C73"
	        }, labelOptions)).addTo(this.drawHelper.features);

	        labels.push(horizontalLinelabel);

	        var label = new GeoVis.Label(heightPos, _extends({
	          text: height + "\u7C73"
	        }, labelOptions)).addTo(this.drawHelper.features);
	        labels.push(label);

	        var verticalLinelabel = new GeoVis.Label(verticalLinePos, _extends({
	          text: distance + "\u7C73"
	        }, labelOptions)).addTo(this.drawHelper.features);
	        labels.push(verticalLinelabel);
	      }
	      this.tags.set(entity.id, labels);
	    }
	  }, {
	    key: "destroy",
	    value: function destroy(_ref3) {
	      var _this4 = this;

	      var entity = _ref3.entity;

	      var labels = this.tags.get(entity.id) || [];
	      labels.map(function (label) {
	        label.removeFrom(_this4.drawHelper.features);
	      });
	    }
	  }, {
	    key: "visible",
	    value: function visible(_ref4) {
	      var entity = _ref4.entity;

	      var labels = this.tags.get(entity.id) || [];
	      labels.map(function (label) {
	        label.show = entity.show;
	      });
	    }
	  }, {
	    key: "removeAll",
	    value: function removeAll() {
	      var _this5 = this;

	      this.tags.forEach(function (value, key) {
	        value.map(function (label) {
	          label.removeFrom(_this5.drawHelper.features);
	        });
	      });
	      this.tags.clear();
	    }
	  }]);

	  return MeasureTool;
	}();

	var _initialiseProps = function _initialiseProps() {
	  var _this6 = this;

	  this.distanceMeasure = function (_ref5) {
	    var entity = _ref5.entity;

	    var _self = _this6;
	    if (entity.type !== _Types2.default.PROJ_POLYLINE && entity.type !== _Types2.default.GROUND_POLYLINE && entity.type !== _Types2.default.SPACE_POLYLINE) {
	      return;
	    }
	    var positions = entity.positions;
	    var labels = _this6.tags.get(entity.id) || [];
	    try {
	      labels.map(function (label) {
	        return label.removeFrom(_this6.drawHelper.features);
	      });
	    } catch (e) {
	      console.log(e);
	    }

	    labels = [];
	    labels.push(new GeoVis.Label(positions[0], _extends({
	      text: "\u8D77\u70B9"
	    }, labelOptions)).addTo(_this6.drawHelper.features));
	    var spacedistance = 0;

	    var _loop = function _loop(i) {
	      if (entity.type === _Types2.default.GROUND_POLYLINE) {
	        var Spacelength = GeoVis.Cartesian3.distance(positions[i - 1], positions[i]);
	        var length = (Spacelength / 5).toFixed(0);
	        distance1 = 0;

	        var startLon = GeoVis.Cartographic.fromCartesian(positions[i - 1]).longitude;
	        var startLat = GeoVis.Cartographic.fromCartesian(positions[i - 1]).latitude;
	        var endLon = GeoVis.Cartographic.fromCartesian(positions[i]).longitude;
	        var endLat = GeoVis.Cartographic.fromCartesian(positions[i]).latitude;

	        terrainSamplePositions = [];


	        for (j = 0; j < length; ++j) {
	          lon = GeoVis.Math.lerp(endLon, startLon, j / (length - 1));
	          lat = GeoVis.Math.lerp(endLat, startLat, j / (length - 1));
	          position = new GeoVis.Cartographic(lon, lat);

	          terrainSamplePositions.push(position);
	        }
	        GeoVis.when(GeoVis.sampleTerrainMostDetailed(earth.scene.terrainProvider, terrainSamplePositions), function (samples) {
	          var heightpositions = GeoVis.Ellipsoid.WGS84.cartographicArrayToCartesianArray(samples);
	          var distance = 0;
	          for (var k = 0; k < samples.length - 1; k++) {
	            distance1 = GeoVis.Cartesian3.distance(heightpositions[k], heightpositions[k + 1]) + distance1;
	          }
	          distance += distance1;
	          var distance2 = distance.toFixed(2);
	          var label = new GeoVis.Label(positions[i], _extends({
	            text: i + 1 === positions.length ? "\u603B\u957F" + distance2 + "\u7C73" : distance2 + "\u7C73"
	          }, labelOptions)).addTo(_self.drawHelper.features);
	          labels.push(label);
	        });
	      } else if (entity.type === _Types2.default.PROJ_POLYLINE) {
	        var distance = (0, _compute.computeDistance)(positions.slice(0, i + 1));
	        distance = distance.toFixed(2);
	        var label = new GeoVis.Label(positions[i], _extends({
	          text: i + 1 === positions.length ? "\u603B\u957F" + distance + "\u7C73" : distance + "\u7C73"
	        }, labelOptions)).addTo(_this6.drawHelper.features);
	        labels.push(label);
	      } else {
	        spacedistance = GeoVis.Cartesian3.distance(positions[i - 1], positions[i]) + spacedistance;
	        var _distance = spacedistance.toFixed(2);
	        var _label2 = new GeoVis.Label(positions[i], _extends({
	          text: i + 1 === positions.length ? "\u603B\u957F" + _distance + "\u7C73" : _distance + "\u7C73"
	        }, labelOptions)).addTo(_this6.drawHelper.features);
	        labels.push(_label2);
	      }
	    };

	    for (var i = 1; i < positions.length; i++) {
	      var distance1;
	      var terrainSamplePositions;
	      var j;
	      var lon;
	      var lat;
	      var position;

	      _loop(i);
	    }
	    _this6.tags.set(entity.id, labels);
	  };
	};

	exports.default = MeasureTool;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _util = __webpack_require__(5);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function getPostions(custom, movePos) {
	  var points = [];
	  var customStart = [];
	  if (custom.length === 1) {
	    customStart.push(movePos);
	  } else {
	    custom.map(function (point) {
	      points.push(turf.point(point));
	    });
	    var features = turf.featureCollection(points);
	    var center = turf.center(features).geometry.coordinates;
	    var moveLonlat = (0, _util.cartesianToLonlatNoHeight)(movePos);
	    custom.map(function (cus) {
	      cus[0] = cus[0] - (center[0] - moveLonlat[0]);
	      cus[1] = cus[1] - (center[1] - moveLonlat[1]);
	      customStart.push(GeoVis.Cartesian3.fromDegrees(cus[0], cus[1], 0));
	    });
	  }
	  return customStart;
	}

	var PlotCopy = function PlotCopy(drawHelper, entity) {
	  var _this = this;

	  _classCallCheck(this, PlotCopy);

	  _initialiseProps.call(this);

	  this.drawHelper = drawHelper;
	  this.drawHelper.on("selected", function (e) {
	    _this.entity = e.entity;
	  });
	  this.plotDeltaPos();
	  document.body.addEventListener("keydown", function (e) {
	    if (e.ctrlKey && e.keyCode === 67) {
	      _this.plotCopyEntity(_this.entity);
	    }
	    if (e.ctrlKey && e.keyCode === 86) {
	      _this.plotDrawEntity();
	    }
	  });
	  this.copyEntity = undefined;
	  this.mousePos = undefined;
	}
	// 复制当前对象
	;

	var _initialiseProps = function _initialiseProps() {
	  var _this2 = this;

	  this.plotCopyEntity = function () {
	    if (_this2.entity) {
	      // results.push(this.drawHelper.serializeEntity(this.entity));
	      _this2.copyEntity = _this2.drawHelper.serializeEntity(_this2.entity);
	    }
	  };

	  this.plotDrawEntity = function () {
	    if (_this2.copyEntity && _this2.copyEntity.type) {
	      switch (_this2.copyEntity.type) {
	        case _Types2.default.SPACE_POLYGON:
	        case _Types2.default.CLASSIFY_POLYGON:
	        case _Types2.default.PROJ_POLYGON:
	        case _Types2.default.GROUND_POLYGON:
	        case _Types2.default.ARROWHEAD:
	        case _Types2.default.EXTENT:
	        case _Types2.default.TAILEDATTACK:
	        case _Types2.default.SPACE_POLYLINE:
	        case _Types2.default.PROJ_POLYLINE:
	        case _Types2.default.GROUND_POLYLINE:
	          _this2.changePoly(_this2.copyEntity);
	          break;
	        case _Types2.default.CIRCLE:
	          _this2.changeCircle(_this2.copyEntity);
	          break;
	        case _Types2.default.ICON:
	          _this2.changeIcon(_this2.copyEntity);
	          break;
	        case _Types2.default.TEXT_MARKER:
	        case _Types2.default.IMAGE_MARKER:
	          _this2.changeMarker(_this2.copyEntity);
	          break;
	      }
	      if (_this2.copyEntity.custom && _this2.copyEntity.type.length > 1 && _this2.copyEntity.type.search("GV") > -1) {
	        _this2.changePlot(_this2.copyEntity);
	      }
	    }
	  };

	  this.plotDeltaPos = function () {
	    earth.on("mouseMove", function (e) {
	      if (!e.lonlat) return;

	      var _e$lonlat = _slicedToArray(e.lonlat, 2),
	          lon = _e$lonlat[0],
	          lat = _e$lonlat[1];

	      var cartesian = GeoVis.Cartesian3.fromDegrees(lon, lat, 0);
	      if (cartesian) {
	        _this2.mousePos = cartesian;
	      }
	    });
	  };

	  this.changePoly = function (entity) {
	    var positions = [];
	    entity.positions.map(function (pos) {
	      positions.push(GeoVis.Cartesian3.unpack(pos));
	    });
	    var custom = [];
	    positions.map(function (pos) {
	      custom.push((0, _util.cartesianToLonlatNoHeight)(pos));
	    });
	    positions = getPostions(custom, _this2.mousePos);
	    var pos = [];
	    positions.map(function (pos1) {
	      pos.push(GeoVis.Cartesian3.pack(pos1, []));
	    });
	    entity.positions = pos;
	    entity.id = undefined;
	    _this2.drawHelper.unserializeEntity(entity, _this2.drawHelper, "3d");
	  };

	  this.changeCircle = function (entity) {
	    entity.center = _this2.mousePos;
	    entity.id = undefined;
	    _this2.drawHelper.unserializeEntity(entity, _this2.drawHelper, "3d");
	  };

	  this.changeIcon = function (entity) {
	    var positions = [];
	    positions.push(GeoVis.Cartesian3.unpack(entity.position));
	    var custom = [];
	    positions.map(function (pos) {
	      custom.push((0, _util.cartesianToLonlatNoHeight)(pos));
	    });
	    positions = getPostions(custom, _this2.mousePos);
	    entity.position = GeoVis.Cartesian3.pack(positions[0], []);
	    entity.color = entity.highLightColor;
	    entity.id = undefined;
	    _this2.drawHelper.unserializeEntity(entity, _this2.drawHelper, "3d");
	  };

	  this.changePlot = function (entity) {
	    var positions = [];
	    entity.custom.map(function (pos) {
	      positions.push(GeoVis.Cartesian3.unpack(pos));
	    });
	    var custom = [];
	    positions.map(function (pos) {
	      custom.push([pos.x, pos.y]);
	    });
	    positions = getPostions(custom, _this2.mousePos);
	    var pos = [];
	    positions.map(function (pos1) {
	      pos.push((0, _util.cartesianToLonlat)(pos1));
	    });
	    entity.custom = pos;
	    entity.outlineColor = entity.highLightColor;
	    entity.id = undefined;
	    _this2.drawHelper.unserializeEntity(entity, _this2.drawHelper, "3d");
	  };

	  this.changeMarker = function (entity) {
	    entity.position = _this2.mousePos;
	    entity.id = undefined;
	    _this2.drawHelper.unserializeEntity(entity, _this2.drawHelper, "3d");
	  };
	};

	exports.default = PlotCopy;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


	exports.default = startDrawingCircle;

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	var _Circle = __webpack_require__(37);

	var _Circle2 = _interopRequireDefault(_Circle);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ellipsoid = GeoVis.Ellipsoid.WGS84;
	/**
	 * 绘制圆
	 * @param {*} options
	 */
	function startDrawingCircle(options) {
	  options.type = options.type || _Types2.default.Circle;
	  options = (0, _util.copyOptions)(options, _config.defaultCircleOptions);
	  options.id = options.id || GeoVis.createGuid();
	  if (options.color) {
	    var material = GeoVis.Material.fromType(GeoVis.Material.RimLightingType);
	    material.uniforms.color = options.color;
	    options.material = material;
	  } else {
	    material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	    material.uniforms.color = GeoVis.Color.fromCssString("#009688").withAlpha(0.7);
	    options.material = material;
	  }
	  this.startDrawing(function cleanUp() {
	    if (circle != null) {
	      primitives.remove(circle);
	    }
	    points.remove();
	    tooltip.setVisible(false);
	    earth.off("leftDown", onLeftDown);
	    earth.off("mouseMove", onMouseMove);
	  });

	  var _self = this;
	  var scene = this._scene;
	  var earth = this._earth;
	  var primitives = this._primitives;
	  var tooltip = this._tooltip;
	  var circle = null;
	  var points = null;

	  earth.on("leftDown", onLeftDown);
	  earth.on("mouseMove", onMouseMove);
	  function onLeftDown(event) {
	    if (event.position != null) {
	      var cartesian = event.position;
	      if (cartesian) {
	        if (circle == null) {
	          // create the circle
	          circle = new _Circle2.default(_extends({}, options, {
	            center: cartesian,
	            radius: 0,
	            asynchronous: false,
	            material: options.material
	          }));
	          primitives.add(circle);
	          points = _self.points;
	          points.addPoints([cartesian]);
	        } else {
	          finishDrawing(circle.center, circle.radius);
	          if (typeof options.callback === "function") {
	            options.callback(circle);
	          }
	          _self.stopDrawing();
	          earth.off("leftDown", onLeftDown);
	          earth.off("mouseMove", onMouseMove);
	        }
	      }
	    }
	  }
	  function onMouseMove(event) {
	    var position = event.position;
	    var windowPos = {
	      x: event.windowPosition[0],
	      y: event.windowPosition[1]
	    };
	    if (position != null) {
	      if (circle == null) {
	        tooltip.showAt(windowPos, "<p>点击开始圈选</p>");
	      } else {
	        var cartesian = event.position;
	        if (cartesian) {
	          circle.radius = GeoVis.Cartesian3.distance(circle.center, cartesian);
	          points.updatePointsPositions(cartesian);
	          tooltip.showAt(windowPos, "<p>圈选半径：" + Math.floor(circle.radius * 100) / 100 + "米</p><p>再次点击结束</p>");
	          _self.fire("changed", {
	            entity: circle
	          });
	        }
	      }
	    }
	  }

	  function finishDrawing(center, radius) {
	    var circle = new _Circle2.default(_extends({}, options, {
	      center: center,
	      radius: radius,
	      drawHelper: _self
	    }));
	    if (typeof options.callback === "function") {
	      options.callback(circle);
	    }
	    circle.setEditable();
	    _self.primitives.add(circle);
	    _self.fire("created", {
	      entity: circle
	    });
	  }
	}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (options) {
	  options.type = options.type || _Types2.default.PROJ_POLYGON;
	  options = (0, _util.copyOptions)(options, _config.defaultSurfaceOptions);
	  this.startDrawingPolyshape(true, options);
	};

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (options) {
	  options.type = options.type || _Types2.default.PROJ_POLYLINE;
	  options = (0, _util.copyOptions)(options, _config.defaultPolylineOptions);
	  this.startDrawingPolyshape(false, options);
	};

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


	exports.default = function (isPolygon, options) {
	  options = (0, _util.copyOptions)(options, _config.defaultPolylineOptions);
	  options.id = options.id || GeoVis.createGuid();
	  if (options.color) {
	    var material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	    material.uniforms.color = options.color;
	    options.material = material;
	  } else {
	    material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	    material.uniforms.color = GeoVis.Color.fromCssString("#009688").withAlpha(0.7);
	    options.material = material;
	  }
	  if (options.type === _Types2.default.SPACE_POLYGON) {
	    options.arcType = GeoVis.ArcType.NONE;
	  }
	  if (options.type === _Types2.default.SPACE_POLYLINE) {
	    options.arcType = GeoVis.ArcType.NONE;
	  }

	  var _self = this;
	  var scene = this._scene;
	  var earth = this._earth;
	  var primitives = this._primitives;
	  var tooltip = this._tooltip;

	  var minPoints = isPolygon ? 3 : 2;
	  var maxPoints = options.maxPoints || Infinity;

	  this.startDrawing(function () {
	    earth.off("click", onLeftClick);
	    earth.off("mouseMove", onMouseMove);
	    earth.off("doubleClick", onDoubleClick);
	    primitives.remove(poly);
	    points.remove();
	    tooltip.setVisible(false);
	  });

	  var poly;
	  if (isPolygon) {
	    poly = new _Polygon2.default(_extends({}, options, { drawHelper: _self }));
	    poly.asynchronous = false;
	    primitives.add(poly);
	  } else {
	    poly = new _Polyline2.default(_extends({}, options, { drawHelper: _self }));
	    poly.asynchronous = false;
	    primitives.add(poly);
	  }
	  var positions = [];
	  var points = this.points;
	  points.onmouseenter = function () {
	    document.body.style.cursor = "move";
	  };
	  // _self._earth.globe.depthTestAgainstTerrain = true;
	  // Now wait for start

	  var lastTime = new Date().getTime();
	  earth.on("click", onLeftClick);
	  earth.on("mouseMove", onMouseMove);
	  earth.on("doubleClick", onDoubleClick);
	  function onLeftClick(event) {
	    if (event.position && event.position !== null) {
	      var currentTime = new Date().getTime();
	      var delta = currentTime - lastTime;
	      lastTime = currentTime;
	      var cartesian = getposition(scene, event);
	      if (cartesian && delta > 300) {
	        if (positions.length === 0) {
	          positions.push(cartesian.clone());
	          points.addPoint(positions[0]);
	        }
	        if (positions.length >= minPoints) {
	          poly.positions = positions;
	          poly._createPrimitive = true;
	        }
	        if (positions.length === maxPoints) {
	          finishDrawing(event);
	          return;
	        }
	        positions[positions.length - 1] = cartesian.clone();
	        positions.push(cartesian.clone());
	        points.addPoint(cartesian);
	      }
	    }
	  }
	  function onMouseMove(event) {
	    var position = event.position;
	    var windowPos = {
	      x: event.windowPosition[0],
	      y: event.windowPosition[1]
	    };
	    if (position && position !== null) {
	      if (positions.length === 0) {
	        tooltip.showAt(windowPos, "<p>点击创建第一个点</p>");
	      } else {
	        var cartesian = getposition(scene, event);
	        if (cartesian) {
	          positions.pop();
	          positions.push(cartesian);
	          if (positions.length >= minPoints) {
	            poly.positions = positions;
	            poly._createPrimitive = true;
	          }
	          // update marker
	          points.getPoint(positions.length - 1).position = cartesian;
	          // show tooltip
	          tooltip.showAt(windowPos, "<p>点击创建新的点</p>" + (positions.length > minPoints ? "<p>双击结束</p>" : ""));
	          if (positions.length >= minPoints) {
	            _self.fire("changed", {
	              entity: poly,
	              positions: poly.positions
	            });
	          }
	        }
	      }
	    }
	  }
	  function onDoubleClick(event) {
	    positions.pop();
	    finishDrawing(event);
	  }
	  function getposition(scene, event) {
	    var cartesian;
	    if (options.type === _Types2.default.SPACE_POLYLINE || options.type === _Types2.default.SPACE_POLYGON || options.type === _Types2.default.CLASSIFY_POLYGON) {
	      scene.globe.depthTestAgainstTerrain = true;
	      scene.pickTranslucentDepth = true;
	      cartesian = scene.pickPosition({
	        x: event.windowPosition[0],
	        y: event.windowPosition[1]
	      });
	      scene.pickTranslucentDepth = false;
	      scene.globe.depthTestAgainstTerrain = false;
	    } else {
	      cartesian = event.position;
	    }
	    return cartesian;
	  }

	  function finishDrawing(event) {
	    var position = event.position;
	    if (position && position !== null) {
	      if (positions.length < minPoints) {} else {
	        var cartesian = getposition(scene, event);
	        if (cartesian) {
	          if (isPolygon) {
	            var polygon = new _Polygon2.default(_extends({}, options, {
	              positions: poly.positions,
	              custom: poly.positions,
	              material: options.material,
	              type: options.type,
	              drawHelper: _self
	            }));
	            if (typeof options.callback === "function") {
	              options.callback(polygon);
	            }
	            _self.primitives.add(polygon);
	            if (typeof options.callback === "function") {
	              options.callback(polygon);
	            }
	            polygon.setEditable();
	            _self.fire("created", {
	              entity: polygon,
	              positions: poly.positions
	            });
	          } else {
	            var polyline = new _Polyline2.default(_extends({}, options, {
	              positions: poly.positions,
	              width: options.width,
	              material: options.material,
	              geodesic: true,
	              type: options.type,
	              drawHelper: _self
	            }));
	            if (typeof options.callback === "function") {
	              options.callback(polyline);
	            }
	            _self.primitives.add(polyline);
	            polyline.setEditable();
	            _self.fire("created", {
	              entity: polyline,
	              positions: poly.positions
	            });
	          }
	          _self.stopDrawing();
	          earth.off("click", onLeftClick);
	          earth.off("mouseMove", onMouseMove);
	          earth.off("doubleClick", onDoubleClick);
	        }
	      }
	    }
	  }
	};

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	var _Polygon = __webpack_require__(18);

	var _Polygon2 = _interopRequireDefault(_Polygon);

	var _Polyline = __webpack_require__(32);

	var _Polyline2 = _interopRequireDefault(_Polyline);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


	exports.default = startDrawingWall;

	var _util = __webpack_require__(5);

	var _Wall = __webpack_require__(26);

	var _Wall2 = _interopRequireDefault(_Wall);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ellipsoid = GeoVis.Ellipsoid.WGS84;

	function startDrawingWall(options) {
	  options.type = options.type || _Types2.default.WALL;
	  var _self = this;
	  var earth = this._earth;
	  var primitives = this._primitives;
	  var tooltip = this._tooltip;

	  options = (0, _util.copyOptions)(options, {});
	  if (options.color) {
	    var material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	    material.uniforms.color = options.color;
	    options.material = material;
	  }

	  var lastTime = new Date().getTime();
	  this.startDrawing(function () {
	    primitives.remove(poly);
	    points.remove(); // 移除被选元素
	    tooltip.setVisible(false); // Cesium工具提示是否显示
	    earth.off("click", onLeftClick);
	    earth.off("mouseMove", onMouseMove);
	    earth.off("doubleClick", onDoubleClick);
	  });

	  var poly;
	  poly = new _Wall2.default(options);
	  poly.asynchronous = false;
	  primitives.add(poly);

	  var positions = [];
	  var clickSum = 0;
	  var points = _self.points;
	  var maxPoints = 1000;
	  earth.on("click", onLeftClick);
	  earth.on("mouseMove", onMouseMove);
	  earth.on("doubleClick", onDoubleClick);
	  function onLeftClick(event) {
	    if (event.position != null) {
	      var currentTime = new Date().getTime();
	      var cartesian = event.position;
	      var delta = currentTime - lastTime;
	      lastTime = currentTime;
	      if (delta < 300) {
	        return;
	      }
	      var cartesian = event.position;
	      if (cartesian && delta > 300) {
	        clickSum++;
	        if (positions.length === 0) {
	          positions.push(cartesian.clone());
	          points.addPoint(cartesian);
	        }
	        if (positions.length < maxPoints && positions.length === clickSum) {
	          positions.pop();
	          positions.push(cartesian.clone());
	          points.addPoint(cartesian);
	        }
	      }
	    }
	  }
	  function onMouseMove(event) {
	    var position = event.position;
	    var windowPos = {
	      x: event.windowPosition[0],
	      y: event.windowPosition[1]
	    };
	    var currentTime = new Date().getTime();
	    var delta = currentTime - lastTime;
	    if (delta < 150) {
	      return;
	    }
	    if (position && position !== null) {
	      if (positions.length === 0) {
	        tooltip.showAt(windowPos, "<p>点击创建第一个点</p>");
	      } else {
	        var cartesian = event.position;
	        if (cartesian) {
	          if (positions.length < clickSum + 1 && positions.length < maxPoints) {
	            positions.push(cartesian);
	          } else {
	            positions.pop();
	            positions.push(cartesian);
	          }
	          if (positions.length >= 2) {
	            poly.positions = positions;
	            poly._createPrimitive = true;
	            tooltip.showAt(windowPos, "<p>点击创建新的点</p>" + (positions.length > 2 ? "<p>双击结束</p>" : ""));
	          }
	        }
	      }
	    }
	  }
	  function onDoubleClick(event) {
	    var position = event.position;
	    if (position && position !== null) {
	      if (positions.length < 2) {} else {
	        var cartesian = event.position;
	        if (cartesian) {
	          var wall = new _Wall2.default(_extends({}, options, {
	            positions: poly.positions,
	            maximumHeights: options.maximumHeights,
	            minimumHeights: options.minimumHeights,
	            material: options.material,
	            type: options.type,
	            drawHelper: _self
	          }));
	          if (typeof options.callback === "function") {
	            options.callback(wall);
	          }
	          _self.primitives.add(wall);
	          wall.setEditable();
	          _self.fire("created", {
	            entity: wall,
	            positions: poly.positions,
	            height: wall.height
	          });
	          _self.stopDrawing();
	          earth.off("click", onLeftClick);
	          earth.off("mouseMove", onMouseMove);
	          earth.off("doubleClick", onDoubleClick);
	        }
	      }
	    }
	  }
	}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check

	/**
	 * 绘制线标
	 * @param {*} options
	 */


	exports.default = function (options) {
	  options = options || {};
	  var _self = this;
	  var earth = _self._earth;
	  var primitives = this._primitives;
	  var tooltip = this._tooltip;
	  this.startDrawing(function () {
	    points.remove();
	    tooltip.setVisible(false);
	    earth.off("click", onLeftClick);
	    earth.off("mouseMove", onMouseMove);
	    earth.off("doubleClick", onDoubleClick);
	  });

	  var poly;
	  options.arcType = GeoVis.ArcType.NONE;
	  options.type = _Types2.default.ANGLE;
	  poly = new _Polyline2.default(_extends({}, options, { drawHelper: _self }));
	  poly.asynchronous = false;
	  primitives.add(poly);

	  var lastTime = new Date().getTime();
	  var positions = [];
	  var points = _self.points;

	  earth.on("click", onLeftClick);
	  earth.on("mouseMove", onMouseMove);
	  earth.on("doubleClick", onDoubleClick);

	  function onLeftClick(event) {
	    if (event.position != null) {
	      var currentTime = new Date().getTime();
	      var delta = currentTime - lastTime;
	      lastTime = currentTime;
	      if (delta < 300) {
	        return;
	      }
	      var cartesian = event.position;
	      if (cartesian && delta > 300) {
	        if (positions.length === 0) {
	          positions.push(cartesian);
	          points.addPoint(cartesian);
	        }
	      }
	    }
	  }

	  function onMouseMove(event) {
	    var position = event.position;
	    var windowPos = {
	      x: event.windowPosition[0],
	      y: event.windowPosition[1]
	    };
	    var currentTime = new Date().getTime();
	    var delta = currentTime - lastTime;
	    if (delta < 150) {
	      return;
	    }
	    if (position !== null) {
	      var cartesian = event.position;
	      if (positions.length === 1 && cartesian) {
	        positions.push(cartesian);
	        var custom = getAnglePos(positions[0], positions[1]);
	        poly.positions = custom;
	        poly._createPrimitive = true;
	      } else if (positions.length === 2 && cartesian) {
	        positions.pop();
	        positions.push(cartesian);
	        custom = getAnglePos(positions[0], positions[1]);
	        poly.positions = custom;
	        poly._createPrimitive = true;
	      }

	      if (positions.length === 0) {
	        tooltip.showAt(windowPos, "<p>点击设置起点</p>");
	      } else {
	        tooltip.showAt(windowPos, "<p>双击设置终点并结束</p>");
	      }
	    }
	  }

	  function onDoubleClick(event) {
	    var position = event.position;
	    if (position && position !== null) {
	      var cartesian = event.position;
	      if (cartesian) {
	        points.addPoint(cartesian);
	        positions.pop();
	        positions.push(cartesian);
	        var custom = getAnglePos(positions[0], positions[1]);
	        poly.positions = custom;
	        poly._createPrimitive = true;
	        if (typeof options.callback === "function") {
	          options.callback(poly);
	        }
	        _self.fire("created", {
	          entity: poly
	        });
	        _self.stopDrawing();
	        earth.off("click", onLeftClick);
	        earth.off("mouseMove", onMouseMove);
	        earth.off("doubleClick", onDoubleClick);
	      }
	    }
	  }
	};

	var _Polyline = __webpack_require__(32);

	var _Polyline2 = _interopRequireDefault(_Polyline);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getAnglePos(startPos, endPos) {
	  var coord1 = GeoVis.Cartographic.fromCartesian(startPos);
	  var coord2 = GeoVis.Cartographic.fromCartesian(endPos);
	  var pickheight = coord1.height - coord2.height;
	  if (pickheight < 0) {
	    var cartographic = new GeoVis.Cartographic(coord1.longitude, coord1.latitude, coord1.height - pickheight);
	  } else {
	    cartographic = new GeoVis.Cartographic(coord2.longitude, coord2.latitude, coord2.height + pickheight);
	  }
	  var newPos = GeoVis.Cartographic.toCartesian(cartographic);
	  var custom = [startPos, endPos, newPos, startPos];
	  return custom;
	}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


	exports.default = startDrawingCutFill;

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	var _pickPosition = __webpack_require__(41);

	var _pickPosition2 = _interopRequireDefault(_pickPosition);

	var _Polygon = __webpack_require__(18);

	var _Polygon2 = _interopRequireDefault(_Polygon);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 绘制填挖方
	 * @param {*} options
	 */
	function startDrawingCutFill(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultSurfaceOptions);
	  options.id = options.id || GeoVis.createGuid();
	  options.pickTileset = options.pickTileset || false;
	  if (options.color) {
	    var material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	    material.uniforms.color = options.color;
	    options.material = material;
	  }
	  var _self = this;
	  var earth = this._earth;
	  var primitives = this._primitives;
	  var tooltip = this._tooltip;

	  this.startDrawing(function () {
	    primitives.remove(poly);
	    points.remove();
	    tooltip.setVisible(false);

	    earth.off("click", onLeftClick);
	    earth.off("mouseMove", onMouseMove);
	    earth.off("doubleClick", onDoubleClick);
	  });

	  earth.on("click", onLeftClick);
	  earth.on("mouseMove", onMouseMove);
	  earth.on("doubleClick", onDoubleClick);

	  var minPoints = 3;
	  var maxPoints = options.maxPoints || Infinity;
	  var poly;
	  options.type = _Types2.default.SPACE_POLYGON;
	  poly = new _Polygon2.default(options);

	  primitives.add(poly);

	  var positions = [];
	  var points = this.points;
	  // Now wait for start
	  function onLeftClick(event) {
	    var position = event.position;
	    if (position !== null) {
	      if (positions.length === 0) {
	        positions.push(position.clone());
	        points.addPoint(positions[0]);
	      }
	      if (positions.length >= minPoints) {
	        poly.positions = positions;
	        poly._createPrimitive = true;
	      }
	      if (positions.length === maxPoints) {
	        finishDrawing(position);
	        return;
	      }
	      positions.push(position);
	      points.addPoint(position);
	    }
	  }

	  function onMouseMove(event) {
	    var position = event.position;
	    var windowPos = {
	      x: event.windowPosition[0],
	      y: event.windowPosition[1]
	    };
	    if (position && position !== null) {
	      if (positions.length === 0) {
	        tooltip.showAt(windowPos, "<p>点击创建第一个点</p>");
	      } else {
	        positions.pop();
	        positions.push(position);
	        if (positions.length >= minPoints) {
	          poly.positions = positions;
	          poly._createPrimitive = true;
	        }
	        points.getPoint(positions.length - 1).position = position;
	        tooltip.showAt(windowPos, "<p>点击创建新的点</p>" + (positions.length > minPoints ? "<p>双击结束</p>" : ""));
	        _self.fire("changed", {
	          entity: poly,
	          positions: poly.positions
	        });
	      }
	    }
	  }

	  function onDoubleClick(event) {
	    var position = event.position;
	    positions.pop();
	    finishDrawing(position);
	  }

	  function finishDrawing(position) {
	    if (position && position !== null) {
	      if (positions.length < minPoints) {} else {
	        _self.stopDrawing();
	        var cutPositions = [];
	        var minheight = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(poly.positions[0]).height;
	        var maxheight = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(poly.positions[0]).height;
	        for (var j = 1; j < poly.positions.length; j++) {
	          var coord = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(poly.positions[j]);
	          minheight < coord.height ? 1 : minheight = coord.height;
	        }
	        for (var k = 1; k < poly.positions.length; k++) {
	          coord = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(poly.positions[k]);
	          maxheight > coord.height ? 1 : maxheight = coord.height;
	        }
	        var height = (minheight + maxheight) / 2;
	        for (var k = 0; k < poly.positions.length; k++) {
	          var coord = GeoVis.Ellipsoid.WGS84.cartesianToCartographic(poly.positions[k]);
	          var cartographic = new GeoVis.Cartographic(coord.longitude, coord.latitude, height);
	          cutPositions.push(GeoVis.Ellipsoid.WGS84.cartographicToCartesian(cartographic));
	        }
	        var polygon = new _Polygon2.default(_extends({}, options, {
	          positions: cutPositions,
	          custom: poly.custom,
	          material: options.material,
	          extrudedHeight: poly.extrudedHeight
	        }));
	        if (typeof options.callback === "function") {
	          options.callback(polygon);
	        }
	        _self.fire("created", {
	          entity: polygon
	        });
	        earth.off("click", onLeftClick);
	        earth.off("mouseMove", onMouseMove);
	        earth.off("doubleClick", onDoubleClick);
	      }
	    }
	  }
	}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = startDrawingVisibility;

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	var _PointGroup = __webpack_require__(58);

	var _PointGroup2 = _interopRequireDefault(_PointGroup);

	var _Angle = __webpack_require__(80);

	var _Angle2 = _interopRequireDefault(_Angle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function startDrawingVisibility(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultPolylineOptions);
	  options.id = options.id || GeoVis.createGuid();
	  this.startDrawing(function () {
	    points.remove();
	    mouseHandler.destroy();
	    tooltip.setVisible(false);
	  });

	  var _self = this;
	  var scene = this._scene;
	  var primitives = this._primitives;
	  var tooltip = this._tooltip;

	  var minPoints = 2;
	  var maxPoints = 2;
	  var result;
	  var poly;
	  poly = new _Angle2.default(options);

	  poly.asynchronous = false;

	  primitives.add(poly);

	  var positions = [];
	  var points = this.points;
	  var mouseHandler = new GeoVis.ScreenSpaceEventHandler(scene.canvas.parentNode);
	  // Now wait for start
	  var lastTime = new Date().getTime();
	  mouseHandler.setInputAction(function (movement) {
	    if (movement.position !== null) {
	      var currentTime = new Date().getTime();
	      var delta = currentTime - lastTime;
	      lastTime = currentTime;
	      var cartesian = scene.pickPosition(movement.position);
	      if (cartesian && delta > 300) {
	        if (positions.length === 0) {
	          positions.push(cartesian.clone());
	          points.addPoint(positions[0]);
	        }
	        if (positions.length >= minPoints) {
	          poly.positions = positions;
	          poly._createPrimitive = true;
	        }
	        if (positions.length === maxPoints) {
	          var direction = GeoVis.Cartesian3.normalize(GeoVis.Cartesian3.subtract(positions[1], positions[0], new GeoVis.Cartesian3()), new GeoVis.Cartesian3());
	          var ray = new GeoVis.Ray(positions[0], direction);
	          // result = scene.drillPickFromRay(ray, 10);
	          _self.stopDrawing();
	          GeoVis.when(scene.drillPickFromRayMostDetailed(ray, 10, [poly]), function (samples) {
	            primitives.remove(poly);
	            result = samples;
	            finishDrawing();
	          });
	          return;
	        }
	        positions.push(cartesian);

	        points.addPoint(cartesian);
	      }
	    }
	  }, GeoVis.ScreenSpaceEventType.LEFT_CLICK);

	  mouseHandler.setInputAction(function (movement) {
	    var position = movement.endPosition;
	    if (position && position !== null) {
	      if (positions.length === 0) {
	        tooltip.showAt(position, "<p>点击创建第一个点</p>");
	      } else {
	        var cartesian = scene.pickPosition(position);
	        if (cartesian) {
	          positions.pop();
	          // make sure it is slightly different
	          positions.push(cartesian);
	          if (positions.length >= minPoints) {
	            poly.positions = positions;
	            poly._createPrimitive = true;
	          }
	          // update marker
	          points.getPoint(positions.length - 1).position = cartesian;
	          // show tooltip
	          tooltip.showAt(position, "<p>点击创建新的点</p>" + (positions.length > minPoints ? "<p>双击结束</p>" : ""));
	          _self.fire("changed", {
	            entity: poly,
	            positions: poly.positions
	          });
	        }
	      }
	    }
	  }, GeoVis.ScreenSpaceEventType.MOUSE_MOVE);

	  function finishDrawing() {
	    if (result[0].position) {
	      var position1 = [poly.positions[0], result[0].position];
	      var position2 = [result[0].position, poly.positions[1]];
	      var point1 = new _PointGroup2.default(_self, _config.defaultPoint);
	      point1.addPoint(result[0].position);
	      var polyline1 = new _Angle2.default(_extends({}, options, {
	        positions: position1,
	        width: options.width,
	        color: GeoVis.Color.GREEN,
	        geodesic: true,
	        type: options.type
	      }));
	      var polyline2 = new _Angle2.default(_extends({}, options, {
	        positions: position2,
	        width: options.width,
	        color: GeoVis.Color.RED,
	        geodesic: true,
	        type: options.type
	      }));
	      if (typeof options.callback === "function") {
	        options.callback(polyline1, polyline2);
	      }
	      _self.primitives.add(polyline1);
	      _self.primitives.add(polyline2);
	    } else {
	      polyline1 = new _Angle2.default(_extends({}, options, {
	        positions: poly.positions,
	        width: options.width,
	        color: GeoVis.Color.RED,
	        geodesic: true,
	        type: options.type
	      }));
	      if (typeof options.callback === "function") {
	        options.callback(polyline1);
	      }
	      _self.primitives.add(polyline1);
	    }

	    _self.fire("created", {
	      entity: polyline1
	    });
	  }
	}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ChangeablePrimitive2 = __webpack_require__(19);

	var _ChangeablePrimitive3 = _interopRequireDefault(_ChangeablePrimitive2);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function createAnglePrimitive(customs) {}
	function getCustom(positions) {
	  var ellipsoid = GeoVis.Ellipsoid.WGS84;
	  var coord0 = GeoVis.Cartographic.fromCartesian(positions[0]);
	  var coord1 = GeoVis.Cartographic.fromCartesian(positions[0]);
	  var pickheight = coord0.height - coord1.height;
	  if (pickheight < 0) {
	    var cartographic = new GeoVis.Cartographic(coord0.longitude, coord0.latitude, coord0.height - pickheight);
	  } else {
	    cartographic = new GeoVis.Cartographic(coord1.longitude, coord1.latitude, coord1.height + pickheight);
	  }
	  var customs = [positions[0], positions[1], ellipsoid.cartographicToCartesian(cartographic)];
	  return customs;
	}

	var Angle = function (_ChangeablePrimitive) {
	  _inherits(Angle, _ChangeablePrimitive);

	  function Angle(options) {
	    _classCallCheck(this, Angle);

	    options = (0, _util.copyOptions)(options, _config.defaultPolylineOptions);

	    var _this = _possibleConstructorReturn(this, (Angle.__proto__ || Object.getPrototypeOf(Angle)).call(this, options));

	    _this.getGeometry = function () {
	      if (!GeoVis.defined(_this.positions) || _this.positions.length < 2) {
	        return;
	      }
	      return new GeoVis.PolylineGeometry({
	        positions: _this.positions,
	        height: _this.height,
	        width: _this.width < 1 ? 1 : _this.width,
	        vertexFormat: GeoVis.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
	        ellipsoid: _this.ellipsoid
	      });
	    };

	    _this.material = GeoVis.Material.fromType(GeoVis.Material.ColorType);
	    _this.material.uniforms.color = options.color || GeoVis.Color.RED;
	    _this.appearance = new GeoVis.PolylineMaterialAppearance({
	      material: _this.material,
	      aboveGround: false
	    });
	    _this.type = options.type || _Types2.default.ANGLE;
	    _this.onterrain = options.onterrain || false;
	    _this.computed = options.computed || false;
	    return _this;
	  }
	  /**
	   * 获取三角的位置
	   * @type {Vector3}
	   * @name positions
	   * @memberof Angle
	   */


	  _createClass(Angle, [{
	    key: "positions",
	    get: function get() {
	      return this._positions;
	    },
	    set: function set(positions) {
	      this._positions = positions;
	      this._createPrimitive = true;
	    }
	    /**
	     * 获取三角的线宽度
	     * @type {Number}
	     * @name width
	     * @memberof Angle
	     */

	  }, {
	    key: "width",
	    get: function get() {
	      return this._width;
	    },
	    set: function set(width) {
	      this._width = width;
	      this._createPrimitive = true;
	    }
	    /**
	     * 通过参数获取初始RectangleGeometry
	     * @return {GeoVis.PolylineGeometry}
	     */

	  }]);

	  return Angle;
	}(_ChangeablePrimitive3.default);

	exports.default = Angle;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


	exports.default = startDrawingCircle;

	var _TextMarker = __webpack_require__(43);

	var _TextMarker2 = _interopRequireDefault(_TextMarker);

	var _ImageMarker = __webpack_require__(48);

	var _ImageMarker2 = _interopRequireDefault(_ImageMarker);

	var _Marker = __webpack_require__(49);

	var _Marker2 = _interopRequireDefault(_Marker);

	var _util = __webpack_require__(5);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	var _pickPosition = __webpack_require__(41);

	var _pickPosition2 = _interopRequireDefault(_pickPosition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 绘制文字、图片标记
	 * @param {*} options
	 */
	function startDrawingCircle(options) {
	  options.type = options.type || _Types2.default.LABEL_MARKER;
	  options = (0, _util.copyOptions)(options, {});
	  options.id = options.id || GeoVis.createGuid();
	  this.startDrawing(function cleanUp() {
	    tooltip.setVisible(false);
	    earth.off("click", onLeftClick);
	    earth.off("mouseMove", onMouseMove);
	  });

	  var _self = this;
	  var scene = this._scene;
	  var earth = this._earth;
	  var tooltip = this._tooltip;
	  var marker = void 0;
	  earth.on("click", onLeftClick);
	  earth.on("mouseMove", onMouseMove);

	  function onLeftClick(event) {
	    if (event.position != null) {
	      var cartesian = (0, _pickPosition2.default)(scene, event, options.pickTileset);
	      if (cartesian) {
	        switch (options.type) {
	          case _Types2.default.TEXT_MARKER:
	            marker = new _TextMarker2.default(cartesian, _extends({}, options, {
	              drawHelper: _self
	            })).addTo(_self.features);
	            break;
	          case _Types2.default.IMAGE_MARKER:
	            marker = new _ImageMarker2.default(cartesian, _extends({}, options, {
	              drawHelper: _self
	            })).addTo(_self.features);
	            break;
	          case _Types2.default.LABEL_MARKER:
	          case _Types2.default.FLAG_MARKER:
	            marker = new _Marker2.default(cartesian, _extends({}, options, {
	              drawHelper: _self
	            })).addTo(_self.features);
	            break;
	        }
	        if (typeof options.callback === "function") {
	          options.callback(marker);
	        }
	        _self.fire("created", {
	          entity: marker
	        });

	        if (marker.setEditable) {
	          marker.setEditable();
	        }
	        if (typeof options.callback === "function") {
	          options.callback(marker);
	        }
	        _self.stopDrawing();
	        earth.off("click", onLeftClick);
	        earth.off("mouseMove", onMouseMove);
	      }
	    }
	  }
	  function onMouseMove(event) {
	    var position = event.position;
	    var windowPos = {
	      x: event.windowPosition[0],
	      y: event.windowPosition[1]
	    };
	    if (position != null) {
	      tooltip.showAt(windowPos, "<p>点击放置标记</p>");
	    }
	  }
	}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


	exports.default = startDrawingRectangle;

	var _util = __webpack_require__(5);

	var _config = __webpack_require__(6);

	var _Rectangle = __webpack_require__(40);

	var _Rectangle2 = _interopRequireDefault(_Rectangle);

	var _Types = __webpack_require__(16);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ellipsoid = GeoVis.Ellipsoid.WGS84;

	function startDrawingRectangle(options) {
	  options.type = options.type || _Types2.default.RECTANGLE;
	  options = (0, _util.copyOptions)(options, _config.defaultRectangleOptions);
	  if (options.image) {
	    var mat = new GeoVis.Material({
	      fabric: {
	        type: "Image",
	        uniforms: {
	          image: options.image
	        }
	      }
	    });
	    options.material = mat;
	  }

	  var proj = new GeoVis.WebMercatorProjection();

	  this.startDrawing(function () {
	    primitives.remove(poly);
	    points.remove(); // 移除被选元素
	    proj = undefined;
	    tooltip.setVisible(false); // Cesium工具提示是否显示
	    earth.off("click", onLeftClick);
	    earth.off("mouseMove", onMouseMove);
	    earth.off("doubleClick", onDoubleClick);
	  });

	  var _self = this;
	  var scene = this._scene;
	  var earth = this._earth;
	  var primitives = this._primitives;
	  var tooltip = this._tooltip;

	  var points = this.points;
	  var poly;
	  poly = new _Rectangle2.default(options);
	  poly.asynchronous = false;
	  primitives.add(poly);
	  var positions = [];
	  var pictureXY = [];
	  earth.on("click", onLeftClick);
	  earth.on("mouseMove", onMouseMove);
	  earth.on("doubleClick", onDoubleClick);

	  function onLeftClick(event) {
	    if (event.position != null) {
	      var cartesian = event.position;
	      if (cartesian) {
	        if (positions.length === 0) {
	          positions.push(cartesian.clone());
	          points.addPoint(positions[0]);
	        }
	        if (positions.length === 2) {
	          poly.positions = positions;
	          poly._createPrimitive = true;
	        }
	        if (positions.length === 2) {
	          if (positions.length <= 2) {}
	          return;
	        }
	        // add new point to polygon
	        // this one will move with the mouse
	        positions.push(cartesian);
	        points.addPoint(cartesian);
	      }
	    }
	  }
	  function onMouseMove(event) {
	    var position = event.position;
	    var windowPos = {
	      x: event.windowPosition[0],
	      y: event.windowPosition[1]
	    };
	    if (position && position !== null) {
	      if (positions.length === 0) {
	        tooltip.showAt(windowPos, "<p>点击创建第一个点</p>");
	      } else {
	        var cartesian = event.position;
	        if (cartesian) {
	          positions.pop();
	          // make sure it is slightly different
	          cartesian.y += 1 + Math.random();
	          if (pictureXY.length > 0) {
	            cartesian = GetDeltaPoint(pictureXY, positions[0], cartesian);
	          }
	          positions.push(cartesian);
	          if (positions.length >= 2) {
	            poly.positions = positions;
	            poly._createPrimitive = true;

	            if (poly.material && poly.material._textures && poly.material._textures.image) {
	              pictureXY = [];
	              pictureXY.push(poly.material._textures.image._dimensions.x);
	              pictureXY.push(poly.material._textures.image._dimensions.y);
	            }
	          }
	          // update marker
	          points.getPoint(positions.length - 1).position = cartesian;
	          // show tooltip
	          tooltip.showAt(windowPos, "<p>点击创建新的点</p>" + (positions.length > 2 ? "<p>双击结束</p>" : ""));
	        }
	      }
	    }
	  }

	  function onDoubleClick(event) {
	    finishDrawing(event);
	  }

	  function finishDrawing(event) {
	    var position = event.position;
	    if (position && position !== null) {
	      if (positions.length < 2) {} else {
	        var cartesian = event.position;
	        if (cartesian) {
	          var rectangle = new _Rectangle2.default(_extends({}, options, {
	            positions: poly.positions,
	            material: options.material,
	            type: options.type,
	            drawHelper: _self
	          }));
	          if (typeof options.callback === "function") {
	            options.callback(rectangle);
	          }
	          _self.primitives.add(rectangle);
	          rectangle.setEditable();
	          _self.fire("created", {
	            entity: rectangle,
	            positions: poly.positions
	          });
	          _self.stopDrawing();
	          earth.off("click", onLeftClick);
	          earth.off("mouseMove", onMouseMove);
	          earth.off("doubleClick", onDoubleClick);
	        }
	      }
	    }
	  }
	  function GetDeltaPoint(pictureXY, point1, point2) {
	    var carto0 = GeoVis.Cartographic.fromCartesian(point1);
	    var proj0 = proj.project(carto0);
	    var carto1 = GeoVis.Cartographic.fromCartesian(point2);
	    var proj1 = proj.project(carto1);
	    if (carto1.latitude < carto0.latitude) {
	      var latY = proj0.y - pictureXY[1] * Math.abs(proj1.x - proj0.x) / pictureXY[0];
	    } else {
	      var latY = proj0.y + pictureXY[1] * Math.abs(proj1.x - proj0.x) / pictureXY[0];
	    }
	    var pointCart = proj.unproject(new GeoVis.Cartesian3(proj1.x, latY, proj1.z));
	    var cartesian1 = GeoVis.Cartesian3.fromRadians(pointCart.longitude, pointCart.latitude, 0);
	    if (carto1.longitude < carto0.longitude) {
	      var lonX = proj0.x - pictureXY[0] * Math.abs(proj1.y - proj0.y) / pictureXY[1];
	    } else {
	      var lonX = proj0.x + pictureXY[0] * Math.abs(proj1.y - proj0.y) / pictureXY[1];
	    }
	    var pointCart = proj.unproject(new GeoVis.Cartesian3(lonX, proj1.y, proj1.z));
	    var cartesian2 = GeoVis.Cartesian3.fromRadians(pointCart.longitude, pointCart.latitude, 0);
	    if (GeoVis.Cartesian3.distance(cartesian1, point1) >= GeoVis.Cartesian3.distance(cartesian2, point1)) {
	      return cartesian1;
	    } else {
	      return cartesian2;
	    }
	  }
	}

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = startDrawingDragMarker;

	var _util = __webpack_require__(5);

	var _DragMarker = __webpack_require__(84);

	var _DragMarker2 = _interopRequireDefault(_DragMarker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// @ts-check
	var dom = document.createElement("div");
	dom.style.width = "200px";
	dom.style.height = "200px";
	dom.style.backgroundColor = "RED";
	dom.className = "gep-resizer";

	function startDrawingDragMarker(options) {
	  options = (0, _util.copyOptions)(options, {});
	  options.id = options.id || GeoVis.createGuid();

	  var _self = this;
	  var earth = this._earth;
	  earth.on("click", onLeftClick);

	  function onLeftClick(event) {
	    if (event.position != null) {
	      // var cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
	      var cartesian = event.position;
	      if (cartesian) {
	        var icon = new _DragMarker2.default(cartesian, {
	          dom: dom
	        }).addTo(_self.features);
	      }
	    }
	  }
	}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _interactjs = __webpack_require__(47);

	var _interactjs2 = _interopRequireDefault(_interactjs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// @ts-check

	var DragMarker = function (_GeoVis$DomMarker) {
	  _inherits(DragMarker, _GeoVis$DomMarker);

	  /**
	   * 用于创建可拖动的Marker
	   * @param {LonlatTuple||Cartesian} pos
	   * @param {*} options id,weight
	   */
	  function DragMarker(pos, options) {
	    _classCallCheck(this, DragMarker);

	    var _this = _possibleConstructorReturn(this, (DragMarker.__proto__ || Object.getPrototypeOf(DragMarker)).call(this, pos, options));

	    if (options.id) _this._id = options.id || GeoVis.createGuid();
	    return _this;
	  }

	  _createClass(DragMarker, [{
	    key: "setXY",
	    value: function setXY(x, y) {
	      var ondrag = this.element.getAttribute("ondrag");
	      if (ondrag !== "1") {
	        this.element.style.left = x + "px";
	        this.element.style.top = y + "px";
	        if (this.visible) this.enabled = true;
	      } else {
	        var _x = this.element.getAttribute("data-x");
	        var _y = this.element.getAttribute("data-y");
	        var targetX = parseFloat(this.element.style.left.split("px")[0]) + parseFloat(_x);
	        var targetY = parseFloat(this.element.style.top.split("px")[0]) + parseFloat(_y);
	        this.updatePosition(targetX, targetY);
	        this.element.setAttribute("data-x", "0");
	        this.element.setAttribute("data-y", "0");
	        this.element.style.left = targetX + "px";
	        this.element.style.top = targetY + "px";
	        this.element.style.webkitTransform = this.element.style.transform = "translate(" + 0 + "px, " + 0 + "px)";
	        this.element.setAttribute("ondrag", "0");
	      }
	    }
	  }, {
	    key: "updatePosition",
	    value: function updatePosition(x, y) {
	      var scene = this._features._earth.scene;
	      var ray = scene.camera.getPickRay(new GeoVis.Cartesian2(x, y));
	      var cartesian = scene.globe.pick(ray, scene);
	      if (cartesian) this.position = cartesian;
	    }
	  }]);

	  return DragMarker;
	}(GeoVis.DomMarker);

	function init() {
	  (0, _interactjs2.default)(".geo-resizer").draggable({
	    // call this function on every dragmove event
	    onmove: dragMoveListener,
	    // call this function on every dragend event
	    onend: function onend(event) {
	      // event.preventDefault();
	      event.target.setAttribute("ondrag", "1");
	    }
	  });

	  function dragMoveListener(event) {
	    var target = event.target;
	    // keep the dragged position in the data-x/data-y attributes
	    var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
	    var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
	    // translate the element
	    target.style.webkitTransform = target.style.transform = "translate(" + x + "px, " + y + "px)";
	    // update the posiion attributes
	    target.setAttribute("data-x", x);
	    target.setAttribute("data-y", y);
	  }
	  window.dragMoveListener = dragMoveListener;
	}

	init();
	exports.default = DragMarker;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = startDropingIcon;

	var _util = __webpack_require__(5);

	var _Icon = __webpack_require__(50);

	var _Icon2 = _interopRequireDefault(_Icon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function startDropingIcon(options) {
	  options = (0, _util.copyOptions)(options, {});
	  options.id = options.id || GeoVis.createGuid();
	  options.contineDraw = options.contineDraw || false;
	  options.position = options.position || [];

	  this.startDrawing(function cleanUp() {
	    tooltip.setVisible(false);
	  });
	  var icon = void 0;
	  var _self = this;
	  var tooltip = this._tooltip;
	  dropIcon(options.position);
	  function dropIcon(position) {
	    if (position) {

	      icon = new _Icon2.default(position, _extends({}, options, {
	        drawHelper: _self
	      })).addTo(_self.features);
	      _self.fire("created", {
	        entity: icon
	      });
	      console.log(icon);
	      if (!options.contineDraw) {
	        _self.stopDrawing();
	      }
	      icon.setEditable();
	    }
	  }
	}

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


	exports.default = startDrawingGroundText;

	var _GroundText = __webpack_require__(54);

	var _GroundText2 = _interopRequireDefault(_GroundText);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 绘制线标
	 * @param {*} options
	 */
	function startDrawingGroundText(options) {
	  options = options || {};
	  var _self = this;
	  var poly;

	  var lastTime = new Date().getTime();
	  this.startDrawing(function () {
	    points.remove();
	    tooltip.setVisible(false);
	    earth.off("click", onLeftClick);
	    earth.off("mouseMove", onMouseMove);
	    earth.off("doubleClick", onDoubleClick);
	  });
	  var earth = this._earth;
	  var tooltip = this._tooltip;
	  var positions = [];
	  var points = _self.points;
	  earth.on("click", onLeftClick);
	  earth.on("mouseMove", onMouseMove);
	  earth.on("doubleClick", onDoubleClick);

	  function onLeftClick(event) {
	    if (event.position && event.position !== null) {
	      var currentTime = new Date().getTime();
	      var delta = currentTime - lastTime;
	      lastTime = currentTime;
	      if (delta < 300) {
	        return;
	      }
	      var startPoint = event.lonlat;
	      if (startPoint && delta > 300) {
	        if (positions.length === 0) {
	          options.startPoint = startPoint;
	          positions.push(event.position);
	          points.addPoint(event.position);
	        }
	      }
	    }
	  }
	  function onMouseMove(event) {
	    var position = event.position;
	    var windowPos = {
	      x: event.windowPosition[0],
	      y: event.windowPosition[1]
	    };
	    var currentTime = new Date().getTime();
	    var delta = currentTime - lastTime;
	    if (delta < 150) {
	      return;
	    }
	    if (position && position !== null) {
	      var endPoint = event.lonlat;
	      if (positions.length === 1 && endPoint) {
	        options.endPoint = endPoint;
	        positions.push(position);
	        poly = new _GroundText2.default(_extends({}, options, { drawHelper: _self })).addTo(_self.features);
	      } else if (positions.length === 2 && endPoint) {
	        positions.pop();
	        positions.push(position);
	        poly.endPoint = endPoint;
	      }
	      if (positions.length === 0) {
	        tooltip.showAt(windowPos, "<p>点击设置起点</p>");
	      } else {
	        tooltip.showAt(windowPos, "<p>双击设置终点并结束</p>");
	      }
	    }
	  }

	  function onDoubleClick(event) {
	    var position = event.position;
	    if (position && position !== null) {
	      var endPoint = event.lonlat;
	      if (endPoint) {
	        points.addPoint(position);
	        poly.endPoint = endPoint;
	        if (typeof options.callback === "function") {
	          options.callback(poly);
	        }
	        poly.setEditable();
	        _self.fire("created", {
	          entity: poly
	        });
	        _self.stopDrawing();
	        earth.off("click", onLeftClick);
	        earth.off("mouseMove", onMouseMove);
	        earth.off("doubleClick", onDoubleClick);
	      }
	    }
	  }
	}

/***/ })
/******/ ]);
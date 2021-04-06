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

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DrawHelper = undefined;

	var _DrawHelper = __webpack_require__(2);

	var _DrawHelper2 = _interopRequireDefault(_DrawHelper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.DrawHelper = _DrawHelper2.default;
	exports.DrawHelper = _DrawHelper2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(3);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _Widget = __webpack_require__(6);

	var _Widget2 = _interopRequireDefault(_Widget);

	var _Polygon = __webpack_require__(7);

	var _Polygon2 = _interopRequireDefault(_Polygon);

	var _Polyline = __webpack_require__(12);

	var _Polyline2 = _interopRequireDefault(_Polyline);

	var _GroundPolyline = __webpack_require__(13);

	var _GroundPolyline2 = _interopRequireDefault(_GroundPolyline);

	var _Circle = __webpack_require__(14);

	var _Circle2 = _interopRequireDefault(_Circle);

	var _Wall = __webpack_require__(15);

	var _Wall2 = _interopRequireDefault(_Wall);

	var _Flood = __webpack_require__(16);

	var _Flood2 = _interopRequireDefault(_Flood);

	var _Angle = __webpack_require__(17);

	var _Angle2 = _interopRequireDefault(_Angle);

	var _enhancePrimitives = __webpack_require__(18);

	var _enhancePrimitives2 = _interopRequireDefault(_enhancePrimitives);

	var _Rectangle = __webpack_require__(19);

	var _Rectangle2 = _interopRequireDefault(_Rectangle);

	var _startDrawingCircle = __webpack_require__(21);

	var _startDrawingCircle2 = _interopRequireDefault(_startDrawingCircle);

	var _startDrawingPolygon = __webpack_require__(22);

	var _startDrawingPolygon2 = _interopRequireDefault(_startDrawingPolygon);

	var _startDrawingPolyline = __webpack_require__(23);

	var _startDrawingPolyline2 = _interopRequireDefault(_startDrawingPolyline);

	var _startDrawingPolyshape = __webpack_require__(24);

	var _startDrawingPolyshape2 = _interopRequireDefault(_startDrawingPolyshape);

	var _startDrawingWall = __webpack_require__(25);

	var _startDrawingWall2 = _interopRequireDefault(_startDrawingWall);

	var _startDrawingFlood = __webpack_require__(26);

	var _startDrawingFlood2 = _interopRequireDefault(_startDrawingFlood);

	var _startDrawingAngle = __webpack_require__(27);

	var _startDrawingAngle2 = _interopRequireDefault(_startDrawingAngle);

	var _startDrawingCutFill = __webpack_require__(28);

	var _startDrawingCutFill2 = _interopRequireDefault(_startDrawingCutFill);

	var _startDrawingVisibility = __webpack_require__(29);

	var _startDrawingVisibility2 = _interopRequireDefault(_startDrawingVisibility);

	var _startDrawingMarker = __webpack_require__(30);

	var _startDrawingMarker2 = _interopRequireDefault(_startDrawingMarker);

	var _startDrawingRect = __webpack_require__(38);

	var _startDrawingRect2 = _interopRequireDefault(_startDrawingRect);

	var _startDrawingIcon = __webpack_require__(41);

	var _startDrawingIcon2 = _interopRequireDefault(_startDrawingIcon);

	var _Tooltip = __webpack_require__(42);

	var _Tooltip2 = _interopRequireDefault(_Tooltip);

	var _wrapEvented = __webpack_require__(43);

	var _wrapEvented2 = _interopRequireDefault(_wrapEvented);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	var _compute = __webpack_require__(39);

	var _MeasureTool = __webpack_require__(44);

	var _MeasureTool2 = _interopRequireDefault(_MeasureTool);

	var _config = __webpack_require__(5);

	var _serialize = __webpack_require__(45);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Engine = window.Engine;

	// constructor

	var DrawHelper = function () {
	  function DrawHelper(viewer) {
	    var _this = this;

	    _classCallCheck(this, DrawHelper);

	    this.muteHandlers = function (muted) {
	      this._handlersMuted = muted;
	    };

	    this.registerEditableShape = function (surface) {
	      var _self = _this;

	      (0, _util.setListener)(surface, "leftDown", function (position) {
	        if (surface._editMode) {
	          surface.draggble = true;
	          if (surface.onDragStart) {
	            (0, _util.enableRotation)(_self._earth, false);
	            surface.onDragStart(position);
	          }
	        }
	      });

	      (0, _util.setListener)(surface, "leftUp", function (position) {
	        if (surface._editMode) {
	          surface.draggble = false;
	          if (surface.onDragEnd) {
	            (0, _util.enableRotation)(_self._earth, true);
	            surface.onDragEnd(position);
	          }
	        }
	      });
	      // handlers for interactions
	      // highlight polygon when mouse is entering
	      (0, _util.setListener)(surface, "mouseMove", function (position) {
	        if (!_self.primitives.contains(surface)) return;
	        surface.setHighlighted(true);
	        if (!surface._editMode) {
	          _self._tooltip.showAt(position, "点击以编辑图形");
	        } else if (surface.draggble) {
	          _self._tooltip.setVisible(false);
	          surface.onDrag && surface.onDrag(position);
	        } else {
	          _self._tooltip.showAt(position, "按住鼠标左键以平移图形");
	        }
	      });
	      // hide the highlighting when mouse is leaving the polygon
	      (0, _util.setListener)(surface, "mouseOut", function () {
	        if (!_self.primitives.contains(surface)) return;
	        surface.setHighlighted(false);
	        _self._tooltip.setVisible(false);
	      });
	      (0, _util.setListener)(surface, "leftClick", function () {
	        if (!_self.primitives.contains(surface)) return;
	        _self.fire("selected", { entity: surface });
	        surface.setEditMode(true);
	      });
	      (0, _util.setListener)(surface, "rightClick", function () {
	        if (!_self.primitives.contains(surface)) return;
	        _self.removeObj.primitives.push(surface);
	        _self.removeObj.groundPrimitives.push(surface);
	      });
	      (0, _util.setListener)(surface, "leftDoubleClick", function () {
	        if (!_self.primitives.contains(surface)) return;
	        surface.setEditMode(false);
	        _self._tooltip.setVisible(false);
	        surface.setHighlighted(false);
	        _self._primitives.remove(surface);
	        _self.fire("deleted", { entity: surface });
	        // removeObj.primitives.push(surface);
	        // removeObj.groundPrimitives.push(surface);
	      });
	    };

	    this.startDrawing = function (cleanUp) {
	      // undo any current edit of shapes
	      _this.disableAllEditMode();
	      // check for cleanUp first
	      if (_this.editCleanUp) {
	        _this.editCleanUp();
	      }
	      _this.editCleanUp = cleanUp;
	      _this.muteHandlers(true);
	    };

	    this.stopDrawing = function () {
	      // check for cleanUp first
	      if (_this.editCleanUp) {
	        _this.editCleanUp();
	        _this.editCleanUp = null;
	      }
	      _this.muteHandlers(false);
	    };

	    this.disableAllHighlights = function () {
	      _this.setHighlighted(undefined);
	    };

	    this.setHighlighted = function (surface) {
	      if (_this._highlightedSurface && !_this._highlightedSurface.isDestroyed() && _this._highlightedSurface !== surface) {
	        _this._highlightedSurface.setHighlighted(false);
	      }
	      _this._highlightedSurface = surface;
	    };

	    this.disableAllEditMode = function () {
	      _this.setEdited(undefined);
	    };

	    this.setEdited = function (surface) {
	      if (_this._editedSurface && !_this._editedSurface.isDestroyed()) {
	        _this._editedSurface.setEditMode(false);
	      }
	      _this._editedSurface = surface;
	    };

	    this.createBillboardGroup = function (points, options, callbacks) {
	      var markers = new DrawHelper.BillboardGroup(_this, options);
	      markers.addBillboards(points, callbacks);
	      return markers;
	    };

	    this.addToolbar = function (container, options) {
	      options = (0, _util.copyOptions)(options, { container: container });
	      return new DrawHelper.DrawHelperWidget(_this, options, _this.removeObj);
	    };

	    this.updateKeyState = function (state) {
	      _this.keyState = state;
	    };

	    this.initialiseHandlers = function () {
	      var scene = _this._scene;
	      var _self = _this;
	      // scene events
	      var handler = _this.handler = new Engine.ScreenSpaceEventHandler(scene.canvas);
	      // Cesium GeoVis 不同
	      function callPrimitiveCallback(name, position) {
	        if (_self._handlersMuted === true) return;
	        var pickedObject = scene.pick(position);
	        if (pickedObject && pickedObject["primitive"]) {
	          pickedObject = pickedObject["primitive"];
	        }
	        if (pickedObject && pickedObject[name]) {
	          pickedObject[name](position);
	        }
	      }
	      handler.setInputAction(function (movement) {
	        callPrimitiveCallback("leftClick", movement.position);
	      }, Engine.ScreenSpaceEventType.LEFT_CLICK);
	      handler.setInputAction(function (movement) {
	        callPrimitiveCallback("rightClick", movement.position);
	      }, Engine.ScreenSpaceEventType.RIGHT_CLICK);

	      handler.setInputAction(function (movement) {
	        callPrimitiveCallback("leftDoubleClick", movement.position);
	      }, Engine.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
	      var mouseOutObject;
	      handler.setInputAction(function (movement) {
	        if (_self._handlersMuted === true) return;
	        var pickedObject = scene.pick(movement.endPosition);
	        if (pickedObject && pickedObject["primitive"]) {
	          pickedObject = pickedObject["primitive"];
	        }
	        if (mouseOutObject && (!pickedObject || mouseOutObject !== pickedObject)) {
	          !(mouseOutObject.isDestroyed && mouseOutObject.isDestroyed()) && mouseOutObject.mouseOut(movement.endPosition);
	          mouseOutObject = null;
	        }
	        if (pickedObject && pickedObject) {
	          // pickedObject = pickedObject.primitive;
	          if (pickedObject.mouseOut) {
	            mouseOutObject = pickedObject;
	          }
	          if (pickedObject.mouseMove) {
	            pickedObject.mouseMove(movement.endPosition);
	          }
	        }
	      }, Engine.ScreenSpaceEventType.MOUSE_MOVE);
	      handler.setInputAction(function (movement) {
	        callPrimitiveCallback("leftUp", movement.position);
	      }, Engine.ScreenSpaceEventType.LEFT_UP);
	      handler.setInputAction(function (movement) {
	        callPrimitiveCallback("leftDown", movement.position);
	      }, Engine.ScreenSpaceEventType.LEFT_DOWN);
	      window.addEventListener("click", _this.updateKeyState);
	    };

	    this.remove = function (entity) {
	      var _self = _this;
	      entity.setEditMode(false);
	      _self._tooltip.setVisible(false);
	      entity.setHighlighted(false);
	      _self._primitives.remove(entity);
	      _self.fire("deleted", { entity: entity });
	    };

	    this.startDrawingCircle = _startDrawingCircle2.default;
	    this.startDrawingWall = _startDrawingWall2.default;
	    this.startDrawingPolygon = _startDrawingPolygon2.default;
	    this.startDrawingPolyline = _startDrawingPolyline2.default;
	    this.startDrawingPolyshape = _startDrawingPolyshape2.default;
	    this.startDrawingFlood = _startDrawingFlood2.default;
	    this.startDrawingAngle = _startDrawingAngle2.default;
	    this.startDrawingCutFill = _startDrawingCutFill2.default;
	    this.startDrawingVisibility = _startDrawingVisibility2.default;
	    this.startDrawingMarker = _startDrawingMarker2.default;
	    this.startDrawingRect = _startDrawingRect2.default;
	    this.startDrawingIcon = _startDrawingIcon2.default;
	    this.enhancePrimitives = _enhancePrimitives2.default;
	    this.serialize = _serialize.serialize;
	    this.unserialize = _serialize.unserialize;

	    this._earth = viewer;
	    this._scene = viewer.scene;
	    this._tooltip = new _Tooltip2.default(viewer._container);
	    this._surfaces = [];
	    this._primitives = this._scene.primitives.add(new Engine.PrimitiveCollection());
	    this._groundPrimitives = this._scene.groundPrimitives.add(new Engine.PrimitiveCollection());
	    this.keyState = {
	      ctrlKey: false
	    };
	    this.markers = new _BillboardGroup2.default(this, _config.defaultBillboard);
	    this.features = new GeoVis.FeatureGroup().addTo(earth);
	    this.features.drawHelper = this;
	    this.measure = new _MeasureTool2.default(this);
	    this.initialiseHandlers();
	    this.removeObj = { billBoard: [], primitives: [], groundPrimitives: [] };
	    this.enhancePrimitives({
	      removeObj: this.removeObj,
	      DrawHelper: DrawHelper
	    });
	  }

	  _createClass(DrawHelper, [{
	    key: "destroy",
	    value: function destroy() {
	      this.handler.destroy();
	      this.removeAll();
	      this._earth.scene.primitives.remove(this.primitives);
	      this._earth.scene.primitives.remove(this.groundPrimitives);
	      window.removeEventListener("click", this.updateKeyState);
	      this.features.removeAll();
	    }
	    /**
	     * 移除单个图形
	     */

	  }, {
	    key: "removeAll",

	    /**
	     * 清除所有图形和监听
	     */
	    value: function removeAll() {
	      var primitiveLength = this.removeObj.primitives.length;
	      var groundprimitiveLength = this.removeObj.groundPrimitives.length;
	      var billboardLength = this.removeObj.billBoard.length;
	      /* var logging = document.getElementById("loggingText");
	      logging.innerHTML = ""; */
	      for (var i = 0; i < primitiveLength; i++) {
	        var primi = this.removeObj.primitives.pop();
	        // primi.WidgetglobeClickhandler.destroy();
	        this._primitives.remove(primi);
	      }
	      for (var j = 0; j < groundprimitiveLength; j++) {
	        var groundprimi = this.removeObj.groundPrimitives.pop();
	        // primi.WidgetglobeClickhandler.destroy();
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
	      this.features.removeAll();
	      // this.measure.removeAll();
	    }
	  }, {
	    key: "Change2d",
	    value: function Change2d() {
	      this._earth.scene.mode = GeoVis.SceneMode.SCENE2D;
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

	    // register event handling for an editable shape
	    // shape should implement setEditMode and setHighlighted


	    // make sure only one shape is highlighted at a time

	  }]);

	  return DrawHelper;
	}();

	DrawHelper.RectPrimitive = _Rectangle2.default;
	DrawHelper.BillboardGroup = _BillboardGroup2.default;
	DrawHelper.DrawHelperWidget = _Widget2.default;
	DrawHelper.PolygonPrimitive = _Polygon2.default;
	DrawHelper.PolylinePrimitive = _Polyline2.default;
	DrawHelper.CirclePrimitive = _Circle2.default;
	DrawHelper.WallPrimitive = _Wall2.default;
	DrawHelper.FloodPrimitive = _Flood2.default;
	DrawHelper.AnglePrimitive = _Angle2.default;
	DrawHelper.GroundPolylinePrimitive = _GroundPolyline2.default;
	DrawHelper.computeArea = _compute.computeArea;
	DrawHelper.MeasureTool = _MeasureTool2.default;
	DrawHelper.computeDistance = _compute.computeDistance;
	DrawHelper.getCentroid = _compute.getCentroid;
	DrawHelper.Types = _Types2.default;

	exports.default = (0, _wrapEvented2.default)(DrawHelper);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.getExtent = getExtent;
	exports.enableRotation = enableRotation;
	exports.mousePositionToCartesian3 = mousePositionToCartesian3;
	exports.setListener = setListener;
	exports.positionToCartesian3 = positionToCartesian3;
	exports.getDistance = getDistance;
	exports.getAzimuth = getAzimuth;
	exports.getThirdPoint = getThirdPoint;
	exports.getWSG84Coor = getWSG84Coor;
	exports.getDisplayLatLngString = getDisplayLatLngString;
	exports.clone = clone;
	exports.fillOptions = fillOptions;
	exports.copyOptions = copyOptions;
	exports.extend = extend;
	exports.endsWith = endsWith;
	exports.enhanceWithListeners = enhanceWithListeners;
	var _window = window,
	    Engine = _window.Engine;
	function getExtent(mn, mx) {
	  var e = new Engine.Rectangle();

	  // Re-order so west < east and south < north
	  e.west = Math.min(mn.longitude, mx.longitude);
	  e.east = Math.max(mn.longitude, mx.longitude);
	  e.south = Math.min(mn.latitude, mx.latitude);
	  e.north = Math.max(mn.latitude, mx.latitude);

	  // Check for approx equal (shouldn't require abs due to re-order)
	  var epsilon = Engine.Math.EPSILON7;

	  if (e.east - e.west < epsilon) {
	    e.east += epsilon * 2.0;
	  }

	  if (e.north - e.south < epsilon) {
	    e.north += epsilon * 2.0;
	  }

	  return e;
	}

	/**
	 * 
	 * @param {GeoVis.Earth} earth 
	 * @param {Boolean} enable 
	 */
	function enableRotation(earth, enable) {
	  earth.scene.screenSpaceCameraController.enableRotate = enable;
	  earth.scene.screenSpaceCameraController.enableTranslate = enable;
	}
	function mousePositionToCartesian3(position) {
	  var cartographic = Engine.Cartographic.fromCartesian(position);
	  var lon = Engine.Math.toDegrees(cartographic.longitude);
	  var lat = Engine.Math.toDegrees(cartographic.latitude);
	  return [lon, lat];
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
	    var point = Engine.Cartesian3.fromDegrees(positionArr[i][0], positionArr[i][1], 0);
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
	  var cartographic = Engine.Cartographic.fromCartesian(cartesian);
	  var len = Engine.Math.toDegrees(cartographic.longitude);
	  var lat = Engine.Math.toDegrees(cartographic.latitude);
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var ellipsoid = Engine.Ellipsoid.WGS84;
	var BillboardGroup = function BillboardGroup(drawHelper, options) {
	  this._drawHelper = drawHelper;
	  this._scene = drawHelper._scene;

	  this._options = (0, _util.copyOptions)(options, _config.defaultBillboard);

	  // create one common billboard collection for all billboards
	  var b = new Engine.BillboardCollection();
	  drawHelper._primitives.add(b);
	  this._billboards = b;
	  // keep an ordered list of billboards
	  this._orderedBillboards = [];
	};

	BillboardGroup.prototype.createBillboard = function (position, callbacks) {
	  var vertical = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  var horizontal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	  var cross = arguments[4];

	  var billboard = this._billboards.add({
	    show: true,
	    position: position,
	    pixelOffset: new Engine.Cartesian2(this._options.shiftX, this._options.shiftY),
	    // disableDepthTestDistance: 1e7,
	    eyeOffset: new Engine.Cartesian3(0.0, 0.0, 0.0),
	    horizontalOrigin: Engine.HorizontalOrigin.CENTER,
	    verticalOrigin: Engine.VerticalOrigin.CENTER,
	    scale: 1.0,
	    image: this._options.iconUrl,
	    color: new Engine.Color(1.0, 1.0, 1.0, 1.0)
	  });
	  billboard.vertical = vertical;
	  billboard.horizontal = horizontal;
	  billboard.cross = cross;

	  // if editable
	  if (callbacks) {
	    var _self = this;
	    var screenSpaceCameraController = this._scene.screenSpaceCameraController;

	    if (callbacks.dragHandlers) {
	      _self = this;
	      (0, _util.setListener)(billboard, "leftDown", function (position) {
	        // TODO - start the drag handlers here
	        // create handlers for mouseOut and leftUp for the billboard and a mouseMove
	        function onDrag(position) {
	          billboard.position = position;
	          // find index
	          for (var i = 0, I = _self._orderedBillboards.length; i < I && _self._orderedBillboards[i] !== billboard; ++i) {}
	          callbacks.dragHandlers.onDrag && callbacks.dragHandlers.onDrag(getIndex(), position);
	        }
	        function onDragEnd(position) {
	          handler.destroy();
	          enableRotation(true);
	          callbacks.dragHandlers.onDragEnd && callbacks.dragHandlers.onDragEnd(getIndex(), position);
	        }

	        var handler = new Engine.ScreenSpaceEventHandler(_self._scene.canvas);
	        var scratchBoundingSphere = new Engine.BoundingSphere();

	        handler.setInputAction(function (movement) {
	          var dy, position, tangentPlane, metersPerPixel, zOffset, newPosition;
	          if (billboard.vertical) {
	            dy = movement.endPosition.y - movement.startPosition.y;
	            if (movement.startPosition.x === 0 && movement.startPosition.y === 0) {
	              return;
	            }
	            position = billboard.position;
	            tangentPlane = new Engine.EllipsoidTangentPlane(position);
	            scratchBoundingSphere.center = position;
	            scratchBoundingSphere.radius = 1;
	            metersPerPixel = _self._scene.frameState.camera.getPixelSize(scratchBoundingSphere, _self._scene.frameState.context.drawingBufferWidth, _self._scene.frameState.context.drawingBufferHeight);
	            zOffset = new Engine.Cartesian3();
	            Engine.Cartesian3.multiplyByScalar(tangentPlane.zAxis, -dy * metersPerPixel, zOffset);
	            newPosition = Engine.Cartesian3.clone(position);
	            Engine.Cartesian3.add(position, zOffset, newPosition);
	            billboard.position = newPosition;
	            if (newPosition) {
	              onDrag(newPosition);
	            }
	          } else if (billboard.horizontal) {
	            dy = movement.endPosition.y - movement.startPosition.y;
	            var dx = movement.endPosition.x - movement.startPosition.x;

	            var _GeoVis$Vector = GeoVis.Vector3,
	                add = _GeoVis$Vector.add,
	                clone = _GeoVis$Vector.clone;
	            // 取法线两点笛卡尔坐标

	            var p1 = billboard.position;
	            var p2 = new GeoVis.Vector3();
	            add(p1, billboard.cross, p2);
	            // 计算法线屏幕坐标
	            var sp1 = GeoVis.Util.getXYForCartesian(earth, clone(p1));
	            var sp2 = GeoVis.Util.getXYForCartesian(earth, clone(p2));
	            // 法线在屏幕上的投影向量
	            var normalVec2 = new GeoVis.Vector2(sp2[0] - sp1[0], sp2[1] - sp1[1]);
	            // 鼠标位移向量
	            var mouseVec2 = new GeoVis.Vector2(dx, dy);
	            var _GeoVis$Vector2 = GeoVis.Vector2,
	                angleBetween = _GeoVis$Vector2.angleBetween,
	                magnitude = _GeoVis$Vector2.magnitude;

	            var mouseMag = magnitude(mouseVec2);
	            // 夹角
	            var θ = angleBetween(mouseVec2, normalVec2);
	            var projMag = mouseMag * Math.cos(θ);

	            if (movement.startPosition.x === 0 && movement.startPosition.y === 0) {
	              return;
	            }
	            position = billboard.position;
	            tangentPlane = new Engine.EllipsoidTangentPlane(position);
	            scratchBoundingSphere.center = position;
	            scratchBoundingSphere.radius = 1;
	            metersPerPixel = _self._scene.frameState.camera.getPixelSize(scratchBoundingSphere, _self._scene.frameState.context.drawingBufferWidth, _self._scene.frameState.context.drawingBufferHeight);
	            zOffset = new Engine.Cartesian3();
	            Engine.Cartesian3.multiplyByScalar(billboard.cross, projMag * metersPerPixel, zOffset);
	            newPosition = clone(position);
	            add(position, zOffset, newPosition);
	            var coord = ellipsoid.cartesianToCartographic(newPosition);
	            var coord2 = ellipsoid.cartesianToCartographic(position);
	            newPosition = ellipsoid.cartographicToCartesian(new Engine.Cartographic(coord.longitude, coord.latitude, coord2.height));
	            billboard.position = newPosition;
	            if (newPosition) {
	              onDrag(newPosition);
	            }
	          } else {
	            var cartesian = _self._scene.camera.pickEllipsoid(movement.endPosition, ellipsoid);
	            if (cartesian) {
	              onDrag(cartesian);
	            } else {
	              onDragEnd(cartesian);
	            }
	          }
	        }, Engine.ScreenSpaceEventType.MOUSE_MOVE);

	        handler.setInputAction(function (movement) {
	          onDragEnd(_self._scene.camera.pickEllipsoid(movement.position, ellipsoid));
	        }, Engine.ScreenSpaceEventType.LEFT_UP);

	        enableRotation(false);

	        callbacks.dragHandlers.onDragStart && callbacks.dragHandlers.onDragStart(getIndex(), _self._scene.camera.pickEllipsoid(position, ellipsoid));
	      });
	    }
	    if (callbacks.onDoubleClick) {
	      (0, _util.setListener)(billboard, "leftDoubleClick", function () {
	        callbacks.onDoubleClick(getIndex());
	      });
	    }
	    if (callbacks.onClick) {
	      (0, _util.setListener)(billboard, "leftClick", function () {
	        callbacks.onClick(getIndex());
	      });
	    }
	    if (callbacks.tooltip) {
	      (0, _util.setListener)(billboard, "mouseMove", function (position) {
	        _self._drawHelper._tooltip.showAt(position, callbacks.tooltip());
	      });
	      (0, _util.setListener)(billboard, "mouseOut", function () {
	        _self._drawHelper._tooltip.setVisible(false);
	        document.body.style.cursor = "default";
	      });
	    }
	  }
	  function enableRotation(enable) {
	    screenSpaceCameraController.enableRotate = enable;
	    screenSpaceCameraController.enableTranslate = enable;
	  }
	  function getIndex() {
	    // find index
	    for (var i = 0, I = _self._orderedBillboards.length; i < I && _self._orderedBillboards[i] !== billboard; ++i) {}
	    return i;
	  }
	  return billboard;
	};

	BillboardGroup.prototype.insertBillboard = function (index, position, callbacks) {
	  this._orderedBillboards.splice(index, 0, this.createBillboard(position, callbacks));
	};

	BillboardGroup.prototype.addBillboard = function (position, callbacks, vertical, horizontal, cross) {
	  this._orderedBillboards.push(this.createBillboard(position, callbacks, vertical, horizontal, cross));
	};

	BillboardGroup.prototype.removeLastBillboard = function () {
	  this._billboards.remove(this._orderedBillboards.pop());
	};

	BillboardGroup.prototype.addBillboards = function (positions, callbacks, vertical, horizontal, cross) {
	  var index = 0;
	  for (; index < positions.length; index++) {
	    this.addBillboard(positions[index], callbacks, vertical, horizontal, cross);
	  }
	};

	BillboardGroup.prototype.updateBillboardsPositions = function (positions) {
	  var index = 0;
	  for (; index < positions.length; index++) {
	    this.getBillboard(index).position = positions[index];
	  }
	};

	BillboardGroup.prototype.countBillboards = function () {
	  return this._orderedBillboards.length;
	};

	BillboardGroup.prototype.getBillboard = function (index) {
	  return this._orderedBillboards[index];
	};

	BillboardGroup.prototype.removeBillboard = function (index) {
	  this._billboards.remove(this.getBillboard(index));
	  this._orderedBillboards.splice(index, 1);
	};

	BillboardGroup.prototype.remove = function () {
	  this._billboards = this._billboards && this._billboards.removeAll() && this._billboards.destroy();
	};

	BillboardGroup.prototype.setOnTop = function () {
	  this._drawHelper._primitives.raiseToTop(this._billboards);
	};

	exports.default = BillboardGroup;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SPLITLINEBillboard = exports.dragHalfBillboard = exports.dragBillboard = exports.defaultBillboard = exports.defaultPolylineOptions = exports.defaultRectangleOptions = exports.defaultWallOptions = exports.defaultCircleOptions = exports.defaultSurfaceOptions = undefined;

	var _util = __webpack_require__(3);

	var material = Engine.Material.fromType(Engine.Material.ColorType);
	material.uniforms.color = GeoVis.Color.fromCssString("#009688").withAlpha(0.7);

	var defaultShapeOptions = {
	  ellipsoid: Engine.Ellipsoid.WGS84,
	  textureRotationAngle: 0.0,
	  height: 0.0,
	  asynchronous: false,
	  show: true,
	  debugShowBoundingVolume: false
	};

	var defaultSurfaceOptions = exports.defaultSurfaceOptions = (0, _util.copyOptions)(defaultShapeOptions, {
	  appearance: new Engine.MaterialAppearance({
	    aboveGround: false,
	    material: material
	  }),
	  material: material,
	  granularity: Math.PI / 180.0
	});

	var defaultCircleOptions = exports.defaultCircleOptions = (0, _util.copyOptions)(defaultShapeOptions, {
	  strokeColor: GeoVis.Color.fromCssString("#009688"),
	  strokeWidth: 10,
	  onTerrain: true,
	  material: Engine.Material.fromType(Engine.Material.RimLightingType, {
	    color: Engine.Color.fromCssString("#009688").withAlpha(0.3)
	  })
	});
	var defaultWallOptions = exports.defaultWallOptions = (0, _util.copyOptions)(defaultShapeOptions, {
	  appearance: new Engine.MaterialAppearance({
	    aboveGround: false
	  }),
	  flat: true,
	  material: material,
	  granularity: Math.PI / 180.0
	});
	var defaultRectangleOptions = exports.defaultRectangleOptions = (0, _util.copyOptions)(defaultShapeOptions, {
	  appearance: new Engine.MaterialAppearance({
	    aboveGround: false
	  }),
	  material: material
	});
	var defaultPolylineOptions = exports.defaultPolylineOptions = (0, _util.copyOptions)(defaultShapeOptions, {
	  width: 3,
	  geodesic: true,
	  granularity: 10000,
	  appearance: new Engine.PolylineMaterialAppearance({
	    aboveGround: false
	  }),
	  material: material
	});
	var dragIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKHAksBNXfIvIAAADGSURBVBjTlZC9DsFgFIafWsQgDE0vwGBjNVjNdYl1BYYmbkDim0yMEotFooNEW+Wjr6GfpCQG73J+nmc5B/6I924kNYEh0APawAXYAxvP827URUlTSZGkg6S7q5HbN+vySNJM0lOfebr9CKABUBRFH5i851oawMTxCuZ53gGCH3cFjldymqYZcPohnxyv5CzLdsASKL/EElg6XsnW2rUxZgHMgSPwcHVujFlYa9cff47juJUkyRgYAF3gDGx931+FYXjl37wANeOE+Ghv1/sAAAAASUVORK5CYII=";
	var dragIconLight = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKHAksIgfSpw8AAAFQSURBVBjTlZC/axphAIaf+87e5dTUkCGSDoIVuzUgZBM3hyCCAef0PxQiBRMhBgx26ODSUgIedJAG1BAI5Ls7vu+7H12iuw+88A7P8r6wB9a29Pt917KsM+AzcAi8AX+zLPs1GAzUTu71eq4Q4qLb7V42m812Pp8vB0Gwns1md6PR6DpN09vhcKhsgHq9ft7pdK5arda3KIpKYRjacRx/rFarZ4D2ff/fYrF4ygEYY740Go32er0WWZahtcYYQ5qmolartY0xE+BnDkBrXbIs60RKiZQhSRLvRjmOc6K1LgHkAJRSwWbz8hxFySfbdrFtdyeHYfCslAoAxLvsT6fTB887TF23wDaOU0jn8/mDUsoHsAHK5fLm8fHPhyTJstPTyrHnFQ+klJv7+/F4Mrn5LoS4W61W8e7nSqXiSSmbwFfgCHgFfheLxR/L5TJiX/4DB6mbvqBlRUAAAAAASUVORK5CYII=";
	var defaultBillboard = exports.defaultBillboard = {
	  iconUrl: dragIcon,
	  disableDepthTestDistance: 6e7,
	  shiftX: 0,
	  shiftY: 0
	};

	var dragBillboard = exports.dragBillboard = {
	  iconUrl: dragIcon,
	  shiftX: 0,
	  disableDepthTestDistance: 6e7,
	  shiftY: 0
	};

	var dragHalfBillboard = exports.dragHalfBillboard = {
	  iconUrl: dragIconLight,
	  shiftX: 0,
	  disableDepthTestDistance: 6e7,
	  shiftY: 0
	};
	var SPLITLINEBillboard = exports.SPLITLINEBillboard = {
	  iconUrl: dragIconLight,
	  shiftX: 0,
	  disableDepthTestDistance: 6e7,
	  shiftY: 0
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(5);

	var _util = __webpack_require__(3);

	// constructor
	function Widget(drawHelper, options, removeObj) {
	  // container must be specified
	  if (!Engine.defined(options.container)) {
	    throw new Engine.DeveloperError("Container is required");
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

	  // add a clear button at the end
	  // add a divider first
	  // var div = document.createElement("DIV");
	  // div.className = "divider";
	  // toolbar.appendChild(div);
	  // addIcon("clear", options.clearIcon, "Remove all primitives", function() {

	  // });

	  (0, _util.enhanceWithListeners)(this);
	}

	exports.default = Widget;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ChangeablePrimitive = __webpack_require__(8);

	var _ChangeablePrimitive2 = _interopRequireDefault(_ChangeablePrimitive);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	var _Plots = __webpack_require__(10);

	var _Plots2 = _interopRequireDefault(_Plots);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getArrowCorners(value) {
	  return [value[7], value[3]];
	}

	function Polygon(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultSurfaceOptions);
	  options.type = options.type || _Types2.default.PROJ_POLYGON;
	  options.computed = options.computed || false;
	  this.initialiseOptions(options);
	  // this.isPolygon = true;
	}

	Polygon.prototype = new _ChangeablePrimitive2.default();

	Polygon.prototype.setPositions = function (positions) {
	  this.setAttribute("positions", positions);
	};

	Polygon.prototype.getPositions = function () {
	  return this.getAttribute("positions");
	};

	Polygon.prototype.setCustom = function () {
	  this.setAttribute("custom");
	};

	Polygon.prototype.getCustom = function () {
	  return this.getAttribute("custom");
	};

	Polygon.prototype.getGeometry = function () {
	  if (!Engine.defined(this.positions) || this.positions.length < 3) {
	    return;
	  }
	  if (this.type === _Types2.default.SPACE_POLYGON) {
	    return GeoVis.CoplanarPolygonGeometry.fromPositions({
	      positions: this.positions
	    });
	  } else {
	    return GeoVis.PolygonGeometry.fromPositions({
	      positions: this.positions,
	      height: this.height,
	      extrudedHeight: this.extrudedHeight,
	      vertexFormat: Engine.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
	      stRotation: this.textureRotationAngle,
	      ellipsoid: this.ellipsoid,
	      granularity: this.granularity
	    });
	  }
	};

	Polygon.prototype.getOutlineGeometry = function () {
	  return Engine.PolygonOutlineGeometry.fromPositions({
	    positions: this.getPositions()
	  });
	};
	Polygon.enhance = function (_ref) {
	  var removeObj = _ref.removeObj,
	      DrawHelper = _ref.DrawHelper,
	      drawHelper = _ref.drawHelper,
	      setEditMode = _ref.setEditMode,
	      setHighlighted = _ref.setHighlighted;

	  Polygon.prototype.setEditable = function () {
	    var polygon = this;
	    polygon.asynchronous = false;
	    var scene = drawHelper._scene;
	    var plot = _Plots2.default[polygon.type];
	    //  var minPoints = plot.minPoints;
	    drawHelper.registerEditableShape(polygon);
	    polygon.setEditMode = polygon.type === _Types2.default.POLYGON || polygon.type === _Types2.default.PROJ_POLYGON || polygon.type === _Types2.default.SPACE_POLYGON || polygon.type === _Types2.default.GROUND_POLYGON ? setEditMode : function (editMode) {
	      // if no change
	      if (this._editMode === editMode) {
	        return;
	      }
	      drawHelper.disableAllHighlights();
	      if (editMode) {
	        drawHelper.setEdited(this);
	        if (this._markers == null) {
	          var markers = new _BillboardGroup2.default(drawHelper, _config.dragBillboard);
	          removeObj.billBoard.push(markers);
	          var handleMarkerChanges;
	          handleMarkerChanges = {
	            dragHandlers: {
	              onDrag: function onDrag(index, position) {
	                // Types
	                var controlPoints = polygon.custom;
	                controlPoints[index] = (0, _util.mousePositionToCartesian3)(position);
	                var doubleArrowResult = plot.algorithm(controlPoints);
	                polygon.positions = doubleArrowResult.polygonalPoint;
	                polygon.custom = doubleArrowResult.controlPoint;
	                polygon._createPrimitive = true;
	                markers.updateBillboardsPositions((0, _util.positionToCartesian3)(polygon.custom));
	              },
	              onDragEnd: function onDragEnd(index, position) {
	                onEdited();
	              }
	            },
	            tooltip: function tooltip() {
	              return "拖动以改变形状";
	            }
	          };
	          var controlPoint = polygon.custom;
	          markers.addBillboards((0, _util.positionToCartesian3)(controlPoint), handleMarkerChanges);

	          this._markers = markers;
	          this._globeClickhandler = new Engine.ScreenSpaceEventHandler(scene.canvas);
	          this._globeClickhandler.setInputAction(function (movement) {
	            var pickedObject = scene.pick(movement.position);
	            if (!(pickedObject && pickedObject.primitive)) {
	              polygon.setEditMode(false);
	            }
	          }, Engine.ScreenSpaceEventType.LEFT_CLICK);
	          markers.setOnTop();
	        }
	        this._editMode = true;
	      } else {
	        if (this._markers != null) {
	          this._markers.remove();
	          this._markers = null;
	          this._globeClickhandler.destroy();
	        }
	        this._editMode = false;
	      }
	    };

	    polygon.setHighlighted = setHighlighted;

	    (0, _util.enhanceWithListeners)(polygon);

	    polygon.setEditMode(false);

	    function onEdited() {
	      polygon.executeListeners({
	        name: "onEdited",
	        positions: polygon.positions
	      });
	    }
	  };
	};

	exports.default = Polygon;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(3);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChangeablePrimitive = function () {
	  function ChangeablePrimitive() {
	    _classCallCheck(this, ChangeablePrimitive);
	  }

	  _createClass(ChangeablePrimitive, [{
	    key: "initialiseOptions",
	    value: function initialiseOptions(options) {
	      (0, _util.fillOptions)(this, options);

	      this._ellipsoid = undefined;
	      this._granularity = undefined;
	      this._height = undefined;
	      this._textureRotationAngle = undefined;
	      this._id = options.id || GeoVis.createGuid();

	      // set the flags to initiate a first drawing
	      this._createPrimitive = true;
	      this._primitive = undefined;
	      this._outlinePolygon = undefined;
	      this.onterrain = options.onterrain || false;
	      this.type = options.type;
	    }
	  }, {
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
	      if (!Engine.defined(this.ellipsoid)) {
	        throw new Engine.DeveloperError("this.ellipsoid must be defined.");
	      }

	      if (!Engine.defined(this.appearance)) {
	        throw new Engine.DeveloperError("this.material must be defined.");
	      }

	      if (this.granularity < 0.0) {
	        throw new Engine.DeveloperError("this.granularity and scene2D/scene3D overrides must be greater than zero.");
	      }

	      if (!this.show) {
	        return;
	      }

	      if (!this._createPrimitive && !Engine.defined(this._primitive)) {
	        // No positions/hierarchy to draw
	        return;
	      }

	      if (this._createPrimitive || this._ellipsoid !== this.ellipsoid || this._granularity !== this.granularity || this._height !== this.height || this._textureRotationAngle !== this.textureRotationAngle || this._id !== this.id) {
	        var geometry = this.getGeometry();
	        if (!geometry) {
	          return;
	        }

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
	            // depthMask: true,
	            // blending: BlendingState.ADDITIVE_BLEND
	          } });
	        if (this.type === _Types2.default.GROUND_POLYLINE) {
	          this._primitive = new Engine.GroundPolylinePrimitive({
	            geometryInstances: new Engine.GeometryInstance({
	              geometry: geometry,
	              id: this.id,
	              pickPrimitive: this
	            }),
	            appearance: this.appearance,
	            asynchronous: this.asynchronous
	          });
	        } else if (this.type === _Types2.default.GROUND_POLYGON) {
	          this._primitive = new Engine.GroundPrimitive({
	            geometryInstances: new Engine.GeometryInstance({
	              geometry: geometry,
	              id: this.id,
	              pickPrimitive: this
	            }),
	            appearance: this.appearance,
	            asynchronous: this.asynchronous
	          });
	        } else if (this.type === _Types2.default.CLASSIFY_POLYGON) {
	          this._primitive = new Engine.ClassificationPrimitive({
	            geometryInstances: new Engine.GeometryInstance({
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
	          this._primitive = new Engine.Primitive({
	            geometryInstances: new Engine.GeometryInstance({
	              geometry: geometry,
	              id: this.id,
	              pickPrimitive: this
	            }),
	            appearance: this.appearance,
	            asynchronous: this.asynchronous
	          });
	        }

	        this._outlinePolygon = this._outlinePolygon && this._outlinePolygon.destroy();
	        if (this.strokeColor && this.getOutlineGeometry) {
	          // create the highlighting frame
	          this._outlinePolygon = new Engine.Primitive({
	            geometryInstances: new Engine.GeometryInstance({
	              id: this,
	              geometry: this.getOutlineGeometry(),
	              attributes: {
	                color: Engine.ColorGeometryInstanceAttribute.fromColor(this.strokeColor)
	              }
	            }),
	            appearance: new Engine.PerInstanceColorAppearance({
	              flat: true,
	              renderState: {
	                depthTest: {
	                  enabled: true
	                },
	                lineWidth: 1.0
	              }
	            })
	          });
	        }
	      }

	      var primitive = this._primitive;
	      if (this.type !== _Types2.default.CLASSIFY_POLYGON) primitive.appearance.material = this.material;
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
	      return Engine.destroyObject(this);
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
	      return this.material.uniforms.color;
	    },
	    set: function set(val) {
	      this.material.uniforms.color = val;
	    }
	  }]);

	  return ChangeablePrimitive;
	}();

	exports.default = ChangeablePrimitive;

/***/ }),
/* 9 */
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
	   * 常规多边形
	   * @type {Number}
	   * @constant
	   */
	  ARROWHEAD: ++i,

	  TAILEDATTACK: ++i,

	  EXTENT: ++i,

	  /**
	   * 分割线
	   * @type {Number}
	   * @constant
	   */
	  SPLITLINE: ++i,

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
	   * 水淹
	   * @type {Number}
	   * @constant
	   */
	  FLOOD: ++i,
	  ANGLE: ++i,
	  CUTFILL: ++i,
	  VISIBILITY: ++i,
	  TEXT_MARKER: ++i,
	  IMAGE_MARKER: ++i,
	  /**
	   *
	   * 长方形
	   * @type {Number}
	   * @constant
	   */
	  RECTANGLE: ++i,
	  ICON: ++i
	};

	exports.default = Types;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _algorithm = __webpack_require__(11);

	var _algorithm2 = _interopRequireDefault(_algorithm);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	var _util = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Plots = [];
	Plots[_Types2.default.EXTENT] = {
	  minPoints: 1,
	  maxPoints: 2,
	  algorithm: _util.fineArrow
	};
	Plots[_Types2.default.ARROWHEAD] = {
	  minPoints: 2,
	  maxPoints: 3,
	  algorithm: _algorithm2.default.algorithm.doubleArrow
	};
	Plots[_Types2.default.TAILEDATTACK] = {
	  minPoints: 3,
	  maxPoints: Infinity,
	  algorithm: _algorithm2.default.algorithm.tailedAttackArrow
	};
	exports.default = Plots;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var xp = { version: "1.0.0", createTime: "2018.6.19", author: "xupinhui" };
	xp.algorithm = {};
	exports.default = xp;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ChangeablePrimitive = __webpack_require__(8);

	var _ChangeablePrimitive2 = _interopRequireDefault(_ChangeablePrimitive);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	var _util = __webpack_require__(3);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _config = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ellipsoid = Engine.Ellipsoid.WGS84;

	function Polyline(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultPolylineOptions);
	  options.type = options.type || _Types2.default.PROJ_POLYLINE;
	  options.computed = options.computed || false;
	  this.initialiseOptions(options);
	}

	Polyline.prototype = new _ChangeablePrimitive2.default();

	Polyline.prototype.setPositions = function (positions) {
	  this.setAttribute("positions", positions);
	};

	Polyline.prototype.setWidth = function (width) {
	  this.setAttribute("width", width);
	};

	Polyline.prototype.setGeodesic = function (geodesic) {
	  this.setAttribute("geodesic", geodesic);
	};

	Polyline.prototype.getPositions = function () {
	  return this.getAttribute("positions");
	};

	Polyline.prototype.getWidth = function () {
	  return this.getAttribute("width");
	};

	Polyline.prototype.getGeodesic = function () {
	  return this.getAttribute("geodesic");
	};

	Polyline.prototype.getGeometry = function () {
	  if (!Engine.defined(this.positions) || this.positions.length < 2) {
	    return;
	  }

	  return new Engine.PolylineGeometry({
	    positions: this.positions,
	    height: this.height,
	    width: this.width < 1 ? 1 : this.width,
	    vertexFormat: Engine.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
	    ellipsoid: this.ellipsoid,
	    followSurface: this.followSurface
	  });
	};
	Polyline.enhance = function (_ref) {
	  var removeObj = _ref.removeObj,
	      DrawHelper = _ref.DrawHelper,
	      drawHelper = _ref.drawHelper;

	  Polyline.prototype.setEditable = function () {
	    if (this.setEditMode) {
	      return;
	    }

	    var polyline = this;
	    polyline.isPolygon = false;
	    polyline.asynchronous = false;
	    drawHelper.registerEditableShape(polyline);
	    polyline.setEditMode = function (editMode) {
	      if (this._editMode === editMode) {
	        return;
	      }
	      // make sure all other shapes are not in edit mode before starting the editing of this shape
	      drawHelper.disableAllHighlights();
	      // display markers
	      if (editMode) {
	        drawHelper.setEdited(this);
	        var scene = drawHelper._scene;
	        var _self = this;
	        // create the markers and handlers for the editing
	        if (this._markers == null) {
	          var markers = new _BillboardGroup2.default(drawHelper, _config.dragBillboard);
	          removeObj.billBoard.push(markers);
	          // 修改中间点的图标
	          var editMarkers = new _BillboardGroup2.default(drawHelper, _config.SPLITLINEBillboard);
	          removeObj.billBoard.push(editMarkers);

	          var handleMarkerChanges = {
	            dragHandlers: {
	              onDrag: function onDrag(index, position) {
	                if (_self.type === _Types2.default.PROJ_POLYLINE || _self.type === _Types2.default.SPACE_POLYLINE) {
	                  _self.positions[index] = position;
	                  updateHalfMarkers(index, _self.positions);
	                  _self._createPrimitive = true;
	                  drawHelper.fire("changed", {
	                    entity: _self,
	                    positions: _self.positions
	                  });
	                }
	              },
	              onDragEnd: function onDragEnd(index, position) {
	                _self._createPrimitive = true;
	                onEdited();
	              }
	            },
	            onDoubleClick: function onDoubleClick(index) {
	              if (_self.positions.length < 4) {
	                return;
	              }
	              // remove the point and the corresponding markers
	              _self.positions.splice(index, 1);
	              _self._createPrimitive = true;
	              markers.removeBillboard(index);
	              editMarkers.removeBillboard(index);
	              updateHalfMarkers(index, _self.positions);
	              onEdited();
	            },
	            tooltip: function tooltip() {
	              if (_self.positions.length > 1) {
	                document.body.style.cursor = "move";
	                return "拖拽修改坐标";
	              }
	            }
	          };
	          // add billboards and keep an ordered list of them for the polygon edges
	          markers.addBillboards(_self.positions, handleMarkerChanges);

	          this._markers = markers;

	          var halfPositions = [];
	          var index = 0;
	          var length = _self.positions.length + (this.isPolygon ? 0 : -1);
	          for (; index < length; index++) {
	            halfPositions.push(calculateHalfMarkerPosition(index));
	          }
	          var handleEditMarkerChanges = {
	            dragHandlers: {
	              onDragStart: function onDragStart(index, position) {
	                // add a new position to the polygon but not a new marker yet
	                if (_self.type === _Types2.default.PROJ_POLYLINE || _self.type === _Types2.default.SPACE_POLYLINE) {
	                  this.index = index + 1;
	                  _self.positions.splice(this.index, 0, position);
	                  _self._createPrimitive = true;
	                } else {}
	              },
	              onDrag: function onDrag(index, position) {
	                if (_self.type === _Types2.default.PROJ_POLYLINE || _self.type === _Types2.default.SPACE_POLYLINE) {
	                  _self.positions[this.index] = position;
	                  _self._createPrimitive = true;
	                  drawHelper.fire("changed", {
	                    entity: _self,
	                    positions: _self.positions
	                  });
	                }
	              },
	              onDragEnd: function onDragEnd(index, position) {
	                if (_self.type === _Types2.default.PROJ_POLYLINE || _self.type === _Types2.default.SPACE_POLYLINE) {
	                  // create new sets of makers for editing
	                  markers.insertBillboard(this.index, position, handleMarkerChanges);
	                  editMarkers.getBillboard(this.index - 1).position = calculateHalfMarkerPosition(this.index - 1);
	                  editMarkers.insertBillboard(this.index, calculateHalfMarkerPosition(this.index), handleEditMarkerChanges);
	                  _self._createPrimitive = true;
	                  onEdited();
	                } else {
	                  onEdited();
	                }
	              }
	            },
	            tooltip: function tooltip() {
	              document.body.style.cursor = "move";
	              return "拖拽移动位置";
	            }
	          };
	          // todo
	          editMarkers.addBillboards(halfPositions, handleEditMarkerChanges);

	          this._editMarkers = editMarkers;
	          // add a handler for clicking in the globe
	          this._globeClickhandler = new Engine.ScreenSpaceEventHandler(scene.canvas);
	          this._globeClickhandler.setInputAction(function (movement) {
	            var pickedObject = scene.pick(movement.position);
	            if (!(pickedObject && pickedObject.primitive)) {
	              _self.setEditMode(false);
	            }
	          }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	          // set on top of the polygon
	          markers.setOnTop();
	          editMarkers.setOnTop();
	        }
	        this._editMode = true;
	      } else {
	        /* document.body.style.cursor = "default"; */
	        if (this._markers != null) {
	          this._markers.remove();
	          this._editMarkers.remove();
	          this._markers = null;
	          this._editMarkers = null;
	          this._globeClickhandler.destroy();
	        }
	        this._editMode = false;
	      }
	      // function for updating the edit markers around a certain point
	      function updateHalfMarkers(index, positions) {
	        // update the half markers before and after the index
	        var editIndex = index - 1 < 0 ? positions.length - 1 : index - 1;

	        if (editIndex < editMarkers.countBillboards()) {
	          editMarkers.getBillboard(editIndex).position = halfeditIndex(editIndex, positions);
	        }
	        editIndex = index;
	        if (editIndex < editMarkers.countBillboards()) {
	          editMarkers.getBillboard(editIndex).position = halfeditIndex(editIndex, positions);
	        }
	      }
	      function halfeditIndex(index, positions) {
	        var position1 = calculateHalfMarkerPosition(index);
	        var coord = ellipsoid.cartesianToCartographic(position1);
	        var cartographic = new Engine.Cartographic(coord.longitude, coord.latitude, ellipsoid.cartesianToCartographic(positions[0]).height);
	        var postion2 = ellipsoid.cartographicToCartesian(cartographic);
	        return postion2;
	      }
	      function onEdited() {
	        _self.executeListeners({
	          name: "onEdited",
	          positions: _self.positions
	        });
	        drawHelper.fire("edited", {
	          entity: _self,
	          positions: _self.positions
	        });
	      }
	      function calculateHalfMarkerPosition(index) {
	        var positions = _self.positions;
	        return ellipsoid.cartographicToCartesian(new Engine.EllipsoidGeodesic(ellipsoid.cartesianToCartographic(positions[index]), ellipsoid.cartesianToCartographic(positions[index < positions.length - 1 ? index + 1 : 0])).interpolateUsingFraction(0.5));
	      }
	    };

	    var originalWidth = this.width;

	    polyline.setHighlighted = function (highlighted) {
	      // disable if already in edit mode
	      if (this._editMode === true) {
	        return;
	      }
	      if (highlighted) {
	        drawHelper.setHighlighted(this);
	        this.setWidth(originalWidth * 2);
	      } else {
	        this.setWidth(originalWidth);
	      }
	    };

	    polyline.getExtent = function () {
	      return Engine.Extent.fromCartographicArray(ellipsoid.cartesianArrayToCartographicArray(this.positions));
	    };

	    (0, _util.enhanceWithListeners)(polyline);

	    polyline.setEditMode(false);
	  };
	};

	exports.default = Polyline;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ChangeablePrimitive = __webpack_require__(8);

	var _ChangeablePrimitive2 = _interopRequireDefault(_ChangeablePrimitive);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function GroundPolyline(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultPolylineOptions);
	  options.type = options.type || _Types2.default.GROUND_POLYLINE;
	  options.onterrain = options.onterrain || true;
	  this.initialiseOptions(options);
	}

	GroundPolyline.prototype = new _ChangeablePrimitive2.default();

	GroundPolyline.prototype.setPositions = function (positions) {
	  this.setAttribute("positions", positions);
	};

	GroundPolyline.prototype.setWidth = function (width) {
	  this.setAttribute("width", width);
	};

	GroundPolyline.prototype.setGeodesic = function (geodesic) {
	  this.setAttribute("geodesic", geodesic);
	};

	GroundPolyline.prototype.getPositions = function () {
	  return this.getAttribute("positions");
	};

	GroundPolyline.prototype.getWidth = function () {
	  return this.getAttribute("width");
	};

	GroundPolyline.prototype.getGeodesic = function () {
	  return this.getAttribute("geodesic");
	};
	GroundPolyline.prototype.getGeometry = function () {
	  if (!Engine.defined(this.positions) || this.positions.length < 2) {
	    return;
	  }

	  return new Engine.GroundPolylineGeometry({
	    positions: this.positions,
	    width: this.width < 1 ? 1 : this.width,
	    granularity: 999.0,
	    loop: false
	  });
	};
	exports.default = GroundPolyline;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ChangeablePrimitive2 = __webpack_require__(8);

	var _ChangeablePrimitive3 = _interopRequireDefault(_ChangeablePrimitive2);

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CirclePrimitive = function (_ChangeablePrimitive) {
	  _inherits(CirclePrimitive, _ChangeablePrimitive);

	  function CirclePrimitive(options) {
	    _classCallCheck(this, CirclePrimitive);

	    var _this = _possibleConstructorReturn(this, (CirclePrimitive.__proto__ || Object.getPrototypeOf(CirclePrimitive)).call(this, options));

	    if (!(Engine.defined(options.center) && Engine.defined(options.radius))) {
	      throw new Engine.DeveloperError("Center and radius are required");
	    }
	    options = (0, _util.copyOptions)(options, _config.defaultSurfaceOptions);
	    options.type = _Types2.default.CIRCLE;
	    _this.initialiseOptions(options);
	    _this.setRadius(options.radius);
	    return _this;
	  }

	  _createClass(CirclePrimitive, [{
	    key: "setCenter",
	    value: function setCenter(center) {
	      this.setAttribute("center", center);
	    }
	  }, {
	    key: "setRadius",
	    value: function setRadius(radius) {
	      this.setAttribute("radius", Math.max(0.1, radius));
	    }
	  }, {
	    key: "getCenter",
	    value: function getCenter() {
	      return this.getAttribute("center");
	    }
	  }, {
	    key: "getRadius",
	    value: function getRadius() {
	      return this.getAttribute("radius");
	    }
	  }, {
	    key: "getGeometry",
	    value: function getGeometry() {
	      if (!(Engine.defined(this.center) && Engine.defined(this.radius))) {
	        return;
	      }

	      return new Engine.CircleGeometry({
	        center: this.center,
	        radius: this.radius,
	        height: this.height,
	        vertexFormat: Engine.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
	        stRotation: this.textureRotationAngle,
	        ellipsoid: this.ellipsoid,
	        granularity: this.granularity
	      });
	    }
	  }, {
	    key: "getOutlineGeometry",
	    value: function getOutlineGeometry() {
	      return new Engine.CircleOutlineGeometry({
	        center: this.getCenter(),
	        radius: this.getRadius()
	      });
	    }
	  }]);

	  return CirclePrimitive;
	}(_ChangeablePrimitive3.default);

	exports.default = CirclePrimitive;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ChangeablePrimitive = __webpack_require__(8);

	var _ChangeablePrimitive2 = _interopRequireDefault(_ChangeablePrimitive);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ellipsoid = Engine.Ellipsoid.WGS84;
	function Wall(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultWallOptions);
	  options.type = _Types2.default.WALL;
	  this.initialiseOptions(options);
	}

	Wall.prototype = new _ChangeablePrimitive2.default();

	Wall.prototype.setPositions = function (positions) {
	  this.setAttribute("positions", positions);
	};

	Wall.prototype.setWidth = function (width) {
	  this.setAttribute("width", width);
	};

	Wall.prototype.setGeodesic = function (geodesic) {
	  this.setAttribute("geodesic", geodesic);
	};

	Wall.prototype.getPositions = function () {
	  return this.getAttribute("positions");
	};

	Wall.prototype.getWidth = function () {
	  return this.getAttribute("width");
	};

	Wall.prototype.getGeodesic = function () {
	  return this.getAttribute("geodesic");
	};

	Wall.prototype.getGeometry = function () {
	  if (!Engine.defined(this.positions) || this.positions.length < 2) {
	    return;
	  }
	  var maximumHeights = [];
	  var minimumHeights = [];
	  for (var i in this.positions) {
	    maximumHeights.push(this.height);
	    minimumHeights.push(0);
	  }
	  return new Engine.WallGeometry({
	    positions: this.positions,
	    maximumHeights: maximumHeights,
	    minimumHeights: minimumHeights,
	    // vertexFormat: Engine.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
	    ellipsoid: this.ellipsoid,
	    granularity: this.granularity
	  });
	};
	Wall.enhance = function (_ref) {
	  var removeObj = _ref.removeObj,
	      drawHelper = _ref.drawHelper;

	  Wall.prototype.setEditable = function () {
	    if (this.setEditMode) {
	      return;
	    }
	    var wall = this;
	    wall.asynchronous = false;
	    drawHelper.registerEditableShape(wall);
	    wall.setEditMode = function (editMode) {
	      if (this._editMode === editMode) {
	        return;
	      }
	      drawHelper.disableAllHighlights();
	      if (editMode) {
	        drawHelper.setEdited(this);
	        var scene = drawHelper._scene;
	        var _self = this;
	        if (this._markers == null) {
	          var cross;
	          var markers = new _BillboardGroup2.default(drawHelper, _config.dragBillboard);
	          removeObj.billBoard.push(markers);
	          var editMarkers = new _BillboardGroup2.default(drawHelper, _config.SPLITLINEBillboard);
	          removeObj.billBoard.push(editMarkers);
	          var heightMarkers = new _BillboardGroup2.default(drawHelper, _config.dragBillboard);
	          removeObj.billBoard.push(heightMarkers);
	          var handleMarkerChanges = {
	            dragHandlers: {
	              onDrag: function onDrag(index, position) {
	                _self.positions[index] = position;
	                updateHalfMarkers(index, _self.positions);
	                updateHeightMarkers(index, _self.positions);
	                var coord = ellipsoid.cartesianToCartographic(_self.positions[0]);
	                var coord3 = ellipsoid.cartographicToCartesian(new Engine.Cartographic(coord.longitude, coord.latitude, 10000));
	                updateCross(_self.positions, coord3);
	                _self._createPrimitive = true;
	              },
	              onDragEnd: function onDragEnd(index, position) {
	                _self._createPrimitive = true;
	                onEdited();
	              }
	            },
	            onDoubleClick: function onDoubleClick(index) {
	              if (_self.positions.length < 4) {
	                return;
	              }
	              _self.positions.splice(index, 1);
	              _self._createPrimitive = true;
	              markers.removeBillboard(index);
	              editMarkers.removeBillboard(index);
	              updateHalfMarkers(index, _self.positions);
	              updateHeightMarkers(index, _self.positions);
	              onEdited();
	            },
	            tooltip: function tooltip() {
	              if (_self.positions.length > 1) {
	                document.body.style.cursor = "move";
	                return "拖拽修改坐标";
	              }
	            }
	          };
	          markers.addBillboards(_self.positions, handleMarkerChanges);

	          this._markers = markers;

	          var halfPositions = [];
	          var index = 0;
	          var length = _self.positions.length + (this.isPolygon ? 0 : -1);
	          for (; index < length; index++) {
	            halfPositions.push(calculateHalfMarkerPosition(index));
	          }
	          cross = new Engine.Cartesian3();
	          var AB = new Engine.Cartesian3(_self.positions[0].x - halfPositions[0].x, _self.positions[0].y - halfPositions[0].y, _self.positions[0].z - halfPositions[0].z);
	          var AC = new Engine.Cartesian3(_self.positions[1].x - halfPositions[0].x, _self.positions[1].y - halfPositions[0].y, _self.positions[1].z - halfPositions[0].z);
	          var halfcross = Engine.Cartesian3.cross(AB, AC, cross);
	          Engine.Cartesian3.normalize(halfcross, cross);
	          /* if (cross.x < 0) {
	            halfcross = Engine.Cartesian3.cross(AC, AB, cross);
	            Engine.Cartesian3.normalize(halfcross, cross);
	          } */
	          var handleEditMarkerChanges = {
	            dragHandlers: {
	              onDragStart: function onDragStart(index, position) {},
	              onDrag: function onDrag(index, position) {
	                var coord = ellipsoid.cartesianToCartographic(position);

	                var MovePoint0 = new Engine.Cartesian3((_self.positions[0].x + _self.positions[1].x) / 2, (_self.positions[0].y + _self.positions[1].y) / 2, (_self.positions[0].z + _self.positions[1].z) / 2);
	                var lngDelta = coord.longitude - ellipsoid.cartesianToCartographic(MovePoint0).longitude;
	                var latDelta = coord.latitude - ellipsoid.cartesianToCartographic(MovePoint0).latitude;
	                var cartographic0 = new Engine.Cartographic(ellipsoid.cartesianToCartographic(_self.positions[0]).longitude + lngDelta, ellipsoid.cartesianToCartographic(_self.positions[0]).latitude + latDelta, 0);
	                var cartographic1 = new Engine.Cartographic(ellipsoid.cartesianToCartographic(_self.positions[1]).longitude + lngDelta, ellipsoid.cartesianToCartographic(_self.positions[1]).latitude + latDelta, 0);
	                _self.positions[0] = ellipsoid.cartographicToCartesian(cartographic0);
	                _self.positions[1] = ellipsoid.cartographicToCartesian(cartographic1);
	                updateHeightMarkers(index, _self.positions);
	                markers.updateBillboardsPositions(_self.positions);
	                _self._createPrimitive = true;
	              },
	              onDragEnd: function onDragEnd(index, position) {
	                onEdited();
	              }
	            },
	            tooltip: function tooltip() {
	              document.body.style.cursor = "move";
	              return "拖拽平移墙体位置";
	            }
	          };
	          // todo
	          editMarkers.addBillboards(halfPositions, handleEditMarkerChanges, false, true, cross);

	          this._editMarkers = editMarkers;

	          var heightPositions = [];
	          var indexheight = 0;
	          for (; indexheight < 2; indexheight++) {
	            heightPositions.push(calculateHeightMarkerPosition(indexheight));
	          }
	          var handleHeightMarkerChanges = {
	            dragHandlers: {
	              onDrag: function onDrag(index, position) {
	                var cartoLoc = Engine.Cartographic.fromCartesian(position);
	                wall.height = [new Engine.ConstantProperty(cartoLoc.height)] / 1;
	                if (index === 1 ? 1 : index = 1) {
	                  updateHeightMarkers(index, position);
	                }
	                updateHalfMarkers(index, position);
	              },
	              onDragEnd: function onDragEnd(index, position) {
	                onEdited();
	              }
	            },
	            tooltip: function tooltip() {
	              if (_self.positions.length > 1) {
	                document.body.style.cursor = "n-resize";
	                return "拖拽修改高度";
	              }
	            }
	          };
	          heightMarkers.addBillboards(heightPositions, handleHeightMarkerChanges, true);
	          this._heightMarkers = heightMarkers;
	          // add a handler for clicking in the globe
	          this._globeClickhandler = new Engine.ScreenSpaceEventHandler(scene.canvas);
	          this._globeClickhandler.setInputAction(function (movement) {
	            var pickedObject = scene.pick(movement.position);
	            if (!(pickedObject && pickedObject.primitive)) {
	              _self.setEditMode(false);
	            }
	          }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	          markers.setOnTop();
	          editMarkers.setOnTop();
	        }
	        this._editMode = true;
	      } else {
	        if (this._markers != null) {
	          this._markers.remove();
	          this._editMarkers.remove();
	          this._heightMarkers.remove();
	          this._markers = null;
	          this._editMarkers = null;
	          this._heightMarkers = null;
	          this._globeClickhandler.destroy();
	        }
	        this._editMode = false;
	      }
	      function updateHalfMarkers(index, positions) {
	        var editIndex = index - 1 < 0 ? positions.length - 1 : index - 1;
	        if (editIndex < editMarkers.countBillboards()) {
	          editMarkers.getBillboard(editIndex).position = calculateHalfMarkerPosition(editIndex);
	        }
	        editIndex = index;
	        if (editIndex < editMarkers.countBillboards()) {
	          editMarkers.getBillboard(editIndex).position = calculateHalfMarkerPosition(editIndex);
	        }
	      }
	      function updateCross(positions, coord) {
	        var AB = new Engine.Cartesian3(positions[0].x - positions[1].x, positions[0].y - positions[1].y, positions[0].z - positions[1].z);
	        var AC = new Engine.Cartesian3(positions[0].x - coord.x, positions[0].y - coord.y, positions[0].z - coord.z);
	        var halfcross = Engine.Cartesian3.cross(AB, AC, cross);
	        Engine.Cartesian3.normalize(halfcross, cross);
	        /* if (cross.x < 0) {
	          halfcross = Engine.Cartesian3.cross(AC, AB, cross);
	          Engine.Cartesian3.normalize(halfcross, cross);
	        } */
	      }
	      function updateHeightMarkers(index, positions) {
	        var editIndex = index - 1 < 0 ? positions.length - 1 : index - 1;
	        if (editIndex < heightMarkers.countBillboards()) {
	          heightMarkers.getBillboard(editIndex).position = calculateHeightMarkerPosition(editIndex);
	        }
	        editIndex = index;
	        if (editIndex < heightMarkers.countBillboards()) {
	          heightMarkers.getBillboard(editIndex).position = calculateHeightMarkerPosition(editIndex);
	        }
	      }
	      function onEdited() {
	        _self.executeListeners({
	          name: "onEdited",
	          positions: _self.positions,
	          height: wall.height
	        });
	        drawHelper.fire("edited", {
	          entity: _self,
	          positions: _self.positions,
	          height: wall.height
	        });
	      }
	      function calculateHalfMarkerPosition(index) {
	        var positions = _self.positions;
	        var coord = ellipsoid.cartographicToCartesian(new Engine.EllipsoidGeodesic(ellipsoid.cartesianToCartographic(positions[index]), ellipsoid.cartesianToCartographic(positions[index < positions.length - 1 ? index + 1 : 0])).interpolateUsingFraction(0.5));
	        return ellipsoid.cartographicToCartesian(new Engine.Cartographic(ellipsoid.cartesianToCartographic(coord).longitude, ellipsoid.cartesianToCartographic(coord).latitude, wall.height));
	      }
	      function calculateHeightMarkerPosition(index) {
	        var positions = _self.positions;
	        return ellipsoid.cartographicToCartesian(new Engine.Cartographic(ellipsoid.cartesianToCartographic(positions[index]).longitude, ellipsoid.cartesianToCartographic(positions[index]).latitude, wall.height));
	      }
	    };

	    var originalWidth = this.width;

	    wall.setHighlighted = function (highlighted) {
	      // disable if already in edit mode
	      if (this._editMode === true) {
	        return;
	      }
	      if (highlighted) {
	        drawHelper.setHighlighted(this);
	        this.setWidth(originalWidth * 2);
	      } else {
	        this.setWidth(originalWidth);
	      }
	    };

	    wall.getExtent = function () {
	      return Engine.Extent.fromCartographicArray(ellipsoid.cartesianArrayToCartographicArray(this.positions));
	    };

	    (0, _util.enhanceWithListeners)(wall);

	    wall.setEditMode(false);
	  };
	};
	exports.default = Wall;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ChangeablePrimitive = __webpack_require__(8);

	var _ChangeablePrimitive2 = _interopRequireDefault(_ChangeablePrimitive);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	var _Plots = __webpack_require__(10);

	var _Plots2 = _interopRequireDefault(_Plots);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Flood(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultSurfaceOptions);
	  options.type = options.type || _Types2.default.FLOOD;
	  this.initialiseOptions(options);
	}

	Flood.prototype = new _ChangeablePrimitive2.default();

	Flood.prototype.setPositions = function (positions) {
	  this.setAttribute("positions", positions);
	};

	Flood.prototype.getPositions = function () {
	  return this.getAttribute("positions");
	};

	Flood.prototype.setCustom = function () {
	  this.setAttribute("custom");
	};

	Flood.prototype.getCustom = function () {
	  return this.getAttribute("custom");
	};

	Flood.prototype.getGeometry = function () {
	  if (!Engine.defined(this.positions) || this.positions.length < 3) {
	    return;
	  }
	  return Engine.PolygonGeometry.fromPositions({
	    positions: this.positions,
	    height: this.height,
	    vertexFormat: Engine.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
	    stRotation: this.textureRotationAngle,
	    ellipsoid: this.ellipsoid,
	    granularity: this.granularity
	  });
	};

	Flood.prototype.getOutlineGeometry = function () {
	  return Engine.PolygonOutlineGeometry.fromPositions({
	    positions: this.getPositions()
	  });
	};
	Flood.enhance = function (_ref) {
	  var removeObj = _ref.removeObj,
	      drawHelper = _ref.drawHelper,
	      setEditMode = _ref.setEditMode,
	      setHighlighted = _ref.setHighlighted;

	  Flood.prototype.setEditable = function () {
	    var polygon = this;
	    polygon.asynchronous = false;
	    var scene = drawHelper._scene;
	    var plot = _Plots2.default[polygon.type];
	    //  var minPoints = plot.minPoints;
	    drawHelper.registerEditableShape(polygon);
	    polygon.setEditMode = polygon.type === _Types2.default.FLOOD ? setEditMode : function (editMode) {
	      if (this._editMode === editMode) {
	        return;
	      }
	      drawHelper.disableAllHighlights();
	      if (editMode) {
	        drawHelper.setEdited(this);
	        if (this._markers == null) {
	          var markers = new _BillboardGroup2.default(drawHelper, _config.dragBillboard);
	          removeObj.billBoard.push(markers);
	          var handleMarkerChanges;
	          handleMarkerChanges = {
	            dragHandlers: {
	              onDrag: function onDrag(index, position) {
	                var controlPoints = polygon.custom;
	                controlPoints[index] = (0, _util.mousePositionToCartesian3)(position);
	                var doubleArrowResult = plot.algorithm(controlPoints);
	                polygon.positions = doubleArrowResult.polygonalPoint; // positions
	                polygon.custom = doubleArrowResult.controlPoint;
	                polygon._createPrimitive = true;
	                markers.updateBillboardsPositions((0, _util.positionToCartesian3)(polygon.custom));
	              },
	              onDragEnd: function onDragEnd(index, position) {
	                onEdited();
	              }
	            },
	            tooltip: function tooltip() {
	              return "拖动以改变形状";
	            }
	          };
	          var controlPoint = polygon.custom;
	          markers.addBillboards((0, _util.positionToCartesian3)(controlPoint), handleMarkerChanges);
	        }
	        this._markers = markers;
	        this._globeClickhandler = new Engine.ScreenSpaceEventHandler(scene.canvas);
	        this._globeClickhandler.setInputAction(function (movement) {
	          var pickedObject = scene.pick(movement.position);
	          if (!(pickedObject && pickedObject.primitive)) {
	            polygon.setEditMode(false);
	          }
	        }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	        markers.setOnTop();
	        this._editMode = true;
	      } else {
	        if (this._markers != null) {
	          this._markers.remove();
	          this._markers = null;
	          this._globeClickhandler.destroy();
	        }
	        this._editMode = false;
	      }
	    };

	    polygon.setHighlighted = setHighlighted;

	    (0, _util.enhanceWithListeners)(polygon);

	    polygon.setEditMode(false);

	    function onEdited() {
	      polygon.executeListeners({
	        name: "onEdited",
	        positions: polygon.positions
	      });
	    }
	  };
	};

	exports.default = Flood;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _ChangeablePrimitive = __webpack_require__(8);

	var _ChangeablePrimitive2 = _interopRequireDefault(_ChangeablePrimitive);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Angle(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultPolylineOptions);
	  options.type = options.type || _Types2.default.ANGLE;
	  options.onterrain = options.onterrain || false;
	  options.computed = options.computed || false;
	  this.initialiseOptions(options);
	}

	Angle.prototype = new _ChangeablePrimitive2.default();

	Angle.prototype.setPositions = function (positions) {
	  this.setAttribute("positions", positions);
	};

	Angle.prototype.setWidth = function (width) {
	  this.setAttribute("width", width);
	};

	Angle.prototype.setGeodesic = function (geodesic) {
	  this.setAttribute("geodesic", geodesic);
	};

	Angle.prototype.getPositions = function () {
	  return this.getAttribute("positions");
	};

	Angle.prototype.getWidth = function () {
	  return this.getAttribute("width");
	};

	Angle.prototype.getGeodesic = function () {
	  return this.getAttribute("geodesic");
	};

	Angle.prototype.getGeometry = function () {
	  if (!Engine.defined(this.positions) || this.positions.length < 2) {
	    return;
	  }

	  return new Engine.PolylineGeometry({
	    positions: this.positions,
	    height: this.height,
	    width: this.width < 1 ? 1 : this.width,
	    vertexFormat: Engine.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
	    ellipsoid: this.ellipsoid
	  });
	};

	exports.default = Angle;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = enhancePrimitives;

	var _util = __webpack_require__(3);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _config = __webpack_require__(5);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	var _Plots = __webpack_require__(10);

	var _Plots2 = _interopRequireDefault(_Plots);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ellipsoid = Engine.Ellipsoid.WGS84;

	function getArrowCorners(value) {
	  return [value[7], value[3]];
	}

	function enhancePrimitives(_ref) {
	  var removeObj = _ref.removeObj,
	      DrawHelper = _ref.DrawHelper;

	  var drawHelper = this;
	  DrawHelper.PolylinePrimitive.enhance({ removeObj: removeObj, DrawHelper: DrawHelper, drawHelper: drawHelper });
	  function setHighlighted(highlighted) {
	    // if no change
	    // if already highlighted, the outline polygon will be available
	    if (this._highlighted && this._highlighted === highlighted) {
	      return;
	    }
	    // disable if already in edit mode
	    if (this._editMode === true) {
	      return;
	    }
	    this._highlighted = highlighted;
	    // highlight by creating an outline polygon matching the polygon points
	    if (highlighted) {
	      // make sure all other shapes are not highlighted
	      drawHelper.setHighlighted(this);
	      this._strokeColor = this.strokeColor;
	      this.setStrokeStyle(Engine.Color.fromCssColorString("white"), this.strokeWidth);
	    } else {
	      if (this._strokeColor) {
	        this.setStrokeStyle(this._strokeColor, this.strokeWidth);
	      } else {
	        this.setStrokeStyle(undefined, undefined);
	      }
	    }
	  }

	  function setEditMode(editMode) {
	    // if no change
	    if (this._editMode === editMode) {
	      return;
	    }
	    // make sure all other shapes are not in edit mode before starting the editing of this shape
	    drawHelper.disableAllHighlights();
	    // display markers
	    if (editMode) {
	      drawHelper.setEdited(this);
	      var scene = drawHelper._scene;
	      var _self = this;
	      // create the markers and handlers for the editing
	      if (this._markers == null) {
	        var markers = new _BillboardGroup2.default(drawHelper, _config.dragBillboard);
	        removeObj.billBoard.push(markers);
	        var editMarkers = new _BillboardGroup2.default(drawHelper, _config.dragHalfBillboard);
	        removeObj.billBoard.push(editMarkers);

	        var handleMarkerChanges = {
	          dragHandlers: {
	            onDrag: function onDrag(index, position) {
	              _self.positions[index] = position;
	              updateHalfMarkers(index, _self.positions);
	              _self._createPrimitive = true;
	              drawHelper.fire("changed", {
	                entity: _self,
	                positions: _self.positions
	              });
	            },
	            onDragEnd: function onDragEnd(index, position) {
	              _self._createPrimitive = true;
	              onEdited();
	            }
	          },
	          onDoubleClick: function onDoubleClick(index) {
	            if (_self.positions.length < 4) {
	              return;
	            }
	            // remove the point and the corresponding markers
	            _self.positions.splice(index, 1);
	            _self._createPrimitive = true;
	            markers.removeBillboard(index);
	            editMarkers.removeBillboard(index);
	            updateHalfMarkers(index, _self.positions);
	            onEdited();
	          },
	          tooltip: function tooltip() {
	            if (_self.positions.length > 1) {
	              return "拖拽修改坐标";
	            }
	          }
	        };
	        // add billboards and keep an ordered list of them for the polygon edges
	        markers.addBillboards(_self.positions, handleMarkerChanges);

	        this._markers = markers;

	        var halfPositions = [];
	        var index = 0;
	        var length = _self.positions.length + (this.isPolygon ? 0 : -1);
	        for (; index < length; index++) {
	          halfPositions.push(calculateHalfMarkerPosition(index));
	        }
	        var handleEditMarkerChanges = {
	          dragHandlers: {
	            onDragStart: function onDragStart(index, position) {
	              // add a new position to the polygon but not a new marker yet
	              this.index = index + 1;
	              _self.positions.splice(this.index, 0, position);
	              _self._createPrimitive = true;
	            },
	            onDrag: function onDrag(index, position) {
	              _self.positions[this.index] = position;
	              _self._createPrimitive = true;
	              drawHelper.fire("changed", {
	                entity: _self,
	                positions: _self.positions
	              });
	            },
	            onDragEnd: function onDragEnd(index, position) {
	              // create new sets of makers for editing
	              markers.insertBillboard(this.index, position, handleMarkerChanges);
	              editMarkers.getBillboard(this.index - 1).position = calculateHalfMarkerPosition(this.index - 1);
	              editMarkers.insertBillboard(this.index, calculateHalfMarkerPosition(this.index), handleEditMarkerChanges);
	              _self._createPrimitive = true;
	              onEdited();
	            }
	          },
	          tooltip: function tooltip() {
	            return "拖拽创建新的节点";
	          }
	        };
	        editMarkers.addBillboards(halfPositions, handleEditMarkerChanges);
	        this._editMarkers = editMarkers;
	        // add a handler for clicking in the globe
	        this._globeClickhandler = new Engine.ScreenSpaceEventHandler(scene.canvas);
	        this._globeClickhandler.setInputAction(function (movement) {
	          var pickedObject = scene.pick(movement.position);
	          if (!(pickedObject && pickedObject.primitive)) {
	            _self.setEditMode(false);
	          }
	        }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	        // set on top of the polygon
	        markers.setOnTop();
	        editMarkers.setOnTop();
	      }
	      this._editMode = true;
	    } else {
	      if (this._markers != null) {
	        this._markers.remove();
	        this._editMarkers.remove();
	        this._markers = null;
	        this._editMarkers = null;
	        this._globeClickhandler.destroy();
	      }
	      this._editMode = false;
	    }
	    // function for updating the edit markers around a certain point
	    function updateHalfMarkers(index, positions) {
	      // update the half markers before and after the index
	      var editIndex = index - 1 < 0 ? positions.length - 1 : index - 1;
	      if (editIndex < editMarkers.countBillboards()) {
	        editMarkers.getBillboard(editIndex).position = calculateHalfMarkerPosition(editIndex);
	      }
	      editIndex = index;
	      if (editIndex < editMarkers.countBillboards()) {
	        editMarkers.getBillboard(editIndex).position = calculateHalfMarkerPosition(editIndex);
	      }
	    }
	    function onEdited() {
	      _self.executeListeners({
	        name: "onEdited",
	        positions: _self.positions
	      });
	      drawHelper.fire("edited", {
	        entity: _self,
	        positions: _self.positions
	      });
	    }
	    function calculateHalfMarkerPosition(index) {
	      var positions = _self.positions;
	      return ellipsoid.cartographicToCartesian(new Engine.EllipsoidGeodesic(ellipsoid.cartesianToCartographic(positions[index]), ellipsoid.cartesianToCartographic(positions[index < positions.length - 1 ? index + 1 : 0])).interpolateUsingFraction(0.5));
	    }
	  }

	  // DrawHelper.PolylinePrimitive.prototype.

	  DrawHelper.PolygonPrimitive.enhance({
	    removeObj: removeObj,
	    DrawHelper: DrawHelper,
	    drawHelper: drawHelper,
	    setEditMode: setEditMode,
	    setHighlighted: setHighlighted
	  });

	  DrawHelper.FloodPrimitive.enhance({
	    removeObj: removeObj,
	    DrawHelper: DrawHelper,
	    drawHelper: drawHelper,
	    setEditMode: setEditMode,
	    setHighlighted: setHighlighted
	  });
	  DrawHelper.RectPrimitive.enhance({
	    removeObj: removeObj,
	    drawHelper: drawHelper
	  });
	  DrawHelper.WallPrimitive.enhance({
	    removeObj: removeObj,
	    DrawHelper: DrawHelper,
	    drawHelper: drawHelper,
	    setEditMode: setEditMode,
	    setHighlighted: setHighlighted
	  });
	  DrawHelper.CirclePrimitive.prototype.getCircleCartesianCoordinates = function (granularity) {
	    var geometry = Engine.CircleOutlineGeometry.createGeometry(new Engine.CircleOutlineGeometry({
	      ellipsoid: ellipsoid,
	      center: this.getCenter(),
	      radius: this.getRadius(),
	      granularity: granularity
	    }));
	    var value = void 0;
	    var values = [];
	    for (var count = 0; count < geometry.attributes.position.values.length; count += 3) {
	      value = geometry.attributes.position.values;
	      values.push(new Engine.Cartesian3(value[count], value[count + 1], value[count + 2]));
	    }
	    return values;
	  };

	  DrawHelper.CirclePrimitive.prototype.setEditable = function () {
	    if (this.setEditMode) {
	      return;
	    }

	    var circle = this;
	    var scene = drawHelper._scene;

	    circle.asynchronous = false;

	    drawHelper.registerEditableShape(circle);

	    circle.setEditMode = function (editMode) {
	      // if no change
	      if (this._editMode === editMode) {
	        return;
	      }
	      drawHelper.disableAllHighlights();
	      // display markers
	      if (editMode) {
	        // make sure all other shapes are not in edit mode before starting the editing of this shape
	        drawHelper.setEdited(this);
	        var _self = this;
	        // create the markers and handlers for the editing
	        if (this._markers == null) {
	          var markers = new _BillboardGroup2.default(drawHelper, _config.dragBillboard);

	          var getMarkerPositions = function getMarkerPositions() {
	            return _self.getCircleCartesianCoordinates(Engine.Math.PI_OVER_TWO);
	          };

	          var onEdited = function onEdited() {
	            circle.executeListeners({
	              name: "onEdited",
	              center: circle.getCenter(),
	              radius: circle.getRadius()
	            });
	            drawHelper.fire("edited", {
	              entity: _self,
	              center: circle.getCenter(),
	              radius: circle.getRadius()
	            });
	          };
	          var handleMarkerChanges = {
	            dragHandlers: {
	              onDrag: function onDrag(index, position) {
	                circle.setRadius(Engine.Cartesian3.distance(circle.getCenter(), position));
	                markers.updateBillboardsPositions(getMarkerPositions());
	                drawHelper.fire("changed", {
	                  entity: _self,
	                  center: circle.getCenter(),
	                  radius: circle.getRadius()
	                });
	              },
	              onDragEnd: function onDragEnd(index, position) {
	                onEdited();
	              }
	            },
	            tooltip: function tooltip() {
	              return "拖动以更改半径";
	            }
	          };
	          markers.addBillboards(getMarkerPositions(), handleMarkerChanges);
	          this._markers = markers;
	          // add a handler for clicking in the globe
	          this._globeClickhandler = new Engine.ScreenSpaceEventHandler(scene.canvas);
	          this._globeClickhandler.setInputAction(function (movement) {
	            var pickedObject = scene.pick(movement.position);
	            if (!pickedObject) {
	              _self.setEditMode(false);
	            }
	          }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	          // set on top of the polygon
	          markers.setOnTop();
	        }
	        this._editMode = true;
	      } else {
	        if (this._markers != null) {
	          this._markers.remove();
	          this._markers = null;
	          if (this._globeClickhandler) this._globeClickhandler.destroy();
	        }
	        this._editMode = false;
	      }
	    };

	    circle.setHighlighted = setHighlighted;

	    (0, _util.enhanceWithListeners)(circle);

	    circle.setEditMode(false);
	  };
	}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _ChangeablePrimitive = __webpack_require__(8);

	var _ChangeablePrimitive2 = _interopRequireDefault(_ChangeablePrimitive);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	var _pickPosition = __webpack_require__(20);

	var _pickPosition2 = _interopRequireDefault(_pickPosition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ellipsoid = Engine.Ellipsoid.WGS84;
	function Rectangle(options) {
	    options = (0, _util.copyOptions)(options, _config.defaultRectangleOptions);
	    options.type = _Types2.default.RECTANFGLE;
	    this.initialiseOptions(options);
	    this.lastMousePos;
	    this._markers;
	    this._editMarkers;
	}

	Rectangle.prototype = new _ChangeablePrimitive2.default();

	Rectangle.prototype.setPositions = function (positions) {
	    this.setAttribute("positions", positions);
	};

	Rectangle.prototype.setWidth = function (width) {
	    this.setAttribute("width", width);
	};

	Rectangle.prototype.setGeodesic = function (geodesic) {
	    this.setAttribute("geodesic", geodesic);
	};

	Rectangle.prototype.getPositions = function () {
	    return this.getAttribute("positions");
	};

	Rectangle.prototype.getWidth = function () {
	    return this.getAttribute("width");
	};

	Rectangle.prototype.getGeodesic = function () {
	    return this.getAttribute("geodesic");
	};

	Rectangle.prototype.onDrag = function (position) {
	    var _self = this;
	    var scene = drawHelper._scene;
	    var position = (0, _pickPosition2.default)(scene, position);
	    var coord = Engine.Cartographic.fromCartesian(position);
	    var MovePoint0 = this.lastMousePos;
	    var lngDelta = coord.longitude - Engine.Cartographic.fromCartesian(MovePoint0).longitude;
	    var latDelta = coord.latitude - Engine.Cartographic.fromCartesian(MovePoint0).latitude;
	    _self.positions[0] = Engine.Cartesian3.fromRadians(ellipsoid.cartesianToCartographic(_self.positions[0]).longitude + lngDelta, ellipsoid.cartesianToCartographic(_self.positions[0]).latitude + latDelta, 0);
	    _self.positions[1] = Engine.Cartesian3.fromRadians(ellipsoid.cartesianToCartographic(_self.positions[1]).longitude + lngDelta, ellipsoid.cartesianToCartographic(_self.positions[1]).latitude + latDelta, 0);
	    var editPositions = [];
	    for (var index = 0; index < 2; index++) {
	        editPositions.push(changeXYPostions(_self.positions[index], _self.positions[Math.abs(index - 1)]));
	    }
	    this._markers.updateBillboardsPositions(_self.positions);
	    this._editMarkers.updateBillboardsPositions(editPositions);
	    _self._createPrimitive = true;
	    this.lastMousePos = position;
	    function changeXYPostions(point1, point2) {
	        var carto1 = Engine.Cartographic.fromCartesian(point1);
	        var carto2 = Engine.Cartographic.fromCartesian(point2);
	        var newPoint = Engine.Cartesian3.fromRadians(carto1.longitude, carto2.latitude, carto1.height);
	        return newPoint;
	    }
	};

	Rectangle.prototype.onDragStart = function (position) {
	    var _self = this;
	    var scene = drawHelper._scene;
	    var position = scene.camera.pickEllipsoid(position, ellipsoid);
	    this.lastMousePos = position;
	};

	Rectangle.prototype.onDragEnd = function (position) {};

	Rectangle.prototype.getGeometry = function () {
	    if (!Engine.defined(this.positions) || this.positions.length < 2) {
	        return;
	    }
	    var west = 0;
	    var south = 0;
	    var east = 0;
	    var north = 0;
	    var cartographic1 = GeoVis.Cartographic.fromCartesian(this.positions[0]);
	    var cartographic2 = GeoVis.Cartographic.fromCartesian(this.positions[1]);
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
	    return new Engine.RectangleGeometry({
	        rectangle: Engine.Rectangle.fromRadians(west, south, east, north),
	        rotation: this.rotation,
	        stRotation: this.rotation,
	        extrudedHeight: this.extrudedHeight,
	        height: this.height,
	        ellipsoid: this.ellipsoid
	    });
	};
	Rectangle.enhance = function (_ref) {
	    var removeObj = _ref.removeObj,
	        drawHelper = _ref.drawHelper;

	    Rectangle.prototype.setEditable = function () {
	        if (this.setEditMode) {
	            return;
	        }
	        var rectangle = this;
	        var proj = new GeoVis.WebMercatorProjection();
	        this._proj = proj;
	        rectangle.asynchronous = false;
	        drawHelper.registerEditableShape(rectangle);
	        var pictureXY = [];
	        if (rectangle.material && rectangle.material._textures && rectangle.material._textures.image) {
	            pictureXY.push(rectangle.material._textures.image._dimensions.x);
	            pictureXY.push(rectangle.material._textures.image._dimensions.y);
	        }
	        rectangle.setEditMode = function (editMode) {

	            if (this._editMode === editMode) {
	                return;
	            }
	            drawHelper.disableAllHighlights();

	            if (editMode) {
	                drawHelper.setEdited(this);
	                var _self = this;
	                var scene = drawHelper._scene;

	                if (this._markers == null) {
	                    var markers = new _BillboardGroup2.default(drawHelper, _config.dragBillboard);
	                    removeObj.billBoard.push(markers);

	                    var editMarkers = new _BillboardGroup2.default(drawHelper, _config.dragBillboard);
	                    removeObj.billBoard.push(editMarkers);

	                    /* var moveMarker = new BillboardGroup(drawHelper, dragBillboard);
	                    removeObj.billBoard.push(moveMarker); */

	                    var handleMarkerChanges = {
	                        dragHandlers: {
	                            onDrag: function onDrag(index, position) {
	                                if (pictureXY.length > 0) {
	                                    position = GetDeltaPoint(pictureXY, _self.positions[Math.abs(index - 1)], position);
	                                }
	                                _self.positions[index] = position;
	                                for (var index = 0; index < 2; index++) {
	                                    editPositions[index] = changeXYPostions(_self.positions[index], _self.positions[Math.abs(index - 1)]);
	                                }
	                                editMarkers.updateBillboardsPositions(editPositions);
	                                markers.updateBillboardsPositions(_self.positions);
	                                _self._createPrimitive = true;
	                                drawHelper.fire("changed", {
	                                    entity: _self,
	                                    positions: _self.positions
	                                });
	                            },
	                            onDragEnd: function onDragEnd(index, position) {
	                                _self._createPrimitive = true;
	                                onEdited();
	                            }
	                        },
	                        tooltip: function tooltip() {
	                            return "拖动以改变形状";
	                        }
	                    };

	                    markers.addBillboards(_self.positions, handleMarkerChanges);
	                    this._markers = markers;

	                    var editPositions = [];
	                    for (var index = 0; index < 2; index++) {
	                        editPositions.push(changeXYPostions(_self.positions[index], _self.positions[Math.abs(index - 1)]));
	                    }
	                    var handleEditMarkerChanges = {
	                        dragHandlers: {
	                            onDrag: function onDrag(index, position) {
	                                if (pictureXY.length > 0) {
	                                    position = GetDeltaPoint(pictureXY, editPositions[Math.abs(index - 1)], position);
	                                }
	                                editPositions[index] = position;
	                                _self.positions[Math.abs(index - 1)] = changeXYPostions(editPositions[Math.abs(index - 1)], position);
	                                _self.positions[index] = changeXYPostions(position, editPositions[Math.abs(index - 1)]);
	                                markers.updateBillboardsPositions(_self.positions);
	                                editMarkers.updateBillboardsPositions(editPositions);
	                                //updateMoveMarkers(index, _self.positions);
	                                _self._createPrimitive = true;
	                                drawHelper.fire("changed", {
	                                    entity: _self,
	                                    positions: _self.positions
	                                });
	                            },
	                            onDragEnd: function onDragEnd(index, position) {
	                                _self._createPrimitive = true;
	                                onEdited();
	                            }
	                        },
	                        tooltip: function tooltip() {
	                            return "拖动以改变形状";
	                        }
	                    };
	                    editMarkers.addBillboards(editPositions, handleEditMarkerChanges);
	                    this._editMarkers = editMarkers;

	                    this._globeClickhandler = new Engine.ScreenSpaceEventHandler(scene.canvas);
	                    this._globeClickhandler.setInputAction(function (movement) {
	                        var pickedObject = scene.pick(movement.position);

	                        if (!(pickedObject && pickedObject.primitive)) {
	                            rectangle.setEditMode(false);
	                        }
	                    }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	                    markers.setOnTop();
	                }
	                this._editMode = true;
	            } else {
	                if (this._markers != null) {
	                    this._markers.remove();
	                    this._editMarkers.remove();
	                    this._markers = null;
	                    this._editMarkers = null;
	                    this._globeClickhandler.destroy();
	                    this._proj = undefined;
	                }
	                this._editMode = false;
	            }

	            function changeXYPostions(point1, point2) {
	                var carto1 = Engine.Cartographic.fromCartesian(point1);
	                var carto2 = Engine.Cartographic.fromCartesian(point2);
	                var newPoint = Engine.Cartesian3.fromRadians(carto1.longitude, carto2.latitude, carto1.height);
	                return newPoint;
	            }
	            function GetDeltaPoint(pictureXY, point1, point2) {
	                var carto0 = Engine.Cartographic.fromCartesian(point1);
	                var proj0 = proj.project(carto0);
	                var carto1 = Engine.Cartographic.fromCartesian(point2);
	                var proj1 = proj.project(carto1);
	                if (carto1.latitude < carto0.latitude) {
	                    var latY = proj0.y - pictureXY[1] * Math.abs(proj1.x - proj0.x) / pictureXY[0];
	                } else {
	                    var latY = proj0.y + pictureXY[1] * Math.abs(proj1.x - proj0.x) / pictureXY[0];
	                }
	                var pointCart = proj.unproject(new GeoVis.Cartesian3(proj1.x, latY, proj1.z));
	                var cartesian1 = Engine.Cartesian3.fromRadians(pointCart.longitude, pointCart.latitude, 0);
	                if (carto1.longitude < carto0.longitude) {
	                    var lonX = proj0.x - pictureXY[0] * Math.abs(proj1.y - proj0.y) / pictureXY[1];
	                } else {
	                    var lonX = proj0.x + pictureXY[0] * Math.abs(proj1.y - proj0.y) / pictureXY[1];
	                }
	                var pointCart = proj.unproject(new GeoVis.Cartesian3(lonX, proj1.y, proj1.z));
	                var cartesian2 = Engine.Cartesian3.fromRadians(pointCart.longitude, pointCart.latitude, 0);
	                if (GeoVis.Cartesian3.distance(cartesian1, point1) >= GeoVis.Cartesian3.distance(cartesian2, point1)) {
	                    return cartesian1;
	                } else {
	                    return cartesian2;
	                }
	            }
	            function onEdited() {
	                rectangle.executeListeners({
	                    name: "onEdited",
	                    positions: rectangle.positions
	                });
	            }
	        };
	        var originalWidth = this.width;

	        rectangle.setHighlighted = function (highlighted) {
	            // disable if already in edit mode
	            if (this._editMode === true) {
	                return;
	            }
	            if (highlighted) {
	                drawHelper.setHighlighted(this);
	                this.setWidth(originalWidth * 2);
	            } else {
	                this.setWidth(originalWidth);
	            }
	        };

	        rectangle.getExtent = function () {
	            return Engine.Extent.fromCartographicArray(ellipsoid.cartesianArrayToCartographicArray(this.positions));
	        };

	        (0, _util.enhanceWithListeners)(rectangle);

	        rectangle.setEditMode(false);
	    };
	};

	exports.default = Rectangle;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = pickPosition;
	function pickPosition(scene, windowPos) {
	  // var cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
	  var ray = scene.camera.getPickRay(windowPos);
	  var cartesian = scene.globe.pick(ray, scene);

	  return cartesian;
	}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = startDrawingCircle;

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _Circle = __webpack_require__(14);

	var _Circle2 = _interopRequireDefault(_Circle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ellipsoid = Engine.Ellipsoid.WGS84;
	function startDrawingCircle(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultCircleOptions);
	  options.id = options.id || GeoVis.createGuid();
	  if (options.color) {
	    var material = Engine.Material.fromType(Engine.Material.RimLightingType);
	    material.uniforms.color = options.color;
	    options.material = material;
	  }
	  this.startDrawing(function cleanUp() {
	    if (circle != null) {
	      primitives.remove(circle);
	    }
	    markers.remove();
	    mouseHandler.destroy();
	    tooltip.setVisible(false);
	  });

	  var _self = this;
	  var scene = this._scene;
	  var primitives = this._primitives;
	  var tooltip = this._tooltip;

	  var circle = null;
	  var markers = null;
	  var positions = [];
	  var mouseHandler = new Engine.ScreenSpaceEventHandler(scene.canvas);

	  // Now wait for start
	  mouseHandler.setInputAction(function (movement) {
	    if (movement.position != null) {
	      var cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
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
	          markers = new _BillboardGroup2.default(_self, _config.defaultBillboard);
	          markers.addBillboards([cartesian]);
	        } else {
	          circle.setRadius(Engine.Cartesian3.distance(circle.getCenter(), cartesian));
	          _self.fire("changed", {
	            entity: circle,
	            center: circle.getCenter(),
	            radius: circle.getRadius()
	          });
	          markers.updateBillboardsPositions(cartesian);
	          finishDrawing(circle.getCenter(), circle.getRadius());
	          _self.stopDrawing();
	        }
	      }
	    }
	  }, Engine.ScreenSpaceEventType.LEFT_DOWN);

	  /*   mouseHandler.setInputAction(function(movement) {
	      var position = movement.endPosition;
	      if (position != null) {
	        if (circle == null) {
	          tooltip.showAt(position, "<p>点击开始圈选</p>");
	        } else {
	          var cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
	          if (cartesian) {
	            circle.setRadius(
	              Engine.Cartesian3.distance(circle.getCenter(), cartesian)
	            );
	            markers.updateBillboardsPositions(cartesian);
	            tooltip.showAt(
	              position,
	              "<p>圈选半径：" +
	                Math.floor(circle.getRadius() * 100) / 100 +
	                "米</p><p>再次点击结束</p>"
	            );
	            _self.fire("changed", {
	              entity: circle,
	              center: circle.getCenter(),
	              radius: circle.getRadius()
	            });
	          }
	        }
	      }
	    }, Engine.ScreenSpaceEventType.MOUSE_MOVE); */

	  function finishDrawing(center, radius) {
	    var circle = new _Circle2.default(_extends({}, options, {
	      center: center,
	      radius: radius
	    }));
	    circle.setEditable();
	    _self.primitives.add(circle);
	    _self.fire("created", {
	      entity: circle,
	      center: center,
	      radius: radius
	    });
	  }
	}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (options) {
	  options = (0, _util.copyOptions)(options, _config.defaultSurfaceOptions);
	  var finish = this.startDrawingPolyshape(true, options);
	  return finish;
	};

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (options) {
	  options = (0, _util.copyOptions)(options, _config.defaultPolylineOptions);
	  options.maxPoints = options.type === _Types2.default.SPLITLINE ? 2 : Infinity;
	  var finish = this.startDrawingPolyshape(false, options);
	  return finish;
	};

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (isPolygon, options) {
	  options = (0, _util.copyOptions)(options, _config.defaultPolylineOptions);
	  options.id = options.id || GeoVis.createGuid();
	  if (options.color) {
	    var material = Engine.Material.fromType(Engine.Material.ColorType);
	    material.uniforms.color = options.color;
	    options.material = material;
	  }
	  if (options.type === _Types2.default.SPACE_POLYLINE || options.type === _Types2.default.SPACE_POLYGON) {
	    options.followSurface = false;
	  }

	  var _self = this;
	  var scene = this._scene;
	  var primitives = this._primitives;
	  var groundPrimitives = this._groundPrimitives;
	  var tooltip = this._tooltip;

	  var minPoints = isPolygon ? 2 : 1;
	  var maxPoints = options.maxPoints || Infinity;

	  // var lastDepthAgainstTerrain = _self._earth.globe.depthTestAgainstTerrain;
	  this.startDrawing(function () {
	    primitives.remove(poly);
	    markers.remove();
	    mouseHandler.destroy();
	    tooltip.setVisible(false);
	    // _self._earth.globe.depthTestAgainstTerrain = lastDepthAgainstTerrain;
	  });

	  var poly;
	  if (isPolygon) {
	    poly = new _Polygon2.default(options);
	    poly.asynchronous = false;
	    primitives.add(poly);
	  } else {
	    if (options.type === _Types2.default.GROUND_POLYLINE) {
	      poly = new _GroundPolyline2.default(options);
	      poly.asynchronous = false;
	      groundPrimitives.add(poly);
	    } else {
	      poly = new _Polyline2.default(options);
	      poly.asynchronous = false;
	      primitives.add(poly);
	    }
	  }
	  var positions = [];
	  var markers = new _BillboardGroup2.default(this, _config.defaultBillboard);
	  var mouseHandler = new Engine.ScreenSpaceEventHandler(scene.canvas.parentNode);
	  markers.onmouseenter = function () {
	    document.body.style.cursor = "move";
	  };
	  // _self._earth.globe.depthTestAgainstTerrain = true;
	  // Now wait for start
	  var lastTime = new Date().getTime();
	  mouseHandler.setInputAction(function (movement) {
	    if (movement.position !== null) {
	      var currentTime = new Date().getTime();
	      var delta = currentTime - lastTime;
	      lastTime = currentTime;
	      var cartesian = getposition(scene, movement.position);
	      if (cartesian && delta > 300) {
	        // first click
	        /* if (positions.length === 0) {
	          positions.push(cartesian.clone());
	          markers.addBillboard(positions[0]);
	        } */
	        if (positions.length >= minPoints) {
	          poly.positions = positions;
	          poly._createPrimitive = true;
	        }
	        if (positions.length === maxPoints) {
	          finishDrawing(movement.position);
	          return;
	        }
	        positions.push(cartesian);
	        markers.addBillboard(cartesian);
	      }
	    }
	  }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	  /*   mouseHandler.setInputAction(function(movement) {
	      var position = movement.endPosition;
	      if (position !== null) {
	        if (positions.length === 0) {
	          // tooltip.showAt(position, "<p>点击创建第一个点</p>");
	        } else {
	          var cartesian = getposition(scene, movement.endPosition);
	          // const height = GeoVis.Cartographic.fromCartesian(cartesian).height;
	          if (options.type === Types.SPLITLINE) {
	            cartesian = heightAdd(cartesian);
	          }
	          if (cartesian) {
	            positions.pop();
	            // make sure it is slightly different
	            // cartesian.y += 1 + Math.random();
	            positions.push(cartesian);
	            if (positions.length >= minPoints) {
	              poly.positions = positions;
	              poly._createPrimitive = true;
	            }
	            // update marker
	            markers.getBillboard(positions.length - 1).position = cartesian;
	            // show tooltip
	            tooltip.showAt(
	              position,
	              "<p>点击创建新的点</p>" +
	                (positions.length > minPoints ? "<p>双击结束</p>" : "")
	            );
	            if (positions.length >= minPoints) {
	              _self.fire("changed", {
	                entity: poly,
	                positions: poly.positions
	              });
	            }
	          }
	        }
	      }
	    }, Engine.ScreenSpaceEventType.MOUSE_MOVE); */

	  mouseHandler.setInputAction(function (movement) {
	    /* positions.pop(); */
	    finishDrawing();
	  }, Engine.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

	  function heightAdd(cartesian1) {
	    var coord = ellipsoid.cartesianToCartographic(cartesian1);
	    var cartographic = new Engine.Cartographic(coord.longitude, coord.latitude, options.height * 50000);
	    var cartesian = ellipsoid.cartographicToCartesian(cartographic);
	    return cartesian;
	  }
	  function getposition(scene, position) {
	    var cartesian;
	    if (options.type === _Types2.default.SPACE_POLYLINE || options.type === _Types2.default.SPACE_POLYGON) {
	      // scene.globe.depthTestAgainstTerrain = true;
	      cartesian = scene.pickPosition(position);
	      // new GeoVis.Point(cartesian,{color:GeoVis.Color.RED,pixelSize:10}).addTo(earth.features)
	      // scene.globe.depthTestAgainstTerrain = false;
	    } else {
	      cartesian = (0, _pickPosition2.default)(scene, position);
	    }
	    return cartesian;
	  }

	  var finishDrawing = function finishDrawing() {
	    if (positions.length < minPoints) {} else {
	      // positions.pop();
	      _self.stopDrawing();
	      if (typeof options.callback === "function") {
	        options.callback(positions);
	      }
	      if (isPolygon) {
	        var polygon = new _Polygon2.default(_extends({}, options, {
	          positions: poly.positions,
	          custom: poly.positions,
	          material: options.material,
	          type: options.type
	        }));
	        _self.primitives.add(polygon);
	        polygon.setEditable();
	        _self.fire("created", {
	          entity: polygon,
	          positions: poly.positions
	        });
	      } else {
	        if (options.type === _Types2.default.GROUND_POLYLINE) {
	          var _polyline = new _GroundPolyline2.default(_extends({}, options, {
	            positions: poly.positions,
	            width: options.width,
	            material: options.material,
	            geodesic: true,
	            type: options.type
	          }));
	          _self.groundPrimitives.add(_polyline);
	          // polyline.setEditable(); //groundpolyLine没edit
	          _self.fire("created", {
	            entity: _polyline,
	            positions: poly.positions
	          });
	        } else {
	          var polyline = new _Polyline2.default(_extends({}, options, {
	            positions: poly.positions,
	            width: options.width,
	            material: options.material,
	            geodesic: true
	          }));
	          _self.primitives.add(polyline);
	          polyline.setEditable();
	          _self.fire("created", {
	            entity: polyline,
	            positions: poly.positions
	          });
	        }
	      }
	    }
	  };
	  return finishDrawing;
	};

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _Polygon = __webpack_require__(7);

	var _Polygon2 = _interopRequireDefault(_Polygon);

	var _Polyline = __webpack_require__(12);

	var _Polyline2 = _interopRequireDefault(_Polyline);

	var _GroundPolyline = __webpack_require__(13);

	var _GroundPolyline2 = _interopRequireDefault(_GroundPolyline);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	var _pickPosition = __webpack_require__(20);

	var _pickPosition2 = _interopRequireDefault(_pickPosition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ellipsoid = Engine.Ellipsoid.WGS84;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = startDrawingWall;

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _Wall = __webpack_require__(15);

	var _Wall2 = _interopRequireDefault(_Wall);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ellipsoid = Engine.Ellipsoid.WGS84;

	function startDrawingWall(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultWallOptions);
	  if (options.color) {
	    var material = Engine.Material.fromType(Engine.Material.ColorType);
	    material.uniforms.color = options.color;
	    options.material = material;
	  }
	  this.startDrawing(function () {
	    primitives.remove(poly);
	    markers.remove(); // 移除被选元素
	    mouseHandler.destroy(); // 销毁过程
	    tooltip.setVisible(false); // Cesium工具提示是否显示
	  });

	  var _self = this;
	  var scene = this._scene;
	  var primitives = this._primitives;
	  var tooltip = this._tooltip;

	  var markers = new _BillboardGroup2.default(this, _config.defaultBillboard);
	  var poly;
	  poly = new _Wall2.default(options);
	  poly.asynchronous = false;
	  primitives.add(poly);
	  var mouseHandler = new Engine.ScreenSpaceEventHandler(scene.canvas);
	  var positions = [];
	  // Now wait for start
	  mouseHandler.setInputAction(function (movement) {
	    if (movement.position != null) {
	      var cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
	      if (cartesian) {
	        if (positions.length === 0) {
	          positions.push(cartesian.clone());
	          markers.addBillboard(positions[0]);
	        }
	        if (positions.length >= 2) {
	          poly.positions = positions;
	          poly._createPrimitive = true;
	        }
	        if (positions.length === 2) {
	          finishDrawing(movement.position);
	          return;
	        }
	        // add new point to polygon
	        // this one will move with the mouse
	        positions.push(cartesian);
	        markers.addBillboard(cartesian);
	      }
	    }
	  }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	  mouseHandler.setInputAction(function (movement) {
	    var position = movement.endPosition;
	    if (position !== null) {
	      if (positions.length === 0) {
	        tooltip.showAt(position, "<p>点击创建第一个点</p>");
	      } else {
	        var cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
	        if (cartesian) {
	          positions.pop();
	          // make sure it is slightly different
	          cartesian.y += 1 + Math.random();
	          positions.push(cartesian);
	          if (positions.length >= 2) {
	            poly.positions = positions;
	            poly._createPrimitive = true;
	          }
	          // update marker
	          markers.getBillboard(positions.length - 1).position = cartesian;
	          // show tooltip
	          tooltip.showAt(position, "<p>点击创建新的点</p>" + (positions.length > 2 ? "<p>双击结束</p>" : ""));
	        }
	      }
	    }
	  }, Engine.ScreenSpaceEventType.MOUSE_MOVE);

	  mouseHandler.setInputAction(function (movement) {
	    var position = movement.position;
	    positions.pop();
	    finishDrawing(position);
	  }, Engine.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

	  function finishDrawing(position) {
	    if (position !== null) {
	      if (positions.length < 2) {} else {
	        var cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
	        if (cartesian) {
	          _self.stopDrawing();
	          if (typeof options.callback === "function") {
	            options.callback(positions);
	          }
	          var wall = new _Wall2.default(_extends({}, options, {
	            positions: poly.positions,
	            maximumHeights: options.maximumHeights,
	            minimumHeights: options.minimumHeights,
	            material: options.material,
	            type: options.type
	          }));
	          _self.primitives.add(wall);
	          wall.setEditable();
	          _self.fire("created", {
	            entity: wall,
	            positions: poly.positions,
	            height: wall.height
	          });
	        }
	      }
	    }
	  }
	}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = startDrawingFlood;

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _Flood = __webpack_require__(16);

	var _Flood2 = _interopRequireDefault(_Flood);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// var ellipsoid = Engine.Ellipsoid.WGS84;
	function startDrawingFlood(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultSurfaceOptions);
	  options.id = options.id || GeoVis.createGuid();
	  if (options.color) {
	    var material = Engine.Material.fromType(Engine.Material.ColorType);
	    material.uniforms.color = options.color;
	    options.material = material;
	  }
	  this.startDrawing(function () {
	    primitives.remove(poly);
	    markers.remove();
	    mouseHandler.destroy();
	    tooltip.setVisible(false);
	  });

	  var _self = this;
	  var scene = this._scene;
	  var primitives = this._primitives;
	  var tooltip = this._tooltip;

	  var minPoints = 3;
	  var maxPoints = options.maxPoints || Infinity;

	  var poly;
	  poly = new _Flood2.default(options);

	  poly.asynchronous = false;
	  primitives.add(poly);

	  var positions = [];
	  var markers = new _BillboardGroup2.default(this, _config.defaultBillboard);
	  var mouseHandler = new Engine.ScreenSpaceEventHandler(scene.canvas.parentNode);
	  // Now wait for start
	  var lastTime = new Date().getTime();
	  mouseHandler.setInputAction(function (movement) {
	    if (movement.position !== null) {
	      var currentTime = new Date().getTime();
	      var delta = currentTime - lastTime;
	      lastTime = currentTime;
	      var ray = scene.camera.getPickRay(movement.position);
	      var cartesian = scene.globe.pick(ray, scene);
	      var height = Engine.Cartographic.fromCartesian(cartesian).height;
	      // var cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
	      if (cartesian && delta > 300) {
	        if (positions.length === 0) {
	          poly.height = height;
	          positions.push(cartesian.clone());
	          markers.addBillboard(positions[0]);
	        }
	        if (positions.length >= minPoints) {
	          poly.positions = positions;
	          poly._createPrimitive = true;
	        }
	        if (positions.length === maxPoints) {
	          finishDrawing(movement.position);
	          return;
	        }
	        positions.push(cartesian);
	        markers.addBillboard(cartesian);
	      }
	    }
	  }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	  mouseHandler.setInputAction(function (movement) {
	    var position = movement.endPosition;
	    if (position !== null) {
	      if (positions.length === 0) {
	        tooltip.showAt(position, "<p>点击创建第一个点</p>");
	      } else {
	        // var cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
	        var ray = scene.camera.getPickRay(position);
	        var cartesian = scene.globe.pick(ray, scene);
	        if (cartesian) {
	          positions.pop();
	          // make sure it is slightly different
	          cartesian.y += 1 + Math.random();
	          positions.push(cartesian);
	          if (positions.length >= minPoints) {
	            poly.positions = positions;
	            poly._createPrimitive = true;
	          }
	          // update marker
	          markers.getBillboard(positions.length - 1).position = cartesian;
	          // show tooltip
	          tooltip.showAt(position, "<p>点击创建新的点</p>" + (positions.length > minPoints ? "<p>双击结束</p>" : ""));
	          _self.fire("changed", {
	            entity: poly,
	            positions: poly.positions
	          });
	        }
	      }
	    }
	  }, Engine.ScreenSpaceEventType.MOUSE_MOVE);

	  mouseHandler.setInputAction(function (movement) {
	    var position = movement.position;
	    positions.pop();
	    finishDrawing(position);
	    // loop(1);
	  }, Engine.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
	  void function loop(i) {
	    if (i <= 500) {
	      poly.extrudedHeight = i;
	      setTimeout(function () {
	        loop(i += 10);
	      }, 100);
	    }
	  }(1);
	  function finishDrawing(position) {
	    if (position !== null) {
	      if (positions.length < minPoints) {} else {
	        var ray = scene.camera.getPickRay(position);
	        var cartesian = scene.globe.pick(ray, scene);
	        if (cartesian) {
	          _self.stopDrawing();
	          if (typeof options.callback === "function") {
	            options.callback(positions);
	          }
	          var polygon = new _Flood2.default(_extends({}, options, {
	            positions: poly.positions,
	            custom: poly.custom,
	            material: options.material, // Engine.Material.fromType(Engine.Material.ColorType)
	            height: poly.height,
	            extrudedHeight: poly.extrudedHeight
	          }));
	          _self.primitives.add(polygon);
	          polygon.setEditable();
	          _self.fire("created", {
	            entity: polygon,
	            positions: poly.positions
	          });
	        }
	      }
	    }
	  }
	}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = startDrawingAngle;

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _pickPosition = __webpack_require__(20);

	var _pickPosition2 = _interopRequireDefault(_pickPosition);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _Angle = __webpack_require__(17);

	var _Angle2 = _interopRequireDefault(_Angle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ellipsoid = Engine.Ellipsoid.WGS84;
	function startDrawingAngle(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultPolylineOptions);
	  options.id = options.id || GeoVis.createGuid();
	  if (options.color) {
	    var material = Engine.Material.fromType(Engine.Material.ColorType);
	    material.uniforms.color = options.color;
	    options.material = material;
	  }
	  this.startDrawing(function () {
	    primitives.remove(poly);
	    markers.remove();
	    mouseHandler.destroy();
	    tooltip.setVisible(false);
	  });

	  var _self = this;
	  var scene = this._scene;
	  var primitives = this._primitives;
	  var tooltip = this._tooltip;

	  var minPoints = 2;
	  var maxPoints = 2;

	  var poly;
	  var polyVerticle;
	  var polyHorizontal;
	  poly = new _Angle2.default(options);
	  polyVerticle = new _Angle2.default(options);
	  polyHorizontal = new _Angle2.default(options);

	  poly.asynchronous = false;
	  polyVerticle.asynchronous = false;
	  polyHorizontal.asynchronous = false;

	  primitives.add(poly);
	  primitives.add(polyVerticle);
	  primitives.add(polyHorizontal);

	  var positions = [];
	  var positionsVerticle = [];
	  var positionsHorizontal = [];
	  var markers = new _BillboardGroup2.default(this, _config.defaultBillboard);
	  var mouseHandler = new Engine.ScreenSpaceEventHandler(scene.canvas.parentNode);
	  // Now wait for start
	  var lastTime = new Date().getTime();
	  mouseHandler.setInputAction(function (movement) {
	    if (movement.position !== null) {
	      var currentTime = new Date().getTime();
	      var delta = currentTime - lastTime;
	      lastTime = currentTime;
	      var cartesian = (0, _pickPosition2.default)(scene, movement.position);
	      if (cartesian && delta > 300) {
	        if (positions.length === 0) {
	          positions.push(cartesian.clone());
	          positionsVerticle.push(cartesian.clone());
	          markers.addBillboard(positions[0]);
	        }
	        if (positionsHorizontal.length === 0) {}
	        if (positions.length >= minPoints) {
	          poly.positions = positions;
	          poly._createPrimitive = true;
	          polyVerticle.positions = positionsVerticle;
	          polyVerticle._createPrimitive = true;
	        }
	        if (positions.length === maxPoints) {
	          finishDrawing(movement.position);
	          return;
	        }
	        positions.push(cartesian);

	        var pickheight = Engine.Cartographic.fromCartesian(positions[0]).height - Engine.Cartographic.fromCartesian(cartesian).height;
	        if (pickheight < 0) {
	          var coord = ellipsoid.cartesianToCartographic(positions[0]);
	          var cartographic = new Engine.Cartographic(coord.longitude, coord.latitude, coord.height - pickheight);
	        } else {
	          coord = ellipsoid.cartesianToCartographic(cartesian);
	          cartographic = new Engine.Cartographic(coord.longitude, coord.latitude, coord.height + pickheight);
	        }
	        positionsVerticle.push(ellipsoid.cartographicToCartesian(cartographic));
	        markers.addBillboard(cartesian);
	      }
	    }
	  }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	  mouseHandler.setInputAction(function (movement) {
	    var position = movement.endPosition;
	    if (position !== null) {
	      if (positions.length === 0) {
	        tooltip.showAt(position, "<p>点击创建第一个点</p>");
	      } else {
	        // var cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
	        var cartesian = (0, _pickPosition2.default)(scene, position);
	        if (cartesian) {
	          positions.pop();
	          positionsVerticle.pop();
	          positionsHorizontal.pop();
	          // make sure it is slightly different
	          positions.push(cartesian);
	          var pickheight = Engine.Cartographic.fromCartesian(positions[0]).height - Engine.Cartographic.fromCartesian(cartesian).height;
	          if (pickheight < 0) {
	            var coord = ellipsoid.cartesianToCartographic(positions[0]);
	            var cartographic = new Engine.Cartographic(coord.longitude, coord.latitude, coord.height - pickheight);
	          } else {
	            coord = ellipsoid.cartesianToCartographic(cartesian);
	            cartographic = new Engine.Cartographic(coord.longitude, coord.latitude, coord.height + pickheight);
	          }
	          var thirdPoint = ellipsoid.cartographicToCartesian(cartographic);
	          polyHorizontal.positions = [thirdPoint, cartesian];
	          positionsVerticle.push(thirdPoint);
	          if (positions.length >= minPoints) {
	            poly.positions = positions;
	            poly._createPrimitive = true;
	            polyVerticle.positions = positionsVerticle;
	            polyVerticle._createPrimitive = true;
	            polyHorizontal._createPrimitive = true;
	          }
	          // update marker
	          markers.getBillboard(positions.length - 1).position = cartesian;
	          // show tooltip
	          tooltip.showAt(position, "<p>点击创建新的点</p>" + (positions.length > minPoints ? "<p>双击结束</p>" : ""));
	          _self.fire("changed", {
	            entity: poly,
	            positions: poly.positions
	          });
	        }
	      }
	    }
	  }, Engine.ScreenSpaceEventType.MOUSE_MOVE);

	  mouseHandler.setInputAction(function (movement) {
	    var position = movement.position;
	    positions.pop();
	    positionsVerticle.pop();
	    positionsHorizontal.pop();
	    finishDrawing(position);
	  }, Engine.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
	  function finishDrawing(position) {
	    if (position !== null) {
	      if (positions.length < minPoints) {} else {
	        var cartesian = (0, _pickPosition2.default)(scene, position);
	        if (cartesian) {
	          _self.stopDrawing();
	          if (typeof options.callback === "function") {
	            options.callback(positions);
	          }
	          var polyline = new _Angle2.default(_extends({}, options, {
	            positions: poly.positions,
	            width: options.width,
	            material: options.material,
	            geodesic: true,
	            type: options.type
	          }));
	          var polylineVerticle = new _Angle2.default(_extends({}, options, {
	            positions: polyVerticle.positions,
	            width: options.width,
	            material: options.material,
	            geodesic: true,
	            type: options.type
	          }));
	          var polylineHorizontal = new _Angle2.default(_extends({}, options, {
	            positions: polyHorizontal.positions,
	            width: options.width,
	            height: options.height,
	            material: options.material,
	            geodesic: true,
	            type: options.type
	          }));
	          _self.primitives.add(polyline);
	          _self.primitives.add(polylineVerticle);
	          _self.primitives.add(polylineHorizontal);
	          _self.fire("created", {
	            entity: polyline,
	            positions: poly.positions
	          });
	        }
	      }
	    }
	  }
	}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


	exports.default = startDrawingCutFill;

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _Polygon = __webpack_require__(7);

	var _Polygon2 = _interopRequireDefault(_Polygon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function startDrawingCutFill(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultSurfaceOptions);
	  options.id = options.id || GeoVis.createGuid();
	  if (options.color) {
	    var material = Engine.Material.fromType(Engine.Material.ColorType);
	    material.uniforms.color = options.color;
	    options.material = material;
	  }
	  this.startDrawing(function () {
	    primitives.remove(poly);
	    markers.remove();
	    mouseHandler.destroy();
	    tooltip.setVisible(false);
	  });

	  var _self = this;
	  var scene = this._scene;
	  var primitives = this._primitives;
	  var tooltip = this._tooltip;

	  var minPoints = 3;
	  var maxPoints = options.maxPoints || Infinity;
	  var poly;
	  poly = new _Polygon2.default(options);

	  poly.asynchronous = false;
	  primitives.add(poly);

	  var positions = [];
	  var markers = new _BillboardGroup2.default(this, _config.defaultBillboard);
	  var mouseHandler = new Engine.ScreenSpaceEventHandler(scene.canvas.parentNode);
	  // Now wait for start
	  mouseHandler.setInputAction(function (movement) {
	    if (movement.position !== null) {
	      var cartesian = scene.pickPosition(movement.position);
	      if (cartesian) {
	        if (positions.length === 0) {
	          positions.push(cartesian.clone());
	          markers.addBillboard(positions[0]);
	        }
	        if (positions.length >= minPoints) {
	          poly.positions = positions;
	          poly._createPrimitive = true;
	        }
	        if (positions.length === maxPoints) {
	          finishDrawing(movement.position);
	          return;
	        }
	        positions.push(cartesian);
	        markers.addBillboard(cartesian);
	      }
	    }
	  }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	  mouseHandler.setInputAction(function (movement) {
	    var position = movement.endPosition;
	    if (position !== null) {
	      if (positions.length === 0) {
	        tooltip.showAt(position, "<p>点击创建第一个点</p>");
	      } else {
	        var cartesian = scene.pickPosition(position);
	        if (cartesian) {
	          positions.pop();
	          // cartesian.y += 1 + Math.random();
	          positions.push(cartesian);
	          if (positions.length >= minPoints) {
	            poly.positions = positions;
	            poly._createPrimitive = true;
	          }
	          markers.getBillboard(positions.length - 1).position = cartesian;
	          tooltip.showAt(position, "<p>点击创建新的点</p>" + (positions.length > minPoints ? "<p>双击结束</p>" : ""));
	          _self.fire("changed", {
	            entity: poly,
	            positions: poly.positions
	          });
	        }
	      }
	    }
	  }, Engine.ScreenSpaceEventType.MOUSE_MOVE);

	  mouseHandler.setInputAction(function (movement) {
	    var position = movement.position;
	    positions.pop();
	    finishDrawing(position);
	  }, Engine.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

	  function finishDrawing(position) {
	    if (position !== null) {
	      if (positions.length < minPoints) {} else {
	        var cartesian = scene.pickPosition(position);
	        if (cartesian) {
	          _self.stopDrawing();
	          if (typeof options.callback === "function") {
	            options.callback(positions);
	          }
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
	          //  _self.primitives.add(polygon);
	          _self.fire("created", {
	            entity: polygon,
	            positions: poly.positions
	          });
	        }
	      }
	    }
	  }
	}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = startDrawingVisibility;

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _Angle = __webpack_require__(17);

	var _Angle2 = _interopRequireDefault(_Angle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function startDrawingVisibility(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultPolylineOptions);
	  options.id = options.id || GeoVis.createGuid();
	  if (options.color) {
	    var material = Engine.Material.fromType(Engine.Material.ColorType);
	    material.uniforms.color = options.color;
	    options.material = material;
	  }
	  var material1 = Engine.Material.fromType(Engine.Material.ColorType);
	  material1.uniforms.color = GeoVis.Color.GREEN.withAlpha(0.5);

	  var material2 = Engine.Material.fromType(Engine.Material.ColorType);
	  material2.uniforms.color = GeoVis.Color.BROWN.withAlpha(0.5);
	  this.startDrawing(function () {
	    markers.remove();
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
	  var markers = new _BillboardGroup2.default(this, _config.defaultBillboard);
	  var mouseHandler = new Engine.ScreenSpaceEventHandler(scene.canvas.parentNode);
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
	          markers.addBillboard(positions[0]);
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
	            finishDrawing(movement.position);
	          });
	          return;
	        }
	        positions.push(cartesian);

	        markers.addBillboard(cartesian);
	      }
	    }
	  }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	  mouseHandler.setInputAction(function (movement) {
	    var position = movement.endPosition;
	    if (position !== null) {
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
	          markers.getBillboard(positions.length - 1).position = cartesian;
	          // show tooltip
	          tooltip.showAt(position, "<p>点击创建新的点</p>" + (positions.length > minPoints ? "<p>再次点击结束</p>" : ""));
	          _self.fire("changed", {
	            entity: poly,
	            positions: poly.positions
	          });
	        }
	      }
	    }
	  }, Engine.ScreenSpaceEventType.MOUSE_MOVE);

	  function finishDrawing(position) {
	    if (position !== null) {
	      if (positions.length < minPoints) {} else {
	        var cartesian = scene.pickPosition(position);
	        if (cartesian) {
	          if (typeof options.callback === "function") {
	            options.callback(positions);
	          }
	          if (result[0].position) {
	            var position1 = [poly.positions[0], result[0].position];
	            var position2 = [result[0].position, poly.positions[1]];
	            var marker1 = new _BillboardGroup2.default(_self, _config.defaultBillboard);
	            marker1.addBillboard(result[0].position);
	            var polyline1 = new _Angle2.default(_extends({}, options, {
	              positions: position1,
	              width: options.width,
	              material: material1,
	              geodesic: true,
	              type: options.type
	            }));
	            var polyline2 = new _Angle2.default(_extends({}, options, {
	              positions: position2,
	              width: options.width,
	              material: material2,
	              geodesic: true,
	              type: options.type
	            }));
	            _self.primitives.add(polyline1);
	            _self.primitives.add(polyline2);
	          } else {
	            polyline1 = new _Angle2.default(_extends({}, options, {
	              positions: poly.positions,
	              width: options.width,
	              material: material1,
	              geodesic: true,
	              type: options.type
	            }));
	            _self.primitives.add(polyline1);
	          }

	          _self.fire("created", {
	            entity: polyline1,
	            positions: poly.positions
	          });
	        }
	      }
	    }
	  }
	}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = startDrawingCircle;

	var _TextMarker = __webpack_require__(31);

	var _TextMarker2 = _interopRequireDefault(_TextMarker);

	var _ImageMarker = __webpack_require__(37);

	var _ImageMarker2 = _interopRequireDefault(_ImageMarker);

	var _util = __webpack_require__(3);

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ellipsoid = Engine.Ellipsoid.WGS84;
	function startDrawingCircle(options) {
	  options = (0, _util.copyOptions)(options, {});
	  options.id = options.id || GeoVis.createGuid();
	  this.startDrawing(function cleanUp() {
	    mouseHandler.destroy();
	    tooltip.setVisible(false);
	  });

	  var _self = this;
	  var scene = this._scene;
	  var tooltip = this._tooltip;

	  var mouseHandler = new Engine.ScreenSpaceEventHandler(scene.canvas);

	  mouseHandler.setInputAction(function (movement) {
	    if (movement.position != null) {
	      // var cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
	      var ray = scene.camera.getPickRay(movement.position);
	      var cartesian = scene.globe.pick(ray, scene);
	      if (cartesian) {
	        var marker = void 0;
	        if (options.type === _Types2.default.TEXT_MARKER) {
	          marker = new _TextMarker2.default(cartesian, options).addTo(_self.features);
	        } else {
	          marker = new _ImageMarker2.default(cartesian, options).addTo(_self.features);
	        }

	        _self.fire("created", {
	          entity: marker
	        });
	        _self.stopDrawing();
	      }
	    }
	  }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	  mouseHandler.setInputAction(function (movement) {
	    var position = movement.endPosition;
	    if (position != null) {
	      tooltip.showAt(position, "<p>点击放置标记</p>");
	    }
	  }, Engine.ScreenSpaceEventType.MOUSE_MOVE);
	}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _TextEditor = __webpack_require__(32);

	var _TextEditor2 = _interopRequireDefault(_TextEditor);

	var _Menu = __webpack_require__(33);

	var _Menu2 = _interopRequireDefault(_Menu);

	var _interactjs = __webpack_require__(36);

	var _interactjs2 = _interopRequireDefault(_interactjs);

	var _util = __webpack_require__(34);

	var _Types = __webpack_require__(9);

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
	  dom.className = "gv-anchor";
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
	  ele.className = "gv-marker-input";
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
	      }
	    };

	    _this.enableEdit = function () {
	      _this.textEle.disabled = false;
	      _this.textEle.focus();
	      _this._menu.visible = true;
	      (0, _util.removeClass)(_this.textEle, "gv-dragble");
	      // this.textEle
	    };

	    _this.disableEdit = function () {
	      _this.textEle.blur();
	      _this.textEle.disabled = true;
	      _this._menu.visible = false;
	      (0, _util.addClass)(_this.textEle, "gv-dragble");
	    };

	    if (options.id) _this._id = options.id || GeoVis.createGuid();
	    _this._element.className = "gv-resizer";
	    var menu = new _Menu2.default(_this, textEle);
	    _this._menu = menu;
	    _this.textEle = textEle;
	    _this.type = _Types2.default.TEXT_MARKER;
	    _this.attachPopup(menu);
	    if (options.weight) _this.weight = options.weight;
	    if (options.color) _this.color = options.color;
	    if (options.backgroundColor) _this.backgroundColor = options.backgroundColor;
	    if (options.italic) _this.italic = options.italic;
	    if (options.align) _this.align = options.align;
	    if (options.fontSize) _this.fontSize = options.fontSize;
	    if (options.fontFamily) _this.fontFamily = options.fontFamily;
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
	      (0, _util.addClass)(this.element, "gv-resizeble");
	    }
	  }, {
	    key: "disableResize",
	    value: function disableResize() {
	      (0, _util.removeClass)(this.element, "gv-resizeble");
	    }
	  }, {
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
	  }, {
	    key: "removeFrom",
	    value: function removeFrom(features) {
	      features.markers.removeMarker(this);
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
	  }]);

	  return TextMarker;
	}(GeoVis.DomMarker);

	function init() {
	  (0, _interactjs2.default)(".gv-resizer").draggable({
	    // enable inertial throwing
	    // inertia: true,
	    // allowFrom: ".gv-dragble",
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
	    // ignoreFrom: ".gv-marker-menu, .menu, .gv-marker-input",
	    allowFrom: ".gv-anchor",
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
	    y += event.deltaRect.top;

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

	  // interact(".gv-resizer")
	  //   .draggable({
	  //     // ignoreFrom: ".gv-marker-menu .menu",
	  //     allowFrom: ".gv-resizer",
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
/* 32 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TextEditor = function () {
	  function TextEditor() {
	    _classCallCheck(this, TextEditor);
	  }

	  _createClass(TextEditor, [{
	    key: "handleClick",
	    value: function handleClick() {}
	  }, {
	    key: "element",
	    get: function get() {
	      return this._element;
	    }
	  }]);

	  return TextEditor;
	}();

	exports.default = TextEditor;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // @ts-check

	// import "pickr-widget/dist/pickr.min.css";


	var _TextEditor = __webpack_require__(32);

	var _TextEditor2 = _interopRequireDefault(_TextEditor);

	var _util = __webpack_require__(34);

	var _pickr = __webpack_require__(35);

	var _pickr2 = _interopRequireDefault(_pickr);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var menuStr = "\n<ul class=\"menu\" id=\"uniqName_1_159\" widgetid=\"uniqName_1_159 style=\"top: -265px;position: absolute;\" >\n  <ul class=\"firstLine\">\n    <li data-name=\"weight\" title=\"\u7C97\u4F53\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-font-weight\"></use></svg></li>\n    <li data-name=\"italic\" title=\"\u659C\u4F53\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-Italic\"></use></svg></li>\n    <li data-name=\"color\" title=\"\u989C\u8272\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-zitiyanse\"></use></svg></li>\n    <li data-name=\"bgcolor\" title=\"\u80CC\u666F\u8272\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-background\"></use></svg></li>\n    <li data-name=\"left\" title=\"\u5DE6\u5BF9\u9F50\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-left-alignment\"></use></svg></li>\n    <li data-name=\"center\" title=\"\u5C45\u4E2D\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-Middle\"></use></svg></li>\n    <li data-name=\"right\" title=\"\u53F3\u5BF9\u9F50\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-Right-alignment\"></use></svg></li>\n    <li data-name=\"remove\" title=\"\u5220\u9664\"><svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-delete\"></use></svg></li>\n  </ul>\n  <ul class=\"secondLine division\">\n    <li data-name=\"fllowGlobe\" title=\"\" style=\"width:100px\">\n      <label class=\"title-label short\">\u8DDF\u968F\u5730\u7403</label>\n      <svg class=\"icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-check\"></use></svg>\n      <li data-name=\"size\" title=\"\u5B57\u4F53\u5927\u5C0F\" style=\"width:60px;font-size:14px\">\n      <select>\n        <option value=\"14px\">14px</option>\n        <option value=\"16px\">16px</option>\n        <option value=\"18px\">18px</option>\n        <option value=\"20px\">20px</option>\n        <option value=\"22px\">22px</option>\n        <option value=\"24px\">24px</option>\n        <option value=\"26px\">26px</option>\n        <option value=\"28px\">28px</option>\n        <option value=\"30px\">30px</option>\n        <option value=\"32px\">32px</option>\n        <option value=\"34px\">34px</option>\n        <option value=\"36px\">36px</option>\n        <option value=\"38px\">38px</option>\n       </select>\n      </li>\n      <li data-name=\"family\" title=\"\u5B57\u4F53\" style=\"width:80px;font-size:14px\">\n      <select>\n        <option value=\"\u5B8B\u4F53\">\u5B8B\u4F53</option>\n        <option value=\"\u9ED1\u4F53\">\u9ED1\u4F53</option>\n        <option value=\"\u6977\u4F53\">\u6977\u4F53</option>\n        <option value=\"\u5FAE\u8F6F\u96C5\u9ED1\">\u5FAE\u8F6F\u96C5\u9ED1</option>\n        <option value=\"\u534E\u6587\u7EC6\u9ED1\">\u534E\u6587\u7EC6\u9ED1</option>\n        <option value=\"\u534E\u6587\u65B0\u9B4F\">\u534E\u6587\u65B0\u9B4F</option>\n       </select>\n      </li>\n    </li>\n  </ul>\n</ul>\n";

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
	   * @param {TextEditor} textEditor
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
	    this._popup.className = "gv-marker-menu";
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
	    this._fontSizeSelector = this.getDomByName("size").children[0];
	    this._fontSizeSelector.onchange = function (e) {
	      _this.fontSize = e.target.value;
	    };
	    this._fontFamilySelector = this.getDomByName("family").children[0];
	    this._fontFamilySelector.onchange = function (e) {
	      _this.fontFamily = e.target.value;
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
	        this._textEle.style.fontStyle = "none";
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
	        this._textEle.style.fontStyle = "none";
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
/* 34 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.hasClass = hasClass;
	exports.addClass = addClass;
	exports.removeClass = removeClass;
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

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Pickr=e():t.Pickr=e()}(window,function(){return function(t){var e={};function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}return o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="dist/",o(o.s=1)}([function(t,e,o){},function(t,e,o){"use strict";o.r(e);o(0);function n(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}const i=s.bind(null,"addEventListener"),r=s.bind(null,"removeEventListener");function s(t,e,o,i){let r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};return e instanceof HTMLCollection||e instanceof NodeList?e=Array.from(e):Array.isArray(e)||(e=[e]),Array.isArray(o)||(o=[o]),e.forEach(e=>o.forEach(o=>e[t](o,i,function(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{},i=Object.keys(o);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(o).filter(function(t){return Object.getOwnPropertyDescriptor(o,t).enumerable}))),i.forEach(function(e){n(t,e,o[e])})}return t}({capture:!1},r)))),Array.prototype.slice.call(arguments,1)}function a(t){const e=document.createElement("div");return e.innerHTML=t.trim(),e.firstElementChild}function c(t,e){const o=t.getAttribute(e);return t.removeAttribute(e),o}function l(t){return function t(e){let o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const n=c(e,"data-con"),i=c(e,"data-key");i&&(o[i]=e);const r=Array.from(e.children),s=n?o[n]={}:o;for(let e of r){const o=c(e,"data-arr");o?(s[o]||(s[o]=[])).push(e):t(e,s)}return o}(a(t))}function p(t){let e=t.path||t.composedPath&&t.composedPath();if(e)return e;let o=t.target.parentElement;for(e=[t.target,o];o=o.parentElement;)e.push(o);return e.push(document,window),e}function u(t){let e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];const o=t=>t>="0"&&t<="9"||"-"===t||"."===t;function n(n){const i=t.value,r=t.selectionStart;let s=r,a="";for(let t=r-1;t>0&&o(i[t]);t--)a=i[t]+a,s--;for(let t=r,e=i.length;t<e&&o(i[t]);t++)a+=i[t];if(a.length>0&&!isNaN(a)&&isFinite(a)){const o=n.deltaY<0?1:-1,r=n.ctrlKey?5*o:o;let c=Number(a)+r;!e&&c<0&&(c=0);const l=i.substr(0,s)+c+i.substring(s+a.length,i.length),p=s+String(c).length;t.value=l,t.focus(),t.setSelectionRange(p,p)}n.preventDefault(),t.dispatchEvent(new Event("input"))}i(t,"focus",()=>i(window,"wheel",n)),i(t,"blur",()=>r(window,"wheel",n))}function d(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var o=[],n=!0,i=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(n=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);n=!0);}catch(t){i=!0,r=t}finally{try{n||null==a.return||a.return()}finally{if(i)throw r}}return o}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}const h=Math.min,f=Math.max;function v(t,e,o){t=t/360*6,e/=100,o/=100;let n=Math.floor(t),i=t-n,r=o*(1-e),s=o*(1-i*e),a=o*(1-(1-i)*e),c=n%6;return[255*[o,s,r,r,a,o][c],255*[a,o,o,s,r,r][c],255*[r,r,a,o,o,s][c]]}function g(t,e,o){let n,i,r;const s=h(t/=255,e/=255,o/=255),a=f(t,e,o),c=a-s;if(0===c)n=i=0;else{i=c/a;let r=((a-t)/6+c/2)/c,s=((a-e)/6+c/2)/c,l=((a-o)/6+c/2)/c;t===a?n=l-s:e===a?n=1/3+r-l:o===a&&(n=2/3+s-r),n<0?n+=1:n>1&&(n-=1)}return[360*n,100*i,100*(r=a)]}function y(t,e,o,n){return e/=100,o/=100,[...g(255*(1-h(1,(t/=100)*(1-(n/=100))+n)),255*(1-h(1,e*(1-n)+n)),255*(1-h(1,o*(1-n)+n)))]}function m(t,e,o){return e/=100,[t,2*(e*=(o/=100)<.5?o:1-o)/(o+e)*100,100*(o+e)]}function b(t){return g(...t.match(/.{2}/g).map(t=>parseInt(t,16)))}function w(t){const e={cmyk:/^cmyk[\D]+(\d+)[\D]+(\d+)[\D]+(\d+)[\D]+(\d+)/i,rgba:/^(rgb|rgba)[\D]+(\d+)[\D]+(\d+)[\D]+(\d+)[\D]*?([\d.]+|$)/i,hsla:/^(hsl|hsla)[\D]+(\d+)[\D]+(\d+)[\D]+(\d+)[\D]*?([\d.]+|$)/i,hsva:/^(hsv|hsva)[\D]+(\d+)[\D]+(\d+)[\D]+(\d+)[\D]*?([\d.]+|$)/i,hex:/^#?(([\dA-Fa-f]{3,4})|([\dA-Fa-f]{6})|([\dA-Fa-f]{8}))$/i},o=t=>t.map(t=>/^(|\d+)\.\d+|\d+$/.test(t)?Number(t):void 0);let n;for(let s in e)if(n=e[s].exec(t))switch(s){case"cmyk":{let t=d(o(n),5),e=t[1],i=t[2],r=t[3],a=t[4];if(e>100||i>100||r>100||a>100)break;return{values:[...y(e,i,r,a),1],type:s}}case"rgba":{let t=d(o(n),6),e=t[2],i=t[3],r=t[4],a=t[5],c=void 0===a?1:a;if(e>255||i>255||r>255||c<0||c>1)break;return{values:[...g(e,i,r),c],type:s}}case"hex":{const t=(t,e)=>[t.substring(0,e),t.substring(e,t.length)];let e,o=d(n,2)[1];if(3===o.length?o+="F":6===o.length&&(o+="FF"),4===o.length){var i=d(t(o,3).map(t=>t+t),2);o=i[0],e=i[1]}else if(8===o.length){var r=d(t(o,6),2);o=r[0],e=r[1]}return e=parseInt(e,16)/255,{values:[...b(o),e],type:s}}case"hsla":{let t=d(o(n),6),e=t[2],i=t[3],r=t[4],a=t[5],c=void 0===a?1:a;if(e>360||i>100||r>100||c<0||c>1)break;return{values:[...m(e,i,r),c],type:s}}case"hsva":{let t=d(o(n),6),e=t[2],i=t[3],r=t[4],a=t[5],c=void 0===a?1:a;if(e>360||i>100||r>100||c<0||c>1)break;return{values:[e,i,r,c],type:s}}}return{values:null,type:null}}function _(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1;const i=Math.ceil,r={h:t,s:e,v:o,a:n,toHSVA(){const t=[r.h,r.s,r.v],e=t.map(i);return t.push(r.a),t.toString=(()=>`hsva(${e[0]}, ${e[1]}%, ${e[2]}%, ${r.a.toFixed(1)})`),t},toHSLA(){const t=function(t,e,o){let n=(2-(e/=100))*(o/=100)/2;return 0!==n&&(e=1===n?0:n<.5?e*o/(2*n):e*o/(2-2*n)),[t,100*e,100*n]}(r.h,r.s,r.v),e=t.map(i);return t.push(r.a),t.toString=(()=>`hsla(${e[0]}, ${e[1]}%, ${e[2]}%, ${r.a.toFixed(1)})`),t},toRGBA(){const t=v(r.h,r.s,r.v),e=t.map(i);return t.push(r.a),t.toString=(()=>`rgba(${e[0]}, ${e[1]}, ${e[2]}, ${r.a.toFixed(1)})`),t},toCMYK(){const t=function(t,e,o){const n=v(t,e,o),i=n[0]/255,r=n[1]/255,s=n[2]/255;let a,c,l,p;return[100*(c=1===(a=h(1-i,1-r,1-s))?0:(1-i-a)/(1-a)),100*(l=1===a?0:(1-r-a)/(1-a)),100*(p=1===a?0:(1-s-a)/(1-a)),100*a]}(r.h,r.s,r.v),e=t.map(i);return t.toString=(()=>`cmyk(${e[0]}%, ${e[1]}%, ${e[2]}%, ${e[3]}%)`),t},toHEX(){const t=function(t,e,o){return v(t,e,o).map(t=>Math.round(t).toString(16).padStart(2,"0"))}(...[r.h,r.s,r.v]);return t.toString=(()=>{const e=r.a>=1?"":Number((255*r.a).toFixed(0)).toString(16).toUpperCase().padStart(2,"0");return`#${t.join("").toUpperCase()+e}`}),t},clone:()=>_(r.h,r.s,r.v,r.a)};return r}function k(t){const e={options:Object.assign({lockX:!1,lockY:!1,onchange:()=>0},t),_tapstart(t){i(document,["mouseup","touchend","touchcancel"],e._tapstop),i(document,["mousemove","touchmove"],e._tapmove),t.preventDefault(),e.wrapperRect=e.options.wrapper.getBoundingClientRect(),e._tapmove(t)},_tapmove(t){const o=e.options,n=e.cache,i=o.element,r=e.wrapperRect;let s=0,a=0;if(t){const e=t&&t.touches&&t.touches[0];s=t?(e||t).clientX:0,a=t?(e||t).clientY:0,s<r.left?s=r.left:s>r.left+r.width&&(s=r.left+r.width),a<r.top?a=r.top:a>r.top+r.height&&(a=r.top+r.height),s-=r.left,a-=r.top}else n&&(s=n.x,a=n.y);o.lockX||(i.style.left=s-i.offsetWidth/2+"px"),o.lockY||(i.style.top=a-i.offsetHeight/2+"px"),e.cache={x:s,y:a},o.onchange(s,a)},_tapstop(){r(document,["mouseup","touchend","touchcancel"],e._tapstop),r(document,["mousemove","touchmove"],e._tapmove)},trigger(){e.wrapperRect=e.options.wrapper.getBoundingClientRect(),e._tapmove()},update(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;e.wrapperRect=e.options.wrapper.getBoundingClientRect(),e._tapmove({clientX:e.wrapperRect.left+t,clientY:e.wrapperRect.top+o})},destroy(){const t=e.options,o=e._tapstart;r([t.wrapper,t.element],"mousedown",o),r([t.wrapper,t.element],"touchstart",o,{passive:!1})}};e.wrapperRect=e.options.wrapper.getBoundingClientRect();const o=e.options,n=e._tapstart;return i([o.wrapper,o.element],"mousedown",n),i([o.wrapper,o.element],"touchstart",n,{passive:!1}),e}function A(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const e={options:Object.assign({onchange:()=>0,className:"",elements:[]},t),_ontap(t){const o=e.options;o.elements.forEach(e=>e.classList[t.target===e?"add":"remove"](o.className)),o.onchange(t)},destroy(){r(e.options.elements,"click",this._ontap)}};return i(e.options.elements,"click",e._ontap),e}class C{constructor(t){this.options=Object.assign({useAsButton:!1,disabled:!1,comparison:!0,components:{interaction:{}},strings:{},swatches:null,default:"fff",defaultRepresentation:"HEX",position:"middle",adjustableNumbers:!0,showAlways:!1,parent:void 0,closeWithKey:"Escape",onChange:()=>0,onSave:()=>0,onSwatchSelect:()=>0},t),this.options.components.interaction||(this.options.components.interaction={}),this._initializingActive=!0,this._recalc=!0,this._color=new _,this._lastColor=new _,this.options.swatches=this.options.swatches||[],this.options.swatches&&(this.options.swatches=this.options.swatches.map(t=>{const e=w(t).values;return e&&new _(...e)}).filter(t=>t)),this._preBuild(),this._buildComponents(),this._bindEvents(),this._representation=this.options.defaultRepresentation,this.setColorRepresentation(this._representation),this._finalBuild(),this._rePositioningPicker(),requestAnimationFrame(function t(){if(!this._root.app.offsetParent)return requestAnimationFrame(t.bind(this));this._initializingActive=!1,this.setColor(this.options.default)}.bind(this))}_preBuild(){const t=this.options;"string"==typeof t.el&&(t.el=document.querySelector(t.el)),this._root=function(t){const e=t.components,o=t.strings,n=t.useAsButton,i=t.swatches,r=t=>t?"":'style="display:none" hidden',s=l(`\n        <div data-key="root" class="pickr">\n        \n            ${n?"":'<div data-key="button" class="pcr-button"></div>'}\n\n            <div data-key="app" class="pcr-app">\n                <div class="pcr-selection">\n                    <div data-con="preview" class="pcr-color-preview" ${r(e.preview)}>\n                        <div data-key="lastColor" class="pcr-last-color"></div>\n                        <div data-key="currentColor" class="pcr-current-color"></div>\n                    </div>\n\n                    <div data-con="palette" class="pcr-color-palette">\n                        <div data-key="picker" class="pcr-picker"></div>\n                        <div data-key="palette" class="pcr-palette"></div>\n                    </div>\n\n                    <div data-con="hue" class="pcr-color-chooser" ${r(e.hue)}>\n                        <div data-key="picker" class="pcr-picker"></div>\n                        <div data-key="slider" class="pcr-hue pcr-slider"></div>\n                    </div>\n\n                    <div data-con="opacity" class="pcr-color-opacity" ${r(e.opacity)}>\n                        <div data-key="picker" class="pcr-picker"></div>\n                        <div data-key="slider" class="pcr-opacity pcr-slider"></div>\n                    </div>\n                </div>\n                \n                ${i&&i.length?`\n                <div class="swatches">\n                   ${i.map((t,e)=>`<div data-arr="swatches" data-color-index="${e}" style="color: ${t.toRGBA()}"></div>`).join("")}\n                </div> \n                `:""}\n\n                <div data-con="interaction" class="pcr-interaction" ${r(Object.keys(e.interaction).length)}>\n                    <input data-key="result" class="pcr-result" type="text" spellcheck="false" ${r(e.interaction.input)}>\n\n                    <input data-arr="options" class="pcr-type" data-type="HEX" value="HEX" type="button" ${r(e.interaction.hex)}>\n                    <input data-arr="options" class="pcr-type" data-type="RGBA" value="RGBa" type="button" ${r(e.interaction.rgba)}>\n                    <input data-arr="options" class="pcr-type" data-type="HSLA" value="HSLa" type="button" ${r(e.interaction.hsla)}>\n                    <input data-arr="options" class="pcr-type" data-type="HSVA" value="HSVa" type="button" ${r(e.interaction.hsva)}>\n                    <input data-arr="options" class="pcr-type" data-type="CMYK" value="CMYK" type="button" ${r(e.interaction.cmyk)}>\n\n                    <input data-key="save" class="pcr-save" value="${o.save||"Save"}" type="button" ${r(e.interaction.save)}>\n                    <input data-key="clear" class="pcr-clear" value="${o.clear||"Clear"}" type="button" ${r(e.interaction.clear)}>\n                </div>\n            </div>\n        </div>\n    `),a=s.interaction;return a.options.find(t=>!t.hidden&&!t.classList.add("active")),a.type=(()=>a.options.find(t=>t.classList.contains("active"))),s}(t),t.useAsButton&&(t.parent||(t.parent="body"),this._root.button=t.el),document.body.appendChild(this._root.root)}_finalBuild(){const t=this.options,e=this._root;document.body.removeChild(e.root),t.parent&&("string"==typeof t.parent&&(t.parent=document.querySelector(t.parent)),t.parent.appendChild(e.app)),t.useAsButton||t.el.parentElement.replaceChild(e.root,t.el),t.disabled&&this.disable(),t.comparison||(e.button.style.transition="none",t.useAsButton||(e.preview.lastColor.style.transition="none")),t.showAlways?e.app.classList.add("visible"):this.hide()}_buildComponents(){const t=this,e=this.options.components,o={palette:k({element:t._root.palette.picker,wrapper:t._root.palette.palette,onchange(e,o){const n=t._color,i=t._root,r=t.options;n.s=e/this.wrapper.offsetWidth*100,n.v=100-o/this.wrapper.offsetHeight*100,n.v<0&&(n.v=0);const s=n.toRGBA().toString();this.element.style.background=s,this.wrapper.style.background=`\n                        linear-gradient(to top, rgba(0, 0, 0, ${n.a}), transparent), \n                        linear-gradient(to left, hsla(${n.h}, 100%, 50%, ${n.a}), rgba(255, 255, 255, ${n.a}))\n                    `,r.comparison||(i.button.style.background=s,r.useAsButton||(i.preview.lastColor.style.background=s)),i.preview.currentColor.style.background=s,t._recalc&&t._updateOutput(),i.button.classList.remove("clear")}}),hue:k({lockX:!0,element:t._root.hue.picker,wrapper:t._root.hue.slider,onchange(n,i){e.hue&&(t._color.h=i/this.wrapper.offsetHeight*360,this.element.style.backgroundColor=`hsl(${t._color.h}, 100%, 50%)`,o.palette.trigger())}}),opacity:k({lockX:!0,element:t._root.opacity.picker,wrapper:t._root.opacity.slider,onchange(o,n){e.opacity&&(t._color.a=Math.round(n/this.wrapper.offsetHeight*100)/100,this.element.style.background=`rgba(0, 0, 0, ${t._color.a})`,t.components.palette.trigger())}}),selectable:A({elements:t._root.interaction.options,className:"active",onchange(e){t._representation=e.target.getAttribute("data-type").toUpperCase(),t._updateOutput()}})};this.components=o}_bindEvents(){const t=this._root,e=this.options,o=[i(t.interaction.clear,"click",()=>this._clearColor()),i(t.preview.lastColor,"click",()=>this.setHSVA(...this._lastColor.toHSVA())),i(t.interaction.save,"click",()=>{!this.applyColor()&&!e.showAlways&&this.hide()}),i(t.interaction.result,["keyup","input"],t=>{this._recalc=!1,this.setColor(t.target.value,!0)&&!this._initializingActive&&this.options.onChange(this._color,this),t.stopImmediatePropagation()}),i([t.palette.palette,t.palette.picker,t.hue.slider,t.hue.picker,t.opacity.slider,t.opacity.picker],["mousedown","touchstart"],()=>this._recalc=!0),i(window,"resize",()=>this._rePositioningPicker)];if(t.swatches&&o.push(i(t.swatches,"click",t=>{let o=t.target;const n=e.swatches[Number(o.getAttribute("data-color-index"))];n&&(this.setHSVA(...n.toHSVA(),!0),e.onSwatchSelect(n,this))})),!e.showAlways){const n=e.closeWithKey;o.push(i(t.button,"click",()=>this.isOpen()?this.hide():this.show()),i(document,"keyup",t=>this.isOpen()&&(t.key===n||t.code===n)&&this.hide()),i(document,["touchstart","mousedown"],e=>{this.isOpen()&&!p(e).some(e=>e===t.app||e===t.button)&&this.hide()},{capture:!0}))}e.adjustableNumbers&&u(t.interaction.result,!1),this._eventBindings=o}_rePositioningPicker(){const t=this._root,e=this._root.app;if(this.options.parent){const o=t.button.getBoundingClientRect();e.style.position="fixed",e.style.marginLeft=`${o.left}px`,e.style.marginTop=`${o.top}px`}const o=t.button.getBoundingClientRect(),n=e.getBoundingClientRect(),i=e.style;n.bottom>window.innerHeight?i.top=`${-n.height-5}px`:o.bottom+n.height<window.innerHeight&&(i.top=`${o.height+5}px`);const r={left:-n.width+o.width,middle:-n.width/2+o.width/2,right:0},s=parseInt(getComputedStyle(e).left,10);let a=r[this.options.position];const c=n.left-s+a,l=n.left-s+a+n.width;"middle"!==this.options.position&&(c<0&&-c<n.width/2||l>window.innerWidth&&l-window.innerWidth<n.width/2)?a=r.middle:c<0?a=r.right:l>window.innerWidth&&(a=r.left),i.left=`${a}px`}_updateOutput(){this._root.interaction.type()&&(this._root.interaction.result.value=(()=>{const t="to"+this._root.interaction.type().getAttribute("data-type");return"function"==typeof this._color[t]?this._color[t]().toString():""})()),this._initializingActive||this.options.onChange(this._color,this)}applyColor(){let t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];const e=this._root,o=e.preview,n=e.button,i=this._color.toRGBA().toString();o.lastColor.style.background=i,this.options.useAsButton||(n.style.background=i),n.classList.remove("clear"),this._lastColor=this._color.clone(),this._initializingActive||t||this.options.onSave(this._color,this)}_clearColor(){const t=this._root,e=this.options;e.useAsButton||(t.button.style.background="rgba(255, 255, 255, 0.4)"),t.button.classList.add("clear"),e.showAlways||this.hide(),e.onChange(null,this)}destroy(){this._eventBindings.forEach(t=>r(...t)),Object.keys(this.components).forEach(t=>this.components[t].destroy())}destroyAndRemove(){this.destroy();const t=this._root.root;t.parentElement.removeChild(t)}hide(){return this._root.app.classList.remove("visible"),this}show(){if(!this.options.disabled)return this._root.app.classList.add("visible"),this._rePositioningPicker(),this}isOpen(){return this._root.app.classList.contains("visible")}setHSVA(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:360,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4];const r=this._recalc;if(this._recalc=!1,t<0||t>360||e<0||e>100||o<0||o>100||n<0||n>1)return!1;const s=this.components,a=s.hue,c=s.opacity,l=s.palette,p=a.options.wrapper.offsetHeight*(t/360);a.update(0,p);const u=c.options.wrapper.offsetHeight*n;c.update(0,u);const d=l.options.wrapper,h=d.offsetWidth*(e/100),f=d.offsetHeight*(1-o/100);return l.update(h,f),this._color=new _(t,e,o,n),this._recalc=r,this._recalc&&this._updateOutput(),i||this.applyColor(),!0}setColor(t){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(null===t)return this._clearColor(),!0;const o=w(t),n=o.values,i=o.type;if(n){const t=i.toUpperCase(),o=this._root.interaction.options,r=o.find(e=>e.getAttribute("data-type")===t);if(!r.hidden)for(const t of o)t.classList[t===r?"add":"remove"]("active");return this.setHSVA(...n,e)}}setColorRepresentation(t){return t=t.toUpperCase(),!!this._root.interaction.options.find(e=>e.getAttribute("data-type")===t&&!e.click())}getColorRepresentation(){return this._representation}getColor(){return this._color}getRoot(){return this._root}disable(){return this.hide(),this.options.disabled=!0,this._root.button.classList.add("disabled"),this}enable(){return this.options.disabled=!1,this._root.button.classList.remove("disabled"),this}}C.utils={once:(t,e,o,n)=>i(t,e,function t(){o.apply(this,arguments),this.removeEventListener(e,t)},n),on:i,off:r,eventPath:p,createElementFromString:a,adjustableInputNumbers:u,removeAttribute:c,createFromTemplate:l},C.create=(t=>new C(t)),C.version="0.3.6";e.default=C}]).default});
	//# sourceMappingURL=pickr.min.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	/* interact.js 1.8.5 | https://raw.github.com/taye/interact.js/master/LICENSE */
	!function(t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).interact=t()}}(function(){function t(e){var n;return function(t){return n||e(n={exports:{},parent:t},n.exports),n.exports}}var M=t(function(t,e){"use strict";function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.Interactable=void 0;var u=r(j),l=n(z),s=n(B),c=n(Tt),f=n(Qt),p=r(P),d=n(te),o=n(ue),v=O({});function n(t){return t&&t.__esModule?t:{default:t}}function y(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return y=function(){return t},t}function r(t){if(t&&t.__esModule)return t;if(null===t||"object"!==a(t)&&"function"!=typeof t)return{default:t};var e=y();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function h(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}function g(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var b=function(){function r(t,e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),g(this,"options",void 0),g(this,"_actions",void 0),g(this,"target",void 0),g(this,"events",new o.default),g(this,"_context",void 0),g(this,"_win",void 0),g(this,"_doc",void 0),this._actions=e.actions,this.target=t,this._context=e.context||n,this._win=(0,w.getWindow)((0,K.trySelector)(t)?this._context:t),this._doc=this._win.document,this.set(e)}return h(r,[{key:"_defaults",get:function(){return{base:{},perAction:{},actions:{}}}}]),h(r,[{key:"setOnEvents",value:function(t,e){return p.func(e.onstart)&&this.on("".concat(t,"start"),e.onstart),p.func(e.onmove)&&this.on("".concat(t,"move"),e.onmove),p.func(e.onend)&&this.on("".concat(t,"end"),e.onend),p.func(e.oninertiastart)&&this.on("".concat(t,"inertiastart"),e.oninertiastart),this}},{key:"updatePerActionListeners",value:function(t,e,n){(p.array(e)||p.object(e))&&this.off(t,e),(p.array(n)||p.object(n))&&this.on(t,n)}},{key:"setPerAction",value:function(t,e){var n=this._defaults;for(var r in e){var o=r,i=this.options[t],a=e[o];"listeners"===o&&this.updatePerActionListeners(t,i.listeners,a),p.array(a)?i[o]=u.from(a):p.plainObject(a)?(i[o]=(0,f.default)(i[o]||{},(0,s.default)(a)),p.object(n.perAction[o])&&"enabled"in n.perAction[o]&&(i[o].enabled=!1!==a.enabled)):p.bool(a)&&p.object(n.perAction[o])?i[o].enabled=a:i[o]=a}}},{key:"getRect",value:function(t){return t=t||(p.element(this.target)?this.target:null),p.string(this.target)&&(t=t||this._context.querySelector(this.target)),(0,K.getElementRect)(t)}},{key:"rectChecker",value:function(t){return p.func(t)?(this.getRect=t,this):null===t?(delete this.getRect,this):this.getRect}},{key:"_backCompatOption",value:function(t,e){if((0,K.trySelector)(e)||p.object(e)){for(var n in this.options[t]=e,this._actions.map)this.options[n][t]=e;return this}return this.options[t]}},{key:"origin",value:function(t){return this._backCompatOption("origin",t)}},{key:"deltaSource",value:function(t){return"page"===t||"client"===t?(this.options.deltaSource=t,this):this.options.deltaSource}},{key:"context",value:function(){return this._context}},{key:"inContext",value:function(t){return this._context===t.ownerDocument||(0,K.nodeContains)(this._context,t)}},{key:"testIgnoreAllow",value:function(t,e,n){return!this.testIgnore(t.ignoreFrom,e,n)&&this.testAllow(t.allowFrom,e,n)}},{key:"testAllow",value:function(t,e,n){return!t||!!p.element(n)&&(p.string(t)?(0,K.matchesUpTo)(n,t,e):!!p.element(t)&&(0,K.nodeContains)(t,n))}},{key:"testIgnore",value:function(t,e,n){return!(!t||!p.element(n))&&(p.string(t)?(0,K.matchesUpTo)(n,t,e):!!p.element(t)&&(0,K.nodeContains)(t,n))}},{key:"fire",value:function(t){return this.events.fire(t),this}},{key:"_onOff",value:function(t,e,n,r){p.object(e)&&!p.array(e)&&(r=n,n=null);var o="on"===t?"add":"remove",i=(0,d.default)(e,n);for(var a in i){"wheel"===a&&(a=l.default.wheelEvent);for(var u=0;u<i[a].length;u++){var s=i[a][u];(0,v.isNonNativeEvent)(a,this._actions)?this.events[t](a,s):p.string(this.target)?c.default["".concat(o,"Delegate")](this.target,this._context,a,s,r):c.default[o](this.target,a,s,r)}}return this}},{key:"on",value:function(t,e,n){return this._onOff("on",t,e,n)}},{key:"off",value:function(t,e,n){return this._onOff("off",t,e,n)}},{key:"set",value:function(t){var e=this._defaults;for(var n in p.object(t)||(t={}),this.options=(0,s.default)(e.base),this._actions.methodDict){var r=n,o=this._actions.methodDict[r];this.options[r]={},this.setPerAction(r,(0,f.default)((0,f.default)({},e.perAction),e.actions[r])),this[o](t[r])}for(var i in t)p.func(this[i])&&this[i](t[i]);return this}},{key:"unset",value:function(){if(c.default.remove(this.target,"all"),p.string(this.target))for(var t in c.default.delegatedEvents){var e=c.default.delegatedEvents[t];e.selectors[0]===this.target&&e.contexts[0]===this._context&&(e.selectors.splice(0,1),e.contexts.splice(0,1),e.listeners.splice(0,1)),c.default.remove(this._context,t,c.default.delegateListener),c.default.remove(this._context,t,c.default.delegateUseCapture,!0)}else c.default.remove(this.target,"all")}}]),r}(),m=e.Interactable=b;e.default=m}),O=t(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isNonNativeEvent=function(t,e){if(e.phaselessTypes[t])return!0;for(var n in e.map)if(0===t.indexOf(n)&&t.substr(n.length)in e.phases)return!0;return!1},e.Scope=void 0;var n=f(T),o=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==p(t)&&"function"!=typeof t)return{default:t};var e=c();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(De),i=f($e),a=f(ue),u=f(M({})),s=f(Qe),l=f(bn),r=f(k({}));function c(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return c=function(){return t},t}function f(t){return t&&t.__esModule?t:{default:t}}function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function d(t,e){return!e||"object"!==p(e)&&"function"!=typeof e?function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(t):e}function v(t,e,n){return(v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=y(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function y(t){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function h(t,e){return(h=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function g(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function b(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function m(t,e,n){return e&&b(t.prototype,e),n&&b(t,n),t}function O(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var w=o.win,P=o.browser,_=o.raf,x=o.events;var j=function(){function t(){var e=this;g(this,t),O(this,"id","__interact_scope_".concat(Math.floor(100*Math.random()))),O(this,"listenerMaps",[]),O(this,"browser",P),O(this,"events",x),O(this,"utils",o),O(this,"defaults",o.clone(i.default)),O(this,"Eventable",a.default),O(this,"actions",{map:{},phases:{start:!0,move:!0,end:!0},methodDict:{},phaselessTypes:{}}),O(this,"InteractEvent",l.default),O(this,"Interactable",void 0),O(this,"interactables",new s.default(this)),O(this,"_win",void 0),O(this,"document",void 0),O(this,"window",void 0),O(this,"documents",[]),O(this,"_plugins",{list:[],map:{}}),O(this,"onWindowUnload",function(t){return e.removeDocument(t.target)});var r=this;this.Interactable=function(){function n(){return g(this,n),d(this,y(n).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&h(t,e)}(n,u["default"]),m(n,[{key:"set",value:function(t){return v(y(n.prototype),"set",this).call(this,t),r.fire("interactable:set",{options:t,interactable:this}),this}},{key:"unset",value:function(){v(y(n.prototype),"unset",this).call(this);for(var t=r.interactions.list.length-1;0<=t;t--){var e=r.interactions.list[t];e.interactable===this&&(e.stop(),r.fire("interactions:destroy",{interaction:e}),e.destroy(),2<r.interactions.list.length&&r.interactions.list.splice(t,1))}r.fire("interactable:unset",{interactable:this})}},{key:"_defaults",get:function(){return r.defaults}}]),n}()}return m(t,[{key:"addListeners",value:function(t,e){this.listenerMaps.push({id:e,map:t})}},{key:"fire",value:function(t,e){for(var n=0;n<this.listenerMaps.length;n++){var r=this.listenerMaps[n].map[t];if(r&&!1===r(e,this,t))return!1}}},{key:"init",value:function(t){return S(this,t)}},{key:"pluginIsInstalled",value:function(t){return this._plugins.map[t.id]||-1!==this._plugins.list.indexOf(t)}},{key:"usePlugin",value:function(t,e){if(this.pluginIsInstalled(t))return this;if(t.id&&(this._plugins.map[t.id]=t),this._plugins.list.push(t),t.install&&t.install(this,e),t.listeners&&t.before){for(var n=0,r=this.listenerMaps.length,o=t.before.reduce(function(t,e){return t[e]=!0,t},{});n<r;n++){if(o[this.listenerMaps[n].id])break}this.listenerMaps.splice(n,0,{id:t.id,map:t.listeners})}else t.listeners&&this.listenerMaps.push({id:t.id,map:t.listeners});return this}},{key:"addDocument",value:function(t,e){if(-1!==this.getDocIndex(t))return!1;var n=w.getWindow(t);e=e?o.extend({},e):{},this.documents.push({doc:t,options:e}),x.documents.push(t),t!==this.document&&x.add(n,"unload",this.onWindowUnload),this.fire("scope:add-document",{doc:t,window:n,scope:this,options:e})}},{key:"removeDocument",value:function(t){var e=this.getDocIndex(t),n=w.getWindow(t),r=this.documents[e].options;x.remove(n,"unload",this.onWindowUnload),this.documents.splice(e,1),x.documents.splice(e,1),this.fire("scope:remove-document",{doc:t,window:n,scope:this,options:r})}},{key:"getDocIndex",value:function(t){for(var e=0;e<this.documents.length;e++)if(this.documents[e].doc===t)return e;return-1}},{key:"getDocOptions",value:function(t){var e=this.getDocIndex(t);return-1===e?null:this.documents[e].options}},{key:"now",value:function(){return(this.window.Date||Date).now()}}]),t}();function S(t,e){return w.init(e),n.default.init(e),P.init(e),_.init(e),x.init(e),t.usePlugin(r.default),t.document=e.document,t.window=e,t}e.Scope=j}),k=t(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var P=n(z),u=n(T),f=n(Tt),_=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==l(t)&&"function"!=typeof t)return{default:t};var e=a();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(dt),s=n(Wn),o=n(Qn);O({});function a(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return a=function(){return t},t}function n(t){return t&&t.__esModule?t:{default:t}}function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function x(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function p(t,e){return!e||"object"!==l(e)&&"function"!=typeof e?function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(t):e}function d(t){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function v(t,e){return(v=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var y=["pointerDown","pointerMove","pointerUp","updatePointer","removePointer","windowBlur"];function h(O,w){return function(t){var e=w.interactions.list,n=_.getPointerType(t),r=x(_.getEventTargets(t),2),o=r[0],i=r[1],a=[];if(/^touch/.test(t.type)){w.prevTouchTime=w.now();for(var u=0;u<t.changedTouches.length;u++){var s=t.changedTouches[u],l={pointer:s,pointerId:_.getPointerId(s),pointerType:n,eventType:t.type,eventTarget:o,curEventTarget:i,scope:w},c=j(l);a.push([l.pointer,l.eventTarget,l.curEventTarget,c])}}else{var f=!1;if(!P.default.supportsPointerEvent&&/mouse/.test(t.type)){for(var p=0;p<e.length&&!f;p++)f="mouse"!==e[p].pointerType&&e[p].pointerIsDown;f=f||w.now()-w.prevTouchTime<500||0===t.timeStamp}if(!f){var d={pointer:t,pointerId:_.getPointerId(t),pointerType:n,eventType:t.type,curEventTarget:i,eventTarget:o,scope:w},v=j(d);a.push([d.pointer,d.eventTarget,d.curEventTarget,v])}}for(var y=0;y<a.length;y++){var h=x(a[y],4),g=h[0],b=h[1],m=h[2];h[3][O](g,t,b,m)}}}function j(t){var e=t.pointerType,n=t.scope,r={interaction:o.default.search(t),searchDetails:t};return n.fire("interactions:find",r),r.interaction||n.interactions.new({pointerType:e})}function r(t,e){var n=t.doc,r=t.scope,o=t.options,i=r.interactions.docEvents,a=f.default[e];for(var u in r.browser.isIOS&&!o.events&&(o.events={passive:!1}),f.default.delegatedEvents)a(n,u,f.default.delegateListener),a(n,u,f.default.delegateUseCapture,!0);for(var s=o&&o.events,l=0;l<i.length;l++){var c=i[l];a(n,c.type,c.listener,s)}}var i={id:"core/interactions",install:function(o){for(var t={},e=0;e<y.length;e++){var n=y[e];t[n]=h(n,o)}var r,i=P.default.pEventTypes;function a(){for(var t=0;t<o.interactions.list.length;t++){var e=o.interactions.list[t];if(e.pointerIsDown&&"touch"===e.pointerType&&!e._interacting)for(var n=function(){var n=e.pointers[r];o.documents.some(function(t){var e=t.doc;return(0,K.nodeContains)(e,n.downTarget)})||e.removePointer(n.pointer,n.event)},r=0;r<e.pointers.length;r++){n()}}}(r=u.default.PointerEvent?[{type:i.down,listener:a},{type:i.down,listener:t.pointerDown},{type:i.move,listener:t.pointerMove},{type:i.up,listener:t.pointerUp},{type:i.cancel,listener:t.pointerUp}]:[{type:"mousedown",listener:t.pointerDown},{type:"mousemove",listener:t.pointerMove},{type:"mouseup",listener:t.pointerUp},{type:"touchstart",listener:a},{type:"touchstart",listener:t.pointerDown},{type:"touchmove",listener:t.pointerMove},{type:"touchend",listener:t.pointerUp},{type:"touchcancel",listener:t.pointerUp}]).push({type:"blur",listener:function(t){for(var e=0;e<o.interactions.list.length;e++){o.interactions.list[e].documentBlur(t)}}}),o.prevTouchTime=0,o.Interaction=function(){function t(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),p(this,d(t).apply(this,arguments))}var e,n,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)}(t,s["default"]),e=t,(n=[{key:"_now",value:function(){return o.now()}},{key:"pointerMoveTolerance",get:function(){return o.interactions.pointerMoveTolerance},set:function(t){o.interactions.pointerMoveTolerance=t}}])&&c(e.prototype,n),r&&c(e,r),t}(),o.interactions={list:[],new:function(t){t.scopeFire=function(t,e){return o.fire(t,e)};var e=new o.Interaction(t);return o.interactions.list.push(e),e},listeners:t,docEvents:r,pointerMoveTolerance:1}},listeners:{"scope:add-document":function(t){return r(t,"add")},"scope:remove-document":function(t){return r(t,"remove")}},onDocSignal:r,doOnInteractions:h,methodNames:y};e.default=i}),e={};Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default=function(t){return!(!t||!t.Window)&&t instanceof t.Window};var w={};Object.defineProperty(w,"__esModule",{value:!0}),w.init=i,w.getWindow=a,w.default=void 0;var n,r=(n=e)&&n.__esModule?n:{default:n};var o={realWindow:void 0,window:void 0,getWindow:a,init:i};function i(t){var e=(o.realWindow=t).document.createTextNode("");e.ownerDocument!==t.document&&"function"==typeof t.wrap&&t.wrap(e)===e&&(t=t.wrap(t)),o.window=t}function a(t){return(0,r.default)(t)?t:(t.ownerDocument||t).defaultView||o.window}"undefined"==typeof window?(o.window=void 0,o.realWindow=void 0):i(window),o.init=i;var u=o;w.default=u;var P={};Object.defineProperty(P,"__esModule",{value:!0}),P.array=P.plainObject=P.element=P.string=P.bool=P.number=P.func=P.object=P.docFrag=P.window=void 0;var s=c(e),l=c(w);function c(t){return t&&t.__esModule?t:{default:t}}function f(t){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}P.window=function(t){return t===l.default.window||(0,s.default)(t)};P.docFrag=function(t){return p(t)&&11===t.nodeType};var p=function(t){return!!t&&"object"===f(t)};P.object=p;function d(t){return"function"==typeof t}P.func=d;P.number=function(t){return"number"==typeof t};P.bool=function(t){return"boolean"==typeof t};P.string=function(t){return"string"==typeof t};P.element=function(t){if(!t||"object"!==f(t))return!1;var e=l.default.getWindow(t)||l.default.window;return/object|function/.test(f(e.Element))?t instanceof e.Element:1===t.nodeType&&"string"==typeof t.nodeName};P.plainObject=function(t){return p(t)&&!!t.constructor&&/function Object\b/.test(t.constructor.toString())};P.array=function(t){return p(t)&&void 0!==t.length&&d(t.splice)};var v={};function y(t){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(v,"__esModule",{value:!0}),v.default=void 0;var h=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==y(t)&&"function"!=typeof t)return{default:t};var e=g();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(P);function g(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return g=function(){return t},t}function b(t){var e=t.interaction;if("drag"===e.prepared.name){var n=e.prepared.axis;"x"===n?(e.coords.cur.page.y=e.coords.start.page.y,e.coords.cur.client.y=e.coords.start.client.y,e.coords.velocity.client.y=0,e.coords.velocity.page.y=0):"y"===n&&(e.coords.cur.page.x=e.coords.start.page.x,e.coords.cur.client.x=e.coords.start.client.x,e.coords.velocity.client.x=0,e.coords.velocity.page.x=0)}}function m(t){var e=t.iEvent,n=t.interaction;if("drag"===n.prepared.name){var r=n.prepared.axis;if("x"===r||"y"===r){var o="x"===r?"y":"x";e.page[o]=n.coords.start.page[o],e.client[o]=n.coords.start.client[o],e.delta[o]=0}}}var _={id:"actions/drag",install:function(t){var e=t.actions,n=t.Interactable,r=t.defaults;n.prototype.draggable=_.draggable,e.map.drag=_,e.methodDict.drag="draggable",r.actions.drag=_.defaults},listeners:{"interactions:before-action-move":b,"interactions:action-resume":b,"interactions:action-move":m,"auto-start:check":function(t){var e=t.interaction,n=t.interactable,r=t.buttons,o=n.options.drag;if(o&&o.enabled&&(!e.pointerIsDown||!/mouse|pointer/.test(e.pointerType)||0!=(r&n.options.drag.mouseButtons)))return!(t.action={name:"drag",axis:"start"===o.lockAxis?o.startAxis:o.lockAxis})}},draggable:function(t){return h.object(t)?(this.options.drag.enabled=!1!==t.enabled,this.setPerAction("drag",t),this.setOnEvents("drag",t),/^(xy|x|y|start)$/.test(t.lockAxis)&&(this.options.drag.lockAxis=t.lockAxis),/^(xy|x|y)$/.test(t.startAxis)&&(this.options.drag.startAxis=t.startAxis),this):h.bool(t)?(this.options.drag.enabled=t,this):this.options.drag},beforeMove:b,move:m,defaults:{startAxis:"xy",lockAxis:"xy"},getCursor:function(){return"move"}},x=_;v.default=x;var j={};function S(t,e){for(var n=0;n<e.length;n++){var r=e[n];t.push(r)}return t}function E(t,e){for(var n=0;n<t.length;n++)if(e(t[n],n,t))return n;return-1}Object.defineProperty(j,"__esModule",{value:!0}),j.contains=function(t,e){return-1!==t.indexOf(e)},j.remove=function(t,e){return t.splice(t.indexOf(e),1)},j.merge=S,j.from=function(t){return S([],t)},j.findIndex=E,j.find=function(t,e){return t[E(t,e)]};var T={};Object.defineProperty(T,"__esModule",{value:!0}),T.default=void 0;var D={init:function(t){var e=t;D.document=e.document,D.DocumentFragment=e.DocumentFragment||I,D.SVGElement=e.SVGElement||I,D.SVGSVGElement=e.SVGSVGElement||I,D.SVGElementInstance=e.SVGElementInstance||I,D.Element=e.Element||I,D.HTMLElement=e.HTMLElement||D.Element,D.Event=e.Event,D.Touch=e.Touch||I,D.PointerEvent=e.PointerEvent||e.MSPointerEvent},document:null,DocumentFragment:null,SVGElement:null,SVGSVGElement:null,SVGElementInstance:null,Element:null,HTMLElement:null,Event:null,Touch:null,PointerEvent:null};function I(){}var A=D;T.default=A;var z={};function C(t){return(C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(z,"__esModule",{value:!0}),z.default=void 0;var W=Y(T),R=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==C(t)&&"function"!=typeof t)return{default:t};var e=X();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(P),F=Y(w);function X(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return X=function(){return t},t}function Y(t){return t&&t.__esModule?t:{default:t}}var L={init:function(t){var e=W.default.Element,n=F.default.window.navigator;L.supportsTouch="ontouchstart"in t||R.func(t.DocumentTouch)&&W.default.document instanceof t.DocumentTouch,L.supportsPointerEvent=!1!==n.pointerEnabled&&!!W.default.PointerEvent,L.isIOS=/iP(hone|od|ad)/.test(n.platform),L.isIOS7=/iP(hone|od|ad)/.test(n.platform)&&/OS 7[^\d]/.test(n.appVersion),L.isIe9=/MSIE 9/.test(n.userAgent),L.isOperaMobile="Opera"===n.appName&&L.supportsTouch&&/Presto/.test(n.userAgent),L.prefixedMatchesSelector="matches"in e.prototype?"matches":"webkitMatchesSelector"in e.prototype?"webkitMatchesSelector":"mozMatchesSelector"in e.prototype?"mozMatchesSelector":"oMatchesSelector"in e.prototype?"oMatchesSelector":"msMatchesSelector",L.pEventTypes=L.supportsPointerEvent?W.default.PointerEvent===t.MSPointerEvent?{up:"MSPointerUp",down:"MSPointerDown",over:"mouseover",out:"mouseout",move:"MSPointerMove",cancel:"MSPointerCancel"}:{up:"pointerup",down:"pointerdown",over:"pointerover",out:"pointerout",move:"pointermove",cancel:"pointercancel"}:null,L.wheelEvent="onmousewheel"in W.default.document?"mousewheel":"wheel"},supportsTouch:null,supportsPointerEvent:null,isIOS7:null,isIOS:null,isIe9:null,isOperaMobile:null,prefixedMatchesSelector:null,pEventTypes:null,wheelEvent:null};var N=L;z.default=N;var B={};function V(t){return(V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(B,"__esModule",{value:!0}),B.default=function t(e){var n={};for(var r in e){var o=e[r];U.plainObject(o)?n[r]=t(o):U.array(o)?n[r]=q.from(o):n[r]=o}return n};var q=H(j),U=H(P);function G(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return G=function(){return t},t}function H(t){if(t&&t.__esModule)return t;if(null===t||"object"!==V(t)&&"function"!=typeof t)return{default:t};var e=G();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}var K={};function $(t){return($="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(K,"__esModule",{value:!0}),K.nodeContains=function(t,e){for(;e;){if(e===t)return!0;e=e.parentNode}return!1},K.closest=function(t,e){for(;Q.element(t);){if(it(t,e))return t;t=ot(t)}return null},K.parentNode=ot,K.matchesSelector=it,K.indexOfDeepestElement=function(t){var e,n,r=[],o=t[0],i=o?0:-1;for(e=1;e<t.length;e++){var a=t[e];if(a&&a!==o)if(o){if(a.parentNode!==a.ownerDocument)if(o.parentNode!==a.ownerDocument)if(a.parentNode!==o.parentNode){if(!r.length)for(var u=o,s=void 0;(s=at(u))&&s!==u.ownerDocument;)r.unshift(u),u=s;var l=void 0;if(o instanceof J.default.HTMLElement&&a instanceof J.default.SVGElement&&!(a instanceof J.default.SVGSVGElement)){if(a===o.parentNode)continue;l=a.ownerSVGElement}else l=a;for(var c=[];l.parentNode!==l.ownerDocument;)c.unshift(l),l=at(l);for(n=0;c[n]&&c[n]===r[n];)n++;for(var f=[c[n-1],c[n],r[n]],p=f[0].lastChild;p;){if(p===f[1]){o=a,i=e,r=c;break}if(p===f[2])break;p=p.previousSibling}}else{var d=parseInt((0,tt.getWindow)(o).getComputedStyle(o).zIndex,10)||0,v=parseInt((0,tt.getWindow)(a).getComputedStyle(a).zIndex,10)||0;d<=v&&(o=a,i=e)}else o=a,i=e}else o=a,i=e}return i},K.matchesUpTo=function(t,e,n){for(;Q.element(t);){if(it(t,e))return!0;if((t=ot(t))===n)return it(t,e)}return!1},K.getActualElement=function(t){return t instanceof J.default.SVGElementInstance?t.correspondingUseElement:t},K.getScrollXY=ut,K.getElementClientRect=st,K.getElementRect=function(t){var e=st(t);if(!Z.default.isIOS7&&e){var n=ut(tt.default.getWindow(t));e.left+=n.x,e.right+=n.x,e.top+=n.y,e.bottom+=n.y}return e},K.getPath=function(t){var e=[];for(;t;)e.push(t),t=ot(t);return e},K.trySelector=function(t){return!!Q.string(t)&&(J.default.document.querySelector(t),!0)};var Z=rt(z),J=rt(T),Q=nt(P),tt=nt(w);function et(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return et=function(){return t},t}function nt(t){if(t&&t.__esModule)return t;if(null===t||"object"!==$(t)&&"function"!=typeof t)return{default:t};var e=et();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function rt(t){return t&&t.__esModule?t:{default:t}}function ot(t){var e=t.parentNode;if(Q.docFrag(e)){for(;(e=e.host)&&Q.docFrag(e););return e}return e}function it(t,e){return tt.default.window!==tt.default.realWindow&&(e=e.replace(/\/deep\//g," ")),t[Z.default.prefixedMatchesSelector](e)}var at=function(t){return t.parentNode?t.parentNode:t.host};function ut(t){return{x:(t=t||tt.default.window).scrollX||t.document.documentElement.scrollLeft,y:t.scrollY||t.document.documentElement.scrollTop}}function st(t){var e=t instanceof J.default.SVGElement?t.getBoundingClientRect():t.getClientRects()[0];return e&&{left:e.left,right:e.right,top:e.top,bottom:e.bottom,width:e.width||e.right-e.left,height:e.height||e.bottom-e.top}}var lt={};function ct(t,e){for(var n in e){var r=ct.prefixedPropREs,o=!1;for(var i in r)if(0===n.indexOf(i)&&r[i].test(n)){o=!0;break}o||"function"==typeof e[n]||(t[n]=e[n])}return t}Object.defineProperty(lt,"__esModule",{value:!0}),lt.default=void 0,ct.prefixedPropREs={webkit:/(Movement[XY]|Radius[XY]|RotationAngle|Force)$/,moz:/(Pressure)$/};var ft=ct;lt.default=ft;var pt={};Object.defineProperty(pt,"__esModule",{value:!0}),pt.default=void 0;pt.default=function(t,e){return Math.sqrt(t*t+e*e)};var dt={};function vt(t){return(vt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(dt,"__esModule",{value:!0}),dt.copyCoords=function(t,e){t.page=t.page||{},t.page.x=e.page.x,t.page.y=e.page.y,t.client=t.client||{},t.client.x=e.client.x,t.client.y=e.client.y,t.timeStamp=e.timeStamp},dt.setCoordDeltas=function(t,e,n){t.page.x=n.page.x-e.page.x,t.page.y=n.page.y-e.page.y,t.client.x=n.client.x-e.client.x,t.client.y=n.client.y-e.client.y,t.timeStamp=n.timeStamp-e.timeStamp},dt.setCoordVelocity=function(t,e){var n=Math.max(e.timeStamp/1e3,.001);t.page.x=e.page.x/n,t.page.y=e.page.y/n,t.client.x=e.client.x/n,t.client.y=e.client.y/n,t.timeStamp=n},dt.setZeroCoords=function(t){t.page.x=0,t.page.y=0,t.client.x=0,t.client.y=0},dt.isNativePointer=xt,dt.getXY=jt,dt.getPageXY=St,dt.getClientXY=Mt,dt.getPointerId=function(t){return mt.number(t.pointerId)?t.pointerId:t.identifier},dt.setCoords=function(t,e,n){var r=1<e.length?Et(e):e[0],o={};St(r,o),t.page.x=o.x,t.page.y=o.y,Mt(r,o),t.client.x=o.x,t.client.y=o.y,t.timeStamp=n},dt.getTouchPair=kt,dt.pointerAverage=Et,dt.touchBBox=function(t){if(!(t.length||t.touches&&1<t.touches.length))return null;var e=kt(t),n=Math.min(e[0].pageX,e[1].pageX),r=Math.min(e[0].pageY,e[1].pageY),o=Math.max(e[0].pageX,e[1].pageX),i=Math.max(e[0].pageY,e[1].pageY);return{x:n,y:r,left:n,top:r,right:o,bottom:i,width:o-n,height:i-r}},dt.touchDistance=function(t,e){var n=e+"X",r=e+"Y",o=kt(t),i=o[0][n]-o[1][n],a=o[0][r]-o[1][r];return(0,bt.default)(i,a)},dt.touchAngle=function(t,e){var n=e+"X",r=e+"Y",o=kt(t),i=o[1][n]-o[0][n],a=o[1][r]-o[0][r];return 180*Math.atan2(a,i)/Math.PI},dt.getPointerType=function(t){return mt.string(t.pointerType)?t.pointerType:mt.number(t.pointerType)?[void 0,void 0,"touch","pen","mouse"][t.pointerType]:/touch/.test(t.type)||t instanceof ht.default.Touch?"touch":"mouse"},dt.getEventTargets=function(t){var e=mt.func(t.composedPath)?t.composedPath():t.path;return[gt.getActualElement(e?e[0]:t.target),gt.getActualElement(t.currentTarget)]},dt.newCoords=function(){return{page:{x:0,y:0},client:{x:0,y:0},timeStamp:0}},dt.coordsToEvent=function(t){return{coords:t,get page(){return this.coords.page},get client(){return this.coords.client},get timeStamp(){return this.coords.timeStamp},get pageX(){return this.coords.page.x},get pageY(){return this.coords.page.y},get clientX(){return this.coords.client.x},get clientY(){return this.coords.client.y},get pointerId(){return this.coords.pointerId},get target(){return this.coords.target},get type(){return this.coords.type},get pointerType(){return this.coords.pointerType},get buttons(){return this.coords.buttons}}},Object.defineProperty(dt,"pointerExtend",{enumerable:!0,get:function(){return Ot.default}});var yt=_t(z),ht=_t(T),gt=Pt(K),bt=_t(pt),mt=Pt(P),Ot=_t(lt);function wt(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return wt=function(){return t},t}function Pt(t){if(t&&t.__esModule)return t;if(null===t||"object"!==vt(t)&&"function"!=typeof t)return{default:t};var e=wt();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function _t(t){return t&&t.__esModule?t:{default:t}}function xt(t){return t instanceof ht.default.Event||t instanceof ht.default.Touch}function jt(t,e,n){return(n=n||{}).x=e[(t=t||"page")+"X"],n.y=e[t+"Y"],n}function St(t,e){return e=e||{x:0,y:0},yt.default.isOperaMobile&&xt(t)?(jt("screen",t,e),e.x+=window.scrollX,e.y+=window.scrollY):jt("page",t,e),e}function Mt(t,e){return e=e||{},yt.default.isOperaMobile&&xt(t)?jt("screen",t,e):jt("client",t,e),e}function kt(t){var e=[];return mt.array(t)?(e[0]=t[0],e[1]=t[1]):"touchend"===t.type?1===t.touches.length?(e[0]=t.touches[0],e[1]=t.changedTouches[0]):0===t.touches.length&&(e[0]=t.changedTouches[0],e[1]=t.changedTouches[1]):(e[0]=t.touches[0],e[1]=t.touches[1]),e}function Et(t){for(var e={pageX:0,pageY:0,clientX:0,clientY:0,screenX:0,screenY:0},n=0;n<t.length;n++){var r=t[n];for(var o in e)e[o]+=r[o]}for(var i in e)e[i]/=t.length;return e}var Tt={};function Dt(t){return(Dt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Tt,"__esModule",{value:!0}),Tt.default=Tt.FakeEvent=void 0;var It,At=Ft(K),zt=Ft(P),Ct=(It=lt)&&It.__esModule?It:{default:It},Wt=Ft(dt);function Rt(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Rt=function(){return t},t}function Ft(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Dt(t)&&"function"!=typeof t)return{default:t};var e=Rt();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function Xt(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Yt(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var Lt=[],Nt=[],Bt={},Vt=[];function qt(t,e,n,r){var o=Kt(r),i=Lt.indexOf(t),a=Nt[i];a||(a={events:{},typeCount:0},i=Lt.push(t)-1,Nt.push(a)),a.events[e]||(a.events[e]=[],a.typeCount++),t.removeEventListener&&!(0,j.contains)(a.events[e],n)&&(t.addEventListener(e,n,Zt.supportsOptions?o:!!o.capture),a.events[e].push(n))}function Ut(t,e,n,r){var o=Kt(r),i=Lt.indexOf(t),a=Nt[i];if(a&&a.events)if("all"!==e){if(a.events[e]){var u=a.events[e].length;if("all"===n){for(var s=0;s<u;s++)Ut(t,e,a.events[e][s],o);return}for(var l=0;l<u;l++)if(t.removeEventListener&&a.events[e][l]===n){t.removeEventListener(e,n,Zt.supportsOptions?o:!!o.capture),a.events[e].splice(l,1);break}a.events[e]&&0===a.events[e].length&&(a.events[e]=null,a.typeCount--)}a.typeCount||(Nt.splice(i,1),Lt.splice(i,1))}else for(e in a.events)a.events.hasOwnProperty(e)&&Ut(t,e,"all")}function Gt(t,e){for(var n=Kt(e),r=new $t(t),o=Bt[t.type],i=Yt(Wt.getEventTargets(t),1)[0],a=i;zt.element(a);){for(var u=0;u<o.selectors.length;u++){var s=o.selectors[u],l=o.contexts[u];if(At.matchesSelector(a,s)&&At.nodeContains(l,i)&&At.nodeContains(l,a)){var c=o.listeners[u];r.currentTarget=a;for(var f=0;f<c.length;f++){var p=Yt(c[f],3),d=p[0],v=p[1],y=p[2];v===!!n.capture&&y===n.passive&&d(r)}}}a=At.parentNode(a)}}function Ht(t){return Gt.call(this,t,!0)}function Kt(t){return zt.object(t)?t:{capture:t}}var $t=function(){function o(t){var e,n,r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),this.originalEvent=t,r=void 0,(n="currentTarget")in(e=this)?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,(0,Ct.default)(this,t)}var t,e,n;return t=o,(e=[{key:"preventOriginalDefault",value:function(){this.originalEvent.preventDefault()}},{key:"stopPropagation",value:function(){this.originalEvent.stopPropagation()}},{key:"stopImmediatePropagation",value:function(){this.originalEvent.stopImmediatePropagation()}}])&&Xt(t.prototype,e),n&&Xt(t,n),o}();Tt.FakeEvent=$t;var Zt={add:qt,remove:Ut,addDelegate:function(t,e,n,r,o){var i=Kt(o);if(!Bt[n]){Bt[n]={contexts:[],listeners:[],selectors:[]};for(var a=0;a<Vt.length;a++){var u=Vt[a];qt(u,n,Gt),qt(u,n,Ht,!0)}}var s,l=Bt[n];for(s=l.selectors.length-1;0<=s&&(l.selectors[s]!==t||l.contexts[s]!==e);s--);-1===s&&(s=l.selectors.length,l.selectors.push(t),l.contexts.push(e),l.listeners.push([])),l.listeners[s].push([r,!!i.capture,i.passive])},removeDelegate:function(t,e,n,r,o){var i,a=Kt(o),u=Bt[n],s=!1;if(u)for(i=u.selectors.length-1;0<=i;i--)if(u.selectors[i]===t&&u.contexts[i]===e){for(var l=u.listeners[i],c=l.length-1;0<=c;c--){var f=Yt(l[c],3),p=f[0],d=f[1],v=f[2];if(p===r&&d===!!a.capture&&v===a.passive){l.splice(c,1),l.length||(u.selectors.splice(i,1),u.contexts.splice(i,1),u.listeners.splice(i,1),Ut(e,n,Gt),Ut(e,n,Ht,!0),u.selectors.length||(Bt[n]=null)),s=!0;break}}if(s)break}},delegateListener:Gt,delegateUseCapture:Ht,delegatedEvents:Bt,documents:Vt,supportsOptions:!1,supportsPassive:!1,_elements:Lt,_targets:Nt,init:function(t){t.document.createElement("div").addEventListener("test",null,{get capture(){return Zt.supportsOptions=!0},get passive(){return Zt.supportsPassive=!0}})}},Jt=Zt;Tt.default=Jt;var Qt={};Object.defineProperty(Qt,"__esModule",{value:!0}),Qt.default=function(t,e){for(var n in e)t[n]=e[n];return t};var te={};function ee(t){return(ee="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(te,"__esModule",{value:!0}),te.default=function n(e,r,o){o=o||{};oe.string(e)&&-1!==e.search(" ")&&(e=ae(e));if(oe.array(e))return e.reduce(function(t,e){return(0,re.default)(t,n(e,r,o))},o);oe.object(e)&&(r=e,e="");if(oe.func(r))o[e]=o[e]||[],o[e].push(r);else if(oe.array(r))for(var t=0;t<r.length;t++){var i=r[t];n(e,i,o)}else if(oe.object(r))for(var a in r){var u=ae(a).map(function(t){return"".concat(e).concat(t)});n(u,r[a],o)}return o};var ne,re=(ne=Qt)&&ne.__esModule?ne:{default:ne},oe=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==ee(t)&&"function"!=typeof t)return{default:t};var e=ie();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(P);function ie(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return ie=function(){return t},t}function ae(t){return t.trim().split(/ +/)}var ue={};function se(t){return(se="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(ue,"__esModule",{value:!0}),ue.default=void 0;var le=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==se(t)&&"function"!=typeof t)return{default:t};var e=de();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(j),ce=pe(Qt),fe=pe(te);function pe(t){return t&&t.__esModule?t:{default:t}}function de(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return de=function(){return t},t}function ve(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function ye(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function he(t,e){for(var n=0;n<e.length;n++){var r=e[n];if(t.immediatePropagationStopped)break;r(t)}}var ge=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),ye(this,"options",void 0),ye(this,"types",{}),ye(this,"propagationStopped",!1),ye(this,"immediatePropagationStopped",!1),ye(this,"global",void 0),this.options=(0,ce.default)({},t||{})}var t,n,r;return t=e,(n=[{key:"fire",value:function(t){var e,n=this.global;(e=this.types[t.type])&&he(t,e),!t.propagationStopped&&n&&(e=n[t.type])&&he(t,e)}},{key:"on",value:function(t,e){var n=(0,fe.default)(t,e);for(t in n)this.types[t]=le.merge(this.types[t]||[],n[t])}},{key:"off",value:function(t,e){var n=(0,fe.default)(t,e);for(t in n){var r=this.types[t];if(r&&r.length)for(var o=0;o<n[t].length;o++){var i=n[t][o],a=r.indexOf(i);-1!==a&&r.splice(a,1)}}}},{key:"getRect",value:function(){return null}}])&&ve(t.prototype,n),r&&ve(t,r),e}();ue.default=ge;var be={};function me(t){return(me="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(be,"__esModule",{value:!0}),be.getStringOptionResult=xe,be.resolveRectLike=function(t,e,n,r){var o=t;Pe.string(o)?o=xe(o,e,n):Pe.func(o)&&(o=o.apply(void 0,function(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}(r)));Pe.element(o)&&(o=(0,K.getElementRect)(o));return o},be.rectToXY=function(t){return t&&{x:"x"in t?t.x:t.left,y:"y"in t?t.y:t.top}},be.xywhToTlbr=function(t){!t||"left"in t&&"top"in t||((t=(0,we.default)({},t)).left=t.x||0,t.top=t.y||0,t.right=t.right||t.left+t.width,t.bottom=t.bottom||t.top+t.height);return t},be.tlbrToXywh=function(t){!t||"x"in t&&"y"in t||((t=(0,we.default)({},t)).x=t.left||0,t.y=t.top||0,t.width=t.width||t.right||0-t.x,t.height=t.height||t.bottom||0-t.y);return t},be.addEdges=function(t,e,n){t.left&&(e.left+=n.x);t.right&&(e.right+=n.x);t.top&&(e.top+=n.y);t.bottom&&(e.bottom+=n.y);e.width=e.right-e.left,e.height=e.bottom-e.top};var Oe,we=(Oe=Qt)&&Oe.__esModule?Oe:{default:Oe},Pe=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==me(t)&&"function"!=typeof t)return{default:t};var e=_e();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(P);function _e(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return _e=function(){return t},t}function xe(t,e,n){return"parent"===t?(0,K.parentNode)(n):"self"===t?e.getRect(n):(0,K.closest)(n,t)}var je={};Object.defineProperty(je,"__esModule",{value:!0}),je.default=function(t,e,n){var r=t.options[n],o=r&&r.origin||t.options.origin,i=(0,be.resolveRectLike)(o,t,e,[t&&e]);return(0,be.rectToXY)(i)||{x:0,y:0}};var Se={};Object.defineProperty(Se,"__esModule",{value:!0}),Se.default=void 0;var Me,ke,Ee=0;var Te={request:function(t){return Me(t)},cancel:function(t){return ke(t)},init:function(t){if(Me=t.requestAnimationFrame,ke=t.cancelAnimationFrame,!Me)for(var e=["ms","moz","webkit","o"],n=0;n<e.length;n++){var r=e[n];Me=t["".concat(r,"RequestAnimationFrame")],ke=t["".concat(r,"CancelAnimationFrame")]||t["".concat(r,"CancelRequestAnimationFrame")]}Me||(Me=function(t){var e=Date.now(),n=Math.max(0,16-(e-Ee)),r=setTimeout(function(){t(e+n)},n);return Ee=e+n,r},ke=function(t){return clearTimeout(t)})}};Se.default=Te;var De={};function Ie(t){return(Ie="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(De,"__esModule",{value:!0}),De.warnOnce=function(t,e){var n=!1;return function(){return n||(Fe.default.window.console.warn(e),n=!0),t.apply(this,arguments)}},De.copyAction=function(t,e){return t.name=e.name,t.axis=e.axis,t.edges=e.edges,t},Object.defineProperty(De,"win",{enumerable:!0,get:function(){return Fe.default}}),Object.defineProperty(De,"browser",{enumerable:!0,get:function(){return Xe.default}}),Object.defineProperty(De,"clone",{enumerable:!0,get:function(){return Ye.default}}),Object.defineProperty(De,"events",{enumerable:!0,get:function(){return Le.default}}),Object.defineProperty(De,"extend",{enumerable:!0,get:function(){return Ne.default}}),Object.defineProperty(De,"getOriginXY",{enumerable:!0,get:function(){return Be.default}}),Object.defineProperty(De,"hypot",{enumerable:!0,get:function(){return Ve.default}}),Object.defineProperty(De,"normalizeListeners",{enumerable:!0,get:function(){return qe.default}}),Object.defineProperty(De,"raf",{enumerable:!0,get:function(){return Ue.default}}),De.rect=De.pointer=De.is=De.dom=De.arr=void 0;var Ae=Ke(j);De.arr=Ae;var ze=Ke(K);De.dom=ze;var Ce=Ke(P);De.is=Ce;var We=Ke(dt);De.pointer=We;var Re=Ke(be);De.rect=Re;var Fe=Ge(w),Xe=Ge(z),Ye=Ge(B),Le=Ge(Tt),Ne=Ge(Qt),Be=Ge(je),Ve=Ge(pt),qe=Ge(te),Ue=Ge(Se);function Ge(t){return t&&t.__esModule?t:{default:t}}function He(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return He=function(){return t},t}function Ke(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Ie(t)&&"function"!=typeof t)return{default:t};var e=He();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}var $e={};Object.defineProperty($e,"__esModule",{value:!0}),$e.default=$e.defaults=void 0;var Ze={base:{preventDefault:"auto",deltaSource:"page"},perAction:{enabled:!1,origin:{x:0,y:0}},actions:{}},Je=$e.defaults=Ze;$e.default=Je;var Qe={};function tn(t){return(tn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Qe,"__esModule",{value:!0}),Qe.default=void 0;var en,nn=sn(j),rn=sn(K),on=(en=Qt)&&en.__esModule?en:{default:en},an=sn(P);function un(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return un=function(){return t},t}function sn(t){if(t&&t.__esModule)return t;if(null===t||"object"!==tn(t)&&"function"!=typeof t)return{default:t};var e=un();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function ln(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function cn(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var fn=function(){function e(t){var a=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.scope=t,cn(this,"list",[]),cn(this,"selectorMap",{}),t.addListeners({"interactable:unset":function(t){var e=t.interactable,n=e.target,r=e._context,o=an.string(n)?a.selectorMap[n]:n[a.scope.id],i=o.findIndex(function(t){return t.context===r});o[i]&&(o[i].context=null,o[i].interactable=null),o.splice(i,1)}})}var t,n,r;return t=e,(n=[{key:"new",value:function(t,e){e=(0,on.default)(e||{},{actions:this.scope.actions});var n=new this.scope.Interactable(t,e,this.scope.document),r={context:n._context,interactable:n};return this.scope.addDocument(n._doc),this.list.push(n),an.string(t)?(this.selectorMap[t]||(this.selectorMap[t]=[]),this.selectorMap[t].push(r)):(n.target[this.scope.id]||Object.defineProperty(t,this.scope.id,{value:[],configurable:!0}),t[this.scope.id].push(r)),this.scope.fire("interactable:new",{target:t,options:e,interactable:n,win:this.scope._win}),n}},{key:"get",value:function(e,t){var n=t&&t.context||this.scope.document,r=an.string(e),o=r?this.selectorMap[e]:e[this.scope.id];if(!o)return null;var i=nn.find(o,function(t){return t.context===n&&(r||t.interactable.inContext(e))});return i&&i.interactable}},{key:"forEachMatch",value:function(t,e){for(var n=0;n<this.list.length;n++){var r=this.list[n],o=void 0;if((an.string(r.target)?an.element(t)&&rn.matchesSelector(t,r.target):t===r.target)&&r.inContext(t)&&(o=e(r)),void 0!==o)return o}}}])&&ln(t.prototype,n),r&&ln(t,r),e}();Qe.default=fn;var pn={};function dn(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function vn(t,e,n){return e&&dn(t.prototype,e),n&&dn(t,n),t}function yn(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(pn,"__esModule",{value:!0}),pn.default=pn.BaseEvent=void 0;var hn=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),yn(this,"type",void 0),yn(this,"target",void 0),yn(this,"currentTarget",void 0),yn(this,"interactable",void 0),yn(this,"_interaction",void 0),yn(this,"timeStamp",void 0),yn(this,"immediatePropagationStopped",!1),yn(this,"propagationStopped",!1),this._interaction=t}return vn(e,[{key:"interaction",get:function(){return this._interaction._proxy}}]),vn(e,[{key:"preventDefault",value:function(){}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}}]),e}(),gn=pn.BaseEvent=hn;pn.default=gn;var bn={};Object.defineProperty(bn,"__esModule",{value:!0}),bn.default=bn.InteractEvent=void 0;var mn=xn(Qt),On=xn(je),wn=xn(pt),Pn=xn(pn),_n=xn($e);function xn(t){return t&&t.__esModule?t:{default:t}}function jn(t){return(jn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function Sn(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Mn(t){return(Mn=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function kn(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function En(t,e){return(En=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function Tn(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Dn=function(){function g(t,e,n,r,o,i,a){var u,s,l;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,g),s=this,u=!(l=Mn(g).call(this,t))||"object"!==jn(l)&&"function"!=typeof l?kn(s):l,Tn(kn(u),"target",void 0),Tn(kn(u),"currentTarget",void 0),Tn(kn(u),"relatedTarget",null),Tn(kn(u),"screenX",void 0),Tn(kn(u),"screenY",void 0),Tn(kn(u),"button",void 0),Tn(kn(u),"buttons",void 0),Tn(kn(u),"ctrlKey",void 0),Tn(kn(u),"shiftKey",void 0),Tn(kn(u),"altKey",void 0),Tn(kn(u),"metaKey",void 0),Tn(kn(u),"page",void 0),Tn(kn(u),"client",void 0),Tn(kn(u),"delta",void 0),Tn(kn(u),"rect",void 0),Tn(kn(u),"x0",void 0),Tn(kn(u),"y0",void 0),Tn(kn(u),"t0",void 0),Tn(kn(u),"dt",void 0),Tn(kn(u),"duration",void 0),Tn(kn(u),"clientX0",void 0),Tn(kn(u),"clientY0",void 0),Tn(kn(u),"velocity",void 0),Tn(kn(u),"speed",void 0),Tn(kn(u),"swipe",void 0),Tn(kn(u),"timeStamp",void 0),Tn(kn(u),"dragEnter",void 0),Tn(kn(u),"dragLeave",void 0),Tn(kn(u),"axes",void 0),Tn(kn(u),"preEnd",void 0),o=o||t.element;var c=t.interactable,f=(c&&c.options||_n.default).deltaSource,p=(0,On.default)(c,o,n),d="start"===r,v="end"===r,y=d?kn(u):t.prevEvent,h=d?t.coords.start:v?{page:y.page,client:y.client,timeStamp:t.coords.cur.timeStamp}:t.coords.cur;return u.page=(0,mn.default)({},h.page),u.client=(0,mn.default)({},h.client),u.rect=(0,mn.default)({},t.rect),u.timeStamp=h.timeStamp,v||(u.page.x-=p.x,u.page.y-=p.y,u.client.x-=p.x,u.client.y-=p.y),u.ctrlKey=e.ctrlKey,u.altKey=e.altKey,u.shiftKey=e.shiftKey,u.metaKey=e.metaKey,u.button=e.button,u.buttons=e.buttons,u.target=o,u.currentTarget=o,u.preEnd=i,u.type=a||n+(r||""),u.interactable=c,u.t0=d?t.pointers[t.pointers.length-1].downTime:y.t0,u.x0=t.coords.start.page.x-p.x,u.y0=t.coords.start.page.y-p.y,u.clientX0=t.coords.start.client.x-p.x,u.clientY0=t.coords.start.client.y-p.y,u.delta=d||v?{x:0,y:0}:{x:u[f].x-y[f].x,y:u[f].y-y[f].y},u.dt=t.coords.delta.timeStamp,u.duration=u.timeStamp-u.t0,u.velocity=(0,mn.default)({},t.coords.velocity[f]),u.speed=(0,wn.default)(u.velocity.x,u.velocity.y),u.swipe=v||"inertiastart"===r?u.getSwipe():null,u}var t,e,n;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&En(t,e)}(g,Pn["default"]),t=g,(e=[{key:"getSwipe",value:function(){var t=this._interaction;if(t.prevEvent.speed<600||150<this.timeStamp-t.prevEvent.timeStamp)return null;var e=180*Math.atan2(t.prevEvent.velocityY,t.prevEvent.velocityX)/Math.PI;e<0&&(e+=360);var n=112.5<=e&&e<247.5,r=202.5<=e&&e<337.5;return{up:r,down:!r&&22.5<=e&&e<157.5,left:n,right:!n&&(292.5<=e||e<67.5),angle:e,speed:t.prevEvent.speed,velocity:{x:t.prevEvent.velocityX,y:t.prevEvent.velocityY}}}},{key:"preventDefault",value:function(){}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}},{key:"pageX",get:function(){return this.page.x},set:function(t){this.page.x=t}},{key:"pageY",get:function(){return this.page.y},set:function(t){this.page.y=t}},{key:"clientX",get:function(){return this.client.x},set:function(t){this.client.x=t}},{key:"clientY",get:function(){return this.client.y},set:function(t){this.client.y=t}},{key:"dx",get:function(){return this.delta.x},set:function(t){this.delta.x=t}},{key:"dy",get:function(){return this.delta.y},set:function(t){this.delta.y=t}},{key:"velocityX",get:function(){return this.velocity.x},set:function(t){this.velocity.x=t}},{key:"velocityY",get:function(){return this.velocity.y},set:function(t){this.velocity.y=t}}])&&Sn(t.prototype,e),n&&Sn(t,n),g}(),In=bn.InteractEvent=Dn;bn.default=In;var An={};Object.defineProperty(An,"__esModule",{value:!0}),An.default=An.PointerInfo=void 0;function zn(t,e,n,r,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,zn),this.id=t,this.pointer=e,this.event=n,this.downTime=r,this.downTarget=o}var Cn=An.PointerInfo=zn;An.default=Cn;var Wn={};function Rn(t){return(Rn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Wn,"__esModule",{value:!0}),Object.defineProperty(Wn,"PointerInfo",{enumerable:!0,get:function(){return Vn.default}}),Wn.default=Wn.Interaction=Wn._ProxyMethods=Wn._ProxyValues=void 0;var Fn,Xn,Yn,Ln,Nn=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Rn(t)&&"function"!=typeof t)return{default:t};var e=Un();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(De),Bn=qn(bn),Vn=qn(An);function qn(t){return t&&t.__esModule?t:{default:t}}function Un(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Un=function(){return t},t}function Gn(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Hn(t,e,n){return e&&Gn(t.prototype,e),n&&Gn(t,n),t}function Kn(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Wn._ProxyValues=Fn,(Xn=Fn||(Wn._ProxyValues=Fn={})).interactable="",Xn.element="",Xn.prepared="",Xn.pointerIsDown="",Xn.pointerWasMoved="",Xn._proxy="",Wn._ProxyMethods=Yn,(Ln=Yn||(Wn._ProxyMethods=Yn={})).start="",Ln.move="",Ln.end="",Ln.stop="",Ln.interacting="";var $n=0,Zn=function(){function l(t){var e=this,n=t.pointerType,r=t.scopeFire;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,l),Kn(this,"interactable",null),Kn(this,"element",null),Kn(this,"rect",void 0),Kn(this,"_rects",void 0),Kn(this,"edges",void 0),Kn(this,"_scopeFire",void 0),Kn(this,"prepared",{name:null,axis:null,edges:null}),Kn(this,"pointerType",void 0),Kn(this,"pointers",[]),Kn(this,"downEvent",null),Kn(this,"downPointer",{}),Kn(this,"_latestPointer",{pointer:null,event:null,eventTarget:null}),Kn(this,"prevEvent",null),Kn(this,"pointerIsDown",!1),Kn(this,"pointerWasMoved",!1),Kn(this,"_interacting",!1),Kn(this,"_ending",!1),Kn(this,"_stopped",!0),Kn(this,"_proxy",null),Kn(this,"simulation",null),Kn(this,"doMove",Nn.warnOnce(function(t){this.move(t)},"The interaction.doMove() method has been renamed to interaction.move()")),Kn(this,"coords",{start:Nn.pointer.newCoords(),prev:Nn.pointer.newCoords(),cur:Nn.pointer.newCoords(),delta:Nn.pointer.newCoords(),velocity:Nn.pointer.newCoords()}),Kn(this,"_id",$n++),this._scopeFire=r,this.pointerType=n;var o=this;this._proxy={};function i(t){Object.defineProperty(e._proxy,t,{get:function(){return o[t]}})}for(var a in Fn)i(a);function u(t){Object.defineProperty(e._proxy,t,{value:function(){return o[t].apply(o,arguments)}})}for(var s in Yn)u(s);this._scopeFire("interactions:new",{interaction:this})}return Hn(l,[{key:"pointerMoveTolerance",get:function(){return 1}}]),Hn(l,[{key:"pointerDown",value:function(t,e,n){var r=this.updatePointer(t,e,n,!0),o=this.pointers[r];this._scopeFire("interactions:down",{pointer:t,event:e,eventTarget:n,pointerIndex:r,pointerInfo:o,type:"down",interaction:this})}},{key:"start",value:function(t,e,n){return!(this.interacting()||!this.pointerIsDown||this.pointers.length<("gesture"===t.name?2:1)||!e.options[t.name].enabled)&&(Nn.copyAction(this.prepared,t),this.interactable=e,this.element=n,this.rect=e.getRect(n),this.edges=this.prepared.edges?Nn.extend({},this.prepared.edges):{left:!0,right:!0,top:!0,bottom:!0},this._stopped=!1,this._interacting=this._doPhase({interaction:this,event:this.downEvent,phase:"start"})&&!this._stopped,this._interacting)}},{key:"pointerMove",value:function(t,e,n){this.simulation||this.modification&&this.modification.endResult||this.updatePointer(t,e,n,!1);var r,o,i=this.coords.cur.page.x===this.coords.prev.page.x&&this.coords.cur.page.y===this.coords.prev.page.y&&this.coords.cur.client.x===this.coords.prev.client.x&&this.coords.cur.client.y===this.coords.prev.client.y;this.pointerIsDown&&!this.pointerWasMoved&&(r=this.coords.cur.client.x-this.coords.start.client.x,o=this.coords.cur.client.y-this.coords.start.client.y,this.pointerWasMoved=Nn.hypot(r,o)>this.pointerMoveTolerance);var a=this.getPointerIndex(t),u={pointer:t,pointerIndex:a,pointerInfo:this.pointers[a],event:e,type:"move",eventTarget:n,dx:r,dy:o,duplicate:i,interaction:this};i||Nn.pointer.setCoordVelocity(this.coords.velocity,this.coords.delta),this._scopeFire("interactions:move",u),i||this.simulation||(this.interacting()&&(u.type=null,this.move(u)),this.pointerWasMoved&&Nn.pointer.copyCoords(this.coords.prev,this.coords.cur))}},{key:"move",value:function(t){t&&t.event||Nn.pointer.setZeroCoords(this.coords.delta),(t=Nn.extend({pointer:this._latestPointer.pointer,event:this._latestPointer.event,eventTarget:this._latestPointer.eventTarget,interaction:this},t||{})).phase="move",this._doPhase(t)}},{key:"pointerUp",value:function(t,e,n,r){var o=this.getPointerIndex(t);-1===o&&(o=this.updatePointer(t,e,n,!1));var i=/cancel$/i.test(e.type)?"cancel":"up";this._scopeFire("interactions:".concat(i),{pointer:t,pointerIndex:o,pointerInfo:this.pointers[o],event:e,eventTarget:n,type:i,curEventTarget:r,interaction:this}),this.simulation||this.end(e),this.pointerIsDown=!1,this.removePointer(t,e)}},{key:"documentBlur",value:function(t){this.end(t),this._scopeFire("interactions:blur",{event:t,type:"blur",interaction:this})}},{key:"end",value:function(t){var e;this._ending=!0,t=t||this._latestPointer.event,this.interacting()&&(e=this._doPhase({event:t,interaction:this,phase:"end"})),!(this._ending=!1)===e&&this.stop()}},{key:"currentAction",value:function(){return this._interacting?this.prepared.name:null}},{key:"interacting",value:function(){return this._interacting}},{key:"stop",value:function(){this._scopeFire("interactions:stop",{interaction:this}),this.interactable=this.element=null,this._interacting=!1,this._stopped=!0,this.prepared.name=this.prevEvent=null}},{key:"getPointerIndex",value:function(t){var e=Nn.pointer.getPointerId(t);return"mouse"===this.pointerType||"pen"===this.pointerType?this.pointers.length-1:Nn.arr.findIndex(this.pointers,function(t){return t.id===e})}},{key:"getPointerInfo",value:function(t){return this.pointers[this.getPointerIndex(t)]}},{key:"updatePointer",value:function(t,e,n,r){var o=Nn.pointer.getPointerId(t),i=this.getPointerIndex(t),a=this.pointers[i];return r=!1!==r&&(r||/(down|start)$/i.test(e.type)),a?a.pointer=t:(a=new Vn.default(o,t,e,null,null),i=this.pointers.length,this.pointers.push(a)),Nn.pointer.setCoords(this.coords.cur,this.pointers.map(function(t){return t.pointer}),this._now()),Nn.pointer.setCoordDeltas(this.coords.delta,this.coords.prev,this.coords.cur),r&&(this.pointerIsDown=!0,a.downTime=this.coords.cur.timeStamp,a.downTarget=n,Nn.pointer.pointerExtend(this.downPointer,t),this.interacting()||(Nn.pointer.copyCoords(this.coords.start,this.coords.cur),Nn.pointer.copyCoords(this.coords.prev,this.coords.cur),this.downEvent=e,this.pointerWasMoved=!1)),this._updateLatestPointer(t,e,n),this._scopeFire("interactions:update-pointer",{pointer:t,event:e,eventTarget:n,down:r,pointerInfo:a,pointerIndex:i,interaction:this}),i}},{key:"removePointer",value:function(t,e){var n=this.getPointerIndex(t);if(-1!==n){var r=this.pointers[n];this._scopeFire("interactions:remove-pointer",{pointer:t,event:e,eventTarget:null,pointerIndex:n,pointerInfo:r,interaction:this}),this.pointers.splice(n,1)}}},{key:"_updateLatestPointer",value:function(t,e,n){this._latestPointer.pointer=t,this._latestPointer.event=e,this._latestPointer.eventTarget=n}},{key:"destroy",value:function(){this._latestPointer.pointer=null,this._latestPointer.event=null,this._latestPointer.eventTarget=null}},{key:"_createPreparedEvent",value:function(t,e,n,r){return new Bn.default(this,t,this.prepared.name,e,this.element,n,r)}},{key:"_fireEvent",value:function(t){this.interactable.fire(t),(!this.prevEvent||t.timeStamp>=this.prevEvent.timeStamp)&&(this.prevEvent=t)}},{key:"_doPhase",value:function(t){var e=t.event,n=t.phase,r=t.preEnd,o=t.type,i=this.rect;if(i&&"move"===n&&(Nn.rect.addEdges(this.edges,i,this.coords.delta[this.interactable.options.deltaSource]),i.width=i.right-i.left,i.height=i.bottom-i.top),!1===this._scopeFire("interactions:before-action-".concat(n),t))return!1;var a=t.iEvent=this._createPreparedEvent(e,n,r,o);return this._scopeFire("interactions:action-".concat(n),t),"start"===n&&(this.prevEvent=a),this._fireEvent(a),this._scopeFire("interactions:after-action-".concat(n),t),!0}},{key:"_now",value:function(){return Date.now()}}]),l}(),Jn=Wn.Interaction=Zn;Wn.default=Jn;var Qn={};function tr(t){return(tr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Qn,"__esModule",{value:!0}),Qn.default=void 0;var er=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==tr(t)&&"function"!=typeof t)return{default:t};var e=nr();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(K);function nr(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return nr=function(){return t},t}var rr={methodOrder:["simulationResume","mouseOrPen","hasPointer","idle"],search:function(t){for(var e=0;e<rr.methodOrder.length;e++){var n;n=rr.methodOrder[e];var r=rr[n](t);if(r)return r}return null},simulationResume:function(t){var e=t.pointerType,n=t.eventType,r=t.eventTarget,o=t.scope;if(!/down|start/i.test(n))return null;for(var i=0;i<o.interactions.list.length;i++){var a=o.interactions.list[i],u=r;if(a.simulation&&a.simulation.allowResume&&a.pointerType===e)for(;u;){if(u===a.element)return a;u=er.parentNode(u)}}return null},mouseOrPen:function(t){var e,n=t.pointerId,r=t.pointerType,o=t.eventType,i=t.scope;if("mouse"!==r&&"pen"!==r)return null;for(var a=0;a<i.interactions.list.length;a++){var u=i.interactions.list[a];if(u.pointerType===r){if(u.simulation&&!or(u,n))continue;if(u.interacting())return u;e=e||u}}if(e)return e;for(var s=0;s<i.interactions.list.length;s++){var l=i.interactions.list[s];if(!(l.pointerType!==r||/down/i.test(o)&&l.simulation))return l}return null},hasPointer:function(t){for(var e=t.pointerId,n=t.scope,r=0;r<n.interactions.list.length;r++){var o=n.interactions.list[r];if(or(o,e))return o}return null},idle:function(t){for(var e=t.pointerType,n=t.scope,r=0;r<n.interactions.list.length;r++){var o=n.interactions.list[r];if(1===o.pointers.length){var i=o.interactable;if(i&&(!i.options.gesture||!i.options.gesture.enabled))continue}else if(2<=o.pointers.length)continue;if(!o.interacting()&&e===o.pointerType)return o}return null}};function or(t,e){return t.pointers.some(function(t){return t.id===e})}var ir=rr;Qn.default=ir;var ar={};Object.defineProperty(ar,"__esModule",{value:!0}),ar.default=void 0;var ur,sr=(ur=pn)&&ur.__esModule?ur:{default:ur},lr=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==fr(t)&&"function"!=typeof t)return{default:t};var e=cr();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(j);function cr(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return cr=function(){return t},t}function fr(t){return(fr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function pr(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function dr(t){return(dr=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function vr(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function yr(t,e){return(yr=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function hr(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var gr=function(){function l(t,e,n){var r,o,i;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,l),o=this,r=!(i=dr(l).call(this,e._interaction))||"object"!==fr(i)&&"function"!=typeof i?vr(o):i,hr(vr(r),"target",void 0),hr(vr(r),"dropzone",void 0),hr(vr(r),"dragEvent",void 0),hr(vr(r),"relatedTarget",void 0),hr(vr(r),"draggable",void 0),hr(vr(r),"timeStamp",void 0),hr(vr(r),"propagationStopped",!1),hr(vr(r),"immediatePropagationStopped",!1);var a="dragleave"===n?t.prev:t.cur,u=a.element,s=a.dropzone;return r.type=n,r.target=u,r.currentTarget=u,r.dropzone=s,r.dragEvent=e,r.relatedTarget=e.target,r.draggable=e.interactable,r.timeStamp=e.timeStamp,r}var t,e,n;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&yr(t,e)}(l,sr["default"]),t=l,(e=[{key:"reject",value:function(){var r=this,t=this._interaction.dropState;if("dropactivate"===this.type||this.dropzone&&t.cur.dropzone===this.dropzone&&t.cur.element===this.target)if(t.prev.dropzone=this.dropzone,t.prev.element=this.target,t.rejected=!0,t.events.enter=null,this.stopImmediatePropagation(),"dropactivate"===this.type){var e=t.activeDrops,n=lr.findIndex(e,function(t){var e=t.dropzone,n=t.element;return e===r.dropzone&&n===r.target});t.activeDrops.splice(n,1);var o=new l(t,this.dragEvent,"dropdeactivate");o.dropzone=this.dropzone,o.target=this.target,this.dropzone.fire(o)}else this.dropzone.fire(new l(t,this.dragEvent,"dragleave"))}},{key:"preventDefault",value:function(){}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}}])&&pr(t.prototype,e),n&&pr(t,n),l}();ar.default=gr;var br={};function mr(t){return(mr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(br,"__esModule",{value:!0}),br.default=void 0;xr(M({})),O({});var Or=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==mr(t)&&"function"!=typeof t)return{default:t};var e=_r();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(De),wr=xr(v),Pr=xr(ar);function _r(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return _r=function(){return t},t}function xr(t){return t&&t.__esModule?t:{default:t}}function jr(t,e){for(var n=0;n<t.slice().length;n++){var r=t.slice()[n],o=r.dropzone,i=r.element;e.dropzone=o,e.target=i,o.fire(e),e.propagationStopped=e.immediatePropagationStopped=!1}}function Sr(t,e){for(var n=function(t,e){for(var n=t.interactables,r=[],o=0;o<n.list.length;o++){var i=n.list[o];if(i.options.drop.enabled){var a=i.options.drop.accept;if(!(Or.is.element(a)&&a!==e||Or.is.string(a)&&!Or.dom.matchesSelector(e,a)||Or.is.func(a)&&!a({dropzone:i,draggableElement:e})))for(var u=Or.is.string(i.target)?i._context.querySelectorAll(i.target):Or.is.array(i.target)?i.target:[i.target],s=0;s<u.length;s++){var l=u[s];l!==e&&r.push({dropzone:i,element:l})}}}return r}(t,e),r=0;r<n.length;r++){var o=n[r];o.rect=o.dropzone.getRect(o.element)}return n}function Mr(t,e,n){for(var r=t.dropState,o=t.interactable,i=t.element,a=[],u=0;u<r.activeDrops.length;u++){var s=r.activeDrops[u],l=s.dropzone,c=s.element,f=s.rect;a.push(l.dropCheck(e,n,o,i,c,f)?c:null)}var p=Or.dom.indexOfDeepestElement(a);return r.activeDrops[p]||null}function kr(t,e,n){var r=t.dropState,o={enter:null,leave:null,activate:null,deactivate:null,move:null,drop:null};return"dragstart"===n.type&&(o.activate=new Pr.default(r,n,"dropactivate"),o.activate.target=null,o.activate.dropzone=null),"dragend"===n.type&&(o.deactivate=new Pr.default(r,n,"dropdeactivate"),o.deactivate.target=null,o.deactivate.dropzone=null),r.rejected||(r.cur.element!==r.prev.element&&(r.prev.dropzone&&(o.leave=new Pr.default(r,n,"dragleave"),n.dragLeave=o.leave.target=r.prev.element,n.prevDropzone=o.leave.dropzone=r.prev.dropzone),r.cur.dropzone&&(o.enter=new Pr.default(r,n,"dragenter"),n.dragEnter=r.cur.element,n.dropzone=r.cur.dropzone)),"dragend"===n.type&&r.cur.dropzone&&(o.drop=new Pr.default(r,n,"drop"),n.dropzone=r.cur.dropzone,n.relatedTarget=r.cur.element),"dragmove"===n.type&&r.cur.dropzone&&(o.move=new Pr.default(r,n,"dropmove"),(o.move.dragmove=n).dropzone=r.cur.dropzone)),o}function Er(t,e){var n=t.dropState,r=n.activeDrops,o=n.cur,i=n.prev;e.leave&&i.dropzone.fire(e.leave),e.move&&o.dropzone.fire(e.move),e.enter&&o.dropzone.fire(e.enter),e.drop&&o.dropzone.fire(e.drop),e.deactivate&&jr(r,e.deactivate),n.prev.dropzone=o.dropzone,n.prev.element=o.element}function Tr(t,e){var n=t.interaction,r=t.iEvent,o=t.event;if("dragmove"===r.type||"dragend"===r.type){var i=n.dropState;e.dynamicDrop&&(i.activeDrops=Sr(e,n.element));var a=r,u=Mr(n,a,o);i.rejected=i.rejected&&!!u&&u.dropzone===i.cur.dropzone&&u.element===i.cur.element,i.cur.dropzone=u&&u.dropzone,i.cur.element=u&&u.element,i.events=kr(n,0,a)}}var Dr={id:"actions/drop",install:function(e){var t=e.actions,n=e.interact,r=e.Interactable,o=e.defaults;e.usePlugin(wr.default),r.prototype.dropzone=function(t){return function(t,e){if(Or.is.object(e)){if(t.options.drop.enabled=!1!==e.enabled,e.listeners){var n=Or.normalizeListeners(e.listeners),r=Object.keys(n).reduce(function(t,e){return t[/^(enter|leave)/.test(e)?"drag".concat(e):/^(activate|deactivate|move)/.test(e)?"drop".concat(e):e]=n[e],t},{});t.off(t.options.drop.listeners),t.on(r),t.options.drop.listeners=r}return Or.is.func(e.ondrop)&&t.on("drop",e.ondrop),Or.is.func(e.ondropactivate)&&t.on("dropactivate",e.ondropactivate),Or.is.func(e.ondropdeactivate)&&t.on("dropdeactivate",e.ondropdeactivate),Or.is.func(e.ondragenter)&&t.on("dragenter",e.ondragenter),Or.is.func(e.ondragleave)&&t.on("dragleave",e.ondragleave),Or.is.func(e.ondropmove)&&t.on("dropmove",e.ondropmove),/^(pointer|center)$/.test(e.overlap)?t.options.drop.overlap=e.overlap:Or.is.number(e.overlap)&&(t.options.drop.overlap=Math.max(Math.min(1,e.overlap),0)),"accept"in e&&(t.options.drop.accept=e.accept),"checker"in e&&(t.options.drop.checker=e.checker),t}if(Or.is.bool(e))return t.options.drop.enabled=e,t;return t.options.drop}(this,t)},r.prototype.dropCheck=function(t,e,n,r,o,i){return function(t,e,n,r,o,i,a){var u=!1;if(!(a=a||t.getRect(i)))return!!t.options.drop.checker&&t.options.drop.checker(e,n,u,t,i,r,o);var s=t.options.drop.overlap;if("pointer"===s){var l=Or.getOriginXY(r,o,"drag"),c=Or.pointer.getPageXY(e);c.x+=l.x,c.y+=l.y;var f=c.x>a.left&&c.x<a.right,p=c.y>a.top&&c.y<a.bottom;u=f&&p}var d=r.getRect(o);if(d&&"center"===s){var v=d.left+d.width/2,y=d.top+d.height/2;u=v>=a.left&&v<=a.right&&y>=a.top&&y<=a.bottom}if(d&&Or.is.number(s)){var h=Math.max(0,Math.min(a.right,d.right)-Math.max(a.left,d.left))*Math.max(0,Math.min(a.bottom,d.bottom)-Math.max(a.top,d.top))/(d.width*d.height);u=s<=h}t.options.drop.checker&&(u=t.options.drop.checker(e,n,u,t,i,r,o));return u}(this,t,e,n,r,o,i)},n.dynamicDrop=function(t){return Or.is.bool(t)?(e.dynamicDrop=t,n):e.dynamicDrop},Or.extend(t.phaselessTypes,{dragenter:!0,dragleave:!0,dropactivate:!0,dropdeactivate:!0,dropmove:!0,drop:!0}),t.methodDict.drop="dropzone",e.dynamicDrop=!1,o.actions.drop=Dr.defaults},listeners:{"interactions:before-action-start":function(t){var e=t.interaction;"drag"===e.prepared.name&&(e.dropState={cur:{dropzone:null,element:null},prev:{dropzone:null,element:null},rejected:null,events:null,activeDrops:[]})},"interactions:after-action-start":function(t,e){var n=t.interaction,r=(t.event,t.iEvent);if("drag"===n.prepared.name){var o=n.dropState;o.activeDrops=null,o.events=null,o.activeDrops=Sr(e,n.element),o.events=kr(n,0,r),o.events.activate&&(jr(o.activeDrops,o.events.activate),e.fire("actions/drop:start",{interaction:n,dragEvent:r}))}},"interactions:action-move":Tr,"interactions:action-end":Tr,"interactions:after-action-move":function(t,e){var n=t.interaction,r=t.iEvent;"drag"===n.prepared.name&&(Er(n,n.dropState.events),e.fire("actions/drop:move",{interaction:n,dragEvent:r}),n.dropState.events={})},"interactions:after-action-end":function(t,e){var n=t.interaction,r=t.iEvent;"drag"===n.prepared.name&&(Er(n,n.dropState.events),e.fire("actions/drop:end",{interaction:n,dragEvent:r}))},"interactions:stop":function(t){var e=t.interaction;if("drag"===e.prepared.name){var n=e.dropState;n&&(n.activeDrops=null,n.events=null,n.cur.dropzone=null,n.cur.element=null,n.prev.dropzone=null,n.prev.element=null,n.rejected=!1)}}},getActiveDrops:Sr,getDrop:Mr,getDropEvents:kr,fireDropEvents:Er,defaults:{enabled:!1,accept:null,overlap:"pointer"}},Ir=Dr;br.default=Ir;var Ar={};function zr(t){return(zr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Ar,"__esModule",{value:!0}),Ar.default=void 0;var Cr=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==zr(t)&&"function"!=typeof t)return{default:t};var e=Wr();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(De);function Wr(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Wr=function(){return t},t}function Rr(t){var e=t.interaction,n=t.iEvent,r=t.phase;if("gesture"===e.prepared.name){var o=e.pointers.map(function(t){return t.pointer}),i="start"===r,a="end"===r,u=e.interactable.options.deltaSource;if(n.touches=[o[0],o[1]],i)n.distance=Cr.pointer.touchDistance(o,u),n.box=Cr.pointer.touchBBox(o),n.scale=1,n.ds=0,n.angle=Cr.pointer.touchAngle(o,u),n.da=0,e.gesture.startDistance=n.distance,e.gesture.startAngle=n.angle;else if(a){var s=e.prevEvent;n.distance=s.distance,n.box=s.box,n.scale=s.scale,n.ds=0,n.angle=s.angle,n.da=0}else n.distance=Cr.pointer.touchDistance(o,u),n.box=Cr.pointer.touchBBox(o),n.scale=n.distance/e.gesture.startDistance,n.angle=Cr.pointer.touchAngle(o,u),n.ds=n.scale-e.gesture.scale,n.da=n.angle-e.gesture.angle;e.gesture.distance=n.distance,e.gesture.angle=n.angle,Cr.is.number(n.scale)&&n.scale!==1/0&&!isNaN(n.scale)&&(e.gesture.scale=n.scale)}}var Fr={id:"actions/gesture",before:["actions/drag","actions/resize"],install:function(t){var e=t.actions,n=t.Interactable,r=t.defaults;n.prototype.gesturable=function(t){return Cr.is.object(t)?(this.options.gesture.enabled=!1!==t.enabled,this.setPerAction("gesture",t),this.setOnEvents("gesture",t),this):Cr.is.bool(t)?(this.options.gesture.enabled=t,this):this.options.gesture},e.map.gesture=Fr,e.methodDict.gesture="gesturable",r.actions.gesture=Fr.defaults},listeners:{"interactions:action-start":Rr,"interactions:action-move":Rr,"interactions:action-end":Rr,"interactions:new":function(t){t.interaction.gesture={angle:0,distance:0,scale:1,startAngle:0,startDistance:0}},"auto-start:check":function(t){if(!(t.interaction.pointers.length<2)){var e=t.interactable.options.gesture;if(e&&e.enabled)return!(t.action={name:"gesture"})}}},defaults:{},getCursor:function(){return""}},Xr=Fr;Ar.default=Xr;var Yr={};function Lr(t){return(Lr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Yr,"__esModule",{value:!0}),Yr.default=void 0;var Nr,Br=Gr(K),Vr=(Nr=Qt)&&Nr.__esModule?Nr:{default:Nr},qr=Gr(P);function Ur(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Ur=function(){return t},t}function Gr(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Lr(t)&&"function"!=typeof t)return{default:t};var e=Ur();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function Hr(t,e,n,r,o,i,a){if(!e)return!1;if(!0===e){var u=qr.number(i.width)?i.width:i.right-i.left,s=qr.number(i.height)?i.height:i.bottom-i.top;if(a=Math.min(a,("left"===t||"right"===t?u:s)/2),u<0&&("left"===t?t="right":"right"===t&&(t="left")),s<0&&("top"===t?t="bottom":"bottom"===t&&(t="top")),"left"===t)return n.x<(0<=u?i.left:i.right)+a;if("top"===t)return n.y<(0<=s?i.top:i.bottom)+a;if("right"===t)return n.x>(0<=u?i.right:i.left)-a;if("bottom"===t)return n.y>(0<=s?i.bottom:i.top)-a}return!!qr.element(r)&&(qr.element(e)?e===r:Br.matchesUpTo(r,e,o))}function Kr(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.resizeAxes){var r=e;n.interactable.options.resize.square?("y"===n.resizeAxes?r.delta.x=r.delta.y:r.delta.y=r.delta.x,r.axes="xy"):(r.axes=n.resizeAxes,"x"===n.resizeAxes?r.delta.y=0:"y"===n.resizeAxes&&(r.delta.x=0))}}var $r={id:"actions/resize",before:["actions/drag"],install:function(e){var t=e.actions,n=e.browser,r=e.Interactable,o=e.defaults;$r.cursors=n.isIe9?{x:"e-resize",y:"s-resize",xy:"se-resize",top:"n-resize",left:"w-resize",bottom:"s-resize",right:"e-resize",topleft:"se-resize",bottomright:"se-resize",topright:"ne-resize",bottomleft:"ne-resize"}:{x:"ew-resize",y:"ns-resize",xy:"nwse-resize",top:"ns-resize",left:"ew-resize",bottom:"ns-resize",right:"ew-resize",topleft:"nwse-resize",bottomright:"nwse-resize",topright:"nesw-resize",bottomleft:"nesw-resize"},$r.defaultMargin=n.supportsTouch||n.supportsPointerEvent?20:10,r.prototype.resizable=function(t){return function(t,e,n){if(qr.object(e))return t.options.resize.enabled=!1!==e.enabled,t.setPerAction("resize",e),t.setOnEvents("resize",e),qr.string(e.axis)&&/^x$|^y$|^xy$/.test(e.axis)?t.options.resize.axis=e.axis:null===e.axis&&(t.options.resize.axis=n.defaults.actions.resize.axis),qr.bool(e.preserveAspectRatio)?t.options.resize.preserveAspectRatio=e.preserveAspectRatio:qr.bool(e.square)&&(t.options.resize.square=e.square),t;if(qr.bool(e))return t.options.resize.enabled=e,t;return t.options.resize}(this,t,e)},t.map.resize=$r,t.methodDict.resize="resizable",o.actions.resize=$r.defaults},listeners:{"interactions:new":function(t){t.interaction.resizeAxes="xy"},"interactions:action-start":function(t){!function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e,o=n.rect;n._rects={start:(0,Vr.default)({},o),corrected:(0,Vr.default)({},o),previous:(0,Vr.default)({},o),delta:{left:0,right:0,width:0,top:0,bottom:0,height:0}},r.edges=n.prepared.edges,r.rect=n._rects.corrected,r.deltaRect=n._rects.delta}}(t),Kr(t)},"interactions:action-move":function(t){!function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e,o=n.interactable.options.resize.invert,i="reposition"===o||"negate"===o,a=n.rect,u=n._rects,s=u.start,l=u.corrected,c=u.delta,f=u.previous;if((0,Vr.default)(f,l),i){if((0,Vr.default)(l,a),"reposition"===o){if(l.top>l.bottom){var p=l.top;l.top=l.bottom,l.bottom=p}if(l.left>l.right){var d=l.left;l.left=l.right,l.right=d}}}else l.top=Math.min(a.top,s.bottom),l.bottom=Math.max(a.bottom,s.top),l.left=Math.min(a.left,s.right),l.right=Math.max(a.right,s.left);for(var v in l.width=l.right-l.left,l.height=l.bottom-l.top,l)c[v]=l[v]-f[v];r.edges=n.prepared.edges,r.rect=l,r.deltaRect=c}}(t),Kr(t)},"interactions:action-end":function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e;r.edges=n.prepared.edges,r.rect=n._rects.corrected,r.deltaRect=n._rects.delta}},"auto-start:check":function(t){var e=t.interaction,n=t.interactable,r=t.element,o=t.rect,i=t.buttons;if(o){var a=(0,Vr.default)({},e.coords.cur.page),u=n.options.resize;if(u&&u.enabled&&(!e.pointerIsDown||!/mouse|pointer/.test(e.pointerType)||0!=(i&u.mouseButtons))){if(qr.object(u.edges)){var s={left:!1,right:!1,top:!1,bottom:!1};for(var l in s)s[l]=Hr(l,u.edges[l],a,e._latestPointer.eventTarget,r,o,u.margin||$r.defaultMargin);s.left=s.left&&!s.right,s.top=s.top&&!s.bottom,(s.left||s.right||s.top||s.bottom)&&(t.action={name:"resize",edges:s})}else{var c="y"!==u.axis&&a.x>o.right-$r.defaultMargin,f="x"!==u.axis&&a.y>o.bottom-$r.defaultMargin;(c||f)&&(t.action={name:"resize",axes:(c?"x":"")+(f?"y":"")})}return!t.action&&void 0}}}},defaults:{square:!1,preserveAspectRatio:!1,axis:"xy",margin:NaN,edges:null,invert:"none"},cursors:null,getCursor:function(t){var e=t.edges,n=t.axis,r=t.name,o=$r.cursors,i=null;if(n)i=o[r+n];else if(e){for(var a="",u=["top","bottom","left","right"],s=0;s<u.length;s++){var l=u[s];e[l]&&(a+=l)}i=o[a]}return i},defaultMargin:null},Zr=$r;Yr.default=Zr;var Jr={};Object.defineProperty(Jr,"__esModule",{value:!0}),Jr.install=function(t){t.usePlugin(eo.default),t.usePlugin(no.default),t.usePlugin(Qr.default),t.usePlugin(to.default)},Object.defineProperty(Jr,"drag",{enumerable:!0,get:function(){return Qr.default}}),Object.defineProperty(Jr,"drop",{enumerable:!0,get:function(){return to.default}}),Object.defineProperty(Jr,"gesture",{enumerable:!0,get:function(){return eo.default}}),Object.defineProperty(Jr,"resize",{enumerable:!0,get:function(){return no.default}}),Jr.id=void 0;var Qr=ro(v),to=ro(br),eo=ro(Ar),no=ro(Yr);function ro(t){return t&&t.__esModule?t:{default:t}}Jr.id="actions";var oo={};function io(t){return(io="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(oo,"__esModule",{value:!0}),oo.getContainer=vo,oo.getScroll=yo,oo.getScrollSize=function(t){so.window(t)&&(t=window.document.body);return{x:t.scrollWidth,y:t.scrollHeight}},oo.getScrollSizeDelta=function(t,e){var n=t.interaction,r=t.element,o=n&&n.interactable.options[n.prepared.name].autoScroll;if(!o||!o.enabled)return e(),{x:0,y:0};var i=vo(o.container,n.interactable,r),a=yo(i);e();var u=yo(i);return{x:u.x-a.x,y:u.y-a.y}},oo.default=void 0;var ao,uo=fo(K),so=fo(P),lo=(ao=Se)&&ao.__esModule?ao:{default:ao};function co(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return co=function(){return t},t}function fo(t){if(t&&t.__esModule)return t;if(null===t||"object"!==io(t)&&"function"!=typeof t)return{default:t};var e=co();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}var po={defaults:{enabled:!1,margin:60,container:null,speed:300},now:Date.now,interaction:null,i:0,x:0,y:0,isScrolling:!1,prevTime:0,margin:0,speed:0,start:function(t){po.isScrolling=!0,lo.default.cancel(po.i),(t.autoScroll=po).interaction=t,po.prevTime=po.now(),po.i=lo.default.request(po.scroll)},stop:function(){po.isScrolling=!1,po.interaction&&(po.interaction.autoScroll=null),lo.default.cancel(po.i)},scroll:function(){var t=po.interaction,e=t.interactable,n=t.element,r=t.prepared.name,o=e.options[r].autoScroll,i=vo(o.container,e,n),a=po.now(),u=(a-po.prevTime)/1e3,s=o.speed*u;if(1<=s){var l={x:po.x*s,y:po.y*s};if(l.x||l.y){var c=yo(i);so.window(i)?i.scrollBy(l.x,l.y):i&&(i.scrollLeft+=l.x,i.scrollTop+=l.y);var f=yo(i),p={x:f.x-c.x,y:f.y-c.y};(p.x||p.y)&&e.fire({type:"autoscroll",target:n,interactable:e,delta:p,interaction:t,container:i})}po.prevTime=a}po.isScrolling&&(lo.default.cancel(po.i),po.i=lo.default.request(po.scroll))},check:function(t,e){var n=t.options;return n[e].autoScroll&&n[e].autoScroll.enabled},onInteractionMove:function(t){var e=t.interaction,n=t.pointer;if(e.interacting()&&po.check(e.interactable,e.prepared.name))if(e.simulation)po.x=po.y=0;else{var r,o,i,a,u=e.interactable,s=e.element,l=e.prepared.name,c=u.options[l].autoScroll,f=vo(c.container,u,s);if(so.window(f))a=n.clientX<po.margin,r=n.clientY<po.margin,o=n.clientX>f.innerWidth-po.margin,i=n.clientY>f.innerHeight-po.margin;else{var p=uo.getElementClientRect(f);a=n.clientX<p.left+po.margin,r=n.clientY<p.top+po.margin,o=n.clientX>p.right-po.margin,i=n.clientY>p.bottom-po.margin}po.x=o?1:a?-1:0,po.y=i?1:r?-1:0,po.isScrolling||(po.margin=c.margin,po.speed=c.speed,po.start(e))}}};function vo(t,e,n){return(so.string(t)?(0,be.getStringOptionResult)(t,e,n):t)||(0,w.getWindow)(n)}function yo(t){return so.window(t)&&(t=window.document.body),{x:t.scrollLeft,y:t.scrollTop}}var ho={id:"auto-scroll",install:function(t){var e=t.defaults,n=t.actions;(t.autoScroll=po).now=function(){return t.now()},n.phaselessTypes.autoscroll=!0,e.perAction.autoScroll=po.defaults},listeners:{"interactions:new":function(t){t.interaction.autoScroll=null},"interactions:destroy":function(t){t.interaction.autoScroll=null,po.stop(),po.interaction&&(po.interaction=null)},"interactions:stop":po.stop,"interactions:action-move":function(t){return po.onInteractionMove(t)}}};oo.default=ho;var go={};function bo(t){return(bo="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(go,"__esModule",{value:!0}),go.default=void 0;var mo=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==bo(t)&&"function"!=typeof t)return{default:t};var e=Oo();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(P);function Oo(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Oo=function(){return t},t}function wo(t){return mo.bool(t)?(this.options.styleCursor=t,this):null===t?(delete this.options.styleCursor,this):this.options.styleCursor}function Po(t){return mo.func(t)?(this.options.actionChecker=t,this):null===t?(delete this.options.actionChecker,this):this.options.actionChecker}var _o={id:"auto-start/interactableMethods",install:function(d){var t=d.Interactable;t.prototype.getAction=function(t,e,n,r){var o,i,a,u,s,l,c,f,p=(i=e,a=n,u=r,s=d,l=(o=this).getRect(u),c=i.buttons||{0:1,1:4,3:8,4:16}[i.button],f={action:null,interactable:o,interaction:a,element:u,rect:l,buttons:c},s.fire("auto-start:check",f),f.action);return this.options.actionChecker?this.options.actionChecker(t,e,p,this,r,n):p},t.prototype.ignoreFrom=(0,De.warnOnce)(function(t){return this._backCompatOption("ignoreFrom",t)},"Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."),t.prototype.allowFrom=(0,De.warnOnce)(function(t){return this._backCompatOption("allowFrom",t)},"Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."),t.prototype.actionChecker=Po,t.prototype.styleCursor=wo}};go.default=_o;var xo={};function jo(t){return(jo="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(xo,"__esModule",{value:!0}),xo.default=void 0;var So,Mo=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==jo(t)&&"function"!=typeof t)return{default:t};var e=Eo();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(De),ko=(So=go)&&So.__esModule?So:{default:So};function Eo(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Eo=function(){return t},t}function To(t,e,n,r,o){return e.testIgnoreAllow(e.options[t.name],n,r)&&e.options[t.name].enabled&&zo(e,n,t,o)?t:null}function Do(t,e,n,r,o,i,a){for(var u=0,s=r.length;u<s;u++){var l=r[u],c=o[u],f=l.getAction(e,n,t,c);if(f){var p=To(f,l,c,i,a);if(p)return{action:p,interactable:l,element:c}}}return{action:null,interactable:null,element:null}}function Io(t,e,n,r,o){var i=[],a=[],u=r;function s(t){i.push(t),a.push(u)}for(;Mo.is.element(u);){i=[],a=[],o.interactables.forEachMatch(u,s);var l=Do(t,e,n,i,a,r,o);if(l.action&&!l.interactable.options[l.action.name].manualStart)return l;u=Mo.dom.parentNode(u)}return{action:null,interactable:null,element:null}}function Ao(t,e,n){var r=e.action,o=e.interactable,i=e.element;r=r||{name:null},t.interactable=o,t.element=i,Mo.copyAction(t.prepared,r),t.rect=o&&r.name?o.getRect(i):null,Ro(t,n),n.fire("autoStart:prepared",{interaction:t})}function zo(t,e,n,r){var o=t.options,i=o[n.name].max,a=o[n.name].maxPerElement,u=r.autoStart.maxInteractions,s=0,l=0,c=0;if(!(i&&a&&u))return!1;for(var f=0;f<r.interactions.list.length;f++){var p=r.interactions.list[f],d=p.prepared.name;if(p.interacting()){if(u<=++s)return!1;if(p.interactable===t){if(i<=(l+=d===n.name?1:0))return!1;if(p.element===e&&(c++,d===n.name&&a<=c))return!1}}}return 0<u}function Co(t,e){return Mo.is.number(t)?(e.autoStart.maxInteractions=t,this):e.autoStart.maxInteractions}function Wo(t,e,n){var r=n.autoStart.cursorElement;r&&r!==t&&(r.style.cursor=""),t.ownerDocument.documentElement.style.cursor=e,t.style.cursor=e,n.autoStart.cursorElement=e?t:null}function Ro(t,e){var n=t.interactable,r=t.element,o=t.prepared;if("mouse"===t.pointerType&&n&&n.options.styleCursor){var i="";if(o.name){var a=n.options[o.name].cursorChecker;i=Mo.is.func(a)?a(o,n,r,t._interacting):e.actions.map[o.name].getCursor(o)}Wo(t.element,i||"",e)}else e.autoStart.cursorElement&&Wo(e.autoStart.cursorElement,"",e)}var Fo={id:"auto-start/base",before:["actions","action/drag","actions/resize","actions/gesture"],install:function(e){var t=e.interact,n=e.defaults;e.usePlugin(ko.default),n.base.actionChecker=null,n.base.styleCursor=!0,Mo.extend(n.perAction,{manualStart:!1,max:1/0,maxPerElement:1,allowFrom:null,ignoreFrom:null,mouseButtons:1}),t.maxInteractions=function(t){return Co(t,e)},e.autoStart={maxInteractions:1/0,withinInteractionLimit:zo,cursorElement:null}},listeners:{"interactions:down":function(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget;n.interacting()||Ao(n,Io(n,r,o,i,e),e)},"interactions:move":function(t,e){var n,r,o,i,a,u;r=e,o=(n=t).interaction,i=n.pointer,a=n.event,u=n.eventTarget,"mouse"!==o.pointerType||o.pointerIsDown||o.interacting()||Ao(o,Io(o,i,a,u,r),r),function(t,e){var n=t.interaction;if(n.pointerIsDown&&!n.interacting()&&n.pointerWasMoved&&n.prepared.name){e.fire("autoStart:before-start",t);var r=n.interactable,o=n.prepared.name;o&&r&&(r.options[o].manualStart||!zo(r,n.element,n.prepared,e)?n.stop():(n.start(n.prepared,r,n.element),Ro(n,e)))}}(t,e)},"interactions:stop":function(t,e){var n=t.interaction,r=n.interactable;r&&r.options.styleCursor&&Wo(n.element,"",e)}},maxInteractions:Co,withinInteractionLimit:zo,validateAction:To};xo.default=Fo;var Xo={};function Yo(t){return(Yo="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Xo,"__esModule",{value:!0}),Xo.default=void 0;var Lo,No=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Yo(t)&&"function"!=typeof t)return{default:t};var e=Vo();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(P),Bo=(Lo=xo)&&Lo.__esModule?Lo:{default:Lo};function Vo(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Vo=function(){return t},t}var qo={id:"auto-start/dragAxis",listeners:{"autoStart:before-start":function(t,r){var o=t.interaction,i=t.eventTarget,e=t.dx,n=t.dy;if("drag"===o.prepared.name){var a=Math.abs(e),u=Math.abs(n),s=o.interactable.options.drag,l=s.startAxis,c=u<a?"x":a<u?"y":"xy";if(o.prepared.axis="start"===s.lockAxis?c[0]:s.lockAxis,"xy"!=c&&"xy"!==l&&l!==c){o.prepared.name=null;function f(t){if(t!==o.interactable){var e=o.interactable.options.drag;if(!e.manualStart&&t.testIgnoreAllow(e,p,i)){var n=t.getAction(o.downPointer,o.downEvent,o,p);if(n&&"drag"===n.name&&function(t,e){if(!e)return!1;var n=e.options.drag.startAxis;return"xy"===t||"xy"===n||n===t}(c,t)&&Bo.default.validateAction(n,t,p,i,r))return t}}}for(var p=i;No.element(p);){var d=r.interactables.forEachMatch(p,f);if(d){o.prepared.name="drag",o.interactable=d,o.element=p;break}p=(0,K.parentNode)(p)}}}}}};Xo.default=qo;var Uo={};Object.defineProperty(Uo,"__esModule",{value:!0}),Uo.default=void 0;var Go,Ho=(Go=xo)&&Go.__esModule?Go:{default:Go};function Ko(t){var e=t.prepared&&t.prepared.name;if(!e)return null;var n=t.interactable.options;return n[e].hold||n[e].delay}var $o={id:"auto-start/hold",install:function(t){var e=t.defaults;t.usePlugin(Ho.default),e.perAction.hold=0,e.perAction.delay=0},listeners:{"interactions:new":function(t){t.interaction.autoStartHoldTimer=null},"autoStart:prepared":function(t){var e=t.interaction,n=Ko(e);0<n&&(e.autoStartHoldTimer=setTimeout(function(){e.start(e.prepared,e.interactable,e.element)},n))},"interactions:move":function(t){var e=t.interaction,n=t.duplicate;e.pointerWasMoved&&!n&&clearTimeout(e.autoStartHoldTimer)},"autoStart:before-start":function(t){var e=t.interaction;0<Ko(e)&&(e.prepared.name=null)}},getHoldDuration:Ko};Uo.default=$o;var Zo={};Object.defineProperty(Zo,"__esModule",{value:!0}),Zo.install=function(t){t.usePlugin(Jo.default),t.usePlugin(ti.default),t.usePlugin(Qo.default)},Object.defineProperty(Zo,"autoStart",{enumerable:!0,get:function(){return Jo.default}}),Object.defineProperty(Zo,"dragAxis",{enumerable:!0,get:function(){return Qo.default}}),Object.defineProperty(Zo,"hold",{enumerable:!0,get:function(){return ti.default}}),Zo.id=void 0;var Jo=ei(xo),Qo=ei(Xo),ti=ei(Uo);function ei(t){return t&&t.__esModule?t:{default:t}}Zo.id="auto-start";var ni={};function ri(t){return(ri="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(ni,"__esModule",{value:!0}),ni.install=ci,ni.default=void 0;var oi,ii=(oi=Tt)&&oi.__esModule?oi:{default:oi},ai=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==ri(t)&&"function"!=typeof t)return{default:t};var e=ui();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(P);function ui(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return ui=function(){return t},t}function si(t){return/^(always|never|auto)$/.test(t)?(this.options.preventDefault=t,this):ai.bool(t)?(this.options.preventDefault=t?"always":"never",this):this.options.preventDefault}function li(t){var e=t.interaction,n=t.event;e.interactable&&e.interactable.checkAndPreventDefault(n)}function ci(r){var t=r.Interactable;t.prototype.preventDefault=si,t.prototype.checkAndPreventDefault=function(t){return function(t,e,n){var r=t.options.preventDefault;if("never"!==r)if("always"!==r){if(ii.default.supportsPassive&&/^touch(start|move)$/.test(n.type)){var o=(0,w.getWindow)(n.target).document,i=e.getDocOptions(o);if(!i||!i.events||!1!==i.events.passive)return}/^(mouse|pointer|touch)*(down|start)/i.test(n.type)||ai.element(n.target)&&(0,K.matchesSelector)(n.target,"input,select,textarea,[contenteditable=true],[contenteditable=true] *")||n.preventDefault()}else n.preventDefault()}(this,r,t)},r.interactions.docEvents.push({type:"dragstart",listener:function(t){for(var e=0;e<r.interactions.list.length;e++){var n=r.interactions.list[e];if(n.element&&(n.element===t.target||(0,K.nodeContains)(n.element,t.target)))return void n.interactable.checkAndPreventDefault(t)}}})}var fi={id:"core/interactablePreventDefault",install:ci,listeners:["down","move","up","cancel"].reduce(function(t,e){return t["interactions:".concat(e)]=li,t},{})};ni.default=fi;var pi={};function di(t){return(di="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(pi,"__esModule",{value:!0}),pi.default=void 0;var vi,yi,hi=Oi(T),gi=(Oi(Qt),function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==di(t)&&"function"!=typeof t)return{default:t};var e=mi();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(P)),bi=Oi(w);function mi(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return mi=function(){return t},t}function Oi(t){return t&&t.__esModule?t:{default:t}}(yi=vi=vi||{}).touchAction="touchAction",yi.boxSizing="boxSizing",yi.noListeners="noListeners";var wi={touchAction:"https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action",boxSizing:"https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing"};vi.touchAction,vi.boxSizing,vi.noListeners;function Pi(t,e,n){return n.test(t.style[e]||bi.default.window.getComputedStyle(t)[e])}var _i="dev-tools",xi={id:_i,install:function(){}};pi.default=xi;var ji={};function Si(t){return(Si="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(ji,"__esModule",{value:!0}),ji.getRectOffset=Ri,ji.default=void 0;var Mi=Di(B),ki=Di(Qt),Ei=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Si(t)&&"function"!=typeof t)return{default:t};var e=Ti();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(be);function Ti(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Ti=function(){return t},t}function Di(t){return t&&t.__esModule?t:{default:t}}function Ii(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function Ai(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function zi(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Ci=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.interaction=t,zi(this,"states",[]),zi(this,"startOffset",{left:0,right:0,top:0,bottom:0}),zi(this,"startDelta",null),zi(this,"result",null),zi(this,"endResult",null),zi(this,"edges",void 0)}var t,n,r;return t=e,(n=[{key:"start",value:function(t,e){var n=t.phase,r=this.interaction,o=function(t){var n=t.interactable.options[t.prepared.name],e=n.modifiers;if(e&&e.length)return e.filter(function(t){return!t.options||!1!==t.options.enabled});return["snap","snapSize","snapEdges","restrict","restrictEdges","restrictSize"].map(function(t){var e=n[t];return e&&e.enabled&&{options:e,methods:e._methods}}).filter(function(t){return!!t})}(r);this.prepareStates(o),this.edges=(0,ki.default)({},r.edges),this.startOffset=Ri(r.rect,e);var i={phase:n,pageCoords:e,preEnd:!(this.startDelta={x:0,y:0})};return this.result=Wi(),this.startAll(i),this.result=this.setAll(i)}},{key:"fillArg",value:function(t){var e=this.interaction;t.interaction=e,t.interactable=e.interactable,t.element=e.element,t.rect=t.rect||e.rect,t.edges=this.edges,t.startOffset=this.startOffset}},{key:"startAll",value:function(t){this.fillArg(t);for(var e=0;e<this.states.length;e++){var n=this.states[e];n.methods.start&&(t.state=n).methods.start(t)}}},{key:"setAll",value:function(t){this.fillArg(t);var e=t.phase,n=t.preEnd,r=t.skipModifiers,o=t.rect;t.coords=(0,ki.default)({},t.pageCoords),t.rect=(0,ki.default)({},o);for(var i=r?this.states.slice(r):this.states,a=Wi(t.coords,t.rect),u=0;u<i.length;u++){var s=i[u],l=s.options,c=(0,ki.default)({},t.coords),f=null;s.methods.set&&this.shouldDo(l,n,e)&&(f=(t.state=s).methods.set(t),Ei.addEdges(this.interaction.edges,t.rect,{x:t.coords.x-c.x,y:t.coords.y-c.y})),a.eventProps.push(f)}a.delta.x=t.coords.x-t.pageCoords.x,a.delta.y=t.coords.y-t.pageCoords.y,a.rectDelta.left=t.rect.left-o.left,a.rectDelta.right=t.rect.right-o.right,a.rectDelta.top=t.rect.top-o.top,a.rectDelta.bottom=t.rect.bottom-o.bottom;var p=this.result.coords,d=this.result.rect,v=!d||a.rect.left!==d.left||a.rect.right!==d.right||a.rect.top!==d.top||a.rect.bottom!==d.bottom;return a.changed=v||p.x!==a.coords.x||p.y!==a.coords.y,a.rect=t.rect,a}},{key:"applyToInteraction",value:function(t){var e=this.interaction,n=t.phase,r=e.coords.cur,o=e.coords.start,i=this.result,a=this.startDelta,u=i.delta;"start"===n&&(0,ki.default)(this.startDelta,i.delta);for(var s=0;s<[[o,a],[r,u]].length;s++){var l=Ii([[o,a],[r,u]][s],2),c=l[0],f=l[1];c.page.x+=f.x,c.page.y+=f.y,c.client.x+=f.x,c.client.y+=f.y}var p=this.result.rectDelta,d=t.rect||e.rect;d.left+=p.left,d.right+=p.right,d.top+=p.top,d.bottom+=p.bottom,d.width=d.right-d.left,d.height=d.bottom-d.top}},{key:"setAndApply",value:function(t){var e=this.interaction,n=t.phase,r=t.preEnd,o=t.skipModifiers,i=this.setAll({preEnd:r,phase:n,pageCoords:t.modifiedCoords||e.coords.cur.page});if(!(this.result=i).changed&&(!o||o<this.states.length)&&e.interacting())return!1;if(t.modifiedCoords){var a=e.coords.cur.page,u=t.modifiedCoords.x-a.x,s=t.modifiedCoords.y-a.y;i.coords.x+=u,i.coords.y+=s,i.delta.x+=u,i.delta.y+=s}this.applyToInteraction(t)}},{key:"beforeEnd",value:function(t){var e=t.interaction,n=t.event,r=this.states;if(r&&r.length){for(var o=!1,i=0;i<r.length;i++){var a=r[i],u=(t.state=a).options,s=a.methods,l=s.beforeEnd&&s.beforeEnd(t);if(l)return this.endResult=l,!1;o=o||!o&&this.shouldDo(u,!0)}o||e.move({event:n,preEnd:!0})}}},{key:"stop",value:function(t){var e=t.interaction;if(this.states&&this.states.length){var n=(0,ki.default)({states:this.states,interactable:e.interactable,element:e.element,rect:null},t);this.fillArg(n);for(var r=0;r<this.states.length;r++){var o=this.states[r];(n.state=o).methods.stop&&o.methods.stop(n)}this.states=null,this.endResult=null}}},{key:"prepareStates",value:function(t){this.states=[];for(var e=0;e<t.length;e++){var n=t[e],r=n.options,o=n.methods,i=n.name;r&&!1===r.enabled||this.states.push({options:r,methods:o,index:e,name:i})}return this.states}},{key:"restoreInteractionCoords",value:function(t){var e=t.interaction,n=e.coords,r=e.rect,o=e.modification;if(o.result){for(var i=o.startDelta,a=o.result,u=a.delta,s=a.rectDelta,l=[[n.start,i],[n.cur,u]],c=0;c<l.length;c++){var f=Ii(l[c],2),p=f[0],d=f[1];p.page.x-=d.x,p.page.y-=d.y,p.client.x-=d.x,p.client.y-=d.y}r.left-=s.left,r.right-=s.right,r.top-=s.top,r.bottom-=s.bottom}}},{key:"shouldDo",value:function(t,e,n){return!t||!1!==t.enabled&&(e||!t.endOnly)&&(t.setStart||"start"!==n)}},{key:"copyFrom",value:function(t){this.startOffset=t.startOffset,this.startDelta=t.startDelta,this.edges=t.edges,this.states=t.states.map(function(t){return(0,Mi.default)(t)}),this.result=Wi((0,ki.default)({},t.result.coords),(0,ki.default)({},t.result.rect))}},{key:"destroy",value:function(){for(var t in this)this[t]=null}}])&&Ai(t.prototype,n),r&&Ai(t,r),e}();function Wi(t,e){return{rect:e,coords:t,delta:{x:0,y:0},rectDelta:{left:0,right:0,top:0,bottom:0},eventProps:[],changed:!0}}function Ri(t,e){return t?{left:e.x-t.left,top:e.y-t.top,right:t.right-e.x,bottom:t.bottom-e.y}:{left:0,top:0,right:0,bottom:0}}ji.default=Ci;var Fi={};Object.defineProperty(Fi,"__esModule",{value:!0}),Fi.makeModifier=function(t,r){function e(t){var e=t||{};for(var n in e.enabled=!1!==e.enabled,o)n in e||(e[n]=o[n]);return{options:e,methods:i,name:r}}var o=t.defaults,i={start:t.start,set:t.set,beforeEnd:t.beforeEnd,stop:t.stop};r&&"string"==typeof r&&(e._defaults=o,e._methods=i);return e},Fi.addEventModifiers=Li,Fi.default=void 0;var Xi,Yi=(Xi=ji)&&Xi.__esModule?Xi:{default:Xi};function Li(t){var e=t.iEvent,n=t.interaction.modification.result;n&&(e.modifiers=n.eventProps)}var Ni={id:"modifiers/base",install:function(t){t.defaults.perAction.modifiers=[]},listeners:{"interactions:new":function(t){var e=t.interaction;e.modification=new Yi.default(e)},"interactions:before-action-start":function(t){var e=t.interaction.modification;e.start(t,t.interaction.coords.start.page),t.interaction.edges=e.edges,e.applyToInteraction(t)},"interactions:before-action-move":function(t){return t.interaction.modification.setAndApply(t)},"interactions:before-action-end":function(t){return t.interaction.modification.beforeEnd(t)},"interactions:action-start":Li,"interactions:action-move":Li,"interactions:action-end":Li,"interactions:after-action-start":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:after-action-move":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:stop":function(t){return t.interaction.modification.stop(t)}},before:["actions","action/drag","actions/resize","actions/gesture"]};Fi.default=Ni;var Bi={};function Vi(t){return(Vi="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Bi,"__esModule",{value:!0}),Bi.addTotal=Gi,Bi.applyPending=Ki,Bi.default=void 0;var qi=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Vi(t)&&"function"!=typeof t)return{default:t};var e=Ui();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(be);function Ui(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Ui=function(){return t},t}function Gi(t){t.pointerIsDown&&(Zi(t.coords.cur,t.offset.total),t.offset.pending.x=0,t.offset.pending.y=0)}function Hi(t){Ki(t.interaction)}function Ki(t){if(!(e=t).offset.pending.x&&!e.offset.pending.y)return!1;var e,n=t.offset.pending;return Zi(t.coords.cur,n),Zi(t.coords.delta,n),qi.addEdges(t.edges,t.rect,n),n.x=0,!(n.y=0)}function $i(t){var e=t.x,n=t.y;this.offset.pending.x+=e,this.offset.pending.y+=n,this.offset.total.x+=e,this.offset.total.y+=n}function Zi(t,e){var n=t.page,r=t.client,o=e.x,i=e.y;n.x+=o,n.y+=i,r.x+=o,r.y+=i}Wn._ProxyMethods.offsetBy="";var Ji={id:"offset",install:function(t){t.Interaction.prototype.offsetBy=$i},listeners:{"interactions:new":function(t){t.interaction.offset={total:{x:0,y:0},pending:{x:0,y:0}}},"interactions:update-pointer":function(t){return Gi(t.interaction)},"interactions:before-action-start":Hi,"interactions:before-action-move":Hi,"interactions:before-action-end":function(t){var e=t.interaction;if(Ki(e))return e.move({offset:!0}),e.end(),!1},"interactions:stop":function(t){var e=t.interaction;e.offset.total.x=0,e.offset.total.y=0,e.offset.pending.x=0,e.offset.pending.y=0}}};Bi.default=Ji;var Qi={};function ta(t){return(ta="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Qi,"__esModule",{value:!0}),Qi.default=Qi.InertiaState=void 0;var ea=ca(Fi),na=sa(ji),ra=sa(Bi),oa=ca(K),ia=sa(pt),aa=ca(P),ua=sa(Se);function sa(t){return t&&t.__esModule?t:{default:t}}function la(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return la=function(){return t},t}function ca(t){if(t&&t.__esModule)return t;if(null===t||"object"!==ta(t)&&"function"!=typeof t)return{default:t};var e=la();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function fa(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function pa(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var da=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.interaction=t,pa(this,"active",!1),pa(this,"isModified",!1),pa(this,"smoothEnd",!1),pa(this,"allowResume",!1),pa(this,"modification",null),pa(this,"modifierCount",0),pa(this,"modifierArg",null),pa(this,"startCoords",null),pa(this,"t0",0),pa(this,"v0",0),pa(this,"te",0),pa(this,"targetOffset",null),pa(this,"modifiedOffset",null),pa(this,"currentOffset",null),pa(this,"lambda_v0",0),pa(this,"one_ve_v0",0),pa(this,"timeout",null)}var t,n,r;return t=e,(n=[{key:"start",value:function(t){var e=this.interaction,n=va(e);if(!n||!n.enabled)return!1;var r=e.coords.velocity.client,o=(0,ia.default)(r.x,r.y),i=this.modification||(this.modification=new na.default(e));if(i.copyFrom(e.modification),this.t0=e._now(),this.allowResume=n.allowResume,this.v0=o,this.currentOffset={x:0,y:0},this.startCoords=e.coords.cur.page,this.modifierArg={interaction:e,interactable:e.interactable,element:e.element,rect:e.rect,edges:e.edges,pageCoords:this.startCoords,preEnd:!0,phase:"inertiastart"},this.t0-e.coords.cur.timeStamp<50&&o>n.minSpeed&&o>n.endSpeed)this.startInertia();else{if(i.result=i.setAll(this.modifierArg),!i.result.changed)return!1;this.startSmoothEnd()}return e.modification.result.rect=null,e.offsetBy(this.targetOffset),e._doPhase({interaction:e,event:t,phase:"inertiastart"}),e.offsetBy({x:-this.targetOffset.x,y:-this.targetOffset.y}),e.modification.result.rect=null,this.active=!0,e.simulation=this,!0}},{key:"startInertia",value:function(){var t=this,e=this.interaction.coords.velocity.client,n=va(this.interaction),r=n.resistance,o=-Math.log(n.endSpeed/this.v0)/r;this.targetOffset={x:(e.x-o)/r,y:(e.y-o)/r},this.te=o,this.lambda_v0=r/this.v0,this.one_ve_v0=1-n.endSpeed/this.v0;var i=this.modification,a=this.modifierArg;a.pageCoords={x:this.startCoords.x+this.targetOffset.x,y:this.startCoords.y+this.targetOffset.y},i.result=i.setAll(a),i.result.changed&&(this.isModified=!0,this.modifiedOffset={x:this.targetOffset.x+i.result.delta.x,y:this.targetOffset.y+i.result.delta.y}),this.timeout=ua.default.request(function(){return t.inertiaTick()})}},{key:"startSmoothEnd",value:function(){var t=this;this.smoothEnd=!0,this.isModified=!0,this.targetOffset={x:this.modification.result.delta.x,y:this.modification.result.delta.y},this.timeout=ua.default.request(function(){return t.smoothEndTick()})}},{key:"inertiaTick",value:function(){var t,e,n,r,o,i,a,u=this,s=this.interaction,l=va(s).resistance,c=(s._now()-this.t0)/1e3;if(c<this.te){var f,p=1-(Math.exp(-l*c)-this.lambda_v0)/this.one_ve_v0,d={x:(f=this.isModified?(e=t=0,n=this.targetOffset.x,r=this.targetOffset.y,o=this.modifiedOffset.x,i=this.modifiedOffset.y,{x:ya(a=p,t,n,o),y:ya(a,e,r,i)}):{x:this.targetOffset.x*p,y:this.targetOffset.y*p}).x-this.currentOffset.x,y:f.y-this.currentOffset.y};this.currentOffset.x+=d.x,this.currentOffset.y+=d.y,s.offsetBy(d),s.move(),this.timeout=ua.default.request(function(){return u.inertiaTick()})}else s.offsetBy({x:this.modifiedOffset.x-this.currentOffset.x,y:this.modifiedOffset.y-this.currentOffset.y}),this.end()}},{key:"smoothEndTick",value:function(){var t=this,e=this.interaction,n=e._now()-this.t0,r=va(e).smoothEndDuration;if(n<r){var o=ha(n,0,this.targetOffset.x,r),i=ha(n,0,this.targetOffset.y,r),a={x:o-this.currentOffset.x,y:i-this.currentOffset.y};this.currentOffset.x+=a.x,this.currentOffset.y+=a.y,e.offsetBy(a),e.move({skipModifiers:this.modifierCount}),this.timeout=ua.default.request(function(){return t.smoothEndTick()})}else e.offsetBy({x:this.targetOffset.x-this.currentOffset.x,y:this.targetOffset.y-this.currentOffset.y}),this.end()}},{key:"resume",value:function(t){var e=t.pointer,n=t.event,r=t.eventTarget,o=this.interaction;o.offsetBy({x:-this.currentOffset.x,y:-this.currentOffset.y}),o.updatePointer(e,n,r,!0),o._doPhase({interaction:o,event:n,phase:"resume"}),(0,dt.copyCoords)(o.coords.prev,o.coords.cur),this.stop()}},{key:"end",value:function(){this.interaction.move(),this.interaction.end(),this.stop()}},{key:"stop",value:function(){this.active=this.smoothEnd=!1,this.interaction.simulation=null,ua.default.cancel(this.timeout)}}])&&fa(t.prototype,n),r&&fa(t,r),e}();function va(t){var e=t.interactable,n=t.prepared;return e&&e.options&&n.name&&e.options[n.name].inertia}function ya(t,e,n,r){var o=1-t;return o*o*e+2*o*t*n+t*t*r}function ha(t,e,n,r){return-n*(t/=r)*(t-2)+e}Qi.InertiaState=da;var ga={id:"inertia",before:["modifiers/base"],install:function(t){var e=t.defaults;t.usePlugin(ra.default),t.usePlugin(ea.default),t.actions.phases.inertiastart=!0,t.actions.phases.resume=!0,e.perAction.inertia={enabled:!1,resistance:10,minSpeed:100,endSpeed:10,allowResume:!0,smoothEndDuration:300}},listeners:{"interactions:new":function(t){var e=t.interaction;e.inertia=new da(e)},"interactions:before-action-end":function(t){var e=t.interaction,n=t.event;return!e._interacting||e.simulation?null:!e.inertia.start(n)&&null},"interactions:down":function(t){var e=t.interaction,n=t.eventTarget,r=e.inertia;if(r.active)for(var o=n;aa.element(o);){if(o===e.element){r.resume(t);break}o=oa.parentNode(o)}},"interactions:stop":function(t){var e=t.interaction.inertia;e.active&&e.stop()},"interactions:before-action-resume":function(t){var e=t.interaction.modification;e.stop(t),e.start(t,t.interaction.coords.cur.page),e.applyToInteraction(t)},"interactions:before-action-inertiastart":function(t){return t.interaction.modification.setAndApply(t)},"interactions:action-resume":ea.addEventModifiers,"interactions:action-inertiastart":ea.addEventModifiers,"interactions:after-action-inertiastart":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:after-action-resume":function(t){return t.interaction.modification.restoreInteractionCoords(t)}}};Qi.default=ga;var ba={};Object.defineProperty(ba,"__esModule",{value:!0}),ba.default=void 0;var ma=wa(Qt),Oa=wa(ji);function wa(t){return t&&t.__esModule?t:{default:t}}function Pa(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function _a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Pa(Object(n),!0).forEach(function(t){xa(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Pa(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function xa(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function ja(t,e,n){var r=t.startCoords,o=t.edgeSign;e?n.y=r.y+(n.x-r.x)*o:n.x=r.x+(n.y-r.y)*o}function Sa(t,e,n,r){var o=t.startRect,i=t.startCoords,a=t.ratio,u=t.edgeSign;if(e){var s=r.width/a;n.y=i.y+(s-o.height)*u}else{var l=r.height*a;n.x=i.x+(l-o.width)*u}}var Ma={start:function(t){var e=t.state,n=t.rect,r=t.edges,o=t.pageCoords,i=e.options.ratio,a=e.options,u=a.equalDelta,s=a.modifiers;"preserve"===i&&(i=n.width/n.height),e.startCoords=(0,ma.default)({},o),e.startRect=(0,ma.default)({},n),e.ratio=i,e.equalDelta=u;var l=e.linkedEdges={top:r.top||r.left&&!r.bottom,left:r.left||r.top&&!r.right,bottom:r.bottom||r.right&&!r.top,right:r.right||r.bottom&&!r.left};if(e.xIsPrimaryAxis=!(!r.left&&!r.right),e.equalDelta)e.edgeSign=(l.left?1:-1)*(l.top?1:-1);else{var c=e.xIsPrimaryAxis?l.top:l.left;e.edgeSign=c?-1:1}if((0,ma.default)(t.edges,l),s&&s.length){var f=new Oa.default(t.interaction);f.copyFrom(t.interaction.modification),f.prepareStates(s),(e.subModification=f).startAll(_a({},t))}},set:function(t){var e=t.state,n=t.rect,r=t.coords,o=(0,ma.default)({},r),i=e.equalDelta?ja:Sa;if(i(e,e.xIsPrimaryAxis,r,n),!e.subModification)return null;var a=(0,ma.default)({},n);(0,be.addEdges)(e.linkedEdges,a,{x:r.x-o.x,y:r.y-o.y});var u=e.subModification.setAll(_a({},t,{rect:a,edges:e.linkedEdges,pageCoords:r,prevCoords:r,prevRect:a})),s=u.delta;u.changed&&(i(e,Math.abs(s.x)>Math.abs(s.y),u.coords,u.rect),(0,ma.default)(r,u.coords));return u.eventProps},defaults:{ratio:"preserve",equalDelta:!1,modifiers:[],enabled:!1}};ba.default=Ma;var ka={};function Ea(t){return(Ea="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(ka,"__esModule",{value:!0}),ka.getRestrictionRect=Wa,ka.default=void 0;var Ta,Da=(Ta=Qt)&&Ta.__esModule?Ta:{default:Ta},Ia=Ca(P),Aa=Ca(be);function za(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return za=function(){return t},t}function Ca(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Ea(t)&&"function"!=typeof t)return{default:t};var e=za();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function Wa(t,e,n){return Ia.func(t)?Aa.resolveRectLike(t,e.interactable,e.element,[n.x,n.y,e]):Aa.resolveRectLike(t,e.interactable,e.element)}var Ra={start:function(t){var e=t.rect,n=t.startOffset,r=t.state,o=t.interaction,i=t.pageCoords,a=r.options,u=a.elementRect,s=(0,Da.default)({left:0,top:0,right:0,bottom:0},a.offset||{});if(e&&u){var l=Wa(a.restriction,o,i);if(l){var c=l.right-l.left-e.width,f=l.bottom-l.top-e.height;c<0&&(s.left+=c,s.right+=c),f<0&&(s.top+=f,s.bottom+=f)}s.left+=n.left-e.width*u.left,s.top+=n.top-e.height*u.top,s.right+=n.right-e.width*(1-u.right),s.bottom+=n.bottom-e.height*(1-u.bottom)}r.offset=s},set:function(t){var e=t.coords,n=t.interaction,r=t.state,o=r.options,i=r.offset,a=Wa(o.restriction,n,e);if(a){var u=Aa.xywhToTlbr(a);e.x=Math.max(Math.min(u.right-i.right,e.x),u.left+i.left),e.y=Math.max(Math.min(u.bottom-i.bottom,e.y),u.top+i.top)}},defaults:{restriction:null,elementRect:null,offset:null,endOnly:!1,enabled:!1}};ka.default=Ra;var Fa={};function Xa(t){return(Xa="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Fa,"__esModule",{value:!0}),Fa.default=void 0;var Ya,La=(Ya=Qt)&&Ya.__esModule?Ya:{default:Ya},Na=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Xa(t)&&"function"!=typeof t)return{default:t};var e=Ba();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(be);function Ba(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Ba=function(){return t},t}var Va={top:1/0,left:1/0,bottom:-1/0,right:-1/0},qa={top:-1/0,left:-1/0,bottom:1/0,right:1/0};function Ua(t,e){for(var n=["top","left","bottom","right"],r=0;r<n.length;r++){var o=n[r];o in t||(t[o]=e[o])}return t}var Ga={noInner:Va,noOuter:qa,start:function(t){var e,n=t.interaction,r=t.startOffset,o=t.state,i=o.options;if(i){var a=(0,ka.getRestrictionRect)(i.offset,n,n.coords.start.page);e=Na.rectToXY(a)}e=e||{x:0,y:0},o.offset={top:e.y+r.top,left:e.x+r.left,bottom:e.y-r.bottom,right:e.x-r.right}},set:function(t){var e=t.coords,n=t.edges,r=t.interaction,o=t.state,i=o.offset,a=o.options;if(n){var u=(0,La.default)({},e),s=(0,ka.getRestrictionRect)(a.inner,r,u)||{},l=(0,ka.getRestrictionRect)(a.outer,r,u)||{};Ua(s,Va),Ua(l,qa),n.top?e.y=Math.min(Math.max(l.top+i.top,u.y),s.top+i.top):n.bottom&&(e.y=Math.max(Math.min(l.bottom+i.bottom,u.y),s.bottom+i.bottom)),n.left?e.x=Math.min(Math.max(l.left+i.left,u.x),s.left+i.left):n.right&&(e.x=Math.max(Math.min(l.right+i.right,u.x),s.right+i.right))}},defaults:{inner:null,outer:null,offset:null,endOnly:!1,enabled:!1}};Fa.default=Ga;var Ha={};Object.defineProperty(Ha,"__esModule",{value:!0}),Ha.default=void 0;var Ka=Za(Qt),$a=Za(ka);function Za(t){return t&&t.__esModule?t:{default:t}}var Ja=(0,Ka.default)({get elementRect(){return{top:0,left:0,bottom:1,right:1}},set elementRect(t){}},$a.default.defaults),Qa={start:$a.default.start,set:$a.default.set,defaults:Ja};Ha.default=Qa;var tu={};function eu(t){return(eu="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(tu,"__esModule",{value:!0}),tu.default=void 0;var nu=au(Qt),ru=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==eu(t)&&"function"!=typeof t)return{default:t};var e=iu();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(be),ou=au(Fa);function iu(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return iu=function(){return t},t}function au(t){return t&&t.__esModule?t:{default:t}}var uu={width:-1/0,height:-1/0},su={width:1/0,height:1/0};var lu={start:function(t){return ou.default.start(t)},set:function(t){var e=t.interaction,n=t.state,r=t.rect,o=t.edges,i=n.options;if(o){var a=ru.tlbrToXywh((0,ka.getRestrictionRect)(i.min,e,t.coords))||uu,u=ru.tlbrToXywh((0,ka.getRestrictionRect)(i.max,e,t.coords))||su;n.options={endOnly:i.endOnly,inner:(0,nu.default)({},ou.default.noInner),outer:(0,nu.default)({},ou.default.noOuter)},o.top?(n.options.inner.top=r.bottom-a.height,n.options.outer.top=r.bottom-u.height):o.bottom&&(n.options.inner.bottom=r.top+a.height,n.options.outer.bottom=r.top+u.height),o.left?(n.options.inner.left=r.right-a.width,n.options.outer.left=r.right-u.width):o.right&&(n.options.inner.right=r.left+a.width,n.options.outer.right=r.left+u.width),ou.default.set(t),n.options=i}},defaults:{min:null,max:null,endOnly:!1,enabled:!1}};tu.default=lu;var cu={};function fu(t){return(fu="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(cu,"__esModule",{value:!0}),cu.default=void 0;var pu=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==fu(t)&&"function"!=typeof t)return{default:t};var e=du();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(De);function du(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return du=function(){return t},t}var vu={start:function(t){var e,n,r,o=t.interaction,i=t.interactable,a=t.element,u=t.rect,s=t.state,l=t.startOffset,c=s.options,f=c.offsetWithOrigin?(n=(e=t).interaction.element,pu.rect.rectToXY(pu.rect.resolveRectLike(e.state.options.origin,null,null,[n]))||pu.getOriginXY(e.interactable,n,e.interaction.prepared.name)):{x:0,y:0};if("startCoords"===c.offset)r={x:o.coords.start.page.x,y:o.coords.start.page.y};else{var p=pu.rect.resolveRectLike(c.offset,i,a,[o]);(r=pu.rect.rectToXY(p)||{x:0,y:0}).x+=f.x,r.y+=f.y}var d=c.relativePoints;s.offsets=u&&d&&d.length?d.map(function(t,e){return{index:e,relativePoint:t,x:l.left-u.width*t.x+r.x,y:l.top-u.height*t.y+r.y}}):[pu.extend({index:0,relativePoint:null},r)]},set:function(t){var e=t.interaction,n=t.coords,r=t.state,o=r.options,i=r.offsets,a=pu.getOriginXY(e.interactable,e.element,e.prepared.name),u=pu.extend({},n),s=[];o.offsetWithOrigin||(u.x-=a.x,u.y-=a.y);for(var l=0;l<i.length;l++)for(var c=i[l],f=u.x-c.x,p=u.y-c.y,d=0,v=o.targets.length;d<v;d++){var y=o.targets[d],h=void 0;(h=pu.is.func(y)?y(f,p,e,c,d):y)&&s.push({x:(pu.is.number(h.x)?h.x:f)+c.x,y:(pu.is.number(h.y)?h.y:p)+c.y,range:pu.is.number(h.range)?h.range:o.range,source:y,index:d,offset:c})}for(var g={target:null,inRange:!1,distance:0,range:0,delta:{x:0,y:0}},b=0;b<s.length;b++){var m=s[b],O=m.range,w=m.x-u.x,P=m.y-u.y,_=pu.hypot(w,P),x=_<=O;O===1/0&&g.inRange&&g.range!==1/0&&(x=!1),g.target&&!(x?g.inRange&&O!==1/0?_/O<g.distance/g.range:O===1/0&&g.range!==1/0||_<g.distance:!g.inRange&&_<g.distance)||(g.target=m,g.distance=_,g.range=O,g.inRange=x,g.delta.x=w,g.delta.y=P)}return g.inRange&&(n.x=g.target.x,n.y=g.target.y),r.closest=g},defaults:{range:1/0,targets:null,offset:null,offsetWithOrigin:!0,origin:null,relativePoints:null,endOnly:!1,enabled:!1}};cu.default=vu;var yu={};function hu(t){return(hu="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(yu,"__esModule",{value:!0}),yu.default=void 0;var gu=wu(Qt),bu=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==hu(t)&&"function"!=typeof t)return{default:t};var e=Ou();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(P),mu=wu(cu);function Ou(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Ou=function(){return t},t}function wu(t){return t&&t.__esModule?t:{default:t}}function Pu(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var _u={start:function(t){var e=t.state,n=t.edges,r=e.options;if(!n)return null;t.state={options:{targets:null,relativePoints:[{x:n.left?0:1,y:n.top?0:1}],offset:r.offset||"self",origin:{x:0,y:0},range:r.range}},e.targetFields=e.targetFields||[["width","height"],["x","y"]],mu.default.start(t),e.offsets=t.state.offsets,t.state=e},set:function(t){var e=t.interaction,n=t.state,r=t.coords,o=n.options,i=n.offsets,a={x:r.x-i[0].x,y:r.y-i[0].y};n.options=(0,gu.default)({},o),n.options.targets=[];for(var u=0;u<(o.targets||[]).length;u++){var s=(o.targets||[])[u],l=void 0;if(l=bu.func(s)?s(a.x,a.y,e):s){for(var c=0;c<n.targetFields.length;c++){var f=Pu(n.targetFields[c],2),p=f[0],d=f[1];if(p in l||d in l){l.x=l[p],l.y=l[d];break}}n.options.targets.push(l)}}var v=mu.default.set(t);return n.options=o,v},defaults:{range:1/0,targets:null,offset:null,endOnly:!1,enabled:!1}};yu.default=_u;var xu={};Object.defineProperty(xu,"__esModule",{value:!0}),xu.default=void 0;var ju=ku(B),Su=ku(Qt),Mu=ku(yu);function ku(t){return t&&t.__esModule?t:{default:t}}var Eu={start:function(t){var e=t.edges;return e?(t.state.targetFields=t.state.targetFields||[[e.left?"left":"right",e.top?"top":"bottom"]],Mu.default.start(t)):null},set:Mu.default.set,defaults:(0,Su.default)((0,ju.default)(Mu.default.defaults),{targets:null,range:null,offset:{x:0,y:0}})};xu.default=Eu;var Tu={};Object.defineProperty(Tu,"__esModule",{value:!0}),Tu.aspectRatio=Tu.restrictSize=Tu.restrictEdges=Tu.restrictRect=Tu.restrict=Tu.snapEdges=Tu.snapSize=Tu.snap=void 0;var Du=Xu(ba),Iu=Xu(Fa),Au=Xu(ka),zu=Xu(Ha),Cu=Xu(tu),Wu=Xu(xu),Ru=Xu(cu),Fu=Xu(yu);function Xu(t){return t&&t.__esModule?t:{default:t}}var Yu=(0,Fi.makeModifier)(Ru.default,"snap");Tu.snap=Yu;var Lu=(0,Fi.makeModifier)(Fu.default,"snapSize");Tu.snapSize=Lu;var Nu=(0,Fi.makeModifier)(Wu.default,"snapEdges");Tu.snapEdges=Nu;var Bu=(0,Fi.makeModifier)(Au.default,"restrict");Tu.restrict=Bu;var Vu=(0,Fi.makeModifier)(zu.default,"restrictRect");Tu.restrictRect=Vu;var qu=(0,Fi.makeModifier)(Iu.default,"restrictEdges");Tu.restrictEdges=qu;var Uu=(0,Fi.makeModifier)(Cu.default,"restrictSize");Tu.restrictSize=Uu;var Gu=(0,Fi.makeModifier)(Du.default,"aspectRatio");Tu.aspectRatio=Gu;var Hu={};Object.defineProperty(Hu,"__esModule",{value:!0}),Hu.PointerEvent=Hu.default=void 0;var Ku,$u=(Ku=pn)&&Ku.__esModule?Ku:{default:Ku},Zu=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Qu(t)&&"function"!=typeof t)return{default:t};var e=Ju();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(dt);function Ju(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Ju=function(){return t},t}function Qu(t){return(Qu="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function ts(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function es(t){return(es=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function ns(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function rs(t,e){return(rs=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function os(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var is=function(){function f(t,e,n,r,o,i){var a,u,s;if(!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),u=this,a=!(s=es(f).call(this,o))||"object"!==Qu(s)&&"function"!=typeof s?ns(u):s,os(ns(a),"type",void 0),os(ns(a),"originalEvent",void 0),os(ns(a),"pointerId",void 0),os(ns(a),"pointerType",void 0),os(ns(a),"double",void 0),os(ns(a),"pageX",void 0),os(ns(a),"pageY",void 0),os(ns(a),"clientX",void 0),os(ns(a),"clientY",void 0),os(ns(a),"dt",void 0),os(ns(a),"eventable",void 0),Zu.pointerExtend(ns(a),n),n!==e&&Zu.pointerExtend(ns(a),e),a.timeStamp=i,a.originalEvent=n,a.type=t,a.pointerId=Zu.getPointerId(e),a.pointerType=Zu.getPointerType(e),a.target=r,a.currentTarget=null,"tap"===t){var l=o.getPointerIndex(e);a.dt=a.timeStamp-o.pointers[l].downTime;var c=a.timeStamp-o.tapTime;a.double=!!(o.prevTap&&"doubletap"!==o.prevTap.type&&o.prevTap.target===a.target&&c<500)}else"doubletap"===t&&(a.dt=e.timeStamp-o.tapTime);return a}var t,e,n;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&rs(t,e)}(f,$u["default"]),t=f,(e=[{key:"_subtractOrigin",value:function(t){var e=t.x,n=t.y;return this.pageX-=e,this.pageY-=n,this.clientX-=e,this.clientY-=n,this}},{key:"_addOrigin",value:function(t){var e=t.x,n=t.y;return this.pageX+=e,this.pageY+=n,this.clientX+=e,this.clientY+=n,this}},{key:"preventDefault",value:function(){this.originalEvent.preventDefault()}}])&&ts(t.prototype,e),n&&ts(t,n),f}();Hu.PointerEvent=Hu.default=is;var as={};function us(t){return(us="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(as,"__esModule",{value:!0}),as.default=void 0;fs(Wn),O({});var ss=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==us(t)&&"function"!=typeof t)return{default:t};var e=cs();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(De),ls=fs(Hu);function cs(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return cs=function(){return t},t}function fs(t){return t&&t.__esModule?t:{default:t}}var ps={id:"pointer-events/base",install:function(t){t.pointerEvents=ps,t.defaults.actions.pointerEvents=ps.defaults,ss.extend(t.actions.phaselessTypes,ps.types)},listeners:{"interactions:new":function(t){var e=t.interaction;e.prevTap=null,e.tapTime=0},"interactions:update-pointer":function(t){var e=t.down,n=t.pointerInfo;if(!e&&n.hold)return;n.hold={duration:1/0,timeout:null}},"interactions:move":function(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.duplicate,u=n.getPointerIndex(r);a||n.pointerIsDown&&!n.pointerWasMoved||(n.pointerIsDown&&clearTimeout(n.pointers[u].hold.timeout),ds({interaction:n,pointer:r,event:o,eventTarget:i,type:"move"},e))},"interactions:down":function(t,e){!function(t,e){for(var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.pointerIndex,u=n.pointers[a].hold,s=ss.dom.getPath(i),l={interaction:n,pointer:r,event:o,eventTarget:i,type:"hold",targets:[],path:s,node:null},c=0;c<s.length;c++){var f=s[c];l.node=f,e.fire("pointerEvents:collect-targets",l)}if(!l.targets.length)return;for(var p=1/0,d=0;d<l.targets.length;d++){var v=l.targets[d].eventable.options.holdDuration;v<p&&(p=v)}u.duration=p,u.timeout=setTimeout(function(){ds({interaction:n,eventTarget:i,pointer:r,event:o,type:"hold"},e)},p)}(t,e),ds(t,e)},"interactions:up":function(t,e){var n,r,o,i,a,u;ys(t),ds(t,e),r=e,o=(n=t).interaction,i=n.pointer,a=n.event,u=n.eventTarget,o.pointerWasMoved||ds({interaction:o,eventTarget:u,pointer:i,event:a,type:"tap"},r)},"interactions:cancel":function(t,e){ys(t),ds(t,e)}},PointerEvent:ls.default,fire:ds,collectEventTargets:vs,defaults:{holdDuration:600,ignoreFrom:null,allowFrom:null,origin:{x:0,y:0}},types:{down:!0,move:!0,up:!0,cancel:!0,tap:!0,doubletap:!0,hold:!0}};function ds(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.type,u=t.targets,s=void 0===u?vs(t,e):u,l=new ls.default(a,r,o,i,n,e.now());e.fire("pointerEvents:new",{pointerEvent:l});for(var c={interaction:n,pointer:r,event:o,eventTarget:i,targets:s,type:a,pointerEvent:l},f=0;f<s.length;f++){var p=s[f];for(var d in p.props||{})l[d]=p.props[d];var v=ss.getOriginXY(p.eventable,p.node);if(l._subtractOrigin(v),l.eventable=p.eventable,l.currentTarget=p.node,p.eventable.fire(l),l._addOrigin(v),l.immediatePropagationStopped||l.propagationStopped&&f+1<s.length&&s[f+1].node!==l.currentTarget)break}if(e.fire("pointerEvents:fired",c),"tap"===a){var y=l.double?ds({interaction:n,pointer:r,event:o,eventTarget:i,type:"doubletap"},e):l;n.prevTap=y,n.tapTime=y.timeStamp}return l}function vs(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.type,u=n.getPointerIndex(r),s=n.pointers[u];if("tap"===a&&(n.pointerWasMoved||!s||s.downTarget!==i))return[];for(var l=ss.dom.getPath(i),c={interaction:n,pointer:r,event:o,eventTarget:i,type:a,path:l,targets:[],node:null},f=0;f<l.length;f++){var p=l[f];c.node=p,e.fire("pointerEvents:collect-targets",c)}return"hold"===a&&(c.targets=c.targets.filter(function(t){return t.eventable.options.holdDuration===n.pointers[u].hold.duration})),c.targets}function ys(t){var e=t.interaction,n=t.pointerIndex;e.pointers[n].hold&&clearTimeout(e.pointers[n].hold.timeout)}var hs=ps;as.default=hs;var gs={};Object.defineProperty(gs,"__esModule",{value:!0}),gs.default=void 0;var bs=ms(as);ms(Hu);function ms(t){return t&&t.__esModule?t:{default:t}}function Os(t){var e=t.interaction;e.holdIntervalHandle&&(clearInterval(e.holdIntervalHandle),e.holdIntervalHandle=null)}var ws={id:"pointer-events/holdRepeat",install:function(t){t.usePlugin(bs.default);var e=t.pointerEvents;e.defaults.holdRepeatInterval=0,e.types.holdrepeat=t.actions.phaselessTypes.holdrepeat=!0},listeners:["move","up","cancel","endall"].reduce(function(t,e){return t["pointerEvents:".concat(e)]=Os,t},{"pointerEvents:new":function(t){var e=t.pointerEvent;"hold"===e.type&&(e.count=(e.count||0)+1)},"pointerEvents:fired":function(t,e){var n=t.interaction,r=t.pointerEvent,o=t.eventTarget,i=t.targets;if("hold"===r.type&&i.length){var a=i[0].eventable.options.holdRepeatInterval;a<=0||(n.holdIntervalHandle=setTimeout(function(){e.pointerEvents.fire({interaction:n,eventTarget:o,type:"hold",pointer:r,event:r},e)},a))}}})};gs.default=ws;var Ps={};Object.defineProperty(Ps,"__esModule",{value:!0}),Ps.default=void 0;var _s,xs=(_s=Qt)&&_s.__esModule?_s:{default:_s};function js(t){return(0,xs.default)(this.events.options,t),this}var Ss={id:"pointer-events/interactableTargets",install:function(t){var e=t.Interactable;e.prototype.pointerEvents=js;var r=e.prototype._backCompatOption;e.prototype._backCompatOption=function(t,e){var n=r.call(this,t,e);return n===this&&(this.events.options[t]=e),n}},listeners:{"pointerEvents:collect-targets":function(t,e){var r=t.targets,o=t.node,i=t.type,a=t.eventTarget;e.interactables.forEachMatch(o,function(t){var e=t.events,n=e.options;e.types[i]&&e.types[i].length&&t.testIgnoreAllow(n,o,a)&&r.push({node:o,eventable:e,props:{interactable:t}})})},"interactable:new":function(t){var e=t.interactable;e.events.getRect=function(t){return e.getRect(t)}},"interactable:set":function(t,e){var n=t.interactable,r=t.options;(0,xs.default)(n.events.options,e.pointerEvents.defaults),(0,xs.default)(n.events.options,r.pointerEvents||{})}}};Ps.default=Ss;var Ms={};function ks(t){return(ks="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Ms,"__esModule",{value:!0}),Ms.install=function(t){t.usePlugin(Es),t.usePlugin(Ts.default),t.usePlugin(Ds.default)},Object.defineProperty(Ms,"holdRepeat",{enumerable:!0,get:function(){return Ts.default}}),Object.defineProperty(Ms,"interactableTargets",{enumerable:!0,get:function(){return Ds.default}}),Ms.pointerEvents=Ms.id=void 0;var Es=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==ks(t)&&"function"!=typeof t)return{default:t};var e=As();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(as);Ms.pointerEvents=Es;var Ts=Is(gs),Ds=Is(Ps);function Is(t){return t&&t.__esModule?t:{default:t}}function As(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return As=function(){return t},t}Ms.id="pointer-events";var zs={};Object.defineProperty(zs,"__esModule",{value:!0}),zs.install=Ws,zs.default=void 0;var Cs;(Cs=M({}))&&Cs.__esModule;function Ws(e){var t=e.Interactable;e.actions.phases.reflow=!0,t.prototype.reflow=function(t){return function(u,s,l){function t(){var e=c[d],t=u.getRect(e);if(!t)return"break";var n=De.arr.find(l.interactions.list,function(t){return t.interacting()&&t.interactable===u&&t.element===e&&t.prepared.name===s.name}),r=void 0;if(n)n.move(),p&&(r=n._reflowPromise||new f(function(t){n._reflowResolve=t}));else{var o=De.rect.tlbrToXywh(t),i={page:{x:o.x,y:o.y},client:{x:o.x,y:o.y},timeStamp:l.now()},a=De.pointer.coordsToEvent(i);r=function(t,e,n,r,o){var i=t.interactions.new({pointerType:"reflow"}),a={interaction:i,event:o,pointer:o,eventTarget:n,phase:"reflow"};i.interactable=e,i.element=n,i.prepared=(0,De.extend)({},r),i.prevEvent=o,i.updatePointer(o,o,n,!0),i._doPhase(a);var u=De.win.window.Promise?new De.win.window.Promise(function(t){i._reflowResolve=t}):null;i._reflowPromise=u,i.start(r,e,n),i._interacting?(i.move(a),i.end(o)):i.stop();return i.removePointer(o,o),i.pointerIsDown=!1,u}(l,u,e,s,a)}p&&p.push(r)}for(var c=De.is.string(u.target)?De.arr.from(u._context.querySelectorAll(u.target)):[u.target],f=De.win.window.Promise,p=f?[]:null,d=0;d<c.length;d++){if("break"===t())break}return p&&f.all(p).then(function(){return u})}(this,t,e)}}var Rs={id:"reflow",install:Ws,listeners:{"interactions:stop":function(t,e){var n=t.interaction;"reflow"===n.pointerType&&(n._reflowResolve&&n._reflowResolve(),De.arr.remove(e.interactions.list,n))}}};zs.default=Rs;var Fs={};function Xs(t){return(Xs="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Fs,"__esModule",{value:!0}),Fs.default=Fs.scope=Fs.interact=void 0;var Ys=O({}),Ls=qs(z),Ns=qs(Tt),Bs=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Xs(t)&&"function"!=typeof t)return{default:t};var e=Vs();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(De);function Vs(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Vs=function(){return t},t}function qs(t){return t&&t.__esModule?t:{default:t}}var Us={},Gs=new Ys.Scope;Fs.scope=Gs;function Hs(t,e){var n=Gs.interactables.get(t,e);return n||((n=Gs.interactables.new(t,e)).events.global=Us),n}(Fs.interact=Hs).use=function(t,e){return Gs.usePlugin(t,e),Hs},Hs.isSet=function(t,e){return!!Gs.interactables.get(t,e&&e.context)},Hs.on=function(t,e,n){Bs.is.string(t)&&-1!==t.search(" ")&&(t=t.trim().split(/ +/));if(Bs.is.array(t)){for(var r=0;r<t.length;r++){var o;o=t[r],Hs.on(o,e,n)}return Hs}if(Bs.is.object(t)){for(var i in t)Hs.on(i,t[i],e);return Hs}(0,Ys.isNonNativeEvent)(t,Gs.actions)?Us[t]?Us[t].push(e):Us[t]=[e]:Ns.default.add(Gs.document,t,e,{options:n});return Hs},Hs.off=function(t,e,n){Bs.is.string(t)&&-1!==t.search(" ")&&(t=t.trim().split(/ +/));if(Bs.is.array(t)){for(var r=0;r<t.length;r++){var o;o=t[r],Hs.off(o,e,n)}return Hs}if(Bs.is.object(t)){for(var i in t)Hs.off(i,t[i],e);return Hs}var a;(0,Ys.isNonNativeEvent)(t,Gs.actions)?t in Us&&-1!==(a=Us[t].indexOf(e))&&Us[t].splice(a,1):Ns.default.remove(Gs.document,t,e,n);return Hs},Hs.debug=function(){return Gs},Hs.getPointerAverage=Bs.pointer.pointerAverage,Hs.getTouchBBox=Bs.pointer.touchBBox,Hs.getTouchDistance=Bs.pointer.touchDistance,Hs.getTouchAngle=Bs.pointer.touchAngle,Hs.getElementRect=Bs.dom.getElementRect,Hs.getElementClientRect=Bs.dom.getElementClientRect,Hs.matchesSelector=Bs.dom.matchesSelector,Hs.closest=Bs.dom.closest,Hs.supportsTouch=function(){return Ls.default.supportsTouch},Hs.supportsPointerEvent=function(){return Ls.default.supportsPointerEvent},Hs.stop=function(){for(var t=0;t<Gs.interactions.list.length;t++){Gs.interactions.list[t].stop()}return Hs},Hs.pointerMoveTolerance=function(t){if(Bs.is.number(t))return Gs.interactions.pointerMoveTolerance=t,Hs;return Gs.interactions.pointerMoveTolerance},Gs.addListeners({"interactable:unset":function(t){var e=t.interactable;Gs.interactables.list.splice(Gs.interactables.list.indexOf(e),1);for(var n=0;n<Gs.interactions.list.length;n++){var r=Gs.interactions.list[n];r.interactable===e&&r.interacting()&&!r._ending&&r.stop()}}}),Hs.addDocument=function(t,e){return Gs.addDocument(t,e)},Hs.removeDocument=function(t){return Gs.removeDocument(t)};var Ks=Gs.interact=Hs;Fs.default=Ks;var $s={};function Zs(t){return(Zs="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty($s,"__esModule",{value:!0}),$s.init=function(t){for(var e in sl.scope.init(t),sl.default.use(el.default),sl.default.use(il.default),sl.default.use(al),sl.default.use(nl.default),sl.default.use(rl.default),sl.default.use(tl),sl.default.use(Js),ol){var n=ol[e],r=n._defaults,o=n._methods;r._methods=o,sl.scope.defaults.perAction[e]=r}sl.default.use(Qs.default),sl.default.use(ul.default),0;return sl.default},$s.default=void 0;var Js=fl(Jr),Qs=ll(oo),tl=fl(Zo),el=ll(ni),nl=(ll(pi),ll(Qi)),rl=ll(Fi),ol=fl(Tu),il=ll(Bi),al=fl(Ms),ul=ll(zs),sl=fl(Fs);function ll(t){return t&&t.__esModule?t:{default:t}}function cl(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return cl=function(){return t},t}function fl(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Zs(t)&&"function"!=typeof t)return{default:t};var e=cl();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}sl.default.version="1.8.5";var pl=sl.default;$s.default=pl;var dl={};function vl(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(dl,"__esModule",{value:!0}),dl.default=void 0;function yl(v){function t(t,e){for(var n=v.range,r=v.limits,o=void 0===r?{left:-1/0,right:1/0,top:-1/0,bottom:1/0}:r,i=v.offset,a=void 0===i?{x:0,y:0}:i,u={range:n,grid:v,x:null,y:null},s=0;s<y.length;s++){var l=vl(y[s],2),c=l[0],f=l[1],p=Math.round((t-a.x)/v[c]),d=Math.round((e-a.y)/v[f]);u[c]=Math.max(o.left,Math.min(o.right,p*v[c]+a.x)),u[f]=Math.max(o.top,Math.min(o.bottom,d*v[f]+a.y))}return u}var y=[["x","y"],["left","top"],["right","bottom"],["width","height"]].filter(function(t){var e=vl(t,2),n=e[0],r=e[1];return n in v||r in v});return t.grid=v,t.coordFields=y,t}dl.default=yl;var hl={};Object.defineProperty(hl,"__esModule",{value:!0}),Object.defineProperty(hl,"grid",{enumerable:!0,get:function(){return bl.default}});var gl,bl=(gl=dl)&&gl.__esModule?gl:{default:gl};var ml={};Object.defineProperty(ml,"__esModule",{value:!0}),ml.init=kl,ml.default=void 0;var Ol,wl=Sl($s),Pl=Sl(Tu),_l=(Ol=Qt)&&Ol.__esModule?Ol:{default:Ol},xl=Sl(hl);function jl(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return jl=function(){return t},t}function Sl(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Ml(t)&&"function"!=typeof t)return{default:t};var e=jl();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function Ml(t){return(Ml="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function kl(t){return(0,wl.init)(t),wl.default.use({id:"interactjs",install:function(){wl.default.modifiers=(0,_l.default)({},Pl),wl.default.snappers=xl,wl.default.createSnapGrid=wl.default.snappers.grid}})}"object"===("undefined"==typeof window?"undefined":Ml(window))&&window&&kl(window);var El=wl.default;ml.default=El;var Tl={exports:{}};Object.defineProperty(Tl.exports,"__esModule",{value:!0});var Dl={};Tl.exports.default=void 0;var Il=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==zl(t)&&"function"!=typeof t)return{default:t};var e=Al();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(ml);function Al(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Al=function(){return t},t}function zl(t){return(zl="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}if(Object.keys(Il).forEach(function(t){"default"!==t&&"__esModule"!==t&&(Object.prototype.hasOwnProperty.call(Dl,t)||Object.defineProperty(Tl.exports,t,{enumerable:!0,get:function(){return Il[t]}}))}),"object"===zl(Tl)&&Tl)try{Tl.exports=Il.default}catch(t){}Il.default.default=Il.default,Il.default.init=Il.init;var Cl=Il.default;return Tl.exports.default=Cl,Tl=Tl.exports});

	//# sourceMappingURL=interact.min.js.map


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(34);

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
	  dom.className = "gv-anchor";
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
	  ele.className = "gv-marker-input";
	  ele.placeholder = "双击此处上传图片";
	  return ele;
	}

	/**
	 *
	 * @return {HTMLImageElement}
	 */
	function createImage() {
	  var ele = document.createElement("img");
	  ele.className = "gv-marker-image";
	  return ele;
	}

	function createDeleteHover() {
	  var ele = document.createElement("div");
	  ele.className = "gv-marker-delete-horver";
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
	      var reads = new FileReader();
	      var f = _this.uploadEle.files[0];
	      reads.readAsDataURL(f);
	      reads.onload = function (e) {
	        if (!_this.imageEle) {
	          _this.imageEle = createImage();
	          _this.deleteHover = createDeleteHover();
	          _this.element.removeChild(_this.textEle);
	          _this.element.appendChild(_this.imageEle);
	          _this.element.appendChild(_this.deleteHover);
	        }
	        _this.imageEle.src = reads.result;
	        _this.imageEle.onload = function (e) {
	          var originWidth = _this.imageEle.naturalWidth > 400 ? 400 : _this.imageEle.naturalWidth;
	          var originHeight = originWidth * _this.imageEle.naturalHeight / _this.imageEle.naturalWidth;

	          _this._element.style.width = originWidth + "px";
	          _this._element.style.height = originHeight + "px";
	        };
	      };
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
	      (0, _util.removeClass)(_this.textEle, "gv-dragble");
	      // this.textEle
	    };

	    _this.disableEdit = function () {
	      _this.textEle.disabled = true;
	      // this._menu.visible = false;
	      (0, _util.addClass)(_this.textEle, "gv-dragble");
	    };

	    if (options.id) _this._id = options.id;
	    /** @type {HTMLDivElement} */
	    _this._element = _this._element;
	    _this._element.className = "gv-resizer";
	    _this.textEle = textEle;
	    _this.uploadEle = createFileInput();
	    _this.uploadEle.addEventListener("change", _this.loadImage);
	    _this.imageEle = undefined;
	    _this.createAnchors();
	    _this._element.ondblclick = _this.eledbClick;
	    document.body.addEventListener("click", _this.bodyClick);
	    document.body.addEventListener("dblclick", _this.bodydbClick);
	    // document.body.onclick.addEventListener(this.bodyClick);
	    return _this;
	  }

	  _createClass(ImageMarker, [{
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
	      (0, _util.addClass)(this.element, "gv-resizeble");
	    }
	  }, {
	    key: "disableResize",
	    value: function disableResize() {
	      (0, _util.removeClass)(this.element, "gv-resizeble");
	    }
	  }, {
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
	  }, {
	    key: "removeFrom",
	    value: function removeFrom(features) {
	      features.markers.removeMarker(this);
	      document.body.removeEventListener("click", this.bodyClick);
	      document.body.removeEventListener("dblclick", this.bodydbClick);
	      return this;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.removeFrom(this._features);
	    }
	  }]);

	  return ImageMarker;
	}(GeoVis.DomMarker);

	exports.default = ImageMarker;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = startDrawingRectangle;

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _BillboardGroup = __webpack_require__(4);

	var _BillboardGroup2 = _interopRequireDefault(_BillboardGroup);

	var _Rectangle = __webpack_require__(19);

	var _Rectangle2 = _interopRequireDefault(_Rectangle);

	var _compute = __webpack_require__(39);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ellipsoid = Engine.Ellipsoid.WGS84;

	function startDrawingRectangle(options) {
	  options = (0, _util.copyOptions)(options, _config.defaultRectangleOptions);
	  if (options.image) {
	    var mat = new Engine.Material({
	      fabric: {
	        type: 'Image',
	        uniforms: {
	          image: options.image
	        }
	      }
	    });
	    options.material = mat;
	  }

	  var proj = new GeoVis.WebMercatorProjection();
	  // proj.project(cartographic);
	  // proj.unproject();

	  this.startDrawing(function () {
	    primitives.remove(poly);
	    markers.remove(); // 移除被选元素
	    mouseHandler.destroy(); // 销毁过程
	    proj = undefined;
	    tooltip.setVisible(false); // Cesium工具提示是否显示
	  });

	  var _self = this;
	  var scene = this._scene;
	  var primitives = this._primitives;
	  var tooltip = this._tooltip;

	  var markers = new _BillboardGroup2.default(this, _config.defaultBillboard);
	  var poly;
	  poly = new _Rectangle2.default(options);
	  poly.asynchronous = false;
	  primitives.add(poly);
	  var mouseHandler = new Engine.ScreenSpaceEventHandler(scene.canvas);
	  var positions = [];
	  var pictureXY = [];
	  // Now wait for start
	  mouseHandler.setInputAction(function (movement) {
	    if (movement.position != null) {
	      var cartesian = scene.camera.pickEllipsoid(movement.position, ellipsoid);
	      if (cartesian) {
	        if (positions.length === 0) {
	          positions.push(cartesian.clone());
	          markers.addBillboard(positions[0]);
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
	        markers.addBillboard(cartesian);
	      }
	    }
	  }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	  mouseHandler.setInputAction(function (movement) {
	    var position = movement.endPosition;
	    if (position !== null) {
	      if (positions.length === 0) {
	        tooltip.showAt(position, "<p>点击创建第一个点</p>");
	      } else {
	        var cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
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
	          markers.getBillboard(positions.length - 1).position = cartesian;
	          // show tooltip
	          tooltip.showAt(position, "<p>点击创建新的点</p>" + (positions.length > 2 ? "<p>双击结束</p>" : ""));
	        }
	      }
	    }
	  }, Engine.ScreenSpaceEventType.MOUSE_MOVE);

	  mouseHandler.setInputAction(function (movement) {
	    var position = movement.position;
	    //positions.pop();
	    finishDrawing(position);
	  }, Engine.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

	  function finishDrawing(position) {
	    if (position !== null) {
	      if (positions.length < 2) {} else {
	        var cartesian = scene.camera.pickEllipsoid(position, ellipsoid);
	        if (cartesian) {
	          _self.stopDrawing();
	          if (typeof options.callback === "function") {
	            options.callback(positions);
	          }
	          var rectangle = new _Rectangle2.default(_extends({}, options, {
	            positions: poly.positions,
	            material: options.material,
	            type: options.type
	          }));
	          _self.primitives.add(rectangle);
	          rectangle.setEditable();
	          _self.fire("created", {
	            entity: rectangle,
	            positions: poly.positions
	          });
	        }
	      }
	    }
	  }
	  function GetDeltaPoint(pictureXY, point1, point2) {
	    var carto0 = Engine.Cartographic.fromCartesian(point1);
	    var proj0 = proj.project(carto0);
	    var carto1 = Engine.Cartographic.fromCartesian(point2);
	    var proj1 = proj.project(carto1);
	    if (carto1.latitude < carto0.latitude) {
	      var latY = proj0.y - pictureXY[1] * Math.abs(proj1.x - proj0.x) / pictureXY[0];
	    } else {
	      var latY = proj0.y + pictureXY[1] * Math.abs(proj1.x - proj0.x) / pictureXY[0];
	    }
	    var pointCart = proj.unproject(new GeoVis.Cartesian3(proj1.x, latY, proj1.z));
	    var cartesian1 = Engine.Cartesian3.fromRadians(pointCart.longitude, pointCart.latitude, 0);
	    if (carto1.longitude < carto0.longitude) {
	      var lonX = proj0.x - pictureXY[0] * Math.abs(proj1.y - proj0.y) / pictureXY[1];
	    } else {
	      var lonX = proj0.x + pictureXY[0] * Math.abs(proj1.y - proj0.y) / pictureXY[1];
	    }
	    var pointCart = proj.unproject(new GeoVis.Cartesian3(lonX, proj1.y, proj1.z));
	    var cartesian2 = Engine.Cartesian3.fromRadians(pointCart.longitude, pointCart.latitude, 0);
	    if (GeoVis.Cartesian3.distance(cartesian1, point1) >= GeoVis.Cartesian3.distance(cartesian2, point1)) {
	      return cartesian1;
	    } else {
	      return cartesian2;
	    }
	  }
	}

/***/ }),
/* 39 */
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

	var _geographiclib = __webpack_require__(40);

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
	    var coor = Engine.Cartographic.fromCartesian(position);
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
	    var coor = Engine.Cartographic.fromCartesian(position);
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
	    var coor = Engine.Cartographic.fromCartesian(position);
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
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = startDrawingIcon;

	var _util = __webpack_require__(3);

	var _pickPosition = __webpack_require__(20);

	var _pickPosition2 = _interopRequireDefault(_pickPosition);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function startDrawingIcon(options) {
	  options = (0, _util.copyOptions)(options, {});
	  options = options || GeoVis.createGuid();
	  this.startDrawing(function () {
	    mouseHandler.destroy();
	    tooltip.setVisible(false);
	  });

	  var _self = this;
	  var scene = this._scene;
	  var tooltip = this._tooltip;

	  var mouseHandler = new Engine.ScreenSpaceEventHandler(scene.canvas);

	  mouseHandler.setInputAction(function (movement) {
	    if (movement.position !== null) {
	      var cartesian = (0, _pickPosition2.default)(scene, movement.position);
	      if (cartesian) {
	        var billboard = void 0;
	        billboard = new GeoVis.Billboard(cartesian, options).addTo(_self.earth.featrues);
	        _self.fire("created", {
	          entity: billboard
	        });
	        _self.stopDrawing();
	      }
	    }
	  }, Engine.ScreenSpaceEventType.LEFT_CLICK);

	  mouseHandler.setInputAction(function (movement) {
	    var position = movement.endPosition;
	    if (position !== null) {
	      tooltip.showAt(position, "<p>点击开始绘制</p>");
	    }
	  }, Engine.ScreenSpaceEventType.MOUSE_MOVE);
	}

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	      _this._div.style.top = position.y + "px";
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
	};

	exports.default = Tooltip;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(3);

	var Util = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var wrapEvented = function wrapEvented(ParentClass) {
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

	module.exports = wrapEvented;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	var _compute = __webpack_require__(39);

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
	  disableDepthTestDistance: 4e6,
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

	    this.drawHelper = drawHelper;
	    this.drawHelper.on("created", function (e) {
	      _this.measureType(e);
	    });
	    this.drawHelper.on("changed", function (e) {
	      if (e.entity.type !== _Types2.default.GROUND_POLYGON && e.entity.type !== _Types2.default.GROUND_POLYLINE) {
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
	      if (e.entity.computed) {
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
	      labels.map(function (label) {
	        return label.removeFrom(_this2.drawHelper.features);
	      });
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
	          })).addTo(this.drawHelper.features);
	          labels.push(label);
	        });
	      }
	      this.tags.set(entity.id, labels);
	    }
	  }, {
	    key: "distanceMeasure",
	    value: function distanceMeasure(_ref2) {
	      var _this3 = this;

	      var entity = _ref2.entity;

	      if (entity.type !== _Types2.default.PROJ_POLYLINE && entity.type !== _Types2.default.GROUND_POLYLINE && entity.type !== _Types2.default.SPACE_POLYLINE) {
	        return;
	      }
	      var positions = entity.positions;
	      var labels = this.tags.get(entity.id) || [];
	      labels.map(function (label) {
	        return label.removeFrom(_this3.drawHelper.features);
	      });
	      labels = [];
	      labels.push(new GeoVis.Label(positions[0], _extends({
	        text: "\u8D77\u70B9"
	      }, labelOptions)).addTo(this.drawHelper.features));
	      var spacedistance = 0;

	      var _loop = function _loop(i) {
	        if (entity.type === _Types2.default.GROUND_POLYLINE) {
	          var Spacelength = GeoVis.Cartesian3.distance(positions[i - 1], positions[i]);
	          var length = (Spacelength / entity.length).toFixed(0);
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
	            }, labelOptions)).addTo(this.drawHelper.features);
	            labels.push(label);
	          });
	        } else if (entity.type === _Types2.default.PROJ_POLYLINE) {
	          var distance = (0, _compute.computeDistance)(positions.slice(0, i + 1));
	          distance = distance.toFixed(2);
	          var label = new GeoVis.Label(positions[i], _extends({
	            text: i + 1 === positions.length ? "\u603B\u957F" + distance + "\u7C73" : distance + "\u7C73"
	          }, labelOptions)).addTo(_this3.drawHelper.features);
	          labels.push(label);
	        } else {
	          spacedistance = GeoVis.Cartesian3.distance(positions[i - 1], positions[i]) + spacedistance;
	          var _distance = spacedistance.toFixed(2);
	          var _label2 = new GeoVis.Label(positions[i], _extends({
	            text: i + 1 === positions.length ? "\u603B\u957F" + _distance + "\u7C73" : _distance + "\u7C73"
	          }, labelOptions)).addTo(_this3.drawHelper.features);
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
	      this.tags.set(entity.id, labels);
	    }
	  }, {
	    key: "angleMeasure",
	    value: function angleMeasure(_ref3) {
	      var _this4 = this;

	      var entity = _ref3.entity;

	      if (entity.type !== _Types2.default.ANGLE) return;
	      var positions = entity.positions;
	      var labels = this.tags.get(entity.id) || [];
	      labels.map(function (label) {
	        return label.removeFrom(_this4.drawHelper.features);
	      });
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
	    value: function destroy(_ref4) {
	      var _this5 = this;

	      var entity = _ref4.entity;

	      var labels = this.tags.get(entity.id) || [];
	      labels.map(function (label) {
	        label.removeFrom(_this5.drawHelper.features);
	      });
	    }
	  }, {
	    key: "removeAll",
	    value: function removeAll() {
	      var _this6 = this;

	      this.tags.forEach(function (value, key) {
	        value.map(function (label) {
	          label.removeFrom(_this6.drawHelper.features);
	        });
	      });
	      this.tags.clear();
	    }
	  }]);

	  return MeasureTool;
	}();

	exports.default = MeasureTool;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.serialize = serialize;
	exports.unserialize = unserialize;

	var _Types = __webpack_require__(9);

	var _Types2 = _interopRequireDefault(_Types);

	var _util = __webpack_require__(3);

	var _config = __webpack_require__(5);

	var _Polygon = __webpack_require__(7);

	var _Polygon2 = _interopRequireDefault(_Polygon);

	var _GroundPolyline = __webpack_require__(13);

	var _GroundPolyline2 = _interopRequireDefault(_GroundPolyline);

	var _Circle = __webpack_require__(14);

	var _Circle2 = _interopRequireDefault(_Circle);

	var _Polyline = __webpack_require__(12);

	var _Polyline2 = _interopRequireDefault(_Polyline);

	var _TextMarker = __webpack_require__(31);

	var _TextMarker2 = _interopRequireDefault(_TextMarker);

	var _ImageMarker = __webpack_require__(37);

	var _ImageMarker2 = _interopRequireDefault(_ImageMarker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function serializePolygon(entity) {
	  var poly = {};
	  poly.isPolygon = true;
	  poly.type = entity.type;
	  poly.id = entity.id;
	  poly.positions = entity.positions;
	  poly.fillColor = entity.fillColor;
	  poly.custom = entity.custom;
	  return poly;
	}

	function serializePolyline(entity) {
	  var poly = {};
	  poly.type = entity.type;
	  poly.isPolygon = false;
	  poly.id = entity.id;
	  poly.positions = entity.positions;
	  poly.fillColor = entity.fillColor;
	  return poly;
	}

	/**
	 *
	 * @param {CirclePrimitive} entity
	 */
	function serializeCircle(entity) {
	  var poly = {};
	  poly.type = entity.type;
	  poly.id = entity.id;
	  poly.center = entity.getCenter();
	  poly.radius = entity.getRadius();
	  poly.strokeColor = entity.strokeColor;
	  poly.strokeWidth = entity.strokeWidth;
	  poly.fillColor = entity.fillColor;
	  return poly;
	}

	/**
	 *
	 * @param {TextMarker} entity
	 */
	function serializeText(entity) {
	  var marker = {};
	  marker.type = entity.type;
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
	  marker.position = entity.position;
	  marker.filename = entity.filename;
	  marker.width = entity.width;
	  marker.height = entity.height;
	  // marker.entity = entity;
	  return marker;
	}
	function serialize() {
	  var viewport = {
	    x: earth.camera.position.x,
	    y: earth.camera.position.y,
	    z: earth.camera.position.z,
	    heading: earth.camera.heading,
	    pitch: earth.camera.pitch,
	    roll: earth.camera.roll
	  };
	  var results = [];
	  var data = {
	    viewport: viewport,
	    entities: results
	  };
	  var drawHelper = this;
	  drawHelper.primitives._primitives.map(function (entity) {
	    if (!entity.type) return;
	    switch (entity.type) {
	      case _Types2.default.SPACE_POLYGON:
	      case _Types2.default.CLASSIFY_POLYGON:
	      case _Types2.default.PROJ_POLYGON:
	      case _Types2.default.GROUND_POLYGON:
	      case _Types2.default.ARROWHEAD:
	      case _Types2.default.EXTENT:
	      case _Types2.default.TAILEDATTACK:
	        results.push(serializePolygon(entity));
	        break;
	      case _Types2.default.SPACE_POLYLINE:
	      case _Types2.default.PROJ_POLYLINE:
	      case _Types2.default.GROUND_POLYLINE:
	        results.push(serializePolyline(entity));
	        break;
	      case _Types2.default.CIRCLE:
	        results.push(serializeCircle(entity));
	        break;
	    }
	  });
	  drawHelper.features.markers._markerMap.forEach(function (marker) {
	    switch (marker.type) {
	      case _Types2.default.TEXT_MARKER:
	        results.push(serializeText(marker));
	        break;
	      case _Types2.default.IMAGE_MARKER:
	        results.push(serializeImage(marker));
	        break;
	    }
	  });
	  return data;
	}

	function unserializePolygon(options, drawHelper) {
	  options = (0, _util.copyOptions)(options, _config.defaultPolylineOptions);
	  options.id = options.id || GeoVis.createGuid();
	  if (options.fillColor) {
	    var material = Engine.Material.fromType(Engine.Material.ColorType);
	    material.uniforms.color = options.fillColor;
	    options.material = material;
	  }
	  delete options.fillColor;
	  if (options.type === _Types2.default.SPACE_POLYLINE || options.type === _Types2.default.SPACE_POLYGON) {
	    options.followSurface = false;
	  }
	  var poly;
	  var primitives = drawHelper._primitives;
	  var groundPrimitives = drawHelper._groundPrimitives;
	  if (options.isPolygon) {
	    options.appearance = new Engine.MaterialAppearance({
	      aboveGround: false,
	      material: options.material
	    });
	    poly = new _Polygon2.default(options);
	    poly.asynchronous = false;
	    primitives.add(poly);
	  } else {
	    if (options.type === _Types2.default.GROUND_POLYLINE) {
	      poly = new _GroundPolyline2.default(options);
	      poly.asynchronous = false;
	      groundPrimitives.add(poly);
	    } else {
	      poly = new _Polyline2.default(options);
	      poly.asynchronous = false;
	      primitives.add(poly);
	    }
	  }
	  poly.setEditable();
	}
	// function unserializePolyline(options) {}
	function unserializeCircle(options, drawHelper) {
	  if (options.fillColor) {
	    var material = Engine.Material.fromType(Engine.Material.ColorType);
	    material.uniforms.color = options.fillColor;
	    options.material = material;
	  }
	  options.appearance = new Engine.MaterialAppearance({
	    aboveGround: false,
	    material: options.material
	  });
	  delete options.fillColor;
	  var circle = new _Circle2.default(_extends({}, options, {
	    asynchronous: false
	  }));
	  drawHelper._primitives.add(circle);
	  circle.setEditable();
	}
	/**
	 *
	 * @param {TextMarker} options
	 */
	function unserializeText(options, features) {
	  var position = new GeoVis.Cartesian3(options.positionx, options.positiony, options.position.z);
	  var marker = new _TextMarker2.default(position, options).addTo(features);
	  marker.align = options.align;
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
	}

	/**
	 *
	 * @param {ImageMarker} options
	 */
	function unserializeImage(options, features) {
	  var position = new GeoVis.Cartesian3(options.position.x, options.position.y, options.position.z);
	  options.filename = options.filename.search(DrawHelper.IMG_PATH) < 0 ? DrawHelper.IMG_PATH + options.filename : options.filename;
	  var marker = new _ImageMarker2.default(position, options).addTo(features);
	}

	function unserialize(data) {
	  var _this = this;

	  earth.camera.flyTo({
	    destination: new GeoVis.Cartesian3(data.viewport.x, data.viewport.y, data.viewport.z),
	    orientation: {
	      heading: data.viewport.heading,
	      pitch: data.viewport.pitch,
	      roll: data.viewport.roll
	    },
	    complete: function complete() {
	      data.entities.map(function (entity) {
	        if (!entity.type) return;
	        switch (entity.type) {
	          case _Types2.default.SPACE_POLYGON:
	          case _Types2.default.CLASSIFY_POLYGON:
	          case _Types2.default.PROJ_POLYGON:
	          case _Types2.default.GROUND_POLYGON:
	          case _Types2.default.ARROWHEAD:
	          case _Types2.default.EXTENT:
	          case _Types2.default.TAILEDATTACK:
	            unserializePolygon(entity, _this);
	            break;
	          case _Types2.default.SPACE_POLYLINE:
	          case _Types2.default.PROJ_POLYLINE:
	          case _Types2.default.GROUND_POLYLINE:
	            unserializePolygon(entity, _this);
	            break;
	          case _Types2.default.CIRCLE:
	            unserializeCircle(entity, _this);
	            break;
	          case _Types2.default.TEXT_MARKER:
	            unserializeText(entity, _this.features);
	            break;
	          case _Types2.default.IMAGE_MARKER:
	            unserializeImage(entity, _this.features);
	            break;
	        }
	      });
	      //this.fire("serialized");
	    }
	  });
	}

/***/ })
/******/ ]);
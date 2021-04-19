
import SceneManager from "./SceneManager/SceneManager";
import mapboxgl from 'mapbox-gl';
import * as utils from "../util";
import router from "../../router/index.js"
import MapboxLanguage from '@mapbox/mapbox-gl-language';
mapboxgl.accessToken =
  "pk.eyJ1IjoiZmFpbnR6eiIsImEiOiJjazg4NTgwejkwNHMzM3BxYTRhcnB5amYyIn0.wjzAeek8dLS1U4H9Wx-J9A"
function disableVueTrack(object) {
  const keys = Object.keys(object);
  object["configurable"] = false;
  keys.map(key => {
    const prop = object[key];
    if (typeof prop === "object") {
      prop["configurable"] = false
    }
  })

  Object["_getOwnPropertyDescriptor"] = Object.getOwnPropertyDescriptor;
  Object.getOwnPropertyDescriptor = function (obj, key) {
    const property = Object["_getOwnPropertyDescriptor"](obj, key);
    try {
      if (obj[key] && obj[key].configurable === false) {
        property.configurable = false;
      }
    } catch (e) {
      // debugger
    }

    return property;
  }
}

export class EarthStore {
  public state: { window: { width: number; height: number; }; pluginTree: any[]; mode: string; pluginMap: {}; onlyMap: boolean, fullScreen: boolean };
  private _earth: GeoVis.Earth;
  private _drawHelper: DrawHelper;
  private _sceneManager: SceneManager;
  _map: mapboxgl.Map;
  constructor() {
    this.state = {
      window: {
        width: 100,
        height: 100
      },
      mode: "globe3", // globe3 globe2  map 
      pluginTree: [],
      pluginMap: {},
      onlyMap: false,
      fullScreen: false,
    };
  }
  get mode() {
    return this.state.mode;
  }
  get map() {
    return this._map;
  }

  get earth() {
    return this._earth;
  }

  set earth(val) {
    this._earth = val;
  }

  get drawHelper() {
    if (!this._drawHelper) {
      this._drawHelper = new DrawHelper(this._earth, {
        server: `http://${window["sceneData"].plotServer}:8001`,
        wasm: `${window["sceneData"].plotServer}:8003`
      });
    }
    return this._drawHelper;
  }

  get sceneManager() {
    return this._sceneManager;
  }

  async init(earthRef, mapRef) {
    this._earth = window.earth = new GeoVis.Earth(earthRef, {
      /*@ts-ignore */
      skyBox: true,
      mapProjection: new GeoVis.WebMercatorProjection,
      scene: {
        scene3DOnly: false,
        orderIndependentTranslucency: false,
        contextOptions: {
          webgl: {
            alpha: true,
            antialias: true,
            preserveDrawingBuffer: true,
            failIfMajorPerformanceCaveat: false,
            depth: true,
            stencil: false,
            anialias: false
          }
        }
      },
      automaticallyTrackDataSourceClocks: false,
      dataSources: null
    });
    if (mapRef) {
      this._map = new mapboxgl.Map({
        container: mapRef,
        trackResize: true,
        attributionControl: false,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [120, 30],
      });
      // 设置语言
      const language = new MapboxLanguage({ defaultLanguage: "zh" });
      this._map.addControl(language);
      // this._map.getCanvas().style.height = "100%";
      // this._map.getCanvas().style.width = "";
    }
    this.earth.scene.postProcessStages.fxaa.enabled = true;
    GeoVis.Camera.MAX_PITCH = 0;
    this.earth = earth;
    disableVueTrack(this.earth);
    this.state.pluginTree = await fetch("./static/plugin.json").then(res => res.json());
    this.state.pluginTree.map(mainNode => {
      mainNode.items.map(plugin => {
        this.state.pluginMap[plugin.id] = plugin;
      });
    });

    this._sceneManager = new SceneManager(earth);

    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    //@ts-ignore
    const timelineNode: HTMLElement = earth.container.querySelector(".cesium-timeline-main")
    timelineNode && (timelineNode.style.display = "none")
  }

  getPuginState = id => {
    return this.state.pluginMap[id] || {};
  }
  /**
   * 
   * @param {string} id
   * @param {boolean} active
   * 开启/关闭控件,---使用控件
   */
  togglePlugin = (id, active) => {
    const item = this.state.pluginMap[id] || {};
    if (active !== undefined) {
      item.active = !!active;
    } else {
      item.active = !item.active;
    }
  };
  /**
   * 
   * @param id 
   * @param enabled
   * 控制组件是否默认显示，显示组件图标等
   */
  enablePlugin = (id, enabled) => {
    const item = this.state.pluginMap[id] || {};
    if (enabled !== undefined) {
      item.enabled = !!enabled;
    } else {
      item.enabled = !item.enabled;
    }
  }
  setMapFullScreen(bool) {
    this.state.fullScreen = bool
  }
  handleResize = () => {
    // this.state.window.width = this.earth.scene.canvas.width;
    // this.state.window.height = this.earth.scene.canvas.height;
  };
}

export const earthStore = new EarthStore();
window["earthStore"] = earthStore

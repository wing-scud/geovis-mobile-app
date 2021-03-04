
import SceneManager from "./SceneManager/SceneManager";
import * as utils from "../util";

function disableVueTrack(object){
  const keys = Object.keys(object);
  object["configurable"] = false;
  keys.map(key=>{
    const prop = object[key];
    if(typeof prop === "object"){
      prop["configurable"] = false
    }
  })

  Object["_getOwnPropertyDescriptor"]  =Object.getOwnPropertyDescriptor;
  Object.getOwnPropertyDescriptor = function(obj,key){
    const property = Object["_getOwnPropertyDescriptor"](obj, key);
    try{
      if(obj[key]&&obj[key].configurable===false){
        property.configurable = false;
      }
    }catch(e){
      // debugger
    }

    return property;
  }
}

export class EarthStore {
  public state: { window: { width: number; height: number; }; pluginTree: any[]; pluginMap: {}; };
  private _earth: GeoVis.Earth;
  private _drawHelper: DrawHelper;
  private _sceneManager: SceneManager;
  constructor() {
    this.state = {
      window: {
        width: 100,
        height: 100
      },
      pluginTree: [],
      pluginMap: {}
    };
  }

  get earth() {
    return this._earth;
  }

  set earth(val) {
    this._earth = val;
  }

  get drawHelper() {
    if (!this._drawHelper) {
      this._drawHelper = new DrawHelper(this._earth,{
        server: `http://${window["sceneData"].plotServer}:8001`,
        wasm:`${window["sceneData"].plotServer}:8003`
      });
    }
    return this._drawHelper;
  }

  get sceneManager() {
    return this._sceneManager;
  }

  async init(ref) {
    this._earth = window.earth = new GeoVis.Earth(ref, {
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
    const timelineNode: HTMLElement= earth.container.querySelector(".cesium-timeline-main")
    timelineNode&&(timelineNode.style.display = "none")
  }

  getPuginState = id =>{
    return this.state.pluginMap[id] || {};
  }
  /**
   * 
   * @param {string} id
   * @param {boolean} active
   */
  togglePlugin = (id, active) => {
    const item = this.state.pluginMap[id] || {};
    if (active !== undefined) {
      item.active = !!active;
    } else {
      item.active = !item.active;
    }
  };

  enablePlugin  = (id,enabled) => {
    const item = this.state.pluginMap[id] || {};
    if (enabled !== undefined) {
      item.enabled = !!enabled;
    } else {
      item.enabled = !item.enabled;
    }
  }


  handleResize = () => {
    this.state.window.width = this.earth.scene.canvas.width;
    this.state.window.height = this.earth.scene.canvas.height;
  };
}

export const earthStore = new EarthStore();
window["earthStore"] = earthStore

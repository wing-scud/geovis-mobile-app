import { deepCopy } from "@/geovis/util";
import AbstractModel from "./AbstractModel";
import BatchModel from './BatchMode';
import GeoJSONModel from "./GeoJSON";
import GLTFModel from "./GltfModel";
import GoogleTileModel from "./GoogleTileModel";
import RasterLayer from "./RasterLayer";
import TerrainModel from "./Terrain";
import TileModel from './TileModel';
import VectorField from './VectorField';
import Viewport from "./Viewport";
class SceneManager {
  earth: GeoVis.Earth;
  state: { tree: any[]; updateRequest: boolean };
  _modelMap: Map<string, AbstractModel>;
  _layers: any;

  constructor(earth) {
    this.earth = earth;
    this.state = {
      tree: [],
      updateRequest: false
    };
    this._modelMap = new Map();
    this.init();
  }

  get layers() {
    return this._layers;
  }

  async init() {
    // let tree;
    // try{
    //   const localData = localStorage.getItem("sceneTree");
    //   tree = JSON.parse(localData);
    // } catch(e){
    //   console.error(e);
    // }
    const tree = deepCopy(window["sceneData"].tree) ;
    
    this.state.tree = tree;
    this.state.tree.map(this.processNode);
    this.setUpdateRequest(true);
  }

  processNode = node => {
    const children = node?.children || [];
    children.map(this.processNode);
    if(this._modelMap.get(node.id)) return
    if (node.data && node.data.type) {
      let model;
      switch (node.data.type) {
        case "raster":
          model = new RasterLayer(node);
          break;
        case "viewport":
          model = new Viewport(node);
          break;
        case "model":
          model = new GLTFModel(node);
          break;
        case "vector":
          model = new GeoJSONModel(node);
          break;
        case "terrain":
          model = new TerrainModel(node);
          break;
        case "tileModel":
            model = new TileModel(node);
            break;
        case "googleTileModel":
            model = new GoogleTileModel(node);
            break;
        case "batchModel":
              model = new BatchModel(node);
              break;
        case "vectorField":
          model = new VectorField(node);
          break;
        default:
          model = new AbstractModel(node);
        // case "vector":
        //   break
        // case: "model":
        //   break;
        // case: ""
      }
      this._modelMap.set(model.id, model);
    } else{
      const model = new AbstractModel(node);
      this._modelMap.set(model.id, model);
    }
  };

  setChecked = (id, checked) => {
    const model = this._modelMap.get(id)
    model?.setChecked(checked);
    model?.state.children?.map(childNode=>{
      const childModel = this._modelMap.get(childNode.id);
      childModel.setChecked(checked);
    })
  };

  setUpdateRequest = val => {
    this.state.updateRequest = val;
  };


  removeNodeByid = (id)=>{
    const model = this._modelMap.get(id);
    model?.destroy();
    this.state.tree.map(node=>{
      node.children = node.children.filter(child=>child.id!==id)
    })
    this._modelMap.delete(id);
    this.syncTree();
  }


  resetTree = ()=>{
   
    this._modelMap.forEach(model=>model?.destroy());
    this._modelMap.clear();
    this.state.tree = deepCopy(window["sceneData"].tree);
    this.state.tree.map(this.processNode)
    this.setUpdateRequest(true);
    this.syncTree();
  } 

  syncTree = ()=>{
    localStorage.setItem("sceneTree", JSON.stringify(this.state.tree));
  }

  zoomTo = id => {
    this._modelMap.get(id)?.zoomTo();
  };
}

export default SceneManager;

import { flyToViewport, toRadians } from '@/geovis/util';
import { earthStore } from "../EarthStore";
import AbstractModel from './AbstractModel';

export default class TerrainModel extends AbstractModel {
  state: GVAPP.TreeNode;
  _terrainProvider: any;//GeoVis.GeoJSOn;
  /**
   *
   * @param {GVAPP.RasterLayerNode} node
   */
  constructor(node) {
    super(node);
    this.state = node;
    if (node.checked) {
        earthStore.earth.scene.terrainProvider = this.createTerrainProvider()
    }
  }

  setChecked(checked: boolean) {
    if (checked&&this._terrainProvider) {  
        earthStore.earth.scene.terrainProvider = this._terrainProvider
    }else if(checked&&!this._terrainProvider){
        earthStore.earth.scene.terrainProvider = this.createTerrainProvider()
    } else if (this._terrainProvider) {
      //@ts-ignore
      earthStore.earth.scene.terrainProvider = new GeoVis.EllipsoidTerrainProvider();
    };

    this.state.checked = checked;
  }

  createTerrainProvider(){
     //@ts-ignore
     if(this.state.data.layerType==="geoserver"){
      this._terrainProvider = new GeoVis["GeoserverTerrainProvider"](this.state.data)
     } else{
      this._terrainProvider = new GeoVis.CesiumTerrainProvider({
        url: this.state.data.url,
        requestVertexNormals:true
    })
     }

    return this._terrainProvider;
  }

  zoomTo() {
    if(!this._terrainProvider) return;
    if(this.state.data.viewport){
      flyToViewport(this.state.data.viewport)
    }
    // if(node.viewport){
    //   fly
    // }
  }

  destroy(){
    if(earthStore.earth.scene.terrainProvider===this._terrainProvider){
      //@ts-ignore
      earthStore.earth.scene.terrainProvider = new GeoVis.EllipsoidTerrainProvider();
    }
  }
}

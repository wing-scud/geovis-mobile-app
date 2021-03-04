import { toRadians } from '@/geovis/util';
import { earthStore } from "../EarthStore";
import AbstractModel from './AbstractModel';

export default class GeoJSONModel extends AbstractModel {
  state: GVAPP.TreeNode;
  _geojson: any;//GeoVis.GeoJSOn;
  /**
   *
   * @param {GVAPP.RasterLayerNode} node
   */
  constructor(node) {
    super(node);
    this.state = node;
    if (node.checked) {
      this.createGeoJSON();
    }
  }

  setChecked(checked: boolean) {
    if (checked&&this._geojson) {  
        this._geojson.visible = true
    }else if(checked&&!this._geojson){
        this.createGeoJSON();
    } else if (this._geojson) {
      this._geojson.visible = false
    }

    this.state.checked = checked;
  }

  createGeoJSON(){
     //@ts-ignore
    this._geojson = new GeoVis.GeoJSON(this.state.data.url,{
        style: this.state.data.style,
        batch: this.state.data.batch===undefined?true:this.state.data.batch
    }).addTo(earthStore.earth);
  }

  zoomTo() {
    if(!this._geojson) return;
    if(this.state.data.bounding&&this.state.data.bounding.rectangle){
      earthStore.earth.camera.flyTo({
          destination: GeoVis.Rectangle.fromDegrees(...this.state.data.bounding.rectangle)
      })
    }
    // if(node.viewport){
    //   fly
    // }
  }
}

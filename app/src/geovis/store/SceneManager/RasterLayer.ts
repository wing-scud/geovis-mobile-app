import { flyToViewport } from '@/geovis/util';
import { earthStore } from "../EarthStore";
import AbstractModel from './AbstractModel';

export default class RasterLayer extends AbstractModel {
  state: GVAPP.RasterLayerNode;
  _layer: GeoVis.TileLayer;
  /**
   *
   * @param {GVAPP.RasterLayerNode} node
   */
  constructor(node) {
    super(node);
    this.state = node;
    if (node.checked) {
      this.createLayer();
    }
  }

  setChecked(checked: boolean) {
    if (checked&&this._layer) {  
        this._layer.show = true
    }else if(checked&&!this._layer){
        this.createLayer();
    } else if (this._layer) {
      this._layer.show = false
    }

    this.state.checked = checked;
  }

  createLayer(){
    let url = this.state.data.layerURL;
    let customTags;
    if(!this.state.data.layerType){
      if(this.state.data.offsetZ){
        url = url.replace("{z}","{Z}");
        customTags = {
          Z:(provider,x,y,z)=>(z+this.state.data.offsetZ)
        }
      }
      this._layer = new GeoVis.TileLayer(url, {
        ...this.state.data,
        customTags
      }).addTo(earthStore.earth.layers);
    } else if(this.state.data.layerType==="wms"){
      this._layer = new GeoVis.WMSLayer(url, {
            ...this.state.data
        }).addTo(earthStore.earth.layers)
    } else if(this.state.data.layerType==="wmts"){
      this._layer = new GeoVis.WMTSLayer(url, {
        ...this.state.data
    }).addTo(earthStore.earth.layers)
    }

  }

  zoomTo() {
    if(this.state.data.viewport){
      flyToViewport(this.state.data.viewport);
    } else if(this.state.data.bounding && this.state.data.bounding.rectangle) {
      earthStore.earth.camera.flyTo({
        destination: GeoVis.Rectangle.fromDegrees(...this.state.data.bounding.rectangle)
      });
    }
  }

  destroy(){
    this._layer && this._layer.removeFrom(earthStore.earth.layers);
    this._layer = undefined;
  }
}

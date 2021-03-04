import { flyToViewport, toRadians } from '@/geovis/util';
import { earthStore } from "../EarthStore";
import AbstractModel from './AbstractModel';

export default class TileModelModel extends AbstractModel {
  state: GVAPP.TreeNode;
  _tilset: any;//GeoVis.GeoJSOn;
  /**
   *
   * @param {GVAPP.RasterLayerNode} node
   */
  constructor(node) {
    super(node);
    this.state = node;
    if (node.checked) {
      this.createTileModel();
    }
  }

  setChecked(checked: boolean) {
    if (checked&&this._tilset) {  
        this._tilset.show = true
    }else if(checked&&!this._tilset){
        this.createTileModel();
    } else if (this._tilset) {
      this._tilset.show = false
    }

    this.state.checked = checked;
  }

  createTileModel(){
     //@ts-ignore
    const tileset = this._tilset = earthStore.earth.scene.primitives.add(new GeoVis.GeoVis3DTileset({
        ...this.state.data
      }));
    this._tilset.readyPromise.then(() => {
      let offset = this.state.data.offset;
      if(!offset) return;
      const cartographic = GeoVis.Cartographic.fromCartesian(tileset.boundingSphere.center);
      const originLon = cartographic.longitude
      const originLat = cartographic.latitude
      const [offsetLon,offsetLat,offsetHeight ] = offset;
      const surface = GeoVis.Cartesian3.fromRadians(originLon, originLat, 0.0);
      offset = GeoVis.Cartesian3.fromRadians(originLon+toRadians(offsetLon), originLat+toRadians(offsetLat), offsetHeight);
      const translation = GeoVis.Cartesian3.subtract(offset, surface, new GeoVis.Cartesian3());
      tileset.modelMatrix = GeoVis.Matrix4.fromTranslation(translation);
    }).otherwise(function (error) {
      throw (error);
    });
  }

  zoomTo() {
    if(!this._tilset) return;
    if(this.state.data.viewport){
      flyToViewport(this.state.data.viewport);
    } else{
        earthStore.earth.flyTo(this._tilset);
    }
    // if(node.viewport){
    //   fly
    // }
  }

  destroy(){
    if(this._tilset){
      earthStore.earth.scene.primitives.remove(this._tilset);
      this._tilset = undefined;
    }
  }
}

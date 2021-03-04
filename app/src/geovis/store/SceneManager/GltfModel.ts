import { toRadians } from '@/geovis/util';
import { earthStore } from "../EarthStore";
import AbstractModel from './AbstractModel';

export default class GLTFModel extends AbstractModel {
  state: GVAPP.TreeNode;
  _model: GeoVis.Model;
  /**
   *
   * @param {GVAPP.RasterLayerNode} node
   */
  constructor(node) {
    super(node);
    this.state = node;
    if (node.checked) {
      this.createModel();
    }
  }

  setChecked(checked: boolean) {
    if (checked&&this._model) {  
        this._model.show = true
    }else if(checked&&!this._model){
        this.createModel();
    } else if (this._model) {
      this._model.show = false
    }

    this.state.checked = checked;
  }

  createModel(){
     //@ts-ignore
    const modelMatrix = GeoVis.Transforms.eastNorthUpToFixedFrame(GeoVis.Cartesian3.fromDegrees(...this.state.data["lonlat"]))
    this._model = GeoVis.Model.fromGltf( {
      ...this.state.data,
      modelMatrix
    }).addTo(earthStore.earth.features);
  }

  zoomTo() {
    if(!this._model) return;
    if(this.state.data.bounding&&this.state.data.bounding.sphere){
      const bounding = this.state.data.bounding;
      const {duration,sphere: radius} = bounding
      const offset = bounding.offset?new GeoVis.HeadingPitchRange(toRadians(bounding.offset.heading),toRadians(bounding.offset.pitch),bounding.offset.range):undefined;
      //@ts-ignore
      const boudingSphere = new GeoVis.BoundingSphere(GeoVis.Cartesian3.fromDegrees(...this.state.data["lonlat"]), radius)
      earthStore.earth.camera.flyToBoundingSphere(boudingSphere,{
        offset,
        duration
      });
    }
    // if(node.viewport){
    //   fly
    // }
  }
}

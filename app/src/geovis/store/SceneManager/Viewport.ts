import { flyToViewport } from '@/geovis/util';
import { earthStore } from "../EarthStore";
import AbstractModel from "./AbstractModel";

export default class Viewport extends AbstractModel {
  state: GVAPP.TreeNode;
  /**
   *
   * @param {GVAPP.RasterLayerNode} node
   */
  constructor(node) {
    super(node);
    this.state = node;

  }



  zoomTo() {
    flyToViewport(this.state.data)
  }
}

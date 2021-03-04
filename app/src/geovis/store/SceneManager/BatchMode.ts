import { flyToViewport, toRadians } from '@/geovis/util';
import { earthStore } from "../EarthStore";
import AbstractModel from './AbstractModel';

const centerLongitude = 120.87209431;
const centerLatitude = 31.322530612;
const spacing = 0.05;
const height = 50.0;
function createCollection(count,url) {
  const scene = earthStore.earth.scene;
    // scene.primitives.removeAll();
    const instances = [];
    const gridSize = Math.sqrt(count);

    for (let y = 0; y < gridSize; ++y) {
      for (let x = 0; x < gridSize; ++x) {
        const longitude = centerLongitude + spacing * (x - gridSize / 2);
        const latitude = centerLatitude + spacing * (y - gridSize / 2);
        const position = GeoVis.Cartesian3.fromDegrees(
          longitude,
          latitude,
          height
        );
        const heading = Math.random();
        const pitch = Math.random();
        const roll = Math.random();
        const scale = 100// (Math.random() + 1.0) / 2.0;

        const modelMatrix = GeoVis.Transforms.headingPitchRollToFixedFrame(
          position,
          new GeoVis.HeadingPitchRoll(heading, pitch, roll)
        );
        GeoVis.Matrix4.multiplyByUniformScale(
          modelMatrix,
          scale,
          modelMatrix
        );

        instances.push({
          modelMatrix: modelMatrix,
        });
      }
    }
    const collection = earthStore.earth.scene.primitives.add(
      new GeoVis["ModelInstanceCollection"]({
        url: url,
        instances: instances,
      })
    );
    return collection;
  }




export default class BatchModel extends AbstractModel {
  _instances: any;
  // state: GVAPP.TreeNode;
  // _instances: any;//GeoVis.Model;
  /**
   *
   * @param {GVAPP.RasterLayerNode} node
   */
  constructor(node) {
    super(node);
    this.state = node;
    if (node.checked) {
      this.createInstances();
    }
  }

  setChecked(checked) {
    if (checked&&this._instances) {  
        this._instances.show = true
    }else if(checked&&!this._instances){
        this.createInstances();
    } else if (this._instances) {
      this._instances.show = false
    }

    this.state.checked = checked;
  }

  createInstances(){
     //@ts-ignore
    const {batchSize,url} = this.state.data;
    this._instances = createCollection(batchSize, url);
  }

  zoomTo() {
    if(!this._instances) return;
    if(this.state.data.viewport){
        flyToViewport(this.state.data.viewport);
      }
    // if(node.viewport){
    //   fly
    // }
  }
}

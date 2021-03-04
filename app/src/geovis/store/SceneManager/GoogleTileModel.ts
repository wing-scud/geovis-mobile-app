/* eslint-disable */
import { flyToViewport, octant_to_latlong, toRadians } from "@/geovis/util";
import { earthStore } from "../EarthStore";
import AbstractModel from "./AbstractModel";

export default class GoogleTileModelModel extends AbstractModel {
  state: GVAPP.TreeNode;
  _tilset: any; //GeoVis.GeoJSOn;
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
    if (checked && this._tilset) {
      this._tilset.show = true;
    } else if (checked && !this._tilset) {
      this.createTileModel();
    } else if (this._tilset) {
      earthStore.earth.scene.primitives.remove(this._tilset);
      this._tilset = undefined;
    }

    this.state.checked = checked;
  }

  createTileModel() {
    let url;
    const rootPath = this.state.data["url"];

    if (rootPath.search(".json") == -1) {
      url = `${window["sceneData"].MODELSERVER_ROOT}/preview/${encodeURIComponent(rootPath)}/entry.json`;
    } else {
      url = `${window["sceneData"].MODELSERVER_ROOT}/localPreview/${decodeURIComponent(rootPath)}`;
    }

    const tileset = (this._tilset = earth.scene.primitives.add(
      //@ts-ignore
      new GeoVis.GeoVis3DTileset({
        url: url,
        maximumScreenSpaceError: 1,
        maximumNumberOfLoadedTiles: 1000,
        shadows: GeoVis.ShadowMode.DISABLED,
        // preloadWhenHidden: true,
        // preferLeaves: true,
        // skipLevelOfDetail: true,
        // baseScreenSpaceError: 1,
        // skipScreenSpaceErrorFactor: 1,
        skipLevels: 2
        // debugShowBoundingVolume: true,
      })
    ));
    tileset.readyPromise
      .then(() => {
        const cartographic = GeoVis.Cartographic.fromCartesian(tileset.boundingSphere.center);

        let lon = cartographic.longitude;
        let lat = cartographic.latitude;
        lon = (lon * 180) / Math.PI;
        lat = (lat * 180) / Math.PI;

        let offset;
        if (!tileset.extras || !tileset.extras.firstChildOct) {
          offset = GeoVis.Cartesian3.fromDegrees(lon, lat, 5000);
        } else {
          // debugger
          // eslint-disable
          const lonlat = octant_to_latlong(tileset.extras.firstChildOct);
          //@ts-ignore
          const heightOffset = GeoVis.Cartesian3.distance(GeoVis.Cartesian3.fromDegrees(...lonlat), new GeoVis.Cartesian3()) - 6371000;
          //@ts-ignore
          offset = GeoVis.Cartesian3.fromDegrees(...lonlat, heightOffset);
          GeoVis.Cartesian3.add(offset, new GeoVis.Cartesian3(...tileset.extras.deltaCenter), offset);
          // console.log(offset);
        }
        const surface = GeoVis.Cartesian3.fromDegrees(lon, lat, 0.0);
        const translation = GeoVis.Cartesian3.subtract(offset, surface, new GeoVis.Cartesian3());
        tileset.modelMatrix = GeoVis.Matrix4.fromTranslation(translation);
      })
      .otherwise(function(error) {
        throw error;
      });
      flyToViewport(this.state.data.viewport);
  }

  zoomTo() {
    if (!this._tilset) return;
    if (this.state.data.viewport) {
      try{
        flyToViewport(this.state.data.viewport);
      } catch(e){
        
      }
      
    } else {
      earthStore.earth.flyTo(this._tilset);
    }
    // if(node.viewport){
    //   fly
    // }
  }

  destroy() {
    if (this._tilset) {
      earthStore.earth.scene.primitives.remove(this._tilset);
      this._tilset = undefined;
    }
  }
}

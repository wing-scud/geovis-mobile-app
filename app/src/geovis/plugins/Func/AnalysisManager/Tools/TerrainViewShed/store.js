// import { observable, action } from "../../../../../node_modules/mobx";
/* eslint-disable */
let viewShed;
let viewShedHandler;

class ViewTool {
  // state: { heading: number; pitch: number;height:number;minHeight:number;maxHeight:number;targetPosition:number[];eyePosition:number[]  };
  constructor() {
    this.state = {
      heading: 0,
      pitch: 0,
      height: 100,
      minHeight: 0,
      maxHeight: 200,
      targetPosition: undefined,
      eyePosition: undefined
    }
  }

  setViewshedHeading(val) {
    this.state.heading = val;
    viewShed && (viewShed.heading = val)

  }
  setViewshedPitch(val) {
    this.state.pitch = val;
    viewShed && (viewShed.pitch = val)
  }

  setViewshedHeight(val){
    if(!viewShed) return;
    const carto = GeoVis.Cartographic.fromCartesian(viewShed.eyePosition);
    carto.height = val;
    const position = GeoVis.Cartographic.toCartesian(carto)
    viewShed.eyePosition = position;
  }

  startViweShed = () => {
    earth.scene.globe.depthTestAgainstTerrain = true;
    earth.scene.globe.shadows = 1;
    this.reset();
    viewShedHandler = new GeoVis.ScreenSpaceEventHandler(earth.scene.canvas);
    viewShedHandler.setInputAction(e => {
      const scene = earth.scene;
      let position = scene.pickPosition(e.position);
      if (viewShed) {
        viewShedHandler.destroy();
        viewShedHandler = undefined;
        earth.scene.globe.depthTestAgainstTerrain = false;
        // console.log('起点',this.state.startPosition)
        // console.log('终点',this.state.endPosition)
      } else {
        const carto = GeoVis.Cartographic.fromCartesian(position);
        carto.height +=30;
        position = GeoVis.Cartographic.toCartesian(carto)
        viewShed = new GeoVis.ViewShed({ scene, eyePosition: position,isRadar:true });
        this.state.height = carto.height;
        this.state.maxHeight = carto.height+200
        this.state.minHeight = carto.height-30;
        // viewShed.isRadar = true;
        this.state.eyePosition = GeoVis.Cartesian3.pack(position,[]);
        window["viewShed"] = viewShed
        
      }
      
    }, GeoVis.ScreenSpaceEventType.LEFT_CLICK);

    viewShedHandler.setInputAction(e => {
      if (!viewShed) return;
      const scene = earth.scene;
      const target = scene.pickPosition(e.endPosition);
      if (GeoVis.Cartesian3.distance(viewShed.eyePosition, target) > 1.5) {
        this.state.targetPosition = GeoVis.Cartesian3.pack(target,[]);
        viewShed.targetPosition = target;
        viewShed._targetPosition = target;
      }
      this.state.heading = viewShed.heading;
      this.state.pitch = viewShed.pitch;
    }, GeoVis.ScreenSpaceEventType.MOUSE_MOVE);
  };

  save(){
    return {
      heading: this.state.heading,
      pitch: this.state.pitch,
      eyePosition: this.state.eyePosition,
      targetPosition: this.state.targetPosition
    };
  }
  reset(data) {
    if (viewShed) {
      viewShed.destroy();
      viewShed = undefined;
      viewShedHandler ? viewShedHandler.destroy() : null;
      viewShedHandler = undefined;
    }
    if (data) {
      const obj = data
      const scene = earth.scene;
     
      const eyePosition =  GeoVis.Cartesian3.unpack(obj.eyePosition);
      const targetPosition = GeoVis.Cartesian3.unpack(obj.targetPosition);
      viewShed = new GeoVis.ViewShed({ scene, eyePosition });
      if (GeoVis.Cartesian3.distance(eyePosition, targetPosition) > 1.5) {
        viewShed.targetPosition = targetPosition;
        viewShed.heading = obj.heading;
        viewShed.pitch = obj.pitch;
      }
      this.state.heading = obj.heading;
      this.state.pitch = obj.pitch;
    }
  }

}
export const viewTool = new ViewTool();

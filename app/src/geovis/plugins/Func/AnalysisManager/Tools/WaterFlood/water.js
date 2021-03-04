import { earthStore } from "@/geovis/store";
let waterMask;
export let waterArea = [
  { x: -1210172.333457063, y: 5699480.168058559, z: 2585916.230488596 },
  { x: -1210224.877168981, y: 5699755.4919967335, z: 2585376.780440503 },
  { x: -1210868.4711504579, y: 5699576.80723946, z: 2585384.7595681427 },
  { x: -1210836.966447113, y: 5699406.24941102, z: 2585854.0218814453 }
];

const appearance = new GeoVis.EllipsoidSurfaceAppearance({
  material: new GeoVis.Material({
    fabric: {
      type: "Water",
      uniforms: {
        normalMap: "./static/data/AnalysisManager/waterNormals.jpg",
        frequency: 1000.0,
        animationSpeed: 0.01,
        amplitude: 10.0
      }
    }
  }),
  fragmentShaderSource: `varying vec3 v_positionMC;
     varying vec3 v_positionEC;
     varying vec2 v_st;
     void main(){
       czm_materialInput materialInput;
       vec3 normalEC = normalize(czm_normal3D * czm_geodeticSurfaceNormal(v_positionMC, vec3(0.0), vec3(1.0)));
      #ifdef FACE_FORWARD
      normalEC = faceforward(normalEC, vec3(0.0, 0.0, 1.0), -normalEC);
      #endif
      materialInput.s = v_st.s;
      materialInput.st = v_st;
      materialInput.str = vec3(v_st, 0.0);
      materialInput.normalEC = normalEC;
      materialInput.tangentToEyeMatrix = czm_eastNorthUpToEyeCoordinates(v_positionMC, materialInput.normalEC);
      vec3 positionToEyeEC = -v_positionEC;
      materialInput.positionToEyeEC = positionToEyeEC;
      czm_material material = czm_getMaterial(materialInput);
      #ifdef FLAT
      gl_FragColor = vec4(material.diffuse + material.emission, material.alpha);
      #else
      gl_FragColor = czm_phong(normalize(positionToEyeEC), material, czm_lightDirectionEC);
      gl_FragColor.a=0.5;
      #endif
      }
      ` //重写shader，修改水面的透明度
});
/**
 * @param {[GeoVis.Cartesian3]} positions
 */
export function updateWaterMask(positions, height, extrudedHeight) {
  waterArea = positions;
  earth.scene.primitives.remove(waterMask);
  waterMask = new GeoVis.Primitive({
    //show:false,// 默认隐藏
    asynchronous: false,
    allowPicking: false,
    geometryInstances: new GeoVis.GeometryInstance({
      geometry: new GeoVis.PolygonGeometry({
        polygonHierarchy: new GeoVis.PolygonHierarchy(positions),
        height,
        granularity: 0.01745 / 100,
        extrudedHeight
      })
    }),
    // 可以设置内置的水面shader
    appearance
  });
  waterMask = earth.scene.primitives.add(waterMask);
}

let lastTimeStamp;
const floodSpeed = 0.15;
class WaterTool {
  constructor() {
    this.state = {
      maxDepth: 100,
      minDepth: 0,
      currentDepth: 0,
      playing: false
    };
  }
  setMaxDepth(val) {
    this.state.maxDepth = val;
  }
  setMinDepth(val) {
    this.state.minDepth = val;
  }
  setCurrentDepth(val) {
    this.state.currentDepth = val;
    if (this.created) {
      // this.frameUpdate(true);
      updateWaterMask(waterArea, this.state.minDepth, val);
    }
  }

  async selectArea(val) {
    const drawHelper = earthStore.drawHelper;
    const Types = window["DrawHelper"].Types;
    drawHelper.startDrawingPolygon({
      id: Math.random() * 10,
      color: GeoVis.Color.fromCssString("#009688").withAlpha(0.3),
      callback: function(params) {
        waterArea = val;
      },
      type: Types.SPACE_POLYGON
    });
    drawHelper.once("created", e => {
      this.positions = e.entity.positions;
      waterArea = this.positions;
    });
  }

  toggleAnimate = () => {
    // this.reset();
    earthStore.drawHelper.removeAll();
    this.state.playing = !this.state.playing;
    if (this.state.playing) {
      this.created = true;
      earth.globe.depthTestAgainstTerrain = true;
      earth.scene.preRender.addEventListener(this.frameUpdate);
    } else {
      earth.scene.preRender.removeEventListener(this.frameUpdate);
    }
  };

  frameUpdate = forceUpdate => {
    const currentTimeStamp = Date.now();
    const timeDelta = lastTimeStamp ? currentTimeStamp - lastTimeStamp : 0;
    lastTimeStamp = currentTimeStamp;
    if (waterArea && this.state.playing) {
      const targetHeight = this.state.currentDepth + floodSpeed * (timeDelta / 100);
      if (targetHeight < this.state.maxDepth) {
        //$("#rangeSlider").val(targetHeight);
        // this.currentDepth = targetHeight;
        this.setCurrentDepth(targetHeight);
      }
    } else if (forceUpdate) {
      // updateWaterMask(waterArea, this.minDepth, this.currentDepth);
    }
  };

  reset = () => {
    try {
      this.state.playing = false;
      this.created = false;
      lastTimeStamp = null;
      earth.scene.preRender.removeEventListener(this.frameUpdate);
      earth.scene.primitives.remove(waterMask);
      earth.globe.depthTestAgainstTerrain = false;
      this.state.maxDepth = 100;
      this.state.minDepth = 0;
      this.state.currentDepth = 0;
      this.state.playing = false;
      earthStore.drawHelper.removeAll();
    } catch (e) {
      console.log(e);
    }
  };
}

export const waterTool = new WaterTool();

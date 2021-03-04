//eslint-ignore
const {
  Primitive,
  Material,
  Color,
  defined,
  createGuid,
  Cartesian3,
  PolygonHierarchy,
  DistanceDisplayConditionGeometryInstanceAttribute,
  MaterialAppearance,
  PerInstanceColorAppearance,
  PolylineColorAppearance,
  GeometryInstance,
  PolylineGeometry,
  PolygonOutlineGeometry,
  ColorGeometryInstanceAttribute,
  PolygonGeometry,
  DistanceDisplayCondition,
  VertexFormat,
  Scene,
  lonlatTuple,
  defaultValue,
  ClassificationType,
  ClassificationPrimitive,
  ShowGeometryInstanceAttribute,
  EllipsoidOutlineGeometry,
  EllipsoidGeometry,
  EllipsoidSurfaceAppearance,
  Transforms,
  RenderState,
  BlendingState,
  Matrix4
} = GeoVis;

const outlineVS = `
uniform float scale;
attribute vec3 position3DHigh;
attribute vec3 position3DLow;
attribute vec4 color;
attribute float batchId;
varying vec4 v_color;

void main()
{
    vec3 vertex =position3DHigh + position3DLow;
    // vertex.x *= 3.0;
    // vertex.y *= 4.0;
    // vertex.z *= 7.0;
    vec4 p = czm_computePosition();

    v_color = color;
    v_color[3] = vertex.z > 0.5 ? color[3] : 0.0;
    vertex *=scale;
    gl_Position = czm_modelViewProjection * vec4(vertex, 1.0);
}
            
`;

const geomVS = `
uniform float scale;
attribute vec3 position3DHigh;
attribute vec3 position3DLow;
attribute vec2 st;
attribute float batchId;

varying vec3 v_positionMC;
varying vec3 v_positionEC;
varying vec2 v_st;

void main()
{
vec4 p = czm_computePosition();
// vec3 vertex = position3DHigh + position3DLow;
v_positionMC = position3DHigh + position3DLow;           // position in model coordinates
v_positionMC *= scale;
v_positionEC = (czm_modelViewRelativeToEye * p).xyz;     // position in eye coordinates
v_st = st;

gl_Position = czm_modelViewProjection * vec4(v_positionMC,1.0);
}`;
function createRadarAppearance(color, speed, scale) {
  const material = new Material({
    fabric: {
      // type : 'Color',
      uniforms: {
        color,
        speed,
        scale
      },
      source: `
            uniform vec4 color;
            uniform float speed;
            czm_material czm_getMaterial(czm_materialInput materialInput)
            {
                czm_material material = czm_getDefaultMaterial(materialInput);
                vec3 str = materialInput.str;
                // material.diffuse = color.rgb;
                // material.alpha =  ? color.a : 0.0;
                if(str.t<0.5){
                    discard;
                }
                float time = czm_frameNumber * 0.01 * speed;
                float targetAngle = - fract(time) * czm_pi * 2.0 + czm_pi; 
                float offset = time;
                float size = czm_pi / 4.0;
                float angle = (str.s - 0.5) * czm_pi * 2.0;
                float delta = targetAngle - angle;
                if((czm_pi * 2.0 - delta)<size){
                  delta -= (czm_pi * 2.0);
                }
                if(false&&delta>-size && delta<0.0){
                  float ratio = delta / size + 1.0;
                  material.diffuse = color.rgb;
                  material.alpha = mix(0.3, 1.0, ratio)*color.a;
                  return material;
                } else {
                  material.diffuse = color.rgb;
                  material.alpha = 0.2*color.a;
                  return material;
                }

            }
            `
    }
  });
  const appearance = new EllipsoidSurfaceAppearance({
    material,
    faceForward: false,
    translucent: true,
    // closed: true,
    flat: true,
    vertexShaderSource: geomVS,
    renderState: RenderState.fromCache({
      // <<<<
      depthMask: false,
      blending: BlendingState.ADDITIVE_BLEND
    })
  });
  appearance["uniforms"] = {
    scale: 1.0
  };
  return appearance;
}
function createOutlineInstance(radar) {
  const outlineColor = radar._outlineColor;

  let distanceDisplayCondition;
  if (radar._distanceDisplayCondition) {
    distanceDisplayCondition = DistanceDisplayConditionGeometryInstanceAttribute.fromDistanceDisplayCondition(radar._distanceDisplayCondition);
  } else {
    distanceDisplayCondition = new DistanceDisplayConditionGeometryInstanceAttribute();
  }
  const options = {
    radii: new Cartesian3(radar._radius.x, radar._radius.y, radar._radius.z),
    stackPartitions: radar._stackPartitions,
    slicePartitions: radar._slicePartitions,
    subdivisions: radar._subdivisions
  };
  return new GeometryInstance({
    id: radar,
    geometry: new EllipsoidOutlineGeometry(options),
    attributes: {
      color: ColorGeometryInstanceAttribute.fromColor(outlineColor),
      distanceDisplayCondition
    }
  });
}

function createRadarInstance(radar) {
  let distanceDisplayCondition;

  if (radar._distanceDisplayCondition) {
    distanceDisplayCondition = DistanceDisplayConditionGeometryInstanceAttribute.fromDistanceDisplayCondition(radar._distanceDisplayCondition);
  } else {
    distanceDisplayCondition = new DistanceDisplayConditionGeometryInstanceAttribute();
  }

  const options = {
    radii: new Cartesian3(radar._radius.x, radar._radius.y, radar._radius.z),
    // stackPartitions: radar._stackPartitions,
    // slicePartitions: radar._slicePartitions,
    subdivisions: radar._subdivisions
  };
  // options.materialSupport = Engine.MaterialAppearance.MaterialSupport.BASIC.vertexFormat;
  const geometry = new EllipsoidGeometry(options);
  let instance;
  // eslint-disable-next-line prefer-const
  instance = new GeometryInstance({
    id: radar,
    geometry,
    // modelMatrix: Matrix4.fromScale(new Cartesian3(7.0, 8.0, 9.0)),
    attributes: {
      distanceDisplayCondition
    }
  });
  return instance;
}
class SimpleRadar extends GeoVis.Radar {
  constructor(position, options) {
    if (options.radius.x) {
      options.radius = new GeoVis.Cartesian3(options.radius.x, options.radius.y, options.radius.z);
    } else {
      options.radius = new GeoVis.Cartesian3(options.radius, options.radius, options.radius);
    }
    super(position, options);
    this._animate = false;
  }

  get scale() {
    return this._scale;
  }
  set scale(val) {
    this._scale = val;
    this._primitive ? (this._primitive.appearance["uniforms"].scale = val) : null;
  }

  get animate() {
    return this._animate;
  }

  set animate(val) {
    if (this._animate === val) return;
    this._animate = val;
    if (val) {
      if (!this._visible) {
        this.visible = true;
      }
      this.scale = 0.0;
      this.visible = true;
      // eslint-disable-next-line no-var
      var animateScale = () => {
        if (this.scale < 1.0) {
          this.scale += 0.01;
          requestAnimationFrame(animateScale);
        } else {
          this._animate = false;
        }
      };
      animateScale();
    }
  }

  update() {
    if (!defined(this._scene)) return;
    const primitives = this._featureGroup.primitives;
    primitives.removeAndDestroy(this._primitive);
    primitives.removeAndDestroy(this._outlinePrimitive);
    this._outlinePrimitive = undefined;

    this._primitive = undefined;

    const outlineInstances = [];
    const polygonInstances = [];

    if (!this._visible) {
      return;
    }

    const material = this._material;
    const shadows = false;
    let distanceDisplayCondition;
    if (this._distanceDisplayCondition) {
      distanceDisplayCondition = DistanceDisplayConditionGeometryInstanceAttribute.fromDistanceDisplayCondition(this._distanceDisplayCondition);
    } else {
      distanceDisplayCondition = new DistanceDisplayConditionGeometryInstanceAttribute();
    }
    let translucent;
    if (this._fill) {
      if (!this._instance) {
        this._instance = createRadarInstance(this);
      }

      translucent = this._fillColor.alpha !== 1.0 || defined(this._material);
      if (!this._appearance) {
        this._appearance = createRadarAppearance(this._fillColor, this._speed, this._scale);
      }

      this._primitive = primitives.add(
        new Primitive({
          geometryInstances: this._instance,
          appearance: this._appearance,
          asynchronous: this._async,
          modelMatrix: Transforms.eastNorthUpToFixedFrame(this._position),
          shadows
        })
      );
    }

    // if (!this._outlineInstance) {
    //     this._outlineInstance = createOutlineInstance(this);
    // }

    translucent = this._outlineColor.alpha !== 1.0;

    // if(!this._outlineAppearance){
    //     this._outlineAppearance = new PerInstanceColorAppearance({
    //         flat: true,
    //         translucent: true,
    //         renderState: RenderState.fromCache({ // <<<<
    //             depthMask: false,
    //             blending: BlendingState.ADDITIVE_BLEND,
    //         }),
    //         vertexShaderSource: outlineVS
    //     });
    //     this._outlineAppearance["uniforms"] = {
    //         scale:this._scale
    //     }
    // }

    // this._outlinePrimitive = primitives.add(
    //     new Primitive({
    //         asynchronous: this._async,
    //         geometryInstances: this._outlineInstance,
    //         appearance: this._outlineAppearance,
    //         modelMatrix: Transforms.eastNorthUpToFixedFrame(this._position)
    //     })
    // );
  }
}

export default SimpleRadar;

// "id" : "ZHS",
// "position" : [108.993380,34.269964,1232.00000],
// "type" : 1,
// "url" : "static/models/gltf/ZP.gltf",
// "image" : "static/img/entity/Red.png",
// "scale" : 1.0,
// "maximumScale" : 256,

import { computeModelMatrix, parseDate } from "./utils";
import GVEffect from "./GVEffect";
// "imageScale" : 1.0,
class GVEntity {
  constructor(options) {
    if (!options.id) throw "id 未定义";
    this.id = options.id;
    this._lonlat = options.position;
    this._position = GeoVis.Cartesian3.fromDegrees(...options.position);
    this._type = options.type;
    this._url = options.url;
    this._imageUrl = options.image;
    this._scale = options.scale;
    this._maximumScale = options.maximumScale;
    this._imageScale = options.imageScale;
    const modelMatrix = computeModelMatrix(this._position);
    this._model = GeoVis.Model.fromGltf({
      url: options.url,
      show: options.show,
      modelMatrix: modelMatrix,
      scale: options.scale || 1.0,
      minimumPixelSize: options.minimumPixelSize || 80,
      maximumScale: options.maximumScale,
      shadows: GeoVis.ShadowMode.DISABLED,
      // allowPicking: false,
      // debugShowBoundingVolume: false,
      distanceDisplayCondition: new GeoVis.DistanceDisplayCondition(0, 4e6),
      debugWireframe: false
    });
    this._label = new GeoVis.Label(this._position, {
      text: options.name || this.id,
      show: options.show,
      font: "36px 微软雅黑 ",
      style: GeoVis.LabelStyle.FILL,
      fillColor: GeoVis.Color.WHITE,
      outlineColor: GeoVis.Color.WHITE,
      outlineWidth: 2,
      scale: 0.5,
      pixelOffset: new GeoVis.Cartesian2(20, 0)
    });
    this._billboard = new GeoVis.Billboard(options.position, {
      image: options.image,
      show: options.show,
      width: 40,
      height: 40,
      distanceDisplayCondition: new GeoVis.DistanceDisplayCondition(4e6),
      scale: options.scale,
      disableDepthTestDistance: 1e6
    });
    this.readyPromise = new Promise(resolve => {
      if (options.path) {
        fetch(options.path)
          .then(res => res.json())
          .then(data => {
            const times = [],
              positions = [];
            const startTime = data.startTime ? new Date(data.startTime).getTime() : null;
            const endTime = data.endTime ? new Date(data.endTime).getTime() : null;
            const timeDelta = startTime && endTime ? (endTime - startTime) / data.path.length : 0;
            data.path.map((item, index) => {
              // startTime endTime优先
              if (startTime) {
                times.push(parseDate(startTime + timeDelta * index));
              } else {
                times.push(parseDate(item.time));
              }
              if (data.lonlatPath) {
                positions.push(GeoVis.Cartesian3.fromDegrees(...item.position));
              } else {
                positions.push(new GeoVis.Cartesian3(...item.position));
              }
            });
            this.sampledPosition = new GeoVis.SampledPositionProperty();
            this.sampledPosition.addSamples(times, positions);
            // this.sampledPosition.interpolationAlgorithm  = GeoVis.LagrangePolynomialApproximation
            this.orientationProperty = new GeoVis.VelocityOrientationProperty(this.sampledPosition);
          });
      } else {
        resolve();
      }
    });

    this.effectMap = new Map();

    this.options = options;
  }

  get visible() {
    return this._visible;
  }

  set visible(val) {
    this._model.show = val;
    this._billboard.visible = val;
    this._label.visible = val;
  }

  update(time) {
    const { Matrix4, Matrix3 } = GeoVis;
    const matrix3Scratch = new Matrix3();

    if (this.sampledPosition && time) {
      const position = this.sampledPosition.getValue(time);
      if (!position) return;
      this._position = position;
      const orientation = this.orientationProperty.getValue(time);
      // const hpr = GeoVis.HeadingPitchRoll.fromQuaternion(orientation);
      // const modelMatrix = GeoVis.Transforms.headingPitchRollToFixedFrame(position,hpr,GeoVis.Ellipsoid.WGS84,GeoVis.Transforms.eastNorthUpToFixedFrame);
      const result = Matrix4.fromRotationTranslation(Matrix3.multiply(Matrix3.fromQuaternion(orientation, matrix3Scratch), Matrix3.fromRotationZ(-Math.PI / 2), matrix3Scratch), position, new Matrix4());
      this._model.modelMatrix = result;
      this._billboard.position = position;
    }
    try {
      this.effectMap.forEach(effect => {
        effect.update();
      });
    } catch (e) {
      console.log(e);
    }
  }

  addTo(manager) {
    this.manager = manager;
    this._model.addTo(manager.features);
    this._billboard.addTo(manager.features);
    this._label.addTo(manager.features)
    setTimeout(() => {
      if (this.options.effectList) {
        this.options.effectList.map(data => {
          const effect = new GVEffect(this, data);
          this.effectMap.set(effect.id, effect);
        });
      }
      this.effectMap.forEach(effect => {
        try {
          if (effect.feature instanceof Array) {
            effect.feature.map(f => {
              f.addTo(manager.features);
            });
          } else {
            effect.feature.addTo(manager.features);
          }
        } catch (e) {
          console.log(e);
        }
      });
    }, 500);
  }

  removeFrom(manager) {
    debugger;
    this._model?.removeFrom(manager.features);
    this._billboard?.removeFrom(manager.features);
    this._label?.removeFrom(manager.features);
    this.effectMap.forEach(effect => {
      try {
        if (effect.feature instanceof Array) {
          effect.feature.map(f => {
            f.removeFrom(manager.features);
          });
        } else {
          effect.feature.removeFrom(manager.features);
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
}

export default GVEntity;

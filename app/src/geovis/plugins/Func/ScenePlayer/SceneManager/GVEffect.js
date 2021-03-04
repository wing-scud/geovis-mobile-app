/* eslint-disable */
import GVEntity from "./GVEntity";
import FireParticle from "./Particle";
import SimpleRadar from "./GVEffectRadar";
import TrackBeam from "./GVEffectBeam";
const map = {};
class GVEffect {
  /**
   *
   * @param {GVEntity} entity
   * @param {*} data
   */
  constructor(entity, data) {
    this.entity = entity;
    this.id = data.id || GeoVis.createGuid();
    this.type = data.type;
    this.data = data;
    this._visible = GeoVis.defaultValue(data.visible, false);
    map[data.type] = true;

    if (data.type === "parabolaRadar") {
      const lonlat = [121, 30, 5000]; // 圆心坐标
      const color = GeoVis.Color.fromCssColorString(data.color[0]);
      // const color =  new GeoVis.Color(110 / 255, 82 / 255, 156 / 255)
      const outlineColor = GeoVis.Color.fromCssColorString(data.color[1]);
      // @ts-ignore
      this.feature = new GeoVis.Radar(entity._position, {
        radius: new GeoVis.Cartesian3(data.parabolaRadius, data.parabolaRadius, data.parabolaHeight),
        visible: false,
        stackPartitions: 14, //纵向切分
        slicePartitions: 32, //横向切分
        fill: true,
        fillColor: color.withAlpha(0.35),
        outline: true,
        async: false,
        outlineColor: outlineColor //GeoVis.Color.multiplyByScalar(color, 1.5, new GeoVis.Color())
      });
      console.log(this.feature, "parabolaRadar");
    } else if (data.type === "scanRadar" || data.type === "ringRadar") {
      // @ts-ignore
      this.feature = new GeoVis.Circle(entity._position, {
        async: false,
        visible: false,
        radius: data.bottomRadius || data.radius,
        height: entity._lonlat[2] || 0,
        material: new GeoVis.Material({
          fabric: {
            type: "RadarScan",
            uniforms: {
              color: GeoVis.Color.fromCssString(data.scannerColor || data.color),
              speed: 0.1,
              rimWidth: 0.08
            }
          }
        }),
        fill: true
      });
    } else if (data.type === "dynnamicLineEffect") {
      const material = new GeoVis.Material({
        fabric: {
          type: "PolylineAnimate",
          uniforms: {
            color: GeoVis.Color.fromCssString(data.color).withAlpha(data.alpha),
            length: 0.2,
            speed: -0.1
          }
        }
      });
      // @ts-ignore
      this.feature = new GeoVis.Polyline(data.positions, {
        width: 4,
        visible: false,
        material,
        async: false
      });
    } else if (data.type === "connectionNetwork") {
      const material = new GeoVis.Material({
        fabric: {
          type: "DashAnimate",
          uniforms: {
            color: GeoVis.Color.fromCssString(data.color).withAlpha(data.alpha),
            length: 0.2,
            speed: -0.1
          }
        }
      });
      this.feature = [];
      data.connections.map(([fromId, targetId]) => {
        const from = entity.manager.entityMap.get(fromId);
        const to = entity.manager.entityMap.get(targetId);
        const positions = [from._position, to._position];

        this.feature.push(
          // @ts-ignore
          new GeoVis.Polyline(positions || data.positions, {
            width: data.width || 4,
            visible: false,
            material,
            async: false
          })
        );
      });
    } else if (data.type === "AimEffect") {
      const material = new GeoVis.Material({
        fabric: {
          type: "DashAnimate",
          uniforms: {
            color: GeoVis.Color.fromCssString(data.color).withAlpha(0.6),
            dashLength: 32,
            speed: 0.05
          }
        }
      });
      // @ts-ignore
      this.feature = new GeoVis.Polyline(
        [
          [121, 30],
          [121.001, 30]
        ],
        {
          width: 3,
          visible: data.visible,
          material,
          async: false
        }
      );
    } else if (data.type === "particle") {
      this.feature = new FireParticle(this);
    } else if (data.type === "circle") {
     //.addTo(earth.features);
      const material = new GeoVis.Material({
        fabric: {
          source: `
            uniform vec4 color;
            uniform float rimWidth;
            uniform float speed;
            
            float rand(vec2 co){
                return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
            }
            
            czm_material czm_getMaterial(czm_materialInput materialInput)
            {
                czm_material material = czm_getDefaultMaterial(materialInput);
                float RADIUS = 0.7071068;
                float time = czm_frameNumber * 0.05 * speed;
                float offset = time;
                float x = materialInput.st.s - 0.5;
                float y = materialInput.st.t - 0.5;
                vec2 origin = vec2(0.5, 0.5);
                float radius = distance(vec2(0.0, 0.0), vec2(x, y))/RADIUS;
                float val = fract(radius);
                material.diffuse = color.rgb;
                material.shininess = 0.9;
                // if(radius>0.5){
                //   material.alpha = val * (1.0-radius);
                // } else{
                //   material.alpha = val * radius;
                // }
                material.alpha = val * radius;
                 return material;
            }
             
            `,
          uniforms: {
            color: GeoVis.Color.fromCssColorString(data.fillColor).withAlpha(0.6),
            speed: 0.1
          }
        }
      });
      this.feature = new GeoVis.Circle(entity._position, {
        // color:,
        material,
        radius: data.radius
      })
    } else if (data.type === "SimpleRadar") {
      // @ts-ignore
      this.feature = new SimpleRadar(entity._position, {
        // radius: 1e5,
        stackPartitions: 14, //纵向切分
        slicePartitions: 32, //横向切分
        fill: true,
        outline: true,
        async: true,
        ...data,
        id: entity.id + data.id,
        // radius:1.6e5,
        fillColor: GeoVis.Color.fromCssColorString(data.fillColor).withAlpha(0.60)
      })//.addTo(earth.features);
      // SearchRadar(entity._lonlat, {
      //   radius: 2.3e5,
      //   outlineColor: GeoVis.Color.YELLOW
      // });
    } else if (data.type === "TrackBeam") {
      console.log("TrackBeam");

      let rippleMaterial = GeoVis.Material.fromType("Ripple");
      rippleMaterial.uniforms.baseColor = GeoVis.Color.fromCssColorString(data.color).withAlpha(0.1);
      rippleMaterial.uniforms.rippleColor = GeoVis.Color.fromCssColorString(data.color).withAlpha(0.1);
      rippleMaterial.uniforms.rippleWidth = 0.01;
      rippleMaterial.uniforms.rippleCount = 1;
      rippleMaterial.uniforms.speed = 0.5;

      // @ts-ignore
      this.feature = new TrackBeam(entity._position, {
        topRadius: 1, // 半径
        visible: data.visible,
        bottomRadius: data.radius, // 高度
        rotation: {
          heading: -0.158,
          pitch: 1.816,
          roll: -0.634
        },
        material: rippleMaterial,
        async: false,
        length: 1e6,
        fillColor: GeoVis.Color.fromCssString("#4AFD2A").withAlpha(0.5) // 填充颜色
      })//.addTo(earth.features);
    }

    // else if(){

    // }
  }

  get visible() {
    return this._visible;
  }

  set visible(val) {
    this._visible = val;

    this.feature.visible = val;
  }

  refresh() {
    if (!this._visible) {
      // this._
    }
  }

  update() {
    if (!this._visible) return;
    let target, distance;
    switch (this.type) {
      case "scanRadar":
      case "ringRadar":
      case "parabolaRadar":
        this.feature.center = this.entity._position;
        this.feature.position = this.entity._position;
        break;
      case "dynnamicLineEffect":
        target = this.entity.manager.entityMap.get(this.data.destID);

        this.feature.positions = [this.entity._position, target._position];
        break;
      case "AimEffect":
        target = this.entity.manager.entityMap.get(this.data.destID);
        this.feature.positions = [target._position, this.entity._position];
        distance = GeoVis.Cartesian3.distance(this.entity._position, target._position);
        this.feature.material.uniforms.color.alpha = distance < 7.5e4 ? 0.7 : 0.0;
        break;
      case "particle":
        this.feature.particleSystem ? (this.feature.particleSystem.modelMatrix = this.entity._model.modelMatrix) : null;
        break;
      case "TrackBeam":
        target = this.entity.manager.entityMap.get(this.data.destID);
        this.feature._center = this.entity._position; //[target._position,];
        this.feature._length = GeoVis.Cartesian3.distance(this.entity._position, target._position);
        this.feature.targetPosition = target._position;
    }
  }
  addTo() {}

  removeFrom() {}
}

export default GVEffect;

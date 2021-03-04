
import { SatelliteProperties } from "./SatelliteProperties";
import { CesiumTimelineHelper } from "./CesiumTimelineHelper";
import { CesiumEntityWrapper } from "./CesiumEntityWrapper";
import { DescriptionHelper } from "./DescriptionHelper"; 
//const GeoVis = window["GeoVis"];
// const baseUrl = window["baseUrl"];
export class SatelliteEntityWrapper extends CesiumEntityWrapper {
  constructor(viewer, tle, tags) {
    super(viewer);
    this.timeline = new CesiumTimelineHelper(viewer);
    this.props = new SatelliteProperties(tle, tags);
    this.time = this.viewer.clock.currentTime;
  }


  enableComponent(name) { //name表示文字标牌，轨道。。。,表示被触发后，渲染路径轨迹
    if (!this.created) {
      this.createEntities();  
    }
    if (name === "Model" && !this.isTracked) {
      return;
    }
    super.enableComponent(name); ////此处调用的是CesiumEntityWrapper中的enableComponent函数
  }

  createEntities() {
    // this.props.createSampledPosition(this.viewer.clock,(sampledPosition) => {
      this.props.createSampledPosition(this.time,(sampledPosition) => {
      for (var entity in this.entities) { //entities来源于CesiumEntityWrapper
        if (entity === "Orbit") {
          this.entities[entity].position = this.props.sampledPositionInertial;
          this.entities[entity].orientation = new GeoVis.VelocityOrientationProperty(this.props.sampledPositionInertial);
        } else if (entity === "Sensor cone") {
          this.entities[entity].position = sampledPosition;
          this.entities[entity].orientation = new GeoVis.CallbackProperty((time) => {
            const position = this.props.position(time);
            const hpr = new GeoVis.HeadingPitchRoll(0, GeoVis.Math.toRadians(180), 0);
            return GeoVis.Transforms.headingPitchRollQuaternion(position, hpr);
          }, false);
        } else {
          this.entities[entity].position = sampledPosition;
          this.entities[entity].orientation = new GeoVis.VelocityOrientationProperty(sampledPosition);
        }
      }
    });
 
    this.createDescription();

    this.entities = {};
    this.createPoint();
    this.createBillboard();
    this.createCylinder();
    //this.createBox();
    this.createLabel();
 
   if (this.props.orbit.orbitalPeriod < 60 * 12) {  //导致很多轨道加载不出来,
      this.createOrbit();
      this.createOrbitTrack();
      this.createGroundTrack();
      //this.createCone();
     }
    this.createModel();
    if (this.props.groundStationAvailable) {
      this.createGroundStationLink();
    }
    this.defaultEntity = this.entities["Point"];

    this.viewer.selectedEntityChanged.addEventListener(() => {
      if (this.isSelected && !this.isTracked) {
        this.updatePasses();
      }
    });
    this.viewer.trackedEntityChanged.addEventListener(() => {
      if (this.isTracked) {
        this.artificiallyTrack(
          () => { this.updatePasses(); },
          () => { this.timeline.clearTimeline(); }
        );
      }
    });
  }



  createDescription() {
    const description = new GeoVis.CallbackProperty((time) => {
      const cartographic = this.props.computePositionCartographicDegrees(time);
      const content = DescriptionHelper.renderDescription(time, this.props.name, cartographic, this.props.passes, false, this.props.orbit.tle);
      return content;
    }, false);
    this.description = description;
  }

  createCesiumSatelliteEntity(entityName, entityKey, entityValue) {
    this.createCesiumEntity(entityName, entityKey, entityValue, this.props.name, this.description, this.props.sampledPosition, true);
  } //this.props.name来源于 SatelliteProperties，表示卫星名称GAOFEN 1

  createPoint() {
    const point = new GeoVis.PointGraphics({
      id: GeoVis.createGuid(),
      pixelSize: 10,
      color: GeoVis.Color.WHITE,
      distanceDisplayCondition: new GeoVis.DistanceDisplayCondition(20000000.0)
    });
    this.createCesiumSatelliteEntity("Point", "point", point);
   }
  createBillboard(){
    const billboard = new GeoVis.BillboardGraphics({
      id: GeoVis.createGuid(),
      scale:0.02,
      image:"static/data/SatelliteVis/satellite/satellite.png",
      distanceDisplayCondition: new GeoVis.DistanceDisplayCondition(400000,20000000.0)
    });
    this.createCesiumSatelliteEntity("Billboard", "billboard", billboard);
  }
     

  createCylinder() {
    if (!this.cylinder) {
      var rippleMaterial = GeoVis.Material.fromType("Ripple");
      rippleMaterial.uniforms.baseColor = new GeoVis.Color(34 / 255, 165 / 255, 255 / 255).withAlpha(0.1);
      rippleMaterial.uniforms.rippleColor = new GeoVis.Color(34 / 255, 165 / 255, 255 / 255).withAlpha(0.7);
      rippleMaterial.uniforms.rippleWidth = 0.01;
      rippleMaterial.uniforms.rippleCount = 5;
      rippleMaterial.uniforms.speed = 0.5;
      // debugger
      var center = this.props.sampledPosition.getValue(this.viewer._clock._currentTime) || [120, 30, 0]; // 圆心坐标 
      var cylinder = new GeoVis.Cylinder(center, {
        id: GeoVis.createGuid(),
        topRadius: 1, // 半径
        bottomRadius: 1e5, // 高度
        material: rippleMaterial,
        async: false,
        length: 700000 / 2,
        fillColor: GeoVis.Color.fromCssString("#4AFD2A").withAlpha(0.5), // 填充颜色
      });
      this.cylinder = cylinder;
      this.createCylinderPrimitive(cylinder);
    }

    // const cylinder = new GeoVis.CylinderGraphics({
    //     length: 700000,
    //     // id: GeoVis.createGuid(),
    //     topRadius: 0,
    //     bottomRadius: 700000 / 2,
    //     material: GeoVis.Color.GREEN.withAlpha(.3),
    // })
    // this.createCesiumSatelliteEntity("Cylinder", "cylinder", cylinder);


    // var arr = [];
    // this.props.primitivePosition.map(lines => {
    //     arr.push(new GeoVis.Cartesian3(lines.x, lines.y, lines.z))
    // })
    // var cylinderInstance = new GeoVis.GeometryInstance({
    //       id: GeoVis.createGuid(),
    //     geometry: new GeoVis.CylinderGeometry({
    //         length: 700000,
    //         topRadius: 0,
    //         bottomRadius: 700000 / 2,
    //     }),
    //     attributes: {
    //         color: GeoVis.ColorGeometryInstanceAttribute.fromColor(GeoVis.Color.GREEN.withAlpha(.3))
    //     },
    //     modelMatrix:
    // });
    // var cylinderPrimitive = new GeoVis.Primitive({
    //     geometryInstances: cylinderInstance,
    //     appearance: new GeoVis.PerInstanceColorAppearance()
    // });

    //  this.createCylinderPrimitive(cylinderInstance, 'cylinder');
  }
  //no use
  createBox() {
    const size = 1000;
    const box = new GeoVis.BoxGraphics({
      id: GeoVis.createGuid(),
      dimensions: new GeoVis.Cartesian3(size, size, size),
      material: GeoVis.Color.WHITE,
    });
    this.createCesiumSatelliteEntity("Box", "box", box);
  }

  createModel() {
    // const model = new GeoVis.ModelGraphics({
    //     id: GeoVis.createGuid(),
    //     uri: "./data/models/" + this.props.name.split(" ").join("-") + ".glb",
    // });
    // this.createCesiumSatelliteEntity("三维模型", "model", model);

    const model = new GeoVis.ModelGraphics({
      id: GeoVis.createGuid(),
      scale:5.0,
      uri:"static/data/SatelliteVis/satellite/satellite.gltf",
      //color: GeoVis.Color.WHITE,
       color: GeoVis.Color.WHITE.withAlpha(1.0),
      distanceDisplayCondition: new GeoVis.DistanceDisplayCondition(0,400000.0)
    });
     this.createCesiumSatelliteEntity("三维模型", "model", model);

 
//   const entity = new GeoVis.Entity({    
//             id: GeoVis.createGuid(),
//             name:"go",
//             model:model,
//             position: new GeoVis.Cartesian3.fromDegrees(121.49591, 31.24169, 1000.0)
//         });
//         earth.entities.add(entity);
    
//     earth.camera.setView({
//         destination: new GeoVis.Cartesian3.fromDegrees(121.49591, 31.24169, 1000.0),
//         orientation: {
//             // heading: -GeoVis.Math.PI_OVER_TWO,
//             // pitch: -GeoVis.Math.PI_OVER_FOUR,
//             roll: 0.0
//         }
//     });
  }

  createLabel() {
    const label = new GeoVis.LabelGraphics({
      id: GeoVis.createGuid(),
      text: this.props.name,
      scale: 0.6,
      horizontalOrigin: GeoVis.HorizontalOrigin.LEFT,
      pixelOffset: new GeoVis.Cartesian2(15, 0),
      // distanceDisplayCondition: new GeoVis.DistanceDisplayCondition(10000, 6.0e7),
      pixelOffsetScaleByDistance: new GeoVis.NearFarScalar(1.0e1, 10, 2.0e5, 1),
    });
    this.createCesiumSatelliteEntity("文字标牌", "label", label);
  }


  createOrbit() {
    // const path = new GeoVis.PathGraphics({
    //     id: GeoVis.createGuid(),
    //     leadTime: this.props.orbit.orbitalPeriod * 60 / 2 + 5,
    //     trailTime: this.props.orbit.orbitalPeriod * 60 / 2 + 5,
    //     material: GeoVis.Color.WHITE.withAlpha(0.15),
    //     resolution: 600,
    //     width: 2,
    // });
    // this.createCesiumEntity("轨道", "path", path, this.props.name, this.description, this.props.sampledPositionInertial, true);

     var arr = [];
     this.props.primitivePosition.map(lines => {
      arr.push(new GeoVis.Cartesian3(lines.x, lines.y, lines.z));
    });
     var pathInstance = new GeoVis.GeometryInstance({
      id: GeoVis.createGuid(),
      geometry: new GeoVis.PolylineGeometry({
         positions: arr,
        width: 1.0,
        // arcType: GeoVis.ArcType.NONE,
        vertexFormat: GeoVis.PolylineColorAppearance.VERTEX_FORMAT
      }),
      attributes: {
        color: GeoVis.ColorGeometryInstanceAttribute.fromColor(GeoVis.Color.WHITE.withAlpha(0.25))
      }
    });
    this.createPathPrimitive(pathInstance, "轨道");

 

  }

  createOrbitTrack(leadTime = this.props.orbit.orbitalPeriod * 60, trailTime = 0) {
    const path = new GeoVis.PathGraphics({
      id: GeoVis.createGuid(),
      leadTime: leadTime,
      trailTime: trailTime,
      material: GeoVis.Color.GOLD.withAlpha(0.25),
      resolution: 600,
      width: 2,
    });
    this.createCesiumSatelliteEntity("预测轨道", "path", path);
  }

  createGroundTrack() {
    const polyline = new GeoVis.PolylineGraphics({
      id: GeoVis.createGuid(),
      material: GeoVis.Color.ORANGE.withAlpha(0.2),
      positions: new GeoVis.CallbackProperty((time) => {
        return this.props.groundTrack(time);
      }, false),
      followSurface: false,
      width: 10,
    });
    this.createCesiumSatelliteEntity("星下点", "polyline", polyline);
  }

  // createCone(fov = 12) {
  //   const cone = new GeoVis.Entity({
  //     position: this.props.sampledPosition,
  //     orientation: new GeoVis.CallbackProperty((time) => {
  //       const position = this.props.position(time);
  //       const hpr = new GeoVis.HeadingPitchRoll(0, GeoVis.Math.toRadians(180), 0);
  //       return GeoVis.Transforms.headingPitchRollQuaternion(position, hpr);
  //     }, false),
  //   });

  //   cone.addProperty("conicSensor");
  //   cone.conicSensor = new CesiumSensorVolumes.ConicSensorGraphics({
  //     radius: 10000000,
  //     innerHalfAngle: GeoVis.Math.toRadians(0),
  //     outerHalfAngle: GeoVis.Math.toRadians(fov),
  //     lateralSurfaceMaterial: GeoVis.Color.GOLD.withAlpha(0.15),
  //     intersectionColor: GeoVis.Color.GOLD.withAlpha(0.3),
  //     intersectionWidth: 1,
  //   });
  //   this.entities["Sensor cone"] = cone;
  // }

  createGroundStationLink() {
    const polyline = new GeoVis.PolylineGraphics({
      id: GeoVis.createGuid(),
      followSurface: false,
      material: new GeoVis.PolylineGlowMaterialProperty({
        glowPower: 0.5,
        color: GeoVis.Color.FORESTGREEN,
      }),
      positions: new GeoVis.CallbackProperty((time) => {
        const satPosition = this.props.position(time);
        const groundPosition = this.props.groundStationPosition.cartesian;
        const positions = [satPosition, groundPosition];
        return positions;
      }, false),
      show: new GeoVis.CallbackProperty((time) => {
        return this.props.passIntervals.contains(time);
      }, false),
      width: 5,
    });
    this.createCesiumSatelliteEntity("Ground station link", "polyline", polyline);
  }

  set groundStation(position) {
    // No groundstation calculation for GEO satellites
    if (this.props.orbit.orbitalPeriod > 60 * 12) {
      return;
    }

    this.props.groundStationPosition = position;
    this.props.clearPasses();
    if (this.isTracked) {
      this.timeline.clearTimeline();
    }
    if (this.isTracked || this.isSelected) {
      this.updatePasses();
    }
    if (this.created) {
      this.createGroundStationLink();
    }
  }

  updatePasses() {
    if (this.props.updatePasses(this.viewer.clock.currentTime)) {
      if (this.isTracked) {
        this.timeline.addHighlightRanges(this.props.passes);
      }
    }
  }

  update(time) {
    // debugger
    const position = this.props.sampledPosition ? this.props.sampledPosition.getValue(time) : null;
    if (!position) return;
    if (this.cylinder) {
      this.cylinder.center = position;
    }
  }
}
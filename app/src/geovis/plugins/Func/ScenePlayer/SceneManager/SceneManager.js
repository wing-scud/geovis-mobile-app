// inspire by http://www.freexgis.com/online/#/

import { parseDate, strToTime } from "./utils";
import FeatureManager from "./FeatureManager";
import { createWall } from "./StaticFeature";

function setFeatureProp(effect, key, value) {
  if (effect.feature instanceof Array) {
    effect.feature.map(f => {
      f[key] = value;
    });
  } else {
    effect.feature[key] = value;
  }
}

class SceneManager {
  /**
   *
   * @param {GeoVis.Earth} earth
   */
  constructor(earth) {
    this.earth = earth;
    this.clock = earth.clock;
    this.featureManager = new FeatureManager(earth);
    window.featureManager = this.featureManager;
    this.state = {
      play: false,
      events: [],
      start: strToTime("2020/10/10"),
      end: strToTime("2020/10/20"),
      currentEvent: undefined,
      currentTime: strToTime("2020/10/10")
    };
    this.earth.scene.preRender.addEventListener(this.update);
  }

  setTime(time) {
    this.state.currentTime = time;
    this.clock.currentTime = parseDate(time);
  }

  setEvent(event) {
    const index = this.state.events.indexOf(event);
    const nextEvent = this.state.events[index + 1];
    this.state.start = strToTime(event.currentTime);
    this.state.end = nextEvent ? strToTime(nextEvent.currentTime) : strToTime(this.data.endTime);
    this.state.currentTime = strToTime(event.currentTime);
    this.currentEvent = event;
    // this.clock.startTime = GeoVis.JulianDate.fromDate( new Date(this.state.start));
    this.clock.currentTime = GeoVis.JulianDate.fromDate(new Date(this.state.currentTime));
    // this.clock.stopTime = GeoVis.JulianDate.fromDate( new Date(this.state.end));
    this.flyTo(event);
    earth.timeline?.zoomTo(earth.clock.startTime, earth.clock.stopTime);
    if (event.method) {
      // debugger
      event.method.map(method => {
        this.execMethod(method);
      });
    }
  }
  execMethod(method) {
    if (method.command === "setEntityEffectVisible") {
      const { strEntityID, strEffectID, visible } = method.parameters;
      const entity = this.featureManager.entityMap.get(strEntityID);

      const effect = entity.effectMap.get(strEffectID);

      effect.visible = visible;
    } else if (method.command === "setTrackID") {
      const entity = this.featureManager.entityMap.get(method.parameters);
      this.trackedEntity = entity;
    } else if (method.command == "setType" && method.parameters === "freedom") {
      this.trackedEntity = undefined;
    } else if (method.command === "setEntityVisible") {
      const entity = this.featureManager.entityMap.get(method.parameters.strEntityID);
      entity.visible = method.parameters.visible;
    } else if (method.command === "setEntityEffectProp") {
      const { strEntityID, strEffectID, prop } = method.parameters;

      if (strEntityID instanceof Array) {
        strEntityID.map(id => {
          const entity = this.featureManager.entityMap.get(id);
          if (strEffectID instanceof Array) {
            strEffectID.map(eid => {
              const effect = entity.effectMap.get(eid);
              setFeatureProp(effect, prop[0], prop[1]);
              // effect.feature[] = ;
            });
          } else {
            const effect = entity.effectMap.get(strEffectID);
            setFeatureProp(effect, prop[0], prop[1]);
          }
        });
      } else {
        const entity = this.featureManager.entityMap.get(strEntityID);

        if (strEffectID instanceof Array) {
          strEffectID.map(eid => {
            const effect = entity.effectMap.get(eid);
            setFeatureProp(effect, prop[0], prop[1]);
          });
        } else {
          const effect = entity.effectMap.get(strEffectID);

          setFeatureProp(effect, prop[0], prop[1]);
        }
      }
    }
  }

  flyTo(event) {
    if (event.position) {
      this.earth.camera.flyTo({
        duration: 1,
        destination: GeoVis.Cartesian3.fromDegrees(...event.position),
        orientation: new GeoVis.HeadingPitchRoll(...event.rotation.map(val => GeoVis.Math.toRadians(val)))
      });
    } else if (event.boundingSphere) {
      const bs = new GeoVis.BoundingSphere(GeoVis.Cartesian3.fromDegrees(...event.boundingSphere.center), 30);
      let hpr = event.headingPitchRange;

      hpr = hpr ? new GeoVis.HeadingPitchRange(GeoVis.Math.toRadians(hpr[0]), GeoVis.Math.toRadians(hpr[1]), hpr[2]) : new GeoVis.HeadingPitchRange(0, -Math.PI / 2, bs.radius);
      this.earth.camera.flyToBoundingSphere(bs, {
        duration: 1,
        offset: hpr
      });
    }
  }
  loadScene(url) {
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        this.data = data;
        this.earth.clock.startTime = parseDate(data.startTime);
        this.earth.clock.stopTime = parseDate(data.endTime);
        data.sceneCommands.map(cmd => {
          this.execSceneCommand(cmd);
        });
        data.addCommands.map(cmd => {
          this.execAddCommand(cmd);
        });
        this.state.events = data.eventCommands;
        this.state.start = strToTime(data.startTime);
        this.state.end = strToTime(data.endTime);
        this.state.currentTime = strToTime(data.startTime);
      })
      .then(data => {
        return new Promise(resolve => {
          setTimeout(() => resolve(), 500);
        });
      });
  }

  execSceneCommand(cmd) {
    if (cmd.field === "FeEntitySystem") {
      this.featureManager.execCommands(cmd);
    }
  }

  execEventCommand() {}

  execAddCommand(cmd) {
    if (cmd.field === "FeWall") {
      const { positions, maximumHeights, minimumHeights, color } = cmd.parameters;
      createWall(this.featureManager.features, positions, minimumHeights, maximumHeights, GeoVis.Color.fromCssColorString(color[0]));
    }
  }

  update = () => {
    this.featureManager.update(this.clock.currentTime);
    if (this.trackedEntity) {
      const bs = new GeoVis.BoundingSphere(this.trackedEntity._position, 50);
      earth.camera.flyToBoundingSphere(bs, {
        duration: 0
      });
    }
  };
  destroy = ()=>{
    this.earth.scene.preRender.removeEventListener(this.update);
    this.featureManager.destroy();
  }
}

export default SceneManager;

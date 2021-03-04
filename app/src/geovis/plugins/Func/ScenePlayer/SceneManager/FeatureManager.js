import GVEntity from "./GVEntity";

class FeatureManager {
  constructor(earth) {
    this.features = new GeoVis.FeatureGroup().addTo(earth);
    this.entityMap = new Map();
    // this.clock =
  }

  execCommands(cmd) {
    switch (cmd.command) {
      case "loadFile":
        this.loadFile(cmd.parameters);
        break;
    }
  }

  loadFile(url) {
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.mobileList) {
          for (const item of json.mobileList) {
            const entity = this.loadEntity(item);
            this.entityMap.set(entity.id, entity);
          }
        }
      });
  }

  loadEntity(data) {
    const entity = new GVEntity(data);
    entity.addTo(this);
    return entity;
  }

  update(time) {
    this.entityMap.forEach(entity => {
      entity.update(time);
    });
  }
  destroy = ()=>{
    this.features.removeAll();
    // this.entityMap.forEach(entity=>{
    //   entity.removeFrom(this)
    // })
  }
}

export default FeatureManager;

import React, { Suspense } from "react";
import NavDrawer from "../../components/NavDrawer/NavDrawer";
import { observer } from "mobx-react";
// import { store } from "./Store";
import { appStore } from "./store";
import List from "./layers/AppList";
@observer
class AppManager extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    appStore.init();
    this.layer = new GeoVis.TileLayer(`http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}`,{
      // projection:"EPSG:4326"
    }).addTo(earth.layers)
    earth.camera.flyHome()
    
  }
  componentWillUnmount(){
    this.layer.removeFrom(earth.layers)
  }
  render() {
    const App = List[appStore.appId];
    console.log(App, appStore.appId);
    return (
      <div>
        <NavDrawer
          handleClick={appStore.toggleApp}
          itemList={appStore.list}
          // itemState={itemState}
        />
        {App ? <App /> : null}
      </div>
    );
  }
}

export default AppManager;

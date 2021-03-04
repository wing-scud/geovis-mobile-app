import * as React from "react";
import NavDrawer from "../../components/NavDrawer/NavDrawer";
import { observer } from "mobx-react";
import { modelStore } from "./Store";
// import { store } from "./Store";
// import {} from "./i"

@observer
class AppManager extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    modelStore.init()
  }
  componentWillUnmount(){
    modelStore.uninit();
  }
  render() {
    
    const { toggleModel, modelList } = modelStore;
    return (
      <NavDrawer
        handleClick={toggleModel}
        itemList={modelList}
        // itemState={itemState}
      />
    );
  }
}

export default AppManager;

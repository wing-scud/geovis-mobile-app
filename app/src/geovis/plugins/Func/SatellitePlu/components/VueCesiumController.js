import { CesiumController } from "../modules/CesiumController";

// const VueCesiumController = {
//   install(Vue) {
//     window.cc = new CesiumController();
//   }
// };
const VueCesiumController = {
  install(Vue) {
    window.cc = new CesiumController();
    return window.cc;
  }
};
export default VueCesiumController;

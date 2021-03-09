// this.position = { coords: { longitude: 120, latitude: 20, altitude: 2000, heading: 90 } };
import { Toast } from "vant";
const onDeviceReady = function() {
  const onSuccess = function(position) {
    // instance.position = position;
    Toast(position);
    console.log(position)
  };
  function onError(error) {
    Toast(error);
    console.log(error)
  }
  const watchId = navigator.geolocation.getCurrentPosition(onSuccess, onError);
  Toast(watchId);
};
document.addEventListener("deviceready", onDeviceReady, false);

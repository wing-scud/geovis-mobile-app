/* eslint-disable no-undef */
const requestPermissions = new Promise(function(resolve, reject) {
  const permissions = cordova.plugins.permissions;
  const list = [
    permissions.CAMERA,
    permissions.MICROPHONE,
    permissions.RECORD_AUDIO,
    permissions.ACCESS_FINE_LOCATION,
    permissions.ACCESS_NETWORK_STATE,
    permissions.INTERNET,
    permissions.WRITE_EXTERNAL_STORAGE
    //可以写多个权限
  ];
  permissions.requestPermissions(
    list,
    function(status) {
      resolve(status);
    },
    function() {
      reject();
    }
  );
});
export default requestPermissions;

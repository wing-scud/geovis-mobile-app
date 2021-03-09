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
//   .then(function(status) {
//     navigator.mediaDevices
//       .getUserMedia({
//         //这里这几配置
//       })
//       .then(function(msg) {
//         //这里就可以做你想做的事了
//       })
//       .catch(function(err) {
//         /* 处理error */
//         console.log(err);
//       });
//   })
//   .catch(function() {
//     //获取权限失败！！！
//     alert("permission request fail");
//   });
export default requestPermissions;

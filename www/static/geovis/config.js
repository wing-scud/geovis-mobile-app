var baseImageUrl =
  "http://geovisweb.oss-cn-shanghai.aliyuncs.com/tiles/googleimg/{z}/{x}/{y}";
var baseMapUrl = "http://mt2.google.com/vt/x={x}&y={y}&z={z}";
var darkLayerUrl = "./dark/{z}/{x}/{y}.png";
var baseTerrainUrl = "http://localhost/tiles/dem";
//https://free-{s}.tilehosting.com/data/v3/{z}/{x}/{y}.pbf.pict?key={key}";
var baseDemUrl = "http://syy.geovisweb.cn:10080/tiles/dem";
var geoserverUrl = "http://syy.geovisweb.cn:10088/geoserver/wms";
// 3dtile
var xinping3dTile =
  "http://syy.geovisweb.cn:10080/data/3dtile/guizhou/Production_1.json";
var paris3dTile =
  "http://syy.geovisweb.cn:10080/data/3dtile/Scene/Production_1.json";
var mountain3dTile =
  "http://syy.geovisweb.cn:10080/data/3dtile/mountain/Production_1/Scene/Production_1.json";
// tileserver
var openmaptilesUrl = "http://syy.geovisweb.cn:10081/data/v3/{z}/{x}/{y}.pbf";
var blueVectorLayer =
  "http://syy.geovisweb.cn:10081/styles/FiordColor/{z}/{x}/{y}@2x.png";
var brightVectorLayer =
  "http://syy.geovisweb.cn:10081/styles/Positron/{z}/{x}/{y}@2x.png";
var darkVectorLayer =
  "http://syy.geovisweb.cn:10081/styles/DarkMatter/{z}/{x}/{y}@2x.png";
var basicVectorLayer =
  "http://syy.geovisweb.cn:10081/styles/klokantech-basic/{z}/{x}/{y}@2x.png";
var osmVectorLayer =
  "http://geovisweb.oss-cn-shanghai.aliyuncs.com/tiles/googleimg/{z}/{x}/{y}";
var placeNameVectorLayer =
  "http://localhost:8082/styles/placename/{z}/{x}/{y}@2x.png";
// 截图生成缩略图

function screenShotTool() {
  setTimeout(() => {
    document.body.onkeypress = e => {
      if (e.key === "G" && e.shiftKey) {
        earth.capture(earth.container, 600).then(canvas => {
          // console.log(canvas)
          // var img = canvas.toDataURL("image/png");
          var filename = "." + location.pathname.split(".")[0] + ".png";
          fetch("/upload/screen", {
            method: "post",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              filename: filename,
              file: canvas
            })
          })
            .then(res => res.text())
            .then(text => console.log(text));
        });
      }
    };
  }, 1300);
}
window["GEOVIS_CAPTURE"] = true;
screenShotTool();

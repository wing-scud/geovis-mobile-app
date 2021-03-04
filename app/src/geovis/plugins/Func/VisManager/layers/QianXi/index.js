import { Component } from "react";
import MapVLayerProvider from "../MapVProvider/MapVLayerProvider";

var data = [];
var timeData = [];

function curive(fromPoint, endPoint, n) {
  var delLng = (endPoint.lng - fromPoint.lng) / n;
  var delLat = (endPoint.lat - fromPoint.lat) / n;

  for (var i = 0; i < n; i++) {
    var pointNLng = fromPoint.lng + delLng * i;
    var pointNLat = fromPoint.lat + delLat * i;
    timeData.push({
      geometry: {
        type: "Point",
        coordinates: [pointNLng, pointNLat]
      },
      count: 1,
      time: i
    });
  }
}

var pointsLayer;
var lineLayer;
class HeatMap extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // 构造数据
    fetch("data/AppManager/qianxi-time")
      .then(res => res.text())
      .then(rs => {
        var items = rs.split("|");
        var count = 20;
        for (var i = 0; i < items.length; i++) {
          var itemArr = items[i].split(/\n/);
          for (var k = 0; k < itemArr.length; k++) {
            if (itemArr[k]) {
              var item = itemArr[k].split(/\t/);
              if (item[0] === "起点城市" || item[0] === "迁出城市") {
                var cityBegin = item[1].trim();
              }
              if (item[0] !== "起点城市" || (item[0] !== "迁出城市" && item.length > 1)) {
                var cityCenter1 = mapv.utilCityCenter.getCenterByCityName(item[0].replace(/市|省/, ""));
                console.log(cityCenter2)
                var cityCenter2 = mapv.utilCityCenter.getCenterByCityName(cityBegin.replace(/市|省/, ""));
                if (cityCenter1) {
                  if (Math.random() > 0.7) {
                    curive(cityCenter2, cityCenter1, 50);
                  }
                  data.push({
                    geometry: {
                      type: "LineString",
                      coordinates: [[cityCenter1.lng, cityCenter1.lat], [cityCenter2.lng, cityCenter2.lat]]
                    },
                    count: 100 * Math.random()
                  });
                }
              }
            }
          }
        }

        var dataSet = new mapv.DataSet(data);
        var options = {
          strokeStyle: "rgba(55, 50, 250, 0.3)",
          globalCompositeOperation: "lighter",
          shadowColor: "rgba(55, 50, 250, 0.5)",
          methods: {
            click: function(item) {}
          },
          gradient: { 0: "rgba(55, 50, 250, 0)", 1: "rgba(55, 50, 250, 1)" },
          lineWidth: 0.2,
          draw: "intensity",
          liveReload: false //不随缩放实时更新
        };

        // var mapvLineLayer = new mapv.baiduMapLayer(map, dataSet, options);
        lineLayer = new MapVLayerProvider(earth, dataSet, options);
        options = {
          fillStyle: "rgba(255, 250, 250, 0.9)",
          size: 0.5,
          animation: {
            type: "time",
            stepsRange: {
              start: 0,
              end: 50
            },
            trails: 1,
            duration: 5
          },
          draw: "simple",
          liveReload: false //不随缩放实时更新
        };
        pointsLayer = new MapVLayerProvider(earth, new mapv.DataSet(timeData), options);
      });
    // $.ajax({
    //   url: "data/AppManager/qianxi-time",
    //   success: function(rs) {

    //     // var mapvTimeLayer = new mapv.baiduMapLayer(map, dataSet, options);
    //   }
    // });
  }
  componentWillUnmount() {
    if (lineLayer) {
      lineLayer.destroy();
      pointsLayer.destroy();
      lineLayer = undefined;
      pointsLayer = undefined;
    }
  }
  render() {
    return null;
  }
}

export default HeatMap;

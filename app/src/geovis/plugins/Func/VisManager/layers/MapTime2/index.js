import { Component } from "react";
import MapVLayerProvider from "../MapVProvider/MapVLayerProvider";

var layer;
class MapTime2 extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    earth.camera.setView({
      //earth.camera.positionCartographic.latitude * 180/Math.PI
      destination: GeoVis.Cartesian3.fromDegrees(106, 27.559967765046867, 9999301.354056511)
    });
    var dataArray = [];

    fetch("./data/AppManager/china-point.json")
      .then(
        res => res.json(),
        err => {
          console.log(err);
        }
      )
      .then(
        data => {
          for (var i = 0; i < data[0].length; i++) {
            var geoCoord = data[0][i].geoCoord;
            dataArray.push({
              geometry: {
                type: "Point",
                coordinates: geoCoord
              },
              time: Math.random() * 10
            });
          }

          var dataSet = new mapv.DataSet(dataArray);
          var options = {
            fillStyle: "rgba(255, 250, 50, 0.6)",
            //shadowColor: 'rgba(255, 250, 50, 0.5)',
            //shadowBlur: 3,
            updateCallback: function(time) {
              time = time.toFixed(2);
              $("#time").html("时间" + time);
            },
            size: 3,
            draw: "simple",
            animation: {
              type: "time",
              stepsRange: {
                start: 0,
                end: 10
              },
              trails: 1,
              duration: 6
            }
          };
          layer = new MapVLayerProvider(earth, dataSet, options);
        },
        err1 => {
          console.log(err1);
        }
      );
  }
  componentWillUnmount() {
    if (layer) {
      layer.destroy();
    }
  }
  render() {
    return null;
  }
}

export default MapTime2;

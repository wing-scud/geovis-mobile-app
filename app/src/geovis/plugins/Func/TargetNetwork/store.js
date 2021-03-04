// @ts-check

// @ts-ignore
import { data, images } from "./data";
import $ from "../../../common/lib/jquery";
// import stores from "../../../stores";
const TweenLite = window["TweenLite"];
class Store {
  // /** @type {LayerItem[]} */
  appList = [];
  showMenu = false;
  buttonPos = [0, 0];
  constructor() {
    this._ajaxData = [];
    this._flag = true;
    this._timer = undefined;

    // new GeoVis.FeatureGroup().addTo(earth);
  }

  handleRightClick = e => {
    // @ts-ignore
    const pickObj = earth.scene.pick(e.windowPosition);
    if (pickObj && pickObj.id.search("SLN") > -1) {

      this.socket.send(pickObj.id.slice(1))
    } else {
      this.showMenu = false;
    }
    if (pickObj && pickObj.id.search("SLN0000") > -1) {
      this.showMenu = true;
      this.buttonPos = e.windowPosition;
      console.log("in~~");
    } else {
      this.showMenu = false;
    }
  };
  init(data) {
    // @ts-ignore
    this.features = earth.features;
    this.socket = new WebSocket(data.server);
    this.ajaxData();
    // @ts-ignore
    earth.camera.flyTo({
      duration: 1.5,
      // @ts-ignore
      destination: GeoVis.Cartesian3.fromDegrees(110.33, -5.614, 2.3e6),
      // @ts-ignore
      orientation: new GeoVis.HeadingPitchRoll(0, GeoVis.Math.toRadians(-50), 0)
    });
    this.socket.onmessage = this.handleMessage;
    // @ts-ignore
    earth.on("click", this.handleRightClick);
    // @ts-ignore
    earth.on("click", () => (this.showMenu = false));
  }
  handleMessage = ({data}) => {
    data = JSON.parse(data);
    if (data.type !== "toLeftNetwork") return;
    const that = this;
    // @ts-ignore
    const billboard = earth.features.get("b" + data.name);
    // @ts-ignore
    const label = earth.features.get("l" + data.name);
    that._flag = true;
    clearInterval(that._timer);
    that.planeLabels.map(item => {
      // @ts-ignore
      item._fillColor = GeoVis.Color.fromCssString("#ffffff");
      item.update();
    });
    that.satelliteLabels.map(item => {
      // @ts-ignore
      item._fillColor = GeoVis.Color.fromCssString("#ffffff");
      item.update();
    });
    that.radarLabels.map(item => {
      // @ts-ignore
      item._fillColor = GeoVis.Color.fromCssString("#ffffff");
      item.update();
    });
    // console.log(that.planeLabels);
    // @ts-ignore
    const label2 = earth.features.get("l" + data.name);
    // @ts-ignore
    label2._fillColor = GeoVis.Color.fromCssString("#ff5757");
    label2.update();
    // console.log(billboard, label);
    // @ts-ignore
    const lonlat = billboard.lonlat;
    // @ts-ignore
    const bounding = new GeoVis.BoundingSphere(billboard.position, 1e6);
    // @ts-ignore
    earth.camera.flyToBoundingSphere(bounding, {
      duration: 1
    });
    // @ts-ignore
    const netWorkData = that._ajaxData.Point.filter(item => item.pointid == data.name);
    // new GeoVis.Billboard([netWorkData[0].lng,[netWorkData[0].lat,[netWorkData[0].Gsd], {
    //   image: data.image,
    //   width: 40,
    //   height: 40,
    //   scale,
    //   color: GeoVis.Color.RED,
    //   disableDepthTestDistance: 4e6
    // }).addTo(this.features);
    // this.createBillboard2([netWorkData[0].Lng, netWorkData[0].Lat, netWorkData[0].Gsd], "rightScreen/NetworkTopology/images/" + data.type + ".png", 0.7);
    // console.log("整理的数据", netWorkData);
    // console.log("右屏的数据", data);
    // console.log([netWorkData[0].Lng, netWorkData[0].Lat, netWorkData[0].Gsd]);
  };

  ajaxData = () => {
    let DATA;
    const that = this;
    //通过jsonp方式请求数据

    // @ts-ignore
    $.ajax({
      type: "GET",
      async: "false",
      dataType: "jsonp",
      contentType: "application/json",
      jsonpCallback: "jsonpCallback",
      url: "./static/data/Network/rightScreen/NetworkTopology/js/lib/data.js",
      success: function(data) {
        that.loadPoints(data);
        that.loadLines(data);
        that.inithit();
        that._ajaxData = data;
        // console.log("xx", that._ajaxData);
        DATA = data;
      },
      error: function(e) {
        console.log(e);
      }
    });
    return DATA;
  };

  createBillboard = (lonlat, url, scale = 1, id) => {
    // @ts-ignore
    const img = new GeoVis.Billboard(lonlat, {
      image: url,
      width: 40,
      height: 40,
      scale,
      id
      // color: GeoVis.Color.RED,
      // disableDepthTestDistance: 4e6
    }).addTo(this.features);
    // console.log(img);
    return img;
  };

  createLabel = (lonlat, index, text, scale, id) => {
    // @ts-ignore
    const label = new GeoVis.Label(lonlat, {
      id,
      text: text + index,
      font: "24px 微软雅黑",
      scale,
      // @ts-ignore
      pixelOffset: new GeoVis.Cartesian2(20, 10),
      disableDepthTestDistance: 4e6
    }).addTo(this.features);
    // console.log(label);
    return label;
  };

  loadPoints = data => {
    // console.log(data);
    const satelliteData = data.Point.filter(item => item.name === "卫星");
    const radarData = data.Point.filter(item => item.name === "雷达站" || item.name === "主站");
    const planeData = data.Point.filter(item => item.name === "战斗机");
    this.satelliteImgs = satelliteData.map(lonlat => {
      return this.createBillboard([lonlat.Lng, lonlat.Lat, lonlat.Gsd], "./static/data/Network/rightScreen/NetworkTopology/images/" + lonlat.typeA + lonlat.typeB + lonlat.typeC + ".png", 1.2, "b" + lonlat.pointid);
    });
    // console.log("sate",this.satelliteImgs)
    this.satelliteLabels = satelliteData.map(lonlat => {
      return this.createLabel([lonlat.Lng, lonlat.Lat, lonlat.Gsd], 1, "卫星", 1, "l" + lonlat.pointid);
    });
    console.log("卫星label", this.satelliteLabels);
    this.radarImgs = radarData.map(lonlat => {
      return this.createBillboard([lonlat.Lng, lonlat.Lat, lonlat.Gsd], "./static/data/Network/rightScreen/NetworkTopology/images/" + lonlat.typeA + lonlat.typeB + lonlat.typeC + ".png", 0.7, "b" + lonlat.pointid);
    });
    // console.log("sate", this.radarImgs);
    this.radarLabels = radarData.map((lonlat, i) => {
      return this.createLabel([lonlat.Lng, lonlat.Lat, lonlat.Gsd], i, lonlat.name, 0.8, "l" + lonlat.pointid);
    });
    this.planeImgs = planeData.map(lonlat => {
      return this.createBillboard([lonlat.Lng, lonlat.Lat, lonlat.Gsd], "./static/data/Network/rightScreen/NetworkTopology/images/" + lonlat.typeA + lonlat.typeB + lonlat.typeC + ".png", 0.7, "b" + lonlat.pointid);
    });

    this.planeLabels = planeData.map((lonlat, i) => {
      return this.createLabel([lonlat.Lng, lonlat.Lat, lonlat.Gsd], i, lonlat.name, 1, "l" + lonlat.pointid);
    });
    // console.log(this.satelliteLabels);
    // console.log(this.radarImgs);
    // console.log(this.planeImgs);
    // this.radarImgs = data.points.radar.lonlats.map(lonlat => this.createBillboard(lonlat, images.radar, 0.7));
    // this.radarLabels = data.points.radar.lonlats.map((lonlat, i) => this.createLabel(lonlat, i, data.points.radar.names[i], 0.8));
    // this.satelliteImgs = data.points.satellite.lonlats.map(lonlat => this.createBillboard(lonlat, images.satellite, 1.2));
    // this.satelliteLabels = data.points.satellite.lonlats.map((lonlat, i) => this.createLabel(lonlat, i, "卫星"));
    // this.planeImgs = data.points.plane.lonlats.map(lonlat => this.createBillboard(lonlat, images.plane));
    // this.planeLabels = data.points.plane.lonlats.map((lonlat, i) => this.createLabel(lonlat, i, data.points.plane.names[i]));
  };

  loadLines = data => {
    // @ts-ignore
    const startLonlat = this.satelliteImgs[0].lonlat;
    this.dashLines = data.Line.map(b => {
      if (!b) {
        console.log("the radar polyline is empty");
      } else {
        const start = [];
        const end = [];
        start.push(b.startLng);
        start.push(b.startLat);
        start.push(b.startGsd);
        end.push(b.endLng);
        end.push(b.endLat);
        end.push(b.endGsd);
        const lonlats = [start, end];
        // @ts-ignore
        const material = new GeoVis.Material({
          fabric: {
            type: "PolylineDash",
            uniforms: {
              // @ts-ignore
              color: GeoVis.Color.fromCssString("#08A8FD"),
              dashLength: 24
            }
          }
        });
        // @ts-ignore
        const polyline = new GeoVis.Polyline(lonlats, {
          material,
          followSurface: false,
          width: 2
        }).addTo(this.features);
        return polyline;
      }
    });

    this.connectLines = this.planeImgs.map((b, i) => {
      if (!b) {
        console.log("the plane polyline is empty");
      } else {
        const target = this.radarImgs[5 - i];
        // console.log(this.radarImgs);
        // @ts-ignore
        const material = new GeoVis.Material({
          fabric: {
            type: "PolylineFlying",
            uniforms: {
              // @ts-ignore
              color: new GeoVis.Color(1.0, 1.0, 0.0, 1.0).withAlpha(0.5),
              length: 0.2,
              speed: 0.2
            }
          }
        });
        const lonlats = [target.lonlat, b.lonlat];
        //@ts-ignore
        const polyline = new GeoVis.Polyline(lonlats, {
          material,
          followSurface: false,
          width: 2
        }).addTo(this.features);
        return polyline;
      }
    });
  };

  inithit = () => {
    window.onkeypress = e => {
      if (e.keyCode === 103) {
        this.loadhit();
      }
    };
  };

  loadhit = () => {
    const lines = this.dashLines;
    let randomLines = [];
    lines.map(item => {
      // @ts-ignore
      item._material.uniforms.color = GeoVis.Color.fromCssString("#08A8FD");
    });
    randomLines = [];
    let num = 0;
    for (let i = 0; i < Math.floor(Math.random() * lines.length + 3); i++) {
      randomLines.push(lines[i]);
    }
    const timer = setInterval(function() {
      randomLines.map(item => {
        const obj = {
          alpha: 0
        };
        TweenLite.to(obj, 0.3, {
          alpha: 1,
          ease: TweenLite.easeInOut,
          onUpdate: function() {
            if (num > 2) {
              // @ts-ignore
              item._material.uniforms.color = new GeoVis.Color(192 / 255, 192 / 255, 192 / 255, 1.0).withAlpha(0.5);
            } else {
              item._material.uniforms.color.alpha = obj.alpha;
            }
          }
        });
      });
      num++;
      if (num > 2) {
        clearInterval(timer);
      }
    }, 300);
  };

  uninit() {
    // @ts-ignore
    this.radarImgs.map(item => item.removeFrom(earth.features));
    // @ts-ignore
    this.radarLabels.map(item => item.removeFrom(earth.features));
    // @ts-ignore
    this.satelliteImgs.map(item => item.removeFrom(earth.features));
    // @ts-ignore
    this.satelliteLabels.map(item => item.removeFrom(earth.features));
    // @ts-ignore
    this.planeImgs.map(item => item.removeFrom(earth.features));
    // @ts-ignore
    this.planeLabels.map(item => item.removeFrom(earth.features));
    // @ts-ignore
    this.dashLines.map(item => item.removeFrom(earth.features));
    // @ts-ignore
    this.connectLines.map(item => item.removeFrom(earth.features));
    window.onkeypress = null;
    this.socket.close();
    // @ts-ignore
    earth.off("click", this.handleRightClick);
    // window.removeEventListener("keydown",function(e){})
  }
}

export const netStore = new Store();

// const PhotoSphereViewer = window["PhotoSphereViewer"];
const PANOLENS = window["PANOLENS"];
// import PANOLENS from "panolens";
class StreetViewManager {
  constructor(earth, data, container) {
    this._earth = earth;
    this._points = new Map();
    this._boundary = undefined;
    this._data = this._initData(data);
    this._container = container;
    this._initListener();
    this._psv = undefined;
    this._current = undefined;
    this.state={
      screenShow:false
    };
  }
  get earth() {
    return this._earth;
  }
  displayBoundary(center, radius) {
    if (this._boundary) {
      this._boundary.show = !this._boundary.show;
    } else {
      const circle = new GeoVis.Circle(center, {
        radius,
        fill: true,
        fillColor: GeoVis.Color.RED.withAlpha(0.5)
      }).addTo(this._earth.features);
      this._boundary = circle;
    }
  }
  displayCoors(value) {
    const earth = this._earth;
    if (typeof value === "undefined") {
      const positions = [];
      this._data.forEach((value, key) => {
        const id = key;
        const point = new GeoVis.Point(value.lonlat, {
          pixelSize: 8,
          id: id,
          color: GeoVis.Color.WHITE
        }).addTo(earth.features);
        positions.push(GeoVis.Cartesian3.fromDegrees(value.lonlat[0], value.lonlat[1]));
        this._points.set(id, point);
      });
      const bs = GeoVis.BoundingSphere.fromPoints(positions);
      earth.camera.flyToBoundingSphere(bs, {
        offset: new GeoVis.HeadingPitchRoll(0, -Math.PI / 2, 10000)
      });
      this.displayBoundary(bs.center, bs.radius);
    } else {
      this._points.forEach(point => {
        point.show = value;
      });
    }
  }
  _initData(data) {
    const map = new Map();
    data.map(item => {
      map.set(item.panoid, {
        lonlat: item.lonlat,
        url: item.url
      });
    });
    return map;
  }
  _initListener() {
    const instance = this;
    const container = this._container;
    this._earth.on("click", function(e) {
      instance.state.screenShow =true;
      if (e.pickedObj && instance._points.get(e.pickedObj.id)) {
        const point = instance._points.get(e.pickedObj.id);
        if (instance._current === e.pickedObj.id && instance._psv) {
          //
          point.color = GeoVis.Color.WHITE;
        } else {
          point.color = GeoVis.Color.GREEN;
          const panorama = new PANOLENS.ImagePanorama(instance._data.get(e.pickedObj.id).url);
          const viewer = new PANOLENS.Viewer({ container:container,controlBar:false });
          const widget = new PANOLENS.Widget(container);
          const fullScreen = widget.createFullscreenButton();
          fullScreen.className="fullScreen"
          container.appendChild(fullScreen);
          viewer.add(panorama);
          // const PSV = new PhotoSphereViewer({
          //   panorama: instance._data.get(e.pickedObj.id).url,
          //   container: container,
          //   // eslint-disable-next-line @typescript-eslint/camelcase
          //   time_anim: 3000,
          //   navbar: true,
          //   // eslint-disable-next-line @typescript-eslint/camelcase
          //   navbar_style: {
          //     backgroundColor: "rgba(58, 67, 77, 0.7)"
          //   }
          // });
          // instance._psv = PSV;
          let last;
          instance._current && ((last = instance._points.get(instance._current)), (last.color = GeoVis.Color.WHITE));
          instance._current = e.pickedObj.id;
        }
      }
    });
  }
  destory() {
    this._points.forEach((point, id) => {
      point.removeFrom(this._earth.features);
      this._points.delete(id);
    });
    this._boundary.removeFrom(this._earth.features);
    this._earth.off("click");
    this._earth = undefined;
    this._data = undefined;
    this._container = undefined;
    this._psv = undefined;
    this._current = undefined;
  }
}
export default StreetViewManager;

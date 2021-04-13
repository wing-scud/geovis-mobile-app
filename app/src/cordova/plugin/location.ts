
import { Toast } from 'vant';
import { earthStore } from "@/geovis/store";
class LocationWatch {
    private watchId: any;
    private _position: {};
    private _locking: boolean;
    private _geolocation: any;
    public get geolocation(): any {
        return this._geolocation;
    }
    public set geolocation(value: any) {
        this._geolocation = value;
    }

    public get locking(): boolean {
        return this._locking;
    }
    public set locking(value: boolean) {
        this._locking = value;
        if (value) {
            this.watchSelfLocation()
        } else {
            this.clearSelfLocationWatch()
        }
    }
    public get position(): {} {
        return this._position;
    }
    public set position(value: {}) {
        this._position = value;
        if (this._locking) {
            this.flyTo(this._position)
        }
    }
    constructor() {
        document.addEventListener('deviceReady', () => {
            this._geolocation = navigator['geolocation'];
        })
        this._locking = false;
    }
    flyTo(position) {
        const modes = ["globe3", "globe2", "map"];
        const index = modes.indexOf(earthStore.mode);
        const mode = index < 2 ? "globe" : "map";
        const earth = earthStore.earth;
        const map = earthStore._map;
        //@ts-ignore
        if (position && position.coords) {
            const coords = position.coords;
            const heading = coords.heading ? GeoVis.Math.toRadians(coords.heading) : 0;
            if (mode === "globe") {
                earth.camera.flyTo({
                    //高度太低，会穿透地球
                    destination: GeoVis.Cartesian3.fromDegrees(coords.longitude, coords.latitude, coords.altitude > 200 ? coords.altitude : 200),
                    orientation: {
                        heading: heading,
                        pitch: GeoVis.Math.toRadians(-90),
                        roll: 0
                    }
                })
            } else {
                map.setCenter([position.coords.longitude, position.coords.latitude]);
                map.setZoom(16);
            }

        } else {
            Toast("位置获取失败")
        }
    }
    clearSelfLocationWatch() {
        if (this.watchId) {
            Toast('关闭定位');
            this._geolocation.clearWatch(this.watchId);
            this.watchId = undefined;
        }
    }
    watchSelfLocation() {
        const instance = this;
        const onSuccess = function (position) {
            instance.position = position;
            Toast('开启    定位');
            // Toast(position);
        };
        function onError(error) {
            Toast(error);
        }
        const watchId = this._geolocation.watchPosition(onSuccess, onError, { timeout: 3000, enableHighAccuracy: true });
        // const watchId = this._geolocation.getCurrentPosition(onSuccess, onError, { timeout: 3000, enableHighAccuracy: true });
        instance.watchId = watchId;
    }
    getCurrentPosition() {
        const instance = this;
        return new Promise((resolve, reject) => {
            const onSuccess = function (position) {
                instance._position = position;
                Toast('获取位置');
                resolve(position)
            };
            function onError(error) {
                Toast(error);
                reject(error)
            }
            this._geolocation.getCurrentPosition(onSuccess, onError, { timeout: 3000, enableHighAccuracy: true });
        })
    }
}

export const mapLocation = new LocationWatch();
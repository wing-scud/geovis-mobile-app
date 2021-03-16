
import { Toast } from 'vant';
class LocationWatch {
    private earth: any;
    private watchId: any;
    private _position: {};
    private _locking: boolean;
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
    constructor(earth: any) {
        this.earth = earth;
        this._locking = false
    }
    flyTo(position) {
        const earth = this.earth;
        //@ts-ignore
        if (position && position.coords) {             //@ts-ignore
            const coords = position.coords;
            const heading = coords.heading ? GeoVis.Math.toRadians(coords.heading) : 0
            earth.camera.flyTo({
                destination: GeoVis.Cartesian3.fromDegrees(coords.longitude, coords.latitude, coords.altitude),
                orientation: {
                    heading: heading,
                    pitch: GeoVis.Math.toRadians(-90),
                    roll: 0
                }
            })
        }else{
            Toast("位置获取失败")
        }
    }
    clearSelfLocationWatch() {
        if (this.watchId) {
            Toast('close');
            navigator.geolocation.clearWatch(this.watchId);
            this.watchId = undefined;
        }
    }
    watchSelfLocation() {
        const instance = this;
        // this.position={coords:{longitude:120,latitude:20,altitude:2000,heading:90}}
        const onSuccess = function (position) {
            instance.position = position;
            console.log(position)
            // Toast(position);
        };
        function onError(error) {
            Toast(error);
        }
        const watchId = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 3000, enableHighAccuracy: true });
        // const watchId = navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 3000, enableHighAccuracy: true });
        instance.watchId = watchId;
    }

}
export default LocationWatch;

import { Toast } from 'vant';
class Store {
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
            earth.camera.flyTo({
                destination: GeoVis.Cartesian3.fromDegrees(coords.longitude, coords.latitude, coords.altitude),
                orientation: {
                    heading: GeoVis.Math.toRadians(coords.heading),
                    pitch: 0,
                    roll: 0
                }
            })
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
        Toast('watch');
        // this.position={coords:{longitude:120,latitude:20,altitude:2000,heading:90}}
        // const onDeviceReady = function () {
        //     const onSuccess = function (position) {
        //         instance.position = position;
        //         Toast(position);
        //     };
        //     function onError(error) {
        //         Toast(error);
        //     }
        //     const watchId = navigator.geolocation.getCurrentPosition(onSuccess, onError);
        //     instance.watchId = watchId;
        // }
        // document.addEventListener("deviceready", onDeviceReady, false);
    }
}

export default Store;
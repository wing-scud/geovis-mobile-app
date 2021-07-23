
import { Toast } from 'vant';
import { earthStore } from "@/geovis/store";

class LocationPlugin {
    private _geolocation: any;
    public get geolocation(): any {
        return this._geolocation;
    }
    public set geolocation(value: any) {
        this._geolocation = value;
    }
    constructor() {
        this._geolocation = navigator['geolocation'];
    }
    clearWatchLocation(watchId) {
        this._geolocation.clearWatch(watchId);
    }
    watchLocation(callback?) {
        const onSuccess = function (position) {
            console.log(position);
            callback(position)
            Toast('持续定位');
        };
        function onError(error) {
            Toast(error);
        }
        const watchId = this._geolocation.watchPosition(onSuccess, onError, { timeout: 3000, enableHighAccuracy: true });
        return watchId
    }
    // getCurrentPosition() {
    //     return new Promise((resolve, reject) => {
    //         const onSuccess = function (position) {
    //             // Toast('获取位置');
    //             resolve(position)
    //         };
    //         function onError(error) {
    //             Toast(error);
    //             reject(error)
    //         }
    //         this._geolocation.getCurrentPosition(onSuccess, onError, { timeout: 3000, enableHighAccuracy: true });
    //     })
    // }
    getCurrentPosition() {
        const turf = window['turf']
        const speed = 0.010;
        let time = 0;
        const point = turf.point([-75.343, 39.984]);
        const getLngLat = () => {
            const distance = speed * time;
            const bearing = 90;
            const options = { units: 'kilometers' };
            const destination = turf.destination(point, distance, bearing, options);
            let lngLat = turf.getCoord(destination);
            lngLat = [Number(lngLat[0].toFixed(5)), Number(lngLat[1].toFixed(5))]
            time++;
            return lngLat;
        }
        const lngLat = getLngLat()
        const position = {
            coords: {
                longitude: lngLat[0],
                latitude: lngLat[1],
                altitude: 2000,
            }
        }
        return position
    }
    testWatchPosition(callback?) {
        const lnglats = [[116.395204, 39.917402], [116.395204, 39.917402],
        [116.395204, 39.917402], [116.395204, 39.917402], [116.395204, 39.917402],
        [116.395376, 39.913848], [116.396726, 39.913772]
            , [116.396213, 39.92208]
            , [116.385451, 39.921683], [116.385451, 39.921683], [116.385451, 39.921683], [116.385451, 39.921683]
            , [116.383155, 39.920895], [116.383155, 39.920895], [116.383155, 39.920895], [116.383155, 39.920895]
            , [116.371116, 39.921145]
            , [116.371044, 39.922753], [116.371044, 39.922753], [116.371044, 39.922753], [116.371044, 39.922753]
            , [116.350768, 39.922358]
            , [116.350048, 39.925205]
            , [116.349322, 39.940679], [116.349322, 39.940679], [116.349322, 39.940679], [116.349322, 39.940679]
            , [116.350059, 39.942784]
            , [116.350146, 39.947685], [116.350146, 39.947685], [116.350146, 39.947685], [116.350146, 39.947685]
            , [116.349134, 39.951833]
            , [116.348442, 39.966967]
            , [116.349796, 39.966786]
            , [116.315175, 39.965858]
            , [116.311109, 39.976171], [116.311109, 39.976171], [116.311109, 39.976171], [116.311109, 39.976171]
            , [116.309828, 39.990832]
            , [116.306388, 39.990665]
            , [116.306009, 39.99178]
            , [116.303934, 39.991758]]
        let heading = GeoVis.Math.toRadians(90);
        let index = 0;
        let position = {
            coords: {
                longitude: null,
                latitude: null,
                altitude: null,
                heading: null
            }
        };
        const interval = setInterval(() => {
            if (index > lnglats.length - 1) {
                index = 0
            }
            heading -= Math.PI / lnglats.length;
            const lnglat = lnglats[index];
            //@ts-ignore
            if (lnglat[0] !== position.coords.longitude && lnglat[1] !== position.coords.latitude) {
                position = {
                    coords: {
                        longitude: lnglat[0],
                        latitude: lnglat[1],
                        altitude: 2000,
                        heading: heading
                    }
                }
                callback(position);
            }
            index++;
        }, 1500)
        return interval
    }
}
const mapLocation = new LocationPlugin();
export default mapLocation;

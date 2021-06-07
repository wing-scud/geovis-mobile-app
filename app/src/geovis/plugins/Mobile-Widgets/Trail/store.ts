
const turf = window['turf']
import { earthStore } from "@/geovis/store";
async function getLngLat() {
    const mapLocation = window['plugin'].mapLocation;
    const position = await mapLocation.getCurrentPosition();
    //度、纬度如需精确到米需5位小数，10米 4位
    const lng = Number(position.coords.longitude.toFixed(4));
    const lat = Number(position.coords.latitude.toFixed(4));
    return [lng, lat]
}
class Store {
    private _state: {
        startTime: Date,
        trailTime: number,
        mode: number,
        distance: number,
        position: []
    }
    private _geojson;
    private _updateListener: number;
    public get state() {
        return this._state;
    }
    public set mode(value) {
        //必须市已经记录或者暂停情况下，才能进行结束
        if (value === "finish" && (this._state.mode === 0 || this._state.mode === 1)) {
            return
        }
        this.changeMode(value);
    }
    constructor() {
        this._state = {
            startTime: null,
            trailTime: 0,
            mode: 0,
            distance: 0,
            position: []
        }
        this.drawTrail();
    }
    async update() {
        const map = earthStore._map;
        if (this._state.mode === 3) {
            this._state.trailTime++;
            const lngLat = await getLngLat()
            //@ts-ignore
            this._state.position.push(lngLat);
            this._geojson.features[0].geometry.coordinates.push(lngLat);
            const length = this._state.position.length
            if (length > 1) {
                const from = turf.point(this._state.position[length - 2]);
                const to = turf.point(lngLat);
                const options = { units: 'kilometers' };
                const distance = turf.distance(from, to, options);
                this._state.distance += distance;
                // then update the map
                map.getSource('line').setData(this._geojson);
            }
        }
    }
    init() {
        this._state.startTime = null
        this._state.trailTime = 0
        this._state.mode = 0
        this._state.distance = 0
        this.state.position.slice(0)
        this._updateListener && clearInterval(this._updateListener);
        this._updateListener = null;
        this._geojson.features[0].geometry.coordinates = [];
    }
    changeMode(string) {
        //未开始 开始 暂停 结束
        // 0      1    2     3
        const state = ["unStart", "finish", "suspend", "start"];
        if (this._state.mode === 1) {
            this.init()
        }
        switch (string) {
            case "start":
                this._state.startTime || (this._state.startTime = new Date());
                this._updateListener || (this._updateListener = setInterval(this.update.bind(this), 1000));
                break;
            case "suspend":
                break;
            case "finish":
                this._updateListener && clearInterval(this._updateListener);
                this._updateListener = null;
                break;
        }
        this._state.mode = state.indexOf(string);
    }
    drawTrail() {
        const map = earthStore._map;
        // Create a GeoJSON source with an empty lineString.
        const geojson = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': []
                    }
                }
            ]
        };
        this._geojson = geojson;
        map.addSource('line', {
            'type': 'geojson',
            'data': geojson
        });
        // add the line which will be modified in the animation
        map.addLayer({
            'id': 'line-animation',
            'type': 'line',
            'source': 'line',
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#ed6498',
                'line-width': 5,
                'line-opacity': 0.8
            }
        });
    }
    destroy() {
        const map = earthStore._map;
        map.removeLayer('line-animation')
        map.removeSource('line')
        this._updateListener && clearInterval(this._updateListener);
        this.init();
    }
}
const store = new Store()
export default store;
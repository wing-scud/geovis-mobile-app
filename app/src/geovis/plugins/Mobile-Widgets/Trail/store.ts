
const turf = window['turf']
import { earthStore } from "@/geovis/store";
import { generateId } from "@/util/utils";
const state = ["unStart", "finish", "suspend", "start"];
import mapboxgl from "mapbox-gl";
const GEOJSON = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "MultiLineString",
                "coordinates": [
                ]
            },
            "properties": {
                "title": "路线"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": []
            },
            "properties": {
                "title": "暂停点"
            }
        }
    ]
}

/**
 * 基于Geojson实现 地图标记添加
 * @returns 
 */

const speed = 0.010;
let time = 0;
const point = turf.point([-75.343, 39.984]);
async function getLngLat() {
    // const mapLocation = window['plugin'].mapLocation;
    // const position = await mapLocation.getCurrentPosition();
    // //度、纬度如需精确到米需5位小数，10米 4位
    // const lng = Number(position.coords.longitude.toFixed(4));
    // const lat = Number(position.coords.latitude.toFixed(4));
    // console.log(position)
    // return [lng, lat]
    const distance = speed * time;
    const bearing = 90;
    const options = { units: 'kilometers' };
    const destination = turf.destination(point, distance, bearing, options);
    const lngLat = turf.getCoord(destination);
    time++;
    return lngLat;
}
class Store {
    private _state: {
        startTime: Date,
        trailTime: number,
        mode: number,
        distance: number,
    }
    // 添加的点集合
    private _marks: [];
    private _mapShow: boolean;
    //轨迹的线
    private _geojson;
    //当前位置的标记
    private _currentMarker;
    private _updateListener: number;
    public get geojson() {
        return this._geojson;
    }
    public get mapShow(): boolean {
        return this._mapShow;
    }
    public set mapShow(value: boolean) {
        if (value) {
            this.showFeatures();
            this.setCenter()
        } else {
            this.clearMap();
        }
        this._mapShow = value;
    }
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
        }
        this._marks = [];
        this._geojson = GEOJSON
        this._mapShow = false
    }
    init() {
        this._state.startTime = null
        this._state.trailTime = 0
        this._state.mode = 0
        this._state.distance = 0.00
        this._updateListener && clearInterval(this._updateListener);
        this._updateListener = null;
        this._marks = [];
        this._geojson = GEOJSON
    }
    async update() {
        const map = earthStore.map;
        const linesCoords = this._geojson.features[0].geometry.coordinates;
        if (this._state.mode === 3) {
            this._state.trailTime++;
            const lngLat = await getLngLat();
            // 第几条线
            const nowLineIndex = linesCoords.length;
            const lineCoords = linesCoords[nowLineIndex - 1];
            this._addLngLatInLine(lngLat)
            // 该条线长度
            const length = linesCoords[nowLineIndex - 1].length;
            if (length > 1) {
                const from = turf.point(lineCoords[length - 2]);
                const to = turf.point(lineCoords[length - 1]);
                const options = { units: 'kilometers' };
                const distance = turf.distance(from, to, options);
                this._state.distance = Number((this._state.distance + distance).toFixed(3));
                // then update the map
                if (this._mapShow) {
                    map.getSource('trail').setData(this._geojson);
                }
            }
        }
    }

    async changeMode(string) {
        //未开始 开始 暂停 结束
        // 0      1    2     3
        // const state = ["unStart", "finish", "suspend", "start"];
        if (this._state.mode === 1) {
            this.init()
        }
        const features = this._geojson.features
        const linesCoords = this._geojson.features[0].geometry.coordinates;
        const suspendsCoords = this._geojson.features[1].geometry.coordinates;
        const lngLat = await getLngLat()
        switch (string) {
            case "start":
                linesCoords.push([]);
                if (this._state.mode === 0) {
                    //新开始
                    this._state.startTime = new Date();
                    features.push({
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": lngLat
                        },
                        "properties": {
                            "title": "起点"
                        }
                    })
                    this._updateListener = setInterval(this.update.bind(this), 1000);
                } else if (this._state.mode === 2) {
                    //继续
                    suspendsCoords.push(lngLat);
                }
                break;
            case "suspend":
                suspendsCoords.push(lngLat);
                break;
            case "finish":
                features.push({
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": lngLat
                    },
                    "properties": {
                        "title": "终点"
                    }
                })
                this._updateListener && clearInterval(this._updateListener);
                this._updateListener = null;
                break;
        }
        //
        this._addLngLatInLine(lngLat)
        this._state.mode = state.indexOf(string);
        this.update()
    }
    addGeojsonSource() {
        const map = earthStore.map;
        // Create a GeoJSON source with an empty lineString.
        const geojson = this._geojson;
        map.addSource('trail', {
            'type': 'geojson',
            'data': geojson
        });
        // add the line which will be modified in the animation
        map.addLayer({
            'id': 'line-animation',
            'type': 'line',
            'source': 'trail',
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#1E90FF',
                'line-width': 5,
                'line-opacity': 0.8,
            },
        });
        map.addLayer({
            'id': 'trail-points',
            'type': 'circle',
            'source': 'trail',
            'paint': {
                'circle-radius': 6,
                'circle-color': '#808080'
            },
            'filter': ['==', 'title', '暂停点']
        });
        map.addLayer({
            'id': 'trail-start',
            'type': 'circle',
            'source': 'trail',
            'paint': {
                'circle-radius': 6,
                'circle-color': '#FF0000'
            },
            'filter': ['==', 'title', '起点']
        });
        map.addLayer({
            'id': 'trail-finish',
            'type': 'circle',
            'source': 'trail',
            'paint': {
                'circle-radius': 6,
                'circle-color': '#0000FF'
            },
            'filter': ['==', 'title', '终点']
        });
    }
    async setCenter() {
        const map = earthStore.map;
        const geojson = this._geojson
        const multiLine = turf.multiLineString(geojson.features[0].geometry.coordinates);
        const bbox = turf.bbox(multiLine);
        const bounds = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]]
        map.fitBounds(bounds, {
            padding: 20
        });
    }
    async _addLngLatInLine(lngLat) {
        const linesCoords = this._geojson.features[0].geometry.coordinates;
        // 第几条线
        const nowLineIndex = linesCoords.length;
        const lineCoords = linesCoords[nowLineIndex - 1];
        lineCoords.push(lngLat);
    }
    clearMap() {
        const map = earthStore.map;
        map.removeLayer('trail-finish');
        map.removeLayer('trail-start');
        map.removeLayer('trail-points');
        map.removeLayer('line-animation');
        map.removeSource('trail')
        this._marks.forEach((item) => {
            //@ts-ignore
            if (item.marker) {
                //@ts-ignore
                marker.remove();
            }
        });
        this._marks = []
    }
    destroy() {
        const map = earthStore.map;
        this.clearMap()
        this._mapShow = false
        this.init();
    }
    showFeatures() {
        this.addGeojsonSource()
    }
    serialize() {

    }
}
const store = new Store()
export default store;
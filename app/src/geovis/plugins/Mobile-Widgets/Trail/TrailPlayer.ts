/**
 * Bug: 调控speed，time计算有问题
 */

import { earthStore } from "@/geovis/store"
const turf = window['turf']
import mapboxgl from "mapbox-gl"
class TrailPlayer {
    public startTime
    public trailTime
    public distance
    public geojson;
    // 单位 m/s
    public speed;
    private _listener;
    private _distances;
    private _marker;
    private _cameraState
    public get cameraState() {
        return this._cameraState
    }
    public set cameraState(value) {
        this._cameraState = value
    }
    private _baseSpeed; //单位m/s
    private _state: {
        time; play, speed, drivingDistance, mode
    }
    public get state(): {
        time; play, speed, drivingDistance,
        mode
    } {
        return this._state
    }
    public set state(value: {
        time; play, speed, drivingDistance, mode
    }) {
        this._state = value;
    }
    public set play(bool) {
        this._state.play = bool;
        this.animateTrail(bool)
    }
    public get mode() {
        return this._state.mode
    }
    public set mode(value) {
        this._state.mode = value;
    }
    constructor(trail) {
        this.startTime = trail.startTime;
        this.trailTime = trail.trailTime;
        this.distance = trail.distance;
        this.geojson = trail.geojson;
        this._state = {
            time: 0,
            play: false,
            speed: 1,
            drivingDistance: 0,
            mode: false
        }
        this._cameraState = {
            altitude: 50,
            heading: 100,
            pitch: 30
        }
        this._baseSpeed = this.distance * 1000 / this.trailTime
        this.setCenter();
        this._addGeojsonSource();
        this.update = this.update.bind(this);
    }
    update() {
        const map = earthStore.map;
        let lastTimestamp;
        const updateMarker = (timestamp?) => {
            let seconds = 0;
            if (this._state.play) {
                if (lastTimestamp) {
                    const intervalTime = timestamp - lastTimestamp;
                    seconds = intervalTime / 1000
                    const speed = this._state.speed * this._baseSpeed;
                    const distance = speed * seconds / 1000;
                    this._state.drivingDistance += distance;
                }
                const lngLat = this._getPoint();
                if (lngLat) {
                    this._state.time += seconds;
                    this._marker || (this._marker = new mapboxgl.Marker());
                    this._marker.setLngLat(lngLat).addTo(map);
                    if (this._state.mode) {
                        this._updateCamera(lngLat)
                    }
                }
            }
            lastTimestamp = timestamp;
            this._listener = requestAnimationFrame(updateMarker);
        }
        updateMarker();
    }
    animateTrail(bool) {
        if (bool) {
            this._listener = requestAnimationFrame(this.update);
        } else {
            this._listener && cancelAnimationFrame(this._listener)
            this._listener = null;
            this._state.drivingDistance = 0;
            this._state.time = 0;
        }
    }
    setCenter() {
        const map = earthStore.map;
        const geojson = this.geojson
        const multiLine = turf.multiLineString(geojson.features[0].geometry.coordinates);
        const bbox = turf.bbox(multiLine);
        const bounds = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]]
        map.fitBounds(bounds, {
            padding: 20
        });
    } changeTime(trailTime) {
        const nowTime = trailTime / this._state.speed;
        this._state.drivingDistance += (nowTime - this._state.time) * this._state.speed * this._baseSpeed / 1000
        this._state.time = nowTime;
        const lngLat = this._getPoint()
        this._marker && lngLat && (this._marker.setLngLat(lngLat), this._updateCamera(lngLat))
    }
    destroy() {
        this._listener && cancelAnimationFrame(this._listener)
        this._listener = null;
        this._clearMap()
    }
    // 初始定位靠distance ，后续定位靠speed
    _getPoint() {
        this._distances || (this._distances = turf.getCoords(this.geojson.features[0]).map((lineCoords) => {
            const line = turf.lineString(lineCoords);
            return turf.length(line);
        }))
        //turf along 之后无法判断点在线上
        let totalDistance = 0;
        let lineIndex = 0;
        const drivingDistance = this._state.drivingDistance;
        for (let i = 0; i < this._distances.length; i++) {
            totalDistance += this._distances[i];
            if (totalDistance > drivingDistance) {
                lineIndex = i;
                break;
            }
        }
        if (drivingDistance >= totalDistance) {
            return null
        }
        const lineDrivingDistance = this._distances[lineIndex] - (totalDistance - drivingDistance);
        const lineString = turf.lineString(turf.getCoords(this.geojson.features[0])[lineIndex]);
        const point = turf.along(lineString, lineDrivingDistance)
        return turf.getCoord(point)
    }

    _addGeojsonSource() {
        const map = earthStore.map;
        // Create a GeoJSON source with an empty lineString.
        const geojson = this.geojson;
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
        const startCoords = turf.getCoord(geojson.features[2])
        this._marker || (this._marker = new mapboxgl.Marker());
        this._marker.setLngLat(startCoords).addTo(map);
    }
    _clearMap() {
        const map = earthStore.map;
        map.removeLayer('trail-finish');
        map.removeLayer('trail-start');
        map.removeLayer('trail-points');
        map.removeLayer('line-animation');
        map.removeSource('trail')
        this._marker && this._marker.remove()
        this._marker = null;
    }
    _updateCamera(lngLat) {
        const map = earthStore.map;
        const camera = map.getFreeCameraOptions();
        const { altitude, heading, pitch } = this._cameraState;

        camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
            lngLat,
            altitude
        );
        camera.setPitchBearing(pitch, heading)
        // camera.lookAtPoint(lngLat);
        map.setFreeCameraOptions(camera);
    }
}
export default TrailPlayer;
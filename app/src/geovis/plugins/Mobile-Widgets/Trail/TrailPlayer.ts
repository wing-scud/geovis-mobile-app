import { earthStore } from "@/geovis/store"
const turf = window['turf']
import mapboxgl from "mapbox-gl"
class TrailPlayer {
    public startTime
    public trailTime
    public distance
    public geojson;
    public mode;
    // 单位 m/s
    public speed;
    private _listener;
    private _marker;
    private _state: {
        time; play, speed
    }
    public get state(): {
        time; play, speed
    } {
        return this._state
    }
    public set state(value: {
        time; play, speed
    }) {
        this._state = value;
    }
    public set play(bool) {
        this._state.play = bool;
        if (bool) {
            this.animateTrail()
        } else {
            this._listener && cancelAnimationFrame(this._listener)
            this._marker.remove()
        }
    }
    constructor(trail) {
        this.startTime = trail.startTime;
        this.trailTime = trail.trailTime;
        this.distance = trail.distance;
        this.geojson = trail.geojson;
        this._state = {
            time: 0,
            play: false,
            speed: 1
        }
        this.setCenter();
        this._addGeojsonSource();
    }
    animateTrail() {
        // 初始化marker
        const map = earthStore.map;
        const geojson = this.geojson;
        const lngLat = this._marker ? this._marker.getLngLat().toArray() :
            turf.getCoord(geojson.features[2]);
        this._marker = this._marker ? this._marker : (new mapboxgl.Marker())
        this._marker.setLngLat(lngLat).addTo(map);
        //获取当前位置
        let distance = 0;
        const options = { units: 'kilometers' };
        const lines = geojson.features[0];
        const linesLength = lines.geometry.coordinates.length;
        let currentLineIndex = 0;
        let line, isPointOnLine;
        //判断当前点位于哪个线上，排除二条线交叉
        for (let i = 0; i < linesLength; i++) {
            const point = turf.point(lngLat);
            line = turf.lineString(lines.geometry.coordinates[i])
            isPointOnLine = turf.booleanPointOnLine(point, line);
            if (isPointOnLine) {
                currentLineIndex = i;
                break;
            }
        }
        const currentPoint = turf.point(lngLat);
        const lineCoords = turf.getCoords(line)
        const startPoint = turf.point(lineCoords[0]);
        const sliced = turf.lineSlice(startPoint, currentPoint, line);
        distance = turf.length(sliced, { units: 'kilometers' });
        let lastTimestamp;
        const animateMarker = (timestamp) => {
            let time;
            if (!lastTimestamp) {
                time = performance.now() - timestamp
            } else {
                time = timestamp - lastTimestamp
            }
            const seconds = time / 1000
            // @ts-ignore
            const speed = this._state.speed;
            const getNextLine = () => {
                line = turf.lineString(lines.geometry.coordinates[currentLineIndex])
                const currentPoint = turf.point(this._marker.getLngLat().toArray());
                const lineCoords = turf.getCoords(line)
                const stopPoint = turf.point(lineCoords[lineCoords.length - 1]);
                const sliced = turf.lineSlice(currentPoint, stopPoint, line);
                const slicedDistance = turf.length(sliced, { units: 'kilometers' });
                const changedDistance = seconds * speed / 1000
                if (changedDistance >= slicedDistance) {
                    distance = changedDistance - slicedDistance;
                    currentLineIndex++;
                    getNextLine()
                } else {
                    distance += changedDistance;
                }
            }
            getNextLine();
            line = turf.lineString(lines.geometry.coordinates[currentLineIndex])
            const along = turf.along(line, distance, options);
            //???
            // isPointOnLine = turf.booleanPointOnLine(along, line);
            // if (!isPointOnLine) {
            //     console.log("getNextLine error")
            // }
            this._state.time = this._state.time + seconds;
            this._marker.setLngLat(turf.getCoord(along));
            lastTimestamp = timestamp;
            if (currentLineIndex < linesLength && this._state.play) {
                this._listener = requestAnimationFrame(animateMarker);
            } else {
                this._state.play = false;
            }
        }
        this._listener = requestAnimationFrame(animateMarker);
    }
    destroy() {
        this._clearMap()
    }
    async setCenter() {
        const map = earthStore.map;
        const geojson = this.geojson
        const multiLine = turf.multiLineString(geojson.features[0].geometry.coordinates);
        const bbox = turf.bbox(multiLine);
        const bounds = [[bbox[0], bbox[1]], [bbox[2], bbox[3]]]
        map.fitBounds(bounds, {
            padding: 20
        });
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
    }
    _clearMap() {
        const map = earthStore.map;
        map.removeLayer('trail-finish');
        map.removeLayer('trail-start');
        map.removeLayer('trail-points');
        map.removeLayer('line-animation');
        map.removeSource('trail')
    }
}
export default TrailPlayer;
import { earthStore } from "@/geovis/store";
import mapboxgl from "mapbox-gl";
import state from "./store"
class MapboxManager {
    private _map: any;
    private _routeLines: Map<string, {
        layer: any,
        listener: any,
        source: object
    }>;
    public events: {
        line: any;
        marker: any;
    };
    private _markers: Map<string, any>;
    public get markers(): Map<string, any> {
        return this._markers;
    }
    public set markers(value: Map<string, any>) {
        this._markers = value;
    }
    constructor() {
        const map = earthStore.map;
        this._map = map;
        this.events = {
            line: "",
            marker: ""
        }
        this._markers = new Map();
        this._routeLines = new Map();
    }
    flyTo(center, zoom?, speed?) {
        this._map.flyTo({
            center: center,
            zoom: zoom ?? 10,
            speed: speed ?? 1.2,
            curve: 1,
        })
    }
    /**
     * 
     * @param source 
     * @param id 
     * @param color 
     * @param beforeId  mapbox 坑
     * layer add，未指定beforeId，则默认最高优先级（假设为999）,
     */
    addGeojsonLine(source, id, color, beforeId) {
        const route = this._map.addSource(id, source);
        const layer = this._map.addLayer({
            id: id,
            type: "line",
            source: id,
            layout: {
                "line-join": "round",
                "line-cap": "round",
            },
            paint: {
                "line-color": color,
                "line-width": 4,
            },
        });
        const listener = () => { this.listenerLine.call(this, id) }
        this._map.on('click', id, listener)
        this._routeLines.set(id, {
            layer,
            source: route,
            listener
        })
    }
    setGeojsonLineColor(id, color, beforeId) {
        this._map.moveLayer(id);
        this._map.setPaintProperty(id, 'line-color', color);
    }
    removeLine(id) {
        if (this._routeLines.get(id)) {
            this._map.removeLayer(id);
            this._map.removeSource(id);
            if (this._routeLines.get(id).listener) {
                this._map.off('click', id, this._routeLines.get(id).listener)
            }
            this._routeLines.delete(id);
        }
    }
    addImageMarker(id, url, position) {
        const el = document.createElement('img');
        //@ts-ignore
        el.src = url
        //@ts-ignore
        el.width = "50px";
        //@ts-ignore
        el.height = "50px";
        el.className = "image-marker";
        // const marker = new mapboxgl.Marker(el)
        //     .setLngLat(position)
        //     .addTo(this._map);
        const marker = new mapboxgl.Marker({
            element: el,
            draggable: false
        }).setLngLat(position)
            .addTo(this._map);
        const listener = (e) => { this.listenerMarker.call(this, e, id) }
        marker.on('dragend', listener)
        this._markers.set(id, marker)
    }
    removeImageMarker(id) {
        const marker = this._markers.get(id);
        if (marker) {
            marker.remove()
            this._markers.delete(id)
        }
    }
    setCamera(lnglat) {
        const camera = this._map.getFreeCameraOptions();
        // set the position and altitude of the camera
        camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
            {
                lng: lnglat[0],
                lat: lnglat[1]
            },
            100
        );
        // tell the camera to look at a point along the route
        camera.lookAtPoint({
            lng: lnglat[0],
            lat: lnglat[1]
        });
        // camera.setPitchBearing(45,0)
        this._map.setFreeCameraOptions(camera);
    }
    clearAll() {
        this._routeLines.forEach((value, id) => {
            this.removeLine(id);
        })
        this._markers.forEach((marker, id) => {
            this.removeImageMarker(id)
        })
    }
    listenerLine(id) {
        state.choosedId.id = id
    }
    listenerMarker(e, id) {
        this.events.marker = { lngLat: e.lngLat, id }
    }
}
const mapboxManager = new MapboxManager()
export default mapboxManager;

import { earthStore } from "@/geovis/store";
import mapboxgl from "mapbox-gl";
class MapboxManager {
    private _map: any;
    private _routeLines: Array<String>;
    private _markers: Map<String, any>;
    constructor() {
        const map = earthStore.map;
        this._map = map;
    }
    flyTo(center) {
        this._map.flyTo({
            center: center,
            zoom: 9,
            speed: 1.2,
            curve: 1,
        })
    }
    addGeojsonLine(source, id, color) {
        const route = this._map.addSource(id, source);

        this._map.addLayer({
            id: id,
            type: "line",
            source: id,
            layout: {
                "line-join": "round",
                "line-cap": "round",
            },
            paint: {
                "line-color": color,
                "line-width": 8,
            },
        });
        this._routeLines.push(id)
        return id;
    }
    removeLayer(id) {
        this._map.removeLayer(id);
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
        // document.getElementsByTagName('body')[0].appendChild(el)

        // var el = document.createElement('div');
        // el.className = 'marker';
        // el.style.backgroundImage =
        //     `url(${url})`;
        // el.style.width = 50 + 'px';
        // el.style.height = 50 + 'px';
        // el.style.backgroundSize = '100%';
        const marker = new mapboxgl.Marker(el)
            .setLngLat(position)
            .addTo(this._map);
        //     const marker = new mapboxgl.Marker({
        //     element: el,
        //     draggable: true
        // }).setLngLat(position)
        //     .addTo(this._map);
        this._markers.set(id, marker)
    }
    clearAll() {
        this._routeLines.map((id) => {
            this.removeLayer(id);
        })
    }
}
const mapboxManager = new MapboxManager()
export default mapboxManager;

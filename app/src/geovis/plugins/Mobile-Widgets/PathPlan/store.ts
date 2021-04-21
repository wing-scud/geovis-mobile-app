import { earthStore } from "@/geovis/store";
import mapboxgl from "mapbox-gl";
class MapboxManager {
    private _map: any;
    private _routeLines: Map<string,{
        layer:any,
        listener:boolean,
        source:object
    }>;
    private _markers: Map<string, any>;
    constructor() {
        const map = earthStore.map;
        this._map = map;
        this._markers=new Map();
        this._routeLines = new Map();
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
                "line-width": 8,
            },
        });
        this._map.on('click',id,(e)=>{
            console.log(id,e)
        })
        this._routeLines.set(id,{
            layer,
            source:route,
            listener:true
        })
    }
    setGeojsonLineColor(id, color) {
        const obj = this._routeLines.get(id);
        this._map.setPaintProperty(obj.layer.value, 'fill-color', color);
    }
    removeLine(id) {
        this._map.removeLayer(id);
        this._map.removeSource(id);
        this._routeLines.delete(id);
    }
    addImageMarker(id, url, position) {
        const marker = new mapboxgl.Marker({
            color: "#FFFFFF",
            draggable: false
        }).setLngLat(position)
            .addTo(this._map);
        // const el = document.createElement('img');
        // //@ts-ignore
        // el.src = url
        // //@ts-ignore
        // el.width = "50px";
        // //@ts-ignore
        // el.height = "50px";
        // el.className = "image-marker";
        // document.getElementsByTagName('body')[0].appendChild(el)

        // var el = document.createElement('div');
        // el.className = 'marker';
        // el.style.backgroundImage =
        //     `url(${url})`;
        // el.style.width = 50 + 'px';
        // el.style.height = 50 + 'px';
        // el.style.backgroundSize = '100%';
        // const marker = new mapboxgl.Marker(el)
        //     .setLngLat(position)
        //     .addTo(this._map);
        //     const marker = new mapboxgl.Marker({
        //     element: el,
        //     draggable: true
        // }).setLngLat(position)
        //     .addTo(this._map);
        this._markers.set(id, marker)
    }
    removeImageMarker(id){
        const marker = this._markers.get(id);
        marker.remove(this._map)
        this._markers.delete(id)
    }
    clearAll() {
        this._routeLines.forEach((value,id) => {
            this.removeLine(id);
        })
        this._markers.forEach((marker,id)=>{
            marker.remove(this._map)
            this._markers.delete(id)
        })
    }
}
const mapboxManager = new MapboxManager()
export default mapboxManager;

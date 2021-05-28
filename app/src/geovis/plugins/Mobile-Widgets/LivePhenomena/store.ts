import { earthStore } from "@/geovis/store"
import { linearRangeNumber } from "@/util/utils.js"
import * as mapboxWind from "@sakitam-gis/mapbox-wind";
const SERVER_ROOT = window['sceneData'].SERVER_ROOT;
const vectorAddress = SERVER_ROOT + "/weather/mapboxVector";
const scalarAddress = SERVER_ROOT + "/weather/mapboxScalar";
const phenomenaListAddress = SERVER_ROOT + "/static/weather/weather-config.json"
const list = [];
let colorMap = null
async function remoteFetch(type, datatype, time, name) {
    const url = type === "vector" ? vectorAddress : scalarAddress;
    const remote = await fetch(url, {
        method: "post",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            time: time,
            type: datatype
        })
    }).then(res =>
        res.json()
    )
    return remote;
}
class WeatherManager {
    private _map;
    private _mode: string;
    private _seconds: number;
    private _layer: {
        vector: any;
        scalar: any;
    };
    public get layer(): {
        vector: any;
        scalar: any;
    } {
        return this._layer;
    }
    public set layer(value: {
        vector: any;
        scalar: any;
    }) {
        this._layer = value;
    }
    public get mode(): string {
        return this._mode
    }
    public set mode(value: string) {
        this.close();
        this._mode = value;
        this.update()
    }
    public get seconds(): number {
        return this._seconds;
    }
    public set seconds(value: number) {
        this.close();
        this._seconds = value;
        this.update();
    }
    public get map() {
        return this._map;
    }
    public set map(value) {
        this._map = value;
    }
    constructor(map) {
        this._map = map;
        this._layer = {
            vector: undefined,
            scalar: undefined
        }
        this.initList()
    }
    // 加载json
    vectorLoad(data, imgUrl) {
        const map = this._map;
        const uHeader = data[0].header;
        const vHeader = data[1].header;
        const { min: uMin, max: uMax } = uHeader;
        const { min: vMin, max: vMax } = vHeader;
        const [min, max] = [Math.min(uMin, vMin), Math.max(uMax, vMax)];
        const color = colorMap[this._mode];
        const linearArray = linearRangeNumber(min, max, color.length)
        const interpolateColor = color.reduce((result, item, index) => result.concat(linearArray[index], 'rgba(' + item.join(',') + ')'), []);
        const vectorColor = color.map((item, index) => 'rgba(' + item.join(',') + ')');
        data = data.map((item, idx) => {
            item.header = Object.assign(item.header, {
                parameterCategory: 1,
                parameterNumber: idx === 0 ? 2 : 3,
            });
            return item;
        });
        const fillLayer = new mapboxWind.ScalarFill('windImage', {
            "type": "image",
            "url": imgUrl,
            "extent": [
                [-180, 85.051129],
                [-180, -85.051129],
                [180, 85.051129],
                [180, -85.051129]
            ],
            "width": uHeader.nx,
            "height": uHeader.ny,
            "uMin": uMin,
            "uMax": uMax,
            "vMin": vMin,
            "vMax": vMax,
        }, {
            wrapX: true,
            styleSpec: {
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'value'],
                    ...interpolateColor
                ],
                'opacity': [
                    'interpolate',
                    ['exponential', 0.01],
                    // ["linear"],
                    ['zoom'],
                    2,
                    1,
                    7,
                    1,
                    8,
                    0
                ],
            },
            renderForm: 'rg',
            widthSegments: 1,
            heightSegments: 1,
            mappingRange: [0, 6000000],
        });
        map.addLayer(fillLayer);
        this._layer.scalar = fillLayer;
        const windLayer = new mapboxWind.WindLayer('wind', data, {
            windOptions: {
                colorScale: (m) => {
                    return '#fff';
                },
                // colorScale: vectorColor,
                velocityScale: 1 / 25,
                // paths:5000,
                paths: () => { // can be number or function
                    const base = 10000;
                    const zoom = map.getZoom();
                    return base / zoom;
                },
                frameRate: 16,
                maxAge: 60,
                globalAlpha: 0.9,
            },
        });
        map.addLayer(windLayer);
        this._layer.vector = windLayer
    }
    // 记载tiff
    scalarLoad(data, imgUrl) {
        const map = this._map;
        const header = data.header;
        const { min, max } = data.header;
        const color = colorMap[this._mode];
        const linearArray = linearRangeNumber(min, max, color.length)
        const tempInterpolateColor = color.reduce((result, item, index) => result.concat(linearArray[index], 'rgba(' + item.join(',') + ')'), []);
        const fillLayer = new mapboxWind.ScalarFill('tempImage', {
            "type": "image",
            "url": imgUrl,
            "extent": [
                // [header.lo1, header.la2],
                // [header.lo1, header.la1],
                // [header.lo2, header.la2],
                // [header.lo2, header.la1]
                [-180, 85.051129],
                [-180, -85.051129],
                [180, 85.051129],
                [180, -85.051129]
            ],
            "width": header.nx,
            "height": header.ny,
            "min": min,
            "max": max
        }, {
            wrapX: true,
            styleSpec: {
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'value'],
                    ...tempInterpolateColor
                ],
                //随层级变化的图层透明度
                'opacity': [
                    'interpolate',
                    ['exponential', 0.01],
                    // ["linear"],
                    ['zoom'],
                    2,
                    1,
                    7,
                    1,
                    8,
                    0
                ],
            },
            renderForm: 'r',
            widthSegments: 1,
            heightSegments: 1,
            mappingRange: [0, 6000000],
        });
        map.addLayer(fillLayer);
        this._layer.scalar = fillLayer;
    }
    async update() {
        const mode = this._mode;
        const seconds = this._seconds;
        if (mode && seconds) {
            const value = list.find((item) => item.id === mode);
            if (value && value.type === "vector") {
                const data = await remoteFetch('vector', 'json', seconds, mode);
                const imgUrl = `${vectorAddress}?type=png&name=${mode}&time=${seconds}`
                this.vectorLoad(data, imgUrl)
            } else {
                // 标量
                const data = await remoteFetch('scalar', 'json', seconds, mode);
                const imgUrl = `${scalarAddress}?type=png&name=${mode}&time=${seconds}`
                this.scalarLoad(data, imgUrl)
            }
        }
    }
    close() {
        const map = this._map;
        const vectorLayer = this._layer.vector;
        const scalarLayer = this._layer.scalar;
        vectorLayer && map.removeLayer(vectorLayer.id);
        scalarLayer && map.removeLayer(scalarLayer.id);
    }
    initList() {
        fetch(phenomenaListAddress).then((res) => res.json()).then((data) => {
            const obj = data.fileMap;
            Object.keys(obj).map((id) => {
                list.push({
                    name: obj[id].name,
                    id: id,
                    type: obj[id].type,
                    icon: "icon-" + id,
                })
            });
            colorMap = data.colorMap;
        });
    }
    destroy() {
        this.close()
    }
}

const manager = new WeatherManager(earthStore.map);
window['manager'] = manager
export default manager;
export { list };

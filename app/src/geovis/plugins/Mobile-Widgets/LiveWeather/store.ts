import { earthStore } from "@/geovis/store"
import * as mapboxWind from "@sakitam-gis/mapbox-wind";
const vectorAddress = "http://localhost:8091/weather/mapboxVector"
const scalarAddress = "http://localhost:8091/weather/mapboxScalar"
const list = [
    {
        name: "风",
        id: "wind",
        type: "vector",
        icon: "icon-baocun",
    },
    {
        name: "云",
        id: "cloud",
        type: "scalar",
        icon: "icon-baocun",
    },
    {
        name: "降水",
        id: "rainfall",
        type: "scalar",
        icon: "icon-baocun",
    },
    {
        name: "温度",
        id: "temperature",
        type: "scalar",
        icon: "icon-baocun",
    },
    {
        name: "气压",
        id: "airPressure",
        type: "scalar",
        icon: "icon-baocun",
    },
    {
        name: "湿度",
        id: "humidity",
        type: "scalar",
        icon: "icon-baocun",
    },
]
async function remoteFetch(type, datatype, time, name) {
    const url = type === "vector" ? vectorAddress : scalarAddress;
    const contentType = datatype === "json" ? "application/json" : "image/png"
    const remote = await fetch(url, {
        method: "post",
        mode: 'cors',
        // credentials: "include",
        // headers: {
        //     "Content-Type": contentType
        // },
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            time: time,
            type: datatype
        })
    }).then(res => {
        const data = datatype === "json" ? (res.json()) : (res.blob());
        return data
    })
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
        value = 1621944000;
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
        this._mode = "wind";
        this._layer = {
            vector: undefined,
            scalar: undefined
        }
    }
    // 加载json
    vectorLoad(data, imgUrl) {
        const map = this._map;
        const color = {
            wind: [
                [0, [98, 113, 183, 255]],
                [1, [57, 97, 159, 255]],
                [3, [74, 148, 169, 255]],
                [5, [77, 141, 123, 255]],
                [7, [83, 165, 83, 255]],
                [9, [53, 159, 53, 255]],
                [11, [167, 157, 81, 255]],
                [13, [159, 127, 58, 255]],
                [15, [161, 108, 92, 255]],
                [17, [129, 58, 78, 255]],
                [19, [175, 80, 136, 255]],
                [21, [117, 74, 147, 255]],
                [24, [109, 97, 163, 255]],
                [27, [68, 105, 141, 255]],
                [29, [92, 144, 152, 255]],
                [36, [125, 68, 165, 255]],
                [46, [231, 215, 215, 255]],
                [51, [219, 212, 135, 255]],
                [77, [205, 202, 112, 255]],
                [104, [128, 128, 128, 255]]
            ],
        };
        data = data.map((item, idx) => {
            item.header = Object.assign(item.header, {
                parameterCategory: 1,
                parameterNumber: idx === 0 ? 2 : 3,
            });
            return item;
        });
        const uheader = data[0].header;
        const vheader = data[1].header;
        //@ts-ignore
        const windInterpolateColor = color.wind.reduce((result, item, key) => result.concat(item[0], 'rgba(' + item[1].join(',') + ')'), []);
        const fillLayer = new mapboxWind.ScalarFill('windImage', {
            // "type": "jsonArray",
            // "data": data,
            "type": "image",
            "url": imgUrl,
            "extent": [
                // [uheader.lo1, uheader.la2],
                // [uheader.lo1, uheader.la1],
                // [uheader.lo2, uheader.la2],
                // [uheader.lo2, uheader.la1]
                [-180, 85.051129],
                [-180, -85.051129],
                [180, 85.051129],
                [180, -85.051129]
            ],
            "width": uheader.nx,
            "height": uheader.ny,
            "uMin": uheader.min,
            "uMax": uheader.max,
            "vMin": vheader.min,
            "vMax": vheader.max,
        }, {
            wrapX: false,
            styleSpec: {
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'value'],
                    ...windInterpolateColor
                ],
                'opacity': [
                    'interpolate',
                    ['exponential', 0.5],
                    ['zoom'],
                    1,
                    1,
                    2,
                    1
                ],
            },
            renderForm: 'rg',
            widthSegments: 1,
            heightSegments: 1,
            mappingRange: [0, 5000000],
            wireframe: false,
        });
        map.addLayer(fillLayer);
        this._layer.scalar = fillLayer;
        const windLayer = new mapboxWind.WindLayer('wind', data, {
            windOptions: {
                colorScale: (m) => {
                    // console.log(m);
                    return '#fff';
                },
                // colorScale: [
                //     "rgb(36,104, 180)",
                //     "rgb(60,157, 194)",
                //     "rgb(128,205,193 )",
                //     "rgb(151,218,168 )",
                //     "rgb(198,231,181)",
                //     "rgb(238,247,217)",
                //     "rgb(255,238,159)",
                //     "rgb(252,217,125)",
                //     "rgb(255,182,100)",
                //     "rgb(252,150,75)",
                //     "rgb(250,112,52)",
                //     "rgb(245,64,32)",
                //     "rgb(237,45,28)",
                //     "rgb(220,24,32)",
                //     "rgb(180,0,35)"
                // ],
                velocityScale: 1 / 20,
                paths: 5000,
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
        const color = {
            temp: [
                [0, [98, 113, 183, 255]],
                [1, [57, 97, 159, 255]],
                [3, [74, 148, 169, 255]],
                [5, [77, 141, 123, 255]],
                [7, [83, 165, 83, 255]],
                [9, [53, 159, 53, 255]],
                [11, [167, 157, 81, 255]],
                [13, [159, 127, 58, 255]],
                [15, [161, 108, 92, 255]],
                [17, [129, 58, 78, 255]],
                [19, [175, 80, 136, 255]],
                [21, [117, 74, 147, 255]],
                [24, [109, 97, 163, 255]],
                [27, [68, 105, 141, 255]],
                [29, [92, 144, 152, 255]],
                [36, [125, 68, 165, 255]],
                [46, [231, 215, 215, 255]],
                [51, [219, 212, 135, 255]],
                [77, [205, 202, 112, 255]],
                [104, [128, 128, 128, 255]]
            ],
        };
        const header = data.header;
        //@ts-ignore
        const tempInterpolateColor = color.wind.reduce((result, item, key) => result.concat(item[0], 'rgba(' + item[1].join(',') + ')'), []);
        const fillLayer = new mapboxWind.ScalarFill('tempImage', {
            "type": "image",
            "url": imgUrl,
            "extent": [
                // [uheader.lo1, uheader.la2],
                // [uheader.lo1, uheader.la1],
                // [uheader.lo2, uheader.la2],
                // [uheader.lo2, uheader.la1]
                [-180, 85.051129],
                [-180, -85.051129],
                [180, 85.051129],
                [180, -85.051129]
            ],
            "width": header.nx,
            "height": header.ny,
            "min": header.min,
            "max": header.max
        }, {
            wrapX: false,
            styleSpec: {
                'fill-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'value'],
                    ...tempInterpolateColor
                ],
                'opacity': [
                    'interpolate',
                    ['exponential', 0.5],
                    ['zoom'],
                    1,
                    1,
                    2,
                    1
                ],
            },
            renderForm: 'r',
            widthSegments: 1,
            heightSegments: 1,
            mappingRange: [0, 5000000],
            wireframe: false,
        });
        map.addLayer(fillLayer);
        this._layer.scalar = fillLayer;
    }
    async update() {
        const mode = this._mode;
        const seconds = this._seconds;
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
    close() {
    }
    destory() {
        const map = this._map;
        const windLayer = this._layer.vector
        map.addLayer(windLayer);
    }
}

const manager = new WeatherManager(earthStore.map);
export default manager;
export { list };

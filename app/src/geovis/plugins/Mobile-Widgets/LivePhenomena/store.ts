import { earthStore } from "@/geovis/store"
import * as mapboxWind from "@sakitam-gis/mapbox-wind";
const SERVER_ROOT = window['sceneData'].SERVER_ROOT;
const vectorAddress = SERVER_ROOT + "/weather/mapboxVector";
const scalarAddress = SERVER_ROOT + "/weather/mapboxScalar";
const phenomenaListAddress = SERVER_ROOT + "/static/weather/weather-config.json"
// const list = [
//     {
//         name: "风",
//         id: "wind",
//         type: "vector",
//         icon: "icon-baocun",
//     },
//     {
//         name: "云",
//         id: "cloud",
//         type: "scalar",
//         icon: "icon-baocun",
//     },
//     {
//         name: "降水",
//         id: "rainfall",
//         type: "scalar",
//         icon: "icon-baocun",
//     },
//     {
//         name: "温度",
//         id: "temperature",
//         type: "scalar",
//         icon: "icon-baocun",
//     },
//     {
//         name: "气压",
//         id: "airPressure",
//         type: "scalar",
//         icon: "icon-baocun",
//     },
//     {
//         name: "湿度",
//         id: "humidity",
//         type: "scalar",
//         icon: "icon-baocun",
//     },
// ]
const list = []
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
            wrapX: true,
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
            mappingRange: [1000000, 5000000],
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
            temp: [[203, [115, 70, 105, 255]],
            [218, [202, 172, 195, 255]],
            [233, [162, 70, 145, 255]],
            [248, [143, 89, 169, 255]],
            [258, [157, 219, 217, 255]],
            [265, [106, 191, 181, 255]],
            [269, [100, 166, 189, 255]],
            [273.15, [93, 133, 198, 255]],
            [274, [68, 125, 99, 255]],
            [283, [128, 147, 24, 255]],
            [294, [243, 183, 4, 255]],
            [303, [232, 83, 25, 255]],
            [320, [71, 14, 0, 255]]]
        };
        const header = data.header;
        //@ts-ignore
        const tempInterpolateColor = color.temp.reduce((result, item, key) => result.concat(item[0], 'rgba(' + item[1].join(',') + ')'), []);
        const fillLayer = new mapboxWind.ScalarFill('tempImage', {
            "type": "image",
            // "url": imgUrl,
            "url":"static/data/weather/var_tmp.png",
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
            "min": header.min,
            "max": header.max
        }, {
            wrapX: true,
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
            mappingRange: [1000000, 5000000],
        });
        map.addLayer(fillLayer);
        this._layer.scalar = fillLayer;
    }
    async update() {
        const mode = this._mode;
        let seconds = this._seconds;
        if (mode && seconds) {
            const value = list.find((item) => item.id === mode);
            if (value && value.type === "vector") {
                seconds = 1621944000;
                const data = await remoteFetch('vector', 'json', seconds, mode);
                const imgUrl = `${vectorAddress}?type=png&name=${mode}&time=${seconds}`
                this.vectorLoad(data, imgUrl)
            } else {
                // 标量
                seconds = 1621922400;
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
            })
        });
    }
    destory() {
        this.close()
    }
}

const manager = new WeatherManager(earthStore.map);
window['manager'] = manager
export default manager;
export { list };

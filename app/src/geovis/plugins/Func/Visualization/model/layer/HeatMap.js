import MapVLayerProvider from "../../../VisManager/layers_/MapVProvider/MapVLayerProvider";
// import { citys } from "./data";
// import EcahrtsProvider from "../EcahrtsProvider";
// import { textChangeRangeIsUnchanged } from "typescript";
const mapV = window["mapv"]


class HeatMap {
    constructor() {
        this.state = {
            // pointRadius: 
            fileds: [],
            _rows: [],
            style: {

            }
        }
    }



    // setSource(source) {
    //     this._source = source
    //     this.update();
    // }

    // setStyle() {

    // }

    update(filedsRow, lonIndex, latIndex) {
        // this.destroy();          
        const data = [];
        if (filedsRow.type == "row") {
            if (lonIndex < 0 || latIndex < 0) {
                this.errorMsg = "请选择经纬度数据键值"
                return;
            }

            filedsRow.values.map(row => {  //row:[1,2,"geo","bob",5]
                data.push({
                    geometry: {
                        type: "Point",
                        coordinates: [row[lonIndex], row[latIndex]]   //[1,2]
                    },
                    count: 30 * Math.random(),
                    time: 100 * Math.random()
                });
            })
        } else if (filedsRow.type == "geojson") {
            if (lonIndex < 0 || latIndex < 0) {
                this.errorMsg = "请选择经纬度数据键值"
                return;
            }
            
            if ((typeof filedsRow.values[0][0][0] )== "object") {
                 alert("该数据暂不支持此可视化方式"); 
                return;
            } else {
                filedsRow.values.map(row => {  //[[1,2],"two","tree",4,5]
                    data.push({
                        geometry: {
                            type: "Point",
                            coordinates: row[0]
                        },
                        count: 30 * Math.random(),
                        time: 100 * Math.random()
                    });
                })
            }
        }


        const options = {
            size: 13,
            gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)" },
            max: 60,
            // animation: {
            //     type: "time",
            //     stepsRange: {
            //         start: 0,
            //         end: 100
            //     },
            //     trails: 10,
            //     duration: 4
            // },
            draw: "heatmap"
        };
        this._visLayer = new MapVLayerProvider(earth, new mapV.DataSet(data), options, null);
    }

    destroy() {
        if (this._visLayer) {
            this._visLayer.destroy();
        }
    }
}
export default HeatMap;

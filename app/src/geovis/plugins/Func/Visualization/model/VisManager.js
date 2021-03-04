import { processCSV, processJson, processGeojson } from "./data/processor.js";
import  HeatMap  from "./layer/HeatMap.js";
import Multipolygon from "./layer/Multipolygon.js";
import { aimPos,visualData } from "./data/data.js";
let _filedsRow={};  //盛放key，value
class VisManager{
    constructor(){
        this.state = {
            // layers: [], // heatmap grid hex  ViewModel
            dataName: "null 未添加数据",
            dataStyle: {},
            // _filedsRow:{},
            visualImageSrc:"./images/visual/heat.png",
            visualImageName:"热力图",
        }
    }
    visualImage(data) {
        this.state.visualImageSrc = data.src;
        this.state.visualImageName = data.title;
        const visualName = [data.title];
        this.createLayer(visualName,data.aimPos[0].index,data.aimPos[1].index);
        this.layeImageChange();
      }

    createLayer(visualName,lonIndex,latIndex){
      
       this.destroy();
       this._layers=[];
       visualName.map(visualName=>{
        if(visualName == "多边形"){  
             const layer= new Multipolygon();
             layer.update(_filedsRow,lonIndex,latIndex);
             this._layers.push(layer);
        }
        if(visualName=="热力图"){
             const layer= new HeatMap();
            layer.update(_filedsRow,lonIndex,latIndex);
            this._layers.push(layer);
        }
       })
    }
  
      fileChange(name) {
        //当导入数据集改变时
        this.state.dataName = name + "数据集>";
       
        const format = name.split(".")[1];
        fetch("./static/data/visdata/" + name)
          .then(res => {
            if (format == "csv") {
              return res.text();
            } else {
              return res.json();
            }
          })
          .then(res => {
              let visualName =[];
            if (format == "csv") {
              const { keys, values } = processCSV(res);
              this.state.dataStyle = { format: ["point"], keys: keys};
               _filedsRow = { type:"row",format: ["point"], keys: keys, values: values  };
               visualName = ["热力图"];
            } else if (format == "json") {
              const { keys, values } = processJson(res);
              this.state.dataStyle = { format: ["point"], keys: keys};
               _filedsRow = { type:"row",format: ["point"], keys: keys, values: values  };
               visualName = ["热力图"];
            } else {
              const formats = [];
              let judge = true;
              res.features.map(data => {
                const type = data.geometry.type;
                formats.map(ele => {
                  if (ele == type) {
                    judge = false;
                    return;
                  }
                });
                if (judge) {
                  formats.push(data.geometry.type);
                }
              });
              const { keys, values } = processGeojson(res);
              this.state.dataStyle = { "format": formats, "keys": keys  }; //["Multipolygon"]
               _filedsRow = {"type":"geojson", "format": formats, "keys": keys, "values": values};
             formats.map(data=>{
                 if(data=="MultiPolygon"){
                     visualName.push("多边形");
                 }
                 if(data=="Point"){
                     visualName.push("热力图")
                 }
             })
            }
            this.changeImage(visualName);
            this.createLayer( visualName,0,0 );
        });
       }

       changeImage(visualName){  //当初始化导入文件时，检测默认的可视化类型（热力图还是多边形）
        this.state.visualImageName = visualName[0];
        visualData.map(val=>{
           if(val.title==visualName[0]){
            this.state.visualImageSrc = val.src;
           }
       })
       }

       destroy() {
        if (this._layers) {
            this._layers.map(layer=>{
                 layer.destroy();
            }) 
       }
   }
   layeImageChange(){

   }

}
const visManager = new VisManager();
export default  visManager;
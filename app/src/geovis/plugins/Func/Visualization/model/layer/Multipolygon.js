import  {visualData} from "../data/data.js";
class Multipolygon{
    constructor(){
        this.state={
              
        }
    }

    update(filedsRow,lonIndex,latIndex) {
      let styleData;
        visualData.map(visual=>{
            if(visual.title =="多边形"){
                styleData =visual;
                return
            }
        })
        let fillcolor,outlinecolor,outlineWidth;
        console.log(styleData);
    styleData.values.map(val=>{
    // alert("ggg")
     if(val.key=="fillcolor"){
        // alert(val.value)
          fillcolor = GeoVis.Color.fromCssString(val.value).withAlpha(0.5);
          
     }
     if(val.key=="outlinecolor"){
          outlinecolor= GeoVis.Color.fromCssString(val.value).withAlpha(0.5);
     }
     if(val.key=="outlineWidth"){
           outlineWidth =val.value;
     }
 })
        
       
         this._layerArr=[];
         filedsRow.values.map(row => {
           this._polygon= new GeoVis.Polygon(row[0], {
                outline: true,
                outlineColor: outlinecolor,
                fill: true,
                fillColor: fillcolor,
                extrudedHeight: 10,
                outlineWidth: outlineWidth
              }).addTo(earth.features);
              this._layerArr.push(this._polygon);
        })  
    }
    destroy() {
        if (this._polygon) {
            this._layerArr.map(maps=>{
                maps.removeFrom(earth.features);
            })
       }
   }
}
export default Multipolygon;
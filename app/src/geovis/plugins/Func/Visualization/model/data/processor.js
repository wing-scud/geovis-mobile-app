export function processCSV(res){
       const str = res;   //text = res
       const arr=str.split('\n');
       const fields=arr[0].split(','); //["lan","lat"]

       const rows = [];
       arr.splice(0,1);
        arr.map((row)=>{
           const line= row.split(',');
           line.map((data,index)=>{
             line[index] = Number(data);
           });
           rows.push(line); // [[],[],[]]
       })
       const keys=fields;
       const values=rows;
       return {keys,values}; 
} 

export function processJson(res){
       const fields=[];
        for(const index in res[0]){
            fields.push(index); //["lan","lat"]
        };
        const rows=[];
        res.map(data=>{
            const line=[];
            for(const index in data){
                line.push(data[index]); //[]
            };
            rows.push(line);//[[],[],[]]
        })
        const keys=fields;
        const values=rows;
        return {keys,values};
}
 
export function processGeojson(data){
      const normalize = require('@mapbox/geojson-normalize');
    const normalizedGeojson = normalize(data);
    if(!normalizedGeojson || !Array.isArray(normalizedGeojson.features)){
        const error = new Error(
            'Read File Failed: File is not valid GeoJSON.'
        );
        throw error;
    }
    const allDataRows = [];
    for(let i = 0;i<normalizedGeojson.features.length;i++){
        const f= normalizedGeojson.features[i];
        if(f.geometry){
            allDataRows.push({
                _geojson:f,
                ...(f.properties||{})
            })
        }
    }

const fields = allDataRows.reduce((prev,curr)=>{
        Object.keys(curr).forEach(key=>{
            if(!prev.includes(key)){
                prev.push(key);
            }
        })
        return prev;
    },[]);

    allDataRows.forEach(d=>{
        fields.forEach(f=>{
            if(!(f in d)){
                d[f] = null;
                d._geojson.properties[f] = null;
            }
        })
    })
  //  return processRowObject(allDataRows);
    //    let keys,values;
    // return {keys,values} = processJson(allDataRows);
  const {keys,values} = processJson(allDataRows);
    values.map((val,index)=>{
      //  values[index]=val[0].geometry.coordinates;    
        let arr = val[0].geometry.coordinates;
        while(arr.length<=1){
            arr=arr[0];
        }
        values[index][0] = arr;
    })
     return {keys,values};
}



// function computed(){
//     //处理csv:
//     fetch('./static/data/visdata/heatmap.csv').then(res=>{
//         return  res.text();
//     }).then(res=>{
//         const {keys,values} = processCSV(res);
//         console.log("我是csv keys",keys);
//         console.log("我是csv values",values);
//     })

//     //处理json:
//     fetch('./static/data/visdata/trail_09258B6F.json').then(res=>{
//         return res.json();
//     }).then(res=>{  
//        const {keys,values} = processJson(res);
//        console.log("我是json keys",keys);
//        console.log("我是json values",values);
//     })
   
//     //处理geojson:world-ports  islands
//     fetch('./static/data/visdata/islands.geojson').then(res=>{
//         return res.json();
//     }).then(data=>{
//         const {keys,values} = processGeojson(data);
//         console.log("我是geojson keys",keys);
//         console.log("我是geojson values",values);
//     })
// }

// computed();
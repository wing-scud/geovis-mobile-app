import GeoJSONSource from "./GeoJSONSource";
import RowSource from "./RowSource";

// 目前面向 json、csv、geojson三类数据
// 输出 RowSource、GeoJSON两个数据类型

/*
lon,lat,a,b,c
120,30,1,1,1
110,40,2,2,2
*/
export function processCSV(text) {
  //....
  const fields = ["lon", "lat", "a", "b", "c"];
  const rows = [
    [120, 30, 1, 1, 1],
    [110, 40, 2, 2, 2]
  ]; //
  return new RowSource();
}

export function processJson() {
  //....
  const feilds = [];
  const rows = []; //
  return new RowSource();
}

export function processGeoJSON() {
  return new GeoJSONSource();
}

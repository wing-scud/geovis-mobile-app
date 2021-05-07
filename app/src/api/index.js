
import "./atelier/lifecycle"
import file from "./atelier/file"
import mapLocation from "./atelier/location"
import database from "./db/localforage.js"
import  Vue from "vue"
/* 服务器   
    账户 root@49.234.121.120 
    密码 Iecas1234!@#$ 
    端口 8091
*/
window.plugin = {
    file,
    mapLocation,
    database
}

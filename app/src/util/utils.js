import uuid from "uuid"
import mime from "mime"
function fetchByToken(address, token, options) {
    token = `Bearer ${token}`;
    return fetch(address, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(options)
    }).then((res) => res.json())
}
function fetchFileByToken(address, token, options) {
    token = `Bearer ${token}`;
    return fetch(address, {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(options)
    }).then((res) => res.blob())
}
function fetchForJson(address, options) {
    return fetch(address, {
        method: "POST",
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(options)
    }).then((res) => {            // 保存cookie
        return res.json()
    })
}
function fetchFromFormDataByToken(address, token, formData) {
    token = `Bearer ${token}`;
    return fetch(address, {
        method: "POST",
        mode: 'cors',
        headers: new Headers({
            // 'Content-Type': 'multipart/form-data',
            'Authorization': token
        }),
        body: formData
    }).then((res) => {            // 保存cookie
        return res.json()
    })
}
function generateRouteId(route) {
    // const {start,end,wawypoints,way,routes};
    return uuid.v1()
}
function getFileSuffix(fileName) {
    const array = fileName.split('.')
    return "." + array[array.length - 1]
}
/**
 * 默认路径为 /a/b
 * @param {*} fullPath 
 * @returns 
 */
function resolveFullPath(fullPath) {
    let splitSymbol = fullPath.includes('/');
    splitSymbol = splitSymbol ? '/' : "\\"
    const splitArray = fullPath.split(splitSymbol);
    const fileName = splitArray[splitArray.length - 1];

    const path = splitArray.slice(1, splitArray.length - 1).join('/');
    return { path, fileName }
}
function linearRangeNumber(start, end, number) {
    const array = [];
    for (let i = 0; i < number; i++) {
        array.push(start + (end - start) / number * i);
    }
    return array
}
function getFileSuffixByMime(mimeString) {
    return "." + mime.getExtension(mimeString)
}

function getDataType(data) {
    // let type= "Blob";
    // 基本数据类型判断，均转为string
    const type = Object.prototype.toString.call(data).split(" ")[1].split("]")[0]
    if (["String", "Number", "Boolean", "Undefined", "Null"].includes(type)) {
        return "string"
    }
    if(type ==="Blob"){
        return "Blob"
    }
}
export { resolveFullPath, fetchByToken, generateRouteId, fetchForJson, fetchFileByToken, 
    getFileSuffix, fetchFromFormDataByToken, linearRangeNumber, getFileSuffixByMime,getDataType }
import uuid from "uuid"
import mime from "mime"
function judgeInstanceof(value) {
    const result = Object.prototype.toString.call(value)
    return result.split(" ")[1].split("]")[0];
}
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
function fetchByFormDataByToken(address, token, options) {
    const formData = new FormData();
    Object.keys(options).map((key) => {
        const value = options[key];
        const type = judgeInstanceof(value)
        if (type === "Array") {
            value.forEach((item) => {
                formData.append(key, item)
            })
        } else if (type === "Object") {
            // formData.append(key, value)
            Object.keys(value).forEach((childKey) => {
                formData.append(childKey, value[childKey])
            })
        }
        else {
            formData.append(key, value)
        }
    })
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
function generateId(route) {
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

function formateDate(date, fmt) {
    fmt || (fmt = "yyyy-MM-dd hh:mm:ss");
    const o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (const k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
}
function getDataType(data) {
    // let type= "Blob";
    // 基本数据类型判断，均转为string
    const type = Object.prototype.toString.call(data).split(" ")[1].split("]")[0]
    if (["String", "Number", "Boolean", "Undefined", "Null"].includes(type)) {
        return "string"
    }
    if (type === "Blob") {
        return "Blob"

    }
}

async function getLocalPreview(path) {
    const filePlugin = window["plugin"].file;
    const file = await filePlugin.readFile(path);
    if (file.type.includes('image')) {
        return await filePlugin.readBlob(file, file.type);
    } else {
        return null;
    }
}


function deepProxy(obj, cb, keys) {
    if (!keys) {
        keys = []
    }
    if (typeof obj === "object") {
        for (const key in obj) {
            const newArray = [...keys]
            newArray.push(key);
            if (typeof obj[key] === "object" && !(obj[key] instanceof Blob)) {
                obj[key] = deepProxy(obj[key], cb, newArray);
            }
        }

    }

    return new Proxy(obj, {

        /**
         * @param {Object, Array} target 设置值的对象
         * @param {String} key 属性
         * @param {any} value 值
         * @param {Object} receiver this
         */
        set: function (target, key, value, receiver) {
            if (typeof value === "object" && !(value instanceof Blob) && (key !== "__proto__")) {
                keys.push(key);
                value = deepProxy(value, cb, keys);
            }
            const cbType = target[key] == undefined ? "create" : "modify";
            //排除数组修改length回调
            if (!(Array.isArray(target) && key === "length") && key !== "__proto__") {
                cb(cbType, { target, key, value, parent: keys });
            }
            return Reflect.set(target, key, value, receiver);

        },
        deleteProperty(target, key) {
            cb("delete", { target, key });
            return Reflect.deleteProperty(target, key);
        }

    });

}
function deepCopy(target) {
    const copyedObjs = []; //此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
    function _deepCopy(target) {
        if (typeof target !== "object" || !target) {
            return target;
        }
        for (let i = 0; i < copyedObjs.length; i++) {
            if (copyedObjs[i].target === target) {
                return copyedObjs[i].copyTarget;
            }
        }
        let obj = {};
        if (Array.isArray(target)) {
            obj = []; //处理target是数组的情况
        }
        copyedObjs.push({ target: target, copyTarget: obj });
        Object.keys(target).forEach(key => {
            if (obj[key]) {
                return;
            }
            obj[key] = _deepCopy(target[key]);
        });
        return obj;
    }
    return _deepCopy(target);
}
export {
    resolveFullPath, fetchByToken, generateId, fetchForJson, fetchFileByToken,
    getFileSuffix, fetchByFormDataByToken, linearRangeNumber, getFileSuffixByMime,
    getDataType, formateDate, getLocalPreview, deepProxy, deepCopy
}
/**
 * 离线模式 
 * service worker ，本地不做存储
 */
import store from "../../store/index.js"
import database from "../db/localforage.js"
import file from "./file"
const createdHandle = async function () {
    console.log("created");
    //联网更新，如果联网不成功则读取本地
    const user = await database.userTable.getItem("user");
    if (user && user.rememberMe) {
        store.commit("user/initUser", user);
    } else {
        console.log("需要登录 ");
    }
}
const loginHandle = async function () {
    console.log('login');
    file.initUserEntry(store.state.user.user.account).then(() => {
        store.dispatch('trails/getList');
        store.dispatch('gisInfos/getList');
        store.dispatch('starPlaces/getList');
        store.dispatch('starRoutes/getList')
    })
}

const loginOutHandle = function () {
    console.log('loginOut')
    file.destroyUserEntry();
}

const onlineHandle = function () {
    console.log('online')
}

const offlineHandle = function () {
    console.log('offline')
}
const destroyHandle = function () {
    console.log('destroy');
    window.removeEventListener('created', createdHandle)
    window.removeEventListener('login', loginHandle)
    window.removeEventListener('loginOut', loginOutHandle)
    window.removeEventListener('destroy', destroyHandle)
    window.removeEventListener('online', onlineHandle);
    window.removeEventListener('offline', offlineHandle);
}
window.addEventListener('created', createdHandle);
window.addEventListener('login', loginHandle);
window.addEventListener('loginOut', loginOutHandle);
window.addEventListener('destroy', destroyHandle);
window.addEventListener('online', onlineHandle);
window.addEventListener('offline', offlineHandle);
import uuid from "uuid"
import User, { validUser } from "../../api/db/table/User";
import { fetchByToken, fetchFileByToken, getFileSuffixByMime, generateId, getFileSuffix, fetchFromFormDataByToken } from "@/util/utils.js"
const SERVER_ROOT = window['sceneData'].SERVER_ROOT;
const editGisInfoUrl = SERVER_ROOT + "/conserve/editGisInfo";
const LocalFilePath = "/gisInfos/";
const state = () => ({
    gisInfos: []
});

// getters
const getters = {};

// actions
const actions = {
    submit({ commit }, options) {
        debugger
        const database = window['plugin'].database;
        const filePlugin = window['plugin'].file;
        const local = options.local;
        // local表示是否上传服务器
        options.type = "add"
        //@ts-ignore
        const token = this.state.user.user.token;
        return new Promise((resolve, reject) => {
            // fetchFromFormDataByToken(editGisInfoUrl, token, options).then(async (data) => {

            // if (data.success) {
            //@ts-ignore
            const fileList = options.fileList;
            fileList.map((item) => {
                const fullPath = LocalFilePath + generateId + getFileSuffixByMime(item.file.type)
                filePlugin.writeFile(fullPath, item.file, { create: true })
            })
            commit("addGisInfo", options);
            resolve(true)
            // } else {
            //     reject(false)
            // }
            // })
        });
    },
    remove({ state, commit }) {
        const token = state.user.token;
        return fetchByToken(editGisInfoUrl, token).then((result) => {
            if (result.success) {
                commit("removeGisInfo");
                return true
            } else {
                return false
            }
        })
    },
    // edit({ state, commit }, changedValues) {
    //     const token = state.user.token;
    //     const database = window['plugin'].database
    //     return new Promise((resolve, reject) => {
    //         //验证user 是否正确
    //         // const res = validUser(changedValues);
    //         const res = {
    //             status: "ok",
    //             error: false,
    //         }
    //         const filePlugin = window['plugin'].file;
    //         if (res.status) {
    //             //如果是图像
    //             if (changedValues.type === "profilePhoto") {
    //                 // 上传 服务器更新
    //                 const formData = new FormData();
    //                 formData.append('profilePhoto', changedValues.value)
    //                 fetchFromFormDataByToken(setProfilePhotoUrl, token, formData).then((result) => {
    //                     if (result.success) {
    //                         //本地更新
    //                         const profilePhotoFileName = generateId() + getFileSuffix(changedValues.value.name);
    //                         const filePath = profilePhotoBaseDir + profilePhotoFileName
    //                         filePlugin.writeFile(filePath, changedValues.value, { create: true }).then(() => {
    //                             changedValues.value = filePath;
    //                             commit('changeUser', changedValues);
    //                             const user = state.user;
    //                             if (user.rememberMe) {
    //                                 database.userTable.setItem('user', user).then((user) => {
    //                                     console.log(' database.userTable.setItem user')
    //                                     resolve(true)
    //                                 })
    //                             } else {
    //                                 resolve(true)
    //                             }
    //                         });
    //                     }
    //                 });

    //             } else {
    //                 // 上传 服务器更新
    //                 //本地更新
    //                 commit('changeUser', changedValues);
    //                 const user = state.user;
    //                 if (user.rememberMe) {
    //                     database.userTable.setItem('user', user).then((user) => {
    //                         console.log(' database.userTable.setItem user')
    //                         resolve({ status: true })
    //                     })
    //                 } else {
    //                     resolve({ status: true })
    //                 }

    //             }
    //         } else {
    //             resolve({ status: false, error: res.error })
    //         }
    //     })
    // }
};

// mutations
const mutations = {
    findById(state, id) {
        return state.gisInfos.findIndex((gisInfo) => gisInfo.id === id)
    },
    addGisInfo(state, gisInfo) {
        state.gisInfos.push(gisInfo);
    },
    removeGisInfo(state, id) {
        const gisInfos = state.gisInfos;
        state.gisInfos.splice(gisInfos.findById(state, id), 1);
    },
    /*
      options:new Map(key,value); 
     */
    changeGisInfo(state, changedValues) {
        state.gisInfos[changedValues.type] = changedValues.value;
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

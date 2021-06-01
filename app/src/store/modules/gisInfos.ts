// 每个table对应一个 account？
import { fetchByToken, fetchFileByToken, formateDate, getFileSuffixByMime, generateId, getFileSuffix, fetchByFormDataByToken } from "@/util/utils.js"
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
        const database = window['plugin'].database;
        const filePlugin = window['plugin'].file;
        // local表示是否上传服务器
        const local = options.local;
        const id = generateId();
        options.id = id;
        options.type = "add";
        options.createTime = formateDate(new Date());
        //@ts-ignore
        const token = this.state.user.user.token;
        return new Promise((resolve) => {
            fetchByFormDataByToken(editGisInfoUrl, token, options).then(async (data) => {
                if (data.success) {
                    // 保存到本地
                    const fileList = options.fileList;
                    fileList.map((file, index) => {
                        const fullPath = LocalFilePath + generateId() + getFileSuffixByMime(file.type)
                        filePlugin.writeFile(fullPath, file, { create: true });
                        options.fileList[index] = fullPath
                    })
                    // 添加的数据库
                    database.gisInfos.setItem(id, options).then(() => {
                        commit("add", options);
                        resolve(true)
                    })
                } else {
                    resolve(false)
                }
            })
        });
    },
    remove({ state, commit }, id) {
        //@ts-ignore
        const token = this.state.user.user.token;
        return new Promise((resolve) => {
            fetchByToken(editGisInfoUrl, token, { id, type: 'remove' }).then((result) => {
                if (result.success) {
                    const database = window['plugin'].database;
                    database.gisInfo.removeItem(id).then(() => {
                        commit("remove");
                        resolve(true)
                    });
                } else {
                    resolve(true)
                }
            })
        })
    },
    /**
     * edit 可能同时编辑多个
     * @param param0 
     * @param options { attributes:[], data:[]}
     * @returns 
     */
    edit({ state, commit }, options) {
        //@ts-ignore
        const token = this.state.user.user.token;
        const database = window['plugin'].database
        return new Promise((resolve) => {
            const filePlugin = window['plugin'].file;
            const id = options.id;
            options.type = "edit"
            fetchByToken(editGisInfoUrl, token, options).then(async (result) => {
                if (result.success) {
                    const gisInfo = database.gisInfos.getItem(id);
                    const data = options.data;
                    options.attributes.forEach((attribute, index) => {
                        //文件
                        if (attribute === "fileList") {
                            data.forEach(async (item, index) => {
                                const fullPath = LocalFilePath + generateId + getFileSuffixByMime(item.file.type)
                                await filePlugin.writeFile(fullPath, item.file, { create: true });
                                data.fileList[index] = fullPath
                            })
                            gisInfo.fileList.forEach((item, index) => {
                                filePlugin.removeFile(item);
                            });
                            gisInfo.fileList = data.fileList;
                            // commit
                        } else {
                            gisInfo[attribute] = options.data[index]
                        }
                    })
                    await database.gisInfos.setItem(id, gisInfo)
                    commit('edit', gisInfo)
                } else {
                    resolve(false)
                }
            })
        })
    },

    getList({ state, commit }) {
        //@ts-ignore
        const token = this.state.user.user.token;
        return new Promise((resolve) => {
            const database = window['plugin'].database;
            const filePlugin = window['plugin'].file;
            fetchByToken(editGisInfoUrl, token, { type: "getList" }).then((result) => {
                if (result.success) {
                    const data = result.data;
                    data.forEach(async (item) => {
                        const gisInfo = item.info;
                        const id = item.id;
                        const fileNameList = gisInfo.fileList;
                        gisInfo.id = id;
                        const localBool = await database.gisInfos.getItem(id);
                        if (!localBool) {
                            const promises = fileNameList.map(async (fileName, index) => {
                                return await fetchFileByToken(editGisInfoUrl, token, { type: 'getFile', fileName }).then(async (blob) => {
                                    const fullPath = LocalFilePath + fileName
                                    await filePlugin.writeFile(fullPath, blob, { create: true });
                                    return fullPath;
                                })
                            })
                            Promise.all(promises).then(async (filePathList) => {
                                gisInfo.fileList = filePathList;
                                await database.gisInfos.setItem(id, gisInfo)
                                commit('add', gisInfo)
                            })
                        } else {
                            const gisInfo = await database.gisInfos.getItem(id);
                            commit('add', gisInfo)
                        }
                    })
                } else {
                    resolve(false)
                }
            })
        })
    }
};

// mutations
const mutations = {
    findById(state, id) {
        return state.gisInfos.findIndex((gisInfo) => gisInfo.id === id)
    },
    add(state, gisInfo) {
        state.gisInfos.push(gisInfo);
    },
    removeGisInfo(state, id) {
        const gisInfos = state.gisInfos;
        state.gisInfos.splice(gisInfos.findById(state, id), 1);
    },
    /*
      options:new Map(key,value); 
     */
    change(state, options) {
        const gisInfos = state.gisInfos;
        const gisInfo = gisInfos.findById(state, options.id)
        options.attributes.forEach((attribute, index) => {
            gisInfo[attribute] = options.data[index];
        });
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};

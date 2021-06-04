// 每个table对应一个 account？
import { fetchByToken, fetchFileByToken, formateDate, getFileSuffixByMime, generateId, getFileSuffix, fetchByFormDataByToken, fetchForJson } from "@/util/utils.js"
import { GridItem } from "vant";
const SERVER_ROOT = window['sceneData'].SERVER_ROOT;
const editGisInfoUrl = SERVER_ROOT + "/conserve/editGisInfo";
const LocalFilePath = "/gisInfos/";
const state = () => ({
    gisInfos: []
});
// getters
const getters = {
    getById: (state) => (id) => {
        const gisInfos = state.gisInfos;
        const index = gisInfos.findIndex((item) => item.id === id)
        return state.gisInfos[index]
    }
};
// actions
const actions = {
    upload({ commit }, options) {
        const database = window['plugin'].database;
        const filePlugin = window['plugin'].file;
        const id = generateId();
        options.id = id;
        options.type = "add";
        options.createTime = formateDate(new Date());
        //@ts-ignore
        const token = this.state.user.user.token;
        return new Promise((resolve) => {
            fetchByFormDataByToken(editGisInfoUrl, token, options).then(async (result) => {
                if (result.success) {
                    const data = result.data;
                    // 保存到本地
                    const files = options.fileList;
                    const id = data.id;
                    const promises = data.fileList.map((item, index) => {
                        const file = files[index]
                        const storageName = generateId() + getFileSuffixByMime(file.type)
                        const fullPath = LocalFilePath + storageName
                        filePlugin.writeFile(fullPath, file, { create: true });
                        item.storageName = storageName;
                        item.fullPath = fullPath;
                        item.content = file.type.includes('image') ? window.URL.createObjectURL(file) : null
                        return item;
                    })
                    // 添加的数据库
                    data.fileList = await Promise.all(promises)
                    commit("add", data);
                    result.id = id;
                    resolve(result)
                } else {
                    resolve(result)
                }
            })
        });
    },
    remove({ state, commit, getter }, id) {
        //@ts-ignore
        const token = this.state.user.user.token;
        return new Promise((resolve) => {
            fetchByToken(editGisInfoUrl, token, { id, type: 'remove' }).then(async (result) => {
                if (result.success) {
                    const database = window['plugin'].database;
                    const fileList = getter['getById'](id).fileList;
                    const promises = fileList.map((fileName) => {
                        // 文件也应该删除
                        return database.fileTable.removeItem(fileName)
                    })
                    await promises && (commit("remove", id),
                        resolve(true))
                } else {
                    resolve(false)
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
    edit({ state, commit, getters }, options) {
        //@ts-ignore
        const token = this.state.user.user.token;
        const database = window['plugin'].database
        return new Promise((resolve) => {
            const filePlugin = window['plugin'].file;
            const id = options.id;
            options.type = "edit";
            fetchByFormDataByToken(editGisInfoUrl, token, options).then(async (result) => {
                if (result.success) {
                    const updatedInfo = result.data;
                    const originInfo = getters['getById'](id);
                    // attribute string 更新
                    const files = options.fileList;
                    //fileList 更新
                    const promises = updatedInfo.fileList.map((updatedItem, index) => {
                        const exist = originInfo.fileList.find((item) => item.id === updatedItem.id);
                        if (exist) {
                            updatedItem = exist
                        } else {
                            const file = files.find((file) => updatedItem.fileName === file.name)
                            const storageName = generateId() + getFileSuffixByMime(file.type)
                            const fullPath = LocalFilePath + storageName
                            filePlugin.writeFile(fullPath, file, { create: true });
                            updatedItem.storageName = storageName;
                            updatedItem.fullPath = fullPath;
                            updatedItem.content = file.type.includes('image') ? window.URL.createObjectURL(file) : null
                        }
                        return updatedItem;
                    })
                    // 添加的数据库
                    updatedInfo.fileList = await Promise.all(promises)
                    commit("change", updatedInfo);
                    resolve(result)
                } else {
                    resolve(result)
                }
            })
        })
    },
    getList({ state, commit }) {
        //@ts-ignore
        const token = this.state.user.user.token;
        return new Promise((resolve) => {
            const filePlugin = window['plugin'].file;
            fetchByToken(editGisInfoUrl, token, { type: "getList" }).then((result) => {
                if (result.success) {
                    const infoArray = result.data;
                    infoArray.forEach(async (gisInfo) => {
                        const id = gisInfo.id;
                        const serverFileList = gisInfo.fileList;
                        const promises = serverFileList.map(async (item, index) => {
                            const blob = await fetchFileByToken(editGisInfoUrl, token, { type: 'getFile', fileId: item.id, id: id })
                            const storageName = generateId() + getFileSuffixByMime(blob.type);
                            const fullPath = LocalFilePath + storageName;
                            await filePlugin.writeFile(fullPath, blob, { create: true });
                            const content = blob.type.includes('image') ? window.URL.createObjectURL(blob) : null
                            return {
                                storageName, fullPath, fileName: item.fileName,
                                id: item.id,
                                content: content
                            };
                        })
                        Promise.all(promises).then(async (localFileList) => {
                            gisInfo.fileList = localFileList;
                            commit('add', gisInfo)
                        })
                    })
                } else {
                    resolve(false)
                }
            })
        })
    },
    clear({ state, commit }) {
        const gisInfos = state.gisInfos;
        const filePlugin = window['plugin']['file']
        gisInfos.map((gisInfo) => {
            const fileList = gisInfo.fileList ?? [];
            const promises = fileList.map((item) => {
                const fullPath = item.fullPath;
                return filePlugin.removeFile(fullPath)
            })
            Promise.all(promises).then(() => {
                commit('remove', gisInfo.id)
            })
        })

    }
};

// mutations
const mutations = {
    add(state, options) {
        const gisInfo = {
            title: options.title,
            describe: options.describe,
            fileList: options.fileList,
            createTime: options.createTime,
            position: options.position,
            status: options.status,
            id: options.id
        }
        state.gisInfos.push(gisInfo);
    },
    remove(state, id) {
        const gisInfos = state.gisInfos;
        const index = gisInfos.findIndex((item) => item.id === id)
        state.gisInfos.splice(index, 1);
    },
    /*
      options:new Map(key,value); 
     */
    change(state, options) {
        const gisInfos = state.gisInfos;
        const index = gisInfos.findIndex((item) => item.id === options.id);
        const gisInfo = gisInfos[index];
        Object.keys(options).forEach((attribute, index) => {
            gisInfo[attribute] = options[attribute];
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

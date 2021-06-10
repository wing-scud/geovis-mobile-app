import { fetchByFormDataByToken, fetchByToken, fetchFileByToken, generateId, getFileSuffixByMime } from "@/util/utils.js"
const SERVER_ROOT = window['sceneData'].SERVER_ROOT;
const trailsAddress = SERVER_ROOT + "/conserve/editTrail"
const LocalFilePath = "/trails/";
/**
 * {
 * id
 * trail:{
 *       startTime:String
 *       trailTime:String ;
 *       distance,
 *       position:[]
 *      }
 * }
 */
const state = () => ({
  trails: []
});

// getters
const getters = {
  getById: (state) => (id) => {
    const trails = state.trails;
    const index = trails.findIndex((item) => item.id === id)
    return trails[index]
  }
};

// actions
const actions = {
  getList({ state, commit }) {
    const filePlugin = window['plugin'].file;
    //@ts-ignore
    const token = this.state.user.user.token;
    const promise = fetchByToken(trailsAddress, token, {
      type: "getList"
    })
    return promise.then((result) => {
      if (result.success) {
        const list = result.data;
        const promises = list.map(async (trail) => {
          const geojsonFile = await fetchFileByToken(trailsAddress, token, { id:trail.id,fileId: trail.geojsonFile.id, type: 'getFile' })
          const storageName = generateId() + getFileSuffixByMime(geojsonFile.type)
          const fullPath = LocalFilePath + storageName
          filePlugin.writeFile(fullPath, geojsonFile, { create: true });
          trail.geojsonFile = {
            storageName, fullPath, fileName: trail.geojsonFile.fileName
          }
          return trail;
        })
        return Promise.all(promises).then((trails) => {
          trails.forEach((trail) => {
            commit('addTrail', trail)
          })
          return {
            success: true,
          };
        })
      } else {
        return result;
      }
    })
  },
  add({ state, commit }, options) {
    const filePlugin = window['plugin'].file;
    const token = this.state.user.user.token;
    options.type = "add";
    const storageName = generateId() + ".json"
    const geojsonFile = new File([JSON.stringify(options.geojson)], storageName, { type: "application/json", });
    delete options.geojson;
    options.geojsonFile = geojsonFile
    const promise = fetchByFormDataByToken(trailsAddress, token, options)
    return promise.then(async (result) => {
      if (result.success) {
        const trail = result.data;
        const fullPath = LocalFilePath + storageName
        filePlugin.writeFile(fullPath, geojsonFile, { create: true });
        trail.geojsonFile = {
          storageName, fullPath
        }
        commit('addTrail', trail)
      }
      return result;
    })
  },
  remove({ state, commit }, id) {
    //@ts-ignore
    const token = this.state.user.user.token;
    const promise = fetchByToken(trailsAddress, token, {
      type: "remove",
      id: id
    })
    return promise.then((result) => {
      if (result.success) {
        commit('removeTrail', id)
        return {
          success: true,
        };
      } else {
        return result;
      }
    })
  }
}
// mutations
const mutations = {
  addTrail(state, options) {
    state.trails.push(
      options
    );
  },
  removeTrail(state, id) {
    const trails = state.trails;
    const index = trails.findIndex((item) => item.id === id)
    state.trails.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

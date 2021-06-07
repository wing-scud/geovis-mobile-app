import { fetchByToken } from "@/util/utils.js"
const SERVER_ROOT = window['sceneData'].SERVER_ROOT;
const trailsAddress = SERVER_ROOT + "/conserve/editTrail"
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
    return index
  }
};

// actions
const actions = {
  getList({ state, commit }) {
    const token = this.state.user.user.token;
    const promise = fetchByToken(trailsAddress, token, {})
    return promise.then((result) => {
      if (result.success) {
        const list = result.data;
        list.forEach((item) => {
          commit('addTrail', { place: item.place, id: item.id })
        })
        return {
          success: true,
        };
      } else {
        return result;
      }
    })
  },
  save({ state, commit }, options) {
    const token = this.state.user.user.token;
    const { place, id } = options
    const promise = fetchByToken(trailsAddress, token, {
      type: "save",
      place: place,
      id: id
    })
    return promise.then((result) => {
      if (result.success) {
        commit('addTrail', { place: place, id: id })
        return {
          success: true,
        };
      } else {
        return result;
      }
    })
  },
  remove({ state, commit }, id) {
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
    const { id, place } = options;
    state.trails.push(
      {
        id,
        place
      }
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

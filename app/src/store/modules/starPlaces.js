import { fetchByToken } from "@/util/utils.js"
const SERVER_ROOT = window['sceneData'].SERVER_ROOT;
const starPlaceAddress = SERVER_ROOT + "/conserve/editStaredPlace"
/**
 * {
 * id
 * place:{
 *       name:String
 *       location:Array ;
 *      }
 * }
 * @returns 
 */
const state = () => ({
  places: []
});

// getters
const getters = {
  getById: (state) => (id) => {
    const places = state.places;
    const index = places.findIndex((item) => item.id === id)
    return index
  }
};

// actions
const actions = {
  getList({ state, commit }) {
    const token = this.state.user.user.token;
    const promise = fetchByToken(starPlaceAddress, token, {})
    return promise.then((result) => {
      if (result.success) {
        const list = result.data;
        list.forEach((item) => {
          commit('addPlace', { place: item.place, id: item.id })
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
    const promise = fetchByToken(starPlaceAddress, token, {
      type: "save",
      place: place,
      id: id
    })
    return promise.then((result) => {
      if (result.success) {
        commit('addPlace', { place: place, id: id })
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
    const promise = fetchByToken(starPlaceAddress, token, {
      type: "remove",
      id: id
    })
    return promise.then((result) => {
      if (result.success) {
        commit('removePlace', id)
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
  addPlace(state, options) {
    const { id, place } = options;
    state.places.push(
      {
        id,
        place
      }
    );
  },
  removePlace(state, id) {
    const places = state.places;
    const index = places.findIndex((item) => item.id === id)
    state.places.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

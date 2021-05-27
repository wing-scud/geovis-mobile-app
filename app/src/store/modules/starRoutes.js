import { fetchByToken, generateRouteId } from "@/util/utils.js"
const SERVER_ROOT = window['sceneData'].SERVER_ROOT;
const starRouteAddress = SERVER_ROOT + "/conserve/editStaredRoute"
const state = () => ({
  routes: []
});

// getters
const getters = {
  getById: (state) => (id) => {
    const routes = state.routes;
    const index = routes.findIndex((item) => item.id === id)
    return index
  }
};

// actions
const actions = {
  getList({ state, commit }) {
    const token = this.state.user.user.token;
    const promise = fetchByToken(starRouteAddress, token, {})
    return promise.then((result) => {
      if (result.success) {
        const list = result.data;
        list.forEach((item) => {
          commit('addRoute', { route: item.route, id: item.id })
        })
        return {
          success: true,
        };
      } else {
        return result;
      }
    })
  },
  save({ state, commit }, route) {
    const token = this.state.user.user.token;
    const id = generateRouteId(route);
    const promise = fetchByToken(starRouteAddress, token, {
      type: "save",
      route: route,
      id: id
    })
    return promise.then((result) => {
      if (result.success) {
        commit('addRoute', { route: route, id: id })
        return {
          success: true,
        };
      } else {
        return result;
      }
    })
  },
  remove({ state, commit }, id) {
    const token = state.user.token;
    const promise = fetchByToken(starRouteAddress, token, {
      type: "remove",
      id: id
    })
    return promise.then((result) => {
      if (result.success) {
        const id = result.data.id;
        commit('removeRoute', id)
        return {
          success: true,
        };
      } else {
        return result;
      }
    })
  }
};

// mutations
const mutations = {
  addRoute(state, options) {
    const { id, route } = options;
    state.routes.push(
      {
        id,
        route
      }
    );
  },
  removeRoute(state, id) {
    const routes = state.routes;
    const index = routes.findIndex((item) => item.id === id)
    state.routes.splice(index, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

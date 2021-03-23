const state = () => ({
  routes: []
});

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  addRoute(state, path) {
    state.routes.push(path);
  },
  deleteRoute(state, id) {
    const routeIndex = state.places.findIndex(path => path.id === id);
    state.routes.splice(routeIndex, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

const state = () => ({
  places: []
});

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  addPlace(state, place) {
    state.places.push(place);
  },
  deletePlace(state, id) {
    const placeIndex = state.places.findIndex(place => place.id === id);
    state.places.splice(placeIndex, 1);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

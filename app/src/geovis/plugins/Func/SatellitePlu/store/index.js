import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: [],
        selectedSate: [],
    }
})


export default store;
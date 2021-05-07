
import User, { validUser } from "../../api/db/table/User";
const SERVER_ROOT = window['SERVER_ROOT'];
const loginUrl = SERVER_ROOT + "/api/user/login";
const loginOutUrl = SERVER_ROOT + "/api/user/logout"
const database = window['plugin'].database
const state = () => ({
  user: undefined
});

// getters
const getters = {};

// actions
const actions = {
  login({ commit }, options) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      Object.keys(options).forEach((key) => {
        formData.append(key, options[key])
      })
      fetch(loginUrl, {
        method: "POST",
        mode: 'cors',
        body: formData
      }).then((res) => res.json())
        .then((data) => {
          if (data.status === 'ok') {
            //@ts-ignore
            const value = data.data;
            value.password = options.password;
            const user = new User(value);
            database.userTable.setItem('user', user).then((user) => {
              commit("initUser", user);
              resolve(true)
            })
          } else {
            reject(false)
          }
        })
    });
  },
  loginOut({commit }) {
    return new Promise((resolve, reject) => {
      fetch(loginOutUrl, {
        method: "POST",
        mode: 'cors',
      }).then((res) => res.json())
        .then((data) => {
          if (data.status === 'ok') {
            database.userTable.removeItem('user').then((user) => {
              commit("deleteUser");
              resolve(true)
            })
          } else {
            reject(false)
          }
        })
    })
  },
  changeUser({ state, commit }, changedValues) {
    return new Promise((resolve, reject) => {
      //验证user 是否正确
      // const res = validUser(changedValues);
      const res = {
        status: "ok",
        error: false,
      }
      if (res.status) {
        commit('changeUser', changedValues);
        const user = state.user;
        database.userTable.setItem('user', user).then((user) => {
          resolve({ status: true })
        })
      } else {
        resolve({ status: false, error: res.error })
      }
    })
  }
};

// mutations
const mutations = {
  initUser(state, user) {
    state.user = user;
  },
  deleteUser(state) {
    state.user = undefined;
  },
  /*
    options:new Map(key,value); 
   */
  changeUser(state, changedValues) {
    state.user[changedValues.type] = changedValues.value;
    console.log("change-user-" + changedValues.type, changedValues.value);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

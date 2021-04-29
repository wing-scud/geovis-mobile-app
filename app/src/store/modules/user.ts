
import User, { validUser } from "../../server/table/User";
const loginUrl = "http://49.234.121.120:8091/user/api/login"
const state = () => ({
  user: undefined
});

// getters
const getters = {};

// actions
const actions = {
  login({ context, commit }, options) {
    return new Promise((resolve, reject) => {
      //请求校验
      fetch(loginUrl, {
        method: "POST",
        mode: 'cors',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(options)
      }).then((res) => res.json()).then((data) => {
        if (data.status === 'ok') {
          //@ts-ignore
          const user = data.data;
          commit("initUser", user);
          resolve(true)
        } else {
          reject(false)
        }
      })
    });
  },
  loginOut({ context, commit }) {
    commit("deleteUser");
  },
  changeUser({ context, commit }, user) {
    return new Promise((resolve, reject) => {
      //验证user 是否正确
      const res = validUser(user)
      if (res.status) {
        commit('changeUser', user);
        resolve({ status: true })
      } else {
        resolve({ status: false, error: res.error })
      }
    })
  }
};

// mutations
const mutations = {
  initUser(state, user) {
    state.user = new User(user);
    console.log("add", user);
    const NativeStorage = window['NativeStorage'];
    //localstorge不能储存对象
    const string = JSON.stringify(state.user);
    console.log(string)
    NativeStorage.setItem('user', string)
  },
  deleteUser(state) {
    const NativeStorage = window['NativeStorage'];
    state.user = undefined;
    NativeStorage.remove('user')
  },
  changeUser(state, user) {
    state.user = user;
    console.log("change", user);
    const NativeStorage = window['NativeStorage'];
    //localstorge不能储存对象
    const string = JSON.stringify(state.user);
    console.log(string)
    NativeStorage.setItem('user', string)
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

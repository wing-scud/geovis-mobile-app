
import User, { validUser } from "../../api/db/table/User";
import { database } from "../../api/index"
const loginUrl = "http://49.234.121.120:8091/api/user/login"
const state = () => ({
  user: undefined
});

// getters
const getters = {};

// actions
const actions = {
  login({ context, commit }, options) {
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
    state.user = user;
  },
  deleteUser(state) {
    state.user = undefined;
  },
  changeUser(state, user) {
    state.user = user;
    console.log("change", user);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

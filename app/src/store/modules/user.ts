
import User, { validUser } from "../../api/db/table/User";
const SERVER_ROOT = window['sceneData'].SERVER_ROOT;
const loginUrl = SERVER_ROOT + "/api/user/login";
const loginOutUrl = SERVER_ROOT + "/api/user/logout"
const state = () => ({
  user: undefined
});

// getters
const getters = {};

// actions
const actions = {
  login({ commit }, options) {
    const database = window['plugin'].database
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      Object.keys(options).forEach((key) => {
        formData.append(key, options[key])
      })
      fetch(loginUrl, {
        method: "POST",
        mode: 'cors',
        credentials: "include",
        body: formData
      }).then((res) => res.json())
        .then((data) => {
          if (data.status === 'ok') {
            //@ts-ignore
            const value = data.data;
            value.password = options.password;
            value.rememberMe = options.rememberMe
            const user = new User(value);
            if (value.rememberMe) {
              database.userTable.setItem('user', user).then((user) => {
                commit("initUser", user);
                resolve(true)
              })
            } else {
              resolve(true)
            }
          } else {
            reject(false)
          }
        })
    });
  },
  loginOut({ commit }) {
    const database = window['plugin'].database
    return new Promise((resolve, reject) => {
      fetch(loginOutUrl, {
        method: "POST",
        mode: 'cors',
        credentials: 'include'
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
    const database = window['plugin'].database
    return new Promise((resolve, reject) => {
      //验证user 是否正确
      // const res = validUser(changedValues);
      const res = {
        status: "ok",
        error: false,
      }
      const filePlugin = window['plugin'].file;
      if (res.status) {
        //如果是图像
        if (changedValues.type === "avatar") {
          filePlugin.getRootDirEntry().then(async (rootEntry) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(changedValues.value);
            reader.onload = async (e) => {
              const blob = new Blob([e.target.result]);
              const mapDireEntry = await filePlugin.getDirectory(rootEntry, 'images', true);
              const fileName = changedValues.value.name;
              const fileEntry = await filePlugin.getFileEntry(mapDireEntry, fileName)
              await filePlugin.writeFile(fileEntry, blob, false);
              fileEntry.file((file) => {
                const filePath = window.URL.createObjectURL(file);
                changedValues.value = filePath;
                commit('changeUser', changedValues);
                const user = state.user;
                database.userTable.setItem('user', user).then((user) => {
                  console.log(' database.userTable.setItem user')
                  resolve({ status: true })
                })
              })
            }
          });
        } else {
          commit('changeUser', changedValues);
          const user = state.user;
          database.userTable.setItem('user', user).then((user) => {
            console.log(' database.userTable.setItem user')
            resolve({ status: true })
          })
        }
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

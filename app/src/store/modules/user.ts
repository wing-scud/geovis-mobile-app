import uuid from "uuid"
import User, { validUser } from "../../api/db/table/User";
import { fetchByToken, fetchForJson, fetchFileByToken, resolveFullPath, generateRouteId, getFileSuffix, fetchFromFormDataByToken } from "@/util/utils.js"
const SERVER_ROOT = window['sceneData'].SERVER_ROOT;
const loginUrl = SERVER_ROOT + "/user/login";
const loginOutUrl = SERVER_ROOT + "/user/loginOut";
const getProfilePhotoUrl = SERVER_ROOT + "/user/getProfilePhoto";
const setProfilePhotoUrl = SERVER_ROOT + "/user/setProfilePhoto";
const updateUserUrl = SERVER_ROOT + "/user/updateUserInfo";
const profilePhotoBaseDir = "/profilePhoto/"
const state = () => ({
  user: undefined
});

// getters
const getters = {};

// actions
const actions = {
  login({ commit }, options) {
    const database = window['plugin'].database;
    const filePlugin = window['plugin'].file;
    return new Promise((resolve, reject) => {
      fetchForJson(loginUrl, options).then(async (data) => {
        if (data.success) {
          //@ts-ignore
          const value = data.user;
          //不加密
          value.password = options.password;
          value.rememberMe = options.rememberMe;
          const profilePhotoFileName = resolveFullPath(value.profilePhoto).fileName;
          // 获取头像
          const token = value.token;
          fetchFileByToken(getProfilePhotoUrl, token).then(async (blob) => {
            const filePath = profilePhotoBaseDir + profilePhotoFileName
            await filePlugin.writeFileAsync(filePath, blob, { dirCreate: true, fileCreate: true });
            value.profilePhoto = filePath
            const user = new User(value);
            if (value.rememberMe) {
              await database.userTable.setItem('user', user)
            }
            commit("initUser", user);
            resolve(true)
          })
        } else {
          reject(false)
        }
      })
    });
  },
  loginOut({ state, commit }) {
    const token = state.user.token;
    return fetchByToken(loginOutUrl, token).then((result) => {
      if (result.success) {
        commit("deleteUser");
        return true
      } else {
        return false
      }
    })
  },
  changeUser({ state, commit }, changedValues) {
    const token = state.user.token;
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
        if (changedValues.type === "profilePhoto") {
          // 上传 服务器更新
          const formData = new FormData();
          formData.append('profilePhoto', changedValues.value)
          fetchFromFormDataByToken(setProfilePhotoUrl, token, formData).then((result) => {
            if (result.success) {
              //本地更新
              const profilePhotoFileName = generateRouteId() + getFileSuffix(changedValues.value.name);
              const filePath = profilePhotoBaseDir + profilePhotoFileName
              filePlugin.writeFileAsync(filePath, changedValues.value, { dirCreate: false, fileCreate: true }).then(() => {
                changedValues.value = filePath;
                commit('changeUser', changedValues);
                const user = state.user;
                if (user.rememberMe) {
                  database.userTable.setItem('user', user).then((user) => {
                    console.log(' database.userTable.setItem user')
                    resolve(true)
                  })
                } else {
                  resolve(true)
                }
              });
            }
          });

        } else {
          // 上传 服务器更新

          //本地更新
          commit('changeUser', changedValues);
          const user = state.user;
          if (user.rememberMe) {
            database.userTable.setItem('user', user).then((user) => {
              console.log(' database.userTable.setItem user')
              resolve({ status: true })
            })
          } else {
            resolve({ status: true })
          }

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
    const login = new Event("login");
    window.dispatchEvent(login);
  },
  deleteUser(state) {
    state.user = undefined;
    const loginOut = new Event("loginOut");
    window.dispatchEvent(loginOut);
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

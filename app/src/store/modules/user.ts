import uuid from "uuid"
import User, { validUser } from "../../api/db/table/User";
import { fetchByToken, fetchForJson, fetchFileByToken, resolveFullPath, generateId, getFileSuffix, fetchByFormDataByToken } from "@/util/utils.js"
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
            const filePath = profilePhotoBaseDir + profilePhotoFileName;
            await filePlugin.writeFile(filePath, blob, { create: true });
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
    const database = window['plugin'].database;
    const token = state.user.token;
    return fetchByToken(loginOutUrl, token).then(async (result) => {
      database.userTable.removeItem('user')
      commit("deleteUser");
      return true
    })
  },
  /**
   *  目前只能单项的修改用户信息
   * @param param0 
   * @param options 
   * @returns 
   */
  changeUser({ state, commit }, options) {
    const token = state.user.token;
    const database = window['plugin'].database
    return new Promise((resolve, reject) => {
      //验证user 是否正确
      // const res = validUser(options);
      const res = {
        status: "ok",
        error: false,
      }
      const filePlugin = window['plugin'].file;
      if (res.status) {
        //如果是图像
        if (options.attribute === "profilePhoto") {
          // 上传 服务器更新
          fetchByFormDataByToken(setProfilePhotoUrl, token, options.value).then((result) => {
            if (result.success) {
              //本地更新
              const profilePhotoFileName = generateId() + getFileSuffix(options.value.name);
              const filePath = profilePhotoBaseDir + profilePhotoFileName
              filePlugin.writeFile(filePath, options.value, { create: true }).then(() => {
                options.value = filePath;
                commit('changeUser', options);
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
          commit('changeUser', options);
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
  },
  clear({ state, commit }) {

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

  changeUser(state, options) {
    state.user[options.attribute] = options.value;
    console.log("change-user-" + options.attribute, options.value);
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

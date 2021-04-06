
import User from "../../server/table/User";
// import { connectDB, createTabel, addRow, customSql, readRow, removeRow, updateRow, closeDB } from "../../server/db.js";
const state = () => ({
  user: undefined
});

// getters
const getters = {};

// actions
const actions = {
  login({context,commit}, options) {
    return new Promise((resolve, reject) => {
      //请求校验
      const ok = true;
      const user ={name:options.name,password:options.password,authority:1,birthday:"1999-09-03",headshot:"https://img01.yzcdn.cn/vant/cat.jpeg",sex:0,hometown:"江苏省苏州市工业园区",tel:"12345678912"}
      if (ok) {
        commit("initUser", user);
        resolve(true)
      }else{
        reject(false)
      }
    });
  },
  loginOut({context,commit}){
    commit("deleteUser");
  }
};

// mutations
const mutations = {
  initUser(state, user) {
    state.user = new User(user);
    console.log("add",user);
    const NativeStorage =window['NativeStorage'];
    //localstorge不能储存对象
    const string=JSON.stringify(state.user);
    console.log(string)
    NativeStorage.setItem('user',string)
  },
  deleteUser(state){
    const NativeStorage =window['NativeStorage'];
    state.user = undefined;
    NativeStorage.remove('user')
  },
  changeUser(state, user) {
    state.user = user;
    console.log("change",user);
    const NativeStorage =window['NativeStorage'];
    //localstorge不能储存对象
    const string=JSON.stringify(state.user);
    console.log(string)
    NativeStorage.setItem('user',string)
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

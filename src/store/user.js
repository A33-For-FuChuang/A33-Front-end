import { reqUserInfo } from "../api/employee";
import cookies from "vue-cookies";
import {setToken,removeToken,removeDateKey} from "../composables/auth"

const state = {
  userInfo: {},
  times:[]
};

const mutations = {
  setUser(state, res) {
    state.userInfo = res.data;
    // localStorage.setItem("authorities",state.userInfo.authorities)
    cookies.set('authorities',state.userInfo.authorities)
  },
  setToken(state, token) {
    state.userInfo.token = token;
    setToken(token)
  },
  setTimes(state,data) {
    state.times=data;
  },
  layout(state, data) {
    state.userInfo = data;
    removeDateKey()
    removeToken()
    cookies.remove('authorities')
  },
};

const actions = {
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      reqUserInfo()
        .then((res) => {
          commit("setUser", res);
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  },
};

const getters  = {
  test(state) {
    return state.times
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};

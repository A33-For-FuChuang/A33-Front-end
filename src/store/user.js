import { reqUserInfo } from "../api/employee";
import {setToken,removeToken,removeDateKey} from "../composables/auth"

const state = {
  userInfo: {},
  times:[]
};

const mutations = {
  setUser(state, res) {
    state.userInfo = res.data;
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

import { reqUserInfo } from "../api/employee";
import {setToken} from "../composables/auth"

const state = {
  userInfo: {},
  asideWidth: "250px",
};

const mutations = {
  setUser(state, res) {
    state.userInfo = res.data;
  },
  setToken(state, token) {
    state.userInfo.token = token;
    setToken(token)
  },
  layout(state, data) {
    state.userInfo = data;
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

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};

import { reqUserInfo } from "../api/location";
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
  getInfo({ commit }, employeeID) {
    return new Promise((resolve, reject) => {
      reqUserInfo(employeeID)
        .then((res) => {
          localStorage.setItem("userId",res.data.id)
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

import { reqUserInfo } from "../api/location";

const state = {
  userInfo: {},
  asideWidth: "250px",
};

const mutations = {
  setUser(state, res) {
    state.userInfo = res.data;
    state.userInfo.token=res.token
  },
  setToken(state, token) {
    state.userInfo.token = token;
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
          console.log(res);
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

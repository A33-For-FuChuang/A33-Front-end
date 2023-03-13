const state = {
  user:"",
  token: "",
  asideWidth: "250px",
};

const mutations = {
  setUser(state,data) {
    state.user=data
  },
  setToken(state,token) {
    state.token=token
  },
  layout(state,data) {
    state.token=""
    state.user=data
  }
};

const actions = {
  
};

const getters = {
  

};

export default {
  state,
  mutations,
  actions,
  getters,
};

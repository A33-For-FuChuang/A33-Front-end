const state = {
  tabList: [
    {
      title: "个人信息",
      path: "/home/employee",
    },
  ],
  asideWidth: "250px",
  isPublic:true
};

const mutations = {
  pushTabList(state, data) {
    state.tabList.push(data);
  },
  setTabList(state,data) {
    state.tabList=data
  },
  setAsideWidth(state) {
    state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px";
  },
  setIsPublicTrue(state) {
    state.isPublic=state.isPublic=true
  },
  setIsPublicFalse(state) {
    state.isPublic=state.isPublic=false
  }
};

const actions = {
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};

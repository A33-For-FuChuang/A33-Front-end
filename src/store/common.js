const state = {
  tabList: [
    {
      title: "权限页",
      path: "/home/shop",
    },
  ],
  asideWidth: "250px",
};

const mutations = {
  pushTabList(state, data) {
    state.tabList.push(data);
  },
  setTabList(state,data) {
    state.tabList=data
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

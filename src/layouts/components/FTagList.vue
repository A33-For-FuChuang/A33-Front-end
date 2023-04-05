<template>
  <div>
    <div class="f-tag-list" :style="{ left: $store.state.common.asideWidth }">
      <el-tabs
        v-model="activeTab"
        type="card"
        class="flex-1"
        @tab-remove="removeTab"
        style="min-width: 100px"
        @tab-click="changeTab"
      >
        <el-tab-pane
          :closable="item.path != '/'"
          v-for="item in tabList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
        ></el-tab-pane>
      </el-tabs>

      <span class="tag-btn">
        <el-dropdown @command="handleClose">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="clearOther">关闭其他</el-dropdown-item>
              <el-dropdown-item command="clearAll">全部关闭</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </div>
    <div style="height: 44px"></div>
  </div>
</template>
<script>
import router from "@/router";
import store from "@/store";
export default {
  data() {
    return {
      tabList: store.state.common.tabList,
      activeTab: this.$route.path,
    };
  },
  methods: {
    init() {
      this.addTab({title:this.$route.name,path:this.$route.fullPath})
      router.afterEach((to, next, from) => {
        if(to.path=='/login') return
        this.activeTab = to.path;
        this.addTab({
          title: to.name,
          path: to.path,
        });
      });
    },
    addTab(tab) {
      let noTab = this.tabList.findIndex((t) => t.path == tab.path) == -1;
      if (noTab) {
        store.commit("pushTabList", tab);
      }
    },
    changeTab(t) {
      this.activeTab = t.paneName;
      router.push(this.activeTab);
    },
    removeTab(t) {
      let tabs = this.tabList;
      let a = this.activeTab;
      if (a == t) {
        tabs.forEach((tab, index) => {
          if (tab.path == t) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              a = nextTab.path;
            }
          }
        });
      }
      this.activeTab = a;
      this.tabList = this.tabList.filter((tab) => tab.path != t);
      store.commit("setTabList", this.tabList);
    },
    handleClose(c) {
      if (c == "clearAll") {
        // 切换回首页
        this.activeTab = "/home/employee";
        router.push(this.activeTab);
        // 过滤只剩下首页
        this.tabList = [
          {
            title: "个人信息",
            path: "/home/employee",
          },
        ];
      } else if (c == "clearOther") {
        // 过滤只剩下首页和当前激活
        this.tabList = this.tabList.filter(
          (tab) => tab.path == "/home/employee" || tab.path == this.activeTab
        );
      }
      store.commit("setTabList", this.tabList);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.f-tag-list {
  position: fixed;
  background-color: rgba(243, 244, 246, 1);
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  top: 64px;
  right: 0;
  height: 44px;
  z-index: 100;
}
.tag-btn {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
  padding-right: 8px;
  height: 32px;
}
:deep(.el-tabs__header) {
  border: 0 !important;
  margin-bottom: 0px;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__item) {
  border: 0 !important;
  margin: 0 5px;
  height: 32px;
  line-height: 32px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  line-height: 32px;
  height: 32px;
}
:deep(.is-disabled) {
  cursor: not-allowed;
  color: rgba(209, 213, 219, 1);
}
</style>

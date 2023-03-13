<template>
  <div class="f-menu" :style="{ width: $store.state.user.asideWidth }">
    <el-menu
      :default-active="1"
      unique-opened
      default-active="2"
      class="border-0"
      :collapse-transition="false"
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/user">选项1</el-menu-item>
          <el-menu-item index="/home/root">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.f-menu {
  transition: all 0.2s;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  --tw-shadow-color: 0, 0, 0;
  --tw-shadow: 0 4px 6px -1px rgba(var(--tw-shadow-color), 0.1),
    0 2px 4px -1px rgba(var(--tw-shadow-color), 0.06);
  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  position: fixed;
  --tw-bg-opacity: 1;
  background-color: rgba(253, 253, 253, var(--tw-bg-opacity));
}
.f-menu::-webkit-scrollbar {
  width: 0px;
}
</style>

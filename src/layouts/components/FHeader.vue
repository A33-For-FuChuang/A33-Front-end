<template>
  <div class="f-header">
    <span class="logo"
      ><span  class="el-icon-platform-eleme" style="margin-right: 10px"></span>
      智能排班系统</span
    >
    <span class="icon-btn" @click="$store.commit('setAsideWidth')">
      <i v-if="$store.state.common.asideWidth=='250px'" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </span>
    <el-button type="primary" @click="layout">退出登录</el-button>
  </div>
</template>

<script>
import {Toast} from "@/composables/utils"

export default {
  data() {
    return {};
  },
  methods: {
    layout() {
      this.$store.commit('layout', {})
      Toast("退出成功")
      this.$router.push("/login")
    }
  },
};
</script>

<style scoped>
.f-header {
  height: 64px;
  z-index: 1000;
  display: flex;
  align-items: center;
  background-color: rgba(67, 56, 202, 1);
  color: rgb(253, 253, 253);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.logo {
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  line-height: 28px;
  font-weight: 100;
}
.icon-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}
</style>

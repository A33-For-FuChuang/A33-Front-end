<template>
  <div class="f-header">
    <span class="logo"
      ><span  class="el-icon-platform-eleme" style="margin-right: 10px"></span>
      智能排班系统</span
    >
    <el-button type="primary" @click="layout">退出登录</el-button>
  </div>
</template>

<script>
import {removeToken} from "@/composables/auth"
import {Toast} from "@/composables/utils"

export default {
  data() {
    return {};
  },
  methods: {
    layout() {
      this.$store.commit('layout', {})
      Toast("退出成功")
      removeToken()
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
</style>

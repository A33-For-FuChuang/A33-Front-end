<template>
  <el-container class="bc">
    <el-header>
      <FHeader></FHeader>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <FMenu></FMenu>
      </el-aside>
      <el-main >
        <router-view style="padding:20px 50px" class="elmbc">
          <transition name="fade">
            <keep-alive :max="10">
            </keep-alive>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import FHeader from "@/layouts/components/FHeader.vue";
import FMenu from "@/layouts/components/FMenu.vue";
import FTagList from "@/layouts/components/FTagList.vue";
</script>

<style>
.bc {
  background-color: rgb(243, 243, 243);
  height: 100vh;
}
.elmbc {
  background-color: rgb(253, 253, 253);
}
.el-aside {
  transition: all 0.2s;
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter-active {
  transition-delay: 0.3s;
}
</style>

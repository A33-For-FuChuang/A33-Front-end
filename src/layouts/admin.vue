<template>
  <el-container class="bc">
    <el-header>
      <FHeader></FHeader>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <FMenu></FMenu>
      </el-aside>
      <el-main>
          <transition name="breadcrumb fade">
            <keep-alive :max="10">
              <router-view style="padding: 20px 50px" class="elmbc">
              </router-view
            ></keep-alive>
          </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import FHeader from "@/layouts/components/FHeader.vue";
import FMenu from "@/layouts/components/FMenu.vue";
import FTagList from "@/layouts/components/FTagList.vue";
export default {
  components: {
    FHeader,
    FMenu,
  },
};
</script>

<style>
.elmbc {
  background-color: rgb(253, 253, 253);
  box-shadow: 0 4px 8px 6px rgba(7,17,27,.06);
}
.el-aside {
  transition: all 0.1s;
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

<template>
  <div class="f-menu" :style="{ width: $store.state.common.asideWidth }">
    <el-menu
      unique-opened
      default-active="/home/user"
      :collapse="isCollapse"
      class="border-0"
      :collapse-transition="false"
      router
    >
      <el-submenu index="7" v-if="Root">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">商铺信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/shop/shopinformation">所有商铺</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="1" v-if="isRoot">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">员工信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/employee">个人信息</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="/home/allemployee">成员信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2" v-if="isRoot">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">排班规则</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/rule">员工偏好</el-menu-item>
        </el-menu-item-group>

        <el-submenu index="1-4" v-if="isRoot">
          <template slot="title">商铺规则</template>
          <el-menu-item index="/rule/custom">自定义规则</el-menu-item>
          <el-menu-item index="/rule/system">系统规则</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3" v-if="isRoot">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">排班信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/schedule/information">排班信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="4" v-if="isRoot">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">排班模板</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/template/name">模板展示</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { reqChangeinfo } from "../../api/employee";

export default {
  data() {
    return {
      Root: false,
      isRoot: false,
    };
  },
  created() {
    this.showposition();
  },
  computed: {
    isCollapse() {
      return !(this.$store.state.common.asideWidth == "250px");
    },
  },
  methods: {
    async showposition() {
      //为root用户,root用户不是申请的，内容为underfine
      //await关键字，以确保在获取完数据之前不会执行下一步操作
      await this.$store.dispatch("getInfo");
      const position = this.$store.state.user.userInfo;
     

  


      if (typeof position === "undefined") {
        this.isRoot = false;
        this.Root = true;
      } else {
       
        this.isRoot = true;
        this.Root == false;
      }
    },
  },
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

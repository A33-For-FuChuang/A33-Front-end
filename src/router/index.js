import Vue from "vue";
import VueRouter from "vue-router";
import { Toast } from "../composables/utils";
import { getToken } from "../composables/auth";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home/user",
  },
  {
    path: "/login",
    name:"login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/layouts/admin.vue"),
    children: [
      {
        path: "user",
        component: () => import("@/views/Home/user.vue"),
      },
      {
        path: "shop",
        name: '商铺详情',
        component: () => import("@/views/Home/shop.vue"),
      },
      {
        path: "employee",
        name: '个人信息',
        component: () => import("@/views/EmployeeInfo/index.vue"),
      },
      {
        path: "allemployee",
        name: '成员信息',
        component: () => import("@/views/EmployeeInfo/allemployeeinfo.vue"),
      },
      {
        path: "rule",
        name: '个人偏好',
        component: () => import("@/views/Rule/preference.vue"),
      },
   
    ],
  },
  {
    path: "/rule",
    component: () => import("@/layouts/admin.vue"),
    children: [
      {
        path: "custom",
        name: '自定义规则',
        component: () => import("@/views/Rule/customRule.vue"),
      },
      {
        path: "hobby",
        name: '员工偏好',
        component: () => import("@/views/Rule/preference.vue"),
      },
      {
        path: "system",
        name: '系统规则',
        component: () => import("@/views/Rule/systemRule.vue"),
      },
    ],
  },
  // {
  //   path: "/rule",
  //   component: () => import("@/layouts/admin.vue"),
  //   children: [
  //     {
  //       path: "employee",
  //       component: () => import("@/views/EmployeeInfo/index.vue"),
  //     },
  //     {
  //       path: "allemployee",
  //       component: () => import("@/views/EmployeeInfo/allemployeeinfo.vue"),
  //     },
  //     {
  //       path: "rule",
  //       component: () => import("@/views/Rule/preference.vue"),
  //     },
  //     {
  //       path: "shoprule",
  //       component: () => import("@/views/Rule/shoprule.vue"),
  //     },
  //     {
  //       path: "/bussrule",
  //       component: () => import("@/views/Rule/businessrule.vue"),
  //     },
  //   ],
  // },
  {
    path: "/schedule",
    component: () => import("@/layouts/admin.vue"),
    children: [
      {
        path: "information",
        name: '排班信息',
        component: () => import("@/views/Schedule/information.vue"),
      },
    ],
  },
  {
    path: "/shop",
    component: () => import("@/layouts/admin.vue"),
    children: [
      {
        path: "shopinformation",
        name: '商铺信息',
        component: () => import("@/views/Shop/shopinformation.vue"),
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/404.vue"),
  },
  { path: "*", redirect: "/404", hidden: true },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const token = getToken();
  if (to.path != "/login" && !token && !store.state.userInfo) {
    Toast("请先登录", "error");
    return next({ path: "/login" });
  }
  if (to.path == "/login" && token) {
    Toast("请先退出登录", "warning");
    return next({ path: from.path ? from.path : "/" });
  }
  if (token) {
    store.dispatch("getInfo")
  }
  next();
});


export default router;

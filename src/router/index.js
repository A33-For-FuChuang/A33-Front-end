import Vue from "vue";
import VueRouter from "vue-router";
import { Toast } from "../composables/utils";
import { getToken } from "../composables/auth";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/admin.vue"),
    redirect:'/home/user'
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path:"/home",
    name:"home",
    component:()=>import("@/layouts/admin.vue"),
    children:[
      {
        path:"user",
        component:()=>import("../views/Home/User.vue")
      },
      {
        path:"root",
        component:()=>import("@/views/Home/Root.vue")
      }
    ]
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
  if (to.path != "/login" && !token) {
    Toast("请先登录", "error");
    return next({ path: "/login" });
  }
  if (to.path == "/login" && token) {
    Toast("请先退出登录", "warning");
    return next({ path: from.path ? from.path : "/" });
  }
  next();
});

export default router;

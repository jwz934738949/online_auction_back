import Vue from "vue";
import VueRouter from "vue-router";

const Login = () => import("../views/Login");
const Home = () => import("../views/Home/Home");
const User = () => import("../views/Home/User/User");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    redirect: "/user",
    component: Home,
    children: [{ path: "/user", component: User }],
  },
];

const router = new VueRouter({
  routes,
});

// 为路由器添加导航守卫
router.beforeEach((to, from, next) => {
  // to代表要去哪个路径
  // from代表从哪个路径来
  // next代表跳转 next() 直接跳转 next('/xxx') 强制跳转到该路径
  if (to.path === "/login") {
    return next();
  }
  // 获取token值
  const tokenStr = window.sessionStorage.getItem("auth");
  if (!tokenStr) {
    return next("/login");
  }
  next();
});

export default router;

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import Axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 添加默认URL地址
Axios.defaults.baseURL = "http://auction.redarm.cn/api/";

// 显示右上角螺旋加载提示
NProgress.configure({ showSpinner: false });

// 添加请求拦截器
Axios.interceptors.request.use((config) => {
  // 将进度条插件打开
  NProgress.start();
  // 添加请求头
  if (window.sessionStorage.getItem("auth")) {
    config.headers.auth = window.sessionStorage.getItem("auth");
  }

  return config;
});

// 添加响应拦截器
Axios.interceptors.response.use((response) => {
  // 将进度条插件关闭
  NProgress.done();
  return response;
});

Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

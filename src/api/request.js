// 对于axios进行二次封装
import axios from "axios";
import ElementUI from "element-ui";
import { getToken, removeToken, setToken } from "../composables/auth";
import router from '@/router'

// 引入进度条
import nprogress from "nprogress";
// 引入样式
import "nprogress/nprogress.css";
//start:进度条开始 done：进度条结束

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
const request = axios.create({
  // 配置对象
  // 基础路径：发请求的时候，路径中会出现api
  baseURL: process.env.VUE_APP_BASE_URL,
  // 代表请求超时的时间5s
  timeout: 7000,
});

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(
  (config) => {
    nprogress.start();
    config.headers["Content-Type"] = "application/json;charset=utf-8";
    const token = getToken()
    if (token) {
      config.headers["token"] = token; // 设置请求头
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  (response) => {
    nprogress.done();
    let res = response.data;
    // 如果是返回的文件
    if (response.config.responseType === "blob") {
      return res;
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === "string") {
      res = res ? JSON.parse(res) : res;
    }
    // 当权限验证不通过的时候给出提示
    if (res.state == "401") {
      ElementUI.Message({
        message: res.message,
        type: "error",
      });
      removeToken();
    }
    return res;
  },
  (error) => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

// 对外暴露
export default request;

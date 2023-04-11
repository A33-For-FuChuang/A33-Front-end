import request from "./request";

// 登录
export const reqLogin = (email) =>
  request({ url: `/A33/employee/login`, params: { email }, method: "get" });

// 注册
export const reqRegister = (data) =>
  request({
    url: `/A33/employee/regist`,
    params: {
      belong: data.belong,
      name: data.name,
      shopID: data.shopID,
      phone: data.phone,
      email: data.email,
      position: data.position,
    },
    method: "post",
  });

//  展示个人信息
export const reqUserInfo = () =>
  request({ url: "/A33/employee/own", method: "get" });

//员工信息接口
export const employeeinfo = () =>
  request({ url: `/A33/employee/own`, method: "get" });

//更改个人信息接口
export const reqChangeinfo = (data) =>
  request({
    url: `/A33/employee/updateOwn`,
    params: {
      email: data.email,
      phone: data.phone,
    },
    method: "post",
  });

//所有成员信息接口
export const allemployee = () =>
  request({ url: `/A33/employee/other`, method: "get" });

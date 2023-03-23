import request from "./request";

export const reqLogin = (email) =>
  request({ url: `/A33/employee/login`, params: { email }, method: "get" });

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
    }, method: "put"
  });

//所有成员信息接口
export const allemployee = () =>
  request({ url: `/A33/employee/other`, method: "get" });






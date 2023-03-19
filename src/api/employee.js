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



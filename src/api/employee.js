import request from "./request";

export const reqLogin = (email) =>
  request({ url: `/A33/employee/login`, params: { email }, method: "get" });

export const reqRegister = (data) =>
  request({
    url: `/A33/employee/regist`,
    params: {
      name: data.name,
      shopID: data.shopID,
      email: data.email,
      position: data.position,
    },
    method: "post",
  });

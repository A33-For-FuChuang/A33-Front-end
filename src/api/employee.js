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

//删除成员
export const reqRmove = (id) =>
  request({ url: `/A33/employee/remove`,
  params: {
   ID:id
  }, method: "delete" });

  //所有成员信息接口
export const allemployee = () =>
request({ url: `/A33/employee/other`, method: "get" });

// 高权限用户(boss)修改员工信息(权限:店长)
export const reqChangeOtherInfo=(data)=>request({
  url:"/A33/employee/updateOther",
  params:{
    email:data.email,
    ID:data.id,
    name:data.name,
    phone:data.phone,
    position:data.position
  },
  method:"post"
})



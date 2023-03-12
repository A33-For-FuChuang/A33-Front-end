import request from "./request"

export const reqLogin=(email)=>
  request({ url: `/A33/employee/login`, params:{email}, method: "get" })


export const reqRegister=(data)=>
  request({ url: `/A33/employee/regist`, data, method: "post" })

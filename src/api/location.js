import request from "./request";


export const reqAllGroup=()=>request({url:'/A33/location/allGroup',method:'get'})

export const reqUserInfo=(employeeID)=>request({url:"/A33/location/details",params:{employeeID},method:'get'})
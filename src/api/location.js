import request from "./request";


export const reqAllGroup=()=>request({url:'/A33/location/allGroup',method:'get'})

export const reqThreeMonthes=(dateTime)=>request({url:'/A33/location/threeMonthes',params:{dateTime},method:'get'})

export const reqGetWeekWork = (dateTimeWeek) =>
  request({
    url: "/A33/location/week",
    params: { dateTimeWeek },
    method: "get",
  });
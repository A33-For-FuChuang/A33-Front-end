import request from "./request"
// 智能排班算法
export const reqSchedule=(localDateTime)=>request({
  url:"/A33/scheduling/IntelligentScheduling",
  params:{localDateTime},
  method:"get"
})
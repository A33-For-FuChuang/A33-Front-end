import request from "./request";

//插入流量
export const reqInsert = (data) =>
  request({ url: `/A33/flow/insertFlowDetails`, 
  params: {
       dateTime:data.time,
       flowID:data.id,
       flowNum:data.num

    }, method: "post" });

//展示商铺存储的所有人的流量
export const reqShowAll = (data) =>
  request({ url: `/A33/flow/showAllFlow`, 
 method: "get" });

 //展示人流量的具体信息
export const reqShowList = (data) =>
request({ url: `/A33/flow/showFlowList`, 
params: {
    dateTime:data
   
 }, 
method: "get" });

//更改人流量的具体细节
export const reqUpdateFlow = (data) =>
  request({ url: `/A33/flow/updateFlowDetails`, 
  params: {
    dateTime:data.localTime,
    flowID:data.id,
    flowNum:data.permitFlow

    }, method: "post" });
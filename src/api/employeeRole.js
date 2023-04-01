import request from "./request";

//修改工作日偏好接口
export const reqRole = (data) =>
    request({
        url: `/A33/employeeRole/updateWorkDay`,
        params: {
            workDay1: data.workDay1,
            workDay2: data.workDay2,
        }, method: "post"
    });

    //修改工作时间偏好接口
export const reqWorkTime = (data) =>
request({
    url: `/A33/employeeRole/updateWorkTime`,
    params: {
        workTime1: data.workTime1,
        workTIme2: data.workTIme2,
    }, method: "post"
});
    //修改班次时长偏好接口
export const reqTime = (data) =>
request({
    url: `/A33/employeeRole/updateLastTime`,
    params: {
        
        lastTime: data,
    }, method: "post"
});
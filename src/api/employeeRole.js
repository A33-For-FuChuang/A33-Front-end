import request from "./request";
//展示偏好接口
export const reqShowEmployeeRole = (data) =>
    request({
        url: `A33/employeeRole/showEmployeeRole`,
       method: "get"
    });

//修改工作日偏好接口
export const reqWorkDay = (data) =>

    request({
        url: `/A33/employeeRole/updateWorkDay`,
        params: {
            workDay1: data[0],
            workDay2: data[1] ,
        }, method: "post"
    });

    //修改工作时间偏好接口
export const reqWorkTime = (data) =>
request({
    url: `/A33/employeeRole/updateWorkTime`,
    params: {
        workTime1: data[0],
        workTime2: data[1],
    }, method: "post"
});
    //修改班次时长偏好接口
export const reqWorkHour = (data) =>
request({
    url: `/A33/employeeRole/updateLastTime`,
    params: {
        
    lastTime: data[0]
    }, method: "post"
});
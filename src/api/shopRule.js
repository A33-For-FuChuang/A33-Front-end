import request from "./request";

//展示自定义规则
export const reqShowDiy = (data) =>
    request({
        url: `/A33/shopRole/showDiy`,
        method: "get"
    });

//修改开店规则

export const reqopenRule = (data) =>
    request({
        url: `/A33/shopRole/updateOpenRole`,
        params: {
            baseNum: data.openbaseValue,
            fomula: data.employeeValue,
            openTime: data.openTime
        }, method: "post"
    });


//修改关店规则
export const reqcloseRule = (data) =>
    request({
        url: `/A33/shopRole/updateCloseRole`,
        params: {
            endTime: data.closeTime,
            minEmployee: data.minemployeeValue,
            baseNum: data.closebaseValue,
            fomula: data.employeeValue2
        }, method: "post"
    });

    //修改客流规则
export const reqFlowRule = (data) =>
request({
    url: `/A33/shopRole/updateFlow`,
    params: {
        baseNum: data.flowBase,
     
    }, method: "post"
});

   //修改分组规则
   export const reqGroupRule = (data) =>
   request({
       url: `/A33/shopRole/updateGroupRole`,
       params: {
        deadLineEmployee: data.groupBase,
        
       }, method: "post"
   });

   //修改进货规则
   export const reqStockRule = (data) =>
   request({
       url: `/A33/shopRole/updateStockRole`,
       params: {
        maxLastTime: data.maxDuration,
        minEmployee:data.minStaff,
        minLastTime:data.minDuration
        
       }, method: "post"
   });



//展示系统规则

export const reqShowSystem = (data) =>
    request({
        url: `/A33/shopRole/showSystem`,
        method: "get"
    });


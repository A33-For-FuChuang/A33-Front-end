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
            minEmployee: data.minStaff,
            minLastTime: data.minDuration

        }, method: "post"
    });



//展示系统规则

export const reqShowSystem = (data) =>
    request({
        url: `/A33/shopRole/showSystem`,
        method: "get"
    });

//门店营业时间段
export const reqLastTime = (data) =>
    request({
        url: `/A33/shopRole/updateLastTime`,
        params: {
            workDay: data.workDay,
            workStart: data.workStart,
            workEnd: data.workEnd,
            weekend: data.weekend,
            weekendStart: data.weekendStart,
            weekendEnd: data.weekendEnd

        }, method: "post"
    });


//员工工作时间
export const reqWorkTime = (data) =>
    request({
        url: `/A33/shopRole/updateWorkTime`,
        params: {
            dayMaxTime: data.dayMaxTime,
            locationMaxTime: data.locationMaxTime,
            locationMinTime: data.locationMinTime,
            weekMaxTime: data.weekMaxTime,


        }, method: "post"
    });


//休息时间

export const reqRestTime = (data) =>
    request({
        url: `/A33/shopRole/updateRestTime`,
        params: {
            dinnerTime:data.dinnerTime,
            dinnerTimeEnd:data.dinnerTimeEnd,
            dinnerTimeStart:data.dinnerTimeStart,
            lunchTime: data.lunchTime,
            lunchTimeEnd:data.lunchTimeEnd,
            lunchTimeStart: data.lunchTimeStart,
            restTime: data.resttime,
         


        }, method: "post"
    });

//职位
export const reqGroupPosition = (data) =>
    request({
        url: `/A33/shopRole/updateGroupPosition`,
        params: {
            number1:data.positionMapnum1,
            number2:data.positionMapnum2,
            number3:data.positionMapnum3,
            position1:data.position1,
            position2:data.position2,
            position3:data.position3,
        }, method: "post"
    });
import request from "./request";

// 展示所有的小组长及其组员
export const reqAllGroup = () =>
  request({ url: "/A33/location/allGroup", method: "get" });

// 获取前三个月和后三个月的具体时间
export const reqThreeMonthes = (dateTime) =>
  request({
    url: "/A33/location/threeMonthes",
    params: { dateTime },
    method: "get",
  });

// 按周展示员工的工作安排
export const reqGetWeekWork = (dateTimeWeek) =>
  request({
    url: "/A33/location/week",
    params: { dateTimeWeek },
    method: "get",
  });

// 展示所有的小组长和及其组员
export const reqGetAllGroup = () =>
  request({ url: "/A33/location/allGroup", method: "get" });

// 按组展示排班
export const reqGetGroupWork = (dateTime, groupID) =>
  request({
    url: "/A33/location/group",
    params: { dateTime, groupID },
    method: "get",
  });

// 按职位显示排班
export const reqGetPositionWork = (dateTime, position) =>
  request({
    url: "/A33/location/position",
    params: { dateTime, position },
    method: "get",
  });

// 获取所有职位
export const reqGetPositions = () =>
  request({ url: "/A33/location/positions", method: "get" });

// 获取当前人员某一周的班次
export const reqGetWeekLocations = (dateTimeWeek) =>
  request({
    url: "/A33/location/one/weekLocations",
    params: { dateTimeWeek },
    method: "get",
  });

// 获取当前人员某一天的班次
export const reqGetDayLocations = (dateTimeWeek) =>
  request({
    url: "/A33/location/one/dayLocations",
    params: { dateTimeWeek },
    method: "get",
  });

// 展示所有的空闲员工
export const reqShowFreeWorker=()=>request({
  url:"/A33/location/showFree",
  method:"get"
})

// 展示需要参与进货的店员
export const reqGetStock=(localDateTime)=>request({
  url:"/A33/location/stock",
  params:{localDateTime},
  method:"get"
})


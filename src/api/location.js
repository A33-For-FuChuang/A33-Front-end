import request from "./request";

// 展示所有的小组长及其组员(权限:店长、经理)
export const reqAllGroup = () =>
  request({ url: "/A33/location/allGroup", method: "get" });

// 获取前三个月和后三个月的具体时间
export const reqThreeMonthes = (dateTime) =>
  request({
    url: "/A33/location/threeMonthes",
    params: { dateTime },
    method: "get",
  });

// 按周展示员工的工作安排(权限:店长、经理、小组长)
export const reqGetWeekWork = (dateTimeWeek) =>
  request({
    url: "/A33/location/week",
    params: { dateTimeWeek },
    method: "get",
  });


// 按组展示排班(权限:店长、经理、小组长)
export const reqGetGroupWork = (dateTime, groupID) =>
  request({
    url: "/A33/location/group",
    params: { dateTime, groupID },
    method: "get",
  });

// 按职位显示排班(权限:店长、经理)
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

// 展示所有的空闲员工(权限:店长、经理、小组长)
export const reqShowFreeWorker = () =>
  request({
    url: "/A33/location/showFree",
    method: "get",
  });

// 展示需要参与进货的店员
export const reqGetStock = (localDateTime) =>
  request({
    url: "/A33/location/stock",
    params: { localDateTime },
    method: "get",
  });

// 展示备份数据(权限：店长)
export const reqShowCopy = (localDateTime) =>
  request({
    url: "/A33/location/showCopy",
    params: { localDateTime },
    method: "get",
  });

// 恢复备份数据(权限：店长)
export const reqRestoreCopy = () =>
  request({
    url: "/A33/location/restoreCopy",
    method: "get",
  });

// 展示备份数据列表(权限：店长)
export const reqShowCopyList = (dateTime) =>
  request({
    url: "/A33/location/showCopyList",
    params: { dateTime },
    method: "get",
  });

// 手动安排员工班次(权限:店长、经理)
export const reqManageWork = (email, locationID) =>
  request({
    url: "/A33/location/manage",
    params: { email, locationID },
    method: "post",
  });

// 手动移除员工排班(权限:店长、经理)
export const reqDelWork = (email, locationID) =>
  request({
    url: "/A33/location/remove",
    params: { email, locationID },
    method: "post",
  });

// 根据ID和时间当前人员某一周的班次
export const reqIdWork = (ID, dateTimeDay) =>
  request({
    url: "/A33/location/one/weekLocationsByID",
    params: { dateTimeDay, ID },
    method: "get",
  });

// 用于展示所搜索的员工的所有的排班信息(权限:店长、经理、小组长)
export const reqSearchWork = (dateTime, email) =>
  request({
    url: "/A33/location/selectLocations",
    params: { dateTime, email },
    method: "get",
  });

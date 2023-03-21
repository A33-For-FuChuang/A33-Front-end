import request from "./request";

export const reqAllGroup = () =>
  request({ url: "/A33/location/allGroup", method: "get" });

export const reqThreeMonthes = (dateTime) =>
  request({
    url: "/A33/location/threeMonthes",
    params: { dateTime },
    method: "get",
  });

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

import ElementUI from "element-ui";

export function Toast(
  message,
  type = "success",
  dangerouslyUseHTMLString = true
) {
  ElementUI.Notification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000,
  });
}

export function Message(message, type = "success") {
  ElementUI.Message({
    message,
    type,
  });
}

export function resetObj(obj) {
  for (const key in obj) {
    obj[key] = "";
  }
}

// 计算today所在的一周的时间
export function getWeek(today = new Date()) {
  // 计算当前日期所在的星期一和星期日
  const currentDay = today.getDay();
  const diff = currentDay === 0 ? 6 : currentDay - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - diff);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  // 创建星期一到星期日的日期数组
  const daysOfWeek = [];
  for (let date = monday; date <= sunday; date.setDate(date.getDate() + 1)) {
    daysOfWeek.push(
      new Date(date).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
      })
    );
  }
  return daysOfWeek;
}

// 将中国标准时间转化为yyyy-mm-dd形式
export function formatDate(dateStr=new Date()) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}`;
}

// 将yyyy-mm-dd日期转换为中国标准时间
export function transformTime(dateString) {
  // 将日期字符串转换为Date对象
  var date = new Date(dateString);

  // 获取中国标准时间的时区偏移量（单位为毫秒）
  var timeZoneOffset = 8 * 60 * 60 * 1000;

  // 获取本地时间的时区偏移量（单位为毫秒）
  var localTimeZoneOffset = date.getTimezoneOffset() * 60 * 1000;

  // 计算中国标准时间的时间戳
  var chineseTimeStamp = date.getTime() + localTimeZoneOffset + timeZoneOffset;

  // 将时间戳转换为中国标准时间
  var chineseTime = new Date(chineseTimeStamp);
  return chineseTime;
}

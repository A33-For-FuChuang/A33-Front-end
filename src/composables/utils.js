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
    let dateStr =new Date(date).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    })
    dateStr = dateStr.replace(/\//g, "-");
    daysOfWeek.push(
      dateStr
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

export function removeDuplicate(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i].employeeID === arr[j].employeeID) {
        arr.splice(j, 1);
        len--; // 减少循环次数提高性能
        j--; // 保证j的值自加后不变
      }
    }
  }
  return arr;
}

// 求出yyyy-mm--dd所在那一周的周一和周日
export function getMondayAndSunday(date) {
  date = new Date(date)
  const dayOfWeek = date.getDay();
  const diffMonday = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diffMonday)).toISOString().slice(0, 10);
  const sunday = new Date(date.setDate(diffMonday + 6)).toISOString().slice(0, 10);
  return {
    monday,
    sunday
  };
}

// 求出yyyy-mm--dd所在那一周的周一
export function getMondayOfWeek(dateString) {
  const date = new Date(dateString); // 将传入的日期字符串转换为 Date 对象
  const day = date.getDay(); // 获取星期几，0 表示星期日，1 表示星期一，以此类推
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // 计算这一周的周一日期
  const monday = new Date(date.setDate(diff)); // 转换为 Date 对象
  const year = monday.getFullYear(); // 获取年份
  const month = String(monday.getMonth() + 1).padStart(2, '0'); // 获取月份，并补齐为两位数字
  const dayOfMonth = String(monday.getDate()).padStart(2, '0'); // 获取日期，并补齐为两位数字
  return `${year}-${month}-${dayOfMonth}`; // 拼接为字符串并返回
}

// 获取当前时间yyyy-mm-dd
export function getNowFormatDate() {
  let date = new Date();
  let seperator1 = "-";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  const currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

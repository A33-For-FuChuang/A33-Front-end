const TokenKey = "admin-token"
const TimeKey="date-key"
const TabList="tab-list"

// 获取token
export function getToken(){
    return localStorage.getItem(TokenKey)
}

// 设置token
export function setToken(token){
    return localStorage.setItem(TokenKey,token)
}

// 清除token
export function removeToken(){
    return localStorage.removeItem(TokenKey)
}

// 获取日期
export function getDateKey(){
    return localStorage.getItem(TimeKey)
}

// 设置日期
export function setDateKey(date){
    return localStorage.setItem(TimeKey,date)
}

// 清除日期
export function removeDateKey(){
    return localStorage.removeItem(TimeKey)
}



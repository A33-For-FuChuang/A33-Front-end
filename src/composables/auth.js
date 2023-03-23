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
    return localStorage.getItem(TokenKey)
}

// 设置日期
export function setDateKey(date){
    return localStorage.setItem(TimeKey,date)
}

// 清除日期
export function removeDateKey(){
    return localStorage.removeItem(TimeKey)
}

// 获取路由列表
export function getTabList(){
    return localStorage.getItem(TabList)
}

// 设置路由列表
export function setTabList(list){
    return localStorage.setItem(TabList,list)
}

// 清除路由列表
export function removeTabList(){
    return localStorage.removeItem(TabList)
}


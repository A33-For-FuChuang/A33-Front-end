import request from "./request";

//展示点赞数
export const reqShowEvaluate = (data) =>
  request({
    url: `/A33/template/evaluateTemplate`,
    params: {
      name: data,
    },
    method: "get",
  });

//展示模板名字和点赞数
export const reqStartTemplate = (data) =>
  request({
    url: `/A33/template/showTemplateList`,
    params: {
      name: data,
    },
    method: "get",
  });

//展示模板细节
export const reqShowTeplate = (data) =>
  request({
    url: `/A33/template/showTemplateDetails`,
    params: {
      name: data,
    },
    method: "get",
  });

// 保存模板
export const reqSaveTemplate=(name)=>request({
    url:"/A33/template/saveTemplate",
    params:{name},
    method:"get"
})

// 启用模板
export const requseTemplate=(data)=>request({
  url:"/A33/template/useTemplate",
  params:{
    dateTime:data.dayTime,
    name:data.name
  },
  method:"get"
})

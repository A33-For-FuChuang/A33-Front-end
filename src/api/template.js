import request from "./request";

//展示点赞数
export const reqShowEvaluate = (data) =>
    request({
        url: `/A33/template/evaluateTemplate`,
        params: {
           name:data,
        }, 
        method: "get"
    });



//展示模板名字和点赞数
export const reqStartTemplate = (data) =>
    request({
        url: `/A33/template/showTemplateList`,
        params: {
           name:data,
        }, 
        method: "get"
    });

//展示模板细节
export const reqShowTeplate = (data) =>
    request({
        url: `/A33/template/showTemplateDetails`,
        params: {
           name:data,
        }, 
        method: "get"
    });
import request from "./request";
export const employeeinfo = () =>
    request({ url: `/A33/employee/own`, method: "get" });

    export const allemployee = () =>
    request({ url: `/A33/employee/other`, method: "get" });
export const employeechange = (data) =>

    request({
        url: `/A33/employee/updateOwn`,
        params: {
            email: data.email,
            phone: data.phone,
        }, method: "put"
    });
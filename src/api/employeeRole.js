import request from "./request";

export const reqRole = (data) =>
    request({
        url: `/A33/employeeRole/add`,
        params: {
            employeeID: data.id,
            hobbyType1: data.hobbyType1,
            hobbyType2: data.hobbyType2,
            hobbyType3: data.hobbyType3,
            hobbyValue1: data.hobbyValue1,
            hobbyValue2: data.hobbyValue2,
            hobbyValue3: data.hobbyValue3,
        }, method: "post"
    });
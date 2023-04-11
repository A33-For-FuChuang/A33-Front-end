import request from "./request";
//展示所有商铺接口
export const reqAllShop = () =>
    request({
        url: `A33/root/allShop`,
       method: "get"
    });

//添加商铺接口
export const reqAddShop = (data) =>

    request({
        url: `/A33/root/addShop`,
        params: {
            name: data.name,
            address: data.address ,
            size:data.size
        }, method: "post"
    });
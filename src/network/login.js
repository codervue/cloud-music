import { request } from "./index";

//登录请求手机号和密码
export function phoneLogin(phone, password, timestamp) {
    //添加时间戳，避免缓存
    var timestamp = Date.parse(new Date());
    return request({
        url: "/login/cellphone",
        method: "post",
        params: {
            phone,
            password,
            timestamp
        }
    })
}
//获取用户信息
export function getUserInfo(uid){
    return request({
        url: "/user/detail",
        method: "post",
        params: {
           uid
        }
    })
}


import { request } from "./index";

//手机密码登录请求
export function passLogin(phone, password, timestamp = Date.now()) {
    return request({
        url: "/login/cellphone",
        // 登录接口需post请求，否则浏览器报错
        method: "post",
        params: {
            phone,
            password,
            timestamp,
        }
    })
}
//验证码登录请求
export function codeLogin(phone, captcha, timestamp = Date.now()) {
    return request({
        url: "/login/cellphone",
        // 登录接口需post请求，否则浏览器报错
        method: "post",
        params: {
            phone,
            captcha,
            timestamp,
        }
    })
}

//发送验证码
export function getCode(phone) {
    return request({
        url: "/captcha/sent",
        params: {
            phone
        }
    })
}



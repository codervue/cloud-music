import axios from "axios"

export function request(config) {
    //创建axios实例
    const instance = axios.create({
        baseURL: "/api",
        timeout: 10000,
        withCredentials: true
    })



    //请求拦截器的使用
    instance.interceptors.request.use(config => {
        return config
    })
    //响应拦截器的使用
    instance.interceptors.response.use(res => {
        return res.data
    },
        error => {
            console.log(error);
        }
    )


    //发送真正网络请求
    return instance(config)
}
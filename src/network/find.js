import { request } from "./index";

//轮播图数据
export function getSwipe() {
    return request({
        url: "/banner",
    })
}

//推荐歌单的请求
export function getRecommend() {
    return request({
        url: "/personalized",
    })
}
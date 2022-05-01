import { request } from "./index"

//获取评论
export function getComment(id) {
    return request({
        url: "/comment/music",
        params: {
            id
        }
    })
}
//热门评论
export function getHotComment(id,type) {
    return request({
        url: "/comment/hot",
        params: {
            id,
            type
        }
    })
}
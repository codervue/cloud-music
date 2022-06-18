import { request } from "./index"

//获取评论
export function getComment(id, timestamp = Date.now()) {
    return request({
        url: "/comment/music",
        params: {
            id,
            timestamp
        }
    })
}
//热门评论
export function getHotComment(id, type) {
    return request({
        url: "/comment/hot",
        params: {
            id,
            type
        }
    })
}
//发送、删除评论
export function postComment(t, type, id, content, commentId) {
    return request({
        url: "/comment",
        params: {
            t, type, id, content, commentId
        }
    })
}
//评论点赞
export function likeComment(id, cid, t, type) {
    return request({
        url: "/comment/like",
        params: {
            id, cid, t, type
        }
    })
}
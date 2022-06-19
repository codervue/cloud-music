import { request } from "./index"


//视频标签
export function videoList() {
    return request({
        url: "/video/category/list"
    })
}
//标签下的视频
export function videoGroup(id) {
    return request({
        url: "/video/group",
        params: {
            id,
        }
    })
}
//最新mv
export function newMv() {
    return request({
        url: "/mv/first"
    })
}
//网易出品mv
export function netMv() {
    return request({
        url: "/mv/exclusive/rcmd"
    })
}
//video详情
export function videoDetail(id) {
    return request({
        url: "/video/detail",
        params: {
            id
        }
    })
}
//videourl
export function videoUrl(id) {
    return request({
        url: "/video/url",
        params: {
            id
        }
    })
}
//mv详情
export function mvDetail(mvid) {
    return request({
        url: "/mv/detail",
        params: {
            mvid
        }
    })
}
//mvurl
export function mvUrl(id) {
    return request({
        url: "/mv/url",
        params: {
            id
        }
    })
}
//相关视频
export function relateVideo(id) {
    return request({
        url: "/related/allvideo",
        params: {
            id
        }
    })
}
//相关mv
export function relateMv(mvid) {
    return request({
        url: "/simi/mv",
        params: {
            mvid
        }
    })
}

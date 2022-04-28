import { request } from "./index"

//电台banner
export function djBanner() {
    return request({
        url: "/dj/banner"
    })
}

//个性推荐
export function djRecommend() {
    return request({
        url: "/dj/personalize/recommend"
    })
}
//推荐电台
export function Recommend() {
    return request({
        url: "/personalized/djprogram"
    })
}
//电台详情
// export function djDetail(id) {
//     return request({
//         url: "/dj/program/detail",
//         params: {
//             id
//         }
//     })
// }

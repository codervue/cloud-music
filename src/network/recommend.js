import { request } from "./index"

//每日推荐歌曲
export function getRecommendMusic() {
    return request({
        url: "/recommend/songs",
    })
}
//每日推荐歌单
export function getRecommendList() {
    return request({
        url: "/recommend/resource",
    })
}
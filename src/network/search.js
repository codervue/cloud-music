import { request } from "./index";

//搜索热榜
export function searchHot() {
    return request({
        url: "/search/hot/detail",
    })
}
//搜索建议
export function searchSug(keywords) {
    return request({
        url: "/search/suggest",
        params: {
            keywords
        }
    })
}
//搜索细节匹配
export function searchDetail(keywords) {
    return request({
        url: "/search/multimatch",
        params: {
            keywords
        }
    })
}
//搜索全部结果
export function searchResult({ keywords, type }) {
    return request({
        url: "/cloudsearch",
        params: {
            keywords,
            type
        }
    })
}
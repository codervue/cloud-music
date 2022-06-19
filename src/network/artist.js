import { request } from "./index"

//获取歌手详情
export function getArtist(id) {
    return request({
        url: "/artist/detail",
        params: {
            id
        }
    })
}
//获取歌手MV
export function getArtistMv(id) {
    return request({
        url: "/artist/mv",
        params: {
            id
        }
    })
}
//获取歌手专辑
export function getArtistAlbum(id) {
    return request({
        url: "/artist/album",
        params: {
            id
        }
    })
}
//获取相似歌手
export function getSimiArtist(id) {
    return request({
        url: "/simi/artist",
        params: {
            id
        }
    })
}
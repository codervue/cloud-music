import { request } from "./index";


//登入成功后，获取用户歌单
export function getUserPlayList(uid) {
    return request({
        url: "/user/playlist",
        params: {
            uid,
        }
    })
}

//根据歌单id获取歌单详情
export function getPlayListDetail(id) {
    return request({
        url: "/playlist/detail",
        params: {
            id,
        }
    })
}

//根据用户歌单id获取歌曲
export function getSongs(id) {
    return request({
        url: "/playlist/track/all",
        params: {
            id,
        }
    })
}

//根据歌曲id请求歌曲url
export function getSongsUrl(id) {
    return request({
        url: "/song/url",
        params: {
            id,
        }
    })
}

//根据歌曲id请求歌曲详情
export function getSongsDetail(ids) {
    return request({
        url: "/song/detail",
        params: {
            ids,
        }
    })
}
//根据歌曲id请求歌词
export function getLyric(id) {
    return request({
        url: "/lyric",
        params: {
            id
        }
    })
}
//相似歌曲
export function simiSongs(id) {
    return request({
        url: "/simi/song",
        params: {
            id
        }
    })
}
//用户喜欢的音乐
export function getLikedMusicList(uid) {
    return request({
        url: "/likelist",
        params: {
            uid
        }
    })
}
//喜欢该音乐
export function likeThisMusic(id, like) {
    return request({
        url: "/like",
        params: {
            id,
            like
        }
    })
}

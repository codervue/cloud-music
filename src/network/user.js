import { request } from "./index";


//获取用户信息
export function getUserInfo(uid) {
    return request({
        url: "/user/detail",
        params: {
            uid
        }
    })
}

//获取登录状态
export function getState() {
    return request({
        url: "/login/status",
    })
}
//登入成功后，获取用户歌单
export function getUserPlayList(uid, timestamp = Date.now()) {
    return request({
        url: "/user/playlist",
        params: {
            uid,
            timestamp
        }
    })
}

//获取用户喜欢音乐列表
export function getLikedMusicList(uid, timestamp = Date.now()) {
    return request({
        url: "/likelist",
        params: {
            uid,
            timestamp
        }
    })
}

//退出登录
export function logOut() {
    return request({
        url: "/logout",
    })
}
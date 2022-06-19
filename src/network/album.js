import { request } from "./index"


//获取专辑详情
export function getAlbum(id) {
    return request({
        url: "/album",
        params: {
            id
        }
    })
}
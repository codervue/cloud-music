import {request} from "./index"

//私人fm
export function fm(){
    return request({
        url:"/personal_fm",
    })
}
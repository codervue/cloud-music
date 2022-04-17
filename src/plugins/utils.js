// 处理音乐时长的时间
export function handleMusicTime(time) {
    // 如果超过了100000 基本都是毫秒为单位的了 先转成秒的
    time = parseInt(time)
    if (time > 10000) {
        time = Math.floor(time / 1000);
    } else {
        time = Math.floor(time)
    }
    let m = Math.floor(time / 60);
    let s = Math.floor(time % 60);
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    return m + ':' + s;
}

// 将播放时长还原为秒数
export function returnSecond(time) {
    time = time.split(":")
    let m = parseInt(time[0]);
    let s = parseInt(time[1]);
    return m * 60 + s;
}

//将秒转换为分
export function s_to_hs(s) {
    //计算分钟
    //算法：将秒数除以60，然后下舍入，既得到分钟数
    var h;
    h = Math.floor(s / 60);
    //计算秒
    //算法：取得秒%60的余数，既得到秒数
    s = s % 60;
    //将变量转换为字符串
    h += '';
    s += '';
    //如果只有一位数，前面增加一个0
    h = (h.length == 1) ? '0' + h : h;
    s = (s.length == 1) ? '0' + s : s;
    return h + ':' + s;
}
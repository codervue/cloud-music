import Vue from "vue"
import Vuex from "vuex"
import { getUserInfo, getState, getUserPlayList, getLikedMusicList, logOut } from "@/network/user"


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {},
        userPlayList: [],
        songsId: "",
        songsDetail: "",
        isPlay: false,
        isLogin: false,
        isShowSongsDetail: "",
        currentTime: "",
        recentList: [],
        playList: [],
        isVideo: false,
        likedMusicList: [],
        likedFunction: {}
    },
    mutations: {
        //用户信息
        userInfo(state, payload) {
            state.userInfo = payload
        },
        //用户歌单列表
        userPlayList(state, payload) {
            state.userPlayList = payload
        },
        //歌曲id
        songsId(state, payload) {
            state.songsId = payload
        },
        //歌曲详情
        songsDetail(state, payload) {
            state.songsDetail = payload
        },
        //播放状态
        isPlay(state, payload) {
            state.isPlay = payload
        },
        //用户登入状态
        isLogin(state, payload) {
            state.isLogin = payload
        },
        //歌曲详情卡片和播放列表的切换
        isShowSongsDetail(state, payload = { isShow: true, type: "musicdetail", direction: "btt", size: "100%" }) {
            state.isShowSongsDetail = payload
        },
        //当前播放时间
        currentTime(state, payload) {
            state.currentTime = payload
        },
        //最近播放
        recentList(state, payload) {
            //查询是否有相同歌曲
            const oldId = state.recentList.find(item => item.id === payload.id)
            //如果没有才提交到数组
            if (!oldId) {
                state.recentList.push(payload)
            }
        },
        //播放列表
        playList(state, payload) {
            state.playList = payload
        },
        //video和mv的切换
        isVideo(state, payload) {
            state.isVideo = payload
        },
        //用户喜欢的音乐
        getLikedMusic(state, payload) {
            state.likedMusicList = payload
        },
        //喜欢、取消喜欢音乐
        setMusic(state, payload) {
            if (payload.type === "喜欢") {
                state.likedMusicList.unshift(payload.data)
            } else if (payload.type === "取消喜欢") {
                state.likedMusicList.splice(
                    state.likedMusicList.indexOf(payload.data), 1
                )
            }
        },
        //喜欢音乐函数
        likedFunction(state, payload) {
            state.likedFunction = payload
        }
    },
    actions: {
        //获取用户信息
        getUserInfo({ commit, dispatch }) {
            let userId = localStorage.getItem("userId");
            if (!userId) return;
            getUserInfo(userId).then((res) => {
                if (res.code !== 200) return
                commit("userInfo", res.profile)
                dispatch("getUserList")
                dispatch("getState")
                dispatch("likedMusic")
            });
        },
        //获取用户歌单
        getUserList(context) {
            let userId = localStorage.getItem("userId");
            getUserPlayList(userId).then(res => {
                if (res.code !== 200) return
                context.commit("userPlayList", res.playlist)
            })
        },
        //获取登录状态
        getState(context) {
            getState().then(res => {
                if (res.data.code !== 200) return
                context.commit("isLogin", true)
            })
        },
        //获取用户喜欢音乐列表
        likedMusic(context) {
            let userId = localStorage.getItem("userId")
            getLikedMusicList(userId).then(res => {
                if (res.code !== 200) return
                context.commit("getLikedMusic", res.ids)
            })
        },
        //退出登录
        logOut(context) {
            logOut().then(res => {
                if (res.code !== 200) return
                //删除本地用户id
                localStorage.removeItem("userId");
                //提交登录状态
                context.commit("isLogin", false)
            })
        }
    }
})




export default store
import Vue from "vue"
import Vuex from "vuex"


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        getProfile: '',
        listDetailId: "",
        listDetail: "",
        songsId: "",
        songsUrl: "",
        songsDetail: "",
        isPlay: false,
        isLogin: false,
        isShowSongsDetail: false,
        songsLoading: false,
        currentTime: "",
        isOpen: false,
        drawerList: [],
        playAllFunction: "",
        searchItem: "",
        searchFunction: ""
    },
    mutations: {
        //用户个人信息
        getProfile(state, payload) {
            state.getProfile = payload
        },
        //歌单详情id
        listDetailId(state, payload) {
            state.listDetailId = payload
        },
        //歌单详情
        listDetail(state, payload) {
            state.listDetail = payload
        },
        //歌曲id
        songsId(state, payload) {
            state.songsId = payload
        },
        //歌曲播放地址
        songsUrl(state, payload) {
            state.songsUrl = payload
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
        //歌曲详情卡片状态
        isShowSongsDetail(state) {
            state.isShowSongsDetail = !state.isShowSongsDetail
        },
        //歌曲加载状态
        songsLoading(state, payload) {
            state.songsLoading = payload
        },
        //当前播放时间
        currentTime(state, payload) {
            state.currentTime = payload
        },
        //点击抽屉回调
        isOpen(state) {
            state.isOpen = !state.isOpen
        },
        //抽屉保存歌曲
        drawerList(state, payload) {
            //查询是否有相同歌曲
            const oldId = state.drawerList.find(item => item.id === payload.id)
            //如果没有才提交到数组
            if (!oldId) {
                state.drawerList.push(payload)
            }
        },
        //播放全部函数
        playAllFunction(state, payload) {
            state.playAllFunction = payload
        },
        //搜索结果值
        searchItem(state, payload) {
            state.searchItem = payload
        },
        //搜索函数
        searchFunction(state, payload) {
            state.searchFunction = payload
        }
    }
})




export default store
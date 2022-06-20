import Vue from "vue"
import VueRouter from "vue-router"


//使用路由
Vue.use(VueRouter)

const Find = () => import("@/components/find/Find")
const PersonRecommend = () => import("@/components/find/childcomps/PersonRecommend")
const SongMenu = () => import("@/components/find/childcomps/SongMenu")
const Rank = () => import("@/components/find/childcomps/Rank")
const Singer = () => import("@/components/find/childcomps/Singer")
const NewSongs = () => import("@/components/find/childcomps/NewSongs")



const Video = () => import("@/components/video/Video")
const Videos = () => import("@/components/video/childcomps/Videos")
const MV = () => import("@/components/video/childcomps/MV")

const ListDetail = () => import("@/components/detail/ListDetail")
const AlbumDetail = () => import("@/components/detail/AlbumDetail")
const ArtistDetail = () => import("@/components/detail/ArtistDetail")
const SearchDetail = () => import("@/components/detail/SearchDetail")
const VideoDetail = () => import("@/components/detail/VideoDetail")
const UserDetail = () => import("@/components/detail/UserDetail")

const MyRecommend = () => import("@/components/recommend/MyRecommend")
const Recently = () => import("@/components/recent/Recently")


const RecommendMusic = () => import("@/components/recommend/childcomps/RecommendMusic")
const RecommendList = () => import("@/components/recommend/childcomps/RecommendList")


const routes = [
    {
        path: "/",
        redirect: "/find"
    },
    {
        path: '/find',
        component: Find,
        children: [
            {
                path: "/",
                redirect: "personrecommend"
            },
            {
                path: "personrecommend",
                component: PersonRecommend
            },
            {
                path: "songmenu",
                component: SongMenu
            },
            {
                path: "rank",
                component: Rank
            },
            {
                path: "singer",
                component: Singer
            },
            {
                path: "newsongs",
                component: NewSongs
            }
        ]

    },
    {
        path: '/video',
        component: Video,
        children: [
            {
                path: "/",
                redirect: "videos"
            },
            {
                path: "videos",
                component: Videos
            },
            {
                path: "mv",
                component: MV
            }
        ]
    },
    {
        path: '/listdetail/:id',
        component: ListDetail
    },
    {
        path: '/albumdetail/:id',
        component: AlbumDetail
    },
    {
        path: '/artistdetail/:id',
        component: ArtistDetail
    },
    {
        path: '/SearchDetail/:value',
        component: SearchDetail
    },
    {
        path: '/videodetail/:vid',
        component: VideoDetail
    },
    {
        path: '/userdetail/:id',
        component: UserDetail
    },
    {
        path: '/recently',
        component: Recently
    },
    {
        path: '/myrecommend',
        component: MyRecommend,
        children: [
            {
                path: "/",
                redirect: "recommendmusic"
            },
            {
                path: "recommendmusic",
                component: RecommendMusic
            },
            {
                path: "recommendlist",
                component: RecommendList
            }
        ]
    },
]

//创建路由
const router = new VueRouter({
    mode: "history",
    routes,
})



export default router
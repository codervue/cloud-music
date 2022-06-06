import Vue from "vue"
import VueRouter from "vue-router"


//使用路由
Vue.use(VueRouter)

const Find = () => import("@/views/sider/childcomps/Find")
const Boke = () => import("@/views/sider/childcomps/Boke")
const MyLove = () => import("@/views/sider/childcomps/MyLove")
const Video = () => import("@/views/sider/childcomps/Video")
const Videos = () => import("@/components/content/video/Videos")
const MV = () => import("@/components/content/video/MV")
const ListDetail = () => import("@/components/common/listdetail/ListDetail")
const SearchResult = () => import("@/components/common/search/SearchResult")
const VideoDetail = () => import("@/components/common/videodetail/VideoDetail")


const routes = [{
    path: '',
    redirect: "/find"
},
{
    path: '/find',
    component: Find
},
{
    path: '/boke',
    component: Boke
},
{
    path: '/mylove',
    component: MyLove
},
{
    path: '/video',
    component: Video,
    children: [
        {
            path: "",
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
    path: '/listdetail',
    component: ListDetail
},
{
    path: '/searchresult',
    component: SearchResult
},
{
    path: '/videodetail',
    component: VideoDetail
},
]

//创建路由
const router = new VueRouter({
    mode: "history",
    routes,
})



export default router
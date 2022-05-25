import Vue from "vue"
import VueRouter from "vue-router"


//使用路由
Vue.use(VueRouter)



const routes = [{
    path: '',
    redirect: "/find"
},
{
    path: '/find',
    component: () =>
        import("@/views/sider/childcomps/Find"),
},
{
    path: '/boke',
    component: () =>
        import("@/views/sider/childcomps/Boke"),
},
{
    path: '/fm',
    component: () =>
        import("@/views/sider/childcomps/FM")
},
{
    path: '/mylove',
    component: () =>
        import("@/views/sider/childcomps/MyLove")
},
{
    path: '/video',
    component: () =>
        import("@/views/sider/childcomps/Video"),
    children: [
        {
            path: "",
            redirect: "videos"
        },
        {
            path: "videos",
            component: () => import("@/components/content/video/Videos"),
        },
        {
            path: "mv",
            component: () => import("@/components/content/video/MV"),
        }
    ]
},
{
    path: '/listdetail',
    component: () =>
        import("@/components/common/listdetail/ListDetail")
},
{
    path: '/searchresult',
    component: () =>
        import("@/components/common/search/SearchResult")
},
{
    path: '/videodetail',
    component: () => import("@/components/common/videodetail/videoDetail")
}
]
//创建路由
const router = new VueRouter({
    mode: "history",
    routes,
})



export default router
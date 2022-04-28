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
            component: () => import("@/components/video/Videos"),
        },
        {
            path: "mv",
            component: () => import("@/components/video/MV"),
        }
    ]
},
{
    path: '/listdetail',
    component: () =>
        import("@/components/common/ListDetail")
},
{
    path: '/searchsongs',
    component: () =>
        import("@/components/common/SearchSongs")
},
{
    path: '/videodetail',
    component: () => import("@/components/common/videoDetail")
}
]
//创建路由
const router = new VueRouter({
    mode: "history",
    routes,
})

// 解决跳转到当前路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err)
}

export default router
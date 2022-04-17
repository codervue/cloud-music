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
        import("@/views/sider/childcomps/Boke")
},
{
    path: '/cloud',
    component: () =>
        import("@/views/sider/childcomps/Cloud")
},
{
    path: '/fm',
    component: () =>
        import("@/views/sider/childcomps/FM")
},
{
    path: '/focus',
    component: () =>
        import("@/views/sider/childcomps/Focus")
},
{
    path: '/live',
    component: () =>
        import("@/views/sider/childcomps/Live")
},
{
    path: '/local',
    component: () =>
        import("@/views/sider/childcomps/Local")
},
{
    path: '/my',
    component: () =>
        import("@/views/sider/childcomps/My")
},
{
    path: '/myboke',
    component: () =>
        import("@/views/sider/childcomps/MyBoke")
},
{
    path: '/mylove',
    component: () =>
        import("@/views/sider/childcomps/MyLove")
},
{
    path: '/now',
    component: () =>
        import("@/views/sider/childcomps/Now")
},
{
    path: '/video',
    component: () =>
        import("@/views/sider/childcomps/Video")
},
{
    path: '/listdetail',
    component: () =>
        import("@/components/common/ListDetail")
}

]

const router = new VueRouter({
    mode: "history",
    routes,
})

export default router
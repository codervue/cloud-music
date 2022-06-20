import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store/index"
import VueLazyload from 'vue-lazyload'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition)
import 'default-passive-events'//使用elementui提示需要安装这个插件
//element组件的使用
import "@/plugins/element"
//全局样式引入
import "@/assets/css/base.css"
//过滤器的插入使用
import '@/plugins/utils'


Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

//图片懒加载
Vue.use(VueLazyload, {
    loading: require("./assets/img/loading.gif")
})


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
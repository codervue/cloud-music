import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store/index"
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'default-passive-events'
//全局样式引入
import "@/assets/css/base.css"
//过滤器的插入使用
import '@/plugins/utils'

Vue.use(ElementUI);
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
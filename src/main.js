import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store/index"
import 'default-passive-events'//使用elementui提示需要安装这个插件
import "@/plugins/element"
import "@/assets/css/base.css"


Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };



new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
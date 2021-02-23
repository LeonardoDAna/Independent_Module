// 导入导航栏组件
// 导入 Jquery
import $ from 'jquery';
// 导入 css 样式表
// import './src/index.css'
// 导入 vue
import Vue from 'vue'
// 导入 根组件
import app from './components/App.vue'
// 导入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// 配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 导入路由对象
import router from './src/router.js'
// 导入 axios
import axios from 'axios'
import vueAxios from 'vue-axios'
// 导入 qs 这样我们就可以在axios post请求的时候将我们传递的数据转换成后台认识的格式
import qs from 'qs'
import store from './store'
Vue.prototype.$qs = qs;
Vue.use(ElementUI)
import "./assets/animate"
/**
 * 这样写可以全局使用
 * */
Vue.use(vueAxios, axios)
window.$ = $
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

const xm = new Vue({
    el: '#app',
    render: h => h(app),
    router,
    store
})
Vue.mixin({
    data() {
        return {
            DAN_XUAN_TI: 1,
            DUO_XUAN_TI: 2,
            PAN_DUAN_TI: 3,
            LUN_SHU_TI: 0
        }
    }
})
window.xm = xm;
//由于webpack 默认只能打包处理JS类型的文件
// 如果要处理 非JS类型的文件 我们得安装 合适的 第三方 loader 加载器 
// 如果没有在package.JSON中的spript中有webpack 那就 在webpack前面加 npx 就可以了
// webpack-dev-server 给个端口号 webpack-der-server 监测到代码变化后，浏览器可以看到及时更新的效果，但是并没有自动打包修改的代码；
// webpack-dev-server 中打包生成的bundle.js 是在内存中的
// 如果想要用webpack-dev-serever的话 把html中 script src 改成根目录下的bundle.js 并把 dist 中的bundle.js删除
// webpack --watch 在监测到代码变化后自动打包修改的代码
// -d 是本地安装 -g 是全局安装
// 遇到 组件跳转传值传不过去的问题 用eventBus + computed 解决
// 之后看到可以在 <router-link> 标签中传递值  没有试过
// post 方法不知道为什么会有跨域 了解了一下是 post请求发出的之前会有一个 option 请求验证 没有解决 
// 之后所有的请求都以 GET 请求 发出 
// 最后到了删除按钮的请求发出和重定向 由于 router-link to 只跳转并不刷新 
// 用了 provide/inject 方法解决
// 先在App.vue中声明reload方法，其实就是使用isRouterAlive来控制路由的显示和隐藏，从而实现当前页面再加载了一遍，实现了刷新
// 
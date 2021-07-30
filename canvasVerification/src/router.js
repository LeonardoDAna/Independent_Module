// 导入 路由模块
import VueRouter from 'vue-router'
import Carousel from '../components/Carousel.vue'
import dateTools from '../components/dateTools.vue'
import login from '../components/login/login.vue'


const router = new VueRouter({
    routes: [{
            path: '/',
            component: login,
        },
        {
            path: '/Carousel',
            name: "Carousel",
            component: Carousel,
        },
        {
            path: '/dateTools',
            name: "dateTools",
            component: dateTools,
        }
    ]
})
// 导出
export default router
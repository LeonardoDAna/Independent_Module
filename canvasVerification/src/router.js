
// 导入 路由模块
import VueRouter from 'vue-router'
import Carousel from '../components/Carousel.vue'


const router = new VueRouter({
    routes: [
        { path: '/', component: Carousel, },
    ]
})
// 导出
export default router



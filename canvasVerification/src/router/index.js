// 导入 路由模块
import VueRouter from 'vue-router'
import Carousel from '@/components/Carousel.vue'
import dateTools from '@/components/dateTools.vue'
import home from '@/view/homePage/index.vue'
import overflowAuto from '@/view/overflowAuto.vue'
import magnifyingGlass from '@/view/magnifyingGlass/index.vue'
import canvasParticle from '@/view/canvasParticle/index.vue'
// import lifecycle from '../src/view/lifecycle/parent.vue'


const router = new VueRouter({
  routes: [{
      path: '/',
      name: "home",
      component: home,
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
    },
    {
      path: '/overflowAuto',
      name: "overflowAuto",
      component: overflowAuto,
    }, 
    {
      path: '/magnifyingGlass',
      name: "magnifyingGlass",
      component: magnifyingGlass,
    },
    {
      path: '/canvasParticle',
      name: "canvasParticle",
      component: canvasParticle,
    }
  ]
})
// 导出
export default router

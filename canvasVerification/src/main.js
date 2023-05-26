import { createApp } from 'vue'
// import { rewriteToFixed } from "@/utils/common";
// import { createPinia } from 'pinia'
import pinia from "@/stores/index"
import router from './router/index'
import App from './App.vue'
import Antd from "ant-design-vue";
// import svgIcon from "@/icons/index.vue"
// import { defineNuxtPlugin } from "@/utils/antDesignVueCom"
import * as Icons from "@ant-design/icons-vue";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

// 全局icon配置
// import 'virtual:svg-icons-register'

// import moment from "moment";
// import 'swiper/css';

//引入全部的样式 
// import 'swiper/swiper-bundle.css'
import "@/assets/style/global.scss";
import "@/assets/style/commons.scss";


// const pinia = createPinia()
const app = createApp(App)
// rewriteToFixed()
app
    .use(pinia)
    .use(router)
    .use(Antd)
app.mount('#app')
// app.component('svg-icon', svgIcon)
// defineNuxtPlugin(app)
// import '@/utils/bim3DModelCommon.js'
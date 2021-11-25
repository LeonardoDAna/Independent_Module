// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCalendarHeatmap from 'vue-calendar-heatmap'
import App from './App'
import router from './router/index.js'
import VueRouter from "vue-router"
import store from './store'
// import * as echarts from 'echarts';
// Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
import "@/assets/style/global.scss";
import "@/assets/style/commons.scss";

Vue.use(ElementUI).use(VueRouter).use(VueCalendarHeatmap);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")

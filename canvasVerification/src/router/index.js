import { createRouter, createWebHashHistory } from "vue-router";
import { routerData } from "./routerData";
import home from "@/view/home/index.vue";

export const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  // {
  //   path: '/404',
  //   name: "root",
  //   component: () => import('@/views/404.vue'),
  //   hidden: true,
  // },
];

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  scrollBehavior: () => ({
    top: 0,
  }),
  routes: routes.concat(routerData),
});
export default router;

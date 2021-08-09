export let routerDatas = [{
    name: "验证码模块",
    Tag: ['canvas', "js"],
    path: "/Carousel",
    icon: "homePage",
    component: () => import("@/components/Carousel.vue"),
    label: "",
  }, {
    name: "日历组件",
    Tag: ["js"],
    path: "/dateTools",
    component: () => import("@/components/dateTools.vue"),
    label: "",
  }, {
    name: "触底刷新",
    Tag: ["js", "elementUI"],
    path: "/overflowAuto",
    component: () => import("@/view/overflowAuto.vue"),
    label: "",
  },
  {
    name: "放大镜",
    Tag: ["js", "dom"],
    path: "/magnifyingGlass",
    component: () => import("@/view/magnifyingGlass/index.vue"),
    label: "",
  },
  {
    name: "展示父子组件渲染生命周期",
    Tag: ["js", "vue"],
    path: "/lifecycle",
    component: () => import("@/view/overflowAuto.vue"),
    label: "",
  },
  {
    name: "canvas粒子特效",
    Tag: ["js", "canvas"],
    path: "/canvasParticle",
    component: () => import("@/view/canvasParticle/index.vue"),
    label: "",
  },
  {
    name: "电子签名",
    Tag: ["js", "canvas"],
    path: "/canvasSignature",
    component: () => import("@/view/canvasSignature/index.vue"),
    label: "",
  }
]

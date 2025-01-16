import layout from "@/layout/index.vue";

export let routerData = [
  {
    name: "主页面",
    tags: ["canvas", "js"],
    path: "/homePage",
    icon: "homePage",
    component: () => import("@/view/homePage/index.vue"),
    label: "",
  },
  {
    name: "博客",
    tags: ["markdown", "js", "highlightjs"],
    path: "/blog",
    icon: "blog",
    redirect: "/blog",
    component: layout,
    children: [
      {
        path: "",
        component: () => import("@/view/blog/index.vue"),
      },
    ],
    label: "",
  },
  {
    name: "验证码模块",
    tags: ["canvas", "js"],
    path: "/Carousel",
    icon: "homePage",
    component: () => import("@/components/Carousel.vue"),
    label: "",
  },
  {
    name: "日历组件",
    tags: ["js"],
    path: "/dateTools",
    component: () => import("@/components/DateTools.vue"),
    label: "",
  },
  {
    name: "触底刷新",
    tags: ["js", "elementUI"],
    path: "/overflowAuto",
    component: () => import("@/view/overflowAuto.vue"),
    label: "",
  },
  {
    name: "放大镜",
    tags: ["js", "dom"],
    path: "/magnifyingGlass",
    component: () => import("@/view/magnifyingGlass/index.vue"),
    label: "",
  },
  {
    name: "展示父子组件渲染生命周期",
    tags: ["js", "vue"],
    path: "/lifecycle",
    component: () => import("@/view/overflowAuto.vue"),
    label: "",
  },
  {
    name: "canvas粒子特效",
    tags: ["js", "canvas"],
    path: "/canvasParticle",
    component: () => import("@/view/canvasParticle/index.vue"),
    label: "",
  },
  {
    name: "电子签名",
    tags: ["js", "canvas"],
    path: "/canvasSignature",
    component: () => import("@/view/canvasSignature/index.vue"),
    label: "",
  },
  {
    name: "颜色选择器",
    tags: ["js"],
    path: "/colorPicker",
    component: () => import("@/view/colorPicker/index.vue"),
    label: "",
  },
  {
    name: "下拉选择框",
    tags: ["js"],
    path: "/selectOption",
    component: () => import("@/view/select/index.vue"),
    label: "",
  },
  {
    name: "大转盘",
    tags: ["js", "canvas"],
    path: "/turntable",
    component: () => import("@/view/turntable/index.vue"),
    label: "",
  },
  {
    name: "波浪线条",
    tags: ["js", "css"],
    path: "/waveLine",
    component: () => import("@/view/waveLine/index.vue"),
    label: "",
  },
  {
    name: "bimface",
    tags: ["js", "css"],
    path: "/bimface",
    component: () => import("@/view/bimface/index.vue"),
    label: "",
  },
  {
    name: "多屏展示",
    tags: ["js", "css"],
    path: "/fullScreen",
    component: () => import("@/view/fullScreen/index.vue"),
    label: "",
  },
  {
    name: "动态渲染模块",
    tags: ["js", "css"],
    path: "/DynamicRenderingModule",
    component: () => import("@/view/DynamicRenderingModule/index.vue"),
    label: "",
  },
  {
    name: "拖拽盒子",
    tags: ["js", "css"],
    path: "/dragBox",
    component: () => import("@/view/dragBox/index.vue"),
    label: "",
  },
  {
    name: "使用canvas画标签",
    tags: ["js", "css", "canvas"],
    path: "/canvasDrawDom",
    component: () => import("@/view/canvasDrawDom/index.vue"),
    label: "",
  },
  {
    name: "获取每个节点的最大深度",
    tags: ["js", "递归"],
    path: "/arrayDepth",
    component: () => import("@/view/arrayDepth/index.vue"),
    label: "",
  },
  {
    name: "伪类和伪元素",
    tags: ["js"],
    path: "/Pseudo-elements&class",
    component: () => import("@/view/Pseudo-elements&class/index.vue"),
    label: "",
  },
  {
    name: "批量加水印",
    tags: ["js", "canvas"],
    path: "/watermark",
    component: () => import("@/view/waterMark/index.vue"),
    label: "",
  },
];

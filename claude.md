# Independent_Module — 项目说明（给 Claude / AI 助手）

## 项目定位

基于 **Vue 3 + Vite** 的**学习/ demo 型前端单页应用**：聚合个人博客（Markdown 预览）、Canvas/工具类小模块、以及若干独立路由页面。`package.json` 中名称为 `arcsmartenergy2-0`，为历史包名，实际用途以本仓库内容为准。

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | Vue 3 |
| 构建 | Vite 4（`type: "module"`） |
| 路由 | Vue Router 4，**Hash 模式**（`createWebHashHistory`） |
| 状态 | Pinia（`src/stores`） |
| UI | ant-design-vue 3、全局 `zhCN` 与 `dayjs` 中文 |
| 图表/工具 | echarts 4、highcharts、xlsx、swiper、crypto-js 等（按各页面使用） |
| 样式 | SCSS（`src/assets/style` 全局引入） |
| 博客/文档 | `md-editor-v3` 预览 + `vite-plugin-md` 支持 `.md` 作为资源 |

**Node 建议**：`README` 写 Node v14+；新环境优先使用 **Node 18+** 以匹配现代 Vite 生态。

## 命令

```bash
# 安装（任选其一）
npm install
pnpm install

# 开发（默认 host 为局域网可访问、自动打开浏览器）
npm run dev
# 或: pnpm run dev

# 生产构建
npm run build

# 本地预览构建结果
npm run preview
```

## 目录结构（重要路径）

```text
src/
├── main.js              # 入口：Pinia、Router、Antd、md-editor-v3、全局样式
├── App.vue              # 根组件：仅 <router-view />，含移动端简单检测 → app store
├── router/
│   ├── index.js         # 路由表：先注册 `/` → home，再 concat routerData
│   └── routerData.js   # 业务路由数据（与首页导航、layout 子路由相关）
├── layout/              # 带 header/footer 的壳子（博客、工具等使用）
├── view/                # 各功能页面（按路由子目录组织）
├── components/          # 可复用组件
├── stores/              # Pinia：modules 含 app、menu、user 等
├── assets/
│   ├── md/              # 博客用 Markdown 源文件 + index.js 文章列表
│   └── style/           # global.scss、commons.scss
└── utils/               # 通用方法
```

**路径别名**：`@` → `src`（见 `vite.config.js` 的 `resolve.alias`）。

## 路由约定

- **首页**：`/` → `view/home/index.vue`（无 layout，顶部波浪等展示）。
- **带 layout 的页面**：在 `routerData.js` 中设 `component: layout` 与 `children`；例如 `blog` 在 `/blog` 下列表与 `:id` 文章详情。
- **扁平独立页**：`routerData` 中直接 `component: () => import(...)`，路径勿与 `children` 冲突。
- 部分路由的 `name`、`path` 有重复或占位（如 lifecycle 指到 `overflowAuto`），改路由前需全局搜索引用处。

**新增一个独立页面（典型步骤）**：

1. 在 `src/view/<name>/` 下新增页面（常见为 `index.vue`）。
2. 在 `routerData.js` 增加一项：`path`、`component` 懒加载、可选 `name`、`label`、`tags`、`icon`（供导航展示）。
3. 若需出现在首页/侧栏，检查 `view/home` 或 `layout/header` 的链接与菜单数据（如 `stores/modules/menu.js`）是否需同步。

## 博客与 Markdown

- 文章列表在 `src/assets/md/index.js`：每项含 `id`、`path`（import 的 md 模块）、`name`、`updateTime`、`description`、`tags`。
- 新增文章：在 `src/assets/md/` 新建 `.md`，在 `index.js` 中 import 并加入 `list`。
- `vite.config.js` 使用 `vite-plugin-md` 与 `assetsInclude: ['**/*.md']`；部分用法为 `?raw` 导入，以具体页面为准。

## 状态与布局

- **Pinia** 在 `main.js` 中 `import pinia from "@/stores/index"` 后 `app.use(pinia)`。
- **layout**：`main_container` 为可滚动区域；header 随主区滚动在顶部外收起（`layout/index.vue`）。
- 博客内目录滚动与 `#main_container` 联动（见 `view/blog/index.vue` 中 `MdCatalog` 的 `scrollElement`）。

## 代码与协作约定

- 项目内 **Options API 与 `<script setup>` 混用**，新代码优先与**所在目录现有风格**一致。
- 用户规则要求**中文沟通**、复杂逻辑处可用 **JSDoc** 注释（与现有 `blog/index.vue` 中类型注释风格可保持一致）。
- 避免无关大重构；**最小改动**完成需求即可。

## 其他说明

- 依赖中声明了 `vuex` 与 `pinia` 并存，当前入口**仅使用 Pinia**；未确认全局使用前不要轻易移除依赖。
- 生产环境未在仓库中显式配置 `vite-plugin-compression` 等，若需上线优化可再改 `vite.config.js`。

---

*本文件供 Claude Code、Cursor 等工具读取，便于在本仓库中准确改代码。若与代码不一致，以仓库内实际实现为准。*

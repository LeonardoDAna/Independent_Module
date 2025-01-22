// import { fileURLToPath, URL } from 'node:url'

import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mdPlugin from 'vite-plugin-md';

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), mdPlugin],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行npm install @types/node --save-dev
      "@": path.resolve(__dirname, "./src"),
    },
    // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue", '.md'],
  },
  server: {
    // host: "localhost",
    host: true,
    open: true,
  },
});

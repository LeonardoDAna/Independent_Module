import waterMark from "./waterMark.md?raw";
import CSSFuture from "./css.md?raw";
import claudeCode from "./claudeCode.md?raw";
import magnifyingGlass from "./magnifyingGlass.md?raw";

const list = [
  {
    id: 1,
    content: waterMark,
    name: "Canvas水印",
    updateTime: "2025-01-22",
    description: "使用Canvas实现添加水印",
    tags: ["js", "canvas"],
  },
  {
    id: 2,
    content: CSSFuture,
    name: "CSS的未来",
    updateTime: "2025-08-24",
    description: "探索CSS未来的方向",
    tags: ["css"],
  },
  {
    id: 3,
    content: claudeCode,
    name: "claude code快速上手",
    updateTime: "2026-03-27",
    description: "AI Agent技术分享",
    tags: ["ai", "claude"],
  },
  {
    id: 4,
    content: magnifyingGlass,
    name: "放大镜功能实现",
    updateTime: "2026-04-08",
    description: "用 DOM 定位属性和 CSS background-position 实现放大镜",
    tags: ["js", "dom", "css"],
  },
];

export default list;

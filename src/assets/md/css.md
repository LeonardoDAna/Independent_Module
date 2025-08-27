# 探索 CSS 的未来

## 简单介绍
CSS 全称是 **Cascading Style Sheets**，中文意思是 层叠样式表。

它是用来 美化网页 的语言，负责控制网页的 外观和布局，比如：

- 文字颜色、大小、字体
- 背景颜色或图片
- 元素的宽度、高度、边距
- 页面布局（如居中、浮动、网格等）
- 动画和交互效果
## CSS 伪类选择器 :is(), :where(), :not() :has() 详解

> 本文将详细介绍 CSS 中的三个非常有用的伪类函数选择器：`:is()`、`:where()` 、 `:not()` 和`:has()`。它们能帮助我们更灵活、更简洁地编写 CSS 选择器。

---

## 1. `:is()` 伪类

### 概述
`:is()` 函数允许你将多个选择器组合在一起，只要元素匹配其中任何一个选择器，样式就会被应用。它类似于传统的选择器分组，但更灵活，因为它可以应用于选择器的任何部分。

### 特点
*   **不增加特异性（Specificity）**：`:is()` 内部的选择器特异性会被忽略，整个 `:is()` 选择器的特异性等于其内部选择器中**特异性最高**的那个。
*   **简化复杂选择器**：避免重复书写相同的选择器。

### 语法
```css
:is(selector1, selector2, selector3, ...)
```
### 例子 1：简化标题样式

```css
**/* 传统写法 */
h1,
h2,
h3,
nav h1,
nav h2,
nav h3 {
  color: #333;
}

/* 使用 :is() 写法 */
:is(h1, h2, h3),
nav :is(h1, h2, h3) {
  color: #333;
}**
```
`nav :is(h1, h2, h3)` 等同于` nav h1, nav h2, nav h3，`但写法更简洁。

### 例子 2：表格行悬停效果
```css
/* 传统写法 */
table tr:hover,
table tr:nth-child(even):hover {
  background-color: #f0f0f0;
}

/* 使用 :is() 写法 */
table :is(tr:hover, tr:nth-child(even):hover) {
  background-color: #f0f0f0;
}
```
这里 `:is()` 可以包含伪类，使选择器更清晰。

## 2. `:where()` 伪类

### 概述
`:where()` 的功能与 `:is()` 完全相同，用于组合多个选择器。最大的区别在于特异性。
### 特点
 · **特异性为 0：**:where() 内部的所有选择器都会被忽略特异性，整个 :where() 选择器的特异性始终为 0。这使得它非常适合作为“重置”或“默认样式”的基础，不会干扰其他高特异性的选择器。。

### 语法
```css
:where(selector1, selector2, selector3, ...)
```
### 例子 1：创建可覆盖的默认按钮样式
```css
/* 使用 :where() 定义默认按钮样式，特异性极低 */
:where(button, .btn) {
  padding: 10px 15px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
  font-size: 14px;
}

/* 即使后面定义了类选择器，也容易覆盖，因为 :where() 特异性为 0 */
.primary-btn {
  background-color: #007bff;
  color: white;
  border: none;
}
```
在这个例子中，`.primary-btn` 的特异性（10）远高于 `:where(button, .btn)`（0），所以样式能轻松覆盖。

### 例子 2：通用列表样式
```css
/* 所有 ul 和 ol 的默认样式，很容易被特定样式覆盖 */
:where(ul, ol) {
  margin: 0;
  padding-left: 20px;
  list-style: disc;
}
```

## 3. `:not()` 伪类

### 概述
`:not()` 函数用于选择不匹配指定选择器的元素。

### 特点
+ **取反：** 选择不符合条件的元素。
+ **参数限制：** 早期版本只能接受简单选择器（如类、ID、伪类等），现代浏览器支持更复杂的选择器（如复合选择器）。
+ **特异性：** `:not()` 的特异性等于其参数选择器的特异性。

### 语法
```css
:not(selector)
```

### 例子 1：排除特定类的元素
```css
/* 选择所有没有 .disabled 类的按钮 */
button:not(.disabled) {
    cursor: pointer;
  opacity: 1;
}

/* 当按钮有 .disabled 类时，应用不同样式 */
button.disabled {
    cursor: not-allowed;
  opacity: 0.6;
}
```

### 例子 2：排除特定类型的输入
```css
/* 选择所有不是 'submit' 类型的 input 元素 */
input:not([type="submit"]) {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
}
```

### 例子 3：排除第一个和最后一个子元素
```css
/* 选择除第一个和最后一个之外的所有列表项 */
li:not(:first-child):not(:last-child) {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
```
| 选择器   |           功能           |                     特异性特点 |                   主要用途 |
| :------- | :----------------------: | -----------------------------: | -------------------------: |
| :is()    | 匹配任意一个指定的选择器 | 等于其内部选择器中特异性最高的 | 简化复杂选择器，提高可读性 |
| :where() | 匹配任意一个指定的选择器 |                       始终为 0 | 定义可轻松被覆盖的默认样式 |
| :not()   | 排除匹配指定选择器的元素 |       等于其参数选择器的特异性 |     反向选择，排除特定元素 |
## 4. `:has()` 伪类

### 概述
`:has()` 是一个功能性伪类，它允许你选择**包含一个或多个与特定选择器匹配的子元素**的父元素。

**语法：**
```css
父元素:has(子元素选择器) {
  /* 样式规则 */
}
```

### 例子 1：通过内部 `input` 的状态来改变 `form-group` 样式

<iframe height="300" style="width: 100%;" scrolling="no" title=":has()_from" src="https://codepen.io/jsevalyi-the-reactor/embed/WbQzzOe?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/jsevalyi-the-reactor/pen/WbQzzOe">
  :has()_from</a> by 王Leo (<a href="https://codepen.io/jsevalyi-the-reactor">@jsevalyi-the-reactor</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## @container 容器查询

**语法：**
```css
@container { selector } { styles }
```

> 传统的媒体查询是基于视口宽度判断，而容器查询可以根据容器尺寸来应用不同样式，非常适合组件化设计

```css
@container (min-width: 400px) {
  .card {
    background: lightblue;
  }
}
```

```html
<div class="container">
  <div class="card">内容</div>
</div>
```
当父元素（.container）宽度 ≥ 400px时，.card元素会改变样式。

##  CSS `aspect-ratio` 属性

允许轻松设置元素宽高比，无需额外技巧。

```css
img, video, .box {
  aspect-ratio: 16 / 9;
}
```
### 例子：通过拖拽来改变元素的宽高

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/jsevalyi-the-reactor/embed/WbQKKVW?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/jsevalyi-the-reactor/pen/WbQKKVW">
  Untitled</a> by 王Leo (<a href="https://codepen.io/jsevalyi-the-reactor">@jsevalyi-the-reactor</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## CSS 原生嵌套语法与 SCSS/LESS 嵌套的区别

随着 CSS 规范的演进，**原生 CSS 现在支持了嵌套语法**（CSS Nesting），这使得开发者无需依赖预处理器（如 SCSS 或 LESS）也能在 CSS 文件中直接使用嵌套结构。然而，CSS 原生嵌套与 SCSS/LESS 的嵌套在语法、功能和处理方式上存在显著区别。

---

## 1. CSS 原生嵌套语法

### 概述
CSS 原生嵌套是 W3C CSS Nesting Module 的一部分，允许在一个规则块内直接嵌套另一个规则。它必须使用 `&` 符号来引用父选择器。

### 语法要求
```css
parent-selector {
  /* 样式属性 */
  property: value;

  /* 嵌套子规则，必须使用 & */
  & child-selector {
    /* 子规则样式 */
  }
}
```

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/jsevalyi-the-reactor/embed/zxvaNNv?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/jsevalyi-the-reactor/pen/zxvaNNv">
  Untitled</a> by 王Leo (<a href="https://codepen.io/jsevalyi-the-reactor">@jsevalyi-the-reactor</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


## CSS 中的“运算符”详解

虽然 CSS 没有像 JavaScript 那样的传统编程运算符（如 `+`、`-`、`&&`），但它提供了多种 **类运算符的语法和函数**，用于选择器组合、值计算和逻辑判断。

---

## 一、选择器中的组合符

用于表示元素之间的层级或兄弟关系。

| 运算符 | 名称 | 作用 | 示例 |
|--------|------|------|------|
| ` `（空格） | 后代选择器 | 选择某元素的所有后代 | `div p` → 选择 `div` 内的所有 `p` |
| `>` | 子选择器 | 选择直接子元素 | `div > p` → 仅选 `div` 的直接子 `p` |
| `+` | 相邻兄弟选择器 | 选择紧挨着的下一个兄弟 | `h1 + p` → `h1` 后面的第一个 `p` |
| `~` | 通用兄弟选择器 | 选择后面所有同级元素 | `h1 ~ p` → `h1` 后面所有的 `p` |

### 示例代码
```css
nav > ul { margin: 0; }        /* nav 的直接子 ul */
h2 + p { font-weight: bold; }  /* 紧跟 h2 的 p 加粗 */
li ~ li { margin-top: 5px; }   /* 列表项之间的间距 */
```

## 二、属性值中的数学运算函数

CSS 提供了强大的函数用于动态计算

**`calc()`：动态计算值**

```css
.width {
  width: calc(100% - 20px);     /* 100% 宽度减去 20px */
}
.margin {
  margin-left: calc(50vw - 200px); /* 视口一半宽度减去 200px */
}
```

> 注意：`calc()` 中的运算符前后必须有空格
> 错误：`calc(100%-20px)`
> 正确：`calc(100% - 20px)`

**`min()` 和 `max()`**

```css
.container {
  width: min(800px, 100%);   /* 取较小值：不超过 800px */
  height: max(100px, 50vh);  /* 取较大值：至少 100px */
}
```
**`clamp()`：设置范围（最小，首选，最大）**
```css
.title {
  font-size: clamp(16px, 4vw, 32px); /* 响应式字体 */
}
```
## 三、属性选择器中的匹配符

| 运算符 | 名称 | 作用 | 示例 |
|--------|------|------|------|
| `[attr]` | 存在属性 | `[href]` → 有 `href` 的元素 |
| `[attr="value"]` | 精确匹配 | `[type="submit"]` |
| `[attr^="val"]` | 以某值结尾 | `[href^="https"]` → HTTPS 链接 |
| `[attr$=".pdf"]` | 以某值开头 | `[href$=".pdf"]` → PDF 文件 |
| `[attr*="str"]` | 包含某字符串 | `[class*="btn"]` |
| `[attr~="word"]` | 包含某单词（空格分隔） | `[class~="active"]` |

**示例代码**

```css
a[href^="https"]::after {
  content: " 🔒";
}
```
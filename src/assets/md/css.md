# CSS `:has()` 选择器详解与实际应用

## 什么是 `:has()` 选择器？

`:has()` 是一个功能性伪类，它允许你选择**包含一个或多个与特定选择器匹配的子元素**的父元素。

**语法：**
```css
父元素:has(子元素选择器) {
  /* 样式规则 */
}
```

<iframe height="300" style="width: 100%;" scrolling="no" title=":has()_from" src="https://codepen.io/jsevalyi-the-reactor/embed/WbQzzOe?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/jsevalyi-the-reactor/pen/WbQzzOe">
  :has()_from</a> by 王Leo (<a href="https://codepen.io/jsevalyi-the-reactor">@jsevalyi-the-reactor</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

# CSS 伪类选择器 :is(), :where(), :not() 详解

本文将详细介绍 CSS 中的三个非常有用的伪类函数选择器：`:is()`、`:where()` 和 `:not()`。它们能帮助我们更灵活、更简洁地编写 CSS 选择器。

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

# 2. `:where()` 伪类

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

# 2. `:not()` 伪类

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
| 选择器 |  功能  |  特异性特点  | 主要用途 |
| :----- | :------: | -----: | -----: |
| :is() | 匹配任意一个指定的选择器 | 等于其内部选择器中特异性最高的 | 简化复杂选择器，提高可读性 |
| :where() | 匹配任意一个指定的选择器 | 始终为 0	 | 定义可轻松被覆盖的默认样式 |
| :not() | 排除匹配指定选择器的元素 | 等于其参数选择器的特异性 | 反向选择，排除特定元素 |


# CSS 原生嵌套语法与 SCSS/LESS 嵌套的区别

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
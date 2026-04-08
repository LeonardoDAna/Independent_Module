### [放大镜功能实现](http://122.51.48.31/#/tools/magnifyingGlass)

实现一个放大镜：鼠标移入左侧图片时，出现一个跟随鼠标的选区框，框内的内容同步在右侧放大展示。

本质上这是一道**坐标映射题** —— 把鼠标在左图的相对位置，换算成右图背景的偏移量。

### 技术点

- DOM 定位属性（offsetX、offsetY、offsetWidth、offsetHeight）
- CSS background-position 偏移原理
- 坐标映射公式推导

### HTML 结构

```html
<div class="allBox">
  <div class="imageBox"></div>
  <!-- rangeBox 动态插入到这里 -->
</div>
<div class="showBox"></div>
```

左侧 `allBox` 是原图容器，鼠标事件绑定在这里。`rangeBox` 是跟随鼠标的选区框，在 `mouseenter` 时动态创建，`mouseleave` 时销毁。右侧 `showBox` 展示放大后的内容。

### 监听鼠标事件

```js
allBox.addEventListener("mouseenter", onmoveStart);
allBox.addEventListener("mousemove", onmove);
allBox.addEventListener("mouseleave", onmoveEnd);
```

`mouseenter` / `mouseleave` 负责创建和销毁选区框，`mousemove` 负责实时更新位置。

### 选区框跟随鼠标

`e.offsetX / e.offsetY` 是鼠标相对于当前元素左上角的坐标，让选区框以鼠标为中心：

```js
const halfSize = 133 / 2;
let left = e.offsetX - halfSize;
let top  = e.offsetY - halfSize;

rangeBox.style.left = `${left}px`;
rangeBox.style.top  = `${top}px`;
```

### 边界限制

鼠标移到图片边缘时，选区框不能超出图片范围：

```js
let left = Math.min(Math.max(e.offsetX - halfSize, 0), allBox.offsetWidth  - 133);
let top  = Math.min(Math.max(e.offsetY - halfSize, 0), allBox.offsetHeight - 133);
```

`Math.max(..., 0)` 保证不小于 0，`Math.min(..., 容器尺寸 - 选区尺寸)` 保证不超出右/下边界。

### 坐标映射：核心公式推导

右侧 `showBox` 用 CSS 实现放大效果：

```css
.showBox[zoomed] {
  background-size: 1200px 1200px; /* 原图 400px 放大 3 倍 */
  background-position: var(--x) var(--y);
}
```

`background-position` 控制背景图从哪个位置开始显示。它的值是**负数** —— 表示把背景图向左/上平移，让对应区域出现在视口中。

推导过程：

- 选区框左上角在原图中的比例：`left / allBox.offsetWidth`
- 放大后背景图对应的像素偏移：`比例 × 放大后尺寸`
- 因为是向左平移，所以取负值

```js
const zoomedSize = 1200;
const scaleX = -(left / allBox.offsetWidth)  * zoomedSize;
const scaleY = -(top  / allBox.offsetHeight) * zoomedSize;

showBox.style.setProperty("--x", `${scaleX}px`);
showBox.style.setProperty("--y", `${scaleY}px`);
```

### 为什么必须是负值？

`background-position: -300px -300px` 的含义是：把背景图向左移 300px、向上移 300px，相当于把背景图的 (300, 300) 位置对齐到容器左上角。

如果用正值，背景图反而会向右/下偏移，显示的是错误区域。

### Vue scoped 样式的坑

`rangeBox` 是通过 `document.createElement` 动态创建的，Vue 的 `scoped` 样式会给组件内元素加上 `data-v-xxxx` 属性选择器，但动态创建的元素不携带这个属性，导致 scoped 样式对它完全失效。

解决方式：单独加一个不带 `scoped` 的 `<style>` 块：

```html
<!-- 这个 scoped 块对动态元素无效 -->
<style scoped>
.rangeBox { border: 2px solid #4f80ff; } /* 不生效 */
</style>

<!-- 单独加全局样式块 -->
<style>
.rangeBox { border: 2px solid #4f80ff; } /* 生效 */
</style>
```

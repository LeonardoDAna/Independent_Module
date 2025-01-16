### [添加水印模块](http://122.51.48.31/#/watermark)

当时开发这个功能主要是给我爱人使用的，她在某平台卖自己的玩具的时候，经常被别人盗图，所以需要在上传图片之前自己加上水印来避免。当然现在很多拍摄软件都自带了添加水印的功能, 但是秉着能重复造轮子就不引用的原则（哈哈）, 加上公司刚好又用到了 canvas 加水印的技术,便花了点时间去开发这么个小工具。

### 技术点

- canvas
- javaScript
- Vue3

首先我们先创建一个简单的 400\*400 canvas 容器，然后使用 canvas 的 API 来绘制文本。代码如下:

```vue
<template>
  <canvas ref="canvasRef" width="400px" height="400px" class="canvas_container"></canvas>
</template>
<script setup>
import { ref, onMounted, nextTick } from "vue";

const canvasRef = ref();
const config = {
  text: "Hello World",
  color: "#000",
};

onMounted(() => {
  init();
});

const init = () => {
  //  获取canvas画布
  const canvas = canvasRef.value;
  // 获取画布的应用上下文
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000000";

  let width = ctx.measureText(config.text);
  ctx.font = "30px Consolas";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(config.text, 0, 0);
};
</script>
<style scoped>
.canvas_container {
}
</style>

```

旋转文字
```js
  ctx.rotate((45 * Math.PI) / 180); // 旋转45度
  // ctx.rotate((-45 * Math.PI) / 180); // 反方向旋转45度
  ctx.fillText(config.text, 0, 0);
```

### [添加水印模块](http://122.51.48.31/#/watermark)

当时开发这个功能主要是给我爱人使用的，她在某平台卖自己的玩具的时候，经常被别人盗图，所以需要在上传图片之前自己加上水印来避免。当然现在很多拍摄软件都自带了添加水印的功能, 但是秉着能重复造轮子就不引用的原则（哈哈）, 加上公司刚好又用到了 Canvas 加水印的技术,便花了点时间去开发这么个小工具。

### 技术点

- canvas
- javaScript
- Vue3

首先我们先创建一个简单的 400\*400 Canvas 容器，然后使用 Canvas 的 API 来绘制文本。代码如下:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>example</title>
  </head>
  <body>
    <canvas id="canvasDom" width="400" height="400"></canvas>
    <script>
      // 将所需变量存储
      let config = {
        text: "Hello World",
        size: 16,
        color: "#000",
        canvasWidth: 400,
        canvasHeight: 400,
      };
      const init = () => {
        //  获取canvas画布
        const canvas = document.getElementById("canvasDom");
        // 获取画布的应用上下文
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = config.color;
        ctx.font = `${config.size}px Consolas`;
        ctx.textBaseline = "top";

        ctx.fillText(config.text, 0, 0);
      };

      try {
        init();
      } catch (err) {
        console.log(err);
      }
    </script>
  </body>
</html>
```

这样我们就能看到一个渲染在 Canvas 上的 Hello World 。

<!-- ### 旋转文字

```js
ctx.rotate((45 * Math.PI) / 180); // 旋转45度
// ctx.rotate((-45 * Math.PI) / 180); // 反方向旋转45度
ctx.fillText(config.text, 0, 0);
``` -->

添加旋转代码后 获取一个顺时针方向旋转 90° 的 文字。

### 计算数量

添加水印我们需要将文字铺满整个 Canvas 画面，我们获取到文字的宽高，以便于我们计算铺满需要多少个：

```js
let metrics = ctx.measureText(config.text);
var textWidth = metrics.width;
var textHeight =
  metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

let block_width = textWidth;
let block_height = textHeight;
// 算出有多少列多少行 向上取整
let compute_column = Math.ceil(config.canvasWidth / block_width);
let compute_line = Math.ceil(config.canvasHeight / block_height);
let count = compute_column * compute_line;
```

### 计算文字渲染的位置

当前渲染的文字定位已经超过 Canvas 容器外时,换行。

```js
for (let index = 0; index < count; index++) {
  // 计算每个绘制起始点的位置
  if (x + block_width > config.canvasWidth) {
    line++;
    column = 0;
    x = block_width * column;
    y = block_height * line;
  } else {
    x = block_width * column;
    y = block_height * line;
  }
  column++;
  ctx.fillText(config.text, 0, 0);
}
```

这时候会发现文字都挤在一起，我们给加上间距：

```js
let config = {
  text: "Hello World",
  size: 16,
  color: "#000",
  canvasWidth: 400,
  canvasHeight: 400,

  rowGap: 30, // 新增
  column: 60, // 新增
};
// ...
let block_width = textWidth + config.rowGap;
let block_height = textHeight + config.column;
```

### 旋转！

记得在旋转前 ctx.save() 默认的状态 ，不然你就会发现你的文字会旋转 i\*90°。

```js
for (let index = 0; index < count; index++) {
  // 计算每个绘制起始点的位置
  if (x + block_width > config.canvasWidth) {
    line++;
    column = 0;
    x = block_width * column;
    y = block_height * line;
  } else {
    x = block_width * column;
    y = block_height * line;
  }
  column++;
  ctx.save(); // 保存当前状态
  ctx.translate(x, y); // 移动到指定位置
  ctx.rotate((45 * Math.PI) / 180); // 旋转45度
  ctx.fillText(config.text, 0, 0);

  // ctx.rotate((-45 * Math.PI) / 180); // 反方向旋转45度
  ctx.restore(); // 恢复到之前的状态
}
```

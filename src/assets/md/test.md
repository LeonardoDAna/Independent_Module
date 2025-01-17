### [添加水印模块](http://122.51.48.31/#/watermark)

当时开发这个功能主要是给我爱人使用的，她在某平台卖自己的玩具的时候，经常被别人盗图，所以需要在上传图片之前自己加上水印来避免。当然现在很多拍摄软件都自带了添加水印的功能, 但是秉着能重复造轮子就不引用的原则（哈哈）, 加上公司刚好又用到了 canvas 加水印的技术,便花了点时间去开发这么个小工具。

### 技术点

- canvas
- javaScript
- Vue3

首先我们先创建一个简单的 400\*400 canvas 容器，然后使用 canvas 的 API 来绘制文本。代码如下:

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
      let config = {
        text: "Hello World",
        size: 16,
        color: "#000",
        gap: 20,
        boxWidth: 50,
        boxHeight: 50,

        canvasWidth: 400,
        canvasHeight: 400,
      };
      const init = () => {
        //  获取canvas画布
        const canvas = document.getElementById("canvasDom");
        // 获取画布的应用上下文
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#000000";
        ctx.font = `${config.size}px Consolas`;
        ctx.textBaseline = "top";

        let metrics = ctx.measureText(config.text);
        var textWidth = metrics.width;
        var textHeight =
          metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

        let line = 0;
        let column = 0;
        let block_width = textWidth;
        let block_height = textHeight;
        // 算出有多少列多少行
        let compute_column = config.canvasWidth / block_width;
        let compute_line = config.canvasHeight / block_height;
        let count = compute_column * compute_line;

        console.log(compute_line, config.canvasHeight, block_height);

        for (let index = 0; index < count; index++) {
          // 计算每个绘制起始点的位置
          let x, y;
          x = block_width * column;
          y = block_height * line;
          // ctx.save(); // 保存当前状态
          // ctx.translate(x, y); // 移动到指定位置
          console.log(x, y);

          column++;
          if (x + block_width > config.canvasWidth) {
            line++;
            column = 0;
          }

          // ctx.rotate((45 * Math.PI) / 180); // 旋转45度
          // ctx.rotate((-45 * Math.PI) / 180); // 反方向旋转45度
          ctx.fillText(config.text, x, y);
          // ctx.restore(); // 恢复到之前的状态
        }
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

旋转文字

```js
ctx.rotate((45 * Math.PI) / 180); // 旋转45度
// ctx.rotate((-45 * Math.PI) / 180); // 反方向旋转45度
ctx.fillText(config.text, 0, 0);
```

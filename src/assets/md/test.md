### [# 添加水印模块](http://122.51.48.31/#/watermark)

当时开发这个功能主要是给我爱人使用的，她在某平台卖自己的玩具的时候，经常被别人盗图，所以需要在上传图片之前自己加上水印来避免。当然现在很多拍摄软件都自带了添加水印的功能, 但是秉着能重复造轮子就不引用的原则（哈哈）, 加上公司刚好又用到了 canvas 加水印的技术,便花了点时间去开发这么个小工具。

### # 技术点

- canvas
- javaScript
- Vue3

首先我们先创建一个简单的 canvas 容器。(400\*400)

```vue
<template>
  <div class="canvas_container"></div>
</template>

<script></script>
```

```js
const getFiles = async (e) => {
  await nextTick();
  const files = e.target.files;

  const requestList = Array.from(files).map((file) => {
    console.log(file);
    return loadImageFromBase64(file).then((image) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      image, // 假设 loadImageFromBase64 返回的是图像数据
    }));
  });

  try {
    const images = await Promise.all(requestList);
    console.log(images);
    setupData.photoList = images;
  } catch (error) {
    console.log(error);
  }
};
```

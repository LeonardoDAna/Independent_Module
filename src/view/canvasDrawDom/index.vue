<template>
  <div ref="mainBox"></div>
</template>

<script>
export default {
  data() {
    return {
      startX: 50,
      startY: 50,
      deviceInfo: [
        {
          attributeName: "设备编号",
          value: "CP-B1-01",
        },
        {
          attributeName: "设备功能",
          value: "B1空调冷水泵",
        },
        {
          attributeName: "设计流量",
          value: "B1空调冷水泵",
        },
        {
          attributeName: "设计扬程",
          value: "35 m",
        },
        {
          attributeName: "设计效率",
          value: "75%",
        },
        {
          attributeName: "工作压力",
          value: "1.6 MPa",
        },
        {
          attributeName: "转速",
          value: "1450 rpm",
        },
      ],
    };
  },
  mounted() {
    this.createCanvas();
  },
  methods: {
    createCanvas() {
      let width = 500;
      let height = 80 * this.deviceInfo.length;
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = "#32D3A6";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#081D37";
      ctx.fillRect(35, 35, width - 70, height - 70);
      ctx.fillStyle = "#081D37";
      ctx.font = "20px Arial bolder";
      // ctx.textAlign = "center";
      // ctx.textBaseline = "middle";
      for (let i = 0; i < this.deviceInfo.length; i++) {
        ((i) => {
          let attributeName = this.deviceInfo[i].attributeName + " : ";
          let value = this.deviceInfo[i].value;
          let width = ctx.measureText(attributeName).width; //字体宽度
          ctx.fillStyle = "#fff";
          ctx.fillText(
            attributeName,
            100,
            (80 - 70 / this.deviceInfo.length) * (i + 1)
          );
          ctx.fillStyle = "#1CD3F3";
          ctx.fillText(
            value,
            100 + width,
            (80 - 70 / this.deviceInfo.length) * (i + 1)
          );
        })(i);
      }
      let mainDom = this.$refs.mainBox;
      mainDom.appendChild(canvas);
      // return canvas;
    },
  },
};
</script>

<style>
</style>
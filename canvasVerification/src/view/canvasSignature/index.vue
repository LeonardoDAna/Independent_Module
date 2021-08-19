<template>
  <!-- 电子签名 -->
  <div>
    字体颜色
    <input
      type="text"
      v-model="lineStyle.color"
      @onchange="changeColorList(e)"
    />
    字体粗细
    <input type="text" v-model="lineStyle.weight" />
    <br />
    <canvas class="canvasSignature" ref="canvasSignature"></canvas>
    <div id="operation">
      <p id="position"></p>
      <button id="clearCanvas" @click="cleanCanvas">清空</button>
      <button id="success" @click="createImg">生成图片</button>
    </div>

    <img
      id="canvasImg"
      :src="imgSrc"
      alt="生成的图片"
      width="300"
      height="150"
    />
  </div>
</template>

<script>
export default {
  name: "canvasSignature",
  data() {
    return {
      mouseDown: false,
      canvasOffSetTop: null,
      canvasOffSetLeft: null,
      startAxis: null,
      ctx: "",
      imgSrc: null,
      lineStyle: {
        color: "#000000",
        weight: 10,
      },
    };
  },
  methods: {
    changeColorList(e) {
      this.lineStyle.color = e;
    },
    // 生成图片
    createImg() {
      //将生成的图片赋给img元素
      this.imgSrc = this.$refs.canvasSignature.toDataURL("image/png");
    },
    // 清空画布
    cleanCanvas() {
      this.ctx.clearRect(0, 0, 300, 200);
    },
    draw() {
      let _ = this;
      let canvasDom = this.$refs.canvasSignature;
      this.canvasOffSetTop = canvasDom.offsetTop;
      this.canvasOffSetLeft = canvasDom.offsetLeft;
      this.ctx = canvasDom.getContext("2d"); // 定义画布
      this.$refs.canvasSignature.addEventListener("mousedown", (event) =>
        this.mousedown(event)
      );
      this.$refs.canvasSignature.addEventListener("mousemove", (event) =>
        this.mousemove(event)
      );
      this.$refs.canvasSignature.addEventListener("mouseup", (event) =>
        this.mouseup(event)
      );
    },
    mousedown(e) {
      let _ = this;
      _.mouseDown = true;
      _.startAxis = {
        x: e.clientX - _.canvasOffSetLeft,
        y: e.clientY - _.canvasOffSetTop,
      };
    },
    mousemove(e) {
      let _ = this;
      if (_.mouseDown) {
        _.ctx.beginPath();
        _.ctx.moveTo(_.startAxis.x, _.startAxis.y);
        _.ctx.lineTo(
          e.clientX - _.canvasOffSetLeft,
          e.clientY - _.canvasOffSetTop
        );
        _.ctx.strokeStyle = _.lineStyle.color;
        _.ctx.lineWidth = _.lineStyle.weight;
        _.ctx.lineCap = "round";
        _.ctx.lineJoin = "round";
        _.ctx.stroke();
        _.startAxis = {
          x: e.clientX - _.canvasOffSetLeft,
          y: e.clientY - _.canvasOffSetTop,
        };
      }
    },
    mouseup(e) {
      let _ = this;
      _.mouseDown = false;
    },
  },
  mounted() {
    this.draw();
  },
};
</script>

<style>
.canvasSignature {
  border: 1px solid #eee;
}
</style>
<template>
  <div class="main row justify-center align-middle">
    <!-- 转盘 -->
    <!-- https://guahsu.io/2018/01/vue-turntable/ -->
    <!-- https://www.jianshu.com/p/94fddad3443f -->
    <div class="turntable">
      <div class="pointer" @click="rotateFn()">
        <div class="arrowBox"></div>
        {{ pointerText }}
      </div>
      <canvas ref="canvasTable" width="500" height="500"></canvas>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "turntable",
  data() {
    return {
      radius: 250, // 半径
      rotationAngle: 0,
      rotateFinish: true,
      pointerText: "GO",
      awardsList: [
        {
          probability: 50,
          label: "默认奖项1",
          fontColor: "#000000",
          backgroundColor: "#7C64E0",
        },
        {
          probability: 50,
          label: "默认奖项2",
          fontColor: "#000000",
          backgroundColor: "#ED5792",
        },
        {
          probability: 50,
          label: "默认奖项3",
          fontColor: "#000000",
          backgroundColor: "#AFE65D",
        },
        {
          probability: 50,
          label: "默认奖项4",
          fontColor: "#000000",
          backgroundColor: "#5DE6E6",
        },
        {
          probability: 50,
          label: "默认奖项5",
          fontColor: "#000000",
          backgroundColor: "#EE0030",
        },
        {
          probability: 50,
          label: "默认奖项6",
          fontColor: "#000000",
          backgroundColor: "#D78A18",
        },
      ],
    };
  },
  methods: {
    sectorDraw(target, firstAngle, secondAngle, label) {
      target.save();
      target.beginPath();
      target.moveTo(0, 0);
      target.arc(
        0,
        0,
        this.radius,
        (firstAngle * Math.PI) / 180,
        (secondAngle * Math.PI) / 180,
        false
      );
      // target.lineWidth = 0.5;
      // 绘制边框
      // target.strokeStyle = "#ffffff";
      // target.stroke();
      // target.fillStyle = "#fff";
      // target.font = "25px sans-serif";
      // target.translate(100, 100);
      // ctx.fillStyle = "#000000";
      // target.textAlign = "center";
      // target.fillText(label, 0, 100);
      target.closePath();
      target.restore();
    },
    getRandomValue() {
      let chosedPrize = parseInt(Math.random() * this.awardsList.length);
      return 5 * 360 + (360 / this.awardsList.length) * chosedPrize;
    },
    rotateFn() {
      this.rotationAngle += this.getRandomValue();
      this.$refs.canvasTable.style.transform = `rotate(${this.rotationAngle}deg)`;
    },
    tableDraw() {
      let ctx = this.$refs.canvasTable.getContext("2d");
      for (let i = 0; i < this.awardsList.length; i++) {
        // 保存当前状态
        ctx.save();
        // 开始一条新路径
        ctx.beginPath();
        // 位移到圆心，下面需要围绕圆心旋转
        ctx.translate(250, 250);
        // 从(0, 0)坐标开始定义一条新的子路径
        ctx.moveTo(0, 0);
        // 绘制圆弧
        // ctx.rotate((((360 / this.awardsList.length) * i + 360 / this.awardsList.length / 2) * Math.PI) / 180);

        this.sectorDraw(
          ctx,
          i * (360 / this.awardsList.length),
          (i + 1) * (360 / this.awardsList.length),
          this.awardsList[i].label
        );
        ctx.fillStyle = this.awardsList[i].backgroundColor;
        // 填充扇形
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "25px sans-serif";
        ctx.textAlign = "center";
        ctx.rotate((((360 / this.awardsList.length) * i + 360 / this.awardsList.length / 2) * Math.PI) / 180);
        // ctx.translate(140, 0);
        // ctx.rotate((Math.PI / this.awardsList.length) * (this.awardsList.length - 1));
        ctx.fillText(this.awardsList[i].label, 140, 0);
        // 恢复前一个状态
        ctx.restore();
      }
    },
  },
  mounted() {
    this.tableDraw();
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
}
.turntable {
  canvas {
    width: 500px;
    height: 500px;
    transition: all 6s ease-out;
  }
  position: relative;
  height: 500px;
  overflow: hidden;
  border-radius: 50%;
  border: 5px solid rgb(255, 255, 255);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}
.arrowBox {
  // background-color: rgb(255, 55, 55);
  position: absolute;
  width: 0;
  height: 0;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  border-top: 0 solid black;
  border-right: 25px solid transparent;
  border-left: 25px solid transparent;
  border-bottom: 40px solid rgb(255, 55, 55);
}
.pointer {
  z-index: 100;
  cursor: pointer;
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  text-align: center;
  line-height: 100px;
  font-size: 40px;
  color: #ffffff;
  background-color: rgb(255, 55, 55);
  border: 5px solid rgb(255, 255, 255);
}
</style>
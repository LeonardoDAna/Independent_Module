<template>
  <div class="main row justify-center align-middle">
    <!-- 转盘 -->
    <!-- https://guahsu.io/2018/01/vue-turntable/ -->
    <!-- https://www.jianshu.com/p/94fddad3443f -->
    <div class="turntable">
      <canvas ref="turntable" width="500" height="500"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "turntable",
  data() {
    return {
      awardsList: [
        {
          probability: 50,
          label: "默认奖项1",
          fontColor: "#000000",
          backgroundColor: "#ffffff",
        },
        {
          probability: 50,
          label: "默认奖项2",
          fontColor: "#000000",
          backgroundColor: "#ffffff",
        },
        {
          probability: 50,
          label: "默认奖项2",
          fontColor: "#000000",
          backgroundColor: "#ffffff",
        },
        {
          probability: 50,
          label: "默认奖项2",
          fontColor: "#000000",
          backgroundColor: "#ffffff",
        },
      ],
    };
  },
  methods: {
    draw() {
      let ctx = this.$refs.turntable.getContext("2d");
      for (let i = 0; i < this.awardsList.length; i++) {
        // 保存当前状态
        ctx.save();
        // 开始一条新路径
        ctx.beginPath();
        // 位移到圆心，下面需要围绕圆心旋转
        ctx.translate(250, 250);
        // 从(0, 0)坐标开始定义一条新的子路径
        ctx.moveTo(0, 0);
        // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
        ctx.rotate(
          (((360 / this.awardsList.length) * i +
            360 / this.awardsList.length / 2) *
            Math.PI) /
            180
        );

        // 绘制圆弧
        ctx.arc(0, 0, 250, 0, (2 * Math.PI) / this.awardsList.length, false);
        if (i % 2 == 0) {
          ctx.fillStyle = "#b0e0e6";
        } else {
          ctx.fillStyle = "#e4c6d0";
        }
        // 填充扇形
        ctx.fill();
        // 绘制边框
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.font = "18px sans-serif";
        ctx.translate(150, 100);
        ctx.rotate((Math.PI / this.awardsList.length) * 3);
        if (i == 0) {
          ctx.fillText("六元红包", 0, 0);
        }
        if (i == 1) {
          ctx.fillText("没红包", 0, 0);
        }
        if (i == 2) {
          ctx.fillText("流量大赠送", 0, 0);
        }
        if (i == 3) {
          ctx.fillText("谢谢惠顾", 0, 0);
        }
        // 恢复前一个状态
        ctx.restore();
      }
    },
  },
  mounted() {
    this.draw();
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
  }
  height: 500px;
  border-radius: 50%;
  border: 5px solid rgb(175, 175, 175);
  // box-shadow: ;
}
</style>
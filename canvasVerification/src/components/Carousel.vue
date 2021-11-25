<template>
  <div>
    <div>
      <el-button type="primary" @click="showVerification">验证码弹窗</el-button>
    </div>
    <!-- <canvas id="canvas" @click="change"></canvas> -->

    <!-- 验证码模块 -->
    <el-dialog
      title="请输入图中的结果"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div slot class="canvas-wrap">
        <canvas
          id="canvas"
          style="width: 300px; height: 100px"
          @click="change"
        ></canvas>
      </div>
      <!-- <div class="canvas-wrap"> -->
      <!-- <canvas id="otherCanvas" style="width:300px;height:100px" @click="change"></canvas> -->
      <!-- </div> -->
      <div class="code-input-wrap">
        <el-input-number
          v-model="inputResult"
          @change="getInputVal"
          label="描述文字"
        ></el-input-number>
      </div>
      <!-- <div class="code-button-wrap">
        <div bindtap="confirmCode" class="code-btn-confirm">确定</div>
      </div> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmCode">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Carousel",
  data() {
    return {
      dialogVisible: false,
      inputResult: null,
      actualResult: null,
      inputResult: null,
    };
  },
  created() {
    // this.drawPic();
  },
  mounted() {},
  methods: {
    showVerification() {
      this.dialogVisible = true;
      // dialog 组件是懒加载的  需要在页面展示的时候加上 this.$nextTick(()=>{})
      this.$nextTick(() => {
        this.drawPic();
      });
    },
    // 点击更换验证码
    change: function () {
      this.drawPic();
    },
    // 随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    /**生成一个随机色**/
    randomColor(min, max) {
      var r = this.randomNum(min, max);
      var g = this.randomNum(min, max);
      var b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    },

    /**绘制验证码图片**/
    drawPic() {
      // var ctx = wx.createCanvasContext("canvas");
      var canvas = document.getElementById("canvas");
      console.log(canvas);
      var ctx = canvas.getContext("2d");
      // var ctx = otherCanvas.getContext("2d");
      /**绘制背景色**/
      ctx.fillStyle = this.randomColor(180, 240); //颜色若太深可能导致看不清
      // ctx.fillRect(0, 0, 110, 36);
      // ctx.fillRect(0, 0, 220, 100)
      ctx.fillRect(0, 0, 300, 150);
      /**绘制文字**/
      var arr;
      var text = "";
      var str = "123456789";
      var markStr = "+-";
      var num1 = str[this.randomNum(0, str.length)];
      var calMark = markStr[this.randomNum(0, markStr.length)];
      var num2 = str[this.randomNum(0, str.length)];
      var middleNum = "";
      var finalResult = 0;
      if (calMark === "-" && num1 < num2) {
        console.log("出发");
        middleNum = num1;
        num1 = num2;
        num2 = middleNum;
      }
      if (calMark === "-") {
        finalResult = Number(num1) - Number(num2);
      } else {
        finalResult = Number(num1) + Number(num2);
      }
      this.actualResult = finalResult;
      for (var i = 0; i < 5; i++) {
        switch (i) {
          case 0:
            var txt = num1;
            break;
          case 1:
            var txt = calMark;
            break;
          case 2:
            var txt = num2;
            break;
          case 3:
            var txt = "=";
            break;
          case 4:
            var txt = "?";
            break;
        }
        ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色
        ctx.font = this.randomNum(40, 52) + "px SimHei"; //随机生成字体大小
        var x = 5 + i * 20;
        var y = this.randomNum(25, 29);
        var deg = this.randomNum(-20, 20);
        //修改坐标原点和旋转角度
        ctx.translate(x, y);
        if (i == 0 || i == 2) {
          ctx.rotate((deg * Math.PI) / 180);
        }

        ctx.textAlign = "center";
        ctx.fillText(txt, 100, 50);
        text = text + txt;
        //恢复坐标原点和旋转角度
        if (i == 0 || i == 2) {
          ctx.rotate((-deg * Math.PI) / 180);
        }
        ctx.translate(-x, -y);
      }
      /**绘制干扰线**/
      // for (var i = 0; i < 4; i++) {
      //     ctx.strokeStyle = this.randomColor(40, 180);
      //     ctx.beginPath();
      //     ctx.moveTo(this.randomNum(0, 90), this.randomNum(0, 28));
      //     ctx.lineTo(this.randomNum(0, 90), this.randomNum(0, 28));
      //     ctx.stroke();
      // }
      // /**绘制干扰点**/
      // for (var i = 0; i < 20; i++) {
      //     ctx.fillStyle = this.randomColor(0, 255);
      //     ctx.beginPath();
      //     ctx.arc(this.randomNum(0, 90), this.randomNum(0, 28), 1, 0, 2 * Math.PI);
      //     ctx.fill();
      // }
      // ctx.draw();
    },
    // 获取输入验证码
    getInputVal(e) {},
    // 验证输入验证码
    confirmCode() {
      if (this.inputResult === "") {
        this.$message.warning("请输入结果");
        return;
      }
      if (this.inputResult != this.actualResult) {
        this.$message.error("输入错误");

        this.inputResult = "";

        this.drawPic();
      } else {
        this.$message.success("验证成功");
        this.dialogVisible = false;
        this.codeDialogShow = false;
        this.inputResult = "";
      }
    },
  },
};
</script>
<style lang="scss">
#app {
  margin: 0 auto;
}
.code-dialog-wrap .weui-dialog__ft {
  display: none !important;
}

.canvas-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}

.code-input-wrap {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.code-input-item {
  height: 80px;
  color: #000;
  width: 200px;
  border: 1px solid #eee;
}

.code-button-wrap {
  margin-top: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  /* border-top: 1px solid #000; */
}

.code-button-wrap .code-btn-confirm {
  color: #ff8901;
  height: 88px;
  line-height: 88px;
  padding: 16px 0;
}

.code-dialog-wrap .weui-dialog__bd {
  padding: 0;
  margin-bottom: 0;
}
</style>
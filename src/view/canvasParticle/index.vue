<template>
  <div class="canvasBox" ref="canvasBox">
    <div class="controlPanel row">
      <ul class="my-px-10">
        <li
          class="row align-middle"
          v-for="(item, index) in colorList"
          :key="index"
        >
          <div class="colorlump" :style="{ backgroundColor: item }"></div>
          <input
            type="text"
            v-model="colorList[index]"
            @onchange="chengColorList(e, index)"
          />
        </li>
      </ul>
      <div class="particlesLength">粒子总数：{{ particles.length }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "canvasParticle",
  data() {
    return {
      colorList: [
        "#69D2E7",
        "#A7DBD8",
        "#E0E4CC",
        "#F38630",
        "#FA6900",
        "#FF4E50",
        "#F9D423",
      ],
      wW: window.innerWidth,
      wH: window.innerHeight,
      particles: [],
      ctx: "",
    };
  },
  methods: {
    chengColorList(e, index) {
      console.log(e, index);
      this.colorList[index] = e;
    },
    initCanvasDom() {
      let _ = this;
      let canvasDom = this.$refs.canvasBox;
      let canvas = document.createElement("canvas");
      canvasDom.appendChild(canvas);
      this.ctx = canvas.getContext("2d"); // 定义画布
      canvas.width = this.wW;
      canvas.height = this.wH;
      canvas.addEventListener("mousemove", function (e) {
        _.spawn(e.pageX, e.pageY);
      });
    },
    spawn(eX, eY) {
      let particle = this.initParticle({ x: eX, y: eY });
      this.particles.push(particle);
    },
    random(min, max) {
      if (min.sort) {
        //如果他有sort那他就是数组
        return min[~~(Math.random() * min.length)];
      } else {
        return ~~(min + Math.random() * (max - min));
      }
    },
    render() {
      //粒子运动 绘制函数
      this.ctx.clearRect(0, 0, this.wW, this.wH);
      for (let i = 0, len = this.particles.length; i < len; i++) {
        //循环粒子数组
        this.particles[i].draw(this.ctx);
        this.particles[i].upData();
      }
    },
    // init() {},
    initParticle(opt) {
      function Particle(opt, _) {
        this.init(opt, _);
      }
      Particle.prototype = {
        //原型方法
        init: function (opt, _) {
          //粒子初始化行为
          this.x = opt.x || 0;
          this.y = opt.y || 0;
          this.radius = _.random(15, 40);
          this.color = _.random(_.colorList); //随机颜色
          this.force = _.random(2, 8);
          this.theta = _.random(0, Math.PI * 2); //角度
          this.vx = Math.cos(this.theta) * this.force; //角动量X
          this.vy = Math.sin(this.theta) * this.force;
        },
        upData: function () {
          this.x += this.vx;
          this.y += this.vy;

          this.vx += Math.cos(this.theta) * 0.1;
          this.vy += Math.sin(this.theta) * 0.1;

          //摩擦系数
          this.vx *= 0.92;
          this.vy *= 0.92;
          //变小
          this.radius *= 0.94;
        },
        draw: function (ctx) {
          ctx.beginPath(); //清除路径
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); //绘制圆 圆心x 圆心y 半径 起始角度 结束角度
          ctx.fillStyle = this.color;
          ctx.globalCompositeOperation = "lighter";
          ctx.fill();
        },
      };
      return new Particle(opt, this);
    },
  },
  watch: {
    particles(val, oldVal) {
      if (this.particles.length >= 300) {
        this.particles.splice(0,100);
      }
    },
  },
  mounted() {
    this.initCanvasDom();
    const timer = setInterval(() => {
      // 开始循环 //
      requestAnimationFrame(this.render.bind(this)); //帧动画递归
    }, 17);
    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
};
</script>

<style lang="scss" scoped>
.canvasBox {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #222;
}
.controlPanel {
  width: 300px;
  // height: 150px;
  position: absolute;
  right: 0;
  top: 0;
  background-color: #ffffff85;
  ul {
    padding: 0;
    margin: 0;
    li {
      list-style: none;
    }
  }
}
.colorlump {
  width: 10px;
  height: 10px;
}
</style>
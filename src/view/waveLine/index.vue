<template>
  <!-- 
  waveLine
  sourceUrl : https://codepen.io/leowangHy/pen/eYEOEbv 
  anthor : Daniel Österman
  date   : 2019 
  -->
  <!-- 
  Background Gradient
  sourceUrl : https://codepen.io/quasimondo/pen/lDdrF 
  anthor : Mario Klingemann
  date   : none 
  -->

  <div class="header" ref="headerDom">
    <div class="inner-header flex">
      <!-- <h1>Simple CSS Waves</h1> -->
      <img src="@/assets/img/logo.png" alt="" />
      <h1 class="my-ml-10">LeonardeDAna's Blog</h1>
    </div>

    <!--Waves Container-->
    <div>
      <svg
        class="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="0"
            fill="rgba(255,255,255,0.7"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="3"
            fill="rgba(255,255,255,0.5)"
          />
          <use
            xlink:href="#gentle-wave"
            x="48"
            y="5"
            fill="rgba(255,255,255,0.3)"
          />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
    <!--Waves end-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        [62, 35, 255],
        [60, 255, 60],
        [255, 35, 98],
        [45, 175, 230],
        [255, 0, 255],
        [255, 128, 0],
      ],
      step: 0,
      colorIndices: [0, 1, 2, 3],
      gradientSpeed: 0.002,
      timer: null,
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.updateGradient();
    }, 50);
  },
  beforeUnmount() {
    console.log("beforeUnmount");

    clearInterval(this.timer);
  },
  methods: {
    updateGradient() {
      var c0_0 = this.colors[this.colorIndices[0]];
      var c0_1 = this.colors[this.colorIndices[1]];
      var c1_0 = this.colors[this.colorIndices[2]];
      var c1_1 = this.colors[this.colorIndices[3]];

      var istep = 1 - this.step;
      var r1 = Math.round(istep * c0_0[0] + this.step * c0_1[0]);
      var g1 = Math.round(istep * c0_0[1] + this.step * c0_1[1]);
      var b1 = Math.round(istep * c0_0[2] + this.step * c0_1[2]);
      var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

      var r2 = Math.round(istep * c1_0[0] + this.step * c1_1[0]);
      var g2 = Math.round(istep * c1_0[1] + this.step * c1_1[1]);
      var b2 = Math.round(istep * c1_0[2] + this.step * c1_1[2]);
      var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

      this.$nextTick(() => {
        this.$refs.headerDom.style.background = `-webkit-gradient(linear, left top, right top, from(${color1}),to(${color2}))`;
        this.$refs.headerDom.style.background = `-moz-linear-gradient(left, "${color1}" 0%, "${color2}" 100%`;
      });

      this.step += this.gradientSpeed;
      if (this.step >= 1) {
        this.step %= 1;
        this.colorIndices[0] = this.colorIndices[1];
        this.colorIndices[2] = this.colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        this.colorIndices[1] =
          (this.colorIndices[1] +
            Math.floor(1 + Math.random() * (this.colors.length - 1))) %
          this.colors.length;
        this.colorIndices[3] =
          (this.colorIndices[3] +
            Math.floor(1 + Math.random() * (this.colors.length - 1))) %
          this.colors.length;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: "Lato", sans-serif;
  font-weight: 300;
  letter-spacing: 2px;
  font-size: 48px;
}
p {
  font-family: "Lato", sans-serif;
  letter-spacing: 1px;
  font-size: 14px;
  color: #333333;
}

.header {
  height: 100%;
  position: relative;
  text-align: center;
  background: linear-gradient(
    60deg,
    rgba(84, 58, 183, 1) 0%,
    rgba(0, 172, 193, 1) 100%
  );
  color: white;
}
.logo {
  width: 50px;
  fill: white;
  padding-right: 15px;
  display: inline-block;
  vertical-align: middle;
}

.inner-header {
  img {
    width: 50px;
    border-radius: 50%;
  }
  height: 65vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

.flex {
  /*Flexbox for containers*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.waves {
  position: relative;
  width: 100%;
  height: 15vh;
  margin-bottom: -7px; /*Fix for safari gap*/
  min-height: 100px;
  max-height: 150px;
}

.content {
  position: relative;
  height: 20vh;
  text-align: center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height: 40px;
    min-height: 40px;
  }
  .content {
    height: 30vh;
  }
  h1 {
    font-size: 24px;
  }
}
</style>
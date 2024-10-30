<template>
  <!-- Pseudo-elements&class -->
  <div class="my-pa-20 row">
    <div class="firstBtn textCenter fs-30 my-px-20">斜角</div>
    <div class="secondBtn textCenter fs-30 my-px-20">
      <span>背景填充</span>
    </div>
    <div class="thirdBtn textCenter fs-30"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
$green: #2ecc71;
$red: #e74c3c;
$blue: #3498db;
$yellow: #f1c40f;
$purple: #8e44ad;
$turquoise: #1abc9c;
.firstBtn {
  box-sizing: border-box;
  cursor: pointer;
  width: fit-content;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  height: 100px;
  min-width: 100px;
  border: $yellow solid 1px;
  color: $yellow;
  background: {
    image: linear-gradient(45deg, $yellow 50%, transparent 50%);
    position: 100%;
    size: 400%;
  }
  transition: 0.3s ease-in-out;

  &:hover {
    background-position: 0;
    color: #fff;
  }
}
.secondBtn {
  box-sizing: border-box;
  cursor: pointer;
  width: fit-content;
  color: $blue;
  border-radius: 10px;
  border: $blue solid 1px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  height: 100px;
  position: relative;
  min-width: 100px;
  transition: all 0.3s ease-in-out;
  // &:hover,
  &::after {
    // background-position: 0;
    content: "背景填充";
    border-radius: 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    transition: opacity 0.3s ease-out;
    z-index: 1;
    opacity: 0;
    border: $blue solid 1px;
    height: 100%;
    min-width: 100%;
    background: $blue;
  }
  &::after &:hover {
    opacity: 1;
  }
}
.secondBtn:hover:after {
  opacity: 1;
}
.thirdBtn {
  box-sizing: border-box;
  cursor: pointer;
  width: fit-content;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  // clip: rect(20px, 400px, 30px, 0px);
  min-width: 400px;
  position: relative;
  height: 100px;
  background: linear-gradient(45deg, transparent 5%, red 5%);
  &::after {
    position: absolute;
    line-height: 100px;
    text-align: center;
    width: 100%;
    height: 100%;
    content: "AVAILABLE NOW";
  }
}
.thirdBtn:hover::after {
  --slice-0: rect(0px, 0px, 0px, 0px);
  --slice-1: rect(10px, 400px, 20px, 0px);
  --slice-2: rect(30px, 400px, 40px, 0px);
  --slice-3: rect(50px, 400px, 60px, 0px);
  --slice-4: rect(70px, 400px, 80px, 0px);
  --slice-6: rect(90px, 400px, 100px, 0px);
  content: "AVAILABLE NOW";
  display: block;
  /* 内联高度 */

  /* 斜角渐变里，加一点蓝色 */
  background: linear-gradient(45deg, transparent 3%, #00e6f6 5%, red 5%);
  /* 文本阴影，可以添加多个，逗号相隔 */
  text-shadow: -3px -3px 0px yellow, 3px 3px 0px #00e6f6;
  /* 默认状态裁剪不显示，后续动画改 */
  visibility: hidden;
  /* 动画 执行2秒 */
  animation: 1s steps(2) 0s infinite normal glitch;
}
.textCenter {
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  // border: $yellow solid 1px;
  // color: $yellow;
}

@keyframes glitch {
  0% {
    visibility: visible;
    clip: var(--slice-1);
    transform: translate(-20px, -10px);
  }

  10% {
    clip: var(--slice-3);
    transform: translate(10px, 10px);
  }

  20% {
    clip: var(--slice-1);
    transform: translate(-10px, 10px);
  }

  30% {
    clip: var(--slice-3);
    transform: translate(0px, 5px);
  }

  40% {
    clip: var(--slice-2);
    transform: translate(-5px, 0px);
  }

  50% {
    clip: var(--slice-3);
    transform: translate(5px, 0px);
  }

  60% {
    clip: var(--slice-4);
    transform: translate(5px, 10px);
  }

  70% {
    clip: var(--slice-2);
    transform: translate(-10px, 10px);
  }

  80% {
    clip: var(--slice-5);
    transform: translate(20px, -10px);
  }

  90% {
    clip: var(--slice-1);
    transform: translate(-10px, 0px);
  }

  100% {
    clip: var(--slice-1);
    transform: translate(0);
  }
}
</style>
<template>
  <div class="header_container">
    <div class="operation">
      <span @click="goBlog">日志</span>
      <span>技术文档</span>
      <span>摘要</span>
    </div>
    <div class="headerImg">
      <img class="logoImg" src="@/assets/img/logo.png" alt="" />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.header_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  //   line-height: 60px;
  padding: 0 20px;
  background-color: #fff;
  span {
    font-weight: 300;
    margin-right: 20px;
    font-family: "Lato", sans-serif;
    letter-spacing: 1px;
    color: #000000;
  }
}
.operation {
  position: relative;
  span {
    cursor: pointer;
    position: relative;
    transition: 3s ease-in-out;
    padding: 5px 0;
  }
  &:nth-child(2) {
    animation-delay: 0.4s;
  }
  &:nth-child(3) {
    animation-delay: 0.6s;
  }
  &:nth-child(4) {
    animation-delay: 0.8s;
  }
}
.operation span::before {
  transform: scaleX(0);
  transform-origin: bottom right;
}
.operation span:hover::before {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.operation span::before {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  inset: 0 0 0 0;
  border-bottom: 1px solid #000000;
  // background: hsl(200 100% 80%);
  z-index: -1;
  transition: transform 0.3s ease;
}
.logoImg {
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
  //   border: 1px solid #222;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
}
</style>

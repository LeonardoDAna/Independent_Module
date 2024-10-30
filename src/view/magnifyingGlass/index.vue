<template>
  <div class="main row align-middle">
    <div class="allBox" ref="allBox">
      <div class="imageBox"></div>
    </div>
    <div class="showBox"></div>
  </div>
</template>

<script>
export default {
  name: "magnifyingGlass",
  data() {
    return {};
  },
  mounted(){
    this.bindMoveFn()
  },
  methods: {
    bindMoveFn() {
      let allBox = this.$refs.allBox
      allBox.addEventListener("mouseenter", this.onmoveStart);
      allBox.addEventListener("mousemove", this.onmove);
      allBox.addEventListener("mouseleave", this.onmoveEnd);  
    },
    onmoveStart(e) {
      let rangeBox = document.createElement("div");
      let allBox = document.querySelector(".allBox");
      // rangeBox.setAttribute("class", "rangeBox");
      rangeBox.className = "rangeBox"
      allBox.appendChild(rangeBox);
    },

    onmove(e) {
      let rangeBox = document.querySelector(".rangeBox");
      let showBox = document.querySelector(".showBox");
      let rect = [e.offsetX, e.offsetY];
      let eventH = rect[0] / showBox.offsetHeight;
      let eventW = rect[1] / showBox.offsetWidth;
      // if (e.offsetX >= rangeBox.offsetHeight / 2) {
      rangeBox.style.left = `${rect[0] - 133 / 2}px`;
      // }else if(e.offsetY >= rangeBox.offsetWidth / 2){
      rangeBox.style.top = `${rect[1] - 133 / 2}px`;
      // }
      console.log(e.offsetX, e.offsetY);
      showBox.setAttribute("zoomed", 1);
      showBox.style.setProperty("--x", eventH);
      showBox.style.setProperty("--y", eventW);
    },

    onmoveEnd(e) {
      let rangeBox = document.querySelector(".rangeBox");
      let showBox = document.querySelector(".showBox");
      showBox.removeAttribute("zoomed", 1);
      e.target.removeChild(rangeBox);
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
}
.imageBox {
  width: 400px;
  height: 400px;
  background-image: url("~@/assets/img/counting.jpg");
  /* background-position: 100% 100%; */
  background-repeat: no-repeat;
  background-size: 100% 100%;

  /* position: relative; */
}
.allBox {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
}
.showBox {
  width: 400px;
  height: 400px;
  background-image: url("~@/assets/img/counting.jpg");
  /* background-position: 100% 100%; */
  background-repeat: no-repeat;
  margin: 0 auto;
  background-size: 100% 100%;
}
.showBox[zoomed] {
  background-size: 1200px 1200px;
  background-position: calc(var(--x) * 100%) calc(var(--y) * 100%);
}
.rangeBox {
  /* border: 1px solid #006dfb; */
  pointer-events: none;
  border: 1px solid red;
  background-color: rgba(44, 26, 26, 0.342);
  /* width: calc(400/3); */
  /* height: calc(400/3); */
  z-index: 100;
  width: 133px;
  height: 133px;
  position: absolute;
  /* top: calc(var(--absoX));
      left: calc(var(--absoY)); */
}
</style>
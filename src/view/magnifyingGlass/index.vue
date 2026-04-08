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
    return {
      rangeBox: null,
    };
  },
  mounted() {
    this.bindMoveFn();
  },
  methods: {
    bindMoveFn() {
      let allBox = this.$refs.allBox;
      allBox.addEventListener("mouseenter", this.onmoveStart);
      allBox.addEventListener("mousemove", this.onmove);
      allBox.addEventListener("mouseleave", this.onmoveEnd);
    },
    onmoveStart(e) {
      const rangeBox = document.createElement("div");
      rangeBox.className = "rangeBox";
      this.$refs.allBox.appendChild(rangeBox);
      this.rangeBox = rangeBox;
    },

    onmove(e) {
      const rangeBox = this.rangeBox;
      const showBox = document.querySelector(".showBox");
      const allBox = this.$refs.allBox;
      const halfSize = 133 / 2;

      // 边界限制
      let left = Math.min(Math.max(e.offsetX - halfSize, 0), allBox.offsetWidth - 133);
      let top = Math.min(Math.max(e.offsetY - halfSize, 0), allBox.offsetHeight - 133);

      rangeBox.style.left = `${left}px`;
      rangeBox.style.top = `${top}px`;

      // 修复 X/Y 对应关系，基于放大后背景尺寸计算 position
      const zoomedSize = 1200;
      const scaleX = -(left / allBox.offsetWidth) * zoomedSize;
      const scaleY = -(top / allBox.offsetHeight) * zoomedSize;

      showBox.setAttribute("zoomed", 1);
      showBox.style.setProperty("--x", `${scaleX}px`);
      showBox.style.setProperty("--y", `${scaleY}px`);
    },

    onmoveEnd(e) {
      if (this.rangeBox) {
        this.$refs.allBox.removeChild(this.rangeBox);
        this.rangeBox = null;
      }
      const showBox = document.querySelector(".showBox");
      showBox.removeAttribute("zoomed");
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
  background-image: url("@/assets/img/counting.jpg");
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
  background-image: url("@/assets/img/counting.jpg");
  background-repeat: no-repeat;
  margin: 0 auto;
  background-size: 100% 100%;
}
.showBox[zoomed] {
  background-size: 1200px 1200px;
  background-position: var(--x) var(--y);
}
.rangeBox {
  pointer-events: none;
  border: 2px solid #4f80ff;
  background-color: rgba(79, 128, 255, 0.1);
  z-index: 100;
  width: 133px;
  height: 133px;
  position: absolute;
  box-sizing: border-box;
}
</style>

<style>
.rangeBox {
  pointer-events: none;
  border: 2px solid #4f80ff;
  background-color: rgba(79, 128, 255, 0.1);
  z-index: 100;
  width: 133px;
  height: 133px;
  position: absolute;
  box-sizing: border-box;
}
</style>
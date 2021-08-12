<template>
  <div class="row align-middle flex-direction">
    <div class="colorBox">
      <div
        class="firstFloor"
        :style="{ backgroundColor: colorList[pickerDistance] }"
      >
        <div class="secondFloor"></div>
        <div class="thirdFloor"></div>
      </div>
    </div>
    <div class="progressBar row my-mt-20" ref="progressBar">
      <div class="pickerBtn" ref="pickerBtn"></div>
      <div
        class="colorItem"
        v-for="(item, index) in colorList"
        :key="index"
        :style="{ backgroundColor: item }"
      ></div>
    </div>
    <div class="colorBar my-mt-30" ref="colorBar">
      <div class="pickerBtn" ref="colorPickerBtn"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "colorPicker",
  data() {
    return {
      pickerDistance: 0,
      isPickerBtn: false,
      colorList: [],
      pickedColor: "",
      progressBar: {
        offsetLeft: "",
        offsetTop: "",
      },
      colorBar: {
        offsetLeft: "",
        offsetTop: "",
      },
    };
  },
  methods: {
    bindProgressMoveFn() {
      this.$refs.pickerBtn.addEventListener("mousedown", (event) =>
        this.mousedown(event)
      );
      this.$refs.progressBar.addEventListener("mousemove", (event) =>
        this.mousemove(event)
      );
      this.$refs.pickerBtn.addEventListener("mouseup", (event) =>
        this.mouseup(event)
      );
    },
    bindColorListMoveFn() {
      this.$refs.colorPickerBtn.addEventListener("mousedown", (event) => {});
      this.$refs.colorBar.addEventListener("mousemove", (event) => {
        this.pickerDistance = event.clientX - this.colorBar.offsetLeft;
        if (
          0 < this.pickerDistance &&
          this.pickerDistance < this.$refs.colorBar.clientWidth
        ) {
          this.$refs.colorPickerBtn.style.left =
            this.pickerDistance - 10 + "px";
        }
      });
      this.$refs.colorPickerBtn.addEventListener("mouseup", (event) => {});
    },
    initColorList() {
      this.bindProgressMoveFn();
      this.bindColorListMoveFn();
      for (let i = 0; i <= 255; i++) {
        let value = `rgba(255,${i},0)`;
        this.colorList.push(value);
      }
      for (let i = 255; i >= 0; i--) {
        let value = `rgba(${i},255,0)`;
        this.colorList.push(value);
      }
      for (let i = 0; i <= 255; i++) {
        let value = `rgba(0,255,${i})`;
        this.colorList.push(value);
      }
      for (let i = 255; i >= 0; i--) {
        let value = `rgba(0,${i},255)`;
        this.colorList.push(value);
      }
      for (let i = 0; i <= 255; i++) {
        let value = `rgba(${i},0,255)`;
        this.colorList.push(value);
      }
      for (let i = 255; i >= 0; i--) {
        let value = `rgba(255,0,${i})`;
        this.colorList.push(value);
      }
      this.$nextTick(() => {
        this.progressBar.offsetLeft = this.$refs.progressBar.offsetLeft;
        this.progressBar.offsetTop = this.$refs.progressBar.offsetTop;
        this.colorBar.offsetLeft = this.$refs.colorBar.offsetLeft;
        this.colorBar.offsetTop = this.$refs.colorBar.offsetTop;
      });
    },
    mousedown(e) {
      this.isPickerBtn = true;
    },
    mousemove(e) {
      if (this.isPickerBtn) {
        this.pickerDistance = e.clientX - this.progressBar.offsetLeft;
        if (this.pickerDistance > 0) {
          this.$refs.pickerBtn.style.left = this.pickerDistance - 10 + "px";
        }
      }
    },
    mouseup(e) {
      this.isPickerBtn = false;
    },
  },
  created() {},
  mounted() {
    this.initColorList();
    // this.$nextTick(() => {
    // });
  },
};
</script>

<style lang="scss" scoped>
.firstFloor {
  width: 250px;
  height: 150px;
  position: relative;
  box-shadow: rgb(190, 190, 190) 0px 1px 4px 0px;
}
.secondFloor {
  width: 250px;
  height: 150px;
  position: absolute;
  top: 0%;
  left: 0%;
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
}
.thirdFloor {
  width: 250px;
  height: 150px;
  position: absolute;
  top: 0%;
  left: 0%;
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
}
.progressBar {
  position: relative;
  // margin: 0 auto;
}
.pickerBtn {
  left: -10px;
  top: -5px;
  border-radius: 50%;
  width: 20px;
  position: absolute;
  height: 20px;
  background-color: rgb(248, 248, 248);
  box-shadow: 0px 1px 4px 0px;
}
.colorItem {
  width: 1px;
  height: 10px;
  // display: inline-block;
}
.colorBar {
  position: relative;
  width: 130px;
  height: 10px;
  background: linear-gradient(
    to right,
    #f00 0%,
    #ff0 17%,
    #0f0 33%,
    #0ff 50%,
    #00f 67%,
    #f0f 83%,
    #f00 100%
  );
}
</style>
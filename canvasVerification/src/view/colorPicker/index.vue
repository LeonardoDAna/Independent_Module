<template>
  <div class="row align-middle flex-direction">
    <div class="progressBar">
      <span
        class="colorItem"
        v-for="(item, index) in colorList"
        :key="index"
        :style="{ backgroundColor: item }"
      ></span>
      <div class="pickerBtn"></div>
    </div>
    <div class="colorBar"></div>
  </div>
</template>

<script>
export default {
  name: "colorPicker",
  data() {
    return {
      colorList: [],
    };
  },
  methods: {
    initColorList() {
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
.progressBar {
  position: relative;
  // margin: 0 auto;

}
.pickerBtn {
  left: -5px;
  top: 0;
  background: black;
  width: 10px;
  position: absolute;
  height: 10px;
}
.colorItem {
  width: 1px;
  height: 10px;
  display: inline-block;
}
.colorBar {
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
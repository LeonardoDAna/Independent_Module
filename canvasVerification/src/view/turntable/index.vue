<template>
  <div class="main row justify-center align-middle">
    <!-- 转盘 -->
    <!-- https://guahsu.io/2018/01/vue-turntable/ -->
    <!-- https://www.jianshu.com/p/94fddad3443f -->
    <div class="turntable">
      <canvas ref="turntable"></canvas>
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
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 100vh;
}
.turntable {
  width: 500px;
  height: 500px;
  border-radius: 50%;
  border: 1px solid rgb(175, 175, 175);
}
</style>
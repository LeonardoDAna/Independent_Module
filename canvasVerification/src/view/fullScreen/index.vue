<template>

  <div class="row">
    <div class="itemScreen" v-for="(item,index) in colorList" :key="index" :style="{backgroundColor:item}">
      {{item}}
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        colorList: ["rgb(73, 49, 49)", "rgb(117, 37, 37)", "rgb(32, 116, 24)", "rgb(85, 24, 197)"],
      }
    },
    mounted() {
      console.log(window.screen.height, window.screen.width);
      console.log(document.body.scrollWidth, document.body.scrollHeight);
      console.log(document.body.offsetWidth, document.body.offsetHeight);
      console.log(window.screen.availHeight, window.screen.availWidth);
      console.log(document.body.clientWidth, document.body.clientHeight);
    },
  }

</script>

<style lang="scss" scoped>
  .itemScreen {
    flex-shrink: 0;
    background: rgb(85, 24, 197);
    height: 1440px;
    width: 2560px;
  }

</style>

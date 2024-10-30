<template>
  <div>
    <div class="box" v-for="(item, index) in moduleNameList" :key="index">
      <div :is="item.name"></div>
    </div>
  </div>
</template>

<script>
import redBlock from "./components/redBlock/index.vue";
import blueBlock from "./components/blueBlock/index.vue";
import yellowBlock from "./components/yellowBlock/index.vue";

export default {
  components: {
    redOne: redBlock,
    blueBlock: blueBlock,
    yellowOne: yellowBlock,
  },
  mounted() {
    this.moduleName = "redOne";
  },
  data() {
    return {
      moduleNameList: [
        {
          name: "redOne",
        },
        {
          name: "blueBlock",
        },
        {
          name: "yellowOne",
        },
      ],
      moduleName: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 50px;
  height: 50px;
}
</style>

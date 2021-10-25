<template>
  <div>
    <div class="box" v-for="(item, index) in moduleNameList" :key="index">
      <div :is="item.name"></div>
    </div>
  </div>
</template>

<script>
import redOne from "./components/redBlock";
import blueBlock from "./components/blueBlock";
import yellowOne from "./components/yellowBlock";

export default {
  components: {
    redOne: () => import("./components/redBlock"),
    blueBlock: () => import("./components/blueBlock"),
    yellowOne: () => import("./components/yellowBlock"),
  },
  mounted() {
    this.moduleName = "redOne";
  },
  data() {
    return {
      moduleNameList: [
        {
          name: "blueBlock",
        },
        {
          name: "redOne",
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
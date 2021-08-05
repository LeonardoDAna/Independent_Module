<template>
  <div class="all">
    <div
      class="modelBox"
      v-for="(item, index) in datas"
      :key="index"
      @click="goLink(item.path)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import { datas } from "@/router/routerData.js";
export default {
  name: "home",
  data() {
    return {
      datas: datas,
    };
  },
  methods: {
    goLink(link) {
      this.$router.push(link);
    },
  },
  mounted() {
    console.log(datas);
  },
};
</script>

<style lang="css">
.all {
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.modelBox {
  cursor: pointer;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  text-align: center;
  color: #fff;
  transition: 1s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  background-color: cadetblue;
}
.modelBox:hover {
  transform: scale(1.2, 1.2);
}
</style>
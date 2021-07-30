<template>
  <div class="all">
    <div class="modelBox" v-for="(item, index) in datas" :key="index" @click="goLink(item.path)">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
import {datas} from "../../src/routerData.js";
export default {
  data() {
    return {
      datas: datas,
    };
  },
  methods: {
    goLink(link){
      this.$router.push(link)
    }
  },
  mounted(){
    console.log(datas);
  }
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
  width: 100px;
  height: 100px;
  border-radius: 20px;
  text-align: center;
  color: #fff;
  line-height: 100px;
  transition: 1s;
  /* box-shadow: ; */
  background-color: cadetblue;
}
.modelBox:hover {
  transform: scale(1.2, 1.2);
}
</style>
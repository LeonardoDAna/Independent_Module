<template>
  <div class="all">
    <header class="headerStyle">
      <!-- 提交热力图 -->
      <div class="heatMap">
        <calendar-heatmap end-date="2021-07-08" :values="timeValue" />
      </div>
    </header>
    <div class="row justify-around wrap">
      <div
        class="outsideBox"
        v-for="(item, index) in datas"
        :key="index"
        @click="goLink(item.path)"
      >
        <div class="modelBox">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { routerDatas } from "@/router/routerData.js";
export default {
  name: "home",
  data() {
    return {
      datas: routerDatas,
      timeValue: [
        { date: "2020-08-05", count: 6 },
        { date: "2020-08-06", count: 6 },
        { date: "2020-08-07", count: 6 },
        { date: "2020-08-08", count: 6 },
        { date: "2020-08-15", count: 6 },
        { date: "2020-08-22", count: 6 },
        { date: "2020-08-29", count: 6 },
        { date: "2020-09-05", count: 6 },
        { date: "2020-09-28", count: 6 },
        { date: "2020-09-22", count: 6 },
        { date: "2020-09-23", count: 6 },
      ],
    };
  },
  methods: {
    goLink(link) {
      this.$router.push(link);
    },
  },
  created() {},
  mounted() {
    console.log(this.datas);
  },
};
</script>

<style lang="css">
.heatMap {
  width: 60%;
  margin: 0 auto;
}
.all {
  height: 100vh;
  /* display: flex;
  justify-content: space-around;
  align-items: center; */
}
.outsideBox {
  width: 10%;
}
.modelBox {
  cursor: pointer;
  width: 100px;
  height: 100px;
  margin-bottom: 50px;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  transition: 0.3s;
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
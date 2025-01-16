<template>
  <div class="all">
    <header class="headerStyle">
      <!-- 提交热力图 -->
      <div class="heatMap">
        <calendar-heatmap end-date="2021-07-08" :values="timeValue" />
      </div>
    </header>
    <div class="">
      <div
        class="outsideBox"
        v-for="(item, index) in datas"
        :key="index"
        @click="goLink(item.path)"
      >
        <div class="modelBox">
          <div>
            {{ item.name }}
          </div>
          <div class="Tags">
            <template v-for="tagItem in item.tags" :key="tagItem">
              <tag>
                {{ tagItem }}
              </tag>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { routerData } from "@/router/routerData.js";
import tag from "@/components/tag/index";
export default {
  name: "home",
  components: {
    tag,
  },
  data() {
    return {
      datas: routerData,
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

<style lang="scss" scoped>
.heatMap {
  width: 60%;
  margin: 0 auto;
}
.all {
  // height: 100vh;
  /* display: flex;
  justify-content: space-around;
  align-items: center; */
  padding: 20px;
  background-color: #000000;
}
.outsideBox {
  // width: 10%;
}
.modelBox {
  cursor: pointer;
  margin: 5px;
  color: #fff;
  transition: 0.5s;
  align-items: center;
  padding: 8px 20px;
  box-sizing: border-box;
  background-color: rgb(69, 85, 116);
}
.modelBox:hover {
  transform: scale(1.02);
}
</style>

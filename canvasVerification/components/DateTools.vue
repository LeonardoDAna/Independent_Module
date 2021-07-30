<template>
  <div>
    <div>
      <!-- 列名 周日~周六 -->
      <span class="dateHeader" v-for="(item, index) in dateRow" :key="index">
        {{ item }}
      </span>
    </div>
    <div>
      <span class="dateHeader" v-for="(item, index) in dateRow" :key="index">
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "dateTools",
  data() {
    return {
      dateRow: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    };
  },
  methods: {},
};
</script>
<style>
.dateHeader {
  cursor: pointer;
  /* border-collapse: collapse; */
  width: 100px;
  height: 60px;
  display: inline-block;
  text-align: center;
  line-height: 60px;
  border: 1px solid #e2e2e2;
  transition: 0.7s;
  box-sizing: content-box;
}
.dateHeader:hover {
  border: 1px solid cadetblue;
  background-color: cadetblue;
  transform: scale(1.2, 1.2);
  z-index: 2;
  position: relative;
}
</style>
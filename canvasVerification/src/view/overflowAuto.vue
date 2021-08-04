<template>
  <div class="main">
    <ul class="overflow" v-infinite-scroll="load">
      <li v-for="(item,index) in dataList" :key="index">
        {{item.value}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "overflowAuto",
    data() {
      return {
        dataList: []
      };
    },
    methods: {
      load() {
        setTimeout(() => {
          Array(20).fill().map((e, index) => {
            return {
              value: this.dataList[this.dataList.length - 1].value + index + 1
            }
          }).forEach(element => {
            this.dataList.push(element)
          });
        }, 2000)

      }
    },
    created() {},
    mounted() {
      this.dataList = Array(20).fill().map((e, index) => {
        return {
          value: index + 1
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .overflow {
    // height: 800px;
    height: calc(100vh - 400px);
    border: 1px solid #222222;
    width: 300px;
    padding: 0;
    margin: 0;
    overflow-y: auto;
    li {
      list-style: none;
      height: 100px;
    }
  }
</style>
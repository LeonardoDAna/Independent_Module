<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      dataList: [1, 2, 3, 4, 5, 6],
    };
  },
  mounted(){
    this.test1()
  },
  methods: {
    test1() {
      [].forEach.call(this.dataList, this.test2);
    },
    test2(index) {
      console.log(index);
    },
  },
};
</script>

<style>
</style>
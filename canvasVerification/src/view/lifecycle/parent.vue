<template>
  <div class="main">
    <ul class="lifeCycle">
      <li v-for="(item,index) in dataList" :key="index">
        {{item.value}}
      </li>
    </ul>
    <Child />
  </div>

</template>

<script>
  import Child from "./component/child.vue"
  export default {
    components: {
      Child
    },
    name: "parent",
    data() {
      return {
        componentName: "父",
        dataList: []
      };
    },
    methods: {},
    beforeCreate() {
      console.log(`${this.componentName}组件 beforeCreate`);
    },
    created() {
      console.log(`${this.componentName}组件 created`);
    },
    beforeMount() {
      console.log(`${this.componentName}组件 beforeMount`);
    },
    mounted() {
      console.log(`${this.componentName}组件 mounted`);
    }
  }
</script>

<style lang="scss" scoped>
  .lifeCycle {
    li {
      list-style: none;
    }
  }
</style>
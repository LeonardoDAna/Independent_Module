<template>

</template>

<script>
  export default {
    data() {
      return {
        componentName: "子",
      }
    },
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

<style>

</style>
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  computed: {
    loading() {
      return this.$store.getters.isLoading;
    },
  },
  data() {
    return {
      // loading: this.$store.getters.isLoading,
    };
  },
};
</script>

<style lang='scss'>
body {
  margin: 0;
  padding: 0;
}
</style>

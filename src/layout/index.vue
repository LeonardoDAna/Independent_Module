<template>
  <div class="app_container">
    <headerBar />
    <div class="main_container" id="main_container">
      <router-view />
    </div>
    <footerBar />
  </div>
</template>

<script setup>
import headerBar from "./header/index.vue";
import footerBar from "./footer/index.vue";
</script>

<style lang="scss" scoped>
.app_container {
  // background-color: #222;
  height: 100vh;
}
.main_container {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>

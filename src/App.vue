<template>
  <router-view />
</template>

<script setup>
import { onMounted, nextTick, onBeforeUnmount } from "vue";
import { useAppStore } from "@/stores/modules/app";

const appStore = useAppStore();

onMounted(() => {
  window.addEventListener("resize", checkIfMobile);
  checkIfMobile();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkIfMobile);
});

const checkIfMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // 简单的手机端判断
  let isMobile = /android|iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  appStore.setIsMoblie(isMobile);
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  background-color: #f2f3f5;
  height: 100vh;
}
</style>

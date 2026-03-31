<template>
  <div class="app_container">
    <div class="header_wrap" :class="{ header_hidden: !headerVisible }">
      <headerBar />
    </div>
    <div
      ref="mainRef"
      class="main_container"
      id="main_container"
    >
      <router-view />
    </div>
    <footerBar />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import headerBar from "./header/index.vue";
import footerBar from "./footer/index.vue";

const mainRef = ref(null);
/** 是否在顶部（scrollTop 为 0），为 true 时显示 header */
const headerVisible = ref(true);

/**
 * 根据主内容区滚动位置更新 header 显隐：离开顶部则收起，回到顶部则展开。
 */
function syncHeaderFromScroll() {
  const el = mainRef.value;
  if (!el) return;
  headerVisible.value = el.scrollTop <= 0;
}

onMounted(() => {
  const el = mainRef.value;
  if (!el) return;
  el.addEventListener("scroll", syncHeaderFromScroll, { passive: true });
  syncHeaderFromScroll();
});

onUnmounted(() => {
  const el = mainRef.value;
  if (!el) return;
  el.removeEventListener("scroll", syncHeaderFromScroll);
});
</script>

<style lang="scss" scoped>
.app_container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header_wrap {
  flex-shrink: 0;
  height: 60px;
  overflow: hidden;
  transition: height 0.3s ease;
}

.header_wrap.header_hidden {
  height: 0;
}

.main_container {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
</style>

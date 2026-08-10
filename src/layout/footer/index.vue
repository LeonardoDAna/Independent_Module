<template>
  <div class="footer_container">
    <a
      class="icp_link"
      href="https://beian.miit.gov.cn/"
      target="_blank"
      rel="noopener noreferrer"
      >沪ICP备2025130361号</a
    >
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer_container {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: #fff;
}
.icp_link {
  font-size: 12px;
  color: #666666;
  text-decoration: none;
  &:hover {
    color: #333333;
    text-decoration: underline;
  }
}
</style>

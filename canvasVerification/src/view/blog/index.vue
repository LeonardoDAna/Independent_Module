<template>
  <div class="blog">
    <!-- 左侧边栏 -->
    <div class="userInfo"></div>
    <!-- 博客主体 -->
    <div class="editorBlock">
      <!-- <v-md-editor ref="preview" v-model="setupData.text" height="400px"></v-md-editor> -->
      <v-md-editor v-model="text" ref="preview" mode="preview"></v-md-editor>
    </div>

    <!-- 导航栏 -->
    <div class="nav">
      <div
        v-for="anchor in setupData.titles"
        :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
        @click="handleAnchorClick(anchor)"
      >
        <a style="cursor: pointer">{{ anchor.title }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from "vue";
import { text } from "@/assets/md/test.js";

const setupData = reactive({
  text: "",
});

const preview = ref(null);

onMounted(async () => {
  await nextTick();
  getAnchors();
});

const getAnchors = () => {
  console.log(preview.value);
  const anchors = preview.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
  let titles = Array.from(anchors).filter((title) => !!title.innerText.trim());

  if (!titles.length) {
    titles = [];
    return;
  }

  const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();

  setupData.titles = titles.map((el) => ({
    title: el.innerText,
    lineIndex: el.getAttribute("data-v-md-line"),
    indent: hTags.indexOf(el.tagName),
  }));
};
</script>
<style lang="scss" scoped>
.editorBlock {
  padding: 0 20px;
  width: 35%;
}
.blog {
  display: flex;
  align-items: start;
  justify-content: center;
}
.nav {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  width: 150px;
  border: 1px solid #222;
  padding: 20px;
}
.userInfo {
  width: 150px;
  border: 1px solid #222;
}
</style>

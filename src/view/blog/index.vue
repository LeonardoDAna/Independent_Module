<template>
  <div class="blog">
    <div class="content">
      <!-- 左侧边栏 -->
      <div class="userInfo"></div>
      <!-- 博客主体 -->
      <div class="editorBlock">
        <!-- <v-md-editor ref="preview" v-model="setupData.text" height="400px"></v-md-editor> -->
        <v-md-preview ref="preview" :text="text"></v-md-preview>
      </div>

      <!-- 导航栏 -->
      <div class="nav">
        <div class="catalog-title">
          <div class="title">目录</div>
          <div class="direction" @click="expandFn">
            {{ setupData.expand ? "收起" : "展开" }}
            <down-outlined v-if="!setupData.expand" />
            <up-outlined v-if="setupData.expand" />
          </div>
        </div>
        <a-divider />
        <div
          v-for="anchor in setupData.titles"
          :key="anchor.title"
          :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
          @click="handleAnchorClick(anchor)"
        >
          <a style="cursor: pointer">{{ anchor.title }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from "vue";
import text from "@/assets/md/test.md?raw";
import Icon, { DownOutlined, UpOutlined } from "@ant-design/icons-vue";

const setupData = reactive({
  text: "",
  expand: true,
});

const preview = ref();

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

const expandFn = () => {
  setupData.expand = !setupData.expand;
};

const handleAnchorClick = (anchor) => {
  const { lineIndex } = anchor;
  console.log(anchor, preview.value);

  const heading = preview.value.querySelector(`[data-v-md-line="${lineIndex}"]`);

  if (heading) {
    // preview.value.scrollToTarget({
    //   target: heading,
    //   scrollContainer: window,
    //   top: 60,
    // });
    preview.value.previewScrollToTarget({
      target: heading,
      scrollContainer: window,
      top: 60,
    });
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
}
.editorBlock {
  padding: 0 20px;
  width: 50%;
  background-color: #ffffff;
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
  width: 200px;
  // border: 1px solid #222;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 2px;
}
.userInfo {
  width: 150px;
  border: 1px solid #222;
}
.catalog-title {
  display: flex;
  justify-content: space-between;
  .direction {
    color: #8a919f;
    cursor: pointer;
  }
}
.ant-divider-horizontal {
  margin: 20px 0;
}
</style>

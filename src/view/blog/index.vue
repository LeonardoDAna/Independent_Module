<template>
  <div class="blog" ref="scrollElement">
    <div class="content">
      <!-- 左侧边栏 -->
      <div class="userInfo"></div>
      <!-- 博客主体 -->
      <div class="editorBlock">
        <MdPreview
          :modelValue="setupData.text"
          @onGetCatalog="getCatalo"
          :editorId="editorId"
          :mdHeadingId="mdHeadingId"
        />
      </div>

      <!-- 导航栏 -->
      <div class="nav">
        <MdCatalog :editorId="editorId" scrollElement=".main_container" :theme="theme" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from "vue";
import Icon, { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
import blogList from "@/assets/md/index";
const router = useRouter();
const route = useRoute();
const mdHeadingId = (_text, _level, index) => `heading-${index}`;

const setupData = reactive({
  text: "",
  expand: true,
});

const blog = ref();
const editorId = "preview-only";
const theme = "dark";
const scrollElement = ref();

onMounted(async () => {
  setupData.text = await getBlogFile();
  await nextTick();
});

const getBlogFile = async () => {
  return new Promise((resolve, reject) => {
    try {
      let content = blogList.find((e) => e.id == route.params.id);
      fetch(content.path).then((response) => {
        resolve(response.text());
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getCatalo = (titles) => {
  console.log(titles, "getCatalo");

  setupData.titles = titles
    .filter((e) => e.level < 3)
    .map((el) => {
      return {
        title: el.text,
        indent: el.level - 1,
        line: el.line,
      };
    });
};

const getAnchors = () => {
  const anchors = preview.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
  console.log(anchors);

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

const handleAnchorClick = (anchor) => {
  const { line } = anchor;
  const heading = preview.value.$el.querySelector(`[data-line="${line}"]`);
  console.log(heading);

  const selectedCatalog = document.querySelector(".selectedCatalog");

  let index = setupData.titles.findIndex((item) => item.line === line);
  if (heading) {
    selectedCatalog.style.op = `${index * 42}px`;

    heading.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest", // 'start', 'center', 'end', or 'nearest'
    });
  }
};
</script>
<style lang="scss" scoped>
.catalog-list {
  position: relative;
}
.selectedCatalog {
  position: absolute;
  height: 42px;
  transition: all 0.3s;
  top: 0;
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: -8px;
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: -5px solid transparent;
    border-left: 5px solid rgb(255, 114, 114);
    transform: translate(-50%, -50%);
  }
}
.anchorTitle {
  cursor: pointer;
  color: #141414ff;
  position: relative;
}
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
  height: calc(100vh - 60px);
  overflow-y: auto;
}
.nav {
  position: sticky;
  position: -webkit-sticky;
  max-height: 100vh;
  overflow: auto;
  top: 30px;
  width: 200px;
  // border: 1px solid #222;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 2px;
  &::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
}
.userInfo {
  width: 150px;
  // border: 1px solid #222;
}
.catalog-title {
  display: flex;
  font-size: 20px;
  justify-content: space-between;
  .direction {
    color: #8a919f;
    cursor: pointer;
  }
}
.ant-divider-horizontal {
  margin: 12px 0;
}
</style>

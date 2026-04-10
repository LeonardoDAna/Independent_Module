<template>
  <div class="blog">
    <div class="content">
      <!-- 左侧边栏 -->
      <div class="userInfo"></div>
      <!-- 博客主体 -->
      <div class="editorBlock" ref="scrollElement">
        <MdPreview
          :modelValue="setupData.text"
          @onGetCatalog="getCatalo"
          :editorId="editorId"
        />
      </div>

      <!-- 导航栏：onActive 时同步滚动侧栏，避免长目录看不到当前高亮项 -->
      <div ref="navBlockRef" class="navBlock">
        <MdCatalog
          :editorId="editorId"
          scrollElement="#main_container"
          @onActive="onCatalogActive"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, nextTick } from "vue";
// import text from "@/assets/md/test.md?raw";
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
/** @type {import('vue').Ref<HTMLElement | null>} */
const navBlockRef = ref(null);

/**
 * 正文滚动导致目录高亮切换时，将高亮目录项滚入侧栏可视区域（与侧栏自身 overflow 滚动条联动）。
 * 仅用「标题行顶部」对齐：含子目录时 `.md-editor-catalog-link` 根节点会包一整棵子树，
 * 高度极大，若用 `getBoundingClientRect().bottom` 会把滚动条误拉到底部。
 * @param {unknown} _tocItem - md-editor-v3 当前激活的目录项
 * @param {HTMLElement | undefined} linkEl - 对应 `.md-editor-catalog-link` 根节点
 */
function onCatalogActive(_tocItem, linkEl) {
  if (!linkEl || !navBlockRef.value) return;
  nextTick(() => {
    const nav = navBlockRef.value;
    if (!nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect = linkEl.getBoundingClientRect();
    const padding = 30;
    let delta = 0;
    if (elRect.top < navRect.top + padding) {
      delta = elRect.top - navRect.top - padding;
    } else if (elRect.top > navRect.bottom - padding) {
      delta = elRect.top - navRect.bottom + padding;
    }
    if (delta !== 0) {
      nav.scrollTo({ top: nav.scrollTop + delta, behavior: "smooth" });
    }
  });
}

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
  padding: 20px;
  width: 50%;
  background-color: #ffffff;  
  :deep(.md-editor-preview) {
    img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 8px;
      margin: 16px 0;
    }
    table{
        width: 100%;
    }
  }
}
.blog {
  display: flex;
  align-items: start;
  justify-content: center;

  height: 100%;
  // overflow-y: auto;
}

/**
 * 右侧目录：限制在视口高度内，条目过多时出现纵向滚动条。
 * 勿用 height:100%（父级与正文同高会导致侧栏被撑满、无法滚动）。
 */
.navBlock {
  position: sticky;
  position: -webkit-sticky;
  top: 30px;
  align-self: flex-start;
  flex-shrink: 0;
  width: 200px;
  max-height: calc(100vh - 60px);
  padding: 20px;
  background-color: #ffffff;
  border-radius: 2px;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
}
.catalog {
  position: absolute;
  position: -webkit-sticky;
  overflow: auto;
  top: 30px;
  // border: 1px solid #222;
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

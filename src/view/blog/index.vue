<template>
  <div class="blog">
    <div class="content">
      <!-- 左侧边栏 -->
      <div class="userInfo"></div>
      <!-- 博客主体 -->
      <div class="editorBlock" ref="scrollElement">
        <MdPreview
          :modelValue="setupData.text"
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
import { reactive, ref, watch, nextTick } from "vue";
import { MdPreview, MdCatalog } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { message } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
import blogList from "@/assets/md/index";

const router = useRouter();
const route = useRoute();

const setupData = reactive({
  text: "",
});

const editorId = "preview-only";
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

/**
 * 按路由 id 加载 Markdown 正文；找不到文章时提示并回列表。
 */
function loadBlog() {
  const article = blogList.find((e) => String(e.id) === String(route.params.id));
  if (!article) {
    setupData.text = "";
    message.warning("文章不存在");
    router.replace("/blog");
    return;
  }
  setupData.text = article.content;
}

watch(() => route.params.id, loadBlog, { immediate: true });
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
    table {
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
.userInfo {
  width: 150px;
  // border: 1px solid #222;
}
</style>

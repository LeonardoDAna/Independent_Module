<template>
  <div class="blog-list">
    <template v-for="(item, index) in list">
      <article class="blog-item">
        <header>
          <h2>
            <a href="javascript:void(0)" @click="goBlogContent(item)">{{ item.name }}</a>
          </h2>
          <div class="row justify-between">
            <p class="meta">标签：{{ item.tags.join("、") }}</p>
            <p class="meta">发布日期：{{ item.updateTime }}</p>
          </div>
        </header>
      </article>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import list from "@/assets/md/index.js";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const goBlogContent = (item) => {
  router.push({
    path: `/blog/${item.id}`,
  });
};
</script>

<style lang="scss" scoped>
/* 博客列表容器 */
.blog-list {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
}

/* 单个博客项 */
.blog-item {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
}

.blog-item header {
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.blog-item h2 a {
  color: #333;
  text-decoration: none;
}

.blog-item .meta {
  font-size: 0.8em;
  color: #777;
}
</style>

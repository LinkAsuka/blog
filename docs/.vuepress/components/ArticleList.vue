<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  isTimeline: Boolean,
})
</script>

<template>
  <div class=" ">
    <div class="grid article-wrapper">
    <div v-if="!items.length">暂无文章</div>
    <article class="article grid-item" v-for="{ info, path } in items" :key="path" @click="$router.push(path)">
      <div class="article-card">
        <img class="article-img" src="/images/article.png" />
        <div class="article-data">
          <div class="article-title">{{ info.title }}</div>
          <div v-if="info.excerpt.length >= 3" v-html="info.excerpt"></div>
          <div v-else class="article-excerpt">excerpt</div>
          <div class="article-category">
            <div v-for="item in info.category" :key="item">{{ item }}</div>
          </div>
          <div v-if="info.date && !isTimeline" class="article-date">{{ new Date(info.date).toLocaleDateString() }}</div>
        </div>
      </div>
    </article>
  </div>
</div>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/mixins';


.grid-item {
  grid-auto-columns: 1fr 1fr;
}

.article-wrapper {
  @include mixins.content_wrapper;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-bottom: 10px;
  .article-card {
    overflow: hidden;
    cursor: pointer;
    width: 100%;
    height: 230px;
    position: relative;
    border-radius: 3px;
    .article-img {
      width: 100%;
      height: 230px;
      object-fit: cover;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      transition: all 1s;
      filter: brightness(0.45) blur(2px);
    }
    .article-data {
      position: absolute;
      top: 0;
      color: #fff;
      padding: 20px;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .article-title {
        font-size: 18px;
        border-bottom: 1px solid #fff;
        padding-bottom: 10px;
        display: flex;
        align-items: center;
      }
      .article-excerpt {
        line-height: 1.6;
        overflow-wrap: break-word;
        margin: 16px 0;
      }
      .article-date {
        margin-top: auto;
        text-align: right;
      }
      .article-category {
        display: flex;
        margin:0 -5px;
        font-size: 14px;
        div {
          padding: 0 5px;
        }
      }
    }
  }
  .article-card:hover .article-img {
    filter: brightness(0.7) blur(0px);
  }
}
.copy-code-disabled .article-wrapper {
  grid-template-columns: 1fr;
}
.no-copy-code .article-wrapper {
  grid-template-columns: 1fr;
}

</style>

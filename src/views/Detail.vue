<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import ResourceCard from '@/components/Detail/ResourceCard.vue';
import { ResourceEnum } from '@/enums/ResourcesEnum';
import useResourcesStore from '@/store/ResourcesStore';
import useHistoryStore from '@/store/HistoryStore';
import useSeriesStore from '@/store/SeriesStore';
import MButton from '@/components/MButton.vue';

const resourcesStore = useResourcesStore();
const historyStore = useHistoryStore();
const seriesStore = useSeriesStore();
const route = useRoute();

onMounted(async () => {
  const { id } = route.params;
  if (typeof id === 'string') {
    await seriesStore.getSeriesById(id);
  }
  if (seriesStore.serieSelected?.comics?.items.length) {
    await resourcesStore.getResources(ResourceEnum.COMICS ,seriesStore.serieSelected.id);
  }
  if (seriesStore.serieSelected?.stories?.items.length) {
    await resourcesStore.getResources(ResourceEnum.STORIES, seriesStore.serieSelected.id);
  }
  if (seriesStore.serieSelected) {
    historyStore.addSerieToHistory(seriesStore.serieSelected);
  }
})

function saveRecord() {
  const resourcesTotal = historyStore.getTotalResources;
  if (resourcesTotal >= 10) {
    setTimeout(() => {
      historyStore.errorMessage = 'You have already 10 resources.';
    }, 5000)
    historyStore.errorMessage = null;
    return;
  }

  historyStore.saveSerie(seriesStore.serieSelected?.id!);
}
</script>

<template>
  <div
    v-if="seriesStore.serieSelected"
    class="detail-wrapper">
    <h1 class="detail-wrapper-title">
      {{ seriesStore.serieSelected.title }}
    </h1>
    <p class="detail-wrapper-years">
      ({{ seriesStore.serieSelected.years }})
    </p>
    <img
        :src="seriesStore.serieSelected.image"
        :alt="seriesStore.serieSelected.title"
        class="detail-wrapper-image">
    <div class="detail-wrapper-button">
      <MButton
        @click="saveRecord">
        Guardar
      </MButton>
    </div>
    <div class="detail-wrapper-content two-column-layout">
      <div class="col-1">
        <h2 class="detail-wrapper-content-title">
          Comics
        </h2>
        <div
          v-if="seriesStore.serieSelected?.comics?.items.length"
          class="detail-wrapper-content-resources">
          <ResourceCard
            v-for="(comic, index) in resourcesStore.comics"
            class="item"
            :key="index"
            :title="comic.title"
            :image="comic.image"
            :component="comic.component"
            :description="comic.description" />
        </div>
      </div>
      <div class="col-2">
        <h2 class="detail-wrapper-content-title">
          Stories
        </h2>
        <div
          v-if="seriesStore.serieSelected?.stories?.items.length"
          class="detail-wrapper-content-resources">
          <ResourceCard
            v-for="(story, index) in resourcesStore.stories"
            class="item"
            :key="index"
            :title="story.title"
            :image="story.image"
            :component="story.component"
            :description="story.description" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.detail-wrapper {
  color: $white;
  margin: auto;
  &-title {
    text-align: center;
    font-size: 3.5rem;
    margin-bottom: 2rem;
  }
  &-years {
    text-align: center;
    font-size: 2rem;
  }
  &-image {
    margin-top: 16px;
    border-radius: 8px;
    width: 100%;
    height: 420px;
    object-fit: cover;
    object-position: center bottom;
  }
  &-button {
    width: 100%;
    margin: 24px;
  }
  &-content {
    display: flex;
    margin: 24px 0;
    padding: 12px 16px;
    &-title {
      text-align: center;
      color: $yellow;
      font-size: 4rem;
    }
    &-resources {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 20px;
      place-items: center;
      .item {
        padding: 8px;
      }
    }
  }
}
</style>
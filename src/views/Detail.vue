<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import ResourceCard from '@/components/Detail/ResourceCard.vue';
import { ResourceEnum } from '@/enums/ResourcesEnum';
import useResourcesStore from '@/store/ResourcesStore';
import useSeriesStore from '@/store/SeriesStore';

const resourcesStore = useResourcesStore();
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
})
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
    <div class="detail-wrapper-content two-column-layout">
      <div class="col-1">
        <img
          :src="seriesStore.serieSelected.image"
          :alt="seriesStore.serieSelected.title"
          class="detail-wrapper-content-image">
      </div>
      <div class="col-2">
        <div
          v-if="seriesStore.serieSelected?.comics?.items.length"
          class="detail-wrapper-content-comics">
          <h2>
            Comics
          </h2>
          <ResourceCard
            v-for="(comic, index) in resourcesStore.comics"
            :key="index"
            :title="comic.title"
            :image="comic.image"
            :component="comic.component"
            :description="comic.description" />
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
  &-content {
    display: flex;
    margin: 24px 0;
    padding: 12px 16px;
    &-image {
      border-radius: 8px;
    }
  }
}
</style>
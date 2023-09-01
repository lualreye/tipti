<script setup lang="ts">
import { onMounted, ref } from 'vue';

import SpinnerLoader from '@/components/SpinnerLoader.vue';
import SeriesCard from '@/components/Home/SeriesCard.vue';
import useSeriesStore from '@/store/SeriesStore';

const seriesStore = useSeriesStore();
const isFetching = ref(false);

function addScrollListener(): void {
  window.addEventListener('scroll', handleScroll);
}

function handleScroll(): void {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollY + windowHeight >= documentHeight - 100 && !isFetching.value) {
    isFetching.value = true;
    fetchMoreSeries();
  }
}

async function fetchMoreSeries() {
  await seriesStore.getSeries();
  isFetching.value = false;
}

onMounted(async () => {
  await seriesStore.getSeries();
  addScrollListener();
});
</script>

<template>
  <div class="home-wrapper">
    <h1 class="home-wrapper-title">
      MARVEL SERIES
    </h1>
    <div
      v-if="seriesStore.series"
      class="home-wrapper-content">
      <SeriesCard
        v-for="(serie, index) in seriesStore.series"
        :key="index"
        :id="serie.id"
        :image="serie.image"
        :title="serie.title"
        :years="serie.years"
        :resources-number="serie.resourcesNumber" />
    </div>
    <SpinnerLoader v-if="seriesStore.isLoading" />
  </div>
</template>

<style lang="scss" scoped>
.home-wrapper {
  &-title {
    color: $red;
    text-align: center;
    font-size: 5rem;
    font-weight: $font-weight-bold;
    margin-bottom: 3rem;
  }
  &-content {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 40px;
    place-items: center;
  }
}
</style>
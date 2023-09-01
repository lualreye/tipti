<script setup lang="ts">
import SeriesCard from '@/components/Home/SeriesCard.vue';
import useHistoryStore from '@/store/HistoryStore';

const historyStore = useHistoryStore();
</script>

<template>
  <h1 v-if="!historyStore.seriesSeen.length">
    No series seen!
  </h1>
  <div
    v-else
    class="home-wrapper">
    <h1 class="home-wrapper-title">
      NO HISTORY RECORD!
    </h1>
    <div
      v-if="historyStore.seriesSeen.length"
      class="home-wrapper-content">
      <SeriesCard
        v-for="(serie, index) in historyStore.seriesSeen"
        :key="index"
        :id="serie.id"
        :image="serie.image"
        :title="serie.title"
        :years="serie.years" />
    </div>
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
<script setup lang="ts">
import { onMounted } from 'vue';
import useSeriesStore from '@/store/SeriesStore';

const seriesStore = useSeriesStore();

onMounted(async () => {
  await seriesStore.getSeries();
});
</script>

<template>
  <h1 class="title">
    hello
  </h1>
</template>

<style lang="scss" scoped>
.title {
  color: $red;
}
</style>
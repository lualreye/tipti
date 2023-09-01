<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import useHistoryStore from '@/store/HistoryStore';
import MButton from '../MButton.vue';

const route = useRoute();
const historyStore = useHistoryStore();

const props = defineProps({
  image: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  years: {
    type: String,
    required: true
  },
  resourcesNumber: {
    type: Number,
    required: true
  }
});

const showDetails = ref(false);
const isHistoryRoute = computed(() => route.path.includes('/history'));
const isSavedRoute = computed(() => route.path.includes('/saved'));
const isSaved = computed(() => {
  return historyStore.seriesSaved.some(serie => serie.id === props.id);
});
const buttonType = computed(() => isSaved.value ? 'secondary' : '');
const buttonContent = computed(() => !isSaved.value ? 'Save' : 'Remove');

function saveRecord() {
  historyStore.isSavingAllowed(props.resourcesNumber);
  if (!historyStore.errorMessage) {
    historyStore.saveSerie(props.id);
  }
}
</script>

<template>
  <div class="wrapper">
    <RouterLink
      v-if="image?.length"
      :to="`/detail/${id}`"
      class="card"
      @mouseenter="showDetails = true"
      @mouseleave="showDetails = false">
      <img
        :src="image"
        :alt="title">
      <Transition name="slide">
        <div
          v-if="showDetails"
          class="card-details">
          <div class="card-details-content">
            <h3>{{ title }}</h3>
            <p>{{ years }}</p>
            <p>Resources: {{ resourcesNumber }}</p>
          </div>
        </div>
      </Transition>
    </RouterLink>
    <div
      v-if="isHistoryRoute || isSavedRoute"
      class="button">
      <MButton
        :type="buttonType"
        @click="saveRecord">
        {{ buttonContent }}
      </MButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.card {
  width: 240px;
  height: 320px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 320px;
    transition: transform 0.3s;
  }

  &-details {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: $red;
    text-align: center;
    padding: 10px 0;
    height: 40%;
    &-content {
      padding: 10px 0;
      height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      gap: 4px;
      .button {
        width: 24px;
      }
    }
  }
}

.slide-enter-from {
  top: 100%;
}
.slide-enter-to {
  top: 60%;
}
.slide-enter-active {
  transition: all 300ms ease-in;
}
.slide-leave-from {
  top: 60%;
}
.slide-leave-to {
  top: 100%;
}
.slide-leave-active {
  transition: all 300ms ease-in;
}
</style>
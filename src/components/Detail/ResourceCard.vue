<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  component: {
    type: String,
    required: true
  }
})

const showDetails = ref(false);
</script>

<template>
  <div
    v-if="image?.length"
    :class="`card-${component}`"
    @mouseenter="showDetails = true"
    @mouseleave="showDetails = false">
    <h5 class="card">{{ title }}</h5>
    <img
      :src="image"
      :alt="title">
    <Transition name="slide">
      <div
        v-if="showDetails"
        :class="`card-${component}-details`">
        <div :class="`card-${component}-details-content`">
          <p class="description">{{ description }}</p>
        </div> 
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.card-comics,
.card-stories {
  width: 140px;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 160px;
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
    height: 100%;
    &-content {
      padding: 10px 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      :first-child {
        margin-bottom: 8px;
      }
      .description {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 8;
        line-clamp: 8; 
        -webkit-box-orient: vertical;
      }
    }
  }
}

.slide-enter-from {
  top: 100%;
}
.slide-enter-to {
  top: 0%;
}
.slide-enter-active {
  transition: all 300ms ease-in;
}
.slide-leave-from {
  top: 0%;
}
.slide-leave-to {
  top: 100%;
}
.slide-leave-active {
  transition: all 300ms ease-in;
}
</style>
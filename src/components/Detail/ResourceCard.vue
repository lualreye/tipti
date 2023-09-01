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
    <h3 class="card">{{ title }}</h3>
    <img
      :src="image"
      :alt="title">
    <Transition name="slide">
      <div
        v-if="showDetails"
        class="card-details">
        <div class="card-details-content">
          <p>{{ description }}</p>
        </div> 
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.card-comics, comic-stories {
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
      :first-child {
        margin-bottom: 8px;
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
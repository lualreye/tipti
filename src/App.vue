<script setup lang="ts">
import { MenuType } from './types/MenuTypes';
import useHistoryStore from './store/HistoryStore';

const historyStore = useHistoryStore();

const menu: MenuType[] = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'History',
    url: '/history'
  },
  {
    name: 'Items Saved',
    url: '/saved'
  },
]
</script>

<template>
  <div class="app-container">
    <div class="app-container-page container">
      <div class="app-container-menu">
        <router-link
          v-for="(item, index) in menu"
          :key="index"
          :to="item.url"
          exact-active-class="exact-item"
          class="item">
          {{ item.name }}
        </router-link>
      </div>
      <div
        v-if="!historyStore.errorMessage"
        class="error-message">
        {{  historyStore.errorMessage }}
      </div>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  font-family: $font;
  &-page {
    margin: auto;
    padding: 2rem;
  }
  &-menu {
    width: 100%;
    display: flex;
    margin: 12px;
    gap: 16px;
    justify-content: flex-end;
    align-items: baseline;
    font-size: $h2-font-size;
    .item {
      color: $yellow;
      text-decoration: none;
    }
    .exact-item {
      color: $red;
    }
  }
  .error-message {
    color: $yellow;
    font-size: $h3-font-size;
    background-color: $red;
  }
}
</style>

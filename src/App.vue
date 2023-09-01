<script setup lang="ts">
</script>

<template>
  <div class="app-container">
    <div class="app-container-page container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  &-page {
    margin: auto;
    padding: 2rem;
  }
}
</style>

<template>
  <div class="spinner">
    <div class="spinner-circle"></div>
  </div>
</template>

<style scoped lang="scss">
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 16px 0;

  .spinner-circle {
    width: 120px;
    height: 120px;
    border: 4px solid transparent;
    border-top: 4px solid $yellow;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
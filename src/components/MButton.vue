<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  isDisabled: {
    type: Boolean,
    required: false,
    default: false
  },
  type: {
    type: String,
    required: false,
    default: ''
  }
});
const emit = defineEmits(['click']);

const btnClass = computed(() => {
  const disable = props.isDisabled ? 'btn-disabled' : '';
  const secondary = props.type.length ? 'btn-secondary' : '';
  return `btn ${secondary} ${disable}`
})

const handleClick = () => {
  if (!props.isDisabled) {
    emit('click');
  }
};
</script>

<template>
  <button
    :class="btnClass"
    :disabled="isDisabled"
    @click="handleClick">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
/* Estilos de botón de ejemplo */
.btn {
  width: 100%;
  padding: 10px 20px;
  background-color: $btn-color;
  color: $white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
}

.btn-secondary {
  background-color: $red;
}

.btn-disabled {
  background-color: $btn-disabled;
  cursor: not-allowed;
}
</style>

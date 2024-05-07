<template>
  <VChip density="compact" :closeable="closeable">
    <slot v-if="$slots.default">
      {{ label }}
    </slot>
  </VChip>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  closeable?: boolean;
}>();
</script>

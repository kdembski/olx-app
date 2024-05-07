<template>
  <VProgressCircular indeterminate :size="size" class="c-loader" />
</template>

<script setup lang="ts">
defineProps<{
  size?: "x-small" | "small" | "default" | "large" | "x-large";
}>();
</script>

<style lang="scss">
.c-loader {
  &.v-progress-circular--size-x-small {
    height: 24px;
    width: 24px;
  }

  &.v-progress-circular--size-small {
    height: 28px;
    width: 28px;
  }
}
</style>

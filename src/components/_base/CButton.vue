<template>
  <VBtn
    :text="text"
    :variant="variant"
    :size="size"
    :icon="icon"
    :disabled="disabled"
    density="comfortable"
    class="c-button"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>
  </VBtn>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string;
    variant?: "text" | "tonal";
    size?: "x-small" | "small" | "default" | "large" | "x-large";
    icon?: string;
    disabled?: boolean;
  }>(),
  { variant: "text" },
);
</script>

<style lang="scss">
.c-button {
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  font-weight: 600;

  &.v-btn--size-large {
    --v-btn-size: 14px;
  }
}
</style>

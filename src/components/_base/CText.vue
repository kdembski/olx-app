<template>
  <span class="c-text" :class="[getVariantClass(), getSizeClass()]">
    <slot />
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "tonal" | "bold" | "default";
    size?: "small" | "regular";
  }>(),
  { variant: "default", size: "regular" },
);

const getVariantClass = () => {
  return "c-text--" + props.variant;
};

const getSizeClass = () => {
  return "c-text--" + props.size;
};
</script>

<style lang="scss">
.c-text {
  &--tonal {
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  }

  &--bold {
    font-weight: 600;
    color: rgba(var(--v-theme-on-surface), 0.9);
  }

  &--small {
    font-size: 14px;
  }

  &--regular {
    font-size: 15px;
  }
}
</style>

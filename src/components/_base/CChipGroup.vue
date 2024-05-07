<template>
  <VChipGroup
    v-model="model"
    selected-class="text-primary"
    class="c-chip-group"
    :multiple="multiple"
  >
    <slot />
  </VChipGroup>
</template>

<script setup lang="ts">
defineProps<{
  multiple?: boolean;
}>();

const model = defineModel();
</script>

<style lang="scss">
.c-chip-group.v-slide-group {
  overflow: unset;
  padding: 0;
}
</style>

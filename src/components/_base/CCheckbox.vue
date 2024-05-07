<template>
  <VCheckboxBtn
    v-model="model"
    :label="label"
    color="primary"
    density="compact"
    class="c-checkbox"
  />
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
}>();

const model = defineModel();
</script>

<style lang="scss">
.c-checkbox {
  .v-label {
    font-size: 14px;
    margin-left: 6px;
    opacity: var(--v-high-emphasis-opacity);
  }

  .v-selection-control__input {
    font-size: 14px;
  }
}
</style>

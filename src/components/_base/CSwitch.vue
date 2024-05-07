<template>
  <VSwitch
    class="c-switch"
    v-model="model"
    :label="label"
    color="primary"
    hide-details
  />
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
}>();

const model = defineModel();
</script>

<style lang="scss">
.c-switch {
  .v-label {
    font-size: 14px;
    opacity: var(--v-high-emphasis-opacity);
  }

  .v-selection-control {
    --v-input-control-height: 20px;
    --v-selection-control-size: 20px;

    &__wrapper {
      width: unset;
    }
  }
}
</style>

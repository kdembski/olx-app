<template>
  <VTextField v-model="model" density="compact" hide-details />
</template>

<script setup lang="ts">
const model = defineModel({
  set(value) {
    if (value === "") return undefined;
    return value;
  },
});
</script>

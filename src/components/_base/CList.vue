<template>
  <VList :lines="lines" class="c-list">
    <template #default>
      <slot />
    </template>
  </VList>
</template>

<script setup lang="ts">
defineProps<{
  lines?: "one" | "two" | "three";
}>();
</script>

<style lang="scss">
.c-list {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  gap: 12px;
  padding: 12px;
  width: 100%;
}
</style>

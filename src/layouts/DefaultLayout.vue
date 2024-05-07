<template>
  <div class="default-layout">
    <div class="default-layout__main" id="layout_main">
      <slot />
    </div>
    <Console />
  </div>
</template>
<script setup lang="ts">
import Console from "@/components/default-layout/Console.vue";
</script>

<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;

  overflow: hidden;
  height: 100vh;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));

  &__main {
    display: flex;
    position: relative;
    flex-grow: 1;
    height: 80%;
  }
}
</style>

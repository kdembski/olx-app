<template>
  <div class="sidebar">
    <OlxCategories />
    <OlxBlacklist />
    <Settings />
  </div>
</template>

<script setup lang="ts">
import OlxBlacklist from "@/components/home-view/sidebar/OlxBlacklist.vue";
import OlxCategories from "@/components/home-view/sidebar/OlxCategories.vue";
import Settings from "@/components/home-view/sidebar/Settings.vue";
</script>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;
  width: 30%;
  max-width: 400px;
  overflow: auto;
  padding: 10px 12px;
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background-color: rgb(var(--v-theme-surface));
}
</style>

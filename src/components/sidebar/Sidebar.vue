<template>
  <div class="sidebar">
    <Categories />
    <Blacklist />
    <Settings />
  </div>
</template>

<script setup lang="ts">
import Categories from "@/components/sidebar/Categories.vue";
import Settings from "@/components/sidebar/Settings.vue";
import Blacklist from "@/components/sidebar/Blacklist.vue";
</script>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
  width: 30%;
  max-width: 400px;
  overflow: auto;
  padding: 16px 12px;
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background-color: rgb(var(--v-theme-surface));

  &-section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__title {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      border-bottom: 1px solid
        rgba(var(--v-border-color), var(--v-border-opacity));
    }
  }
}
</style>

<template>
  <div class="sidebar">
    <Categories />
  </div>
</template>

<script setup lang="ts">
import Categories from "@/components/Categories.vue";
</script>

<style lang="scss">
.sidebar {
  height: 100%;
  width: 30%;
  max-width: 400px;
  overflow: auto;
  padding: 15px 10px;
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background-color: rgb(var(--v-theme-surface));
}
</style>

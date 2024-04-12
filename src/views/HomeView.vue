<template>
  <div class="home-view">
    <div class="home-view__main">
      <Sidebar />
      <AdsList />
    </div>
    <Console />
  </div>
</template>
<script setup lang="ts">
import Console from "@/components/Console.vue";
import Sidebar from "@/components/Sidebar.vue";
import AdsList from "@/components/ads-list/AdsList.vue";
</script>

<style lang="scss">
.home-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));

  &__main {
    display: flex;
    flex-grow: 1;
    height: 75%;
  }
}
</style>

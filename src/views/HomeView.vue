<template>
  <div class="d-flex flex-column h-screen overflow-hidden">
    <div class="d-flex flex-grow-1 h-75">
      <Sidebar />
      <AdsList />
    </div>
    <Console />
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import Console from "@/components/Console.vue";
import Sidebar from "@/components/Sidebar.vue";
import AdsList from "@/components/AdsList.vue";
import { useScraperStore } from "@/store/scraper.store";

const scraperStore = useScraperStore();

onMounted(scraperStore.start);
onUnmounted(scraperStore.stop);
</script>

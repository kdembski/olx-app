<template>
  <Sidebar />
  <AdsList />
</template>
<script setup lang="ts">
import { onMounted } from "vue";

import AdsList from "@/components/home-view/ads-list/AdsList.vue";
import Sidebar from "@/components/home-view/sidebar/Sidebar.vue";

import { useScraperStore } from "@/store/scraper.store";

const { start } = useScraperStore();
onMounted(start);
</script>

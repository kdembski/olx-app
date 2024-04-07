<template>
  <div class="d-flex">
    <div>
      <VCheckboxBtn
        v-for="category in getCategories()"
        v-model="selectedCategories"
        :value="category.id"
        :label="category.name"
        color="primary"
        density="comfortable"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useOlxAdCategoryStore } from "@/store/olx/olx-ad-category";
import { onMounted, ref } from "vue";
import { useScrapper } from "@/scraper";

const selectedCategories = ref<number[]>([]);

const { start } = useScrapper();
const { loadCategories, getCategories } = useOlxAdCategoryStore();

onMounted(() => {
  loadCategories();
  start();
});
</script>

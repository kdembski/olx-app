<template>
  <div class="h-100 overflow-hidden">
    <p class="text-caption text-uppercase font-weight-bold mb-2 ml-1">
      Categories
    </p>
    <div class="overflow-auto">
      <VCheckboxBtn
        v-for="category in olxAdCategoryStore.categories"
        v-model="olxAdCategoryStore.selectedIds"
        :value="category.id"
        color="primary"
        density="compact"
        class="text-body-2 mb-1"
      >
        <template #label>
          <span class="text-body-2 ml-1">{{ category.name }}</span>
        </template>
      </VCheckboxBtn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOlxAdCategoryStore } from "@/store/olx/olx-ad-category.store";
import { onMounted } from "vue";

const olxAdCategoryStore = useOlxAdCategoryStore();

onMounted(async () => {
  await olxAdCategoryStore.load();
  olxAdCategoryStore.selectedIds = olxAdCategoryStore.categoryIds;
});
</script>

<template>
  <div>
    <VCheckboxBtn
      v-for="category in olxAdCategoryStore.categories"
      v-model="olxAdCategoryStore.selectedIds"
      :value="category.id"
      color="primary"
      density="compact"
      class="categories-checkbox"
      :label="category.name"
    />
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

<style lang="scss">
.categories-checkbox {
  margin-bottom: 4px;

  .v-label {
    font-size: 15px;
    margin-left: 6px;
  }

  .v-selection-control__input {
    font-size: 14px;
  }
}
</style>

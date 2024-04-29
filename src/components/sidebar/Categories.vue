<template>
  <div class="sidebar-section">
    <p class="sidebar-section__title">Olx categories</p>
    <div class="categories">
      <VCheckboxBtn
        v-for="category in olxAdCategoryStore.categories"
        v-model="olxAdCategoryStore.selectedIds"
        :value="category.id"
        color="primary"
        density="compact"
        class="categories__checkbox"
        :label="category.name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOlxAdCategoryStore } from "@/store/olx/olx-ad-category.store";

const olxAdCategoryStore = useOlxAdCategoryStore();
</script>

<style lang="scss">
.categories {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__checkbox {
    .v-label {
      font-size: 15px;
      margin-left: 6px;
    }

    .v-selection-control__input {
      font-size: 14px;
    }
  }
}
</style>

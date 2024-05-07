<template>
  <SidebarSection>
    <template #title>
      <div class="olx-categories__title">
        <span>Olx categories</span>
        <OlxCategoriesEditModal />
      </div>
    </template>
    <div class="olx-categories">
      <div v-if="olxAdCategoryStore.isLoading" class="d-flex justify-center">
        <CLoader size="small" />
      </div>
      <CCheckbox
        v-else
        v-for="category in olxAdCategoryStore.categories"
        v-model="olxAdCategoryStore.selectedIds"
        :value="category.id"
        :label="category.name"
      />
    </div>
  </SidebarSection>
</template>

<script setup lang="ts">
import CCheckbox from "@/components/_base/CCheckbox.vue";
import CLoader from "@/components/_base/CLoader.vue";
import OlxCategoriesEditModal from "@/components/home-view/sidebar/OlxCategoriesEditModal.vue";
import SidebarSection from "@/components/home-view/sidebar/SidebarSection.vue";

import { useOlxAdCategoryStore } from "@/store/olx/olx-ad-category.store";

const olxAdCategoryStore = useOlxAdCategoryStore();
</script>

<style lang="scss">
.olx-categories {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
}
</style>

<template>
  <CModal
    title="Edit olx categories"
    v-model="isEditModalOpen"
    :loading="olxAdCategoryStore.isUpdating"
    @update:model-value="onEditModalOpen"
    @submit="onEditSubmit"
  >
    <template #activator="{ props }">
      <CButton
        v-bind="props"
        icon="mdi-pencil"
        size="small"
        variant="text"
        density="comfortable"
      />
    </template>
    <template #default>
      <div class="edit-olx-categories">
        <div
          v-for="(category, index) in editedCategories"
          class="edit-olx-categories__item"
        >
          <CTextField v-model="category.name" />
          <CButton
            icon="mdi-delete-outline"
            variant="text"
            density="comfortable"
            @click="deleteCategory(index)"
            :disabled="!canDeleteCategory(category)"
          />
        </div>
        <div class="d-flex justify-center">
          <CButton icon="mdi-plus" variant="tonal" @click="addCategory" />
        </div>
      </div>
    </template>
    <template #actions>
      <CButton
        text="Cancel"
        variant="tonal"
        size="large"
        @click="isEditModalOpen = false"
      />
      <CButton
        text="Update"
        type="submit"
        variant="tonal"
        size="large"
        :disabled="isEditing"
      />
    </template>
  </CModal>
</template>

<script setup lang="ts">
import CButton from "@/components/_base/CButton.vue";
import CModal from "@/components/_base/CModal.vue";
import CTextField from "@/components/_base/CTextField.vue";

import { useEditOlxCategories } from "@/composables/components/home-view/edit-olx-categories";

import { useOlxAdCategoryStore } from "@/store/olx/olx-ad-category.store";

const olxAdCategoryStore = useOlxAdCategoryStore();

const {
  editedCategories,
  isEditModalOpen,
  isEditing,
  onEditModalOpen,
  onEditSubmit,
  deleteCategory,
  canDeleteCategory,
  addCategory,
} = useEditOlxCategories();
</script>

<style lang="scss">
.edit-olx-categories {
  display: flex;
  flex-direction: column;
  gap: 15px;

  &__item {
    display: flex;
    gap: 10px;

    .c-button {
      margin-top: 3px;
    }
  }
}
</style>

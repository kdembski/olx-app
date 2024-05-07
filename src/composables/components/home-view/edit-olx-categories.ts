import { addMinutes, isFuture } from "date-fns";
import { cloneDeep, differenceBy, isEqual } from "lodash";
import { computed, ref } from "vue";

import { useOlxAdCategoryStore } from "@/store/olx/olx-ad-category.store";

import {
  OlxAdCategory,
  OlxAdCategoryCreateInput,
  isOlxAdCategory,
} from "@/types/olx/olx-ad-category.types";

export function useEditOlxCategories() {
  const olxAdCategoryStore = useOlxAdCategoryStore();
  const editedCategories = ref<(OlxAdCategory | OlxAdCategoryCreateInput)[]>();

  const onEditModalOpen = (value: boolean) => {
    if (!value) return;
    editedCategories.value = cloneDeep(olxAdCategoryStore.categories);
  };

  const isEditModalOpen = ref<boolean>();
  const isEditing = computed(() =>
    isEqual(olxAdCategoryStore.categories, editedCategories.value),
  );

  const onEditSubmit = async () => {
    const promises: Promise<unknown>[] = [];
    olxAdCategoryStore.isUpdating = true;

    editedCategories.value?.forEach((category) => {
      if (!isOlxAdCategory(category)) {
        promises.push(olxAdCategoryStore.create(category));
        return;
      }

      const originalCategory = olxAdCategoryStore.getCategoryById(category.id);
      if (!isEqual(originalCategory, category)) {
        promises.push(olxAdCategoryStore.update(category));
      }
    });

    const categoriesToDelete = getCategoriesToDelete();
    categoriesToDelete.forEach((category) => {
      promises.push(olxAdCategoryStore.remove(category));
    });

    await Promise.all(promises)
      .finally(() => (olxAdCategoryStore.isUpdating = false))
      .then(() => (isEditModalOpen.value = false))
      .catch((e) => console.error(e));
  };

  const getCategoriesToDelete = () => {
    if (!editedCategories.value) return [];
    return differenceBy(
      olxAdCategoryStore.categories,
      editedCategories.value,
      "id",
    );
  };

  const deleteCategory = (index: number) => {
    if (!editedCategories.value) return;
    editedCategories.value.splice(index, 1);
  };

  const canDeleteCategory = (
    category: OlxAdCategory | OlxAdCategoryCreateInput,
  ) => {
    if (!isOlxAdCategory(category)) return true;
    return isFuture(addMinutes(category.createdAt, 5));
  };

  const addCategory = () => {
    if (!editedCategories.value) return;
    editedCategories.value.push({ name: undefined });
  };

  return {
    editedCategories,
    isEditModalOpen,
    isEditing,
    onEditModalOpen,
    onEditSubmit,
    deleteCategory,
    canDeleteCategory,
    addCategory,
  };
}

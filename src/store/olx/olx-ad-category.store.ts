import { useApi } from "@/composables/api";
import { OlxAdCategory } from "@/types/olx.types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useOlxAdCategoryStore = defineStore("olx-ad-category", () => {
  const _categories = ref<OlxAdCategory[]>([]);
  const _selectedIds = ref<number[]>([]);

  const selectedIds = computed({
    get() {
      return _selectedIds.value;
    },
    set(value) {
      _selectedIds.value = value;
    },
  });

  const categories = computed({
    get() {
      return _categories.value;
    },
    set(value) {
      _categories.value = value;
    },
  });

  const categoryNames = computed(() =>
    categories.value.map((category) => category.name)
  );

  const categoryIds = computed(() =>
    categories.value.map((category) => category.id)
  );

  const load = async () => {
    const { get } = useApi();

    return get<OlxAdCategory[]>("olx/ads/categories", {
      onSuccess: (data) => (categories.value = data),
    });
  };

  return {
    categories,
    categoryNames,
    categoryIds,
    selectedIds,
    load,
  };
});

import { useApi } from "@/composables/api";
import { useWebSocket } from "@/composables/websocket";
import { OlxAdCategory } from "@/types/olx/olx-ad-category.types";
import { UseWebSocket } from "@/types/websocket.types";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useOlxAdCategoryStore = defineStore("olx-ad-category", () => {
  const _categories = ref<OlxAdCategory[]>([]);
  const _selectedIds = useLocalStorage<number[]>("selected-category-ids", []);
  const ws = ref<UseWebSocket<number>>(
    useWebSocket<number>("olx/ads/categories")
  );

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

  load();
  ws.value.onmessage = (e) => {
    categories.value = JSON.parse(e.data);
  };

  return {
    ws,
    categories,
    categoryNames,
    categoryIds,
    selectedIds,
    load,
  };
});

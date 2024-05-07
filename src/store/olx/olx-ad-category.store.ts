import { useLocalStorage } from "@vueuse/core";
import { addMinutes, isFuture } from "date-fns";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { useApi } from "@/composables/api";
import { useWebSocket } from "@/composables/websocket";

import { useConsoleStore } from "@/store/console.store";

import {
  OlxAdCategory,
  OlxAdCategoryCreateInput,
  OlxAdCategoryUpdateInput,
} from "@/types/olx/olx-ad-category.types";
import { UseWebSocket } from "@/types/websocket.types";

export const useOlxAdCategoryStore = defineStore("olx-ad-category", () => {
  const isUpdating = ref(false);
  const isLoading = ref(false);

  const categories = ref<OlxAdCategory[]>([]);
  const selectedIds = useLocalStorage<number[]>("selected-category-ids", []);

  const ws = ref<UseWebSocket<number>>(
    useWebSocket<number>("olx/ads/categories"),
  );

  const { get, post, put, _delete } = useApi();
  const consoleStore = useConsoleStore();

  const categoryNames = computed(() =>
    categories.value.map((category) => category.name),
  );

  const categoryIds = computed(() =>
    categories.value.map((category) => category.id),
  );

  const getCategoryById = (id: number) =>
    categories.value.find((category) => category.id === id);

  const load = async () => {
    isLoading.value = true;
    return get<OlxAdCategory[]>("olx/ads/categories", {
      onSuccess: (data) => (categories.value = data),
      onFinally: () => (isLoading.value = false),
    });
  };

  const create = async (data: OlxAdCategoryCreateInput) => {
    return post<OlxAdCategory>("olx/ads/categories", data, {
      onSuccess: () => {
        consoleStore.create({
          type: "success",
          message: `Olx category '${data.name}' created successfully`,
        });
      },
    });
  };

  const update = async (data: OlxAdCategoryUpdateInput) => {
    return put<OlxAdCategory>("olx/ads/categories/" + data.id, data, {
      onSuccess: () => {
        consoleStore.create({
          type: "success",
          message: `Olx category '${data.name}' updated successfully`,
        });
      },
    });
  };

  const remove = async (category: OlxAdCategory) => {
    if (!isFuture(addMinutes(category.createdAt, 5))) return;

    return _delete<OlxAdCategory>("olx/ads/categories/" + category.id, {
      onSuccess: () => {
        consoleStore.create({
          type: "success",
          message: `Olx category '${category.name}' deleted successfully`,
        });
      },
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
    isLoading,
    isUpdating,
    load,
    create,
    update,
    remove,
    getCategoryById,
  };
});

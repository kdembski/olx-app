import { useApi } from "@/composables/api";
import { OlxAdCategory } from "@/types/olx";
import { defineStore } from "pinia";

export const useOlxAdCategoryStore = defineStore("olx-ad-category", {
  state: (): { categories: OlxAdCategory[] } => ({
    categories: [],
  }),
  getters: {
    getCategories: (state) => () => state.categories,
  },
  actions: {
    setCategories(categories: OlxAdCategory[]) {
      this.categories = categories;
    },

    async loadCategories() {
      const { get } = useApi();
      const response = await get<OlxAdCategory[]>("olx-ads/categories");
      this.setCategories(response.data);
    },
  },
});

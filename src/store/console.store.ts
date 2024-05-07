import { ConsoleItemI } from "@/types/console.types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useConsoleStore = defineStore("console", () => {
  const items = ref<ConsoleItemI[]>([]);

  const create = (item: ConsoleItemI) => {
    item.createdAt = new Date();
    item.label = item.label || "general";
    items.value.push(item);
  };

  return {
    items,
    create,
  };
});

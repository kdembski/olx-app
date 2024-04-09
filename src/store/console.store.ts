import { ConsoleItemI } from "@/types/console.types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useConsoleStore = defineStore("console", () => {
  const items = ref<ConsoleItemI[]>([]);

  const create = (item: ConsoleItemI) => {
    item.createdAt = new Date();
    items.value.push(item);
  };

  return {
    items,
    create,
  };
});

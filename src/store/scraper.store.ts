import { useScrapper } from "@/composables/scraper";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useScraperStore = defineStore("scraper", () => {
  const instance = ref<ReturnType<typeof useScrapper>>(useScrapper());

  const start = () => {
    instance.value.start();
  };

  const stop = () => {
    instance.value.stop();
  };

  return {
    start,
    stop,
  };
});

import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const openWhenFound = ref(true);

  return { openWhenFound };
});

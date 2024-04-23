import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", () => {
  const openWhenFound = useLocalStorage("open-when-found", true);
  const blacklistedUserIds = useLocalStorage(
    "blacklisted-user-ids",
    new Set<string>()
  );

  return { openWhenFound, blacklistedUserIds };
});

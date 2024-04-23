import { useWebSocket } from "@/composables/websocket";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useOlxAdStore = defineStore("olx-ad", () => {
  const ws = ref<ReturnType<typeof useWebSocket<number>>>(
    useWebSocket<number>("olx/ads")
  );

  return {
    ws,
  };
});

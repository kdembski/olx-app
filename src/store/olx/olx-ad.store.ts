import { useApi } from "@/composables/api";
import { useWebSocket } from "@/composables/websocket";
import { OlxAdCreateInput, OlxAdSelectResult } from "@/types/olx.types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useOlxAdStore = defineStore("olx-ad", () => {
  const ws = ref<ReturnType<typeof useWebSocket<number>>>(
    useWebSocket<number>("olx/ads")
  );

  const create = (ad: OlxAdCreateInput) => {
    const { post } = useApi();

    return post<OlxAdSelectResult>("olx/ads", ad, {
      onSuccess: (data) => ws.value.send(data.id),
    });
  };

  return {
    ws,
    create,
  };
});

import { useApi } from "@/composables/api";
import { useWebSocket } from "@/composables/websocket";
import { OlxAd, OlxAdCreateInput } from "@/types/types/olx-ad.types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useOlxAdStore = defineStore("olx-ad", () => {
  const ws = ref<ReturnType<typeof useWebSocket<number>>>(
    useWebSocket<number>("olx/ads")
  );

  const create = (ad: OlxAdCreateInput) => {
    const { post } = useApi();

    return post<OlxAd>("olx/ads", ad, {
      onSuccess: (data) => ws.value.send(data.id),
    });
  };

  return {
    ws,
    create,
  };
});

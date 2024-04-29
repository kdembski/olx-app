import { useApi } from "@/composables/api";
import { useWebSocket } from "@/composables/websocket";
import { OlxAd, OlxAdCreateInput } from "@/types/olx/olx-ad.types";
import { UseWebSocket } from "@/types/websocket.types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useOlxAdStore = defineStore("olx-ad", () => {
  const ws = ref<UseWebSocket<number>>(useWebSocket<number>("olx/ads"));

  const create = (ad: OlxAdCreateInput) => {
    const { post } = useApi();
    return post<OlxAd>("olx/ads", ad);
  };

  return {
    ws,
    create,
  };
});

import { defineStore } from "pinia";
import { ref } from "vue";

import { useApi } from "@/composables/api";
import { useWebSocket } from "@/composables/websocket";

import { useConsoleStore } from "@/store/console.store";

import { OlxAd, OlxAdCreateInput } from "@/types/olx/olx-ad.types";
import { UseWebSocket } from "@/types/websocket.types";

export const useOlxAdStore = defineStore("olx-ad", () => {
  const ws = ref<UseWebSocket<number>>(useWebSocket<number>("olx/ads"));

  const create = (ad: OlxAdCreateInput) => {
    const { post } = useApi();
    const consoleStore = useConsoleStore();

    return post<OlxAd>("olx/ads", ad, {
      onError: (e) =>
        consoleStore.create({
          label: "bot",
          type: "error",
          message: e.response.data,
        }),
    });
  };

  return {
    ws,
    create,
  };
});

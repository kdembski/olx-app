import { useApi } from "@/composables/api";
import { ref, watch } from "vue";

export function useWebSocket<MessageT>(path: string) {
  const ws = ref<WebSocket>();
  const onmessage = ref<((e: MessageEvent<string>) => void) | null>(null);

  const isOpen = () => ws.value?.readyState === WebSocket.OPEN;

  const isClosed = () =>
    ws.value?.readyState === WebSocket.CLOSED ||
    ws.value?.readyState === WebSocket.CLOSING;

  const isConnecting = () => ws.value?.readyState === WebSocket.CONNECTING;

  const init = () => {
    if (isOpen()) {
      return;
    }

    const { wsUrl } = useApi();
    const url = wsUrl(path);
    ws.value = new WebSocket(url);
    ws.value.onclose = init;

    ws.value.onmessage = (e) => {
      if (!e.data || e.data === "ping") return;
      onmessage.value?.(e);
    };
  };

  const send = async (message: MessageT) => {
    if (!ws.value || isClosed()) {
      setTimeout(() => {
        init();
        send(message);
      }, 5);

      return;
    }

    if (isConnecting()) {
      setTimeout(() => {
        send(message);
      }, 5);

      return;
    }

    ws.value?.send(JSON.stringify(message));
  };

  watch(onmessage, init);

  return { send, onmessage };
}
